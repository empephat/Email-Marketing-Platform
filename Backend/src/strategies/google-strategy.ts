import Express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../db/prisma";



// * TYPES
interface googleUser {
  googleId: string;
  name: string;
  email: string;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client ID eller Secret saknas i miljövariabler.");
}

passport.use(
  new GoogleStrategy(
    {
      //hämtar hemliga saker från .env
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      //halvhemligt:
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Spara google-profilen i en variabel och ge den TYPES (googleUser)
      const googleProfile: googleUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0].value || "",
      };

      //och vi försöker......
      try {
        // ...kontrollera om användaren redan finns i databasen
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          // Om användaren inte finns, skapa en ny användare i databasen
          user = await prisma.user.create({
            data: {
              googleId: googleProfile.googleId,
              email: googleProfile.email,
              name: googleProfile.name,
            },
          });
        }

        done(null, user); // Skicka användaren till Passport
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialisera användaren i sessionen
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialisera användaren från sessionen
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

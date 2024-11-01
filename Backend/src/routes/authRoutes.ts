import { User } from "@prisma/client";
import { Router } from "express";

import passport from "passport";

const router = Router();

const url =
  process.env.NODE_ENV === "production"
    ? "https://email-marketing-platform-frontend.vercel.app"
    : "http://localhost:5173";

//* Google OAuth-routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${url}/login` }),
  (req, res) => {
    if (req.user) {
      res.redirect(`${url}/campaigns`);
    } else {
      res.status(400).json({ message: "Could not log in with Google" });
      res.redirect(`${url}/login`);
    }
  },
);

//* Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Fel vid utloggning:", err);
      return res.status(500).json({ message: "Fel vid utloggning" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Fel vid förstöring av session:", err);
      }
      res.clearCookie("connect.sid"); // Eller det namn du använder för din sessionscookie
      res.status(200).json({ message: "Utloggad" });
    });
  });
});

//* Check if user is authenticated
router.get("/status", (req, res) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

export default router;

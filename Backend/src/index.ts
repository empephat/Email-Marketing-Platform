import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import emailRoutes from "./routes/emailRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
dotenv.config();
import "./strategies/google-strategy";

const app = express();
const PORT = 3000;

//* Cors configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


//* Session setup
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET must be set");
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1.5 hour

    },
  })
);

//* Middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

//* Routes
app.use("/auth", authRoutes);
app.use("/api/campaigns", emailRoutes);
app.use("/api/campaigns", campaignRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

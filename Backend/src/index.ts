import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import "./strategies/google-strategy";
import emailRoutes from "./routes/emailRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import authRoutes from "./routes/authRoutes";
import cors, { CorsOptions } from "cors";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET",
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

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

// req.session.userId = user.id
// req.session.userId = "en kokkiie sattes"

app.use(passport.initialize());
app.use(passport.session());

//* Routes
app.use("/auth", authRoutes);
app.use("/api/campaigns", emailRoutes);
app.use("/api/campaigns", campaignRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

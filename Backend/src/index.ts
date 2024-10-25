import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
dotenv.config();
import "./strategies/google-strategy";
import emailRoutes from "./routes/emailRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import authRoutes from "./routes/authRoutes";
import generateTextRoute from './routes/generateText'
import { CorsOptions } from "cors";
import cors from "cors"


const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.NODE_ENV === "production" ? [
  "",
] : [
  "http://localhost:5173/",
];

//* Cors configuration
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET, DELETE",
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));


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
app.use("/api/generateText", generateTextRoute)
app.use("/api/campaigns", campaignRoutes)
app.delete("/api/campaigns/", campaignRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


export default app;
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

const router = Router();

interface User {
  id: string;
}

// Google OAuth-routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// // vårt försök:
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/campaigns",
    failureRedirect: "/login",
  })
);

// försök att hitta connect.sid (alltså session id cookie för express-session)
// router.get(
//   "/google/callback",
//   passport.authenticate(
//     "google",
//     {
//       successRedirect: "http://localhost:5173/campaigns",
//       failureRedirect: "/login",
//     },
//     (req, res) => {
//       const sessionId = req.sessionID;
//       //console.log(sessionId);
//     }
//   )
// );
export default router;

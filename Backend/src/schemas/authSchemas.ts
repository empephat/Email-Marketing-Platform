// import { body, ValidationChain } from "express-validator";

// export const validateLogin: ValidationChain[] = [
//   body("email")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail()
//     .trim(),
//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters long")
//     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
//     .withMessage(
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//     ),
// ];

// export const validateRegistration: ValidationChain[] = [
//   body("email")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail()
//     .trim(),
//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters long")
//     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
//     .withMessage(
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//     ),
//   body("confirmPassword").custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error("Password confirmation does not match password");
//     }
//     return true;
//   }),
//   body("firstName")
//     .isLength({ min: 2 })
//     .withMessage("First name must be at least 2 characters long")
//     .trim(),
//   body("lastName")
//     .isLength({ min: 2 })
//     .withMessage("Last name must be at least 2 characters long")
//     .trim(),
// ];

// export const validatePasswordReset: ValidationChain[] = [
//   body("email")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail()
//     .trim(),
// ];

// export const validatePasswordUpdate: ValidationChain[] = [
//   body("currentPassword")
//     .notEmpty()
//     .withMessage("Current password is required"),
//   body("newPassword")
//     .isLength({ min: 8 })
//     .withMessage("New password must be at least 8 characters long")
//     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
//     .withMessage(
//       "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//     ),
//   body("confirmNewPassword").custom((value, { req }) => {
//     if (value !== req.body.newPassword) {
//       throw new Error("New password confirmation does not match new password");
//     }
//     return true;
//   }),
// ];

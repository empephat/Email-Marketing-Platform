import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: string | number; // Ange rätt typ för ditt användar-ID
  }
}

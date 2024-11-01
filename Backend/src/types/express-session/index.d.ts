import { User as PrismaUser } from "@prisma/client";
import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: PrismaUser;
  }
}

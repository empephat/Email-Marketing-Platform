declare namespace Express {

  interface Request {
    user?: User; // Se till att den här är korrekt
  }

  interface User {
    id: string;
    // name: string;
    // email: string;
    // password: string | null;
    // age: number | null;
    // googleId: string | null;
  }
}

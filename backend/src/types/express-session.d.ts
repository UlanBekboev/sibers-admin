import "express-session";

declare module "express-session" {
  interface SessionData {
    adminId?: number; // или string, если id хранится как строка
  }
}
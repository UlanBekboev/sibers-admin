import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";

export const showLoginForm = (req: Request, res: Response) => {
  res.render("auth/login", { title: "Admin Login" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.render("auth/login", { error: "Неверный логин или пароль" });
    }

    const match = await bcrypt.compare(password, admin.password);

    console.log(match)
    if (!match) {
      return res.render("auth/login", { error: "Неверный логин или пароль" });
    }

    // Сохраняем сессию
    (req.session as any).adminId = admin.id;

    return res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.render("auth/login", { error: "Ошибка сервера" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect("/login");
  });
};
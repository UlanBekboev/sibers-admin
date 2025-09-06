import { Request, Response } from "express";
import { User } from "../models/User.js";

// GET /users
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Сортировка по query параметрам, по умолчанию username ASC
    const sortField = (req.query.sort as string) || "username";
    const sortOrder = (req.query.order as string) === "desc" ? "DESC" : "ASC";

    // Пагинация
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = 5;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      order: [[sortField, sortOrder]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.render("users/list", {
      title: "Users",
      users: users.map(u => u.get({ plain: true })),
      currentPage: page,
      totalPages,
      sortField,
      sortOrder,
      adminId: (req.session as any).adminId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("users/detail", {
      title: `User: ${user.username}`,
      user: user.get({ plain: true }),
    });
    console.log(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Server error");
  }
};

export const showAddUserForm = (req: Request, res: Response) => {
  res.render("users/add", { title: "Add User" });
};

// обработка формы
export const addUser = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName, gender, birthdate } = req.body;

    if (!username || !password || !firstName || !lastName || !gender || !birthdate) {
      return res.render("users/create", { error: "All fields are required", formData: req.body });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.render("users/create", { error: "Username already exists", formData: req.body });
    }

    await User.create({
      username,
      password, 
      firstName,
      lastName, 
      gender,
      birthdate,
    });

    res.redirect("/users");
  } catch (error) {
    console.error("Error creating user:", error);
    res.render("users/add", { error: "Failed to create user", formData: req.body });
  }
};


export const showEditUserForm = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("users/edit", {
      title: "Edit User",
      user: user.get({ plain: true }),
     });
  } catch (error) {
    console.error("Error loading user:", error);
    res.status(500).send("Server error");
  }
};

// обработка обновления
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, first_name, last_name, gender, birthdate } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    await user.update({
      username,
      firstName: first_name,
      lastName: last_name, 
      gender,
      birthdate,
    });

    res.redirect("/users");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.destroy();
    res.redirect("/users");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server error");
  }
};
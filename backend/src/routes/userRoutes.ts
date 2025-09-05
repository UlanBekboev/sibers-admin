import { Router } from "express";
import { addUser, deleteUser, getUserDetails, getUsers, showAddUserForm, showEditUserForm, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserDetails);

router.get("/add-user", showAddUserForm);
router.post("/add-user", addUser);

router.get("/users/:id/edit", showEditUserForm);
router.post("/users/:id/edit", updateUser);


router.post("/users/:id/delete", deleteUser);

export default router;
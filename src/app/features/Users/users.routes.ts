import { Router } from "express";
import { UserController } from "./controllers/userController";
import { validateDataUser } from "./middlewares/validateDataUser";
import { validateLoginUser } from "./middlewares/validateLoginUser";

const routerUser = Router();

// ROTA DE CRIAÇÃO DE USUÁRIO
routerUser.post("/signup", validateDataUser, UserController.create);

// ROTA DE LOGIN DE USUÁRIO
routerUser.post("/signin", validateLoginUser, UserController.login);

export default routerUser;

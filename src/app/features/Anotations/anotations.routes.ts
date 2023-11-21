import { Router } from "express";
import { verifyUserExist } from "../Anotations/middlewares/verifyUserExist";
import { CreateAnotationController } from "./controllers/createAnotation.controller";
import { DeleteAnotationController } from "./controllers/deleteAnotation.controller";
import { GetAllAnotationsController } from "./controllers/getAllAnotations.controller";
import { GetAnotationController } from "./controllers/getAnotationById.controller";
import { UpdateAnotationController } from "./controllers/updateAnotation.controller";
import { verifyCreateAnotation } from "./middlewares/verifyCreateAnotation";
import { verifyUpdateAnotation } from "./middlewares/verifyUpdateAnotation";

const routerAnotation = Router();

// ROTA DE CRIAÇÃO DE ANOTAÇÃO
routerAnotation.post(
  "/:userId/anotations",
  verifyCreateAnotation,
  verifyUserExist,
  CreateAnotationController.execute
);

// ROTA PARA LISTAR TODAS AS ANOTAÇÕES
routerAnotation.get(
  "/:userId/anotations",
  verifyUserExist,
  GetAllAnotationsController.execute
);

// ROTA PARA LISTAR ANOTAÇÃO ESPECÍFICA
routerAnotation.get(
  "/:id/anotation",
  verifyUserExist,
  GetAnotationController.execute
);

// ROTA PARA DELETAR ANOTAÇÃO
routerAnotation.delete(
  "/:anotationId",
  verifyUserExist,
  DeleteAnotationController.execute
);

// ROTA PARA ATUALIZAÇÃO ANOTAÇÃO
routerAnotation.put(
  "/:anotationId",
  verifyUserExist,
  verifyUpdateAnotation,
  UpdateAnotationController.execute
);

export default routerAnotation;

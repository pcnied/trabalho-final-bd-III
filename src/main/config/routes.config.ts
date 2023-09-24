import { Express, Request, Response } from "express";
import routesAnotation from "../../app/features/Anotations/anotations.routes";
import routesUser from "../../app/features/Users/users.routes";

export function routesApp(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Bombando!" });
  });

  app.use("/users", routesUser);
  app.use("/users/:userId/anotation", routesAnotation);
}

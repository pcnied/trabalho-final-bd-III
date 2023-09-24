import { Request, Response } from "express";
import { CreateUser, LoginUser } from "../usecases";

export class UserController {
  public static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const usecase = new CreateUser();

    const response = await usecase.execute({ name, email, password });

    if (!response.success) {
      return res.status(400).json(response);
    }

    return res.status(201).json(response);
  }

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const usecase = new LoginUser();

    const response = await usecase.execute({ email, password });

    if (!response.success) {
      return res.status(401).json(response);
    }

    return res.status(200).json(response);
  }
}

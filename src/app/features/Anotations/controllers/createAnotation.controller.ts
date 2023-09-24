import { Request, Response } from "express";
import { CreateAnotationUseCase } from "../../usecase";

export class CreateAnotationController {
  public static async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { title, description } = req.body;

    const createAnotationUseCase = new CreateAnotationUseCase();

    const response = await createAnotationUseCase.execute({
      userId,
      title,
      description,
    });

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(201).json(response);
  }
}

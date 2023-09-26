import { Request, Response } from "express";
import { UpdateAnotationUseCase } from "../usecases";

export class UpdateAnotationController {
  public static async execute(req: Request, res: Response) {
    const { userId, anotationId } = req.params;
    const { title, description, archived } = req.body;

    const updateAnotationUseCase = new UpdateAnotationUseCase();

    const response = await updateAnotationUseCase.execute({
      userId,
      anotationId,
      title,
      description,
      archived,
    });

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  }
}

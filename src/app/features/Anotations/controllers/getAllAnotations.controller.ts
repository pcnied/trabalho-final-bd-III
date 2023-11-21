import { Request, Response } from "express";
import { GetAllAnotationsUseCase } from "../usecases";

export class GetAllAnotationsController {
  public static async execute(req: Request, res: Response) {
    const { userId } = req.params;
    let { archived } = req.query;
    const { title } = req.query;

    const getAllAnotationsUseCase = new GetAllAnotationsUseCase();

    const response = await getAllAnotationsUseCase.execute({
      userId,
      archived:
        archived !== undefined ? JSON.parse(archived as string) : undefined,
      title: title ? String(title) : undefined,
    });

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  }
}

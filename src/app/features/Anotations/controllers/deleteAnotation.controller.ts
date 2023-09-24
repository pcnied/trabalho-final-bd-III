import { Request, Response } from "express";
import { DeleteAnotationUseCase } from "../../usecase";

export class DeleteAnotationController {
  public static async execute(req: Request, res: Response) {
    const { userId, anotationId } = req.params;

    const deleteAnotationUseCase = new DeleteAnotationUseCase();

    const response = await deleteAnotationUseCase.execute({
      userId,
      anotationId,
    });

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  }
}

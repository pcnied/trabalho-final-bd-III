import { Request, Response } from "express";
import { GetAnotationByIdUseCase } from "../../usecase";

export class GetAnotationController {
  public static async execute(req: Request, res: Response) {
    const { userId, anotationId } = req.params;

    const getAnotationByIdUseCase = new GetAnotationByIdUseCase();

    const response = await getAnotationByIdUseCase.execute({
      userId,
      anotationId,
    });

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  }
}

import { NextFunction, Request, Response } from "express";
import { usersRepository } from "../../../../routes";

export async function verifyUserExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;

  const user = await usersRepository.getById(userId);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado pelo ID informado.",
      success: false,
    });
  }

  next();
}

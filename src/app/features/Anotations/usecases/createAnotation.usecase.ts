import { Anotation } from "../../../models/anotation";
import { AnotationRepository } from "../repository";

export type CreateAnotationRequestDTO = {
  userId: string;
  title: string;
  description: string;
};

export type CreateAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation;
};

export class CreateAnotationUseCase {
  public async execute(
    data: CreateAnotationRequestDTO
  ): Promise<CreateAnotationResponseDTO> {
    const { userId, title, description } = data;

    const anotationRepository = new AnotationRepository();

    const newAnotation = await anotationRepository.createAnotation({
      userId,
      title,
      description,
    });

    return {
      message: "Anotação criada com sucesso!",
      success: true,
      anotation: newAnotation,
    };
  }
}

import { Anotation } from "../../../models/anotation";
import { CacheRepository } from "../../../shared/database/repositories";
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
    const cacheRepository = new CacheRepository();

    const newAnotation = await anotationRepository.createAnotation({
      userId,
      title,
      description,
    });
    await cacheRepository.delete(`anotations-user-${userId}`);
    await cacheRepository.delete(`anotations-${newAnotation.toJSON().id}`);

    return {
      message: "Anotação criada com sucesso!",
      success: true,
      anotation: newAnotation,
    };
  }
}

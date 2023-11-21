import { Anotation } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { AnotationRepository } from "../repository";

type DeleteAnotationRequestDTO = {
  userId: string;
  anotationId: string;
};

type DeleteAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation;
};

export class DeleteAnotationUseCase {
  public async execute(
    data: DeleteAnotationRequestDTO
  ): Promise<DeleteAnotationResponseDTO> {
    const { userId, anotationId } = data;

    const anotationRepository = new AnotationRepository();
    const cacheRepository = new CacheRepository();

    const anotationFound = await anotationRepository.getAnotationById(
      anotationId
    );

    if (!anotationFound || anotationFound.userId != userId) {
      return {
        message: "Anotação não encontrada. Tente novamente!",
        success: false,
      };
    }

    await anotationRepository.deleteAnotation(anotationId);
    await cacheRepository.delete(`anotations-user-${userId}`);
    await cacheRepository.delete(`anotation-${anotationId}`);

    return {
      message: "Anotação deletada com sucesso!",
      success: true,
      anotation: anotationFound,
    };
  }
}

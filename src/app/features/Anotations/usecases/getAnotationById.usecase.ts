import { Anotation, AnotationJSON } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { AnotationRepository } from "../repository";

type GetAnotationRequestDTO = {
  userId: string;
  anotationId: string;
};

type GetAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation;
};

export class GetAnotationByIdUseCase {
  public async execute(
    data: GetAnotationRequestDTO
  ): Promise<GetAnotationResponseDTO> {
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

    const anotationCache = await cacheRepository.get<AnotationJSON>(
      `anotation-${anotationId}`
    );

    if (!anotationCache) {
      const anotation = await anotationRepository.getAnotationById(anotationId);

      if (!anotation) {
        return {
          message: "Transação não encontrada.",
          success: false,
        };
      }

      await cacheRepository.set<AnotationJSON>(
        `anotation-${anotationId}`,
        anotation.toJSON()
      );

      return {
        message: "Transação encontrada com sucesso",
        success: true,
        anotation,
      };
    }

    return {
      message: "Transação em cache encontrada com sucesso",
      success: true,
      anotation: anotationFound,
    };
  }
}

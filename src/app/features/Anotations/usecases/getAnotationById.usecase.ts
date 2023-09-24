import { Anotation } from "../../../models";
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

    const anotationFound = await anotationRepository.getAnotationById(
      anotationId
    );

    if (!anotationFound || anotationFound.userId != userId) {
      return {
        message: "Anotação não encontrada. Tente novamente!",
        success: false,
      };
    }

    return {
      message: "Anotação encontrada com sucesso!",
      success: true,
      anotation: anotationFound,
    };
  }
}

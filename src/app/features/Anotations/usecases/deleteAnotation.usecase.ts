import { Anotation } from "../../../models";
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

    return {
      message: "Anotação deletada com sucesso!",
      success: true,
      anotation: anotationFound,
    };
  }
}

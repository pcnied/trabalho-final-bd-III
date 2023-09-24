import { Anotation } from "../../../models";
import { AnotationRepository } from "../repository";

export type UpdateAnotationRequestDTO = {
  userId: string;
  anotationId: string;
  title: string;
  description: string;
  archived?: boolean;
};

export type UpdateAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation | null;
};

export class UpdateAnotationUseCase {
  public async execute(
    data: UpdateAnotationRequestDTO
  ): Promise<UpdateAnotationResponseDTO> {
    const { userId, anotationId, title, description, archived } = data;

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

    const anotationUpdated = await anotationRepository.updateAnotation({
      anotationId,
      title: title ? title : anotationFound.title,
      description: description ? description : anotationFound.description,
      archived: archived != undefined ? archived : anotationFound.archived,
    });

    return {
      message: "Anotação atualizada com sucesso!",
      success: true,
      anotation: anotationUpdated,
    };
  }
}

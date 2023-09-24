import { Anotation } from "../../../models";
import { AnotationRepository } from "../repository";

export type GetAllAnotationsResponseDTO = {
  message: string;
  success: boolean;
  anotations: Anotation[];
};

export class GetAllAnotationsUseCase {
  public async execute(
    userId: string,
    archived: boolean,
    title?: string
  ): Promise<GetAllAnotationsResponseDTO> {
    const anotationRepository = new AnotationRepository();

    const anotations = await anotationRepository.getAllAnotations({
      userId,
      title,
      archived,
    });

    return {
      message:
        anotations.length > 0
          ? "Anotações encontradas com sucesso!"
          : "Nenhuma anotação encontrada!",
      success: true,
      anotations,
    };
  }
}

import { AnotationJSON } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { AnotationRepository } from "../repository";

type GetAllAnotationsDTO = {
  userId: string;
  title?: string;
  archived?: boolean;
};

export type GetAllAnotationsResponseDTO = {
  message: string;
  success: boolean;
  anotations: AnotationJSON[];
};

export class GetAllAnotationsUseCase {
  public async execute(
    data: GetAllAnotationsDTO
  ): Promise<GetAllAnotationsResponseDTO> {
    const { userId, title, archived } = data;

    const anotationRepository = new AnotationRepository();
    const cacheRepository = new CacheRepository();

    const anotationsCache = await cacheRepository.get<AnotationJSON[]>(
      `anotations-user-${userId}`
    );
    let anotations: AnotationJSON[] = [];

    if (!anotationsCache) {
      const mainAnotations = await anotationRepository.getAllAnotations(userId);
      anotations = mainAnotations.map((a) => a.toJSON());

      await cacheRepository.set<AnotationJSON[]>(
        `anotations-user-${userId}`,
        anotations
      );
    } else {
      anotations = anotationsCache;
    }

    if (title) {
      anotations = anotations.filter((t) => t.title === title);
    }

    if (archived) {
      anotations = anotations.filter((t) => t.archived === archived);
    }

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

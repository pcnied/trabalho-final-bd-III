import { UserRepository } from "../repository";

export type RequestCreateDTO = {
  name: string;
  email: string;
  password: string;
};

type ResponseCreateDTO = {
  success: boolean;
  message: string;
  data?: RequestCreateDTO & { id: string };
};

export class CreateUser {
  public async execute(data: RequestCreateDTO): Promise<ResponseCreateDTO> {
    const repository = new UserRepository();

    const userExists = await repository.getByEmail(data.email);

    if (userExists) {
      return {
        message:
          "Não foi possível criar uma conta com o e-mail inserido. Tente novamente!",
        success: false,
      };
    }

    const userCreated = await repository.createUser(data);

    return {
      message: "Conta criada com sucesso!",
      success: true,
      data: userCreated,
    };
  }
}

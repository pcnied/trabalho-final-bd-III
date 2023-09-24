import { UserJSON } from "../../../models";
import { UserRepository } from "../repository";

export type LoginUserDTO = {
  email: string;
  password: string;
};

type ResponseLoginUser = {
  success: boolean;
  message: string;
  id?: UserJSON;
};

export class LoginUser {
  public async execute(data: LoginUserDTO): Promise<ResponseLoginUser> {
    const repository = new UserRepository();

    const searchUser = await repository.findUserByCredencials(data);

    if (!searchUser) {
      return {
        success: false,
        message: "Não foi possível realizar o Login com os dados informados.",
      };
    }

    return {
      success: true,
      message: "Login efetuado com sucesso!",
      id: searchUser,
    };
  }
}

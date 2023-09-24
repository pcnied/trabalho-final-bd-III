import { DatabaseConnection } from "../../../../main/database";
import { User, UserJSON } from "../../../models";
import { UserEntity } from "../../../shared/database/entities";
import { RequestCreateDTO } from "../usecases/createUser.usecase";
import { LoginUserDTO } from "../usecases/loginUser.usecase";

export class UserRepository {
  constructor(private _manager = DatabaseConnection.connection.manager) {}

  public async createUser(data: RequestCreateDTO): Promise<UserJSON> {
    const { name, email, password } = data;

    const newUser = this._manager.create(UserEntity, { name, email, password });
    const userCreated = await this._manager.save(newUser);

    return userCreated;
  }

  // public async listUsers(email: string) {
  //   const manager = pgHelper.client.manager;
  //   const userFound = await manager.find(UserEntity, {
  //     where: {
  //       email,
  //     },
  //   });
  // }

  public async findUserByCredencials(
    data: LoginUserDTO
  ): Promise<UserJSON | undefined> {
    const { email, password } = data;
    const userFound = await this._manager.findOneBy(UserEntity, {
      email,
      password,
    });

    if (!userFound) return undefined;

    return userFound;
  }

  public async getById(userId: string): Promise<User | undefined> {
    const userFound = await this._manager.findOneBy(UserEntity, { id: userId });

    if (!userFound) return undefined;

    return this.entityToModel(userFound);
  }

  public async getByEmail(email: string): Promise<boolean> {
    const userFound = await this._manager.findOneBy(UserEntity, { email });

    return !!userFound;
  }

  private entityToModel(dataDB: UserEntity): User {
    return new User(dataDB.id, dataDB.name, dataDB.email, dataDB.password);
  }
}

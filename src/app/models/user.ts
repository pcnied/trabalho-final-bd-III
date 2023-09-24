import { BaseClass } from "./baseClass";

export type UserJSON = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class User extends BaseClass {
  constructor(
    id: string,
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    super(id);
  }

  public toJSON(): UserJSON {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
    };
  }
}

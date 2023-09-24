export abstract class BaseClass {
  protected _id: string;

  constructor(id: string) {
    this._id = id;
  }

  toJSON() {}
}

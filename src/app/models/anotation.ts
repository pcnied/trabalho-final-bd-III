import { BaseClass } from "./baseClass";

type AnotationJSON = {
  userId: string;
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  archived: boolean;
};

export class Anotation extends BaseClass {
  private _userId: string;
  private _title: string;
  private _description: string;
  private _createdAt: Date;
  private _archived: boolean;

  constructor(
    userId: string,
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    archived: boolean
  ) {
    super(id);
    this._userId = userId;
    this._title = title;
    this._description = description;
    this._createdAt = createdAt;
    this._archived = archived;
  }

  get userId(): string {
    return this._userId;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get archived(): boolean {
    return this._archived;
  }

  public toJSON(): AnotationJSON {
    return {
      userId: this._userId,
      id: this._id,
      title: this._title,
      description: this._description,
      createdAt: this._createdAt,
      archived: this._archived,
    };
  }
}

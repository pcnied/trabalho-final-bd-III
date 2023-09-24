import { BaseClass } from "./baseClass";

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

  set userId(userId: string) {
    this._userId = userId;
  }

  set id(id: string) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set archived(archived: boolean) {
    this._archived = archived;
  }
}

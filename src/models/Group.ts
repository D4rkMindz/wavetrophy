import { IGroup } from "./interfaces/IGroup";

export class Group implements IGroup {
  /**
   * Group constructor
   * @param hash
   * @param name
   */
  public constructor(hash: string, name: string) {
    this._hash = hash;
    this._name = name;
  }

  /**
   * Hash of the group
   */
  private _hash: string;

  get hash(): string {
    return this._hash;
  }

  /**
   * Name of the group
   */
  private _name: string;

  get name(): string {
    return this._name;
  }
}

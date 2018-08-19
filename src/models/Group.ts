import {IGroup} from "./interfaces/IGroup";

export class Group implements IGroup {
  /**
   * Hash of the group
   */
  private _hash: string;
  /**
   * Name of the group
   */
  private _name: string;

  /**
   * Group constructor
   * @param hash
   * @param name
   */
  public constructor(hash: string, name: string) {
    this._hash = hash;
    this._name = name;
  }

  get hash(): string {
    return this._hash;
  }

  get name(): string {
    return this._name;
  }
}

import {IContact} from "./interfaces/IContact";

export class Contact implements IContact {
  /**
   * The name of the contact
   */
  private _name: string;

  /**
   * The position in the WAVETROHPY of the contact
   */
  private _position: string;

  /**
   * The phone number of the contact
   */
  private _phonenumber: string;

  /**
   * The email address of the contact (is optional, but required in this interface)
   */
  private _email: string;

  /**
   * Contact constructor
   * @param {string} name
   * @param {string} position
   * @param {string} phonenumber
   * @param {string} email
   */
  constructor(name: string, position: string, phonenumber: string, email?:string) {
    this._name = name;
    this._position = position;
    this._phonenumber = phonenumber;
    this._email = email;
  }

  get email(): string {
    return this._email;
  }

  get phonenumber(): string {
    return this._phonenumber;
  }

  get position(): string {
    return this._position;
  }

  get name(): string {
    return this._name;
  }
}

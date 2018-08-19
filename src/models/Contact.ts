import {IContact} from "./interfaces/IContact";

/**
 * Class Contact
 */
export class Contact implements IContact {
  /**
   * The first title of the contact
   */
  private _first_name: string;
  /**
   * The last title of the contact
   */
  private _last_name: string;

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
   * @param firstName
   * @param lastName
   * @param {string} position
   * @param {string} phonenumber
   * @param {string} email
   */
  constructor(firstName: string, lastName: string, position: string, phonenumber: string, email?:string) {
    this._first_name = firstName;
    this._last_name = lastName;
    this._position = position;
    this._phonenumber = phonenumber;
    this._email = email;
  }

  get position(): string {
    return this._position;
  }

  get phonenumber(): string {
    return this._phonenumber;
  }

  get last_name() : string {
    return this._last_name;
  }

  get first_name(): string {
    return this._first_name;
  }

  get email(): string {
    return this._email;
  }
}

import { IContact } from "./interfaces/IContact";

/**
 * Class Contact
 */
export class Contact implements IContact {
  /**
   * Contact constructor
   * @param firstName
   * @param lastName
   * @param {string} position
   * @param {string} phonenumber
   * @param {string} email
   */
  constructor(firstName: string, lastName: string, position: string, phonenumber: string, email?: string) {
    this._first_name = firstName;
    this._last_name = lastName;
    this._position = position;
    this._phonenumber = phonenumber;
    this._email = email;
  }

  /**
   * The first title of the contact
   */
  private _first_name: string;

  get first_name(): string {
    return this._first_name;
  }

  /**
   * The last title of the contact
   */
  private _last_name: string;

  get last_name(): string {
    return this._last_name;
  }

  /**
   * The position in the WAVETROHPY of the contact
   */
  private _position: string;

  get position(): string {
    return this._position;
  }

  /**
   * The phone number of the contact
   */
  private _phonenumber: string;

  get phonenumber(): string {
    return this._phonenumber;
  }

  /**
   * The email address of the contact (is optional, but required in this interface)
   */
  private _email: string;

  get email(): string {
    return this._email;
  }
}

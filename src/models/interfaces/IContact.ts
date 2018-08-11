export interface IContact {
  /**
   * The name of the contact
   */
  name: string;

  /**
   * The position in the WAVETROHPY of the contact
   */
  position: string;

  /**
   * The phone number of the contact
   */
  phonenumber: string;

  /**
   * The email address of the contact (is optional, but required in this interface)
   */
  email: string;
}

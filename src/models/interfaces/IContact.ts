export interface IContact {
  /**
   * The position in the WAVETROHPY of the contact
   */
  position: string;

  /**
   * The phone number of the contact
   */
  phonenumber: string;
  /**
   * The first title of the contact
   */
  first_name: string;

  /**
   * The last title of the contact
   */
  last_name: string;

  /**
   * The email address of the contact (is optional, but required in this interface)
   */
  email: string;
}

/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name: RegExp = /^(?!.*\d)\S[a-zA-Z\u0600-\u06FF\s]{5,44}$/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

export const nationalId: RegExp = /^(1|2)([0-9]{9})$/;

export const phoneNumber: RegExp = /^(5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const code: RegExp = /^([0-9]{6})$/;

export const price: RegExp =
  /^((?=.*[1-9]|0)(?:\d{2,5}))((?=.*\d)(?:\.\d{3})?)*((?=.*\d)(?:,\d\d){1}?){0,1}/;

export const linkedin: RegExp = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/;

export const github: RegExp =
  /(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_]{3,18}(\?(\w+=\w+&?)*)?/;

// Regex for credit cards visa and mastercard only
export const cardNumber: RegExp = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
export const cardHolderName: RegExp =
  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const cardExpiryDate: RegExp = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
export const cardCvv: RegExp = /^[0-9]{3}$/;

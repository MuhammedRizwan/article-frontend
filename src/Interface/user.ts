export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date | undefined;
  password: string;
  confirmPassword: string;
  articlePreferences: string[];
};
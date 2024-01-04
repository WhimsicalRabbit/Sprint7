export class FailedCheck extends Error {
  constructor() {
    super(`The user or the password is incorrect, please try again`);
  }
}

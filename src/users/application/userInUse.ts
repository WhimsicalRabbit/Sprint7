export class userInUse extends Error {
  constructor() {
    super(`This user already exists, please try another one`);
  }
}

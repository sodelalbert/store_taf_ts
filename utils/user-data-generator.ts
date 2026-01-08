import faker from 'faker';

export class UserDataGenerator {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;

  readonly invalidEmail: string;

  constructor() {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.email = faker.internet.email();
    this.password = faker.internet.password(12);

    this.invalidEmail = faker.lorem.word();
  }
}

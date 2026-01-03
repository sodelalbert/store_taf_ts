import { faker } from "@faker-js/faker";

export class UserGenerator {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;

  readonly invalidEmail: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = faker.internet.password({ length: 12 });

    this.invalidEmail = faker.lorem.word();
  }
}

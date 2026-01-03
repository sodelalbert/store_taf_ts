import { faker } from "@faker-js/faker";

export class UserGenerator {
  public static generateFirstName(): string {
    return faker.person.firstName();
  }

  public static generateLastName(): string {
    return faker.person.lastName();
  }

  public static generateEmail(): string {
    return faker.internet.email();
  }
  public static generateInvalidEmail(): string {
    return faker.string.alphanumeric(10);
  }

  public static generatePassword(): string {
    return faker.internet.password({ length: 12 });
  }
}

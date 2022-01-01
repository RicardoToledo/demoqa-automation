import generator from 'generate-password';
import faker from 'faker';

class UserGenerator {
    constructor() {
    }

    generateRegisterUser(passwordLength) {
        const randomPassword = generator.generate({
            length: passwordLength,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true // password must include at least one character from each pool.
        });
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            userName: faker.internet.userName(),
            password: randomPassword
        }
    }

    generateLoginUser() {
        return {
            userName: faker.internet.userName(),
            password: generator.generate()
        }
    }

    generateFormStudent() {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            mobileNumber: faker.phone.phoneNumberFormat().replace(/-/g, ""),
            birthDate: faker.date.past(99).toLocaleDateString("en-GB"),
            address: faker.address.streetAddress()
        }
    }
}

export default new UserGenerator();
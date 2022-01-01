import bookstore from '../../pages/bookStorePage.js';
import userGenerator from '../../helpers/userGenerator.js';
import { URL } from '../../data/constants';

fixture `Book Store Application: Register user`
    .page`${URL.PRODUCTION}/register`;

/** This test will run a couple of times until it fails due to reCAPTCHA,
 * this is expected as it is outside the capabilities of most automation tools.
 * You can run the test by deleting '.skip'
 */
test.skip('Succesfully register valid user using reCAPTCHA', async () => {
    const passwordLength = 8;
    const registerValidUser = userGenerator.generateRegisterUser(passwordLength);
    const userType = 'validUser';
    await bookstore.registerUser(registerValidUser, userType);
});

/**
 * We can have a test for each incorrect password scenario
 * This test will also run a couple of times until it fails due to reCAPTCHA.
 * You can run the test by deleting '.skip'
 */
test.skip('Attempt to register user using reCAPTCHA and invalid password (pasword length < 8)', async () => {
    const passwordLength = 7;
    const registerInvalidUser = userGenerator.generateRegisterUser(passwordLength);
    const userType = 'invalidUserPassword';
    await bookstore.registerUser(registerInvalidUser, userType);
});

test ('Attempt to register valid user without reCAPTCHA', async () => {
    const passwordLength = 8;
    const registerValidUser = userGenerator.generateRegisterUser(passwordLength);
    const userType = 'invalidUserRecaptcha';
    await bookstore.registerUser(registerValidUser, userType);
});

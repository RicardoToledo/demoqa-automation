import bookstore from '../../pages/bookStorePage.js';
import userGenerator from '../../helpers/userGenerator.js';
import { CREDENTIALS } from '../../data/constants';

fixture `Book Store Application: Login`

test.after(async () => {
    await bookstore.logout();
})('Successfully login with registered user and logout', async t => {
    await t.expect(await bookstore.submitLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)).ok()
});

test('Attempt to login with unregistered user', async t => {    
    const { userName, password } = userGenerator.generateLoginUser();    
    await t.expect(await bookstore.submitLogin(userName, password)).notOk();
});
import bookstore from '../../pages/bookStorePage.js';
import { CREDENTIALS, URL } from '../../data/constants';
import { randomNumber } from '../../helpers/utils';

fixture `Book Store Application: Adding books`
    .disablePageCaching
    .beforeEach(async t => {
        await bookstore.submitLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
        await t.navigateTo(`${URL.PRODUCTION}/books`);
    })
    .afterEach(async () => {
        await bookstore.deleteAllBooks();
        await bookstore.logout();
    });

test("Successfully add 1 random book to user's collection and remove all books from it", async () => {
    const randomIndex = randomNumber(await bookstore.booksList.count);// Random book's index from all displayed books list
    await bookstore.addBook(randomIndex);
});

test("Successfully add all books to user's collection and remove them from it", async () => {
    await bookstore.addAllBooks();
});
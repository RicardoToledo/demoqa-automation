import bookstore from '../../pages/bookStorePage.js';
import { URL } from '../../data/constants';
import { randomNumber } from '../../helpers/utils';

fixture `Book Store Application: Search book`
    .page`${URL.PRODUCTION}/books`;

test ('Successfully shows correct random book using incomplete name (first two words of title) in searchbar', async () => {
    const randomIndex = randomNumber(await bookstore.booksList.count);
    await bookstore.searchRandomBook(randomIndex);
});

test ('Successfully shows no book using word not related no any book title in searchbar', async t => {
    await t
        .expect(bookstore.searchBar.exists).ok()
        .typeText(bookstore.searchBar, 'apple')
        .expect(bookstore.emptyRowsMessage.exists).ok();
});
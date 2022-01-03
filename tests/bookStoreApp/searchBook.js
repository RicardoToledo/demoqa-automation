import bookstore from '../../pages/bookStorePage.js';
import { URL } from '../../data/constants';
import { randomNumber } from '../../helpers/utils';

fixture `Book Store Application: Search book`
    .page`${URL.PRODUCTION}/books`;

/**
 * These two tests are designed for this specific/no real webpage
 * In a real case scenario we would need to control the environment
 * to assure the displayed list of books on the site (setup and cleaning)
 */ 
test ('Successfully shows correct random book using incomplete name (first two words of title) in searchbar', async () => {
    const randomIndex = randomNumber(await bookstore.booksList.count);
    await bookstore.searchRandomBook(randomIndex);
});

// For example always assuring there's no book with the name use it in this case
test ('Successfully shows no book using word not related no any book title in searchbar', async t => {
    await t
        .expect(bookstore.searchBar.exists).ok()
        .typeText(bookstore.searchBar, 'apple')
        .expect(bookstore.emptyRowsMessage.exists).ok();
});
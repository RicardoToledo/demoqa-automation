import homepage from '../../pages/homePage.js';
import { URL } from '../../data/constants'

fixture `Home page: Verification of elements`
    .page`${URL.PRODUCTION}`;

test('All home page elements correctly load', async () => {
    await homepage.elementsLoadVerification();
});

test('Header and Banner links/href properties point to the correct url', async t => {
    await t
        .expect(homepage.headerLogo.getAttribute('href')).contains(`${URL.PRODUCTION}`)
        .expect(homepage.banner.getAttribute('href')).contains('https://www.toolsqa.com/selenium-training/');
});

test('All category cards successfully redirect to each respective page', async () => {
    await homepage.cardsRedirection();
});
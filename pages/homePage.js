import { Selector, t } from "testcafe";
import elements from './elementsPage.js';
import { goBackToPreviousPage } from "../helpers/utils";

class CategoryCard {
    constructor(titleText) {
        this.titleText = titleText;
        this.selectorElement = Selector(".card-body").withText(titleText);
    }
}

class HomePage {
    constructor() {
        this.headerLogo = Selector('header a');
        this.banner = Selector('div.home-banner a');
        this.categoryCardList = [
            new CategoryCard('Elements'),
            new CategoryCard('Forms'),
            new CategoryCard('Alerts, Frame & Windows'),
            new CategoryCard('Widgets'),
            new CategoryCard('Interactions'),
            new CategoryCard('Book Store')
        ];
    }

    async elementsLoadVerification() {
        await t
            .expect(this.headerLogo.exists).ok()
            .expect(this.banner.exists).ok()
        for (const card of this.categoryCardList) {
            await t.expect(card.selectorElement.exists).ok();
        }
    }

    async cardsRedirection() {
        for (const categoryCard of this.categoryCardList) {
            await t
                .expect(categoryCard.selectorElement.exists).ok()
                .click(categoryCard.selectorElement)
                .expect(elements.headerTitle.textContent).contains(categoryCard.titleText);
            await goBackToPreviousPage();
        }
    }

}

export default new HomePage();
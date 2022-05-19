import { Selector, t } from 'testcafe';
import { URL } from '../data/constants';
import { USER_TYPE } from '../data/enums';

class Bookstore {
    constructor() {
        // Register user
        this.registerFormHeader = Selector('h4').withText('Register to Book Store');
        this.firstNameInput = Selector('#firstname');
        this.lastNameInput = Selector('#lastname');
        this.userNameInput = Selector('#userName');
        this.passwordInput = Selector('#password');
        this.recaptchaIframe = Selector('iframe').withAttribute('title', 'reCAPTCHA');
        this.recaptchaLabel = Selector('label#recaptcha-anchor-label');
        this.registerButton = Selector('#register');
        this.missingRecaptchaMessage = Selector('#name').withText('Please verify reCaptcha to register!');
        this.invalidPasswordMessage = Selector('#name').withText('Passwords must have at least one non alphanumeric character, one digit');

        // Login
        this.loginHeader = Selector('h5').withText('Login in Book Store');
        this.loginButton = Selector('#login');
        this.loadingLoginLabel = Selector('#loading-label')
        this.logoutButton = Selector('#submit').withText("Log out");
        this.invalidUserMessage = Selector('#name').withText('Invalid username or password!');

        // Profile
        this.profileHeader = Selector('.main-header').withText('Profile');
        this.deleteAllBooksButton = Selector('#submit').withText('Delete All Books').filterVisible();
        this.closeModalButton = Selector('#closeSmallModal-ok');
        this.goToBookStoreButton = Selector('#gotoStore');

        // Bookstore
        this.bookStoreHeader = Selector('.main-header').withText('Book Store');
        this.searchBar = Selector('#searchBox');
        this.booksList = Selector('.action-buttons a');// List of all books titles containing their respective links
        this.searchBar = Selector('#searchBox');
        this.gitBookLink = Selector('a').withText('Git Pocket Guide');

        // Individual book page
        this.bookTitleLabel = Selector('#userName-value');// .withText() is added during execution to specify title
        this.addBookButton = Selector('#addNewRecordButton').withText('Add To Your Collection');
        this.closeAdArrow = Selector('#close-fixedban');

        // Recycled, used in more than one page
        this.emptyRowsMessage = Selector('.rt-noData').withText('No rows found');
    }

    /**
     * Fills form for new user registration,
     * handles reCAPTCHA, submits the user,
     * and manage different user type scenarios
     * @param {*} user 
     * @param {*} userType 
     */
    async registerUser(user, userType) {
        await t
            .expect(this.registerFormHeader.exists).ok()
            .expect(this.firstNameInput.exists).ok()
            .typeText(this.firstNameInput, user.firstName, { paste: true })
            .expect(this.lastNameInput.exists).ok()
            .typeText(this.lastNameInput, user.lastName, { paste: true })
            .expect(this.userNameInput.exists).ok()
            .typeText(this.userNameInput, user.userName, { paste: true })
            .expect(this.passwordInput.exists).ok()
            .typeText(this.passwordInput, user.password, { paste: true })
        if (userType !== USER_TYPE.INVALID_RECAPTCHA)
            this.recaptchaHandler();
        await t
            .expect(this.registerButton.exists).ok()
            .setNativeDialogHandler(() => true)
            .click(this.registerButton);
        switch (userType) {
            case USER_TYPE.VALID:
                const history = await t.getNativeDialogHistory();
                await t.expect(history[0].text).eql('User Register Successfully.')
                break
            case USER_TYPE.INVALID_PASSWORD:
                await t.expect(this.invalidPasswordMessage.exists).ok()
                break
            case USER_TYPE.INVALID_RECAPTCHA:
                await t.expect(this.missingRecaptchaMessage.exists).ok()
                break
            default:
                console.warn('unsupported user type: ' + userType)
                break;
        }
    }

    async recaptchaHandler() {
        await t
            .expect(this.recaptchaIframe.exists).ok()
            .switchToIframe(this.recaptchaIframe)
            .expect(this.recaptchaLabel.exists).ok()
            .click(this.recaptchaLabel)
            .switchToMainWindow()
    }

    /**
     * Login function
     * @param {*} username 
     * @param {*} password 
     * @returns true if login is succesful, false if user is not valid
     */
    async submitLogin(username, password) {
        const loginPage = `${URL.PRODUCTION}/login`;
        await t
            .navigateTo(loginPage)
            .expect(this.loginHeader.exists).ok()
            .expect(this.userNameInput.exists).ok()
            .typeText(this.userNameInput, username, { paste: true })
            .expect(this.passwordInput.exists).ok()
            .typeText(this.passwordInput, password, { paste: true })
            .expect(this.loginButton.exists).ok()
            .click(this.loginButton)
        if (await this.loadingLoginLabel.exists) {
            await t.expect(this.profileHeader.exists).ok()
            return true;
        }
        else if (await this.invalidUserMessage.exists)
            return false;
    }

    async logout() {
        await t
            .expect(this.logoutButton.exists).ok()
            .click(this.logoutButton)
            .expect(this.loginHeader.exists).ok();
    }

    /**
     * function to add book by index
     * @param {*} index 
     */
    async addBook(index) {
        const bookFromList = this.booksList.nth(index);
        const bookName = await bookFromList.innerText;
        await t
            .expect(await bookFromList.visible).ok()
            .expect(this.closeAdArrow.visible).ok()// Closing the add at the bottom of the page
            .click(this.closeAdArrow)// TODO: create a closeAddIfExists function for excalability
            .click(bookFromList, { offsetX: 1, offsetY: 1 })
            .expect(this.bookTitleLabel.withText(bookName).innerText).eql(bookName)// Book showing in individual page = Book extracted from list
            .setNativeDialogHandler(() => true)
            .expect(this.closeAdArrow.visible).ok()
            .click(this.closeAdArrow)
            .expect(this.addBookButton.exists).ok()
            .click(this.addBookButton)
            .navigateTo(`${URL.PRODUCTION}/profile`)
            .expect(await bookFromList.exists).ok();
    }

    async addAllBooks() {
        const numberOfBooks = await this.booksList.count;
        for (let index = 0; index < numberOfBooks; index++) {
            await this.addBook(index);
            await t.click(this.goToBookStoreButton)
        }
    }

    async deleteAllBooks() {
        await t
            .navigateTo(`${URL.PRODUCTION}/profile`)
            .expect(this.deleteAllBooksButton.visible).ok()
            .click(this.deleteAllBooksButton)
            .setNativeDialogHandler(() => true)
            .click(this.closeModalButton)
            .expect(this.emptyRowsMessage.exists).ok();
    }

    async searchRandomBook(index) {
        const bookFromList = this.booksList.nth(index);
        const bookName = await bookFromList.innerText;
        const shortedName = `${bookName.split(" ")[0]} ${bookName.split(" ")[1]}`;
        await t
            .expect(this.searchBar.exists).ok()
            .typeText(this.searchBar, shortedName)
            .expect(await bookFromList.exists).ok();
    }
}

export default new Bookstore();
import { Selector, t } from "testcafe";
import userGenerator from '../helpers/userGenerator.js';

class Forms {
    constructor() {
        this.validStudent = userGenerator.generateFormStudent();// TODO: esta bien aqui?
        
        // Form Selectors
        this.firstNameInput = Selector('#firstName');
        this.lastNameInput = Selector('#lastName');
        this.emailInput = Selector('#userEmail');
        this.genderMaleRadioLabel = Selector('label').withText('Male');// Using label instead of radio input tag as it's faster
        this.mobileNumberInput = Selector('#userNumber');
        this.dateOfBirthInput = Selector('#dateOfBirthInput');
        this.subjectsInput = Selector('#subjectsInput');
        this.subjectsSuggestionInput = Selector('#subjectsContainer div').withText('History');
        this.hobbiesReadingCheckbox = Selector('label').withText('Reading');
        this.pictureUploadButton = Selector('#uploadPicture');
        this.currentAddressTextArea = Selector('#currentAddress');

        this.stateDropdown = Selector('#stateCity-wrapper').child(1);
        this.cityDropdown = Selector('#stateCity-wrapper').child(2);
        // this.stateDropdown = Selector('#state div').withText('Select State');
        // this.cityDropdown = Selector('#city div').withText('Select City');
        // TODO

        this.submitFormButton = Selector('#submit');

        // Modal
        this.titleModal = Selector('.modal-title').withText('Thanks for submitting the form');
        this.closeModal = Selector('#closeLargeModal');

        // Recycled
        this.closeAdArrow = Selector('#close-fixedban');

    }

    async fillName() {
        await t
            .expect(this.firstNameInput.exists).ok()
            .typeText(this.firstNameInput, this.validStudent.firstName, { paste: true })
            .expect(this.lastNameInput.exists).ok()
            .typeText(this.lastNameInput, this.validStudent.lastName, { paste: true })
    }

    async fillEmail() {
        await t
            .expect(this.emailInput.exists).ok()
            .typeText(this.emailInput, this.validStudent.email, { paste: true })
    }

    async selectGender() {
        await t
            .expect(this.genderMaleRadioLabel.exists).ok()
            .click(this.genderMaleRadioLabel)
    }

    async fillMobileNumber() {
        await t
            .expect(this.mobileNumberInput.exists).ok()
            .typeText(this.mobileNumberInput, this.validStudent.mobileNumber, { paste: true })
    }

    async fillDateOfBirth() {
        await t
            .expect(this.dateOfBirthInput.exists).ok()
            .typeText(this.dateOfBirthInput, this.validStudent.birthDate, { replace: true })
            .pressKey('enter')
    }

    async fillSubject() {
        await t
            .expect(this.subjectsInput.exists).ok()
            .typeText(this.subjectsInput, 'Histor')
            .click(this.subjectsSuggestionInput)
            .expect(this.subjectsSuggestionInput.exists).ok()
    }

    async selectHobbie() {
        await t
            .expect(this.hobbiesReadingCheckbox.exists).ok()
            .click(this.hobbiesReadingCheckbox)

    }

    async uploadPicture() {
        await t
            .expect(this.pictureUploadButton.exists).ok()
            .setFilesToUpload(this.pictureUploadButton, '../mocks/example-image.jpeg')
    }

    async fillCurrentAddress() {
        await t
            .expect(this.currentAddressTextArea.exists).ok()
            .typeText(this.currentAddressTextArea, this.validStudent.address)
    }

    // Selects state and city (using keys press approach)
    async selectStateAndCity() {
        await t
            .expect(this.stateDropdown.exists).ok()
            .expect(this.cityDropdown.exists).ok()
            .click(this.stateDropdown)
            .pressKey('down enter')
            .click(this.cityDropdown)
            .pressKey('down down enter')
    }

    async submitForm() {
        await t
            .expect(this.submitFormButton.exists).ok()
            .click(this.submitFormButton)
            .expect(this.titleModal.exists).ok()
            .expect(this.closeAdArrow.visible).ok()
            .click(this.closeAdArrow)
            .expect(this.closeModal.exists).ok()
            .click(this.closeModal);
    }

}

export default new Forms();
import { Selector, t } from "testcafe";

class Forms {
    constructor() {        
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
        this.stateDropdown = Selector('#state div').withText('Select State');
        this.cityDropdown = Selector('#city div').withText('Select City');
        this.submitFormButton = Selector('#submit');

        // Modal
        this.titleModal = Selector('.modal-title').withText('Thanks for submitting the form');
        this.closeModal = Selector('#closeLargeModal');

        // Recycled
        this.closeAdArrow = Selector('#close-fixedban');
    }
    
    async fillForm(student) {
        await this.fillName(student.firstName, student.lastName);
        await this.fillEmail(student.email);
        await this.selectMaleGender();
        await this.fillMobileNumber(student.mobileNumber);
        await this.fillDateOfBirth(student.birthDate);
        await this.fillHistorySubject();
        await this.selectReadingHobbie();
        await this.uploadPicture();
        await this.fillCurrentAddress(student.address);
        await this.selectStateAndCity();
        await this.submitForm();
    }

    async fillName(firstName, lastName) {
        await t
            .expect(this.firstNameInput.exists).ok()
            .typeText(this.firstNameInput, firstName, { paste: true })
            .expect(this.lastNameInput.exists).ok()
            .typeText(this.lastNameInput, lastName, { paste: true })
    }

    async fillEmail(email) {
        await t
            .expect(this.emailInput.exists).ok()
            .typeText(this.emailInput, email, { paste: true })
    }

    async selectMaleGender() {
        await t
            .expect(this.genderMaleRadioLabel.exists).ok()
            .click(this.genderMaleRadioLabel)
    }

    async fillMobileNumber(mobileNumber) {
        await t
            .expect(this.mobileNumberInput.exists).ok()
            .typeText(this.mobileNumberInput, mobileNumber, { paste: true })
    }

    async fillDateOfBirth(birthDate) {
        await t
            .expect(this.dateOfBirthInput.exists).ok()
            .typeText(this.dateOfBirthInput, birthDate, { replace: true })
            .pressKey('enter')
    }

    async fillHistorySubject() {
        await t
            .expect(this.subjectsInput.exists).ok()
            .typeText(this.subjectsInput, 'Histor')
            .click(this.subjectsSuggestionInput)
            .expect(this.subjectsSuggestionInput.exists).ok()
    }

    async selectReadingHobbie() {
        await t
            .expect(this.hobbiesReadingCheckbox.exists).ok()
            .click(this.hobbiesReadingCheckbox)
    }

    async uploadPicture() {
        await t
            .expect(this.pictureUploadButton.exists).ok()
            .setFilesToUpload(this.pictureUploadButton, '../mocks/example-image.jpeg')
    }

    async fillCurrentAddress(address) {
        await t
            .expect(this.currentAddressTextArea.exists).ok()
            .typeText(this.currentAddressTextArea, address)
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
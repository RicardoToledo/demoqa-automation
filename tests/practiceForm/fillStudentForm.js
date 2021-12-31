import { URL } from '../../data/constants';
import forms from '../../pages/formsPage';

fixture `Practice Form: Student registration form filling`
    .page`${URL.PRODUCTION}/automation-practice-form`;

test ('Succesfully register a student with random data', async () => {
    await forms.fillName();
    await forms.fillEmail();
    await forms.selectGender();
    await forms.fillMobileNumber();
    await forms.fillDateOfBirth();
    await forms.fillSubject();
    await forms.selectHobbie();
    await forms.uploadPicture();
    await forms.fillCurrentAddress();
    await forms.selectStateAndCity();
    await forms.submitForm();
});
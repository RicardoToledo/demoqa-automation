import { URL } from '../../data/constants';
import forms from '../../pages/formsPage';
import userGenerator from '../../helpers/userGenerator.js';

fixture `Practice Form: Student registration form filling`
    .page`${URL.PRODUCTION}/automation-practice-form`;

test ('Succesfully register a valid student with random data', async () => {
    const validStudent = userGenerator.generateFormStudent();
    await forms.fillForm(validStudent);
});
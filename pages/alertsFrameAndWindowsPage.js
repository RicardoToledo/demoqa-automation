import { Selector, t } from "testcafe";

class Alerts{
    constructor(){
        this.alertButton = Selector('#alertButton');
        this.timerAlertButton = Selector('#timerAlertButton');
        this.confirmAlertButton = Selector('#confirmButton');
        this.confirmAlertResultText = Selector('#confirmResult');
        this.promptAlertButton = Selector('#promtButton');
        this.promptAlertResultText = Selector('#promptResult');
    }

    async openAlertHandler() {
    await t.setNativeDialogHandler((type, text) =>  {
        switch (type) {
            case 'alert':
                return true;
            case 'confirm':
                switch (text) {
                    case 'Do you confirm action?':
                        return false;
                    default:
                        throw 'Unexpected confirm dialog!';
                }
            case 'prompt':
                return 'Ricardo';
        }
        }) 
    }

    async triggerAlert() {
        this.openAlertHandler();
        await t
            .expect(this.alertButton.exists).ok()
            .click(this.alertButton)
        const history = await t.getNativeDialogHistory();
        await t.expect(history[0].text).eql('You clicked a button');
    }

    async triggerTimedAlert() {
        this.openAlertHandler();
        await t
            .expect(this.timerAlertButton.exists).ok()
            .click(this.timerAlertButton)
            .wait(6000) // This alert only shows it's native dialogue 5 seconds after click
        const history = await t.getNativeDialogHistory();
        await t.expect(history[0].text).eql('This alert appeared after 5 seconds');
    }

    async triggerConfirmAlert() {
        this.openAlertHandler();
        await t
            .expect(this.confirmAlertButton.exists).ok()
            .click(this.confirmAlertButton)
        const history = await t.getNativeDialogHistory();
        await t
            .expect(history[0].text).eql('Do you confirm action?')
            .expect(this.confirmAlertResultText.innerText).eql('You selected Cancel');
    }

    async triggerPromptAlert() {
        this.openAlertHandler();
        await t
            .expect(this.promptAlertButton.exists).ok()
            .click(this.promptAlertButton)
        const history = await t.getNativeDialogHistory();
        await t
            .expect(history[0].text).eql('Please enter your name')
            .expect(this.promptAlertResultText.innerText).contains('You entered Ricardo');
    }
}

export default new Alerts();
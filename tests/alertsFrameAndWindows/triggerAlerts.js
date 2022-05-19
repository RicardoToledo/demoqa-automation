import alerts from '../../pages/alertsFrameAndWindowsPage.js'
import { URL } from '../../data/constants.js'

fixture `Alerts: Check correct handle of alerts`
    .page`${URL.PRODUCTION}/alerts`
    .afterEach(async t => await t.setNativeDialogHandler(null));// Closing handler

test('Successfully trigger and handle standard alert', async () => {
    await alerts.triggerAlert();
});

test('Successfully trigger and handle 5 secods timed standard alert', async () => {
    await alerts.triggerTimedAlert();
});

test('Successfully trigger and handle confirmation alert', async () => {
    await alerts.triggerConfirmAlert();
});

test('Successfully trigger prompt alert and introduce random name', async () => {
    await alerts.triggerPromptAlert();
});
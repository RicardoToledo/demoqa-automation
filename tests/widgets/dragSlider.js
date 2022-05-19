import widgets from '../../pages/widgetsPage';
import { URL } from '../../data/constants'
import { randomNumber } from '../../helpers/utils';

fixture `Widgets: Interaction with widgets`
    .page `${URL.PRODUCTION}/slider`;

test('Succesfully drag slider from default to random value (0-100)', async t => {
    const newValue = randomNumber(101).toString();
    await t
        .expect(widgets.sliderInput.exists).ok()
        .expect(widgets.sliderInput.value).eql('25')// Default starting value
    await widgets.dragSliderTo(newValue);
});
import { Selector, t } from 'testcafe';
import { randomNumber } from '../helpers/utils';

class Widgets {
    constructor() {
        this.sliderInput = Selector('input.range-slider');
    }

    // Using workaround due testcafe's lack of support of '<input type="range>"' Html5 element
    async dragSlider() {
        const newValue = randomNumber(101).toString();
        await t
            .expect(this.sliderInput.exists).ok()
            .expect(this.sliderInput.value).eql('25')// Default value
            .typeText(this.sliderInput, newValue)
            .expect(this.sliderInput.value).eql(newValue);
    }
}

export default new Widgets();
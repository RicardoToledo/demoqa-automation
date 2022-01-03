import { Selector, t } from 'testcafe';

class Widgets {
    constructor() {
        this.sliderInput = Selector('input.range-slider');
    }

    // Using .typeText as workaround due testcafe's lack of support of '<input type="range>"' Html5 element
    async dragSliderTo(value) {
        await t
            .typeText(this.sliderInput, value)
            .expect(this.sliderInput.value).eql(value);
    }
}

export default new Widgets();
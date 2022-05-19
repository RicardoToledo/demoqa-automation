import { Selector } from 'testcafe';

class Elements {
    constructor() {
        this.headerTitle = Selector('div.main-header');
        /**
         * The tag 'img' with it's 'src' attribute could be used too but
         * I wanted to be sure that the image after the correct text was being selected
         * (as it's how the UI is organized, text describing image -> image)
         */
        this.validImgSrcAttribute = '/images/Toolsqa.jpg';
        this.validImage = Selector('div p').withText('Valid image').nextSibling('img').withAttribute('src', this.validImgSrcAttribute);
        this.brokenImgSrcAttribute = '/images/Toolsqa_1.jpg';
        this.brokenImage = Selector('div p').withText('Broken image').nextSibling('img').withAttribute('src', this.brokenImgSrcAttribute);
    }
}

export default new Elements();
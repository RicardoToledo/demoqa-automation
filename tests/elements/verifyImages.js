import { URL } from '../../data/constants';
import elements from '../../pages/elementsPage.js';
import { isImageBroken } from '../../helpers/utils';

fixture `Elements: Verification of images`
    .page `${URL.PRODUCTION}/broken`; 

/**
 * To verify images: the URL of the image should be correct,
 * the return status code 200 (all images in the site return 200),
 * and the image should render correctly.
 */
test ('Verify valid image correctly displays and has the expected URL', async t => {
    await t
        .expect(elements.validImage.exists).ok()
        .expect(await isImageBroken(elements.validImgSrcAttribute)).notOk();
});

/**
 * Image is corrupted but has a valid URL and returns a 200 response,
 * using the naturalWidth property will verify this scenario
 */
test ('Verify broken image does not render even having the expected URL', async t => {
    await t
        .expect(elements.brokenImage.exists).ok()
        .expect(await isImageBroken(elements.brokenImgSrcAttribute)).ok();
});

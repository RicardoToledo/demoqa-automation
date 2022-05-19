import { ClientFunction } from 'testcafe';

export const goBackToPreviousPage = ClientFunction(() => window.history.back());

/**
 * returns true if image is broken/not rendering correctly
 * which means (naturalWidth property from img with srcAttribute) = 0
 * note: naturalWidth is not available in testcafe's DOMNodeState object
 */
export const isImageBroken =  ClientFunction(srcAttribute => {
    const imageNaturalWidth = document.querySelector(`img[src='${srcAttribute}']`).naturalWidth;
    if (imageNaturalWidth == 0)
        return true;
    else if (imageNaturalWidth > 0)
        return false;
});

/**
 * Returns a pseudorandom number from 0 to maxNumber-1
 * @param {*} maxNumber 
 * @returns {number}
 */
export const randomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);
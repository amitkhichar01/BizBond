/**
 * Toggles the 'overflow-hidden' class on the document body based on the provided flag.
 * @param {boolean} enable - Flag to enable or disable 'overflow-hidden' class.
 * @returns {function} A cleanup function to remove 'overflow-hidden' class from body.
 */

export const toggleBodyOverflow = (enable) => {
    const body = document.body;

    if (enable) {
        body.classList.add("overflow-hidden");
    } else {
        body.classList.remove("overflow-hidden");
    }

    return () => {
        body.classList.remove("overflow-hidden");
    };
};

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

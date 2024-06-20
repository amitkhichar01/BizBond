export const applyImageTransformation = (url, transformation) => {
    if (!url) {
        console.error("URL is undefined or null");
        return "";
    }

    const parts = url.split("/upload");
    if (parts.length === 2) {
        return `${parts[0]}/upload/${transformation}${parts[1]}`;
    } else {
        return url;
    }
};

import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerElement = document.querySelector(".gallery");
const imagesMarkup = createItemsMarkup(galleryItems);
galleryContainerElement.insertAdjacentHTML("beforeend", imagesMarkup);

function createItemsMarkup(item) {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `<div class="gallery__item">
            <a class="gallery__link" href="${original.value}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </div>`;
    })
    .join("");
}
const onContainerClick = (e) => {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    }

    const source = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${source}"width="800" height="600">`);
    instance.show();

    document.addEventListener("keydown", onEscape);

    function onEscape(e) {
        if (e.code === "Escape") {
            instance.close();
            document.removeEventListener("keydown", onEscape);
        }
    }

};

galleryContainerElement.addEventListener("click", onContainerClick);
import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
let lightboxInstance = null;

function openModal(imageSrc, imageAlt) {
    const content = `
        <img src="${imageSrc}" alt="${imageAlt}" />`;

    lightboxInstance = basicLightbox.create(content, {
        onShow: () => {
            document.addEventListener('keydown', handleEscapeKey);
        },
        onClose: () => {
            document.removeEventListener('keydown', handleEscapeKey);
        }
    });

    lightboxInstance.show();
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        lightboxInstance.close();
    }
}

function addGalleryItems() {
    galleryItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("gallery__item");

        const link = document.createElement("a");
        link.classList.add("gallery__link");
        link.href = "#";

        const image = document.createElement("img");
        image.classList.add("gallery__image");
        image.src = item.preview;
        image.alt = item.description;
        image.dataset.source = item.original;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(item.original, item.description);
        });

        link.appendChild(image);
        listItem.appendChild(link);
        galleryContainer.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addGalleryItems();
});

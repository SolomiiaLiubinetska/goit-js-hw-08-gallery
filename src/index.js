import items from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  closeOverlay: document.querySelector('.lightbox__overlay'),
  imageModal: document.querySelector('.lightbox__image'),
};
const galleryItems= createGalleryItems(items);
refs.gallery.insertAdjacentHTML('beforeend', galleryItems);

function createGalleryItems(items) {
  return items.map(({ original, preview, description }) => {
   
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
      })
      .join('');
}

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  
  if(event.target.nodeName !== 'IMG') {
    return;
  }
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  
  
  setLargeImageSrc(largeImageURL);
  refs.imageModal.alt = imageRef.alt;
openModal();
}

function setLargeImageSrc(url) {
  refs.imageModal.src = url;
}

refs.closeModalBtn.addEventListener('click', closeModal);
refs.closeOverlay.addEventListener('click', closeModal);

function openModal() {
  refs.largeImage.classList.add('is-open');
  window.addEventListener('keydown', closeModalEsc);
  //window.addEventListener('keydown', arrowModalImg);
}

function closeModal() {
  refs.largeImage.classList.remove('is-open');
  refs.imageModal.src = '';
  refs.imageModal.alt = '';
  window.removeEventListener('keydown', closeModalEsc);
  //window.removeEventListener('keydown', arrowModalImg);
}

function closeModalEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

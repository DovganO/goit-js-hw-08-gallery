/* 
 Создай галерею с возможностью клика
по ее элементам и просмотра полноразмерного изображения в модальном окне. 
результата посмотри по ссылке.

Разбей задание на несколько подзадач:

Создание и рендер разметки по массиву данных и предоставленному шаблону.
Реализация делегирования на галерее ul.js-gallery и получение url большого
изображения. Открытие модального окна по клику на элементе галереи. Подмена
значения атрибута src элемента img.lightbox**image. Закрытие модального окна по
клику на кнопку button[data-action="close-lightbox"]. Очистка значения атрибута
src элемента img.lightbox**image. Это необходимо для того, чтобы при следующем
открытии модального окна, пока грузится изображение, мы не видели предыдущее.
Стартовые файлы В папке src ты найдешь стартовые файлы проекта с базовой
разметкой и готовыми стилями. В файле gallery-items.js есть массив объектов
содержащих информацию о изображениях: маленькое изображение, оригинальное и
описание. Разметка элемента галереи Ссылка на оригинальное изображение должна
храниться в data-атрибуте source на элементе img, и указываться в href ссылки
(это необходимо для доступности).

Дополнительно:

Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

Закрытие модального окна по клику на div.lightbox\_\_overlay. Закрытие
модального окна по нажатию клавиши ESC. Пролистывание изображений галереи в
открытом модальном окне клавишами "влево" и "вправо".
*/

import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImgEl = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('.lightbox__overlay');
const closeBtnEl = document.querySelector('.lightbox__button');

const galleryListEl = createGalleryList(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryListEl);

galleryEl.addEventListener('click', onOpenModal);
closeBtnEl.addEventListener('click', onCloseModal);
overlayEl.addEventListener('click', onCloseModalOnOverlay);

function createGalleryList(img) {
  return img
    .map(({ original, description, preview }) => {
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

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  document.addEventListener('keydown', onCloseModalByEsc);

  modalEl.classList.add('is-open');
  modalImgEl.src = event.target.dataset.source;
  modalImgEl.alt = event.target.alt;
}

function onCloseModal(event) {
  document.removeEventListener('keydown', onCloseModalByEsc);
  modalEl.classList.remove('is-open');
  modalImgEl.src = '';
}

function onCloseModalOnOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onCloseModalByEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more-btn');

let currentPage = 1;
let searchValue = '';

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onSearchFormSubmit = async event => {
  event.preventDefault();

  searchValue = searchFormEl.elements.user_query.value.trim();

  if (searchValue === '') {
    iziToast.error({
      message:
        'Sorry, there is no image matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  loaderEl.classList.remove('is-hidden');
  galleryEl.innerHTML = '';
  loadMoreBtnEl.classList.add('is-hidden');

  try {
    const data = await fetchPhotos(searchValue, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    const galleryCardsTemplate = data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryCardsTemplate;
    smoothScroll();
    lightbox.refresh();
    searchFormEl.reset();

    if (data.totalHits > 15) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({ message: error.message, position: 'topRight' }); //+11//
  } finally {
    loaderEl.classList.add('is-hidden');
  }
};

const onLoadMore = async () => {
  currentPage++;
  loaderEl.classList.remove('is-hidden');

  try {
    const data = await fetchPhotos(searchValue, currentPage);

    const galleryCardsTemplate = data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    smoothScroll();
    lightbox.refresh();

    if (Math.ceil(data.totalHits / 15) === currentPage) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({ message: error.message, position: 'topRight' }); //+11//
  } finally {
    loaderEl.classList.add('is-hidden');
  }
};

const smoothScroll = () => {
  const { height } = galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
};

loadMoreBtnEl.addEventListener('click', onLoadMore);
searchFormEl.addEventListener('submit', onSearchFormSubmit);

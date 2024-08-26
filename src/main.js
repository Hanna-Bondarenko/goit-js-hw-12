import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const LoadMoreBtnEl = document.querySelector('.js-load-more-btn');

let currentPage = 1;
let searchValue = '';

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onSearchFormSubmit = async event => {
  event.preventDefault();

  searchValue = searchFormEl.elements.user_query.value;

  currentPage = 1;

  try {
    const data = await fetchPhotos(searchValue, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }

    galleryEl.innerHTML = data.hits.map(createGalleryCardTemplate).join('');
    lightbox.refresh();
    LoadMoreBtnEl.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};

const onLoadMoreClick = async () => {
  currentPage += 1;

  try {
    const data = await fetchPhotos(searchValue, currentPage);

    galleryEl.insertAdjacentHTML(
      'beforeend',
      data.hits.map(createGalleryCardTemplate).join('')
    );
    lightbox.refresh();

    if (currentPage * 15 >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      LoadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
LoadMoreBtnEl.addEventListener('click', onLoadMoreClick);

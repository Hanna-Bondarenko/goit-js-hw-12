import axios from 'axios';
const API_KEY = '45467228-b7d2f005bd7eca51073290ac8';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = async (searchQuery, page) => {
  const urlParams = new URLSearchParams({
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    key: API_KEY,
    q: searchQuery,
    page,
    per_page: 15,
  });

  const { data } = await axios(`${BASE_URL}?${urlParams}`);

  return data;
};

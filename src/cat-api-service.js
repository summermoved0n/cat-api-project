import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_QDM1AZ2SclidlxW4EwigmjI61tQSONxQScze1PFhHFIwU6xmNiCV0wa9Z6SY58n8';

export const fetchBreeds = () => {
  const response = axios.get('https://api.thecatapi.com/v1/breeds');
  return response;
};

export const fetchCatByBreed = breedId => {
  const response = axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  return response;
};

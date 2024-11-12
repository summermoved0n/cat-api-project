import { fetchBreeds, fetchCatByBreed } from './cat-api-service';

const selectEl = document.querySelector('.breed-select');
const conteinerEl = document.querySelector('.cat-info');

selectEl.addEventListener('change', e => {
  const catId = e.target.value;
  fetchCatByBreed(catId).then(({ data }) => {
    catInfoMarkup(data);
  });
});

fetchBreeds()
  .then(({ data }) => {
    selectMarkup(data);
  })
  .catch(err => {
    console.error(err);
  });

function selectMarkup(data) {
  const markup = data
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
  return selectEl.insertAdjacentHTML('afterbegin', markup);
}

function catInfoMarkup(data) {
  conteinerEl.innerHTML = '';
  const markup = data
    .map(
      ({ breeds, url }) => `
    <img src=${url} alt=${breeds[0].alt_name} width=320/>
      <div>
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <h2>Temperament: <span>${breeds[0].temperament}</span></h2>
      </div>`
    )
    .join('');
  return conteinerEl.insertAdjacentHTML('afterbegin', markup);
}

// console.log(breeds[0].description);
// console.log(breeds[0].temperament);
// console.log(url);

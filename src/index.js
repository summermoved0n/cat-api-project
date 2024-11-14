import { fetchBreeds, fetchCatByBreed } from './cat-api-service';

const selectEl = document.querySelector('.breed-select');
const conteinerEl = document.querySelector('.cat-info');
const showLoadEl = document.querySelector('.loader');
const showErrorEl = document.querySelector('.error');

let isLoading = false;
let isError = false;

selectEl.addEventListener('change', e => {
  isLoading = true;
  toggleLoading();
  const catId = e.target.value;
  fetchCatByBreed(catId)
    .then(({ data }) => {
      console.log(data);
      if (data.length === 0) {
        throw new Error();
      }
      isLoading = false;
      toggleLoading();
      catInfoMarkup(data);
    })
    .catch(err => {
      console.log(err);
      isLoading = false;
      toggleLoading();
      isError = true;
      showErrorMsg();
    });
});

fetchBreeds()
  .then(({ data }) => {
    selectMarkup(data);
  })
  .catch(err => {
    console.error(err);
  });

function showErrorMsg() {
  if (!isError) {
    return;
  }
  showErrorEl.style.display = 'block';
  selectEl.style.display = 'none';
}

function toggleLoading() {
  if (!isLoading) {
    showLoadEl.style.display = 'none';
    conteinerEl.style.display = 'block';
    return;
  }
  showLoadEl.style.display = 'block';
  conteinerEl.style.display = 'none';
}

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

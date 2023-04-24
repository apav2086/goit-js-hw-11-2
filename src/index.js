import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import fetchImages from './js/fetch-data';
import createMarkup from './js/markup';
const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  imagesList: document.querySelector('.photo-list'),
  loadMore: document.querySelector('.load-more'),
};
refs.loadMore.classList.add('button-hidden');
 
refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', sendFetch);
let page = 1;
let showNotify = 0;
let imageRemainder = 0;
 
function onFormSubmit (e) {
  e.preventDefault();
  refs.loadMore.classList.add('button-hidden');

  if (refs.input.value.trim()) {
    refs.imagesList.innerHTML = '';
    page = 1;
    showNotify = 0;
    sendFetch();
  }
}

async function sendFetch() {
 await fetchImages(page).then(data => markup(data));
  page += 1;
}

function markup(data) {
  if (notify(data)) {
    refs.imagesList.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  }
}

function notify(data) {
  if (data.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return false;
  }

  if (showNotify === 0) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    showNotify = 1;
    imageRemainder = data.totalHits;
  }
  imageRemainder -= 40;

  if (imageRemainder <= 0) {
    refs.loadMore.classList.add('button-hidden');
    setTimeout(() => {
      Notify.warning("We're sorry, but you've reached the end of search results."), 2000;
    });
  } else {
    refs.loadMore.classList.remove('button-hidden');
  }

  return true;
}
/*function simpleLightbox() {
  const galleryHandle = new SimpleLightbox('.photo-card a');
  galleryHandle.on('show.simplelightbox');
  galleryHandle.refresh();
 }*/


/*
async function getData(e) {
  e.preventDefault();
  try {
    const userSearch = input.value;
    const response = await axios.get(`https://pixabay.com/api?key=35585241-0d017fc6894dff5aad1093c8d&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    );
    console.log(response.data);
    response.data.hits.forEach(item => {
      const div = document.createElement('div');
      div.setAttribute('class', 'photo-card');
      div.innerHTML = `
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>`
      gallery.append(div);
    });
    loadMore.style.visibility = "block";
  } catch (error) {
    console.error(error);
  }
}


formEl.addEventListener('submit', getData);
loadMore.addEventListener('click', (e) => {
    currentPage++;
    getData(e);
})*/
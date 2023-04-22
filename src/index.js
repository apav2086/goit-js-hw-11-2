import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
//import GalleryAPI from '/fetch-gallery';
const formEl = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let currentPage = 1;

loadMore.style.visibility = "hidden";
  
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
})
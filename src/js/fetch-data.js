import axios, { Axios } from 'axios';
export default async function fetchImages(page) {
    const options = {
        key: '35585241-0d017fc6894dff5aad1093c8d',
        enteredValue: document.querySelector('input').value,
        imageType: 'photo',
        orientation: 'horizontal',
        safeSearch: true,
        perPage: 40,
    };
    const url = `https://pixabay.com/api?key=${options.key}&q=${options.enteredValue}&image_type=${options.imageType}&orientation=${options.orientation}&safesearch=${options.safeSearch}&per_page=${options.perPage}&page${page}`;
    const response = await axios.get(url);
    return response.data;
}
//importy
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

//zmienne
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector("#search-box");
// const searchParams = new URLSearchParams({
//     _name: name.official,

// });

//funkcja wyszukiwania nazwy
function searchCountry() {
    let name = searchBox.value;

    if (name.length <= 1) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    fetchCountries(name)
};

//fetch 
function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("data:" + data)
        })
        .catch(error => {
           Notiflix.Notify.failure(`Oops, there is no country with that name.`)
        })
};
    


searchBox.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));   
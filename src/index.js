//importy
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";

//zmienne
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");


let informationAboutCountry = ({ name, capital, population, flags, languages }) => {
    const languageList = languages.map(lang => lang.name).join(', ');
    console.log(languageList)
    
}

//funkcja wyszukiwania nazwy
function searchCountry() {
    let searchName = searchBox.value;
    const nameOfCountry = searchName.trim();

    if (nameOfCountry.length === 0) {
        // countryInfo.innerHTML = '';
        // countryList.innerHTML = '';
        return
    }
    if (nameOfCountry.length <= 1) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else {
        fetchCountries(nameOfCountry)
            .then(countries => {
                if (countries.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    console.log("więcej niż 10")
                }
                if (countries.length === 1) {
                    console.log("działa ,", countries.languages)
                }
                else {
                    
                }
        })
    }
};

searchBox.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));   
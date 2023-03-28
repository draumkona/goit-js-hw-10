'use strict'
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


const informationAboutCountry = ({ name, capital, population, flags, languages }) => {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    countryInfo.innerHTML = `<h1 class="country__header"><img src="${flags.svg}" alt="${name.common}" width="40" height="40">${name.common}</h1>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>`;
};

function foundCountriesList(countries) {
  const countriesArray = countries.map(({ name, flags }) => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('card');
    countryCard.innerHTML = `<img src="${flags.svg}" width="40" height="40"><p class="country__name">${name.common}</p>`;

    return countryCard;
  });

  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  countryList.append(...countriesArray);
};

//funkcja wyszukiwania nazwy
function searchCountry() {
    let searchName = searchBox.value;
    const nameOfCountry = searchName.trim();

    if (nameOfCountry.length === 0) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
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
                    console.log("więcej niż 10", countries.length)
                }
                if (countries.length === 1) {
                    return informationAboutCountry(countries[0]);
                }
                if (countries.length > 1 && countries.length < 10) {
                    return foundCountriesList(countries)
                };
        })
    }
};

searchBox.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));   
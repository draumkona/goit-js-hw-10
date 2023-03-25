import Notiflix from 'notiflix';

export function fetchCountries(searchNameCountry) {
    return fetch(`https://restcountries.com/v3.1/name/${searchNameCountry}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch API info");
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                return data;
            }
        })
        .catch(error => {
           Notiflix.Notify.failure(`Oops, there is no country with that name.`)
        })
};
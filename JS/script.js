document.addEventListener('DOMContentLoaded', () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            getAsianCountries(data);
            getLowPopulationCountries(data);
            printCountryDetails(data);
            printTotalPopulation(data);
            getCountriesUsingUSD(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function getAsianCountries(data) {
    const asianCountries = data.filter(country => country.region === 'Asia');
    console.log('Asian Countries:', asianCountries);
}

function getLowPopulationCountries(data) {
    const lowPopulationCountries = data.filter(country => country.population < 200000);
    console.log('Countries with Population < 2 Lakhs:', lowPopulationCountries);
}

function printCountryDetails(data) {
    const resultsDiv = document.getElementById('results');
    data.forEach(country => {
        const countryDetails = `<div class="card my-2">
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">Capital: ${country.capital}</p>
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="img-fluid" style="width: 100px;">
            </div>
        </div>`;
        resultsDiv.insertAdjacentHTML('beforeend', countryDetails);
    });
}

function printTotalPopulation(data) {
    const totalPopulation = data.reduce((total, country) => total + country.population, 0);
    console.log('Total Population:', totalPopulation);
}

function getCountriesUsingUSD(data) {
    const usdCountries = data.filter(country => {
        if (country.currencies) {
            return Object.keys(country.currencies).includes('USD');
        }
        return false;
    });
    console.log('Countries using USD as currency:', usdCountries);
}

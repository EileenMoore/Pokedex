let pokemonSet1;
let pokemonNames = [];
let pokemonImages = [];

async function showAllPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`;
    let response = await fetch(url);
    pokemonSet1 = await response.json();
    getPokemonNames();
    await getPokemonImages();
    renderAllPokemon();
}

function getPokemonNames() {
    for (let index = 0; index < pokemonSet1.results.length; index++) {
        const pokemonResult = pokemonSet1.results[index];
        pokemonNames.push(pokemonResult.name);
    }
    localStorage.setItem('pokemonNames', JSON.stringify(pokemonNames));
    console.log('pokemonNames ', pokemonNames);
}

async function loadCurrentPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let currentPokemonImage = currentPokemon.sprites.front_default;
    pokemonImages.push(currentPokemonImage);
}

async function getPokemonImages() {
    for (let index = 0; index < pokemonNames.length; index++) {
        await loadCurrentPokemon(pokemonNames[index]);
    }
    //console.log('pokemonImages ', pokemonImages);
}


function renderAllPokemon() {
    for (let index = 0; index < pokemonNames.length; index++) {
        document.getElementById("allPokemons").innerHTML += `
        <div class="pokemon-container">${pokemonNames[index]}
        <img onclick="goToPokemonByImage('${pokemonNames[index]}')" src="${pokemonImages[index]}">
        <div>
        `
    }
}

function goToPokemon() {
    pokemon = document.getElementById("searchPokemon").value.toLowerCase();
    document.getElementById("searchPokemon").value = '';
    localStorage.setItem('pokemon', pokemon);
    window.location.href = "pokemon.html";
}

function goToPokemonByImage(pokemon) {
    localStorage.setItem('pokemon', pokemon);
    window.location.href = "pokemon.html";
}
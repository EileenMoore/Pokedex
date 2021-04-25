let pokemonSet;
let pokemonNames = [];
let pokemonImages = [];
let firstPokemonIndex = 0;
let last_request = 0;
let allPokemonNames = [];
let fullPokemonSet;

async function showAllPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${firstPokemonIndex}&limit=20`;
    let response = await fetch(url);
    pokemonSet = await response.json();
    //console.log(pokemonSet);
    getPokemonNames();
    await getPokemonImages();
    renderAllPokemon();
}

async function getAllPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118`;
    let response = await fetch(url);
    fullPokemonSet = await response.json();
    console.log(fullPokemonSet);
    loadAllPokemonNames();
}

function loadAllPokemonNames() {
    for (let index = 0; index < fullPokemonSet.results.length; index++) {
        const pokemonName = fullPokemonSet.results[index];
        allPokemonNames.push(pokemonName.name);
    }
    localStorage.setItem('pokemonNames', JSON.stringify(allPokemonNames));
    console.log('AllPokemonNames ', allPokemonNames);
}

function getPokemonNames() {
    for (let index = 0; index < pokemonSet.results.length; index++) {
        const pokemonResult = pokemonSet.results[index];
        pokemonNames.push(pokemonResult.name);
    }
    //console.log('pokemonNames ', pokemonNames);
}


async function getPokemonImages() {
    for (let index = firstPokemonIndex; index < pokemonNames.length; index++) {
        await loadCurrentPokemon(pokemonNames[index]);
    }
    //console.log('pokemonImages ', pokemonImages);
}

async function loadCurrentPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let currentPokemonImage = currentPokemon.sprites.front_default;
    pokemonImages.push(currentPokemonImage);
}

function renderAllPokemon() {
    for (let index = firstPokemonIndex; index < pokemonNames.length; index++) {
        document.getElementById("allPokemons").innerHTML += `
        <div class="pokemon-container">${pokemonNames[index]}
            <img onclick="goToPokemonByImage('${pokemonNames[index]}')" src="${pokemonImages[index]}">
        <div>
        `
    }
}

window.onscroll = function() {
    // let x = document.body.offsetHeight - window.pageYOffset;
    // console.log('Differenz ', x);
    // if ((document.body.offsetHeight - window.pageYOffset) < 800) {
    //     firstPokemonIndex = firstPokemonIndex + 20;
    //     console.log('index ', firstPokemonIndex);
    //     showAllPokemon();
    // }

    // let x = window.innerHeight + window.scrollY;
    // console.log('Differenz ', x);
    // console.log('bodyheightoffset ', document.body.offsetHeight);

    let timPassedSinceLastRequest = new Date().getTime() - last_request;
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) && timPassedSinceLastRequest > 5000) {
        firstPokemonIndex = firstPokemonIndex + 20;
        console.log('index ', firstPokemonIndex);
        showAllPokemon();
        last_request = new Date().getTime();
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
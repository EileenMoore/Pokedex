let currentPokemon;
let allPokemon;
const urlParams = new URLSearchParams(window.location.search);
const pokemon = urlParams.get('pokemon');

function searchForPokemon() {
    let pokemon = document.getElementById("pokemon").value.toLowerCase();
    window.location.href = "pokemon.html?pokemon=" + pokemon;
}

async function loadPokemon() {
    allPokemon = JSON.parse(localStorage.getItem('pokemonNames'));

    if (allPokemon.find(e => e == pokemon)) {
        console.log('test');
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        renderPokemonInfo();
    } else {
        alert('Pokemon not found');
    }
}

function renderPokemonInfo() {
    renderPokemonHeader();
    renderPokemonAbout();
}

function renderPokemonHeader() {
    document.getElementById("pokemonName").innerHTML = currentPokemon.name;
    let x = currentPokemon.order;
    zeroFilled = ('000' + x).substr(-3);
    document.getElementById("pokemonOrder").innerHTML = '#' + zeroFilled;
    for (let index = 0; index < currentPokemon.types.length; index++) {
        const type = currentPokemon.types[index];
        document.getElementById("pokemonType").innerHTML += `
        <span class="pokemon-types">${type.type.name}</span>
        `;
    }
    document.getElementById("pokemonImage").src = currentPokemon.sprites.front_default;
}

function renderPokemonAbout() {
    document.getElementById("pokemonHeight").innerHTML = (currentPokemon.height * 0.1).toFixed(2) + ' cm';
    document.getElementById("pokemonWeight").innerHTML = currentPokemon.weight * 0.1 + ' kg';
    for (let index = 0; index < currentPokemon.abilities.length; index++) {
        const ability = currentPokemon.abilities[index];
        if (index == currentPokemon.abilities.length - 1) {
            document.getElementById("pokemonAbilities").innerHTML += `
            ${ability.ability.name}
            `;
        } else {
            document.getElementById("pokemonAbilities").innerHTML += `
            ${ability.ability.name},
            `;
        }
    }
}

function goToIndex() {
    window.location.href = "index.html";
}
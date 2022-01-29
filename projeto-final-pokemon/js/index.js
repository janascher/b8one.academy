/* Buscar os dados na API */
async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=26&offset=1");

    const responseJson = await response.json();

    return responseJson.results;
}

async function fetchPokemon(url) {
    const response = await fetch(url);

    const responseJson = await response.json();

    return responseJson;
}

async function populatePokemons(pokemons) {

    const firstPokemon = pokemons[0]

    console.log({firstPokemon})

    const pokemon = await fetchPokemon(firstPokemon.url)

    console.log({pokemon})

    const pokemonHtml = `
    <li class="pokemons-item">
        <div class="pokemons-card" data-pokemon-type-name="electric">
            <div class="pokemons-card-image-container">
                <img src="${pokemon.sprites.front_default}" alt="Pokémon" class="pokemons-card-image">
            </div>
            <div class="pokemons-card-info"> 
                <h3 class="pokemons-card-name js-pokemons-card-name">
                    ${pokemon.name}
                </h3>
                <span class="pokemons-card-title">
                ${pokemon.types[0].type.name}
                </span>
            </div>
            <ul class="pokemons-card-attributes">
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                    HP 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Attack 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Defense
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Special Attack
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Special Defense 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Speed 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar"></div>
                    </div>                          
                </li>
            </ul>
        </div>
    </li>
    `
    const pokemonListUl = document.querySelector(".pokemons-list");

    pokemonListUl.insertAdjacentHTML("beforeend",pokemonHtml);

}

async function main() {
    const pokemons = await fetchPokemons();

    populatePokemons(pokemons);

    console.log({pokemons});
}

main();
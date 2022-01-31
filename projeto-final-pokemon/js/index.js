/* == API == */
/* Pega todos os dados do pokémon */
async function fetchPokemonsData(pokemons) {

    const allPokemonData = [];

    for (const pokemon of pokemons) {
        const pokemonData = await fetchPokemon(pokemon.url)
        allPokemonData.push(pokemonData)
    }
   
    return allPokemonData
}

/* Busca pokémons */
async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=26&offset=1");
    const responseJson = await response.json();

    return responseJson.results;
}

/* Busca um pokémon específico */
async function fetchPokemon(url) {
    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
}

/* HTML */
function insertPokemonHtml(pokemon) {

    const hpStat = pokemon.stats.find(item => item.stat.name === "hp")
    const attackStat = pokemon.stats.find(item => item.stat.name === "attack")
    const defenseStat = pokemon.stats.find(item => item.stat.name === "defense")
    const specialAttackStat = pokemon.stats.find(item => item.stat.name === "special-attack")
    const specialDefenseStat = pokemon.stats.find(item => item.stat.name === "special-defense")
    const speedStat = pokemon.stats.find(item => item.stat.name === "speed")

    const pokemonHtml = `
    <li class="pokemons-item">
        <div class="pokemons-card" data-pokemon-type-name="electric">
            <div class="pokemons-card-image-container">
                <img class="pokemons-card-image" src="${pokemon.sprites.front_default}" alt="Pokémon" class="pokemons-card-image">
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
                        <div class="pokemons-card-attributes-progress-bar" style="width: ${hpStat.base_stat}%"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Attack 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar" style="width: ${attackStat.base_stat}%"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Defense
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar" style="width: ${defenseStat.base_stat}%"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Special Attack
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar" style="width: ${specialAttackStat.base_stat}%"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Special Defense 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar" style="width: ${specialDefenseStat.base_stat}%"></div>
                    </div>                          
                </li>
                <li class="pokemons-card-attributes-item">
                    <span class="pokemons-cardd-attributes-name">
                        Speed 
                    </span>
                    <div class="pokemons-card-attributes-progress">
                        <div class="pokemons-card-attributes-progress-bar" style="width: ${speedStat.base_stat}%"></div>
                    </div>                          
                </li>
            </ul>
        </div>
    </li>
    `
    const pokemonListUl = document.querySelector(".pokemons-list");

    pokemonListUl.insertAdjacentHTML("beforeend",pokemonHtml);
}

/* Compilação */
async function populatePokemons(pokemons) {

    const allPokemonsData = await fetchPokemonsData(pokemons)

    for (const allPokemonData of allPokemonsData) {
        insertPokemonHtml(allPokemonData)
    }    
}


/* Remove todos os Pokémons quando é buscado um Pokémon específico */
function removeAllPokemons() {
    
    const pokemonsListUl = document.querySelector(".pokemons-list");

    pokemonsListUl.innerHTML = ""
}

/* Campo de busca */
async function handleSearchInput(event, pokemons) {

    const value = event.target.value;

    if(value === ""){
        removeAllPokemons()
        await populatePokemons(pokemons)
    } else {
        const currentPokemon = pokemons.find(pokemon => pokemon.name === value.toLowerCase());

        if(currentPokemon){
            const currentPokemonData = await fetchPokemon(currentPokemon.url);

            if(currentPokemonData){
                removeAllPokemons()
                insertPokemonHtml(currentPokemonData)
            }  
        }
    }
}

function initSearchFunction(pokemons) {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("change", async (event) => await handleSearchInput(event, pokemons))
}

/* Botões do menu */
async function filterClicked(filter, pokemonsData) {
    const pokemonType = filter.dataset.pokemonTypeName

    const pokemonsDataFilterByType = pokemonsData.filter(pokemonsData => {
        return pokemonsData.types[0].type.name === pokemonType
    })

    if(pokemonType === "all") {
        removeAllPokemons();

        for (const pokemon of pokemonsData) {
            insertPokemonHtml(pokemon);
        }
    } else {
        removeAllPokemons();

        for (const pokemon of pokemonsDataFilterByType) {
            insertPokemonHtml(pokemon);
        }
    }

    console.log({pokemonsDataFilterByType})
}

function initFiltersFunction(pokemonsData) {
    const filters = document.querySelectorAll(".pokemon-filter-button");

    filters.forEach(filter => {
        filter.addEventListener("click", async () => await filterClicked(filter, pokemonsData))
    })
}

/* Controla as demais funções */
async function main() {
    const pokemons = await fetchPokemons();

    const pokemonsData = await fetchPokemonsData(pokemons)

    initSearchFunction(pokemons);
    initFiltersFunction(pokemonsData);    

    populatePokemons(pokemons);
}

main();
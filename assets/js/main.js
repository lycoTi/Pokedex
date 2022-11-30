const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDiv = document.getElementById('modal-pokemon')

const maxRecords = 151
const limit = 2
let offset = 0;
loadPokemonItens(offset, limit)

loadPokemonItens(offset, limit)

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
               <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
               </ol>

               <img src="${pokemon.photo}"
                  alt="${pokemon.name}">
            </div>
        </li>
    `
}

function modalPokemon(pokemon) {
   return `
      <div class="pokemon-modal">
         <div class="modal-header">
            <div class="header-body">
               <h1>Bulbasaur</h1>
               <ul>
                  <li>Grass</li>
                  <li>Poison</li>
               </ul>
            </div>
            <div class="header-body-number">#${pokemon.number}</div>
         </div>
         <div class="photo-poke">
            <img
               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
               alt=""
            />
         </div>
         <div class="stats">
            <nav class="modal-nav">
               <span>About</span>
               <span>Base Stats</span>
               <span>Evolution</span>
               <span>Moves</span>
            </nav>
            <div class="detalhes-pokemon">
               <section class="detalhes-status">
                  <div class="detalhe-status-itens">
                     <span>Species</span>
                     <span>Height</span>
                     <span>Weight</span>
                     <span>Abilities</span>
                  </div>
                  <div class="detalhe-status-itens">
                     <span>seed</span>
                     <span>2'3,6"(0,70 cm)</span>
                     <span>15.2 lbs (6.9 kg)</span>
                     <span>Overgrow, Chlorophyl</span>
                  </div>
               </section>
               <span>Breading</span>
               <section class="detalhes-status">
                  <div class="detalhe-status-itens">
                     <span>Gender</span>
                     <span>Egg Groups</span>
                     <span>Egg Cycle</span>
                  </div>
                  <div class="detalhe-status-itens">
                     <span>M 87.5% F 12.5%</span>
                     <span>Monster</span>
                     <span>Grass</span>
                  </div>
               </section>
            </div>
         </div>
      </div>
      <div class="pokemon-modal-background"></div>
   `
}

function loadPokemonItens(offset, limit) {
   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('')
      pokemonList.innerHTML += newHtml
      const pokemonClass = document.getElementsByClassName('pokemon')
      for (const pokemon of pokemons) {
         for (let i = 0; i < pokemonClass.length; i++) {
            const htmlpoke = pokemonClass[i];
            htmlpoke.addEventListener('click', () => {
               pokemonDiv.innerHTML += modalPokemon(pokemon)
            })
         }
         if(pokemon) {
            pokemonNumber = pokemon
            return pokemon
         }
      }      
   })
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


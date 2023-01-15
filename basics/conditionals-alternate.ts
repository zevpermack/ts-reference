import fetch from 'cross-fetch';

//The interface for the result of the api call
interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

// Using function overloading
function fetchPokemon(url: string, cb: (data: PokemonResults) => void): void;
function fetchPokemon(url: string): Promise<PokemonResults>;
function fetchPokemon(
  url: string,
  cb?: (data: PokemonResults) => void
): unknown {
  if (cb) {
    fetch(url)
      .then((data) => data.json())
      .then((data) => cb(data));
    return;
  } else {
    //Just give us the data in json string
    return fetch(url).then((data) => data.json());
  }
}

//Using then
fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10', (data) => {
  data.results.forEach(({ name }) => console.log(name));
});

//Using async
(async function () {
  const data = await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10');
  data.results.forEach(({ name }) => console.log(name));
})();

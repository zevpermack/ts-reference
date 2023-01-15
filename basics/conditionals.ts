import fetch from 'cross-fetch';

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

//Using the conditional ternary
type fetchURLReturn<T> = T extends undefined ? Promise<PokemonResults> : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): fetchURLReturn<T> {
  if (cb) {
    fetch(url)
      .then((data) => data.json())
      .then((data) => cb(data));
    return undefined as fetchURLReturn<T>;
  } else {
    return fetch(url).then((data) => data.json()) as fetchURLReturn<T>;
  }
}

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//   data.results.forEach(({ name }) => console.log(name));
// });

//This is the async way of calling the same thing
(async function () {
  const data = <PokemonResults>(
    await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')
  );
  data.results.forEach(({ name }) => console.log(name));
})();

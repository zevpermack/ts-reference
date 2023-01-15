//NO BS TS #7

function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let str: T = initial;
  return [
    () => str,
    (v: T) => {
      str = v;
    },
  ];
}

//T becomes a generic that is initially unknown but as soon
//as you plug something in, it becomes the type of that primitive
const [st1getter, st1setter] = simpleState(10);
console.log(st1getter());
st1setter(52);
console.log(st1getter());

//Here we override the T that is being set by null by giving
//a new declaration that it can include a string
const [st2getter, st2setter] = simpleState<string | null>(null);
console.log(st2getter());
st2setter('Fred');
console.log(st2getter());

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  //Takes in items passed which are of a generic type and creates an array of object with the item themselves
  //and also the rank of the item based on the item being passed into the rank function parameter. Which just
  //extracts hp from the object and returns it as the rank.
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  //Sorting it by the extracted rank
  ranks.sort((a, b) => b.rank - a.rank);

  //After the items are sorted we can return the item itself, which also contains the hp
  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: 'Bulbasaur',
    hp: 20,
  },
  { name: 'Rychu', hp: 5 },
];

const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);

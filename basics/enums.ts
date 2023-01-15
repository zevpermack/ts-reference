//No BS-TS #11

// This is a worse option than enums
// const beforeLoad = 'beforeLoad';
// const loading = 'loading';
// const loaded = 'loaded';

// const isLoading = (state: string) => state === loading;
// console.log(isLoading('dog'));

//Using Enums
enum LoadingState {
  beforeLoad = 'beforeLoad',
  loading = 'loading',
  loaded = 'loaded',
}

const englishLoadingState = {
  [LoadingState.beforeLoad]: 'Before Load',
};

const isLoading = (state: LoadingState) => state === LoadingState.loading;

console.log(isLoading(LoadingState.beforeLoad));

//Literal Types
//This is showing a number literal where the dice can only be 1 | 2 | 3
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

console.log(rollDice(3));

//Functional overloads with string literals
//Name has to be of the type of the string literal 'addToCart or 'checkout'
function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
//Then we use unknown for variable in typical overload fashion
function sendEvent(name: string, data: unknown) {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: 25 });

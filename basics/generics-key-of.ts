//NO BS TS #8 Generics with key of

/*
Here the Datatype gets established in the first generic
Then the second generic extends the keys initially entered
in the first generic data type. And we return an array of 
the type of the values in DataType*/
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: 'Mimi', age: 12 },
  { name: 'LG', age: 13 },
];

console.log(pluck(dogs, 'age'));
console.log(pluck(dogs, 'name'));

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  //Adding this interface to BaseEvent for addToCart
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

export function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

//we get the pre-fill of "addToCart" out "checkout" because we
//know the first parameter is extending key of EventMap
sendEvent('addToCart', {
  productID: 'foo',
  user: 'baz',
  quantity: 1,
  time: 10,
});

sendEvent('checkout', { time: 20, user: 'bob' });

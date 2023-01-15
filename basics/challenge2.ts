//Make type safe function for ForEach, Filter and Map using reduce (just for fun I guess?)
//Note we just return undefined in reduce to give it to the accumulator but there
//is no need to use the accumulator variable for this

//For Each
const myForEach = <T>(items: T[], forEachFunc: (v: T) => void) => {
  items.reduce((accumulator, value) => {
    forEachFunc(value);
    return undefined;
  }, undefined);
};

myForEach(['a', 'b', 'c'], (v) => console.log(`forEach ${v}`));

//Filter
//Here we say what type the accumulator will be, which is an array of whatever items are passed in
const myFilter = <T>(items: T[], filterFunc: (v: T) => boolean) => {
  return items.reduce((accumulator: T[], value) => {
    const filterResult = filterFunc(value);
    return filterResult ? [...accumulator, value] : accumulator;
  }, []);
};
const cats = ['cat', 'cat', 'dog'];
console.log(myFilter(cats, (v) => v === 'cat'));

//Map
const myMap = <T, K>(items: T[], mapFunc: (v: T) => K) => {
  return items.reduce((accumulator: K[], value) => {
    return [...accumulator, mapFunc(value)];
  }, []);
};

//Because we use K as the return for the generic in map function it can be essentially
//whatever type we want to return
console.log(myMap(cats, (v) => v + 's'));
console.log(myMap(cats, (v) => 35));

//YT NO BS TS #5
//You cannot put an optional af

function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient}${extra ? ' ' + extra : ''}!`);
}

printIngredient('sugar', 'flour', 'water');

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User) {
  if (user.info) {
    return user.info.email;
  }
  return '';
}

function getEmaileasy(user: User): string {
  // ?? is a coalescing operator returns the left side if it is
  // not undefined or null, otherwise returns right side
  return user?.info?.email ?? '';
}

function addWithCallback(x: number, y: number, callback: () => void) {
  console.log(`${x}, ${y}`);
  //syntax to run callback if exists
  callback?.();
}

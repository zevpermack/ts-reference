//No BS-TS #9
//https://www.typescriptlang.org/docs/handbook/utility-types.html

//Partial utility example
interface MyUser {
  name: string;
  id: number;
  email?: string;
}

// interface MyUserOptionals {
//   name?: string;
//   id?: string;
//   email?: string;
// }

// this is equivalent to the interface above where it makes
// all fields of an interface optional
type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  'merge Fn: ',
  merge(
    { name: 'zev', id: 2, email: 'zp@zp.com' },
    { email: 'newemail@newemail.com' }
  )
);

//Required utility type, now there are no optionals
type RequiredMyUser = Required<MyUser>;

//Pick utility type: takes just the ones from the interface that you want in your new type
type JustEmailAndName = Pick<MyUser, 'email' | 'name'>;

//Omit utility type: Omits the options you don't want in your new type
type NoEmail = Omit<MyUser, 'email'>;

type UserWIthoutId = Omit<MyUser, 'id'>;

//Record Utility type, creates a structure for an object where the first parameter is the type of
//the key and the second parameter is the type of the value
const mapById = (users: MyUser[]): Record<MyUser['id'], UserWIthoutId> => {
  return users.reduce((a, v) => {
    //spreading the rest of the values other than id
    const { id, ...other } = v;

    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  'mapById Fn:',
  mapById([
    { id: 2, name: 'foo man' },
    { id: 3, name: 'yes' },
  ])
);

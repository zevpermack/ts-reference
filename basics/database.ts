export interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

export interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

export class InMemoryDatabase implements Database {
  //private means we can only access and change a record from within the db
  //using protected so the descendent, persistentMemoryDB can access db
  protected db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

export class PersistentMemoryDB
  extends InMemoryDatabase
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

export const myDB = new InMemoryDatabase();
myDB.set('foo', 'bar');
console.log(myDB.get('foo')); //bar
//This line below errors because the db is private
// myDB.db["foo"] = "baz"

export const persistentDB = new PersistentMemoryDB();
persistentDB.set('foo', 'bar');
export const savedState = persistentDB.saveToString();
persistentDB.set('foo', 'changed bar');
console.log(persistentDB.get('foo')); //changed bar

//restoring from a saved state
export const persistentDB2 = new PersistentMemoryDB();
persistentDB2.restoreFromString(savedState);
console.log(persistentDB2.get('foo')); //bar

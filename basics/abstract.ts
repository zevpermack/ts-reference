//NO BS-TS 16 Abstract Classes

//abstract means you can never instantiate it directly
//We are expressing the intent that the implementation needs
//to be overridden by a sub class. In this case Ryu
//But fight can still call getSpecialAttack
abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attacks with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return 'Hadouken';
  }
  get name(): string {
    return 'Ryu';
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return 'Lightning Kick';
  }
  get name(): string {
    return 'Chun-Li';
  }
}

const ryu = new Ryu();
const chunLi = new ChunLi();
// These two lines will never work because they are not designed to
// be implemented as classes
// const fighter = new StreetFighter();
// fighter.getSpecialAttack()

ryu.fight();
chunLi.fight();

//Note getters make it seem like a function is a property
//Good vid on getters and setters https://www.youtube.com/watch?v=qkAb-4ZR5Yw

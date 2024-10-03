export class Column {
  #car = null;
  constructor(type, speed = 5) {
    this.type = type;
    this.speed = speed;
  }
  set car(car) {
    this.#car = car;
  }
  get car() {
    return this.#car;
  }
}

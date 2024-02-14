export class Column {
  #car;
  constructor(type, speed) {
    this.type = type;
    this.speed = speed;
    this.#car = null;
  }
  set car(car) {
    this.#car = car;
  }
  get car() {
    return this.#car;
  }
}

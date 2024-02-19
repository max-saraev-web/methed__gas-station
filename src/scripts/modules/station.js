import {Column} from './column';
import {RenderStation} from './renderStation';

export class Station {
  #queue = [];
  #filling = [];
  #ready = [];
  constructor(typeStation, renderApp = null, speed = 5) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.renderStation = null;
    this.speed = speed;
  }

  init() {
    this.createFilling();
    if (this.renderApp) {
      this.renderStation = new RenderStation(this.renderApp, this);
    }
    setInterval(() => {
      this.checkQueueToFilling();
    }, 1000);
  }
  createFilling() {
    for (const optionStation of this.typeStation) {
      this.#filling.push(new Column(optionStation.type, this.speed));
    }
  }
  get queue() {
    return this.#queue;
  }

  get filling() {
    return this.#filling;
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling[j].car &&
            this.#queue[i].typeFuel === this.#filling[j].type) {
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling[j]);
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    console.log(`Заправляем ${JSON.stringify(column.car)}`);
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;
    const timerId = setInterval(() => {
      console.log(car.getTitle, nowTank);
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        car.fillUp();
        clearInterval(timerId);
        const total = car.nowTank - needPetrol;
        column.car = null;
        this.leaveClient({car, total});
      }
    }, 1000);
  }
  leaveClient({car, total}) {
    this.#ready.push(car);
    this.renderStation.renderStation();
    console.log(car.getTitle, total);
  }
  addCarQueue(car) {
    console.log('машина добавлена ');
    this.#queue.push(car);
    console.log(this.#queue);
    this.renderStation.renderStation();
  }
}

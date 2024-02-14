import {Column} from './column';
import {RenderStation} from './renderStation';

export class Station {
  #queue;
  #filling;
  #ready;
  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.#queue = [];
    this.#filling = [];
    this.#ready = [];
    this.renderApp = renderApp;
    this.renderStation = null;
  }

  init() {
    if (this.renderApp) {
      this.renderStation = new RenderStation(this.renderApp, this);
    }
    for (const optionStation of this.typeStation) {
      for (let i = 0; i < optionStation.count; i++) {
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }
    setInterval(() => {
      this.checkQueueToFilling();
    }, 200);
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling[j].car &&
            this.#queue[i].typeFule === this.#filling[j].type) {
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
    this.renderStation.renderStation();
    this.#ready.push(car);
    console.log(car.getTitle, total);
  }
  addCarQueue(car) {
    this.renderStation.renderStation();
    this.#queue.push(car);
  }
  get filling() {
    return this.#filling;
  }
  get queue() {
    return this.#queue;
  }
}

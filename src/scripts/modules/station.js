import {Column} from './column';
import {RenderStation} from './renderStation';

export class Station {
  #queue = [];
  #filling = [];
  #ready = [];
  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.renderStation = null;
  }

  init() {
    for (const optionStation of this.typeStation) {
      if (!optionStation.count) optionStation.count = 1;
      for (let i = 0; i < optionStation.count; i++) {
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }
    if (this.renderApp) {
      this.renderStation = new RenderStation(this.renderApp, this);
    }
    setInterval(() => {
      this.checkQueueToFilling();
    }, 1000);
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
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;
    const timerId = setInterval(() => {
      console.log(car.getTitle, nowTank);
      nowTank += column.speed;
      if (nowTank >= car.getMaxTank) {
        clearInterval(timerId);
        const total = car.nowTank - needPetrol;
        car.fillUp();
        column.car = null;
        console.log('total: ', total);
        this.leaveClient({car, total});
      }
    }, 1000);
  }
  leaveClient({car, total}) {
    this.#ready.push(car);
    // console.log('car123: ', car);
    // console.log(this.#ready);
    console.log(`Заправка законченна ${car.getTitle} ${total}`);
    console.log(this);
    this.renderStation.renderStation();
  }
  addCarQueue(car) {
    console.log('машина добавлена!', car);
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}

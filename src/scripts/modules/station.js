import {Column} from './column';

export class Station {
  constructor(typeStation) {
    this.typeStation = typeStation;
    this.queue = [];
    this.filling = [];
    this.ready = [];
  }

  init() {
    for (const optionStation of this.typeStation) {
      for (let i = 0; i < optionStation.count; i++) {
        this.filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }
    // setInterval(() => {
    //   this.checkQueueToFilling();
    // }, 200);
  }
}

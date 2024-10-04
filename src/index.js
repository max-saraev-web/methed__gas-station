import {PassangerCar, PassangerCarGaz, Truck} from './scripts/modules/car';
import {Station} from './scripts/modules/station';
import './style.css';

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCarGaz: [
    ['Lada', 'Vesta CNG', 90],
    ['Lada', 'Largus CNG', 90],
    ['VW ', 'Passat 1.4 TSI Ecofuel', 30],
  ],
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
  ],
};


const getTestCar = () => {
  const typeBool = Math.random() < 0.6;
  if (typeBool) {
    const typeBool = Math.random() < 0.6;
    const listCar = typeBool ? testArray.passangerCar :
      testArray.passangerCarGaz;
    const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
    return typeBool ? new PassangerCar(...randomCar) :
        new PassangerCarGaz(...randomCar);
  }
  const listCar = testArray.truck;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return new Truck(...randomCar);
};

// const station = new Station([
//   {
//     type: 'petrol',
//     count: 3,
//     speed: 5,
//   },
//   {
//     type: 'diesel',
//     count: 1,
//     speed: 10,
//   },
// ], '.app');
const station = new Station([
  {
    type: 'petrol',
  },
  {
    type: 'diesel',
    count: 1,
    speed: 10,
  },
  {
    type: 'gaz',
  },
], '.app');

open.addEventListener('click', () => {
  station.init();
  console.log(station);
  console.log('открыто!');
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    const testCar = getTestCar();
    station.addCarQueue(testCar);
  });
});

// console.log(getTestCar());


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { Driver } from './interfaces/DriverInterface';
import { associateImageWithDriver } from './utils';
export let drivers = require('./public/drivers.json');
const driverController = require('./controllers/driverController');

const app = express();
const port: number = 3000;

export let driversWithPlaces: Driver[];

app.listen(port, () => {
  //saves to memory only once at startup
  driversWithPlaces = driverController.assign_random_places(drivers);
  associateImageWithDriver(driversWithPlaces);
  return console.log(`Express is listening at http://localhost:${port}`);
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/api/drivers', driverController.get_drivers);

app.post('/api/drivers/:driverId/overtake', driverController.overtake_driver);
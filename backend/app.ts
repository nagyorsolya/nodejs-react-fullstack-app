import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { Driver } from './interfaces/DriverInterface';
import { associateImageWithDriver } from './utils';
export let drivers = require('./public/drivers.json');
import { PORT_NUMBER } from './constants';

const driverController = require('./controllers/driverController');
const driverRoutes = require('./routes/driverRoutes');

const app = express();

export let driversWithPlaces: Driver[];

app.listen(PORT_NUMBER || 3000, () => {
  //saves to memory only once at startup
  driversWithPlaces = driverController.assign_random_places(drivers);
  associateImageWithDriver(driversWithPlaces);
  return console.log(`Express is listening at ${PORT_NUMBER}`);
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.use('/api/drivers', driverRoutes);
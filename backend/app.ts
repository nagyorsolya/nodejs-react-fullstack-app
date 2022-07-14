import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { associateImageWithDriver } from './utils';
export let drivers = require('./public/drivers.json');
const driverController = require('./controllers/driverController');

const app = express();
const port = 3000;

export let driversWithPlaces;

app.listen(port, () => {
  //saves to memory only once at startup
  driversWithPlaces = driverController.assign_random_places(drivers);
  associateImageWithDriver(driversWithPlaces);
  return console.log(`Express is listening at http://localhost:${port}`);
});

// middlewares
app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', driverController.get_drivers);

app.post('/', (req, res) => {
  res.send('Sending data.');
});
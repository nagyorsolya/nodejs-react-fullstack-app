import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const driverController = require('./controllers/driverController');


const app = express();
const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// middlewares
app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', driverController.get_drivers);

app.post('/', (req, res) => {
  res.send('Sending data.');
});
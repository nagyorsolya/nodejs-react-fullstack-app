import express from 'express';
const driverController = require('../controllers/driverController');

const router = express.Router();

//driver routes
router.get('/', driverController.get_drivers);

router.post('/:driverId/overtake', driverController.overtake_driver);

router.post('/:driverId/overtaketo/:place', driverController.overtake_multiple_places);

module.exports = router;
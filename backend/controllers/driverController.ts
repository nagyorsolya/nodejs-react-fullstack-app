import { driversWithPlaces } from '../app';
import { getRandomOrder, sortDrivers } from '../utils';

//assign places at startup
//TODO: return with driver object
const assign_random_places = (drivers): any => {
    const randomOrder: number[] = getRandomOrder(drivers.length);
    for (let i = 0; i < randomOrder.length; i++) {
        drivers[i]["place"] = randomOrder[i];
        console.log(drivers[i]);
    }
    return sortDrivers(drivers);
};

const get_drivers = (req, res): void => {
    res.status(200).json(sortDrivers(driversWithPlaces));
};

const overtake_driver = (req, res) => {
    const driverId = parseInt(req.params.driverId);

    if (driverId === 1) {
        res.status(403).send('Driver in the first place cannot overtake anyone.');
    } else if (!driversWithPlaces.find(driver => driver.id === driverId)) {
        res.status(500).send('There is no driver with the given ID.');
    } else {
        let driverOvertaking = driversWithPlaces.find(driver => driver.id === driverId);
        let driverToOvertake = driversWithPlaces.find(driver => driver.place === driverOvertaking.place - 1);
        driverOvertaking.place--;
        driverToOvertake.place++;
    }
    res.status(200).json(sortDrivers(driversWithPlaces));
};

module.exports = {
    assign_random_places,
    get_drivers,
    overtake_driver
};
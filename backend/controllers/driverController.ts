import { driversWithPlaces } from '../app';
import { getRandomOrder, sortDrivers } from '../utils';
import { Driver } from '../interfaces/DriverInterface';

//assign places at startup
const assign_random_places = (drivers): Driver[] => {
    const randomOrder: number[] = getRandomOrder(drivers.length);
    for (let i = 0; i < randomOrder.length; i++) {
        drivers[i].place = randomOrder[i];
    }
    return sortDrivers(drivers);
};

const get_drivers = (req, res): void => {
    res.status(200).json(sortDrivers(driversWithPlaces));
};

const overtake_driver = (req, res): void => {
    const driverId: number = parseInt(req.params.driverId);
    let driverOvertaking: Driver = driversWithPlaces.find(driver => driver.id === driverId);

    if (driverOvertaking.place === 1) {
        res.status(403).send('Driver in the first place cannot overtake anyone.');
    } else if (!driverOvertaking) {
        res.status(500).send('There is no driver with the given ID.');
    } else {
        let driverToOvertake: Driver = driversWithPlaces.find(driver => driver.place === driverOvertaking.place - 1);
        driverOvertaking.place--;
        driverToOvertake.place++;
    }
    res.status(200).json(sortDrivers(driversWithPlaces));
};

const overtake_multiple_places = (req, res): void => {
    const driverId: number = parseInt(req.params.driverId);
    const requestedPlace: number = parseInt(req.params.place);
    const driver: Driver = driversWithPlaces.find(driver => driver.id === driverId);

    if (driver) {
        for (let i = 0; i < driversWithPlaces.length; i++) {
            let currentDriver: Driver = driversWithPlaces[i];
            if (requestedPlace < driver.place) {
                //people being overtaken are assigned places further behind
                if (currentDriver.place < driver.place && currentDriver.place >= requestedPlace) {
                    currentDriver.place++;
                }
            } else {
                //people overtaking are assigned places further along
                if (currentDriver.place > driver.place && currentDriver.place <= requestedPlace) {
                    currentDriver.place--;
                }
            }
        }
        driver.place = requestedPlace;
        res.status(200).send(sortDrivers(driversWithPlaces));
    } else {
        res.status(500).send('There is no such driver.');
    }
}

module.exports = {
    assign_random_places,
    get_drivers,
    overtake_driver,
    overtake_multiple_places
};
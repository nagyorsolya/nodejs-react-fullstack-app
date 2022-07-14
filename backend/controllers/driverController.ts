import { driversWithPlaces } from '../app';
import { getRandomOrder } from '../utils';

//assign places at startup
//TODO: return with driver object
const assign_random_places = (drivers): any => {
    const randomOrder: number[] = getRandomOrder(drivers.length);
    for (let i = 0; i < randomOrder.length; i++) {
        drivers[i]["place"] = randomOrder[i];
        console.log(drivers[i]);
    }
    return drivers.sort((a, b) => a.place - b.place);
};

const get_drivers = (req, res): void => {
    res.status(200).json(driversWithPlaces);
};

module.exports = {
    assign_random_places,
    get_drivers
};
import drivers from '../public/drivers.json';

const get_drivers = (req, res) => {
    res.status(200).json(drivers);
}

module.exports = {
    get_drivers
};
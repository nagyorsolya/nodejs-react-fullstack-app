import { useEffect, useState } from 'react';
import { Driver } from '../interfaces/DriverInterface';

function Drivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/drivers')
            .then(async (res) => {
                const response = await res.json();
                setDrivers(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const driverList = drivers.length ? drivers.map((driver: Driver) => {
        return (
            <div key={driver.id}>
                <p>{`${driver.firstname} ${driver.lastname}`}</p>
                <p>{driver.team}</p>
                <p>{driver.place}</p>
                <p>{driver.code}</p>
                {/* TODO: import photo */}
            </div>
        )
    }) : (<p>There are no drivers to show.</p>);
    return (
        <div>
            {driverList}
        </div>
    );
}

export default Drivers;

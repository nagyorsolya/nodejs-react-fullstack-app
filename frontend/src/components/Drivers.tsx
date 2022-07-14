import React, { useEffect, useState } from 'react';

import { Driver } from '../interfaces/DriverInterface';

const Drivers: React.FC = () => {

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

    const overTake = (id: number) => {
        fetch(`http://localhost:3000/api/drivers/${id}/overtake`, {
            method: 'POST'
        }).then(async (res) => {
            const response = await res.json();
            setDrivers(response);
        })
    }

    const driverList = drivers.length ? drivers.map((driver: Driver) => {
        return (
            <li className="collection-item avatar" key={driver.id}>
                <img alt="The driver" className="circle" src={`http://localhost:3000/${driver.imgUrl}`} />
                <b><span className="title">{`${driver.firstname} ${driver.lastname}`}</span></b>
                <p>{`Team: ${driver.team}`} <br />
                    {`Current place: ${driver.place}`} <br />
                    {`Code: ${driver.code}`}
                </p>
                {driver.place === 1 ? null : <button className="waves-effect waves-light btn-small secondary-content" onClick={() => overTake(driver.id)}>Overtake</button>}
            </li>
        )
    }) : (<p>There are no drivers to show.</p>);
    return (
        <ul className="collection">
            {driverList}
        </ul>
    );
}

export default Drivers;

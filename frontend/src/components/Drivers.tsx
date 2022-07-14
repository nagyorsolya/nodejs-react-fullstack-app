import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';


import { Driver } from '../interfaces/DriverInterface';

const Drivers: React.FC<{ drivers: Driver[], overtake: (id: number) => any }> = (props) => {
    const driverList = props.drivers.length ? props.drivers.map((driver: Driver, index) => {
        return (
            <Draggable draggableId={driver.id.toString()} index={index} key={driver.id}>
                {
                    (provided) => (
                        <li className="collection-item avatar" key={driver.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                            <img alt="The driver" className="circle" src={`http://localhost:3000/${driver.imgUrl}`} />
                            
                            <b><span className="title">{`${driver.firstname} ${driver.lastname}`}<img className="flag" alt="country flag" src={`https://countryflagsapi.com/png/${driver.country.toLocaleLowerCase()}`}/></span></b>
                            <p>{`Team: ${driver.team}`} <br />
                                {`Current place: ${driver.place}`} <br />
                                {`Code: ${driver.code}`}
                            </p>
                            {driver.place === 1 ? null : <button className="waves-effect waves-light btn-small secondary-content" onClick={() => props.overtake(driver.id)}>Overtake</button>}
                        </li>
                    )
                }
            </Draggable>
        )
    }) : (<p>There are no drivers to show.</p>);
    return (
        <Droppable droppableId="drivers">
            {
                (provided) => (
                    <ul className="collection" ref={provided.innerRef} {...provided.droppableProps}>
                        {driverList}
                        {provided.placeholder}
                    </ul>
                )
            }
        </Droppable>
    );
}

export default Drivers;


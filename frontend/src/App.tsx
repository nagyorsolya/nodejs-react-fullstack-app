import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

import { API_ROOT } from './config';

import './index.css';

import Drivers from './components/Drivers';
import { Driver } from './interfaces/DriverInterface';
import Navbar from './components/Navbar';

const App: React.FC = () => {

  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    fetch(API_ROOT)
      .then(async (res) => {
        const response = await res.json();
        setDrivers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const overtake = (id: number) => {
    fetch(`${API_ROOT}/${id}/overtake`, {
      method: 'POST'
    }).then(async (res) => {
      const response = await res.json();
      setDrivers(response);
    })
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId, source } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }
    //stops screen from flickering when drag&drop animation "redrops" before fetch is completed
    let copyOfDrivers: Driver[] = drivers.slice();
    let driver: Driver = copyOfDrivers.splice(source.index, 1)[0];
    copyOfDrivers.splice(destination.index, 0, driver);
    setDrivers(copyOfDrivers);

    fetch(`${API_ROOT}/${draggableId}/overtaketo/${destination.index + 1}`, {
      method: 'POST'
    })
      .then(async (res) => {
        const response = await res.json();
        setDrivers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/drivers" />} />
          <Route path="/drivers" element={<Drivers drivers={drivers} overtake={overtake} />} />
        </Routes>
      </BrowserRouter>
    </DragDropContext>
  );
}

export default App;

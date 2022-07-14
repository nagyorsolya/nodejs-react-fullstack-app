import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

import './index.css';

import Drivers from './components/Drivers';
import { Driver } from './interfaces/DriverInterface';

function App() {

  const [drivers, setDrivers] = useState<Driver[]>([]);

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

  const overtake = (id: number) => {
    fetch(`http://localhost:3000/api/drivers/${id}/overtake`, {
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
    fetch(`http://localhost:3000/api/drivers/${draggableId}/overtaketo/${destination.index + 1}`, {
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
        <Routes>
          <Route path="/drivers" element={<Drivers drivers={drivers} overtake={overtake} />} />
        </Routes>
      </BrowserRouter>
    </DragDropContext>
  );
}

export default App;

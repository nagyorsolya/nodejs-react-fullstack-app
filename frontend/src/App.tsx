import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Drivers from './components/Drivers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drivers />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

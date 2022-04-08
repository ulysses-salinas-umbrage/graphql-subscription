import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './utils/routes';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <div>
          <Routes>
            {routes.map(route => (
              <Route
                exact
                path={route.path}
                element={<route.component />}
                key={route.path}
              />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <Login />
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}

export default App;

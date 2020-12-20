import React from 'react';
import logo from './logo.svg';
import './App.css';

// import Crypto from './Crypto';
import CryptoFunctional from './CryptoFunctional';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Crypto Rate</h1>
      </header>
      {/* <Crypto /> */}
      <CryptoFunctional />

    
    </div>
  );
}

export default App;

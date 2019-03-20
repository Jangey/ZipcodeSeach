import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Link, Route} from 'react-router-dom';
import Zipcode from './ZipCode/Zipcode';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* Navigation Bar */}
          <ul className="navBar">
            <li><Link to="/zipcode">Zipcode</Link></li>
          </ul>

          {/* Junjie Lu's route */}
          <Route path="/zipcode" component={Zipcode}/>
        </header>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

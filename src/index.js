import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Survey from './Pages/Survey'
import Login from './Pages/Login'
import Register from './Pages/Register'
import InputPasien from './Pages/InputPasien'
import GoogleMaps from './Pages/GoogleMaps'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/survey" exact component={Survey}/>
      <Route path="/input-pasien" exact component={InputPasien}/>
      <Route path="/google-maps" exact component={GoogleMaps}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

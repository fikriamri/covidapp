import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Survey from './Pages/Survey'
import Login from './Pages/Login'
import Register from './Pages/Register'
import InputPasien from './Pages/InputPasien'
import GoogleMaps from './Pages/GoogleMaps'
import Report from './Pages/Report'
import ListPasien from './Pages/ListPasien'
import ThankYou from './Pages/ThankYou'
import Auth from './Components/Auth'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* needed for immediately test function in netlify */}
      {/* <Route path="/" exact component={GoogleMaps}/> */}
      <Route path="/" exact component={Survey}/>
      {/* <Route path="/" exact component={Main}/>
      <Route path="/App" exact component={App}/> */}
      <Route path="/login" exact component={Login}/>
      <Route path="/report" exact component={Auth(Report)}/>
      <Route path="/register" exact component={Register}/>
      {/* <Route path="/survey" exact component={Survey}/> */}
      <Route path="/input-pasien" exact component={Auth(InputPasien)}/>
      <Route path="/list-pasien" exact component={Auth(ListPasien)}/>
      <Route path="/thank-you" exact component={Auth(ThankYou)}/>
      <Route path="/google-maps" exact component={GoogleMaps}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

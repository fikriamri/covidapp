import React from 'react';
import axios from 'axios';

class GoogleMaps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    }
  }

  handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleGetCoordinates, this.handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  handleGetCoordinates = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
    console.log(position.coords);
  }

  handleLocationError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("An unknown error occurred.")
        break;
    }
  }

  /**
   * @method handleGetUserLocation
   * @summary Get User Location using Google API
   * @param {string} latitude - User's latitude coordinates
   * @param {string} longitude - User's longitude coordinates
   * @return {undefined}
   */
  handleGetUserLocation = async (latitude, longitude) => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    const apiKey = '&key=AIzaSyAtJjcjFBzjxF908drCFRGAXBF-EvefsSo';
    const url = `${baseUrl}${this.state.latitude},${this.state.longitude}${apiKey}`;

    const dataProfile = await axios
      .get(url)
      .then((response) => {
        const userAddress = response.data.results[0].formatted_address;
        console.log(response.data.results[0].formatted_address);
        this.setState({
          userAddress
        })
        // return response.data;
      });
  }

  render() {
    return (
      <div className="GoogleMapsApp">
        <h2>
          PoC Get User Position
        </h2>
        <button onClick={this.handleGetLocation}>Get coord</button>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <button onClick={this.handleGetUserLocation}>Get User Location</button>
        <p>User Address: {this.state.userAddress}</p>
      </div>
    );
  }
}

export default GoogleMaps;
import React from "react";
import axios from "axios";
import GoogleMaps from "../../Components/GoogleMaps";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      startDate: new Date(),
      photo: null,
      urlPhoto: "",
      progress: 0,
      adress: null,
      additialNotes: null,
      markers: {
        position: {
          lat: null,
          lng: null
        },
        key: Date.now(),
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      },
      mapCenter: { lat: -6.2123751, lng: 106.8205107 },
      access_token: "AIzaSyAtJjcjFBzjxF908drCFRGAXBF-EvefsSo",
      mapRef: null,
      lat: null,
      lng: null
    };
  }

  // Function for changing latitude and longitude stored in state by user's click. The latitude and longitude then used for determine its address

  handleMapClick = async event => {
    console.log(event.latLng.lat())
    // let mapRef = this._mapComponent;
    const self = this;
    const config = {
      method: "GET",
      url:
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        event.latLng.lat() +
        "," +
        event.latLng.lng() +
        "&key=" +
        this.state.access_token
    };
    await axios(config)
      .then(function(response) {
        self.setState({
          markers: {
            position: event.latLng,
            key: Date.now(),
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"

          },
          mapCenter: event.latLng,
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          adress: response.data.results[0].formatted_address
        });
        // self.setState({ adress: response.data.results[0].formatted_address });
      })
      .catch(function(error) {
        alert("Oooppss!", "Ada yang error!", "error");
      });
  };

  // Function for loading map
  handleMapLoad = map => {
    this._mapComponent = map;
  };

  // Function that will run after page rendered to determine user's location based on latitude and longitude retrieved from user's device
  componentDidMount = async props => {
    await navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      // this.setState({
      //   markers: {
      //     position: { lat: latitude, lng: longitude },
      //     
      //     key: Date.now()
      //   },
      //   mapCenter: { lat: latitude, lng: longitude },
      //   lat: latitude,
      //   lng: longitude
      // });
      const self = this;
      const config = {
        method: "GET",
        url:
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          latitude +
          "," +
          longitude +
          "&key=" +
          this.state.access_token
      };
      await axios(config)
        .then(function(response) {
          console.log(response);
          self.setState({ 

            mapCenter: { lat: latitude, lng: longitude },

          });
        })
        .catch(function(error) {
          alert("Oooppss!", "Ada yang error!", "error");
        });
    });
  };

  render() {
    console.log('aw')
    console.log(this.state.adress)
    console.log(this.state.lat)
    console.log(this.state.lng)
      return (
        <div>
          <div className="pageBody">
            <div
              className="p-0 m-0"
              style={{
                height: "100vh",
                textAlign: "center"
              }}
            >
              <div className="row justify-content-center p-0 m-0"></div>
              <br />
              <div className="col-10 text-left">
                <h2 className="font">Tukar Sampahmu</h2>
              </div>
              <div
                className="row justify-content-center"
                style={{ padding: "0", margin: "0" }}
              ></div>

              <br />
              <div className="row text-center p-0 m-0 justify-content-center">
                <div className="col-11 font">
                  <h5 className="text-left">
                    Klik posisi di peta untuk menentukan alamat
                    penjemputan
                  </h5>
                </div>
                <div className="col-11">
                  <div className="maps">
                    <GoogleMaps
                      // googleMapURL="https://maps.googleapis.com/maps/api/js?key=process.env.REACT_APP_GOOGLE_API_KEY"
                      markers={this.state.markers}
                      center={this.state.mapCenter}
                      handleMapLoad={this.handleMapLoad}
                      handleMapClick={this.handleMapClick}
                    />
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className="col-11 font">
                  <h6 className="text-left">Alamat</h6>
                  <p className="text-left">{this.state.adress}</p>
                  <h6 className="text-left">Latitude</h6>
                  <p className="text-left">{this.state.lat}</p>
                  <h6 className="text-left">Longitude</h6>
                  <p className="text-left">{this.state.lng}</p>
                  <h5 className="text-left">
                    Beri keterangan tambahan agar kami lebih mudah
                    menemukan Anda
                  </h5>
                  <textarea
                    // onChange={this.setAdditionalNotes}
                    type="text"
                    id="defaultFormLoginEmailEx"
                    className="form-control"
                    placeholder="Contoh: Di samping kanan warung hijau."
                  />
                  <br />
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      );
  }
}

export default Order;
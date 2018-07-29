/*import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';

class App extends Component {
    componentDidMount(){
          var mymap = L.map('mapid').setView([51.505, -0.09], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);
      }
    
    render() {
     return (
      <div id="mapid"></div>
    );
  }
}

export default App;*/

import React, {Component} from 'react'
import { render } from 'react-dom'
import ReactLeaflet, { Map, Marker, Popup, TileLayer } from 'react-leaflet'

//const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet
const { Map: LeafletMap } = ReactLeaflet


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}


export default App




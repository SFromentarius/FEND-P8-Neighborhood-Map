import React from 'react';
import _ from 'lodash';
import * as ReactLeaflet from 'react-leaflet';
import AddToCalendar from 'react-add-to-calendar';
import swal from 'sweetalert';

import './App.css';

const { Map: LeafletMap, TileLayer, Marker, Popup, FeatureGroup } = ReactLeaflet

class Map extends React.Component {
    constructor(props) {
    super(props);
        this.markerRef = React.createRef();
      }
    
    // when the button add to my calendar is clicked, scroll to see the dropdown element which just appears to offer selection of calendar
    scrollDown(){
        let dropdown = document.getElementsByClassName('react-add-to-calendar_dropdown');
        dropdown.scrollIntoView();
    }
   
    // openedPopupID is set when user click on item in ListView, then the matching marker's popup open
    // we also pass as argument the ref of the popup, the location of the marker and the ref of the map
    openPopup(id, openedPopupID, ref, pos, map, marker){
       if(openedPopupID && ref){
            if(id === openedPopupID){
            map.openPopup(ref.leafletElement, pos);
           
            /*if(marker){
                marker.leafletElement.setOpacity(0.5)
                console.log(marker)
                //setTimeout(function(){marker.current.setOpacity(1)}, 1000)
            }*/
                
            }    
        }
    }

    // when FeatureGroup is add, fire this function to fit bounds of the map with FeatureGroup (which is the group of markers)
    mapFitBounds(ref, map){
        if(ref && map && !_.isEmpty(ref.leafletElement.getBounds())){ //check if ref and map exists, and check if the array returned by ref.leafletElement.getBounds() is not empty. If empty, means there is no markers displayed, means bounds error
            map.fitBounds(ref.leafletElement.getBounds(),{maxZoom:14});
        } 
    }

    handleTileError(errorData){
        console.log(errorData)
        
        if(errorData){
            swal('Leaflet Map fails. Error getting basemap tiles.')
        }
    }
    
    render() {       
        // Nantes (French city) coordinates
        const position = [47.218371, -1.553621];
        const zoom= 13;  
        
        return (
          <LeafletMap ref='map' center={position} zoom={zoom} > 
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
                onTileerror={errorData => this.handleTileError(errorData)}
            />
            <FeatureGroup ref={ref => {
            if(ref){
            this.mapFitBounds(ref, this.refs.map.leafletElement)}}}> 
                
            {this.props.data && (
                /* showedData is either equivalent to all data or to filteredData (from query) */
                this.props.showedData.map(event=>{
                    return(
                            <Marker position={event.location} key={event.id} ref={this.markerRef} alt={event.name}>
                                <Popup tabindex='0' maxWidth='350' ref={ref => this.openPopup(event.id, this.props.openedPopupID, ref, event.location, this.refs.map.leafletElement, this.markerRef.current)}>
                                {/*instead of ref={ref => !event.valid && setTimeout(() => this.x(event.id, event.location))}*/}
                                {/*used method saw on https://github.com/PaulLeCam/react-leaflet/issues/317*/}
                                    <img src={event.urlMedia} alt={event.name}/>
                                    {!event.urlMedia && (<p>Photo non disponible</p>)}
                                    <h2>{event.name}</h2> 
                                    <span className='popup-date'>{event.date} <br/>{event.startTime} 
                                        {event.endTime && ( <span> - </span> )} 
                                    {event.endTime}</span><br/>
                                    <span className='popup-place'>{event.place}</span> <br/>
                                    <span className='popup-description'>{event.description}</span> <br/>
                                    
                                    {event.link &&(
                                        <span className='popup-lien'>Plus d'informations : <a href={event.link} target='blank'>{event.link}</a></span>                   
                                    )}
                                                         
                                    <AddToCalendar event={{
                                        title:event.name,
                                        description:event.description,
                                        location:event.place,
                                        startTime:event.startTime,
                                        endTime:event.endTime
                                    }} onClick={this.scrollDown} buttonLabel="Ajouter à mon calendrier" role='button'/>
                                </Popup>
                            </Marker>                   
                    )
                })
            )}
            </FeatureGroup>           
          </LeafletMap>
        );
    }
}

export default Map;
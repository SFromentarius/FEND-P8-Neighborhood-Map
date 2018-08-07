import React from 'react';
import './App.css';


const LocationFilter =(props)=> {
    return (
        <div className='location-filter'>
            {props.asideClassName === 'sm-aside-open' && (
                <p><i>Cliquez sur un événement pour voir plus d'informations</i></p>
            )}
            <input tabIndex='1'
                value={props.query}
                type='text'
                placeholder="Rechercher un événement par son nom..."
                onChange={(e)=>props.updateQuery(e.target.value)}
                aria-label='Rechercher un événement par son nom...'
            />
            {/*<span className="list-sorted-type">sorted by date</span><br/>*/}
        </div>
    )
}

export default LocationFilter;
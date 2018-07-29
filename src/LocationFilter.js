import React from 'react';
import './App.css';


const LocationFilter =(props)=> {
    return (
        <div className='location-filter'>
            {props.asideClassName === 'sm-aside-open' && (
                <p><i>click on an event to view related information</i></p>
            )}
            <input tabIndex='1'
                value={props.query}
                type='text'
                placeholder="Search an event name..."
                onChange={(e)=>props.updateQuery(e.target.value)}
                aria-label='Search for an event name...'
            />
            <span className="list-sorted-type">sorted by date</span><br/>
        </div>
    )
}

export default LocationFilter;
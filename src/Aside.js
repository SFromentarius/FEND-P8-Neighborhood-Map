import React from 'react';
import './App.css';
import ListView from './ListView';
import LocationFilter from './LocationFilter';

const Aside =(props)=> {
        return (
            <div className={props.asideClassName}>
                <p className="today-events-number" style={{color: props.todayEventsNumberColor}}>{props.showedData.length} événements aujourd'hui</p>
                {props.query &&(
                    <span style={{color: props.todayEventsNumberColor}}>avec le mot-clé "{props.query}"</span>
                )}
                
                <LocationFilter
                    data={props.data}
                    query={props.query}
                    updateQuery={props.updateQuery}
                    asideClassName={props.asideClassName}
                />
                <ListView
                    data={props.data}
                    showedData={props.showedData}
                    handleClick={props.handleClick}
                    asideClassName={props.asideClassName}
                />
            </div>
        )
}

export default Aside;
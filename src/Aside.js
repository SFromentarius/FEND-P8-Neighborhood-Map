import React from 'react';
import './App.css';
import ListView from './ListView';
import LocationFilter from './LocationFilter';

const Aside =(props)=> {
        return (
            <div className={props.asideClassName}>
                <p className="today-events-number">{props.showedData.length} événements aujourd'hui</p>
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
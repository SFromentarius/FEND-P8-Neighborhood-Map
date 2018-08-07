import React from 'react';
import './App.css';

const Header =()=> {
    return (
        <div className='header'>
            <h1>Événements du jour</h1>
            <h3 className='header-details'>Nantes et Nantes Métropole</h3>
            {/*<h4 className='header-details'>avec des données open source partagées par Nantes Métropole</h4>*/}
        </div>
    )
}

export default Header;
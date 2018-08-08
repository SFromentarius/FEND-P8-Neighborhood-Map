import React from 'react';
import './App.css';

class ListView extends React.Component {
  render() {  
      // accessibility trick, seen on https://dev.to/johnlukeg/make-react-navigation-accessible-again
      const buildHandleEnterKeyPress = (onClick) => ({ key }) => {
          if (key === 'Enter') { 
            onClick(); 
          }
        };
    return (
        <ul className='list-view'>
                {this.props.data &&(
                    this.props.showedData.map((data, index)=>{
                        return(
                            <li role='button' key={data.id} id={data.id} onClick={this.props.handleClick.bind(this, data.id)} onKeyPress={buildHandleEnterKeyPress(this.props.handleClick.bind(this, data.id))} tabIndex='0'> 
                                <b className="list-name">{data.name}</b> <br/> 
                                <i className="list-location">{data.place}</i> <br/>
                                <span className="list-date">{data.startTime} 
                                        {data.endTime && ( <span> - </span> )} 
                                    {data.endTime}</span>
                                {/*<span className="list-date">{data.date}</span>*/}
                            </li>
                        )
                    })
                )}
            <li className="list-name list-bottom">source : Agenda des événements de la Ville de Nantes et de Nantes Métropole, Nantes Métropole, 08/08/2018, sous licence ODbL.</li>
            <li className="list-name">créé par @<a href='https://twitter.com/SFromentarius' target='_blank' rel="noopener noreferrer">SFromentarius</a></li>
        </ul>
     
    );
  }
}

export default ListView;


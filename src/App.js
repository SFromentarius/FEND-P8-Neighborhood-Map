import React from 'react';
import _ from 'lodash';
import escapeRegExp from 'escape-string-regexp';
import moment from 'moment';
import swal from 'sweetalert';
import './App.css';
import Map from './Map';
import Aside from './Aside';
import Header from './Header';

//React Content Loader
//from http://danilowoz.com/create-content-loader/
import ContentLoader from 'react-content-loader';

//"Agenda des événements de la Ville de Nantes et de Nantes Métropole" API, about city events in the Nantes' City
const API = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_agenda-evenements-nantes-nantes-metropole&rows=25&sort=-date&facet=emetteur&facet=rubrique&facet=lieu&facet=ville'

//React Content Loader
const MyLoader = props => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f7cd59"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="92" y="140" rx="5" ry="5" width="220" height="10" /> 
  </ContentLoader>
)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isLoading: false,
            error: null,
            openedPopupID:'', 
            query:'',
            asideClassName:'aside',
            mapClassName:'leaflet-container'
        };
    }

    componentDidMount() {
        //until data are loaded: return Loading page
        this.setState({ isLoading: true });
        
        // get the data
        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else { // if the response doesn’t match the expected data
                throw new Error('Something went wrong ...');
                }
            })  
            .then(data => {
                //get useful data
                let prelocationData = data.records.map((event)=>{
                    //console.log(event.heure_debut + event.heure_fin);
                    
                    let date = event.fields.date;
                    let name = event.fields.nom;
                    let place = event.fields.lieu;
                    let description = event.fields.description;
                    let urlMedia = event.fields.media_1;
                    let link = event.fields.lien_agenda;
                    let id = event.recordid;
                    let startTime = event.fields.heure_debut;  
                    let endTime = event.fields.heure_fin;
                    //location, from string to a latLng array
                    let locString = event.fields.location;
                    let location = JSON.parse("[" + locString + "]");
                    
                    return {name:name, date:date, location:location, place:place, description:description, urlMedia:urlMedia, link:link, startTime:startTime, endTime:endTime, id:id};
            })
            
                //sort by date
                prelocationData = _.sortBy(prelocationData, 'date');

                //change the date format
                let locationData = prelocationData.map((event)=>{
                    let name = event.name;
                    let place = event.place;
                    let description = event.description.split('.', 1)[0];
                    let urlMedia = event.urlMedia;
                    let link = event.link;
                    let id = event.id;
                    let location = event.location;
                    let startTime = event.startTime;
                    let endTime = event.endTime;
                    //deals with the event date 
                    let options = { year: 'numeric', month: 'long', day: 'numeric' };
                    let unFormattedDate = new Date(event.date);
                    let predate = unFormattedDate.toLocaleDateString('fr-FR', options);
                    let date=predate;
                                        
                    let dateStartTime
                    if(startTime){
                        let predateStartTime = moment(unFormattedDate + " " + startTime);
                        dateStartTime = (predateStartTime._i)
                    } else {
                        dateStartTime = unFormattedDate
                    }
                                        
                    let dateEndTime
                    if(dateEndTime){
                        let predateEndTime = moment(unFormattedDate + " " + endTime);
                        dateEndTime = (predateEndTime._i)
                    } else {
                        dateEndTime = ''
                    }
                    
                    return {name:name, date:date, location:location, place:place, description:description, urlMedia:urlMedia, link:link, startTime:startTime, endTime:endTime, dateStartTime:dateStartTime, dateEndTime:dateEndTime, id:id};
            })
            
                    this.setState({ 
                        data: locationData, 
                        isLoading: false })
                    })
            .catch(error => this.setState({ error, isLoading: false })); //for most of erroneous status code
    }
    
    // to handle click on a list item, which set this.state.openedPopupID to item's id (which will be used in openPopup() in Map.js)
    handleClick(id, e){
        this.setState({openedPopupID:id})
        if(this.state.asideClassName === 'sm-aside-open'){
            this.setState({asideClassName:'aside'})
        }
    }

    // to set query state from the user input's value 
    updateQuery=(query)=>{
        this.setState({query: query.trim()}) 
    }
    
    menuClick(){
        this.setState({asideClassName:'sm-aside-open'})
        
    }
    
    render() {     
        // original data are filtered to only have showedData = the data which matches the query 
        let showedData;
        if(this.state.query){ // is true = existing
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            // The match() method retrieves the matches when matching a string against a regular expression.
            showedData = this.state.data.filter((data)=>match.test(data.name)) 
        } else {
            // if there is no query, show all
            showedData = this.state.data
        }
        
        
        //if an error is thrown
        if (this.state.error) {
          swal(this.state.error.message);
        }
        
        //if loading, display this Loading Page
        if (this.state.isLoading) {
            //return <p>Loading ...</p>;
            return <MyLoader/>
        }
        // when finishes loading, display the website       
        return (
            <div className='sub-container'>
                <div className='sm-menu' onClick={this.menuClick.bind(this)} role="navigation" type="button" aria-haspopup="true" aria-controls="eventList" aria-expanded="false"><ul><li></li><li></li><li></li></ul></div>
                <Header/>
                <Aside id='eventList'
                    data={this.state.data}
                    handleClick={this.handleClick.bind(this)}
                    query={this.state.query}
                    updateQuery={this.updateQuery.bind(this)}
                    showedData={showedData}
                    asideClassName={this.state.asideClassName}
                />
                <Map
                    data={this.state.data}
                    openedPopupID={this.state.openedPopupID}
                    query={this.state.query}
                    showedData={showedData}
                />            
            </div>
        );  
    }
}

export default App;
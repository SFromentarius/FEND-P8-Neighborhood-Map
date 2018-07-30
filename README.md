# Neighborhood map
## Final projet for the Front-End Web Developer Nanodegree Udacity Program

The aim of this final project was to develop a single page application featuring a map of a neighborhood of our choice. We had to add functionalities to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

## How to see the project ?
- You can directly go on the [Github Pages](https://sfromentarius.github.io/FEND-P8-Neighborhood-Map/)
- Or you can clone the projet, cd on master branch, and run `npm install` to install modules, then `npm start`.

## The data
I choosed to use open data from the French City of Nantes. These data are about the events of the City of Nantes. You can find the original API [here](https://data.nantesmetropole.fr/explore/dataset/244400404_agenda-evenements-nantes-nantes-metropole/information/?disjunctive.emetteur&disjunctive.rubrique&disjunctive.lieu&disjunctive.ville&rows=5&sort=date&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJzY2F0dGVyIiwiZnVuYyI6IkNPVU5UIiwieUF4aXMiOiJpZF9tYW5pZiIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiNGMThDMDAifV0sInhBeGlzIjoicnVicmlxdWUiLCJtYXhwb2ludHMiOm51bGwsInRpbWVzY2FsZSI6IiIsInNvcnQiOiIiLCJjb25maWciOnsiZGF0YXNldCI6IjI0NDQwMDQwNF9hZ2VuZGEtZXZlbmVtZW50cy1uYW50ZXMtbmFudGVzLW1ldHJvcG9sZSIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUuZW1ldHRldXIiOnRydWUsImRpc2p1bmN0aXZlLnJ1YnJpcXVlIjp0cnVlLCJkaXNqdW5jdGl2ZS5saWV1Ijp0cnVlLCJkaXNqdW5jdGl2ZS52aWxsZSI6dHJ1ZX19fV0sImRpc3BsYXlMZWdlbmQiOnRydWUsInRpbWVzY2FsZSI6IiJ9). It was the opportunity to use an external API, already existing and with relevant information.

## User Experience
Once you're on the website, you will have a map, which displays some upcoming event in Nantes through markers. You can click on them to have some information about the event, showing in a popup. In the popup there is also an "add to calendar" button, to allow user to add the selected event to its favorite online calendar.

You will also have a list on the left side, displaying the full list of the upcoming event, sorted by date. If you click on one of them, the related popup will open above the related marker. 

Just above the list you can enter a research about an event's name, and the list will be sorted by your query. The matching markers will also be sorted.

## Ressources
- To create this project, I used [create-react-app](chrome-extension://hddnkoipeenegfoeaoibdmnaalmgkpip/toby.html).
- For the map, I choose to use the open source [leaflet library](https://leafletjs.com/).
- To combine both React and Leaflet, I used [react-leaflet](https://react-leaflet.js.org/), very well documented.


I also use some other ressources such as [lodash](https://github.com/lodash/lodash) to sort the fetched data by date, [moment](http://momentjs.com/) to combine various date format, and [react-add-to-calendar](https://www.npmjs.com/package/react-add-to-calendar) to add a "add to calendar" button in the event popup.

Also, I find some articles very useful, such as [this one about fetching data in React](https://www.robinwieruch.de/react-fetching-data/) and [this other one giving some tips to make a React app more accessible](https://dev.to/johnlukeg/make-react-navigation-accessible-again).

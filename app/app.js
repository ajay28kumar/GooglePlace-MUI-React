import React from 'react';
import { render } from 'react-dom';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider} from 'material-ui';




class App extends React.Component {
  // Results from clicking on location 
  getCoords(lat, lng){
    console.log(lat, lng);
  }
 
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <GooglePlaceAutocomplete
        	results={this.getCoords}
        />
      </MuiThemeProvider>
    );
  }
}

render(
    <App/>,
    document.getElementById('app')
)


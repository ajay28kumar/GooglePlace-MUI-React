import React from 'react';
import { render } from 'react-dom';
// import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AutoCompletePlace from '../src/index.js';


injectTapEventPlugin();


class App extends React.Component {
  // Results from clicking on location
  getCoords(results){
    console.log(results);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AutoCompletePlace
          maxSearchResults={5}
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

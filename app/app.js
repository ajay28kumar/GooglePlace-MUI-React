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

  constructor(props) {
    super(props);

    this.state = {
      results : null
    };
    this.getCoords= this.getCoords.bind(this);
  };
  // Results from clicking on location
  getCoords(results){
    // console.log(results);
    this.setState({
      results
    })
  }

  render() {
    console.log(this.state.results);

    const locationArea = {
      Lat : 20.593684,
      Lng :78.96288000000004
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
        <AutoCompletePlace
          maxSearchResults={5}
        	results={this.getCoords}
          radius = {200000}
          location={locationArea}
          hintText = {"Start Searching places here"}
        />

        {this.state.results ?
            <div>
              <h1 className="text-center"> Result: </h1>
              <pre>{JSON.stringify(this.state.results, null, 2) }</pre>

            </div>



           :
           null}
           </div>


      </MuiThemeProvider>
    );
  }
}

render(
    <App/>,
    document.getElementById('app')
)

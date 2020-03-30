import React from 'react';
import './App.css';
import axios from 'axios';
import Venue from './Venue.js';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/venues')
      .then((response) => {
        console.log(response.data['data'])
        this.setState({venues: response.data['data']})
      })
      .catch(error => console.log(error))
  }

  render(){
    return (
      <div className="app-container">
        <h1>Welcome to Best Seat App 🍿</h1>

        {this.state.venues.map( venue => {
          const data = venue.attributes
          return(<Venue rows={data.rows}
                        columns={data.columns}
                        id={venue.id} />)}
        )}
      </div>
    )
  }
}

export default App;

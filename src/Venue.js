import React from 'react';
import axios from 'axios';

export default class Venue extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      best_seat: {
        id: null,
        row: null,
        column: null
      }
    }
  }

  genCharArray = (charA, charZ) => {
    var arr = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
  }

  getStatus(child_id, best_seat) {
    let iconClass = 'seat fa fa-user '
    // Seat availability
    if (this.props.available_seats.includes(child_id)) {
      iconClass += 'available '
    } else {
      iconClass += 'not-available '
    }

    // Ask for Best Seat
    if(child_id == best_seat.id) {
      iconClass += 'best-seat'
    }

    return iconClass;
  }

  createTable = (rows, columns, best_seat) => {
    let table = []
    let rows_array = this.genCharArray('a', 'z');

    // Outer loop to create parent
    for (let i = 1; i <= rows; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 1; j <= columns; j++) {
        let child_id = `${rows_array[i - 1]}${j}`
        children.push(
        <td id={`seat_${child_id}`} className="tooltip">
          <i className={ this.getStatus(child_id, best_seat)}></i>
          <span class="tooltiptext">{child_id}</span>
        </td>
        )
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/api/v1/venues/${this.props.id}/best_seat`)
    .then((response) => {
      let seat = response.data['data']['attributes']
      this.setState({best_seat: {id: seat.id, row: seat.row, column: seat.column} })
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
        <div className="single-venue" key={this.props.id}>
          <h2>Venue #{this.props.id}</h2>
          <table>
            <tbody>
              { this.createTable(this.props.rows, this.props.columns, this.state.best_seat)}
            </tbody>
          </table>
      </div>
    )
  }

}

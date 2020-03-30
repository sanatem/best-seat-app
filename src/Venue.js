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

  createTable = (rows, columns, best_seat) => {
    let table = []
    // Outer loop to create parent
    for (let i = 1; i <= rows; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 1; j <= columns; j++) {
        children.push(
        <td id={`seat_${i}_${j}`}>
          {( (i == best_seat.row && j == best_seat.column)
            ?
            <i className="fa fa-user best-seat"></i>
            :
            <i className="fa fa-user available"></i>
          )}
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

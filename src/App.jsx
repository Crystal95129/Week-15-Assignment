import React from 'react';
import './App.css';
import House from './house';


const HOUSES_ENDPOINT = 'https://6698482702f3150fb6708748.mockapi.io/Promineo_Tech_API/House';

export default class App extends React.Component {
    constructor(props){
      super(props);
      this.addNewRoom = this.addNewRoom.bind(this);
      this.deleteRoom = this.deleteRoom.bind(this);
    }

    render() {
      const houses = this.state
      ? this.state.houses.map((houses, index) => 
      <House 
        key={index}
        data={houses}
        addNewRoom = {this.addNewRoom}
        deleteRoom = {this.deleteRoom} />)
      : null;
      return(
        <div>
          {houses}
        </div>
      );
    }


    componentDidMount() {
      fetch(HOUSES_ENDPOINT)
        .then(res => res.json())
        .then(data => {
          this.setState({
            houses: data
         });
       });
    }

    deleteRoom(e, house, room) {
      const index = house.rooms.indexOf(room);
      house.rooms.splice(index, 1);
      updateHouse(house)
        .then(() =>{
          this.setState(state => {
            for (let h of state.houses) {
              if (h._id === house._id) {
                let h = house;
                break;
              }
            }
            return state;
          });
        });
        e.preventDefault();
    }

    addNewRoom(e, house, room) {
      house.rooms.push(index, 1);
      updateHouse(house)
        .then(() =>{
          this.setState(state => {
            for (let h of state.houses) {
              if (h._id === house._id) {
                let h = house;
                break;
              }
            }
            return state;
          });
        });
        e.preventDefault();
    }
}

function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(house)
    });
}


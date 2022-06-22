import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class Reservation extends Component {

    seat = () => {
        this.props.RestaurantStore.seatRes(this.props.res.id)
    }
    complete = () => {
        this.props.RestaurantStore.completeRes(this.props.res.id)
    }

    render() {
        return (
            <div className={this.props.res.completed ? "conditional" : null}>
                {this.props.res.name}
                <button onClick={this.complete}>complete reservation</button>
                <button onClick={this.seat}>seat reservation</button>
            </div>
        )
    }
}

//inject your store here
export default inject("RestaurantStore")(observer(Reservation))
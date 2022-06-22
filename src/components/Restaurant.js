import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ResInput from './ResInput';
import Reservation from './Reservation'

class Restaurant extends Component {
    add = () => {
        this.props.RestaurantStore.addRes(
            this.props.GeneralStore.name,
            this.props.GeneralStore.numPeople
        );
    };

    render() {
        return (
            <div>
                <span>You have {this.props.RestaurantStore.openTables} open tables</span>
                <div>People number: {this.props.RestaurantStore.restPopulation} in the restaurant</div>
                <div>reservations in restaurant: {this.props.RestaurantStore.completedTables}</div>
                {/* Add in # of completed tables with id "completedTables*/}
                <ResInput />
                <button id="addRes" onClick={this.add}>Add Reservation</button>
                {/* Make the Add Reservation button work */}
                <div className="reservations">
                    {this.props.RestaurantStore.reservations.map((i) => (
                        <Reservation res={i} key={i.id} />
                    ))}
                </div>
            </div>
        )
    }
}

export default inject("GeneralStore", "RestaurantStore")(observer(Restaurant))
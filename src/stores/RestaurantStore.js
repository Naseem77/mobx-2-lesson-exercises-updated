import { observable, computed, action, makeObservable } from 'mobx'
import { Reservation } from './ReservationStore'


export class RestaurantStore {
    constructor() {
        this.reservations = []
        this.numTables = 10

        makeObservable(this, {
            reservations: observable,
            numTables: observable,
            totalReservations: computed,
            openTables: computed,
            restPopulation: computed,
            completedTables: computed,
            addRes: action,
            seatRes: action,
            completeRes: action,
        })
    }

    get totalReservations() { //automatically calculates the total reservations
        return this.reservations.length
    }
    get openTables() { //automatically caluclates the number of tables avalible, only when the state is affected
        let counter = 0
        this.reservations.forEach(r => r.seated ? counter++ : null)
        return (this.numTables - counter)
    }
    get restPopulation() {
        let count = 0
        this.reservations.forEach(i => i.seated && !i.completed ? count = count + parseInt(i.numPeople) : null)
        return count
    }
    get completedTables() {
        let count = 0
        this.reservations.forEach(i => i.completed ? count = count++ : null)
        return count
    }
    addRes = (name, numPeople) => {
        this.reservations.push(new Reservation(name, numPeople))
    }
    seatRes = (id) => {
        let value = this.reservations.find(r => r.id === id)
        value.seated = true
    }
    completeRes = (id) => {
        let value = this.reservations.find(r => r.id === id)
        value.completed = true
    }
}
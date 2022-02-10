class Employee{
    constructor(name,schedule){
        this._name = name;
        this._schedule =schedule;
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    setSchedule(schedule) {
        this._schedule = schedule;
    }
    getSchedule() {
        return this._schedule;
    }
}
module.exports = Employee;
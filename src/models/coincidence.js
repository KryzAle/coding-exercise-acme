class Coincidence {
  constructor(firstEmployee, secEmployee, timesCoincidence) {
    this._firstEmployee = firstEmployee;
    this._secEmployee = secEmployee;
    this._timesCoincidence = timesCoincidence;
  }
  setFirstEmployee(firstEmployee) {
    this._firstEmployee = firstEmployee;
  }
  getFirstEmployee() {
    return this._firstEmployee;
  }
  setSecEmployee(secEmployee) {
    this._secEmployee = secEmployee;
  }
  getSecEmployee() {
    return this._secEmployee;
  }
  setTimesCoincidence(timesCoincidence) {
    this._timesCoincidence = timesCoincidence;
  }
  getTimesCoincidence() {
    return this._timesCoincidence;
  }
 
}
module.exports = Coincidence;
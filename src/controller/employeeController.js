// Declaration of modules
const Coincidence = require("../models/coincidence");
const Employee = require("../models/employee");
const managefile = require("../services/managefile");
/**
 * calculate the coincidences of the employees registered in the txt
 * @param {String} data The path of data.txt
 */
exports.seekCoincidence = (path) => {
  const pairsEmployee = this.convertPairs(managefile(path));
  let result = [];
  for (let i = 0; i <= pairsEmployee.length - 1; i++) {
    let timesCoincidences = this.getTimes(
      pairsEmployee[i].getFirstEmployee().getSchedule(),
      pairsEmployee[i].getSecEmployee().getSchedule()
    );
    if (timesCoincidences != 0) {
      pairsEmployee[i].setTimesCoincidence(timesCoincidences);
      result.push(pairsEmployee[i]);
    }
  }
  return result;
};
/**
 * converts each employee into the possible combination pairs
 * @param {Array<Employee>} employeesObj The array of employee data
 * @returns {Array<Coincidence>} the array of pairs of employees
 */
exports.convertPairs = (employeesObj) => {
  let employePairs = [];
  let coincidencesObj = [];
  for (let i = 0; i <= employeesObj.length - 1; i++) {
    for (let j = i + 1; j <= employeesObj.length - 1; j++) {
      let employees = [];
      employees.push(employeesObj[i], employeesObj[j]);
      employePairs.push(employees);
      coincidencesObj.push(
        new Coincidence(employeesObj[i], employeesObj[j], 0)
      );
    }
  }
  return coincidencesObj;
};
/**
 * Parse the data, converts it to dates and counts the matches between each pair of schedules
 * @param {Array<String>} firstSchedule The schedule of first employee
 * @param {Array<String>} secondSchedule The schedule of second employee
 * @returns {Number} the number of coincidences between schedules
 */
exports.getTimes = (firstSchedule, secondSchedule) => {
  let coincidences = 0;
  let matchDaysFirstSch = [];
  let matchDaysSecondSch = [];
  let newFirstSched = this.changeFormat(firstSchedule);
  let newSecSched = this.changeFormat(secondSchedule);
  for (let i = 0; i <= newFirstSched.length - 1; i++) {
    for (let j = 0; j <= newSecSched.length - 1; j++) {
      if (newFirstSched[i][0] === newSecSched[j][0]) {
        matchDaysFirstSch.push(newFirstSched[i]);
        matchDaysSecondSch.push(newSecSched[j]);
      }
    }
  }
  if (matchDaysFirstSch.length == 0) {
    return 0;
  } else {
    for (i = 0; i <= matchDaysFirstSch.length - 1; i++) {
      let hourInFirstSchedule = new Date(
        "2020-01-01 " + matchDaysFirstSch[i][1]
      );
      let hourOutFirstSchedule = new Date(
        "2020-01-01 " + matchDaysFirstSch[i][2]
      );
      let hourInSecSchedule = new Date(
        "2020-01-01 " + matchDaysSecondSch[i][1]
      );
      let hourOutSecSchedule = new Date(
        "2020-01-01 " + matchDaysSecondSch[i][2]
      );

      if (
        hourInSecSchedule.getTime() >= hourInFirstSchedule.getTime() &&
        hourInSecSchedule.getTime() < hourOutFirstSchedule.getTime()
      ) {
        coincidences++;
      } else if (
        hourInFirstSchedule.getTime() >= hourInSecSchedule.getTime() &&
        hourInFirstSchedule.getTime() < hourOutSecSchedule
      ) {
        coincidences++;
      }
    }
    return coincidences;
  }
};
/**
 * Converts schedules to an array of days and hours.
 * @param {Array<String>} schedule The array of schedules
 * @returns {Array<String>} the array of schedules in new format
 */
exports.changeFormat = (schedule) => {
  return schedule.map((element) =>
    element
      .split(new RegExp("(MO|TU|WE|TH|FR|SA|SU|-)"))
      .filter((item) => item !== "" && item !== "-")
  );
};

// Declaration of modules
const Coincidence = require("../models/coincidence");
const managefile = require("../services/managefile");
/**
 * calculate the coincidences of the employees registered in the txt
 * @param {String} data The path of data txt
 */
exports.seekCoincidence = (path) =>{
  const pairsEmployee = convertPairs(managefile(path));
  for (let i = 0; i <= pairsEmployee.length - 1; i++) {
    let timesCoincidences = getTimes(
      pairsEmployee[i]._firstEmployee._schedule,
      pairsEmployee[i]._secEmployee._schedule
    );
    if (timesCoincidences != 0) {
      pairsEmployee[i].setTimesCoincidence(timesCoincidences);
      print(pairsEmployee[i]);
    }
  }
}

function convertPairs(employeesObj) {
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
}
function getTimes(firstSchedule, secondSchedule) {
  let coincidences = 0;
  let newFirstSched = changeFormat(firstSchedule);
  let newSecSched = changeFormat(secondSchedule);

  if (newFirstSched.length != newSecSched.length) {
    if (newFirstSched.length < newSecSched.length) {
      newSecSched = newFirstSched
        .map((el) => newSecSched.filter((element) => element[0] == el[0]))
        .map((element) => element[0]);
    } else {
      newFirstSched = newSecSched
        .map((el) => newFirstSched.filter((element) => element[0] == el[0]))
        .map((element) => element[0]);
    }
  }
  for (i = 0; i <= newFirstSched.length - 1; i++) {
    let hourInFirstSchedule = new Date("2020-01-01 " + newFirstSched[i][1]);
    let hourOutFirstSchedule = new Date("2020-01-01 " + newFirstSched[i][2]);
    let hourInSecSchedule = new Date("2020-01-01 " + newSecSched[i][1]);
    let hourOutSecSchedule = new Date("2020-01-01 " + newSecSched[i][2]);

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
    } else {
    }
  }
  return coincidences;
}
function changeFormat(schedule) {
  return schedule.map((element) =>
    element
      .split(new RegExp("(MO|TU|WE|TH|FR|SA|SU|-)"))
      .filter((item) => item !== "" && item !== "-")
  );
}
function print(coincidence) {
  console.log(
    coincidence.getFirstEmployee()._name +
      "-" +
      coincidence.getSecEmployee()._name +
      ":" +
      coincidence._timesCoincidence
  );
}

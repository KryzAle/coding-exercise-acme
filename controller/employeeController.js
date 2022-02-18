function seekCoincidence(employees) {
  let result =[];
  const pairsEmployee = convertPairs(employees);
  //console.log(pairsEmployee);
  for (let i = 0; i <= pairsEmployee.length - 1; i++) {
    //console.log(i);
    let timesCoincidences = getTimes(pairsEmployee[i][0]._schedule, pairsEmployee[i][1]._schedule);
    console.log(pairsEmployee[i][0]._name+"-"+pairsEmployee[i][1]._name+":"+timesCoincidences);
    result.push()
  }

  //let timesCoincidences = getTimes(pairsEmployee[0][0]._schedule, pairsEmployee[0][1]._schedule);
  //console.log(timesCoincidences);
}

function convertPairs(employeesObj) {
  let employePairs = [];
  for (let i = 0; i <= employeesObj.length - 1; i++) {
    for (let j = i + 1; j <= employeesObj.length - 1; j++) {
      let employees = [];
      employees.push(employeesObj[i], employeesObj[j]);
      employePairs.push(employees);
    }
  }
  console.log(employePairs);
  return employePairs;
}
function getTimes(firstSchedule, secondSchedule) {
  let coincidences = 0;
  //console.log(firstSchedule);
  //console.log(secondSchedule);
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
  //console.log(newFirstSched);
  //console.log(newSecSched);

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
module.exports = seekCoincidence;

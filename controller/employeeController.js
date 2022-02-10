function seekCoincidence(employees) {
  const pairsEmployee = convertPairs(employees);
   /*for (let i = 0; i <= pairsEmployee.length - 1; i++) {
    //console.log(i);
    getTimes(pairsEmployee[i][0]._schedule, pairsEmployee[i][1]._schedule);
  }*/

  getTimes(pairsEmployee[0][0]._schedule, pairsEmployee[0][1]._schedule);
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
  return employePairs;
}
function getTimes(schedule1, schedule2) {
  console.log(schedule1);
  console.log(schedule2);

}

module.exports = seekCoincidence;

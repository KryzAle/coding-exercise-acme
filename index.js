const managefile = require('./services/managefile.js');
const employeecontroller = require('./controller/employeeController.js');

//console.log(managefile("data.txt"));

employeecontroller(managefile("data.txt"));

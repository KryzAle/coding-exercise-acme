const fs = require("fs");
const Employee = require("../models/employee");


function readfile (file){
  return fs.readFileSync (file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });
}

function managefile (path){
  let employees = [];
  let dataFile = readfile(path).trim().split(/[\r\n]+/g);
  dataFile.forEach(element => {
    let extract = element.split('=');
    employees.push(new Employee(extract[0],extract[1].split(",")));
  });
  return employees;
}

module.exports = managefile;
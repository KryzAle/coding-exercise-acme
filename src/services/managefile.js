// Declaration of modules
const fs = require("fs");
const Employee = require("../models/employee");
/**
 * read the file and return its content.
 */
function readfile(file) {
  try {
    return fs.readFileSync(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      return data;
    });
  } catch (err) {
    console.log("Oops there is an error");
  }
}
/**
 * handles data by converting it into objects Employee
 * @param {String} path path of file
 * @returns {Array<Employee>} the array of Employees
 */
function managefile(path) {
  let employees = [];
  try {
    let dataFile = readfile(path)
      .trim()
      .split(/[\r\n]+/g);
    dataFile.forEach((element) => {
      let extract = element.split("=");
      employees.push(new Employee(extract[0], extract[1].split(",")));
    });
    return employees;
  } catch (err) {
    console.error(
      "There is an error with the file, check that data is in the correct format!"
    );
    process.exit();
  }
}

module.exports = managefile;

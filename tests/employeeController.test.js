const EmployeeController = require("../src/controller/employeeController.js");
const Coincidence = require("../src/models/coincidence.js");
const Employee = require("../src/models/employee.js");

describe("Coincidences logic", () => {
  test("gets the matches between employees from the file path ", () => {
    expect(
      EmployeeController.seekCoincidence("./tests/firstFileEmployees.txt")
    ).toEqual([
      {
        _firstEmployee: {
          _name: "RENE",
          _schedule: [
            "MO10:15-12:00",
            "TU10:00-12:00",
            "TH13:00-13:15",
            "SA14:00-18:00",
            "SU20:00-21:00",
          ],
        },
        _secEmployee: {
          _name: "ASTRID",
          _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
        },
        _timesCoincidence: 3,
      },
    ]);
  });
  test("gets the matches between employees from file path ", () => {
    expect(
      EmployeeController.seekCoincidence("./tests/secondFileEmployees.txt")
    ).toEqual([
      {
        _firstEmployee: {
          _name: "RENE",
          _schedule: [
            "MO10:00-12:00",
            "TU10:00-12:00",
            "TH01:00-03:00",
            "SA14:00-18:00",
            "SU20:00- 21:00",
          ],
        },
        _secEmployee: {
          _name: "ASTRID",
          _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
        },
        _timesCoincidence: 2,
      },
      {
        _firstEmployee: {
          _name: "RENE",
          _schedule: [
            "MO10:00-12:00",
            "TU10:00-12:00",
            "TH01:00-03:00",
            "SA14:00-18:00",
            "SU20:00- 21:00",
          ],
        },
        _secEmployee: {
          _name: "ANDRES",
          _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
        },
        _timesCoincidence: 2,
      },
      {
        _firstEmployee: {
          _name: "ASTRID",
          _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
        },
        _secEmployee: {
          _name: "ANDRES",
          _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
        },
        _timesCoincidence: 3,
      },
    ]);
  });

  test("returns an array of objects of type Coincidence from an Array of all employees", () => {
    const employeesObj = [
      new Employee("RENE", [
        "MO10:00-12:00",
        "TU10:00-12:00",
        "TH01:00-03:00",
        "SA14:00-18:00",
        "SU20:00- 21:00",
      ]),
      new Employee("ASTRID", [
        "MO10:00-12:00",
        "TH12:00-14:00",
        "SU20:00-21:00",
      ]),
    ];
    const result = EmployeeController.convertPairs(employeesObj);
    expect(result).toStrictEqual([
      new Coincidence(
        new Employee("RENE", [
          "MO10:00-12:00",
          "TU10:00-12:00",
          "TH01:00-03:00",
          "SA14:00-18:00",
          "SU20:00- 21:00",
        ]),
        new Employee("ASTRID", [
          "MO10:00-12:00",
          "TH12:00-14:00",
          "SU20:00-21:00",
        ]),
        0
      ),
    ]);
  });
  test("returns an array of objects with the possible combinations of employees from an Array of all employees", () => {
    const employeesObj = [
      new Employee("RENE", [
        "MO10:00-12:00",
        "TU10:00-12:00",
        "TH01:00-03:00",
        "SA14:00-18:00",
        "SU20:00- 21:00",
      ]),
      new Employee("ASTRID", [
        "MO10:00-12:00",
        "TH12:00-14:00",
        "SU20:00-21:00",
      ]),
      new Employee("ANDRES", [
        "MO10:00-12:00",
        "TH12:00-14:00",
        "SU20:00-21:00",
      ]),
    ];
    const result = EmployeeController.convertPairs(employeesObj);
    expect(result).toStrictEqual([
      new Coincidence(
        new Employee("RENE", [
          "MO10:00-12:00",
          "TU10:00-12:00",
          "TH01:00-03:00",
          "SA14:00-18:00",
          "SU20:00- 21:00",
        ]),
        new Employee("ASTRID", [
          "MO10:00-12:00",
          "TH12:00-14:00",
          "SU20:00-21:00",
        ]),
        0
      ),
      new Coincidence(
        new Employee("RENE", [
          "MO10:00-12:00",
          "TU10:00-12:00",
          "TH01:00-03:00",
          "SA14:00-18:00",
          "SU20:00- 21:00",
        ]),
        new Employee("ANDRES", [
          "MO10:00-12:00",
          "TH12:00-14:00",
          "SU20:00-21:00",
        ]),
        0
      ),
      new Coincidence(
        new Employee("ASTRID", [
          "MO10:00-12:00",
          "TH12:00-14:00",
          "SU20:00-21:00",
        ]),
        new Employee("ANDRES", [
          "MO10:00-12:00",
          "TH12:00-14:00",
          "SU20:00-21:00",
        ]),
        0
      ),
    ]);
  });
  test("should get the coincidences between schedules and return a number 2", () => {
    const firstDataSche = [
      "MO10:00-12:00",
      "TU10:00-12:00",
      "TH01:00-03:00",
      "SA14:00-18:00",
      "SU20:00-21:00",
    ];
    const secDataSche = ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"];
    const result = EmployeeController.getTimes(firstDataSche, secDataSche);
    expect(result).toBe(2);
  });
  test("should get the coincidences between schedules and return a number 3", () => {
    const firstDataSche = ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"];
    const secDataSche = ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"];
    const result = EmployeeController.getTimes(firstDataSche, secDataSche);
    expect(result).toBe(3);
  });
  test("should get the coincidences between schedules and return a zero", () => {
    const firstDataSche = ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"];
    const secDataSche = ["MO08:00-09:00"];
    const result = EmployeeController.getTimes(firstDataSche, secDataSche);
    expect(result).toBe(0);
  });
  test("should get the coincidences between schedules and return a number 3", () => {
    const firstDataSche = ["MO4:00-10:00", "TH14:00-18:00", "SA10:00-23:00"];
    const secDataSche = [
      "MO1:00-3:00",
      "TH14:00-00:00",
      "FR00:01-11:00",
      "SA10:00-00:00",
      "SU00:01-05:00",
    ];
    const result = EmployeeController.getTimes(firstDataSche, secDataSche);
    expect(result).toBe(2);
  });

  test("change the format of schedules", () => {
    const data = [
      "MO10:00-12:00",
      "TU10:00-12:00",
      "TH01:00-03:00",
      "SA14:00-18:00",
      "SU20:00-21:00",
    ];
    const result = EmployeeController.changeFormat(data);
    expect(result).toStrictEqual([
      ["MO", "10:00", "12:00"],
      ["TU", "10:00", "12:00"],
      ["TH", "01:00", "03:00"],
      ["SA", "14:00", "18:00"],
      ["SU", "20:00", "21:00"],
    ]);
  });
  test("change the format of schedules", () => {
    const data = ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"];
    const result = EmployeeController.changeFormat(data);
    expect(result).toStrictEqual([
      ["MO", "10:00", "12:00"],
      ["TH", "12:00", "14:00"],
      ["SU", "20:00", "21:00"],
    ]);
  });
});

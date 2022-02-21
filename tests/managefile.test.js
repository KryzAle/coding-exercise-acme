const managefile = require("../src/services/managefile.js");
describe("Manage file logic", () => {
  test("reads the file and transforms it into an array of objects of type employee", () => {
    const result = managefile("./tests/firstFileEmployees.txt");
    expect(result).toEqual([
      {
        _name: "RENE",
        _schedule: [
          "MO10:15-12:00",
          "TU10:00-12:00",
          "TH13:00-13:15",
          "SA14:00-18:00",
          "SU20:00-21:00",
        ],
      },
      {
        _name: "ASTRID",
        _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
      },
    ]);
  });

  test("reads the file and transforms it into an array of objects of type employee", () => {
    const result = managefile("./tests/secondFileEmployees.txt");
    expect(result).toEqual([
      {
        _name: "RENE",
        _schedule: [
          "MO10:00-12:00",
          "TU10:00-12:00",
          "TH01:00-03:00",
          "SA14:00-18:00",
          "SU20:00- 21:00",
        ],
      },
      {
        _name: "ASTRID",
        _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
      },
      {
        _name: "ANDRES",
        _schedule: ["MO10:00-12:00", "TH12:00-14:00", "SU20:00-21:00"],
      },
    ]);
  });
});

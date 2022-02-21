const { seekCoincidence } = require("./src/controller/employeeController.js");

const coincidences = seekCoincidence("data.txt");
//printing result
for (let coincidence of coincidences) {
  console.log(
    coincidence.getFirstEmployee().getName() +
      "-" +
      coincidence.getSecEmployee().getName() +
      ":" +
      coincidence.getTimesCoincidence()
  );
}

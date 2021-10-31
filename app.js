const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const render = require("./lib/generateHtml");

var teammbers = [];
//   Questions which will be displayed in the terminal
function CreateManager() {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter Manager Name? ",
    },
    {
      type: "input",
      name: "id",
      message: "Enter Your Manager id? ",
    },
    {
      type: "input",
      name: "email",
      message: "Enter Your Manager email? ",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter Your Manager office number? ",
    },
  ];
  inquirer.prompt(questions).then(function (response) {
    console.log(response);
    // create a manager
    const manager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    teammbers.push(manager);
    CreateEmployee();
  });
}

function CreateEmployee() {
  const createEmployee = [
    {
      type: "list",
      name: "employeeType",
      message: "Enter type of team member would like to add? ",
      choices: ["Engineer", "Intern", "Are Enough for now."],
    },
  ];
  inquirer.prompt(createEmployee).then(function (response) {
    console.log(response);
    if (response.employeeType == "Engineer") {
      //create engineer
      CreateEngineer();
    } else if (response.employeeType == "Intern") {
      //create inter
      CreateIntern();
    } else {
      console.log("Employees are Enough");
      console.log("-_-_-_-_-_-");
      render(teammbers);
    }
  });
}

function CreateEngineer() {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter Your Engineer Name? ",
    },
    {
      type: "input",
      name: "id",
      message: "Enter Your Engineer id? ",
    },
    {
      type: "input",
      name: "email",
      message: "Enter Your Engineer email? ",
    },
    {
      type: "input",
      name: "github",
      message: "Enter Your Engineer github? ",
    },
  ];
  inquirer.prompt(questions).then(function (resp) {
    console.log(resp);
    const engineer = new Engineer(resp.name, resp.id, resp.email, resp.github);
    teammbers.push(engineer);
    CreateEmployee();
  });
}

function CreateIntern() {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter Your Intern Name? ",
    },
    {
      type: "input",
      name: "id",
      message: "Enter Your Intern id? ",
    },
    {
      type: "input",
      name: "email",
      message: "Enter Your Intern email? ",
    },
    {
      type: "input",
      name: "school",
      message: "Enter Your Intern school? ",
    },
  ];
  inquirer.prompt(questions).then(function (resp) {
    console.log(resp);
    const intern = new Intern(resp.name, resp.id, resp.email, resp.school);
    teammbers.push(intern);
    CreateEmployee();
  });
}

function BuildHtml() {
  var html = "";
  teammbers.forEach((employee) => {
    //build the html and add it to the html variable
    html += `<div class="card employee-card m-3">
        <div class="card-header bg-primary m-0 p-2 text-light">
            <h2 class="card-title">${employee.name}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employee.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: </li>
                <li class="list-group-item">Email: <a href=""></a></li>
                <li class="list-group-item">Office number: </li>
            </ul>
        </div>
    </div>`;
  });
}

CreateManager();

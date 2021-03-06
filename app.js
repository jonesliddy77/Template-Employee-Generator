const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const answers = [];

function ask() {
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is your name`,
        name: "name",
      },
      {
        type: "input",
        message: `What is your id`,
        name: "id",
      },
      {
        type: "input",
        message: `What is your email`,
        name: "email",
      },
      {
        type: "list",
        message: `What is your role`,
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
      },
    ])
    .then((responds) => {
      console.log(responds);
      switch (responds.role) {
        case "Manager":
          managerQuestions(responds.name, responds.id, responds.email);
          break;
        case "Engineer":
          EngineerQuestions(responds.name, responds.id, responds.email);
          break;
        case "Intern":
          InternQuestions(responds.name, responds.id, responds.email);
          break;
        default:
          alert("Default case");
      }
    });
}
function managerQuestions(name,id,email) {
  inquirer.prompt([
    {
      type: "input",
      message: `What is your manager's office number?`,
      name: "officeNumber",
    },
  ]).then(function (responds){
    answers.push(new Manager(name,id,email,responds.officeNumber));
    console.log(answers);
    addMember();
  });
}
function EngineerQuestions(name,id,email) {
  inquirer.prompt([
    {
      type: "input",
      message: `What is your GitHub username?`,
      name: "gitHub",
    },
  ]).then(function (responds){
    answers.push(new Engineer(name,id,email,responds.gitHub));
    console.log(answers);
    addMember();
  });
}
  function InternQuestions(name,id,email) {
  inquirer.prompt([
    {
      type: "input",
      message: `What is your School`,
      name: "school",
    },
  ]).then(function (responds){
    answers.push(new Intern(name,id,email,responds.school));
    console.log(answers);
    addMember();
  });
}
function addMember(){
  inquirer.prompt([
    {
      type: 'list',
      message: 'would you like to add another member?',
      name: 'addMember',
      choices: [ "yes",  "no"]
    }
  ]).then((responds) => {
    console.log(responds);
    switch (responds.addMember) {
        case "yes":
        ask();
        break;
        case "no":
        writeFile();
        break;
        default:
        console.log('nothing');
    }
   });
}


function writeFile() {
  fs.writeFile("team.html", render(answers), function (err) {
      if (err) {
          return console.log(err);
      }
      console.log("Successfully created file.");
  });
}

ask();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``

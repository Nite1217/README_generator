// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
const util = require("utils");
const generatorMarkdown = require('./utils/generateMarkdown');
const api = require('./utils/api.js');

// TODO: Create an array of questions for user input
const questions = [ 
    {
        type: 'input',
        message: "Input your GitHub username.",
        name: 'username',
        default: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Input name of your GitHub repository.",
        name: 'repo',
        default: 'readme-generator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
{
    type: "input",
    message: "Please provide a brief description of your project.",
    name: "Description"
},
{
    type: "input",
    message: "What is needed to install project?",
    name: "Dependencies"
},
{
    type: "input",
    message: "How is the project to be used?",
    name: "Usage"
},
{
    type: "input",
    message: "Who else (if at all) contributed to this project?",
    name: "Contributors"
},
{
    type: "input",
    message: "What license(s) are needed, if any.",
    name: "License"
},
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generatorMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();

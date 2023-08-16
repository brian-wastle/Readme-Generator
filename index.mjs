import inquirer from 'inquirer';
import fs from "fs/promises";
let stepsString = '';
let output = '';

let {projectName, projectDescription, license, featuresSection, usageSteps, contributionSection, creditsSection, questionsEmail, questionsGithub, testSection, confirmation} = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'projectName',
            message: "What is the name of your project?",
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: "Write a short description for your project: ",
        },
        {
            type: 'input',
            name: 'usageSteps',
            message: "Write a short set of instructions on how to use your project: ",
        },
        {
            type: 'input',
            name: 'creditsSection',
            message: "Please include any credits you would like to cite: ",
        },
        {
            type: 'list',
            name: 'license',
            message: 'Which license will cover your project?',
            choices: [
                'Apache 2.0',
                'MIT',
                'GNU GPL v3',
                'GNU GPL v2'
            ],
        },
        {
            type: 'input',
            name: 'featuresSection',
            message: "Please include a short description of any features of your project: ",
        },
        {
            type: 'input',
            name: 'contributionSection',
            message: "Please include any contribution guidelines: ",
        },
        {
            type: 'input',
            name: 'questionsEmail',
            message: "Please include a contact email for user questions: ",
        },
        {
            type: 'input',
            name: 'questionsGithub',
            message: "Please include your Gith+Hub profile for user questions: ",
        },
        {
            type: 'input',
            name: 'testSection',
            message: "Please include instructions for a test of your project: ",
        },
        {
            type: 'list',
            name: 'confirmation',
            message: "Are there any installation steps required?",
            choices: ['Yes', 'No'],
        },      
    ])



    const questions = [
        {
            type: 'input',
            name: 'installSteps',
            message: 'Write your first installation step here: ',
        },
        {
            type: 'list',
            name: 'askAgain',
            message: "Are there any additional installation steps required?",
            choices: ['Yes', 'No'],
        },
    ]

    function ask() {
        inquirer.prompt(questions).then((answers) => {
          output = output + "<br>" + answers.installSteps;
          if (answers.askAgain == 'Yes') {
            confirmation == 'No';
            ask2();
          } else {
            stepsString = output;
            setReadmeText();
          }
        });
    }

    if (confirmation == 'Yes') {
        ask();
    }

    const questions2 = [
        {
            type: 'input',
            name: 'installSteps2',
            message: 'Write your next installation step here: ',
        },
        {
            type: 'list',
            name: 'askAgain2',
            message: "Are there any additional installation steps required?",
            choices: ['Yes', 'No'],
        },
    ]

    function ask2() {
        inquirer.prompt(questions2).then((answers2) => {
            output = output + "<br>" + answers2.installSteps2;
            if (answers2.askAgain2 == 'Yes') {
            ask2();
            } else {
                stepsString = output;
                setReadmeText();
            }
        });
      }

function setReadmeText() {

let readmeText = 
`
# ${projectName}

${generateBadge(license)}

## Description

${projectDescription}

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how to contribute)
- [Questions](#questions)
- [Tests](#tests)

## Installation

${stepsString}

## Usage

${usageSteps}

## Credits

${creditsSection}

## License

This project is covered under the ${license} license.

## Features

${featuresSection}

## How to Contribute

${contributionSection}

## Questions

Please contact me with additional questions at [${questionsEmail}](mailto:${questionsEmail})

Please check out my other projects at [${questionsGithub}](${questionsGithub})

## Tests

${testSection}

`;


fs.writeFile("README.md", readmeText);
}

function generateBadge() {

    switch(license) {
        case 'Apache 2.0':
            return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        case 'MIT':
          return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'GNU GPL v3':
          return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
        case 'GNU GPL v2':
          return '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
        
      }

}

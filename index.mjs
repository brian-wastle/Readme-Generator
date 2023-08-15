import inquirer from 'inquirer';
import fs from "fs/promises";

let {projectName, projectDescription, installSteps, usageSteps, featuresSection, creditsSection, license,} = await inquirer
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
            type: 'list',
            name: 'projectInstallation',
            message: "Are there any installation steps required?",
            choices: ['Yes', 'No'],
        },
        {
            type: 'input',
            name: 'installSteps',
            message: 'Include your install steps here: ',
            when(answers) {
                return answers.projectInstallation == 'Yes';
                },
        },
        {
            type: 'input',
            name: 'usageSteps',
            message: "Write a short set of instructions on how to use your project: ",
        },
        {
            type: 'input',
            name: 'creditsSection',
            message: "Include anyone you would like to credit in your readme: ",
        },
        {
            type: 'list',
            name: 'license',
            message: 'Which license would you like for your project?',
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
            message: "Include any features you would like to point out: ",
        },
    ])




let readmeText = 
`
# ${projectName}

## Description

${projectDescription}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)

## Installation

${installSteps}

## Usage

${usageSteps}

## Credits

${creditsSection}

## License

Please refer to the LICENSE in the repo.

## Badges

${generateBadge(license)}

## Features

${featuresSection}

`;

fs.writeFile("README.md", readmeText);


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

import inquirer from 'inquirer';
import fs from "fs/promises";


let {projectName, license} = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'projectName',
            message: "What is the name of your project?",
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: "Write a short description for your project",
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
    ])


let readmeText = 
`
# ${projectName}

## Description

${projectDescription}

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${installSteps}

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. Then, using the relative file path, add it to your README using the following syntax:

![alt text](assets/images/screenshot.png)

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## License

Please refer to the LICENSE in the repo.

## Badges

${generateBadge(license)}

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute to it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.
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

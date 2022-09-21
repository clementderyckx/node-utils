require('dotenv').config({path: `${__dirname}/../.env`});

const Cli = require(`${__dirname}/../lib/classes/Cli.js`);
const FileSelector = require(`${__dirname}/../lib/classes/FileSelector.js`);
const Files = require(`${__dirname}/../lib/classes/Files.js`);
const utils = require(`${__dirname}/../lib/utils.js`);
const fs = require('fs');
const projectFolder = `${process.env.PROJECTFOLDER}/javascript`;
(async() => {

    // CREATE OR SELECT PROJECT FOLDER
    let foldername = "";
    const promptFolder = await Cli.promptList("folderExists", "Does a folder already exists for your project ?", ["yes", "no"]);
    if(promptFolder.folderExists === "yes"){
        foldername = await FileSelector.chooseFolder(projectFolder, {name: "name", message: "What is the project folder ?"});
    } else {
        foldername = await Cli.promptText("name", "What is the name of the project folder you do want to create ? ");
        if(!fs.existsSync(`${projectFolder}/${foldername.name}`)){
            fs.mkdirSync(`${projectFolder}/${foldername.name}`)
        } else {
            while(fs.existsSync(`${projectFolder}/${foldername.name}`)){
                console.log(`${foldername.name} already exists in projects. Please, try with a different name.`);
                foldername = await Cli.promptText("folder", "What is the name of the project folder you do want to create ? ");
            }
            fs.mkdirSync(`${projectFolder}/${foldername.name}`)
        }
    }

    // CREATING STRUCTURE
    await Files.createFolder(`${projectFolder}/${foldername.name}/backend`);
    const cwd = `${projectFolder}/${foldername.name}/backend`;

    const folders = ['rooter', 'lib', 'lib/classes', 'lib/db'];
    const files = ['.env', '.gitignore'];
    const commands = ['npm init -y', 'npm install dotenv express cors mongoose'];

    for(let folder of folders){
        Files.createFolder(`${cwd}/${folder}`);
    }
    for(let file of files){
        Files.createFile(`${cwd}/${file}`, '');
    }

    // EXECUTES COMMANDS
    let result = [];
    for(let command of commands){
        const output = await utils.execCommand(command, cwd);
        result.push(output);
    }

    Files.duplicateTextFile(`${__dirname}/expressAppStarter.js`, `${cwd}/index.js`);
    Files.duplicateTextFile(`${__dirname}/expressRootRouter.js`, `${cwd}/rooter/rootRouter.js`);
    return result;


})()
.then(result => {
    console.log('Process ended successfully');
    process.exit(1);
})
.catch((err) => console.log(err));
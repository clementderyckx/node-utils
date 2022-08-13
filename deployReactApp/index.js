const FileSelector = require(`${__dirname}/lib/classes/FileSelector.js`);
const Cli = require(`${__dirname}/lib/classes/Cli.js`);
const utils = require(`${__dirname}/lib/utils.js`);
const fs = require('fs');

const mode = 'dev';

( async() => {
  
    const repoSelector = new FileSelector();
    const repo = await repoSelector.chooseFolder(`${__dirname}/../../repos/`, { name: 'repo', message: 'Please, choose the repository to deploy' });
    const destination = await repoSelector.chooseFolder(`${__dirname}/../../../`, { name: 'destination', message: 'Please, choose the base folder to deploy to' });

    // Ask confirmation to deploy the right depo in the right destination
    const confimChoices = await Cli.promptConfirm('confirmChoices', `Are you sure you want to deploy ${repo.name} to ${destination.name}?`);

    if(confimChoices.confirmChoices){
        console.log(`Deploying ${repo.name}...`);

        // NPM INSTALL
        console.log(`Running npm install in ${repo.name}...`);
        const npmInstall = await utils.execCommand('npm install', repo.path );
        console.log( (npmInstall.result) ? npmInstall.result : npmInstall.message )

        // REMOVES PREVIOUS FILES IN BUILD
        if(fs.existsSync(`${repo.path}/build`)){
            console.log(`Removing all previous files inside the build folder ${repo.name}...`);
            const filesInBuild = FileSelector.getFolders(`${repo.path}/build/`);
            const removeFilesInBuild = (filesInBuild.length > 0) ? await utils.execCommand(`rm -r ${repo.path}/build/`) : `No files were present in ${repo.name}/build/`;
            console.log( (removeFilesInBuild.result) ? removeFilesInBuild.result : removeFilesInBuild.message )
        } else {
            console.log( `No previous build folders in ${repo.name}. Conituing deployment process...`);
        }


        // NPM RUN BUILD
        console.log(`Running npm run build in ${repo.name}...`);
        const npmBuild = await utils.execCommand('npm run build', repo.path );
        console.log( (npmBuild.result) ? npmBuild.result : npmBuild.message )

        // REMOVES PREVIOUS FILES IN DEPLOYMENT DESTINATION
        console.log(`Removing all previous files in ${destination.name}...`);
        const filesInDest = FileSelector.getFolders(destination.path);
        const removeFilesInDest = (filesInDest.length > 0) ? await utils.execCommand(`rm -r ${destination.path}/*`) : `No files were present in ${destination.name}`;
        console.log( (removeFilesInDest.result) ? removeFilesInDest.result : removeFilesInDest.message )

        // COPYING NEW GENERATED BUILDS
        console.log(`Copying files from ${repo.name}/build/ to ${destination.name}...`);
        const deployBuild = await utils.execCommand(`cp -r ${repo.path}/build/* ${destination.path}`);
        console.log( (deployBuild.result) ? deployBuild.result : deployBuild.message )


        const pathToCheck = (mode === "dev") ? `${repo.path}/index.html` : `https://${repo.path}.fr/`;
        console.log(`${repo.name} is now deployed in ${destination.name} \n you can check out at ${pathToCheck}`);

    }



    // Reminders for dev purpose
    if(mode === "debug"){
        console.log('repo:');
        console.log(repo);
        console.log('destination:');   
        console.log(destination);
        console.log('confimChoices:');   
        console.log(confimChoices);
    }


})().catch((err) => console.error(err) );
// })
const { exec } = require('child_process')

const useCommand = (command) => exec(command ,(err, stdout, stderr) =>{
    if(err) console.log('err : ' + err)
    if (stderr) console.log('stderr : ' + stderr)
    console.log('stdout : ' + stdout)
})


const initializeNewProject = (folderName) => {
    const commands = ['git init', `sudo npm init -y`, 'sudo npm install dotenv', 'touch .env'];
    commands.forEach(command => useCommand(command));
}

const includeWebStack = () => {
    const commands = [`sudo npm install express`, `sudo npm install mongoose`];
    commands.forEach( command => useCommand(command))
}

const includeScrappingStack = () => {
    const commands = ['sudo npm install puppeteer'];
}

const includeStaticFront = (stack) => {
    let folder = "";
    (stack) ? folder = stack : folder = "";
    const setBase = [`mkdir ${folder} ${folder}/css/ ${folder}/images/ ${folder}/js/`, `touch ${folder}/index.html`,]
    const setCss = [ `mkdir ${folder}/css/mixins ${folder}/css/components ${folder}/css/layouts ${folder}/css/pages ${folder}/css/functions ${folder}/css/assets`, `touch ${folder}/css/app.scss ${folder}/css/mixins/mixins.scss ${folder}/css/components/components.scss ${folder}/css/layouts/layouts.scss ${folder}/css/pages/pages.scss css/functions css/assets/assets.scss ${folder}/css/assets/minireset.scss` ]
    const setJs = [`mkdir ${folder}/js/classes ${folder}/js/lib`, `touch ${folder}/js/index.js`]

    setBase.forEach(command => useCommand(command))
    setCss.forEach(command => useCommand(command))
    setJs.forEach(command => useCommand(command))
}

initializeNewProject('clement')
includeWebStack()
includeStaticFront()

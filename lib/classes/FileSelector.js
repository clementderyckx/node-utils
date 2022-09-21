const fs = require('fs');
const Folder = require(`${__dirname}/Folder.js`);
const Cli = require(`${__dirname}/Cli.js`);

class FileSelector {

    constructor (options){
        this.workingDir = (options && options.workingDir) ? options.workingDir : process.cwd();
    }

    /**
     * returns the directories present in the given path
     * @param {String} path 
     * @param {Object} options 
     * @returns 
     */
    static getFolders (path, options){

        const allFiles = fs.readdirSync(path, {withFileTypes: true});
        const dir = [];
        for (let file of allFiles) {
            if(file.isDirectory() ) {
                if(!file.name.startsWith('.')){
                    dir.push( new Folder({ name: file.name, path: path + file.name }) )
                } else{
                    (options && options.hideFolders) ? dir.push( new Folder({ name: file.name, path: path + file.name }) ) : null;
                }
            }
        }
        return dir;
    }

    static async chooseFolder(path, options){
        const folders = FileSelector.getFolders(path);
        const folderNames = folders.map(folder => folder.name);
        const choice = await Cli.promptList(options.name, options.message ,folderNames);

        let result = "";
        folders.map(folder => (folder.name === choice[options.name]) ? result = folder : null);

        return result;

    }

}

module.exports = FileSelector;
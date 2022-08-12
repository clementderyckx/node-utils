const fs = require('fs');

class FileSelector {

    constructor (options){
        this.workingDir = (options && options.workingDir) ? options.workingDir : process.cwd();
    }

    /**
     * returns the directories present in the given path
     * @param {String} path 
     * @returns {Array}
     */
    static getFolders (path, options){

        const allFiles = fs.readdirSync(path, {withFileTypes: true});
        const dir = [];
        for (let file of allFiles) {
            if(file.isDirectory() ) {
                if(!file.name.startsWith('.')){
                    dir.push({ name: file.name, path: path + file.name })
                } else{
                    (options && options.hideFolders) ? dir.push({ name: file.name, path: path + file.name }) : null;
                }
            }
        }
        return dir;
    }

    chooseFolder(path){
        const folders = FileSelector.getFolders(path);
        console.log(folders);
    }

}

module.exports = FileSelector;
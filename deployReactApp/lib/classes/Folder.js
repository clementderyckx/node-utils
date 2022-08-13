class Folder {

    constructor(folder){
        this.name = (folder.name) ? folder.name : undefined;
        this.path = (folder.path) ? folder.path : undefined;
    }

}

module.exports = Folder;
const fs = require('fs');

class Files {

    constructor(folder){
        this.name = (folder.name) ? folder.name : undefined;
        this.path = (folder.path) ? folder.path : undefined;
    }

    static createFolder(path){
        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
    static duplicateFile(readPath, writePath){
        const readStream = fs.createReadStream(readPath);
        const writeStream = fs.createWriteStream(writePath)
        readStream.pipe(writeStream);
        writeStream.on('finish', () => {
            writeStream.close()
        })
    }

}

module.exports = Files;
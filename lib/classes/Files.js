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
    static createFile(path, content){
        if(!fs.existsSync(path)){
            fs.writeFileSync(path, content);
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

    static duplicateTextFile(readPath, writePath){
        const data = fs.readFileSync(readPath, 'utf8');
        fs.writeFileSync(writePath, data.toString())
    }

}

module.exports = Files;
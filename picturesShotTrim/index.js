const fs = require('fs');
const FileSelector = require(`${__dirname}/../lib/classes/FileSelector.js`);
const utils = require(`${__dirname}/../lib/utils.js`);
// Lire le dossier Pictures
// Séléctionner 

function createFolder(path){
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}
function writeFile(){

}
(async() => {
    const fileSelector = new FileSelector({workingDir: ''});
    const folder = await fileSelector.chooseFolder('/Users/clement/Documents/Pictures/', { name: 'folderToTrim', message: "What's the folder to trim ?" });
    const folderPath = folder.path;

    // SUPPRIMER LES INDESIRABLES
    if(fs.existsSync(folderPath + '/.DS_Store')) fs.unlinkSync(folderPath + '/.DS_Store');

    // CREER LES DOSSIER ARW JPG KEPT
    createFolder(`${folderPath}/JPG`);
    createFolder(`${folderPath}/ARW`);
    createFolder(`${folderPath}/kept`);
    // LISTER LES FICHIERS
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    for(let file of files){
        if(!file.isDirectory()){
            // console.log(file);
            const [name, extension] = file.name.split('.');
            if(!name.startsWith('.')){
                const filename = (file.name.startsWith('_')) ? file.name.replace('_', '') : file.name;
                const readStream = fs.createReadStream(`${folderPath}/${file.name}`);
                const writeStream = fs.createWriteStream(`${folderPath}/${extension}/${filename}`)
                readStream.pipe(writeStream);
                // writeStream.pipe(readStream)
                writeStream.on('finish', () => {
                    console.log(file.name + ' copied to ' + `${folderPath}/${extension}/${filename}`);
                    writeStream.close()
                })
            }
        }
    }
    console.log('Trim Pictures is now done.');

})()
.catch(err => console.log(err))
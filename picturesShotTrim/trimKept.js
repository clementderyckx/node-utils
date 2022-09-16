const fs = require('fs');
const FileSelector = require(`${__dirname}/../lib/classes/FileSelector.js`);
const Files = require(`${__dirname}/../lib/classes/Files.js`);

(async() => {
    
    const fileSelector = new FileSelector({workingDir: ''});
    const folder = await fileSelector.chooseFolder('/Users/clement/Documents/Pictures/', { name: 'folderToTrim', message: "What's the folder to trim ?" });
    const folderPath = folder.path;

    Files.createFolder(`${folderPath}/kept`);

    const pictures = fs.readFileSync(`${folderPath}/kept.txt`).toString().split(',');
    const basename = "_DSC";
    console.log(pictures);
    pictures.forEach(picturename => {
        const picture = (picturename.includes(' ')) ? picturename.replaceAll(' ', '') : picturename;
        console.log(`${folderPath}/${basename}${picture}.JPG`);
        Files.duplicateFile(`${folderPath}/${basename}${picture}.JPG`, `${folderPath}/kept/${basename}${picture}.JPG`);
        Files.duplicateFile(`${folderPath}/${basename}${picture}.ARW`, `${folderPath}/kept/${basename}${picture}.ARW`);
    })

    console.log('ended');

})()
.catch(err => console.log(err))
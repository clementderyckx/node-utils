import { removePrefix } from "./lib/rename-files";

(async () => {
    const folderPath = __dirname + '/icons';
    let rm = await removePrefix(folderPath, 'icons8-'); 
    console.log(rm);
    
})()
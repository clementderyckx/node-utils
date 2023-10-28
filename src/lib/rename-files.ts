import {readdir, cp, rm} from 'node:fs/promises';
import { existsSync } from 'node:fs';

export const removePrefix = async (path: string, prefix: string): Promise<{errors: number, errLogs: string[]}> => {
    
    if(!existsSync(path)) throw new Error(`Folder ${path} does not exist`);
    const errors: string[] = []
    
    const files = await readdir(path);
    for (let file of files){
        if(file.startsWith(prefix)){
            try {
                let newFilename = file.substring(prefix.length);
                await cp(`${path}/${file}`, `${path}/${newFilename}`);
                await rm(`${path}/${file}`);
            } catch(error){
                errors.push(error as string);
                continue;
            }

        }
    }

    return Promise.resolve({errors: errors.length, errLogs: errors})
}
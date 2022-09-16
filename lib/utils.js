const util = require('util');
const child_process = require('child_process');
const Response = require(`${__dirname}/classes/Response.js`);

const exec = util.promisify(child_process.exec);

const execCommand = async (command, cwd) => {
    try{
        const commandResult = await exec(command, {cwd: cwd })
        const result = (commandResult.stderr) ? new Response(400, `Error on command ${command}`, commandResult.stderr)  : new Response(200, `Command ${command} executed with success`, commandResult.stdout);
        return result;
    } catch(err){
        return new Response(400, `Error on command ${command}`, err)
    }

};

module.exports = {
    exec: exec,
    execCommand: execCommand,
}
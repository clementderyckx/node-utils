const inquirer = import('inquirer');

class Cli {

    /**
     * 
     * @param {String} name 
     * @param {String} message 
     * @param {*} choices
     */
    static async promptList(name, message, choices){
        const prompt = (await inquirer).createPromptModule();
        const choice = await prompt([
            {
                type: 'list',
                name: name,
                message: message,
                choices: choices
    
            },
        ])

        return choice;
    }


    /**
     * Prompt a confirm action. User should press y or n to validate or refuse an action.
     * @param {String} name 
     * @param {String} message 
     * @returns 
     */
    static async promptConfirm(name, message){
        const prompt = (await inquirer).createPromptModule();
        const choice = await prompt([
            {
                type: 'confirm',
                name: name,
                message: message,
            },
        ])

        return choice;
    }


    static async promptText(name, message){
        const prompt = (await inquirer).createPromptModule();
        const input = await prompt({type: 'input', name: name, message: message});
        return input;
    }


}

module.exports = Cli;
import chalk = require("chalk");

export class Log{
    static info(msg: string){
        console.log(chalk.blue.bgYellow(msg));
    }

    static warn(msg:string){
        console.log(chalk.yellow(msg));
    }

    static error(msg:string){
        console.log(chalk.red(msg));
    }
    
}
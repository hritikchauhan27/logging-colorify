export class Log{
    static info(msg: string){
        console.log(`%c${msg}`,'color:black;background:yellow');
    }

    static warn(msg:string){
        console.log(`%c${msg}`,'color:yellow');
    }

    static error(msg:string){
        console.log(`%c${msg}`,'color:red');
    }
    
}
import { colors, bgColors } from './color';
import * as fs from 'fs';

export class Log {
    static logWithColor(msg: string, color: string, bgColor?: string) {
        const colorCode = colors[color];
        const bgColorCode = bgColors[bgColor || 'black'];

        const timestamp = new Date().toLocaleString();

        if (colorCode && bgColorCode) {
            console.log(`\x1b[${bgColorCode};${colorCode}m[${timestamp}] ${msg}\x1b[0m`);
            return `[${timestamp}] ${msg}`;
        } else if (colorCode) {
            console.log(`\x1b[${colorCode}m[${timestamp}] ${msg}\x1b[0m`);
            return `[${timestamp}] ${msg}`;
        } else {
            console.log(`[${timestamp}] ${msg}`);
            return `[${timestamp}] ${msg}`;
        }


    }

    private static writeToLogFile(msg: string, filename: string) {
        fs.appendFile(filename, msg + '\n', (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }

    static error(msg: string) {
        const logMessage = this.logWithColor(msg, 'red', 'white');
        this.writeToLogFile(logMessage, 'error.log');
    }

    static info(msg: string) {
        const logMessage = this.logWithColor(msg, 'blue', 'white');
        this.writeToLogFile(logMessage, 'info.log');
    }

    static warn(msg: string) {
        const logMessage = this.logWithColor(msg, 'yellow', 'black');
        this.writeToLogFile(logMessage, 'warn.log');
    }

}

import { colors, bgColors } from './color';
import * as fs from 'fs';

export class Log {
    static logWithColor(msg: string, color: string, bgColor?: string) {
        const colorCode = colors[color];
        const bgColorCode = bgColors[bgColor || 'black'];

        const timestamp = new Date().toLocaleString();
        const logMessage = `[${timestamp}] ${msg}`;

        if (colorCode && bgColorCode) {
            console.log(`\x1b[${bgColorCode};${colorCode}m${logMessage}\x1b[0m`);
        } else if (colorCode) {
            console.log(`\x1b[${colorCode}m${logMessage}\x1b[0m`);
        } else {
            console.log(logMessage);
        }

        return logMessage;
    }

    private static async writeToLogFile(msg: string, filename: string) {
        try {
            await fs.promises.appendFile(filename, msg + '\n');
        } catch (err) {
            console.error('Error writing to log file:', err);
        }
    }

    static async error(msg: string) {
        const logMessage = this.logWithColor(msg, 'red', 'white');
        await this.writeToLogFile(logMessage, 'error.log');
    }

    static async info(msg: string) {
        const logMessage = this.logWithColor(msg, 'blue', 'white');
        await this.writeToLogFile(logMessage, 'info.log');
    }

    static async warn(msg: string) {
        const logMessage = this.logWithColor(msg, 'yellow', 'black');
        await this.writeToLogFile(logMessage, 'warn.log');
    }
}

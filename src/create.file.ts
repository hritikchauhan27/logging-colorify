import * as fs from 'fs';

export async function getLogFileName(prefix: string, extension: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${prefix}_${year}-${month}-${day}.${extension}`;
}

export async function writeToLogFile(msg: string, filename: string) {
    try {
        await fs.promises.appendFile(filename, msg + '\n');
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
}

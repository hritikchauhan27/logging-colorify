import * as fs from 'fs';
import * as path from 'path';

export async function getLogFileName(prefix: string, extension: string, frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    let fileName;
    if (frequency === 'daily') {
        fileName = `${prefix}_${year}-${month}-${day}.${extension}`;
    } else if (frequency === 'monthly') {
        fileName = `${prefix}_${year}-${month}.${extension}`;
    } else { // 'yearly'
        fileName = `${prefix}_${year}.${extension}`;
    }

    return customDir ? path.join(customDir, fileName) : fileName;
}

export async function writeToLogFile(msg: string, filename: string) {
    try {
        await fs.promises.appendFile(filename, msg + '\n');
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
}

export function getfileName(frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    let logFileName;
    if (frequency === 'daily') {
        logFileName = `log_${year}-${month}-${day}.log`;
    } else if (frequency === 'monthly') {
        logFileName = `log_${year}-${month}.log`;
    } else { // 'yearly'
        logFileName = `log_${year}.log`;
    }

    return customDir ? path.join(customDir, logFileName) : logFileName;
}

export async function deleteOldLogFiles(frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) {
    const logDir = customDir || './logs'; 
    const files = await fs.promises.readdir(logDir);

    const currentDate = new Date();

    for (const file of files) {
        const filePath = path.join(logDir, file);
        const stats = await fs.promises.stat(filePath);

        const fileDate = new Date(stats.mtime);
        let deleteFile = false;

        switch (frequency) {
            case 'daily':
                deleteFile = (currentDate.getTime() - fileDate.getTime()) > 24 * 60 * 60 * 1000;
                break;
            case 'monthly':
                deleteFile = (currentDate.getMonth() !== fileDate.getMonth()) || (currentDate.getFullYear() !== fileDate.getFullYear());
                break;
            case 'yearly':
                deleteFile = (currentDate.getFullYear() !== fileDate.getFullYear());
                break;
            default:
                deleteFile = false;
                break;
        }

        if (deleteFile) {
            await fs.promises.unlink(filePath);
            console.log(`Deleted old log file: ${file}`);
        }
    }
}

export function getClientIP(request:any) {
    if (request && request.ip) {
        return request.ip;
    }

    if (request && request.info && request.info.remoteAddress) {
        return request.info.remoteAddress;
    }

    if (request && request.clientIP) {
        return request.clientIP;
    }

    if (request && request.ip) {
        return request.ip;
    }

    return 'Unknown';
}

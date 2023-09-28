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

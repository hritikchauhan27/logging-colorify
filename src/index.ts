import { logWithColor } from './logWithColor';
import { getLogFileName, writeToLogFile, getClientIP, getfileName, deleteOldLogFiles } from './create.file';

async function logMessage(msg: string, level: 'info' | 'error' | 'warn', frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) {
    let color: string;
    let bgColor: string;

    switch (level) {
        case 'error':
            color = 'red';
            bgColor = 'white';
            break;
        case 'warn':
            color = 'yellow';
            bgColor = 'black';
            break;
        case 'info':
        default:
            color = 'blue';
            bgColor = 'white';
            break;
    }

    const logMessage = await logWithColor(msg, color, bgColor);
    const logFileName = getfileName(frequency, customDir);
    await writeToLogFile(logMessage, logFileName);
    await deleteOldLogFiles(frequency, customDir); 
}

export const log = {
    info: (msg: string, frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) => logMessage(msg, 'info', frequency, customDir),
    error: (msg: string, frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) => logMessage(msg, 'error', frequency, customDir),
    warn: (msg: string, frequency: 'daily' | 'monthly' | 'yearly', customDir?: string) => logMessage(msg, 'warn', frequency, customDir),
};

async function createApiLogger(req: any, frequency: 'daily' | 'monthly' | 'yearly', startTime?: number, customDir?: string) {
    const logData = {
        Timestamp: '',
        Method: '',
        Path: '',
        RouteParams: {},
        QueryParams: {},
        Headers: {},
        Body: {},
        ClientIP: '',
        TimeDifference: '',
        Error: null
    };

    try {
        const clientIP = getClientIP(req);
        logData.Timestamp = new Date().toISOString();
        logData.Method = req.method;
        logData.Path = req.url;
        logData.RouteParams = req.params;
        logData.QueryParams = req.query || {};
        logData.Headers = req.headers;
        logData.Body = req.body || req.payload || {};
        logData.ClientIP = clientIP;

        if (typeof startTime === 'number') {
            const endTime = performance.now();
            const timeDifference = endTime - startTime;
            logData.TimeDifference = `The time difference is ${timeDifference} milliseconds.`;
        } else {
            logData.TimeDifference = 'startTime is required for the timeDifference';
        }

        const logEntry = JSON.stringify(logData, null, 2);
        const logFileName = getfileName(frequency, customDir);

        await writeToLogFile(logEntry, logFileName);
    } catch (error: any) {
        logData.Error = error.message;
        const errorLogFileName = await getLogFileName('api_error', 'log', frequency, customDir);
        const errorLogEntry = JSON.stringify(logData, null, 2);
        await writeToLogFile(errorLogEntry, errorLogFileName);
    }
}

export {
    createApiLogger
};

import { logWithColor } from './logWithColor';
import { getLogFileName, writeToLogFile } from './create.file';


async function logError(msg: string) {
    const logMessage = await logWithColor(msg, 'red', 'white');
    const logFileName = await getLogFileName('error', 'log');
    await writeToLogFile(logMessage, logFileName);
}

async function logInfo(msg: string) {
    const logMessage = await logWithColor(msg, 'blue', 'white');
    const logFileName = await getLogFileName('info', 'log');
    await writeToLogFile(logMessage, logFileName);
}

async function logWarn(msg: string) {
    const logMessage = await logWithColor(msg, 'yellow', 'black');
    const logFileName = await getLogFileName('warn', 'log');
    await writeToLogFile(logMessage, logFileName);
}

async function createApiLogger(req: any, startTime?: Date) {
    const timestamp = new Date();
    const timeDifference = startTime ? timestamp.getTime() - startTime.getTime() : null;
    const logData = {
        method: req.method,
        path: req.url,
        query: req.query || {},
        headers: req.headers,
        body: req.body || req.payload || {},
        timestamp: timestamp.toISOString(),
        TimeDifference: startTime
            ? `The time difference is ${timeDifference} milliseconds.`
            : 'startTime is required for the timeDifference'
    };

    const logEntry = JSON.stringify(logData, null, 2);
    const logFileName = await getLogFileName('api_detail', 'log');

    await writeToLogFile(logEntry, logFileName);
}

export { logError, logInfo, logWarn, createApiLogger }

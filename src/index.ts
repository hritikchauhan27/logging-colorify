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

async function createApiLogger(req: any) {
    const logData = await {
        method: req.method,
        path: req.url,
        query: req.query || {},
        headers: req.headers,
        body: req.body || {},
        timestamp: new Date().toISOString(),
    };

    const logEntry = JSON.stringify(logData, null, 2);

    await writeToLogFile(logEntry, 'api-request-detail.log');
}

export {logError,logInfo,logWarn,createApiLogger}

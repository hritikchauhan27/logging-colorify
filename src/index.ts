import { logWithColor } from './logWithColor';
import { getLogFileName, writeToLogFile, getClientIP} from './create.file';


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
    const logData = {
        Timestamp: '',
        Method: '',
        Path: '',
        RouteParams:{},
        QueryParams: {},
        Headers: {},
        Body: {},
        ClientIP: '',
        TimeDifference: '',
        Error: null
    };

    try {
        const timestamp = new Date();
        const timeDifference = startTime ? timestamp.getTime() - startTime.getTime() : null;
        const clientIP = getClientIP(req);
        logData.Timestamp = timestamp.toISOString();
        logData.Method = req.method;
        logData.Path = req.url;
        logData.RouteParams= req.params;
        logData.QueryParams = req.query || {};
        logData.Headers = req.headers;
        logData.Body = req.body || req.payload || {};
        logData.ClientIP = clientIP;
        logData.TimeDifference = startTime
            ? `The time difference is ${timeDifference} milliseconds.`
            : 'startTime is required for the timeDifference';
        
        const logEntry = JSON.stringify(logData, null, 2);
        const logFileName = await getLogFileName('api_detail', 'log');

        await writeToLogFile(logEntry, logFileName);
    } catch (error:any) {
        logData.Error = error.message;
        const errorLogFileName = await getLogFileName('api_error', 'log');
        const errorLogEntry = JSON.stringify(logData, null, 2);
        await writeToLogFile(errorLogEntry, errorLogFileName);
    }
}


export { logError, logInfo, logWarn, createApiLogger }

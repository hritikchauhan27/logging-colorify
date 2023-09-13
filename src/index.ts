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

export { logError, logInfo, logWarn };

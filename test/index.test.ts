import { assert } from "chai";
import {
    createApiLogger,
    log,
} from "../src/index";
import { existsSync, readFileSync } from "fs";
import { getfileName } from "../src/create.file";

describe("Logging Functions", function () {

    it("log.error should log an error message in terminal and in a newly created file according to the provided frequency and custom directory", async function () {
        const errorMessage = "This is an error message";
        const frequency = "daily";
        const customDir = "./logs/error";

        await log.error(errorMessage, frequency, customDir);

        const logFileName = getfileName(frequency, customDir);
        assert.isTrue(logFileContains(logFileName, errorMessage));
    });

    it("log.info should log an info message in terminal and in a newly created file according to the provided frequency and custom directory", async function () {
        const infoMessage = "This is an info message";
        const frequency = "daily";
        const customDir = "./logs/info";

        await log.info(infoMessage, frequency, customDir);

        const logFileName = getfileName(frequency, customDir);
        assert.isTrue(logFileContains(logFileName, infoMessage));
    });

    it("log.warn should log a warning message in terminal and in a newly created file according to the provided frequency and custom directory", async function () {
        const warningMessage = "This is a warning message";
        const frequency = "daily";
        const customDir = "./logs/warn";

        await log.warn(warningMessage, frequency, customDir);

        const logFileName = getfileName(frequency, customDir);
        assert.isTrue(logFileContains(logFileName, warningMessage));
    });

    it("createApiLogger should log API details in a newly created file according to the provided frequency and custom directory", async function () {
        const request = {
            method: "GET",
            url: "/api/resource",
            params: { id: 1 },
            query: { filter: "all" },
            headers: { "User-Agent": "Test" },
            body: { data: "test" },
        };
        const startTime = 0;
        const frequency = "daily";
        const customDir = "./logs/api";

        await createApiLogger(request, frequency, startTime, customDir);

        const logFileName = getfileName(frequency, customDir);
        const logContent = readLogFile(logFileName);

        assert.isTrue(logContent.includes("GET"));
        assert.isTrue(logContent.includes("/api/resource"));
    });
});

function logFileContains(logFileName: string, message: string): boolean {
    const logContent = readLogFile(logFileName);
    return logContent.includes(message);
}

function readLogFile(logFileName: string): string {
    if (existsSync(logFileName)) {
        return readFileSync(logFileName, "utf8");
    }
    return "";
}

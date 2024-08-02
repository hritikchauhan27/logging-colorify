
# logging-colorify package

How to use:-
Logging-Colorify Package
Installation

You can install this package via npm or yarn.

```sh
npm install logging-colorify
# or
yarn add logging-colorify
```
# Getting Started

Import the logging functions into your code and start adding colorful logs to your applications.
Simple Usage

```javascript

import { log } from 'logging-colorify';

// Log an info message daily
log.info('This is an info message', 'daily');

// Log a warning message monthly
log.warn('This is a warning message', 'monthly');

// Log an error message yearly
log.error('This is an error message', 'yearly');
```
Logging to a Custom Directory

You can specify a custom directory to save the log files:

```javascript

log.info('This is an info message', 'daily', './logs/info');
log.warn('This is a warning message', 'monthly', './logs/warn');
log.error('This is an error message', 'yearly', './logs/error');
```
# Automatic Log File Deletion

Log files will be automatically deleted based on the frequency you set:

    'daily': Files are deleted after 1 day.
    'monthly': Files are deleted after 1 month.
    'yearly': Files are deleted after 1 year.

# API Logging

You can use the createApiLogger function to log API details in various Node.js frameworks. This logger also respects the log frequency and directory settings.
1. Express.js Example

```javascript

import { createApiLogger } from 'logging-colorify';
import express from 'express';

const app = express();

app.use((req, res, next) => {
    const startTime = performance.now();
    res.on('finish', async () => {
        await createApiLogger(req, 'daily', startTime, './logs/api');
    });
    next();
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
2. Koa.js Example

```javascript

import { createApiLogger } from 'logging-colorify';
import Koa from 'koa';

const app = new Koa();

app.use(async (ctx, next) => {
    const startTime = performance.now();
    await next();
    await createApiLogger(ctx.request, 'monthly', startTime, './logs/api');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
3. Hapi.js Example

```javascript

import { createApiLogger } from 'logging-colorify';
import Hapi from '@hapi/hapi';

const server = Hapi.server({ port: 3000 });

server.route({
    method: 'GET',
    path: '/your-route',
    handler: async (request, h) => {
        await createApiLogger(request, 'yearly', startTime, './logs/api');
        return 'Hello, World!';
    },
});

await server.start();
console.log('Server running on %s', server.info.uri);
```
4. Nest.js Example

```javascript

import { createApiLogger } from 'logging-colorify';
import { Controller, Post, Req } from '@nestjs/common';

@Controller('your-route')
export class YourController {
    @Post()
    async yourMethod(@Req() request) {
        await createApiLogger(request, 'daily', undefined, './logs/api');
    }
}
```
# Customization
Creating Custom Logging Options

If you need more control, you can create custom logging options.

```javascript

import { log } from 'logging-colorify';

const customDir = './custom_logs';

// Log a message with custom directory and frequency
log.info('Custom log message', 'daily', customDir);
```
# Testing

All of the logging-colorify tests are written with Mocha. They can be run with npm.

```sh

npm test
```
# Issues and Contributions

If you encounter any issues or would like to contribute to this package, please visit the GitHub repository. We welcome your feedback and contributions!

# License

This package is open-source and available under the ISC License.

# Credits

This package is maintained by Hritik Chauhan.

Thank you for using the Logging-Colorify package! We hope it brings a touch of color and simplicity to your Node.js applications. If you have any questions or feedback, please don't hesitate to reach out. Happy logging!
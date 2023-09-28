# logging-colorify package

How to use:-

You can install this package via npm or yarn.

npm install logging-colorify
# or
yarn add logging-colorify

# Getting Started

Import the logging functions into your code and start adding colorful logs to your applications.

import { logError, logInfo, logWarn, createApiLogger } from "logging-colorify"

 -Now, you can use the logging functions in your code-

logError('This is an error message.');

logInfo('This is an info message.');

logWarn('This is a warning message.');

# API Logging

You can also use the createApiLogger function to log API details in various Node.js frameworks. Here's how to use it in different frameworks:

1. IN Express.js

app.get('/your-route', (req, res) => {
  const startTime = new Date();
  // Call createApiLogger with the Express request object
  createApiLogger(req, startTime);
  // Other Express.js-specific code here
});

-- startTime is optional if you want to get the time diiference between API call and function call. 

2. IN Koa.js

app.use(async (ctx) => {
    const startTime = new Date();
    // Call createApiLogger with Koa.js ctx object
    await createApiLogger(ctx.request, startTime);
    // Other Koa.js-specific code here
});

3. IN Hapi.js

server.route({
    method: 'GET',
    path: '/your-route',
    handler: (request, h) => {
      // Call createApiLogger with the Hapi.js request object
      createApiLogger(request);
      // Other Hapi.js-specific code here
      return 'Hello, World!';
    },
  });

4. IN Nest.js

@Post('your-route')
async yourControllerMethod(@Req() request: Request) {
    // Call createApiLogger with Nest.js request object
    await createApiLogger(request);
    // Other Nest.js-specific code here
}


# Customization
You can customize the log messages and colors by modifying the underlying functions in the logging-colorify package.

# License
This package is open-source and available under the ISC License.

# Issues and Contributions
If you encounter any issues or would like to contribute to this package, please visit the GitHub repository. We welcome your feedback and contributions!

# Credits
This package is maintained by Hritik Chauhan.

Thank you for using the Logging-Colorify package! We hope it brings a touch of color and simplicity to your Node.js applications. If you have any questions or feedback, please don't hesitate to reach out. Happy logging!
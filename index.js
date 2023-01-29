const config = require("./config.js")
const Logger = require("./struct/Logger.js")
const Client = require("./struct/Client.js")

// global variable
global.config = config;
global.log = new Logger();

// process name
process.name = config.name;

// discord client
const client = new Client(config);

// start / init
client.init();

// process error
void ["unhandledRejection", "uncaughtException"].forEach(e => {
  process.on(e, (error, args) => {
    log.error(e.name + "\n" + error.stack);
  });
});
const slashHandler = require("../handlers/slashCommands.js")

module.exports = async(client, int) => {
  await slashHandler(client, int)
}
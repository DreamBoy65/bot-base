const slashHandler = require("../handlers/slashCommands.js")
const {
  handleTicketSystem
} = require("../handlers/ticketHandler.js")

module.exports = async(client, int) => {
  await slashHandler(client, int)
  await handleTicketSystem(client, int)
}
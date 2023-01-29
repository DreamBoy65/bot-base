const _ = require("lodash")

module.exports = {
  name: "ticket-list",
  description: "list all tickets",
  clientPerms: ["AttachFiles",
    "ManageChannels"],
  memberPerms: ["ManageServer"],
  premium: false,
  dm: false,
  run: async(client, int, data) => {
    await int.deferReply({
      ephemeral: true
    })
    try {
      let ticketList = await _.chunk(data.opened, 8)

      for (tickets of ticketList) {
        await int.followUp({
          content: `${tickets.map(e => {
            return `Channel • <#${e.id}>\nUser • <@${e.user}>\nType • ${e.type}`
          }).join("\n\n")}`,
          ephemeral: true
        })
      }
    } catch (e) {
      log.error(e.message + "\n" + String(e.stack))
      int.editReply({
        content: "Error: " + e.message
      })}
  }
}
module.exports = {
  name: "ticket-channel-remove",
  description: "remove ticket channel!",
  clientPerms: [],
  memberPerms: ["manageServer"],
  premium: false,
  dm: false,
  run: async(client, int, data) => {
    await int.deferReply({
      ephemeral: true
    })
    try {
      data.channel = null
      data.message = null
      await data.save()
      int.editReply({
        content: "Channel removed",
      })
    } catch(e) {
      log.error(e.message + "\n" + String(e.stack))
      int.editReply({
        content: "Error: " + e.message
      })
    }
  }
}
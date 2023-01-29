module.exports = {
  name: "ticket-category-remove",
  description: "remove ticket category!",
  clientPerms: [],
  memberPerms: ["ManageServer"],
  premium: false,
  dm: false,
  run: async(client, int, data) => {
    await int.deferReply({
      ephemeral: true
    })

    try {
      data.category = null
      await data.save()
      int.editReply({
        content: "Category removed",
        ephemeral: true
      })
    } catch(e) {
      log.error(e.message + "\n" + String(e.stack))
      int.editReply({
        content: "Error: " + e.message
      })
    }
  }
}
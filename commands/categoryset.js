module.exports = {
  name: "ticket-category-set",
  description: "set ticket category!",
  clientPerms: [],
  memberPerms: ["ManageServer"],
  premium: false,
  dm: false,
  options: [{
    type: "Channel",
    name: "category",
    description: "category to set.",
    required: true,
    channelType: "GuildCategory"
  }],
  run: async(client, int, data) => {
    await int.deferReply({
      ephemeral: true
    })

    try {
      let category = int.options.getChannel("category")
      data.category = category.id
      await data.save()
      int.editReply({
        content: "Category set",
      })
    } catch(e) {
      log.error(e.message + "\n" + String(e.stack))
      int.editReply({
        content: "Error: " + e.message
      })
    }
  }
}
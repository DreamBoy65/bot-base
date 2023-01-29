module.exports = {
  name: "ticket-types",
  description: "set ticket types.",
  clientPerms: [],
  memberPerms: ["ManageServer"],
  premium: false,
  dm: false,
  options: [{
    type: "String",
    name: "types",
    description: "Types of tickets, split the by ','. like: Mod, Job",
    required: true
  }],
  run: async(client, int, data) => {
    await int.deferReply({
      ephemeral: true
    })
    try {

      let string = int.options.getString("types")
      let types = string.split(",").map(e => e.trim())
      types.forEach(e => {
        if (data.types[e]) return;
        data.types.push(e)
      })

      await data.save()
      int.editReply({
        content: "Types set!\nPlease recreate ticket embed, by setting channel."
      })
    } catch(e) {
      log.error(e.message + "\n" + String(e.stack))
      int.editReply({
        content: "Error: " + e.message
      })
    }
  }
}
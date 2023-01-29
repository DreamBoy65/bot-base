module.exports = {
  name: "ping",
  description: "ping bot",
  clientPerms: [],
  memberPerms: [],
  premium: false,
  dm: true,
  run: async(client, int, data) => {
    int.reply("Pong!")
  }
}
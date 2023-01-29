const Schema = require("../models/server.js")
const {
  PermissionFlagsBits
} = require("discord.js")

module.exports = async(client, int) => {
  if (!int.isChatInputCommand()) return;

  const command = client.commands.get(int.commandName)
  if (!command) {
    int.reply({
      content: "Unable to find " + int.commandName + ", try again",
      ephemeral: true
    })
  }

  let data

  if (int.guild) {
    data = await Schema.findOne({
      _id: int.guild.id
    })

    if (!data) {
      data = await new Schema({
        _id: int.guild.id
      }).save()
    }

    data = await Schema.findOne({
      _id: int.guild.id
    })
  }

  if (command.premium && !data.premium) {
    return int.reply({
      content: "This command is only for premium guilds",
      ephemeral: true
    })
  }

  if (command.memberPerms?.length > 0) {
    if (!int.member?.permissionsIn(int.channel.id).has(command.memberPerms.map(c =>
      PermissionFlagsBits[c]))) {
      return int.reply({
        content: `You dont have permission(s) to use this command!\n\n**• Permission(s)**\n${command.memberPerms.join(", ")}`,
        ephemeral: true
      })
    }
  }

  if (command.clientPerms?.length > 0) {
    if (!int.guild.members.me?.permissionsIn(int.channel.id).has(command.clientPerms.map(c =>
      PermissionFlagsBits[c]))) {
      return int.reply({
        content: `I dont have permission(s) to use this command!\n\n**• Permission(s)**\n${command.clientPerms.join(", ")}`,
        ephemeral: true
      })
    }
  }
  try {
    await command.run(client, int, data)
  } catch(e) {
    log.error(e.message)
    int.reply({
      content: "Getting error while runing " + int.commandName,
      ephemeral: true
    })
  }
}
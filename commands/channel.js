const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require ("discord.js")
const _ = require("lodash")

module.exports = {
  name: "ticket-channel-set",
  description: "set ticket channel!",
  clientPerms: [],
  memberPerms: ["ManageServer"],
  premium: false,
  dm: false,
  options: [{
    type: "Channel",
    name: "channel",
    description: "channel to set.",
    required: true,
    channelType: "GuildText"
  }],
  run: async(client, int, data) => {
    await int.deferReply({
      ephemeral: true
    })
    try {
      let channel = int.options.getChannel("channel")

      const embed = new EmbedBuilder()
      .setTitle("Ticket System.")
      .setDescription("Click the button to open ticket. (>•~•)")
      .setFooter({
        text: "© " + client.user.username, iconURL: client.user.displayAvatarURL()})
      .setColor("BLUE")

      let buttons = []
      let rows = []
      await data.types.forEach(e => {
        let btn = new ButtonBuilder()
        .setCustomId('ticket-' + e)
        .setLabel(e)
        .setStyle(3)
        buttons.push(btn)
      })

      let btnsPerRow = await _.chunk(buttons, 5)

      for (const perrow of btnsPerRow) {
        rows.push(
          new ActionRowBuilder()
          .addComponents(perrow)
        )
      }

      let msg = await channel.send({
        embeds: [embed],
        components: rows
      }).catch(e => {
        int.editReply({
          content: "Error: " + e.message,
          ephemeral: true
        })
        log.error(e.message + "\n" + String(e.stack))
      })
      data.message = msg.id
      data.channel = channel.id

      await data.save()

      int.editReply({
        content: "Channel set!",
        ephemeral: true
      })
    } catch (e) {
      log.error(e.message + "\n" + String(e.stack))
      int.editReply({
        content: "Error: " + e.message
      })
    }
  }
}
const Schema = require("../models/server.js")
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ChannelType,
  PermissionFlagsBits
} = require ("discord.js")

module.exports = {
  handleTicketSystem: async function(client, interaction) {
    let data = await Schema.findOne({
      _id: interaction.guildId
    })
    if (!data) return;

    if (interaction.isButton()) {
      if (interaction.customId.split("-")[0] === "ticket") {
        interaction.deferReply({
          ephemeral: true
        })
        let channel = data.channel
        let category = data.category
        let message = data.message

        if (interaction.message.channelId === channel && interaction.message.id === message) {
          const Channel = await
          interaction.member.guild.channels.create({
            name: `Ticket-${data.uses}`,
            type: ChannelType.GuildText,
            parent: category ? category: null,
            permissionOverwrites: [{
              id: interaction.message.guild.id,
              deny: [PermissionFlagsBits.ViewChannel]
            },
              {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                  PermissionFlagsBits.AttachFiles]
              }]
          })
          data.uses = data.uses + 1
          data.opened.push({
            type: interaction.customId.split("-")[1],
            id: Channel.id,
            user: interaction.user.id
          })
          await data.save()
          await interaction.editReply({
            content: "Ticket opened!\nHead to " + `<#${Channel.id}>`,
          })

          const embed = new EmbedBuilder()
          .setTitle("Welcome to Ticket.")
          .setDescription("Describe your issues here." + `\n**• Type**\n${interaction.customId.split("-")[1]}` + `\n\n**• User**\n${interaction.user.tag}\n(${interaction.user.id})`)
          .setColor("Black")
          .setTimestamp()

          const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setCustomId("ticket-close")
            .setLabel('Close')
            .setStyle(4)
            .setEmoji(client.config.ticket.close || "➕")
          );
          client.channels.cache.get(Channel.id).send({
            content: `${
            interaction.user
            }`,
            embeds: [embed],
            components: [row]
          })
        }
      }

      if (interaction.customId === "ticket-close") {
        interaction.reply({
          content: "Deleting this Ticket in 5sec."
        })
        data.opened = data.opened.filter(c => c !== interaction.channelId)
        await data.save()
        setTimeout(() => {
          interaction.message.channel.delete()
        }, 5000)
      }
    }
  }
}
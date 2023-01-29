const Schema = require("../models/server.js")

module.exports = async(client, message) => {
  let data = await Schema.findOne({
    _id: message.guild.i
  })

  if (!data) return;

  if (data.opened.find(c => c.id !== message.channel.id)) return;
  
  }
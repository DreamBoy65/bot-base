module.exports = async(client) => {
  log.log(client.user.username + " is Ready!")

  log.log(`Loading slash commands ${client.config.commands.loadGlobal ?
    "Globaly": "Guildwise"}`)
  if (client.config.commands.loadGlobal) {
    log.warn("You are loading slash commands globaly, this may take around 1 hour!")
    client.application.commands.set(client.loaders.commands)
    .then(res => {
      log.success("Loaded slash commands globaly")
    })
    .catch(e => {
      log.warn("Unable to load slash commands globaly!")
    })
  } else {
    for (const guild of client.guilds.cache.map(w => w)) {
      guild.commands.set(client.loaders.commands)
      .then(res => {
        if (client.config.commands.log) {
          log.success("Loaded slash commands for " + guild.name)
        }
      })
      .catch(e => {
        log.warn("Unable to load slash commands for " + guild.name)
      })
    }
  }
}
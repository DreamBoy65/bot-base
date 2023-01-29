const {
  Client,
  Collection,
  GatewayIntentBits,
} = require("discord.js")
const Loaders = require("./Loaders.js")
const Mongoose = require("./Mongo.js")

class Bot extends Client {
  constructor(config) {
    let intents = []

    config.bot.intents.forEach(e => {
      intents.push(GatewayIntentBits[e])
    })

    config.bot.intents = intents

    super({
      ...config.bot
    })

    this.config = config
    this.loaders = new Loaders(config, this)
    this.db = new Mongoose(config.database)
    this.commands = new Collection()
  }

  async init() {
    log.log("Initializing your bot!")
    await this.loaders.loadEvents()
    await this.loaders.loadCommands()
    await this.db.init()
    this.login(this.config.bot.token)
  }
}

module.exports = Bot
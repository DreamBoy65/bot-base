const {
  readdirSync,
  lstatSync
} = require("fs")
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require('discord.js');

class Loaders {
  constructor(config, client) {
    this.config = config
    this.client = client
    this.commands = []
  }

  loadEvents() {
    const dir = process.cwd() + "/" + config.events.folder

    const events = readdirSync(dir)
    .filter(
      (d) => d.endsWith("js")
    )

    for (const file of events) {
      const name = file.split(".")[0]
      const module = require(dir + "/" + file)

      this.client.on(name, module.bind(null, this.client))

      if (this.config.events.log) {
        log.success("Loaded Event: " + name)
      }
    }

    log.success("Loaded total " + events.length + " Event(s)")
  }

  loadCommands() {
    try {
      const dir = process.cwd() + "/" + config.commands.folder

      let pulls = readdirSync(dir)

      for (const pull of pulls) {
        if (lstatSync(dir + "/" + pull).isDirectory() || pull.split(".")[1] !==
          "js") return

        const module = require(dir + "/" + pull)
        if (!module || !module.name || !module.description) {
          return log.warn(`Cannot load ${pull}`)
        }

        let command = new SlashCommandBuilder()
        .setName(module.name)
        .setDescription(module.description)
        .setDMPermission(module.dm ? true: false)

        if (module.memberPerms.length > 0) {
          let perms = []
          for (const p of module.memberPerms) {
            perms.push(PermissionFlagsBits[p])
          }

          command.setDefaultMemberPermissions(perms.reduce((a, b) => a | b))
        }

        if (module.options?.length > 0) {
          for (const opt of module.options) {
            if (!opt.name || !opt.description) {
              return log.warn("Cannot load " + module.name)
            }

            let option = `add${opt.type}Option`
            command[option](opti => {
              opti
              .setName(opt.name)
              .setDescription(opt.description)
              .setRequired(opt.required)

              if (opt.type === "Channel" && opt.channelType) {
                opti.addChannelTypes(ChannelType[opt.channelType])
              }
              if (opt.type === "String" && opt.maxLength) {
                opti.setMaxLength(opt.maxLength)
              }
              if (opt.choices?.length > 0) {
                opti.addChoices(opt.choices.join(","))
              }

              return opti
            })
          }
        }
        this.client.commands.set(module.name,
          module)
        this.commands.push(command.toJSON())
      }
    } catch(e) {
      log.error(e.message + "\n" + String(e.stack))
    }
  }
}

module.exports = Loaders
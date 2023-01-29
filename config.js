module.exports = {
  name: "Gizmo",
  bot: {
    intents: ["Guilds",
      "GuildMessages",
      "MessageContent"],
    token:
    "ODA0MDMzOTg1MTY4NTM5NzE5.GsTs8p.P2nhzwjZIdw4FRfZh8juO96TnRgbtj99TMmjCU",
    presence: {
      status: "dnd",
      activities: [{
        name: "Haha, catch me if you can 🥫"
      }]
    }
  },

  events: {
    folder: "events",
    log: true
  },

  commands: {
    folder: "commands",
    log: true,
    loadGlobal: false,
  },

  ticket: {
    emoji: "🎫"
  },

  database: {
    enable: true,
    uri: "mongodb://chatos:chatos@ac-i8itq5j-shard-00-00.8nr3yvt.mongodb.net:27017,ac-i8itq5j-shard-00-01.8nr3yvt.mongodb.net:27017,ac-i8itq5j-shard-00-02.8nr3yvt.mongodb.net:27017/test?replicaSet=atlas-nnc0jd-shard-0&ssl=true&authSource=admin",
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4
    }
  }
}
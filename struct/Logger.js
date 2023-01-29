const colors = require('@colors/colors');

class Log {
  constructor() {}

  getDate() {
    let date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  log(msg) {
    console.log(` > ${
      process.name
      }`.rainbow + ` - ${
      this.getDate()}` + "\n" + msg.blue);
  }

  success(message, title = "SUCCESS!") {
    return console.log("\x1b[32m", title, "\x1b[0m", message);
  }

  error(msg) {
    console.log(` > ${
      process.name
      }`.rainbow + ` - ${
      this.getDate()}` + "\n" + msg.red);
  }

  warn(message, title = "WARN!") {
    return console.log("\x1b[33m", title, "\x1b[0m", message);
  }

  logObj(obj) {
    let string = ""
    Object.keys(obj).forEach(e => {
      string += `\n ${
      e
      }: ${
      obj[e]}`
    })

    console.log(` > ${
      process.name
      }`.rainbow + ` - ${
      this.getDate()}` + string.green)
  }
}
module.exports = Log
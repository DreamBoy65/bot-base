const {
  model,
  Schema
} = require('mongoose');

module.exports = model('server_profiles', Schema({
  _id: String,
  types: {
    type: Array,
    default: ["ticket"]
    },
    channel: {
      type: String,
    default: null
    },
    category: {
      type: String,
    default: null
    },
    message: {
      type: String,
    default: null
    },
    uses: {
      type: Number,
    default: 0
    },
    opened: {
      type: Array,
    default: []
    }
  })
)
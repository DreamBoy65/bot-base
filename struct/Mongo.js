const mongoose = require('mongoose');

module.exports = class Mongoose {
  constructor(options = {}) {

    /**
    * The connection URI for this instance
    * @type {string}
    */

    this.connector = options.uri;

    /**
    * The connection settings for this instance
    * @type {object}
    */
    this.settings = options.config;

    /**
    * instance of mongoose library
    * @type {object}
    */
    this.db = mongoose;

    /**
    * whether the client is connected to the database
    * @type {string}
    */
    this.connected = false;

    // Listen to event to set connected to true or false
    this.db.connection.on('connected', () => this.connected = true);
    this.db.connection.on('disconnect', () => this.connected = false);
  }

  /**
  * Initialize this database
  * @returns {Object<Database>}
  */
  init() {
    this.db.set('strictQuery', true)
    this.db.connect(this.connector, this.settings)
    .catch((error) => {
      log.warn(error.message);
    });


    this.db.Promise = global.Promise;
    // this.db.set("strictQuery", true)
    this.db.connection.on('connected', () =>
      log.success('Connected to MongoDB!')
    );
    return this.db;
  };
};
const Sequelize = require('sequelize');
const config = require('config');
const production = config.get('production');
var parse = require('sequelize-parse-url');

if (production && !process.env.DATABASE_URL) {
  throw new Error('PLEASE SET DATABASE_URL IN ENV VARIABLE');
}
const dbConfig = parse(process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://postgres:postgres@127.0.0.1:5432/LOCO');

const _dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false 
  }
}
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
  dialectOptions: process.env.DATABASE_URL ? _dialectOptions : {},
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  logging: console.log

});

var Products = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP'
  },
  updatedAt: {
    type: 'TIMESTAMP'
  }
});

var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  token:  Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP'
  },
  updatedAt: {
    type: 'TIMESTAMP'
  }
});

var Contact = sequelize.define('contacts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: Sequelize.STRING,
  message: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP'
  },
  updatedAt: {
    type: 'TIMESTAMP'
  }
});

module.exports = {
    Products,
    User,
    Contact
  };
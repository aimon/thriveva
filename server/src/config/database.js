const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('triveva', 'user', 'pass', {
  dialect: 'sqlite',
  host: './dev.sqlite'
})

module.exports = sequelize;
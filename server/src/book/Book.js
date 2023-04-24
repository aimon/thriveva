const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Location = require('../location/Location')

class Book extends Model {};

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
  },
  locationId: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  sequelize,
  modelName: 'book',
  timestamps: false,
});

Book.associate = (models) => {
  Book.belongsTo(models.Location, {
    constraints: true,
    foreignKey: 'locationId'
  });  
};

module.exports = Book;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Location extends Model {
  view () {
    return {
      id: this.id,
      name: this.name,
      parentLocationId: this.parentLocationId,
      parentLocationName: this.parentLocationName
    }
  }
};

Location.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  parentLocationId: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // Denormalized Field
  parentLocationName: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'location'
});


Location.associate = (models) => {
  Location.belongsTo(models.Location, {
    constraints: true,
    foreignKey: 'parentLocationId',
    as: 'parentLocation',
  });  
};

module.exports = Location;
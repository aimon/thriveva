const sequelize = require('./src/config/database');

sequelize.sync({ force: true }).then(() => {

});

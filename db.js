const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'postgres'
  });

sequelize.authenticate()
    .then(() => console.log('pern-stack-server db is connected'))
    .then( err => console.log(err))


module.exports = sequelize;
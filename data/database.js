var Sequelize = require('sequelize');

// NOTE: create 'hrgotchi' database before running
var db = new Sequelize('hrgotchi', 'root', 'UZUmaki1995,./', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

//user schema
var User = db.define('Users', {
  userId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  //petId: {type: Sequelize.INTEGER, references: {model: Pet, key: 'petId'}}
}, {timestamps: false});

//pet schema
var Pet = db.define('Pets', {
  petId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: Sequelize.INTEGER, references: {model: User, key: 'userId'}},
  name: {type: Sequelize.STRING, allowNull: false, unique: true},
  status: {type: Sequelize.STRING, defaultValue: 'normal'},
  feed: {type: Sequelize.INTEGER, defaultValue: 5},
  health: {type: Sequelize.INTEGER, defaultValue: 5},
  love: {type: Sequelize.INTEGER, defaultValue: 5},
  experience: {type: Sequelize.INTEGER, defaultValue: 0},
  level: {type: Sequelize.INTEGER, defaultValue: 1},
  mood: {type: Sequelize.STRING, defaultValue: 'normal'},
  phys: {type: Sequelize.STRING, defaultValue: 'normal'},
  img: {type: Sequelize.STRING, defaultValue: 'http://i.imgur.com/RzBy3Vw.gif'},
}, {timestamps: false});

//log schema
var Log = db.define('Logs', {
  name: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Pet'},
  action: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Hey'},
  createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
});


// Add any realtions
// User.hasOne(Pet, { foreignKey: 'petId' });
// Pet.hasOne(User, { foreignKey: 'userId' });

//creates any missing tables
//pass in {force: true} to clear tables
User.sync();
Pet.sync();
Log.sync();


module.exports = {
  User: User,
  Pet: Pet,
  Log: Log,
  db: db
};
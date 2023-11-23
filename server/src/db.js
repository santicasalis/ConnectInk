require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//AGREGAR MODELOS
const {
  Customer,
  Admin,
  Appointment,
  Publication,
  Review,
  Tattoo,
  TattooArtist,
  TattooStyle,
  TimeAvailability,
} = sequelize.models;

//DEFINIR RELACIONES
// tatto_artist.belongsToMany(customer , { through: "", timestamps: false });
// customer.belongsToMany(tatto_artis , { through: "", timestamps: false });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

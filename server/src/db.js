require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const Exception = require("./models/TimeAvailabilityException");
const { DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  //timezone: "America/Buenos_Aires",
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

const {
  Admin,
  Customer,
  Appointment,
  PriceRange,
  Publication,
  Review,
  TattooArtist,
  TattooStyle,
  TimeAvailability,
  TimeAvailabilityException,
} = sequelize.models;

TattooArtist.belongsToMany(Customer, {
  through: "Appointment",
  timestamps: false,
  unique: false,
});
Customer.belongsToMany(TattooArtist, {
  through: "Appointment",
  timestamps: false,
  unique: false,
});
Customer.hasMany(Appointment);
Appointment.belongsTo(Customer);
TattooArtist.hasMany(Appointment);
Appointment.belongsTo(TattooArtist);

TattooArtist.belongsToMany(Customer, { through: Review, timestamps: false });
Customer.belongsToMany(TattooArtist, { through: Review, timestamps: false });

// TattooArtist - TattooStyles relation:
TattooArtist.belongsToMany(TattooStyle, {
  through: "ArtistStyle",
  timestamps: false,
});
TattooStyle.belongsToMany(TattooArtist, {
  through: "ArtistStyle",
  timestamps: false,
});

// TattooArtist - Publication relation:
TattooArtist.hasMany(Publication);
Publication.belongsTo(TattooArtist);

// TattooArtist - TimeAvailability relation:
TattooArtist.hasMany(TimeAvailability);
TimeAvailability.belongsTo(TattooArtist);

// TattooArtist - TimeAvailabilityException relation:
TattooArtist.hasMany(TimeAvailabilityException);
TimeAvailabilityException.belongsTo(TattooArtist);

// TattooArtist - PriceRange relation:
TattooArtist.hasMany(PriceRange);
PriceRange.belongsTo(TattooArtist);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

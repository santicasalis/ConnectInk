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

const {
  Admin,
  Customer,
  CustomerTattooArtistAppointment,
  Appointment,
  PriceRange,
  Publication,
  Review,
  TattooArtist,
  TattooStyle,
  TimeAvailability,
} = sequelize.models;

// TattooArtist.belongsToMany(Customer, {
//   through: "Appointment",
//   timestamps: false,
//   unique: false
// });
// Customer.belongsToMany(TattooArtist, {
//   through: "Appointment",
//   timestamps: false,
//   unique: false
// });
Customer.belongsToMany(TattooArtist, { through: CustomerTattooArtistAppointment });
TattooArtist.belongsToMany(Customer, { through: CustomerTattooArtistAppointment });
CustomerTattooArtistAppointment.belongsTo(Appointment);
Appointment.hasOne(CustomerTattooArtistAppointment);

TattooArtist.belongsToMany(Customer, { through: Review, timestamps: false });
Customer.belongsToMany(TattooArtist, { through: Review, timestamps: false });

TattooArtist.belongsToMany(Publication, {
  through: "ArtistPublication",
  timestamps: false,
});
Publication.belongsToMany(TattooArtist, {
  through: "ArtistPublication",
  timestamps: false,
});

TattooArtist.belongsToMany(TattooStyle, {
  through: "ArtistStyle",
  timestamps: false,
});
TattooStyle.belongsToMany(TattooArtist, {
  through: "ArtistStyle",
  timestamps: false,
});

TattooArtist.belongsToMany(TimeAvailability, {
  through: "ArtistAvailability",
  timestamps: false,
});
TimeAvailability.belongsToMany(TattooArtist, {
  through: "ArtistAvailability",
  timestamps: false,
});

TattooArtist.belongsToMany(PriceRange, {
  through: "ArtistPriceRange",
  timestamps: false,
});
PriceRange.belongsToMany(TattooArtist, {
  through: "ArtistPriceRange",
  timestamps: false,
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

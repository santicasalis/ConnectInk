require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const Exception = require("./models/TimeAvailabilityException");
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
  Appointment,
  PriceRange,
  Publication,
  Review,
  TattooArtist,
  TattooStyle,
  TimeAvailability,
  TimeAvailabilityException,
  Comment
} = sequelize.models;

// Appointment relation
TattooArtist.hasMany(Appointment, {
  foreignKey: 'TattooArtist_Appointment',
  as: 'appointments'
});
Appointment.belongsTo(TattooArtist, {
  foreignKey: 'TattooArtist_Appointment', 
  as: 'tattooArtist'
});

Customer.hasMany(Appointment, {
  foreignKey: 'Customer_Appointment',
  as: 'appointments'
});
Appointment.belongsTo(Customer, {
  foreignKey: 'Customer_Appointment',
  as: 'customer'
});

// TattooArtist - Review relation:
TattooArtist.hasMany(Review, {
  foreignKey: 'TattooArtist_Review',
  as: 'reviews'
});
Review.belongsTo(TattooArtist, {
  foreignKey: 'TattooArtist_Review',
  as: 'tattooArtist'
});

Customer.hasMany(Review, {
  foreignKey: 'Customer_Review',
  as: 'reviews'
});
Review.belongsTo(Customer, {
  foreignKey: 'Customer_Review',
  as: 'customer'
});

Appointment.hasMany(Review, {
  foreignKey: 'Appointment_Review',
  as: 'reviews'
});
Review.belongsTo(Appointment, {
  foreignKey: 'Appointment_Review',
  as: 'appointment'
});

// comment relation
Publication.hasMany(Comment, {
  foreignKey: 'Publication_Comment',
  as: 'comments'
});
Comment.belongsTo(Publication, {
  foreignKey: 'Publication_Comment', 
  as: 'publication'
});

Customer.hasMany(Comment, {
  foreignKey: 'Customer_Comment',
  as: 'comments'
});
Comment.belongsTo(Customer, {
  foreignKey: 'Customer_Comment',
  as: 'customer'
});

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

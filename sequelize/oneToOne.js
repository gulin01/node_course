const Sequelize = require("sequelize");

const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("test", "gulin", "password", {
  dialect: "mysql",
});

const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Country.hasOne(Capital);

let country, capital;

sequelize
  .sync({ alter: true })
  .then(() => {
    return Country.findOne({
      where,
    });
  })
  .then((data) => {
    country = data;
    return country.createCapital({
      capitalName: "WASHINGTON DC",
    });
  })
  .then((data) => {
    console.log(data.toJSON());
  })
  .catch((err) => console.log(err.message));

// CREATE CAPITAL METHOD
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     return Country.create({
//       countryName: "USA",
//     });
//   })
//   .then((data) => {
//     country = data;
//     return country.createCapital({
//       capitalName: "WASHINGTON DC",
//     });
//   })
//   .then((data) => {
//     console.log(data.toJSON());
//   })
//   .catch((err) => console.log(err.message));

// GET CAPITAL
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // getCountry
//     return Country.findOne({ where: { countryName: "Spain" } });
//   })
//   .then((data) => {
//     country = data;
//     // get capital under that country
//     return country.getCapital();
//   })
//   .then((data) => console.log(data.toJSON()))
//   .catch((err) => console.log(err.message));

// SET CAPITAL USING DEFAULT SET METHOD FOR CAPITAL
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     return Capital.findOne({ where: { capitalName: "Madrid" } });
//   })
//   .then((data) => {
//     capital = data;
//     return Country.findOne({ where: { countryName: "Spain" } });
//   })
//   .then((data) => {
//     country = data;
//     country.setCapital(capital);
//   })
//   .catch((err) => console.log(err.message));

// console.log(Capital);

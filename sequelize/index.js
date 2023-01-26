const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
// Op stands for operation
const sequelize = new Sequelize("test", "gulin", "password", {
  dialect: "mysql",
  //   define: {
  //     freezeTableName: true,
  //   },
});

const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);
const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

Country.hasOne(Capital);
let country, capital;
sequelize
  .sync({ alter: true })
  .then(() => {
    return Country.create({
      countryName: "USA",
    });
  })
  .then((data) => {
    country = data;
    return country.createCapital({
      capitalName: "Washinton DC",
    });
  })
  .then((data) => {
    console.log(data.toJSON());
  })
  .catch((err) => console.log(err));
// drops table that ends with test string

// sequelize.drop({ match: /_test$/ });
// representation table with columns
// const User = sequelize.define(
//   "client",
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [4, 20],
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       defaultValue: 21,
//     },
//     withCodeRocks: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );

// User.sync({ alter: true })
//   .then(() => {
//     //   Working with update table
//     // const user = User.build({
//     //   username: "gulchiroy ",
//     //   password: "password",
//     //   age: 25,
//     //   withCodeRocks: true,
//     // });
//     // user.username = "Jafar";
//     // return user.save();
//     // return User.bulkCreate(
//     //   [
//     //     {
//     //       username: "asadasdadl",
//     //       age: 33,
//     //       password: "passasdword",
//     //     },
//     //     {
//     //       username: "Mikasdsde",
//     //       age: 31,
//     //       password: "1234",
//     //     },
//     //     {
//     //       username: "freasdasdddy",
//     //       age: 88,
//     //       password: "1234",
//     //     },
//     //   ],
//     //   { validate: true }
//     // );
//     //   attributes[0] column name, attributes[1] : allias
//     // return User.findAll({
//     //   limit: 2,
//     // });
//     // return User.findAll({
//     //   order: [["age", "ASC"]],
//     // });
//     // return User.findAll({
//     //   attributes: [
//     //     "username",
//     //     [sequelize.fn("SUM", sequelize.col("age")), "sum_age"],
//     //   ],
//     //   group: "username",
//     // });
//     // return User.findAll({
//     //   where: {
//     //     [Op.and]: { username: "Jiwon", age: 25 },
//     //   },
//     // });
//     // return User.findAll({
//     //   where: {
//     //     age: {
//     //       [Op.gt]: 25,
//     //     },
//     //   },
//     // });
//     // return User.findAll({
//     //   where: {
//     //     age: { [Op.or]: { [Op.lt]: 45, [Op.eq]: null } },
//     //   },
//     // });
//     // return User.findAll({
//     //   where: sequelize.where(
//     //     sequelize.fn("char_length", sequelize.col("username")),
//     //     6
//     //   ),
//     // });
//     // return User.update(
//     //   {
//     //     username: "YESS",
//     //   },
//     //   {
//     //     where: {
//     //       age: {
//     //         [Op.gt]: 1,
//     //       },
//     //     },
//     //   }
//     // );
//     //Deletes every row in our table does not table the table itself
//     // return User.destroy({ truncate: true });
//     // return User.bulkCreate([
//     //   {
//     //     username: "Mike",
//     //     age: 23,
//     //     password: "123456",
//     //   },
//     //   {
//     //     username: "Shohrux",
//     //     age: 22,
//     //     password: "123456",
//     //   },
//     //   {
//     //     username: "Jack",
//     //     age: 50,
//     //     password: "123456",
//     //   },
//     //   {
//     //     username: "you",
//     //     age: 27,
//     //     password: "123456",
//     //   },
//     // ]);
//     // return User.max("age");
//     // return User.sum("age");
//     // return User.findAll({
//     //   where: {
//     //     age: 27,
//     //   },
//     //   raw: true,
//     // });
//     // return User.findByPk(4, { raw: true });
//     // return User.findOne({
//     //   where: {
//     //     age: {
//     //       [Op.or]: { [Op.lt]: 25, [Op.gt]: 0 },
//     //     },
//     //   },
//     // });
//     //   findOr create works only when data is not exist
//     // return User.findOrCreate({
//     //   where: { username: "Tom and jerry" },
//     //   defaults: {
//     //     age: 90,
//     //   },
//     // });
//     return User.findAndCountAll({
//       where: {
//         age: 50,
//       },
//       raw: true,
//     });
//   })
//   .then((data) => {
//     // data.forEach((d) => console.log(d.toJSON()));
//     const { count, rows } = data;
//     console.log(count, rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   user.save() is for updating
// task create student table

// const Student = sequelize.define(
//   "student",
//   {
//     studentId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [4, 20],
//       },
//     },
//     favorite_class: {
//       type: DataTypes.STRING(25),
//       defaultValue: "Computer Science",
//     },
//     school_year: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     subscribedToWithCode: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );

// Student.sync({ alert: true })
//   .then(() => {
// return Student.bulkCreate([
//   {
//     name: "Mamurjon",
//     favorite_class: "Math",
//     school_year: 2011,
//   },
//   {
//     name: "Hayot",
//     favorite_class: "Drinking",
//     school_year: 2012,
//   },
//   {
//     name: "gigi",
//     school_year: 2022,
//   },
//   {
//     name: "Shahnoz",
//     school_year: 2013,
//   },
// ]);
// return Student.findAll({
//   where: {
//     [Op.and]: [
//       { subscribedToWithCode: true },
//       { favorite_class: "Computer Science" },
//     ],
//   },
// });

//     return Student.findAll({
//       attributes: [
//         "school_year",
//         [sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"],
//       ],
//       group: "school_year",
//     });
//   })
//   .then((data) => {
//     data.forEach((d) => console.log(d.toJSON()));
//   })
//   .catch((error) => console.log(error));

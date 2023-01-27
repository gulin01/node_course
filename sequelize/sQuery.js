const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
// Op stands for operation
const bcrypt = require("bcrypt");
const zlib = require("zlib");
const sequelize = new Sequelize("test", "gulin", "password", {
  dialect: "mysql",
  //   define: {
  //     freezeTableName: true,
  //   },
});

const User = sequelize.define(
  "client",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 10],
      },
      //   get() {
      //     const rawValue = this.getDataValue("username");
      //     return rawValue.toUpperCase();
      //   },
    },
    password: {
      type: DataTypes.STRING(100),
      //   set(value) {
      //     const salt = bcrypt.genSaltSync(10);
      //     const hash = bcrypt.hashSync(value, salt);
      //     this.setDataValue("password", hash);
      //   },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
      validate: {
        isNumeric: true,
      },
    },
    wittCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
      //   set(value) {
      //     const compressed = zlib.deflateSync(value).toString("base64");
      //     this.setDataValue("description", compressed);
      //   },
      //   get() {
      //     const value = this.getDataValue("description");
      //     const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
      //     return uncompressed.toString();
      //   },
    },
    aboutUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.description}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        myEmailValidator(value) {
          if (value === null) {
            throw new Error("Please enter an email");
          }
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    validate: {
      usernamePassMatch() {
        if (this.username === this.password) {
          throw new Error("username and password cannot be same letters");
        } else {
          console.log("Bingo");
        }
      },
    },
  }
);

function myFunction() {
  console.log("runnning sql function");
}
const username = "kokokok";
const password = "passwprd";
User.sync({ alter: true })
  .then(() => {
    return sequelize.query(
      `SELECT username FROM client WHERE username = $username AND password =$password`,
      {
        bind: {
          username: "gogog",
          password: "password",
        },
        plain: true,
      }
    );
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

module.exports = async () => {
  const Tweet = require("./modules/Tweet");
  const User = require("./modules/User");

  User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
  Tweet.belongsTo(User, { as: "User", foreignKey: "userId" });
  const errorHandler = (err) => {
    console.log(err);
  };
  const user = await User.create({
    username: "Rose",
    password: "password",
  }).catch(errorHandler);
  const tweet = await Tweet.create({
    content: "This is actually a tweet content",
    userId: user?.id,
  }).catch(errorHandler);

  const users = await User.findAll({
    where: { username: "Rose" },
    include: [{ model: Tweet, as: "Tweets" }],
  });
  console.log("AlextDMC Tweets: ", users);
};

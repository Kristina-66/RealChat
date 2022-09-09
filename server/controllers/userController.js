const User = require("../models/userModel");

module.exports.user = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const existUser = await User.find({ username: userName }).count();
    if (existUser === 0) {
      const user = await User.create({
        username: userName,
      });
      return res.json({ status: true, user });
    }

    if (existUser === 1) {
      const user = await User.findOne({ username: userName });
      return res.json({ status: true, user });
    }

    return res.json({ status: true, chats: "Chats" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(["username", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

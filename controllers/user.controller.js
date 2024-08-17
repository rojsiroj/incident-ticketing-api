const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    let user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) return res.status(401).json({ message: "Invalid credencial" });
    bcrypt.compare(password, user.password, (err, data) => {
      if (err) return res.status(401).json({ message: "Invalid credencial" });
      if (data) {
        let access_token = jwt.sign({ id: user.id }, "secretKey", {
          expiresIn: "1h",
        });
        return res.status(200).json({ access_token });
      } else {
        return res.status(401).json({ message: "Invalid credencial" });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    let { username, password, name, contact } = req.body;

    if (!username)
      return res.status(400).json({ message: "Username is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    bcrypt
      .hash(password, saltRounds)
      .then(async (hash) => {
        console.log(hash);
        let user = await User.create({
          username,
          password: hash,
          name,
          contact,
        });

        res.status(201).json({
          id: user.id,
          username: user.username,
          name: user.name,
          contact: user.contact,
          role: user.role,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

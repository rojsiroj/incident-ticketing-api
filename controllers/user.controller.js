const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username) throw { name: "username is required" };
    if (!password) throw { name: "Password is required" };
    let user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) throw { name: "Invalid username/password" };
    let valid = bcrypt.compare(password, user.password);
    if (!valid) throw { name: "Invalid username/password" };
    let access_token = jwt.sign({ id: user.id }, "secretKey", {
      expiresIn: "1h",
    });
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    let { username, password, name, contact } = req.body;

    if (!username) throw { name: "username is required" };
    if (!password) throw { name: "Password is required" };

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
      .catch((err) => console.error(err.message));
  } catch (error) {
    next(error);
  }
};

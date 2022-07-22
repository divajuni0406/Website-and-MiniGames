const db = require("../../models");
db.sequelize.sync();

const md5 = require("md5");
const { users, profile } = require("../../models");

exports.loginGet = (req, res) => {
  res.render("login");
};

exports.home = (req, res) => {
  res.render("index");
};

exports.signUpGet = (req, res) => {
  res.render("signup");
};

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;
  let findUser = await users.findOne({ where: { username, password: md5(password) } });
  if (!findUser) {
    res.status(400).send({ message: "Failed to login. Invalid Username or Password", statusCode: 400 });
  } else {
    try {
      let getProfile = await profile.findOne({ where: { user_id: findUser.id } });
      if (findUser.password === md5(password)) {
        res.send({
          message: `Welcome ${findUser.username}`,
          sendData: { user_account: findUser, user_rofile: getProfile },
          statusCode: 200,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
};

// to create database user
exports.register = async (req, res) => {
  let { username, password, email } = req.body;
  try {
    let findUsername = await users.findOne({ where: { username } });
    let findEmail = await users.findOne({ where: { email } });
    if (findUsername || findEmail) {
      res.status(400).send({
        message: `Sorry the email or username has been taken, please create the other one !`,
        statusCode: 400,
      });
    } else {
      const userCreate = await users.create({ username, password: md5(password), email });
      console.log(userCreate);
      // create data profile database with (foreign-key)
      let { first_name, last_name, full_name, umur, tanggal_lahir, gender, address } = req.body;
      let user_id = userCreate.dataValues.id;
      const createProfile = await profile.create({ user_id, first_name, last_name, full_name, umur, tanggal_lahir, gender, address });
      console.log(createProfile);
      res.send({
        message: `Successfull to register your account`,
        resultData: { userCreate, createProfile },
        statusCode: 200,
      });
    }
    // create data profile database with (foreign-key) end tags.
  } catch (error) {
    res.status(500).send(error.message);
  }
}

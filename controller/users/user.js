const db = require("../../models");
// db.sequelize.sync();
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);
const JWT = require("jsonwebtoken");
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
  let findUser = await users.findOne({ where: { username } });
  if (!findUser) {
    res.status(400).send({ message: "Failed to login. Invalid Username or Password", statusCode: 400 });
  } else {
    try {
      let getProfile = await profile.findOne({ where: { userId: findUser.id } });
      if (passConverter.decrypt(findUser.password) === password) {
        let createToken = JWT.sign(
          {
            username: findUser.username,
            email: findUser.email,
            access: ["dashboard", "create_data", "read_data", "update_data", "delete_data"],
          },
          SecretKey
        );
        res.send({
          message: `Welcome ${findUser.username}`,
          sendData: {
            id: findUser.id,
            username: findUser.username,
            email: findUser.email,
            token: createToken,
            user_rofile: getProfile,
          },
          statusCode: 200,
        });
      } else {
        res.status(400).send({ message: "Failed to login. Invalid Username or Password", statusCode: 400 });
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
      const userCreate = await users.create({ username, password: passConverter.encrypt(password), email });
      console.log(userCreate);
      // create data profile database with (foreign-key)
      let { first_name, last_name, full_name, age, date_of_birth, gender, address } = req.body;
      let userId = userCreate.dataValues.id;
      const createProfile = await profile.create({ userId, first_name, last_name, full_name, age, date_of_birth, gender, address });
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
};

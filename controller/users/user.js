const { Sequelize } = require("sequelize");
const md5 = require("md5");

const db = require("../../models");
db.sequelize.sync();
const { users, profile } = require("../../models");
const { response } = require("express");

const loginGet = (req, res) => {
  res.render("login");
};

const home = (req, res) => {
  res.render("index");
};

const signUpGet = (req, res) => {
  res.render("signup");
};

const loginPost = (req, res) => {
  const { username, password } = req.body;
  users.findOne({ where: { username, password: md5(password) } }).then((response) => {
    if (!response) {
      res.status(400).send({ message: "Failed to login. Invalid Username or Password" });
    } else {
      res.send({
        message: `Welcome`,
        sendData: response,
        statusCode: 200,
      });
    }
  });
};

// to create database user
const register = async (req, res) => {
  let requestData = req.body;
  let dataUser = {
    username: requestData.username,
    password: md5(requestData.password),
    email: requestData.email,
  };
  try {
    let userCreate = await users.create(dataUser);
    console.log(userCreate);
    // create data profile database with (foreign-key)
    let dataProfile = {
      user_id: userCreate.dataValues.id,
      first_name: requestData.first_name,
      last_name: requestData.last_name,
      full_name: requestData.full_name,
      umur: requestData.age,
      tanggal_lahir: requestData.date_of_birth,
      gender: requestData.gender,
      address: requestData.address,
    };
    let createProfile = await profile.create(dataProfile);
    console.log(createProfile);
    res.send({
        message: `Successfull to Create Your Data`,
        resultData: createProfile,
        statusCode: 200,
      });
    // create data profile database with (foreign-key) end tags.
  } catch (error) {
    console.log(error);
  }

  // let userCreate = users
  //   .create(dataUser)
  //   .then((response) => {
  //     // create data profile database with (foreign-key)
  //     let dataProfile = {
  //       user_id: response.dataValues.id,
  //       first_name: requestData.first_name,
  //       last_name: requestData.last_name,
  //       full_name: requestData.full_name,
  //       umur: requestData.age,
  //       tanggal_lahir: requestData.date_of_birth,
  //       gender: requestData.gender,
  //       address: requestData.address
  //     };
  //     profile
  //       .create(dataProfile)
  //       .then((resProf) => {
  //         res.send({
  //           message: `Successfull to Create Your Data`,
  //           resultData: resProf,
  //           statusCode: 200,
  //         });
  //         console.log(resProf);
  //       })
  //       .catch((err) => {
  //         res.status(400).send({ message: `Failed to Create Your Data` });
  //         console.log(err);
  //       });
  //     // create data profile database with (foreign-key) end tags.
  //     console.log(response);
  //   })
  //   .catch((err) => console.log(err));
};
// to create database user
const registerEx = (req, res) => {
  let dataUser = {
    username: "dewi kharisma",
    password: "dewi",
    email: "dewi@gmail.com",
  };

  users
    .create(dataUser)
    .then((response) => {
      console.log(response);
      // create data profile database with (foreign-key)
      let newDataProfile = {
        user_id: response.dataValues.id,
        first_name: "",
        last_name: "",
        full_name: response.dataValues.username,
        umur: 0,
        tanggal_lahir: 0,
        gender: "",
        address: "",
      };
      profile
        .create(newDataProfile)
        .then((resProf) => {
          res.send({
            message: `Successfull to Create Data Profile`,
            resultData: resProf,
            statusCode: 200,
          });
        })
        .catch((err) => {
          res.status(400).send({ message: `Failed to Create Data Profile` });
          console.log(err);
        });
      // create data profile database with (foreign-key) end tags.
    })
    .catch((err) => console.log(err));
};

// to find database user
const blaGet = (req, res) => {
  users.findAll().then((err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(res);
  });
  res.send("get");
};

// example to get data login to back-end
const loginEx = (req, res) => {
  const { username, password } = req.body;
  users.findOne({ where: { username, password: md5(password) } }).then((response) => {
    if (!response) {
      res.status(400).send("Failed to login. Invalid Username or Password");
    } else {
      res.send({
        message: `Welcome`,
        result: response,
        statusCode: 200,
      });
    }
  });
};

const blaDelete = (req, res) => {
  UserModel.deleteOne({ username: "kera" }).then((err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
  res.send("delete");
};

const blaPut = (req, res) => {
  UserModel.updateOne(
    {
      _id: "62ce8ea9888846de0eae9bf6",
    },
    {
      $set: {
        email: "kharisma@gmail.com",
      },
    }
  )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log(error));
  res.send("put");
};

//latihan
const user = (req, res) => {
  res.render("user");
};
const form = (req, res) => {
  let dataUser = {
    username: "dewi kharisma",
    password: "dewi",
    email: "dewi@gmail.com",
  };

  users
    .create(dataUser)
    .then((response) => {
      console.log(response);
      // create data profile database with (foreign-key)
      let newDataProfile = {
        user_id: response.dataValues.id,
        first_name: "",
        last_name: "",
        full_name: response.dataValues.username,
        umur: 0,
        tanggal_lahir: 0,
        gender: "",
        address: "",
      };
      profile
        .create(newDataProfile)
        .then((resProf) => {
          res.send({
            message: `Successfull to Create Data Profile`,
            resultData: resProf,
            statusCode: 200,
          });
        })
        .catch((err) => {
          res.status(400).send({ message: `Failed to Create Data Profile` });
          console.log(err);
        });
      // create data profile database with (foreign-key) end tags.
    })
    .catch((err) => console.log(err));
};

exports.register = register;
exports.loginGet = loginGet;
exports.loginPost = loginPost;
exports.home = home;
exports.signUpGet = signUpGet;
exports.registerEx = registerEx;
exports.blaGet = blaGet;
exports.blaDelete = blaDelete;
exports.blaPut = blaPut;
exports.loginEx = loginEx;
exports.user = user;
exports.form = form;
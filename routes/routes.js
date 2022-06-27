const express = require("express");
// how to call router function 
const Routes = express.Router();

// this is for place the router that we have before inside app.js, so that it looks more tidy, but we have to convert
// which is from app.get to Routes.get, according to the name of variable that we have above
Routes.get("/", (req, res) => {
  res.render("index");
});

Routes.get("/gamesuit", (req, res) => {
  res.render("gamesuit");
});

Routes.get("/login", (req, res) => {
  res.render("login");
});

Routes.post("/product/create", (req, res) => {
  // console.log is used to get text of json that be sent from front end or thunder in terminal
  console.log(req.body);
  // res.send and message below for give a message to thunder or front end that the proccess has success sent already
  res.send({
    message: "Successfull to insert data",
    statusCode: 200,
  });
});

Routes.post("/register", (req, res) => {
  let dataUser = { username: "kera@gmail.com", password: "123" };
  let requestData = req.body;
  let message = "Failed to login, wrong";
  console.log(req.body);

  if (requestData.username !== dataUser.username) {
    message += " username ";
  }

  if (requestData.password !== dataUser.password) {
    message.indexOf("username") > -1 ? (message += "And") : "";
    message += " password ";
  }

  if (requestData.username == dataUser.username && requestData.password == dataUser.password) {
    return res.send({
      message: `Welcome ${requestData.username} :D`,
      resultData: dataUser,
      statusCode: 200
    });
  }

  return res.status(400).send({ message: message + " !!!" });
});

Routes.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});
// then exported
module.exports = Routes;

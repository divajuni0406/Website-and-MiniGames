const express = require("express");
// how to call router function
const Routes = express.Router();
// import proccess from controller
const userProccess = require("../controller/users/user");
const gameProccess = require("../controller/game/game");
const middleProccess = require("../controller/middleware/middleware");

// this is for place the router that we have before inside app.js, so that it looks more tidy, but we have to convert
// which is from app.get to Routes.get, according to the name of variable that we have above
Routes.get("/user", userProccess.user)
Routes.post("/form", userProccess.form);
Routes.get("/form", userProccess.form);
Routes.get("/", userProccess.home);
Routes.get("/gamesuit", gameProccess.gameGet);
Routes.get("/login", userProccess.loginGet);
Routes.get("/signup", userProccess.signUpGet);
Routes.post("/login", userProccess.loginPost);
Routes.post("/register", userProccess.register);

Routes.post("/registerEx", userProccess.registerEx);
Routes.get("/blabla", userProccess.blaGet);
Routes.put("/blabla", userProccess.blaPut);
Routes.delete("/blabla", userProccess.blaDelete);
Routes.post("/loginEx", userProccess.loginEx);

Routes.use("/", middleProccess.errorPage);
// then exported
module.exports = Routes;

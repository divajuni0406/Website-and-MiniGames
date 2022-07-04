const express = require("express");
// call express ejs layouts
// const expressLayouts = require("express-ejs-layouts");
// call morgan
const morgan = require("morgan");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
// app.use(expressLayouts);
app.use(morgan("dev"));
app.use(express.static("public"));

// this is to call the function of json in express so that can accept file type of json from thunder plugin or front end
app.use(express.json());

// import function Routes from routes.js
const Routes = require("./routes/routes");
// our router
app.use(Routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

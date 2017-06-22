var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require('cookie-parser')

var PORT = process.env.PORT || 3000;
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use("/assets",express.static(__dirname + "/assets"));
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));




var routes = require("./controllers/controller.js");


app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);


app.listen(PORT, function() {
  console.log("Listening on port:%s", PORT);
});

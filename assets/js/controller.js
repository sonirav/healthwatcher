var express = require("express");

var router = express.Router();
var profile = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/profile");
});

router.get("/profile", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  profile.all(function(profileData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { profile_data: profileData });
  });
});

router.post("/profile/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  profile.create(req.body.profile_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});
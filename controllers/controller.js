var express = require("express");
var path = require("path");
var dbCheck;
var router = express.Router();
var MySQL = require("./connection.js")

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/main", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/html/main.html"));
});

router.get("/calculate", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/html/calculator.html"));
});

router.post("/login", function(req, res) {
  console.log(req.body);
  var queryString = "CALL SP_CHKPWD('"+req.body.email+"', '"+req.body.password+"', @a)";
    MySQL.query(queryString, function(err, result) {
      MySQL.query("SELECT @a", function(err, result) {
        console.log(result[0]['@a']);
        if (result[0]['@a'] === null) {          
          res.redirect("/login");
          //alert("Wrong User Name/Password");
        } else {
         
           res.redirect("/main");
        }
      });
    });
})
router.post("/main", function(req, res) {
  console.log(req.body);


  });


  
  router.get("/registration", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/html/registration.html"));
});

router.post("/registration", function(req, res) {
	console.log("post recieved")
  console.log(req.body);
  // takes the request object using it as input for buger.addBurger
  //registration.create(req.body.registration_name, function(result) {
    var queryString = "CALL SP_INSERTNEW('"+req.body.name+"', '"+req.body.gender+"', '"+req.body.email+"', '"+req.body.goalweight+"','"+req.body.height+"', '"+req.body.weight+"' ,'"+req.body.password+"', @stats)";
    MySQL.query(queryString, function(err, result) {
      console.log(err);
      console.log(queryString);
      MySQL.query(" SELECT @stats", function(err, result) {

          res.cookie("gender", req.body.gender);
          res.cookie("heightIn", req.body.height);
          res.cookie("weight", req.body.weight);

    console.log(result);
    res.redirect("/login");
  });
});
  });

router.get("/calculator", function(req, res) {
  res.sendFile(path.join(__dirname, "../assets/html/calculator.html"));
});

router.post("/calculator", function(req, res) {
  console.log("post recieved")
  console.log(req.body);
  });


module.exports = router;
var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/api/burgers", function (req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function (data) {
    var objectBurger = {
      burgers: data,
    };
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", objectBurger);
  });
});

// post route -> back to index
router.post("/api/burgers/create", function (req, res) {
  burger.create(
    ["name", "devoured"],
    [req.body.name, req.body.devoured],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
  // takes the request object using it as input for burger.addBurger
});

// put route -> back to index
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.update(
    {
      devoured: req.params.id,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

module.exports = router;

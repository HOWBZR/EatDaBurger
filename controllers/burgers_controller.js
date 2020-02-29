const express = require("express");
const burger = require("../models/burger.js")
const router = express.Router()


router.get("/", function (req, res) {
    console.log("get")
    burger.selectAll(function (data) {

        // preapare for render in the handlebars
        res.render("index", { burgers: data })
    })

})


router.post("/api/burgers", function (req, res) {
    console.log("POST: ", req.body)
    //calling burger ORM to create a burger 
    burger.insertOne(['burger_name'], [req.body.name], function (data) {

        res.json(data)
    })

})

router.put("/api/burgers/:id", function (req, res) {
    console.log("PUT: ", req.params)

    let condition = "id=" + req.params.id
    burger.updateOne({ devoured: true }, condition, function (data) {
        res.json(data)

    })

})

module.exports = router
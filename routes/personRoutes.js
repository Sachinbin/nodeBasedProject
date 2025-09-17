const express = require("express")
const router = express.Router();
const Person = require("../models/person.js");
const db = require("../db.js");
const { appendFile } = require("fs");


// create route to person or get data form user
router.post("/", async (req, res) => {
    try {
        let data = req.body;
        let newParson = new Person(data);

        await newParson.save()

        res.status(200).json(newParson)
        res.send("data was seved successfuly.");

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data)
        // res.send("data was get successfuly.");

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }

})

//work Type route
router.get("/:workType", async (req, res) => {
    try {
        let workType = req.params.workType;
        if (workType == "chef" || workType == "waiter" || workType == "manger") {
            let response = await Person.find({ work: workType })
            res.status(200).json(response)
        } else {
            res.status(500).json("invalid parameters")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error, "invalid parameters")
    }
})

//find by id and update
router.put("/:id", async (req, res) => {
    try {
        let personId = req.params.id;
        let personUpdatedData = req.body;
        const response = await Person.findByIdAndUpdate(personId, personUpdatedData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: "page not found" })
        }
        console.log("data is updated!")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error, "invalid parameters")
    }
})

// delete route
router.delete("/:id", async (req, res) => {
    try {
        let personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)
         if (!response) {
            return res.status(404).json({ error: "page not found" })
        }
        console.log("data deleted.")
        res.status(200).json({massage:"person deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error, "invalid parameters")
    }
})

module.exports = router;
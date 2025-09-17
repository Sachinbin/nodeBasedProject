const express = require("express")
const router = express.Router();
const MenuItem = require("../models/menuItem.js");
const db = require("../db.js");

// create route to menu or get data form user
router.post("/", async (req, res) => {
    try {
        let data = req.body;
        let newMenuItem = new MenuItem(data);
        await newMenuItem.save()
        console.log("data saved")
        res.status(200).json(newMenuItem)
    } catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }

})

// read route to manu
router.get("/", async (req, res) => {
    try {
        let data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }

})

//menu list route
router.get("/:taste", async (req, res) => {
    try {
        let taste = req.params.taste;
        if (taste == "spicy" || taste == "sweet") {
            const response = await MenuItem.find({ taste: taste })
            console.log("fetch data")
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }
})

// updata menu
router.put("/:id", async (req, res) => {
    try {
        let menuId = req.params.id;
        let menuUpdateData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, menuUpdateData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(404).json({ massage: "page not found!" })
        }
        console.log("data updated.")
        res.status(200).json({ msg: "menu updated successfully." })
    } catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            res.status(404).json({ massage: "page not found!" })
        }
        console.log("data deleted.")
        res.status(200).json({ msg: "menu deleted successfully." })
    } catch (error) {
        console.log(error)
        res.status(500).json(error, "Internal server error")
    }
})

module.exports = router;
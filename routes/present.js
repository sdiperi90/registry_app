// ----------------------------------------
//  ************ PRESENT ROUTES **************
// ----------------------------------------

const { Present, Product, Event } = require("../models/models");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

module.exports = app => {
    app.get("/api/presents/:id", async (req, res) => {
        try {
            console.log(req.params);
            let registryItems = await Present.find({});
            console.log(registryItems);
            res.json(registryItems);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    });

    app.post("/api/presents", async (req, res) => {
        try {
            console.log("working", req.body);
            await Present.create(req.body);
            let registryItems = await Present.find({
                event_id: req.body.event_id
            });
            res.json(registryItems);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    });

    app.delete("/api/presents/:present_id", async (req, res) => {
        try {
            console.log("working", req.params);
            await Present.destroy({
                where: {
                    present_id: req.params.present_id
                },
                raw: true
            });
            res.json(true);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    });
};

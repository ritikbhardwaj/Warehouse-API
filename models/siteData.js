const mongoose = require("mongoose");
let siteDataSchema = new mongoose.Schema(
    {
        ipAddress: String
    }
);

module.exports = mongoose.model("siteData", siteDataSchema);
const express = require("express");
const {cabBooking} = require("./controller/cabBooking")
const Route = express.Router();

Route.post("/cab-booking",cabBooking)

module.exports = Route;
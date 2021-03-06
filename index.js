const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const { connectToDb } = require("./src/connection/connection.js");
const success = require("./src/helpers/responseHandlers/successHandler");
const error = require("./src/helpers/responseHandlers/errorHandler");
const mongoose = require("mongoose");

connectToDb((...something) => {});

const app = express();
const port = 7070;
// app.use(basicAuth({
//  users: { 'm.charles161@gmail.com': 'Tentacles161' },
//  challenge: true
// }))
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require("./src/routes/user.route")();
const itemRouter = require("./src/routes/item.route")();
const orderRouter = require("./src/routes/order.route")();
const shippingRouter = require("./src/routes/shipping.route")();
app.use("/item", itemRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/shipping", shippingRouter);

app.get("/", (req, res) => {
  res.json(success("Welcome to BikerStop"));
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});

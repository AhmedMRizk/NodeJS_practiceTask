const express = require("express");
const debug = require("debug")("app:productsRouter");
const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const productsRouter = express.Router();

const dbName = "nodePracticeActivity";
const url = `mongodb+srv://tempUser:${process.env.mongoPassword}@cluster0.pnfun.mongodb.net/${dbName}`;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  _id: ObjectId,
  id: Number,
  name: String,
  description: String,
  image: String,
});

productsRouter.route("/").get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await mongoose.connect(url);
      debug("Connected to the mongo DB");

      const ProductsModel = mongoose.model("product", ProductSchema);
      const products = await ProductsModel.find();
      console.log(products);
      //debug(products);
      res.render("products", { products });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

productsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;

  (async function mongo() {
    let client;
    try {
      client = await mongoose.connect(url);
      debug("Connected to the mongo DB");

      const ProductsModel = mongoose.model("product", ProductSchema);
      const product = await ProductsModel.findOne({ _id: new ObjectID(id) });

      res.render("product", { product });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = productsRouter;

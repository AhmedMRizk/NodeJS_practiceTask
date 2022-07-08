const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const productsRouter = require("./src/routers/productsRouter");

//Middleware
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use("/products", productsRouter);
//End of Middleware

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  //res.send("Hello!");
  res.render("index", { title: "Globomantrics", data: ["a", "b", "c"] });
});

app.get("/", (req, res) => {
  //res.send("Hello!");
  res.render("index", { title: "Globomantrics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

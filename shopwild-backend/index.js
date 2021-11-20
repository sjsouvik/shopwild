const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "/.env" });
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { isLoggedIn } = require("./controllers/auth");

const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("Welcome to API of Shopwild");
});

app.use("/v1", productRoutes);
app.use("/v1", authRoutes);

app.use(isLoggedIn);
app.use("/v1", categoryRoutes);
app.use("/v1", cartRoutes);
app.use("/v1", wishlistRoutes);
app.use("/v1", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "NOT Found this route on server" });
});

app.use((req, res, next, error) => {
  res
    .status(500)
    .json({ message: "Error occured", errorMessage: error.message });
});

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Couldn't conect to DB", error));

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app is running on http://localhost:${port}/`)
);

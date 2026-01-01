const express = require("express");
const app = express();
const errorhandler = require("./middleware/errorHandler")

app.use(express.json());

const userRoute = require("./router/users");
app.use("/users", userRoute);

app.get("/", (_req, res) => {
  res.json({ message: "API jalan" });
});


app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});


app.use(errorhandler)
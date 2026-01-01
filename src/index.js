const express = require("express");
const app = express();
const errorhandler = require("./middleware/errorHandler");

app.use(express.json());

const userRoute = require("./router/users");
app.use("/users", userRoute);

const userAuth = require("./router/auth");
app.use("/auth", userAuth);



app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});

app.use(errorhandler);

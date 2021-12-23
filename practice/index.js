const express = require("express");
const app = express();
app.use(express.json());
const usersList = require("./routes/users");
app.use("/api/users", usersList);

app.get("/", (req, res) => {
  res.send("You are in the root of the site..");
});

app.listen(3000, () => {
  console.log("Listening on port 3000..");
});

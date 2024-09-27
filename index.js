const express = require("express");
const app = express();
const port = 8000;
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

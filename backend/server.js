const express = require("express");
const app = express();
const port = 5000;
const c = `http://localhost:${port}>`;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.query);
  console.log(`${c} IT'S ALIVE!`);
  res.send(req.query);
});

app.listen(port, () =>
  console.log(`${c} \\o/ Connected to Backend Server \\o/`)
);

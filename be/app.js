const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());


const userRoutes = require("./routers/v1/users/router");
app.use("/api/v1/users", userRoutes);

const listRoutes = require("./routers/v1/lists/router");
app.use("/api/v1/lists", listRoutes);

const listItem = require("./routers/v1/listItems/router");
app.use("/api/v1/listItems", listItem);

const port = 8080
app.listen(port, () => {
  console.log('Listening on port ' + port)
  console.log('Proc CWD ' + process.cwd())
})
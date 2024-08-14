const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/cloud.config");
const bookRoute = require("./routes/book.route");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (_, res) => {
  res.redirect(`${config.host}:${config.swagger.ui}`);
});

app.use("/api/books", bookRoute);

app.listen(config.port, () =>
  console.log(`App listening on port ${config.host}:${config.port}!`)
);

// Swagger Config
const swaggerApp = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
swaggerApp.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
swaggerApp.listen(config.swagger.ui, () =>
  console.log(
    `Swagger UI listening on port ${config.host}:${config.swagger.ui}!`
  )
);

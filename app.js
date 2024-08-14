const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/cloud.config");
const errorHandler = require("./utils/errorHandler");

// Routers
const userRoute = require("./routes/user.route");
const ticketRoute = require("./routes/ticket.route");
const workOrderRoute = require("./routes/work-order.route");
const notificationRoute = require("./routes/notification.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.use("/api/auth", userRoute);
app.use("/api/ticket", ticketRoute);
app.use("/api/wo", workOrderRoute);
app.use("/api/notification", notificationRoute);
app.use(errorHandler);

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

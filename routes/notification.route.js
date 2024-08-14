const notificationController = require("../controllers/notification.controller");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/send/:workOrderId", authentication, notificationController.send);

module.exports = router;

const ticketController = require("../controllers/ticket.controller");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.get("/list", authentication, ticketController.list);
router.post("/create", authentication, ticketController.create);
router.post("/done/:ticketId", authentication, ticketController.done);

module.exports = router;

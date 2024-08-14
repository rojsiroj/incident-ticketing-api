const workOrderController = require("../controllers/work-order.controller");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.get("/list", authentication, workOrderController.list);
router.post("/create", authentication, workOrderController.create);
router.post("/accept/:workOrderId", authentication, workOrderController.accept);
router.post("/done/:workOrderId", authentication, workOrderController.done);

module.exports = router;

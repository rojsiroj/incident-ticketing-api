const { WorkOrder, User } = require("../models");

exports.send = async (req, res) => {
  try {
    const { workOrderId } = req.params;

    const workOrder = await WorkOrder.findByPk(workOrderId);
    const technician = await User.findOne({
      where: { role: "teknisi" },
      attributes: ["id", "username", "name", "role", "contact"],
    });

    if (workOrder === null) {
      res.status(404).json({
        message: `Cannot send notification to technician. Work order with id=${workOrderId} was not found!`,
        data: workOrder,
      });
    } else {
      res.json({
        message: "Successfully send notification to technician.",
        data: { ...workOrder.dataValues, sent_to: technician },
      });
    }
  } catch (error) {
    next(error);
  }
};

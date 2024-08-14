const { WorkOrder, Ticket } = require("../models");

exports.create = async (req, res) => {
  try {
    const { description, ticketId } = req.body;

    if (!ticketId) {
      return res.status(400).send({
        message: "TicketId can not be empty",
      });
    }

    const ticket = await Ticket.findByPk(ticketId);
    if (ticket === null) {
      return res.status(404).json({
        message: `Ticket with id=${ticketId} not found.`,
        data: ticket,
      });
    }
    ticket.update({ status: "ON PROGRESS", updatedAt: new Date() });

    const checkWorkOrder = await WorkOrder.findOne({ ticketId });
    if (checkWorkOrder === null) {
      const data = {
        status: "OPEN",
        description,
        ticketId,
      };

      WorkOrder.create(data)
        .then((data) => {
          res.json({
            message: "Work Order created successfully.",
            data: data,
          });
        })
        .catch((error) => {
          next(error);
        });
    } else {
      res.status(400).json({
        message: `Work Order for ticket id=${ticketId} is already created.`,
        data: checkWorkOrder,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.list = (req, res) => {
  try {
    WorkOrder.findAll()
      .then((workOrders) => {
        res.json({
          message: "Work Orders retrieved successfully.",
          data: workOrders,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

exports.accept = async (req, res) => {
  try {
    const { workOrderId } = req.params;
    const { userId } = req.user;

    const workOrder = await WorkOrder.findByPk(workOrderId);
    if (workOrder === null) {
      return res.status(404).json({
        message: `Work Order with id=${workOrderId} not found.`,
        data: workOrder,
      });
    } else {
      console.log(workOrder.status);
      if (workOrder.status === "DONE") {
        return res.status(400).json({
          message: `Work Order with id=${workOrderId} already done.`,
          data: workOrder,
        });
      }
    }

    const ticket = await Ticket.findByPk(workOrder.ticketId);
    if (ticket !== null) {
      ticket.update({ assignedTo: userId, updatedAt: new Date() });
    }

    const data = {
      status: "ON PROGRESS",
      assignedTo: userId,
      updatedAt: new Date(),
    };

    WorkOrder.update(data, {
      where: { id: workOrderId },
    })
      .then((num) => {
        console.log(num);
        if (num == 1) {
          res.json({
            message: "Successfully accept Work Order.",
            data: { ...req.body, status: "ON PROGRESS" },
          });
        } else {
          res.status(404).json({
            message: `Cannot update ticket with id=${id}. Maybe ticket was not found!`,
            data: req.body,
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

exports.done = async (req, res) => {
  try {
    const { workOrderId } = req.params;
    const { description } = req.body;

    const workOrder = await WorkOrder.findByPk(workOrderId);
    if (workOrder === null) {
      return res.status(404).json({
        message: `Work Order with id=${workOrderId} not found.`,
        data: workOrder,
      });
    } else {
      if (workOrder.status === "DONE") {
        return res.status(400).json({
          message: `Please accept Work Order before set it to DONE.`,
          data: workOrder,
        });
      }
    }

    const data = {
      status: "DONE",
      description,
      updatedAt: new Date(),
    };

    WorkOrder.update(data, {
      where: { id: workOrderId },
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            message: "Work Order status change to DONE.",
            data: { ...req.body, status: "DONE" },
          });
        } else {
          res.status(404).json({
            message: `Cannot update ticket with id=${id}. Maybe ticket was not found!`,
            data: req.body,
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

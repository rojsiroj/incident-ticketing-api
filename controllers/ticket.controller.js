const { Ticket, WorkOrder } = require("../models");

exports.create = (req, res) => {
  try {
    const { description } = req.body;

    const data = {
      status: "OPEN",
      description,
    };

    Ticket.create(data)
      .then((data) => {
        res.json({
          message: "Ticket created successfully.",
          data: data,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

exports.list = (req, res) => {
  try {
    Ticket.findAll()
      .then((tickets) => {
        res.json({
          message: "Tickets retrieved successfully.",
          data: tickets,
        });
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
    const { ticketId } = req.params;
    const { description } = req.body;

    const ticket = await Ticket.findByPk(ticketId);
    if (ticket === null) {
      return res.status(404).json({
        message: `Ticket with id=${ticketId} not found!`,
        data: ticket,
      });
    }

    const workOrder = await WorkOrder.findOne({ ticketId: ticketId });
    if (workOrder === null) {
      return res.status(400).json({
        message: `Ticket with id=${ticketId} does'nt have Work Order!`,
        data: workOrder,
      });
    } else {
      if (workOrder.status !== "DONE") {
        return res.status(400).json({
          message: `Please set Work Order DONE first before set DONE for this Ticket!`,
          data: workOrder,
        });
      }
    }

    const data = {
      status: "DONE",
      description,
      updatedAt: new Date(),
    };

    Ticket.update(data, {
      where: { id: ticketId },
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            message: "Ticket status change to DONE.",
            data: { ...req.body, status: "DONE" },
          });
        } else {
          res.status(404).json({
            message: `Cannot update ticket with id=${id}. Maybe ticket was not found or already done!`,
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

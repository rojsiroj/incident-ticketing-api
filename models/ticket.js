"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.hasOne(models.WorkOrder, { foreignKey: "ticketId" });
    }
  }
  Ticket.init(
    {
      description: DataTypes.TEXT,
      assignedTo: DataTypes.INTEGER,
      status: DataTypes.ENUM("OPEN", "ON PROGRESS", "DONE"),
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );

  return Ticket;
};

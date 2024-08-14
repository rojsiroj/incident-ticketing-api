"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkOrder.init(
    {
      description: DataTypes.TEXT,
      ticketId: DataTypes.INTEGER,
      assignedTo: DataTypes.INTEGER,
      status: DataTypes.ENUM("OPEN", "ON PROGRESS", "DONE"),
    },
    {
      sequelize,
      modelName: "WorkOrder",
    }
  );
  return WorkOrder;
};

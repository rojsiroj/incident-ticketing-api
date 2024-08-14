"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("WorkOrders", "ticketId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tickets",
          key: "id",
        },
      }),
      queryInterface.addColumn("WorkOrders", "assignedTo", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      }),
      queryInterface.addColumn("WorkOrders", "status", {
        type: Sequelize.ENUM(["OPEN", "ON PROGRESS", "DONE"]),
        defaultValue: "OPEN",
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("WorkOrders", "ticketId"),
      queryInterface.removeColumn("WorkOrders", "assignedTo"),
      queryInterface.removeColumn("WorkOrders", "status"),
    ]);
  },
};

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
      queryInterface.addColumn("Tickets", "assignedTo", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      }),
      queryInterface.addColumn("Tickets", "status", {
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
      queryInterface.removeColumn("Tickets", "assignedTo"),
      queryInterface.removeColumn("Tickets", "status"),
    ]);
  },
};

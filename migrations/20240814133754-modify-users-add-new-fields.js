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
      queryInterface.addColumn("Users", "name", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Users", "role", {
        type: Sequelize.ENUM(["operator", "teknisi"]),
        defaultValue: "operator",
      }),
      queryInterface.addColumn("Users", "contact", {
        type: Sequelize.STRING,
        allowNull: true,
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
      queryInterface.removeColumn("Users", "name"),
      queryInterface.removeColumn("Users", "role"),
      queryInterface.removeColumn("Users", "contact"),
    ]);
  },
};

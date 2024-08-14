"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        password:
          "$2b$10$RppJC4f4m.g6IhEw9bGgvOnr5xPfipnjBiqF384df2DwgRLw9G7MO",
        name: "Siroj",
        role: "operator",
        contact: "+628756478",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "admin2",
        password:
          "$2b$10$RppJC4f4m.g6IhEw9bGgvOnr5xPfipnjBiqF384df2DwgRLw9G7MO",
        name: "Siroj 2",
        role: "teknisi",
        contact: "+628756478",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};

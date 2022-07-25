"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("history_game_heads", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      total_win: {
        type: Sequelize.INTEGER,
      },
      total_draw: {
        type: Sequelize.INTEGER,
      },
      total_lose: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("history_game_head");
  },
};

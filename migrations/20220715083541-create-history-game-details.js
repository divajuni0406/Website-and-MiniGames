"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("history_game_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      historyGameHeadId: {
        type: Sequelize.INTEGER,
      },
      win: {
        type: Sequelize.INTEGER,
      },
      draw: {
        type: Sequelize.INTEGER,
      },
      lose: {
        type: Sequelize.INTEGER,
      },
      type_player: {
        type: Sequelize.STRING,
      },
      date_time: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("history_game_detail");
  },
};

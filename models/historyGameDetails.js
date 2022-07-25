"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryGameDetails extends Model {
    static associate(models) {
    }
  }
  HistoryGameDetails.init(
    {
      historyGameHeadId: DataTypes.INTEGER,
      win: DataTypes.INTEGER,
      draw: DataTypes.INTEGER,
      lose: DataTypes.INTEGER,
      type_player: DataTypes.STRING,
      date_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'HistoryGameDetails',
      tableName: 'history_game_details',
    }
  );

  return HistoryGameDetails;
};


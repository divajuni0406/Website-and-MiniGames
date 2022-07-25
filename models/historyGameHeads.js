"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryGameHeads extends Model {
    static associate(models) {
      this.belongsTo(models.users, {foreignKey: "userId", as: 'Users'});
      this.hasMany(models.HistoryGameDetails, {foreignKey: "historyGameHeadId", as: 'HistoryGameDetails'});
    }
  }
  HistoryGameHeads.init(
    {
      userId: DataTypes.INTEGER,
      total_win: DataTypes.INTEGER,
      total_draw: DataTypes.INTEGER,
      total_lose: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'HistoryGameHeads',
      tableName: 'history_game_heads',
    }
  );

  return HistoryGameHeads;
};

const {HistoryGameHeads, HistoryGameDetails} = require('../../models');

exports.gameGet = (req, res) => {
  res.render("gamesuit");
};

exports.history = (req, res) => {
  res.render("history");
};

exports.getHistoryUser = async (req, res) => {
  try {
    let response = await HistoryGameHeads.findOne({
      where: { userId : req.params.userId },
      include: ['Users', 'HistoryGameDetails'],
      order: [
        [{ model: HistoryGameDetails, as: 'HistoryGameDetails' }, 'id', 'DESC' ]
      ],
    })
  
    res.send({
      message: "Successfull to update total game score !",
      statusCode: 200,
      resultData: {response},
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getTopScore = async (req, res) => {
  try {
    let response = await HistoryGameHeads.findAll({
      include: ['Users'],
      order: [
        ['total_win', 'DESC' ]
      ],
    })
  
    res.send({
      message: "Successfull to update total game score !",
      statusCode: 200,
      resultData: { response},
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.saveScore = async (req, res) => {
  let { userId, win, lose, draw, type_player } = req.body;
  let historyGameHead = { userId:userId, total_win : win, total_lose : lose, total_draw : draw };

  try {
    let historyHeads = await HistoryGameHeads.findOne({ where: { userId: userId } });

    if (!historyHeads) {
      historyHeads = await HistoryGameHeads.create(historyGameHead);
    } else {
      historyHeads.total_win += win;
      historyHeads.total_lose += lose;
      historyHeads.total_draw += draw;
      historyHeads = await historyHeads.save();
    }

    let historyGameDetail = { historyGameHeadId : historyHeads.id , win, lose, draw, type_player, date_time : Date.now() };
    let historyDetail = await HistoryGameDetails.create(historyGameDetail);
    
    res.send({
      message: "Successfull to update total game score !",
      statusCode: 200,
      resultData: { historyHeads, historyDetail },
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

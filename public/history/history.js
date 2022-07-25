import { getCookie } from "../../cookies.js";

$(document).ready(function () {
  $("#example").DataTable();
});

getHistory();

async function getHistory() {
  let userId = getCookie("userId");
  let username = getCookie("username");
  document.querySelector(".title-history").innerText = `${JSON.parse(username)}'s Game History`;

  let formatDate = {
    weekday: "short",
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  try {
    let table = $("#example").DataTable({
      footerCallback: function (row, data, start, end, display) {
        let api = this.api();

        let intVal = function (i) {
          return typeof i === "string" ? i.replace(/[\$,]/g, "") * 1 : typeof i === "number" ? i : 0;
        };

        let pageTotalWin = api
          .column(1, { page: "current" })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);

        let pageTotalLose = api
          .column(2, { page: "current" })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);

        let pageTotalDraw = api
          .column(3, { page: "current" })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);

        $(api.column(1).footer()).html(pageTotalWin);
        $(api.column(2).footer()).html(pageTotalLose);
        $(api.column(3).footer()).html(pageTotalDraw);
      },
    });
    let response = await fetch(`/history-game/${userId}`);
    const result = await response.json();
    let historyDetails = result.resultData.response.HistoryGameDetails;

    historyDetails.forEach((history, index) => {
      let date = new Date(history.date_time);

      table.row.add([index + 1, history.win, history.lose, history.draw, date.toLocaleString("en-US", formatDate)]).draw();
    });
  } catch (error) {
    console.log(error);
  }
}

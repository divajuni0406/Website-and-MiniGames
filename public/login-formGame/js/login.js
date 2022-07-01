import { setCookie } from "../../cookies.js";

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      alert(result.message);
      if (result.statusCode === 200) {
        setCookie("username", JSON.stringify(result.resultData.username), 1);
        return (window.location.href = "/");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

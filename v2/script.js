const url = "https://restcountries.com/v3.1/all";
const image = document.querySelector(".image");
const button = document.querySelectorAll(".btn");
const next = document.querySelector(".btnNext");
const trueAns = document.querySelector(".true-answers");
const falseAns = document.querySelector(".false-answers");

const audio = new Audio();
const audio2 = new Audio();
audio.src = "./1.wav";
audio2.src = "./2.wav";

const getData = async () => {
  let response = await fetch(url);
  if (response.status !== 200) throw new Error("error func");

  const data = response.json();
  return data;
};

getData()
  .then((resolve) => {
    var randomNum = getRandomNumber();

    image.src = `${resolve[randomNum]["flags"]["png"]}`;

    for (let i = 0; i < button.length; i++) {
      button[i].textContent = resolve[randomNum - i]["name"]["common"];
    }
    var listRandomNumber = Math.floor(Math.random() * 4);

    var some = button[0].textContent;

    button[0].textContent = button[listRandomNumber].textContent;

    button[listRandomNumber].textContent = some;

    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener("click", (e) => {
        if (button[i].textContent === resolve[randomNum]["name"]["common"]) {
          next.classList.add("show");
          next.removeAttribute("disabled");
          trueAns.textContent++;
          button[i].style.backgroundColor = "green";
          button.forEach((e) => {
            if (e.style.backgroundColor == "green") {
              e.style.color = "white";
            } else {
              e.style.backgroundColor = "red";
              e.style.color = "white";
            }
          });
        } else {
          next.removeAttribute("disabled");
          next.classList.add("show");
          falseAns.textContent++;
          button.forEach((e) => {
            if (e.textContent === resolve[randomNum]["name"]["common"]) {
              e.style.backgroundColor = "green";
              e.style.color = "white";
            } else {
              e.style.backgroundColor = "red";
              e.style.color = "white";
            }
          });
        }
      });
    }
    next.addEventListener("click", (e) => {
      next.setAttribute("disabled", "");
      next.classList.remove("show");
      randomNum = getRandomNumber();
      image.src = `${resolve[randomNum]["flags"]["png"]}`;
      for (let i = 0; i < button.length; i++) {
        button[i].textContent = resolve[randomNum - i]["name"]["common"];
      }
      button.forEach((e) => {
        e.style.backgroundColor = "white";
        e.style.color = "black";
      });
      listRandomNumber = Math.floor(Math.random() * 4);

      some = button[0].textContent;

      button[0].textContent = button[listRandomNumber].textContent;

      button[listRandomNumber].textContent = some;
    });
  })
  .catch((e) => {
    console.log("error 2 " + e.message);
  });

function getRandomNumber() {
  return Math.floor(Math.random() * 250);
}

const url = "https://restcountries.com/v3.1/all";
const input = document.querySelector(".input-area");
const button = document.querySelector(".check-button");
const trueAnswers = document.querySelector(".true-answers");
const falseAnswers = document.querySelector(".false-answers");
const image = document.querySelector(".image");
const skipButton = document.querySelector(".skip-button");
const resetButton = document.querySelector(".reset-button");

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

    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        input.value.toLowerCase().trim() ===
        resolve[randomNum]["name"]["common"].toLowerCase()
      ) {
        trueAnswers.textContent++;
        input.value = "";
      } else {
        falseAnswers.textContent++;
        input.value = "";
      }
      randomNum = getRandomNumber();
      image.src = `${resolve[randomNum]["flags"]["png"]}`;
    });
    skipButton.addEventListener("click", (e) => {
      e.preventDefault();
      input.value = "";
      randomNum = getRandomNumber();
      image.src = `${resolve[randomNum]["flags"]["png"]}`;
    });

    resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      input.value = "";
      randomNum = getRandomNumber();
      image.src = `${resolve[randomNum]["flags"]["png"]}`;
      falseAnswers.textContent = 0;
      trueAnswers.textContent = 0;
    });
  })
  .catch((e) => {
    console.log("error 2 " + e.message);
  });

function getRandomNumber() {
  return Math.floor(Math.random() * 250);
}

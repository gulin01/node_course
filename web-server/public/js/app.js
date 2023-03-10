fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  if (location) {
    fetch(`http://localhost:5000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forCastData;
          }
        });
      }
    );
  } else {
    messageOne.textContent = "Enter a location to get weather information";
  }
});

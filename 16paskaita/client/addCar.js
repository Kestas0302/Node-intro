"use strict";

const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const carNumberplate = document.getElementById("carNumberplates");
  const carModel = document.getElementById("carModel");
  const carPrice = document.getElementById("carPrice");

  // const inputStatus = document.querySelector(".inputStatus");

  // if (carNumberplate.value && carModel.value && carPrice.value) {
    const newCarObj = {
      title: carModel.value,
      price: carPrice.value,
      numberplates: carNumberplate.value,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCarObj),
    };

    carNumberplate.value = "";
    carModel.value = "";
    carPrice.value = "";

    fetch('http://localhost:3000/client/cars', option)
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
    // fetch(`http://localhost:3000/cars`, option)
    //   .then((resp) => resp.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));

    // inputStatusSuccess(inputStatus);
  // } 
  // else {
  //   inputStatusError(inputStatus);
  // }
});

// function removeInputStatus() {
//   const inputStatus = document.querySelector(".inputStatus");
//   inputStatus.classList.add("hidden");
//   inputStatus.textContent = "";
// }

// function inputStatusError(inputStatus) {
//   inputStatus.classList.remove("hidden");
//   inputStatus.textContent = "Please fill all fields";
//   inputStatus.style.backgroundColor = "#FF9494";
// }

// function inputStatusSuccess(inputStatus) {
//   inputStatus.classList.remove("hidden");
//   inputStatus.textContent = "Success";
//   inputStatus.style.backgroundColor = "#4BB543";
//   inputStatus.style.color = "#fff";
// }
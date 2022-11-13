"use strict";

function displayCars(cars) {
  document.querySelector("main").innerHTML = "";

  cars.forEach((car) => {
    //car box
    const carBox = document.createElement("div");
    carBox.className = "car-box";

    //car info
    const carInfo = document.createElement("div");
    const carNumberplate = document.createElement("div");
    const carModel = document.createElement("div");

    carInfo.className = "car-info";
    carNumberplate.className = "numberplate";
    carModel.className = "car-model";

    carNumberplate.textContent = car.numberplates;
    carModel.textContent = car.title;
    carInfo.append(carNumberplate, carModel);

    // //car image
    // const carImage = document.createElement("div");
    // carImage.className = "car-image";
    // const img = document.createElement("img");
    // img.src = car.image;
    // img.setAttribute("alt", `${car.title} car image`);
    // carImage.append(img);

    //delete car
    const carDelete = document.createElement("div");
    carDelete.className = "car-delete";
    carDelete.textContent = "Delete";

    //appending
    carBox.append(carInfo, carDelete);
    document.querySelector("main").append(carBox);
  });

  const deleteButtons = document.querySelectorAll(".car-delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      deleteBox(i + 1);
    });
  }
}

function getData() {
  fetch("http://localhost:3000/cars")
    .then((resp) => resp.json())
    .then((response) => displayCars(response));
}

getData();

function deleteBox(i) {
  const option = {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(i),
  };

  fetch(`http://localhost:3000/cars/${i}`, option)
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      getData();
    })
    .catch((e) => console.error(e));
}
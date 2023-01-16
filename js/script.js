"use strict";
const barsContainer = document.querySelector(".bars");

const renderData = (infoObjData) => {
  const html = `
    <div class="bar">
      <div class="bar__chart" style="height: ${
        infoObjData.amount * 0.275
      }rem"></div>
        <span class="bar__sum">$${infoObjData.amount}</span>
        <span class="bar__weekday">${infoObjData.day}</span>
     </div>
    `;
  barsContainer.insertAdjacentHTML("beforeend", html);
};

// 1 the same
// fetch("./data.json")
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// 2 the same
const chartData = async (data) => {
  try {
    const response = await fetch(`${data}`);
    const resData = await response.json();

    getData(resData);
  } catch (error) {
    console.error(error);
  }
};
chartData("./data.json");

const getData = (resData) => {
  resData.forEach((infoObjData, index) => {
    const currentDay = new Date().getDay(); // return  mon-1, tue-2 .... sat--6, san-0.
    renderData(infoObjData);

    const barsChart = document.querySelectorAll(".bar__chart");
    const barChart = Array.from(barsChart)[index]; // takes the bar according to the index

    // 3 ways how to highlight current day. They do the same.
    // 1
    if (index + 1 === currentDay) barChart.classList.add("highlight");
    if (currentDay === 0) barChart.classList.add("highlight");

    // 2
    // if (index !== 6)
    //   index + 1 === currentDay && barChart.classList.add("highlight");
    // currentDay === 0 && barChart.classList.add("highlight");

    // 3
    // if (index !== 6) {
    //   index + 1 === currentDay && barChart.classList.add("highlight");
    // } else {
    //   currentDay === 0 && barChart.classList.add("highlight");
    // }
  });
};

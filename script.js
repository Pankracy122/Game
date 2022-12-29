let cash = 20000;
let cash2 = 0;
let score3 = 0;
let multiply = 1;
let spins = 200;
let spincost = 100;
let x = 0;
let y = 0;
let z = 0;
let bonusik = 0;
let bonusik1 = 0;
let costs = [10000, 10000, 10000];
const startingMinutes = 10;
let time = startingMinutes * 59 + 9;
let clickerMulti = 1;

const init1 = () => {
  updateShopPrices();
  check();
};
const updateShopPrices = () => {
  const shop = document.getElementById("shop");
  const elements = shop.children;
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const paragraph = document.createElement("p");
    element.appendChild(paragraph);
    const priceString = document.createTextNode(costs[index]);
    paragraph.appendChild(priceString);
  }
};

document.addEventListener("DOMContentLoaded", init1);

function check() {
  if (
    localStorage.getItem("cash") === null &&
    localStorage.getItem("cash2") === null &&
    localStorage.getItem("spins") === null &&
    localStorage.getItem("spincost") === null &&
    localStorage.getItem("x") === null &&
    localStorage.getItem("y") === null &&
    localStorage.getItem("z") === null &&
    localStorage.getItem("time") === null &&
    localStorage.getItem("bonusik") === null &&
    localStorage.getItem("bonusik1") === null &&
    localStorage.getItem("cost") === null &&
    localStorage.getItem("cost1") === null
  ) {
    localStorage.setItem("cash", cash);
    localStorage.setItem("cash2", cash2);
    localStorage.setItem("spins", spins);
    localStorage.setItem("spincost", spincost);
    localStorage.setItem("x", x);
    localStorage.setItem("y", y);
    localStorage.setItem("z", z);
    localStorage.setItem("time", time);
    localStorage.setItem("bonusik", bonusik);
    localStorage.setItem("bonusik1", bonusik);
    localStorage.setItem("cost", cost);
    localStorage.setItem("cost1", cost1);
  } else {
    cash = parseInt(localStorage.getItem("cash"));
    cash2 = parseInt(localStorage.getItem("cash2"));
    score3 = parseInt(localStorage.getItem("cash2"));
    spins = parseInt(localStorage.getItem("spins"));
    spincost = parseInt(localStorage.getItem("spincost"));
    x = parseInt(localStorage.getItem("x"));
    y = parseInt(localStorage.getItem("y"));
    z = parseInt(localStorage.getItem("z"));
    time = parseInt(localStorage.getItem("time"));
    cost = parseInt(localStorage.getItem("cost"));
    cost1 = parseInt(localStorage.getItem("cost1"));

    document.getElementById("score").innerText = cash;
    document.getElementById("score2").innerText = cash2;
    document.getElementById("score3").innerText = score3;
    document.getElementById("spins").innerText = spins;
    document.getElementById("buy-spins").innerText = spincost;
    document.getElementById("first-cube").innerHTML = x;
    document.getElementById("second-cube").innerHTML = y;
    document.getElementById("third-cube").innerHTML = z;
  }
  setInterval(function() {
    let today = new Date();
    localStorage.setItem("today", today);
  }, 1000);
  //Jak najmniej innerHTML'A
  bonusik = localStorage.getItem("bonusik");
  if (bonusik > 0) {
    document.getElementById("timer").innerHTML =
      "10 Spins + " + bonusik + " in";
  }

  oblicz();
}
function countTimePassed(today) {
  const timePassed = Date.now() - today;
  const minutes = Math.floor((timePassed / 1000 / 60) % 60);
  return {
    minutes,
  };
}
function oblicz() {
  const localStorageDate = localStorage.getItem("today");
  if (localStorageDate) {
    const actual = new Date(localStorageDate);
    const timePassed = countTimePassed(actual);
    if (timePassed.minutes / 10 > 0) {
      spins =
        spins +
        Math.round(
          (10 + parseInt(bonusik)) * Math.round(timePassed.minutes / 10)
        );
    }

    document.getElementById("spins").innerText = spins;
    localStorage.setItem("spins", spins);
  }
}

function addSpinsEveryTenMinutes(countTimePassed) {
  if (countTimePassed.minutes % 10 > 0) {
    spins += (countTimePassed.minutes % 10) * 10;
    document.getElementById("spins").innerText = spins;
    localStorage.setItem("spins", spins);
  }

  if (countTimePassed.minutes < time / 60) {
    time -= countTimePassed.minutes * 60;
  } else {
    let zmienna = countTimePassed.minutes - time / 60;
    time = (10 - (zmienna % 10)) * 60;
  }
}

function multi() {
  if (multiply < 32) multiply *= 2;
  else multiply = 1;
  document.getElementById("multiply").innerHTML = "x" + multiply;
  let audioclick = document.getElementById("clickx-sound");
  audioclick.play();
}

function Spin() {
  let cube1 = document.getElementById("first-cube");
  let cube2 = document.getElementById("second-cube");
  let cube3 = document.getElementById("third-cube");
  if (spins < multiply) {
    let audio3 = document.getElementById("err-sound");
    audio3.play();
    return false;
  }

  spins = spins - multiply;
  document.getElementById("spins").innerHTML = spins;
  // let x = document.getElementById("first-cube").getAttribute("value");
  x = Math.floor(Math.random() * (9 - 1)) + 1;
  document.getElementById("first-cube").innerHTML = x;
  //second-cube
  // let y = document.getElementById("second-cube").getAttribute("value");
  y = Math.floor(Math.random() * (9 - 1)) + 1;
  document.getElementById("second-cube").innerHTML = y;
  //third-cube
  // let z = document.getElementById("third-cube").getAttribute("value");
  z = Math.floor(Math.random() * (9 - 1)) + 1;
  document.getElementById("third-cube").innerHTML = z;

  if (x == y && x == z && y == z) {
    let audio2 = document.getElementById("big-sound");
    audio2.play();
    cube1.style.background = "lightgreen";
    cube2.style.background = "lightgreen";
    cube3.style.background = "lightgreen";
    cash += 100 * multiply;
    spins += multiply * bonusik1;

    document.getElementById("score").innerHTML = cash;
  } else if (x == y) {
    cube1.style.background = "lightgreen";
    cube2.style.background = "lightgreen";
    cube3.style.background = "rgb(127, 158, 227)";
    cash += 10 * multiply;
    spins += multiply * bonusik1;
    document.getElementById("score").innerHTML = cash;
    let audio = document.getElementById("cash-sound");
    audio.play();
  } else if (x == z) {
    cube1.style.background = "lightgreen";
    cube2.style.background = "rgb(127, 158, 227)";
    cube3.style.background = "lightgreen";
    cash += 10 * multiply;
    spins += multiply * bonusik1;
    document.getElementById("score").innerHTML = cash;
    let audio = document.getElementById("cash-sound");
    audio.play();
  } else if (y == z) {
    cube1.style.background = "rgb(127, 158, 227)";
    cube2.style.background = "lightgreen";
    cube3.style.background = "lightgreen";
    cash += 10 * multiply;
    spins += multiply * bonusik1;
    document.getElementById("score").innerHTML = cash;
    let audio = document.getElementById("cash-sound");
    audio.play();
  } else if (x != y && x != z && y != z) {
    cube1.style.background = "rgb(127, 158, 227)";
    cube2.style.background = "rgb(127, 158, 227)";
    cube3.style.background = "rgb(127, 158, 227)";
  } else if (y != z) {
    cube2.style.background = "rgb(127, 158, 227)";
    cube3.style.background = "rgb(127, 158, 227)";
  } else if (x != z) {
    cube1.style.background = "rgb(127, 158, 227)";
    cube3.style.background = "rgb(127, 158, 227)";
  } else if (x != y) {
    cube1.style.background = "rgb(127, 158, 227)";
    cube2.style.background = "rgb(127, 158, 227)";
  }
  if (x == 1 && y == 1 && z == 1) {
    spins += 10 * multiply;
    cube1.style.background = "purple";
    cube2.style.background = "purple";
    cube3.style.background = "purple";
    spins += multiply * bonusik1;
  } else if (x == 2 && y == 2 && z == 2) {
    cash += 1000 * multiply;
    cube1.style.background = "yellow";
    cube2.style.background = "yellow";
    cube3.style.background = "yellow";
    spins += multiply * bonusik1;
  } else if (x == 3 && y == 3 && z == 3) {
    spins += multiply * bonusik1;
  }
  save();
}
setInterval(updateCountdown, 1000);

function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownEl.innerHTML = `${minutes} : ${seconds}`;
  localStorage.setItem("time", time);
  time--;
  if (minutes <= 0 && seconds <= 0) {
    if (bonusik > 0) {
      time = startingMinutes * 59 + 9;
      spins += 10 + parseInt(bonusik);
      document.getElementById("spins").innerText = spins;
      localStorage.setItem("spins", spins);
    } else {
      time = startingMinutes * 59 + 9;
      spins += 10;
      document.getElementById("spins").innerText = spins;
      localStorage.setItem("spins", spins);
    }
  }
}

function buyspins() {
  if (cash >= spincost) {
    cash = cash - spincost;
    spins = spins + 2;
    spincost = Math.round(spincost + 1.15);

    document.getElementById("score").innerHTML = cash;
    document.getElementById("buy-spins").innerHTML = spincost;
    document.getElementById("spins").innerHTML = spins;
    let audioalert = document.getElementById("alert-sound");
    audioalert.play();
  } else {
    let audio3 = document.getElementById("err-sound");
    audio3.play();
    return false;
  }
}

let allButtons = document.getElementById("allButtons");

allButtons.addEventListener("click", show);
function show(event) {
  console.log(event.target.matches("button"));
  //Naprawić error
  const shopElements = document.getElementById("shopWrap").children;
  for (let i = 0; i < shopElements.length; i++) {
    shopElements[i].style.display = "none";
    console.log(shopElements[i]);
  }

  const obj = {
    SHOP: document.getElementById("sklep1"),
    CLICKER: document.getElementById("clickershp"),
  };
  obj[event.target.textContent].style.display = "flex";
}
function actionClicker() {
  const random = Math.floor(Math.random() * (40 - 10) + 10);
  const target = document.getElementById("gameClicker");
  const targetChild = document.createElement("span");
  targetChild.classList.add("floatingText");
  const childText = document.createTextNode("+1✨✨🐇🐇");
  targetChild.appendChild(childText);
  targetChild.style.top = `${random}%`;
  targetChild.style.left = `${Math.floor(Math.random() * (60 - 10) + 10)}%`;
  target.appendChild(targetChild);
  cash2 += 1 * clickerMulti;
  document.getElementById("score2").innerHTML = cash2;
  document.getElementById("score3").innerHTML = cash2;
  setTimeout(() => {
    targetChild.remove();
  }, 350);
  save();
}
function save() {
  localStorage.setItem("cash", cash);
  localStorage.setItem("cash2", cash2);
  localStorage.setItem("spins", spins);
  localStorage.setItem("spincost", spincost);
  localStorage.setItem("x", x);
  localStorage.setItem("y", y);
  localStorage.setItem("z", z);
  localStorage.setItem("time", time);
}

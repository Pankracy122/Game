import { save } from './localStorage.js';
import { countTimePassed } from './utils.js';

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
  const shop = document.getElementById('shop');
  const elements = shop.children;
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const paragraph = document.createElement('p');
    element.appendChild(paragraph);
    const priceString = document.createTextNode(costs[index]);
    paragraph.appendChild(priceString);
  }
};

document.addEventListener('DOMContentLoaded', init1);
document.getElementById('spinButton').addEventListener('click', Spin);
document.getElementById('gameClicker').addEventListener('click', ClickerEvent);
document.getElementById('multiply').addEventListener('click', multi);
document.getElementById('buy-spins').addEventListener('click', buyspins);
document.getElementById('allButtons').addEventListener('click', show);

function check() {
  if (
    localStorage.getItem('cash') === null &&
    localStorage.getItem('cash2') === null &&
    localStorage.getItem('spins') === null &&
    localStorage.getItem('spincost') === null &&
    localStorage.getItem('x') === null &&
    localStorage.getItem('y') === null &&
    localStorage.getItem('z') === null &&
    localStorage.getItem('time') === null &&
    localStorage.getItem('bonusik') === null &&
    localStorage.getItem('bonusik1') === null &&
    localStorage.getItem('cost') === null &&
    localStorage.getItem('cost1') === null
  ) {
    localStorage.setItem('cash', cash);
    localStorage.setItem('cash2', cash2);
    localStorage.setItem('spins', spins);
    localStorage.setItem('spincost', spincost);
    localStorage.setItem('x', x);
    localStorage.setItem('y', y);
    localStorage.setItem('z', z);
    localStorage.setItem('time', time);
    localStorage.setItem('bonusik', bonusik);
    localStorage.setItem('bonusik1', bonusik);
    localStorage.setItem('cost', cost);
    localStorage.setItem('cost1', cost1);
  } else {
    cash = parseInt(localStorage.getItem('cash'));
    cash2 = parseInt(localStorage.getItem('cash2'));
    score3 = parseInt(localStorage.getItem('cash2'));
    spins = parseInt(localStorage.getItem('spins'));
    spincost = parseInt(localStorage.getItem('spincost'));
    x = parseInt(localStorage.getItem('x'));
    y = parseInt(localStorage.getItem('y'));
    z = parseInt(localStorage.getItem('z'));
    time = parseInt(localStorage.getItem('time'));
    updateCountdown();
    // cost = parseInt(localStorage.getItem('cost'));
    // cost1 = parseInt(localStorage.getItem('cost1'));

    document.getElementById('score').innerText = cash;
    document.getElementById('score2').innerText = cash2;
    document.getElementById('score3').innerText = score3;
    document.getElementById('spins').innerText = spins;
    document.getElementById('buy-spins').innerText = spincost;
    document.getElementById('first-cube').innerHTML = x;
    document.getElementById('second-cube').innerHTML = y;
    document.getElementById('third-cube').innerHTML = z;
  }
  setInterval(function () {
    let today = new Date();
    localStorage.setItem('today', today);
  }, 1000);
  //Jak najmniej innerHTML'A
  bonusik = localStorage.getItem('bonusik');
  if (bonusik > 0) {
    document.getElementById('timer').innerHTML = '10 Spins + ' + bonusik + ' in';
  }

  oblicz();
}

function oblicz() {
  const localStorageDate = localStorage.getItem('today');
  if (localStorageDate) {
    const actual = new Date(localStorageDate);
    const timePassed = countTimePassed(actual);
    if (timePassed.minutes / 10 > 0) {
      spins = spins + Math.round((10 + parseInt(bonusik)) * Math.round(timePassed.minutes / 10));
    }

    document.getElementById('spins').innerText = spins;
    localStorage.setItem('spins', spins);
  }
}

function multi() {
  if (multiply < 32) multiply *= 2;
  else multiply = 1;
  document.getElementById('multiply').innerHTML = 'x' + multiply;
  let audioclick = document.getElementById('clickx-sound');
  audioclick.play();
}

function Spin() {
  const cubes = [...document.getElementById('cubes').children];
  const values = [];
  if (spins < multiply) {
    let audio3 = document.getElementById('err-sound');
    audio3.play();
    return false;
  }
  spins = spins - multiply;
  cubes.forEach((element, i) => {
    const randomValue = Math.floor(Math.random() * (9 - 1)) + 1;
    values[i] = randomValue;
    element.innerText = randomValue;
  });

  document.getElementById('spins').innerHTML = spins;
  const uniqueArr = [...new Set(values)];
  if (uniqueArr.length === 1) {
    let audio2 = document.getElementById('big-sound');
    audio2.play();
    cubes.forEach((element) => {
      element.style.background = 'lightgreen';
    });
    cash += 100 * multiply;
    spins += multiply * bonusik1;

    document.getElementById('score').innerHTML = cash;
  } else if (uniqueArr.length === 2) {
    const pairValue = values.filter((x) => x === uniqueArr[0]).length === 2 ? uniqueArr[0] : uniqueArr[1];
    cubes.forEach((element) => {
      if (element.textContent === pairValue.toString()) {
        element.style.background = 'lightgreen';
      } else {
        element.style.background = 'rgb(127, 158, 227)';
      }
    });
    cash += 10 * multiply;
    spins += multiply * bonusik1;
    document.getElementById('score').innerHTML = cash;
    let audio = document.getElementById('cash-sound');
    audio.play();
  } else if (uniqueArr.length === 3) {
    cubes.forEach((element) => {
      element.style.background = 'rgb(127, 158, 227)';
    });
  }
  save({ cash, cash2, spincost, spins, time, x, y, z });
}
setInterval(updateCountdown, 1000);

function updateCountdown() {
  const countdownEl = document.getElementById('countdown');
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownEl.innerHTML = `${minutes} : ${seconds}`;
  localStorage.setItem('time', time);
  time--;
  if (minutes <= 0 && seconds <= 0) {
    if (bonusik > 0) {
      time = startingMinutes * 59 + 9;
      spins += 10 + parseInt(bonusik);
      document.getElementById('spins').innerText = spins;
      localStorage.setItem('spins', spins);
    } else {
      time = startingMinutes * 59 + 9;
      spins += 10;
      document.getElementById('spins').innerText = spins;
      localStorage.setItem('spins', spins);
    }
  }
}

function buyspins() {
  if (cash >= spincost) {
    cash = cash - spincost;
    spins = spins + 2;
    spincost = Math.round(spincost + 1.15);

    document.getElementById('score').innerHTML = cash;
    document.getElementById('buy-spins').innerHTML = spincost;
    document.getElementById('spins').innerHTML = spins;
    let audioalert = document.getElementById('alert-sound');
    audioalert.play();
  } else {
    let audio3 = document.getElementById('err-sound');
    audio3.play();
    return false;
  }
}

function show(event) {
  const obj = {
    SHOP: document.getElementById('sklep1'),
    CLICKER: document.getElementById('clickershp'),
  };
  const target = obj[event.target.textContent];
  if (!target) return;
  const shopElements = document.getElementById('shopWrap').children;
  for (let i = 0; i < shopElements.length; i++) {
    shopElements[i].style.display = 'none';
  }

  target.style.display = 'flex';
}
function ClickerEvent() {
  const random = Math.floor(Math.random() * (40 - 10) + 10);
  const target = document.getElementById('gameClicker');
  const targetChild = document.createElement('span');
  targetChild.classList.add('floatingText');
  const childText = document.createTextNode('+1✨✨🐇🐇');
  targetChild.appendChild(childText);
  targetChild.style.top = `${random}%`;
  targetChild.style.left = `${Math.floor(Math.random() * (60 - 10) + 10)}%`;
  target.appendChild(targetChild);
  cash2 += 1 * clickerMulti;
  document.getElementById('score2').innerHTML = cash2;
  document.getElementById('score3').innerHTML = cash2;
  setTimeout(() => {
    targetChild.remove();
  }, 350);
  save({ cash, cash2, spincost, spins, time, x, y, z });
}

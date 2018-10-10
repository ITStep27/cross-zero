function matrixArray(rows, columns) {
  let arr = new Array();
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array();
    for (var j = 0; j < columns; j++) {
      arr[i][j] = null;
    }
  }
  return arr;
}

const getCell = n => {
  let row = Math.floor(n / 3);
  let col = n % 3;
  return field[row][col];
};
const setCell = (n, val) => {
  let row = Math.floor(n / 3);
  let col = n % 3;
  field[row][col] = val;
};
const isFieldFull = field => {
  // проверка на ничью
  let res = true;
  for (let i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (field[i][j] === null) {
        res = false;
        break;
      }
    }
  }

  return res;
};
const compare = field => {
  // сравнение массивов

  for (let x = 0; x < 8; x++) {
    if (arrayCompare(getChain(x), [1, 1, 1])) return 1;
    if (arrayCompare(getChain(x), [0, 0, 0])) return 0;
  }

  return null;
};

function getChain(type) {
  // возвращает строку : 0-2 горизонталь, 3-5 вертикаль, 6-7 диагональ.
  let arr = [];
  if (type < 3) return field[type];

  if (type > 2 && type < 6) {
    for (let row = 0; row < 3; row++) arr.push(field[row][type - 3]);
    return arr;
  }

  if (type == 6) {
    var i = 0;
    for (var j = 0; j < 3; j++) {
      arr.push(field[j][i]);
      i++;
    }
    return arr;
  }

  if (type == 7) {
    var i = 0;
    for (var j = 2; j >= 0; j--) {
      arr.push(field[j][i]);
      i++;
    }
    return arr;
  }
}

function arrayCompare(a1, a2) {
  for (let n = 0; n < 3; n++) if (a1[n] != a2[n]) return false;
  return true;
}

function getMove() {
  // возвращает ход компьютера
  let j;
  chance = Math.round(Math.random() * 2 * 10) / 10; // число от 0.0 до 1.99
  if (chance < level) {
    // ставим третий в ряду нолик (побеждаем)
    // горизонталь
    for (j = 0; j < 3; j++) {
      if (arrayCompare(getChain(j), [0, 0, null])) return { j: j, i: 2 };
      if (arrayCompare(getChain(j), [null, 0, 0])) return { j: j, i: 0 };
      if (arrayCompare(getChain(j), [0, null, 0])) return { j: j, i: 1 };
    }
    // вертикаль
    if (arrayCompare(getChain(3), [0, 0, null])) return { j: 2, i: 0 };
    if (arrayCompare(getChain(3), [null, 0, 0])) return { j: 0, i: 0 };
    if (arrayCompare(getChain(3), [0, null, 0])) return { j: 1, i: 0 };
    if (arrayCompare(getChain(4), [0, 0, null])) return { j: 2, i: 1 };
    if (arrayCompare(getChain(4), [null, 0, 0])) return { j: 0, i: 1 };
    if (arrayCompare(getChain(4), [0, null, 0])) return { j: 1, i: 1 };
    if (arrayCompare(getChain(5), [0, 0, null])) return { j: 2, i: 2 };
    if (arrayCompare(getChain(5), [null, 0, 0])) return { j: 0, i: 2 };
    if (arrayCompare(getChain(5), [0, null, 0])) return { j: 1, i: 2 };
    // диагональ
    if (arrayCompare(getChain(6), [null, 0, 0])) return { j: 0, i: 0 };
    if (arrayCompare(getChain(6), [0, 0, null])) return { j: 2, i: 2 };
    if (arrayCompare(getChain(6), [0, null, 0])) return { j: 1, i: 1 };
    if (arrayCompare(getChain(7), [null, 0, 0])) return { j: 2, i: 0 };
    if (arrayCompare(getChain(7), [0, 0, null])) return { j: 0, i: 2 };
    if (arrayCompare(getChain(7), [0, null, 0])) return { j: 1, i: 1 };
  }
  chance = Math.round(Math.random() * 2 * 10) / 10; // число от 0.0 до 1.99
  if (chance < level) {
    // блокируем третий в ряду крестик
    // вертикаль
    for (j = 0; j < 3; j++) {
      if (arrayCompare(getChain(j), [1, 1, null])) return { j: j, i: 2 };
      if (arrayCompare(getChain(j), [null, 1, 1])) return { j: j, i: 0 };
      if (arrayCompare(getChain(j), [1, null, 1])) return { j: j, i: 1 };
    }
    // вертикаль
    if (arrayCompare(getChain(3), [1, 1, null])) return { j: 2, i: 0 };
    if (arrayCompare(getChain(3), [null, 1, 1])) return { j: 0, i: 0 };
    if (arrayCompare(getChain(3), [1, null, 1])) return { j: 1, i: 0 };
    if (arrayCompare(getChain(4), [1, 1, null])) return { j: 2, i: 1 };
    if (arrayCompare(getChain(4), [null, 1, 1])) return { j: 0, i: 1 };
    if (arrayCompare(getChain(4), [1, null, 1])) return { j: 1, i: 1 };
    if (arrayCompare(getChain(5), [1, 1, null])) return { j: 2, i: 2 };
    if (arrayCompare(getChain(5), [null, 1, 1])) return { j: 0, i: 2 };
    if (arrayCompare(getChain(5), [1, null, 1])) return { j: 1, i: 2 };
    // диагональ
    if (arrayCompare(getChain(6), [null, 1, 1])) return { j: 0, i: 0 };
    if (arrayCompare(getChain(6), [1, 1, null])) return { j: 2, i: 2 };
    if (arrayCompare(getChain(6), [1, null, 1])) return { j: 1, i: 1 };
    if (arrayCompare(getChain(7), [null, 1, 1])) return { j: 2, i: 0 };
    if (arrayCompare(getChain(7), [1, 1, null])) return { j: 0, i: 2 };
    if (arrayCompare(getChain(7), [1, null, 1])) return { j: 1, i: 1 };
  }
  chance = Math.round(Math.random() * 2 * 10) / 10; // число от 0.0 до 1.99
  if (chance < level) {
    if (field[1][1] === null) return { j: 1, i: 1 }; // занимаем центр поля
  }
  if (field[1][1] == 0) {
    // если центр наш -
    chance = Math.round(Math.random() * 3 * 10) / 10; // число от 0.0 до 2.99
    if (chance < level) {
      if (field[0][1] === null) return { j: 0, i: 1 }; // занимаем средние крайние ячейки поля
      if (field[2][1] === null) return { j: 2, i: 1 };
      if (field[1][0] === null) return { j: 1, i: 0 };
      if (field[1][2] === null) return { j: 1, i: 2 };
    }
  } else {
    chance = Math.round(Math.random() * 3 * 10) / 10; // число от 0.0 до 2.99
    if (chance < level) {
      if (field[0][0] === null) return { j: 0, i: 0 }; // занимаем углы поля
      if (field[0][2] === null) return { j: 0, i: 2 };
      if (field[2][0] === null) return { j: 2, i: 0 };
      if (field[2][2] === null) return { j: 2, i: 2 };
    }
  }

  // рандомный ход
  let n = Math.floor(Math.random() * 9);
  while (getCell(n) !== null) n = Math.floor(Math.random() * 9);
  return { j: Math.floor(n / 3), i: n % 3 };
}

const element = (j, i) => cell[j * 3 + i];

const clickHandler = e => {
  if (whoIsMove == 0) return;
  newGameBtn(0);
  document.querySelector('#leveltext').style.visibility = 'hidden';
  let n = e.target.id.substr(4, 1);
  if (getCell(n) === null && whoIsMove == 1) {
    e.target.style.backgroundImage = "url(x.png)";
    setCell(n, 1);
    whoIsMove = 2;
    text.innerHTML = "Думаю......";
    // проверка победы игрока
    if (compare(field) == 1) {
      text.innerHTML = "Победа крестиков!";
      whoIsMove = 0;
      document.querySelector('#leveltext').style.visibility = 'visible';
      newGameBtn(1);
      document.querySelector("#win").innerHTML += `<span class="win"></span>`;
    }
  }

  if (isFieldFull(field) && whoIsMove != 0) {
    // проверка на ничью
    whoIsMove = 0;
    levels.style.opacity = 1;
    text.innerHTML = "Ничья !";
    newGameBtn(1);
    document.querySelector('#leveltext').style.visibility = 'visible';
    document.querySelector(
      "#win"
    ).innerHTML += `<span class="standoff"></span>`;
  }

  if (whoIsMove == 2) {
    // ходит комп
    let time = setTimeout(function() {
      whoIsMove = 1;
      let move = getMove();
      field[move.j][move.i] = 0;
      element(move.j, move.i).style.backgroundImage = "url(o.png)";
      // проверка победы компьютера
      if (compare(field) == 0) {
        text.innerHTML = "Победа ноликов!";
        whoIsMove = 0;
        newGameBtn(1);
        document.querySelector('#leveltext').style.visibility = 'visible';
        document.querySelector(
          "#win"
        ).innerHTML += `<span class="loss"></span>`;
      }
      if (compare(field) === null) text.innerHTML = "Ваш ход!";
    }, 500);
  }
  let m;
  if (whoIsMove == 0) {
    for (m = 0; m < 4; m++)
      document.querySelector(`#level${m}`).style.cursor = "pointer";
  } else {
    for (m = 0; m < 4; m++)
      document.querySelector(`#level${m}`).style.cursor = "default";
  }
};

function btnHandler(event) {
  if (whoIsMove != 0) return;
  if (btn.style.cursor != 'pointer') return;
  newGameBtn(0);
  let j, i, m;
  for (j = 0; j < 3; j++)
    for (i = 0; i < 3; i++) {
      field[j][i] = null;
      element(j, i).style.backgroundImage = "";
      text.innerHTML = "Ваш ход!";
      whoIsMove = 1;
      for (m = 0; m < 4; m++)
        document.querySelector(`#level${m}`).style.cursor = "pointer";
    }
}

function changeLevel() {
  for (let n = 0; n < 4; n++) {
    document.querySelector(`#level${n}`).style.opacity = n == level ? 1 : 0.5;
  }
}

function newGameBtn(active) {
  if (active) {
    btn.style.cursor = "pointer";
    btn.style.opacity = "1";
  } else {
    btn.style.cursor = "default";
    btn.style.opacity = ".5";
  }
}
function levelsHandler(event) {
  if (event.currentTarget.style.cursor != "pointer") return;
  level = event.currentTarget.id.substr(5, 1);
  win.innerHTML = '';
  changeLevel();
}

const screen = document.querySelector(".screen");
const text = document.querySelector("h1");

let whoIsMove = 1; // 1 - player; 2 - comp;

let field = matrixArray(3, 3);

let level = 0; // уровень логики

let levelList = {
  text: ["Новичек", "Любитель", "Продвинутый", "Непобедимый"],
  path: ["beginner.jpg", "amateur.jpg", "advanced.jpg", "expert.jpg"]
};

let levels = document.querySelector("#levels");

let n;
let levelBtn = [];
for (n = 0; n < 4; n++) {
  levels.innerHTML += `<div id="level${n}"><img src="${
    levelList.path[n]
  }"><h2>${levelList.text[n]}</h2></div>`;
}
for (n = 0; n < 4; n++) {
  levelBtn[n] = document.querySelector(`#level${n}`);
  levelBtn[n].addEventListener("click", levelsHandler);
  levelBtn[n].style.cursor = "pointer";
}

changeLevel();

for (n = 0; n < 9; n++) {
  screen.innerHTML += `<div class="cell"></div>`;
}

let cell = document.querySelectorAll(".cell");

for (let n = 0; n < 9; n++) {
  cell[n].id = `cell${n}`;
}

newGameBtn(0);

screen.addEventListener("click", clickHandler);
btn.addEventListener("click", btnHandler);

// глобальные пер-е

const screen = document.querySelector(".screen");

const text = document.querySelector("h1");

let whoIsMove = 1; // 1 - player; 2 - comp;

let field = matrixArray(3, 3);

let level = 0; // уровень логики

let cell = [];

let levelList = {
  text: ["Новичек", "Любитель", "Продвинутый", "Эксперт"],
  path: ["beginner.png", "amateur.png", "advanced.png", "expert.png"]
};

let levels = document.querySelector("#levels");

let levelBtn = [];

let gameInProgress = false;

let thinking = 0;
// ----------------------------------------------------------------------------

function matrixArray(rows, columns) { // создает матрицу
  let arr = new Array();
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array();
    for (var j = 0; j < columns; j++) {
      arr[i][j] = null;
    }
  }
  return arr;
}

function getCell(n) { // возвр. значение матрицы по порядк. номеру
  let row = Math.floor(n / 3);
  let col = n % 3;
  return field[row][col];
};

function setCell (n, val) { // присв. значение матрицы по порядк. номеру
  // если поле занято, не изменяет его, а возврашает false; в противном случае - true.
  let row = Math.floor(n / 3);
  let col = n % 3;
  if (field[row][col] === null) {field[row][col] = val; return true;} else return false;
};

function isFieldFull (field) { // проверка на ничью
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

function compare (field) {  // сравнение массивов

  for (let x = 0; x < 8; x++) {
    if (arrayCompare(getChain(x), [1, 1, 1])) return 1;
    if (arrayCompare(getChain(x), [0, 0, 0])) return 0;
  }
  return null;
};

function getChain(type) { // возвращает строку : 0-2 горизонталь, 3-5 вертикаль, 6-7 диагональ.
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
//------------------------------------------
function arrayCompare(a1, a2) {
  for (let n = 0; n < 3; n++) if (a1[n] != a2[n]) return false;
  return true;
}

function getMove() { // возвращает ход компьютера
  let j;
  chance = Math.random() * 2; // число от 0.0 до 1.99
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
  chance = Math.random() * 2; // число от 0.0 до 1.99
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
  
  chance = Math.random() * 3; // число от 0.0 до 2.99
  if (chance < level) {
    if (field[1][1] === null) return { j: 1, i: 1 }; // занимаем центр поля
  }

  chance = Math.random() * 3; // число от 0.0 до 2.9
  // занимаем свободную горизонталь или вертикаль, если занят центр
    if (chance < level) {
      let rnd = Math.floor(Math.random() * 2);
      if (arrayCompare(getChain(1),[null,0,null])) return {j: 1, i: rnd * 2};
      if (arrayCompare(getChain(4),[null,0,null])) return {j: rnd * 2, i: 1};
    }

    chance = Math.random() * 3; // число от 0.0 до 2.99
    if (chance < level) {
      if (field[2][0] === null) return { j: 2, i: 0 };
      if (field[0][0] === null) return { j: 0, i: 0 }; // занимаем углы поля, если наш центр
      if (field[0][2] === null) return { j: 0, i: 2 };
      if (field[2][2] === null) return { j: 2, i: 2 };
    }


    chance = Math.random() * 3; // число от 0.0 до 2.99
    if (chance < level) { // занимаем соседнюю с нашей диагональю клетку
      if (field[0][0] == 1) {if (field[0][1] === null) return {j: 0, i: 1}} else if (field[1][0] === null) return {j:1, i:0};
      if (field[0][2] == 1) {if (field[0][1] === null) return {j: 0, i: 1}} else if (field[1][2] === null) return {j:1, i:2};
      if (field[2][0] == 1) {if (field[2][1] === null) return {j: 2, i: 1}} else if (field[1][0] === null) return {j:1, i:0};
      if (field[2][2] == 1) {if (field[2][1] === null) return {j: 2, i: 1}} else if (field[1][2] === null) return {j:1, i:2};
    }

  // рандомный ход
  let n = Math.floor(Math.random() * 9);
  while (getCell(n) !== null) n = Math.floor(Math.random() * 9);
  return { j: Math.floor(n / 3), i: n % 3 };
}
// -------------------------------------------------------------------------

function element(j, i) { // возвр. знач. эл-та матрицы по порядковому номеру
  return cell[j * 3 + i];
}
//=================================================================================
function clickHandler (e) { // обработчик "ход игрока" (клик по игровому полю)
  if (whoIsMove != 1 || e.target.classList[0] != "cell") return;
  newGameBtn(0);
  gameInProgress = true;
  document.querySelector('#leveltext').style.visibility = 'hidden';
  let n = e.target.id.substr(4, 1);
  if (getCell(n) === null && whoIsMove == 1) {
    e.target.style.backgroundImage = "url(x.png)";
    setCell(n, 1);
    whoIsMove = 2;
    text.innerHTML = "Думаю......";
    thinking = level * 20 + 40;
    // проверка победы игрока
    if (compare(field) == 1) {
      text.innerHTML = "Победа крестиков!";
      whoIsMove = 0;
      newGameBtn(1);
      gameInProgress = false;
      document.querySelector('#leveltext').style.visibility = 'visible';
      document.querySelector("#win").innerHTML += `<span class="win"></span>`;
    }
  }

  if (isFieldFull(field) && whoIsMove != 0) {
    // проверка на ничью
    whoIsMove = 0;
    levels.style.opacity = 1;
    text.innerHTML = "Ничья !";
    newGameBtn(1);
    gameInProgress = false;
    document.querySelector('#leveltext').style.visibility = 'visible';
    document.querySelector(
      "#win"
    ).innerHTML += `<span class="standoff"></span>`;
  }

  if (whoIsMove == 2) thinking = level * 30 + 20; // ходит комп

  choiceLevel();
};


function btnHandler(event) {
  if (gameInProgress) return;
  newGame();
}

function changeLevel() {
  if (gameInProgress) return;
  for (let n = 0; n < 4; n++) {
    document.querySelector(`#level${n}`).style.opacity = n == level ? 1 : 0.5;
    document.querySelector(`#level${n}`).style.cursor = n == level ? 'default' : 'pointer';
    newGame();
  }
}

function choiceLevel() {
  let crs = gameInProgress ? 'default' : 'pointer';
  for (let n = 0; n < 4; n++) {
    document.querySelector(`#level${n}`).style.cursor = n == level ? 'default' : crs;
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
  if (gameInProgress) return;
  if (level == event.currentTarget.id.substr(5, 1)) return;
  level = event.currentTarget.id.substr(5, 1);
  win.innerHTML = '';
  changeLevel();
}


function newGame(){
  newGameBtn(0);
  gameInProgress = false;
  let j, i, m;
  for (j = 0; j < 3; j++)
    for (i = 0; i < 3; i++) {
      field[j][i] = null;
      element(j, i).style.backgroundImage = "";
      text.innerHTML = "Ваш ход!";
      whoIsMove = 1;
    }
}

// старт игры

for (var n = 0; n < 4; n++) { // кнопки уровня сложности --------------------------
  levels.innerHTML += `<div id="level${n}"><img src="${
    levelList.path[n]
  }"><h2>${levelList.text[n]}</h2></div>`;
}

for (var n = 0; n < 4; n++) {
  levelBtn[n] = document.querySelector(`#level${n}`);
  levelBtn[n].addEventListener("click", levelsHandler);
}
//----------------------------------------------------------------------------------

for (var n = 0; n < 9; n++) {
  screen.innerHTML += `<div class="cell"></div>`;
}

cell = document.querySelectorAll(".cell");

for (var n = 0; n < 9; n++) {
  cell[n].id = `cell${n}`;
}
newGame();
changeLevel();

screen.addEventListener("click", clickHandler);
btn.addEventListener("click", btnHandler);

let interval = setInterval(function (){
  if (thinking > 0) thinking--;
  if (thinking == 0 && whoIsMove == 2)
    {
      // ходит комп
        whoIsMove = 1;
        let move = getMove();
        field[move.j][move.i] = 0;
        element(move.j, move.i).style.backgroundImage = "url(o.png)";
        // проверка победы компьютера
        if (compare(field) == 0) {
          text.innerHTML = "Победа ноликов!";
          whoIsMove = 0;
          newGameBtn(1);
          gameInProgress = false;
          document.querySelector('#leveltext').style.visibility = 'visible';
          document.querySelector(
            "#win"
          ).innerHTML += `<span class="loss"></span>`;
        }
        if (compare(field) === null) text.innerHTML = "Ваш ход!";
        choiceLevel();
      };

}, 10);

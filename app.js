/**
 * VAR DECLARATIONS
 */

// Initializing the black checkers' positions
var blackCheckers = {
  injail: [],
  intialpositions: [
    // row A => cols (top part of the board)
    [0, 0, 0, 0, 0, 0], // col A0
    [0, 0, 0, 0, 0, 0], // col A1
    [0, 0, 0, 0, 0, 0], // col A2
    [0, 0, 0, 0, 0, 0], // col A3
    [1, 1, 1, 0, 0, 0], // col A4
    [0, 0, 0, 0, 0, 0], // col A5
    [1, 1, 1, 1, 1, 0], // col A6
    [0, 0, 0, 0, 0, 0], // col A7
    [0, 0, 0, 0, 0, 0], // col A8
    [0, 0, 0, 0, 0, 0], // col A9
    [0, 0, 0, 0, 0, 0], // col A10
    [0, 0, 0, 0, 0, 0], // col A11
    // row B => cols (bottom part of the board)
    [1, 1, 1, 1, 1, 0], // col B0
    [0, 0, 0, 0, 0, 0], // col B1
    [0, 0, 0, 0, 0, 0], // col B2
    [0, 0, 0, 0, 0, 0], // col B3
    [0, 0, 0, 0, 0, 0], // col B4
    [0, 0, 0, 0, 0, 0], // col B5
    [0, 0, 0, 0, 0, 0], // col B6
    [0, 0, 0, 0, 0, 0], // col B7
    [0, 0, 0, 0, 0, 0], // col B8
    [0, 0, 0, 0, 0, 0], // col B9
    [0, 0, 0, 0, 0, 0], // col B10
    [1, 1, 0, 0, 0, 0] // col B11
  ]
};
// Initializing the white checkers' positions
var whiteCheckers = {
  injail: [],
  intialpositions: [
    // row A => cols (top part of the board)
    [1, 1, 1, 1, 1, 0], // col A0
    [0, 0, 0, 0, 0, 0], // col A1
    [0, 0, 0, 0, 0, 0], // col A2
    [0, 0, 0, 0, 0, 0], // col A3
    [0, 0, 0, 0, 0, 0], // col A4
    [0, 0, 0, 0, 0, 0], // col A5
    [0, 0, 0, 0, 0, 0], // col A6
    [0, 0, 0, 0, 0, 0], // col A7
    [0, 0, 0, 0, 0, 0], // col A8
    [0, 0, 0, 0, 0, 0], // col A9
    [0, 0, 0, 0, 0, 0], // col A10
    [1, 1, 0, 0, 0, 0], // col A11
    // row B => cols (bottom part of the board)
    [0, 0, 0, 0, 0, 0], // col B0
    [0, 0, 0, 0, 0, 0], // col B1
    [0, 0, 0, 0, 0, 0], // col B2
    [0, 0, 0, 0, 0, 0], // col B3
    [1, 1, 1, 0, 0, 0], // col B4
    [0, 0, 0, 0, 0, 0], // col B5
    [1, 1, 1, 1, 1, 0], // col B6
    [0, 0, 0, 0, 0, 0], // col B7
    [0, 0, 0, 0, 0, 0], // col B8
    [0, 0, 0, 0, 0, 0], // col B9
    [0, 0, 0, 0, 0, 0], // col B10
    [0, 0, 0, 0, 0, 0] // col B11
  ]
};

function drawBoardGame(colsCount, cellsByRowCount) {
  // the board size depends on the parameters given. In this case, there are 12 columns and 6 rows per big row (big upperRow and lowerRow)

  const board = document.getElementById("board"); // inside the board id div
  const upperRow = document.createElement("div"); // we create a big upperRow div
  const lowerRow = document.createElement("div"); // and a big lowerRow div
  upperRow.id = "upper_row"; // we assign the upperRow an ID
  upperRow.className = "board-matrix"; // we assign the upperRow a class
  lowerRow.id = "lower_row"; // we assign the lowerRow an ID
  lowerRow.className = "board-matrix"; // we assign the lowerRow a class

  // Add the columns
  function addCols(target) {
    const rowId = target.id === "upper_row" ? "A" : "B"; // if we are applying the addCols function to the upperRow, we'll get rowId=A and rowId=B for the lowerRow

    for (let i = 0; i < colsCount; i++) {
      const col = document.createElement("div"); // we create a div for each column (12)
      col.style.gridTemplateRows = `repeat(${cellsByRowCount}, 60px)`; // applying some style (the same style actually for each row) to each column
      col.className = "col"; // give it a class
      col.setAttribute("data-col-index", rowId + i); // each column is set an attribute data-col-index, which is a combination of the big row (A or B) and the column

      for (let j = 0; j <= cellsByRowCount; j++) {
        const cell = document.createElement("div"); // we create a div for each cell (6 per column per big row)
        cell.className = "cell"; // git it a class
        col.appendChild(cell); // create as many cells as rows given in the parameter in each column
      }

      target.appendChild(col); // create as many columns as given in the parameter in each big row
    }
  }

  addCols(upperRow); // we aplly the addCols function to the upperRow to get 12 columns and 6 rows for it
  addCols(lowerRow); // same but for the lowerRow

  board.appendChild(upperRow); // creates a div inside the board for the upperRow
  board.appendChild(lowerRow); // creates a div inside the board for the lowerRow

  const cols = board.querySelectorAll(".col");
  console.log("all the board columns", cols); // print all the columns
  cols.forEach(col => {
    col.onclick = moveChecker; // for each column, if we click on the columnn, we call the moveChecker function
  });
}

// ???????????
function drawAChecker(colIndx, cellIndx, color, boardRow) {
  const currentCol = document.querySelectorAll(".col")[colIndx];
  const currentCell = currentCol.querySelectorAll(".cell")[cellIndx];
  const checker = document.createElement("div");
  checker.className = "checker " + color;
  checker.setAttribute("data-col-index", colIndx);
  checker.setAttribute("data-col-position", cellIndx); // check this value, it's wrong now
  checker.onclick = selectChecker;
  currentCell.appendChild(checker);
}

function selectChecker(evt) {
  // are we creating the .is-selected class here ? how can we toggle with it if it doesn't exist ?
  const previous = document.querySelector(".checker.is-selected");
  //const cols = document.querySelectorAll(".cols");
  if (previous) previous.classList.remove("is-selected");
  this.classList.toggle("is-selected");
}

function listenColsClick() {}

function eraseAChecker() {
  // check if position is taken
}

function parseCheckersPosition(checkers, color) {
  checkers.forEach((col, colIndx) => {
    col.forEach((cellVal, cellIndx) => {
      // console.log(cellIndx, cellVal);
      if (cellVal === 1) {
        drawAChecker(colIndx, cellIndx, color);
      } else {
        eraseAChecker();
      }
    });
  });
}

function moveChecker(evt) {
  var targetColumn = evt.srcElement || evt.target;
  var activeChecker = document.querySelector(".checker.is-selected");

  while (!targetColumn.classList.contains("col")) {
    targetColumn = targetColumn.parentElement;
    //   console.log(target);
  }
  console.log(targetColumn, activeChecker);
}

drawBoardGame(12, 6); // setting the parameters for the board

parseCheckersPosition(blackCheckers.intialpositions, "black");
parseCheckersPosition(whiteCheckers.intialpositions, "white");

/**
 * EVENT LISTENERS
 */

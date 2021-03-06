/**
 * VAR DECLARATIONS
 */

// Initializing the black checkers' positions
var blackCheckers = {
  injail: [],
  initialPositions: [
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
  initialPositions: [
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
      col.onclick = listenColsClick;
      for (let j = 0; j <= cellsByRowCount; j++) {
        // const cell = document.createElement("div"); // we create a div for each cell (6 per column per big row)
        // cell.className = "cell"; // git it a class
        // col.appendChild(cell); // create as many cells as rows given in the parameter in each column
      }

      target.appendChild(col); // create as many columns as given in the parameter in each big row
    }
  }

  addCols(upperRow); // we aplly the addCols function to the upperRow to get 12 columns and 6 rows for it
  addCols(lowerRow); // same but for the lowerRow

  board.appendChild(upperRow); // creates a div inside the board for the upperRow
  board.appendChild(lowerRow); // creates a div inside the board for the lowerRow
}

// Draw the checkers
function drawAChecker(colIndx, cellIndx, color, boardRow) {
  // each checker has a column index, a cell index & a color
  const currentCol = document.querySelectorAll(".col")[colIndx];
  // const currentCell = currentCol.querySelectorAll(".cell")[cellIndx];
  const checker = document.createElement("div");
  checker.className = "checker " + color;
  checker.setAttribute("data-col-index", colIndx);
  checker.setAttribute("data-col-position", cellIndx); // check this value, it's wrong now

  checker.onclick = selectChecker;
  currentCol.appendChild(checker);
}

function selectChecker(evt) {
  // are we creating the .is-selected class here ? how can we toggle with it if it doesn't exist ?
  const previous = document.querySelector(".checker.is-selected");
  //const cols = document.querySelectorAll(".cols");
  if (previous) previous.classList.remove("is-selected");
  this.classList.toggle("is-selected");
}

function selectCheckerToMove() {
  const activeChecker = document.querySelector(".checker.is-selected");
  const currentColumn = activeChecker.parentElement.parentElement; // we go back to the active checker's parent element, which is the cell in which it is, and then to this cell's parent element, which is the column
  const lastCheckers = currentColumn.querySelectorAll(".checker");
  const index =
    currentColumn.parentElement.id === "upper_row"
      ? lastCheckers.length - 1
      : lastCheckers.length - 1;
  // console.log(
  //   currentColumn,
  //   activeChecker,
  //   lastCheckers,
  //   index,
  //   lastCheckers[index]
  // );
  // console.log(lastCheckers[index].childNodes[0].dataset.colIndex);
  return lastCheckers[index];
}

function checkMoveIsValid() {
  return true; // !!!!!!!!!!!!!!!!!!!! to change when the move rules are defined
}

var isChoosingCol = false;
var colSrc = null;
var colDest = null;

function listenColsClick(evt) {
  const currentChecker = document.querySelector(".checker.is-selected");
  if (!currentChecker) {
    isChoosingCol = false;
    return;
  }
  if (!isChoosingCol) {
    colSrc = this;
  } else {
    colDest = this;
  }
  console.log(colSrc, colDest);
  isChoosingCol = true;

  if (checkMoveIsValid()) {
    let checkerToMove = selectCheckerToMove();
    if (colSrc && colDest && colSrc !== colDest)
      moveChecker(colDest, checkerToMove);
  }
}

function moveChecker(colDest, checker) {
  // console.log("@movechecker", colDest, checker);
  // const indx = colDest.querySelector(".cell:empty");
  // const target = colDest.querySelector(".cell:nth-child(1)");
  //var html = checker.outerHTML; // deep clone of the toMove checker

  //var template = document.createElement("template");
  //html = html.trim(); // Never return a text node of whitespace as the result
  //template.innerHTML = html;
  //const copy = template.content.firstChild;
  // console.log(checker.remove());
  //checker.parentElement.removeChild(checker);
  //  attention il faut update les attributes du checker
  //console.log("checker", checker);
  // console.log("duped", dupNode);
  //console.log("colDest", colDest);
  //colDest.appendChild(copy);
  // dupNode.classList.remove("is-selected");

  const checkerToMove = selectCheckerToMove();
  console.log("checktomove:" + checkerToMove);
}

function eraseAChecker() {
  // Susan :
  //if (futureposition contains same color checker){erase last position checker and draw new checker in futureposition just after the last existing checker if any}
  // if (document.querySelector(".checker.is-selected")
  // .parentNode.removeChild();
}

function parseCheckersPosition(initialPositions, color) {
  initialPositions.forEach((col, colIndx) => {
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

// Susan :
// eraseAChecker();
// console.log(currentColumn, activeChecker);

drawBoardGame(12, 6); // setting the parameters for the board

parseCheckersPosition(blackCheckers.initialPositions, "black");
parseCheckersPosition(whiteCheckers.initialPositions, "white");

// ---------------
// function nextMove(event) {
// const valeurCol = event.target.
// }

/**
 * EVENT LISTENERS
 */

// ************* TO DO LIST *************

// ****** DIRECTIONS :
// black checkers can only go from left to right in upperRow and from right to left in lowerRow
// white checkers can only go from right to left in upperRow and from left to right in lowerRow

// ****** MOVE RULES :
// when dice roll, only the checkers of the current player can move
// and only if there aren't the other player's checkers on the next move column
// if double (same number on the dice), the player can do 4 moves of the number (not 2)
// when no more space in the 6 rows column, to pile up the checkers, the first cell of the column shall display 2, 3, 4 etc. (as many checkers as there are piling up)
// checker cannot go anywhere else than checker's current position + dice number
// if home zone of the opponent has at least 2 checkers on each column,and the player has at least a checker in jail, he cannot play as long as 1 column doesn't have only 1 checker

// ****** EATING/JAIL RULES :
// if there's only one checker of the opposite color in the possible next move column, it can be "eaten", which means it's replaced
// when eaten, a checker goes in the jail zone and for it's next dice roll, it will have to start by placing the checker that's in the jail on the board

// ****** OUT RULES :
// checkers can go out only if all are in the home zone
// when going out, they end up in the out zone
// the first one who has all its checkers in the out zone wins

// create start button with random color pick to start
// create dice with random numbers from 1 to 6
// create roll the dice button
// create pop up window for the winner
// create info (?) button with pop up window with the rules
// create jail zone
// create out zone
// create zone saying who's turn it is

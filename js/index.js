const resetColor = "#ffffff";
const gridWidthInput = $("#grid-width");
const gridHeightInput = $("#grid-height");
const createButton = $("#create-button");
const resetButton = $("#reset-button");
const colorPicker = $("#color-picker");
const table = $("#canvas");
const tableBody = $("#canvas > tbody");

// Currently picked color
let color = colorPicker.val();
// Keep width and height for the reset button
let gridWidth = gridWidthInput.val();
let gridHeight = gridHeightInput.val();
// If the mouse is currently pressed
let mouseDown = false;

// Initialize default grid
makeGrid(gridWidth, gridHeight);

// Create grid when create button is clicked
createButton.click(function(e) {
  e.preventDefault();
  gridWidth = gridWidthInput.val();
  gridHeight = gridHeightInput.val();
  makeGrid(gridWidth, gridHeight);
});

// Reset width (with previous dimensions)
resetButton.click(function(e) {
  e.preventDefault();
  makeGrid(gridWidth, gridHeight);
});

function makeGrid(width, height) {
  // Reset body of table
  tableBody.empty();
  // Create rows and append them to table
  for (let i = 0; i < height; i++) {
    let row = $("<tr></tr>");
    for (let j = 0; j < width; j++) {
      $("<td></td>").appendTo(row);
    }
    tableBody.append(row);
  }
}

// Set color as the current color selection
colorPicker.change(function() {
  color = colorPicker.val();
});

// Set picked color on cell click
table.on("click", "td", function(e) {
  e.preventDefault();
  $(this).css("background-color", color);
});

// Reset cell color on double click
table.on("dblclick", "td", function(e) {
  e.preventDefault();
  $(this).css("background-color", resetColor);
});

table.mousedown(function(e) {
  e.preventDefault();
  mouseDown = true;
});

// Mouse-up event should work outside the table too
$(window).mouseup(function() {
  mouseDown = false;
});

table.on("mousemove", "td", function(e) {
  e.preventDefault();
  if (mouseDown) {
    $(this).css("background-color", color);
  }
});

// Do not allow input values out of limits
gridWidthInput.on("change textInput input", function() {
  if (this.value > 50) {
    this.value = 50;
  } else if (this.value < 1) {
    this.value = 1;
  }
});

// Do not allow input values out of limits
gridHeightInput.on("change textInput input", function() {
  if (this.value > 50) {
    this.value = 50;
  } else if (this.value < 1) {
    this.value = 1;
  }
});
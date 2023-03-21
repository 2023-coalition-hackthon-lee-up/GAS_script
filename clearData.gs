function clearData(sheet) {
  var startRow = 2;
  var startColumn = 1;
  var numRows = sheet.getLastRow() - startRow + 1;
  var numColumns = sheet.getLastColumn() - startColumn + 1;

  if (numRows > 0 && numColumns > 0) {
    var dataRange = sheet.getRange(startRow, startColumn, numRows, numColumns - 1);
    dataRange.clearContent();
  }
}

function getTodayPL() {
  clearPlayList();
  var sheet = SpreadsheetApp.getActive().getSheetByName('오늘의 광고 편성표');
  clearData(sheet);
  var targetSheet = SpreadsheetApp.getActive().getSheetByName('승인 완료 예약');
  var data = targetSheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    console.log(row);
    var startDate = new Date(row[1]);
    var endDate = new Date(row[2]);
    var now = new Date();
    var lastRow = findFirstEmptyRow(sheet);
    if (now >= startDate && now <= endDate) {
      for (var j = 0; j < 8; j++)
        sheet.getRange(lastRow, j + 1).setValue(data[i][j]);
    }
  }
  addVideoToPlaylist();
}

function findFirstEmptyRow(sheet) {
  var data = sheet.getDataRange().getValues();

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var isRowEmpty = true;

    for (var j = 0; j < row.length; j++) {
      if (row[j] != '') {
        isRowEmpty = false;
        break;
      }
    }

    if (isRowEmpty) {
      return i + 1; // 인덱스는 0부터 시작하므로 1을 더해줍니다.
    }
  }
  return data.length + 1; // 모든 행이 차있는 경우, 마지막 행의 다음 인덱스를 반환합니다.
}

function saveApprovedAds(values) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('승인 완료 예약');
  var row = findFirstEmptyRow(sheet);

  console.log('save Approved Ads \n' + values);
  for (var j = 0; j < 8; j++) sheet.getRange(row, j + 1).setValue(values[j]);
}

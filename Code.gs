// function onEdit(e) {
//   var sheetName = "예약 DB 값 동기화 시트"; // 대상 시트의 이름을 지정하세요.
//   var targetColumn = 3; // 대상 열의 인덱스를 지정하세요.
//   var targetValue = "지불 전"; // 대상 값의 이름을 지정하세요.

//   console.log(e);
//   var sheet = e.source.getActiveSheet();
//   if (sheet.getName() !== sheetName || e.range.columnStart !== targetColumn || e.value !== targetValue) {
//     return; // 대상 시트, 대상 열, 대상 값이 아닐 경우 코드 실행을 중단합니다.
//   }

//   // 이곳에 대상 값이 변경되었을 때 실행할 코드를 작성하세요.
//   // 예를 들어, 메일을 보내거나 다른 시트에 데이터를 추가할 수 있습니다.
//   Logger.log("값이 변경되었습니다.");
// }

// function onRowInsert(e) {
//   var range = e.source.getDataRange();
//   console.log(range);
//   var values = range.getValues();
//   console.log('length: ', values.length);
//   for (var i = 1; i < values.length; i++) {
//     var sheet = SpreadsheetApp.getActive().getSheetByName('예약');
//     console.log(i, '[ 5열,6열 = ] <', values[i][5], '> <', values[i][6], '>');
//     if (values[i][6] && values[i][7] == "") {
//       console.log("지불처리되었지만 승인이 되지 않음.");
//       var intraId = values[i][4];
//       //if (isPayed(intraId)) // 금일 일정포인트 이상 기부했다면
//       if (true)
//       {
//         sheet.getRange(i + 1, 8).setValue("승인완료");
//       }
//      else
//        sheet.getRange(i + 1, 8).setValue("실패🤪");
//      }
//   }
// }

function isPayed(intraId, needPoint) {
  var total = writeToSheet(intraId);
  if (total >= needPoint)
    return true;
  else
    return false;
}

function onRowInsert() {
  var values = SpreadsheetApp.getActive().getSheetByName('예약').getDataRange().getValues();
  var sheet = SpreadsheetApp.getActive().getSheetByName('예약');
  for (var i = 1; i < values.length; i++) {
    console.log(i, '[ 5열,6열 = ] <', values[i][5], '> <', values[i][6], '>');
    if (values[i][6] && values[i][7] == "") {
      console.log("지불처리되었지만 승인이 되지 않음.");
      var intraId = values[i][4];
      try {
        if (isPayed(intraId, 1)) {
          // 금일 일정포인트 이상 기부했다면
          sheet.getRange(i + 1, 8).setValue("승인완료");
          saveApprovedAds(values[i]);
        }
        else
            sheet.getRange(i + 1, 8).setValue("실패🤪");
      } catch (e) {
          console.log(e);
          sheet.getRange(i + 1, 8).setValue("실패🤪");
     }
    }
  }
}
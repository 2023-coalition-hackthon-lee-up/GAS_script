function JsonFile() {
  var fileId = "1JmS3wsToK4enxJSNjbmIspHaC0pbwIP1";
  var file = DriveApp.getFileById(fileId); // Replace YOUR_FILE_ID with the ID of your JSON file in Drive
  var contents = file.getBlob().getDataAsString();
  var data = JSON.parse(contents);

  return data;
}

function writeToSheet(name) {
  // setting name get from notion
  // set credentials and authorize
  var scope = ['https://www.googleapis.com/auth/spreadsheets'];
  var creds = JsonFile();

  var privateKey = creds.private_key;
  var clientEmail = creds.client_email;
  var serviceAccount = JSON.stringify({ "private_key": privateKey, "client_email": clientEmail });

  // var spreadsheet = SpreadsheetApp.openById(sheetId);
  var sheet = SpreadsheetApp.getActive().getSheetByName("오늘의 평가 포인트 계산");

  var sums = point(name);

  var data = [['name', 'today_point']];
  var total = 0;
  for (var i=0; i<sums.length; i++) {
    data.push([name, sums[i]]);
    total += sums[i];
  }
  data.push(['총 포인트:',total]);

  // write the data to the sheet
  // var sR = sheet.getRange(1, 1, data.length, data[0].length);
  // sR.setValues(data);
  var numRowsToInsert = data.length;
  sheet.insertRowsBefore(1, numRowsToInsert);
  var rangeToWrite = sheet.getRange(1, 1, numRowsToInsert, data[0].length);
  rangeToWrite.setValues(data);

  return total;
}

// Usage: writeToSheet();
function JsonFile() {
  var fileId = '1vaFVvcJbXmONjf6YS8hCOtQN2F22ecI7';
  var file = DriveApp.getFileById(fileId); // Replace YOUR_FILE_ID with the ID of your JSON file in Drive
  var contents = file.getBlob().getDataAsString();
  var data = JSON.parse(contents);

  return data;
}

function getNotionDBProperties(dbID) {
  var envs = JsonFile();

  let url = 'https://api.notion.com/v1/databases/' + dbID + '/query';
  let opts = {
    method: 'POST',
    headers: {
      Authorization: env.notion_Authorization, // 노션 API 사용을 위한 토큰
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      sorts: [
        {
          property: '생성 일시',
          direction: 'ascending',
        },
      ],
    }),
    muteHttpExceptions: true,
  };

  let response = UrlFetchApp.fetch(url, opts); // 노션  API로 데이터 요청

  let json = response.getContentText();
  let DBdata = JSON.parse(json);

  return DBdata;
}

function crawlNotionDatabase() {
  var resData = getNotionDBProperties(notion_Authorization.NotionDBProperties);

  //console.log(data);
  // 데이터베이스 내의 페이지들을 하나씩 불러오면서 제목과 내용을 출력
  var sheet = SpreadsheetApp.getActive().getSheetByName('예약');
  for (var i = 0; i < resData.results.length; i++) {
    var page = resData.results[i];
    console.log('page: ', page);
    var title = page.properties['프로젝트 이름 ']?.title[0]?.text.content;
    var startDate = page.properties['광고 일시']?.date?.start;
    var endDate = page.properties['광고 일시']?.date?.end;
    var point = 1;
    var intraID =
      page.properties['지불인 intra id']?.rich_text[0]?.text.content;
    var isPayed = page.properties['지불 완료']?.checkbox;
    // console.log(isPayed);
    var adUrl = page.properties['유튜브 url']?.rollup?.array[0]?.url;

    sheet.getRange(i + 2, 1).setValue(title);
    sheet.getRange(i + 2, 2).setValue(startDate);
    sheet.getRange(i + 2, 3).setValue(endDate);
    sheet.getRange(i + 2, 4).setValue(point);
    sheet.getRange(i + 2, 5).setValue(intraID);
    sheet.getRange(i + 2, 6).setValue(adUrl);
    sheet.getRange(i + 2, 7).setValue(isPayed);

    //SpreadsheetApp.getActiveSheet().getRange(i+2, 1).setValue(title);
    //SpreadsheetApp.getActiveSheet().getRange(i+2, 2).setValue(content);
  }
  onRowInsert();
  var now = new Date();
  sheet.getRange(2, 10).setValue(now.toISOString());
  // 날짜까진 표기함 시간도 넣기

  getTodayPL();
}

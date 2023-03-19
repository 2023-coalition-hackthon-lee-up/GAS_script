function JsonFile() {
  var fileId = '1YQDFDQAGljMeYt4UtSPWvE84boj1PKtr';
  var file = DriveApp.getFileById(fileId);
  var contents = file.getBlob().getDataAsString();
  var data = JSON.parse(contents);

  return data;
}

function getToken() {
  var url = 'https://api.intra.42.fr/oauth/token';

  // var clientId = PropertiesService.getScriptProperties().getProperty('MY_AWESOME_UID');
  // var clientSecret = PropertiesService.getScriptProperties().getProperty('MY_AWESOME_SECRET');

  var clientId = JsonFile().MY_AWESOME_UID;
  var clientSecret = JsonFile().MY_AWESOME_SECRET;

  var data = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  var options = {
    method: 'post',
    payload: data,
  };

  var response = UrlFetchApp.fetch(url, options);
  var accessToken = JSON.parse(response.getContentText())['access_token'];

  return accessToken;
}

function getTodayPoint(uid) {
  var now = new Date();
  var nowStr = now.toISOString();
  var startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );
  var startOfTodayStr = startOfToday.toISOString();

  // -----------------------testing-----------------------
  // var startTime = '2021-08-01T04:45:22.401Z';
  // var endTime = '2022-12-31T07:49:03.535Z';

  // // startTime 변수를 현재 날짜의 자정으로 초기화합니다.
  var startTime = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  ).toISOString();

  // // endTime 변수를 현재 시간으로 초기화합니다.
  var endTime = now.toISOString();

  // var startTime = startOfTodayStr;
  // var endTime = nowStr;
  // -----------------------------------------------------

  var url =
    'https://api.intra.42.fr/v2/users/' +
    uid +
    '/correction_point_historics?range[created_at]=' +
    startTime +
    ',' +
    endTime +
    ',&filter[reason]=Provided points to the pool.';

  var token = getToken();

  var headers = {
    Authorization: 'Bearer ' + token,
  };

  var options = {
    method: 'get',
    headers: headers,
  };

  var response = UrlFetchApp.fetch(url, options);

  var sums = [];

  if (response.getResponseCode() == 200) {
    var data = JSON.parse(response.getContentText());
    sums = data.map(function (d) {
      return d.sum * -1;
    });
    Logger.log(sums);
    Logger.log('sums');
  } else {
    Logger.log(
      'Error: Request returned status code ' + response.getResponseCode(),
    );
  }

  return sums;
}

function getUserData(name) {
  var url = 'https://api.intra.42.fr/v2/users/' + name;

  var token = getToken();

  var headers = {
    Authorization: 'Bearer ' + token,
  };

  var options = {
    method: 'get',
    headers: headers,
  };

  var response = UrlFetchApp.fetch(url, options);

  var userId = null;

  if (response.getResponseCode() == 200) {
    var data = JSON.parse(response.getContentText());
    userId = data.id;
  } else {
    Logger.log(
      'Error: Request returned status code ' + response.getResponseCode(),
    );
  }

  return userId;
}

function point(intraId) {
  var uid = getUserData(intraId);
  var point = getTodayPoint(uid);
  return point;
}

// Usage: point('yeju');

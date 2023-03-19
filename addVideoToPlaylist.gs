function JsonFile() {
  var fileId = '1vaFVvcJbXmONjf6YS8hCOtQN2F22ecI7';
  var file = DriveApp.getFileById(fileId); // Replace YOUR_FILE_ID with the ID of your JSON file in Drive
  var contents = file.getBlob().getDataAsString();
  var data = JSON.parse(contents);

  return data;
}

function addVideoToPlaylist() {
  var envs = JsonFile();
  var sheet = SpreadsheetApp.getActive().getSheetByName('오늘의 광고 편성표');
  var data = sheet.getDataRange().getValues();
  var playlistId = env.playlistId;

  for (var i = 1; i < data.length; i++) {
    var videoUrl = data[i][5]; // 비디오url의 열이 index: 5에 있다고 가정합니다.
    if (videoUrl == '') continue;
    var videoId = getVideoId(videoUrl);
    try {
      var result = YouTube.PlaylistItems.insert(
        {
          snippet: {
            playlistId: playlistId,
            resourceId: {kind: 'youtube#video', videoId: videoId},
          },
        },
        'snippet',
      );
    } catch (e) {
      console.log(e.details.errors);
    }
    console.log(result);
  }
}

function getVideoId(url) {
  var videoId = '';
  var regex = /[?&]v=([^&#]*)/;
  var match = regex.exec(url);
  if (match) {
    videoId = match[1];
  } else {
    regex = /youtu.be\/([^?&#]*)/;
    match = regex.exec(url);
    if (match) {
      videoId = match[1];
    }
  }
  return videoId;
}

function addVideoToPlaylist() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('오늘의 광고 편성표');
  var data = sheet.getDataRange().getValues();
  var playlistId = "PLKYbh0pxSbGoV6Bj9chhu98lu6ModPzB_";

  for (var i = 1; i < data.length; i++) {
    var videoUrl = data[i][5];	// 비디오url의 열이 index: 5에 있다고 가정합니다.
    if (videoUrl == "")
      continue;
  var videoId = getVideoId(videoUrl);
  try {
    var result = YouTube.PlaylistItems.insert({
      snippet: {
        playlistId: playlistId,
        resourceId: { kind: "youtube#video", videoId: videoId }
      },
    }, "snippet");
  } catch (e)
  {
    console.log(e.details.errors);
  }
  console.log(result);
  }
}

function getVideoId(url) {
  var videoId = "";
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
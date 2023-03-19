function JsonFile() {
  var fileId = '1vaFVvcJbXmONjf6YS8hCOtQN2F22ecI7';
  var file = DriveApp.getFileById(fileId); // Replace YOUR_FILE_ID with the ID of your JSON file in Drive
  var contents = file.getBlob().getDataAsString();
  var data = JSON.parse(contents);

  return data;
}

function clearPlayList() {
  var envs = JsonFile();

  //const playlistId = "YOUR_PLAYLIST_ID";
  const playlistId = 'env.playlistId';

  // 현재 플레이리스트 목록을 받아옵니다.
  const playlistResponse = YouTube.PlaylistItems.list('snippet', {
    playlistId: playlistId,
    maxResults: 25,
  });

  // 해당 리스트에서 id값만 가져옵니다.
  const playlistIdList = playlistResponse.items.map((item) => item.id);

  // 재생목록을 순회하며 삭제합니다
  for (let i = 0; i < playlistIdList.length; i++) {
    const videoResponse = YouTube.PlaylistItems.remove(playlistIdList[i]);
  }
}

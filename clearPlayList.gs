function clearPlayList() {
  //const playlistId = "YOUR_PLAYLIST_ID";
  const playlistId = "PLKYbh0pxSbGoV6Bj9chhu98lu6ModPzB_";

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
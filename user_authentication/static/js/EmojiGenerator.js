function openYouTubePlaylist(emotion) {
    let playlistURL;
    if (emotion === 'happy') {
        playlistURL = 'https://www.youtube.com/results?search_query=happy+mood+songs+playlist';
      }
      if (emotion === 'sad') {
          playlistURL = 'https://www.youtube.com/results?search_query=happy+mood+songs+playlist';
      }
      if (emotion === 'excited') {
          playlistURL = 'https://www.youtube.com/results?search_query=party+mood+songs+playlist';
      }
      if (emotion === 'angry') {
          playlistURL = 'https://www.youtube.com/results?search_query=soothing+mood+songs+playlist';
      }
      if (emotion === 'tear') {
          playlistURL = 'https://www.youtube.com/results?search_query=calm+mood+songs+playlist';
      }
      if (emotion === 'surprise') {
          playlistURL = 'https://www.youtube.com/results?search_query=jolly+mood+songs+playlist';
      }
    // Add other emotions and their corresponding playlist URLs as needed

    // Open the YouTube playlist URL in a new window
    window.open(playlistURL, '_blank');
}                           

function goBack() {
window.history.back();
}
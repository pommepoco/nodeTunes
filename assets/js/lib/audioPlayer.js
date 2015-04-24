function PlayerClass () {

  var playList =  document.getElementById("playList");
  var elemCurSong;
  var elemDuration = document.getElementById("song-duration");
  var elemSongName = document.getElementById("song-name");
  var elemAlbumArtist = document.getElementById("song-album-artist");
  var elemCurTime = document.getElementById("song-cur-time");
  var elemPauseBut = document.getElementById("pause-button");
  var elemPlayBut = document.getElementById("play-button");
  var elemplayerTimeLineCursor = document.getElementById("playerTimeLineCursor");
  var elemPlayerTimeLine = document.getElementById("playerTimeLine");
  var elemPlayerArt = document.getElementById("player-art");
  var nextSongs = [];
  var history = [];
  var random = false;
  var currentSrc;

  elemPlayerTimeLine.addEventListener("click", this.timechange, false);
  this.getCurSongElem = function() {
    return elemCurSong;
  };

  this.getHistory = function() {
    return history;
  };

  this.initElem = function() {
    elemPlayerTimeLine.removeEventListener("click", this.timechange, false);

    elemDuration = document.getElementById("song-duration");
    elemCurTime = document.getElementById("song-cur-time");
    elemSongName = document.getElementById("song-name");
    elemAlbumArtist = document.getElementById("song-album-artist");
    elemPauseBut = document.getElementById("pause-button");
    elemPlayBut = document.getElementById("play-button");
    elemPlayerTimeLine = document.getElementById("playerTimeLine");
    elemplayerTimeLineCursor = document.getElementById("playerTimeLineCursor");
    elemPlayerArt = document.getElementById("player-art");

    elemPlayerTimeLine.addEventListener("click", this.timechange, false);
  };

  this.pause = function() {
    if (!elemCurSong) return false;
    elemCurSong.pause();
  };

  this.play = function() {
    if (!elemCurSong) return false;
    elemCurSong.play();
    elemCurSong.volume = this.volume;
  };

  this.getNextSongs = function(){
    return nextSongs;
  };

  this.volume = 1;

  this.nextSong = function() {
    this.pause();
    this.songEnd();
  };

  this.volumeChange = function(elem) {
    this.volume = elem.value / 100;
    if (elemCurSong)
      elemCurSong.volume = this.volume;
  };

  this.setElemAsActive = function(elem, song) {
    if (elemCurSong) {
      this.pause();
      elemCurSong.currentTime = 0;
    }
    elem.setAttribute("onended", "audioPlayer.songEnd()");
    elem.setAttribute("ontimeupdate", "audioPlayer.timeUpdate(this)");
    elem.addEventListener("playing", this.isPlaying, false);
    elem.addEventListener("pause", this.isPaused, false);
    elemCurSong = elem;
    elemSongName.innerText = song.title;
    elemAlbumArtist.innerText = song.artist + " - " + song.album;
    elemPlayerArt.setAttribute("src", song.art.medium);
    elemPlayerArt.style.display = "block";
  };

  this.addToNext = function(song) {
    $("#playList").append('<audio id="songInPlayer-'
      + song._id
      + '" src="/musics/'
      + song.filename
      + '" type="'
      + song.mimeType
      +'" ></audio>');
    var node = document.getElementById('songInPlayer-'+ song._id);
    nextSongs.push(song);
    if (!elemCurSong) {
      this.setElemAsActive(node, song);
      this.play();
      this.isPlaying();
    }
    return true;
  };

  this.timechange = function(evt) {
    if (!elemCurSong) return false;
    var clientWidth = elemPlayerTimeLine.clientWidth;
    var percent = (evt.layerX / clientWidth) * elemCurSong.duration;
    elemCurSong.currentTime = percent;
  };

  this.previousSong = function() {
    if (elemCurSong && elemCurSong.currentTime > 5) {
      elemCurSong.currentTime = 0;
    } else if (history.length === 0) {
      return false;
    } else {
      var newSong = history.pop();
      nextSongs.unshift(newSong);
      console.log(newSong);
      var nextElem = getElemBySongId(newSong._id);
      this.setElemAsActive(nextElem, newSong);
      this.play();
    }
  };

  this.timeUpdate = function(event) {
    elemCurTime.innerHTML = timeFormat(event.currentTime);
    elemDuration.innerHTML = timeFormat(event.duration);

    var percent = (event.currentTime / event.duration) * 100;

    elemplayerTimeLineCursor.style.width = percent + "%";
  };

  this.songEnd = function() {
    history.push(nextSongs.shift());
    if (nextSongs[0]) {
      var newSong = nextSongs[0];
      var newSongElem = getElemBySongId(newSong._id);
      this.setElemAsActive(newSongElem, newSong);
      this.play();
    } else {
      if (elemCurSong) elemCurSong.currentTime = 0;
      elemCurSong = null;
      resetController();
    }
  };

  this.isPlaying = function () {
    elemPauseBut.style.display = "inline";
    elemPlayBut.style.display = "none";
  };

  this.isPaused = function() {
    elemPauseBut.style.display = "none";
    elemPlayBut.style.display = "inline";
  };

  function getElemBySongId(id) {
    return document.getElementById("songInPlayer-"+ id);
  }

  function getSongIdOfElem(elem) {
    return elem.getAttribute("id").replace("songInPlayer-", "");
  }

  function resetController() {
    elemSongName.innerText = "";
    elemAlbumArtist.innerText = "";
    elemPlayerArt.style.display = "none";
    elemCurTime.innerText = "0:00";
    elemDuration.innerText = "0:00";
    elemplayerTimeLineCursor.style.width= "0";
  }

  function timeFormat(time) {
    time = Math.round(time);
    var min = Math.floor(time / 60);
    var sec = time % 60;
    return min.toString()
      + ":"
      + ("0" + sec.toString()).slice(-2);
  }
};

function MusicClass() {
  var self = this;

  var template = tools.getTemplate("musicList");
  var orderList = 'title';
  var reverse = false;
  var musicLib = [];
  var mainContainer = "#main-view-container";


  this.init = function () {
    reqFilter.get("/music/", function(res, jrew) {
      var compile = template({
        orderList: orderList,
        reverse: reverse,
        musicLib: res
      });
      musicLib = res;
      $(mainContainer).html(compile);
      $(mainContainer).on("click", onListClick);
      $(mainContainer).on("dblclick", onListDbClick);
    });
  };

  var _onListClick_elem;
  function onListClick(evt) {
    var row;
    console.log(evt);
    if (evt.target.tagName === "TD") {
      row = $(evt.target).parent();
      if (_onListClick_elem)
        _onListClick_elem.removeClass('selected');
      $('.focus').removeClass("focus");
      row.addClass("selected focus");
      _onListClick_elem = row;
    }
  }

  function onListDbClick(evt) {
    var row;
    console.log(evt);
    if (evt.target.tagName === "TD") {
      row = $(evt.target).parent();
      var id = row.data("index");
      addMusicFromMusicLibId(id);
    }
  }

  function addMusicFromMusicLibId(id) {
    console.log(musicLib[id]);
    audioPlayer.addToNext(musicLib[id]);
  }

  this.destroy = function() {
    console.log("music destroy");
    $(mainContainer).html("");
  };
}

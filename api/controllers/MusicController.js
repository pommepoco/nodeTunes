/**
 * MusicController
 *
 * @description :: Server-side logic for managing musics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var audioMetaData = require('audio-metadata');
var fs = require('fs');
var albumArt = require('album-art');
var db = require('../sap/mongooseConnect');

module.exports = {
	index: function(req, res, next) {
    db.Music.find({}, function (err, musics) {
      res.json(musics);
    });
  },

  test: function(req, res, next) {
    res.json({test: "c'est un test"});
  },

  upload: function(req, res, next) {
    console.log('upload', req.file('file'));

    // Upload files in musics directory
    req.file('file').upload({ dirname: '../../assets/musics', maxBytes: 50*1000*1000}, function onUploadComplete (err, files) {
      if (err) return res.serverError(err);

      // Explode the mimeType
      console.log(files);
      var explodeType = files[0].type.split("/");
      if (explodeType[0] !== "audio") return res.json({error: {message: "uploaded file must be in audio format"}});

      //IF ERROR Return and send 500 error with error
      fs.readFile(files[0].fd, function (err, data) {
        if (err) return res.serverError(err);
        console.log(explodeType[1]);
        // Check audio format before searching metadata
        if (explodeType[1] === "mp3" || explodeType[1] === "mpeg")
          var metadata = audioMetaData.id3v2(data);
        else if (explodeType[1] === "ogg")
          var metadata = audioMetaData.id3v2(data);
        else return res.json({err: {message: "unknown audio format"}});

        console.log("no error l-46");

        var filename = files[0].fd.split('/').pop();
        var info = {
          title: metadata.title,
          artist: metadata.artist,
          track: metadata.track,
          album: metadata.album,
          composer: metadata.composer,
          genre: metadata.genre,
          year: metadata.year,
          fileType: explodeType[1],
          mimeType: files[0].type,
          size: files[0].size,
          filePath: files[0].fd,
          filename: filename
        };
        console.log("info l-63", info);
        var art = {};
        albumArt(info.artist, info.album, "small",function(err, url) {
          if (err) art.small = "";
          else art.small = url;
          waitingForSaving()
        });
        albumArt(info.artist, info.album, "medium",function(err, url) {
          if (err) art.medium = "";
          else art.medium = url;
          waitingForSaving()
        });
        albumArt(info.artist, info.album, "large",function(err, url) {
          if (err) art.large = "";
          else art.large = url;
          waitingForSaving()
        });
        albumArt(info.artist, info.album, "extralarge",function(err, url) {
          if (err) art.extralarge = "";
          else art.extralarge = url;
          waitingForSaving()
        });
        albumArt(info.artist, info.album, "mega",function(err, url) {
          if (err) art.mega = "";
          else art.mega = url;
          waitingForSaving()
        });

        var i = 0;
        function waitingForSaving() {
          console.log("waitingForSaving");
          if (++i === 5) {
            info.art = art;
            saveMusic();
            console.log(info);
          } else return;
        }

        function saveMusic() {
          var music = new db.Music(info);
          music.save(function (err, data) {
            if (err) return res.serverError(err);
            console.log("C'est GOOOOD", data);
            console.log(files[0]);
            res.json(data);
          });
        }
      });
    });
  }
};


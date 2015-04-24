function UploadClass() {
  var self = this;

  var elemFile;
  var images;
  function initFileInput() {
    elemFile = document.getElementById('inputUploadMusic');
    images = document.getElementById("#main-view-container");
    FileAPI.event.on(elemFile, 'change', function (evt){
      var files = FileAPI.getFiles(evt); // Retrieve file list
      console.log("file change");

      FileAPI.filterFiles(files, function (file, info/**Object*/){
        console.log(info, file);
        if( /^audio/.test(file.type) ){
          return  true;
        }
        return  false;
      }, function (files/**Array*/, rejected/**Array*/){
        // Uploading Files
        FileAPI.upload({
          url: '/music/upload',
          files: { file: files },
          progress: function (evt){
            console.log(evt);
          },
          complete: function (err, xhr){
            console.log(err, xhr);
          }
        });
      });
    });
  }

  this.init = function() {
    var template = tools.getTemplate("upload")();
    console.log(template);
    $("#main-view-container").html(template);
    initFileInput();
    console.log("upload init");
  };

  this.destroy = function() {
    $("#main-view-container").html("");
    console.log('upload destroy');
  };
}

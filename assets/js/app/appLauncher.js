// CORE
var reqFilter = new requestFilterClass();
var alert = new AlertClass();
var routes = new RoutesClass();

// LOAD TEMPLATES

(function(){
  var templates = [
    "alert",
    "login",
    "musicList",
    "upload"
  ];

  for (var template in templates) {
    template = templates[template];
    require_template(template);
  }

  function require_template(templateName) {
    var template = $('#template_' + templateName);
    if (template.length === 0) {
      var tmpl_dir = '/templates/ejs';
      var tmpl_url = tmpl_dir + '/' + templateName + '.ejs';
      var tmpl_string = '';

      $.ajax({
        url: tmpl_url,
        method: 'GET',
        async: false,
        contentType: 'text',
        success: function (data) {
          tmpl_string = data;
          $('head').append('<script id="template_' +
          templateName + '" type="text/template">' + data + '<\/script>');
        }
      });

    }
  }

  function load(template) {
    reqFilter.get("/templates/ejs/" + template + ".ejs", {}, function(data, jwres){
      console.log(data);

    });
  }

})(jQuery);

// CONTROLLER

var session = new SessionClass();
var upload = new UploadClass();
var music = new MusicClass();
var homepage = new HomepageClass();
var audioPlayer = new PlayerClass();

// Launch default action

routes.hashChange();

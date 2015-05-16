// CORE
var reqFilter = new requestFilterClass();
var alert = new AlertClass();
var routes = new RoutesClass();

// LOAD TEMPLATES

(function(){

  for (var template in NT.templates) {
    template = NT.templates[template];
    require_template(template);
  }

  function require_template(templateName) {
    var template = $('#template_' + templateName);
    if (template.length === 0) {
      var tmpl_url = NT.tmpl_dir + templateName + NT.tmpl_type;
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
})(jQuery);

// CONTROLLER

var session = new SessionClass();
var upload = new UploadClass();
var music = new MusicClass();
var homepage = new HomepageClass();
var audioPlayer;

// Launch default action

routes.hashChange();

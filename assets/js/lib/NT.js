var NT = {
  global_layout: false,

  templates: [
    "global_layout",
    "alert",
    "login",
    "logout",
    "musicList",
    "upload"
  ],

  tmpl_dir: '/templates/ejs/',
  tmpl_type: ".ejs",

  requireLayout: function() {
    if (NT.global_layout) return;
    var template = tools.getTemplate("global_layout");
    $("body").html(template);
    audioPlayer = new PlayerClass();
    NT.global_layout = true;
  }
};

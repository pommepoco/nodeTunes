var tools = {
  getTemplate: function(templateName) {
    return _.template($("#template_" + templateName).html());
  },

  // allow cascading object/array key
  getProperty: function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        console.error("tools.getProperty: undefined " + k + " index");
        return;
      }
    }
    return o;
  }

};

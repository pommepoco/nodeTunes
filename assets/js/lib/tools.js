var tools = {
  getTemplate: function(templateName) {
    return _.template($("#template_" + templateName).html());
  }
};

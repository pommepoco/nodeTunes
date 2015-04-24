function AlertClass() {

  this.config = {
    destination: "#alertContainer",
    templateId: "template_alert",
    time: 5000,
    prefixId: "alert-"
  };
  var alerts = [];
  var self = this;

  this.add = function(alert) {
    alert.id = makeId();
    alerts.push(alert);
    var template = _.template($("#" + this.config.templateId).html());
    var compile = template({alert: alert});
    setTimeout(remove, self.config.time);
    $(this.config.destination).append(compile);
    return alert.id;
  };

  var idIncrement = 0;
  var makeId = function() {
    return self.config.prefixId + idIncrement++;
  };

  function remove() {
    var alert = alerts.shift();
    $("#" + alert.id).remove();
  }
}

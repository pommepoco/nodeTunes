function formValidation(formSelector, rules) {
  var self = this;
  var $form;
  var $inputs;
  var action = "";
  var method = "";
  this.preventDefault = true;
  this.onSubmit = function(res, jrew) {
    console.log(res, jrew);
  };
  this.setForm = function($newForm) {
    formSelector = $newForm;
  };
  this.getForm = function() {
    return formSelector;
  };
  this.setRules = function(newRules) {
    rules = newRules;
  };
  this.getRules = function() {
    return rules;
  };
  this.test = function() {
    console.log("formValidation test");
    return true;
  };
  this.getAction = function() {
    return action;
  };
  this.setAction = function(newAction) {
    action = newAction;
  };
  this.submit = function() {

  };
  this.get$inputs = function() {
    return $inputs;
  };
  /*
   * Constructor
   */

  initForm();

  function initForm() {
    $form = $(formSelector);
    $form.on("submit", function(evt) {
      evt.preventDefault();
      if (!self.test()) return false;

      return false;
    });
    $inputs = $form.find("input");
    action = $form.attr("action");
    method = $form.attr("method");
  }
  function rule_require(val, param) {
    return true;
  }
}

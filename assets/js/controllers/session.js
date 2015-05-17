function SessionClass() {
  var self = this;
  var validate = {
    register: {
      username: {},
      password: {},
      email: {},
      firstName: {},
      name: {}
    },
    login: {
      username: {},
      password: {}
    }
  };

  this.user = {};

  this.config = {

  };

  this.isAuth = false;

  var mainContainer = "body";
  var $mainContainer = $(mainContainer);

  this.isAuthServerAsk = function() {
    reqFilter.get('/session/index', function(data, jwres) {
      if (data && data.user)
        self.user = data.user;
    });
  };

  this.login = new function() {
    this.init = function() {
      self.isAuthServerAsk();
      if (self.isAuth) {
        window.location.hash = "/";
        console.log("already login");
        return;
      }
      console.log("login init");
      var template = tools.getTemplate("login");
      $mainContainer.html(template());
      NT.global_layout = false;
      var loginValidation = new formValidation("form", validate.login);
    };

    this.destroy = function() {
      console.log("login destroy");
      if (self.isAuth)
        NT.requireLayout();
    }
  };

  this.logout = new function() {
    this.init = function() {
      var template = _.template("logout");
      $mainContainer.html(template());
      console.log("logout init");
    };
    this.destroy = function() {
      console.log("logout destroy");
    }
  };

  this.register = function() {
    this.init = function() {
      console.log("register init");
    };
    this.destroy = function() {
      console.log("register destroy");
    }
  };

  /*
   * CONSTRUCTOR
   */

  this.isAuthServerAsk();
}

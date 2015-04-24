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

  this.isAuthServerAsk = function() {
/*    reqFilter.get('/session/index', {}, function(data, jwres) {
      if (data.user)
        self.user = data.user;
    });
  */};

  this.login = function() {
    this.init = function() {
      console.log("login init");
    };
    this.destroy = function() {
      console.log("login destroy");
    }
  };

  this.logout = function() {
    this.init = function() {
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
};

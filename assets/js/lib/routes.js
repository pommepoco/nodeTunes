function RoutesClass() {
  var self = this;

  var policies = {
    "/": ["requireAuth"]
  };
   var routes = {
     "/": 'homepage',
     "/music": 'music',
     "/login" : "session.login",
     '/logout': 'session.logout',
     "/register": "session.register",
     "/music/upload": "upload",
     "default": "/"
  };

  window.onhashchange = hashChange;

  function initController() {
    var hash = location.hash;
    if (routes[hash]) {
      window[routes[hash]].init();
    }
  }
  var oldHash;
  this.hashChange = hashChange;

  function hashChange() {
    var hash = window.location.hash.replace("#", "");
    console.log(hash);
    if (routes[oldHash]) {
      window[routes[oldHash]].destroy();
    }
    if (routes[hash]) {
      window[routes[hash]].init();
    } else {
      window.location.hash = routes.default;
      return false;
    }
    oldHash = hash;
  }
}

function requestFilterClass() {
  var self = this;

  var filter = {
    error: "alert.add"
  };

  var filterCallback = function(){};

  this.post = function(url, data, callback) {
    filterCallback = callback;
    io.socket.post(url, data, passFilter);
  };

  this.get = function(url, callback) {
    filterCallback = callback;
    io.socket.get(url, passFilter);
  };

  this.delete = function(url, data, callback) {
    filterCallback = callback;
    io.socket.delete(url, data, passFilter);
  };

  this.put = function(url, data, callback) {
    filterCallback = callback;
    io.socket.put(url, data, passFilter);
  };

  function passFilter(res, jwres) {
    filterCallback(res, jwres);
  }
};

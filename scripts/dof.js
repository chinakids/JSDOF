(function() {
  var factory;

  factory = function($) {
    var dof;
    dof = (function() {
      function dof() {
        this.test = true;
        this.start = 0.2;
        this.end = 0.8;
        this.zoom = 0.5;
        this.speed = 10;
        this.spacing = 20;
      }

      dof.prototype.setOption = function(option) {
        var key;
        if (!option) {
          console.error('setOption传入参数不可为空');
          return false;
        }
        for (key in option) {
          this[key] = option[key];
        }
        if (!this.test) {
          return this.delay();
        }
      };

      dof.prototype.delay = function() {
        return alert('初始化成功');
      };

      return dof;

    })();
    return window.dof = dof;
  };

  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }

}).call(this);

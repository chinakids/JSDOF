(function() {
  var factory;

  factory = function($) {
    var dof;
    dof = (function() {
      function dof() {
        this.test = true;
        this.startPoint = 0.2;
        this.endPoint = 0.8;
        this.zoom = 0.5;
        this.speed = 10;
        this.spacing = 20;
        this.mainDom = '.dof';
        this.layerDom = '.dof-layer';
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
        var zAxis;
        zAxis = ($(this.mainDom).find(this.layerDom).size() * this.spacing) / (this.endPoint - this.startPoint);
        this.cacheData = {
          ww: $(window).width(),
          wh: $(window).height(),
          zAxis: zAxis
        };
        this.initPonit = {
          x: $(window).width() / 2,
          y: $(window).height() / 2
        };
        $(this.mainDom).css({
          'width': this.cacheData.ww,
          'height': this.cacheData.wh
        });
        return this.layer();
      };

      dof.prototype.model = function(Moffset) {
        var Poffset, Xtan, ytan, _ref, _ref1;
        if (Moffset == null) {
          Moffset = {
            left: 0,
            top: 0
          };
        }
        Poffset = {
          left: (_ref = offset.left > this.cacheData.ww / 2) != null ? _ref : offset.left - this.cacheData.ww / {
            2: this.cacheData.ww / 2 - offset.left
          },
          top: (_ref1 = offset.top > this.cacheData.wh / 2) != null ? _ref1 : offset.top - this.cacheData.wh / {
            2: this.cacheData.wh / 2 - offset.top
          }
        };
        Xtan = Poffset.left / this.cacheData.zAxis;
        return ytan = Poffset.top / this.cacheData.zAxis;
      };

      dof.prototype.layer = function() {
        return $(this.mainDom).find(this.layerDom).each(function() {
          var deepin;
          deepin = $(this).attr('dof-deepin');
          console.log(deepin);
          $(this).attr('style', 'zindex:' + deepin * 100);
        });
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

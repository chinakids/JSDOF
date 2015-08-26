(function() {
  var factory;

  factory = function($) {
    var dof;
    dof = (function() {
      function dof() {
        this.test = true;
        this.startPoint = 0.1;
        this.endPoint = 0.9;
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
        this.layer();
        return this.addEvent();
      };

      dof.prototype.model = function(Moffset, element, status, callback) {
        var deepinSize, xtan, ytan;
        callback = callback || function() {};
        xtan = Moffset.left / this.cacheData.zAxis;
        ytan = Moffset.top / this.cacheData.zAxis;
        deepinSize = this.cacheData.zAxis * this.startPoint + (element.attr('dof-deepin') * this.spacing);
        if (status === 'move') {
          return element.css({
            'left': deepinSize * xtan,
            'top': deepinSize * ytan
          });
        } else {
          return element.animate({
            'left': deepinSize * xtan,
            'top': deepinSize * ytan
          }, 100, callback);
        }
      };

      dof.prototype.layer = function() {
        var that, xtan;
        that = this;
        xtan = (this.cacheData.ww / 2) / this.cacheData.zAxis;
        return $(this.mainDom).find(this.layerDom).each(function() {
          var deepin, deepinSize, zoom;
          deepin = $(this).attr('dof-deepin');
          deepinSize = that.cacheData.zAxis * that.startPoint + (deepin * that.spacing);
          zoom = parseInt((deepinSize * xtan) / (that.cacheData.ww / 2) * 100) / 100;
          $(this).attr('zoom', zoom);
          $(this).css({
            'zIndex': deepin * 100,
            'transform': 'scale(' + zoom + ',' + zoom + ')'
          });
        });
      };

      dof.prototype.updataLayer = function(Moffset, status, callback) {
        var that;
        if (Moffset == null) {
          Moffset = {
            left: 0,
            top: 0
          };
        }
        if (status == null) {
          status = 'move';
        }
        that = this;
        return $(this.mainDom).find(this.layerDom).each(function() {
          return that.model(Moffset, $(this), status, callback);
        });
      };

      dof.prototype.addEvent = function() {
        var onmove, that;
        that = this;
        onmove = function() {
          $(document).unbind('mousemove');
          return $(document).mousemove(function(e) {
            var Moffset;
            console.log(e.pageX + ',' + e.pageY);
            Moffset = {
              left: that.cacheData.ww / 2 - e.pageX,
              top: that.cacheData.wh / 2 - e.pageY
            };
            return that.updataLayer(Moffset);
          });
        };
        return $(document).mouseover(function(e) {
          var Moffset;
          Moffset = {
            left: that.cacheData.ww / 2 - e.pageX,
            top: that.cacheData.wh / 2 - e.pageY
          };
          that.updataLayer(Moffset, 'over', onmove);
          return $(document).unbind('mouseover');
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

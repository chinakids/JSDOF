(function() {
  var factory;

  factory = function($) {
    var dof;
    dof = (function() {
      function dof(option) {
        var extend;
        this.W = $(window).width();
        this.H = $(window).height();
        this.maxZindex = 90000;
        this.cfg = {
          test: true,
          zoom: true,
          zPoint: {
            start: 0.1,
            end: 0.9
          },
          speed: 0.1,
          deepin: 20,
          size: 1600 / 932,
          mainDom: '.dof',
          layerDom: '.dof-layer'
        };
        if (typeof option !== 'object') {
          console.error('option传入参数不可为Object以外类型');
          return false;
        }
        extend = function(oldObj, newObj) {
          var key, _results;
          _results = [];
          for (key in newObj) {
            if (typeof oldObj[key] !== 'object') {
              _results.push(oldObj[key] = newObj[key]);
            } else {
              _results.push(extend(oldObj[key], newObj[key]));
            }
          }
          return _results;
        };
        extend(this.cfg, option);
        if (!this.cfg.test) {
          this.delay();
        }
      }

      dof.prototype.delay = function() {
        this.zAxis = ($(this.cfg.mainDom).find(this.cfg.layerDom).size() * this.cfg.deepin) / (this.cfg.zPoint.end - this.cfg.zPoint.start);
        this.centerPonit = {
          x: this.W / 2,
          y: this.H / 2
        };
        this.updataCss();
        this.layer();
        return this.createEventLayer();
      };

      dof.prototype.updataCss = function() {
        var bgSize, self;
        self = this;
        $(this.cfg.mainDom).css({
          'width': this.W + 50,
          'height': this.H + 30,
          'overflow': 'hidden',
          'position': 'relative',
          'marginTop': '-15px',
          'marginLeft': '-25px'
        });
        bgSize = function() {
          if (self.W / self.H >= self.cfg.size) {
            return 'background-size: 100% auto;';
          } else {
            return 'background-size: auto 100%;';
          }
        };
        return $('head').append('<style id="dof-style">' + this.cfg.layerDom + ',#dof-event{ -webkit-user-select:none; -ms-user-select:none; -o-user-select:none; user-select:none; }' + this.cfg.layerDom + ',' + this.cfg.mainDom + '{' + bgSize() + '} #dof-event{ width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: ' + this.maxZindex + '} </style>');
      };

      dof.prototype.model = function(mOffset, element, status, callback) {
        var deepinSize, xtan, ytan;
        callback = callback || function() {};
        xtan = mOffset.left / this.zAxis;
        ytan = mOffset.top / this.zAxis;
        deepinSize = this.zAxis * this.cfg.zPoint.start + (element.attr('dof-deepin') * this.cfg.deepin);
        if (status === 'move') {
          return element.css({
            'left': (deepinSize * xtan) * this.cfg.speed,
            'top': (deepinSize * ytan) * this.cfg.speed
          });
        } else {
          return element.animate({
            'left': (deepinSize * xtan) * this.cfg.speed,
            'top': (deepinSize * ytan) * this.cfg.speed
          }, 200, callback);
        }
      };

      dof.prototype.layer = function() {
        var self;
        self = this;
        return $(this.cfg.mainDom).find(this.cfg.layerDom).each(function() {
          var deepin, deepinSize, zoom;
          deepin = $(this).attr('dof-deepin');
          deepinSize = self.zAxis - (self.zAxis * self.cfg.zPoint.start + ((deepin - 1) * self.cfg.deepin));
          zoom = self.cfg.zoom ? parseInt((deepinSize / self.zAxis) * 10000) / 10000 : 1;
          $(this).attr('zoom', zoom);
          $(this).css({
            'zIndex': self.maxZindex - (deepin * 100),
            'transform': 'scale(' + zoom + ',' + zoom + ')',
            'width': '100%',
            'height': '100%',
            'position': 'absolute',
            'left': 0,
            'top': 0
          });
        });
      };

      dof.prototype.updataLayer = function(mOffset, status, callback) {
        var self;
        if (mOffset == null) {
          mOffset = {
            left: 0,
            top: 0
          };
        }
        if (status == null) {
          status = 'move';
        }
        self = this;
        return $(this.cfg.mainDom).find(this.cfg.layerDom).each(function() {
          return self.model(mOffset, $(this), status, callback);
        });
      };

      dof.prototype.createEventLayer = function() {
        $(this.cfg.mainDom).append('<div id="dof-event"></div>');
        return this.addEvent();
      };

      dof.prototype.addEvent = function() {
        var onmove, self;
        self = this;
        onmove = function() {
          $('#dof-event').unbind('mousemove');
          return $('#dof-event').mousemove(function(e) {
            var mOffset;
            mOffset = {
              left: self.centerPonit.x - e.pageX,
              top: self.centerPonit.y - e.pageY
            };
            return self.updataLayer(mOffset);
          });
        };
        $('#dof-event').mouseover(function(e) {
          var mOffset;
          mOffset = {
            left: self.centerPonit.x - e.pageX,
            top: self.centerPonit.y - e.pageY
          };
          self.updataLayer(mOffset, 'over', onmove);
          return $(document).unbind('mouseover');
        });
        return $('#dof-event').mouseout(function(e) {
          var mOffset;
          mOffset = {
            left: 0,
            top: 0
          };
          self.updataLayer(mOffset, 'out', onmove);
          return $(document).unbind('mouseout');
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

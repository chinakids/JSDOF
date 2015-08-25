;;;(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD模式
    define([ "jquery" ], factory);
  } else {
    // 全局模式
    factory(jQuery);
  }
})(function($){
  /**
   * 起始方法
   * @return {[type]} [description]
   */
  function start(){

  }

  /**
   * 函数模型
   * @param  {[number]} offset [偏移量]
   * @return {[type]}        [description]
   */
  function model(offset){

  }


  var Dof = {
    option : {
      test : true,
  		start : 0.2,
  		end   : 0.8,
  		zoom  : 0.5,
  		speed : 10,   //px/s
  		spacing : 20  //px
    },
    init : function(option){
      for(var key in option){
        this.option[key] = option[key];
      }
      if(!this.option.test){
        start()
      }
    }
  }

  window.Dof = Dof;
)

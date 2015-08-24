;;(function(window,$){

  var start = function(){

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
})(window,jQuery)

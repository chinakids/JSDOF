;;(function(window){

  var Dof;

  Dof = {
    option : {
      test : false,
  		start : 0.2,
  		end   : 0.8,
  		zoom  : 0.5,
  		speed : 10,   //px/s
  		spacing : 20  //px
    },
    init : function(option){
      var key;
      for(key in option){
        this.option[key] = option[key];
      }
      if(!test){

      }
    }
  }

  window.Dof = Dof;
})(window)

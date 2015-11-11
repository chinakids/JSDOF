#
#    name:景深效果
#    desc:页面分层 根据鼠标移动模拟景深视觉效果
#

factory = ($) ->
  class dof
    #构造器
    constructor: (option) ->
      @W = $(window).width()
      @H = $(window).height()
      @maxZindex = 90000
      #默认数据
      @cfg =
        test : true
        zoom : true
        zPoint:
          start : 0.1
          end : 0.9
        speed : 0.1   #speed zoom  一般小于1，以1/2屏幕宽为基准
        deepin : 20  #px
        size : 1600/932   #宽高比
        mainDom : '.dof'
        layerDom : '.dof-layer'
      #参数初始化
      unless typeof(option) is 'object'
        console.error 'option传入参数不可为Object以外类型'
        return false
      extend = (oldObj,newObj) ->
        for key of newObj
          if typeof(oldObj[key]) isnt 'object'
            oldObj[key] = newObj[key]
          else
            extend(oldObj[key],newObj[key])
      extend(@cfg,option)
      unless @cfg.test
        @delay()

    #初始函数
    delay : () ->
      #首先 计算z轴长度,存入构造器
      @zAxis = ($(@cfg.mainDom).find(@cfg.layerDom).size() * @cfg.deepin)/(@cfg.zPoint.end - @cfg.zPoint.start)
      #中心点坐标
      @centerPonit =
        x    : @W/2
        y    : @H/2
      #初始化dom容器
      @updataCss()
      #构建层
      @layer()
      #创建事件层
      @createEventLayer()

    #初始化css
    updataCss : () ->
      self = @
      $(@cfg.mainDom).css
        'width' : @W+50 #增加偏移量
        'height': @H+30 #增加偏移量
        'overflow':'hidden' #溢出裁剪
        'position':'relative'
        'marginTop':'-15px'  #增加偏移量
        'marginLeft':'-25px'  #增加偏移量

      bgSize = () ->
        if self.W/self.H >= self.cfg.size
          return 'background-size: 100% auto;'
        else
          return 'background-size: auto 100%;'

      $('head').append('
            <style id="dof-style">
              '+@cfg.layerDom+',#dof-event{
                -webkit-user-select:none;
                -ms-user-select:none;
                -o-user-select:none;
                user-select:none;
              }
              '+@cfg.layerDom+','+@cfg.mainDom+'{
                '+bgSize()+'
              }
              #dof-event{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: '+@maxZindex+'
              }
            </style>')

    #dof计算模型
    model : (mOffset,element,status,callback) ->
      callback = callback or ()->
      xtan = mOffset.left/@zAxis
      ytan = mOffset.top/@zAxis
      deepinSize = @zAxis*@cfg.zPoint.start + (element.attr('dof-deepin') * @cfg.deepin)

      if status is 'move'
        element.css
          'left' : (deepinSize * xtan) * @cfg.speed
          'top' : (deepinSize * ytan) * @cfg.speed
      else
        element.animate
          'left' : (deepinSize * xtan) * @cfg.speed
          'top' : (deepinSize * ytan) * @cfg.speed
          ,200,callback

    #层模型
    layer : () ->
      self = @
      #递归层dom设置景深缩放
      $(@cfg.mainDom).find(@cfg.layerDom).each () ->
        deepin = $(this).attr('dof-deepin')

        deepinSize = self.zAxis-(self.zAxis * self.cfg.zPoint.start + ((deepin - 1) * self.cfg.deepin))

        zoom = if self.cfg.zoom then parseInt((deepinSize/self.zAxis)*10000)/10000 else 1
        $(this).attr 'zoom',zoom
        $(this).css
          'zIndex': self.maxZindex - (deepin * 100)
          'transform':'scale('+zoom+','+zoom+')'
          'width': '100%'
          'height': '100%'
          'position': 'absolute'
          'left': 0;
          'top': 0;
        #计算缩放
        return

    #更新层方法
    updataLayer : (mOffset = {left:0,top:0},status = 'move',callback) ->
      self = @
      #递归更新层
      $(@cfg.mainDom).find(@cfg.layerDom).each () ->
        self.model mOffset,$(this),status,callback

    #创建事件层
    createEventLayer : () ->
      $(@cfg.mainDom).append('<div id="dof-event"></div>')
      @addEvent()

    #事件绑定
    addEvent : () ->
      self = @
      #鼠标移动更新
      onmove = () ->
        $('#dof-event').unbind 'mousemove'
        $('#dof-event').mousemove (e)->
          #console.log e.pageX+','+e.pageY
          mOffset =
            left : self.centerPonit.x - e.pageX
            top : self.centerPonit.y - e.pageY
          self.updataLayer(mOffset)
      # onmove()
      #鼠标移入更新
      $('#dof-event').mouseover (e)->
        mOffset =
          left : self.centerPonit.x - e.pageX
          top : self.centerPonit.y - e.pageY
        self.updataLayer(mOffset,'over',onmove)
        $(document).unbind 'mouseover'

      $('#dof-event').mouseout (e)->
        mOffset =
          left : 0
          top : 0
        self.updataLayer(mOffset,'out',onmove)
        $(document).unbind 'mouseout'

  #挂载到全局
  window.dof = dof

# 兼容其他模式
if typeof(define) is "function" and define.amd
  # AMD模式
  define [ "jquery" ], factory
else
  # 全局模式
  factory jQuery

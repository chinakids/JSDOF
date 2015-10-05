#
#    name:景深效果
#    desc:页面分层 根据鼠标移动模拟景深视觉效果
#

factory = ($) ->
  class dof
    constructor: ->
      @test = true
      @startPoint = 0.1
      @endPoint = 0.9
      @speed = 10   #px/s
      @spacing = 20  #px
      @mainDom = '.dof'
      @layerDom = '.dof-layer'

    setOption : (option) ->
      unless option
        console.error 'setOption传入参数不可为空'
        return false
      for key of option
        @[key] = option[key]
      unless @test
        @delay()


    delay : () ->
      WINDOW_W = $(window).width()
      WINDOW_H = $(window).height()
      zAxis = ($(@mainDom).find(@layerDom).size() * @spacing)/(@endPoint - @startPoint)
      @cacheData =
        ww    : WINDOW_W
        wh    : WINDOW_h
        zAxis : zAxis
      @initPonit =
        x    : WINDOW_W/2
        y    : WINDOW_H/2
      $(@mainDom).css
        'width' : @cacheData.ww
        'height': @cacheData.wh

      @layer()
      @addEvent()

    model : (Moffset,element,status,callback) ->
      callback = callback or ()->
      # Poffset =
      #   left : if (Moffset.left > @cacheData.ww/2) then (Moffset.left - @cacheData.ww/2) else (@cacheData.ww/2 - Moffset.left)
      #   top : if (Moffset.top > @cacheData.wh/2) then (Moffset.top - @cacheData.wh/2) else (@cacheData.wh/2 - Moffset.top)
      # console.log Poffset
      xtan = Moffset.left/@cacheData.zAxis
      ytan = Moffset.top/@cacheData.zAxis
      deepinSize = @cacheData.zAxis*@startPoint + (element.attr('dof-deepin') * @spacing)
      if status is 'move'
        element.css
          'left' : (deepinSize * xtan)
          'top' : (deepinSize * ytan)
      else
        element.animate
          'left' : (deepinSize * xtan)
          'top' : (deepinSize * ytan)
          ,100,callback


    layer : () ->
      that = @
      xtan = (@cacheData.ww / 2) / @cacheData.zAxis
      $(@mainDom).find(@layerDom).each () ->
        deepin = $(@).attr('dof-deepin')
        deepinSize = that.cacheData.zAxis*that.startPoint + (deepin * that.spacing)
        zoom = parseInt((deepinSize * xtan)/(that.cacheData.ww/2)*100)/100
        $(@).attr 'zoom',zoom
        $(@).css
          'zIndex': deepin * 100
          'transform':'scale('+zoom+','+zoom+')'
        #计算缩放
        return

    updataLayer : (Moffset = {left:0,top:0},status = 'move',callback)->
      that = @
      $(@mainDom).find(@layerDom).each () ->
        that.model Moffset,$(@),status,callback

    addEvent : () ->
      that = @

      onmove = () ->
        $(document).unbind 'mousemove'
        $(document).mousemove (e)->
          console.log e.pageX+','+e.pageY
          Moffset =
            left : that.cacheData.ww/2 - e.pageX
            top : that.cacheData.wh/2 - e.pageY
          that.updataLayer(Moffset)

      $(document).mouseover (e)->
        Moffset =
          left : that.cacheData.ww/2 - e.pageX
          top : that.cacheData.wh/2 - e.pageY
        that.updataLayer(Moffset,'over',onmove)
        $(document).unbind 'mouseover'


  window.dof = dof

# 兼容其他模式
if typeof define is "function" and define.amd
  # AMD模式
  define [ "jquery" ], factory
else
  # 全局模式
  factory jQuery

factory = ($) ->
	class dof
		constructor: ->
			@test = true
			@startPoint = 0.2
			@endPoint = 0.8
			@zoom = 0.5
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
			zAxis = ($(@mainDom).find(@layerDom).size() * @spacing)/(@endPoint - @startPoint)
			@cacheData =
				ww    : $(window).width()
				wh    : $(window).height()
				zAxis : zAxis
			@initPonit =
				x    : $(window).width()/2
				y    : $(window).height()/2
			$(@mainDom).css
				'width' : @cacheData.ww
				'height': @cacheData.wh

			@layer()

		model : (Moffset = {left:0,top:0}) ->
			Poffset =
				left : offset.left > @cacheData.ww/2 ? offset.left - @cacheData.ww/2 : @cacheData.ww/2 - offset.left
				top : offset.top > @cacheData.wh/2 ? offset.top - @cacheData.wh/2 : @cacheData.wh/2 - offset.top
			Xtan = Poffset.left/@cacheData.zAxis
			ytan = Poffset.top/@cacheData.zAxis

		layer : () ->
			$(@mainDom).find(@layerDom).each () ->
				deepin = $(@).attr('dof-deepin')
				console.log deepin
				$(@).attr 'style','zindex:'+deepin * 100
				return


	window.dof = dof

# 兼容其他模式
if typeof define is "function" and define.amd
	# AMD模式
	define [ "jquery" ], factory
else
	# 全局模式
	factory jQuery

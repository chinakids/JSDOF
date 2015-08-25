factory = ($) ->
	class dof
		constructor: ->
			@test = true
			@start = 0.2
			@end = 0.8
			@zoom = 0.5
			@speed = 10   #px/s
			@spacing = 20  #px

		setOption : (option) ->
			unless option
				console.error 'setOption传入参数不可为空'
				return false
			for key of option
				@[key] = option[key]
			unless @test
				@delay()


		delay : () ->
			alert('初始化成功')


	window.dof = dof




# 兼容其他模式
if typeof define is "function" and define.amd
	# AMD模式
	define [ "jquery" ], factory
else
	# 全局模式
	factory jQuery

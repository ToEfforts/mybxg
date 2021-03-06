define(['jquery','template','nprogress','cookie'], function ($,template,NProgress) {
	// 控制页面顶部控制条
	NProgress.start();
	NProgress.done();
	// 控制左侧导航菜单折叠展开
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 实现退出功能
	$('#logoutBtn').click(function () {
		$.ajax({
			type:'post',
			url:'/api/logout',
			dataType:'json',
			success : function (data) {
				if (data.code == 200){
					// success OK
					location.href = '/main/login';
				}
			}
		})
		return false;
	});

	// 验证是否登录
	var seesionId = $.cookie('PHPSESSID');
	if (!seesionId && location.pathname != '/main/login'){
		location.href = '/main/login';
	}

	// 获取用户登录信息,并填充页面
	var cookie = $.cookie('loginInfo');
	var loginInfo = cookie ? JSON.parse(cookie) : {};

	var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div> <h4>{{tc_name}}</h4>'
	var html = template.render(tpl,loginInfo);
	$('#profileId').html(html);
});







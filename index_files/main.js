$(function () {
  // Jquery 滚动条
  $('.scrollbar').scrollBar({
    position: 'y',
    wheelDis: 10,
  });
  // 菜单收缩隐藏
  $('.sidebar .menu-toggle').click(function () {
    $('.sidebar').toggleClass('shrink');

    if ($('.sidebar').hasClass('shrink')) {
      // 所有子菜单折叠起来
      $('.menu .submenu').slideUp();
      $('.menu').find('.active').removeClass('expand');
      $('.welcome').empty()
      $('.welcome').append("<span class='ss'>强智<br/>科技</span>")
    } else {
      // 展开激活菜单
      $('.menu')
          .find('.active')
          .addClass('expand')
          .siblings('.submenu')
          .slideDown();
      $('.welcome').empty()
      $('.welcome').append("<span class='zk'>强智科技教务系统欢迎您！</span>")
    }
  });

  // 收缩状态的sidebar 鼠标离开时，菜单全部折叠
  $('.sidebar')
      .mouseleave(function () {
        if (!$(this).hasClass('shrink')) return false;

        // 折叠所有菜单
        $('.menu').find('.submenu').slideUp().prev().removeClass('expand');
        $('.welcome').empty()
        $('.welcome').append("<span class='ss'>强智<br/>科技</span>")
      })
      .mouseenter(function () {
        if (!$(this).hasClass('shrink')) return false;

        // 展开激活菜单
        $('.menu').find('.link.active').addClass('expand').next().slideDown();
        $('.welcome').empty()
        $('.welcome').append("<span class='zk'>强智科技教务系统欢迎您！</span>")
      });

  
  // 点击菜单页面
  $('.menu .menu-item').click(function () {
    // 当前元素加上激活类名
    $(this).addClass('active');
    // 当前菜单加上激活类名
    $(this).parents('.submenu').prev().addClass('active');

    // 移除其他元素激活类名
    $('.menu').find('.menu-item').not($(this)).removeClass('active');
    $('.menu')
        .find('.link')
        .not($(this).parents('.submenu').prev())
        .removeClass('active');
  });
});

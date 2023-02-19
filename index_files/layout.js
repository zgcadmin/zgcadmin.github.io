
// tab选项卡
layui.use("element", function () {
  var element = layui.element;

  //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
  var layid = location.hash.replace(/^#test1=/, "");
  element.tabChange("test1", layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项

  //监听Tab切换，以改变地址hash值
  element.on("tab(test1)", function () {
    location.hash = "test1=" + this.getAttribute("lay-id");
  });
});

// 主题弹窗
// var theme = document.getElementsByClassName("changeTheme")[0].children;
// theme[0].addEventListener("mouseover", function () {
//   theme[1].style.display = "flex";
// });
// theme[1].addEventListener("mouseleave", function (g) {
//   theme[1].style.display = "none";
// });

// 主题选择
// var items = document.getElementsByClassName("chooseTheme")[0].children[1]
//   .children;
// for (var item=0 ;item<items.length;item++) {
//   items[item].addEventListener("click", function (e) {
//     for (var j=0 ;j<items.length;j++) {
//       items[j].children[0].src = "../../images/chooseN.png";
//     }
//     e.currentTarget.children[0].src = "../../images/chooseY.png";
//   });
// }

// tab栏移动
var tabMove = $(".layui-tab .layui-tab-title li");
var tabs = 2;
// 右移动
tabMove[1].addEventListener("click", function () {
  tabMove = $(".layui-tab .layui-tab-title li");
  if (Number(tabMove.length) - tabs <= 9) {
    return;
  }
  tabs++;
  tabMove[tabs].style.display = "none";
});
// 左移动
tabMove[0].addEventListener("click", function () {
  tabMove = $(".layui-tab .layui-tab-title li");

  if (tabs == 2) {
    return;
  }
  tabMove[tabs].style.display = "inline-block";
  tabs--;
  console.log(tabs)

});

// 显示右上角提示
$('.top div ul .over').mouseover(function (e) {
  e.currentTarget.lastElementChild.style.display='block'
})
$('.top div ul .over').mouseout(function (e) {
  e.currentTarget.lastElementChild.style.display='none'
})
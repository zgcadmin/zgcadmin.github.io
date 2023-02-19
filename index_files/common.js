//折叠
var Accordion = function (el, multiple) {
  EventDelegates.apply(this);
  var _this = this;
  this.el = el || {};
  this._events = {};
  this.multiple = multiple || false;

  var links = this.el.find(".link");
  links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  var itemFiles = this.el.find(".submenu .item-file");
  itemFiles.on("click", function () {
    _this.emit("itemClick", this);
  });
};

Accordion.prototype.dropdown = function (e) {
  var $el = e.data.el;
  ($this = $(this)),
    ($parent = $this.closest("ul") || $el),
    ($next = $this.next());
  $next.slideToggle();
  $this.parent().toggleClass("open");

  if (!e.data.multiple) {
    $parent.find(".submenu").not($next).slideUp().parent().removeClass("open");
  }
};
//首页
$(function () {
  function renderTree(data) {
    var $ul = $('<ul class="submenu"></ul>');
    Array.isArray(data) &&
      data.forEach(function (vo) {
        var $li = $("<li></li>");
        if (vo.type === "folder") {
          var iconClz = vo.icon || "";
          $div = $(
            '<div class="link"><i class="' +
              iconClz +
              '"></i><span>' +
              vo.label +
              "</span></div>"
          );
          $li.append($div);
          !(vo.level && vo.level === 1) &&
            $div.append($('<i class="iconfont iconsanjiao-down"></i>'));
        } else {
          $li.addClass("item-file");
          $li.append($('<a><b class="dot"></b>' + vo.label + "</a>"));
        }
        if (vo.children && vo.children.length) {
          $li.append(renderTree(vo.children));
        }
        $ul.append($li);
      });
    return $ul;
  }

  var accordion = new Accordion($("#accordion"), false);

  accordion.on("itemClick", function (obj) {
    this.el.find("a.active").removeClass("active");
    var $li = $(obj);
    var $aDom = $li.find("a");
    $aDom.addClass("active");
    $aDom.parents(".submenu.fold-submenu").removeAttr("style");
  });

  $(".testClose").click(function () {
    $(".edu-dialog-model").hide();
  });

  let scroll = 0;
  $("#scrollLeft").click(function (e) {
    scroll -= 150;
    $(".breadcrumbs").scrollLeft(scroll);
  });
  $("#scrollRight").click(function () {
    scroll = $(".breadcrumbs").scrollLeft() + 150;
    $(".breadcrumbs").scrollLeft(scroll);
  });
  $(".breadcrumbs ul li").click(function () {
    $(".breadcrumbs").scrollLeft($(this).offset().left - $(this).width() * 3);
  });
  $("#fileInput").change(function (e) {
    $(this).parents().find(".file-name").text(e.currentTarget.files[0].name);
  });
  $("select").change(function () {
    $(this).css("color", "#272727");
    $(this).css("font-weight", "400");
  });
});
// 侧边栏
var flag = false;
$(function () {
  $(".nav-close").on("click", function () {
    if (flag == false) {
      $(".edu-sideMenu").css("overflow", "hidden");
      $(".accordion>li>.link>i")
        .stop()
        .animate({ fontSize: "1.1rem", left: "0.75rem" }, 10);
      $(".accordion>li>div").css("padding-left", "3rem");
      $(".box-content>span").stop().animate({ width: '4rem' }, 200);
      $(".icon-xiala").hide();
      $(".welcome")[0].style.backgroundImage =
        "url('../assets_v1/images/welcome1.png')";
      $(".welcome")[0].children[0].innerHTML = getColor("min");
      $("input[type='checkbox]").removeAttr("checked");
      $(".accordion>.open").removeClass("open");
      flag = true;
      $("#nav-kg").val(1);
    } else {
      console.log(123)
      $(".edu-sideMenu").css("overflow", "auto");
      $(".accordion>li>div").css("padding-left", "2.25rem");
      $(".accordion>li>.link>i")
        .stop()
        .animate({ fontSize: "1.05rem", left: "0.65rem" }, 10);
      $(".box-content>span").stop().animate({ width: "15rem" }, 200);
      $(".icon-xiala").show();
      $(".welcome")[0].style.backgroundImage =
        "url('../assets_v1/images/welcome.png')";
      $(".welcome")[0].children[0].innerHTML = getColor("max");
      $(".accordion>li>ul.fold-submenu ul").toggleClass("extend-child", false);
      flag = false;
      $("#nav-kg").val(0)
    }
  });
  var het = 0;
  $(".nav-close").click(function () {
    $(".accordion>li>ul.submenu").hide();
    $(".accordion>li>ul.submenu").toggleClass("fold-submenu", 200);
    $(".accordion>li>ul.fold-submenu ul").toggleClass("extend-child", 200);
    het = $("ul.accordion>li:first").offset().top;
  });
  $("ul.accordion>li>.link").bind("click", function () {
    if ($(".nav-close")) {
      $("ul.accordion>li").each(function (e) {
        if (!$(this).hasClass("open")) {
          newHet = Number($(this).offset().top) + 10 - Number(het);
          $(this)
            .children(".submenu.fold-submenu")
            .css("top", newHet + "px");
        }
      });
    } else {
    }
  });

  // 范围选择
  $(".range-select-component>input").click(function (event) {
    event.stopPropagation();
    $(this).parent().children(".range-select-box").show();
  });
  $(document).click(function (e) {
    let target = $(e.target);
    if (
      target.closest(".range-select-component>input").length != 0 ||
      target.closest(".range-select-box").length
    )
      return;
    $(".range-select-box").hide();
  });
  // 清空
  $(".range-select-box p span")
    .eq(0)
    .click(function (e) {
      let selectValue = $(
        $(this).parents(".range-select-component").children("input")
      );
      selectValue.val("");
      $(this).parents(".range-select-box").find("ul li").removeClass();
      $(this).parents(".range-select-box").hide();
    });
  $(".range-select-box ul li").click(function (e) {
    $(this).addClass("range-item-selected");
    let select = 0;
    let data = [];
    $(this)
      .siblings()
      .each(function (val) {
        if ($(this).hasClass("range-item-selected")) {
          select += 1;
        }
      });
    if (select > 1) {
      $(this).siblings().removeClass("range-item-selected");
    }
    let all = $(".range-select-box ul li");
    all.each(function (res) {
      if ($(this).hasClass("range-item-selected")) {
        data.push(res + 1);
      }
    });
    if (data.length === 2) {
      $(this)
        .parents(".range-select-box")
        .find("p span")
        .removeClass("range-disabled");
      for (let i = data[0]; i < data[1] - 1; i++) {
        $(all[i]).addClass("range-item-during");
      }
      // 确定
      $(".range-select-box p span")
        .eq(1)
        .click(function (e) {
          let selectValue = $(
            $(this).parents(".range-select-component").children("input")
          );
          let value = data[0] + "-" + data[1];
          selectValue.val(value);
          $(this).parents(".range-select-box").hide();
        });
    } else {
      $(this)
        .parents(".range-select-box")
        .find("p span")
        .eq(1)
        .addClass("range-disabled");
      all.each(function () {
        $(this).removeClass("range-item-during");
      });
    }
  });
});

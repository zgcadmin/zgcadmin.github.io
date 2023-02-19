(function (g) {
    var $ = g.$;

    // 快捷入口图片
    var lis = $(".person-top ul li");
    for (var i = 0; i < lis.length; i++) {
        if (i > lis.length - 4) {
            continue;
        }
        if (i > 5) {
            lis[i + 2].style.backgroundImage =
                "url(../assets_v1/images/icon" + (i - 5) + ".png)";
        } else {
            lis[i + 2].style.backgroundImage =
                "url(../assets_v1/images/icon" + (i + 1) + ".png)";
        }
        // lis[lis.length - 1].style.backgroundImage = "none";
    }

    // 快捷入口滚动
    if (lis.length >= 12) {
        var ul = $(".person-top ul")[0];
        ul.addEventListener("mouseover", function () {
            lis[0].style.display = "flex";
            lis[1].style.display = "flex";
        });
        ul.addEventListener("mouseleave", function () {
            lis[0].style.display = "none";
            lis[1].style.display = "none";
        });

        lis[1].addEventListener("mouseover", function () {
            lis[1].style.backgroundColor = "rgb(255, 255, 255, 0.74)";
            lis[1].children[0].src = "../assets_v1/images/kC.png";
        });
        lis[1].addEventListener("mouseleave", function () {
            lis[1].style.backgroundColor = "rgb(0, 0, 0, 0.24)";
            lis[1].children[0].src = "../assets_v1/images/kR.png";
        });
    }
    // 滚动
    var arrowL = $(".person-top ul li");
    var count = 1;
    arrowL[1].addEventListener("click", function () {
        if (Number(arrowL.length) - count == 10) {
            return;
        }
        count++;
        arrowL[count].style.display = "none";
        console.log(count);
    });
    arrowL[0].addEventListener("click", function () {
        if (count == 1) {
            return;
        }
        arrowL[count].style.display = "flex";
        count--;
    });

    // 总颜色控制
    // var lis1 = $(".box-content .time-color ul li");
    // for (var li = 0; li < lis1.length; li++) {
    //   if (lis1[li].innerText == "休假") {
    //     lis1[li].children[0].style.backgroundColor = "#ccf4ea";
    //   } else if (lis1[li].innerText == "课程计划") {
    //     lis1[li].children[0].style.backgroundColor = "#E8E7FF";
    //   } else if (lis1[li].innerText == "考试计划") {
    //     lis1[li].children[0].style.backgroundColor = "#FFD7D7";
    //   } else if (lis1[li].innerText == "选课计划") {
    //     lis1[li].children[0].style.backgroundColor = "#FFE2CC";
    //   }
    // }


    //   课表周次的点击样式
    var ths = $(".content-left .time-table table th");
    for (var a = 1; a < ths.length; a++) {
        ths[a].addEventListener(
            "click",
            function (e) {
                for (var b = 1; b < ths.length; b++) {
                    ths[b].children[0].setAttribute("class", "");
                }
                e.currentTarget.children[0].classList.add("onClick");
                e.preventDefault();
                e.stopPropagation();
            },
            true
        );
    }

    // 课表颜色控制
    var boxs = $(".content-left .time-table table tr td .box");
    for (var box = 0; box < boxs.length; box++) {
        if (boxs[box].children[0].innerText == "马克思主义基本原理") {
            boxs[box].style.backgroundColor = "#FFB8B8";
        } else if (boxs[box].children[0].innerText == "软件开发") {
            boxs[box].style.backgroundColor = "#FFD9B3";
        } else if (boxs[box].children[0].innerText == "大学英语") {
            boxs[box].style.backgroundColor = "#BEEEF3";
        } else if (boxs[box].children[0].innerText == "政治经济学原理") {
            boxs[box].style.backgroundColor = "#F5B4FF";
        } else if (boxs[box].children[0].innerText == "高等数学") {
            boxs[box].style.backgroundColor = "#C8C4FF";
        }
    }

    // 课表的合并
    var tds = $(".content-left .time-table table tr td");
    for (var c = 0; c < tds.length; c++) {
        if (
            !!tds[c].children[0] &&
            !!tds[c].children[0].children[0] &&
            tds[c].children[0].children[0].innerText == "高等数学"
        ) {
            if (
                !!tds[c + 8].children[0] &&
                !!tds[c + 8].children[0].children[0] &&
                tds[c + 8].children[0].children[0].innerText == "高等数学"
            ) {
                tds[c].setAttribute("rowspan", "2");
                tds[c].style.height = "16.6rem";
                tds[c + 8].style.display = "none";
            }
        }
    }
})(this);

// 课表
layui.use("element", function () {
    var $ = layui.jquery,
        element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    $(".site-demo-active").on("click", function () {
        var othis = $(this),
            type = othis.data("type");
        active[type] ? active[type].call(this, othis) : "";
    });
});


// 课表弹窗
// var itemBox = document.getElementsByClassName("item-box")[0];
// itemBox.parentElement.addEventListener("mouseover", function () {
//   itemBox.style.display = "flex";
// });
// itemBox.addEventListener("mouseleave", function (g) {
//   itemBox.style.display = "none";
// });

// 模拟下拉框
console.log()
$('.xuanze').click(function (e) {
    console.log(456)
    $("#selext").trigger("mousedown");
    // console.log(e.currentTarget.children[1].click())
})
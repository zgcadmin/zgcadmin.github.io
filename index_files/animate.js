var timer =null
var isDrag=null
var targetTag=null
var copyTargetTag=null
var startLeft = 0
$('.tags').on('dragstart',(e)=>{
    e.preventDefault()
})
$('.tags').on('mousedown',' .tag + .tag',(e)=>{
    // 选中该标签
    showTag(e.currentTarget.dataset.code,e.currentTarget.dataset.sjcode,e.currentTarget)
    // 拖动事件
     timer = setTimeout(()=>{
         // 标记为拖动事件
         isDrag=true
         // 复制拖动标签
         copyTargetTag= $(e.currentTarget).clone(true)
         // 隐藏拖动标签
         targetTag=$(e.currentTarget)
         targetTag.css('visibility','hidden')

         // 放置在父元素中
         copyTargetTag.addClass('move')
         targetTag.after(copyTargetTag)

         // 绑定移动事件
         $('.tagview').on('mousemove',tagMove)

         // 记录初始位置
         startLeft = e.clientX

     },200)
})

function tagMove(moveEvent){
    // 标签移动计算距离
    var position = $('#tags')[0].getBoundingClientRect()
    var moveX = moveEvent.clientX - position.left - 50 + 'px'
    copyTargetTag.css('left', moveX)
    
    // 标签移动效果
    var srcTarget = null
    if(startLeft - moveEvent.clientX>0){
        // 左移动
        srcTarget = targetTag.prev()
        if(srcTarget.length>0&&srcTarget.text().trim()!='个人中心'){
            var srcPosition = srcTarget[0].getBoundingClientRect()
            if(moveEvent.clientX - 50 - srcPosition.left < Math.ceil(srcPosition.width/2)){
                srcTarget.before(targetTag)
                // 记录初始位置
                startLeft = moveEvent.clientX
            }
        }
    }else{
        srcTarget = targetTag.next()
        if(srcTarget.length>0){
            // 右移动
            var srcPosition = srcTarget[0].getBoundingClientRect()
            if(moveEvent.clientX - 50 + srcTarget.outerWidth() - srcPosition.left  > Math.ceil(srcPosition.width/2)){
                srcTarget.after(targetTag)
                // 记录初始位置
                startLeft = moveEvent.clientX
            }
        }        
    }

    if($(moveEvent.target).hasClass('arrow-right')){
        var scrollWidth = $(".tags-wrap")[0].scrollWidth;
        var width = $(".tags-wrap").outerWidth();
        var leftwidth = $(".tags").css("margin-left").replace("px", "");
        if (scrollWidth > width + 100) {
            $(".tags").css("margin-left", leftwidth - 200 + "px");
        }
    }
    if($(moveEvent.target).hasClass('arrow-left')){
        var scrollWidth = $(".tags-wrap")[0].scrollWidth;
        var width = $(".tags-wrap").outerWidth();
        var leftwidth = Number($(".tags").css("margin-left").replace("px", ""));
        if (Math.abs(leftwidth)>200) {
            $(".tags").css("margin-left", leftwidth + 200 + "px");
        }else{
            $(".tags").css("margin-left", "0px");
        }
    }
    
}

$('.tagview').on('mouseup',(e)=>{
    // 初始化
    clearTimeout(timer)
    if(targetTag&&copyTargetTag){
        targetTag.removeAttr('style')
        copyTargetTag.remove()
    }
    $('.tagview').off('mousemove')
    isDrag=false
})

$('html').on('mouseup',document,(e)=>{
    // 初始化
    clearTimeout(timer)
    if(targetTag&&copyTargetTag){
        targetTag.removeAttr('style')
        copyTargetTag.remove()
    }
    $('.tagview').off('mousemove')
    isDrag=false
})
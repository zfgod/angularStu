/**
 * Created by Administrator on 2016/9/1.
 */
var ycui = {};
ycui.alert=function(option){
    option={
        title:option.title||'提示框',
        content:option.content||'',
        ok:option.ok||'确定',
        okclick:option.okclick,
        render:option.render,
        timeout:option.timeout||-1
    };
    var id = 'bg'+new Date().getTime();
    var bg=$('<div data-bg="'+ id +'" class="dialog-bg" style="display:none"></div>'),
        wraper=$('<div id="'+ id +'" class="dialog-wraper"></div>'),
        title=$('<div class="dialog-title">'+option.title+'<i class="dialog-close yc-icon">&#xe614;</i></div>'),
        con=$('<div class="dialog-con">'+option.content+'</div>'),
        sub=$('<div class="dialog-submit"><a href="javascript:;" class="ok">'+option.ok+'</a></div>'),
        setTimeoutFun;
    wraper.append(title).append(con).append(sub).appendTo(bg),bg.appendTo(document.body),bg.fadeIn(300);
    title.find('i').on('click',function(){
        bg.fadeOut().remove();
        if(typeof option.okclick==='function'){
            option.okclick();
        }
    });
    sub.find('a.ok').on('click',function(){
        bg.fadeOut().remove();
        if(typeof option.okclick==='function'){
            setTimeoutFun && clearInterval(setTimeoutFun);
            option.okclick();
        }
    });

    $('div[data-bg="'+ id +'"]').bind('click', function (event) {
        if(event.target == $(this)[0]){
            bg.fadeOut('fast',function(){
                bg.remove();
                if(typeof option.okclick==='function'){
                    setTimeoutFun && clearInterval(setTimeoutFun);
                    option.okclick();
                }
            })
        }
    });
    setTimeout(function(){
        wraper.css({marginLeft:-wraper.outerWidth()/2,marginTop:-wraper.outerHeight()/2})
    },65);
    option.render&&option.render(wraper),option.timeout!=-1&&(setTimeoutFun = setTimeout(function(){
        bg.fadeOut('fast',function(){
            bg.remove();
            if(typeof option.okclick==='function'){
                option.okclick();
            }
        })
    },option.timeout*1e3))
};

window.ycui = ycui;
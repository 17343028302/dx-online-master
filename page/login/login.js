layui.config({
    base : "../../js/"
}).extend({
    "httpUtil" : "httpUtil"
})
layui.use(['jquery','form','layer','httpUtil'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;
      let httpUtil = layui.httpUtil;

    $(".loginBody .seraph").click(function(){
        layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧",{
            time:5000
        });
    })

    //获取验证码倒计时
    var time = function(dom,t){
        if (t == 0) {
            $(dom).attr("disabled",false);
            $(dom).text("获取验证码");
            $(dom).css("background-color","rgb(0, 150, 136)");
            t = 60;
        } else {
            $(dom).attr("disabled", true);
            $(dom).text("重新获取("+t+"s)");
            $(dom).css("background-color","#D5D5D5");
            t--;
            setTimeout(function() {
                time(dom,t);
            },1000);
        }
    }

    var createToken = function(callback){
        let obj = {};
        var sign = httpUtil.parseParams(obj);
        obj.sign = sign;
        console.log(obj);
        $.ajax({
            url: "/api/user/erp/token/create",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded',
            async: true,
            data: obj,
            dataType:"json",
            success: function (data) {
                callback(data);
            },error:function(jqXHR){
                console.log("发生错误："+jqXHR.status+"-"+jqXHR.message);
            }
        });
    }

    //获取验证码
    $("#getCode").click(function () {
        var phone = $("#phone").val();
        if(phone == null || phone == '' || phone == 'undifined'){
            layer.msg("请填写手机号！",{
                time:2000
            });
            return false;
        }
        console.log(layui.cache.dxurl);
        time($(this),60);
        createToken(function (data) {
            if(data.status != 0){
                console.log(data.status+"--"+data.msg);
                layer.msg("系统错误，获取验证码失败！",{
                    time:2000
                });
                return false;
            }
            var phone  = $("#phone").val();
            let obj = {
                phone:phone,
                token:data.data
            };
            var sign = httpUtil.parseParams(obj);
            obj.sign = sign;
            console.log(obj);
            $.ajax({
                url: "https://qa-api.dxzaixian.com/user/erp/sms/sendCode",
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                data: obj,
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        console.log("成功了!!!status:"+data.status+"msg:"+data.msg+"data"+data.data);
                        window.sessionStorage.setItem('dxToken',data.data);
                        layer.msg("发送成功！",{
                            time:2000
                        });
                    } else {
                        console.log("失败了!!!status:"+data.status+"msg:"+data.msg+"data"+data.data);
                        layer.msg("发送失败！",{
                            time:2000
                        });
                    }
                },error:function(jqXHR){
                    console.log("发生错误："+jqXHR.status+"-"+jqXHR.message);
                }
            });
        })
    });

    //登录按钮
    form.on("submit(login)",function(data){
        $(this).text("登录中...").attr("disabled","disabled").addClass("layui-disabled");
        var token = window.sessionStorage.getItem("dxToken");
        if(!token){
            layer.msg("系统错误！",{
                time:2000
            });
            return false;
        }
        let obj = {
            phone:$("#phone").val(),
            code:$("#code").val(),
            token:token
        };
        var sign = httpUtil.parseParams(obj);
        obj.sign = sign;
        console.log(obj);
        $.ajax({
            url: "https://qa-api.dxzaixian.com/user/erp/user/login",
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: obj,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    console.log("成功了!!!code:"+data.code+"message:"+data.message+"body"+data.body);
                    setTimeout(function(){
                        window.location.href = "/dx-online-master/index.html";
                    },1000);
                    return false;
                } else {
                    console.log("失败了!!!code:"+data.code+"message:"+data.message+"body"+data.body);
                }
            },error:function(jqXHR){
                console.log("发生错误："+jqXHR.status+"-"+jqXHR.message);
            }
        });
    })

    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})

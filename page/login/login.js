layui.config({
    base: "../../js/"
}).extend({
    "httpUtil": "httpUtil"
})
layui.use(['jquery', 'form', 'layer', 'httpUtil'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
    $ = layui.jquery;
    var httpUtil = layui.httpUtil;

    $(".loginBody .seraph").click(function () {
        layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧", {
            time: 5000
        });
    })



    var createToken = function (callback) {
        httpUtil.get('/user/erp/token/create', {}).then(res => {
            if(res.status==0){
                window.localStorage.setItem('dxToken', res.data);
                callback(res.data);
            }else{
                console.log("接口响应，code:"+res.status+",message:"+res.message);
                layer.msg(res.message, {
                    icon: 2,
                    time: 2000
                });
                return false;
            }
        }).catch(error => {
            console.log(error)
        })
    }

    //获取验证码
    $("#getCode").click(function () {
        var phone = $("#phone").val();
        if (phone == null || phone == '' || phone == 'undifined') {
            $("#phone").parent().addClass("layui-input-focus");
            return false;
        }
        if(!/^[1][0-9][0-9]{9}$/.test(phone)){
            $("#phone").parent().addClass("layui-input-focus");
            layer.msg("请输入正确的手机号", {
                icon: 5,
                time: 2000
            });
            return false;
        }
        time($(this), 60);
        createToken(function (token) {
            var phone = $("#phone").val();
            let obj = {
                phone: phone,
                token: token
            };
            httpUtil.post('/user/erp/sms/sendCode', obj).then(res => {
                if(res.status==0){
                    layer.msg("发送成功！", {
                        icon: 1,
                        time: 2000
                    });
                }else{
                    console.log("接口响应，code:"+res.status+",message:"+res.message);
                    layer.msg(res.message, {
                        icon: 2,
                        time: 2000
                    });
                    return false;
                }
            }).catch(error => {
                console.log(error)
            })
        })
    });

    //登录按钮
    form.on("submit(login)", function (data) {
        $(this).text("登录中...").attr("disabled", "disabled").addClass("layui-disabled");
        var token = window.localStorage.getItem("dxToken");
        if (!token) {
            layer.msg("系统错误，请稍后再试！", {
                icon: 2,
                time: 2000
            });
            return false;
        }
        let obj = {
            phone: $("#phone").val(),
            code: $("#code").val(),
            token: token
        };
        httpUtil.post('/user/erp/user/login', obj).then(res => {
            if(res.status==0){
                setTimeout(function () {
                    window.location.href = "/dx-online-master/index.html";
                }, 1000);
            }else{
                console.log("接口响应，code:"+res.status+",message:"+res.message);
                layer.msg(res.message, {
                    icon: 2,
                    time: 2000
                });
                return false;
            }
        }).catch(error => {
            console.log(error)
        })
    })

    //表单输入效果
    $(".loginBody .input-item").click(function (e) {
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function () {
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function () {
        $(this).parent().removeClass("layui-input-focus");
        if ($(this).val() != '') {
            $(this).parent().addClass("layui-input-active");
        } else {
            $(this).parent().removeClass("layui-input-active");
        }
    })

    //获取验证码倒计时
    var time = function (dom, t) {
        if (t == 0) {
            $(dom).attr("disabled", false);
            $(dom).text("获取验证码");
            $(dom).css("background-color", "rgb(0, 150, 136)");
            t = 60;
        } else {
            $(dom).attr("disabled", true);
            $(dom).text("重新获取(" + t + "s)");
            $(dom).css("background-color", "#D5D5D5");
            t--;
            setTimeout(function () {
                time(dom, t);
            }, 1000);
        }
    }
})

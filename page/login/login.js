layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;

    $(".loginBody .seraph").click(function(){
        layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧",{
            time:5000
        });
    })

    //获取验证码
    $("#getCode").click(function () {
        $.ajax({
            type: 'POST',
            url: "",
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",
            data: {},
            success: function (data) {
                if (data.code === 200) {
                    console.log("成功了!!!code:"+data.code+"message:"+data.message+"body"+data.body);
                } else {
                    console.log("失败了!!!code:"+data.code+"message:"+data.message+"body"+data.body);
                }
            }
        });
    });

    //登录按钮
    form.on("submit(login)",function(data){
        $(this).text("登录中...").attr("disabled","disabled").addClass("layui-disabled");
        var username = $("#userName").val();
        var code = $("#code").val();
        console.log(username+"--"+code);
        setTimeout(function(){
            window.location.href = "/dx-online-master/index.html";
        },1000);
        return false;
        /*$.ajax({
            type: 'POST',
            url: "http://192.168.160.136:8081/login/newLogin",
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("platform", 2).setRequestHeader("uuid","321321321");
            },
            data: {
                type:2,
                acount:username,
                password:password
            },
            success: function (data) {
                if (data.code === 200) {
                    console.log("成功了!!!code:"+data.code+"message:"+data.message+"body"+data.body);
                } else {
                    console.log("失败了!!!code:"+data.code+"message:"+data.message+"body"+data.body);
                }
            }
        });*/
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

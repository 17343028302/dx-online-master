layui.config({
    base: "../../js/"
}).extend({
    "httpUtil": "httpUtil",
    "constants": "constants"
})
layui.use(['jquery','form','httpUtil'], function () {
    var form = layui.form,
        $ = layui.jquery,
        httpUtil = layui.httpUtil,
        constants = layui.constants;

    //计算剩余退还金额
    $('#deductFee').blur(function () {
        var pledge = $("#pledge").text();
        var deductFee = $("#deductFee").val();
        var result = parseFloat(pledge - deductFee).toFixed(2);
        $("#result").text(result);
    });

    //监听提交
    form.on("submit(backDeposit)",function(data){
        layer.confirm('请确认是否已经完成线下打款，如已完成打款，请点击确认退还按钮。',{btn: ['确认退还', '取消'],title:"提示"}, function(){
            //弹出loading
            var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
            let obj = {
                id: $("#id").val(),
                money: $("#result").text()
            };
            httpUtil.post(constants.backDepositApi, obj).then(res => {
                if(res.status==0){
                    top.layer.close(index);
                    top.layer.msg("退押金成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
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
        });
    })

});

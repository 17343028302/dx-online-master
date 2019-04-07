layui.config({
    base: "../../js/"
}).extend({
    "httpUtil": "httpUtil",
    "constants": "constants",
    "stringUtils": "stringUtils"
})
layui.use(['jquery','form','laydate','httpUtil','constants','stringUtils'], function () {
    var form = layui.form,
        $ = layui.jquery,
        laydate = layui.laydate,
        httpUtil = layui.httpUtil,
        constants = layui.constants,
        stringUtils = layui.stringUtils;

    //执行一个laydate实例
    laydate.render({
        elem: '#addTime',
        type: 'datetime'
    });

    //监听提交
    form.on("submit(addPreCharge)",function(data){
        layer.confirm('请确认添加收款记录。',{btn: ['确认添加', '取消'],title:"信息确认"}, function(){
            //弹出loading
            var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
            let obj = {
                payer: $("#payer").val(),
                payAccount: $("#payAccount").val(),
                bank: $("#bank").val(),
                money: $("#money").val(),
                addTime: stringUtils.timeToStamp($("#addTime").val()),
                walletType: $("#walletType").val()
            };
            httpUtil.post(constants.addPreChargeApi, obj).then(res => {
                if(res.status==0){
                    top.layer.close(index);
                    top.layer.msg("添加收款记录成功！");
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

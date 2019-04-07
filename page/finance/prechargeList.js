layui.config({
    base: "../../js/"
}).extend({
    "httpUtil": "httpUtil",
    "constants": "constants",
    "stringUtils": "stringUtils"
})
layui.use(['jquery','table', 'laydate', 'layer', 'form', 'httpUtil','constants','stringUtils'], function () {
    var table = layui.table,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        form = layui.form;
        httpUtil = layui.httpUtil,
        constants = layui.constants,
        stringUtils = layui.stringUtils;

    //执行一个laydate实例
    laydate.render({
        elem: '#receivablesTime',
        type: 'datetime',
        range: '~' //或 range: '~' 来自定义分割字符
    });

    //渲染表格
    table.render({
        elem: '#prechargeList',
        url: constants.prechargeListApi,
        global:true,
        method:'GET',
        request:{
            limitName:'pageSize'
        },
        response:{
            statusName:'status',
            statusCode:0,
            msgName:'msg',
            countName:'data.total',
            dataName:'data.items'
        },
        where:{
        },
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 30,
        limits: [30, 50, 100, 200],
        id: "prechargeListTable",
        cols: [[
            {field: 'id', title: '收款编号', width: '13%', align: "center"},
            {field: 'addTime', title: '收款时间', width: '13%', align: "center",templet:function(d){
                    return stringUtils.stampToTime(d.addTime);
                }},
            {field: 'money', title: '收款金额', width: '8%', align: 'center'},
            {field: 'walletType', title: '充值类型', align: 'center', width: '8%',templet:function(d){
                    if(d.status==1){
                        return '预充值';
                    }else{
                        return '押金';
                    }
                }},
            {field: 'payer', title: '付款人', align: 'center', width: '12%'},
            {field: 'payAccount', title: '付款账户', align: 'center', width: '13%'},
            {field: 'bank', title: '开户行', align: 'center', width: '13%'},
            {field: 'operatorName', title: '操作人', align: 'center', templet: "#status", width: '12%'},
            {field: 'updateTime', title: '分配时间', align: 'center', templet: "#type", width: '13%',templet:function(d){
                    return stringUtils.stampToTime(d.updateTime);
                }},
            {field: 'status', title: '分配状态', align: 'center', templet: "#type", width: '6%',templet:function(d){
                    if(d.status==0){
                        return '未分配';
                    }else{
                        return '已分配';
                    }
                }},
            {title: '操作', width: '8%', templet: '#prechargeListBar', fixed: "right", align: "center"}
        ]]
    });

    //搜索【此功能需要后台配合】
    $(".search_btn").on("click", function () {
        var time = $("#payTime").val();
        var payer = $("#payer").val();
        var payAccount = $("#payAccount").val();
        if(stringUtils.isNotBlank(time,payer,payAccount)){
            var beginTime;
            var endTime;
            if(stringUtils.isNotBlank(time)){
                var times = time.split("~");
                beginTime = times[0];
                endTime = time[1];
            }
            table.reload("depositListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    payer:payer,
                    payAccount:payAccount
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    //添加收款记录
    $("#addPreCharge").on('click',function () {
        var index = layui.layer.open({
            title : "添加收款记录",
            type : 2,
            area: ["500px", "450px"],
            content : "addPreCharge.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                setTimeout(function(){
                    layui.layer.tips('点击此处返回预充值账户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
    });

    //列表操作栏
    table.on('tool(prechargeList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'allotToUser'){ //分配给用户
            allotToUser(data);
        }
    });

    //分配给用户
    function allotToUser(data){
        var index = layui.layer.open({
            title : "分配给用户",
            type : 2,
            area: ["500px", "350px"],
            content : "allotToUser.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);

                setTimeout(function(){
                    layui.layer.tips('点击此处返回押金列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
    }

})

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
        elem: '#payTime',
        type: 'datetime',
        range: '~' //或 range: '~' 来自定义分割字符
    });
    //渲染表格
    table.render({
        elem: '#depositList',
        url: constants.deposetListApi,
        global:true,
        method:'get',
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
            sort: "addTime,desc"
        },
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 30,
        limits: [30, 50, 100, 200],
        id: "depositListTable",
        cols: [[
            {field: 'id', title: '押金订单号', width: '10%', align: "center"},
            {field: 'name', title: '交押金人', width: '10%', align: "center"},
            {field: 'phone', title: '联系电话', width: '10%', align: 'center'},
            {field: 'addTime', title: '缴纳时间', align: 'center', width: '15%',templet:function(d){
                return stringUtils.stampToTime(d.addTime);
            }},
            {field: 'pledge', title: '缴纳金额', align: 'center', width: '10%'},
            {field: 'refundPledge', title: '实际退还金额', align: 'center', width: '10%'},
            {field: 'refundTime', title: '退还时间', align: 'center', width: '10%'},
            {field: 'status', title: '押金状态', align: 'center', templet: "#status", width: '8%'},
            {field: 'type', title: '押金来源类型', align: 'center', templet: "#type", width: '8%'},
            {title: '操作', width: '15%', templet: '#depositListBar', fixed: "right", align: "center"}
        ]]
    });

    //搜索【此功能需要后台配合】
    $(".search_btn").on("click", function () {
        var arr = new Array();
        $("input:checkbox[name='status']:checked").each(function(i){
            arr[i] = $(this).val();
        });
        var time = $("#payTime").val();
        var id = $("#id").val();
        var phone = $("#phone").val();
        if(stringUtils.isNotBlank(time,id,phone) || arr.length>0){
            var beginTime;
            var endTime;
            if(stringUtils.isNotBlank(time)){
                var times = time.split("~");
                beginTime = times[0];
                endTime = time[1];
            }
            var statusList = arr.join(",");
            table.reload("depositListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    phone:phone,
                    id:id,
                    statusList:statusList,
                    sort: "addTime,desc"
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    //列表操作栏
    table.on('tool(depositList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addUser(data);
        }else if(layEvent === 'backDeposit'){ //退还押金
            backDeposit(data);
        }
    });

    //退还押金
    function backDeposit(data){
        var index = layui.layer.open({
            title : "押金退还信息",
            type : 2,
            area: ["500px", "350px"],
            content : "backDeposit.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(data){
                    body.find("#id").val(data.id);
                    body.find("#pledge").text(data.pledge);
                    body.find("#result").text(data.pledge);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回押金列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
    }

})

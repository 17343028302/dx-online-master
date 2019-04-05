layui.use(['table', 'laydate'], function () {
    var table = layui.table,
        laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#payTime',
        type: 'datetime',
        range: '~' //或 range: '~' 来自定义分割字符
    });

    //系统日志
    table.render({
        elem: '#depositList',
        url: 'http://dongximgr.zhuzhida.vip/api/account/erp/pledge/list',
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
            token:localStorage.getItem('dxToken')
        },
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 30,
        limits: [30, 50, 100, 200],
        id: "systemLog",
        cols: [[
            {field: 'id', title: '押金订单号', width: '5%', align: "center"},
            {field: 'name', title: '交押金人', width: '10%', align: "center"},
            {field: 'phone', title: '联系电话', width: '10%', align: 'center'},
            {field: 'addTime', title: '缴纳时间', align: 'center', width: '10%'},
            {field: 'pledge', title: '缴纳金额', align: 'center', width: '10%'},
            {field: 'refundPledge', title: '实际退还金额', align: 'center', width: '10%'},
            {field: 'refundTime', title: '退还时间', align: 'center', width: '10%'},
            {field: 'status', title: '押金状态', align: 'center', templet: "#status", width: '8%'},
            {field: 'type', title: '押金来源类型', align: 'center', templet: "#type", width: '8%'},
            {title: '操作', width: '15%', templet: '#depositListBar', fixed: "right", align: "center"}
        ]]
    });

})

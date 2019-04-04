layui.use(['table', 'laydate'], function () {
    var table = layui.table,
        laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#orderTime',
        type: 'datetime',
        range: '~' //或 range: '~' 来自定义分割字符
    });

    //系统日志
    table.render({
        elem: '#orderList',
        url: '../../json/logs.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "systemLog",
        cols: [[
            {field: 'orderId', title: '申请订单号', width: '10%', align: "center"},
            {field: 'hasCar', title: '申请人', width: '6%'},
            {
                field: 'driverTel', title: '联系电话', width: '10%', align: 'center', templet: function (d) {
                    if (d.driverTel.toUpperCase() == "GET") {
                        return '<span class="layui-blue">' + d.driverTel + '</span>'
                    } else {
                        return '<span class="layui-red">' + d.driverTel + '</span>'
                    }
                }
            },
            {field: 'leaseTel', title: '申请时间', align: 'center', width: '10%'},
            {
                field: 'orderFee', title: '发票金额', align: 'center', width: '6%', templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.orderFee + '</span>'
                }
            },
            {
                field: 'delayFee', title: '发票类型', align: 'center', width: '10%', templet: function (d) {
                    if (d.delayFee == "正常") {
                        return '<span class="layui-btn layui-btn-green layui-btn-xs">' + d.delayFee + '</span>'
                    } else {
                        return '<span class="layui-btn layui-btn-danger layui-btn-xs">' + d.delayFee + '</span>'
                    }
                }
            },
            {
                field: 'pickCode', title: '预留邮箱', align: 'center', width: '6%', templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.pickCode + '</span>'
                }
            },
            {
                field: 'applyTime', title: '发票邮寄地址', align: 'center', width: '10%', templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.applyTime + '</span>'
                }
            },
            {
                field: 'applyTime', title: '快递单号', align: 'center', width: '10%', templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.applyTime + '</span>'
                }
            },
            {
                field: 'applyTime', title: '开具状态', align: 'center', width: '8%', templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.applyTime + '</span>'
                }
            },
            {title: '操作', width: '15%', templet: '#orderListBar', fixed: "right", align: "center"}
        ]]
    });

})

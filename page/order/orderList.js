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
        height: "full-20",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "systemLog",
        cols: [[
            {field: 'orderId', title: '订单号', width: 150, align: "center"},
            {field: 'hasCar', title: '已分配车辆', width: 130},
            {
                field: 'driverTel', title: '已分配司机联系方式', width: 150, align: 'center', templet: function (d) {
                    if (d.driverTel.toUpperCase() == "GET") {
                        return '<span class="layui-blue">' + d.driverTel + '</span>'
                    } else {
                        return '<span class="layui-red">' + d.driverTel + '</span>'
                    }
                }
            },
            {field: 'leaseTel', title: '租车人联系电话', align: 'center',  width: 150},
            {
                field: 'orderFee', title: '订单金额', align: 'center', width: 120, templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.orderFee + '</span>'
                }
            },
            {
                field: 'delayFee', title: '延时费用', align: 'center', width: 120, templet: function (d) {
                    if (d.delayFee == "正常") {
                        return '<span class="layui-btn layui-btn-green layui-btn-xs">' + d.delayFee + '</span>'
                    } else {
                        return '<span class="layui-btn layui-btn-danger layui-btn-xs">' + d.delayFee + '</span>'
                    }
                }
            },
            {
                field: 'pickCode', title: '取车码', align: 'center', width: 130, templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.pickCode + '</span>'
                }
            },
            {
                field: 'applyTime', title: '用车时间', align: 'center', width: 150, templet: function (d) {
                    return '<span class="layui-btn layui-btn-normal layui-btn-xs">' + d.applyTime + '</span>'
                }
            },
            {title: '操作', width:150, templet:'#orderListBar',fixed:"right",align:"center"}
        ]]
    });

})

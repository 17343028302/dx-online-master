layui.define(["form", "jquery"], function (exports) {
    var form = layui.form,
        $ = layui.jquery;
    var config = {
        baseUrl: 'http://dongximgr.zhuzhida.vip/api'
    }
    var api = {
        baseUrl:`${config.baseUrl}`,
        deposetListApi: `${config.baseUrl}`+ '/account/erp/pledge/list',
        backDepositApi: `${config.baseUrl}`+ '/account/erp/pledge/refund',
        prechargeListApi: `${config.baseUrl}`+ '/account/erp/preCharge/list',
        addPreChargeApi: `${config.baseUrl}`+ '/account/erp/preCharge/add'
    }

    exports("constants",api);
})

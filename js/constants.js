layui.define(["form", "jquery"], function (exports) {
    var form = layui.form,
        $ = layui.jquery;
    var config = {
        baseUrl: 'http://dongximgr.zhuzhida.vip/api'
    }
    var api = {
        baseUrl:`${config.baseUrl}`,
        deposetListApi: `${config.baseUrl}`+ '/account/erp/pledge/list'
    }

    exports("constants",api);
})

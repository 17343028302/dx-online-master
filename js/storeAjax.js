layui.define(["jquery","httpUtil"], function (exports) {
    var httpUtil = layui.httpUtil;

    //门店
    var s = 'https://erpapi-qa.dxzaixian.com';
    var param = {
        token : "95d5603c75154cfa8fd4a0d779aed5e4"
    }
    var storeUrl = '/store/erp/store/search';

    var storeAjax =
        {
            getAllStoreAjax(callback){
                return getAllStoreAjax(callback);
            }
        }

    /**
     * 无参查询全部门店
     */
    function getAllStoreAjax(callback) {
        httpUtil.get(storeUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem("allStoreData",JSON.stringify(res.data.items));
                callback(res.data.items);

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
    }

    exports("storeAjax", storeAjax);
})
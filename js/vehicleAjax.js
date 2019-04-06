layui.define(["jquery","httpUtil"], function (exports) {
    var httpUtil = layui.httpUtil;

    //卡车选项请求 统一返回{"id":"","name":""}
    var s = 'https://erpapi-qa.dxzaixian.com';
    var param = {
        token : "95d5603c75154cfa8fd4a0d779aed5e4"
    }
    var vStatusUrl = '/truck/erp/truck/status';
    var vUseTypeUrl =  '/truck/erp/truck/usageMode';
    var vTypeUrl =  '/truck/erp/truck/type';
    var vBrandUrl = '/truck/erp/truck/brand';
    var vColorUrl =  '/truck/erp/truck/color';
    var vFuelUrl =  '/truck/erp/truck/fuel';

    var vehicleAjax =
        {
            vStatusAjax(callback){
                return vStatusAjax(callback);
            },
            vUseTypeAjax(callback){
                return vUseTypeAjax(callback);
            },
            vTypeAjax(callback){
                return vTypeAjax(callback);
            },
            vBrandAjax(callback){
                return vBrandAjax(callback);
            },
            vColorAjax(callback){
                return vColorAjax(callback);
            },
            vFuelAjax(callback){
                return vFuelAjax(callback);
            }
        }

    /**
     * 卡车状态 1待发布 2待租出 3已租出 4检修中
     */
    function vStatusAjax(callback) {
        httpUtil.get(vStatusUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem("vehicleStatusData",JSON.stringify(res.data));
                callback(res.data);

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

    /**
     * 卡车使用方式 1自购 2长期挂靠 3临时
     */
    function vUseTypeAjax(callback) {
        httpUtil.get(vUseTypeUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem('', res.data);
                //return 123;
                callback(res.data);

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

    /**
     * 卡车类型 1中型面包 2大型面包 ...
     */
    function vTypeAjax(callback) {
        httpUtil.get(vTypeUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem("vehicleTypeData",JSON.stringify(res.data));
                //return 123;
                callback(res.data);

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

    /**
     * 卡车品牌
     */
    function vBrandAjax(callback) {
        httpUtil.get(vBrandUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem("vehicleBrandData",JSON.stringify(res.data));
                callback(res.data);

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
    /**
     * 卡车颜色
     */
    function vColorAjax(callback) {
        httpUtil.get(vColorUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem('dxToken', res.data);
                //return 123;
                callback(res.data);

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
    /**
     * 卡车燃油型号
     */
    function vFuelAjax(callback) {
        httpUtil.get(vFuelUrl, param).then(res => {
            if(res.status==0){
                window.localStorage.setItem('dxToken', res.data);
                //return 123;
                callback(res.data);

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



    exports("vehicleAjax", vehicleAjax);
})
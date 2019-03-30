/**
 * 卡车选项请求 统一返回{"id":"","name":""}
 */
layui.define(function (exports) {

    var p = "3213";
    /**
     * 卡车状态 1待发布 2待租出 3已租出 4检修中
     */
    vStatus ={
        c : function () {
            alert(p);
        }
    }
    exports('vehicleOptionData',vStatus);

    /**
     * 卡车类型 1中型面包 2大型面包 ...
     */
    exports('vType',function () {

    });

    /**
     * 卡车品牌
     */
    exports('vBrand',function () {

    });

    /**
     * 卡车颜色
     */
    exports('vColor',function () {

    });

    /**
     * 卡车燃油型号
     */
    exports('vFuel',function () {

    });

    /**
     * 卡车使用方式 1自购 2长期挂靠 3临时
     */
    exports('vUseType',function () {

    });
})
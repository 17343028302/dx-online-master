layui.define(["jquery"], function (exports) {
    var $ = layui.jquery;

    /**
     * 使用说明：枚举数据已请求结束，并存入localstorage
     * 仅用于渲染table [{id:"",name:""},{id:"",name:""}]格式的后台数据
     * @param storageKey
     * @param col 数据列名
     * @returns {string} 返回每条数据id对应的name
     */
    var common = function (storageKey, col) {
        var s = "";
        var vtd = JSON.parse(localStorage.getItem(storageKey));
        var data = vtd == null ? "" : vtd;
        for (var i = 0; i < data.length; i++) {
            if (col == data[i].id) {
                s = data[i].name;
                break;
            }
        }
        return s;
    }

    exports("common", common);
})
layui.config({
    base: "../../js/"
}).extend({
   // "vehicleOptionData": "page/vehicle/vehicleOptionData"//此处keyvalue必须一致，也必须和
})
layui.use(['form','layer','table','laytpl','httpUtil','common','vehicleAjax','storeAjax'],function(){
    var form = layui.form,
        //layer = parent.layer === undefined ? layui.layer : top.layer,
        layer = layui.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var httpUtil = layui.httpUtil;
    var vehicleAjax = layui.vehicleAjax;
    var storeAjax = layui.storeAjax;

// 请求接口方法=============================最先请求枚举相关ajax=====================================
    vehicleAjax.vBrandAjax();
    vehicleAjax.vTypeAjax(function (data) {
        var vehicleTypeData = document.getElementById('vehicleTypeData');
        laytpl(vehicleTypeData.innerHTML).render(data, function(html){
            vehicleTypeData.innerHTML = html;
        });
        form.render();
    })

    vehicleAjax.vStatusAjax(function (data) {
        var vehicleTypeData = document.getElementById('vehicleStatusData');
        laytpl(vehicleTypeData.innerHTML).render(data, function(html){
            vehicleTypeData.innerHTML = html;
        });
        form.render();
    });

    storeAjax.getAllStoreAjax(function (data) {
        var storeData = document.getElementById('storeData');
        laytpl(storeData.innerHTML).render(data, function(html){
            storeData.innerHTML = html;
        });
        form.render();
    })

    storeAjax.getAllStoreAjax(function (data) {
        var releaseStoreData = document.getElementById('releaseStoreData');
        laytpl(releaseStoreData.innerHTML).render(data, function(html){
            releaseStoreData.innerHTML = html;
        });
        form.render();
    })
        /*httpUtil.get('/user/erp/token/create', {}).then(res => {
            if(res.status==0){
                window.localStorage.setItem('dxToken', res.data);
                var html =  '<select name="city" lay-verify="required"  > ';

                $.each(data.list,function (index,item) {
                    html += '<option value="0">'+item.modname+'</option>';
                })
                html += '</select>';
                document.getElementById("vehicleTypeData").innerHTML = html;

                //callback(res.data);

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
        })*/


    //车辆列表
    var tableIns = table.render({
        elem: '#vehicleList',//指定原始表格元素选择器（推荐id选择器）
        //url : '../../json/vehicleList.json',
        url: 'http://dongximgr.zhuzhida.vip/api/truck/erp/truck/search',
        method: 'GET',
        where: {token:"95d5603c75154cfa8fd4a0d779aed5e4"},
        response: {
            statusName: 'status'
            ,statusCode: 0
            ,msgName: 'msg'
            ,countName: 'data.total'
            ,dataName: 'data.items'
        },
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [30,50,100,150,200],
        limit : 20,
        id : "vehicleListTable",
        cols : [[
            {field: 'id', type: "checkbox", fixed:"left", width:50},
            {field: 'plateNo', title: '车牌号', minWidth:100, align:"center"},
            {field: 'typeId', title: '车辆类型', minWidth:200, align:'center',templet:function(d){
                return layui.common("vehicleTypeData",d.typeId);
            }},
            {field: 'brandId', title: '车辆品牌', align:'center',templet:function (d) {
                return layui.common("vehicleBrandData",d.brandId);
            }},
            {field: 'load', title: '载重',  align:'center'},
            {field: 'storeId', title: '所属门店', align:'center',templet:function(d){
                return layui.common("allStoreData",d.storeId);
            }},
            {field: 'storeId', title: '当前发布门店', align:'center',templet:function(d){
                if(d.storeId == 1){
                    return "北三环店";
                }else if(d.storeId == 2){
                    return "百子湾店";
                }else if(d.storeId == 3){
                    return "回龙观西店";
                }else return "";
            }},
            {field: 'status', title: '车辆状态', align:'center',templet:function(d){
                return layui.common("vehicleStatusData",d.status);
            }},
            {field: 'plateNo', title: '使用时间', align:'center'},
            {title: '操作',width:250,  templet:'#userListBar',fixed:"right",align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("vehicleListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });
    //批量发布弹窗
    $(".batchRelease").click(function(){
        var checkStatus = table.checkStatus('vehicleListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            layer.open({
                area: ['580px', '320px'],
                title: "批量发布",
                //closeBtn : false,
                type: 2,
                content: 'vehicleRelease.html'
            })
        }else {
            layer.msg("请选择需要发布的车辆",{time:1000});
        }
    });
    //批量发布确认
    $(".releaseConfirm").click(function(){
        var checkStatus = table.checkStatus('vehicleListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('是否确认将京H 34H5X  京E 67H5X 发布至门店 北京三元桥店?', {icon: 3, title:'是否确认发布',btn:['确认发布','取消'] }, function(index){
                //do something

                setTimeout(function () {
                    //关闭父级弹窗
                    parent.layer.close(index);
                    tableIns.reload();
                    layer.msg("发布成功")
                },500)
                return false;
            });
        }else {
            layer.msg("请选择需要发布的车辆",{time:1000});
        }
    });
    //批量取消发布
    $(".batchCancelRelease").click(function(){
        var checkStatus = table.checkStatus('vehicleListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('是否确认门店 北京三元桥店中的 京H 34H5X  京E 67H5X 取消发布?', {icon: 3, title:'是否取消发布',btn:['确认取消发布','取消'] }, function(index){
                //do something

                setTimeout(function () {
                    layer.close(index);
                    tableIns.reload();
                    //msg 第2参数指定icon 延迟时间等选项
                    layer.msg("取消发布成功")
                },500)
               return false;
            });
        }else {
            layer.msg("请选择取消发布的车辆",{time:1000});
        }
    });
    //批量删除
    $(".batchDel").click(function(){
        var checkStatus = table.checkStatus('vehicleListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('是否确认删除 京H 34H5X  京E 67H5X 的相关车辆信息?删除后如需重新使用，需要重新添加车辆。', {
                icon: 3,
                title: '是否批量删除',
                btn: ['确认删除', '取消']
            }, function (index) {
                //do something

                setTimeout(function () {
                    layer.close(index);
                    tableIns.reload();
                    layer.msg("删除成功")
                }, 500)
                return false;
            });
        }else {
            layer.msg("请选择需要删除的车辆",{time:1000});
        }
    });
    //添加新车
    $(".addVehicle_btn").click(function(){
        addVehicle();
    })
    function addVehicle(edit){
        var index = layer.open({
            title : "添加新车",
            type : 2,
            content : "vehicleAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".userName").val(edit.userName);  //登录名
                    body.find(".userEmail").val(edit.userEmail);  //邮箱
                    body.find(".userSex input[value="+edit.userSex+"]").prop("checked","checked");  //性别
                    body.find(".userGrade").val(edit.userGrade);  //会员等级
                    body.find(".userStatus").val(edit.userStatus);    //用户状态
                    body.find(".userDesc").text(edit.userDesc);    //用户简介
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        /*layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })*/
    }
    //列表操作
    table.on('tool(userList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addUser(data);
        }else if(layEvent === 'usable'){ //启用禁用
            var _this = $(this),
                usableText = "是否确定禁用此用户？",
                btnText = "已禁用";
            if(_this.text()=="已禁用"){
                usableText = "是否确定启用此用户？",
                btnText = "已启用";
            }
            layer.confirm(usableText,{
                icon: 3,
                title:'系统提示',
                cancel : function(index){
                    layer.close(index);
                }
            },function(index){
                _this.text(btnText);
                layer.close(index);
            },function(index){
                layer.close(index);
            });
        }else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        }
    });


})

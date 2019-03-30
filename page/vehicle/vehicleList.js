layui.config({
    base : ""
}).extend({

})
layui.use(['form','layer','table','laytpl','vehicleOptionData'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table,
        vStatus = layui.vehicleOptionData;



    //车辆列表
    var tableIns = table.render({
        elem: '#vehicleList',//指定原始表格元素选择器（推荐id选择器）
        url : '../../json/vehicleList.json',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [30,50,100,150,200],
        limit : 20,
        id : "vehicleListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'userName', title: '车牌号', minWidth:100, align:"center"},
            {field: 'userEmail', title: '车辆类型', minWidth:200, align:'center',templet:function(d){
                return '<a class="layui-blue" href="mailto:'+d.userEmail+'">'+d.userEmail+'</a>';
            }},
            {field: 'userSex', title: '车辆品牌', align:'center'},
            {field: 'userStatus', title: '载重',  align:'center',templet:function(d){
                return d.userStatus == "0" ? "正常使用" : "限制使用";
            }},
            {field: 'userGrade', title: '所属门店', align:'center',templet:function(d){
                if(d.userGrade == "0"){
                    return "注册会员";
                }else if(d.userGrade == "1"){
                    return "中级会员";
                }else if(d.userGrade == "2"){
                    return "高级会员";
                }else if(d.userGrade == "3"){
                    return "钻石会员";
                }else if(d.userGrade == "4"){
                    return "超级会员";
                }
            }},
            {field: 'userSex', title: '当前发布门店', align:'center'},
            {field: 'userSex', title: '车辆状态', align:'center'},
            {field: 'userEndTime', title: '使用时间', align:'center'},
            {title: '操作',width:250,  templet:'#userListBar',fixed:"right",align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("newsListTable",{
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

    $(".batchRelease").click(function(){
        layui.open({
            title :"批量发布",
            type : 2,
        })
    })

    //添加用户
    function addvehicle(edit){
        var index = layui.layer.open({
            title : "批量发布",
            type : 2,
            content : "vehicleRelease.html",
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
        layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        }else{
            layer.msg("请选择需要删除的用户");
        }
    })

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

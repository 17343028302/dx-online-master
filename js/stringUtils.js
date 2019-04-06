layui.define(["form", "jquery"], function (exports) {
    var form = layui.form,
        $ = layui.jquery;

    var util = {
        timeToStamp(time){
            return timeToTimeStamp(time);
        },
        stampToTime(timestamp){
            return timestampToTime(timestamp);
        },
        isNotBlank(){
            return isNotBlank();
        }
    }

    //时间转时间戳
    function timeToTimeStamp(time){
        if(!time.indexOf('/')){
            time = time.substring(0,4)+'/'+time.substring(5,7)+'/'+time.substring(8);
        }
        return  (new Date(time)).getTime();
    }

    //时间戳格式化函数
    function timestampToTime(timestamp){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '.';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
        s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y+M+D+h+m+s;
    }

    //判断是否为空，可使用可变参
    function isNotBlank(){
        for(var i=0; i<arguments.length; i++){
            if(!arguments[i]){
                return false;
            }
        }
        return true;
    }

    exports("stringUtils",util);
})

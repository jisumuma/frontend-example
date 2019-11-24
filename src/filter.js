import Vue from 'vue'

Vue.filter("formatDate", function(isostr) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    var parts = isostr.match(/\d+/g);
    return parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5];
});

Vue.filter("uploadMsgFilter", function(msg) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    if(msg){
    	return "The upload file is required."
    }else{
    	return null;
    }
	var parts = isostr.match(/\d+/g);
    return parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5];
});
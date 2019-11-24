<script type="text/javascript">
/**
 *activiti 公共接口
*/
const actUtil = {
	options: {},
	serializeForm:function(formId){
		var data ={};
        $("#"+formId).serializeArray().map(function(x){data[x.name]=x.value;})
        return JSON.stringify(data)
	},
	/**
	 * 启动流程
	 * @param  {Object}   formData    表单数据
	 * @param  {Function} callbackfn  回调函数
	 */
	startProcessInstance:function(formData,callbackfn) {
		var url = Config.getBaseURL() + '/form/'+formData.processDefinitionKey+'/startProcessInstance'
		$.ajax({
			url: url,
			type: 'POST',
			dataType:'text',
            contentType: "application/json",
			data: JSON.stringify(formData),
			cache: false,
			async: false,
			success: function(data, textStatus) {
				callbackfn(data);
			}
		}).fail(function(jqXHR, textStatus, error){
			$("#loadingMask,#progressBar").hide();
					var responeData = $.parseJSON(jqXHR.responseText);
					var message= responeData.message; //必要的时候编码一下:encodeURIComponent(jqXHR.responseText);
					var errorType = responeData.errorType;	 			
				if((message != null && message != "undefined" && message.indexOf("SpecialException") > -1)||(errorType != null && errorType != "undefined" && errorType.indexOf("SpecialException") > -1)){
					// var msg = message.replace("net.atos.demo.constants.SpecialException:","");
						//$.alert(msg);
					$.alert("Your current submit task is invalid, please waiting for request processing completed.  当前提交操作请求无效， 请等待请求处理完成。");
				}else{
					$.alert('Start ProcessInstance failed. 启动流程失败。', textStatus, 'error: ', error, jqXHR);
				}
		});
	},

	/**
	 * 完成任务
	 * @param  {string}   taskId		任务ID
	 * @param  {string}   outcome		操作类型 approve/reject
	 * @param  {Object}   formData    	表单数据
	 * @param  {Function} callbackfn	回调函数
	 */
	completeTask:function(taskId,outcome,formData,callbackfn) {
		var url = Config.getBaseURL()+'/form/'+formData.processDefinitionKey+"/task/complete";
		$.ajax({
			url: url,
			type: 'POST',
			dataType:'text',
			data: {"taskId":taskId,"outcome":outcome,"entityJson":JSON.stringify(formData)},
			cache: false,
			async: false,
			success:function(data, textStatus) {
				callbackfn(data);
			}
		}).fail(function(jqXHR, textStatus, error){
			$("#loadingMask,#progressBar").hide();
			var responeData = $.parseJSON(jqXHR.responseText);
			var message= responeData.message; //必要的时候编码一下:encodeURIComponent(jqXHR.responseText);
			var errorType = responeData.errorType;		 			
			if((message != null && message != "undefined" && message.indexOf("SpecialException") > -1)||(errorType != null && errorType != "undefined" && errorType.indexOf("SpecialException") > -1)){
				// var msg = message.replace("net.atos.demo.constants.SpecialException:","");
				//$.alert(msg);
				$.alert("Your current task is invalid because of you may be have done this task. 由于你可能已操作过导致当前操作无效。");
			}else{
				$.alert('Complete task failed. 任务提交失败。', textStatus, 'error: ', error, jqXHR);
			}
		});
	},
/**
	 * 更新表单
	 * @param  {Object}   formData    表单数据
	 * @param  {Function} callbackfn  回调函数
	 */
	updateForm:function(formData,callbackfn) {
		var url = Config.getBaseURL() + "/ContractExtension/updateForm";
		 
		$.ajax({
			url: url,
			type: 'POST',
			dataType:'text',
            contentType: "application/json",
			data: JSON.stringify(formData),
			cache: false,
			async: false,
			success: function(data, textStatus) {
				callbackfn(data);
			}
		}).fail(function(jqXHR, textStatus, error){
			console.log(textStatus+error);
			$("#loadingMask,#progressBar").hide();
      $.alert('Save failed. 保存失败。', textStatus, 'error: ', error, jqXHR);
		});
	},
	/**
	 * 更新表单
	 * @param  {Object}   formData    表单数据
	 * @param  {Function} callbackfn  回调函数
	 */
	sendEmail:function(formData,callbackfn) {
		var url = Config.getBaseURL() + "/ContractExtension/sendExpireEmial";
		 
		$.ajax({
			url: url,
			type: 'POST',
			dataType:'text',
            contentType: "application/json",
			data: JSON.stringify(formData),
			cache: false,
			async: false,
			success: function(data, textStatus) {
				callbackfn(data);
			}
		}).fail(function(jqXHR, textStatus, error){
			 
			$("#loadingMask,#progressBar").hide();
      $.alert('Save failed. 保存失败。', textStatus, 'error: ', error, jqXHR);
		});
	},
	 
	/**
	 * 封装ajax的通用请求
	 * @param  {string}   type       get或post
	 * @param  {string}   uri        请求的接口URI
	 * @param  {object}   data       传的参数，没有则传空对象
	 * @param  {Function} callbackfn 回调函数
	 * @param  {Function} errFn		   错误回调函数
	 */
	query:function(type, uri, data,callbackfn, errFn) {
		var _baseUrl = Config.getBaseURL();
		$.ajax({
			url: _baseUrl+uri,
			type: type,
            contentType: "application/json",
			data: data?JSON.stringify(data):"",
			cache: false,
			async: false,
			success: function(serverData, textStatus) {
				callbackfn(serverData);
			}
		}).fail(function(jqXHR, textStatus, error){
			$("#loadingMask,#progressBar").hide();
			errFn && errFn.call(this);
      $.alert('Send request failed. 发起请求失败。', textStatus, 'error: ', error, jqXHR);
		});
	},
	/**
	 * 封装ajax的通用请求
	 * @param  {string}   type       get或post
	 * @param  {string}   uri        请求的接口URI
	 * @param  {object}   data       传的参数，没有则传空对象
	 * @param  {Function} callbackfn 回调函数
	 * @param  {Function} errFn		   错误回调函数
	 */
	ajax:function(type, uri, data,callbackfn, errFn) {
		var _baseUrl = Config.getBaseURL();
		$.ajax({
			url: _baseUrl+uri,
			type: type,
            contentType: "application/json",
			data: data?JSON.stringify(data):"",
			cache: false,
			success: function(serverData, textStatus) {
				callbackfn(serverData);
			}
		}).fail(function(jqXHR, textStatus, error){
			$("#loadingMask,#progressBar").hide();
			errFn && errFn.call(this);
      $.alert('Send request failed. 发起请求失败。', textStatus, 'error: ', error, jqXHR);
		});
	}
}

/**
 *用户信息
*/
const user = {
//	'id':'',
//	'name':'',
//	'role':''
}

/**
 *判断是否含有某个角色
*/
function hasRole(r) {
	if(r==null||r==""){
		return false;
	}
	var flag=false;
	var url = Config.getBaseURL()+ "/auth/searchUserRole";
	$.ajax({
			url: url,
		 	contentType: "application/json",
			 data: { "roleName": r
            },
			async: false,
			 type: 'get',
            dataType: 'json',
            success: function(data) {
              if(data=="1"){
				  flag= true;
			  }else {
				  flag= false;
			  }
            },
            error: function(msg) {
             flag= false;

            }
		})
	return flag;
}
/**
 *获取当前登录人
*/
function getLoginUser() {
	 
	var currUser="";
	var url = Config.getBaseURL()+ "/auth/searchLoginUser";
	$.ajax({
			url: url,
		 	contentType: "application/json",
			 data: { 
            },
			async: false,
			 type: 'get',
            dataType: 'json',
            success: function(data) {
              currUser=data;
			   
            },
            error: function(msg) {
             currUser= "";

            }
		})
	return currUser;
}
function getConfig(key){
	return window.Config[key];
}
function getURL(url){
	return Config.getBaseURL()+url;
}

/**
 *获取ISO-8601格式时间字符串的时间戳
*/
function formatDate(isostr) {
	var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
		"(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
	if(isostr) {
		var d = isostr.match(new RegExp(regexp));
		var offset = 0;
		var date = new Date(d[1], 0, 1);

		if (d[3]) {
			date.setMonth(d[3] - 1);
		}
		if (d[5]) {
			date.setDate(d[5]);
		}
		if (d[7]) {
			date.setHours(d[7]);
		}
		if (d[8]) {
			date.setMinutes(d[8]);
		}
		if (d[10]) {
			date.setSeconds(d[10]);
		}
		if (d[12]) {
			date.setMilliseconds(Number("0." + d[12]) * 1000);
		}
		if (d[14]) {
			offset = (Number(d[16]) * 60) + Number(d[17]);
			offset *= ((d[15] == '-') ? 1 : -1);
		}
		offset -= date.getTimezoneOffset();
		var time = (Number(date) + (offset * 60 * 1000));
		var date=new Date(time);
		var y = date.getFullYear();
        var month = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0' + parseInt(date.getMonth()+1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        var h =  date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        var m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        var s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    	return  y + '-' + month + '-' + day + ' ' + h + ':' + m+ ':' +s;
	}else{
		return ;
	}
}
//初始化数字加,展示
function formatCurrency(num) {
	if(num) {
		//将num中的$,去掉，将num变成一个纯粹的数据格式字符串
		num = num.toString().replace(/\$|\,/g, '');
		//如果num不是数字，则将num置0，并返回
		if('' == num || isNaN(num)) {
			return 'Not a Number ! ';
		}
		//如果num是负数，则获取她的符号
		var sign = num.indexOf("-") > 0 ? '-' : '';
		//如果存在小数点，则获取数字的小数部分
		var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : '';
		cents = cents.length > 1 ? cents : ''; //注意：这里如果是使用change方法不断的调用，小数是输入不了的
		//获取数字的整数数部分
		num = num.indexOf(".") > 0 ? num.substring(0, (num.indexOf("."))) : num;
		//如果没有小数点，整数部分不能以0开头
		if('' == cents) {
			if(num.length > 1 && '0' == num.substr(0, 1)) {
				return 'Not a Number ! ';
			}
		}
		//如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
		else {
			if(num.length > 1 && '0' == num.substr(0, 1)) {
				return 'Not a Number ! ';
			}
		}
		//针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
		/*
			也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
			字符串长度为0/1/2/3时都不用添加
			 字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
		*/
		for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		}
		//将数据（符号、整数部分、小数部分）整体组合返回
			return(sign + num + cents);
	}
}
//强制数字保留两位小数
function toDecimal2(x) {
	var f = parseFloat(x);
	if(isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if(rs < 0) {
		rs = s.length;
		s += '.';
	}
	while(s.length <= rs + 2) {
		s += '0';
	}
	return s;
}

export default
{
	actUtil,
	formatDate,
	user,
	hasRole,
	getLoginUser,
	getConfig,
	getURL,
	formatCurrency,
	toDecimal2
}
</script>

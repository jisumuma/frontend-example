//import axios from 'axios'
//
////axios 配置
//axios.defaults.timeout = 5000;
//axios.defaults.baseURL = Config.getBaseURL();

window.ActivitiRestAPI = {
    options: {},
    serializeForm: function(formId) {
        var data = {};
        $("#" + formId).serializeArray().map(function(x) { data[x.name] = x.value; })
        return JSON.stringify(data)
    },
    /**
     * 启动流程
     * @param  {Object}   formData    表单数据
     * @param  {Function} callbackfn        回调函数
     */
    startProcessInstance: function(formData, callbackfn) {
        //(JSON.stringify(formData));
        $.ajax({
            url: Config.getBaseURL() + '/activiti/startProcessInstance',
            type: 'POST',
            dataType: 'text',
            contentType: "application/json",
            data: JSON.stringify(formData),
            cache: false,
            async: false,
            success: function(data, textStatus) {
                callbackfn(data);
            }
        }).fail(function(jqXHR, textStatus, error) {
            console.error('Start ProcessInstance failure:', textStatus, 'error: ', error, jqXHR);
        });
        //		axios.post('/activiti/startProcessInstance', this.serializeForm(formId), {
        //            headers: {
        //            	'Content-Type': 'application/json'
        //            }
        //        })
        //        .then(function (response) {
        //        	callbackfn(response.data);
        //        })
        //        .catch(function (error) {
        //        	console.error('Start ProcessInstance failure,error: ', error);
        //        });
    },
    /**
     * 完成任务
     * @param  {string}   taskId    任务ID
     * @param  {object}   variables 流程变量
     * @param  {Function} callbackfn        回调函数
     */
    completeTask: function(taskId, variables, callbackfn) {
        $.ajax({
            url: Config.getBaseURL() + '/base/task/complete',
            type: 'POST',
            dataType: 'text',
            data: { "taskId": taskId, "variables": JSON.stringify(variables) },
            cache: false,
            async: false,
            success: function(data, textStatus) {
                callbackfn(data);
            }
        }).fail(function(jqXHR, textStatus, error) {
            console.error('complete task failure:', textStatus, 'error: ', error, jqXHR);
        });
        //		var config={
        //			method:'post',
        //			url: "/base/task/complete",
        //			params:{
        //				"taskId":taskId,
        //				"variables":variables
        //			}
        //
        //		}
        //		axios(config).then(function (response) {
        //        	callbackfn(response.data);
        //        }).catch(function (error) {
        //        	console.error('complete task failure,error: ', error);
        //        });
    },
    /**
     * 封装ajax的通用请求
     * @param  {string}   type      get或post
     * @param  {string}   uri       请求的接口URI
     * @param  {object}   data      传的参数，没有则传空对象
     * @param  {Function} callbackfn 回调函数
     *  @param  {Function} errFn	错误回调函数
     */
    commonQuery: function(type, uri, data, callbackfn, errFn) {
        var _baseUrl = Config.getBaseURL();
        $.ajax({
            url: _baseUrl + uri,
            type: type,
            contentType: "application/json",
            data: data,
            cache: false,
            async: false,
            success: function(data, textStatus) {
                callbackfn(data);
            }
        }).fail(function(jqXHR, textStatus, error) {
            errFn && errFn.call(this);
            console.error('ajax failure:', textStatus, 'error: ', error, jqXHR);
        });
        //		if (type === 'get') {
        //			var datas = {
        //				params: data
        //			};
        //		} else {
        //			var datas = data;
        //		}
        //		axios[type](url, datas).then((response) => {
        //			callbackfn(response.data);
        //		}).catch((err) => {
        //			errFn && errFn.call(this);
        //		});
    }
};

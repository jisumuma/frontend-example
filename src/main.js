// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.console = window.console || (function(){
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();
import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import VeeValidator from './validate.js'
import VueDirective from './directive.js'
import VueFilter from './filter.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import  VueResource  from 'vue-resource'
Vue.use(VueResource)
import vueSignature from "vue-signature"
Vue.use(vueSignature)
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
//import App from './App.vue'
import Axios from './http.js'
Vue.prototype.axios = Axios;

//event bus
import EventBus from './components/Common/Event/EventBus.js'
//console.log("EventBus:import",EventBus);
Vue.use(EventBus);

//bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import 'jquery-confirm/dist/jquery-confirm.min.css'
import 'jquery-confirm/dist/jquery-confirm.min.js'

//AdminLTE
import './assets/css/skins/_all-skins.min.css'
import './assets/css/AdminLTE.min.css'
import './assets/js/app.js'
import './assets/css/bundle.css'
import './dist/css/newApon.css'
import './dist/css/custom.css'

//font-awesome
import 'font-awesome/css/font-awesome.min.css'


require("./plugins/select2/select2.full.js")
require("./plugins/datepicker/bootstrap-datepicker.js")
require("./plugins/slimScroll/jquery.slimscroll.min.js")
require("./plugins/datatables/jquery.dataTables.js")
require("./plugins/datatables/dataTables.bootstrap.js")

require("./plugins/colorpicker/bootstrap-colorpicker.min.js")
require("./plugins/timepicker/bootstrap-timepicker.min.js")
require("./plugins/slimScroll/jquery.slimscroll.min.js")
require("./plugins/iCheck/icheck.min.js")
require("./plugins/fastclick/fastclick.js")
require("./plugins/input-mask/jquery.inputmask.js")
require("./plugins/input-mask/jquery.inputmask.date.extensions.js")
require("./plugins/input-mask/jquery.inputmask.extensions.js")

//jquery.uploadifive
require("./plugins/uploadiFive/uploadifive.css")
require("./plugins/uploadiFive/jquery.uploadifive.min.js")
require("./plugins/uploadiFive/uploadify.css")
//require("./plugins/uploadiFive/uploadify.swf")
require("./plugins/uploadiFive/jquery.uploadify.js")

require("./plugins/jvectormap/jquery-jvectormap-1.2.2.css");
require("./dist/css/skins/_all-skins.min.css");
require("./plugins/iCheck/flat/blue.css");
require("./plugins/daterangepicker/daterangepicker.css");
require("./plugins/select2/select2.min.css");
require("./plugins/datepicker/datepicker3.css");
require("./plugins/datatables/dataTables.bootstrap.css");
require("./plugins/spinner/css/jquery.spinner.css");
require("./plugins/spinner/js/jquery.spinner.js");

require("./plugins/jquery.table.rowspan/jquery.table.rowspan.js");

(function ($,window) {  
	$.alertApon=function (content) {  
    	console.log("alert");
        var temp=$.alert(content);
        setTimeout(function(){
        	if(Config.MODE_TYPE === 'apon')
        	$(".jconfirm .jconfirm-cell").css({
				
				top: $(parent.window).scrollTop()+200

			});
        },500);
        
        return temp;
    };
    $.confirmApon= function (content) { 
    	console.log("confirm");
        var temp=$.confirm(content);
        setTimeout(function(){
        	if(Config.MODE_TYPE === 'apon')
        	$(".jconfirm .jconfirm-cell").css({
				
				top: $(parent.window).scrollTop()+200

			});
        },500);
        return temp;
    }  

})(jQuery,window);  

import '@/plugins/util.js'
require("./dist/css/skin-apon-blue.css")
require("./plugins/fullcalendar/fullcalendar.min.css")

import routes from './router/router.js'
const router = new VueRouter({
    //mode: 'hisotry',
    routes // （缩写）相当于 routes: routes
});
$.ajaxSetup({
    cache: false,
    beforeSend: function(request) {
        //console.log('before send');
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader("X-Authorization", Config.getToken() || "");
    }
});

router.beforeEach((to, from, next) => {
    if (to.query.token && to.query.tokenExpired) {
        Config.setToken(to.query.token,to.query.tokenExpired);
        localStorage.setItem("uid", to.query.uid);
        localStorage.setItem("uname", to.query.uname);
        localStorage.setItem("role", to.query.role);
        var queryObj = {};
        jQuery.each(to.query, function(i, val) {
            if (i != "token" && i != "tokenExpired" && i != "uid" && i != "uname" && i != "role") {
                queryObj[i] = val;
            }

        });
        router.push({ path: to.path, query: queryObj });

    }
    if (to.path == '/login') {
        next();
    }
    if (Config.getToken() && new Date().getTime() < Config.getExpired()) {
        var reg = /index\/form\/([^\/]*)/g;
        var formId;
        while (reg.exec(to.path)) {
            formId = RegExp.$1;
        }
        if (formId != null) {
            var _baseUrl = Config.getBaseURL();
            to.query.formId = formId;

            $.ajax({
                url: _baseUrl + "/base/form/fields?formId=" + formId,
                type: "GET",
                contentType: "application/json",
                cache: false,
                async: false,
                success: function(data, textStatus) {
                    var formFields = JSON.parse(JSON.parse(data));
                    var fieldMap = {};
                    for (var index in formFields) {
                        var fieldName = formFields[index].fieldName;
                        var fields = formFields[index];
                        var rules = "";
                        if (fields) {
                            var fieldType = fields.fieldType;
                            var fieldValidateRules = fields.fieldValidateRules.toString();
                            if (fieldType == "String") {
                                if (fieldValidateRules.indexOf('required') != -1) {
                                    this.isRequired = true;
                                    rules += "required|";
                                }
                                if (fieldValidateRules.indexOf('minlength') != -1) {
                                    var minlength = fields.fieldValidateRulesMinlength;
                                    rules += "min" + ":" + minlength + "|";
                                }
                                if (fieldValidateRules.indexOf('maxlength') != -1) {
                                    var maxlength = fields.fieldValidateRulesMaxlength;
                                    rules += "max" + ":" + maxlength + "|";
                                }
                                if (fieldValidateRules.indexOf('pattern') != -1) {
                                    var pattern = fields.fieldValidateRulesPattern;
                                    rules += "regex" + ":" + pattern + "|";
                                }
                            } else if (fieldType == "Integer" || fieldType == "Long" || fieldType == "BigDecimal" || fieldType == "Float" || fieldType == "Double") {
                                if (fieldValidateRules.indexOf('required') != -1) {
                                    rules += "required|";
                                }
                                if (fieldValidateRules.indexOf('min') != -1) {
                                    var min = fields.fieldValidateRulesMin;
                                    rules += "min_value" + ":" + min + "|";
                                }
                                if (fieldValidateRules.indexOf('max') != -1) {
                                    var max = fields.fieldValidateRulesMax;
                                    rules += "max_value" + ":" + max + "|";
                                }
                            } else if (fieldType == "Enum" || fieldType == "Boolean" || fieldType == "Date") {
                                if (fieldValidateRules.indexOf('required') != -1) {
                                    this.isRequired = true;
                                    rules += "required|";
                                }
                            } else {
                                if (fieldValidateRules.indexOf('required') != -1) {
                                    this.isRequired = true;
                                    rules += "required|";
                                }
                            }
                        }
                        if (rules) {
                            fieldMap[fieldName] = rules.substring(0, rules.length - 1);

                        } else {
                            fieldMap[fieldName] = "";
                        }
                    }
                    to.query.formValid = fieldMap;
                }
            }).fail(function(jqXHR, textStatus, error) {
                console.error('ajax failure:', textStatus, 'error: ', error, jqXHR);
            });
        }
        next();
        //$.ajaxSetup({ headers: { "Authorization": localStorage.token } });
    } else {
        next('/login');
    }
});


//通过components下的index.js文件导入组件
import Common from './components/Common';
//对导入的组件进行全局组件注册
Object.keys(Common).forEach((key) => {
    Vue.component(key, Common[key])
});

//DateUtil
import date_ from './components/Common/Util/Date.vue'
Vue.prototype.DT = date_

import upload_ from "./plugins/uploadiFive/file.js"
import uploadajax_ from "./plugins/uploadiFive/ajaxfile.js"
import uploadimage_ from "./plugins/uploadiFive/image.js"
import uploadimage_1 from "./plugins/uploadiFive/image1.js"
import uploadimagelob_ from "./plugins/uploadiFive/imagelob.js"
Vue.prototype.UPFILE = upload_
Vue.prototype.UPFILEAJAX = uploadajax_
Vue.prototype.UPIMAGE = uploadimage_
Vue.prototype.UPIMAGE1 = uploadimage_1
Vue.prototype.UPIMAGELOB = uploadimagelob_
require("./dist/js/demo.js")

Vue.config.productionTip = false

const vm = new Vue({
    el: '#app',
    i18n,
    router,
    Axios,
    VeeValidator,
    VueDirective,
    VueFilter,
    template: '<App/>',
    components: { App },
    data: {
    	actProcessType:'none',
        eventHub: new Vue()
    }
})
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()

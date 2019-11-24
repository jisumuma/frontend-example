/**
 * Created by superman on 17/2/16.
 * http配置
 */
window.Config = {
    getBaseURL: function() {
        var hostName = window.location.host;
        var baseUrl = process.env.baseURL;
        //console.log(baseUrl);
        if (baseUrl.indexOf("|")==0) {
            var obj = JSON.parse("{" + baseUrl.replace(/\|/g, '"') + "}");
            return obj[hostName] || obj["default"];
        } else {
            return baseUrl;
        }
    },
    getAPONURL: function() {
        var hostName = window.location.host;
        var baseUrl = process.env.APONURL;
        //console.log(baseUrl);
        if (baseUrl.indexOf("|")==0) {
            var obj = JSON.parse("{" + baseUrl.replace(/\|/g, '"') + "}");
            return obj[hostName] || obj["default"];
        } else {
            return baseUrl;
        }
    },
    getToken:function(){
        return sessionStorage.token;
    },
    setToken(token,tokenExpired){
        sessionStorage.token = token;
        sessionStorage.tokenExpired = tokenExpired;
    },
    getExpired(){
        return sessionStorage.tokenExpired;
    },
    MODE_TYPE: process.env.MODE,
    CAS: process.env.CAS
}
import axios from 'axios'
import router from './router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = Config.getBaseURL();

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (Config.getToken()) {
            config.headers['X-Authorization'] =Config.getToken();
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

/* http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });*/

export default axios;

/**
 * 文件上传和展示组件
 * @type {Object}
 */
var UPFILEAJAX = window['UPFILEAJAX'] || {};
var console = window.console || { log: function() {} };
/**
 * 复制对象属性
 * @param o 接收对象
 * @param c 被复制的对象
 * @param defaults 默认对象
 * @returns {*}
 */
UPFILEAJAX.apply = function(o, c, defaults) {
    // 如果有默认属性
    if (defaults) {
    	UPFILEAJAX.apply(o, defaults);
    }
    //将c中的属性值循环设定给o中
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
}

UPFILEAJAX.File = (function() {
    var _BASE_URL = Config.getBaseURL();
    var defaultConfig = {
        'auto': true,
        // 'checkScript' : 'check-exists.php',
        'method': 'post',
        'formData': {},
        'queueID': 'queue',
        'buttonText': '上传文件',
        'buttonClass': 'btn btn-default',
        'uploadScript': _BASE_URL + '/attachment/upload',
        'fileType' : '.jpg,.jpeg,.gif,.png,.zip,.rar,.doc,.pdf,.docx,.xls,.xlsx,.ppt,.pptx,.7z,.avi,.tif,.tiff,.msg',
        'multi': false,
        'fileSizeLimit': '20MB',
        'uploadLimit': 20,
        'removeCompleted': true,
        'removeTimeout': 1,
        'successTimeout': 30,
        onUploadComplete: function(file, data) {
            var me = this;
            UPFILEAJAX.File.onUploadComplete(file, data, me);
        },
        onUploadSuccess:function(file, data) {
            var me = this;
            UPFILEAJAX.File.onUploadComplete(file, data, me);
        },
        onUploadError: function(file, errorCode, erorMsg, errorString) {
            //console.log("upload file failed:" + errorCode + "-" + erorMsg + "-" + errorString);
        },
        onCancel: function(file) {
            //console.log(file.name + "被取消了");
        }
    };
    var mapping = {};
    return {
    	updateValue: function(id,returndata) {
            
            $("#upload-" + id).val(returndata).trigger('input:changed', returndata);
            return returndata;
        },
        /**
         * 当文件上传完成之后
         */
        onUploadComplete: function(file, data, obj) {
            if(!data){
                return;
            }
            var data = $.parseJSON(data);
            var id = $(obj).attr('id');
            //for flash upload
            if(!id){
                id = obj.button.parent().attr("id");
            }
            var configObj = mapping[id];
            
            if (data) {
                console.log(data);
                UPFILEAJAX.File.updateValue(id,data);
            } else {
                console.log("upload fail");
            }
        },
        initWithFailBack:function(el, configObject){
            var version = detectIE();
            if(version===false||version>9){
                try {
                    $(el).uploadifive('destroy');
                } catch (e) {}
                $(el).uploadifive(configObject);
            }else{
                try {
                    $(el).uploadify('destroy');
                } catch (e) {}
                $(el).uploadify(configObject);
            }
        },
        /**
         * 初始化上传组件
         * @param el
         * @param configObject
         */
        initUpload: function(el, configObject) {
            this.initWithFailBack(el, configObject);
            var id = $(el).attr('id');
            mapping[id] = configObject;
            $("#uploadifive-" + id).css({ height: '', "line-height": '', overflow: '', "text-align": '', width: '' });
        },
        /**
         * 删除文件
         * @param el
         */
        remove: function(id) {
            $.get(_BASE_URL + '/attachment' + '/' + id, function(data) {
                console.log(data);
            });
        },
        init: function(id) {
            var me = UPFILEAJAX.File;
            //初始化文件上传
            var $el = $("#" + id);
            console.log($el);
            var objConifg = {};
            UPFILEAJAX.apply(objConifg, defaultConfig);
            //读取个性化设置
            objConifg.queueID = $el.attr('queueID') || ($el.attr('id') + '-queue');
            objConifg.uploadScript = $el.attr('uploadScript') || objConifg.uploadScript;
            objConifg.uploader =$el.attr('uploadScript') || objConifg.uploadScript;
            objConifg.swf = "static/uploadify.swf";
            objConifg.height= $el.attr('height')? Number($el.attr('height')) : 34;
            objConifg.width= $el.attr('width')? Number($el.attr('width')) : 120;
            objConifg.multi = $el.attr('multi') || objConifg.multi;
            objConifg.buttonClass = $el.attr('buttonClass') || objConifg.buttonClass;
            objConifg.buttonText = $el.attr('buttonText') || objConifg.buttonText;
            objConifg.fileSizeLimit = $el.attr('fileSizeLimit') || objConifg.fileSizeLimit;
            objConifg.fileList = $el.attr('fileList') || ($el.attr('id') + '-filelist');
            objConifg.inlineFileList = $el.attr('inlineFileList') || ($el.attr('id') + '-inlineFileList');
            objConifg.fileType=$el.attr('accept')||objConifg.fileType;
            if(objConifg.fileType){
                objConifg.fileTypeExts = objConifg.fileType.replace(/\./g,"*.").replace(/\,/g,";");
            }
            objConifg.fileTypeDesc=$el.attr('accept')||objConifg.fileType;
            objConifg.uploadLimit=$el.attr('uploadLimit')||objConifg.uploadLimit;
            if (objConifg.fileType) {
                objConifg.formData = {
                    fileType: objConifg.fileType
                }
            }
            me.initUpload($el, objConifg);
            //显示文件列表
            $("input[type=hidden].file-viewer").each(function(index) {
                var $el = $(this);
            });
        }
    };
})();
export default UPFILEAJAX;

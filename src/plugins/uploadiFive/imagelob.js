/**
 * 文件上传和展示组件
 * @type {Object}
 */
var UPIMAGELOB = window['UPIMAGELOB'] || {};
var console = window.console || { log: function() {} };
/**
 * 复制对象属性
 * @param o 接收对象
 * @param c 被复制的对象
 * @param defaults 默认对象
 * @returns {*}
 */
UPIMAGELOB.apply = function(o, c, defaults) {
    // 如果有默认属性
    if (defaults) {
    	UPIMAGELOB.apply(o, defaults);
    }
    //将c中的属性值循环设定给o中
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
}

UPIMAGELOB.File = (function() {
    var _BASE_URL = Config.getBaseURL();
    var defaultConfig = {
        'auto': true,
        // 'checkScript' : 'check-exists.php',
        'method': 'post',
        'formData': {},
        'queueID': 'queue',
        'buttonText': '上传文件',
        'buttonClass': 'btn btn-default',
        'uploadScript': _BASE_URL + '/attachmentlob/upload',
        'fileType' : '.jpg,.jpeg,.gif,.png,.zip,.rar,.doc,.pdf,.docx,.xls,.xlsx,.ppt,.pptx,.7z,.avi,.tif,.tiff',
        'multi': false,
        'fileSizeLimit': '20MB',
        'uploadLimit': 20,
        'removeCompleted': true,
        'removeTimeout': 1,
        'successTimeout': 30,
        onUploadComplete: function(file, data) {
            var me = this;
            UPIMAGELOB.File.onUploadComplete(file, data, me);
        },
        onUploadSuccess:function(file, data) {
            var me = this;
            UPIMAGELOB.File.onUploadComplete(file, data, me);
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
        updateValue: function(id) {
            var configObj = mapping[id];
            var fileList = "";
            var fileCt = $("#" + configObj.fileList);
            fileCt.find("li[data-attachment-id]").each(function() {
                fileList += $(this).attr('data-attachment-id') + ","
            });
            if (fileList != "" && fileList.indexOf(",") > 0) {
                fileList = fileList.substring(0, fileList.length - 1)
            }
            $("#upload-" + id).val(fileList).trigger('input:changed', fileList);
            return fileList;
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
                var fileCt = $("#" + configObj.fileList);
                fileCt.show();
                
                var htmlString= "<li  id='file-id-"+data[0].id+"' data-attachment-id='"+data[0].id+"' x-file-id='"+id+"'>"+
				"<div><img style='height: 80px;width: 100px;'  src='"+_BASE_URL+"/attachmentlob/downloadimage/"+data[0].id+"' alt='"+data[0].attachName+"'></div>"+
				"<a style='display:none' class='users-list-name' target='_blank'  href='" + _BASE_URL + "/attachmentlob/download/" + data[0].id + "'><i class='fa fa-download'></i>&nbsp;Download 下载</a>"+
				"<span style='display:none' class='users-list-date fileName'><a>"+data[0].attachName+"</a></span>"+
				"<span class='btn btn-danger upload-close'>"+
				"	<button type='button' class='close'><span>×</span></button>"+
				"</span>"+
				"</li>"
                
                if (configObj.multi == 'true' || configObj.multi == true) {
                    fileCt.append(htmlString);
                } else {
                    fileCt.html(htmlString);
                }
               /* $("#file-id-" + data[0].id).bind("click", function() {
                    UPIMAGE.File.onRemove(this);
                });*/
                UPIMAGELOB.File.updateValue(id);
            } else {
                console.log("upload fail");
            }
        },
        onRemove: function(el) {
            var id = $(el).attr('x-file-id');
            $(el).remove();
            UPIMAGELOB.File.updateValue(id);
            //this.remove(attachment.id);
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
            $.get(_BASE_URL + '/attachmentlob' + '/' + id, function(data) {
                console.log(data);
            });
        },
        init: function(id) {
            var me = UPIMAGELOB.File;
            //初始化文件上传
            var $el = $("#" + id);
            var objConifg = {};
            UPIMAGELOB.apply(objConifg, defaultConfig);
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
export default UPIMAGELOB;

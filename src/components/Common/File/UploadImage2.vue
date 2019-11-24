<template>
  <div>
    <span :id="'upload-span-'+id" v-show="errors.has('uploadInput')" class="help is-danger">Please upload the attachment.请上传附件.</span>
    <input id="file_upload" type="file" :id="id" :buttonText="buttonText" :queueID="'queue-'+id" :multi="multi" :fileList="'inline-file-'+id"  accept=".jpg,.jpeg,.gif,.png" :uploadLimit="uploadLimit" :fileSizeLimit="fileSizeLimit" />
    <input type="hidden" :id="'upload-'+id" v-model="selectValue" v-validate="rules" name="uploadInput">
    <!-- <div :id="'inline-file-'+id" style="display:inline-block;margin-top:5px;" class="users-list clearfix upload-images-list">
    </div> -->
    <!-- <div v-for="(entry,index) in attachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id">
			<div><img :src="GL.getURL('/attachment/downloadimage/'+entry.id)" :alt="entry.attachName"></div>
		</div> -->
			<div :id="'inline-file-'+id" style="display:block;margin-top:5px;" class="users-list clearfix upload-images-list">
				<li v-for="(entry,index) in attachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id">
					<div><img style="height: 80px;width: 100px;" :src="GL.getURL('/attachment/downloadimage/'+entry.id)" :alt="entry.attachName"></div>
					<a class="users-list-name" target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)"><i class="fa fa-download"></i>&nbsp;Download 下载</a>
					<span class="users-list-date fileNameForImage"><a>{{entry.attachName}}</a></span>
					<span class="btn btn-danger upload-close">
						<button type="button" class="close"><span>×</span></button>
					</span>
				</li>
			</div>
    <div :id="'queue-'+id"></div>
  </div>
</template>

<script>
export default {
  name: "UploadImage2",
  inject: {
    $validator: "$validator"
  },
  props: [
    "value",
    "buttonText",
    "multi",
    "attachments",
    "readonly",
    "required",
    "uploadLimit",
    "fileSizeLimit"
  ],
  data() {
    return {
      id: this.generateUUID() + "-" + new Date().getTime()
    };
  },
  computed: {
    selectValue: {
      // 动态计算selectValue的值
      get: function() {
        return this.value;
      }
    },
    rules: {
      // 动态计算rules的值
      get: function() {
        if (this.required == "false") {
          return "";
        } else {
          return "required";
        }
      }
    }
  },
  methods: {
    generateUUID: function() {
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = ((d + Math.random() * 16) % 16) | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    changed: function(val) {
      this.$emit("input", val);
      var spanId = "upload-span-" + this.id;
      var inlineFileId = "inline-file-" + this.id;
      if ($("#" + inlineFileId).find("div").length > 0) {
        $("#" + spanId).css("display", "none");
      } else {
        $("#" + spanId).css("display", "block");
      }
    }
  },
  mounted() {
    this.$root.UPIMAGE1.File.init(this.id);
    var sid = "upload-" + this.id;
    var change = this.changed;
    var remove = this.$root.UPIMAGE1.File.onRemove;
    $(function() {
      $("#" + sid).bind("input:changed", function(e, val) {
        change(val);
      });
    });
    $(".upload-images-list").on("click", ".upload-close", function() {
      var el = $(this).parents("li[x-file-id]");
      let $data = $("#file_upload").data("uploadify"); //获取上传文件的属性
      console.log($data);
      let settings = $data.settings;
      var uploadLimit = settings.uploadLimit; //获取当前设置的上传文件数限制
      $("input[type=file]").uploadify("settings", "uploadLimit", ++uploadLimit); //重置增加上传文件数
      var _this = $(this);
      remove(el);
    });
  }
};
</script>
<style scoped>
input span.fileName a {
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}

.pad-top-5 {
  padding-top: 5px;
}

.upload-images-list > li {
  width: 20%;
  padding: 0px !important;
}

.upload-images-list > li div {
  background-color: #eee;
  border: 1px solid #ccc;
  width: 100%;
  height: 220px;
  margin: 0 auto;
  padding: 10px;
}

.upload-images-list > li img {
  border-radius: 0 !important;
  max-height: 200px;
  width: auto;
  max-width: 100%;
  height: auto;
}

.upload-images-list .users-list-name {
  color: #2274ac;
  margin-top: 10px;
}

.upload-images-list .users-list-name:hover {
  color: #3c8dbc;
}

@media (max-width: 768px) {
  .upload-images-list > li {
    width: 50%;
  }
}

.box-border {
  border: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
}
</style>
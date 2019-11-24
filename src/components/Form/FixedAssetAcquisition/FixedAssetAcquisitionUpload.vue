<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Upload FAA applications</h1>
      <ol class="breadcrumb">
       <li><a >1.Asset Accountant</a></li>
        <li><a >2.Requester</a></li>
        <li><a >3.Disciplinary Supervisor</a></li>
     </ol>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">
      <!-- 上传附件starts  -->
        <div class="box box-primary">
          <div class="box-header with-border">
          <h3 class="box-title">Upload FAA applications 上传固单信息</h3>
          <label>(please upload FAA applications 请上传固单信息)</label>
          <a style='display: inline-block; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/FixedAssetUpload/getTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Download Excel Template 下载Excel模板</a>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                 <upload2 accept=".xls,.xlsx"  buttonText="Upload Attachment " v-model="attachmentIds" :attachments="attachments" multi="false" required="true" fileSizeLimit="5MB"></upload2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog id="errorMsgAlert"></AlertDialog>
     <!-- <Confirmwithsave  :validator="this.$validator" labelName="Submit" uri="/FixedAssetAcquisition/save" v-on:beforeapprovel="beforesubmit" ></Confirmwithsave>-->
    <button type="button" @click="submit()" :class="'btn btn-success pull-left ' + vclass"><i class="fa fa-fw fa-check"></i>&nbsp;Submit</button>
    <back :vclass="vclass"></back>
    </section>
  </div>
</template>



<script>
export default {
  name: "FixedAssetAcquisitionUpload",
  methods: {
      submit: function() {
        if(this.attachmentIds == null || this.attachmentIds==""){
           $.alert("Please selected upload file! 请选择上传文件！");
          return;
        }
         $("#loadingMask,#progressBar").show();
         var router = this.$router;
         this.$validator.validateAll().then(() => {
         var credentials = {attachmentIds:this.attachmentIds};
         var me  = this;
					$.ajax({
						url: Config.getBaseURL()+'/FixedAssetUpload/save',
						type: 'POST',
						dataType:'json',
						contentType: "application/json",
						data: JSON.stringify(credentials),
						success:function(response){
                $("#loadingMask,#progressBar").hide();
                $.alert("Applications saved successfully！申请保存成功!");
                setTimeout(function() {
                  if(Config.MODE_TYPE === 'apon') {
                    top.location.href = Config.getAPONURL();
                  } else {
                    router.push({
                      path: '/index/FixedAssetAcquisitionReport'
                    });
                  }
                }, 2000);
						}
					}).fail(function(jqXHR, textStatus, error){
              $("#loadingMask,#progressBar").hide();
              	var responeData = $.parseJSON(jqXHR.responseText);
			          var message= responeData.message; //必要的时候编码一下:encodeURIComponent(jqXHR.responseText);
                var errorType = responeData.errorType;	
                //if((message != null && message != "undefined" && message.indexOf("SpecialException") > -1)||(errorType != null && errorType != "undefined" && errorType.indexOf("SpecialException") > -1)){
                   // $.alert(message);
                   $("#errorMsgAlert_msg").html(message);                  
                    $("#errorMsgAlert").modal('show'); 
                // }else{
                //     $.alert(message);
                // }
            });
				}).catch(() => {
					alert('Correct the errors!');
				});
     },
  },
  data() {
    return {
       attachmentIds:"",
       attachments:{},
       msg:"",
       vclass:""
    };
  },
  watch: {
		
		},
  //在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
  mounted() {
  
  }
};
</script>

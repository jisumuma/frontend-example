<template>
	<div v-if="!selfApprove">
  		<button type="button" id="vue_confirm_btn" @click="save()" :class="'btn btn-success ' + vclass"><i class="fa fa-fw fa-check"></i>{{labelName}}</button>

        <div class="modal fade" id="approveModal" tabindex="-1" role="dialog" aria-labelledby="approveModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="approveModalLabel">Approve 同意</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('APPROVE') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- approveModal end-->
	</div>
</template>
<script>
	export default{
		name: "SaveToConfirm",
		props:["form","uri","vclass","validator","labelName"],
		computed:{
      selfApprove:{
        // 动态计算readonly的值
        get:function() {
          return this.form.applicantUserId == localStorage.getItem("uid")&& this.form.status == '1';
        }
      }
    },
    mounted() {
        $("#vue_confirm_btn_fixed").css("display","");
        $("#vue_confirm_btn_fixed").html($("#vue_confirm_btn_fixed").html().replace("Confirm",this.labelName));
        $("#vue_confirm_btn_fixed").click(function(){
          document.getElementById('vue_confirm_btn').click();
        });
    },
		methods: {
			draft:function(){
				var createForm = "";
				var router = this.$router;
				this.GL.actUtil.query("POST",this.uri,this.form,function(data){
					// $('#draftModal').modal('toggle');
					// var dataJson = JSON.parse(data);
					// createForm = dataJson.form;
					// setTimeout(function(){
					// 	$("#loadingMask,#progressBar").hide();
					// 	$('#draftModal').modal('toggle');
					// },800);
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#approveModal').modal('toggle');
						setTimeout(function(){
							if(process.env.MODE === 'apon'){
								top.location.href = Config.getAPONURL();
							}else{
								router.push({ path: '/index/task'});
							}
						},100);
					},800);
				});
				//this.$root.eventHub.$emit('updateFormData', createForm);
			},
			save: function () {
				this.$emit("beforeapprovel");
				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
					$("#loadingMask,#progressBar").show();
					var draftFn = this.draft;
					var validatorFn = this.validator;
					var _this=this;
					setTimeout(function(){
						if(validatorFn){
							validatorFn.validateAll().then(result => {
								if (result) {
									draftFn();
								}else{
									//var str='';
									//this.validator.errorBag.all().forEach(function(e){
										//str+=e+'\n';
									//});
									if(validatorFn.errors.has('terms')){
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();
									//alert("correct them");
								}
							});
						}else{
							draftFn();
						}
					},100);
				}
			}
		}
    }
</script>

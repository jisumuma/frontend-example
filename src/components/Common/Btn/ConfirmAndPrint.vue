<template>
	<div ><!--v-if="!selfApprove"-->
		<button type="button" :class="'btn btn-success ' + vclass" @click="approve()"><i class="fa fa-fw fa-check"></i>Print Closing Document and Confirm</button>
		<!-- approveModal start-->
        <div class="modal fade" id="approveModal" tabindex="-1" role="dialog" aria-labelledby="approveModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="approveModalLabel">Print</h4>
					</div>
					<div class="modal-body">
						<span>Print</span>
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
	export default {
		name: 'ConfirmAndPrint',
		props:['vclass',"form","labelName","validator","entityId"],
		methods: {
			completeTask:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"approve",this.form,function(data){
					//$('#approveModal').modal('toggle');
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
			},
			approve: function () {
				//printClosingDocument();
				var url = Config.getBaseURL() + "/eclosingApplication/printClosingDocument/" + this.form.id +"?token=" + Config.getToken();
				var showSelectWin = window.open(url);
				showSelectWin.focus();

				this.$emit("beforeapprovel");
				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
					$("#loadingMask,#progressBar").show();
					var startFn = this.start;
					var completeTaskFn = this.completeTask;
					this.$root.actProcessType="approve";
					var validatorFn = this.validator;
					var _this=this;
					setTimeout(function(){
						if(validatorFn){
							validatorFn.validateAll().then(result => {
								if (result) {
									completeTaskFn();
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
							completeTaskFn();
						}
					},100);
				}
			},
			printClosingDocument: function() {
				var url = Config.getBaseURL() + "/eclosingApplication/printClosingDocument/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			}
			
		}
	}
</script>

<template>
	<div>
  		<button type="button" @click="save()" :class="'btn btn-primary pull-left ' + vclass"><i class="fa fa-save"></i>&nbsp;&nbsp;{{showSubmit?'Submit':'Save'}}</button>
		<!-- draftModal start-->
        <div class="modal fade jconfirm" id="draftModal" tabindex="-1" role="dialog" aria-labelledby="draftModalLabel">
			<div class="modal-dialog modal-sm jconfirm-cell" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="draftModalLabel">Save 保存</h4>
					</div>
					<div class="modal-body">
						<span v-if="this.form.processDefinitionKey == 'OverTimeWhite' && this.form.existPrevious">{{ $t('OverTimeWhite.existPrevious') }}</span>
						<span>{{ $t('DRAFT') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- draftModal end-->
	</div>
</template>
<script>
	export default{
		name: "Draft",
		props:["form","uri","vclass","validator"],
		computed:{
			showSubmit:{
				get:function() {
					if(this.form.processDefinitionKey == 'OverTimeWhite' && ( this.form.batchSubmit=='false') && this.form.status != 9) {
						return true;
					}
					return false;
				}
			}
		},
		methods: {
			confirm: function() {
				var startFn = this.draft;
				if(this.form.processDefinitionKey == "OverTimeWhite" && this.form.batchSubmit=='false') {
					var content = this.form.existPrevious ? "Please be noted that there is already an existing overtime record for this period, further action will replace the pervious application.  加班记录已存在，新的加班申请会覆盖原有记录。" : "Your supervisor will be informed of your Overtime Plan and initiate Overtime Plan application for you. 您的主管将会收到您的加班计划并为您提交加班申请。";
					$.confirm({
						title: "",
						content: content,							//白领加班流程BR.UC02.004
						buttons: {
						  ok: {
							text: "ok",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$("#loadingMask,#progressBar").show();
								startFn();
							}
						  },
						  cancel: {
							text: "Cancel",
							btnClass: "",
							keys: ["esc"],
							action: function() {
								$("#submitBtn").removeAttr("disabled");
							}
						  }
						}
					});
				} else {
					startFn();
				}
			},
			draft:function(){
				var createForm = "";
				this.GL.actUtil.query("POST",this.uri,this.form,function(data){
					$('#draftModal').modal('toggle');
					var dataJson = JSON.parse(data);
					createForm = dataJson.form;
					setTimeout(function(){
						$("#loadingMask,#progressBar").hide();
						$('#draftModal').modal('toggle');
					},800);
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
			},
			save: function () {
				this.$emit("beforesubmit");
				if(this.form.submitstatus == true||this.form.submitstatus == undefined||this.form.submitstatus ==null) {
					if(!(this.form.processDefinitionKey == "OverTimeWhite" && this.form.batchSubmit=='false' )) {
						$("#loadingMask,#progressBar").show();
					}
					var confirmFn = this.confirm;
					var validatorFn = this.validator;
					var _this=this;
					setTimeout(function(){
						if(validatorFn){
							validatorFn.validateAll().then(result => {
								if (result) {
									confirmFn();
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
							confirmFn();
						}
					},100);
				}
			}
		}
    }
</script>

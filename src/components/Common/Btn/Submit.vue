<template>
	<div>
		<button type="button" @click="submit()" id="submitBtn" :class="'btn btn-success pull-left ' + vclass"><i class="fa fa-fw fa-check"></i>&nbsp;{{reallabelName}}</button>
		<!-- submitModal start-->
		<div class="modal fade jconfirm" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel">
			<div class="modal-dialog modal-sm jconfirm-cell" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="submitModalLabel">SUBMIT 提交</h4>
					</div>
					<div class="modal-body">
						<span id="submitNoticecontent">{{ $t('SUBMIT') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- submitModal end-->
	</div>
</template>
<script>
	export default {
		name: "Submit",
		props: ["form","labelName", "vclass", "validator"],
		methods: {
			confirm: function() {
				var startFn = this.start;
				if(this.form.processDefinitionKey == "OverTimeWhite" && this.form.existPrevious) {
					$.confirm({
						title: "",
						content: "Please be noted that there is already an existing overtime record for this period, further action will replace the pervious application.  加班记录已存在，新的加班申请会覆盖原有记录。",							//白领加班流程BR.UC02.004
						buttons: {
						  ok: {
							text: "Yes",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$("#loadingMask,#progressBar").show();
								startFn();
							}
						  },
						  cancel: {
							text: "No",
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
			start: function() {
				var router = this.$router;
				this.GL.actUtil.startProcessInstance(this.form, function(data) {
					var dm = JSON.parse(data);
					$("#submitNoticecontent").html($("#submitNoticecontent").html() + "The TicktNo is " + dm.form.ticketNo + "!");
					//$('#submitModal').modal('toggle');

					setTimeout(function() {
						//$("#loadingMask,#progressBar").hide();
						//$('#submitModal').modal('toggle');
						setTimeout(function() {
							if(Config.MODE_TYPE === 'apon') {
								top.location.href = Config.getAPONURL();
							} else {
								router.push({
									path: '/index/application'
								});
							}
						}, 2000);
					}, 2000);
					$("#submitBtn").removeAttr("disabled");
				});
			},
			submit: function() {
				$("#submitBtn").attr("disabled","true");
				this.$emit("beforesubmit");
				if(this.form.submitstatus == true||this.form.submitstatus == undefined||this.form.submitstatus ==null) {
				if(this.form.processDefinitionKey != "OverTimeWhite" || (this.form.processDefinitionKey == "OverTimeWhite" && !this.form.existPrevious) ) {
					$("#loadingMask,#progressBar").show();
				}
					var confirmFn = this.confirm;
					var validatorFn = this.validator;
					var _this = this;

					setTimeout(function() {

						if(validatorFn) {
							validatorFn.validateAll().then(result => {
								if(result) {
									confirmFn();
								} else {
									//var str='';
									//this.validator.errorBag.all().forEach(function(e){
									//str+=e+'\n';
									//});
									if(validatorFn.errors.has('terms')) {
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();
									//alert("correct them");
									//$("#submitBtn").attr("disabled","false");									
									$("#submitBtn").removeAttr("disabled");
								}
							});
						} else {
							confirmFn();
						}
					}, 100);
				}else{
					$("#submitBtn").removeAttr("disabled");
				}
			}
		},
		computed:{
			reallabelName: {
				// 动态计算processTaskId的值
				get: function() {
					if(this.labelName){
						return this.labelName;
					}
					return "Submit";
				}
			}
		}
	}
</script>

<template>
	<div>
		<button type="button" @click="submit()" id="submitBtn" :class="'btn btn-success pull-left ' + vclass"><i class="fa fa-fw fa-check"></i>&nbsp;Submit</button>
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
		name: "Submit4WhiteCollar",
		props: ["form", "vclass", "validator"],
		methods: {
			confirm: function() {
				var startFn = this.start;
				var message = this.form.message;
				if(this.form.approvedOvertimeHour20) {
					$.confirm({
						title: "",
						content: message,
						buttons: {
						  confirm: {
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
			start: function() {
				var cnt = this.form.employeeApplications.length;
/*				for(var i = 0; i < cnt;i++) {
					var ot = this.form.employeeApplications[i];
					console.log("status="+ot.status);
					if(ot.status == 9) {
						var url = Config.getBaseURL()+"/overTimeWhite/task/complete";
						$.ajax({
							url: url,
							data: JSON.stringify(ot),
							type: 'POST',
							dataType:'text',
							contentType: "application/json",
							cache: false,
							async: true,
							error: function(msg) {
								$.alertApon(msg.responseText);
							},
							success:function(data, textStatus) {
								
							}
						});
					}
				}	*/
				var url = Config.getBaseURL() + "/overTimeWhite/batchSubmit/";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: JSON.stringify(this.form),
					type: 'post',
					dataType:'text',
					contentType: "application/json",
					cache: false,
					async: false,
					error: function(msg) {
						$.alertApon(msg.responseText);
					},
					success: function(data, textStatus) {
					}
				});
				var router = this.$router;
				setTimeout(function(){
					$("#submitBtn").removeAttr("disabled");
					if(Config.MODE_TYPE === 'apon') {
						top.location.href = Config.getAPONURL();
					} else {
						router.push({
							path: '/index/application'
						});
					}
				},cnt*400);
			},
			submit: function() {
				$("#submitBtn").attr("disabled","true");
				this.$emit("beforesubmit");
				if(this.form.submitstatus == true||this.form.submitstatus == undefined||this.form.submitstatus ==null) {
					if(!this.form.approvedOvertimeHour20) {
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
									if(validatorFn.errors.has('terms')) {
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();							
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
		}
	}
</script>

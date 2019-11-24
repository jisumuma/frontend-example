<template>
	<div>
		<button type="button" @click="submit()" :class="'btn btn-success pull-left ' + vclass"><i class="fa fa-fw fa-check"></i>&nbsp;Print</button>
		<!-- submitModal start-->
		<div class="modal fade" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="submitModalLabel">Print</h4>
					</div>
					<div class="modal-body">
						<span id="submitNoticecontent">Print</span>
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
		name: "submitAndPrint",
		props: ["form","labelName", "vclass", "validator","entityId"],
		methods: {
			start: function() {
				var router = this.$router;
				var _this = this;
				this.GL.actUtil.startProcessInstance(this.form, function(data) {
					var dm = JSON.parse(data);
					var iHeight = 650;
					var iWidth = 950;
					var iTop = (window.screen.availHeight-30-iHeight)/2;
					var iLeft = (window.screen.availWidth-10-iWidth)/2;
					// console.log(dm);
					// console.log(_this.entityId);
					// console.log(dm.form.id);
					var url = Config.getBaseURL()+"/form/"+_this.entityId+"/print?id="+dm.form.id+"&token="+Config.getToken();
					var showSelectWin = window.open(url,'print','directories=no,height='+
						iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
						iWidth+',top='+iTop+',left='+iLeft);
					showSelectWin.focus();
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
				});
			},
			submit: function() {
				this.$emit("beforesubmit");
				if(this.form.submitstatus == true||this.form.submitstatus == undefined||this.form.submitstatus ==null) {
					$("#loadingMask,#progressBar").show();
					var startFn = this.start;
					var validatorFn = this.validator;
					var _this = this;

					setTimeout(function() {

						if(validatorFn) {
							validatorFn.validateAll().then(result => {
								if(result) {
									startFn();
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
								}
							});
						} else {
							startFn();
						}
					}, 100);
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

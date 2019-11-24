<template>
	<div v-if="!selfApprove">
		<button id="vue_approve_btn" type="button" :class="'btn btn-success ' + vclass" @click="approve()"><i class="fa fa-fw fa-check"></i>{{labelName}}</button>
		<!-- approveModal start-->
        <div class="modal fade jconfirm" id="approveModal" tabindex="-1" role="dialog" aria-labelledby="approveModalLabel">
			<div class="modal-dialog modal-sm jconfirm-cell" role="document">
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
	export default {
		name: 'Approve',
		props:['vclass',"form","labelName","validator"],
    computed:{
      selfApprove:{
        // 动态计算readonly的值
        get:function() {
					return this.form.applicantUserId == localStorage.getItem("uid") && this.form.status == '1' 
						&& (this.form.processDefinitionKey != "TransportationApplication" || (this.form.processDefinitionKey == "TransportationApplication" && this.form.byDeputy)) 
						&& this.form.processDefinitionKey != "QuotationProcessApplication" 
						&& this.form.processDefinitionKey != "OverTimeBlue" 
						&& this.form.processDefinitionKey != "OverTimeWhite" 
						&& this.form.processDefinitionKey != "OverTimeWhiteSheet" 
						&& this.form.processDefinitionKey != "OverTimeWhiteSheets" 
						&& this.form.processDefinitionKey != "EclosingApplication" && this.form.processDefinitionKey != "EclosingApplicationNew" 
						&& this.form.processDefinitionKey != "FixedAssetRetirement"
						&& (this.form.processDefinitionKey != "ConstructionWorkPermit" || (this.form.processDefinitionKey == "ConstructionWorkPermit" && this.form.byDeputy))
						&& (this.form.processDefinitionKey != "JobDescriptionApplication" || (this.form.processDefinitionKey == "JobDescriptionApplication" && this.form.byDeputy && this.$route.query.taskKey != "orgaPartnerFillFg"))
						&& (this.form.processDefinitionKey != "BusinessCard" || (this.form.processDefinitionKey == "BusinessCard" && this.form.byDeputy))
						&& this.form.processDefinitionKey != "CoiMain" 
						&& (this.form.processDefinitionKey != "HrTraining" || (this.form.processDefinitionKey == "HrTraining" && this.form.byDeputy))
						&& (this.form.processDefinitionKey != "HrTrainingCancel" || (this.form.processDefinitionKey == "HrTrainingCancel" && this.form.byDeputy))
						&& (this.form.processDefinitionKey != "WorkCertificate" || (this.form.processDefinitionKey == "WorkCertificate"  && this.form.byDeputy))
						&& (this.form.processDefinitionKey != "CompanyCar" || (this.form.processDefinitionKey == "CompanyCar" && this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf("applicant") ==-1))
						&& (this.form.processDefinitionKey != "TeamBuilding" || (this.form.processDefinitionKey == "TeamBuilding" && this.form.byDeputy));
        }
      }
    },
    mounted() {
      if($("#vue_commit_btn").html()){
        $("#vue_approve_btn_fixed").css("display","");
        $("#vue_approve_btn_fixed").html($("#vue_approve_btn_fixed").html().replace("Approve","Commit"));
        $("#vue_approve_btn_fixed").click(function(){
          document.getElementById('vue_commit_btn').click();
        });
      }else{
        if(!this.selfApprove&&this.labelName!='Resubmit'){
          $("#vue_approve_btn_fixed").css("display","");
          $("#vue_approve_btn_fixed").html($("#vue_approve_btn_fixed").html().replace("Approve",this.labelName));
          $("#vue_approve_btn_fixed").click(function(){
            document.getElementById('vue_approve_btn').click();
          });
        }

      }

    },
		methods: {
			confirm: function() {
				var startFn = this.completeTask;
				if(this.form.processDefinitionKey == "OverTimeWhite" && this.form.existPrevious && this.form.appStatus == 'Initiated') {
					$.confirm({
						title: "",
						content: "The period has existed overtime record, do you want to replace it? 加班记录已存在，你确定再申请一条加班记录覆盖它吗？",							//白领加班流程BR.UC02.004
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
								$("#vue_approve_btn").removeAttr("disabled");
							}
						  }
						}
					});
				} else if(this.form.processDefinitionKey == "OverTimeWhite" && this.form.appStatus == 'waiting for employee') {
					$.confirm({
						title: "",
						content: "Please be noted the 'Confirm' button will end the workflow without any further modifications accepted, if you would like to modify it later, you can click 'Save' button.请注意“确认”按钮会导致流程结束，无法对数据进行任何修改，如果您想在之后进行修改，您可以点击“保存”按钮。",
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
								$("#vue_approve_btn").removeAttr("disabled");
							}
						  }
						}
					});
				} else if(this.form.processDefinitionKey == "OverTimeBlue") {
					var content = "There are " + this.form.approveCnt + (this.form.approveCnt != 1 ? " employees get approvals" : " employee get approval") + " and " + this.form.rejectCnt + (this.form.rejectCnt != 1 ? " employees have" : " employee has") + " been rejected. 有" + this.form.approveCnt + "位员工申请审批通过，有" + this.form.rejectCnt + "位员工申请被拒绝。"
					$.confirm({
						title: "",
						content: content,
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
								$("#vue_approve_btn").removeAttr("disabled");
							}
						  }
						}
					});
				} else if(this.form.processDefinitionKey == "OverTimeWhiteSheet" || this.form.processDefinitionKey == "OverTimeWhiteSheets") {
					var content = "There are " + this.form.approveCnt + (this.form.approveCnt != 1 ? " employees application get approvals" : " employee application get approval") + " and " + this.form.rejectCnt + (this.form.rejectCnt != 1 ? " employees" : " employee") + " application been rejected. 有" + this.form.approveCnt + "位员工申请审批通过，有" + this.form.rejectCnt + "位员工申请被拒绝。"
					$.confirm({
						title: "",
						content: content,
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
								$("#vue_approve_btn").removeAttr("disabled");
							}
						  }
						}
					});
				} else {
					startFn();
				}
			},
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
					$("#vue_approve_btn").removeAttr("disabled");
				});
			},
			approve: function () {
				$("#vue_approve_btn").attr("disabled","true");
				this.$emit("beforeapprovel");				
				this.$emit("beforeRealApprovel");
				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
					if(!(this.form.processDefinitionKey == "OverTimeWhite" && ((this.form.existPrevious && this.form.appStatus == 'Initiated') || this.form.appStatus == 'waiting for employee')) 
						&& !(this.form.processDefinitionKey == "OverTimeBlue" || this.form.processDefinitionKey == "OverTimeWhiteSheet" || this.form.processDefinitionKey == "OverTimeWhiteSheets")) {
						$("#loadingMask,#progressBar").show();
					}
					var completeTaskFn = this.confirm;
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
									$("#vue_approve_btn").removeAttr("disabled");
								}
							});
						}else{
							completeTaskFn();
						}
					},100);
				}else{
					$("#vue_approve_btn").removeAttr("disabled");
				}
			}
		}
	}
</script>

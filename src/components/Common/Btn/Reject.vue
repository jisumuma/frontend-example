<template>
	<div v-if="!selfApprove">
		<button id="vue_reject_btn" type="button" :class="'btn btn-danger pull-left ' + vclass" @click="rejectConfirm()"><i class="fa fa-fw fa-close"></i>{{labelName}}</button>
		<!-- rejectModal start-->
	    <div class="modal fade" id="rejectModal" tabindex="-1" role="dialog" aria-labelledby="rejectModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="rejectModalLabel">Reject 拒绝</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('REJECT') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- rejectModal end-->
		
		<div class="modal fade jconfirm" id="rejectModal1" tabindex="-1" role="dialog" aria-labelledby="rejectModalLabel1" >
			<div class="modal-dialog modal-sm  jconfirm-cell" role="document" style="width:60%;margin-left:20%;">
				<div class="modal-content">
					<!--<div class="modal-header">
						<h4 class="modal-title" id="rejectModalLabel1">Reject 拒绝</h4>
					</div>-->
					<div class="modal-body">
						<comment v-model="approvalRemarkConfirm" :approvalComment="approvalRemarkConfirm" required="true"></comment>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger pull-right"  @click="confirmReject">Confirm Reject</button>
						<button type="button" class="btn btn-primary pull-left"  @click="cancelReject">Cancel Reject</button>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'Reject',
		props:['vclass',"form","validator","labelName"],
		data(){
			var dm = {};
			dm.approvalRemarkConfirm="";
			return dm;
		},
    computed:{
      selfApprove:{
        // 动态计算readonly的值
        get:function() {
          return this.form.applicantUserId == localStorage.getItem("uid") && this.form.status == '1' && (this.form.processDefinitionKey != "TransportationApplication" || (this.form.processDefinitionKey == "TransportationApplication" && this.form.byDeputy));
            //(this.form.processDefinitionKey == "QuotationProcessApplication" && ((this.$route.query.taskKey.indexOf('PackagingCost') != -1) ||(this.$route.query.taskKey.indexOf('TransportationCost') != -1)) );
        }
      }
    },
    mounted() {
      if($("#vue_commit_btn").html()){

      }else{
        if(!this.selfApprove){
          $("#vue_reject_btn_fixed").css("display","");
          $("#vue_reject_btn_fixed").html($("#vue_reject_btn_fixed").html().replace("Reject",this.labelName));
          $("#vue_reject_btn_fixed").click(function(){
            document.getElementById('vue_reject_btn').click();
          });
        }
      }


    },
		methods: {
			completeTask:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"reject",this.form,function(data){
					//$('#rejectModal').modal('toggle');
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#rejectModal').modal('toggle');
						setTimeout(function(){
							if(process.env.MODE === 'apon'){
								top.location.href = Config.getAPONURL();
							}else{
								router.push({ path: '/index/task'});
							}
						},100);
					},800);
					$("#vue_reject_btn").removeAttr("disabled");
				});
			},
			reject: function () {
				$("#loadingMask,#progressBar").show();
				$("#vue_reject_btn").attr("disabled","true");
				var completeTaskFn = this.completeTask;
				this.$root.actProcessType="reject";
				var validatorFn = this.validator;
				var _this=this;
				//validatorFn.attach("comment","required");
        if(window.commentInterval){
          window.clearInterval(window.commentInterval);
        }
        window.commentTimeout =setTimeout(function(){
          if(JSON.stringify(validatorFn.fields.find({ name: 'comment' }).rules) != "{}"){
            if(validatorFn){
              //拒绝时应该只校验一个comment
              validatorFn.validate('comment').then(result => {//validatorFn.validateAll()是校验所有字段
                if (result) {
                  completeTaskFn();
                }else{
                  if(validatorFn.errors.has('terms')){
                    $.alertApon(_this.$t("checkPolicyNotice"));
                  }
                   $.alertApon(_this.$t("rejectCommentNotice"));
                  $("#loadingMask,#progressBar").hide();
				  $("#vue_reject_btn").removeAttr("disabled");
                }
              });
            }else{
              completeTaskFn();
            }
            window.clearInterval(window.commentInterval);
          }else{
							$("#vue_reject_btn").removeAttr("disabled");
					}
        },100);

			},
			rejectConfirm:function(){
				this.approvalRemarkConfirm=this.form.approval.approvalRemark;
				if(this.approvalRemarkConfirm){
					this.confirmReject();
				}else{
					$('#rejectModal1').modal({
						backdrop: false, //点击空白处不关闭对话框
						keyboard: false, //键盘关闭对话框
						toggle: true //弹出对话框
					});
				}
			},
			cancelReject:function(){
				$('#rejectModal1').modal('hide');
				//this.form.approval.approvalRemark=this.approvalRemarkConfirm;
			},
			confirmReject:function(){
				if(this.approvalRemarkConfirm){
					$("#loadingMask,#progressBar").show();
					$('#rejectModal1').modal('hide');
					var _this=this;
					this.form.approval.approvalRemark=this.approvalRemarkConfirm;
					setTimeout(function(){
						_this.completeTask();
					},300);
					
				  
				}else{
					$.alertApon(this.$t("rejectCommentNotice"));
				}
				
			}
		}
	}
</script>

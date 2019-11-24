<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{$t("HrTrainingCancel")}}</h1>
			<ol class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.CHE Training Officer</a>
				</li><!--
				<li v-if="form.totalCost>=15000">
					<a>4.Head of HR Orga.&Education</a>
				</li>
				<li v-if="form.totalCost>=35000">
					<a>5.BOM</a>
				</li> -->
			</ol>

			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
			</span>
		</section>
		<div>
			<!-- Main content -->
			<section class="content container-fluid">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
						<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label></div>
						<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero">
						   <i class="fa fa-plus" id="minusplusi"></i>
					    </button>
					   </div>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<!--不选中的时候显示-->
								<form-group v-if="!onbehalf" other-rules="" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="true"></form-group>
								<!--选中的时候显示-->
								<div class="col-md-3" v-if="onbehalf">
									<div class="form-group">
										<label for="">{{$t("HrTraining.creatorStaffcode")}}</label>
										<div class="input-group ">
											<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="true">
											<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" chooseID="onbehalfperson" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        					</span>
										</div>
									</div>
								</div>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorName" name="creatorName" readonly="true"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPosition" name="creatorPosition" readonly="true"></form-group>
						        <form-group col="md-3" type="input" other-rules="" v-model="form.creatorDept" name="creatorDept" readonly="true"></form-group>
							</div>
							<div class="row panel-collapse collapse " id="collapseZero">
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorDirectsupervisor" name="creatorDirectsupervisor" readonly="true"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorCostcenter" name="creatorCostcenter" readonly="true"></form-group>
							</div>
						</div>
					</form>
				</div>

				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> Training Cancel Information 取消培训信息 </h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-3" v-if="!readonly">
									<div class="form-group">
										<label for="">
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
											{{$t("HrTrainingCancel.trainingName")}}
										</label>
										<div class="input-group ">
											<input type="text" class="form-control input " :class="{'is-danger': errors.has('trainingName') }" placeholder="" id="trainingName" v-validate="'required'" name="trainingName" v-model="form.trainingName" readonly="true">
											<span class="input-group-btn">
												<button  class="btn btn-primary btn-flat" type="button" @click="popmodal()"><i class="fa fa-fw fa-search"></i></button>
											</span>
										</div>
									</div>
								</div>
								<form-group v-if="readonly" col="md-3" type="input" other-rules="required" v-model="form.trainingName" name="trainingName" readonly="true"></form-group>
								<form-group v-if="form.trainingTime" col="md-3" type="daterangepicker2" other-rules="" v-model="form.trainingTime" name="trainingTime" readonly="true"></form-group>
								<form-group v-if="form.totalCost" col="md-3" type="input" other-rules="" v-model="form.trainingDuration" name="trainingDuration" readonly="true"></form-group>
                                <form-group v-if="form.trainingLanguage" col="md-3" type="input" other-rules="" v-model="form.trainingLanguage" name="trainingLanguage" readonly="true"></form-group>
								<form-group v-if="form.trainingSite" col="md-3" type="input" other-rules="" v-model="form.trainingSite" name="trainingSite" readonly="true"></form-group>
							</div>
							<div class="row" v-if="form.training1Exception">
								<div class="col-md-12">
									<div class="">
										<label for="">
											Learning Goal and Training Expectation 学习目标及培训期望 </label>
										<div class="row">
											<form-group col="md-12" rows="3" type="textarea" other-rules="required" haslable="false" v-model="form.training1Exception" name="training1Exception" readonly="true"></form-group>
										</div>
									</div>
								</div>
							</div>
							<div class="row" v-if="form.training1Feedback">
								<div class="col-md-12">
									<div class="">
										<label for="">
											Employee’s Learning Goal from Leader’s Perspective 经理建议的学习目标 </label>
										<div class="row">
											<form-group col="md-12" haslable="false" limit="3000" type="textarea2" v-model="form.training1Feedback" name="training1Feedback" readonly="true" rows="5"></form-group>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<!--decimal digits numeric-->
								<form-group v-if="form.totalCost" col="md-3" type="input" other-rules="" v-model="form.trainingVendor" name="trainingVendor" readonly="true"></form-group>
								<form-group v-if="form.totalCost" col="md-3" type="input" other-rules="" v-model="form.trainingCostStr" name="trainingCost" readonly="true"></form-group>
								<form-group v-if="form.totalCost" col="md-3" type="input" other-rules="" v-model="form.travelCostStr" name="travelCost" readonly="true"></form-group>
								<form-group v-if="form.totalCost" col="md-3" type="input" other-rules="" v-model="form.accomendationCostStr" name="accomendationCost" readonly="true"></form-group>
							</div>
							<div class="row" v-if="form.totalCost" >
								<div class="col-md-3">
									<div class="form-group">
										<label for=""> {{$t("HrTrainingCancel.totalCost")}} </label>
										<div class="input-group ">
											<input type="text" class="form-control" placeholder="" id="totalCost" name="totalCost" v-model="form.totalCostStr" readonly="true">
											<span class="input-group-btn">
												<button id="popoverbutton" class="btn btn-primary btn-flat popoverbutton" type="button" data-container="body" data-toggle="popover" data-placement="right"
													title="Note" data-content="=Training Cost + Travel Cost + Accommodation Cost" ><i class="fa fa-fw fa-bars"></i></button>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="row" v-if="form.trainingName" >
								<div class="col-md-12">
									<div class="form-group">
										<label for="">
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
											Reason 原因
										</label>
										<textarea :class="{'form-control':true,'input': true, 'is-danger': errors.has('cancelReason') }" rows="3" placeholder=""  v-validate="'required'" id="cancelReason" v-model="form.cancelReason" name="cancelReason" @blur="checkReason()" :readonly="readonly" ></textarea>
										<p>300 Characters Max  (最多填写300个字节)</p>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div class="box box-primary" v-if="(!readonly)||(readonly&&form.attachmentIds)">
					<div class="box-header with-border">
						<h3 class="box-title pull-left">Upload Attachment 上传附件</h3>
					</div>
					<div class="box-body">
						<div class="row">
							<div class="col-md-12 form-group">
								<upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true" required="false" fileSizeLimit="15MB"></upload2>
							</div>
						</div>
					</div>
				</div>

				<div class="checkbox mar-bot-20" v-if="!readonly&&(!processTaskKey||processTaskKey=='editForm')">
					<label>
              			<span class="help is-danger" v-show="errors.has('terms')">{{$t("checkPolicyNotice")}}</span>
               			<input  name="terms" type="checkbox" v-validate="'required'" >
						I hereby confirm that: <br>
						a. The information given above is complete and true. I will undertake the responsibility for any consequences deriving from the false information.<br>
						b. Completely agree and accept the regulations stipulated in the Training & Personnel Development Policy.<br>
						本人确认：<br>
						a. 以上信息完整并属实。如有虚假，本人承担全部责任。<br>
						b. 完全同意并接受《培训及人员发展政策》中的规定。<br>
						<br>
              			When submitting the application, I have read and agreed to
                  		<a target="_blank" href="http://vwatdportal.ap.vwg/upload/2016051111193145544.18_Information%20Security%20Policy">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  		当提交此申请时，我已经理解并承诺遵守
                  		<a target="_blank" href="http://vwatdportal.ap.vwg/upload/2016051111193145544.18_Information%20Security%20Policy">大众汽车自动变速器（天津）有限公司的相关政策。</a>
            		</label>
				</div>
				<comment v-if="processTaskId !=null&&form.status != 9&&processTaskKey!='editForm'&&checkInApproveFlow" v-model="form.approval.approvalRemark"></comment>
			 	<router-view :form="form" entityId="HrTrainingCancel" v-if="processTaskKey=='trainingOfficer'&&checkInApproveFlow" vclass="btn-left" uri="/form/HrTrainingCancel/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" approveLabelName="Confirm" rejectLabelname="Decline"></router-view>
				<router-view :form="form" entityId="HrTrainingCancel" v-else vclass="btn-left" uri="/form/HrTrainingCancel/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
				<comment-list v-if="form.processInstanceId !=null"></comment-list>
			</section>

			<!-- /.modal -->
			<div class="modal fade" id="HRTAModal" tabindex="-1" role="dialog" aria-labelledby="HRTAModalLabel">
				<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
					<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="HRTAModalLabel">Please select a training for cancel</h4>
						</div>
						<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
							<!-- Main content -->
							<section class="content" style="margin:0px;padding:0px;">
								<!-- Main row -->
								<div class="row" style="width:margin:0px;padding:0px;">
									<!-- Left col -->
									<div class="col-md-12" style="margin:0px;padding:0px;">
										<!-- table 2 start-->
										<div class="box box-primary1" style="margin:0px;padding:0px;">

											<!-- /.box-header -->
											<div class="box-body">
												<div id="task_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
													<div class="row">
														<div class="col-sm-6">
														</div>
														<div class="col-sm-6">
														</div>
													</div>
													<div class="row">
														<div class="col-sm-12">
															<!--<form role="form-horizontal" style="background-color: #F1F5F8">
																<div class="box-body">
																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																		<label class=" control-label pad-top-7">
                                                Training Name
                                            </label>
																		<div>
																			<input type="text" id="trainingName" class="form-control col-sm-4" style="width: 100%" placeholder="Training Name">
																		</div>
																	</div>


																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;">
																		<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float:right;">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
																	</div>
																</div>
															</form>-->
															<table id="hrta_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
																<thead>
																	<tr>
																		<th>Ticket No.</th>
																		<th>Training Type</th>
																		<th>Training Name</th>
																		<th>Training Period</th>
																		<th>Select</th>
																	</tr>
																</thead>
																<tbody>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
											<!-- /.box-body -->
										</div>
										<!-- /.box -->
										<!-- table 2 end-->
									</div>
									<!-- /.col -->
								</div>
								<!-- /.row -->
							</section>
							<!-- /.content -->
						</div>
						<!--<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					</div>-->
					</div>
				</div>
			</div>
			<!-- /.modal -->

			<!-- /.content -->

			<!-- /.content-wrapper -->
		</div>

	</div>

</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'HrTrainingCancel',
		methods: {
			beforesubmit: function() {
				if(this.form.status == null || this.form.status == 2 || this.form.status ==9){
					var result;
					var me = this;
					this.GL.actUtil.query("get","/HrTrainingCancel/existNullValue/"+this.form.applicantUserId,"",function(data){
						result = JSON.parse(data).result;
						if(result){
							$.alertApon("Can't find disciplinary supervisor! Please contact the Administrator to mantain the data. 找不到直属上级！请联系管理员维护数据。");
							me.form.submitstatus=false;
							return;
						}else{
							me.form.submitstatus=true;
						}
					});
				}
			},
			checkReason:function(){
				 
			var reg =/^[0-9]*$/;
				if($("#cancelReason").attr("readonly")) {
					//只读不做操作
				} else {
					if($("#cancelReason").val()) {
							var value=$("#cancelReason").val();
							var newvalue = value.replace(/[^\x00-\xff]/g, "**");    
							var length = newvalue.length;    

							//当填写的字节数小于设置的字节数    
							if (length * 1 <=300 * 1){    
										return;    
							}    
							var limitDate = newvalue.substr(0, 300);    
							var count = 0;    
							var limitvalue = "";    
						for (var i = 0; i < limitDate.length; i++) {    
										var flat = limitDate.substr(i, 1);    
										if (flat == "*") {    
													count++;    
										}    
						}    
						var size = 0;    
						var istar = newvalue.substr(300 * 1 - 1, 1);//校验点是否为“×”    

						//if 基点是×; 判断在基点内有×为偶数还是奇数     
						if (count % 2 == 0) {    
											//当为偶数时    
										size = count / 2 + (300 * 1 - count);    
										limitvalue = value.substr(0, size);    
						} else {    
										//当为奇数时    
										size = (count - 1) / 2 + (300 * 1 - count);    
										limitvalue = value.substr(0, size);    
						}    
					$.alert('300 Characters Max for reason. 原因最多只能填写300个字符。');

	 				this.form.cancelReason=limitvalue;
					}
				}

			},
      afterValidation: function() {

        var _this = this;
        $.confirm({
          title: 'Training Cancellation Policy',
          //columnClass: 'col-md-8 col-md-offset-2',
          columnClass: 'col-md-12',
          content: '<p>Based on clarification for cancellation process during onsite workshop meeting, APON will ONLY provide training cancellation process and there is no training reschedule process via APON. Following contents will be displayed when applicant submit training cancellation application.</p>'
          + '<p>Reschedule and Cancellation<br>'
          + 'The Company is entitled to reschedule the training to a specific period or cancel the training according to the completion time of related necessary procedures. The HR Training Team may change or cancel the original scheduled trainings for following reasons:</p>'
          + '<p><ul>'
          + '<li>Failing a minimum number of participants</li>'
          + '<li>Illness of the trainer</li>'
          + '<li>Technical limits</li>'
          + '<li>Unforeseeable conditions, e.g. weather and nature related, etc.</li>'
          + '</ul></p>'
          + '<p>Any rescheduling or cancellation will be informed by the HR Training Team minimum two weeks in advance before the training takes place.</p>'
          + '<p>Any rescheduling or cancellation due to business (e.g. urgent job responsibilities) or personal (e.g. sick, emergency accident) reasons, the Employee is requested to inform HR Training Team at least one week in advance before the training starts with the written approval notification (e.g. signed application form) from Head of Division. In this case, no participation fees shall be charged. Absence without approval from the Head of Division in advance will be documented and lead to a rejection of this employee’s training applications within next six months.</p>'
          + '<p>Any rescheduling or cancellation <strong>NOT</strong> due to the above reasons by the participating employee must be submitted in written notification (e.g. signed application form) with the approval from Head of Division and sent to the HR Training Team at least three weeks prior to the commencement of the training. The cost of the training and any participation fees incurred as a result of the employee’s change or cancellation shall be billed to the department cost center as follows:</p>'
          + '<table class="table table-border">'
          + '<thead><tr><th style="width: 50%;background-color: #C1504C">Reschedule and Cancellation notification to HR</th><th style="width: 50%;background-color: #C1504C">Charged Training Cost</th></tr></thead>'
          + '<tbody><tr><td>3 weeks or earlier before the training</td><td>No charge to the department</td></tr><tr><td>Within 3 weeks or no notification</td><td>Full charge to the department</td></tr></tbody>'
          + '</table>'
          + '<p>If the employee attends the training but has to cancel before the training finishes because of business (e.g. urgent job responsibilities) or personal (e.g. sick, emergency accident) reasons, he/she is requested to inform the HR Training Team with written approval (e.g. signed application form) from Head of Division latest on the second working day after the training finishes. In this case, half of the training expenses will be charged to the employee’s department cost center. If the employee drops out training with reasons not listed above, the employee takes the responsibility to refund half of the training expense, and the Company reserves the right to reject this employee’s training applications within next six months. </p>'
          + '<p>For rescheduling and cancellation of Language Training, please refer to Annex 1, Language Training Regulation.</p>'
          ,
          buttons: {
            ok: {
              text: "Confirm",
              btnClass: 'btn-success',
              action: function () {
                _this.$root.eventHub.$emit('afterValidationCallback',_this.form);
              }
            },
            cancel: {
              text: "Cancel",
              btnClass: 'btn-primary',
              action: function () {
                $("#loadingMask,#progressBar").hide();
              }

            }
          }
        });
      },
			onbehalfclick: function() {

				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId = this.tempapplicantUserId;

					this.form.creatorStaffcode = this.tempcreatorStaffcode;
					this.form.creatorName = this.tempcreatorName;
					this.form.creatorPosition = this.tempcreatorPosition;
					this.form.creatorDept = this.tempcreatorDept;
					this.form.creatorTelephone = this.tempcreatorTelephone;
					this.form.creatorMobile = this.tempcreatorMobile;
					this.form.creatorEmail = this.tempcreatorEmail;

					this.form.trainingName="";
					this.form.trainingType="";
					this.form.trainingDuration="";
					this.form.trainingTime="";
					this.form.trainingSite="";
					this.form.trainingLanguage="";
					this.form.trainingVendor="";
					this.form.trainingCost="";
					this.form.travelCost="";
					this.form.accomendationCost="";
					this.form.totalCost="";
					this.form.trainingCostStr="";
					this.form.travelCostStr="";
					this.form.accomendationCostStr="";
					this.form.totalCostStr="";
					this.form.hrtaTicketno="";

					$("#hrta_table").DataTable().draw();
				}
			},
			doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				//console.log(data);

				this.form.applicantUserId = data.id;

				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName = data.printENName;
				this.form.creatorPosition = data.function;
				var tempdep = data.department;
				if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
					tempdep = data.division;
				}

				this.form.creatorDept = tempdep;
				this.form.creatorDirectsupervisor = data.directSupervisor;
				this.form.creatorCostcenter = data.costcenterOwner;

				this.form.trainingName="";
				this.form.trainingType="";
				this.form.trainingDuration="";
				this.form.trainingTime="";
				this.form.trainingSite="";
				this.form.trainingLanguage="";
				this.form.trainingVendor="";
				this.form.trainingCost="";
				this.form.travelCost="";
				this.form.accomendationCost="";
				this.form.totalCost="";

				this.form.trainingCostStr="";
				this.form.travelCostStr="";
				this.form.accomendationCostStr="";
				this.form.totalCostStr="";

				this.form.hrtaTicketno="";

				this.closemodal();

			},
			popmodal:function(){
				$('#HRTAModal').modal({
						backdrop: false, //点击空白处不关闭对话框
						keyboard: false, //键盘关闭对话框
						toggle: true //弹出对话框
				});
			},
			closemodal: function() {
				//$("#trainingName").val("");
				$("#HRTAModal").modal('hide');
				$("#hrta_table").DataTable().draw();
			},
			draw: function() {
				$("#hrta_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				//var staffcode = $("#trainingName").val();
				var userid = this.form.applicantUserId;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						//"staffCode": staffcode,
						"userid": userid
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
			},
			changeTableCol: function(key) {
				return this.$t(key);
				/*return key;*/
			},
			doAfterSelectHrta: function(tempdata) {
				//var ticketNo=tempdata.ticketNo;

				var url = "/form/HrTraining/get/" + tempdata.id;
				var dm = {};
				if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
						dm = JSON.parse(data);
					});
				} else {
					global_.actUtil.query("get", url, "", function(data) {
						dm = JSON.parse(data);
					});
				}
				this.form.trainingName=dm.form.trainingNameReal;
				this.form.trainingType=dm.form.trainingType;
				this.form.trainingDuration=dm.form.trainingDurationReal;
				this.form.training1Exception=dm.form.training1Exception;
				this.form.training1Feedback=dm.form.training1Feedback;
				this.form.trainingTime=dm.form.trainingTimeReal;
				this.form.trainingSite=dm.form.trainingSite;
				this.form.trainingVendor=dm.form.trainingVendor;
				this.form.trainingCost=dm.form.trainingCost;
				this.form.travelCost=dm.form.trainingTravelCost;
				this.form.accomendationCost=dm.form.trainingAccomendationCost;
				this.form.totalCost=dm.form.trainingTotalCost;
				this.form.trainingLanguage=dm.form.training4Language;

				this.form.trainingCostStr=dm.form.trainingCostStr;
				this.form.travelCostStr=dm.form.trainingTravelCostStr;
				this.form.accomendationCostStr=dm.form.trainingAccomendationCostStr;
				this.form.totalCostStr=dm.form.trainingTotalCostStr;

				this.form.hrtaTicketno=dm.form.ticketNo;
				this.form.cancelReason="";
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/HrTrainingCancel/get/" + id;
			} else {
				var url = "/form/HrTrainingCancel/create/";
			}

			if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}
			dm.onbehalf = false;
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempcreatorPosition = dm.form.creatorPosition;
			dm.tempcreatorDept = dm.form.creatorDept;
			dm.tempcreatorTelephone = dm.form.creatorTelephone;
			dm.tempcreatorMobile = dm.form.creatorMobile;
			dm.tempcreatorEmail = dm.form.creatorEmail;

			dm.form.submitstatus = true;
			dm.form.approvelstatus = true;
			return dm;
		},
		watch: {
			"form.totalCost":{
		        handler(curVal,oldVal){
		          if(curVal){
		          		setTimeout(function(){
		          			$("#popoverbutton").popover();
		          		},300);
		          }
		        },
		        deep:true
		    }
		},

		computed: {

			processTaskId: {
				// 动态计算processTaskId的值
				get: function() {
					return this.$route.query.taskId;
				}
			},
			processTaskKey: {
				// 动态计算processTaskKey的值
				get: function() {
					return this.$route.query.taskKey;
				}
			},
			readonly: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			disabled: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			checkInApproveFlow:{
                get: function() {
                     return (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1);
                }
            },
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			}
		},
		mounted() {
			var _this = this;
			var queryData = this.retrieveData;
			var doAfterSelectHrta = this.doAfterSelectHrta;
			var draw = this.draw;

			var gethrtasurl = "";
			gethrtasurl = "/HrTraining/listhrtalistbyuserid";

			var table = $("#hrta_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + gethrtasurl,
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [4]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "ticketNo"
					},{
						data: "trainingType"
					},{
						data: "trainingNameReal"
					},
					{
						data: "trainingTimeReal"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					$('td:eq(0)', row).html(data.ticketNo);
					$('td:eq(1)', row).html(data.trainingTypeValue);
					$('td:eq(2)', row).html(data.trainingNameReal);
					$('td:eq(3)', row).html(data.trainingTimeReal);
					$('td:eq(4)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

					return row;
				}
			});
			var router = this.$router;

			$('#hrta_table tbody').on('click', '.task-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				doAfterSelectHrta(data);
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});

			});

				//折叠收缩
		 $('body').on('click', '#minusplusbtn', function() {
			if($("#minusplusbtn").hasClass("collapsed")) {
				$("#minusplusi").removeClass("fa-plus");
				$("#minusplusi").addClass("fa-minus");
			} else {
				$("#minusplusi").removeClass("fa-minus");
				$("#minusplusi").addClass("fa-plus");

			};
		});

		
			$("#popoverbutton").popover();

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_this = this;
			});
			$("#cancelReason").on('blur', function() {
				console.log("111111");
				var reg =/^[0-9]*$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
							var value=$(this).val();
							var newvalue = value.replace(/[^\x00-\xff]/g, "**");    
							var length = newvalue.length;    

							//当填写的字节数小于设置的字节数    
							if (length * 1 <=300 * 1){    
										return;    
							}    
							var limitDate = newvalue.substr(0, 300);    
							var count = 0;    
							var limitvalue = "";    
						for (var i = 0; i < limitDate.length; i++) {    
										var flat = limitDate.substr(i, 1);    
										if (flat == "*") {    
													count++;    
										}    
						}    
						var size = 0;    
						var istar = newvalue.substr(300 * 1 - 1, 1);//校验点是否为“×”    

						//if 基点是×; 判断在基点内有×为偶数还是奇数     
						if (count % 2 == 0) {    
											//当为偶数时    
										size = count / 2 + (300 * 1 - count);    
										limitvalue = value.substr(0, size);    
						} else {    
										//当为奇数时    
										size = (count - 1) / 2 + (300 * 1 - count);    
										limitvalue = value.substr(0, size);    
						}    
					$.alert('300 Characters Max for reason. 原因最多只能填写300个字符。');

	 				form.cancelReason=limitvalue;
					}
				}
			});
		}
	}
</script>

<style>

</style>

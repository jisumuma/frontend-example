<template>
	<div>
		<button type="button" id="vue_approve_btn" @click="submit()" :class="'btn btn-success pull-left ' + vclass"><i class="fa fa-fw fa-check"></i>&nbsp;{{reallabelName}}</button>
		<!-- submitModal start-->
		<div class="modal fade" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel">
			<div class="modal-dialog modal-sm" role="document">
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
		<div class="modal fade" id="OTBModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-body"><!-- when previous application status is finished -->
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<span>Please be noted that {{this.form.existCompleteIds.length}} {{this.form.existCompleteIds.length==1?'employee':'employees'}} already has an additional working plan application in the same period, are your sure to replace it?  The submit action will lead this employee’s previous record in this period invalid while other employee’s record will not be influenced. You can click <a @click="popmodal();" title="List">List</a> to see details.</span><br>
						<span>请注意该员工在该时段已有额外工作计划申请，您确定要覆盖它吗？覆盖功能会导致该员工上一笔额外工作计划记录作废，但其他员工的记录不受影响。您可点击<a @click="popmodal();" title="List">List</a>按钮查看作废的详情记录。</span>
					</div>
					<div class="modal-footer">
						<button type="button" id="LISTBtn" @click="popmodal()" class="btn btn-primary pull-left" >&nbsp;List</button>
						<button type="button" id="submit_Btn" @click="start()" class="btn btn-primary pull-left"><i class="fa fa-fw fa-check"></i>&nbsp;{{reallabelName}}</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- backModal start-->
		<div class="modal fade" :id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Planned Additional Working Time Details 计划额外工时详情</h4>
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
														<form role="form-horizontal" style="background-color: #F1F5F8">
															<div class="box-body">
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class=" control-label pad-top-7">
																		Staff Code
																	</label>
																	<div>
																		<input type="text" :id="'Staffcode'+personModal" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Staffcode">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class="control-label pad-top-7">
																		EN Name
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'ENName'+personModal" style="width: 100%" placeholder="ENName">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float:right;">
																		<span class="fa fa-search">
																		</span>
																		&nbsp;&nbsp;Search
																	</button>
																</div>
															</div>
														</form>
														<table :id="person_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Staff Code<br>员工号</th>
																	<th>Name<br>姓名</th>
																	<th>From (Plan) <br>预计开始时间</th>
																	<th>To (Plan) <br>预计结束时间</th>
																	<th>TicketNo <br>单据号</th>
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
		<!-- submitModal end-->
	</div>
</template>
<script>
	export default {
		name: "ReSubmit4BlueCollar",
		props: ["form","uri","labelName", "vclass", "validator",'chooseID'],
		methods: {
			confirm: function() {
				var draftFn;
				this.form.existCompleteIds = [];
				this.form.existCompleteCnt = 0;
				for(var i=0;i<this.form.overtimeDetails.length;i++){
					var overlapId = this.form.overtimeDetails[i].overlapId;
					if(overlapId) {
						this.form.existCompleteCnt++;
						this.form.existCompleteIds.push(overlapId);
					}
				}
				draftFn = this.start;
				if(this.form.existCompleteCnt > 0) {
					$("#loadingMask,#progressBar").hide();	
					$("#Staffcode"+this.personModal).val("");
					$("#ENName"+this.personModal).val("");
					$("#"+this.person_table).DataTable().draw();
					$('#OTBModal').modal('toggle');						
					$("#submitBlue").removeAttr("disabled");
				} else {
					draftFn();
				}
			},
			draft:function(){
				var createForm = "";
				this.GL.actUtil.query("POST",this.uri,this.form,function(data){
					var dataJson = JSON.parse(data);
					createForm = dataJson.form;
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
				$("#loadingMask,#progressBar").hide();	
				$("#Staffcode"+this.personModal).val("");
				$("#ENName"+this.personModal).val("");
				$("#"+this.person_table).DataTable().draw();
				$('#OTBModal').modal('toggle');
				$("#vue_approve_btn").removeAttr("disabled");
			},
			startProcess: function() {
				var router = this.$router;
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				this.GL.actUtil.completeTask(taskId,"approve",this.form,function(data){
					setTimeout(function(){
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
			start: function() {
				$('#OTBModal').modal('hide');					
				$("#submit_Btn").attr("disabled","true");
				$("#LISTBtn").attr("disabled","true");
				this.$emit("beforesubmit");
				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
					$("#loadingMask,#progressBar").show();
					var startProcessFn = this.startProcess;
					var validatorFn = this.validator;
					var _this = this;

					setTimeout(function() {

						if(validatorFn) {
							validatorFn.validateAll().then(result => {
								if(result) {
									startProcessFn();
								} else {
									if(validatorFn.errors.has('terms')) {
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();				
									$("#vue_approve_btn").removeAttr("disabled");						
									$("#submit_Btn").removeAttr("disabled");					
									$("#LISTBtn").removeAttr("disabled");	
								}
							});
						} else {
							startProcessFn();
						}
					}, 100);
				}else{
					$("#vue_approve_btn").removeAttr("disabled");
					$("#submit_Btn").removeAttr("disabled");
				}
				
			},
			submit: function() {
				$("#vue_approve_btn").attr("disabled","true");
				this.$emit("beforeapprovel");
				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
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
									$("#vue_approve_btn").removeAttr("disabled");					
									$("#submit_Btn").removeAttr("disabled");		
								}
							});
						} else {
							confirmFn();
						}
					}, 100);
				}else{
					$("#vue_approve_btn").removeAttr("disabled");
					$("#submit_Btn").removeAttr("disabled");		
				}
			},
			popmodal: function() {
				//$('#personModal').modal('toggle');


				$("#"+this.personModal).modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});

			},
			closemodal: function() {
				$("#Staffcode"+this.personModal).val("");
				$("#ENName"+this.personModal).val("");
				$("#"+this.person_table).DataTable().draw();
			},
			draw: function() {
				$("#"+this.person_table).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var staffcode = $("#Staffcode"+this.personModal).val();
				var enname = $("#ENName"+this.personModal).val();
				var existCompleteIds = this.form.existCompleteIds;
				if(existCompleteIds.length > 0) {
					var existCompleteIdstrs = "";
					for(var i = 0; i < existCompleteIds.length; i++) {
						existCompleteIdstrs += existCompleteIds[i] + ",";
					}
					existCompleteIdstrs = existCompleteIdstrs.substring(0, existCompleteIdstrs.length-1);
					$.ajax({
						url: url, //这个就是请求地址对应sAjaxSource
						data: {
							"aoData": JSON.stringify(aoData),
							"staffCode": staffcode,
							"printENName": enname,
							"existCompleteIds": existCompleteIdstrs
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
				}
			},
			changeTableCol: function(key) {
				return this.$t(key);
			}
		},
		computed:{
			reallabelName: {
				get: function() {
					if(this.labelName){
						return this.labelName;
					}
					return "ReSubmit";
				}
			},
			person_table: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID;
					}else{
						return "person_table";
					}
				}
			},
			personModal: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID+"personModal";
					}else{
						return "personModal";
					}
				}
			}
		},
		mounted() {
			//OTBModal
			$('#OTBModal').on('shown.bs.modal', function (e) { 
			  $(this).css('display', 'block'); 
			  var modalHeight=$(window).height() / 2 - $('#OTBModal .modal-dialog').height() / 2; 
			  $(this).find('.modal-dialog').css({ 
				'margin-top': modalHeight 
			  }); 
			});
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#"+this.person_table).DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/overTimeBlue/showOverlapDetails",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [0]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "employeeStaffcode"
					},
					{
						data: "employeeName"
					},
					{
						data: "overtimeFrom"
					},
					{
						data: "overtimeTo"
					},
					{
						data: "ticketno"
					}
				],
				"fnRowCallback": function(row, data, index) { 
					return row;
				}
			});
			var router = this.$router;
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		}
	}
</script>

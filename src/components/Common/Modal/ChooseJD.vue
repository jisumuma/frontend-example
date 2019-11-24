<template>
	<div  style="font-size:14px;">
		<button type="button" @click="popmodal()" :class="vclass"><slot></slot></button>
		
		<!-- backModal start-->
		<div class="modal fade" :id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:90%;height:25%;"><!--34-->
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Choose Job Description</h4>
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
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class=" control-label pad-top-7">
																		Ticket No
																	</label>
																	<div>
																		<input type="text" :id="'ticketNo'+personModal" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Ticket No">
																	</div>
																</div>
																
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Position Code
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'positionCode'+personModal" style="width: 100%" placeholder="Position Code">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Position Name
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'positionName'+personModal" style="width: 100%" placeholder="Position Name">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Report to Function
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'reporttofunction'+personModal" style="width: 100%" placeholder="Report to Function">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Position Holder
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'positionholder'+personModal" style="width: 100%" placeholder="Position Holder">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Approval Direct Supervisor
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'reportToPerson'+personModal" style="width: 100%" placeholder="Approval Direct Supervisor">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Division / Department 
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'divisionDepartment'+personModal" style="width: 100%" placeholder="Division / Department ">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3" style="margin-top:20px;text-align:right;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="text-align:center;">
																		<span class="fa fa-search">
																		</span>
																		&nbsp;&nbsp;Search
																	</button>
																</div>
															</div>
														</form>
														<table :id="person_table" class="table table-bordered dataTable JdTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Ticket No</th>
																	<th>Position Code</th>
																	<th>Position Name</th>
																	<th>Report to Function</th>
																	<th>Position Holder</th>
																	<th>Approval Direct Supervisor</th>																	
																	<th>Division/Department </th>
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
		<!-- backModal end-->
	</div>
</template>
<script>
	export default {
		name: "ChooseJD",
		props: ['vclass','chooseID','form'],
		data() {
			//返回的数据对象
			var dm = {};
			return dm;
		},
		methods: {
			popmodal: function() {
				//$('#personModal').modal('toggle');
				$("#"+this.personModal).modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
				setTimeout(function() {
					$('#selectotherjd').attr("class", "");//input-group-btn会影响表格
				}, 300);

			},
			closemodal: function() {
				$('#selectotherjd').attr("class", "input-group-btn");				
				$("#ticketNo"+this.personModal).val("");
				$("#positionCode"+this.personModal).val("");
				$("#positionName"+this.personModal).val("");
				$("#reporttofunction"+this.personModal).val("");
				$("#positionholder"+this.personModal).val("");				
				$("#reportToPerson"+this.personModal).val("");
				$("#divisionDepartment"+this.personModal).val("");
				$("#"+this.person_table).DataTable().draw();
			},
			draw: function() {
				$("#"+this.person_table).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var ticketNo=$("#ticketNo"+this.personModal).val();
				var positionCode=$("#positionCode"+this.personModal).val();
				var positionName=$("#positionName"+this.personModal).val();
				var reportToFunction=$("#reporttofunction"+this.personModal).val();
				var positionHolder=$("#positionholder"+this.personModal).val();				
				var reportToPerson=$("#reportToPerson"+this.personModal).val();
				var divisionDepartment=$("#divisionDepartment"+this.personModal).val();
				console.log("positionCode="+positionCode+",positionName="+positionName);
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"ticketNo": ticketNo,
						"positionCode": positionCode,
						"positionName": positionName,
						"reportToFunction": reportToFunction,
						"positionHolder": positionHolder,						
						"reportToPerson": reportToPerson,
						"divisionDepartment":divisionDepartment
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
			sendMsgToParent: function(data) {
				this.$emit("callbackfunction", data);
			}
		},
		computed: {
			person_table: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID;
					}else{
						return "jd_table";
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
			},
			
		},
		mounted() {
			console.log(this.chooseID);
			console.log(this.person_table);
			var queryData = this.retrieveData;
			var sendMsgToParent = this.sendMsgToParent;
			var draw = this.draw;
			var table = $("#"+this.person_table).DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/jobDescriptionApplication/listExistJd",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [7]//不排序
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表默认排序
				columns: [{
						data: "ticketNo"
					},{
						data: "positionCode"
					},{
						data: "positionName"
					},{
						data: "reporttofunction"
					},{
						data: "approvalPositionHolder"
					},{
						data: "reporttoperson"
					},{
						data: "divisionDepartment"
					},{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始				
					$('td:eq(7)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');
					return row;
				}
			});
			var router = this.$router;

			$("#"+this.person_table+" tbody").on('click', '.task-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				sendMsgToParent(data);
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
			});
			//this.draw();
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		}
	}
</script>

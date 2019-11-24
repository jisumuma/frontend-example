<template>
	<div style="font-size:14px;">
		<button type="button" @click="popmodal()" :class="vclass"><slot></slot></button>
		<!-- backModal start-->
		<div class="modal fade" :id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:90%;height:34%;"><!--34-->
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Choose Position Orga</h4>
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
																		Division
																	</label>
																	<div>
																		<input type="text" :id="'division'+personModal" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Division">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Department
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'department'+personModal" style="width: 100%" placeholder="Department">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Cost Center No.
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'costCenterCode'+personModal" style="width: 100%" placeholder="Cost Center No.">
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
																		<input type="text" class="form-control" :id="'functionType'+personModal" style="width: 100%" placeholder="Report to Function">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		Position Holder
																	</label>
																	<div>
																		<input type="text" class="form-control" :id="'staffName'+personModal" style="width: 100%" placeholder="Position Holder">
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
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-12" style="margin-top:20px;text-align:right;" >
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
																	<th>Division</th>
																	<th>Department</th>
																	<th>Team</th>
																	<th>Cost Center No.</th>
																	<th>Position Code</th>
																	<th>Position Name</th>
																	<th>Report to Function</th>
																	<th>Available Date</th>
																	<th>Approval Direct Supervisor</th>
																	<th>Position Holder</th>
																	<th>Exist JD</th>
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
		name: "ChoosePositionOrga",
		props: ['vclass','chooseID','form','tableID'],
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
				console.log('popmodal tableID='+this.tableID+",data_index="+this.data_index);
				var dataindex = this.data_index;
				setTimeout(function() {				
					console.log('setTimeout  #selectotherpersonOgra '+dataindex);
					$('#selectotherpersonOgra'+dataindex).attr("class", "");//input-group-btn会影响表格
				}, 300);

			},
			closemodal: function() {
				var dataindex=this.data_index;
				console.log('closemodal  #selectotherpersonOgra '+dataindex);
				$('#selectotherpersonOgra'+dataindex).attr("class", "input-group-btn");
				$("#division"+this.personModal).val("");
				$("#department"+this.personModal).val("");
				$("#costCenterCode"+this.personModal).val("");
				$("#positionName"+this.personModal).val("");
				$("#functionType"+this.personModal).val("");
				$("#staffName"+this.personModal).val("");
				$("#positionCode"+this.personModal).val("");
				$("#reportToPerson"+this.personModal).val("");
				$("#"+this.person_table).DataTable().draw();
			},
			draw: function() {
				$("#"+this.person_table).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				//传输当前用户的division、department
				var division=$("#division"+this.personModal).val();
				var department=$("#department"+this.personModal).val();
				var applicantName=this.form.creatorName;
				var costCenterCode=$("#costCenterCode"+this.personModal).val();
				var positionName=$("#positionName"+this.personModal).val();
				var functionType=$("#functionType"+this.personModal).val();
				var staffName=$("#staffName"+this.personModal).val();
				var positionCode=$("#positionCode"+this.personModal).val();
				var reportToPerson=$("#reportToPerson"+this.personModal).val();
				var roleType="";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"division": division,
						"department": department,
						"costCenterCode": costCenterCode,
						"positionName": positionName,
						"functionType": functionType,
						"staffName": staffName,
						"positionCode": positionCode,
						"reportToPerson": reportToPerson,
						"roleType":roleType,
						"applicantName":applicantName
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
				this.$emit("callbackfunction", data,this.data_index);
			}
		},
		computed: {
			data_index: {
				get:function(){
					if(this.tableID !=null && this.tableID != undefined){
						console.log("tableID="+this.tableID);
						return this.tableID;
					}else{
						return "data_index";
					}
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
				"sAjaxSource": Config.getBaseURL() + "/jobDescriptionApplication/positionList",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [7,8,9,10,11]//不排序
				}],
				"aaSorting": [
					[4, "desc"]
				], //给列表默认排序
				columns: [{
						data: "division"
					},{
						data: "department"
					},{
						data: "team"
					},{
						data: "costcentercode"
					},{
						data: "positioncode"
					},{
						data: "positionname"
					},{
						data: "reporttofunction"
					},{
						data: "validstartdate" //Available Date
					},{
						data: "reporttoperson" //Approval Direct Supervisor
					},{
						data: "staffname" //Approval Position Holder
					},{
						data: null //Exist JD
					},{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					if(data.jdaid){
						//console.log("data.jdaid="+data.jdaid);
						$('td:eq(10)', row).html("Yes");
					}else{
						$('td:eq(10)', row).html("No");
					}					
					$('td:eq(11)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');
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

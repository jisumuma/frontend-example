<template>
	<div style="font-size:14px;">
		<button type="button" class="btn btn-primary" @click="popmodal();" title="List"> List</button>
		<!-- backModal start-->
		<div class="modal fade" :id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Planned Additional Working Time Details 计划额外工时详情 (> 20 h)</h4>
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
																	<th>Time Account Balance by Last Month <br>截止到上个月的时间账户</th>
																	<th>Applied Hours in Current Month <br>本月已申请时数</th>
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
		name: "OvertimeBlueList",
		props: ['chooseID','overtimeIds','overtimePeriod'],
		methods: {
			popmodal: function() {
				//$('#personModal').modal('toggle');


				$("#"+this.personModal).modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
				setTimeout(function() {
					$('#selectotherperson').attr("class", "");
				}, 300);

			},
			closemodal: function() {
				$('#selectotherperson').attr("class", "input-group-btn");
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
				var overtimeIds = this.overtimeIds; 
				var overtimePeriod = this.overtimePeriod;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffCode": staffcode,
						"overtimePeriod": overtimePeriod,
						"printENName": enname,
						"employeeIds": overtimeIds
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
			}
		},
		computed: {
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
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#"+this.person_table).DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/overTimeBlue/listOverTimeBlue",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false
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
						data: "avgOvertimeHours"
					},
					{
						data: "prePlannedOvertimeHours"
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
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

<template>
	<div style="font-size:14px;">
		<!--<button type="button" class="btn btn-primary" @click="alertmodal();" title="List"> List</button>-->
		<div class="modal fade" id="OTModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<span id="submitNoticecontent">Please be noted that there are {{this.headcountnumber}} employees’ planned overtime hours have exceeded 20 hours. You can click <a @click="popmodal();" > List</a> button to see the details.<br>请注意有{{this.headcountnumber}}位员工本月预加班时数超过20小时。您可点击<a @click="popmodal();" >列表</a>按钮查看更多详细信息。</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="popmodal();" title="List 列表">List 列表</button>
						<button type="button" class="btn btn-default" data-dismiss="modal" style="float:left;">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- backModal start-->
		<div class="modal fade" :id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:75%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Overtime Details 加班详情 (> 20 h)</h4>
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
																		Staff Code 员工号
																	</label>
																	<div>
																		<input type="text" :id="'Staffcode'+personModal" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Staffcode">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-8" style="margin-top:20px;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();">
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
																	<th>Planned Overtime Hours<br>预计加班时数合计</th>
																	<th>Ticket No.<br>申请单号</th>
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
		name: "OvertimeList",
		props: ['chooseID','headcountnumber','overtimeIds'],
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
			alertmodal: function(){
				$('#OTModal').modal('toggle');
			},
			closemodal: function() {
				$('#selectotherperson').attr("class", "input-group-btn");
				$("#Staffcode"+this.personModal).val("");
				$("#"+this.person_table).DataTable().draw();
			},
			draw: function() {
				$("#"+this.person_table).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var staffcode = $("#Staffcode"+this.personModal).val();
				var overtimeIds = this.overtimeIds; 
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffCode": staffcode,
						"overtimeIds": overtimeIds
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
				"sAjaxSource": Config.getBaseURL() + "/overTimeWhite/list",
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
						data: "creatorStaffcode"
					},
					{
						data: "creatorName"
					},
					{
						data: "approvedOvertimeHours"
					},
					{
						data: "ticketNo"
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					//$('td:eq(5)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

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

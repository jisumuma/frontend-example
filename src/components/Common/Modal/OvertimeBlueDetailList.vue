<template>
	<div style="font-size:14px;">
		<button type="button" class="btn btn-primary" @click="popmodal();" title="List"> <span class="fa fa-search"></span></button><!-- 放大镜图标-->
		<!-- backModal start-->
		<div class="modal fade" :id="OTBDetailModal" tabindex="-1" role="dialog" aria-labelledby="OTBDetailModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:75%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title" id="OTBDetailModalLabel">Planned Additional Working Time Details 计划额外工时详情 </h3>
						<!--<div class="col-md-6  form-group">
							<label> <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Planned Additional Working Period 计划额工作周期 <input style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" type="text" disabled="true" v-model="overtimePeriod" name="overtimePeriod" class="input"></label>   
							
						</div>
						<form-group style=" margin-bottom:1px" col="md-4" haslable="false" type="datepicker" readonly="true" v-model="overtimePeriod" name="overtimePeriod" label="OverTimeWhite.overtimePeriod" dateformate="yyyy-mm"other-rules="required" ></form-group>
						<form-group col="md-3" haslable="false" type="datepicker" readonly="true" v-model="overtimePeriod" name="overtimePeriod" label="OverTimeWhite.overtimePeriod" dateformate="yyyy-mm"other-rules="required" ></form-group> -->
						<table>
						<tr>
							<td>
								<label style="float:left;"> <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Planned Additional Working Period 计划额工作周期</label>
							</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td>
								<input style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" type="text" disabled="true" v-model="overtimePeriod" name="overtimePeriod" class="input">
							</td>
						</tr>
						</table>
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
														<table :id="otbDetail_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Date<br>日期</th>
																	<th>Punching Card (h)<br>打卡时数</th>
																	<th>From (Plan)<br>预计开始时间</th>
																	<th>To (Plan)<br>预计结束时间</th>
																	<th>Planned Additional Working Time (h)<br>计划额外工时</th>
																	<th>Reason of Application <br>申请原因</th>
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
		name: "OvertimeBlueDetailList",
		props: ['chooseID','overtimePeriod','employeeId'],
		methods: {
			popmodal: function() {
				//$('#OTBDetailModal').modal('toggle');


				$("#"+this.OTBDetailModal).modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
				setTimeout(function() {
					$('#selectotherperson').attr("class", "");
				}, 300);

			},
			closemodal: function() {
				//$('#selectotherperson').attr("class", "input-group-btn");
				//$("#Staffcode"+this.OTBDetailModal).val("");
				$("#"+this.otbDetail_table).DataTable().draw();
			},
			draw: function() {
				$("#"+this.otbDetail_table).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var overtimePeriod = this.overtimePeriod;
				var employeeId = this.employeeId; 
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"overtimePeriod": overtimePeriod,
						"employeeId": employeeId
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
			otbDetail_table: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID;
					}else{
						return "otbDetail_table";
					}
				}
			},
			OTBDetailModal: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID+"OTBDetailModal";
					}else{
						return "OTBDetailModal";
					}
				}
			}
		},
		mounted() {
			$('#'+this.OTBDetailModal).on('shown.bs.modal', function (e) { 
			  $(this).css('display', 'block'); 
			  var modalHeight=$(window).height() / 2 - $('#'+this.OTBDetailModal+' .modal-dialog').height() / 2; 
			  $(this).find('.modal-dialog').css({ 
				'margin-top': modalHeight 
			  }); 
			});
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#"+this.otbDetail_table).DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/overTimeBlue/showDetails",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [{
						data: "overtimeDate"
					},
					{
						data: "punchingCards"
					},
					{
						data: "overtimeFrom"
					},
					{
						data: "overtimeTo"
					},
					{
						data: "plannedOvertimeHours"
					},
					{
						data: "overtimeReason"
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

<template>
	<div style="font-size:14px;">
		<button type="button" @click="popmodal()" :class="vclass"><slot></slot></button>
		<!-- backModal start-->
		<div class="modal fade" :id="costCenterModal+this.index" tabindex="-1" role="dialog">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Choose Dept. Cost Center</h4>
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
																		Code 编码
																	</label>
																	<div>
																		<input type="text" :id="'code'+costCenterModal+this.index" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Code">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																		 Name 名称
																	</label>
															    <div>
																		<input type="text" class="form-control" :id="'name'+costCenterModal+this.index" style="width: 100%" placeholder="Name">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
																	<label class="control-label pad-top-7">
																	Owner 负责人
																</label>
																	<div>
																		<input type="text" class="form-control" :id="'owner'+costCenterModal+this.index" style="width: 100%" placeholder="Owner">
																	</div>
																</div>				
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3" style="margin-top:20px;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();" >
																	<span class="fa fa-search">
																	</span>
																	&nbsp;&nbsp;Search
																</button>
																</div>
															</div>
														</form>
														<table :id="this.costCenter_table+this.index" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																    <th>Code</th>
																	<th>Name</th>
																	<th>Owner</th>
																	<th>Department</th>														
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
		name: "ChooseCostCenter",
		props: ['vclass','chooseID','index'],
		methods: {
			popmodal: function() {
				//$('#costCenterModal').modal('toggle');
				var me = this;
				$("#"+this.costCenterModal+this.index).modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
				setTimeout(function() {
				//	$('#selectCostCenter'+(me.index+1)).attr("class", "");
				}, 300);

			},
			closemodal: function() {
				$('#selectCostCenter'+(index+1)).attr("class", "input-group-btn");
				$("#code"+this.costCenterModal+this.index).val("");
				$("#name"+this.costCenterModal+this.index).val("");			
				$("#owner"+this.costCenterModal+this.index).val("");				
				$("#"+this.costCenter_table+this.index).DataTable().draw();
			},
			draw: function() {
				$("#"+this.costCenter_table+this.index).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var code = $("#code"+this.costCenterModal+this.index).val();
				var name = $("#name"+this.costCenterModal+this.index).val();
				var owner = $("#owner"+this.costCenterModal+this.index).val();				
				var me = this;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"code": code,
						"name": name,
						"owner": owner
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
					});
			},
			changeTableCol: function(key) {
				return this.$t(key);
				/*return key;*/
			},
			sendMsgToParent: function(data) {
				this.$emit("callbackfunction", data,this.index);
			}
		},
		computed: {
			costCenter_table: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID;
					}else{
						return "costCenter_table";
					}
				}
			},
			costCenterModal: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID+"costCenterModal";
					}else{
						return "costCenterModal";
					}
				}
			}
		},
		mounted() {
			var queryData = this.retrieveData;
			var sendMsgToParent = this.sendMsgToParent;
			var draw = this.draw;
			var table = $("#"+this.costCenter_table+this.index).DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/common/listcostcenter",
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
						data: "costCenterCode"
					},
					{
						data: "costCenterName"
					},
					{
						data: "costCenterOwner"
					},
					{
						data: "department"
					},

					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					$('td:eq(4)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

					return row;
				}
			});
			var router = this.$router;
			$("#"+this.costCenter_table+this.index+" tbody").on('click', '.task-detail', function() {
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

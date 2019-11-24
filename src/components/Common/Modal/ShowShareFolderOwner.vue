<template>
	<div style="font-size:14px;">
		<button type="button" @click="showList()"   :class="vclass"><slot></slot></button>
		<!-- backModal start-->
		<div class="modal fade" id="folderModal" tabindex="-1" role="dialog" aria-labelledby="folderModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="folderModalLabel">Choose Folder</h4>
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

																	<div>
																		<span class="form-control col-sm-4" style="width: 100%">Choose a Folder Path</span>
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">

																	<div>
																		<input type="text" id="folderName" class="form-control col-sm-4" style="width: 100%" placeholder="folderName">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">

																	<div>
																		<button type="button" class="btn btn-primary btn-sm" @click="draw();">
																				<span class="fa fa-search">  </span>
																				&nbsp;&nbsp;Search
																		</button>
																	</div>
																</div>


														</div>
														</form>
														<table id="folder_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Folder Path</th>
																	<th>Owner</th>
																	<th>StaffCode</th>
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
		name: "ChooseFolder",
		props: ['vclass','currIndex'],
		 
		methods: {
			showList: function() {

				$('#folderModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});


			},
			closemodal: function() {

			},
			draw: function() {
			 
				var newId="folder_table_"+this.currIndex;
			 	 
				$("#folder_table").attr("id",newId);
				$("#"+newId).DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var folderName = $("#folderName").val();

				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"folderName": folderName
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
			sendMsgToParent: function(data,nowIndex) {
			 
			this.$emit("callbackFolder", data,nowIndex);
			}
		},
		mounted() {
			var queryData = this.retrieveData;
			var sendMsgToParent = this.sendMsgToParent;
			var newId="folder_table_"+this.currIndex;	
			var nowIndex=this.currIndex;	
				
			$("#folder_table").attr("id",newId);
			newId="#"+newId;
			var draw = this.draw;
			var table = $(newId).DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/FolderPathMGT/chooseFolder",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [2]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [

					{data: "folderName"},
					{data: "folderOwner"} ,
					{data: "staffCode"},
                    {data: null}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					$('td:eq(1)', row).html(data.folderName);
					$('td:eq(2)', row).html(data.folderOwner);
					$('td:eq(3)', row).html(data.staffCode);
				 
				 
					$('td:eq(4)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm folder-detail"> select</button>');

					return row;
				}
			});
			var router = this.$router;
 			$(newId+' tbody').on('click', '.folder-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
			
			  sendMsgToParent(data,nowIndex);


			});
			//this.draw();
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});

		}
	}
</script>

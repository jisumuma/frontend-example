<template>
	<div>
		<!-- Main content -->
		<section class="content">
			<!-- Main row -->
			<div class="row">
				<!-- Left col -->
				<div class="col-md-12">
					<!-- table 2 start-->
					<div class="box box-primary1">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-list-alt"></i> &nbsp;{{$t("PurchaseProject")}}</h3>
						</div>
						<!-- /.box-header -->
						<div class="box-body">
							<div id="resource_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
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
												<div class="form-group col-xs-12 col-sm-12 col-md-2 ">
													<label class=" control-label  pad-top-7 text-muted" style="font-weight: 700;">
                                                		Project Name
                                            		</label>

												</div>
												<div class="form-group col-xs-12 col-sm-12 col-md-3 ">

													<div class="" style="display:inline-block;">
														<input type="text" id="projectNameSearch" class="form-control col-sm-4" style="width: 100%" placeholder="Project Name">
													</div>
												</div>

												<div class="form-group col-xs-12 col-sm-12 col-md-6 ">
													<button type="button" class="btn btn-primary btn-sm" @click="draw();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
												</div>
											</div>
										</form>
										<table id="project_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
											<thead>
												<tr role="row" style="height:20px;width:100%;">
													<th>No.</th>
													<th>Project&nbsp;Name</th>
													<th>Active</th>
													<th>Operation</th>
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

				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-plus-circle"></i> &nbsp; Add Project</h3>
						</div>
						<form role="form" id="addproject">
							<div class="box-body">

								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Project Name</label>
											<input type="text" class="form-control" id="projectName" name="projectName" placeholder="Project Name">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Active</label>
											<select class="form-control" id="activeStatus" name="activeStatus">
												<option value="True">True</option>
												<option value="False">False</option>
											</select>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-success" @click="addNewProject">Submit</button>
										</div>
									</div>
								</div>
							</div>

						</form>
					</div>
				</div>
				<!-- /.box -->

			</div>
			<!-- /.row -->
		</section>
		<!-- /.content -->

		<!--modal edit Resource start-->
		<div class="modal fade" id="projectModal" tabindex="-1" role="dialog" aria-labelledby="projectModalLabel">
			<!--modal-sm modal-lg modal-full-->
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="projectModalLabel">Edit Project</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">

							<form role="form" id="editProject">
								<div class="box-body">

									<div class="row">
										<input name="id" type="hidden" id="projectId" />
										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Project Name</label>
												<input type="text" class="form-control" id="projectNameEdit" name="projectName" placeholder="Project Name">
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Active</label>
												<select class="form-control" id="activeStatusEdit" name="activeStatus">
													<option value="True">True</option>
													<option value="False">False</option>
												</select>
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
												<button type="button" class="btn btn-success" @click="editProject">Submit</button>
											</div>
										</div>
									</div>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--modal edit Resource end-->
	</div>
</template>

<script>
	export default {
		name: "PurchaseProject",
		props: [],
		methods: {
			draw: function() {
				$("#project_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var projectName = $("#projectNameSearch").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"projectName": projectName
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

			addNewProject: function() {
				var newProject = $("#addproject").serialize();
				var flag = true;

				var projectName = $("#projectName").val();
				if(projectName == '' || projectName == undefined || projectName == null) {
					$.alert("Please fill Project Name.请填写Project Name。");
					flag = false;
				}

				if(flag) {
					$.ajax({
						url: Config.getBaseURL() + "/purchaseProject/save",
						data: newProject,
						type: 'post',
						dataType: 'json',
						success: function(data) {
							$.alert("Add successfully!添加成功！");

							$("#projectName").val('');
							$("#project_table").DataTable().draw();
						},
						error: function(msg) {
							$.alert(msg.responseText);
						}
					});
				}
			},
			editProject: function() {
				var project = $("#editProject").serialize();
				var flag = true;

				var projectName = $("#projectNameEdit").val();
				if(projectName == '' || projectName == undefined || projectName == null) {
					$.alert("Please fill Project Name.请填写Project Name。");
					flag = false;
				}
				if(flag) {

					$.ajax({
						url: Config.getBaseURL() + "/purchaseProject/save", //这个就是请求地址对应sAjaxSource
						data: project,
						type: 'post',
						dataType: 'json',
						success: function(data) {
							$.alert("Update successfully!更新成功！");
							//关闭modal
							$('#projectModal').modal('hide');

							$("#projectNameEdit").val('');

							$("#project_table").DataTable().draw();
						},
						error: function(msg) {
							$.alert(msg.responseText);
						}
					});

				}
			}
		},
		mounted() {
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#project_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/purchaseProject/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [3]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "id"
					},

					{
						data: "projectName"
					},
					{
						data: "activeStatus"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始

					$('td:eq(3)', row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>');

					return row;
				}
			});
			var router = this.$router;

			$('#project_table tbody').on('click', '.opt-edit', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
				$("#projectId").val(data.id);
				$("#projectNameEdit").val(data.projectName);
				$("#activeStatusEdit").val(data.activeStatus);

				$('#projectModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});

			});
			$('#project_table tbody').on('click', '.opt-delete', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				/*	if(confirm("Are you sure you want to delete this record(project name is " + data.projectName + ")? 是否确定想要删除这条记录（project name是" + data.projectName + "）？")) {
						$.ajax({
							url: Config.getBaseURL() + "/purchaseProject/delete", //这个就是请求地址对应sAjaxSource
							data: {
								"id": data.id
							},
							type: 'get',
							dataType: 'json',
							success: function(data) {
								$.alert("Delete successfully!删除成功！");
								draw();
							},
							error: function(msg) {
								$.alert(msg.responseText);
							}
						});
					}*/

				$.confirm({
					title: 'Confirm',
					content: 'Are you sure you want to delete this record(project name is ' + data.projectName + ')? 是否确定想要删除这条记录（project name是' + data.projectName + '）？',
					buttons: {
						ok: {
							text: "Confirm",
							btnClass: '',
							keys: ['enter'],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/purchaseProject/delete", //这个就是请求地址对应sAjaxSource
									data: {
										"id": data.id
									},
									type: 'get',
									dataType: 'json',
									success: function(data) {
										$.alert("Delete successfully!删除成功！");
										draw();
									},
									error: function(msg) {
										$.alert(msg.responseText);
									}
								});
							}
						},
						cancel: {
							text: "Cancle",
							btnClass: '',
							keys: ['esc'],
							action: function() {
								//alert("你点击了取消按钮！")
							}

						}
					}
				});
			});
			//this.draw();
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		}
	}
</script>
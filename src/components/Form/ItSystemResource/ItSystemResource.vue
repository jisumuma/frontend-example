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
							<h3 class="box-title"><i class="fa fa-list-alt"></i> &nbsp;{{$t("ItSystemResource")}}</h3>
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
													<label class=" control-label  pad-top-7 text-muted" style="font-weight: 700;vertical-align: middle;">
                                                		System Resource
                                            		</label>

												</div>
												<div class="form-group col-xs-12 col-sm-12 col-md-3 ">

													<div class="" style="display:inline-block;">
														<input type="text" id="resourceNameSearch" class="form-control col-sm-4" style="width: 100%" placeholder="System Resource">
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
										<table id="resource_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
											<thead>
												<tr role="row" style="height:20px;width:100%;">
													<th>No.</th>
													<th>Department</th>
													<th>System</th>
													<th>Resource Name</th>
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
							<h3 class="box-title"><i class="fa fa-plus-circle"></i> &nbsp; Add System Resource</h3>
						</div>
						<form role="form" id="addresource">
							<div class="box-body">
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label>
										            	<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Department
										            </label>

											<div>
												<select id="departmentName" class="form-control input" v-select uri="/dict/list?groupName=ItSystemResourceDepartment" name="departmentName"></select>
											</div>
										</div>
									</div>
									<div class="col-md-3">

										<div class="form-group">
											<label>
										            <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>	System
										            </label>

											<div>
												<select id="systemName" class="form-control input" v-select uri="/dict/list?groupName=ItSystemResourceSystem" name="systemName"></select>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Resource Name</label>
											<input type="text" class="form-control" id="resourceName" name="resourceName" placeholder="Resource Name">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Resource Owner</label>
											<div class="input-group">
												<input type="hidden" id="resourceOwnerId" name="resourceOwnerId" />
												<input type="text" class="form-control" id="resourceOwnerName" name="resourceOwnerName" placeholder="Resource Owner" readonly="readonly">
												<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        </span>
											</div>
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
											<button type="button" class="btn btn-success" @click="addNewResource">Submit</button>
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
		<div class="modal fade" id="resourceModal" tabindex="-1" role="dialog" aria-labelledby="resourceModalLabel">
			<!--modal-sm modal-lg modal-full-->
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="resourceModalLabel">Edit Resource</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">

							<form role="form" id="editResource">
								<div class="box-body">
									<div class="row">
										<div class="col-md-3">
											<input name="id" type="hidden" id="resourceId" />
											<div class="form-group">
												<label>
										            	<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Department
										            </label>

												<div>
													<select id="departmentNameEdit" class="form-control input" v-select uri="/dict/list?groupName=ItSystemResourceDepartment" name="departmentName"></select>
												</div>
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label>
										            	<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>System
										            </label>

												<div>
													<select id="systemNameEdit" class="form-control input" v-select uri="/dict/list?groupName=ItSystemResourceSystem" name="systemName"></select>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Resource Name</label>
												<input type="text" class="form-control" id="resourceNameEdit" name="resourceName" placeholder="Resource Name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Resource Owner</label>
												<div class="input-group">
													<input type="hidden" id="resourceOwnerIdEdit" name="resourceOwnerId" />
													<input type="text" class="form-control" id="resourceOwnerNameEdit" name="resourceOwnerName" placeholder="Resource Owner" readonly="readonly">
													<span class="input-group-btn" id="selectotherperson1">
					                          			<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
					                          			<ChooseEditPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson1"><i class="fa fa-fw fa-search"></i></ChooseEditPerson>
					                        		</span>
												</div>
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
												<button type="button" class="btn btn-success" @click="editResource">Submit</button>
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
	import Vue from 'vue'
	import ChooseEditPerson from './ChooseEditPerson.vue'
	/*new Vue({
		el:'#resourceModal',
		components:{
			"ChooseEditPerson":ChooseEditPerson
		}
	});*/
	Vue.component("ChooseEditPerson", ChooseEditPerson);
	export default {
		name: "ItSystemResource",
		props: [],
		methods: {
			draw: function() {
				$("#resource_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var resourceName = $("#resourceNameSearch").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"resourceName": resourceName
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
			doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				//console.log(data);
				$("#resourceOwnerId").val(data.id);
				$("#resourceOwnerName").val(data.printENName);

			},
			doAfterSelectOtherPerson1: function(data) {
				$('#selectotherperson1').attr("class", "input-group-btn");
				//console.log(data);
				$("#resourceOwnerIdEdit").val(data.id);
				$("#resourceOwnerNameEdit").val(data.printENName);

			},
			addNewResource: function() {
				var newResource = $("#addresource").serialize();
				var flag = true;
				var resourceOwnerName = $("#resourceOwnerName").val();
				var departmentName = $("#departmentName").val();
				var systemName = $("#systemName").val();
				var resourceName = $("#resourceName").val();
				if(departmentName == '' || departmentName == undefined || departmentName == null) {
					$.alert("Please select Department. 请选择Department。");
					flag = false;
				} else if(systemName == '' || systemName == undefined || systemName == null) {
					$.alert("Please select System. 请选择System。");
					flag = false;
				} else if(resourceName == '' || resourceName == undefined || resourceName == null) {
					$.alert("Please fill Resource Name. 请填写Resource Name。");
					flag = false;
				} else if(resourceOwnerName == '' || resourceOwnerName == undefined || resourceOwnerName == null) {
					$.alert("Please select Resource Owner. 请选择Resource Owner。");
					flag = false;
				}

				if(flag) {
					$.ajax({
						url: Config.getBaseURL() + "/itSystemResource/save",
						data: newResource,
						type: 'post',
						dataType: 'json',
						success: function(data) {
							$.alert("Add successfully! 添加成功！");
							$("#resourceOwnerId").val('');
							$("#resourceOwnerName").val('');
							$("#departmentName").val('');
							$("#systemName").val('');
							$("#resourceName").val('');
							$("#resource_table").DataTable().draw();
						},
						error: function(msg) {
							$.alert(msg.responseText);
						}
					});
				}
			},
			editResource: function() {
				var resource = $("#editResource").serialize();
				var flag = true;
				var resourceOwnerName = $("#resourceOwnerNameEdit").val();
				var departmentName = $("#departmentNameEdit").val();
				var systemName = $("#systemNameEdit").val();
				var resourceName = $("#resourceNameEdit").val();
				if(departmentName == '' || departmentName == undefined || departmentName == null) {
					$.alert("Please select Department. 请选择部门。");
					flag = false;
				} else if(systemName == '' || systemName == undefined || systemName == null) {
					$.alert("Please select System. 请选择System。");
					flag = false;
				} else if(resourceName == '' || resourceName == undefined || resourceName == null) {
					$.alert("Please fill Resource Name. 请填写Resource Name。");
					flag = false;
				} else if(resourceOwnerName == '' || resourceOwnerName == undefined || resourceOwnerName == null) {
					$.alert("Please select Resource Owner. 请选择Resource Owner。");
					flag = false;
				}
				if(flag) {

					$.ajax({
						url: Config.getBaseURL() + "/itSystemResource/save", //这个就是请求地址对应sAjaxSource
						data: resource,
						type: 'post',
						dataType: 'json',
						success: function(data) {
							$.alert("Update successfully! 更新成功！");
							//关闭modal
							$('#resourceModal').modal('hide');

							$("#resourceOwnerIdEdit").val('');
							$("#resourceOwnerNameEdit").val('');
							$("#departmentNameEdit").val('');
							$("#systemNameEdit").val('');
							$("#resourceNameEdit").val('');

							$("#resource_table").DataTable().draw();
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
			var table = $("#resource_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/itSystemResource/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [5]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "id"
					},
					{
						data: "departmentNameValue"
					},
					{
						data: "systemNameValue"
					},
					{
						data: "resourceName"
					},
					{
						data: "activeStatus"
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
					$('td:eq(5)', row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>');

					return row;
				}
			});
			var router = this.$router;

			$('#resource_table tbody').on('click', '.opt-edit', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
				$("#resourceId").val(data.id);
				$("#departmentNameEdit").val(data.departmentName);
				$("#systemNameEdit").val(data.systemName);
				$("#resourceNameEdit").val(data.resourceName);
				$("#resourceOwnerIdEdit").val(data.resourceOwnerId);
				$("#resourceOwnerNameEdit").val(data.resourceOwnerName);
				$("#activeStatusEdit").val(data.activeStatus);

				$('#resourceModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});

			});
			$('#resource_table tbody').on('click', '.opt-delete', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				/*if(confirm("Are you sure you want to delete this record(resource name is " + data.resourceName + ")? ")) {
					$.ajax({
						url: Config.getBaseURL() + "/itSystemResource/delete", //这个就是请求地址对应sAjaxSource
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
					content: 'Are you sure you want to delete this record(resource name is ' + data.resourceName + ')? 是否确定想要删除这条记录（resource name是' + data.resourceName + '）？',
					buttons: {
						ok: {
							text: "Confirm",
							btnClass: '',
							keys: ['enter'],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/itSystemResource/delete", //这个就是请求地址对应sAjaxSource
									data: {
										"id": data.id
									},
									type: 'get',
									dataType: 'json',
									success: function(data) {
										$.alert("Delete successfully! 删除成功！");
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
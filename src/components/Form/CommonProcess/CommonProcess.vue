<template>
	<div>
		<!-- Main content -->
		<section class="content">
			<!-- Main row -->
			<div class="row">
				<!-- Left col -->
				<div class="col-md-12 ">
					<!-- Horizontal Form -->
					<div class="box box-primary1">
						<div class="box-header with-border">
							<h3 class="box-title">
								<i class="fa fa-list-alt"></i> &nbsp;Common Process Management</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<!--<div class="row">

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Group ID</label>
											<input type="text" id="id" class="form-control col-sm-4" style="width: 100%" placeholder="Group ID">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Group Name</label>
											<input type="text" id="name" class="form-control col-sm-4" style="width: 100%" placeholder="Group Name">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary btn-sm" @click="draw();">&nbsp;&nbsp;Search</button>
										</div>
									</div>
								</div>-->
								<br/>
								<table id="group_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
									<thead>
										<tr role="row" style="height:20px;width:100%;">
											<th width="30%">Group Name En</th>
											<th width="20%">Group Name Cn</th>
											<th width="20%">Icon Css </th>
											<th width="20%">Order</th>
											<th width="15%">Operation</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>

						</form>
					</div>
				</div>
				<!-- /.col -->

				<!--<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">
								<i class="fa fa-plus-circle"></i> &nbsp; Add Group</h3>
						</div>
						<form role="form" id="addgroup">
							<input type="reset" style="display:none;" />
							<div class="box-body">

								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Group Name En</label>
											<input type="text" name="name" class="form-control col-sm-4" id="groupNameAdd" style="width: 100%" placeholder="Group Name En">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												Group Name Cn</label>
											<input type="text" name="namecn" class="form-control col-sm-4" id="groupNamecnAdd" style="width: 100%" placeholder="Group Name Cn">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												Icon Css</label>
											<input type="text" name="iconCss" class="form-control col-sm-4" id="iconCssAdd" style="width: 100%" placeholder="Icon Css">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												Order</label>
											<input type="text" name="order" class="form-control col-sm-4" id="orderAdd" style="width: 100%" placeholder="Order">
										</div>
									</div>

									

									<div class="col-md-3">
										<div class="form-group" style="padding-top: 27px;margin-bottom: 0;">
											<button type="button" class="btn btn-success" @click="addNewGroup">Add</button>
										</div>
									</div>

								</div>
							</div>
						</form>
					</div>
				</div>-->
				<!-- /.box -->

			</div>
			<!-- /.row -->
		</section>
		<!-- /.content -->

		<!--modal edit Resource start-->
		<div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="deviceModalLabel">
			<!--modal-sm modal-lg modal-full-->
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h3 class="modal-title" id="deviceModalLabel">Edit Group</h3>
					</div>
					<div class="modal-body" style="width:96%;height:80%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">
							<h4 class="modal-title" id="deviceModalLabel">Edit Group</h4>
							<form role="form" id="editGroup">
								<div class="box-body">

									<div class="row">
										<div class="col-md-3">
											<input name="id" type="hidden" id="groupIdEdit" v-model="form.id" />
											<input name="colorCss" type="hidden" id="colorCssEdit" v-model="form.colorCss" />
											<input name="color2Css" type="hidden" id="color2CssEdit" v-model="form.color2Css" />
											<div class="form-group">
												<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Group Name En</label>
												<input type="text" name="name" class="form-control col-sm-4" id="groupNameEdit" v-model="form.name" style="width: 100%" placeholder="Group Name En">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Group Name Cn</label>
												<input type="text" name="namecn" class="form-control col-sm-4" id="groupNamecnEdit" v-model="form.namecn" style="width: 100%" placeholder="Group Name Cn">
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												Icon Css</label>
												<input type="text" name="iconCss" class="form-control col-sm-4" id="iconCssEdit" v-model="form.iconCss" style="width: 100%" placeholder="Icon Css">
											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												Order</label>
												<input type="text" name="order" class="form-control col-sm-4" id="orderEdit" v-model="form.order" style="width: 100%" placeholder="Order">
											</div>
										</div>

										
									</div>
									<br><br>
									<div class="row">
										<h4 class="modal-title" id="deviceModalLabel">Edit Item</h4>
										<table class="table table-bordered mar-bot-0" width="100%" height="30px">
											<tbody>
												<tr>
													<th width="20%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Group Name</th>
													<th width="20%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Item Name </th>
													<th width="20%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Link </th>
													<th width="15%">Order </th>
													<th width="20%">Icon Css</th>
													<th width="5%" class="text-center">
														<a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
													</th>
												</tr>
												<tr v-bind:key="index" v-for="(entry,index) in form.itemList">

													<td>
														<input type="hidden" class="form-control" id="" v-model="entry.id">
														<input type="text" name="groupName" class="form-control col-sm-4" style="width: 100%" readonly="readonly" v-model="form.name" placeholder="Group Name">

													</td>
													<td>
														<input type="text" name="name" class="form-control col-sm-4" style="width: 100%" v-model="entry.name" placeholder="Item Name">
													</td>
													<td>
														<input type="text" name="href" class="form-control col-sm-4" style="width: 100%" v-model="entry.href" placeholder="Link">
													</td>
													<td>

														<input type="text" name="order" class="form-control col-sm-4" style="width: 100%" v-model="entry.order" placeholder="order">
													</td>
													<td>
														<!--<select class="form-control" id="IconCssEdit" name="iconCss" v-model="entry.iconCss">
															<option value="1">true</option>
															<option value="0">false</option>
														</select>-->
														<input type="text" name="iconCss" class="form-control col-sm-4" style="width: 100%" v-model="entry.iconCss" placeholder="Icon Css">
													</td>
													<td class="text-center" style="vertical-align: middle;">
														<a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
													</td>
												</tr>

											</tbody>
										</table>
									</div>

									<div class="row">

										<div class="col-md-12">
											<div class="form-group" style="padding-top: 27px;margin-bottom: 0;float:right;">
												<button type="button" class="btn btn-success" @click="editGroup">Submit</button>
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
		name: "CommonProcess",
		props: [],
		methods: {
			draw: function() {
				var id = $("#id").val();
				if(isNaN(Number(id))) { //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
					$.alertApon(' Please enter the Numbers.请输入数字。')
					return;
				}
				$("#group_table")
					.DataTable()
					.draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var id = $("#id").val();
				var name = $("#name").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						aoData: JSON.stringify(aoData),
						id: id,
						name: name
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: "get",
					dataType: "json",
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						$.alertApon(msg.responseText);
					}
				});
			},
			changeTableCol: function(key) {
				return this.$t(key);
				/*return key;*/
			},
			//表格行添加调用方法
			insertItineraryRows: function() {

				var newItem = {};
				for(var key in this.form.itemList[0]) {
					newItem[key] = "";
				}
				this.form.itemList.push(newItem);
			},

			//表格行删除调用方法
			deleteItineraryRows: function(rowId) {
				this.form.itemList.splice(rowId, 1);
			},

			addNewGroup: function() {
				var newDevice = $("#addgroup").serialize();
				var flag = true;

				var groupNameAdd = $("#groupNameAdd").val();
				var groupNamecnAdd = $("#groupNamecnAdd").val();
				
				if(flag == true) {
					if(groupNameAdd == "" || groupNameAdd == undefined || groupNameAdd == null) {
						$.alertApon("Please fill Name En.请填写英文名称");
						flag = false;
					} else 
					if(groupNamecnAdd == "" || groupNamecnAdd == undefined || groupNamecnAdd == null) {
						$.alertApon("Please fill Name Cn.请填写中文名称");
						flag = false;
					}
				}
				if(flag) {
					$.ajax({
						url: Config.getBaseURL() + "/commonprocess/save",
						data: newDevice,
						type: "post",
						dataType: "json",
						success: function(data) {
							$.alertApon("Add successfully!添加成功！");
							// $('#addproject')[0].reset()
							$("input[type=reset]").trigger("click");
							$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display", "none");
							$("#groupNameAdd").val("");
							$("#group_table")
								.DataTable()
								.draw();
						},
						error: function(msg) {
							$.alertApon(msg.responseText);
						}
					});
				}
			},
			editGroup: function() {
				let form = this.form;

				var editGroup = $("#editGroup").serialize() + "&itemList=" + form.itemList;

				var flag = true;

				var nameEdit = form.name;
				var namecnEdit = form.namecn;
				
				if(flag == true) {
					if(nameEdit == "" || nameEdit == undefined || nameEdit == null) {
						$.alertApon("Please fill Group Name En.请填写英文名称");
						flag = false;
					}else 
					if(namecnEdit == "" || namecnEdit == undefined || namecnEdit == null) {
						$.alertApon("Please fill Group Name Cn.请填写中文名称");
						flag = false;
					}
				}
				if(flag == true) {

					for(var index in form.itemList) {

						if(form.itemList[index].name == "" || form.itemList[index].name == undefined || form.itemList[index].name == null) {
							$.alertApon("Please fill name.");
							flag = false;
							return;
						}
						if(form.itemList[index].href == "" || form.itemList[index].href == undefined || form.itemList[index].href == null) {
							$.alertApon("Please fill Link.");
							flag = false;
							return;
						}

					}
				}
				if(flag) {
					$.ajax({
						url: Config.getBaseURL() + "/commonprocess/update", //这个就是请求地址对应sAjaxSource
						data: JSON.stringify(form),
						type: "post",
						dataType: 'text',
						contentType: "application/json",
						success: function(data) {
							$.alertApon("Update successfully!更新成功！");

							//关闭modal
							$("#groupModal").modal("hide");

							$("input[type=reset]").trigger("click");
							$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display", "none");

							form.name = "";
							form.colorCss = "";
							form.order = "";
							form.iconCss = "";
							form.id = "";
							form.itemList = [];

							$("#group_table")
								.DataTable()
								.draw();
						},
						error: function(msg) {
							$.alertApon(msg.responseText);
						}
					});
				}
			}
		},
		data() {
			var dm = {};
			dm.form = {};
			dm.form.id = "";
			dm.form.name = "";
			dm.form.namecn = "";
			dm.form.colorCss = "";
			dm.form.color2Css = "";
			dm.form.order = "";
			dm.form.iconCss = "";
			dm.form.itemList = [];
			return dm;
		},
		mounted() {
			var gal = this.GL;
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#group_table").DataTable({
				fnServerData: queryData,
				sAjaxSource: Config.getBaseURL() + "/commonprocess/list",
				serverSide: true,
				filter: false,
				lengthChange: false,
				aoColumnDefs: [{
					bSortable: false,
					aTargets: [0, 1, 2, 3,4]
				}],
				aaSorting: [
					[3, "asc"]
				], //给列表排序
				columns: [{
						data: "name"
					},
					{
						data: "namecn"
					},
					{
						data: "iconCss"
					},
					{
						data: "order"
					},
					{
						data: null
					}

				],
				fnRowCallback: function(row, data, index) {
					//设置列从0开始

					//$("td:eq(4)", row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>');
					$("td:eq(4)", row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>');
					return row;
				}
			});
			var router = this.$router;
			let form = this.form;
			$("#group_table tbody").on("click", ".opt-edit", function() {

				$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display", "none");
				// console.log(form.attachment);
				var row = $(this).parents("tr");
				var data = table.row(row).data();

				form.name = data.name;
				form.namecn = data.namecn;
				form.order = data.order;
				form.id = data.id;
				form.iconCss = data.iconCss;
				form.colorCss = data.colorCss;
				form.color2Css = data.color2Css;
				form.itemList = data.itemList;

				$("#groupModal").modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
			});
			$("#group_table tbody").on("click", ".opt-delete", function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();

				$.confirm({
					title: "Information:",
					content: "Are you sure you want to delete this record? 是否确定想要删除这条记录？",
					buttons: {
						ok: {
							text: "Yes",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/commonprocess/delete", //这个就是请求地址对应sAjaxSource
									data: {
										id: data.id
									},
									type: "get",
									dataType: "json",
									success: function(data) {
										$.alertApon("Delete successfully!删除成功！");
										draw();
									},
									error: function(msg) {
										//$.alertApon(msg.responseText);
									}
								});
							}
						},
						cancel: {
							text: "No",
							btnClass: "",
							keys: ["esc"],
							action: function() {
								//alert("你点击了取消按钮！")
							}
						}
					}
				});
			});
			//this.draw();
			this.$root.eventHub.$off("changLangEvent");
			this.$root.eventHub.$on("changLangEvent", lang => {
				this.draw();
			});
		}
	};
</script>

<style>
	.ReferencePicture div div .uploadifive-button.btn.btn-default input[type=file] {
		font-size: 30px;
		opacity: 0;
		position: absolute;
		right: -3px;
		top: -3px;
		left: -10px;
	}
	
	.ReferencePicture div div div.uploadifive-button.btn.btn-default {
		position: relative;
		right: -73px;
		top: 3px;
	}
	
	.ReferencePicture div div div.users-list.clearfix.upload-images-list {
		display: inline-block;
		margin-top: 5px;
		float: left;
		width: 50%;
	}
	
	.ReferencePicture div div div.users-list.clearfix.upload-images-list li {
		width: 100%;
		padding-top: 0;
		margin-top: -5px;
	}
	
	.ReferencePicture div div div.users-list.clearfix.upload-images-list li span {
		width: 100%;
		text-align: center;
		margin-top: 3px;
		display: none;
	}
	
	.ReferencePicture div div div.users-list.clearfix.upload-images-list li span button {
		width: 100%;
	}
	
	.ReferencePicture div div div.users-list.clearfix.upload-images-list li div img {
		border-radius: 0;
	}
	
	.ReferencePicture div div div.users-list.clearfix.upload-images-list li div {
		height: 100px;
	}
</style>
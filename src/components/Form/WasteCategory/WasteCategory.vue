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
							<h3 class="box-title"><i class="fa fa-list-alt"></i> &nbsp;<!--{{$t("WasteCategory")}}-->Hazardous Waste Category</h3>
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
                                                		Category Name
                                            		</label>

												</div>
												<div class="form-group col-xs-12 col-sm-12 col-md-3 ">

													<div class="" style="display:inline-block;">
														<input type="text" id="categoryNameSearch" class="form-control col-sm-4" style="width: 100%" placeholder="Category Name">
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
										<table id="category_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
											<thead>
												<tr role="row" style="height:20px;width:100%;">
													<th>No.</th>
													<th>Category&nbsp;&nbsp;Name</th>
													<th>Category&nbsp;&nbsp;Level</th>
													<th>Parent&nbsp;&nbsp;Category&nbsp;&nbsp;Name</th>
													<th>Subject&nbsp;&nbsp;NO</th>
													<th>Quantity&nbsp;&nbsp;Unit</th>
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
							<h3 class="box-title"><i class="fa fa-plus-circle"></i> &nbsp; Add Waste Category</h3>
						</div>
						<form role="form" id="addcategory">
							<div class="box-body">

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category Name</label>
											<input type="text" class="form-control" id="categoryName" name="categoryName" placeholder="Category Name">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category Level</label>
											<select class="form-control" id="categoryLevel" name="categoryLevel" v-model="form.categoryLevel">
												<option value="1">1</option>
												<option value="2">2</option>
											</select>
										</div>
									</div>

								</div>
								<div class="row" v-if="form.categoryLevel=='2'">
									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Parent Category</label>
											<select class="form-control" id="parentId" name="parentId" v-select uri="/wastecategory/listlevel/1">

											</select>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">Subject No</label>
											<input type="text" class="form-control" id="subjectNo" name="subjectNo" placeholder="Subject No">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">Quantity Unit</label>
											<input type="text" class="form-control" id="quantityUnit" name="quantityUnit" placeholder="Quantity Unit">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>IF HAS Other Input</label>
											<select class="form-control" id="ifhasOtherinput" name="ifhasOtherinput">
												<option value="NO">NO</option>
												<option value="YES">YES</option>
											</select>
										</div>
									</div>

								</div>
								<div class="row">
									<div class="col-md-3">
										<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-success" @click="addNewCategory">Submit</button>
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
		<div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel">
			<!--modal-sm modal-lg modal-full-->
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="categoryModalLabel">Edit Waste Category</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">

							<form role="form" id="editcategory">
								<div class="box-body">

									<div class="row">
										<input name="id" type="hidden" id="categoryId" />
										<div class="col-md-6">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category Name</label>
												<input type="text" class="form-control" id="categoryNameEdit" name="categoryName" placeholder="Category Name">
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category Level</label>
												<select class="form-control" id="categoryLevelEdit" name="categoryLevel" v-model="form.categoryLevelEdit">
													<option value="1">1</option>
													<option value="2">2</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row" v-if="form.categoryLevelEdit=='2'">
										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Parent Category</label>
												<select class="form-control" id="parentIdEdit" name="parentId" v-select uri="/wastecategory/listlevel/1">

												</select>
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">Subject No</label>
												<input type="text" class="form-control" id="subjectNoEdit" name="subjectNo" placeholder="Subject No">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">Quantity Unit</label>
												<input type="text" class="form-control" id="quantityUnitEdit" name="quantityUnit" placeholder="Quantity Unit">
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>IF HAS Other Input</label>
												<select class="form-control" id="ifhasOtherinputEdit" name="ifhasOtherinput">
													<option value="NO">NO</option>
													<option value="YES">YES</option>
												</select>
											</div>
										</div>
									

									</div>
										<div class="row">
											<div class="col-md-3">
												<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
													<button type="button" class="btn btn-success" @click="editCategory">Submit</button>
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
		name: "WasteCategory",
		props: [],
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取

			dm.form={};
			dm.form.categoryLevel='1';
			dm.form.categoryLevelEdit='1';

			return dm;
		},
		methods: {
			draw: function() {
				$("#category_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var categoryName = $("#categoryNameSearch").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"categoryName": categoryName
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

			addNewCategory: function() {
				var newCategory = $("#addcategory").serialize();
				var flag = true;

				var categoryName = $("#categoryName").val();
				var parentId=$("#parentId").val();
				var quantityUnit=$("#quantityUnit").val();

				if(categoryName == '' || categoryName == undefined || categoryName == null) {
					$.alert("Please fill Category Name. 请填写Category Name。");
					flag = false;
				}

				if(parentId){
					if(parentId == '' || parentId == undefined || parentId == null) {
						$.alert("Please Select Parent Category.请选择Parent Category。");
						flag = false;
					}
				}

				if(quantityUnit){
					if(quantityUnit == '' || quantityUnit == undefined || quantityUnit == null) {
						$.alert("Please fill Quantity Unit.请填写Quantity Unit。");
						flag = false;
					}
				}
				var form =this.form;
				if(flag) {
					$.ajax({
						url: Config.getBaseURL() + "/wastecategory/save",
						data: newCategory,
						type: 'post',
						dataType: 'json',
						success: function(data) {
							$.alert("Add successfully!添加成功！");

							$("#categoryName").val('');
							$("#categoryLevel").val('1');
							form.categoryLevel='1';
							$("#parentId").val('');
							$("#subjectNo").val('');
							$("#quantityUnit").val('');
							$("#ifhasOtherinput").val('');
							$("#category_table").DataTable().draw();
						},
						error: function(msg) {
							$.alert(msg.responseText);
						}
					});
				}
			},
			editCategory: function() {
				var category = $("#editcategory").serialize();
				var flag = true;

				var categoryName = $("#categoryNameEdit").val();
				var parentId=$("#parentIdEdit").val();
				var quantityUnit=$("#quantityUnitEdit").val();

				if(categoryName == '' || categoryName == undefined || categoryName == null) {
					$.alert("Please fill Category Name. 请填写Category Name。");
					flag = false;
				}

				if(parentId){
					if(parentId == '' || parentId == undefined || parentId == null) {
						$.alert("Please Select Parent Category.请选择Parent Category。");
						flag = false;
					}
				}

				if(quantityUnit){
					if(quantityUnit == '' || quantityUnit == undefined || quantityUnit == null) {
						$.alert("Please fill Quantity Unit.请填写Quantity Unit。");
						flag = false;
					}
				}
				var form =this.form;
				if(flag) {

					$.ajax({
						url: Config.getBaseURL() + "/wastecategory/save", //这个就是请求地址对应sAjaxSource
						data: category,
						type: 'post',
						dataType: 'json',
						success: function(data) {
							$.alert("Update successfully!更新成功！");
							//关闭modal
							$('#categoryModal').modal('hide');

							$("#categoryId").val('');
							$("#categoryNameEdit").val('');
							$("#categoryLevelEdit").val('1');
							form.categoryLevelEdit='1';
							$("#parentIdEdit").val('');
							$("#subjectNoEdit").val('');
							$("#quantityUnitEdit").val('');
							$("#ifhasOtherinputEdit").val('');

							$("#category_table").DataTable().draw();
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
			var table = $("#category_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/wastecategory/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [6]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "id"
					},

					{
						data: "categoryName"
					},
					{
						data: "categoryLevel"
					},
					{
						data: "parentCategoryName"
					},
					{
						data: "subjectNo"
					},
					{
						data: "quantityUnit"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始

					$('td:eq(6)', row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>');

					return row;
				}
			});
			var router = this.$router;
			var form=this.form;

			$('#category_table tbody').on('click', '.opt-edit', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
				$("#categoryId").val(data.id);
				$("#categoryNameEdit").val(data.categoryName);
				$("#categoryLevelEdit").val(data.categoryLevel);
				form.categoryLevelEdit=data.categoryLevel;
				$("#parentIdEdit").val(data.parentId);
				$("#subjectNoEdit").val(data.subjectNo);
				$("#quantityUnitEdit").val(data.quantityUnit);
				$("#ifhasOtherinputEdit").val(data.ifhasOtherinput);

				$('#categoryModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});

			});
			$('#category_table tbody').on('click', '.opt-delete', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				/*if(confirm("Are you sure you want to delete this record(category name is " + data.categoryName + ")? ")) {
					$.ajax({
						url: Config.getBaseURL() + "/wastecategory/delete", //这个就是请求地址对应sAjaxSource
						data: {
							"id": data.id
						},
						type: 'get',
						dataType: 'json',
						success: function(data) {
							$.alert("Delete success!");
							draw();
						},
						error: function(msg) {
							$.alert(msg.responseText);
						}
					});
				}*/
				
				$.confirm({
					title: 'Confirm',
					content: 'Are you sure you want to delete this record(category name is ' + data.categoryName + ')? 是否确定想要删除这条记录（category name是' + data.categoryName + '）？',
					buttons: {
						ok: {
							text: "Confirm",
							btnClass: '',
							keys: ['enter'],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/wastecategory/delete", //这个就是请求地址对应sAjaxSource
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
							text: "Cancel",
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

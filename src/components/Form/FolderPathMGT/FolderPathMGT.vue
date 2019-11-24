<template>
<!-- Main content -->
<section class="content">
    <!-- Main row -->
	<div class="row">
        <!-- Left col -->
        <div class="col-md-12">
            <!-- table 2 start-->
            <div class="box box-primary1">
                <div class="box-header">
                    <h3 class="box-title">
                       Folder Path Management
                    </h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <!-- <div id="task_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                        <div class="row">
                            <div class="col-sm-6">
                            </div>
                            <div class="col-sm-6">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <form role="form-horizontal" style="background-color: #F1F5F8"> -->

								<!-- <div class="box-body">

                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Folder Path
                                            </label>
                                            <div>
                                                <input type="text" class="form-control" id="folderName" style="width: 100%"  >

											</div>

										 </div>
										<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                        	<div style="width: 90px">
											<form-group  type="select2" uri="/FolderPathMGT/listforselect" :readonly="readonly" name="Attribute"v-model="attributes"></form-group>
											</div>
										</div>

										<div class="form-group col-xs-12 col-sm-12 col-md-3 col-lg-3" style="padding-top: 23px;">
                                            <button type="button" class="btn btn-primary btn-sm" @click="draw();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
											 &nbsp;&nbsp;
											<button type="button" class="btn btn-primary btn-sm" @click="add();">
                                                <span class="fa fa-plus">
                                                </span>
                                                &nbsp;&nbsp;Add
                                            </button>
                                        </div>


                                    </div>  -->
								<!-- <div class="text-muted well well-sm no-shadow">

									<div class="row">

										<div class="form-group col-md-3">
											<label for=""> Folder Path</label>
											 <input type="text" class="form-control" id="folderName" style="width: 80%"  >
										</div>
										<div class="form-group col-md-3">
											<div class="form-group" style="width: 100%">
												<form-group  type="select2" uri="/FolderPathMGT/listforselect"  name="Attribute"v-model="attributes" style="width: 100px"></form-group>
											</div>
										</div>

										<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary btn-sm" @click="draw();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
											 &nbsp;&nbsp;
											<button type="button" class="btn btn-primary btn-sm" @click="add();">
                                                <span class="fa fa-plus">
                                                </span>
                                                &nbsp;&nbsp;Add
                                            </button>
										</div>
									</div>
								</div>
                                </form>

                                <table id="folder_table" class="table table-bordered dataTable" role="grid"
                                aria-describedby="example2_info" style="margin-top: 20px">
                                    <thead>
                                        <tr role="row">
                                            <th>No.</th>
                                            <th>Folder Path</th>
                                            <th>Owner</th>
											<th>Attribute</th>
                                            <th>Active</th>
                                            <th>Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> -->

							<form>
								<div class="text-muted well well-sm no-shadow">

									<div class="row">
										<!-- 申请单号 -->
										<div class="form-group col-md-3">
											<label for=""> Folder Path</label>
											 <input type="text" class="form-control" id="folderName">
										</div>
										<div class="form-group col-md-3">
											<form-group  type="select2" uri="/FolderPathMGT/listforselect" :readonly="readonly" name="Attribute"v-model="attributes"></form-group>
										</div>

										<!-- 搜索、导出按钮 -->
										<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary btn-sm" @click="draw();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
											 &nbsp;&nbsp;
											<button type="button" class="btn btn-primary btn-sm" @click="add();">
                                                <span class="fa fa-plus">
                                                </span>
                                                &nbsp;&nbsp;Add
                                            </button>
										</div>
									</div>
								</div>
							</form>
							 <table id="folder_table" class="table table-bordered dataTable" role="grid"
                                aria-describedby="example2_info" style="margin-top: 20px">
                                    <thead>
                                        <tr role="row">
                                            <th>No.</th>
                                            <th>Folder Path</th>
                                            <th>Owner</th>
											<th>Attribute</th>
                                            <th>Active</th>
                                            <th>Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>




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

</template>



<script>
	export default{
		name: "FolderPath",
		methods:{
	    	draw:function(){
	    		$("#folder_table").DataTable().draw();
	    	},
           refresh:function(){
	          $("#folder_table").DataTable().draw();
           },
		   add:function(){
			this.$router.push({ path: '/index/form/FolderPathEdit/create?id=0'});

		   },
	    	retrieveData:function(url,aoData, fnCallback){
	    	    var folderName = $("#folderName").val();
				var attribute = this.attributes;

	    		$.ajax({
					url : url, //这个就是请求地址对应sAjaxSource
			        data : {"aoData":JSON.stringify(aoData),"folderName":folderName,"attribute":attribute},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
			        type : 'get',
			        dataType : 'json',
			        success : function(data) {
			             fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
			        },
			        error : function(msg) {
			             $.alert(msg.responseText);
			        }
			   });
	    	},
	    	changeTableCol:function(key){
	    		return this.$t(key);
			},

	    },
		mounted(){
			this.attributes=null;
			var queryData = this.retrieveData;
			var applicantId=localStorage.uname;
			var veeFnt = this.changeTableCol;
			var format = this.GL.formatDate;//格式化日期函数
			var draw = this.draw;
             var folderName = $("#folderName").val();
 			var table = $("#folder_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL()+"/FolderPathMGT/list?folderName="+folderName,
				"serverSide": true,
				"filter":false,
				"lengthChange": false,
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [0,1,2,3,4,5]}],
				"aaSorting": [[4, "desc"]],  //给列表排序
				columns:[
					{data: "id"},
					{data: "folderName"},
					{data: "folderOwner"},
					{data: "attribute"},
					{data: "active"} ,
                    {data: null} ,
				],
				"fnRowCallback" : function(row, data,index) {//设置列从0开始
					$('td:eq(1)', row).html(data.folderName);
					$('td:eq(2)', row).html(data.folderOwner);
					// $('td:eq(3)', row).html(data.attribute);
					$('td:eq(4)', row).html(data.active=='0'?'true':'false');

					$('td:eq(5)', row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>');
					return row;
				}
			});
			var router = this.$router;
			$('#folder_table tbody').on('click', '.opt-edit', function () {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
					router.push({ path: '/index/form/FolderPathEdit/create?id='+data['id']+'&folderName='+data['folderName']+'&folderOwner='+data['folderOwner']+'&active='+data['active']+'&staffCode='+data['staffCode']});

			});
            	$('#folder_table tbody').on('click', '.opt-delete', function () {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
                	$.ajax({
					url: Config.getBaseURL() + "/FolderPathMGT/delete",
					data: {
						"id": data['id']
					},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$.alert(data);
                        $("#folder_table").DataTable().draw();
					},
					error: function(msg) {

						$.alert(msg);

					}
				});


					router.push({ path: '/index/form/FolderPathMGT/create?id='+data['id']});

			});

			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang)=>{
				draw();
			});
		}
	}

</script>


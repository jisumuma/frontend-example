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
								<i class="fa fa-list-alt"></i> &nbsp;Employee Standard Set 套装</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Category&nbsp;种类</label>
											<select class="form-control col-sm-4" id="wpType" v-select2>
												<option value="">==请选择==</option>
												<option value="1">Standard Set 套装</option>
												<option value="2">Extend Devices 扩展设备</option>
											</select>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Standard Set Name&nbsp;套装名称</label>
											<input type="text" id="name" class="form-control col-sm-4" style="width: 100%" placeholder="Standard Set Name 套装名称">
										</div>
									</div>
								
									<div class="col-md-3">
										<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary btn-sm" @click="draw();">&nbsp;&nbsp;Search</button>
										</div>
									</div>
								</div>
								<br/>
								<table id="project_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
									<thead>
										<tr role="row" style="height:20px;width:100%;">
											<th>No.</th>
											<th>Category&nbsp;种类</th>
											<th>Standard Set Name&nbsp;套装名称</th>
											<th v-show="false">Dvice&nbsp; 基本设备</th>
											<th>Operation</th>
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

				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">
								<i class="fa fa-plus-circle"></i> &nbsp; Add Employee Standard Set</h3>
						</div>
						<form role="form" id="addproject">
							<input type="reset" style="display:none;" />  
							<div class="box-body">

								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category&nbsp;种类</label>
											<select class="form-control col-sm-4" id="wpTypeAdd" v-select2>
												<option value="">==请选择==</option>
												<option value="1">Standard Set 套装</option>
												<option value="2">Extend Devices 扩展设备</option>
											
											</select>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Standard Set Name&nbsp;套装名称</label>
											<input type="text" name="fcItems" class="form-control col-sm-4" id="wpNameAdd" style="width: 100%" placeholder="Standard Set Name 套装名称">
										</div>
									</div>
							 
										<!-- <div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Device Name&nbsp;设备名称</label>
												<select  v-select2 uri="/wpEmployeeStandard/selectAll" :readonly="readonly" style="width: 100%" name="devicesadd"></select>
										</div>
									</div> -->
									<form-group col="md-6" type="select2" other-rules="required" uri="/standarddevice/listforselect"  multiple="multiple" maxlength=""  name="Add Device  添加设备" v-model="temp" tags="false"></form-group>
									</div>
											<div class="row">
												<p>
                   				<!-- <button type="button" class="btn btn-success" @click="addNewProject">Save</button> -->
                 			 <button style=" width: 100px;margin-right: 20px;" type="button" class="btn pull-right btn-success btn-sm" @click="addNewProject"><i class="fa fa-check"></i> Save </button>
											 	</p>
										<!-- </div> -->
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
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="projectModalLabel">Edit Standard Set</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">

							<form role="form" id="editProject">
								<div class="box-body">

									<div class="row">
										<div class="col-md-3">
											<input name="id" type="hidden" id="projectId" />
											<div class="form-group">
												<label for="">
													<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category&nbsp;种类</label>
												<select name="furType" class="form-control col-sm-4" id="editType">
												<option value="">==请选择==</option>
												<option value="1">Standard Set 套装</option>
												<option value="2">Extend Devices 扩展设备</option>
												</select>
											</div>
										</div>

										<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Standard Set Name&nbsp;套装名称</label>
											<input type="text" name="fcItems" class="form-control col-sm-4" id="editName" style="width: 100%" placeholder="Standard Set Name 套装名称">
											<input type="hidden"  name="deviceId" id="deviceId">
										</div>
									</div>
										
											<form-group col="md-6" type="select2" other-rules="required" uri="/standarddevice/listforselect"  multiple="multiple" maxlength="" name="editDevice" v-model="temps" tags="false"></form-group>
									</div>
									<div class="row">
									<p>
                    <button style=" width: 100px;margin-left: 20px;" type="button" class="btn pull-right btn-success btn-sm" @click="editProject"><i class="fa fa-check"></i> Submit </button>
                 </p>
										<!-- </div> -->
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
  name: "WpEmployeeStandard",
  props: [],
  methods: {
    draw: function() {
      $("#project_table")
        .DataTable()
        .draw();
    },
    retrieveData: function(url, aoData, fnCallback) {
      var wpType = $("#wpType").val();
      var name = $("#name").val();
      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          wpType: wpType,
          name: name
         
        }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type: "get",
        dataType: "json",
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
			var flag = true;
			let _this = this;
      var typeAdd = $("#wpTypeAdd").val();
			var nameAdd = $("#wpNameAdd").val();
			var tempDevice = _this.temp;
			var device= tempDevice.join(",");
			console.log(device);

      if (typeAdd == "" || typeAdd == undefined || typeAdd == null) {
        $.alert("Please fill Category.请填写种类");
        flag = false;
			}
			if(flag == true){
				if (nameAdd == "" || nameAdd == undefined || nameAdd == null) {
					$.alert("Please fill Standard Set Name.请填写套装名称");
					flag = false;
				}
			}
			if(flag == true){
				if (device == "" || device == undefined || device == null) {
					$.alert("Please fill Device Name.请填写设备名称");
					flag = false;
				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/wpEmployeeStandard/save",
          data: {
          
          typeAdd: typeAdd,
					nameAdd: nameAdd,
					device:device
         
        },
          type: "post",
					dataType: "json",
					async: false,
          success: function(data) {
            $.alert("Add successfully!添加成功！");
						// $('#addproject')[0].reset()
						$("input[type=reset]").trigger("click");
						$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
						$("#wpTypeAdd").val("");
						 $("#wpNameAdd").val("");
						
					 $("#project_table")
              .DataTable()
							.draw();
          },
          error: function(msg) {
            $.alert(msg.responseText);
          }
        });
			}
			_this.temp=[];
					
    },
    editProject: function() {
		
      var flag = true;

      var editType = $("#editType").val();
			var editName = $("#editName").val();
			var editId = $("#deviceId").val();
			var tempDeviceEdit = this.temps;
			var deviceedit= tempDeviceEdit.join(",");
		
      if (editType == "" || editType == undefined || editType == null) {
        $.alert("Please fill Category.请填写种类");
        flag = false;
			}
			if(flag == true){
				if (editName == "" || editName == undefined || editName == null) {
					$.alert("Please fill Fc-Item.请填写框架合同项次");
					flag = false;
				}
			}
			if(flag == true){
				if (deviceedit == "" || deviceedit == undefined || deviceedit == null) {
					$.alert("Please fill Device Name.请填写设备名称");
					flag = false;
				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/wpEmployeeStandard/save", //这个就是请求地址对应sAjaxSource
         data: {
          
          typeAdd: editType,
					nameAdd: editName,
					device:deviceedit,
					editId:editId
         
        },
          type: "post",
          dataType: "json",
          success: function(data) {
						$.alert("Update successfully!更新成功！");
						
            //关闭modal
            $("#projectModal").modal("hide");
						$("#editName").val("");
					$("#editType").val("");
					$("#deviceId").val("");

            $("#project_table")
              .DataTable()
              .draw();
          },
          error: function(msg) {
            $.alert(msg.responseText);
          }
        });
      }
    }
  },
  data() {
    var dm = {};
    dm.form = {};
		dm.form.furPic ="";
		dm.form.attachment = [];
		dm.temp=[];
		dm.temps=[];
    return dm;
  },
  mounted() {
	
		var gal = this.GL;
    var queryData = this.retrieveData;
    var draw = this.draw;
    var table = $("#project_table").DataTable({
      fnServerData: queryData,
      sAjaxSource: Config.getBaseURL() + "/wpEmployeeStandard/listAdmin",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [1,2,3,4]
        }
      ],
      aaSorting: [[0, "desc"]], //给列表排序
      columns: [
        {
          data: "id"
        },
        {
          data: "type"
        },
        {
          data: "name"
        },
        {
          data: "deciveIds"
        },
      	{
          data: null
        }
      ],
      fnRowCallback: function(row, data, index) {
      $('td:eq(0)', row).html(index+1);
			 $('td:eq(1)', row).html(data.type=='1'?"<td class='text-green'>Standard Set 套装</td>" :"<td class='text-muted'>Extend Devices 扩展设备</td>");
			  $('td:eq(4)', row).hide();
			 $("td:eq(5)", row).html(
          '<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>'
        );

        return row;
      }
    });
    var router = this.$router;
		let form = this.form;
		let _this = this;
    $("#project_table tbody").on("click", ".opt-edit", function() {
		
			$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
			// console.log(form.attachment);
      var row = $(this).parents("tr");
			var data = table.row(row).data();
      //router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
			$("#editType").val(data.type);
			$("#editName").val(data.name);
			$("#deviceId").val(data.id);
    	_this.temps=data.deciveIds.split(',');
			console.log(_this.temps);

      $("#projectModal").modal({
        backdrop: false, //点击空白处不关闭对话框
        keyboard: false, //键盘关闭对话框
        toggle: true //弹出对话框
      });
    });
    $("#project_table tbody").on("click", ".opt-delete", function() {
      var row = $(this).parents("tr");
      var data = table.row(row).data();
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

      $.confirm({
        title: "Information:",
        content:
          "Are you sure you want to delete this record 是否确定想要删除这条记录",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              $.ajax({
                url: Config.getBaseURL() + "/wpEmployeeStandard/delete", //这个就是请求地址对应sAjaxSource
                data: {
                  id: data.id
                },
                type: "get",
                dataType: "json",
                success: function(data) {
                  // $.alert("Delete successfully!删除成功！");
                  draw();
                },
                error: function(msg) {
                  //$.alert(msg.responseText);
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
.ReferencePicture div div .uploadifive-button.btn.btn-default input[type=file]{
	font-size: 30px;
	opacity: 0;
	position: absolute; 
	right: -3px; 
	top: -3px;
	left: -10px;
}
.ReferencePicture div div div.uploadifive-button.btn.btn-default{
	position: relative;
	right: -73px;
	top: 3px;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list{
	display: inline-block; 
	margin-top: 5px;
	float: left;
	width: 50%;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li{
	width: 100%;
	padding-top: 0;
	margin-top: -5px;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li span{
	width: 100%;
	text-align: center;
	margin-top: 3px;
	display: none;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li span button{
	width: 100%;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li div img{
	border-radius: 0;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li div{
	height: 100px;
}
</style>


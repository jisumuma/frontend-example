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
								<i class="fa fa-list-alt"></i> &nbsp;IT Company Phone Employee Standard Set 套装</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
									

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
											<th>Standard Set Name&nbsp;套装名称</th>
											<th>Active</th>
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
									

									<div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Standard Set Name&nbsp;套装名称</label>
											<input type="text" name="fcItems" class="form-control col-sm-4" id="cpNameAdd" style="width: 100%" placeholder="Standard Set Name 套装名称">
										</div>
									</div>
							 
									
										<form-group col="md-6" type="select2" other-rules="" uri="/standarddevice/listforselect/1"  multiple="multiple"  name="Add Phone  添加手机" v-model="tempphone" tags="false"></form-group>
									</div>
									<div class="row">
									

							 			<form-group col="md-6" type="select2" other-rules="" uri="/standarddevice/listforselect/2"  multiple="multiple"  name="Add Pad  添加Pad" v-model="temppad" tags="false"></form-group>
								
									
										<form-group col="md-6" type="select2" other-rules="" uri="/standarddevice/listforselect/4"  multiple="multiple"  name="Add Sim  添加Sim" v-model="tempsim" tags="false"></form-group>
									</div>
											<div class="row">
													<div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Active</label>
											<select class="form-control" id="activeStatusAdd" name="activeStatus">
												<option value="True">True</option>
												<option value="False">False</option>
											</select>
										</div>
									</div>
											<div class="col-md-6">
										<div class="form-group" style="padding-top: 27px;margin-bottom: 0;">
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
										

									<div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Standard Set Name&nbsp;套装名称</label>
											<input type="text" name="editName" class="form-control col-sm-4" id="editName" style="width: 100%" placeholder="Standard Set Name 套装名称">
											<input type="hidden"  name="setId" id="setId">
										</div>
									</div>
											<form-group col="md-6" type="select2" other-rules="" uri="/standarddevice/listforselect/1"  multiple="multiple"  name="Edit Phone  修改手机" v-model="tempsphone" tags="false"></form-group>
									</div>
									
									<div class="row">
									

							 			<form-group col="md-6" type="select2" other-rules="" uri="/standarddevice/listforselect/2"  multiple="multiple"  name="Edit Pad  修改Pad" v-model="tempspad" tags="false"></form-group>
								
									
										<form-group col="md-6" type="select2" other-rules="" uri="/standarddevice/listforselect/4"  multiple="multiple"  name="Edit Sim  修改Sim" v-model="tempssim" tags="false"></form-group>
									</div>
									<div class="row">
													<div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Active</label>
											<select class="form-control" id="activeStatusEdit" name="activeStatus">
												<option value="True">True</option>
												<option value="False">False</option>
											</select>
										</div>
									</div>
											<div class="col-md-6">
										<div class="form-group" style="padding-top: 27px;margin-bottom: 0;">
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
  name: "ItcpEmset",
  props: [],
  methods: {
    draw: function() {
      $("#project_table")
        .DataTable()
        .draw();
    },
    retrieveData: function(url, aoData, fnCallback) {
      var name = $("#name").val();
      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          setName: name
         
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
			var nameAdd = $("#cpNameAdd").val();
			var tempphone = this.tempphone;
			var temppad = this.temppad;
			var tempsim = this.tempsim;
			var phone= tempphone.join(",");
			var pad= temppad.join(",");
			var sim= tempsim.join(",");
			var activeStatus=$("#activeStatusAdd").val();
     
			if(flag == true){
				if (nameAdd == "" || nameAdd == undefined || nameAdd == null) {
					$.alert("Please fill Standard Set Name.请填写套装名称");
					flag = false;
				}
			}
			/*if(flag == true){
				if (phone == "" || phone == undefined || phone == null) {
					$.alert("Please select phone.请选择手机");
					flag = false;
				}
			}
			if(flag == true){
				if (pad == "" || pad == undefined || pad == null) {
					$.alert("Please select pad.请选择pad");
					flag = false;
				}
			}
			if(flag == true){
				if (sim == "" || sim == undefined || sim == null) {
					$.alert("Please select sim.请选择sim卡");
					flag = false;
				}
			}*/
	    if (flag) {
	        $.ajax({
	          url: Config.getBaseURL() + "/itcpemset/save",
	          data: {
						setName: nameAdd,
						phoneIds:phone,
						padIds:pad,
						simIds:sim,
	         			activeStatus:activeStatus
	        },
	          type: "post",
						dataType: "json",
						async: false,
	          success: function(data) {
	            $.alert("Add successfully!添加成功！");
							// $('#addproject')[0].reset()
							$("input[type=reset]").trigger("click");
							 $("#cpNameAdd").val("");
							_this.tempphone=[];
							_this.temppad=[];
							_this.tempsim=[];
							
						 $("#project_table")
	              .DataTable()
								.draw();
	          },
	          error: function(msg) {
	            $.alert(msg.responseText);
	          }
	        });
		}
					
    },
    editProject: function() {
		
     var flag = true;
			let _this = this;
			var nameAdd = $("#editName").val();
			var tempphone = this.tempsphone;
			var temppad = this.tempspad;
			var tempsim = this.tempssim;
			var phone= tempphone.join(",");
			var pad= temppad.join(",");
			var sim= tempsim.join(",");
			var activeStatus=$("#activeStatusEdit").val();
			var id=$("#setId").val();
     
			if(flag == true){
				if (nameAdd == "" || nameAdd == undefined || nameAdd == null) {
					$.alert("Please fill Standard Set Name.请填写套装名称");
					flag = false;
				}
			}
			/*if(flag == true){
				if (phone == "" || phone == undefined || phone == null) {
					$.alert("Please select phone.请选择手机");
					flag = false;
				}
			}
			if(flag == true){
				if (pad == "" || pad == undefined || pad == null) {
					$.alert("Please select pad.请选择pad");
					flag = false;
				}
			}
			if(flag == true){
				if (sim == "" || sim == undefined || sim == null) {
					$.alert("Please select sim.请选择sim卡");
					flag = false;
				}
			}*/
	    if (flag) {
	        $.ajax({
	          url: Config.getBaseURL() + "/itcpemset/save",
	          data: {
						id:id,
						setName: nameAdd,
						phoneIds:phone,
						padIds:pad,
						simIds:sim,
	         			activeStatus:activeStatus
	        },
	          type: "post",
						dataType: "json",
						async: false,
	          success: function(data) {
	            $.alert("Edit successfully!修改成功！");
	               //关闭modal
            $("#projectModal").modal("hide");
							// $('#addproject')[0].reset()
							$("input[type=reset]").trigger("click");
							 $("#editName").val("");
							_this.tempsphone=[];
							_this.tempspad=[];
							_this.tempssim=[];
							
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
		dm.tempphone=[];
		dm.temppad=[];
		dm.tempsim=[];
		dm.tempsphone=[];
		dm.tempspad=[];
		dm.tempssim=[];
    return dm;
  },
  mounted() {
	
		var gal = this.GL;
    var queryData = this.retrieveData;
    var draw = this.draw;
    var table = $("#project_table").DataTable({
      fnServerData: queryData,
      sAjaxSource: Config.getBaseURL() + "/itcpemset/list",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [3]
        }
      ],
      aaSorting: [[0, "desc"]], //给列表排序
      columns: [
        {
          data: "id"
        },
        {
          data: "setName"
        },
        {
          data: "activeStatus"
        },
      	{
          data: null
        }
      ],
      fnRowCallback: function(row, data, index) {
			 $("td:eq(3)", row).html(
          '<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>'
        );

        return row;
      }
    });
		let _this = this;
    $("#project_table tbody").on("click", ".opt-edit", function() {
		
      var row = $(this).parents("tr");
			var data = table.row(row).data();
      //router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
			$("#editName").val(data.setName);
			$("#setId").val(data.id);
			if(data.phoneIds){
				_this.tempsphone=data.phoneIds.split(',');
			}else{
				_this.tempsphone=[];
			}
    	
    	if(data.padIds){
    		_this.tempspad=data.padIds.split(',');
    	}else{
    		_this.tempspad=[];
    	}
    	
    	if(data.simIds){
    		_this.tempssim=data.simIds.split(',');
    	}else{
    		_this.tempssim=[];
    	}
    	

      $("#projectModal").modal({
        backdrop: false, //点击空白处不关闭对话框
        keyboard: false, //键盘关闭对话框
        toggle: true //弹出对话框
      });
    });
    $("#project_table tbody").on("click", ".opt-delete", function() {
      var row = $(this).parents("tr");
      var data = table.row(row).data();

			/*$('#resourceModal').modal({
				backdrop: false, //点击空白处不关闭对话框
				keyboard: false, //键盘关闭对话框
				toggle: true //弹出对话框
			});
*/
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
                url: Config.getBaseURL() + "/itcpemset/delete", //这个就是请求地址对应sAjaxSource
                data: {
                  id: data.id
                },
                type: "get",
                dataType: "json",
                success: function(data) {
                  $.alert("Delete successfully!删除成功！");
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




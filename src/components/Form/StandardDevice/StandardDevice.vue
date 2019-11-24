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
								<i class="fa fa-list-alt"></i> &nbsp;Device</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
								<!--<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Type</label>
											<select class="form-control col-sm-4" id="deviceType" v-select uri="/dict/list?groupName=standardDeviceType">
												<option value="">--Please select--</option>
												<option value="1">Phone</option>
												<option value="2">Pad</option>
												<option value="3">Computer</option>
												<option value="4">Other</option>
											</select>
										</div>
									</div>-->

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Name</label>
											<input type="text" id="deviceName" class="form-control col-sm-4" style="width: 100%" placeholder="Device Name">
										</div>
									</div>
									
									<div class="col-md-3">
										<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary btn-sm" @click="draw();">&nbsp;&nbsp;Search</button>
										</div>
									</div>
								</div>
								<br/>
								<table id="device_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
									<thead>
										<tr role="row" style="height:20px;width:100%;">
											<th>No.</th>
											<th>Type</th>
											<th>Name</th>
											<th>Pic</th>
											<th>Desc</th>
											<th>Active</th>
                      <th>Order</th>
											<th width="120px">Operation</th>
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
								<i class="fa fa-plus-circle"></i> &nbsp; Add Device</h3>
						</div>
						<form role="form" id="adddevice">
							<input type="reset" style="display:none;" />  
							<div class="box-body">

								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Type</label>
											
											<select class="form-control col-sm-4" name="deviceType" id="deviceTypeAdd" v-select uri="/dict/list?groupName=standardDeviceType">
												<!--<option value="">--Please select--</option>
												<option value="1">Phone</option>
												<option value="2">Pad</option>
												<option value="3">Computer</option>
												<option value="4">Other</option>-->
											</select>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Name</label>
											<input type="text" name="deviceName" class="form-control col-sm-4" id="deviceNameAdd" style="width: 100%" placeholder="Device Name">
										</div>
									</div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="">
                        <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Order</label>
                      <input type="number" name="order" class="form-control col-sm-4" id="orderAdd" style="width: 100%" placeholder="Order">
                    </div>
                  </div>
									
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Device&nbsp;Description</label>
											<textarea type="text" name="deviceDesc" id="deviceDescAdd" rows="2" class="form-control col-sm-4" style="width: 100%" placeholder="Device Description"></textarea>
										</div>
									</div>
								</div>
								<div class="row">
									
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Active</label>
											<select class="form-control" id="activeStatusAdd" name="activeStatus">
												<option value="True">True</option>
												<option value="False">False</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 ReferencePicture">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i> Picture</label>
											<uploadImageLob v-model="form.pic" buttonText="Upload" multi="false" fileSizeLimit="5MB"></uploadImageLob>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group" style="padding-top: 27px;margin-bottom: 0;">
											<button type="button" class="btn btn-success" @click="addNewDevice">Submit</button>
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
		<div class="modal fade" id="deviceModal" tabindex="-1" role="dialog" aria-labelledby="deviceModalLabel">
			<!--modal-sm modal-lg modal-full-->
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="deviceModalLabel">Edit Device</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">

							<form role="form" id="editDevice">
								<div class="box-body">

									<div class="row">
										<div class="col-md-3">
											<input name="id" type="hidden" id="deviceId" />
											<div class="form-group">
												<label for="">
													<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Type</label>
												<select name="deviceType" class="form-control col-sm-4"  id="deviceTypeEdit" v-select uri="/dict/list?groupName=standardDeviceType" >
												<!--	<option value="">--Please select--</option>
													<option value="1">Phone</option>
													<option value="2">Pad</option>
													<option value="3">Computer</option>
													<option value="4">Other</option>-->
												</select>
											</div>
										</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Name</label>
											<input type="text" name="deviceName" class="form-control col-sm-4" id="deviceNameEdit" style="width: 100%" placeholder="Device Name">
										</div>
									</div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label for="">
                          <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Order</label>
                        <input v-validate="'required|decimal'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('#orderEdit') }"
                               type="text" name="order" class="form-control col-sm-4" id="orderEdit" style="width: 100%" placeholder="Order">
                      </div>
                    </div>
									
									</div>
									<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Device&nbsp;Description</label>
											<textarea type="text" name="deviceDesc" id="deviceDescEdit" rows="2" class="form-control col-sm-4" style="width: 100%" placeholder="Device Description"></textarea>
										</div>
									</div>
								</div>
									<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Active</label>
											<select class="form-control" id="activeStatusEdit" name="activeStatus">
												<option value="True">True</option>
												<option value="False">False</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 ReferencePicture">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i> Picture</label>
											<uploadImageLob v-model="form.pic" :attachments="form.attachments" buttonText="Upload" multi="false" fileSizeLimit="5MB"></uploadImageLob>
										</div>
									</div>
										<div class="col-md-3">
											<div class="form-group" style="padding-top: 27px;margin-bottom: 0;">
												<button type="button" class="btn btn-success" @click="editDevice">Submit</button>
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
  name: "StandardDevice",
  props: [],
  methods: {
    draw: function() {
      $("#device_table")
        .DataTable()
        .draw();
    },
    retrieveData: function(url, aoData, fnCallback) {
      var deviceType = $("#deviceType").val();
      var deviceName = $("#deviceName").val();
      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          deviceType: deviceType,
          deviceName: deviceName
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

    addNewDevice: function() {
			var pic = this.form.pic;
			var newDevice = $("#adddevice").serialize()+"&devicePic="+pic;
			// console.log(newProject);
      var flag = true;

      var deviceTypeAdd = $("#deviceTypeAdd").val();
      var deviceNameAdd = $("#deviceNameAdd").val();

      if (deviceTypeAdd == "" || deviceTypeAdd == undefined || deviceTypeAdd == null) {
        $.alert("Please select Type.请选择类型");
        flag = false;
			}
			if(flag == true){
				if (deviceNameAdd == "" || deviceNameAdd == undefined || deviceNameAdd == null) {
					$.alert("Please fill Name.请填写名称");
					flag = false;
				}
			}
			if(flag == true){
				if (pic == "" || pic == undefined || pic == null) {
					$.alert("Please upload picture.请上传图片");
					flag = false;
				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/standarddevice/save",
          data: newDevice,
          type: "post",
          dataType: "json",
          success: function(data) {
            $.alert("Add successfully!添加成功！");
						// $('#addproject')[0].reset()
						$("input[type=reset]").trigger("click");
						$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
						$("#deviceNameAdd").val("");
            $("#orderAdd").val("");
						$("#deviceTypeAdd").val("");
						$("#deviceDescAdd").val("");
						$("#activeStatusAdd").val("");
						pic="";
            $("#device_table")
              .DataTable()
							.draw();
          },
          error: function(msg) {
            $.alert(msg.responseText);
          }
        });
      }
    },
    editDevice: function() {
			let form = this.form;
			var pic = this.form.pic;
      var editDevice = $("#editDevice").serialize()+"&devicePic="+pic;;
      var flag = true;

      var deviceTypeAdd = $("#deviceTypeEdit").val();
      var deviceNameAdd = $("#deviceNameEdit").val();

      if (deviceTypeAdd == "" || deviceTypeAdd == undefined || deviceTypeAdd == null) {
        $.alert("Please select Type.请选择类型");
        flag = false;
			}
			if(flag == true){
				if (deviceNameAdd == "" || deviceNameAdd == undefined || deviceNameAdd == null) {
					$.alert("Please fill Name.请填写名称");
					flag = false;
				}
			}
			if(flag == true){
				if (pic == "" || pic == undefined || pic == null) {
					$.alert("Please upload picture.请上传图片");
					flag = false;
				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/standarddevice/save", //这个就是请求地址对应sAjaxSource
          data: editDevice,
          type: "post",
          dataType: "json",
          success: function(data) {
						$.alert("Update successfully!更新成功！");
							form.attachments = [];
            //关闭modal
            $("#deviceModal").modal("hide");

            $("input[type=reset]").trigger("click");
						$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
						$("#deviceNameEdit").val("");
            $("#orderEdit").val("");
						$("#deviceTypeEdit").val("");
						$("#deviceDescEdit").val("");
						$("#activeStatusEdit").val("");

            $("#device_table")
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
		dm.form.pic ="";
		dm.form.attachments = [];
    return dm;
  },
  mounted() {
		var gal = this.GL;
    var queryData = this.retrieveData;
    var draw = this.draw;
    var table = $("#device_table").DataTable({
      fnServerData: queryData,
      sAjaxSource: Config.getBaseURL() + "/standarddevice/list",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [3,4,7]
        }
      ],
      aaSorting: [[6, "asc"]], //给列表排序
      columns: [
        {
          data: "id"
        },
        {
          data: "deviceTypeValue"
        },
        {
          data: "deviceName"
        },
        {
          data: null
        },
        {
          data: "deviceDesc"
        },
        {
          data: "activeStatus"
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
				// $("td:eq(0)", row).html(index + 1);
				var url= gal.getURL('/attachmentlob/downloadimage/'+data.devicePic);
				// console.log(data);
				var html="<img style='height: 50px;width: 70px;' id='pic"+ data.id +"' data-imgId='"+data.devicePic+"' style='width:50%' src='"+url+"' >";
				$("td:eq(3)", row).html(html);
				$("td:eq(3)", row).css('text-align','center');
        $("td:eq(7)", row).html(
          '<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>'
        );

        return row;
      }
    });
    var router = this.$router;
		let form = this.form;
    $("#device_table tbody").on("click", ".opt-edit", function() {
			form.attachment = [];
			form.furPic ="";
			$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
			// console.log(form.attachment);
      var row = $(this).parents("tr");
			var data = table.row(row).data();
      //router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
			$("#deviceId").val(data.id);
			$("#deviceTypeEdit").val(data.deviceType);
      $("#deviceNameEdit").val(data.deviceName);
      $("#orderEdit").val(data.order);
      $("#deviceDescEdit").val(data.deviceDesc);
			$("#activeStatusEdit").val(data.activeStatus);
			let attchementsid = $("#pic"+data.id).attr('data-imgId');
			 console.log(data.devicePic);
			// form.attachment = "778899";
			// console.log(form.attachment);
			// console.log($("#pic"+data.id).attr('data-imgId'));
			$.ajax({
				url: Config.getBaseURL() + "/attachmentlob/getAttachement", //这个就是请求地址对应sAjaxSource
				data: {
					attchementsid: attchementsid
				},
				type: "get",
				dataType: "json",
				success: function(data) {
					form.attachments = data;
					form.pic = attchementsid;
					// console.log(data);
				},
				error: function(msg) {
					//$.alert(msg.responseText);
				}
			});

      $("#deviceModal").modal({
        backdrop: false, //点击空白处不关闭对话框
        keyboard: false, //键盘关闭对话框
        toggle: true //弹出对话框
      });
    });
    $("#device_table tbody").on("click", ".opt-delete", function() {
      var row = $(this).parents("tr");
      var data = table.row(row).data();
		

      $.confirm({
        title: "Information:",
        content:
          "Are you sure you want to delete this record(Device is " +
          data.deviceName +
          ")? 是否确定想要删除这条记录（名称是" +
          data.deviceName +
          "）？",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              $.ajax({
                url: Config.getBaseURL() + "/standarddevice/delete", //这个就是请求地址对应sAjaxSource
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


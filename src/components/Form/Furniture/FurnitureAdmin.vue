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
								<i class="fa fa-list-alt"></i> &nbsp;Furniture</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Category&nbsp;种类</label>
											<select class="form-control col-sm-4" id="furType">
												<option value="">===请选择===</option>
												<option value="C">Chairs 椅子</option>
												<option value="T">Tables 桌子</option>
												<option value="S">Storage 存储柜</option>
												<option value="O">Others 其他</option>
											</select>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Specifications(mm)&nbsp;规格(毫米)</label>
											<input type="text" id="furSpec" class="form-control col-sm-4" style="width: 100%" placeholder="Specifications(mm) 规格(毫米)">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>FC-Item(s)&nbsp;框架合同项次</label>
											<input type="text" id="fcItems" class="form-control col-sm-4" style="width: 100%" placeholder="FC-Item(s) 框架合同项次">
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
											<th>Product Description&nbsp;产品描述</th>
											<th>Specifications(mm)&nbsp;规格(毫米)</th>
											<th>FC-Item(s)&nbsp;框架合同项次</th>
											<th  width='100px'>Reference Picture&nbsp;参考图片</th>
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
								<i class="fa fa-plus-circle"></i> &nbsp; Add Furniture</h3>
						</div>
						<form role="form" id="addproject">
							<input type="reset" style="display:none;" />  
							<div class="box-body">

								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Category&nbsp;种类</label>
											<select name="furType" class="form-control col-sm-4" id="furTypeAdd">
												<option value="">===请选择===</option>
												<option value="C">Chairs 椅子</option>
												<option value="T">Tables 桌子</option>
												<option value="S">Storage 存储柜</option>
												<option value="O">Others 其他</option>
											</select>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>FC-Item(s)&nbsp;框架合同项次</label>
											<input type="text" name="fcItems" class="form-control col-sm-4" id="fcItemsAdd" style="width: 100%" placeholder="FC-Item(s) 框架合同项次">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Product&nbsp;Description&nbsp;产品描述</label>
											<input type="text" name="furDesc" id="furDescAdd" class="form-control col-sm-4" style="width: 100%" placeholder="Product Description 产品描述">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Specifications(mm)&nbsp;规格(毫米)</label>
											<input type="text" id="furDescAdd" name="furSpec" class="form-control col-sm-4" style="width: 100%" placeholder="Specifications(mm) 规格(毫米)">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Active</label>
											<select class="form-control" id="activeStatus" name="activeStatus">
												<option value="True">True</option>
												<option value="False">False</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 ReferencePicture">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Reference Picture</label>
											<uploadImage2 v-model="form.furPic" buttonText="Upload" multi="false" fileSizeLimit="5MB"></uploadImage2>
										</div>
									</div>
									<div class="col-md-3">
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
						<h4 class="modal-title" id="projectModalLabel">Edit Furniture</h4>
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
												<select name="furType" class="form-control col-sm-4" id="furTypeEdit">
													<option value="">===请选择===</option>
													<option value="C">Chairs 椅子</option>
													<option value="T">Tables 桌子</option>
													<option value="S">Storage 存储柜</option>
													<option value="O">Others 其他</option>
												</select>
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for="">
													<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>FC-Item(s)&nbsp;框架合同项次</label>
												<input type="text" name="fcItems" class="form-control col-sm-4" id="fcItemsEdit" style="width: 100%" placeholder="Fc-Item(s) 框架合同项次">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
													<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Product Description&nbsp;产品描述</label>
												<input type="text" name="furDesc" id="furDescEdit" class="form-control col-sm-4" style="width: 100%" placeholder="Fc-Item(s) 框架合同项次">
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
													<i class="" style="font-size: 10px;"></i>Specifications(mm)&nbsp;规格(毫米)</label>
												<input type="text" id="furSpecEdit" name="furSpec" class="form-control col-sm-4" style="width: 100%" placeholder="Fc-Item(s) 框架合同项次">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
													<i class="" style="font-size: 10px;"></i>Active</label>
												<select class="form-control" name="activeStatus" id="activeStatusEdit">
													<option value="True">True</option>
													<option value="False">False</option>
												</select>
											</div>
										</div>
									<div class="col-md-3 ReferencePicture">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Reference Picture</label>
												<!-- {{form.attachment}} -->
											<uploadImage2 :attachments="form.attachment" v-model="form.furPic" buttonText="Upload" multi="false" fileSizeLimit="5MB"></uploadImage2>
										</div>
									</div>
										<div class="col-md-3">
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
  name: "PurchaseProject",
  props: [],
  methods: {
    draw: function() {
      $("#project_table")
        .DataTable()
        .draw();
    },
    retrieveData: function(url, aoData, fnCallback) {
      var furType = $("#furType").val();
      var furSpec = $("#furSpec").val();
      var fcItems = $("#fcItems").val();
      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          furType: furType,
          furSpec: furSpec,
          fcItems: fcItems
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
			var furpic = this.form.furPic;
			var newProject = $("#addproject").serialize()+"&furPic="+furpic;
			// console.log(newProject);
      var flag = true;

      var furTypeAdd = $("#furTypeAdd").val();
			var fcItemsAdd = $("#fcItemsAdd").val();
			var furDescAdd = $("#furDescAdd").val();

      if (furTypeAdd == "" || furTypeAdd == undefined || furTypeAdd == null) {
        $.alert("Please fill Category.请填写种类");
        flag = false;
			}
			if(flag == true){
				if (fcItemsAdd == "" || fcItemsAdd == undefined || fcItemsAdd == null) {
					$.alert("Please fill FC-Item.请填写框架合同项次");
					flag = false;
				}if(flag == true){
					if (furDescAdd == "" || furDescAdd == undefined || furDescAdd == null) {
					$.alert("Please fill Product Description.产品描述");
					flag = false;
					}
				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/FurnitureNew/save",
          data: newProject,
          type: "post",
          dataType: "json",
          success: function(data) {
            $.alert("Add successfully!添加成功！");
						// $('#addproject')[0].reset()
						$("input[type=reset]").trigger("click");
						$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
						$("#projectName").val("");
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
			let form = this.form;
			var furpic = this.form.furPic;
      var project = $("#editProject").serialize()+"&furPic="+furpic;;
      var flag = true;

      var furTypeAdd = $("#furTypeEdit").val();
			var fcItemsAdd = $("#fcItemsEdit").val();
			var furDescAdd = $("#furDescEdit").val();
      if (furTypeAdd == "" || furTypeAdd == undefined || furTypeAdd == null) {
        $.alert("Please fill Category.请填写种类");
        flag = false;
			}
			if(flag == true){
				if (fcItemsAdd == "" || fcItemsAdd == undefined || fcItemsAdd == null) {
					$.alert("Please fill Fc-Item.请填写框架合同项次");
					flag = false;
				}if(flag == true){
					if (furDescAdd == "" || furDescAdd == undefined || furDescAdd == null) {
					$.alert("Please fill Product Description.产品描述");
					flag = false;
					}
				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/FurnitureNew/save", //这个就是请求地址对应sAjaxSource
          data: project,
          type: "post",
          dataType: "json",
          success: function(data) {
						$.alert("Update successfully!更新成功！");
							form.attachment = [];
            //关闭modal
            $("#projectModal").modal("hide");

            $("#projectNameEdit").val("");

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
    return dm;
  },
  mounted() {
		var gal = this.GL;
    var queryData = this.retrieveData;
    var draw = this.draw;
    var table = $("#project_table").DataTable({
      fnServerData: queryData,
      sAjaxSource: Config.getBaseURL() + "/FurnitureNew/listAdmin",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [2,3,4,5,6,7]
        }
      ],
      aaSorting: [[0, "desc"]], //给列表排序
      columns: [
        {
          data: "id"
        },
        {
          data: "furTypeName"
        },
        {
          data: "furDesc"
        },
        {
          data: "furSpec"
        },
        {
          data: "fcItems"
        },
        {
          data: null
        },
        {
          data: "activeStatus"
        },
        {
          data: null
        }
      ],
      fnRowCallback: function(row, data, index) {
        //设置列从0开始
				// $("td:eq(0)", row).html(index + 1);
				var url= gal.getURL('/attachment/downloadimage/'+data.furPic);
				// console.log(data);
				var html="<img style='height: 50px;width: 70px;' id='pic"+ data.id +"' data-imgId='"+data.furPic+"' style='width:50%' src='"+url+"' >";
				$("td:eq(5)", row).html(html);
				$("td:eq(5)", row).css('text-align','center');
        $("td:eq(7)", row).html(
          '<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>'
        );

        return row;
      }
    });
    var router = this.$router;
		let form = this.form;
    $("#project_table tbody").on("click", ".opt-edit", function() {
			form.attachment = [];
			form.furPic ="";
			$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
			// console.log(form.attachment);
      var row = $(this).parents("tr");
			var data = table.row(row).data();
      //router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
			$("#projectId").val(data.id);
			$("#furTypeEdit").val(data.furType);
      $("#fcItemsEdit").val(data.fcItems);
      $("#furDescEdit").val(data.furDesc);
			$("#activeStatusEdit").val(data.activeStatus);
			$("#furSpecEdit").val(data.furSpec);
			let attchementsid = $("#pic"+data.id).attr('data-imgId');
			// console.log(attchementsid);
			// form.attachment = "778899";
			// console.log(form.attachment);
			// console.log($("#pic"+data.id).attr('data-imgId'));
			$.ajax({
				url: Config.getBaseURL() + "/FurnitureNew/getAttachement", //这个就是请求地址对应sAjaxSource
				data: {
					attchementsid: attchementsid
				},
				type: "get",
				dataType: "json",
				success: function(data) {
					form.attachment = data;
					form.furPic = attchementsid;
					// console.log(data);
				},
				error: function(msg) {
					//$.alert(msg.responseText);
				}
			});

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
          "Are you sure you want to delete this record(FC Item is " +
          data.fcItems +
          ")? 是否确定想要删除这条记录（框架合同项次是" +
          data.fcItems +
          "）？",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              $.ajax({
                url: Config.getBaseURL() + "/FurnitureNew/delete", //这个就是请求地址对应sAjaxSource
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


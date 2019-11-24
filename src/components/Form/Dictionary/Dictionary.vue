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
								<i class="fa fa-list-alt"></i> &nbsp;Dictionary Management</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
								

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Dictionary Group ID</label>
											<input type="text" id="dictionaryId" class="form-control col-sm-4" style="width: 100%" placeholder="Dictionary Group ID">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Dictionary Group Name</label>
											<input type="text" id="dictionaryName" class="form-control col-sm-4" style="width: 100%" placeholder="Dictionary Group Name">
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
											<th width="30%">Dictionary Group Name</th>
											<th width="40%">Description</th>
											<th width="20%">Active </th>
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

				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">
								<i class="fa fa-plus-circle"></i> &nbsp; Add Dictionary</h3>
						</div>
						<form role="form" id="adddevice">
							<input type="reset" style="display:none;" />  
							<div class="box-body">

								<div class="row">
								<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Dictionary Group Name</label>
											<input type="text" name="name" class="form-control col-sm-4" id="dictionaryNameAdd" style="width: 100%" placeholder="DictionaryGroup">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												Description</label>
											<input type="text" name="description" class="form-control col-sm-4" id="dictionaryDescAdd" style="width: 100%" placeholder="Description">
										</div>
									</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for="">
													<i class="" style="font-size: 10px;"></i>Active</label>
												<select class="form-control" id="activeStatusAdd" name="active">
													<option value="1">Active</option>
													<option value="2">Not Active</option>
												</select>
											</div>
									</div>

										<div class="col-md-3">
											<div class="form-group" style="padding-top: 27px;margin-bottom: 0;">
												<button type="button" class="btn btn-success" @click="addNewDevice">Add</button>
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
						<h3 class="modal-title" id="deviceModalLabel">Edit Dictionary</h3>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<div class="box box-primary">
						<h4 class="modal-title" id="deviceModalLabel">Edit Group</h4>
							<form role="form" id="editDevice">
								<div class="box-body">

									<div class="row">
											<div class="col-md-3">
												<input name="id" type="hidden" id="dictionaryIdEdit" v-model="form.id" />
										<div class="form-group">
											<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Dictionary Group Name</label>
											<input type="text" name="name" class="form-control col-sm-4" id="dictionaryNameEdit" v-model="form.name" style="width: 100%" placeholder="DictionaryGroup">
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												Description</label>
											<input type="text" name="description" class="form-control col-sm-4" id="dictionaryDescEdit" v-model="form.description" style="width: 100%" placeholder="Description">
										</div>
									</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for="">
													Active</label>
												<select class="form-control" id="activeStatusEdit" name="active" v-model="form.active">
													<option value="1">Active</option>
													<option value="2">Not Active</option>
												</select>
											</div>
									</div>
								</div>
								<br><br>
									<div class="row">
										<h4 class="modal-title" id="deviceModalLabel">Edit Item</h4>
											<table class="table table-bordered mar-bot-0" width="100%" height="30px">
                  <tbody>
                  <tr>
                    <th width="20%"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Dictionary Group Name</th>
                    <th width="20%"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Item Name </th>
                    <th width="20%"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Code </th>
										<th width="15%">Item Order </th>
                    <th width="20%"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Active</th>
                   <th width="5%"  class="text-center">
                      <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.itemList">
                   
                    <td>
                      <input type="hidden" class="form-control" id="" v-model="entry.id">
											<input type="text" name="groupName" class="form-control col-sm-4"  style="width: 100%" readonly="readonly" v-model="form.name" placeholder="Group Name">
                     
                    </td>
                    <td>
										
											<input type="text" name="name" class="form-control col-sm-4"  style="width: 100%" v-model="entry.name"  placeholder="Item Name">
											</td>
                    <td>
										
											<input type="text" name="code" class="form-control col-sm-4"  style="width: 100%" v-model="entry.code" placeholder="Code">
											</td>
                    <td>
										
											<input type="text" name="order" class="form-control col-sm-4"  style="width: 100%" v-model="entry.order" placeholder="order">
											</td>
										<td>	<select class="form-control" id="StatusEdit" name="active" v-model="entry.active">
													<option value="1">true</option>
													<option value="0">false</option>
												</select></td>
                    <td  class="text-center" style="vertical-align: middle;">
                      <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>
                  </tr>

                  </tbody>
                </table>
									</div>
								
									<div class="row">
							
										<div class="col-md-12">
											<div class="form-group" style="padding-top: 27px;margin-bottom: 0;float:right;">
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
  name: "Dictionary",
  props: [],
  methods: {
    draw: function() {
			var dictionaryId = $("#dictionaryId").val();
			 if(isNaN(Number(dictionaryId))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
					 $.alert(' Please enter the Numbers.请输入数字。')
					 return;
        }
      $("#device_table")
        .DataTable()
        .draw();
    },
    retrieveData: function(url, aoData, fnCallback) {
      var dictionaryId = $("#dictionaryId").val();
      var dictionaryName = $("#dictionaryName").val();
      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          dictionaryId: dictionaryId,
          dictionaryName: dictionaryName
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

    addNewDevice: function() {
		var newDevice = $("#adddevice").serialize();
      var flag = true;

      //var dictionaryDescAdd = $("#dictionaryDescAdd").val();
      var dictionaryNameAdd = $("#dictionaryNameAdd").val();
			
      // if (dictionaryDescAdd == "" || dictionaryDescAdd == undefined || dictionaryDescAdd == null) {
      //   $.alert("Please fill Description.请填写描述");
      //   flag = false;
			// }
			if(flag == true){
				if (dictionaryNameAdd == "" || dictionaryNameAdd == undefined || dictionaryNameAdd == null) {
					$.alert("Please fill Name.请填写名称");
					flag = false;
				}
			}
		if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/dictionary/save",
          data: newDevice,
          type: "post",
          dataType: "json",
          success: function(data) {
            $.alert("Add successfully!添加成功！");
						// $('#addproject')[0].reset()
						$("input[type=reset]").trigger("click");
						$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
						$("#dictionaryDescAdd").val("");
						$("#dictionaryNameAdd").val("");
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
			
      var editDevice = $("#editDevice").serialize()+"&itemList="+form.itemList;
			
      var flag = true;

      var dictionaryNameEdit = form.name;
      //var dictionaryDescEdit = form.description;

      // if (dictionaryDescEdit == "" || dictionaryDescEdit == undefined || dictionaryDescEdit == null) {
      //   $.alert("Please fill Desctription.请填写描述");
      //   flag = false;
			// }
			if(flag == true){
				if (dictionaryNameEdit == "" || dictionaryNameEdit == undefined || dictionaryNameEdit == null) {
					$.alert("Please fill Dictionary Group Name.请填写名称");
					flag = false;
				}
			}
			if(flag == true){
				
				for(var index in form.itemList){
				
					if(form.itemList[index].name=="" || form.itemList[index].name==undefined || form.itemList[index].name==null){
						$.alert("Please fill name.");
						flag = false;
						return;
					}
					if(form.itemList[index].code=="" || form.itemList[index].code==undefined || form.itemList[index].code==null){
						$.alert("Please fill code.");
						flag = false;
						return;
					}
					if(form.itemList[index].active+""=="" ){
						console.log(form.itemList[index].active);
						$.alert("Please fill active.");
							flag = false;
							return;
					}


				}
			}
      if (flag) {
        $.ajax({
          url: Config.getBaseURL() + "/dictionary/update", //这个就是请求地址对应sAjaxSource
          data: JSON.stringify(form),
          type: "post",
          dataType:'text',
          contentType: "application/json",
          success: function(data) {
						$.alert("Update successfully!更新成功！");
							
            //关闭modal
            $("#deviceModal").modal("hide");

            $("input[type=reset]").trigger("click");
						$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
					
						form.name="";
						form.description="";
						form.active="";
						form.id="";
						form.itemList=[];

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
		dm.form.id="";
		dm.form.name="";
		dm.form.description="";
		dm.form.active="";
		dm.form.itemList = [];
    return dm;
  },
  mounted() {
		var gal = this.GL;
    var queryData = this.retrieveData;
    var draw = this.draw;
    var table = $("#device_table").DataTable({
      fnServerData: queryData,
      sAjaxSource: Config.getBaseURL() + "/dictionary/list",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [0,1,2,3]
        }
      ],
      aaSorting: [[0, "desc"]], //给列表排序
      columns: [
        {
          data: "name"
        },
        {
          data: "description"
        },
        {
          data: "active"
        },
        {
          data: null
        }
       
      ],
      fnRowCallback: function(row, data, index) {
        //设置列从0开始
					
				  $("td:eq(3)", row).html('<a href="javascript:;" class="text-green opt-edit"><i class="fa fa-edit"></i> Edit</a>&nbsp;&nbsp;<a href="javascript:;" class="text-red mar-left-20 opt-delete"> <i class="fa fa-trash"></i> Delete</a>');
			$("td:eq(2)", row).html(data.active==1?"<td class='text-green'>Active</td>" :"<td class='text-muted'>Not Active</td>");

        return row;
      }
    });
    var router = this.$router;
		let form = this.form;
    $("#device_table tbody").on("click", ".opt-edit", function() {
		
			$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display","none");
			// console.log(form.attachment);
      var row = $(this).parents("tr");
			var data = table.row(row).data();
     
			form.name=data.name;
			form.description=data.description;
			form.id=data.id;
			form.active=data.active;
			form.itemList=data.itemList;
			
		

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
          "Are you sure you want to delete this record? 是否确定想要删除这条记录？",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              $.ajax({
                url: Config.getBaseURL() + "/dictionary/delete", //这个就是请求地址对应sAjaxSource
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


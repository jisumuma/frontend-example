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
								<i class="fa fa-list-alt"></i> &nbsp;User Device Manager</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Active Status</label>
											<select class="form-control col-sm-4" id="activeStatus">
												<option value="">--Please select--</option>
												<option value="active">active</option>
												<option value="returned">returned</option>
												<option value="losted">losted</option>
											</select>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Device Name</label>
											<input type="text" id="deviceName" class="form-control col-sm-4" style="width: 100%" placeholder="Device Name">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>User Name</label>
											<input type="text" id="userName" class="form-control col-sm-4" style="width: 100%" placeholder="User Name">
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Device SnNo</label>
											<input type="text" id="deviceSnNo" class="form-control col-sm-4" style="width: 100%" placeholder="Device SnNo">
										</div>
									</div>
								</div>
								<div class="row">

									<div class="col-md-3">
										<div class="form-group" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary btn-sm" @click="draw();">&nbsp;&nbsp;Search</button>
											<button type="button" class="btn btn-primary btn-sm" @click="returndevice();">&nbsp;&nbsp;Return</button>
											<button type="button" class="btn btn-primary btn-sm" @click="lostdevice();">&nbsp;&nbsp;Lost</button>
										</div>

									</div>
								</div>
								<br/>
								<table id="device_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
									<thead>
										<tr role="row" style="height:20px;width:100%;">
											<th style="text-align: center;padding-right:0px; width:50px;"><input  type="checkbox" id="checkall" @click="checkoruncheckall()"/></th>
											<th>No.</th>
											<th>Device Name</th>
											<th>Pic</th>
											<th>Device SnNo</th>
											<th>User Name</th>
											<th>Active Status</th>
											<th>Release Date</th>
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
						<h4 class="modal-title" id="deviceModalLabel">User Device Info</h4>
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
													<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Active Status</label>
												<select class="form-control col-sm-4" id="activeStatusShow" disabled="true">
													<option value="">--Please select--</option>
													<option value="active">active</option>
													<option value="returned">returned</option>
													<option value="losted">losted</option>
												</select>
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Device Name</label>
												<input type="text" name="deviceName" class="form-control col-sm-4" id="deviceNameShow" readonly="readonly" style="width: 100%" placeholder="Device Name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="" style="font-size: 10px;"></i>Device&nbsp;Description</label>
												<input type="text" name="deviceDesc" id="deviceDescShow" class="form-control col-sm-4" readonly="readonly" style="width: 100%" placeholder="Device Description">
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Device SnNo</label>
												<input type="text" name="deviceSnNo" class="form-control col-sm-4" id="deviceSnNoShow" readonly="readonly" style="width: 100%" placeholder="Device SnNo">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>User Name</label>
												<input type="text" name="userName" class="form-control col-sm-4" id="userNameShow" readonly="readonly" style="width: 100%" placeholder="User Name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="" style="font-size: 10px;"></i>User&nbsp;Dept</label>
												<input type="text" name="userDept" id="userDeptShow" class="form-control col-sm-4" readonly="readonly" style="width: 100%" placeholder="User Dept">
											</div>
										</div>

									</div>
									<div class="row">
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="" style="font-size: 10px;"></i>Release&nbsp;Date</label>
												<input type="text" name="releaseDate" id="releaseDateShow" class="form-control col-sm-4" readonly="readonly" style="width: 100%" placeholder="Release Date">
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="" style="font-size: 10px;"></i>Return&nbsp;Date</label>
												<input type="text" name="returnDate" id="returnDateShow" class="form-control col-sm-4" readonly="readonly" style="width: 100%" placeholder="Return Date">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i class="" style="font-size: 10px;"></i>Lost&nbsp;Date</label>
												<input type="text" name="lostDate" id="lostDateShow" class="form-control col-sm-4" readonly="readonly" style="width: 100%" placeholder="Lost Date">
											</div>
										</div>


									</div>
									<div class="row">
										<div class="col-md-3 ReferencePicture">
											<div class="form-group">
												<label for="">
												<i class="" style="font-size: 10px;"></i> Picture</label>
												<img v-if="form.pic" width="100px" height="100px" :src="GL.getURL('/attachmentlob/downloadimage/'+form.pic)"  >
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
		name: "UserDeviceInfo",
		props: [],
		methods: {
			draw: function() {
				$("#checkall").prop("checked",false);
				$("#device_table")
					.DataTable()
					.draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var activeStatus = $("#activeStatus").val();
				var deviceName = $("#deviceName").val();
				var userName = $("#userName").val();
				var deviceSnNo = $("#deviceSnNo").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						aoData: JSON.stringify(aoData),
						activeStatus: activeStatus,
						deviceName: deviceName,
						userName: userName,
						deviceSnNo: deviceSnNo
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
			checkoruncheckall: function(){
				var ifcheck=$("#checkall").prop("checked");
				if(ifcheck){
					 $("input:checkbox[name='plcheck']").prop("checked",true);
				}else{
					$("input:checkbox[name='plcheck']").prop("checked",false);
				}
			},
			returndevice: function(){
				var plcheck="";
				$("input:checkbox[name='plcheck']:checked").each(function() {
					if(plcheck!=""){
						plcheck += ","+$(this).val() ;
					}else{
						plcheck += $(this).val() ;
					}

				});
				var _this=this;
				if(plcheck!=""){

					$.confirm({
					title: "Information:",
					content: "Do you decide whether to return the selected device? 是否确定归还选中的设备?",
					buttons: {
						ok: {
							text: "Yes",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/userdeviceinfo/doReturnPl", //这个就是请求地址对应sAjaxSource
									data: {
										ids: plcheck
									},
									type: "get",
									dataType: "json",
									success: function(data) {
										$.alert("Return successfully!归还成功！");
										_this.draw();
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
				}else{
					$.alert("Please select at least one record. 请选择至少一条记录。");
				}

			},
			lostdevice: function(){
				var plcheck="";
				$("input:checkbox[name='plcheck']:checked").each(function() {
					if(plcheck!=""){
						plcheck += ","+$(this).val() ;
					}else{
						plcheck += $(this).val() ;
					}

				});
				var _this=this;
				if(plcheck!=""){
					$.confirm({
					title: "Information:",
					content: "Is it sure that the device selected for registration is lost? 是否确定登记选中的设备为丢失?",
					buttons: {
						ok: {
							text: "Yes",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/userdeviceinfo/doLostPl", //这个就是请求地址对应sAjaxSource
									data: {
										ids: plcheck
									},
									type: "get",
									dataType: "json",
									success: function(data) {
										$.alert("Lost register successfully! 丢失记录成功！");
										_this.draw();
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
				}else{
					$.alert("Please select at least one record. 请选择至少一条记录。");
				}

			}



		},
		data() {
			var dm = {};
			dm.form = {};
			dm.form.pic = "";
			dm.form.attachments = [];
			return dm;
		},
		mounted() {
			var gal = this.GL;
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#device_table").DataTable({
				fnServerData: queryData,
				sAjaxSource: Config.getBaseURL() + "/userdeviceinfo/list",
				serverSide: true,
				filter: false,
				lengthChange: false,
				aoColumnDefs: [{
					bSortable: false,
					aTargets: [0,3, 8]
				}],
				aaSorting: [
					[1, "desc"]
				], //给列表排序
				columns: [
					{
						data: null
					},
					{
						data: "id"
					},
					{
						data: "deviceName"
					},
					{
						data: null
					},
					{
						data: "deviceSnNo"
					},
					{
						data: "userName"
					},
					{
						data: "activeStatus"
					},
					{
						data: "releaseDate"
					},
					{
						data:null
					}
				],
				fnRowCallback: function(row, data, index) {
					//设置列从0开始
					if(data.activeStatus=='active'){
						$("td:eq(0)", row).html("<input type='checkbox' name='plcheck' value='"+data.id+"' />");
					}else{
						$("td:eq(0)", row).html("&nbsp;");
					}

					 $("td:eq(0)", row).css('text-align', 'center');
					var url = gal.getURL('/attachmentlob/downloadimage/' + data.devicePic);
					// console.log(data);
					var html = "";
					if(data.devicePic){
						html = "<img style='height: 50px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
					}
					$("td:eq(3)", row).html(html);
					$("td:eq(3)", row).css('text-align', 'center');
					if(data.activeStatus=='active'){
						$("td:eq(8)", row).html(
							'<a href="javascript:;" class="text-blue opt-detail"><i class="fa fa-detail"></i> Detail</a>'+
							'<a href="javascript:;" class="text-green mar-left-10 opt-return"> <i class="fa fa-return"></i> Return</a>'+
							'<a href="javascript:;" class="text-red mar-left-10 opt-lost"> <i class="fa fa-lost"></i> Lost</a>'
						);
					}else{
						$("td:eq(8)", row).html(
							'<a href="javascript:;" class="text-green opt-detail"><i class="fa fa-detail"></i> Detail</a>'
						);
					}
					$("td:eq(8)", row).css('text-align', 'center');

					return row;
				}
			});
			var router = this.$router;
			let form = this.form;
			$("#device_table tbody").on("click", ".opt-detail", function() {
				form.attachment = [];

				$(".ReferencePicture div div div.users-list.clearfix.upload-images-list li").css("display", "none");
				// console.log(form.attachment);
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				form.pic = data.devicePic;
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
				$("#userNameShow").val(data.userApplicantName);
				$("#userDeptShow").val(data.userDept);
				$("#releaseDateShow").val(data.releaseDate);
				$("#returnDateShow").val(data.returnDate);
				$("#lostDateShow").val(data.lostDate);
				$("#deviceSnNoShow").val(data.deviceSnNo);
				$("#deviceNameShow").val(data.deviceName);
				$("#deviceDescShow").val(data.deviceDesc);
				$("#activeStatusShow").val(data.activeStatus);
				let attchementsid = $("#pic" + data.id).attr('data-imgId');
				console.log(data.devicePic);


				$("#deviceModal").modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
			});
			$("#device_table tbody").on("click", ".opt-return", function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();

				$.confirm({
					title: "Information:",
					content: "Are you sure you want to return this device(Device is " +
						data.deviceName +":"+data.deviceSnNo+
						")? 是否确定想要归还这个设备（设备是" +
						data.deviceName +":"+data.deviceSnNo+
						"）？",
					buttons: {
						ok: {
							text: "Yes",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/userdeviceinfo/doReturn", //这个就是请求地址对应sAjaxSource
									data: {
										id: data.id
									},
									type: "get",
									dataType: "json",
									success: function(data) {
										$.alert("Return successfully!归还成功！");
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

			$("#device_table tbody").on("click", ".opt-lost", function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();

				$.confirm({
					title: "Information:",
					content: "Are you sure to register lost this device(Device is " +
						data.deviceName +":"+data.deviceSnNo+
						")? 是否确定记录丢失这个设备（设备是" +
						data.deviceName +":"+data.deviceSnNo+
						"）？",
					buttons: {
						ok: {
							text: "Yes",
							btnClass: "",
							keys: ["enter"],
							action: function() {
								$.ajax({
									url: Config.getBaseURL() + "/userdeviceinfo/doLost", //这个就是请求地址对应sAjaxSource
									data: {
										id: data.id
									},
									type: "get",
									dataType: "json",
									success: function(data) {
										$.alert("Lost register successfully! 丢失记录成功！");
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

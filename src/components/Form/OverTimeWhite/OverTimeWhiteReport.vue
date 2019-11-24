<template>
  <div>
	<!-- Content Header (Page header) -->
	  <section class="content-header">
		<h1>HR Report</h1>
	  </section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<!-- Default box -->
				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-file-text-o"></i> &nbsp;Overtime Plan Report</h3>
						</div>
						<!-- /.box-header -->

						<div class="box-body">
							<!-- form start -->
							<form>
								<div class="text-muted well well-sm no-shadow">
									<div class="row">
										<!-- 申请单号 -->
										<div class="form-group col-md-3">
											<label for="">Application No. 申请单号</label>
											<input type="text" class="form-control" id="applicationNo" placeholder="Application No. 申请单号">
										</div>
										<!-- 申请时间 -->
										<div class="form-group col-md-3" style="margin-bottom: 0;">
											<label>Overtime Plan Month 加班计划月份</label>
											<div class="input-group" style="width: 100%;">
												<datepicker name="period" dateformate="yyyy-mm" maxViewMode="months" minViewMode="months"></datepicker>
											</div>
										</div>

										<div class="form-group col-md-3" style="margin-bottom: 0;">
											<label for="">Status 状态</label>
											<select class="form-control" id="status">
												<option value="">-- Please select--</option>
												<option value="0">Finished</option>
												<option value="21">Cancelled</option>
												<option value="2">Draft</option>
												<option value="1">In Processing</option>
												<option value="9">Rejected</option>
												<option value="91">Invalid</option>
												<option value="93">Expired</option>
												<!--<option value="4">Terminated</option>-->
											</select>
										</div>
										<div class="form-group col-md-3">
											<label for="">Employee Staffcode 员工号</label>
											<input type="text" class="form-control" id="employeeStaffcode" placeholder="Employee Staffcode 员工号">
										</div>
									</div>
									<div class="row">
										<!-- 申请单号 -->
										<div class="form-group col-md-3">
											<label for="">Applicant Staffcode 申请员工号</label>
											<input type="text" class="form-control" id="staffcode" placeholder="Applicant Staffcode 申请员工号">
										</div>
										<div class="form-group col-md-3">
											<label for="">Division 部门</label>
											<input type="text" class="form-control" id="division" placeholder="Division 部门">
										</div>
										<div class="form-group col-md-3">
											<label for="">Department 部门</label>
											<input type="text" class="form-control" id="department" placeholder="Department 部门">
										</div>
										<!-- 搜索、导出按钮 -->
										<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary" @click="draw();" title="搜索"><i class="fa fa-fw fa-search"></i> Search</button>
											<button type="button" class="btn btn-primary mar-left-5" @click="exportexcel();" title="导出" style="margin-left: 5px;"><i class="fa fa-fw fa-external-link"></i> Export</button>
										</div>
									</div>
										<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary" @click="ots();" title="OTS"><i class="fa fa-fw fa-search"></i> OTS</button>
											<button type="button" class="btn btn-primary" @click="otss();" title="OTSS"><i class="fa fa-fw fa-search"></i> OTSS</button>
											<button type="button" class="btn btn-primary" @click="monthUpdate();" title="monthUpdate"><i class="fa fa-fw fa-search"></i> monthUpdate</button>
											<button type="button" class="btn btn-primary" @click="remindSumit();" title="remindSumit"><i class="fa fa-fw fa-search"></i> remindSumit</button>
											<button type="button" class="btn btn-primary" @click="card();" title="card"><i class="fa fa-fw fa-search"></i> card</button>
										</div>
								</div>
							</form>
							<table id="OverTimeWhiteReport" class="table table-bordered table-striped dataTable" role="grid" aria-describedby="example2_info">
								<thead>
									<tr>
										<th>Ticket No. 申请单号</th>
										<th>Applicant 申请人</th>
										<th>Employee Name 员工姓名</th>
										<th>On Behalf 代理</th>
										<th>Process Type 流程</th>
										<th>Sub Type 子流程</th>
										<th>Application Time 申请时间</th>
										<th>Arrive Time 到达时间</th>
										<th>Current Status 状态</th>
										<th class="text-center">Details 详细</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>

					</div>
					<!-- /.box -->
				</div>

				<!-- /.box -->
			</div>
		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	import adminlte from "adminlte"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"

	export default {
		name: "OverTimeWhiteReport",
		props: ['vclass'],
		methods: {
			draw: function() {
				$("#OverTimeWhiteReport").DataTable().draw();
			},
			card: function() {
				var url = Config.getBaseURL() + "/overTimeWhite/card";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$.alert("update successfully.");//console.log(JSON.parse(data));
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			ots: function() {
				var url = Config.getBaseURL() + "/overTimeWhite/batchCreateOT";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$.alert("Batch create OTS application successfully.");//console.log(JSON.parse(data));
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			otss: function() {
				var url = Config.getBaseURL() + "/overTimeWhite/batchCreateOTS";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$.alert("Batch create OTSS application successfully.");//
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			monthUpdate: function() {
				var url = Config.getBaseURL() + "/overTimeWhite/monthUpdate";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$.alert("Success");//console.log(JSON.parse(data));
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			remindSumit: function() {
				var url = Config.getBaseURL() + "/overTimeWhite/remindSumit";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$.alert("Success");//console.log(JSON.parse(data));
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			exportexcel: function() {
				var applicationNo = $("#applicationNo").val();
				var applyStarttime = $("#applyStarttime").val();
				var applyEndtime = $("#applyEndtime").val();
				var status = $("#status").val();
				var staffcode = $("#staffcode").val();
				var division = $("#division").val();
				var department = $("#department").val();
				var employeeStaffcode = $("#employeeStaffcode").val();
				var period = $("[name='period']").val();

				var url = Config.getBaseURL() + "/overTimeWhite/exportrexcel?applicationNo=" + applicationNo +
					"&applyStarttime=" + applyStarttime +
					"&applyEndtime=" + applyEndtime +
					"&status=" + status +
					"&staffcode=" + staffcode +
					"&division=" + division +
					"&department=" + department +
					"&employeeStaffcode=" + employeeStaffcode +
					"&period=" + period +
					"&token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();

			},
			retrieveData: function(url, aoData, fnCallback) {
				var applicationNo = $("#applicationNo").val();
				var applyStarttime = $("#applyStarttime").val();
				var applyEndtime = $("#applyEndtime").val();
				var status = $("#status").val();
				var staffcode = $("#staffcode").val();
				var division = $("#division").val();
				var department = $("#department").val();
				var employeeStaffcode = $("#employeeStaffcode").val();
				var period = $("[name='period']").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"applicationNo": applicationNo,
						"applyStarttime": applyStarttime,
						"applyEndtime": applyEndtime,
						"status": status,
						"staffcode": staffcode,
						"division": division,
						"department": department,
						"employeeStaffcode": employeeStaffcode,
						"period": period
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
			}
		},
		mounted() {

			$('#daterange-btn2').daterangepicker({
					ranges: {
						'Today': [moment(), moment()],
						'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
						'Last 7 Days': [moment().subtract(6, 'days'), moment()],
						'Last 30 Days': [moment().subtract(29, 'days'), moment()],
						'This Month': [moment().startOf('month'), moment().endOf('month')],
						'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
					},
					startDate: moment().subtract(29, 'days'),
					endDate: moment()
				},
				function(start, end) {
					$('#daterange-btn2 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
					//$('#daterange-btn2 span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
					$("#applyStarttime").val(start.format('YYYY-MM-DD'));
					$("#applyEndtime").val(end.format('YYYY-MM-DD'));
				}
			)

			var queryData = this.retrieveData;
			var draw = this.draw;
			var format = this.GL.formatDate; //格式化日期函数
			var table = $("#OverTimeWhiteReport").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/overTimeWhite/report",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [2,3,4,7,8]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "ticketNo"
					},
					{
						data: "applicantName"
					},
					{
						data: "creatorName"
					},
					{
						data: null
					},
					{
						data: null
					},
					{
						data: null
					},
					{
						data: "createDate"
					},
					{
						data: "lastModified"
					},
					{
						data: "status"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					function formateDate(timestamp) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
						var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						var Y = date.getFullYear() + '-';
						var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
						var h = (date.getHours() < 10 ? '0'+ date.getHours() : date.getHours()) + ':';
						var m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':';
						var s = (date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds());
						return Y+M+D+h+m+s;
					}
					$('td:eq(0)', row).html(data.ticketNo);
					$('td:eq(1)', row).html(data.applicantName);
					$('td:eq(2)', row).html(data.creatorName);
					$('td:eq(3)', row).html(data.applicantName != data.createUserName ? 'By ' + data.createUserName : '-');
					$('td:eq(4)', row).html('Overtime Plan');
					$('td:eq(5)', row).html('-');
					$('td:eq(6)', row).html(formateDate(data.createDate));
					$('td:eq(7)', row).html(formateDate(data.lastModified));
					var statusHtml = '';
					var display = "";
					if(data.roleApplicantName != null){
						display = '(Waiting for:'+data.roleApplicantName;
						if(data.userApplicantName != null){
						display += '/'+data.userApplicantName+')';
						}else{
						display += ')';
						}
					}else{
						if(data.userApplicantName != null){
						display = '(Waiting for:'+data.userApplicantName+')';
						}

					}
					if(data.status == 0) {
						statusHtml = '<span class="text-green"><i class="fa fa-fw fa-flag"></i> Finished</span>';
					} else if(data.status == 9) {
						statusHtml = '<span class="text-red"><i class="fa fa-fw fa-exclamation-triangle"></i> Rejected</span>'
						+ display;
					} else if(data.status == 1) {
						statusHtml = '<span class="text-aqua"><i class="fa fa-fw fa-clock-o"></i> In Processing</span>'
						+ display;
					} else if(data.status == 2) {
            			statusHtml = '<span class="text-muted"><i class="fa fa-fw fa-file-text"></i> Draft</span>';
					} else if(data.status == 21) {
						statusHtml = '<span class="text-yellow"><i class="fa fa-fw fa-trash"></i> Cancelled </span>';
					} else if(data.status == 91) {
						statusHtml = '<span class="text-yellow"><i class="fa fa-fw fa-trash"></i> Invalid </span>';
					} else if(data.status == 93) {
						statusHtml = '<span class="text-green"><i class="fa fa-fw fa-flag"></i> Expired </span>';
					} else if(data.status == 4) {
						statusHtml = '';
					}
					$('td:eq(8)', row).html(statusHtml);

					$('td:eq(9)', row).html('<a class="exportpdf"><i class="fa fa-file-pdf-o"></i></a>');

					return row;
				}
			});

			$('#OverTimeWhiteReport tbody').on('click', '.exportpdf', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				//
				//alert("Config.getBaseURL()="+Config.getBaseURL());
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
				var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
				var url = Config.getBaseURL() + "/form/OverTimeWhite/print?id=" + data.id + "&token=" + Config.getToken();
				var showSelectWin = window.open(url, 'print', 'directories=no,height=' +
					iHeight + ',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width=' +
					iWidth + ',top=' + iTop + ',left=' + iLeft);
				showSelectWin.focus();
			});
			//this.draw();
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		}
	}
</script>

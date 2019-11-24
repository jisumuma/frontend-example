<template>
  <div>
	<!-- Content Header (Page header) -->
	  <section class="content-header">
		<h1>EHS Report</h1>
	  </section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<!-- Default box -->
				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-file-text-o"></i> &nbsp;Search Construction Work Permit Report</h3>
						</div>
						<!-- /.box-header -->

						<div class="box-body">
							<!-- form start -->
							<form>
								<div class="text-muted well well-sm no-shadow">
									<div class="row">
										<div class="form-group col-md-3">
											<label for="">Date From 日期起</label>
											<!--
											<input type="hidden" class="form-control" id="dateFrom" placeholder="">
											<input type="hidden" class="form-control" id="dateTo" placeholder="">
											<form-group type="singledaterangepicker" haslable="false" v-model="dateInterval" name="dateInterval"  id="dateInterval" ></form-group>-->
											<form-group type="singledaterangepickerSeparator" :singleDatePicker="true" :init="false" haslable="false" v-model="dateFrom" name="dateFrom" id="dateFrom" ></form-group>
										</div>
										<div class="form-group col-md-3">
											<label for="">Date To 日期止</label>
											<form-group type="singledaterangepickerSeparator" :singleDatePicker="true" :init="false" haslable="false" v-model="dateTo" name="dateTo" id="dateTo" ></form-group>
										</div>
										<div class="form-group col-md-3">
											<label for="">Vendor/VWATJ Department 施工单位/VWATJ 作业部门</label>
											<form-group type="select2" haslable="false" uri="/constructionWorkPermit/fetchVendorName" v-model="vendorName" name="vendorName" ></form-group>
										</div>
										<div class="form-group col-md-3" style="margin-bottom: 0;">
											<label for="">Status 状态</label>
											<select class="form-control" id="status">
												<option value="">--Please Select--</option>
												<option value="0">Finished</option>
												<option value="3">Completed</option>
												<option value="21">Cancelled</option>
												<option value="2">Draft</option>
												<option value="1">In Processing</option>
												<option value="9">Rejected</option>
												<option value="91">Invalid</option>												
											</select>
										</div>
									</div>
									<div class="row">
										<!-- Permit Category 许可分类 -->
										<div class="form-group col-md-3" style="margin-bottom: 0;">
											<label for="">Permit Category 许可分类</label>
											<select class="form-control" id="permitCategory">
												<option value="">--Please Select--</option>
												<option value="Construction Permit">Construction Permit 施工许可</option>
												<option value="Energy & Medium Application">Energy & Medium Application 能源 & 介质申请</option>
												<option value="Hot Work Permit">Hot Work Permit 动火作业许可证</option>
												<option value="Work at Height Permit">Work at Height Permit 高处作业许可证</option>
												<option value="Confine Space Permit">Confine Space Permit 有限空间许可证</option>
												<option value="Other Dangerous Work">Other Dangerous Work 其他危险作业</option>
											</select>
										</div>
										<form-group col="md-3" type="select" uri="/constructionWorkPermit/plant" v-model="plant" name="plant" id="plant" label="ConstructionWorkPermit.plant"></form-group>
										<form-group col="md-3" type="select" v-if="this.showArrPlant" v-model="workshop" :uri="this.uriWorkshop" name="workshop" id="workshop" label="ConstructionWorkPermit.workshop"></form-group>
										<form-group col="md-3" type="select" v-if="this.showArrArea" v-model="area" :uri="this.uriArea" name="area"  id="area" label="ConstructionWorkPermit.area"></form-group>
									</div>
									<div class="row">
										<!-- 搜索、导出按钮 -->
										<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary" @click="draw();" title="搜索"><i class="fa fa-fw fa-search"></i> Search</button>
											<button type="button" class="btn btn-primary mar-left-5" @click="exportexcel();" title="导出" style="margin-left: 5px;"><i class="fa fa-fw fa-external-link"></i> Export</button>
										</div>
									</div>
								</div>
							</form>
							<table id="ConstructionWorkPermitReport" class="table table-striped dataTable" role="grid" aria-describedby="example2_info">
								<thead>
									<tr>
										<th>Ticket No. 申请单号</th>
										<th>Applicant 申请人</th>
										<th>Permit Category 许可分类</th>
										<th>Vendor/VWATJ Department 施工单位/VWATJ 作业部门</th>
										<th>Start Date 起始日期</th>
										<th>End Date 结束日期</th>
										<th>Plant 工厂</th>
										<th>Workshop 车间</th>
										<th>Area 区域</th>
										<th>Current Status 状态</th>
									</tr>
									<!--
									<tr>
										<th>Ticket No. 申请单号</th>
										<th>Applicant 申请人</th>
										<th>On Behalf 代理</th>
										<th>Process Type 流程</th>
										<th>Sub Type 子流程</th>
										<th>Application Time 申请时间</th>
										<th>Arrive Time 到达时间</th>
										<th>Current Status 状态</th>
										<th class="text-center">Details 详细</th>
									</tr>-->
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
	//import daterangepicker from "bootstrap-daterangepicker"

	export default {
		name: "ConstructionWorkPermitReport",
		props: ['vclass'],
		methods: {
			draw: function() {
				$("#ConstructionWorkPermitReport").DataTable().draw();
			},
			exportexcel: function() {
				var dateInterval = "";
				//var dateInterval = this.dateInterval;
				var dateFrom = this.dateFrom;
				var dateTo = this.dateTo;
				var status = $("#status").val();
				var permitCategory = $("#permitCategory").val();
				var plant = this.plant;
				var workshop = this.workshop;
				var area = this.area;
				var vendorName = this.vendorName;
				//var plant = $("#plant").val();
				//var workshop = $("#workshop").val();
				//var area = $("#area").val();
				//var dateFrom = $("#dateFrom").val();
				//var dateTo = $("#dateTo").val();

				var url = Config.getBaseURL() + "/constructionWorkPermit/exportrexcelCwp?dateFrom=" + dateFrom +
					"&dateTo=" + dateTo +
					"&vendorName=" + vendorName +
					"&status=" + status +
					"&permitCategory=" + permitCategory +
					"&plant=" + plant +
					"&workshop=" + workshop +
					"&area=" + area +
					"&dateInterval=" + dateInterval +
					"&token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();

			},
			retrieveData: function(url, aoData, fnCallback) {
				var dateInterval = "";
				//var dateInterval = this.dateInterval;
				var dateFrom = this.dateFrom;
				var dateTo = this.dateTo;
				console.log("dateFrom="+dateFrom+",dateTo="+dateTo);
				var status = $("#status").val();
				var permitCategory = $("#permitCategory").val();
				var plant = this.plant;
				var workshop = this.workshop;
				var area = this.area;
				var vendorName = this.vendorName;
				//var plant = $("#plant").val();
				//var workshop = $("#workshop").val();
				//var area = $("#area").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"dateInterval": dateInterval,
						"dateFrom": dateFrom,
						"dateTo": dateTo,
						"vendorName": vendorName,
						"status": status,
						"permitCategory": permitCategory,
						"plant": plant,
						"workshop": workshop,
						"area": area
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
			var queryData = this.retrieveData;
			var draw = this.draw;
			var format = this.GL.formatDate; //格式化日期函数
			var table = $("#ConstructionWorkPermitReport").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/constructionWorkPermit/reportCwp",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [9]//控制哪些列有排序2,3,4,7,8
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "ticketNo"
					},
					{
						data: "creatorName"
					},
					{
						data: "permitCategory"
					},
					{
						data: "vendorName"
					},
					{
						data: "permitStartDate"
					},
					{
						data: "permitEndDate"
					},
					{
						data: "plant"
					},
					{
						data: "workshop"
					},
					{
						data: "area"
					},
					{
						data: "status"
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					function formateDate(timestamp) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
						var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						var Y = date.getFullYear() + '-';
						var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						var D = date.getDate() + ' ';
						var h = date.getHours() + ':';
						var m = date.getMinutes() + ':';
						var s = date.getSeconds();
						return Y+M+D+h+m+s;
					}
					// $('td:eq(0)', row).html(data.ticketNo);
					$('td:eq(0)', row).html('<a class="exportpdf">'+data.ticketNo+'</a>');//exportpdf  ticketNoDetail
					$('td:eq(1)', row).html(data.creatorName);
					//$('td:eq(1)', row).html('<a class="ticketNoDetail">'+data.creatorName+'</a>');
					$('td:eq(2)', row).html(data.permitCategoryName);
					$('td:eq(3)', row).html(data.vendorName);
					if(data.permitStartDate != null && data.permitStartDate !=""){
						$('td:eq(4)', row).html(formateDate(data.permitStartDate));
					}
					if(data.permitEndDate != null && data.permitEndDate !=""){
						$('td:eq(5)', row).html(formateDate(data.permitEndDate));
					}
					$('td:eq(6)', row).html(data.plantName);
					$('td:eq(7)', row).html(data.workshopName);
					$('td:eq(8)', row).html(data.areaName);
					/*	
					console.log(data.createDate.match(/\d+/g));
						$('td:eq(5)', row).html(data.createDate);
						$('td:eq(6)', row).html(data.lastModified);*/
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
					}else if(data.status == 3) {
						statusHtml = '<span class="text-green"><i class="fa fa-fw fa-flag"></i> Completed</span>';
					} else if(data.status == 9) {
						statusHtml = '<span class="text-red"><i class="fa fa-fw fa-exclamation-triangle"></i> Rejected</span>'
						+ display;
					} else if(data.status == 1) {
						statusHtml = '<span class="text-aqua"><i class="fa fa-fw fa-clock-o"></i> In Processing</span>'
						+ display;
					} else if(data.status == 2) {
            			statusHtml = '<span class="text-muted"><i class="fa fa-fw fa-file-text"></i> Draft</span>';
					} else if(data.status == 21) {
						statusHtml = '<span class="text-yellow"><i class="fa fa-fw fa-trash"></i> Cancelled</span>';
					}else if(data.status == 91) {
						statusHtml = '<span class="text-orange"><i class="fa fa-fw fa-trash-o"></i> Invalid</span>';
					} else if(data.status == 93) {
						statusHtml = '';
					} else if(data.status == 4) {
						statusHtml = '';
					}
					$('td:eq(9)', row).html(statusHtml);

					//$('td:eq(8)', row).html('<a class="exportpdf"><i class="fa fa-file-pdf-o"></i></a>');

					return row;
				}
			});
			//展示详情页面
			var router = this.$router;
			$('#ConstructionWorkPermitReport tbody').on('click', '.ticketNoDetail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				if(data.status == 2){
					router.push({ path: '/index/form/ConstructionWorkPermit/create?id='+data.id});
				}else {
					router.push({ path: '/index/form/ConstructionWorkPermit/detail/'+data.id+'?processInstanceId='+data.processInstanceId});
				}
			});
			//打印PDF
			$('#ConstructionWorkPermitReport tbody').on('click', '.exportpdf', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				//alert("Config.getBaseURL()="+Config.getBaseURL());
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
				var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
				//var url = Config.getBaseURL() + "/constructionWorkPermit/print/" + data.id+ "?token=" + Config.getToken();
				var url = Config.getBaseURL() + "/form/ConstructionWorkPermit/print?id=" + data.id + "&token=" + Config.getToken();
				
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
		},
		data() {
			//返回的数据对象
			var dm = {};
			dm.plant="";
			dm.workshop="";
			dm.area="";

			dm.showArrPlant = true;
			dm.showArrArea = true;
			dm.uriWorkshop="";
			dm.uriArea="";	

			dm.vendorName="";
			dm.dateFrom="";//new Date().Format("yyyy-MM-dd");
			dm.dateTo="";//new Date().Format("yyyy-MM-dd");		

			return dm;
		},
		watch: {
			//根据工厂展示车间下拉列表
			"plant":{
				handler(curVal,oldVal){
					this.showArrPlant = false;
					if(this.plant != null && this.plant != ""){
						this.uriWorkshop="/constructionWorkPermit/workshop?plantId="+this.plant;
					}
					this.$nextTick(() => {
						this.showArrPlant = true;
					});
				},
				deep:true
			},
			//根据车间展示区域下拉列表
			"workshop":{
				handler(curVal,oldVal){
					this.showArrArea = false;
					if(this.workshop != null && this.workshop != ""){
						this.uriArea="/constructionWorkPermit/workshopArea?workshopId="+this.workshop;
					}
					this.$nextTick(() => {
						this.showArrArea = true;
					});
				},
				deep:true
			},
				
		},
	}
</script>

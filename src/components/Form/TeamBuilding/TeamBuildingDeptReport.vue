<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
        HR Report
      </h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<!-- Default box -->
				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-file-text-o"></i> &nbsp;Team Building Application Report (Dept.) 团队建设申请报告(部门)</h3>
						</div>
						<!-- /.box-header -->

						<div class="box-body">
							<!-- form start -->
							<form>
								<div class="text-muted well well-sm no-shadow">
									
									<div class="row">
										<div class="form-group col-md-3" style="margin-bottom: 0;">
											<label for="">Year 年份</label>
											<select class="form-control" id="year" v-model="year">
												<option v-for="(entry,index) in yearList" :value="entry">{{entry}}</option>
											</select>
										</div>
										<!-- 搜索、导出按钮 -->
										<div class="form-group col-md-9" style="padding-top: 24px;margin-bottom: 0;">
											<button type="button" class="btn btn-primary" @click="draw();" title="搜索"><i class="fa fa-fw fa-search"></i> Search</button>
											<button type="button" class="btn btn-primary mar-left-5" @click="exportexcel();" title="导出" style="margin-left: 5px;"><i class="fa fa-fw fa-external-link"></i> Export</button>
											<button type="button"  class="btn btn-primary mar-left-5" @click="downloadcostcenterinfo();" title="Download Cost Center Info." style="margin-left: 5px;"><i class='fa fa-download'></i>Download Costcenter Info</button>
										</div>
									</div>
									
								</div>
							</form>
							<div style="overflow-x:scroll;">
							<table id="TeamBuildingDeptReport" style="width:150%;"  class="table table-bordered table-striped dataTable" role="grid" aria-describedby="example2_info">
								<thead>
									<tr>
										<th>Dept.<!-- 部门--></th>
										<th>Total Budget-Workshop TB</th>
										<th>Workshop TB  Budget Applied</th>
										<th>Workshop TB Actual Cost</th>
										<th>TB Workshop  Budget Remaining</th>
										<th>Total Budget-Cross Dept.</th>
										<th>Cross Dept. Budget Applied</th>
										<th>Cross Dept. Actual Cost</th>
										<th>Cross Dept. TB Budget Remaining</th>
										<th>Remark</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
							</div>
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
	import global_ from './../../../components/Common/Util/Global.vue'

	export default {
		name: "TeamBuildingDeptReport",
		props: ['vclass'],
		methods: {
			draw: function() {
				$("#TeamBuildingDeptReport").DataTable().draw();
			},
			exportexcel: function() {
				

				var url = Config.getBaseURL() + "/teambuilding/exportDeptReportExcel?year=" + this.year +
					"&token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();

			},
			downloadcostcenterinfo: function() {
				

				var url = Config.getBaseURL() + "/teambuilding/getCostcenterInfo?token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();

			},
			retrieveData: function(url, aoData, fnCallback) {
				
				var year = this.year;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"year": year
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						$.alertApon(msg.responseText);
					}
				});
			},
			changeTableCol: function(key) {
				return this.$t(key);
				/*return key;*/
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var url="/teambuilding/listyear";

			if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}
			var myDate = new Date();
			dm.year=myDate.getFullYear().toString(); //获取完整的年份(4位,1970-????)
			

			return dm;
		},
		mounted() {

		

			var queryData = this.retrieveData;
			var draw = this.draw;
			var format = this.GL.formatDate; //格式化日期函数
			var table = $("#TeamBuildingDeptReport").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/teambuilding/reportdept",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [2,3,4,5,6,7,8,9]
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [
					{
						data: "dept"
					},
					{
						data: "totalBudget1"
					},
					{
						data: "appliedBudget1"
					},
					{
						data: "actualCost1"
					},
					{
						data: "remainingBudget1"
					},
					{
						data: "totalBudget2"
					},
					{
						data: "appliedBudget2"
					},
					{
						data: "actualCost2"
					},
					{
						data: "remainingBudget2"
					},
					{
						data: "remaker"
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					
					/*$('td:eq(0)', row).html(data.staffCode);
					$('td:eq(1)', row).html(data.name);
					var employeeTypeString="";
					if(data.employeeType=='1'){
						employeeTypeString="Apprentices / Interns";
					}else if(data.employeeType=='2'){
						employeeTypeString="White Collar";
					}else if(data.employeeType=='3'){
						employeeTypeString="Blue Collar";
					}
					$('td:eq(2)', row).html(employeeTypeString);*/
					return row;
				}
			});

			
			//this.draw();
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		}
	}
</script>

<style>

</style>

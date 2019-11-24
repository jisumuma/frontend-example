<template>
	<div>
		<!-- Main content -->
		<section class="content">
			<!-- Main row -->
			<div class="row">
				<!-- Left col -->
				<div class="col-md-12">
					<!-- table 2 start-->
					<div class="box box-primary1">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-list-alt"></i> &nbsp;<!--{{$t("WasteCategory")}}-->Hotel Info</h3>
						</div>
						<!-- /.box-header -->
						<div class="box-body">
							<div id="resource_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
								<div class="row">
									<div class="col-sm-6">
									</div>
									<div class="col-sm-6">
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<form role="form-horizontal" style="background-color: #F1F5F8">
											<div class="box-body">
												<div class="form-group col-xs-12 col-sm-12 col-md-12 ">
													<div class="   text-muted " style="font-weight: 700;float: left;height:30px;line-height:30px;">
                                                		Hotel Name
                                            		</div>

											

													<div class="" style="display:inline-block;float: left;width:40%;margin-left:20px;">
														<input type="text" id="hotelNameSearch" class="form-control " style="width: 100%;height:30px;" placeholder="Hotel Name">
													</div>
												
													<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float: left;height:30px;margin-left:20px;">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
												
													<a target="_blank" :href="xlsxhref" class="btn btn-primary btn-sm" style="float: left;height:30px;margin-left:20px;">Download Templete</a>
												
													<div id="uploadqueue" style="float: left;margin-left:20px;">
														<input id="file_upload" name="file_upload" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
													</div>
												</div>

											</div>
										</form>
										<table id="hotel_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
											<thead>
												<tr role="row" style="height:20px;width:100%;">
													<th>No.</th>
													<th>Hotel&nbsp;&nbsp;Number</th>
													<th>Hotel&nbsp;&nbsp;Name</th>
													<th>Valid From </th>
													<th>Valid To</th>
													<th>Country</th>
													<th>City&nbsp;&nbsp;Name</th>
													<th>Destination(English)</th>

												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
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

	</div>
</template>

<script>
	export default {
		name: "HotelInfo",
		props: [],
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取

			dm.xlsxhref = Config.getBaseURL() + "/hotelinfo/getTemplete";
			return dm;
		},
		methods: {
			draw: function() {
				$("#hotel_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var hotelName = $("#hotelNameSearch").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"hotelName": hotelName
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
			function formateDate(isostr) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
				var parts = isostr.match(/\d+/g);
			}

			var queryData = this.retrieveData;
			var draw = this.draw;

			var table = $("#hotel_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/hotelinfo/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [0]
				}],
				"aaSorting": [
					[1, "desc"]
				], //给列表排序
				columns: [{
						data: "id"
					},

					{
						data: "hotelNumber"
					},
					{
						data: "hotelName"
					},
					{
						data: "formateValidFromDate"
					},
					{
						data: "formateValidToDate"
					},
					{
						data: "country"
					},
					{
						data: "cityName"
					},
					{
						data: "destination"
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始

					$('td:eq(0)', row).html(index+1);
					//$('td:eq(4)', row).html(formateDate(data.validToDate));

					return row;
				}
			});

			$('#file_upload').uploadifive({
				'auto': true,
				'buttonText': "Upload Excel",
				'queueID': 'uploadqueue',
				'buttonClass': 'btn btn-primary btn-sm',
				//'fileType' : 'image/gif,image/jpeg,image/x-png,image/x-ms-bmp',
				'fileTypeExts': 'xls,xlsx',
				'multi': false,
				'fileSizeLimit': '20MB',
				'uploadScript': Config.getBaseURL() + "/hotelinfo/uploadexcel",
				'removeCompleted': true,
				'removeTimeout': 1,
				'onUploadComplete': function(file, data) {
					if(data&&data.indexOf("success")>-1){
						$.alert("Upload successfully! 上传成功！");
					}else if(data&&data.indexOf("Fail")>-1){
						$.alert("Upload failure! 上传失败！");
					}else{
						$.alert("Please upload Excel file! 请上传Excel文件！")
					}
					draw();
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
	#uploadifive-file_upload{
		line-height:20px !important;
	}
</style>
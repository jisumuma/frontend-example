<template>
	<div style="font-size:14px;">
		<button type="button" @click="showeclosingUserList()" :class="vclass"><slot></slot></button>
		<!-- backModal start-->
		<div class="modal fade" id="eclosingUserModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:75%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Please Choose a User 请选择一个用户</h4>
					</div>
					<div class="modal-body" style="width:96%;height:90%;margin:0px;padding:0px;margin-left:2%;">
						<!-- Main content -->
						<div class="row">
							<div class="col-sm-12">
								<div class="text-muted well well-sm no-shadow">
									<form role="form-horizontal" style="background-color: #F1F5F8">
										<div class="box-body">
											<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
												<label class=" control-label pad-top-7">
														Staff Code
												</label>
												<div>
													<input type="text" :id="'Staffcode'+personModal" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Staffcode">
												</div>
											</div>

											<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
												<label class="control-label pad-top-7">
														EN Name
												</label>
												<div>
													<input type="text" class="form-control" :id="'ENName'+personModal" style="width: 100%" placeholder="ENName">
												</div>
											</div>
											<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
												<label class="control-label pad-top-7">
													CN Name
												</label>
												<div>
													<input type="text" class="form-control" :id="'CNName'+personModal" style="width: 100%" placeholder="CNName">
												</div>
											</div>
											<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
												<label class="control-label pad-top-7">
												   Email
												</label>
												<div>
													<input type="text" class="form-control" :id="'Email'+personModal" style="width: 100%" placeholder="Email">
												</div>
											</div>
											<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;" >
												<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float:right;">
												<span class="fa fa-search">
												</span>
													&nbsp;&nbsp;Search
												</button>
											</div>
										</div>
									</form>
								</div>
								<table class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;" id="eclosing_table">
									<thead>
										<tr role="row">
											<th>Staff Code</th>
											<th>EN Name</th>
											<th>CN Name</th>
											<th>Email</th>
											<th>Select</th>
										</tr>
									</thead>
									<tbody>

									</tbody>
								</table>
							 </div>
						</div>
					 </div>
					 <div class="modal-footer hidden">
						<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<!-- backModal end-->
</div>
</template>
<script>
	import daterangepicker from "bootstrap-daterangepicker"
	export default {
		name: "ChooseUser4Eclosing",
		props: ['vclass','chooseID'],
		methods: {
		 
			showeclosingUserList: function() {

				$('#eclosingUserModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});


			},
			closemodal: function() {

			},
			draw: function() {

				$("#eclosing_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var staffcode = $("#Staffcode"+this.personModal).val();
				var enname = $("#ENName"+this.personModal).val();
				var cnname = $("#CNName"+this.personModal).val();
				var email = $("#Email"+this.personModal).val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffCode": staffcode,
						"printENName": enname,
						"printCNName": cnname,
						"email": email
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
			},
			changeTableCol: function(key) {
				return this.$t(key);
				/*return key;*/
			},
			sendMsgToParent: function(data) {
				this.$emit("callbackfunction", data);
			}
		},
		computed: {
			personModal: {
				get:function(){
					if(this.chooseID !=null && this.chooseID != undefined){
						return this.chooseID+"personModal";
					}else{
						return "personModal";
					}
				}
			}
		},
		mounted() {
			var queryData = this.retrieveData;
			var sendMsgToParent = this.sendMsgToParent;
			var draw = this.draw;
			var table = $("#eclosing_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/eclosingApplication/findEclosingUserInfo",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [2]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [
                    {data: "staffCode"},
                    {data: "printENName"},
                    {data: "printCNName"},
                    {data: "email"},
                    {data: null}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					$('td:eq(4)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm wifi-detail"> select</button>');
					return row;
				}
			});
			var router = this.$router;
 			$('#eclosing_table tbody').on('click', '.wifi-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				sendMsgToParent(data);


			});
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		}
	}
</script>

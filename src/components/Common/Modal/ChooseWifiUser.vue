<template>
	<div style="font-size:14px;">
		<button type="button" @click="showWifiUserList()" :class="vclass"><slot></slot></button>
		<!-- backModal start-->
		<div class="modal fade" id="wifiUserModal" tabindex="-1" role="dialog" aria-labelledby="wifiUserModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						 <h4 class="modal-title">Please Choose a WIFI User 请选择一个WIFI用户</h4>
					</div>
			
			<div class="modal-body" style="width:96%;height:90%;margin:0px;padding:0px;margin-left:2%;">
				<div class="row">
				    <div class="col-sm-12">
                        <div class="text-muted well well-sm no-shadow">
							<form role="form">
                            <div class="row">
                               <div class="form-group col-md-3">
                            		<input type="hidden" id="PeriodFrom" name="PeriodFrom">
				            		<input type="hidden" id="PeriodTo"  name="PeriodTo">
									 <label for=""> Name 姓名</label>
									<input type="text" class="form-control" id="UserName" placeholder="Name 姓名" > 
								  
									 <ul  id="userArr" class="form-control" style="height:100%;display:none;list-style-type:none;">

									 </ul>
									 	 
								 


                              		 
                                </div>
                                <div class="form-group col-md-3" style="margin-bottom: 0;">
									<label for=""> Company 公司</label>
									<input type="text" class="form-control" id="UserCompany" placeholder="Company 公司">
                                </div>
                                <div class="form-group col-md-3">
                               		 <label for="">Using Period 使用时间</label>

                                	<input  type="text" class="form-control pull-right"   id="Period" name="Period" placeholder="Using Period 使用时间">
                                </div>
                                <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                               		 <button type="button" class="btn btn-primary" @click="draw();" title="选择"><i class="fa fa-fw fa-search"></i> Search</button>
                                </div>
                            </div>
						</form>
                        </div>
				            <table class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;" id="wifi_table">
				                <thead>
				                	<tr role="row">
                                        <th>Name <br>姓名</th>
                                        <th>Company <br>公司</th>
                                        <th>Telephone<br>电话</th>
                                        <th>Email <br>邮箱</th>
                                        <th style="width: 120px;">Using Period <br>使用时间 </th>
                                        <th>WIFI Account 1 <br>WIFI 账号 1</th>
                                        <th>WIFI Account 2<br>WIFI 账号 2</th>
                                        <th>WIFI Account 3<br>WIFI 账号 3</th>
                                        <th>WIFI Account 4<br>WIFI 账号 4 </th>
                                        <th class="text-center">Select</th>
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
					<!--<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					</div>-->
				</div>
			</div>
		</div>
		<!-- backModal end-->
	</div>
</template>
<script>
	import daterangepicker from "bootstrap-daterangepicker"
	export default {
		name: "ChooseWifiUser",
		props: ['vclass'],
		methods: {
		 
			showWifiUserList: function() {

				$('#wifiUserModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});


			},
			closemodal: function() {

			},
			draw: function() {

				$("#wifi_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var wifiUserName = $("#UserName").val();
                var wifiUserCompany = $("#UserCompany").val();
                var usingPeriodFrom = $("#PeriodFrom").val();
			    var usingPeriodTo = $("#PeriodTo").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"wifiUserName": wifiUserName ,
                        "wifiUserCompany": wifiUserCompany ,
                        "usingPeriodFrom": usingPeriodFrom ,
                        "usingPeriodTo": usingPeriodTo
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
				this.$emit("callbackWifi", data);
			}
		},
		mounted() {
 
			var queryData = this.retrieveData;
			var sendMsgToParent = this.sendMsgToParent;
			var draw = this.draw;
			var table = $("#wifi_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/WifiAccount/findWifiUserInfo",
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
                    {data: "wifiUserName"},
                    {data: "wifiUserCompany"},
                    {data: "wifiUserPhone"},
                    {data: "wifiUserEmail"},
                    {data: "usingPeriod"},
                    {data: "wifiAccount1"},
					{data: "wifiAccount3"},
					{data: "wifiAccount3"} ,
                    {data: "wifiAccount4"} ,
                    {data: null}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					$('td:eq(0)', row).html(data.wifiUserName);
					$('td:eq(1)', row).html(data.wifiUserCompany);
				    $('td:eq(2)', row).html(data.wifiUserPhone);
                    $('td:eq(3)', row).html(data.wifiUserEmail);
                    $('td:eq(4)', row).html(data.usingPeriod);
                    $('td:eq(5)', row).html(data.wifiAccount1);
                    $('td:eq(6)', row).html(data.wifiAccount2);
                    $('td:eq(7)', row).html(data.wifiAccount3);
                    $('td:eq(8)', row).html(data.wifiAccount4);
					$('td:eq(9)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm wifi-detail"> select</button>');
                    $('td:eq(10)', row).html(data.wifiAccountNum);
                    $('td:eq(11)', row).html(data.wifiPassword1);
                    $('td:eq(12)', row).html(data.wifiPassword2);
                    $('td:eq(13)', row).html(data.wifiPassword3);
                    $('td:eq(14)', row).html(data.wifiPassword4);
					$('td:eq(15)', row).html(data.wifiUserId1);
					$('td:eq(16)', row).html(data.wifiUserId2);
					$('td:eq(17)', row).html(data.wifiUserId3);
					$('td:eq(18)', row).html(data.wifiUserId4);
					return row;
				}
			});
			var router = this.$router;
 			$('#wifi_table tbody').on('click', '.wifi-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				sendMsgToParent(data);


			});
			//this.draw();
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});

            $('#Period').daterangepicker({
				"linkedCalendars": false
			}, function(start, end) {
				$('#Period').val(start.format('MM/DD/YYYY') + '-' + end.format('MM/DD/YYYY'));
				$("#PeriodFrom").val(start.format('MM/DD/YYYY'));
				$("#PeriodTo").val(end.format('MM/DD/YYYY'));
			});

			$("#UserName").bind('input propertychange',function(){
				var userName=$("#UserName").val();
				if(userName!=""){
				$.ajax({
					url: Config.getBaseURL() + "/WifiAccount/listAccount",
					data: {
						"userName": userName
					},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						$("#userArr").empty();
						if(data!=null&&data!=""){				
							var m=0;
							for(var n in data){
								var tmpId="ul_li_"+m;
								$("#userArr").prepend("<li name='wifishow' id="+tmpId+" style='cursor:pointer;height:32px;padding-top:4px;;font-size:14px;' value="+data[n]+">"+data[n]+"</li>");
									 
								m+=1;
							}
							$("li[name='wifishow']").each(function(){
									
									
							$(this).mouseover(function(){					
							$(this).css("background-color","#5897FB");
							$(this).css("color","#FFFFFF");
							$("#UserName").val($(this).text());

							}).mouseout(function(){
							$(this).css("background-color","");
							$(this).css("color","#555555");

							}) ;
						});
					 }
					},
					error: function(msg) {
						$.alert(msg);
					 

					}
				});
				}
				$("#userArr").show();

			}).change(function (){
				$("#userArr").hide();
			});
			
		$('#Period').val("");
			
		}
	}
</script>

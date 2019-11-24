<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">

		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>Labor Contract Renewal Confirmation</h1>
			<ol class="breadcrumb" >
				<li><a href="#">1.HRBP </a></li>
                <li><a href="#">2.Supervisor</a></li>
                <li class=""><a href="#">3.Supervisor(>=T+/29)</a></li>
                <li class=""><a href="#">4.Head of HRBP</a></li>
                <li class=""><a href="#">5.Head of HR Orga.&Education</a></li>
                <li class=""><a href="#">6.BOM</a></li>
                <li class=""><a href="#">7.HRBP</a></li>
			</ol>
		

		</section>
		<div >
			<!-- Main content -->
			<section class="content container-fluid">
				<div class="box box-primary" >
					<div class="box-header with-border">
						<h3 class="box-title pull-left">Select Employee 选择员工  </h3>
                    </div>
                     <form role="form">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group " >
                                        <div class=" pull-left" style="height:32px;padding-top:10px;">Select Individual Employee 选择单个员工&nbsp;&nbsp;&nbsp;</div>
                                        <div   >
                                            <button class="btn btn-primary btn-sm " type="button"   data-toggle="modal" data-target="#personModal"><i class="fa  fa-search">&nbsp;&nbsp;Search</i>
                                            </button>
                                        </div>
                                    </div> 
                                </div>

                                 <div class="col-md-6">
                                    <div class="form-group " >
                                        <div class=" pull-left" style="height:32px;padding-top:10px;">
											Upload Employees in Batch 批量上传员工
										</div>
										
										<div class=" pull-left">
                                        <uploadAjax   style='display: inline-block; margin-left: 15px;overflow:hidden;'  buttonText="Upload" buttonClass="btn btn-primary btn-sm"
											 multi="false" fileSizeLimit="20MB" :uri="GL.getURL('/ContractExtension/uploadrecordexcel?userid='+form.createUserId)" v-on:afterupload="afterupload" ></uploadAjax>
                                        	<a  style='display: inline-block;margin-top:10px; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/ContractExtension/getTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Batch Upload Template 批量上传模板</a>
										</div>
										 
										 
                                    </div> 
                                </div>


							 <div class="col-md-2">
                                    <div class="form-group " >
									
                                       <span class="form-group" >
												<button class="btn btn-danger pull-right "   type="button"  @click="clearData"><i class="fa fa-trash-o"> Clear</i>
												</button>
											</span>
                                    </div> 
                                </div>
								 
                            </div>
                        </div>
                     </form>
				
				</div>
		  <form role="form">
		<div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Employee List 员工列表 </h3>
          </div>
          <div class="box-body">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-bordered" id="hrceTable" >
                            <tbody>
							<tr id="hrceTr1">
								<th width='50px;'>No. <br>序号</th>
								<th style="text-align:center">Name <br> 员工姓名</th>
								<th style="text-align:center">Staff Code <br>员工号</th>
								<th style="text-align:center">Position <br>工作岗位</th>
								<th style="text-align:center">Department <br>所属部门</th>
								<th style="text-align:center">Start Date <br>at VWATJ <br>加入公司时间</th>
								<th style="text-align:center">Current Contract <br>Term End Date <br>现合同结束日期</th>
								<th style="text-align:center">Bond Period <br>End Date <br>服务期截止日期</th>
								<th style="text-align:center">Performance of <br>Last Year <br>上一年度绩效</th>
								<th style="text-align:center">Previous Contract<br> Records <br>连续订立合同次数</th>
                <th style="text-align:center">New Contract Information<br>新合同信息</th>
								<th style="text-align:center">Warning Letter in <br>Current Contract Term <br>原合同期限内是否有警告信</th>
                            </tr>
							 <tr v-bind:key="index" v-for="(entry,index) in form.recordList">
								<td style="text-align:center">{{ index+ 1}}</td>
								<td style="text-align:center">
								 	{{ entry.applicantName}} 
								 </td>
								 <td style="text-align:center">
								 	{{entry.applicantStaffcode}} 
								 	
								 </td>
								 <td style="text-align:center">
								 	{{entry.applicantPosition}} 
								 	
								 </td>
								 <td style="text-align:center">
								 {{entry.applicantDept}} 
								 	 
								 </td>
								 <td style="text-align:center">
								 	{{entry.startDate}} 
								 	 
								 </td>
								 <td style="text-align:center">
								 	{{entry.currentContractTermEndDate}} 
								 	 
								 <td style="text-align:center">
				   <!--redmine 2401-->
                   <input v-model="entry.bondPeriodEndDate" class="form-control input" style="padding-top: 0px; padding-bottom: 0px; height: 20px; width: 100px; display: inline; word-wrap:break-word;">
								 </td>
								 <td style="text-align:center">
                   <input v-model="entry.performanceOfLastYear" class="form-control input" style="padding-top: 0px; padding-bottom: 0px; height: 20px; width: 60px; display: inline; word-wrap:break-word;">
								 	 
								 </td>
								 <td style="text-align:center">
								  <select style="width:80px;" type="select" :id='index+ 1' name='contractRecords' value='entry.contractRecords' v-model="entry.contractRecords">
									<option value="1">1</option>
									<option value="2">2</option>
                  <!--<option v-if="entry.userType=='FSE'||entry.userType=='LE'" value="Other">Other</option>-->
								 </select>
								 </td  >
                 <td style="text-align:center">
				   <!--redmine 2401-->
                   <!--<select class="input form-control"  style="padding-top: 0px;padding-bottom: 0px;height: 20px;width: 90px;display:inline;" type="select" :readonly="!(entry.userType=='FSE'||entry.userType=='LE')" :disabled="!(entry.userType=='FSE'||entry.userType=='LE')"  name='newContractInformationTime' value='entry.newContractInformationTime' v-model="entry.newContractInformationTime">-->
                   <select class="input form-control"  style="padding-top: 0px;padding-bottom: 0px;height: 20px;width: 90px;display:inline;" type="select"  name='newContractInformationTime' value='entry.newContractInformationTime' v-model="entry.newContractInformationTime">
                     <option value="1">5</option>
                     <option value="2">Open</option>
                     <!--<option v-if="entry.userType=='FSE'||entry.userType=='LE'" value="Other">Other</option>-->
                     <!--redmine 2401-->
                     <option value="Other">Other</option>
                   </select>
                   <input  v-validate="'required'"  :id="'contractTime'+index"  :name="'contractTime'+index" style="padding-top: 0px;padding-bottom: 0px;height: 20px;width: 60px;display:inline;" v-if="entry.newContractInformationTime=='Other'" type="text"  :class="{'form-control':true, 'input': true, 'is-danger': errors.has('contractTime'+index) }"   v-model="entry.contractTime" >
                  <!--<input type="text" class="form-control input" readonly value="entry.">-->
                   <!--<input style="padding-top: 0px;padding-bottom: 0px;height: 20px;width: 80px;display:inline;" class="input form-control" :readonly="entry.contractRecords!='Other'" type="input" v-model="entry.newContractInformationTime" name=""></input>-->
                 </td>
								  <td style="text-align:center">

								   <select style="width:80px;" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('warningLetter'+index) }"  type="select" :name="'warningLetter'+index" :id="'warningLetter'+index" value='entry.warningLetter' v-model="entry.warningLetter">	 
									<option value=""></option>
									<option value="1">Yes 是</option>
									<option value="0">No 否</option>
								 </select>	
								   
								 </td>
							</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
		 		

			 <div class="checkbox mar-bot-20" >
						<label>
							<span class="help is-danger" v-show="errors.has('terms')">
								{{$t("checkPolicyNotice")}}
							</span>
							<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
							<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2017032209494257218.pdf">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
							当提交此申请时，我已经理解并承诺遵守
							<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2017032209494257218.pdf">大众汽车自动变速器（天津）有限公司的相关政策。</a>
						</label>
					</div>	
			 
        <div class="row">
            <div class="col-xs-12">
                <back vclass="btn-left"></back>
                <button type="button" @click="beforesubmit()" id="submitbutton" class="btn btn-success pull-left btn-left"><i class="fa fa-fw fa-check"></i>&nbsp;Submit</button>
            </div>
        </div>
		</form>
    </section>
			<!-- /.content -->

			<!-- /.modal -->
			<div class="modal fade" id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
				<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
					<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="personModalLabel">Choose User</h4>
						</div>
						<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
							<!-- Main content -->
							<section class="content" style="margin:0px;padding:0px;">
								<!-- Main row -->
								<div class="row" style="width:margin:0px;padding:0px;">
									<!-- Left col -->
									<div class="col-md-12" style="margin:0px;padding:0px;">
										<!-- table 2 start-->
										<div class="box box-primary1" style="margin:0px;padding:0px;">

											<!-- /.box-header -->
											<div class="box-body">
												<div id="task_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
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
																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																		<label class=" control-label pad-top-7">
                                                Staff Code
                                            </label>
																		<div>
																			<input type="text" id="Staffcode" class="form-control col-sm-4" style="width: 100%" placeholder="Staffcode">
																		</div>
																	</div>

																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																		<label class="control-label pad-top-7">
                                                EN Name
                                            </label>
																		<div>
																			<input type="text" class="form-control" id="ENName" style="width: 100%" placeholder="ENName">
																		</div>
																	</div>
																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																		<label class="control-label pad-top-7">
                                                CN Name
                                            </label>
																		<div>
																			<input type="text" class="form-control" id="CNName" style="width: 100%" placeholder="CNName">
																		</div>
																	</div>
																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																		<label class="control-label pad-top-7">
                                               Email
                                            </label>
																		<div>
																			<input type="text" class="form-control" id="Email" style="width: 100%" placeholder="Email">
																		</div>
																	</div>
																	<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;">
																		<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float:right;">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
																	</div>
																</div>
															</form>
															<table id="person_tableadd" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
																<thead>
																	<tr role="row" style="height:20px;width:100%;">
																		<th>Staff Code</th>
																		<th>EN Name</th>
																		<th>CN Name</th>
																		<th>Email</th>
																		<!--<th>AD Account</th>-->
																		<th>Select</th>
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
						<!--<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					</div>-->
					</div>
					
				</div>
				
			</div>
			
			<!-- /.modal -->
			<!-- /.content-wrapper -->
			
		</div>

	</div>

</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'ContractExtensionInitial',
		methods: {
		  changeTime:function(index){
         this.form.recordList[index].newContractInformationTime=this.form.recordList[index].contractRecords;
      },
			afterupload: function(returndata) {
					var _this = this;
					if(returndata && returndata.status.indexOf("success") > -1) {
						if(returndata.msg){
							$.alert(returndata.msg);
						}
						// console.log(returndata.data);
						_this.form.recordList=returndata.data;
					
					} else if(returndata && returndata.status.indexOf("fail") > -1) {
						if(returndata.msg){
							$.alert(returndata.msg);
						}
					}

			} ,
			clearData:function(){
				this.form.recordList=[];

			},
			beforesubmit: function() {
					var validatorFn = this.$validator;
					var router = this.$router;
					var _this = this;
					$("#loadingMask,#progressBar").show();
						var url = Config.getBaseURL() + "/ContractExtension/checkEmployee";
		 				var isOK=true;
						$.ajax({
							url: url,
							type: 'POST',
							dataType:'text',
							contentType: "application/json",
							data: JSON.stringify(_this.form),
							cache: false,
							async: false,
							success: function(data, textStatus) {
								 if(data!=null){
									 var dd=JSON.parse(data);
									 if('fail'==dd.status){
										$("#loadingMask,#progressBar").hide();
										isOK=false;
									 	$.alert(dd.msg);

									 }
								 }
							}
						}).fail(function(jqXHR, textStatus, error){
							 
							$("#loadingMask,#progressBar").hide();
						 
						});

				if(isOK){

					setTimeout(function() {

							validatorFn.validateAll().then(result => {
								if(result) {
									var uri = "/ContractExtension/initsubmit";
									
									_this.GL.actUtil.query("POST", uri, _this.form, function(data) {
										var returndata = JSON.parse(data);
										//console.log(returndata);
										if(returndata && returndata.status.indexOf("success") > -1) {
											if(returndata.msg) {
												//$.alert(returndata.msg+"<br />"+_this.$t("SUBMIT"));
											}else{
												//$.alert(_this.$t("SUBMIT"));
											}
											//console.log("验证通过！");
											
											$("#submitbutton").attr('disabled',true)
											//转向哪个页面
											setTimeout(function() {
												if(Config.MODE_TYPE === 'apon') {
													top.location.href = Config.getAPONURL();
												} else {
													router.push({
														path: '/index/application'
													});
												}
											},1000);
										
										} else if(returndata && returndata.status.indexOf("fail") > -1) {
											if(returndata.msg) {
												$.alert(returndata.msg);
											}
											$("#loadingMask,#progressBar").hide();
											
										}
				
									});
								} else {
									
									if(validatorFn.errors.has('terms')) {
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();
									
								}
							});
					}, 100);
				}
					
				

			},
			doAfterSelectOtherPerson: function(data) {
 			 var _this = this;
				setTimeout(function() {
					var uri = "/ContractExtension/searchContractInfo?userid=" + data.id;
 					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var tmpdate = JSON.parse(data);
							var dm=tmpdate.data;
							var addStaffCode=dm[0].applicantStaffcode;
						 
							/** if(_this.form.recordList[0]!=null){
 								var len=_this.form.recordList.length;
								var b=false;
								for(var m=0;m<len;m++){
									var tempStaffCode=_this.form.recordList[m].applicantStaffcode;
								 
									if(addStaffCode==tempStaffCode){
									  b=true;
									  break;
									}
								}
								if(b){
									$.alert("The employee you choose already exists.您选择的员工已经存在。");
								}else{
									var newItem = {};
									for(var key in _this.form.recordList[0]){
										newItem[key] = tmpdate.data[0][key];
									}
									_this.form.recordList.push(newItem);
 								}
							}else{
								_this.form.recordList =tmpdate.data;
							}**/
							_this.form.recordList =tmpdate.data; 
							var length=_this.form.recordList.length;
							for(var index=0;index<length;index++){
                _this.form.recordList[index].newContractInformationTime=_this.form.recordList[index].contractRecords;
              }
						});
					}
				}, 300);

			},
			selectDirectPerson: function() {

				$('#personModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});

			},
			closemodal: function() {
				$("#Staffcode").val("");
				$("#ENName").val("");
				$("#CNName").val("");
				$("#Email").val("");

				$("#person_tableadd").DataTable().draw();
			},
			draw: function() {
				$("#person_tableadd").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var staffcode = $("#Staffcode").val();
				var enname = $("#ENName").val();
				var cnname = $("#CNName").val();
				var email = $("#Email").val();
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
			concatAndRemoveRepeat:function(arr1,arr2){  
				//合并数组
				var arr=arr1.concat(arr2);
				//数组根据staffcode去重
				var repeatstaffcode="";
			    for(var i=0, temp={}, result=[]; i<arr.length;i++){  
			    	var ci=arr[i];
		            var staffcode = ci.creatorStaffcode;  
		            if(temp[staffcode]){ 
		            	if(repeatstaffcode==""){
		            		repeatstaffcode+=staffcode;
		            	}else{
		            		repeatstaffcode+=","+staffcode;
		            	}
		            	
		                continue;  
		            }  
		            temp[staffcode] = true;  
		            result.push(ci);  
		        }  
		        if(repeatstaffcode!=""){
		        	//$.alert("Staff Code "+repeatstaffcode+" has been selected! 员工号 "+repeatstaffcode+"已经被选择！");
		        }
		        return result;  
			    
			}  
		},
		data() {
			//返回的数据对象
			var dm = {};
			
			var url = "/ContractExtension/createInit";

			if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}
			return dm;
		},
		watch: {

		},

		computed: {
			
			
		},
	mounted() {
		 	 
		var _this = this;
 		var queryData = this.retrieveData;
		var doAfterSelectOtherPerson = this.doAfterSelectOtherPerson;
		var draw = this.draw;
		var table = $("#person_tableadd").DataTable({
			"fnServerData": queryData,
			"sAjaxSource": Config.getBaseURL() + "/ContractExtension/listhrbpuser",
			"serverSide": true,
			"filter": false,
			"lengthChange": false,
			"aoColumnDefs": [{
				"bSortable": false,
				"aTargets": [4]
			}],
			"aaSorting": [
				[0, "desc"]
			], //给列表排序
			columns: [{
					data: "staffCode"
				},
				{
					data: "printENName"
				},
				{
					data: "printCNName"
				},
				{
					data: "email"
				},
				/*{
					data: "screenName"
				},*/
				{
					data: null
				}
			],
			"fnRowCallback": function(row, data, index) { //设置列从0开始
				//$('td:eq(0)', row).html(data.id);
				//$('td:eq(1)', row).html(data.printENName);
				//$('td:eq(2)', row).html(data.printCNName);
				//$('td:eq(3)', row).html( data.email);
				$('td:eq(4)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

				return row;
			}
		});
		var router = this.$router;
		$('#person_tableadd tbody').on('click', '.task-detail', function() {
			var row = $(this).parents("tr");
			var data = table.row(row).data();
			doAfterSelectOtherPerson(data);
			//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});

		});

		
		}
	}
</script>


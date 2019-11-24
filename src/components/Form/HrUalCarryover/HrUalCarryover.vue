<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">

		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("HrUalCarryover")}}</h1>
			<ol class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.Head of Division</a>
				</li>
				<li>
					<a>4.HR BP</a>
				</li>
				<li>
					<a>5.Head of HR, Orga. & Education</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
	</span>
		</section>
		<div v-if="form.authorityMap.flag=='Y'||(form.authorityMap.flag=='N'&&form.hasGroup=='Y')">
			<!-- Main content -->
			<section class="content container-fluid">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
						<div v-if="!readonly&&form.applyType=='1'" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label></div>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<!--不选中的时候显示-->
								<form-group v-if="!onbehalf" other-rules="required" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
								<!--选中的时候显示-->
								<div class="col-md-3" v-if="onbehalf">
									<div class="form-group">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
										 {{$t("LocalPcAdmin.creatorStaffcode")}} </label>
										<div class="input-group ">
											<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
											<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" chooseID="onbehalfperson" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
										</div>
									</div>
								</div>
								<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorPosition" name="creatorPosition" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							</div>
						</div>
					</form>
				</div>
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Annual Leave Information and Application Details  年假信息和申请细节 </h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group mar-0" style="overflow: auto;">
										<div class="radio mar-top-0">
											<label class="col-md-3" v-if="form.authorityMap.flag=='Y'">
                          <input type="radio" :disabled="disabled" v-validate="'required'"
										 name="applyType" id="optionsRadios1" v-model="form.applyType" @click="checktype('1')" value="1" checked="">
                           Individual Application 个人申请  
                        </label>
											<label class="col-md-3" v-if="form.hasGroup=='Y'||form.applyType=='2'">
                          <input type="radio":disabled="disabled" v-validate="'required'"
										 name="applyType" id="optionsRadios2" v-model="form.applyType" @click="checktype('2')" value="2">
                           Group Application 集体申请
                        </label>
										</div>
									</div>
								</div>
							</div>
							<hr>
							<div class="row" v-if="form.applyType=='1'">
								<div class="col-md-3">
									<div class="form-group">
										<label for="" >Carry-over from (Year) <br>申请结转年度 </label>
										<input type="text" class="form-control" name="carryoverYears" v-model="form.carryoverYears" readonly="readonly">
									</div>
								</div>
								<!--<form-group col="md-3" type="input" other-rules="required" v-model="form.carryoverYears" name="carryoverYears" readonly="readonly"></form-group>
-->
								<div class="col-md-3">
									<div class="form-group">
										<label for="">Remaining Legally Entitled Leaves <br>剩余法定年假天数 </label>
										<div class="input-group ">
											<input type="text" class="form-control" id="" v-model="form.hrUalRecordList[0].remainingLegallyLeaves" readonly="readonly">
											<div class="input-group-addon"> days</div>
										</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label for="">Remaining Company Entitled Leaves <br>剩余公司年假天数 </label>
										<div class="input-group ">
											<input type="text" class="form-control" id="" v-model="form.hrUalRecordList[0].remainingCompanyLeaves" readonly="readonly">
											<div class="input-group-addon"> days</div>
										</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;Requested Leave Carry-over Days <br>申请结转天数 </label>
										<div class="input-group ">
											<input type="text" name="carryoverDays" id="carryoverDaysPerson" v-model="form.hrUalRecordList[0].carryoverDays" v-validate="'required'" :class="{'form-control':true,'input': true, 'carryoverDays':true,'is-danger': errors.has('carryoverDays') }" :readonly="readonly">
											<div class="input-group-addon"> days</div>
										</div>
										<!--<span class="text-muted" style="font-weight: normal;">&nbsp;<i class="fa fa-info-circle"></i> The minimum unit is 0.5 day</span>-->
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;Reasons for Leave Carry-over 年假结转原因</label>
										<textarea-my other-rules="required" rows="2" placeholder="Reasons for annual leave carry-over 年假结转原因" :readonly="readonly" v-model="form.hrUalRecordList[0].carryoverReason" name="carryoverReason" id="carryoverReason"></textarea-my>

									</div>
								</div>

							</div>

							<div class="row" v-if="form.applyType=='2'">
								<div class="col-md-5">
									<div class="form-group">
										<label for="" class="col-sm-8 control-label" style="height:34px;line-height:34px;padding-left:0px;">Carry-over from (Year) 申请结转年度 </label>
										<div class="col-sm-4">
											<input type="text" class="form-control" name="carryoverYears" v-model="form.carryoverYears" readonly="readonly" style="float:left">
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<p style="font-weight: bold;">Employee List 员工名单</p>
									<div v-if="!readonly" style="height:30px;line-height:30px;">
										<a class="editor_create" style='display: inline-block; margin-left: 15px;float: left;' @click="addNewPerson" href="javascript:;"><i class="fa fa-plus-circle"></i> Create new record 新增</a>
										<!--<div id="uploadqueue" style="float: right;margin-left:20px;display:inline;">
										<input id="file_upload" name="file_upload" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
									</div>-->
										<!--<label class="btn btn-primary btn-xs" style='margin-top: -3px;margin-left: 15px;float: right;font-size: 14px;' for="xFile">Upload</label>
										<input style='display:inline-block;position:absolute;clip:rect(0 0 0 0);' id="xFile" type="file" @change="upload" v-if="showClear">-->
										<uploadAjax style='display: inline-block; margin-left: 15px;float: right;overflow:hidden;'  buttonText="Upload" buttonClass="btn btn-primary btn-xs"
											 multi="false" fileSizeLimit="20MB" :uri="GL.getURL('/hrualcarryover/uploadrecordexcel?stime=' + Date.parse(new Date())+'&userid='+this.form.createUserId)"
											v-on:afterupload="afterupload" ></uploadAjax>
							
										<a style='display: inline-block; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/hrualcarryover/getTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Batch Upload Template 批量上传模板</a>
										
									</div>
									<table class="table table-bordered">
										<tbody>
											<tr>
												<th style="text-align: center;vertical-align: middle;">No.</th>
												<th style="text-align: center;vertical-align: middle;">Staff Code<br>员工号</th>
												<th style="text-align: center;vertical-align: middle;">Name<br>姓名</th>
												<th style="text-align: center;vertical-align: middle;">Remaining Legally Entitled Leaves <br>剩余法定年假天数</th>
												<th style="text-align: center;vertical-align: middle;">Remaining Company Entitled Leaves <br>剩余公司年假天数 </th>
												<th style="text-align: center;vertical-align: middle;">Requested Leave Carry-over Days <br>申请结转天数</th>
												<th style="text-align: center;vertical-align: middle;">Reasons for Leave Carry-over <br>年假结转原因</th>
												<th v-if="!readonly" style="width: 50px;" class="text-center">
													Action 操作
												</th>
											</tr>
											<tr v-bind:key="index" v-for="(entry,index) in form.hrUalRecordList">
												<td style="text-align: center;vertical-align: middle;">
													<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.id">
													<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.ticketNo"> {{index+1}}
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.staffcode}}
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.name}}
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.remainingLegallyLeaves}} day(s)
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.remainingCompanyLeaves}} day(s)
												</td>
												<td style="text-align: center;vertical-align: middle;">
													<!--<form-group type="input" other-rules="required" haslable="false" :readonly="readonly" v-model="entry.carryoverDays" :name="'carryoverDays'+index"></form-group>-->
													<input type="text" :name="'carryoverDays'+index" :id="'carryoverDays'+index" :index="index" :class="{'form-control':true,'input':true,'number':true, 'is-danger': errors.has('carryoverDays'+index) }" 
														placeholder="Requested leave carry-over days " :readonly="readonly" v-validate="'required'" v-model="entry.carryoverDays">
												</td>
												<td style="text-align: center;vertical-align: middle;">
													<!--<form-group type="input" other-rules="required" haslable="false" :readonly="readonly" v-model="entry.carryoverReason" :name="'carryoverReason'+index"></form-group>
										-->
													<input type="text" :name="'carryoverReason'+index" :id="'carryoverReason'+index" :index="index" :class="{'form-control':true,'input':true,'is-danger': errors.has('carryoverReason'+index) }" 
														placeholder="Reasons for leave carry-over " :readonly="readonly" v-validate="'required|max:50'" v-model="entry.carryoverReason">

												</td>

												<td v-if="!readonly" style="width: 50px;" class="text-center">
													<a href="javascript:;" v-if="!readonly" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

						</div>
					</form>
				</div>

				<div class="box box-primary" v-if="(!readonly)||(readonly&&form.attachmentIds)">
					<div class="box-header with-border">
						<h3 class="box-title">Upload Attachment 上传附件</h3>
					</div>
					<div class="box-body">

						<div class="row">
							<div class="col-md-12 form-group">
								<upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true" required="false"></upload2>
							</div>
						</div>
					</div>
				</div>

				<div class="checkbox mar-bot-20" v-if="!readonly">
					<label>
              <span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
               <input  name="terms" type="checkbox" v-validate="'required'" >I have read and agreed following relevant policies: 我已阅读并同意以下相关政策： <br> 
               <div>1.&nbsp;If remaining annual leave is less than or equal to 5 days, system will transfer them automatically, and there is no need for this application.
				<br>剩余年假天数小于等于五天时，系统将自动结转，无需申请。
				<br>
               2.&nbsp;In case of special business needs and with prior approval by the HR Department before 31st of December of the current year, a maximum amount of ten days can get carried over to the first quarter in the next year. After March 31st, any remaining unclaimed company granted annual leave from the previous year will be forfeited without exception. 
				<br>因公司业务特殊需要且在当年12月31日前获得人力资源部批准的情况下，员工最多可将十天年假转至次年的第一季度。3月31日后，所有的前一年未休完的公司补充带薪年假无一例外视为过期。
				<br>
              3.&nbsp;According to VW policy, legally entitled annual leaves will have higher priority for transfer.
				<br>根据大众政策，优先结转法定年假。
				<br>
               4.&nbsp;The minimum unit of requested leave carry-over days is 0.5 day.
				<br>最小申请结转天数单位为0.5天。
				<br></div>
              When submitting the application, I have read and agreed to
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.</a> 
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
            </label>
				</div>
				<comment v-if="processTaskId !=null&&form.status != 9&&processTaskKey!='editForm'" v-model="form.approval.approvalRemark"></comment>
				<router-view :form="form" entityId="HrUalCarryover" vclass="btn-left" uri="/form/HrUalCarryover/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
				<comment-list v-if="form.processInstanceId !=null"></comment-list>

				<!--<div class="row">
				<div class="col-md-12">
					<button type="submit" class="btn btn-primary"><i class="fa fa-save"></i>&nbsp;&nbsp;Save</button>
					<button type="submit" class="btn btn-success"><i class="fa fa-fw fa-check"></i>&nbsp;Submit</button>
					<button type="submit" class="btn btn-primary pull-right">Back</button>
				</div>
			</div>-->
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

		<div v-if="form.authorityMap.flag=='N'&&form.hasGroup=='N'">
			<section class="content container-fluid">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Notice 提示</h3>
					</div>
					<div class="box-body">

						<div class="row">
							<div v-html="form.authorityMap.msg" class="col-md-12 form-group text-center">
								{{form.authorityMap.msg}}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'HrUalCarryover',
		methods: {
			beforesubmit:function(){
					if(this.form.hrUalRecordList.length>0){
						this.form.submitstatus=true;
						this.form.approvelstatus = true;
						var uri = "/hrualcarryover/beforesubmit";
						var _this=this;
						this.GL.actUtil.query("POST",uri,this.form,function(data){
							var returndata = JSON.parse(data);
							console.log(returndata);
							if(returndata && returndata.status.indexOf("success") > -1) {
								if(returndata.msg){
									//$.alert(returndata.msg);
								}
								//console.log("验证通过！");
								_this.form.submitstatus=true;
								_this.form.approvelstatus = true;
							} else if(returndata && returndata.status.indexOf("fail") > -1) {
								if(returndata.msg){
									$.alert(returndata.msg);
								}
								_this.form.submitstatus=false;
								_this.form.approvelstatus = false;
							}
							
						});
					}else{
						$.alert(" Please select or upload at least one person.请至少选择或者上传一位申请人。");
						this.form.submitstatus=false;
						this.form.approvelstatus = false;
					}

			},
			onbehalfclick: function() {

				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId = this.tempapplicantUserId;

					this.form.creatorStaffcode = this.tempcreatorStaffcode;
					this.form.creatorName = this.tempcreatorName;
					this.form.creatorPosition = this.tempcreatorPosition;
					this.form.creatorDept = this.tempcreatorDept;

					this.form.hrUalRecordList = this.currentpersonrecords;
				}
			},
			doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				//console.log(data);

				this.form.applicantUserId = data.id;

				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName = data.printENName;
				this.form.creatorPosition = data.function;
				var tempdep = data.department;
				if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
					tempdep = data.division;
				}

				this.form.creatorDept = tempdep;

				var _this = this;
				setTimeout(function() {
					var uri = "/hrualcarryover/listcurrentuserleaves?userid=" + data.id + "&currentuserid=" + data.id;

					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var dm = JSON.parse(data);
							if(dm.authorityMap.flag=='Y'){
								if(dm.authorityMap.msg){
									$.alert(dm.authorityMap.msg);
								}
								_this.form.hrUalRecordList = dm.data;
							}else{
								$.alert(dm.authorityMap.msg);
								_this.form.applicantUserId = _this.tempapplicantUserId;
								_this.form.creatorStaffcode = _this.tempcreatorStaffcode;
								_this.form.creatorName = _this.tempcreatorName;
								_this.form.creatorPosition = _this.tempcreatorPosition;
								_this.form.creatorDept = _this.tempcreatorDept;
			
								_this.form.hrUalRecordList = _this.currentpersonrecords;
							}
							
						});
					}
				}, 300);

			},
			addNewPerson: function() {

				$('#personModal').modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});

			},
			checktype: function(currentvalue) {
				var _this = this;
				//console.log(currentvalue);
				if(currentvalue == 2) {
					this.onbehalf = false;
					_this.form.hrUalRecordList = [];
					this.form.applicantUserId = this.tempapplicantUserId;

					this.form.creatorStaffcode = this.tempcreatorStaffcode;
					this.form.creatorName = this.tempcreatorName;
					this.form.creatorPosition = this.tempcreatorPosition;
					this.form.creatorDept = this.tempcreatorDept;
				} else if(currentvalue == 1) {
					_this.form.hrUalRecordList = _this.currentpersonrecords;
				}
			},
			upload: function(e) {
				var _this = this;
				e = e||window.event;
				let file = e.target.files[0];
				var excelFormData = new FormData();
				excelFormData.append('file', file); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
				_this.showClear=false;
				//zipFormData.append('tikectNo', tikectNo);
				this.$http.post(Config.getBaseURL() + "/hrualcarryover/uploadrecordexcel?stime=" + Date.parse(new Date())+"&userid="+_this.form.createUserId, excelFormData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(function(response) {
					var returndata = response.data;
					_this.showClear=true;
					//console.log(returndata);
					if(returndata && returndata.status.indexOf("success") > -1) {
						if(returndata.msg){
							$.alert(returndata.msg);
						}
						//_this.form.hrUalRecordList = _this.form.hrUalRecordList.concat(returndata.data);
						_this.form.hrUalRecordList = _this.concatAndRemoveRepeat(_this.form.hrUalRecordList,returndata.data);

					} else if(returndata && returndata.status.indexOf("fail") > -1) {
						if(returndata.msg){
							$.alert(returndata.msg);
						}
					}

				});
			},
			afterupload: function(returndata) {
					var _this = this;
					if(returndata && returndata.status.indexOf("success") > -1) {
						if(_this.form.isChecker=='N'){
					
						}else if(_this.form.isChecker=='Y'){
							if(_this.form.checkerdirect!=''&&_this.form.checkerhead!=''&&_this.form.checkerhrbp!=''){
								if(_this.form.checkerdirect!=returndata.directSupervisor
									||_this.form.checkerhead!=(returndata.divisionHead)
									||_this.form.checkerhrbp!=returndata.hrbp){
									$.alert("Selected employees are not belong to same department and they have different supervisor. Please re-select and make sure employees have same supervisor.<br/>"+
													"所选员工属于不同部门并有不同的领导。请重新选择并确保所选员工属于同一个领导管理。");
									return;
								}
							}else{
								_this.form.checkerdirect=returndata.directSupervisor;
								_this.form.checkerhead=returndata.divisionHead;
								_this.form.checkerhrbp=returndata.hrbp;
							}
						}
						
						if(returndata.msg){
							$.alert(returndata.msg);
						}
						//_this.form.hrUalRecordList = _this.form.hrUalRecordList.concat(returndata.data);
						_this.form.hrUalRecordList = _this.concatAndRemoveRepeat(_this.form.hrUalRecordList,returndata.data);

					} else if(returndata && returndata.status.indexOf("fail") > -1) {
						if(returndata.msg){
							$.alert(returndata.msg);
						}
						if(_this.form.hrUalRecordList.length<1){
							_this.form.checkerdirect="";
							_this.form.checkerhead="";
							_this.form.checkerhrbp="";
						}
					}

			},
			deleteItemRows: function(rowId) {
				this.form.hrUalRecordList.splice(rowId, 1);
				var _this=this;
				if(_this.form.hrUalRecordList.length<1){
					_this.form.checkerdirect="";
					_this.form.checkerhead="";
					_this.form.checkerhrbp="";
				}
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
			doAfterSelectOtherPersonForAdd: function(data) {
				console.log(data);
				var userinfoid = data.id;
				var currentuserid = this.form.createUserId;
				
				var divisionHead=data.divisionHead;
				if(divisionHead==''||divisionHead==undefined){
					divisionHead=data.buHead;
				}
				
				if(this.form.isChecker=='N'){
					
				}else if(this.form.isChecker=='Y'){
					if(this.form.checkerdirect!=''&&this.form.checkerhead!=''&&this.form.checkerhrbp!=''){
						if(this.form.checkerdirect!=data.directSupervisor
							||this.form.checkerhead!=divisionHead
							||this.form.checkerhrbp!=data.hrbp){
							$.alert("Selected employees are not belong to same department and they have different supervisor. Please re-select and make sure employees have same supervisor.<br/>"+
													"所选员工属于不同部门并有不同的领导。请重新选择并确保所选员工属于同一个领导管理。");
							return;
						}
					}else{
						this.form.checkerdirect=data.directSupervisor;
						this.form.checkerhead=divisionHead;
						this.form.checkerhrbp=data.hrbp;
					}
					currentuserid=data.id;
				}
				
				var _this = this;
				setTimeout(function() {
					var uri = "/hrualcarryover/listcurrentuserleaves?userid=" + userinfoid + "&currentuserid=" + currentuserid;

					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var dm = JSON.parse(data);
							if(dm.authorityMap.flag=='Y'){
								if(dm.authorityMap.msg){
									$.alert(dm.authorityMap.msg);
								}
								_this.form.hrUalRecordList = _this.concatAndRemoveRepeat(_this.form.hrUalRecordList,dm.data);
							}else{
								$.alert(dm.authorityMap.msg);
								if(_this.form.hrUalRecordList.length<1){
									_this.form.checkerdirect="";
									_this.form.checkerhead="";
									_this.form.checkerhrbp="";
								}
							}
							
						});
					}
				}, 300);

			},
			concatAndRemoveRepeat:function(arr1,arr2){  
				//合并数组
				var arr=arr2.concat(arr1);
				//数组根据staffcode去重
				var repeatstaffcode="";
			    for(var i=0, temp={}, result=[]; i<arr.length;i++){  
			    	var ci=arr[i];
		            var staffcode = ci.staffcode;  
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
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/HrUalCarryover/get/" + id;
			} else {
				var url = "/form/HrUalCarryover/create/";
			}

			if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}
			dm.onbehalf = false;
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempcreatorPosition = dm.form.creatorPosition;
			dm.tempcreatorDept = dm.form.creatorDept;
			dm.currentpersonrecords = dm.form.applyHrUalRecordList;
			
			dm.showClear=true;
			
			if(dm.form.authorityMap.flag=='Y'&&dm.form.authorityMap.msg){
				$.alert(dm.form.authorityMap.msg);
			}else if(dm.form.authorityMap.flag=='N'){
				if(dm.form.hasGroup=='Y'){
					dm.form.applyType='2';
					dm.form.hrUalRecordList=[];
				}
			}
			dm.form.submitstatus=true;
			
			
			return dm;
		},
		watch: {

		},

		computed: {

			processTaskId: {
				// 动态计算processTaskId的值
				get: function() {
					return this.$route.query.taskId;
				}
			},
			processTaskKey: {
				// 动态计算processTaskKey的值
				get: function() {
					return this.$route.query.taskKey;
				}
			},
			readonly: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			disabled: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			}
		},
		mounted() {
			var _this = this;
			
			//draft和reject的流程，由申请人重新打开申请页面时提示是否存在已经完成的年假结转流程
			if(this.$route.query.taskKey&&this.$route.query.taskKey.indexOf('edit') > -1&&(this.form.status == 2 || this.form.status == 9)&&this.$route.path&&this.$route.path.indexOf("detail") < 0){
						var uri = "/hrualcarryover/beforesubmit";
						var _this=this;
						this.GL.actUtil.query("POST",uri,this.form,function(data){
							var returndata = JSON.parse(data);
							console.log(returndata);
							if(returndata && returndata.status.indexOf("success") > -1) {
								if(returndata.msg){
									$.alert(returndata.msg);
								}
							}
						});
			}
			

			//Device SN Number验证
			$("body").on('blur', '#carryoverDaysPerson', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					var totalleaves = Number(_this.form.hrUalRecordList[0].remainingLegallyLeaves) + Number(_this.form.hrUalRecordList[0].remainingCompanyLeaves);
					console.log(totalleaves);
					//var nowvalue=$(this).val();
					var nowvalue = _this.form.hrUalRecordList[0].carryoverDays;
					if(nowvalue) {
						if(reg.test(nowvalue)) {
							if(nowvalue > 10 || nowvalue > totalleaves) {
								var tempmax=10;
								if(totalleaves<10){
									tempmax=totalleaves;
								}
								$.alert('More than maximum carry-over days '+tempmax+' 大于最大结转天数'+tempmax);
								_this.form.hrUalRecordList[0].carryoverDays = "";
								$(this).val("");
							} else if(nowvalue < 5.5) {
								$.alert('Less than minimum carry-over days 5.5  小于最小结转天数5.5');
								_this.form.hrUalRecordList[0].carryoverDays = "";
								$(this).val("");
							} else if(nowvalue % 0.5 != 0) {
								$.alert(' The minimum unit is 0.5 day 最小单位是0.5天');
								_this.form.hrUalRecordList[0].carryoverDays = "";
								$(this).val("");
							}
						} else {
							$.alert('Please enter a number 请输入数字');
							_this.form.hrUalRecordList[0].carryoverDays = "";
							$(this).val("");
						}
					}
				}

			});

			$("body").on('blur', 'input.number', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					var totalleaves = Number(_this.form.hrUalRecordList[$(this).attr("index")].remainingLegallyLeaves) + Number(_this.form.hrUalRecordList[$(this).attr("index")].remainingCompanyLeaves);
					console.log(totalleaves);
					//var nowvalue=$(this).val();
					var nowvalue = _this.form.hrUalRecordList[$(this).attr("index")].carryoverDays;
					if(nowvalue) {
						if(reg.test(nowvalue)) {
							if(nowvalue > 10 || nowvalue > totalleaves) {
								var tempmax=10;
								if(totalleaves<10){
									tempmax=totalleaves;
								}
								$.alert('More than maximum carry-over days '+tempmax+' 大于最大结转天数'+tempmax);
								_this.form.hrUalRecordList[$(this).attr("index")].carryoverDays = "";
								$(this).val("");
							} else if(nowvalue < 5.5) {
								$.alert('Less than minimum carry-over days 5.5  小于最小结转天数5.5');
								_this.form.hrUalRecordList[$(this).attr("index")].carryoverDays = "";
								$(this).val("");
							} else if(nowvalue % 0.5 != 0) {
								$.alert(' The minimum unit is 0.5 day 最小单位是0.5天');
								_this.form.hrUalRecordList[$(this).attr("index")].carryoverDays = "";
								$(this).val("");
							}
						} else {
							$.alert('Please enter a number 请输入数字');
							_this.form.hrUalRecordList[$(this).attr("index")].carryoverDays = "";
							$(this).val("");
						}
					}
				}

			});


			var queryData = this.retrieveData;
			var doAfterSelectOtherPersonForAdd = this.doAfterSelectOtherPersonForAdd;
			var draw = this.draw;
			
			var getuserurl="";
			if(this.form.isChecker=='N'){
				getuserurl="/chooseuserinfo/listdepperson";
			}else if(this.form.isChecker=='Y'){
				getuserurl="/chooseuserinfo/list"
			}
			
			var table = $("#person_tableadd").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + getuserurl,
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
				doAfterSelectOtherPersonForAdd(data);
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});

			});

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_this = this;
			});
		}
	}
</script>

<style>

</style>
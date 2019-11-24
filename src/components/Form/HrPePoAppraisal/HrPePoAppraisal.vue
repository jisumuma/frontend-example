<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">

		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("HrPePoAppraisal")}}</h1>
			<ol class="breadcrumb" v-if="form.onbehalf=='N'">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.Supervisor</a>
				</li>
				<li>
					<a>4.HRBP</a>
				</li>
				<li>
					<a>5.Head of HR, Orga. & Education</a>
				</li>
			</ol>
			<ol class="breadcrumb" v-if="form.onbehalf=='Y'">
				<li>
					<a>1.Applicant</a>
				</li>

				<li>
					<a>2.Supervisor</a>
				</li>
				<li>
					<a>3.HRBP</a>
				</li>
				<li>
					<a>4.Head of HR, Orga. & Education</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
	</span>
		</section>
		<div >
			<!-- Main content -->
			<section class="content container-fluid">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
						<button  class="btn btn-primary btn-sm pull-right" id="baseext-hide-show" >Hide</button>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<!--选中的时候显示-->
								<div class="col-md-3" v-if="!readonly&&(processTaskKey=='editForm'||!processTaskKey)&&form.onbehalf=='Y'">
									<div class="form-group">
										<label for="">
									 	<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 {{$t("HrPePoAppraisal.creatorStaffcode")}} </label>
										<div class="input-group ">
											<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" v-validate="'required'" readonly="readonly">
											<span class="input-group-btn" id="selectotherperson">
                          					<button type="button" class="btn btn-primary btn-flat" @click="selectDirectPerson"><i class="fa fa-fw fa-search"></i></button>
                        				</span>
										</div>
									</div>
								</div>
								<div class="col-md-3" v-if="readonly||(!readonly&&processTaskKey=='directSupervisor')||(!readonly&&(processTaskKey=='editForm'||!processTaskKey)&&form.onbehalf=='N')">
									<div class="form-group">
										<label for="">

										 {{$t("HrPePoAppraisal.creatorStaffcode")}} </label>
										<div >
											<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" v-validate="'required'" readonly="readonly">
										</div>
									</div>
								</div>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPosition" name="creatorPosition" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							</div>
							<div class="row base-ext">
								<form-group col="md-3" type="input" other-rules="required" v-model="form.employeeType" name="employeeType" readonly="readonly"></form-group>
								<div class="col-md-3">
									<div class="form-group" v-if="form.employeeType=='Regular Employee'">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 Probation Starting Date 试用期起始日期 </label>
										<div class="input-group date">
											<div class="input-group-addon">
					                          <i class="fa fa-calendar"></i>
					                        </div>
											<input type="text" class="form-control pull-right" placeholder="Probation Starting Date 试用期起始日期" id="startDate" name="startDate" v-model="form.startDate" readonly="readonly">
										</div>
									</div>
									<div class="form-group" v-if="form.employeeType=='Intern'">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 Internship Starting Date 实习期起始日期 </label>
										<div class="input-group date">
											<div class="input-group-addon">
					                          <i class="fa fa-calendar"></i>
					                        </div>
											<input type="text" class="form-control  pull-right" placeholder="Internship Starting Date 实习期起始日期" id="startDate" name="startDate" v-model="form.startDate" readonly="readonly">
										</div>
									</div>
									<div class="form-group" v-if="form.employeeType=='Apprentice'">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 Apprenticeship Starting Date 学徒期起始日期 </label>
										<div class="input-group date">
											<div class="input-group-addon">
					                          <i class="fa fa-calendar"></i>
					                        </div>
											<input type="text" class="form-control  pull-right" placeholder="Apprenticeship Starting Date 学徒期起始日期" id="startDate" name="startDate" v-model="form.startDate" readonly="readonly">
										</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group" v-if="form.employeeType=='Regular Employee'">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 Probation Ending Date 试用期结束日期</label>
										<div class="input-group date">
											<div class="input-group-addon">
					                          <i class="fa fa-calendar"></i>
					                        </div>
											<input type="text" class="form-control  pull-right" placeholder="Probation Ending Date 试用期结束日期" id="endDate" name="endDate" v-model="form.endDate" readonly="readonly">
										</div>
									</div>
									<div class="form-group" v-if="form.employeeType=='Intern'">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 Internship Ending Date 实习期结束日期</label>
										<div class="input-group date">
											<div class="input-group-addon">
					                          <i class="fa fa-calendar"></i>
					                        </div>
											<input type="text" class="form-control pull-right" placeholder="Internship Ending Date 实习期结束日期" id="endDate" name="endDate" v-model="form.endDate" readonly="readonly">
										</div>
									</div>
									<div class="form-group" v-if="form.employeeType=='Apprentice'">
										<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 Apprenticeship Ending Date 学徒期结束日期</label>
										<div class="input-group date">
											<div class="input-group-addon">
					                          <i class="fa fa-calendar"></i>
					                        </div>
											<input type="text" class="form-control pull-right" placeholder="Apprenticeship Ending Date 学徒期结束日期" id="endDate" name="endDate" v-model="form.endDate" readonly="readonly">
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Permanent Position Appraisal 转正评估</h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">

								<div class="col-md-12">

									<table id="AppraisalTable" class="table table-bordered table-hover table-permanent-position">
										<thead>
											<tr class="bg-gray-light">
												<th colspan="2" rowspan="2" style="vertical-align: middle;text-align: center;">Appraisal Criteria 评估因素</th>
												<th colspan="5" style="vertical-align: middle;text-align: center;">Appraisal Standards 评估标准</th>
											</tr>
											<tr class="bg-gray-light">
												<th class="text-center" width="60">P1</th>
												<th class="text-center" width="60">P2 + </th>
												<th class="text-center" width="60">P2 </th>
												<th class="text-center" width="60">P2 - </th>
												<th class="text-center" width="60">P3 </th>
											</tr>
										</thead>
										<tbody>
											<tr v-bind:key="index" v-for="(entry,index) in form.appraisalRecordList" >

												<td class="bg-gray-light is-safe" style="text-align: left;vertical-align: middle;">
													{{entry.firstLevelName}}
												</td>
												<td class="is-safe" style="text-align: left;vertical-align: middle;">
													<i v-if="entry.required=='1'" class="fa fa-asterisk text-required"  style="font-size: 10px;"></i>{{entry.secondLevelName}}
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has(entry.secondLevelName),'is-safe': !errors.has(entry.secondLevelName) }">
													<input type="radio" :name="entry.secondLevelName" value="P1" v-if="entry.required=='1'"
														:class="{'is-danger': errors.has(entry.secondLevelName) }" v-model="entry.appraisalValue" v-validate="'required'"
														:disabled="readonly" >
													<input type="radio" :name="entry.secondLevelName" value="P1" v-if="entry.required=='2'"
														:class="{'is-danger': errors.has(entry.secondLevelName) }" v-model="entry.appraisalValue" v-validate=""
														:disabled="readonly" >
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has(entry.secondLevelName),'is-safe': !errors.has(entry.secondLevelName) }">
													<input type="radio" :name="entry.secondLevelName" value="P2 +"
														:class="{'is-danger': errors.has(entry.secondLevelName) }" v-model="entry.appraisalValue"
														:disabled="readonly" >
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has(entry.secondLevelName),'is-safe': !errors.has(entry.secondLevelName) }">
													<input type="radio" :name="entry.secondLevelName" value="P2"
														:class="{'is-danger': errors.has(entry.secondLevelName) }" v-model="entry.appraisalValue"
														:disabled="readonly" >
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has(entry.secondLevelName),'is-safe': !errors.has(entry.secondLevelName) }">
													<input type="radio" :name="entry.secondLevelName" value="P2 -"
														:class="{'is-danger': errors.has(entry.secondLevelName) }" v-model="entry.appraisalValue"
														:disabled="readonly" >
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has(entry.secondLevelName),'is-safe': !errors.has(entry.secondLevelName) }">
													<input type="radio" :name="entry.secondLevelName" value="P3"
														:class="{'is-danger': errors.has(entry.secondLevelName) }" v-model="entry.appraisalValue"
														:disabled="readonly" >
												</td>

											</tr>

											<!--Overall appraisal 总体评估 -->
												<tr  style="background-color:#f7f7f7;">
												<td class="bg-gray-light is-safe"><i class="fa fa-asterisk text-required"  style="font-size: 10px;"></i> <strong>Overall appraisal 总体评估</strong></td>
												<td  style=" border: 1px solid #e4e4e4 !important"></td>
												<td style="text-align: center;vertical-align: middle;"  :class="{'is-danger': errors.has('overall-appraisal'),'is-safe': !errors.has('overall-appraisal') }">
												 <input type="radio" :class="{'is-danger': errors.has('overall-appraisal') }" name="overall-appraisal"  value="P1" v-model="form.overallAppraisal" v-validate="'required'" :disabled="readonly">
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has('overall-appraisal'),'is-safe': !errors.has('overall-appraisal') }">
												 <input type="radio" :class="{'is-danger': errors.has('overall-appraisal') }"  name="overall-appraisal"  value="P2 +" v-model="form.overallAppraisal" v-validate="'required'" :disabled="readonly">
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has('overall-appraisal'),'is-safe': !errors.has('overall-appraisal') }">
												 <input type="radio" :class="{'is-danger': errors.has('overall-appraisal') }"  name="overall-appraisal"  value="P2" v-model="form.overallAppraisal" v-validate="'required'" :disabled="readonly">
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has('overall-appraisal'),'is-safe': !errors.has('overall-appraisal') }">
												 <input type="radio" :class="{'is-danger': errors.has('overall-appraisal') }"  name="overall-appraisal"  value="P2 -" v-model="form.overallAppraisal" v-validate="'required'" :disabled="readonly">
												</td>
												<td style="text-align: center;vertical-align: middle;" :class="{'is-danger': errors.has('overall-appraisal'),'is-safe': !errors.has('overall-appraisal') }">
												 <input type="radio" :class="{'is-danger': errors.has('overall-appraisal') }"  name="overall-appraisal"  value="P3" v-model="form.overallAppraisal" v-validate="'required'" :disabled="readonly">
												</td>
											</tr>
											<!--Overall appraisal 总体评估 -->
											<tr>
												<td  class="bg-gray-light is-safe"><strong>Appraisal consequence 评估结果</strong></td>
												<td class="is-safe" colspan="6">
													<div class="radio mar-top-0" v-if="form.employeeType=='Regular Employee'">
														<label class="col-md-6">
								                            <input type="radio" name="appraisalConsequence" :disabled="readonly||(form.overallAppraisal=='P3'||!form.overallAppraisal)" value="Confirmation of permanent position 确认试用期转正" v-model="form.appraisalConsequence">
								                            Confirmation of permanent position 确认试用期转正
								                          </label>
														<label class="col-md-5">
								                            <input type="radio" name="appraisalConsequence" :disabled="readonly" value="Termination of labor contract 劳动合同解除" v-model="form.appraisalConsequence">
								                            Termination of labor contract 劳动合同解除
								                          </label>
														<div class="col-md-1 text-right" v-show="!readonly">
													      <button type="button" class="btn btn-success btn-xs" :disabled="readonly" @click="clearAppraisalConsequence()">Clear</button>
												        </div>
													</div>
													<div class="radio mar-top-0" v-if="form.employeeType=='Intern'">
														<label class="col-md-6">
								                            <input type="radio" name="appraisalConsequence" :disabled="readonly||(form.overallAppraisal=='P3'||!form.overallAppraisal)" value="Confirmation of intern conversion 确认实习期转正" v-model="form.appraisalConsequence">
								                            Confirmation of intern conversion 确认实习期转正
								                          </label>
														<label class="col-md-5">
								                            <input type="radio" name="appraisalConsequence" :disabled="readonly" value="Termination of internship 实习终止" v-model="form.appraisalConsequence">
								                            Termination of internship 实习终止
								                          </label>
														<div class="col-md-1 text-right" v-show="!readonly">
													      <button type="button" class="btn btn-success btn-xs" :disabled="readonly"  @click="clearAppraisalConsequence()">Clear</button>
												        </div>
													</div>
													<div class="radio mar-top-0" v-if="form.employeeType=='Apprentice'">
														<label class="col-md-6">
								                            <input type="radio" name="appraisalConsequence" :disabled="readonly||(form.overallAppraisal=='P3'||!form.overallAppraisal)" value="Confirmation of regular position 确认学徒期转正" v-model="form.appraisalConsequence">
								                            Confirmation of regular position 确认学徒期转正
								                          </label>
														<label class="col-md-5">
								                            <input type="radio" name="appraisalConsequence" :disabled="readonly" value="Termination of apprenticeship 学徒种止" v-model="form.appraisalConsequence">
								                            Termination of apprenticeship 学徒终止
								                          </label>
														<div class="col-md-1 text-right" v-show="!readonly">
													      <button type="button" class="btn btn-success btn-xs" :disabled="readonly"  @click="clearAppraisalConsequence()">Clear</button>
												        </div>
													</div>
												</td>
											</tr>

										</tbody>
									</table>

								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label for=""><i v-if="othersuggestionrule=='required'" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Other Suggestion 其他建议 </label>
										<textarea-my :other-rules="othersuggestionrule" rows="2" placeholder="Other Suggestion 其他建议 " :readonly="readonly" v-model="form.otherSuggestion" name="otherSuggestion" id="otherSuggestion"></textarea-my>

									</div>
								</div>

							</div>
						</div>
					</form>
				</div>
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title"> Further alternative 跟进方案</h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label><i v-if="furtherAlternativeArule=='required'" class="fa fa-asterisk text-required" style="font-size: 10px;"></i> A: Please list capability improvement points: 请列举技能待改进内容</label>
										<textarea-my  rows="2" placeholder="Please list capability improvement points 请列举技能待改进内容"
											:other-rules="furtherAlternativeArule" :readonly="readonly" v-model="form.furtherAlternativeA" name="furtherAlternativeA" id="furtherAlternativeA"></textarea-my>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label><!--<i class="fa fa-asterisk text-required"></i>--> B: Please elaborate transfer position, department & reasons: 请阐述转岗职位，部门及原因</label>
										<textarea-my  rows="2" placeholder="Please elaborate transfer position, department & reasons 请阐述转岗职位，部门及原因"
											other-rules="" :readonly="readonly" v-model="form.furtherAlternativeB" name="furtherAlternativeB" id="furtherAlternativeB"></textarea-my>
									</div>
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
								<upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true" required="false" fileSizeLimit="5MB"></upload2>
							</div>
						</div>
					</div>
				</div>
				<div class="checkbox mar-bot-20" v-if="!readonly&&(!processTaskKey||processTaskKey=='editForm')">
					<label>
              <span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
               <input  name="terms" type="checkbox" v-validate="'required'" >I have read and agreed following relevant policies: 我已阅读并同意以下相关政策： <br>

              When submitting the application, I have read and agreed to
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
            </label>
				</div>
				<comment v-if="processTaskId !=null&&form.status != 9&&processTaskKey!='editForm'" v-model="form.approval.approvalRemark"></comment>
				<router-view :form="form" entityId="HrPePoAppraisal" v-if="processTaskKey=='supervisor'||processTaskKey=='directSupervisor'" vclass="btn-left" uri="/form/HrPePoAppraisal/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" approveLabelName="Approve" rejectLabelname="Reject"></router-view>
        <router-view :form="form" entityId="HrPePoAppraisal" v-else-if="processTaskKey=='hrbp'" vclass="btn-left" uri="/form/HrPePoAppraisal/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" approveLabelName="Confirm" rejectLabelname="Decline"></router-view>
        <router-view :form="form" entityId="HrPePoAppraisal" v-else vclass="btn-left" uri="/form/HrPePoAppraisal/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
				<comment-list v-if="form.processInstanceId !=null"></comment-list>

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
		name: 'HrPePoAppraisal',
		methods: {
			beforesubmit: function() {
				if(!this.$route.query.taskKey||(this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('edit') > -1
				))) {
					this.form.submitstatus = true;
					this.form.approvelstatus = true;
					var uri = "/HrPePoAppraisal/beforesubmit";
					var _this = this;
					this.GL.actUtil.query("POST", uri, this.form, function(data) {
						var returndata = JSON.parse(data);
						console.log(returndata);
						if(returndata && returndata.status.indexOf("success") > -1) {
							if(returndata.msg) {
								//$.alert(returndata.msg);
							}
							//console.log("验证通过！");
							_this.form.submitstatus = true;
							_this.form.approvelstatus = true;
						} else if(returndata && returndata.status.indexOf("fail") > -1) {
							if(returndata.msg) {
								$.alert(returndata.msg);
							}
							_this.form.submitstatus = false;
							_this.form.approvelstatus = false;
						}

					});
				}


			},
			clearAppraisalConsequence:function(){
                this.form.appraisalConsequence="";
			},
			doAfterSelectOtherPerson: function(data) {

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
				_this.form.appraisalRecordList =[];
				setTimeout(function() {
					var uri = "/HrPePoAppraisal/listcurrentuserappraisal?userid=" + data.id;

					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var dm = JSON.parse(data);

							_this.form.appraisalRecordList = dm.data;
							_this.form.employeeType = dm.employeeType;
							_this.form.startDate = dm.startDate;
							_this.form.endDate = dm.endDate;
							setTimeout(function() {
								$("#AppraisalTable").rowspan(0); //第一列合并
							},500);

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
			p3click:function(){
				var _this = this;
				setTimeout(function(){
					if(_this.form.overallAppraisal=='P3'&&_this.form.appraisalConsequence&&_this.form.appraisalConsequence.indexOf("Confirmation")>-1){
						_this.form.appraisalConsequence=undefined;
					}
				},200);
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/HrPePoAppraisal/get/" + id;
			} else {
				var url = "/form/HrPePoAppraisal/create/";
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

			dm.form.submitstatus = true;
			dm.form.approvelstatus = true;
			return dm;
		},
		watch: {

		},

		computed: {
			othersuggestionrule:{
				get: function() {
					if(this.form.appraisalConsequence){
						return "";
					}
					return "required";
				}
			},
			furtherAlternativeArule:{
				get: function() {
					console.info(this.form.overallAppraisal);
					if(this.form.overallAppraisal=='P2 -'&&(this.form.appraisalConsequence&&this.form.appraisalConsequence.indexOf("Termination")<0)){
					//if(this.form.overallAppraisal=='P2 -'){
						return "required";
					}
					return "";
				}
			},
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
					if(this.$route.query.taskKey != null&&this.$route.query.taskKey.indexOf('direct') != -1&&this.$route.path.indexOf('audit') > -1){
						return false;
					}

					return(this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('edit') == -1 && this.$route.query.taskKey.indexOf('direct') == -1)) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 );
				}
			},
			disabled: {
				// 动态计算readonly的值
				get: function() {
					if(this.$route.query.taskKey != null&&this.$route.query.taskKey.indexOf('direct') != -1&&this.$route.path.indexOf('audit') > -1){
						return false;
					}
					return(this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('edit') == -1 && this.$route.query.taskKey.indexOf('direct') == -1)) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 );
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


			$("#AppraisalTable").rowspan(0); //第一列合并

			var _this = this;

			//draft和reject的流程，由申请人重新打开申请页面时提示是否存在已经完成的年假结转流程
			if(this.$route.query.taskKey && this.$route.query.taskKey.indexOf('edit') > -1 && (this.form.status == 2 || this.form.status == 9) && this.$route.path && this.$route.path.indexOf("detail") < 0) {
				var uri = "/HrPePoAppraisal/beforesubmit";
				var _this = this;
				this.GL.actUtil.query("POST", uri, this.form, function(data) {
					var returndata = JSON.parse(data);
					console.log(returndata);
					if(returndata && returndata.status.indexOf("success") > -1) {
						if(returndata.msg) {
							$.alert(returndata.msg);
						}
					}
				});
			}

			var queryData = this.retrieveData;
			var doAfterSelectOtherPerson = this.doAfterSelectOtherPerson;
			var draw = this.draw;
			var table = $("#person_tableadd").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/HrPePoAppraisal/listdirectperson",
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

			var hideorshow="0";
			$('body').on('click', '#baseext-hide-show', function() {
				if(hideorshow=="0"){
					$(".base-ext").hide();
					$("#baseext-hide-show").text("More");
					hideorshow="1";
				}else{
					$(".base-ext").show();
					$("#baseext-hide-show").text("Hide");
					hideorshow="0";
				}
			});
			$('#baseext-hide-show').trigger('click');

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_this = this;
			});
		}
	}
</script>

<style >
	/*.bg-gray-light*/
	table#AppraisalTable td.is-safe,table#AppraisalTable th {
		border: 1px solid #e4e4e4 !important;
	}
	table#AppraisalTable td.is-danger{
		/*border-top: 1px solid #ff3860 !important;*/
		border-bottom: 1px solid #ff3860 !important;
		/*border-left: 1px solid #ff3860 !important;
		border-right: 1px solid #ff3860 !important;*/
	}
</style>

<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">

		<!-- Content Header (Page header) -->

		<section class="content-header" style="padding-bottom:15px;">
			<h1>{{$t("HrTraining")}}</h1>
			<ol class="breadcrumb" style="max-width:70%;" v-if="(form.trainingType=='3')">
                <li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.CHE Training Officer</a>
				</li>
				<li>
					<a>3.Disciplinary Supervisor</a>
			    </li>
			    <li>
			   	    <a>4.Cost Center Owner</a>
			    </li>
			     <li>
			   	    <a>5.CHE Manager</a>
			    </li>
			    <li v-if="Number(form.training3TotalCost)>=15000">
			    	<a>6.Head of HR Orga.&Education</a>
			    </li>
				<li v-if="Number(form.training3TotalCost)>=15000">
					<a>7.Applicant Agreement Download / Upload</a>
				</li>
	            <li v-if="Number(form.training3TotalCost)>=15000">
					<a>8.CHE Training Officer Confirm</a>
				</li>
			</ol>
			<ol class="breadcrumb" style="max-width:70%;" v-else-if="(form.trainingType=='4')">
                <li>
					<a>1.Applicant</a>
				</li>
				<li v-if="form.training4Newcomer">
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li v-else>
					<a>2.CHE Training Officer</a>
				</li>
				<li v-if="form.training4Newcomer">
					<a>3.CHE Training Officer</a>
			    </li>
				<li v-else>
					<a>3.Disciplinary Supervisor</a>
				</li>
			    <li>
			   	    <a>4.Cost Center Owner</a>
			    </li>
			     <li>
			   	    <a>5.CHE Manager</a>
			    </li>
			    <li v-if="needBond">
			    	<a>6.Head of HR Orga.&Education</a>
			    </li>
				<li v-if="needBond">
					<a>7.Applicant Agreement Download / Upload</a>
				</li>
	            <li v-if="needBond">
					<a>8.CHE Training Officer Confirm</a>
				</li>
			</ol>
			<ol class="breadcrumb" style="max-width:70%;" v-else-if="(form.trainingType=='2')">
                <li>
					<a>1.Applicant</a>
				</li>
				<li v-if="form.training2ChangeTraining || form.training2Newcomer">
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li v-else>
					<a>2.CHE Training Officer</a>
				</li>
				<li v-if="form.training2ChangeTraining || form.training2Newcomer">
					<a>3.CHE Training Officer</a>
			    </li>
				<li v-else>
					<a>3.Disciplinary Supervisor</a>
				</li>
			    <li>
			   	    <a>4.Cost Center Owner</a>
			    </li>
			     <li>
			   	    <a>5.CHE Manager</a>
			    </li>
			    <li v-if="Number(form.training2TotalCost)>=15000">
			    	<a>6.Head of HR Orga.&Education</a>
			    </li>
				<li v-if="Number(form.training2TotalCost)>=15000">
					<a>7.Applicant Agreement Download / Upload</a>
				</li>
	            <li v-if="Number(form.training2TotalCost)>=15000">
					<a>8.CHE Training Officer Confirm</a>
				</li>
			</ol>
			<ol class="breadcrumb" style="max-width:70%;" v-else>
				<li>
					<a>1.Applicant</a>
				</li>
				<li v-if="form.training1ChangeTraining || form.training1Newcomer">
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li v-else>
					<a>2.CHE Training Officer</a>
				</li>
				<li v-if="form.training1ChangeTraining || form.training1Newcomer">
					<a>3.CHE Training Officer</a>
			    </li>
				<li v-else>
					<a>3.Disciplinary Supervisor</a>
				</li>
			    <li>
			   	    <a>4.Cost Center Owner</a>
			    </li>
			    <li>
			   	    <a>5.CHE Manager</a>
			    </li>
			</ol>

			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
	</span>
		</section>
		<div>
			<!-- Main content -->
			<section class="content container-fluid">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
						<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;">
							<label>
								<input type="checkbox" style="" id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong>
							</label></div>
						<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero">
						   <i class="fa fa-plus" id="minusplusi"></i>
					    </button>
					   </div>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<!--不选中的时候显示-->
								<form-group v-if="!onbehalf" other-rules="" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
								<!--选中的时候显示-->
								<div class="col-md-3" v-if="onbehalf">
									<div class="form-group">
										<label for="">
										<!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp; -->
										 {{$t("HrTraining.creatorStaffcode")}} </label>
										<div class="input-group ">
											<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
											<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" chooseID="onbehalfperson" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
										</div>
									</div>
								</div>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPosition" name="creatorPosition" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							</div>
							<div class="row panel-collapse collapse " id="collapseZero">
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorDirectsupervisor" name="creatorDirectsupervisor" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorCostcenter" name="creatorCostcenter" readonly="readonly"></form-group>

							</div>

						</div>
					</form>
				</div>

				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> Training Information 培训信息 </h3>

					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-12 form-group">
									<div style="overflow: auto;" :class="{'is-danger': errors.has('trainingType') }">
										<div class="radio mar-top-0">
											<div class="col-md-3">
											<label class="" style="padding-left:5px;">
					                          <input type="radio" name="trainingType" :class="{'is-danger': errors.has('trainingType') }" v-model="form.trainingType" v-validate="'required'" value="1" :disabled="readonly" style="float:left;margin-top: 3px;">
					                           Interdisciplinary Training 通用技能培训
					                        </label>
											</div>
											<div class="col-md-3">
											<label style="padding-left:12px;">
					                          <input type="radio" name="trainingType" :class="{'is-danger': errors.has('trainingType') }"  v-model="form.trainingType" v-validate="'required'" value="3" :disabled="readonly" style="float:left;margin-top: 3px;">
					                           Technical  Training  专业技能培训
					                           <i class="fa fa-fw fa-info-circle text-info" :title="technicalTip"></i>
					                        </label>
											</div>
											<div class="col-md-3">
					                        <label style="padding-left:22px;">
					                          <input type="radio" name="trainingType" :class="{'is-danger': errors.has('trainingType') }"  v-model="form.trainingType" v-validate="'required'" value="4" :disabled="readonly" style="float:left;margin-top: 3px;">
					                           Personnel Development Program  人员发展培训
					                        </label>
											</div>
											<div class="col-md-3">
					                        <label class="mar-left-20" style="padding-left:12px;">
					                          <input type="radio" name="trainingType" :class="{'is-danger': errors.has('trainingType') }"  v-model="form.trainingType" v-validate="'required'" value="2" :disabled="readonly" style="float:left;margin-top: 3px;">
					                          Language  Training 语言培训
					                        </label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<section v-if="form.trainingType=='1'"><!-- 通用技能培训 -->
								<div class="row">
									<div class="col-md-12 form-group checkbox" style="margin-top: 0;">
										<div class="col-md-3" style="padding-left:20px;">
											<input name="training1ChangeTraining" type="checkbox" v-model="training1ChangeTraining" value="true" :disabled="readonly" style="float:left;margin-top: 3px;" @change="changeTraining1" id="training1ChangeTraining"> Training Change 培训变更
											<i class="fa fa-fw fa-info-circle text-info" :title="changeTip"></i>
										</div>
										<div class="col-md-3" style="padding-left:28px;">
											<input name="training1Newcomer" type="checkbox" v-model="training1Newcomer" value="true" :disabled="readonly" style="float:left;margin-top: 3px;" @change="newComer1"> New Training Demand 新培训需求
											<i class="fa fa-fw fa-info-circle text-info" :title="newComerTip"></i>
										</div>
									</div>
								</div>
								<div class="row" style="margin-bottom:5px;margin-top:5px;">
									<div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                 Competency 能力 </label>
										 <div class="row">
									        <form-group col="md-12" type="select" v-if="form.training1Name1Show"
										    :uri="'/HrTraining/listTraining1Name1?applicantUserId='+form.applicantUserId+'&training1ChangeTraining='+form.training1ChangeTraining+'&training1Newcomer='+form.training1Newcomer"
									        	other-rules="required" haslable="false" v-model="form.training1Name1" name="training1Name1" :readonly="readonly" key="training1Name1"></form-group>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                 Training Course 培训课程 </label>
										 <div class="row">
									    <form-group col="md-12" type="select" v-if="form.training1Name2Show"
									    	:uri="'/HrTraining/listTraining1Name2?applicantUserId='+form.applicantUserId+'&training1Name1='+encodeURIComponent(form.training1Name1)+'&training1ChangeTraining='+form.training1ChangeTraining+'&training1Newcomer='+form.training1Newcomer"
									    	other-rules="required" haslable="false" v-model="form.training1Name2" name="training1Name2" :readonly="readonly" key="training1Name2"></form-group>
							     		<form-group col="md-12" type="input" v-if="!form.training1Name2Show"
								     		other-rules="required" haslable="false" v-model="form.training1Name2" name="training1Name2" readonly="readonly"></form-group>
                                           </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                 Training Date 培训日期 </label>
										 <div class="row">
									<form-group col="md-12" type="select" v-if="form.training1Name3Show"
										:uri="'/HrTraining/listTraining1Name3?training1Name1='+encodeURIComponent(form.training1Name1)+'&training1Name2='+encodeURIComponent(form.training1Name2)"
										other-rules="required" haslable="false" v-model="form.training1Name3" name="training1Name3" :readonly="readonly"  key="training1Name3"></form-group>
									<form-group col="md-12" type="input" v-if="!form.training1Name3Show"
										other-rules="required" haslable="false" v-model="form.training1Name3" name="training1Name3" readonly="readonly"></form-group>
                                          </div>
                                        </div>
                                    </div>
								</div>
                                <div class="row">
                                     <div class="col-md-12">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                Learning Goal and Training Expectation 学习目标及培训期望 </label>
											<i class="fa fa-fw fa-info-circle text-info" :title="employeeExceptionTip"></i>
											<div class="row">
												<form-group col="md-12" type="textarea2" other-rules="required" haslable="false" v-model="form.training1Exception" name="training1Exception" :readonly="readonly" rows="3"></form-group>
											</div>
                                        </div>
                                    </div>
								</div>
								<div class="row" v-if="(processTaskKey=='directSupervisor') || form.training1Feedback">
                                     <div class="col-md-12">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                Employee’s Learning Goal from Leader’s Perspective 经理建议的学习目标 </label>
											<i class="fa fa-fw fa-info-circle text-info" :title="exceptionTip"></i>
											<div class="row">
												<form-group col="md-12" haslable="false" limit="3000" type="textarea2" other-rules="required" v-model="form.training1Feedback" name="training1Feedback" :readonly="readonlyBySupervisor" rows="5"></form-group>
											</div>
                                        </div>
                                    </div>
								</div>
							</section>
							<section v-if="form.trainingType=='3'"><!-- 专业技能培训-->
								<div class="row">
								</div>
								<div class="row">
									<form-group col="md-3" type="input" other-rules="required|max:300" v-on:change="inputText(null, false,31)" v-model="form.training3FullName" name="training3FullName" :readonly="readonly" placeholder="300 Characters Max  (最多填写300个字节)"></form-group>

									<form-group col="md-3" type="daterangepicker" other-rules="required" v-model="form.training3Period" name="training3Period" :readonly="readonly" key="training3Period"></form-group>
									<div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
												{{$t("HrTraining.training3Duration")}} 
											</label>
											<div class="row">
												<form-group col="md-4" paddingShow="padding-right: 0 !important;" type="input6" haslable="false" other-rules="required|decimal" v-model="form.training3Duration" name="training3Duration" :readonly="readonly" ></form-group>
												<form-group col="md-8" paddingShow="padding-left: 0 !important;" type="select" haslable="false" uri="/dict/list?groupName=trainingDurationUnit" other-rules="required" v-model="form.training3DurationUnit" name="training3DurationUnit" :readonly="readonly"></form-group>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<form-group col="md-6" type="input" other-rules="required|max:300" v-on:change="inputText(null, false,32)" v-model="form.training3Vendor" name="training3Vendor" :readonly="readonly" placeholder="300 Characters Max  (最多填写300个字节)"></form-group>
									<form-group col="md-6" type="input" other-rules="required|max:300" v-on:change="inputText(null, false,33)" v-model="form.training3Site" name="training3Site" :readonly="readonly" placeholder="300 Characters Max  (最多填写300个字节)"></form-group>

									<form-group col="md-3" v-on:change="totalCost3" type="currency" other-rules="required" v-model="form.training3CostStr" name="training3Cost" :readonly="readonly"></form-group>
									<form-group col="md-3" v-on:change="totalCost3" type="currency" other-rules="required" v-model="form.training3TravelCostStr" name="training3TravelCost" :readonly="readonly"></form-group>
									<form-group col="md-3" v-on:change="totalCost3" type="currency" other-rules="required" v-model="form.training3AccomendationCostStr" name="training3AccomendationCost" :readonly="readonly"></form-group>
										
									<div class="col-md-3">
										<div class="form-group">
												<label for="">
												<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
												 {{$t("HrTraining.training3TotalCost")}} </label>
											<div class="input-group ">
													<input type="text" class="form-control" placeholder="" id="training3TotalCost" name="training3TotalCost" v-model="form.training3TotalCostStr" readonly="readonly">
													<span class="input-group-btn">
														<button id="popoverbutton" class="btn btn-primary btn-flat popoverbutton" type="button" data-container="body" data-toggle="popover" data-placement="bottom"
															title="Note" data-content="=Training Cost + Travel Cost + Accommodation Cost" ><i class="fa fa-fw fa-bars"></i></button>
													</span>
											</div>

										</div>
									</div>
								</div>
							</section>
							<section v-if="form.trainingType=='4'">		<!-- 人员发展培训 -->
								<div class="row">
									<div class="col-md-12 form-group checkbox" style="margin-top: 0;">
										<div class="col-md-3" style="padding-left:20px;">
											<input name="training4Newcomer" type="checkbox" v-model="training4Newcomer" value="true" :disabled="readonly" style="float:left;margin-top: 3px;" @change="newcomer4" id="training4Newcomer"> New Training Demand 新培训需求
											<i class="fa fa-fw fa-info-circle text-info" :title="newComerTip"></i>
										</div>
									</div>
								</div>
								<div class="row">
									<form-group col="md-6" type="select"  v-if="form.training4FullNameShow" haslable="true" 
									:uri="'/HrTraining/listDevelopPlan?applicantUserId='+form.applicantUserId+'&training4Newcomer='+form.training4Newcomer" other-rules="required" v-model="form.training4FullName" name="training4FullName" :readonly="readonly"></form-group>
								</div>
								<div class="row">
									<form-group col="md-3" type="select" haslable="true" uri="/dict/listOrder?groupName=trainingLanguage" other-rules="required" v-model="form.training4Language" name="training4Language" :readonly="readonly"></form-group>
										

									<form-group col="md-3" type="daterangepicker" other-rules="required" v-model="form.training4Period" name="training4Period" :readonly="readonly" key="training4Period"></form-group>
									<div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;{{$t("HrTraining.training4Duration")}} </label>
											<div class="row">
												<form-group col="md-4" paddingShow="padding-right: 0 !important;" type="input6" haslable="false" other-rules="required|decimal" v-model="form.training4Duration" name="training4Duration" :readonly="readonly" ></form-group>
												<form-group col="md-8" paddingShow="padding-left: 0 !important;" type="select" haslable="false" uri="/dict/list?groupName=trainingDurationUnit" other-rules="required" v-model="form.training4DurationUnit" name="training4DurationUnit" :readonly="readonly" ></form-group>
											</div>
										</div>
									</div>
									
									<form-group col="md-3" type="input" v-on:change="inputText(null, false,4)" other-rules="required|max:300" v-model="form.training4Vendor" name="training4Vendor" :readonly="readonly" placeholder="300 Characters Max  (最多填写300个字节)"></form-group>
								</div>
								<div class="row">
										<form-group col="md-3" v-on:change="totalCost4" type="currency" other-rules="required" v-model="form.training4CostStr" name="training4Cost" :readonly="readonly" ></form-group>
										<form-group col="md-3" v-on:change="totalCost4" type="currency" other-rules="required" v-model="form.training4TravelCostStr" name="training4TravelCost" :readonly="readonly"></form-group>
										<form-group col="md-3" v-on:change="totalCost4" type="currency" other-rules="required" v-model="form.training4AccomendationCostStr" name="training4AccomendationCost" :readonly="readonly"></form-group>
										
										<div class="col-md-3">
											<div class="form-group">
												<label for="">
												<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
												 {{$t("HrTraining.training4TotalCost")}} </label>
												<div class="input-group ">
													<input type="text" class="form-control" placeholder="" id="training4TotalCost" name="training4TotalCost" v-model="form.training4TotalCostStr" readonly="readonly">
													<span class="input-group-btn">
														<button id="popoverbutton4" class="btn btn-primary btn-flat popoverbutton" type="button" data-container="body" data-toggle="popover" data-placement="bottom"
															title="Note" data-content="=Training Cost + Travel Cost + Accommodation Cost" ><i class="fa fa-fw fa-bars"></i></button>
													</span>
												</div>

											</div>
										</div>
								</div>
							</section>
							<section v-if="form.trainingType=='2'">	<!-- 语言培训 -->
								<div class="row">
									<div class="col-md-12 form-group checkbox" style="margin-top: 0;">
										<div class="col-md-3" style="padding-left:20px;">
											<input name="training2ChangeTraining" type="checkbox" v-model="training2ChangeTraining" value="true" :disabled="readonly" style="float:left;margin-top: 3px;" @change="changeTraining2"> Training Change 培训变更
											<i class="fa fa-fw fa-info-circle text-info" :title="changeTip"></i>
										</div>
										<div class="col-md-3" style="padding-left:28px;">
											<input name="training2Newcomer" type="checkbox" v-model="training2Newcomer" value="true" :disabled="readonly" style="float:left;margin-top: 3px;" @change="newComer2"> New Training Demand 新培训需求
											<i class="fa fa-fw fa-info-circle text-info" :title="newComerTip"></i>
										</div>
									</div>
								</div>
								<div class="row" style="margin-bottom:5px;margin-top:5px;">
                                	<div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                Language Type 语言种类 </label>
											<div class="row">
												<form-group col="md-12" type="select" v-if="form.training2TypeShow"
													:uri="'/HrTraining/listTraining2Type?applicantUserId='+form.applicantUserId+'&training2ChangeTraining='+form.training2ChangeTraining+'&training2Newcomer='+form.training2Newcomer" other-rules="required" haslable="false" v-model="form.training2Type" name="training2Type" :readonly="readonly" key="training2Type"></form-group>
												<form-group col="md-12" type="input" v-if="!form.training2TypeShow"
													other-rules="required" haslable="false" v-model="form.training2Type" name="training2Type" readonly="readonly"></form-group>
											</div>
										</div>
                                   </div>
                                   <div class="col-md-3">
										<div class="">
											<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
                                                Level 等级 </label>
											<div class="row">
												<form-group col="md-12" type="select" v-if="form.training2LevelShow"
												:uri="'/HrTraining/listTraining2Level?applicantUserId='+form.applicantUserId+'&training2Type='+encodeURIComponent(form.training2Type)+'&training2ChangeTraining='+form.training2ChangeTraining+'&training2Newcomer='+form.training2Newcomer"
												other-rules="required" haslable="false" v-model="form.training2Level" name="training2Level" :readonly="readonly" key="training2Level"></form-group>
												<form-group col="md-12" type="input" v-if="!form.training2LevelShow"
												other-rules="required" haslable="false" v-model="form.training2Level" name="training2Level" readonly="readonly"></form-group>
											</div>
										</div>
									</div>
									<form-group col="md-3" type="daterangepicker" v-model="form.training2Period" name="training2Period" :readonly="readonly" key="training2Period"></form-group>	

									<div class="col-md-3">
										<div class="">
											<label for="">&nbsp;{{$t("HrTraining.training2Duration")}} </label>
												<div class="row">
													<form-group col="md-4" paddingShow="padding-right: 0 !important;" type="input6" haslable="false" other-rules="decimal" v-model="form.training2Duration" name="training2Duration" :readonly="readonly"></form-group>
													<form-group col="md-8" paddingShow="padding-left: 0 !important;" type="select" haslable="false" uri="/dict/list?groupName=trainingDurationUnit"  v-model="form.training2DurationUnit" name="training2DurationUnit" :readonly="readonly"></form-group>
												</div>
											</div>
										</div> 
									</div>
								<div class="row" >
							        <form-group col="md-6" hasAsterisk="false" haslable="false" type="input" v-on:change="inputText(null, false,21)" v-model="form.training2Vendor" name="training2Vendor" :readonly="readonly" other-rules="max:300" placeholder="300 Characters Max  (最多填写300个字节)"></form-group>
								    <form-group col="md-6" hasAsterisk="false" haslable="false" type="input" v-on:change="inputText(null, false,22)" v-model="form.training2Site" name="training2Site" :readonly="readonly" other-rules="max:300" placeholder="300 Characters Max  (最多填写300个字节)"></form-group>
								</div>
								<div class="row">
                                    <form-group col="md-3" type="currency" v-on:change="totalCost2" v-model="form.training2CostStr" name="training2Cost" :readonly="readonly"></form-group>
									<form-group col="md-3" type="currency" v-on:change="totalCost2" v-model="form.training2TravelCostStr" name="training2TravelCost" :readonly="readonly"></form-group>
								    <form-group col="md-3" type="currency" v-on:change="totalCost2" v-model="form.training2AccomendationCostStr" name="training2AccomendationCost" :readonly="readonly"></form-group>
								    <div class="col-md-3">
										<div class="form-group">
											<label for="">&nbsp;{{$t("HrTraining.training2TotalCost")}} </label>
											<div class="input-group ">
												<input type="text" class="form-control" placeholder="" id="training2TotalCost" name="training2TotalCost" v-model="form.training2TotalCostStr" readonly="readonly">
												<span class="input-group-btn">
													<button id="popoverbutton2" class="btn btn-primary btn-flat popoverbutton" type="button" data-container="body" data-toggle="popover" data-placement="bottom"
														title="Note" data-content="=Training Cost + Travel Cost + Accommodation Cost" ><i class="fa fa-fw fa-bars"></i></button>
												</span>
											</div>

										</div>
									</div>
								</div>
							</section>
						</div>
					</form>
				</div>
				<div class="box box-primary"  v-if="((!readonly)||(readonly&&form.introdution3Attachments)||(readonly&&form.document3Attachments))&&form.trainingType=='3'" >
					<div class="box-header with-border">
						<h3 class="box-title pull-left">
							Upload Attachment 上传附件
						</h3>
					</div>
					<div class="box-body">
						<div class="row" >
							<div class="col-md-6 form-group">
								<label for=""><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;Upload Training Introduction 上传培训介绍</label>
								<br><span  style="font-size: 12px;font-weight:bold" class="text-muted">The attachment support all format files except exe file. The limitation of attachment size is 15MB.</span>
								<upload2 :readonly="readonly" name="upload3" v-model="form.training3Introduction" buttonText="Upload 上传" :attachments="form.introdution3Attachments" multi="true" :required="attachmentRequired" fileSizeLimit="15MB" key="upload3Int"></upload2>
							</div>
						</div>
						<div class="row" >
							<div class="col-md-6 form-group">
								<label for="">&nbsp;Upload Other Document 上传其他文档</label>
								<br><span  style="font-size: 12px;font-weight:bold" class="text-muted">The attachment supports all format files except exe file. The limitation of attachment size is 15MB.</span>
								<upload2 :readonly="readonly"   name="upload4" v-model="form.training3Document" buttonText="Upload 上传" :attachments="form.document3Attachments" multi="true" required="false" fileSizeLimit="15MB" key="upload3Doc"></upload2>
							</div>
						</div>
					</div>
				</div>
				<div class="box box-primary" v-if="agreementAttaShow"><!--  -->
					<div class="box-header with-border">
						<div class="row">
							<div class="col-md-12">
								<h3 class="box-title pull-left"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;Upload Training and Development Agreement 上传培训协议</h3>
								<!--
								<div class="checkbox pull-left text-muted" style="margin: 0; margin-left: 20px;" title="Please download the agreement, sign it and submit it to HR for signing and sealing, then fill in the effective date. 请下载Agreement，签名并提交至HR，HR签字盖章完成后请填写生效日期。">
									<a target='_blank' :href="GL.getURL('/HrTraining/getAgreementPdf?id='+form.id+'&token=' + token)"><i class="fa fa-fw fa-info-circle"></i>Download Training and Development Agreement</a>
								</div>
								-->
							</div>
						</div><!--
						<div class="row">
							<div class="col-md-12">
								<div class="checkbox pull-left text-muted">Please download ‘Training and Development Agreement’ and upload it to attachment with your signature, then, send original file with signature to training officer </div>
							</div>
						</div>-->
					</div>
					<div class="box-body">

						<div class="row">
							<div class="col-md-12 form-group">
								<span v-if="!agreementAttaReadonly" style="font-size: 12px;font-weight:;" class="text-muted">Step 1: Please download the Qualification & Development Agreement, print out 2 copies, sign the agreements and deliver the original agreements to CHE Training Officer. </span>
								<br v-if="!agreementAttaReadonly">
								<span v-if="!agreementAttaReadonly" style="font-size: 12px;font-weight:;" class="text-muted">步骤一：请下载资质认证与人员发展协议、打印两份、本人签字并提交该签字原件至HR零部件教育学院培训专员。</span>
								<br v-if="!agreementAttaReadonly">
								<div class="uploadifive-button btn btn-default" style="position: relative;" v-if="agreementAttaReadonly">
									Download 下载
									<input type="text" style="font-size: 30px; opacity: 0; position: absolute; right: -3px; top: -3px;">
								</div>
								<a  v-else class="uploadifive-button btn btn-default" style="position: relative;" target='_blank' :href="GL.getURL('/HrTraining/getAgreementPdf?id='+form.id+'&token=' + token)" >
									Download 下载</a>
								<br>
								<br>
								<span v-if="!agreementAttaReadonly" style="font-size:12px;font-weight:;" class="text-muted">Step 2: Please upload the signed and stamped Qualification & Development Agreement. </span>
								<br v-if="!agreementAttaReadonly">
								<span v-if="!agreementAttaReadonly" style="font-size:12px;font-weight:;" class="text-muted">步骤二：请上传本人签字并加盖公章的资质认证与人员发展协议。</span>
								<upload2 :readonly="agreementAttaReadonly" v-model="form.agreeAttachmentIds" buttonText="Upload 上传" :attachments="form.agreeAttachments" multi="true" required="true" fileSizeLimit="15MB"></upload2>
							</div>
						</div>
					</div>
				</div>
				
				<div class="checkbox mar-bot-20" v-if="!readonly&&(!processTaskKey||processTaskKey=='editForm')">
					<div v-if="!readonly&&(!processTaskKey||processTaskKey=='editForm')&&(form.training3TotalCost>=15000||(form.trainingType=='4' && needBond)||form.training2TotalCost>=15000)">
						<label>
							<span class="help is-danger" v-show="errors.has('vwatjNotice')">
								Please read and agree "I acknowledge that this training application is claimed with a bonding period based on VWATJ Training Policy." 请确认并勾选“我了解并确认此培训申请会根据VWATJ培训政策约定服务期限。”
							</span>
							<input  name="vwatjNotice" type="checkbox" v-validate="'required'" >
							I acknowledge that this training application is claimed with a bonding period based on VWATJ Training Policy.
							<br>
							我了解并确认此培训申请会根据VWATJ培训政策约定服务期限。
						</label>
					</div>
					<label style="margin-top: 10px;">
						<span class="help is-danger" v-show="errors.has('terms')">
							{{$t("checkPolicyNotice")}}
						</span>
						<input  name="terms" type="checkbox" v-validate="'required'" >
						I hereby confirm that: <br>
						a. The information given above is complete and true. I will undertake the responsibility for any consequences deriving from the false information.<br>
						b. Completely agree and accept the regulations stipulated in the Training & Personnel Development Policy.<br>
						本人确认：<br>
						a. 以上信息完整并属实。如有虚假，本人承担全部责任。<br>
						b. 完全同意并接受《培训及人员发展政策》中的规定。<br>
						<br>
						When submitting the application, I have read and agreed to
						<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2016051111193145544.18_Information%20Security%20Policy">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
						当提交此申请时，我已经理解并承诺遵守
						<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2016051111193145544.18_Information%20Security%20Policy">大众汽车自动变速器（天津）有限公司的相关政策。</a>
					</label>
				</div>
				
				<comment v-if="processTaskId !=null && processTaskKey!='editForm'&&checkInApproveFlow" v-model="form.approval.approvalRemark"></comment>
				<ConfirmWithSaveBySelf v-if="this.$route.query.taskKey=='applicantDownUpLoad'&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" uri="/HrTraining/save" :validator="this.$validator" lableName="Confirm"  ></ConfirmWithSaveBySelf>
				<div v-else>
					<router-view :form="form" entityId="HrTraining" v-if="(processTaskKey=='trainingOfficer'||processTaskKey=='trainingOfficerConfirm')&&checkInApproveFlow" vclass="btn-left" uri="/form/HrTraining/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" approveLabelName="Confirm" rejectLabelname="Decline"></router-view>
					<router-view :form="form" entityId="HrTraining" v-else vclass="btn-left" uri="/form/HrTraining/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
				</div>
				<comment-list v-if="form.processInstanceId !=null"></comment-list>

			</section>
			<!-- /.content -->

			<!-- /.content-wrapper -->
		</div>

	</div>

</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'HrTraining',
		methods: {
			checkLegth(field, limitSize, fieldName, fieldNameCn) {
				if(field!="" && field != null ){
					var newvalue = field.replace(/[^\x00-\xff]/g, "**");
					var length = newvalue.length;
					if(length>limitSize){
						$.alertApon(limitSize+" characters max for " + fieldName + ", " +length+" characters have been filled in currently. " +  fieldNameCn + "最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
						this.form.submitstatus=false;
							console.log("====");
							console.log(this.form.submitstatus);
						return false;
					}else{
							console.log("====");
							console.log(this.form.submitstatus);
						return true;
					}
				}
				return true;
			},
			beforesubmit: function() {
				if(this.form.status == null || this.form.status == 2 || this.form.status ==9){
					var result;
					var me = this;
					this.GL.actUtil.query("get","/HrTraining/existNullValue/"+this.form.applicantUserId,"",function(data){
						result = JSON.parse(data).result;
						if(result){
							$.alertApon("Can't find disciplinary supervisor or cost center owner! Please contact the Administrator to mantain the data. 找不到直属上级或成本中心负责人！请联系管理员维护数据。");
							me.form.submitstatus=false;
							return;
						}else{
							me.form.submitstatus=true;
							if(!me.checkLegth(me.form.training3FullName,300,"Training Name","培训名称")){
								return;
							}
							if(!me.checkLegth(me.form.training3Vendor,300,"Training Vendor","培训机构")){
								return;
							}
							if(!me.checkLegth(me.form.training3Site,300,"Training Site","培训地点")){
								return;
							}
							if(!me.checkLegth(me.form.training4Vendor,300,"Training Vendor","培训机构")){
								return;
							}
							if(!me.checkLegth(me.form.training2Vendor,300,"Training Vendor","培训机构")){
								return;
							}
							if(!me.checkLegth(me.form.training2Site,300,"Training Site","培训地点")){
								return;
							}
							if(!me.checkLegth(me.form.training1Exception,300,"Training Expectation","培训期望")){
								return;
							}
						}
					});
				} else {
					var field = this.form.training1Feedback;
					var fieldName = "Feedback about Employees Expectation";
					var fieldNameCn = "员工培训期望反馈";
					//alert("approve");
					if(field!="" && field != null ){
						var newvalue = field.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						if(length>limitSize){
							$.alertApon(limitSize+" characters max for " + fieldName + ", " +length+" characters have been filled in currently. " +  fieldNameCn + "最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
							this.form.approvelstatus=false;
							return false;
						}else{
							return true;
						}
					}
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
					this.form.creatorDirectsupervisor = this.tempcreatorDirectsupervisor;
					this.form.creatorCostcenter = this.tempcreatorCostcenter;

				}
			},
			doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				this.form.applicantUserId = data.id;
				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName = data.printENName;
				this.form.creatorPosition = data.function;
				var tempdep = data.department;
				if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
					tempdep = data.division;
				}
				this.form.creatorDept = tempdep;
                this.form.creatorDirectsupervisor = data.directSupervisor;
				this.form.creatorCostcenter = data.costCenterCode;
			},
			newcomer4: function() {
				this.form.training4Newcomer = this.training4Newcomer[0];
				this.form.training4FullName="";
				this.form.training4FullNameShow=false;
				var _this=this;
				setTimeout(function(){
					_this.form.training4FullNameShow=true;
				},300);
			},
			changeTraining1: function() {
				this.form.training1ChangeTraining = this.training1ChangeTraining[0];	
				this.form.training1Name1="";
				this.form.training1Name2="";
				this.form.training1Name3="";
				this.form.training1Exception="";
				this.form.training1Name1Show=false;
				this.form.training1Name2Show=false;
				this.form.training1Name3Show=false;
				var _this=this;
				_this.form.training1Newcomer=false;
				_this.training1Newcomer=[];
				setTimeout(function(){
					_this.form.training1Name1Show=true;
					_this.form.training1Name2Show=true;
					_this.form.training1Name3Show=true;
				},300);
			},
			newComer1: function() {
				this.form.training1Newcomer = this.training1Newcomer[0];
				this.form.training1Name1="";
				this.form.training1Name2="";
				this.form.training1Name3="";
				this.form.training1Exception="";
				this.form.training1Name1Show=false;
				this.form.training1Name2Show=false;
				this.form.training1Name3Show=false;
				var _this=this;
				_this.form.training1ChangeTraining=false;
				_this.training1ChangeTraining=[];
				setTimeout(function(){
					_this.form.training1Name1Show=true;
					_this.form.training1Name2Show=true;
					_this.form.training1Name3Show=true;
				},300);
			},
			changeTraining2: function() {
				this.form.training2ChangeTraining = this.training2ChangeTraining[0];
				this.form.training2Type="";
				this.form.training2Level="";

				this.form.training2TypeShow=false;
				this.form.training2LevelShow=false;
				var _this=this;
				_this.form.training2Newcomer=false;
				_this.training2Newcomer=[];
				setTimeout(function(){
					_this.form.training2TypeShow=true;
					_this.form.training2LevelShow=true;
				},300);
			},
			newComer2: function() {
				this.form.training2Newcomer = this.training2Newcomer[0];
				this.form.training2Type="";
				this.form.training2Level="";

				this.form.training2TypeShow=false;
				this.form.training2LevelShow=false;
				var _this=this;
				_this.form.training2ChangeTraining=false;
				_this.training2ChangeTraining=[];
				setTimeout(function(){
					_this.form.training2TypeShow=true;
					_this.form.training2LevelShow=true;
				},300);
			},
			inputText: function(entry, readonly,flag) {
				var value = null;
				if(flag == 21) {
					value = this.form.training2Vendor;
				}else if(flag == 22) {
					value = this.form.training2Site;
				}else if(flag == 31) {
					value = this.form.training3FullName;
				}else if(flag == 32) {
					value = this.form.training3Vendor;
				}else if(flag == 33) {
					value = this.form.training3Site;
				}else if(flag == 4) {
					value = this.form.training4Vendor;
				}
				var reg =/^[0-9]*$/;
				if(readonly) {
					//只读不做操作
				} else {
					if(value) {
						var newvalue = value.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						var limitSize = 300;
						//当填写的字节数小于设置的字节数
						if (length * 1 <=limitSize * 1){
							return;
						}
						var limitDate = newvalue.substr(0, limitSize);
						var count = 0;
						var limitvalue = "";
						for (var i = 0; i < limitDate.length; i++) {
							var flat = limitDate.substr(i, 1);
							if (flat == "*") {
								count++;
							}
						}
						var size = 0;
						var istar = newvalue.substr(limitSize * 1 - 1, 1);//校验点是否为“×”

						//if 基点是×; 判断在基点内有×为偶数还是奇数
						if (count % 2 == 0) {
							//当为偶数时
							size = count / 2 + (limitSize * 1 - count);
							limitvalue = value.substr(0, size);
						} else {
							//当为奇数时
							size = (count - 1) / 2 + (limitSize * 1 - count);
							limitvalue = value.substr(0, size);
						}
						if(flag == 21) {
							//this.form.training2Vendor=limitvalue;
							this.training2Vendor=true;
						}else if(flag == 22) {
							this.training2SiteStyle=true;
							//this.form.training2Site=limitvalue;
						}else if(flag == 31) {
							//this.form.training3FullName=limitvalue;
						}else if(flag == 32) {
							//this.form.training3Vendor=limitvalue;
						}else if(flag == 33) {
							//this.form.training3Site=limitvalue;
						}else if(flag == 4) {
							//this.form.training4Vendor=limitvalue;
						}
              			$.alertApon(limitSize+' characters max, '+length+' characters have been filled in currently. 最多只能填写'+limitSize+'个字节，目前已填写'+length+'个字节。');

						//$.alertApon('300 Characters Max. 最多只能填写300个字节。');
						this.training2SiteStyle=false;
						this.training2Vendor=false;
					}
				}
			},
			totalCost2: function(){
				var training2TotalCost=0;
				if(this.form.training2CostStr!= null && this.form.training2CostStr!=""
					&& this.form.training2Cost != null && this.form.training2Cost!=""){
					training2TotalCost=Number(this.form.training2Cost);
				}
				if(this.form.training2TravelCostStr!= null && this.form.training2TravelCostStr!=""
					&& this.form.training2TravelCost != null && this.form.training2TravelCost!=""){
					training2TotalCost+=Number(this.form.training2TravelCost);
				}
				if(this.form.training2AccomendationCostStr!= null && this.form.training2AccomendationCostStr!=""
					&& this.form.training2AccomendationCost != null && this.form.training2AccomendationCost!=""){
					training2TotalCost+=Number(this.form.training2AccomendationCost);
				}
				this.form.training2TotalCost = training2TotalCost;
				//this.form.training3TotalCost=Number(this.form.training3Cost)+Number(this.form.training3TravelCost)+Number(this.form.training3AccomendationCost);
				if(this.form.training2TotalCost) {
		         	this.form.training2TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training2TotalCost));
				} else {
		         	this.form.training2TotalCostStr="";
				}
			},
			totalCost3: function(){
				var training3TotalCost=0;
				if(this.form.training3CostStr!= null && this.form.training3CostStr!=""
					&& this.form.training3Cost != null && this.form.training3Cost!=""){
					training3TotalCost=Number(this.form.training3Cost);
				}
				if(this.form.training3TravelCostStr!= null && this.form.training3TravelCostStr!=""
					&& this.form.training3TravelCost != null && this.form.training3TravelCost!=""){
					training3TotalCost+=Number(this.form.training3TravelCost);
				}
				if(this.form.training3AccomendationCostStr!= null && this.form.training3AccomendationCostStr!=""
					&& this.form.training3AccomendationCost != null && this.form.training3AccomendationCost!=""){
					training3TotalCost+=Number(this.form.training3AccomendationCost);
				}
				this.form.training3TotalCost = training3TotalCost;
				//this.form.training3TotalCost=Number(this.form.training3Cost)+Number(this.form.training3TravelCost)+Number(this.form.training3AccomendationCost);
				if(this.form.training3TotalCost) {
		         	this.form.training3TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training3TotalCost));
				} else {
		         	this.form.training3TotalCostStr="";
				}
			},
			totalCost4: function(){
				var training4TotalCost=0;
				if(this.form.training4CostStr!= null && this.form.training4CostStr!=""
					&& this.form.training4Cost != null && this.form.training4Cost!=""){
					training4TotalCost=Number(this.form.training4Cost);
				}
				if(this.form.training4TravelCostStr!= null && this.form.training4TravelCostStr!=""
					&& this.form.training4TravelCost != null && this.form.training4TravelCost!=""){
					training4TotalCost+=Number(this.form.training4TravelCost);
				}
				if(this.form.training4AccomendationCostStr!= null && this.form.training4AccomendationCostStr!=""
					&& this.form.training4AccomendationCost != null && this.form.training4AccomendationCost!=""){
					training4TotalCost+=Number(this.form.training4AccomendationCost);
				}
				this.form.training4TotalCost = training4TotalCost;
				//this.form.training3TotalCost=Number(this.form.training3Cost)+Number(this.form.training3TravelCost)+Number(this.form.training3AccomendationCost);
				if(this.form.training4TotalCost) {
		         	this.form.training4TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training4TotalCost));
				} else {
		         	this.form.training4TotalCostStr="";
				}
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/HrTraining/get/" + id;
			} else {
				var url = "/form/HrTraining/create/";
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
			dm.changeTip="Please select this section if you apply for a training which is different from your training demand submitted in Employee Dialogue System. 如需选择不同于您在EDS员工绩效对话系统中提交的培训需求，请勾选此项。";
			dm.newComerTip="Please select this section if you haven’t had any training demand in Employee Dialogue System. 如您在EDS员工绩效对话系统中没有任何培训需求，请勾选此项。";
			dm.technicalTip="English input is mandatory. 请用英文填写表单。";
			dm.employeeExceptionTip="Please specify your learning goals and expectations of achievement from the training. 请描述您对于该培训课程的学习目标及预期收获。";
			dm.exceptionTip="Please suggest which area the employee can mainly focus to learn in the training and your expectations of the employee's achievement from the training. 请建议在该课程中申请人需要重点学习的方面以及您对申请人的学习收获期望。";
			
			dm.onbehalf = false;
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempcreatorPosition = dm.form.creatorPosition;
			dm.tempcreatorDept = dm.form.creatorDept;
			dm.tempcreatorDirectsupervisor = dm.form.creatorDirectsupervisor;
			dm.tempcreatorCostcenter = dm.form.creatorCostcenter;

			dm.form.submitstatus = true;
			dm.form.approvelstatus = true;

			dm.form.training1Name1Show=true;
		    dm.form.training1Name2Show=true;
		    dm.form.training1Name3Show=true;

		    dm.form.training2TypeShow=true;
			dm.form.training2LevelShow=true;
			dm.form.training4FullNameShow=true;
			
			if(!dm.form.training1ChangeTraining) {
				dm.training1ChangeTraining = [];
			} else{
				dm.training1ChangeTraining = [dm.form.training1ChangeTraining];
			}
			if(!dm.form.training1Newcomer) {
				dm.training1Newcomer = [];
			} else{
				dm.training1Newcomer = [dm.form.training1Newcomer];
			}
			if(!dm.form.training2ChangeTraining) {
				dm.training2ChangeTraining = [];
			} else{
				dm.training2ChangeTraining = [dm.form.training2ChangeTraining];
			}
			if(!dm.form.training2Newcomer) {
				dm.training2Newcomer = [];
			} else{
				dm.training2Newcomer = [dm.form.training2Newcomer];
			}
			if(!dm.form.training4Newcomer) {
				dm.training4Newcomer = [];
			} else{
				dm.training4Newcomer = [dm.form.training4Newcomer];
			}

			dm.training2SiteStyle=false;
		    dm.training2Vendor=false;
			return dm;
		},
		watch: {
			"form.trainingType":{
		        handler(curVal,oldVal){
		          var _this=this;
		          if(curVal!=oldVal&&curVal=='3'){
		          	    _this.form.training3FullName="";
		          	    _this.form.training3Duration="";
		          	    _this.form.training3DurationUnit="";
		          	    _this.form.training3Site="";
		          	    _this.form.training3Vendor="";
		          	    _this.form.training3Period="";
		          	    _this.form.training3Cost="";
		          	    _this.form.training3TravelCost="";
		          	    _this.form.training3AccomendationCost="";
		          	    _this.form.training3CostStr="";
		          	    _this.form.training3TravelCostStr="";
		          	    _this.form.training3AccomendationCostStr="";
		          	    _this.form.training3TotalCost="";
		          	    _this.form.training3Introduction="";
						_this.form.training3Document="";
		          		setTimeout(function(){
		          			$("#popoverbutton").popover();
		          		},300);
						$("#popoverbutton4").popover('hide');
						$("#popoverbutton2").popover('hide');
		          		
		          }else if(curVal!=oldVal&&curVal=='4'){
						_this.form.training4Newcomer="";
						_this.training4Newcomer=[];
		          	    _this.form.training4FullName="";
		          	    _this.form.training4Duration="";
		          	    _this.form.training4DurationUnit="";
		          	    _this.form.training4Vendor="";
		          	    _this.form.training4Period="";
		          	    _this.form.training4Cost="";
		          	    _this.form.training4TravelCost="";
		          	    _this.form.training4AccomendationCost="";
		          	    _this.form.training4CostStr="";
		          	    _this.form.training4TravelCostStr="";
		          	    _this.form.training4AccomendationCostStr="";
		          	    _this.form.training4TotalCost="";
		          	    _this.form.training4Language="";
		          	    setTimeout(function(){
		          			$("#popoverbutton4").popover();
		          		},300);
						$("#popoverbutton").popover('hide');
						$("#popoverbutton2").popover('hide');
		          	    
		          }else if(curVal!=oldVal&&curVal=='1'){
		          	    _this.form.training1ChangeTraining="";
		          	    _this.form.training1Newcomer="";
		          	    _this.training1ChangeTraining=[];
		          	    _this.training1Newcomer=[];
		          	    _this.form.training1Name1="";
		          	    _this.form.training1Name2="";
		          	    _this.form.training1Name3="";
		          	    _this.form.training1Name3="";
		          	    _this.form.training1Exception="";
		          	    $("#popoverbutton").popover('hide');
						$("#popoverbutton4").popover('hide');
						$("#popoverbutton2").popover('hide');
		             	
		          }else if(curVal!=oldVal&&curVal=='2'){
						_this.form.training2FullName="";
						_this.form.training2Eds=false;
		          	    _this.form.training2ChangeTraining="";
		          	    _this.form.training2Newcomer="";
		          	    _this.training2ChangeTraining=[];
		          	    _this.training2Newcomer=[];
		          	    _this.form.training2Type="";
						_this.form.training2Level="";
					    _this.form.training2Duration="";
		          	    _this.form.training2DurationUnit="";
		          	    _this.form.training2Site="";
		          	    _this.form.training2Vendor="";
		          	    _this.form.training2Period="";
		          	    _this.form.training2Cost="";
		          	    _this.form.training2TravelCost="";
		          	    _this.form.training2AccomendationCost="";
		          	    _this.form.training2CostStr="";
		          	    _this.form.training2TravelCostStr="";
		          	    _this.form.training2AccomendationCostStr="";
						_this.form.training2TotalCost="";
					    _this.form.training2Introduction="";
						_this.form.training2Document="";
		          	    setTimeout(function(){
		          			$("#popoverbutton2").popover();
		          		},300);
						$("#popoverbutton").popover('hide');
						$("#popoverbutton4").popover('hide');
		             	
		          }
				  _this.form.training3TotalCost = "";
				  _this.form.training4TotalCost = "";
				  _this.form.training2TotalCost = "";
		        },
		        deep:false
			 },
			 "form.training2Eds":{
		        handler(curVal,oldVal){
					
		        },
		        deep:false
			 },
		     "form.training3Cost":{
		        handler(curVal,oldVal){
					//console.log("curVal="+curVal+",oldVal="+oldVal);
		        	if(isNaN(curVal)){
		        		this.form.training3Cost=null;
					}
		         	this.form.training3TotalCost=Number(this.form.training3Cost)+Number(this.form.training3TravelCost)+Number(this.form.training3AccomendationCost);
					//console.log("this.form.training3TotalCost="+this.form.training3TotalCost);
					if(this.form.training3TotalCost) {
		         		this.form.training3TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training3TotalCost));
					} else {
		         		this.form.training3TotalCostStr="";
					}
		        },
		        deep:false
			 },
			 "form.training2Cost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training2Cost=null;
					}
					
		         	this.form.training2TotalCost=Number(this.form.training2Cost)+Number(this.form.training2TravelCost)+Number(this.form.training2AccomendationCost);
					
					if(this.form.training2TotalCost) {
		         	this.form.training2TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training2TotalCost));
					} else {
					this.form.training2TotalCostStr="";
					}
		        },
		        deep:false
		     },
		     "form.training4Cost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training4Cost=null;
		        	}
		         	this.form.training4TotalCost=Number(this.form.training4Cost)+Number(this.form.training4TravelCost)+Number(this.form.training4AccomendationCost);
		         	if(this.form.training4TotalCost){
		       		this.form.training4TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training4TotalCost));
					} else {
		       		this.form.training4TotalCostStr="";
					}
		        },
		        deep:false
		     },
		     "form.training4TotalCost":{
		     	 handler(curVal,oldVal){
		        },
		        deep:false
		     },
		     "form.training3TotalCost":{
		     	handler(curVal,oldVal){
		        	
		        },
		        deep:false
			 },
			 "form.training2TotalCost":{
		     	handler(curVal,oldVal){
		        	
		        },
		        deep:false
			 },
			 "form.training2TravelCost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training2TravelCost=null;
		        	}
		         	this.form.training2TotalCost=Number(this.form.training2Cost)+Number(this.form.training2TravelCost)+Number(this.form.training2AccomendationCost);
					if(this.form.training2TotalCost) {
		        	this.form.training2TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training2TotalCost));
					} else {
					this.form.training2TotalCostStr="";
					}
		        },
		        deep:false
		     },
		     "form.training3TravelCost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training3TravelCost=null;
		        	}
		         	this.form.training3TotalCost=Number(this.form.training3Cost)+Number(this.form.training3TravelCost)+Number(this.form.training3AccomendationCost);
		        	if(this.form.training3TotalCost) {
		         	this.form.training3TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training3TotalCost));
					} else {
		         	this.form.training3TotalCostStr="";
					}
		        },
		        deep:false
		     },
		     "form.training4TravelCost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training4TravelCost=null;
		        	}
					this.form.training4TotalCost=Number(this.form.training4Cost)+Number(this.form.training4TravelCost)+Number(this.form.training4AccomendationCost);
		         	if(this.form.training4TotalCost){
		       		this.form.training4TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training4TotalCost));
					} else {
		       		this.form.training4TotalCostStr="";
					}
		        },
		        deep:false
			 },
			  "form.training2AccomendationCost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training2AccomendationCost=null;
		        	}
		         	this.form.training2TotalCost=Number(this.form.training2Cost)+Number(this.form.training2TravelCost)+Number(this.form.training2AccomendationCost);
					if(this.form.training2TotalCost) {
		       		this.form.training2TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training2TotalCost));
					} else {
					this.form.training2TotalCostStr="";
					}
		        },
		        deep:false
		    },
		     "form.training3AccomendationCost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training3AccomendationCost=null;
		        	}
		         	this.form.training3TotalCost=Number(this.form.training3Cost)+Number(this.form.training3TravelCost)+Number(this.form.training3AccomendationCost);
		       		if(this.form.training3TotalCost) {
		         	this.form.training3TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training3TotalCost));
					} else {
		         	this.form.training3TotalCostStr="";
					}
		        },
		        deep:false
		    },
		     "form.training4AccomendationCost":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training4AccomendationCost=null;
		        	}
		         	this.form.training4TotalCost=Number(this.form.training4Cost)+Number(this.form.training4TravelCost)+Number(this.form.training4AccomendationCost);
					if(this.form.training4TotalCost){
		       		this.form.training4TotalCostStr=global_.formatCurrency(global_.toDecimal2(this.form.training4TotalCost));
					} else {
		       		this.form.training4TotalCostStr="";
					}
		        },
		        deep:false
			},
			"form.training2CostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training2Cost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		     },
		    "form.training3CostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training3Cost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		     },
		     "form.training4CostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training4Cost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
			 },
			 "form.training2TravelCostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training2TravelCost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		     },
		     "form.training3TravelCostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training3TravelCost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		     },
		     "form.training4TravelCostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training4TravelCost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
			 },
			 "form.training2AccomendationCostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training2AccomendationCost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		    },
		     "form.training3AccomendationCostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training3AccomendationCost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		    },
		     "form.training4AccomendationCostStr":{
		        handler(curVal,oldVal){
		        	if(curVal)
		        		this.form.training4AccomendationCost=curVal.replace(new RegExp(",","gm"),"");
		        },
		        deep:false
		    },
		    "form.applicantUserId":{
		        handler(curVal,oldVal){
		        	this.form.training1Name1="";
		        	this.form.training1Name2="";
		        	this.form.training1Name3="";
		        	this.form.training1Exception="";

		        	this.form.training2Type="";
		        	this.form.training2Level="";

		        	this.form.training1Name1Show=false;
		        	this.form.training1Name2Show=false;
		        	this.form.training1Name3Show=false;

		        	this.form.training2TypeShow=false;
		        	this.form.training2LevelShow=false;
					this.form.trainingType="";

		        	var _this=this;
		        	setTimeout(function(){
		        		_this.form.training1Name1Show=true;
		        		_this.form.training1Name2Show=true;
		        		_this.form.training1Name3Show=true;

		        		_this.form.training2TypeShow=true;
		        		_this.form.training2LevelShow=true;
		        	},300);

		        },
		        deep:false
		    },
		    "form.training1Name1":{
		        handler(curVal,oldVal){
		        	this.form.training1Name2="";
		        	this.form.training1Name3="";
		        	this.form.training1Exception="";
		        	this.form.training1Name2Show=false;
		        	this.form.training1Name3Show=false;
		        	var _this=this;
		        	setTimeout(function(){
		        		_this.form.training1Name2Show=true;
		        		_this.form.training1Name3Show=true;
		        	},300);

		        },
		        deep:false
		    },
		    "form.training1Name2":{
		        handler(curVal,oldVal){
		        	this.form.training1Name3="";
		        	this.form.training1Exception="";
		        	this.form.training1Name3Show=false;
		        	var _this=this;
		        	setTimeout(function(){
		        		_this.form.training1Name3Show=true;
		        	},300);

		        },
		        deep:false
		    },
		    "form.training2Type":{
		        handler(curVal,oldVal){
		        	this.form.training2Level="";

		        	this.form.training2LevelShow=false;
		        	var _this=this;
		        	setTimeout(function(){
		        		_this.form.training2LevelShow=true;
		        	},300);

		        },
		        deep:false
			},
			"form.training2Duration":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training2Duration=null;
		        	}
		        },
		        deep:false
		     },
		    "form.training3Duration":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training3Duration=null;
		        	}
		        },
		        deep:false
		     },
		    "form.training4Duration":{
		        handler(curVal,oldVal){
		        	if(isNaN(curVal)){
		        		this.form.training4Duration=null;
		        	}
		        },
		        deep:false
		     }
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
			readonlyBySupervisor:{
				get: function() {
					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('directSupervisor') != -1  && this.form.status != 0 &&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
				        return false;
					}else{
						return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
					}
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
			},
			checkInApproveFlow:{
                get: function() {
                     return (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1);
                }
            },
			agreementAttaShow:{
				get:function(){
					return (this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('applicantDownUpLoad') > -1||this.$route.query.taskKey.indexOf('trainingOfficerConfirm') > -1))||
					(this.$route.path.indexOf("detail") > -1&&this.form.agreeAttachmentIds);
				}
			},
			agreementAttaReadonly:{
				get:function(){
					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('applicantDownUpLoad') > -1) {
						return this.form.agreementCompleted=='Y';
					} else {
						return true;
					}
				}
			},
			token:{
				get: function(){
					return Config.getToken();
				}
			},
			needBond:{
				get: function(){
					return this.form.training4FullName=='Basic Leadership Qualification (BLQ)'||this.form.training4FullName=='International Leadership Program (iLead)'||
					this.form.training4FullName=='Development Program towards Management_Training for Development Phase'||
					this.form.training4FullName=='Development Program towards Management_Training for Screening Phase'||
					this.form.training4FullName=='Mini MBA Program'||this.form.training4FullName=='Meister Basic Qualification (MBQ)'||
					this.form.training4FullName=='Solution Camp Program (SCP)'||this.form.training4FullName=='Assistant Manager Training Program';
				}
			},
      attachmentRequired:{
        get: function(){
            if(this.form.trainingType=='3'||(this.form.trainingType=='2'&&!this.form.training2Eds)){
                return "true";
            }else{
                return "false";
            }
        }
      }
		},
		mounted() {

			//draft和reject的流程，由申请人重新打开申请页面时提示是否存在已经完成的年假结转流程
			if(this.$route.query.taskKey && this.$route.query.taskKey.indexOf('edit') > -1 && (this.form.status == 2 || this.form.status == 9) && this.$route.path && this.$route.path.indexOf("detail") < 0) {
				var uri = "/HrTraining/beforesubmit";
				var _this = this;
				this.GL.actUtil.query("POST", uri, this.form, function(data) {
					var returndata = JSON.parse(data);
					if(returndata && returndata.status.indexOf("success") > -1) {
						if(returndata.msg) {
							$.alertApon(returndata.msg);
						}
					}
				});
			}

			
			//折叠收缩
		 $('body').on('click', '#minusplusbtn', function() {
			if($("#minusplusbtn").hasClass("collapsed")) {
				$("#minusplusi").removeClass("fa-plus");
				$("#minusplusi").addClass("fa-minus");
			} else {
				$("#minusplusi").removeClass("fa-minus");
				$("#minusplusi").addClass("fa-plus");

			};
		});
			

			$("#popoverbutton").popover();
			$("#popoverbutton4").popover();
			$("#popoverbutton2").popover();


			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				/*this.form.training1Name1Show=false;
		        this.form.training1Name2Show=false;
		        this.form.training1Name3Show=false;

		        this.form.training22Name1Show=false;
		        this.form.training22Name2Show=false;
		        var _this = this;
		        setTimeout(function(){
		        	_this.form = form;
		        },300);*/
		       this.form = form;
				_this = this;
			});
		}
	}
</script>

<style>

</style>
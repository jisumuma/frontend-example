<template>
	<div>
		<section class="content-header">
			<h1 style="font-size:22px;">Team Building Application 团队建设申请</h1>

			<ol class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Head of Department</a>
				</li>
				<li>
					<a>3.HRBP</a>
				</li>
				<li>
					<a>4.BU Head</a>
				</li>
				<li>
					<a>5.Head of HRBP</a>
				</li>
				<li>
					<a>6.CFC</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
        <strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
		  </span>
		</section>
		<!-- Main content -->
		<section class="content container-fluid">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Applicant Info.&nbsp;申请人信息</h3>
					<!-- <label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label> -->
					<!-- <button type="button" class="btn btn-primary btn-sm pull-right" data-toggle="collapse" id="baseext-hide-show" href="#collapseZerowp"><i class="fa fa-plus" id="minusplusiwp"></i></button> -->
					<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero">
								<i class="fa fa-plus" id="minusplusi"></i>
							</button>
					</div>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
					<input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
					<div class="box-body">
						<div class="row">
							<!--选中的时候显示-->
							<form-group col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly" label="TeamBuilding.creatorStaffcode"></form-group>
							<form-group col="md-3" type="input" v-model="form.creatorName" name="creatorName" readonly="readonly" label="TeamBuilding.creatorName"></form-group>

							<form-group col="md-3" type="input" v-model="form.creatorPhoneNum" name="creatorPhoneNum" readonly="readonly" label="TeamBuilding.creatorPhoneNum"></form-group>
							<form-group col="md-3" type="input" v-model="form.creatorDept" name="creatorDept" readonly="readonly" label="TeamBuilding.creatorDept"></form-group>
						</div>
						<div class="row panel-collapse collapse " id="collapseZero">
							<form-group col="md-3" type="input" v-model="form.supervisor" name="supervisor" readonly="readonly" label="TeamBuilding.supervisor"></form-group>
							<form-group col="md-3" type="input" v-model="form.buHead" name="buHead" readonly="readonly" label="TeamBuilding.buHead"></form-group>
							<form-group col="md-3" type="input" v-model="form.position" name="position" readonly="readonly" label="TeamBuilding.position"></form-group>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<!-- <i class="fa fa-asterisk text-required-header"></i> -->
					<h3 class="box-title">Team Building Info. 团队建设信息</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<form-group col="md-3" type="select" other-rules="required" :readonly="readonly" v-model="form.type" name="type" label="TeamBuilding.type" uri="/dict/listOrder?groupName=TB_TYPE" tags="false" @change="typeChange"></form-group>
							<form-group col="md-3" type="select2" v-if="form.type =='2'" other-rules="required" :readonly="readonly" v-model="form.partnerDept1" name="partnerDept1" label="TeamBuilding.partnerDept1"
								 :uri="'/teambuilding/listPartnerDept/'+form.shortName+'/'+form.partnerDept2" :key="'partnerDept1'+form.partnerDept2"
								 tags="false" ></form-group><!--@change="partnerDept1Change"-->
							<form-group col="md-3" type="select2" v-if="form.type =='2'&&(form.partnerDept2||partnerDept2Show)" :readonly="readonly" v-model="form.partnerDept2" name="partnerDept2" label="TeamBuilding.partnerDept2" 
								:uri="'/teambuilding/listPartnerDept/'+form.shortName+'/'+form.partnerDept1" :key="'partnerDept2'+form.partnerDept1"
								tags="false" ></form-group><!--@change="partnerDept2Change"-->
							<div class="col-md-3" v-if="form.type =='2'&&(!partnerDept2Show)">
								<div class="form-group">
									<label>&nbsp;</label>
									<div style="padding-top:5px;">
										<a href="javascript:;" v-if="!readonly" @click="partnerDept2Show=true;"><i class="fa fa-plus-circle text-green" style="font-size: 20px"></i></a>
									</div>

								</div>
							</div>
						</div>
						<div class="row">
							<form-group col="md-3" type="singledaterangepicker2" v-on:afterapply="afterStartTimeApply" :startDate="minStartTime"  other-rules="required" :readonly="readonly||!form.type||form.type==''" v-model="form.startTime" name="startTime" label="TeamBuilding.startTime" :singleDatePicker="true" :init="false"></form-group>

							<form-group col="md-3" type="singledaterangepicker2" v-on:afterapply="afterEndTimeApply" :startDate="minEndTime" :endDate="maxEndTime" other-rules="required" :readonly="!minEndTime||readonly||!form.type||form.type==''||!form.startTime||form.startTime==''" v-model="form.endTime" name="endTime" label="TeamBuilding.endTime" :singleDatePicker="true" :init="false"></form-group>

							<form-group col="md-3" type="input" readonly v-model="form.duration" other-rules="max:300" name="duration" label="TeamBuilding.duration"></form-group>
						</div>
					</div>
				</form>
			</div>
			
			

			<div class="box box-primary">
				<div class="box-header with-border" >
					<h3 class="box-title">Participants List&nbsp;参与人列表</h3>
					<!-- <label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label> -->
					<!-- <button type="button" class="btn btn-primary btn-sm pull-right" data-toggle="collapse" id="baseext-hide-show" href="#collapseZerowp"><i class="fa fa-plus" id="minusplusiwp"></i></button> -->
					<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn1" href="#collapseOne">
														<i class="fa fa-plus" id="minusplusi1"></i>
													</button>
					</div>
				</div>

				<div class=" " >
					<form role="form">
						<div class="box-body panel-collapse collapse " id="collapseOne">
							<div class="row">
								<div class="col-md-12">
									<div v-if="!readonly" style="height:30px;line-height:30px;">
										<!--<span class="editor_create" style='display: inline-block; margin-left: 0px;float: left;' href="javascript:;">Upload Participants List 上传参与人员列表</span>-->
										<uploadAjax style='display: inline-block; margin-left: 15px;float: right;overflow:hidden;' buttonText="Upload" buttonClass="btn btn-primary btn-xs" multi="false" fileSizeLimit="20MB" :uri="GL.getURL('/teambuilding/uploadexcel?applicantUserId='+form.applicantUserId+'&stime=' + Date.parse(new Date()))" v-on:afterupload="afterupload"></uploadAjax>

										<a style='display: inline-block; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/teambuilding/getTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Download Template 下载模板</a>

									</div>
									<table class="table table-bordered">
										<tbody>
											<tr>
												<th style="text-align: center;vertical-align: middle;width: 3%;">No.</th>
												<th style="text-align: center;vertical-align: middle;width: 8%;">Staff Code<br>员工号</th>
												<th style="text-align: center;vertical-align: middle;width: 14%;">
													<i class="fa fa-asterisk text-required-header"></i> Name
													<br>姓名
												</th>
												<th style="text-align: center;vertical-align: middle;width: 11%;"><i class="fa fa-asterisk text-required-header"></i> Division / Dept. <br>部门</th>
												<th style="text-align: center;vertical-align: middle;width: 14%;"><i class="fa fa-asterisk text-required-header"></i> Employee Type <br>员工类型 </th>
												<th style="text-align: center;vertical-align: middle;width: 6.25%;"><i class="fa fa-asterisk text-required-header"></i> Current Year Budget <br>当年预算</th>
												<th style="text-align: center;vertical-align: middle;width: 6.25%;"><i class="fa fa-asterisk text-required-header"></i> Current Year Cost <br>当年花费</th>
												<th style="text-align: center;vertical-align: middle;width: 6.25%;"><i class="fa fa-asterisk text-required-header"></i> Current Available Budget <br>当前可用预算</th>
												<th style="text-align: center;vertical-align: middle;width: 6.25%;"><i class="fa fa-asterisk text-required-header"></i> Current Used Times <br>当年已用次数</th>
												<th style="text-align: center;vertical-align: middle;">Comment <br>评论</th>
												<th v-if="!readonly" style="width: 100px;vertical-align: middle;" class="text-center">
													<a href="javascript:;" v-if="!readonly" @click="addItemRows"><i class="fa fa-plus-circle text-green" style="font-size: 20px"></i></a>
												</th>
											</tr>
											<tr v-bind:key="index" v-for="(entry,index) in form.paList" v-if="index>=pageStart&&index<pageEnd">
												<td style="text-align: center;vertical-align: middle;">
													<div class="form-group">
														<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.id">
														<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.tbId"> {{index+1}}
													</div>
												</td>
												<td style="text-align: center;vertical-align: middle;width: 120px;">
													<form-group type="input" other-rules="" haslable="false" :readonly="readonly" v-model="entry.staffCode" :name="'staffcode'+index" @blur="staffcodeBlur(index);"></form-group>
												</td>
												<td style="text-align: center;vertical-align: middle;">

													<form-group type="input" v-if="(entry.staffCode&&entry.staffCode!='')" other-rules="required" haslable="false" readonly="readonly" v-model="entry.name" :name="'name'+index" :key="'name'+index"></form-group>
													<form-group type="input" v-else other-rules="required" haslable="false" :readonly="readonly" v-model="entry.name" :name="'name'+index" :key="'name'+index"></form-group>
												</td>
												<td style="text-align: center;vertical-align: middle;">
													<form-group type="input" v-if="(entry.staffCode&&entry.staffCode!='')" other-rules="required" haslable="false" readonly="readonly" v-model="entry.dept" :name="'dept'+index" :key="'dept'+index"></form-group>
													<form-group type="input" v-else other-rules="required" haslable="false" readonly="readonly" v-model="entry.dept" :name="'dept'+index" :key="'dept'+index"></form-group>
												</td>
												<td style="text-align: center;vertical-align: middle;">
													<form-group v-if="(entry.staffCode&&entry.staffCode!=''&&entry.employeeType)" haslable="false" type="select" other-rules="required" readonly="readonly" v-model="entry.employeeType" :key="'employeeType'+index+entry.employeeType" :name="'employeeType'+index" uri="/dict/listOrder?groupName=TB_Employee_Type" tags="false"></form-group>
													<form-group v-else haslable="false" type="select" other-rules="required" :readonly="readonly" v-model="entry.employeeType" :key="'employeeType'+index" :name="'employeeType'+index" uri="/dict/listOrder?groupName=TB_Employee_Type" tags="false" @change="employeeTypeChange(index);"></form-group>
												</td>
												<td style="text-align: center;vertical-align: middle;width: 100px;">
													<div>
														<div class="form-group">
															<div>
																<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="30" v-model="entry.currentYearBudget"></CurrencyInput>
															</div>
														</div>
													</div>

													<!--<form-group type="input" other-rules="" haslable="false" readonly="readonly" v-model="entry.currentYearBudget" :name="'currentYearBudget'+index"></form-group>-->
												</td>
												<td style="text-align: center;vertical-align: middle;width: 100px;">
													<div>
														<div class="form-group">
															<div>
																<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="30" v-model="entry.currentYearCost"></CurrencyInput>
															</div>
														</div>
													</div>

													<!--<form-group type="input" other-rules="" haslable="false" readonly="readonly" v-model="entry.currentYearCost" :name="'currentYearCost'+index"></form-group>-->
												</td>
												<td style="text-align: center;vertical-align: middle;width: 100px;">
													<div>
														<div class="form-group">
															<div>
																<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="30" v-model="entry.currentAvailableBudget"></CurrencyInput>
															</div>
														</div>
													</div>
													<!--<form-group type="input" other-rules="" haslable="false" readonly="readonly" v-model="entry.currentAvailableBudget" :name="'currentAvailableBudget'+index"></form-group>-->
												</td>
												<td style="text-align: center;vertical-align: middle;width: 100px;">
													<form-group type="input" other-rules="" haslable="false" readonly="readonly" v-model="entry.currentUsedTimes" :name="'currentUsedTimes'+index"></form-group>
												</td>

												<td style="text-align: center;vertical-align: middle;">
													<form-group v-if="entry.staffCode" type="input" other-rules="" haslable="false" readonly="readonly" v-model="entry.remaker" :name="'remaker'+index"></form-group>
													<form-group v-else type="input" other-rules="required" haslable="false" :readonly="readonly" v-model="entry.remaker" :name="'remaker'+index"></form-group>
												</td>

												<td v-if="!readonly" style="width: 100px;text-align: center;vertical-align: middle;" class="text-center">
													<a href="javascript:;" v-if="!readonly" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
													<!--<a href="javascript:;" v-if="!readonly" @click="updateItemRows(index)"><i class="fa fa-arrow-circle-down text-info" style="font-size: 20px;margin-left:10px;"></i></a>-->
												</td>
											</tr>
										</tbody>
										<tfoot>
											<tr>
												<td v-if="!readonly" colspan="11">
													<div class="row">
														<div class="col-sm-5">
															<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.paList.length?form.paList.length:pageEnd}} of {{form.paList.length}} entries</div>
														</div>
														<div class="col-sm-7">
															<div class="dataTables_paginate paging_simple_numbers" >
																<ul class="pagination">
																	<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
																	<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
																	<li class="paginate_button next" v-if="pageEnd<form.paList.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
																</ul>
															</div>
														</div>
													</div>
												</td>
												<td v-if="readonly" colspan="10">
													<div class="row">
														<div class="col-sm-5">
															<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.paList.length?form.paList.length:pageEnd}} of {{form.paList.length}} entries</div>
														</div>
														<div class="col-sm-7">
															<div class="dataTables_paginate paging_simple_numbers" >
																<ul class="pagination">
																	<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
																	<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
																	<li class="paginate_button next" v-if="pageEnd<form.paList.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
																</ul>
															</div>
														</div>
													</div>
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
							<div class="row">
								<form-group col="md-3" type="input" readonly v-model="form.numIntern" other-rules="max:300" name="numIntern" label="TeamBuilding.numIntern"></form-group>
								<form-group col="md-3" type="input" readonly v-model="form.numBc" other-rules="max:300" name="numBc" label="TeamBuilding.numBc"></form-group>
								<form-group col="md-3" type="input" readonly v-model="form.numWc" other-rules="max:300" name="numWc" label="TeamBuilding.numWc"></form-group>
								<form-group col="md-3" type="input" readonly v-model="form.numAll" other-rules="max:300" name="numAll" label="TeamBuilding.numAll"></form-group>
							</div>
							<div class="row">
								<!--<div class="col-md-3">
									<div class="form-group">
										<div>
											<label>{{$t('TeamBuilding.totalBudgetApplied')}}</label>
											<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="300" v-model="form.totalBudgetApplied"></CurrencyInput>
										</div>
									</div>
								</div>-->
								<div class="col-md-6">
									<div class="form-group">
										<div>
											<label>{{$t('TeamBuilding.totalBudgetCurrent')}}</label>
											<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="300" v-model="form.totalBudgetCurrent"></CurrencyInput>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<div>
											<label>{{$t('TeamBuilding.totalCostCurrent')}}</label>
											<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="300" v-model="form.totalCostCurrent"></CurrencyInput>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

			</div>
			
			<div class="box box-primary">
				<div class="box-header with-border">
					<!-- <i class="fa fa-asterisk text-required-header"></i> -->
					<h3 class="box-title">{{$t('TeamBuilding.totalBudgetApplied')}}</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
									<div class="form-group">
										<div>
											<!--<label>{{$t('TeamBuilding.totalBudgetApplied')}}</label>-->
											<CurrencyInput style="width: 100%;text-align:left;" class="form-control" disabled="true" isInt="false" xlength="300" v-model="form.totalBudgetApplied"></CurrencyInput>
										</div>
									</div>
							</div>
								
						</div>
					</div>
				</form>
			</div>
			

			<div class="box box-primary">
				<div class="box-header with-border">
					<!--<i class="fa fa-asterisk text-required-header"></i>-->
					<h3 class="box-title">Workshop Theme / Content / Activities 研讨主题/内容/活动</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<label for=""><i v-if="form.type =='1'"  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;Workshop Theme 研讨主题</label>
									<!--<font style="margin-left:10px;" color="gray">Please fill out by Chinese&amp;English or Chinese&amp;Germany 请用中英或中德填写</font>-->
									<textarea-my v-if="form.type =='1'" :key="form.type" other-rules="required" rows="2" placeholder="Workshop Theme 研讨主题" :readonly="readonly" v-model="form.workshopTheme" name="workshopTheme" id="workshopTheme"></textarea-my>
									<textarea-my v-else :key="form.type" other-rules="" rows="2" placeholder="Workshop Theme 研讨主题" :readonly="readonly" v-model="form.workshopTheme" name="workshopTheme" id="workshopTheme"></textarea-my>

								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<label for=""><i v-if="form.type =='1'" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;Workshop Content 研讨内容</label>
									<!--<font style="margin-left:10px;" color="gray">Please fill out by Chinese&amp;English or Chinese&amp;Germany 请用中英或中德填写</font>-->
									<textarea-my v-if="form.type =='1'" :key="form.type" other-rules="required" rows="2" placeholder="Workshop Content 研讨内容" :readonly="readonly" v-model="form.workshopContent" name="workshopContent" id="workshopContent"></textarea-my>
									<textarea-my v-else :key="form.type" other-rules="" rows="2" placeholder="Workshop Content 研讨内容" :readonly="readonly" v-model="form.workshopContent" name="workshopContent" id="workshopContent"></textarea-my>

								</div>
							</div>
						</div>
						<div class="row">
							<form-group :key="form.type" v-if="form.numBc>0&&form.type=='1'" col="md-3" type="input" :readonly="readonly" v-model="form.trainerName" other-rules="required|max:75" name="trainerName" label="TeamBuilding.trainerName"></form-group>
							<form-group :key="form.type" v-if="form.numBc>0&&form.type=='2'" col="md-3" type="input" :readonly="readonly" v-model="form.trainerName" other-rules="max:75" name="trainerName" label="TeamBuilding.trainerName"></form-group>
							
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="">
									<label>
           		<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Activities 活动 
         </label>
									<div :class="{'is-danger': errors.has('activitiesArray') }">
										<input style="margin-left:0px;margin-right:5px;" :disabled="readonly" name="activitiesArray" type="checkbox" v-validate="'required'" v-model="form.activitiesArray" value="Dinner / Lunch 晚餐/午餐">Dinner / Lunch 晚餐/午餐
										<input style="margin-left:10px;margin-right:5px;" :disabled="readonly" name="activitiesArray" type="checkbox" v-validate="'required'" v-model="form.activitiesArray" value="KTV 唱歌">KTV 唱歌
										<input style="margin-left:10px;margin-right:5px;" :disabled="readonly" name="activitiesArray" type="checkbox" v-validate="'required'" v-model="form.activitiesArray" value="Sport 运动">Sport 运动
										<input style="margin-left:10px;margin-right:5px;" :disabled="readonly" name="activitiesArray" type="checkbox" v-validate="'required'" v-model="form.activitiesArray" value="Outdoor 户外">Outdoor 户外
										<input style="margin-left:10px;margin-right:5px;" :disabled="readonly" name="activitiesArray" type="checkbox" v-validate="'required'" v-model="form.activitiesArray" value="Others 其它">Others 其它
										<input v-if="activityOtherShow" type="input" style="width:25%;display:inline-block;margin-left:10px;margin-top:5px;" placeholder="Comment for Others" v-model="form.activityOther" name="activityOther" :readonly="readonly" v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('activityOther') }" />
									</div>

									<!--	<span class="help is-danger" v-show="errors.has('activitiesArray')">
                  	At least one of items should be chosen for Activities. 至少选择一项活动。
              		</span>-->
								</div>
							</div>
							<!--<div class="col-md-3">
								<div class="form-group">
									<input v-if="activityOtherShow" type="input" style="width:100%;display:inline-block;margin-left:0px;margin-top:5px;" placeholder="Comment for Others" v-model="form.activityOther" name="activityOther" :readonly="readonly" v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('activityOther') }" />
								</div>
							</div>-->
						</div>

						<div class="row" v-if="showExceedBudget">
							<div class="col-md-12">
								<div class="form-group">
									<label>
           		<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Exceed Budget 是否超出预算
           	</label>
									<div :class="{'is-danger': errors.has('exceedBudget') }">
										<input style="margin-left:0px;margin-right:5px;" name="exceedBudget" :disabled="exceedBudgetReadonly" type="radio" v-validate="'required'" v-model="form.exceedBudget" value="Yes">Yes
										<input style="margin-left:10px;margin-right:5px;" name="exceedBudget" :disabled="exceedBudgetReadonly" type="radio" v-validate="'required'" v-model="form.exceedBudget" value="No">No
										<!--<span class="help is-danger" v-show="errors.has('exceedBudget')">
                  	Exceed Budget is Mandatory.
              		</span>-->
									</div>
								</div>
							</div>
						</div>

					</div>
				</form>
			</div>
			
			<div class="box box-primary" v-if="(!readonly)||(readonly&&form.attachmentIds)">
					<div class="box-header with-border">
						<h3 class="box-title"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Upload Attachment 上传附件 
							
						</h3>
						<a v-if="!readonly" style='display: inline-block; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/teambuilding/getAttachTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Download Template 下载模板</a>
					</div>
					<div class="box-body">

						<div class="row">
							<div class="col-md-12 form-group">
								<upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true" required="true" fileSizeLimit="5MB"></upload2>
							</div>
						</div>
					</div>
			</div>
			
			<div class="checkbox mar-bot-20" v-if="(!readonly)&&($route.path.indexOf('create')>-1)">
				<label>
                    <span class="help is-danger" v-show="errors.has('terms')">
                      {{$t("checkPolicyNotice")}}
                    </span>
                    <input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
                    <a target="_blank" href="https://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                    当提交此申请时，我已经理解并承诺遵守
                    <a target="_blank" href="https://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
          </label>
			</div>
			<comment v-if="processTaskId !=null &&form.status != 9 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
			<router-view :form="form" entityId="TeamBuilding" v-if="processTaskKey=='headOfDepartment'||processTaskKey=='hrbp'" approveLabelName="Confirm" rejectLabelname="Decline" vclass="btn-left" uri="/form/TeamBuilding/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" v-on:beforeRealApprovel="beforesubmit"></router-view>
			<router-view :form="form" entityId="TeamBuilding" v-else approveLabelName="Approve" rejectLabelname="Reject" vclass="btn-left" uri="/form/TeamBuilding/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" v-on:beforeRealApprovel="beforesubmit"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>
		</section>
	</div>
</template>

<script>
	import adminlte from "adminlte"
	import locale from "locale"
	import moment from "moment"
	import global_ from "./../../../components/Common/Util/Global.vue";
	import daterangepicker from "bootstrap-daterangepicker"

	// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
	export default {
		name: "TeamBuilding",
		methods: {
			afterStartTimeApply: function() {
				this.minEndTime = "";
				this.form.endTime = "";
				this.form.duration = "";
				var duration = new Date(this.form.startTime) - new Date(this.$root.DT.getCurrentDay());
				if(this.form.type == '1' && duration < (1000 * 60 * 60 * 24 * 42)) {
					$.alertApon("Team Building Workshop Application is not 6 weeks in advance, it may be rejected after submitting. 团队建设申请未提前6周申请，提交后可能会被拒绝。");
				} else if(this.form.type == '2' && duration < (1000 * 60 * 60 * 24 * 14)) {
					$.alertApon("Cross-Department Team Building Application is not 2 weeks in advance, it may be rejected after submitting. 跨部门团建申请未提前2周申请，提交后可能会被拒绝。");
				}

				var maxDuration = 0;
				if(this.form.type == '1') {
					maxDuration = 1000 * 60 * 60 * 48;
				} else if(this.form.type == '2') {
					maxDuration = 1000 * 60 * 60 * 12;
				}
				var _this = this;
				
				this.form.endTime = this.$root.DT.formatDate(new Date(new Date(this.form.startTime).getTime() + 1000 * 60 * 60), 'MM/dd/yyyy hh:mm');
				setTimeout(function() {
					_this.minEndTime = _this.form.endTime;
				}, 1000);
				this.maxEndTime = this.$root.DT.formatDate(new Date(new Date(this.form.startTime).getTime() + maxDuration), 'MM/dd/yyyy hh:mm');
				this.afterEndTimeApply();
			},
			afterEndTimeApply: function() {
				var msDuartion = new Date(this.form.endTime) - new Date(this.form.startTime);
				var hDuration = msDuartion / (60 * 60 * 1000);
				var days = parseInt(hDuration / 24);
				var hours = hDuration % 24;
				/*if(hours!=0){
					this.form.duration=days+"d "+hours+"h";
				}else{
					this.form.duration=days+"d";
				}*/
				this.form.duration = days + "d " + hours + "h";
			},
			beforesubmit: function() {
				if(!this.$route.query.taskKey || (this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('edit') > -1
						/*||this.$route.query.taskKey.indexOf('headOfDepartment') > -1*/
					))) {
					if(this.form.paList.length > 0) {
						this.form.submitstatus = true;
						this.form.approvelstatus = true;

						console.log(this.form.ticketNo);
						var uri = "/teambuilding/beforesubmit?staffCode=" + this.form.creatorStaffcode + "&ticketNo=" + this.form.ticketNo+ "&applyType=" + this.form.type;
						var _this = this;
						this.GL.actUtil.query("get", uri, "", function(data) {
							var returndata = JSON.parse(data);
							if(returndata && returndata.status.indexOf("success") > -1) {
								if(returndata.msg) {
									//$.alertApon(returndata.msg);
								}
								//console.log("验证通过！");
								_this.form.submitstatus = true;
								_this.form.approvelstatus = true;
							} else if(returndata && returndata.status.indexOf("fail") > -1) {
								$.alertApon("The Employee can’t apply for new team building due to he/she has unreimbursed team building. 由于员工有未报销的团队建设，无法申请新的团队建设。");
								_this.form.submitstatus = false;
								_this.form.approvelstatus = false;
							}

						});

					} else {
						//$.alertApon(" Please select or upload at least one person.请至少选择或者上传一位申请人。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
					}

				};
				if(this.form.submitstatus && this.form.approvelstatus) {
					if(!this.form.appUser.hrbp) { //判断hrbp是否有值
						$.alert("The HRBP value of this employee is empty. Please maintain the data before submitting it. 此员工的HRBP值为空，请维护数据后再提交。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
						return;
					}
					if(!this.form.appUser.departmentOwner) { //判断departmentOwner是否有值
						$.alert("The Head of Department value of this employee is empty. Please maintain the data before submitting it. 此员工的Head of Department值为空，请维护数据后再提交。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
						return;
					}

					if(!this.form.appUser.buHead) { //判断buHead是否有值
						$.alert("The BU Head value of this employee is empty. Please maintain the data before submitting it. 此员工的BU Head值为空，请维护数据后再提交。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
						return;
					}

					if(this.form.isQuit == 'Yes') { //判断申请人是否离职
						$.alert("You've quit your job. 你已经离职。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
						return;
					}
					
					var ids1="";
					var ids2="";
					var ids3="";
					var msg="";
					for(var i = 0; i < this.form.paList.length; i++) {
						var pa = this.form.paList[i];
						if(Number(pa.currentUsedTimes) >= Number('2')) {
							//$.alertApon("Records "+(i+1)+". "+"第"+(i+1)+"条记录。</br>"+"Current used times is 2 times, it cannot be submitted. 当年已用次数达到了2次，无法提交。");
							 
							this.form.submitstatus = false;
							this.form.approvelstatus = false;
							//break;
							if(ids1){
								ids1=ids1+","+(i+1);
							}else{
								ids1=ids1+(i+1);
							}
						}

						if(Number(pa.currentYearBudget) == Number('0')) {
							//$.alertApon("Records "+(i+1)+". "+"第"+(i+1)+"条记录。</br>"+"Current Year Budget is 0.00 RMB, it cannot be submitted. 当年预算为0.00RMB，无法提交 。");
							this.form.submitstatus = false;
							this.form.approvelstatus = false;
							//break;
							if(ids2){
								ids2=ids2+","+(i+1);
							}else{
								ids2=ids2+(i+1);
							}
						}

						if(pa.inDBTable == 0 && pa.staffCode) {
							//$.alertApon("Records "+(i+1)+". "+"第"+(i+1)+"条记录。</br>"+"Please revise your participant list. 请修改您的参与者名单。");
							this.form.submitstatus = false;
							this.form.approvelstatus = false;
							//break;
							if(ids3){
								ids3=ids3+","+(i+1);
							}else{
								ids3=ids3+(i+1);
							}
						}
					}
					
					if(!this.form.submitstatus){
						if(ids1){
							msg=msg+"Current used times is 2 times, it cannot be submitted. 当年已用次数达到了2次，无法提交。</br> Records "+ids1+". "+"第"+ids1+"条记录。</br></br>"
						}
						if(ids2){
							msg=msg+"Current Year Budget is 0.00 RMB, it cannot be submitted. 当年预算为0.00RMB，无法提交 。</br> Records "+ids2+". "+"第"+ids2+"条记录。</br></br>"
						}
						if(ids3){
							msg=msg+"Please revise your participant list. 请修改您的参与者名单。</br> Records "+ids3+". "+"第"+ids3+"条记录。</br></br>"
						}
						if(msg){
							$.alertApon(msg);
							return;
						}
						
					}
				}
			},
			typeChange: function() {

				this.form.startTime = "";
				this.form.endTime = "";
				this.form.partnerDept1 = "";
				this.form.partnerDept2 = "";
				this.partnerDept2Show = false;
				this.minEndTime = "";
				this.maxEndTime = "";

				this.initTotal();
			},
			partnerDept1Change: function() {
				var _this = this;
				if(this.form.partnerDept1 == this.form.creatorDept || this.form.partnerDept1 == this.form.creatorDivision) {
					setTimeout(function() {
						_this.form.partnerDept1 = "";
					}, 300);
				}
				if(this.form.partnerDept1 && this.form.partnerDept2 && this.form.partnerDept1 == this.form.partnerDept2) {
					this.form.partnerDept2 = "";
				}
			},
			partnerDept2Change: function() {
				var _this = this;
				if(this.form.partnerDept2 == this.form.creatorDept || this.form.partnerDept2 == this.form.creatorDivision) {
					setTimeout(function() {
						_this.form.partnerDept2 = "";
					}, 300);
				}
				if(this.form.partnerDept1 && this.form.partnerDept2 && this.form.partnerDept1 == this.form.partnerDept2) {
					this.form.partnerDept1 = "";
				}
			},
			deleteItemRows: function(rowId) {
				//
				if(this.form.paList.length > 1 && this.form.paList[rowId].staffCode != this.form.creatorStaffcode) {
					this.form.paList.splice(rowId, 1);
					this.initTotal();
					this.firstPage();
				} else {
					$.alertApon("Applicant should be in the participants list. 申请人必须在参与人员列表里。");
					//$.alertApon("At least one complete record in “Participant List is needed. 至少需要填写一条完整的参与人记录。");
				}
			},
			staffcodeBlur: function(rowId) {
				if(!this.readonly) {
					if(this.form.paList[rowId].staffCode && (this.form.paList[rowId].staffCode.length == 6 || this.form.paList[rowId].staffCode.length == 8)) {
						this.updateItemRows(rowId);
					}
				}

			},
			employeeTypeChange: function(rowId) {
				if(!this.readonly) {
					if(this.form.paList[rowId].name && this.form.paList[rowId].employeeType) {
						this.updateItemRows(rowId);
					} else if(this.form.paList[rowId].name) {
						this.form.paList[rowId].currentUsedTimes1 = 0;
						this.form.paList[rowId].currentYearBudget1 = 0;
						this.form.paList[rowId].currentYearCost1 = 0;
						this.form.paList[rowId].currentAvailableBudget1 = 0;
						this.form.paList[rowId].currentUsedTimes2 = 0;
						this.form.paList[rowId].currentYearBudget2 = 0;
						this.form.paList[rowId].currentYearCost2 = 0;
						this.form.paList[rowId].currentAvailableBudget2 = 0;
						this.initTotal();
					} else if(this.form.paList[rowId].employeeType) {
						var _this = this;
						$("input[name='name" + rowId + "']").focus();
						setTimeout(function() {
							$("input[name='name" + rowId + "']").blur();
							_this.form.paList[rowId].employeeType = "";
							$.alertApon('Please fill in name in "Participants List" first. 请优先填写参与者列表中的姓名。');
						}, 500);

					}

				}

			},
			updateItemRows: function(rowId) {
				if(this.form.paList[rowId].staffCode ||
					(this.form.paList[rowId].name && this.form.paList[rowId].employeeType)
				) {
					var uri = "/teambuilding/getPaByStaffCodeAndName?staffCode=" +
						this.form.paList[rowId].staffCode + "&name=" + this.form.paList[rowId].name +
						"&employeeType=" + this.form.paList[rowId].employeeType +
						"&dept=" + this.form.paList[rowId].dept +
						"&remaker=" + this.form.paList[rowId].remaker +
						"&applicantUserId=" + this.form.applicantUserId;
					var _this = this;
					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var returndata = JSON.parse(data);
							if(returndata && returndata.status.indexOf("success") > -1) {
								if(returndata.msg) {
									$.alertApon(returndata.msg);
								}
								_this.form.paList[rowId] = returndata.data[0];
								_this.form.paList = _this.concatAndRemoveRepeat(_this.form.paList, []);
								//_this.form.paList = _this.concatAndRemoveRepeat(_this.form.paList, returndata.data);
								_this.initTotal();

							} else if(returndata && returndata.status.indexOf("fail") > -1) {
								if(returndata.msg) {
									$.alertApon(returndata.msg);
								}
							}

						});
					}
				} else {
					//$.alertApon("Staff Code cannot be empty. Or the Staff Code is empty, the Employee Name or Employee Type has empty value. Staff Code 不能为空。或者staff code为空后 name、employeeType有空值 。");
					$.alertApon('Please fill in mandatory fields in "Participants List".请在参与者列表中填写必填项。');
				}
			},
			addItemRows: function() {
				if(this.form.paList[0].staffCode||this.form.paList[0].name){
					var items = [{
						"id": null,
						"tbId": null,
						"staffCode": "",
						"name": "",
						"dept": this.form.creatorDept,
						"employeeType": "",
						"currentUsedTimes": "0",
						"currentYearBudget": "0",
						"currentYearCost": "0",
						"currentAvailableBudget": "0",
						"remaker": "",
						"createDate": null,
						"employeeTypeName": null,
	
						"currentUsedTimes1": "0",
						"currentYearBudget1": "0",
						"currentYearCost1": "0",
						"currentAvailableBudget1": "0",
						"currentUsedTimes2": "0",
						"currentYearBudget2": "0",
						"currentYearCost2": "0",
						"currentAvailableBudget2": "0",
						"inDBTable": 0
					}];
					this.form.paList = this.concatAndRemoveRepeat(this.form.paList, items);
					this.firstPage();
				}else{
					$.alertApon("Please fill in the blank record before adding another record. 请填写上一条空白记录后，然后再新增记录。");
				}
			},
			afterupload: function(returndata) {
				var _this = this;
				if(returndata && returndata.status.indexOf("success") > -1) {
					if(returndata.msg) {
						$.alertApon(returndata.msg);
					}
					_this.form.paList = _this.concatAndRemoveRepeat(_this.form.paList, returndata.data);
					_this.initTotal();
					this.firstPage();

				} else if(returndata && returndata.status.indexOf("fail") > -1) {
					if(returndata.msg) {
						$.alertApon(returndata.msg);
					}
				}

			},
			concatAndRemoveRepeat: function(arr1, arr2) {
				//合并数组
				var arr = arr2.concat(arr1);
				//数组根据staffcode去重
				var repeatstaffcode = "";
				for(var i = 0, temp = {}, result = []; i < arr.length; i++) {
					var ci = arr[i];
					var staffcode = ci.staffCode;
					var name = ci.name;
					if(staffcode != "") {
						if(temp[staffcode]) {
							if(repeatstaffcode == "") {
								repeatstaffcode += staffcode;
							} else {
								repeatstaffcode += "," + staffcode;
							}
							continue;
						} else {
							temp[staffcode] = true;
							result.push(ci);
						}
					} else {
						if(temp[name]) {
							if(repeatstaffcode == "") {
								repeatstaffcode += name;
							} else {
								repeatstaffcode += "," + name;
							}
							continue;
						} else {
							temp[name] = true;
							result.push(ci);
						}
					}

				}
				if(repeatstaffcode != "") {
					//$.alertApon("Staff Code "+repeatstaffcode+" has been selected! 员工号 "+repeatstaffcode+"已经被选择！");
				}
				return result;
			},
			initTotal: function() {
				$("#loadingMask,#progressBar").show();
				//console.log("初始化汇总数据" + this.form.paList.length);
				var numIntern = 0;
				var numWc = 0;
				var numBc = 0;
				var numAll = this.form.paList.length;
				var totalBudgetApplied = 0.0;
				var totalBudgetCurrent = 0.0;
				var totalCostCurrent = 0.0;
				if(this.form.status != 0) {
					if(this.form.paList.length > 0) {
						for(var i = 0; i < this.form.paList.length; i++) {
							var pa = this.form.paList[i];
							if("1" == this.form.type) {
								pa.currentAvailableBudget = pa.currentAvailableBudget1;
								pa.currentYearBudget = pa.currentYearBudget1;
								pa.currentYearCost = pa.currentYearCost1;
								pa.currentUsedTimes = pa.currentUsedTimes1;
							} else if("2" == this.form.type) {
								pa.currentAvailableBudget = pa.currentAvailableBudget2;
								pa.currentYearBudget = pa.currentYearBudget2;
								pa.currentYearCost = pa.currentYearCost2;
								pa.currentUsedTimes = pa.currentUsedTimes2;
							} else {
								pa.currentAvailableBudget = "0";
								pa.currentYearBudget = "0";
								pa.currentYearCost = "0";
								pa.currentUsedTimes = "0";
							}

							if("1" == pa.employeeType) {
								numIntern = numIntern + 1;
							} else if("2" == pa.employeeType) {
								numWc = numWc + 1;
							} else if("3" == pa.employeeType) {
								numBc = numBc + 1;
							}
							totalBudgetApplied = totalBudgetApplied + Number(pa.currentAvailableBudget);
							totalBudgetCurrent = totalBudgetCurrent + Number(pa.currentYearBudget);
							totalCostCurrent = totalCostCurrent + Number(pa.currentYearCost);
						}

						this.form.numIntern = numIntern.toString();
						this.form.numWc = numWc.toString();
						this.form.numBc = numBc.toString();
						this.form.numAll = numAll.toString();
						this.form.totalBudgetApplied = totalBudgetApplied.toString();
						this.form.totalBudgetCurrent = totalBudgetCurrent.toString();
						this.form.totalCostCurrent = totalCostCurrent.toString();
					}
				}
				$("#loadingMask,#progressBar").hide();
			},
			prePage:function(){
				this.pageStart=this.pageStart-10;
				this.pageEnd=this.pageEnd-10;
				this.currPage=this.currPage-1;
			},
			nextPage:function(){
				this.pageStart=this.pageStart+10;
				this.pageEnd=this.pageEnd+10;
				this.currPage=this.currPage+1;
			},
			firstPage:function(){
				this.pageStart=0;
				this.pageEnd=10;
				this.currPage=1;
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/TeamBuilding/get/" + id;
			} else {
				var url = "/form/TeamBuilding/create/";
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
			//在选染页面之后拿去后台传过来的值做缓存

			dm.form.submitstatus = true;
			dm.form.approvelstatus = true;
			dm.partnerDept2Show = false;
			dm.minStartTime=this.$root.DT.formatDate(new Date(), 'MM/dd/yyyy hh:mm');

			var maxDuration = 0;
			if(dm.form.type == '1') {
				maxDuration = 1000 * 60 * 60 * 48;
			} else if(dm.form.type == '2') {
				maxDuration = 1000 * 60 * 60 * 12;
			}
			if(dm.form.startTime) {
				dm.minEndTime = dm.form.startTime;
				dm.maxEndTime = this.$root.DT.formatDate(new Date(new Date(dm.form.startTime).getTime() + maxDuration), 'MM/dd/yyyy hh:mm');
			} else {
				dm.minEndTime = "";
				dm.maxEndTime = "";
			}
			
			dm.pageStart=0;
			dm.pageEnd=10;
			dm.currPage=1;
			
			return dm;
		},
		watch: {

		},

		//在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
		mounted() {
			this.initTotal();
			var _form = this.form;
			//初始化数字加,展示
			var _this = this;
			//申请人信息显示隐藏
			$('body').on('click', '#minusplusbtn', function() {
				if($("#minusplusbtn").hasClass("collapsed")) {
					$("#minusplusi").removeClass("fa-plus");
					$("#minusplusi").addClass("fa-minus");
				} else {
					$("#minusplusi").removeClass("fa-minus");
					$("#minusplusi").addClass("fa-plus");

				};
			});

			$('body').on('click', '#minusplusbtn1', function() {
				if($("#minusplusbtn1").hasClass("collapsed")) {
					$("#minusplusi1").removeClass("fa-plus");
					$("#minusplusi1").addClass("fa-minus");
				} else {
					$("#minusplusi1").removeClass("fa-minus");
					$("#minusplusi1").addClass("fa-plus");

				};
			});

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				_this.form = form;
				_form = _this.form;
				setTimeout(function() {
					_this.errors.clear();
				}, 500)

			});

		},
		computed: {
			activityOtherShow: {
				get: function() {
					return $.inArray('Others 其它', this.form.activitiesArray) > -1;
				}
			},
			showExceedBudget: {
				get: function() {
					return(this.$route.query.taskKey != null && (
						this.$route.query.taskKey.indexOf('hrbp') > -1 ||
						this.$route.query.taskKey.indexOf('buHead') > -1 ||
						this.$route.query.taskKey.indexOf('headOfHrbp') > -1 ||
						this.$route.query.taskKey.indexOf('cfc') > -1
					)) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 && this.$route.path.indexOf('detail') > -1 && this.form.exceedBudget);
				}
			},
			exceedBudgetReadonly: {
				get: function() {
					return(this.$route.query.taskKey != null && (
							this.$route.query.taskKey.indexOf('hrbp') == -1

						)) || this.$route.path.indexOf('detail') > -1 ||
						(this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 && this.$route.path.indexOf('detail') > -1);
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

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1 && this.$route.query.taskKey.indexOf('headOfDepartment') == -1) || (this.$route.path.indexOf('detail') > -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 && this.$route.path.indexOf('detail') > -1);
				}
			},
			disabled: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1 && this.$route.query.taskKey.indexOf('headOfDepartment') == -1) || (this.$route.path.indexOf('detail') > -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 && this.$route.path.indexOf('detail') > -1);
				}
			},
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			},
			ckeckInApproveFlow: {
				get: function() {
					return(this.$route.path.indexOf('audit') > -1);
				}
			},
		}
	};
</script>

<style scoped>
	div.is-danger {
		border: solid red 1px;
	}
	
	.table-faa>thead>tr>th,
	.table-faa>tbody>tr>th,
	.table-faa>tfoot>tr>th,
	.table-faa>thead>tr>td,
	.table-faa>tbody>tr>td,
	.table-faa>tfoot>tr>td {
		padding: 2px;
	}
	
	.table-bordered {
		border: 1px solid #e4e4e4 !important;
	}
	
	input[type='radio'] {
		top: 2px;
		margin-right: 3px !important;
		position: relative !important;
	}
	
	input[type='checkbox'] {
		top: 2px;
		margin-right: 3px !important;
		position: relative !important;
	}
</style>

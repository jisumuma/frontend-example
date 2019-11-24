<template>
  <div>
    <section class="content-header">
		<h1 style="font-size:22px;">Overtime Plan
		</h1> <!--[rdPeriod={{readonlyPeriod}}][rdPlanned={{readonlyPlanned}}][rdDetailReason={{readonlyDetailReason}}][sApproved={{showApproved}}][sReason={{showReason}}]-->
		<ol v-if="form.approvedOvertimeHours == null  && showEmployee" class="breadcrumb" >
			<li><a>1.Employee</a></li>
		</ol>
		<ol v-else-if="form.approvedOvertimeHours != null && form.approvedOvertimeHours > 20  && showEmployee" class="breadcrumb" >
			<li><a>1.Employee</a></li>
			<li><a>2.Applicant</a></li>
			<li><a>3.Department Head</a></li>
			<li><a>4.Division Head/BU Head</a></li>
			<!--<li><a>5.BoM</a></li>-->
			<li><a>5.Employee</a></li>
		</ol>
		<ol v-else-if="form.approvedOvertimeHours != null && form.approvedOvertimeHours <= 20  && showEmployee" class="breadcrumb">
			<li><a>1.Employee</a></li>
			<li><a>2.Applicant</a></li>
			<li><a>3.Department Head</a></li>
			<li><a>4.Employee</a></li>
		</ol>
		<ol v-else-if="showApplicant && approvedOvertimeHour20" class="breadcrumb" >
			<li><a>1.Applicant</a></li>
			<li><a>2.Department Head</a></li>
			<li><a>3.Division Head/BU Head</a></li>
			<!--<li><a>4.BoM</a></li>-->
			<li><a>4.Employee</a></li>
		</ol>
		<ol v-else-if="showApplicant && !approvedOvertimeHour20" class="breadcrumb">
			<li><a>1.Applicant</a></li>
			<li><a>2.Department Head</a></li>
			<li><a>3.Employee</a></li>
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
				<h3 class="box-title">Employee Info.  <label>员工信息</label></h3>
				<label v-if="!form.appStatus && form.showBehalf" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
				<!-- 
				<label v-if="form.selectEmployee && !form.appStatus" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="selectanemployee" @click="onbehalfclick" > Select an Employee </label>
				<label v-if="form.selectEmployee && !form.appStatus" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="forself" @click="forselfClick" > Self Apply </label>
				-->
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
						<!--onbehalf不选中的时候显示-->
						<form-group v-if="!onbehalf" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="true" label="OverTimeWhite.creatorStaffcode"></form-group>
						<!--选中的时候显示-->
						<div class="col-md-3" v-if="onbehalf">
							<div class="form-group">
							  <label for="">
							   <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
								Staff Code 员工号 </label>
							  <div class="input-group ">
								<input type="text" class="form-control" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="true">
								<span class="input-group-btn" id="selectotherperson">
                          				<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" chooseID="onbehalfperson" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
								</span>
							  </div>
							</div>
						</div>
						<form-group col="md-3" type="input" v-model="form.creatorName" name="creatorName" readonly="true" label="OverTimeWhite.creatorName"></form-group>
						<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" :readonly="readonlyPeriod" label="OverTimeWhite.telephone"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorDept" name="creatorDept" readonly="true" label="OverTimeWhite.creatorDept"></form-group>
					</div>
					<div class="row panel-collapse collapse " id="collapseZero">
						<form-group col="md-3" type="input" v-model="form.creatorFunction" name="creatorFunction" readonly="true" label="OverTimeWhite.creatorFunction"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorEmail" name="creatorEmail" readonly="true" label="OverTimeWhite.creatorEmail"></form-group>
						<form-group col="md-3" type="input" v-model="form.disciplinarySupervisor" name="disciplinarySupervisor" readonly="true" label="OverTimeWhite.disciplinarySupervisor"></form-group>
						<form-group col="md-3" type="input" v-model="form.departmentOwner" name="supervisor" readonly="true" label="OverTimeWhite.supervisor"></form-group>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Overtime Info. <label>加班信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">				
					<div class="row col-md-12 form-group" v-if="form.selectEmployee && !form.appStatus" >
						<div style="overflow: auto;" :class="{'is-danger': errors.has('batchSubmit') }">
							<div class="radio mar-top-0">
								<div class="col-md-3">
									<label class="" style="padding-left:5px;">
									  <input type="radio" name="batchSubmit" :class="{'is-danger': errors.has('batchSubmit') }" v-model="form.batchSubmit" v-validate="'required'" value="false" :disabled="readonly" style="float:left;margin-top: 3px;">
									   Overtime Plan for Myself 个人加班计划
									</label>
								</div>
								<div class="col-md-3">
									<label style="padding-left:12px;">
									  <input type="radio" name="batchSubmit" :class="{'is-danger': errors.has('batchSubmit') }"  v-model="form.batchSubmit" v-validate="'required'" value="true" :disabled="readonly" style="float:left;margin-top: 3px;">
									   Group Overtime 集体加班
									</label>
								</div>
							</div>
						</div>
					</div>				
					<div class="row"><!-- 加班周期-->
						<form-group col="md-3" type="datepicker" :readonly="readonlyPeriod" other-rules="required" v-model="form.overtimePeriod" name="overtimePeriod" label="OverTimeWhite.overtimePeriod" dateformate="yyyy-mm" maxViewMode="months" minViewMode="months" ></form-group>
					</div>
					<label for="" v-if="form.appStatus || (form.batchSubmit!='true' && !form.appStatus)"><i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>&nbsp;
						Overtime Reason 加班原因 </label>
					<div class="row" v-if="form.appStatus || (form.batchSubmit!='true' && !form.appStatus)"> <!-- v-if="showReason"--><!-- 加班原因-->
						<form-group col="md-6" type="textarea2" :readonly="readonlyPeriod ? true : closePlan" other-rules="required|max:300" haslable="false"  v-model="form.overtimeReason" name="overtimeReason" label="OverTimeWhite.overtimeReason" limit="300" rows="5"></form-group>
					</div>	
					<div v-if="(form.appStatus || (form.batchSubmit!='true' && !form.appStatus)) && showInput">
						<div class="row" v-if="(readonlyPlanned ? true : closePlan)">
							<form-group v-if="form.appStatus == 'waiting for employee'" col="md-3" type="inputHorizon" readonly="true" hideRisk="true" v-model="form.plannedOvertimeAllo" name="plannedOvertimeAllo" label="OverTimeWhite.plannedOvertimeHours"></form-group>
							<form-group v-if="form.appStatus == 'waiting for employee'" col="md-3" type="inputHorizon" readonly="true"   v-model="form.plannedHolidayAllo" name="plannedHolidayAllo" label="OverTimeWhite.plannedHolidayHours" ></form-group>
							<form-group v-else col="md-3" type="inputHorizon" readonly="true" hideRisk="true" v-model="form.plannedOvertimeHours" name="plannedOvertimeHours" label="OverTimeWhite.plannedOvertimeHours"></form-group>
							<form-group v-else col="md-3" type="inputHorizon" readonly="true"   v-model="form.plannedHolidayHours" name="plannedHolidayHours" label="OverTimeWhite.plannedHolidayHours" ></form-group>
						</div>	
						<div class="row" v-else>
							<form-group col="md-3" type="inputHorizon" other-rules="required" v-model="form.plannedOvertimeHours" name="plannedOvertimeHours" label="OverTimeWhite.plannedOvertimeHours" v-on:change="inputPlannedOvertimeHours"></form-group>
							<form-group col="md-3" type="inputHorizon" v-model="form.plannedHolidayHours" name="plannedHolidayHours" label="OverTimeWhite.plannedHolidayHours" v-on:change="inputPlannedHolidayHours" ></form-group>
						</div>  
						<br>
						<div class="row">
							<form-group col="md-3" type="inputHorizon" readonly="true"  v-model="form.approvedOvertimeHours" name="approvedOvertimeHours" label="OverTimeWhite.approvedOvertimeHours"></form-group>
							<form-group col="md-3" type="inputHorizon" readonly="true" v-model="form.approvedHolidayHours" name="approvedHolidayHours" label="OverTimeWhite.approvedHolidayHours"></form-group>
						</div>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary" v-if="form.overtimePeriod && form.batchSubmit=='true' && showEmployees">
				<div class="box-body">
					<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
						<tbody>
							<tr class="bg-gray-light">
								<th><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th>Name <br>姓名</th>
								<th>Function Name <br>职务</th>
								<th><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Applied Total Hours <br>申请总加班时数</th>
								<th>Applied Public Holiday Include<br>申请含法定节假日</th>
								<th>Planned Total Hours <br>员工总计划用时</th>
								<th>Planned Public Holiday Include<br>计划含法定节假日</th>
								<th>Applied Total Hours <br> (Previous) <br>上一笔申请总加班时数</th>
								<th>Applied Public Holiday Include (Previous)<br>上一笔含法定节假日</th>
								<th width="16%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Overtime Reason <br>加班原因</th>
								<th width="2%" class="text-center" style="vertical-align: middle;">
									<a href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
								</th>
							</tr>
							<tr v-for="(entry,index) in form.employeeApplications" style="font-size: 10px;">
								<td v-if="entry.addEmployee">
									<div class="input-group " style="width:110%;">
										<input type="text" class="form-control" :id="'creatorStaffcode'+index" :name="'creatorStaffcode'+index" v-model="entry.creatorStaffcode" readonly="true" style="width:68%;">
										<span class="input-group-btn" id="selectotherperson" style="float:left;width:5px;">
											<ChooseWhiteCollar :chooseID="index" :direct="form.creatorEmail" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectEmployee" :detailIndex="index">
												<i class="fa fa-fw fa-search"></i>
											</ChooseWhiteCollar>
										</span>
									</div>
								</td>
								<td v-else>
									<input type="text" class="form-control" :id="'creatorStaffcode'+index" :name="'creatorStaffcode'+index" v-model="entry.creatorStaffcode" readonly="true">
								</td>
								<td><!-- 姓名-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorName" :name="'creatorName'+index"></form-group>
								</td>
								<td><!-- 职务-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorFunction" :name="'creatorFunction'+index"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" other-rules="required" v-model="entry.approvedOvertimeHours" :name="'approvedOvertimeHours'+index" :customStyle="(entry.approvedOvertimeHours > 36) ? 'color : red' : ((entry.approvedOvertimeHours > 20) ? 'color : orange':'')" v-on:change="inputPlanned(entry)" :readonly="entry.danger"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" v-model="entry.approvedHolidayHours" :name="'approvedHolidayHours'+index"  :customStyle="(entry.approvedHolidayHours > 36) ? 'color : red' : ((entry.approvedHolidayHours > 20) ? 'color : orange':'')" v-on:change="inputHoliday(entry)"  :readonly="entry.danger"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.plannedOvertimeHours" :name="'plannedOvertimeHours'+index"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.plannedHolidayHours" :name="'plannedHolidayHours'+index"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.maxOvertime" :name="'maxOvertime'+index"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.maxHoliday" :name="'maxHoliday'+index"></form-group>
								</td>
								<td><!-- Reason-->
									<form-group type="input" haslable="false" isTable="true" other-rules="required" v-model="entry.overtimeReason" :name="'overtimeReason'+index" v-on:change="inputText(entry, readonly)" :readonly="entry.danger"></form-group>
								</td>
								<td class="text-center" style="vertical-align: middle;">
									<a href="javascript:;" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
		</div>
		<div class="box box-primary" v-if="form.appStatus == 'completed' || form.appStatus == 'invalid' || (form.appStatus == 'waiting for employee' && this.showEmployee)">
			<div class="box-header with-border">				
				<h3 class="box-title"><i class="fa fa-asterisk text-red" style="font-size: 10px;float:left;"></i>Overtime Details <label>加班详情</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
						<tbody>
							<tr class="bg-gray-light">
								<th width="8%"> Overtime Date <br>加班日期</th>
								<th width="8%"> Punching Card (h) <br>打卡时数</th>
								<th width="7%"> Overtime (h) <br>加班时数 (必填)</th>
								<th width="28%"> Overtime Reason <br>加班原因</th>
								<th width="8%"> Overtime Date <br>加班日期</th>
								<th width="8%"> Punching Card (h) <br>打卡时数</th>
								<th width="7%"> Overtime (h) <br>加班时数 (必填)</th>
								<th width="29%"> Overtime Reason <br>加班原因</th>
							</tr>
							<tr v-for="(entry,index) in form.overtimeDetails">
								<td>
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.overtimeDate" :name="'overtimeDate'+index"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.punchungCards" :name="'punchungCards'+index"></form-group>
								</td>
								<td>
									<form-group type="input" haslable="false" isTable="true" :readonly="readonlyDetailReason || entry.overtimeDate < form.join" v-model="entry.plannedOverTime" :name="'plannedOverTime'+index" :other-rules="entry.overtimeReason ? 'required|max:30|decimal' : 'max:30|decimal'" v-on:change="inputHours(entry)" ></form-group>
								</td>
								<td>
									<form-group v-on:change="inputText(entry, readonlyDetailReason, 1)" type="input" haslable="false" isTable="true" :readonly="readonlyDetailReason || entry.overtimeDate < form.join" :other-rules="entry.plannedOverTime ? 'required|max:300' : 'max:300'" v-model="entry.overtimeReason" :name="'overtimeReason'+index" placeholder="300 Characters Max. 最多300字节"></form-group>
								</td>
								<td v-if="entry.overtimeDate2" >
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.overtimeDate2" :name="'overtimeDate2'+index"></form-group>
								</td>
								<td v-if="entry.overtimeDate2" >
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.punchungCards2" :name="'punchungCards2'+index"></form-group>
								</td>
								<td v-if="entry.overtimeDate2" >
									<form-group type="input" haslable="false" isTable="true" :readonly="readonlyDetailReason || entry.overtimeDate2 < form.join" v-model="entry.plannedOverTime2" :name="'plannedOverTime2'+index" :other-rules="entry.overtimeReason2 ? 'required|max:30|decimal' : 'max:30|decimal'" v-on:change="inputHours2(entry)" ></form-group>
								</td>
								<td v-if="entry.overtimeDate2" >
									<form-group v-on:change="inputText(entry, readonlyDetailReason, 2)" type="input" haslable="false" isTable="true" :readonly="readonlyDetailReason || entry.overtimeDate2 < form.join" :other-rules="entry.plannedOverTime2 ? 'required|max:300' : 'max:300'" v-model="entry.overtimeReason2" :name="'overtimeReason2'+index" placeholder="300 Characters Max. 最多300字节"></form-group>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>
		</div>
		<div class="checkbox mar-bot-20" v-if="form.appStatus == 'completed' || form.appStatus == 'invalid' || (form.appStatus == 'waiting for employee' && this.showEmployee)">
				<label>
					<p><span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;Please be noted that due to transportation reason, only 0.5 hours before /after shift it not counted as OT hours. 请注意，由于通勤的原因，在班前或班后半小时内的出勤不会被算作加班。</span></p>
				</label>
		</div>
		<div class="checkbox mar-bot-20" v-if="showTerms" ><!-- 申请阶段显示 -->
			<label>
				<input type="checkbox" id="statement" name="terms">
				When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
				当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。
			</label>
		</div>
		<comment v-if="processTaskId != null && form.status != 9 && form.status != 2 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
				
		<Confirmwithsave v-if="this.$route.query.taskKey == 'employee' && ckeckInApproveFlow" :form="form" validon="true" lableName="Confirm" uri="/overTimeWhite/save" v-on:beforeapprovel="beforeapprovel" :validator="this.$validator" ></Confirmwithsave>
		
		<router-view v-else-if="!form.noAuthorized && form.status != 2" :form="form" entityId="OverTimeWhite" vclass="btn-left" :uri="this.form.batchSubmit=='true'?'/overTimeWhite/batchUpdate':'/form/OverTimeWhite/update'" :validator="this.$validator" v-on:beforesave="beforesave" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></router-view>
		
		<back v-else vclass="btn-left"></back>
		
		<comment-list v-if="form.processInstanceId !=null" :previousInstance="form.previousInstance" :skipTask="skipTask"></comment-list>
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
export default {
	name: "OverTimeWhite",
	methods: {
		//forselfClick: function() {
			//this.showEmployees = !$("#forself").is(":checked");
			//this.form.batchSubmit = !$("#forself").is(":checked");
		//},	
		insertItemRows: function() {
			var newItem = {};
			for(var key in this.form.employeeApplications[0]) {
				newItem[key] = "";
			}
			newItem.overtimePeriod = this.form.overtimePeriod;
			newItem.approval = this.form.approval;
			newItem.addEmployee = true;
			newItem.processDefinitionKey = "OverTimeWhite";
			newItem.processInstanceId = null;
			newItem.danger = false;
			newItem.overtimeDetailIds = null;
			newItem.overtimeDetails = null;
			this.form.employeeApplications.push(newItem);
		},
		deleteItemRows: function(rowId) {
			if(this.form.employeeApplications.length > 1) {
				/*var id = this.form.employeeApplications[rowId].id;
				if(id) {
					global_.actUtil.query("post", "/overTimeWhite/deleteOvertime/"+id, "", function(data) {});
				}*/
				this.form.employeeApplications.splice(rowId, 1);
			}else {
				$.alert("At least one employee overtime is needed. 至少需要填写一条员工加班信息");
			}
		},
		doAfterSelectEmployee: function(data) {
			var exist = false;
			var detailIndex = data.detailIndex;
			for(var i=0;i<this.form.employeeApplications.length;i++){
				if(i != detailIndex) {
					var tempRow = this.form.employeeApplications[i];
					if(data.staffCode == tempRow.creatorStaffcode) {
						exist = true;
						break;
					}
				}
			}
			var row = this.form.employeeApplications[detailIndex];
			row.creatorStaffcode = data.staffCode;
			row.creatorName = data.printENName;
			row.creatorFunction = data.function;
			var uid = localStorage.getItem("uid");
			row.createUserId = uid;
			if(exist) {
				$.alertApon(" please be noted that you have already applied overtime for the emoployee, no need to resubmit. 请注意您已为此员工申请加班，无需重复提交");
				row.danger = true;
				row.approvedHolidayHours = null;
				row.approvedOvertimeHours = null;
				row.maxHoliday = null;
				row.maxOvertime = null;
			} else {
				row.applicantUserId = data.directSupervisorUserId;
				row.createId = this.form.createId;
				row.employeeId = data.id;
				row.createName = this.form.createName;
				row.overtimePeriod = this.form.overtimePeriod;
				var url = "/overTimeWhite/checkLastOT?overtimePeriod=" + this.form.overtimePeriod
							+ "&staffCode=" + data.staffCode + "&id=0&forself=true";
				var me = this;
				if(this.GL){
					this.GL.actUtil.query("get",url,"",function(data){
						var jsondata = JSON.parse(data);
						var NoPunching = jsondata.NoPunching;
						var nonfinishedOT = jsondata.nonfinishedOT;
						if(NoPunching) {
							if(jsondata.errMsg) {
								$.alertApon(jsondata.errMsg);
							} else {
								$.alertApon("There is no valid shift record for current overtime period.当前加班周期无有效排班记录。");
							}
							row.danger = true;
							row.approvedHolidayHours = null;
							row.approvedOvertimeHours = null;
							row.maxHoliday = null;
							row.maxOvertime = null;
						}else if(nonfinishedOT) {
							$.alertApon("Employee has an overtime application with open status already, please waiting for pervious un-finished application to finished. 此员工已有未完成的加班申请单，请等待上次未完成的申请单结束。");
							row.danger = true;
							row.approvedHolidayHours = null;
							row.approvedOvertimeHours = null;
							row.maxHoliday = null;
							row.maxOvertime = null;
							//row.creatorStaffcode = null;
							//row.creatorName = null;
							//row.creatorFunction = null;
						} else {
							row.danger = false;
							var approvedOvertimeHours = jsondata.approvedOvertimeHours;
							var approvedHolidayHours = jsondata.approvedHolidayHours;
							if(approvedOvertimeHours) {
								row.maxOvertime = approvedOvertimeHours;
							} else{
								row.maxOvertime = null;
							}
							if(approvedHolidayHours) {
								row.maxHoliday = approvedHolidayHours;
							} else{
								row.maxHoliday = null;
							}
							if(jsondata.existPrevious) {
								$.alertApon("Please be noted that there is already an existing overtime record for this period, further action will replace the pervious application.  加班记录已存在，新的加班申请会覆盖原有记录。");
							}
						}
					});
				}
			}
		},
		//在onbehalf不勾选的时候拿去在data方法缓存的值赋值文本框
		onbehalfclick: function() {
		  var temp = $("#onbehalf").is(":checked");
		  this.showInput = false;
		  this.showPlannedOvertimeHours = false;
		  this.$nextTick(() => {
			this.showInput = true;
			this.showPlannedOvertimeHours = true;
		  });
		  this.onbehalf = temp;
		  if (!temp) {
			this.closePlan = false;
			this.form.employeeId = this.tempEmployeeId;
			this.form.creatorUserId = this.tempcreatorUserId;
			this.form.applicantUserId = this.tempapplicantUserId;
			this.form.creatorStaffcode = this.tempcreatorStaffcode;
			this.form.creatorName = this.tempcreatorName;
			this.form.telephone = this.tempcreatorPhoneNum;
			this.form.creatorDept = this.tempcreatorDept;
			this.form.departmentOwner = this.tempdepartmentOwner;
			this.form.creatorDivision = this.tempcreatorDivision;
			this.form.creatorFunction = this.tempcreatorFunction;
			this.form.creatorEmail = this.tempcreatorEmail;
			this.form.disciplinarySupervisor = this.tempdisciplinarySupervisor;
			this.form.hrbp = this.temphrbp;
			this.form.noAuthorized = this.tempnoAuthorized;
			this.form.applicantStaffcode = this.tempapplicantStaffcode;
			this.form.departmentOwner = this.tempdepartmentOwner;
			this.form.departmentOwnerName = this.tempdepartmentOwnerName;
			this.form.deptHeadId = this.tempdeptHeadId;
			this.form.departmentHead = this.tempdepartmentHead;
			this.form.divisionHead = this.tempdivisionHead;
			this.form.divisionHeadName = this.tempdivisionHeadName;
			this.form.divisionHeadId = this.tempdivisionHeadId;
			this.form.selectEmployee = this.tempselectEmployee;
			this.form.overtimePeriod = null;
			this.form.plannedOvertimeHours = null;
			this.form.plannedHolidayHours = null;
			this.form.approvedOvertimeHours = null;
			this.form.approvedHolidayHours = null;
			if(this.form.selectEmployee) {
				this.form.batchSubmit = 'true';
			} else {
				this.form.batchSubmit = 'false';
			}
		  }
		},
		doAfterSelectOtherPerson: function(data) {
		  this.closePlan = false;
		  this.form.overtimePeriod = null;
		  this.form.plannedOvertimeHours = null;
		  this.form.plannedHolidayHours = null;
		  this.form.approvedOvertimeHours = null;
		  this.form.approvedHolidayHours = null;
		  $("#selectotherperson").attr("class", "input-group-btn");
		  this.form.employeeId = data.id;
		  this.form.applicantUserId = data.directSupervisorUserId;
		  //this.form.createUserId = data.directSupervisorUserId;
		  this.form.creatorUserId = data.id;
		  this.form.creatorStaffcode = data.staffCode;
		  this.form.creatorName = data.printENName;
		  this.form.telephone = data.mobile;
		  var tempdep = data.department;
		  if (
			tempdep == null ||
			tempdep == "" ||
			tempdep == "null" ||
			tempdep == undefined
		  ) {
			tempdep = data.division;
		  }

		  this.form.creatorDept = tempdep;
		  this.form.creatorDivision = data.division;
		  this.form.creatorFunction = data.function;
		  this.form.creatorEmail = data.email;
		  this.form.disciplinarySupervisor = data.directSupervisor;
		  this.form.onBehalf = true;
			var me = this;
			global_.actUtil.query("get","/overTimeWhite/doAfterSelect/"+data.id,"",function(data){
				var result = JSON.parse(data);
				me.form.noAuthorized = result.noAuthorized;
				me.form.applicantStaffcode = result.applicantStaffcode;
				me.form.departmentOwner = result.departmentOwner;
				me.form.departmentOwnerName = result.departmentOwnerName;
				me.form.deptHeadId = result.deptHeadId;
				me.form.divisionHead = result.divisionHead;
				me.form.divisionHeadName = result.divisionHeadName;
				me.form.divisionHeadId = result.divisionHeadId;
				me.form.selectEmployee = result.selectEmployee;
				if(result.selectEmployee) {
					me.form.batchSubmit = 'true';
				} else {
					me.form.batchSubmit = 'false';
				}
			});
		},
		canSubmit: function() {
			if(this.cannotsave){
				$.alertApon("Employee has an overtime application with open status already, please waiting for pervious un-finished application to finished. 此员工已有未完成的加班申请单，请等待上次未完成的申请单结束。");
				return false;
			}
			//var uid = localStorage.getItem("uid");
			var submit = this.form.batchSubmit == 'true';//(uid == this.form.applicantUserId);
			if(!submit && this.form.plannedOvertimeHours > 36) {
				$.alertApon("Please be noted the applied overtime hours is more than 36 hours. This request cannot be submitted due to legal limit.请注意您本月申请的加班小时数已超过法定上限36小时，无法提交。");
				return false;
			}
			if(submit && !$('#statement').prop('checked')){
				$.alertApon("Please read 'Employee Statement' and check it. 请阅读员工声明，并勾选。");
				return false;
			}
			if(submit) {
				var temp20 = 0;
				var temp36 = 0;
				for(var i = 0; i < this.form.employeeApplications.length; i++) {
					if(this.form.employeeApplications[i].approvedHolidayHours > 36 || this.form.employeeApplications[i].approvedOvertimeHours > 36) {
						temp36 ++;
					} else if(this.form.employeeApplications[i].approvedHolidayHours > 20 || this.form.employeeApplications[i].approvedOvertimeHours > 20) {
						temp20 ++;
					}
				}
				this.approvedOvertimeHours36Cnt = temp36;
				this.approvedOvertimeHour20Cnt = temp20;
				this.approvedOvertimeHours36 = temp36 > 0;
				this.approvedOvertimeHour20 = temp20 > 0;
				if(temp36 > 0) {
					$.alertApon("Please be noted that " + this.approvedOvertimeHours36Cnt + " employee" + (this.approvedOvertimeHours36Cnt > 1 ? "s" : "") + " applied overtime hours " + (this.approvedOvertimeHours36Cnt > 1 ? "are" : "is") + " more than 36 hours. " + (this.approvedOvertimeHours36Cnt > 1 ? "These requests" : "This request") + " cannot be submitted due to legal limit. 请注意有" + this.approvedOvertimeHours36Cnt + "位员工本月申请的加班小时数已超过法定上限36小时，无法提交。");
					return false;
				}
				this.form.approvedOvertimeHour20 = this.approvedOvertimeHour20;
				if(temp20 > 0) {
					this.form.message = "Please be noted that " + this.approvedOvertimeHour20Cnt + " employee" + (this.approvedOvertimeHour20Cnt > 1 ? "s" : "") + " planned overtime " + (this.approvedOvertimeHour20Cnt > 1 ? "have" : "has") + " exceeded 20 hours, " + (this.approvedOvertimeHour20Cnt > 1 ? "these requests" : "this request") + " will be reviewed by Head of Division. 请注意有" + this.approvedOvertimeHour20Cnt + "位员工的计划加班小时数已超过20小时，这" + this.approvedOvertimeHour20Cnt + "位员工的加班申请将由部门总监审批。";
				}
			}
			return true;
		},
		//提交前校验
		beforesubmit: function() {
			var reuslt = this.canSubmit();
			if(reuslt){
				this.form.submitstatus=true;
			}else{
				this.form.submitstatus=false;
				return;
			}
		},
		beforesave: function() {
			if(this.form.existPrevious) {
				//$.alertApon("Please be noted that there is already an existing overtime record for this period, further action will replace the pervious application.  加班记录已存在，新的加班申请会覆盖原有记录。");
			}
		},
		beforeapprovel: function() {
			if(this.form.status != 1) {
				var reuslt = this.canSubmit();
				if(reuslt){
					this.form.approvelstatus=true;
				}else{
					this.form.approvelstatus=false;
					return;
				}
			} else {
				var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
				var totalHours=Number(0);
				var totalHolidays=Number(0);
				if(this.form.overtimeDetails!=undefined&&this.form.overtimeDetails!=""&&this.form.overtimeDetails.length>0){
					for(var i=0;i<this.form.overtimeDetails.length;i++){
						var plannedOverTime = this.form.overtimeDetails[i].plannedOverTime;
						if(plannedOverTime > 0 && regDetail.test(plannedOverTime)) {
							totalHours += Number(plannedOverTime);
							var otType = this.form.overtimeDetails[i].otType;
							if(otType === "7") {
								totalHolidays += Number(plannedOverTime);
							}
						} else {
							this.form.overtimeDetails[i].plannedOverTime = '';
						}
						
						var plannedOverTime2 = this.form.overtimeDetails[i].plannedOverTime2;
						if(plannedOverTime2 > 0 && regDetail.test(plannedOverTime2)) {
							totalHours += Number(plannedOverTime2);
							var otType2 = this.form.overtimeDetails[i].otType2;
							if(otType2 === "7") {
								totalHolidays += Number(plannedOverTime2);
							}
						} else {
							this.form.overtimeDetails[i].plannedOverTime2 = '';
						}
					}
					
				} 
				if(totalHours == 0) {
					$.alertApon("Please input the overtime Details! 请填写加班详情！");
					this.form.approvelstatus=false;
					return;
				}
				var checkHours = totalHours <= this.form.approvedOvertimeHours;
				var checkHoliday = totalHolidays <= this.form.approvedHolidayHours;
				//校验时数sum == 预加班时数
				if(!checkHours) {
					$.alertApon("Your total allocated overtime hours have exceeded applied overtime hours; please update it. 您分配的加班总时数超过了申请加班时数，请更新加班时数。");
					this.form.approvelstatus=false;
					return;
				} else if(!checkHoliday) {
					$.alertApon("Your allocated overtime hours on public holiday exceed applied overtime hours on public holiday, please update the overtime hours within the applied amount.您分配的节假日加班时数超过了申请节假日加班时数，请在申请加班时数内更新您的加班时数。");
					this.form.approvelstatus=false;
					return;
				} else {
					this.form.approvelstatus=true;
				}
			}
		},
		Upload: function() {
			var url = Config.getBaseURL() + "/overTimeWhite/uploadOverTime/" + this.form.id;
			var me = this;
			$.ajax({
				url: url, //这个就是请求地址对应sAjaxSource
				data: {},
				type: 'get',
				dataType: 'json',
				success: function(data) {
					var ret = JSON.parse(data);
					if(ret && ret.result == 'Success 成功') {
						me.form.sendOvertime == 'N';
					}
				},
				error: function(msg) {
					$.alertApon(msg.responseText);
				}
			});
		},
		inputPlannedOvertimeHours: function(){
			var ctx = this.form.plannedOvertimeHours;
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			ctx = ctx.replace(/[^\d.]/g,"");
			this.form.plannedOvertimeHours = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					this.form.plannedOvertimeHours = null;
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
					return false;
				} else {
					if(this.form.plannedHolidayHours && this.form.plannedHolidayHours - ctx > 0) {
						this.form.plannedOvertimeHours = null;
						$.alertApon('Please be noted the planned total hours is total hours of months and it is including public holiday hours. 请注意员工总计划用时是一个月总计划时数包含法定节假日时数。');
						return false;
					}
				}
				if(this.form.plannedOvertimeHours > 20) {
					$.alertApon("Please be noted that the planned overtime has exceeded 20 hours, this request will be reviewed by head of division. 请注意该员工的计划加班小时数已超过20小时，此加班申请将由部门总监审批。");
				}
				return true;
			}
			return false;
		},
		inputPlannedHolidayHours: function(){
			var ctx = this.form.plannedHolidayHours;
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			ctx = ctx.replace(/[^\d.]/g,"");
			this.form.plannedHolidayHours = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					this.form.plannedHolidayHours = null;
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
					return false;
				} else {
					if(this.form.plannedOvertimeHours && this.form.plannedOvertimeHours - ctx < 0) {
						this.form.plannedHolidayHours = null;
						$.alertApon('Please be noted the planned total hours is total hours of months and it is including public holiday hours. 请注意员工总计划用时是一个月总计划时数包含法定节假日时数。');
						return false;
					}
				}
				return true;
			}
			return false;
		},
		inputApprovedOvertimeHours: function(){
			var ctx = this.form.approvedOvertimeHours;
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			if(ctx){
				ctx = ctx.replace(/[^\d.]/g,"");
				this.form.approvedOvertimeHours = ctx;
				if(!regDetail.test(ctx)) {
					this.form.approvedOvertimeHours = null;
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
					return false;
				}
				if(this.form.approvedOvertimeHours > 20) {
					$.alertApon("Please be noted that the planned overtime has exceeded 20 hours, this request will be reviewed by head of division. 请注意该员工的计划加班小时数已超过20小时，此加班申请将由部门总监审批。");
				}
				return true;
			}
			return false;
		},
		inputPlanned: function(entry){
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			var ctx = entry.approvedOvertimeHours;
			ctx = ctx.replace(/[^\d.]/g,"");
			entry.approvedOvertimeHours = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					entry.approvedOvertimeHours = null;
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
				} else {
					if(entry.approvedHolidayHours && entry.approvedHolidayHours - ctx > 0) {
						entry.approvedOvertimeHours = null;
						$.alertApon('Please be noted the applied total hours is total hours of months and it is including public holiday hours. 请注意申请总加班时数是一个月总加班时数包含法定节假日时数。');
					}
				}
			}
			var temp20 = 0;
			var temp36 = 0;
			for(var i = 0; i < this.form.employeeApplications.length; i++) {
				if(this.form.employeeApplications[i].approvedHolidayHours > 36 || this.form.employeeApplications[i].approvedOvertimeHours > 36) {
					temp36 ++;
				} else if(this.form.employeeApplications[i].approvedHolidayHours > 20 || this.form.employeeApplications[i].approvedOvertimeHours > 20) {
					temp20 ++;
				}
			}
			this.approvedOvertimeHours36Cnt = temp36;
			this.approvedOvertimeHour20Cnt = temp20;
			this.approvedOvertimeHours36 = temp36 > 0;
			this.approvedOvertimeHour20 = temp20 > 0;
		},
		inputHoliday: function(entry){
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			var ctx = entry.approvedHolidayHours;
			ctx = ctx.replace(/[^\d.]/g,"");
			entry.approvedHolidayHours = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					entry.approvedHolidayHours = null;
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
				} else {
					if(entry.approvedOvertimeHours && entry.approvedOvertimeHours - ctx < 0) {
						entry.approvedHolidayHours = null;
						$.alertApon('Please be noted the applied total hours is total hours of months and it is including public holiday hours. 请注意申请总加班时数是一个月总加班时数包含法定节假日时数。');
					}
				}
			}
			var temp20 = 0;
			var temp36 = 0;
			for(var i = 0; i < this.form.employeeApplications.length; i++) {
				if(this.form.employeeApplications[i].approvedHolidayHours > 36 || this.form.employeeApplications[i].approvedOvertimeHours > 36) {
					temp36 ++;
				} else if(this.form.employeeApplications[i].approvedHolidayHours > 20 || this.form.employeeApplications[i].approvedOvertimeHours > 20) {
					temp20 ++;
				}
			}
			this.approvedOvertimeHours36Cnt = temp36;
			this.approvedOvertimeHour20Cnt = temp20;
			this.approvedOvertimeHours36 = temp36 > 0;
			this.approvedOvertimeHour20 = temp20 > 0;
		},
		inputApprovedHolidayHours: function(){
			var ctx = this.form.approvedHolidayHours;
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			ctx = ctx.replace(/[^\d.]/g,"");
			this.form.approvedHolidayHours = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					this.form.approvedHolidayHours = null;
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
					return false;
				}
				return true;
			}
			return false;
		},
		inputHours: function(entry) {
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			var ctx = entry.plannedOverTime;
			ctx = ctx.replace(/[^\d.]/g,"");
			entry.plannedOverTime = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
				}else if(ctx < 0.5 || ctx > 16) {
					$.alertApon('Overtime hours is longer than the maximum overtime hours or shorter than minimum overtime hours! 加班时数超过最大加班时数或小于最小加班时数！');
					entry.plannedOverTime = "";
				}
			}
			
			var totalHours=Number(0);
			var totalHolidays=Number(0);
			if(this.form.overtimeDetails!=undefined&&this.form.overtimeDetails!=""&&this.form.overtimeDetails.length>0){
				for(var i=0;i<this.form.overtimeDetails.length;i++){
					var plannedOverTime = this.form.overtimeDetails[i].plannedOverTime;
					if(plannedOverTime > 0 && regDetail.test(plannedOverTime)) {
						totalHours += Number(plannedOverTime);
						var otType = this.form.overtimeDetails[i].otType;
						if(otType === "7") {
							totalHolidays += Number(plannedOverTime);
						}
					} else {
						this.form.overtimeDetails[i].plannedOverTime = '';
					}
					
					var plannedOverTime2 = this.form.overtimeDetails[i].plannedOverTime2;
					if(plannedOverTime2 > 0 && regDetail.test(plannedOverTime2)) {
						totalHours += Number(plannedOverTime2);
						var otType2 = this.form.overtimeDetails[i].otType2;
						if(otType2 === "7") {
							totalHolidays += Number(plannedOverTime2);
						}
					} else {
						this.form.overtimeDetails[i].plannedOverTime2 = '';
					}
				}
				//if(!this.form.appStatus) {
					this.form.plannedOvertimeAllo = totalHours;
					this.form.plannedHolidayAllo = totalHolidays;
				//}
			} else {
					this.form.plannedOvertimeAllo = 0.0;
			}
		},
		inputHours2: function(entry) {
			var regDetail = /^\d+(.25|.75|.5|.50|.0|.00)?$/;
			var ctx = entry.plannedOverTime2;
			ctx = ctx.replace(/[^\d.]/g,"");
			entry.plannedOverTime2 = ctx;
			if(ctx){
				if(!regDetail.test(ctx)) {
					$.alertApon('Overtime hours is minimum 0.25. 加班时数最小单位是0.25.');
				}else if(ctx < 0.5 || ctx > 16) {
					$.alertApon('Overtime hours is longer than the maximum overtime hours or shorter than minimum overtime hours! 加班时数超过最大加班时数或小于最小加班时数！');
					entry.plannedOverTime2 = "";
				}
			}
			
			var totalHours=Number(0);
			var totalHolidays=Number(0);
			if(this.form.overtimeDetails!=undefined&&this.form.overtimeDetails!=""&&this.form.overtimeDetails.length>0){
				for(var i=0;i<this.form.overtimeDetails.length;i++){
					var plannedOverTime = this.form.overtimeDetails[i].plannedOverTime;
					if(plannedOverTime > 0 && regDetail.test(plannedOverTime)) {
						totalHours += Number(plannedOverTime);
						var otType = this.form.overtimeDetails[i].otType;
						if(otType === "7") {
							totalHolidays += Number(plannedOverTime);
						}
					} else {
						this.form.overtimeDetails[i].plannedOverTime = '';
					}
					var plannedOverTime2 = this.form.overtimeDetails[i].plannedOverTime2;
					if(plannedOverTime2 > 0 && regDetail.test(plannedOverTime2)) {
						totalHours += Number(plannedOverTime2);
						var otType2 = this.form.overtimeDetails[i].otType2;
						if(otType2 === "7") {
							totalHolidays += Number(plannedOverTime2);
						}
					} else {
						this.form.overtimeDetails[i].plannedOverTime2 = '';
					}
				}
				//if(!this.form.appStatus) {
					this.form.plannedOvertimeAllo = totalHours;
					this.form.plannedHolidayAllo = totalHolidays;
				//}
			} else {
					this.form.plannedOvertimeAllo = 0.0;
			}
		},
		inputText: function(entry, readonly, flag) {
			var value = null;
			if(flag == 1) {
				value = entry.overtimeReason;
			} else {
				value = entry.overtimeReason2;
			}
			
			var reg =/^[0-9]*$/;
			if(readonly) {
				//只读不做操作
			} else {
				if(value) {
					var newvalue = value.replace(/[^\x00-\xff]/g, "**");
					var length = newvalue.length;

					//当填写的字节数小于设置的字节数
					if (length * 1 <=300 * 1){
					  return;
					}
					var limitDate = newvalue.substr(0, 300);
					var count = 0;
					var limitvalue = "";
					for (var i = 0; i < limitDate.length; i++) {
					  var flat = limitDate.substr(i, 1);
					  if (flat == "*") {
						count++;
					  }
					}
					var size = 0;
					var istar = newvalue.substr(300 * 1 - 1, 1);//校验点是否为“×”

					//if 基点是×; 判断在基点内有×为偶数还是奇数
					if (count % 2 == 0) {
										//当为偶数时
									size = count / 2 + (300 * 1 - count);
									limitvalue = value.substr(0, size);
					} else {
									//当为奇数时
									size = (count - 1) / 2 + (300 * 1 - count);
									limitvalue = value.substr(0, size);
					}
					if(flag == 1) {
						entry.overtimeReason=limitvalue;
					} else {
						entry.overtimeReason2=limitvalue;
					}
					$.alertApon('300 Characters Max. 最多只能填写300个字节。');
				}
			}
		},
		getRules:function(){
			var rules="required";
			return rules;
		}
	},
	data() {
		//返回的数据对象
		var dm = {};
		//判断是创建还是获取
		var id = this.$route.params.id || this.$route.query.id;
		if (id) {
		  var url = "/form/OverTimeWhite/get/" + id;
		} else {
		  var url = "/form/OverTimeWhite/create/";
		}
		if(this.GL){
			this.GL.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}else{
			global_.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}
		//在选染页面之后拿去后台传过来的值做缓存
		dm.showPlannedOvertimeHours = true;
		dm.showInput = true;
		dm.onbehalf = false;
		if (dm.form.selectEmployee && dm.form.appStatus != 'waiting for employee') {		//AM默认Wie集体加班
			dm.form.batchSubmit = 'true';
		} else {
			dm.form.batchSubmit = 'false';
		}
		
		dm.approvedOvertimeHours36 = false;
		dm.approvedOvertimeHour20 = false;
		dm.approvedOvertimeHours36Cnt=0;
		dm.approvedOvertimeHour20Cnt=0;
		dm.showEmployees = false;
		dm.tempEmployeeId = dm.form.employeeId;
		dm.tempcreatorUserId = dm.form.creatorUserId;
		dm.tempapplicantUserId = dm.form.applicantUserId;
		dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
		dm.tempcreatorName = dm.form.creatorName;
		dm.tempcreatorPhoneNum = dm.form.telephone;
		dm.tempcreatorDept = dm.form.creatorDept;
		dm.tempdepartmentOwner = dm.form.departmentOwner;
		dm.tempcreatorDivision = dm.form.creatorDivision;
		dm.tempcreatorFunction = dm.form.creatorFunction;
		dm.tempcreatorEmail = dm.form.creatorEmail;
		dm.tempdisciplinarySupervisor = dm.form.disciplinarySupervisor;
		dm.temphrbp = dm.form.hrbp;
		dm.tempnoAuthorized = dm.form.noAuthorized;
		dm.tempapplicantStaffcode = dm.form.applicantStaffcode;
		dm.tempdepartmentOwner = dm.form.departmentOwner;
		dm.tempdepartmentOwnerName = dm.form.departmentOwnerName;
		dm.tempdeptHeadId = dm.form.deptHeadId;
		dm.tempdepartmentHead = dm.form.departmentHead;
		dm.tempdivisionHead = dm.form.divisionHead;
		dm.tempdivisionHeadName = dm.form.divisionHeadName;
		dm.tempdivisionHeadId = dm.form.divisionHeadId;
		dm.tempselectEmployee = dm.form.selectEmployee;
		dm.closePlan = false;
		dm.cannotsave = false;
		if(dm.form.nonfinishedOT) {
			dm.cannotsave = true;
		}
		dm.skipTask = "";
		if(dm.form.noAuthorized) {
			$.alertApon("You are not authorized to apply for this application if you department is null. 如果部门为空没有权限申请此单据。");
		}
		if(dm.form.approvedOvertimeHours && dm.form.approvedOvertimeHours <= 20) {
			dm.skipTask = "divisionHead,BOM,";
		}
		return dm;
	},
	watch: {
		"form.overtimePeriod":{
			handler(curVal,oldVal){
				if(curVal!=oldVal && this.form.overtimePeriod && (!this.form.appStatus || this.form.appStatus == 'Initiated')) {
					var url = "/overTimeWhite/checkLastOT?overtimePeriod=" + this.form.overtimePeriod
					+ "&staffCode=" + this.form.creatorStaffcode
					+ "&id=" + this.form.id
					+ "&forself=" + (this.form.batchSubmit!='true');
					var me = this;
					if(this.GL){
						this.GL.actUtil.query("get",url,"",function(data){
							var jsondata = JSON.parse(data);
							var NoPunching = jsondata.NoPunching;
							if(NoPunching) {
								if(jsondata.errMsg) {
									$.alertApon(jsondata.errMsg);
								} else {
									$.alertApon("Please be noted that there are no valid scheduling records for current overtime period. 请注意当前加班周期无有效排班记录。");
								}
							}
							
							if(me.form.batchSubmit=='true') {
								me.showEmployees = !NoPunching;
								me.form.employeeApplications = jsondata.employeeApplications;
								var temp20 = false;
								var temp36 = false;
								for(var i = 0; i < me.form.employeeApplications.length; i++) {
									if(me.form.employeeApplications[i].approvedHolidayHours > 36 || me.form.employeeApplications[i].approvedOvertimeHours > 36) {
										temp36 = true;
									} else if(me.form.employeeApplications[i].approvedHolidayHours > 20 || me.form.employeeApplications[i].approvedOvertimeHours > 20) {
										temp20 = true;
									}
								}
								me.approvedOvertimeHours36 = temp36;
								me.approvedOvertimeHour20 = temp20;
							} else {
								var nonfinishedOT = jsondata.nonfinishedOT;
								var approvedOvertimeHours = jsondata.approvedOvertimeHours;
								var approvedHolidayHours = jsondata.approvedHolidayHours;
								if(NoPunching) {
									
									//me.form.overtimeDetails = null;
									me.form.plannedHolidayHours = null;
									me.form.plannedOvertimeHours = null;
									me.closePlan = true;
									/*if(approvedOvertimeHours) {
										me.form.approvedOvertimeHours = approvedOvertimeHours;
									} else{
										me.form.approvedOvertimeHours = null;
									}
									if(approvedHolidayHours) {
										me.form.approvedHolidayHours = approvedHolidayHours;
									} else{
										me.form.approvedHolidayHours = null;
									}*/
								} else
								if(nonfinishedOT) {
									me.cannotsave = true;
									me.form.plannedHolidayHours = null;
									me.form.plannedOvertimeHours = null;
									me.closePlan = true;
									//me.form.overtimeDetails = null;
									$.alertApon("Please be noted that the former overtime application for the employee is still in open status, please apply again until it is finished. 请注意此员工已有未完成的加班申请单，请等待上次未完成的申请单结束后再重新提交。 ");
								} else {
									if(approvedOvertimeHours) {
										me.form.approvedOvertimeHours = approvedOvertimeHours;
										me.form.maxOvertime = approvedOvertimeHours;
									} else{
										me.form.approvedOvertimeHours = null;
										me.form.maxOvertime = null;
									}
									if(approvedHolidayHours) {
										me.form.approvedHolidayHours = approvedHolidayHours;
										me.form.maxHoliday = approvedHolidayHours;
									} else{
										me.form.approvedHolidayHours = null;
										me.form.maxHoliday = null;
									}
									
									//me.form.overtimeDetails = jsondata.list;
									me.cannotsave = false;
									me.closePlan = false;
									me.form.existPrevious = jsondata.existPrevious;
								}
								me.form.plannedOvertimeHours = null;
								me.form.plannedHolidayHours = null;
							}
						});
					}
				}
			},
			deep:true
		},
		
		"form.batchSubmit":{
			handler(curVal,oldVal){
				if(curVal!=oldVal && this.form.overtimePeriod && (!this.form.appStatus || this.form.appStatus == 'Initiated')) {
					var url = "/overTimeWhite/checkLastOT?overtimePeriod=" + this.form.overtimePeriod
					+ "&staffCode=" + this.form.creatorStaffcode
					+ "&id=" + this.form.id
					+ "&forself=" + (this.form.batchSubmit!='true');
					var me = this;
					if(this.GL){
						this.GL.actUtil.query("get",url,"",function(data){
							var jsondata = JSON.parse(data);
							var NoPunching = jsondata.NoPunching;
							if(NoPunching) {
								if(jsondata.errMsg) {
									$.alertApon(jsondata.errMsg);
								} else {
									$.alertApon("Please be noted that there are no valid scheduling records for current overtime period. 请注意当前加班周期无有效排班记录。");
								}
							}
							
							if(me.form.batchSubmit=='true') {
								me.showEmployees = !NoPunching;
								me.form.employeeApplications = jsondata.employeeApplications;
							} else {
								var nonfinishedOT = jsondata.nonfinishedOT;
								var approvedOvertimeHours = jsondata.approvedOvertimeHours;
								var approvedHolidayHours = jsondata.approvedHolidayHours;
								if(NoPunching) {
									
									//me.form.overtimeDetails = null;
									me.form.plannedHolidayHours = null;
									me.form.plannedOvertimeHours = null;
									me.closePlan = true;
									/*if(approvedOvertimeHours) {
										me.form.approvedOvertimeHours = approvedOvertimeHours;
									} else{
										me.form.approvedOvertimeHours = null;
									}
									if(approvedHolidayHours) {
										me.form.approvedHolidayHours = approvedHolidayHours;
									} else{
										me.form.approvedHolidayHours = null;
									}*/
								} else
								if(nonfinishedOT) {
									me.cannotsave = true;
									me.form.plannedHolidayHours = null;
									me.form.plannedOvertimeHours = null;
									me.closePlan = true;
									//me.form.overtimeDetails = null;
									$.alertApon("Please be noted that the former overtime application for the employee is still in open status, please apply again until it is finished. 请注意此员工已有未完成的加班申请单，请等待上次未完成的申请单结束后再重新提交。 ");
								} else {
									if(approvedOvertimeHours) {
										me.form.approvedOvertimeHours = approvedOvertimeHours;
										me.form.maxOvertime = approvedOvertimeHours;
									} else{
										me.form.approvedOvertimeHours = null;
										me.form.maxOvertime = null;
									}
									if(approvedHolidayHours) {
										me.form.approvedHolidayHours = approvedHolidayHours;
										me.form.maxHoliday = approvedHolidayHours;
									} else{
										me.form.approvedHolidayHours = null;
										me.form.maxHoliday = null;
									}
									
									//me.form.overtimeDetails = jsondata.list;
									me.cannotsave = false;
									me.closePlan = false;
									me.form.existPrevious = jsondata.existPrevious;
								}
								me.form.plannedOvertimeHours = null;
								me.form.plannedHolidayHours = null;
							}
						});
					}
				}
			},
			deep:true
		}
	},
	//在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
	mounted() {
		//draftModal
		/*$('#draftModal').on('shown.bs.modal', function (e) { 
		  $(this).css('display', 'block'); 
		  var modalHeight=$(window).height() / 2 - $('#draftModal .modal-dialog').height() / 2; 
		  $(this).find('.modal-dialog').css({ 
			'margin-top': modalHeight 
		  }); 
		});*/
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
		var router = this.$router;
		this.$root.eventHub.$off('updateFormData');
		this.$root.eventHub.$on('updateFormData', (form)=>{
			if(form.appStatus == "Initiated" && form.toInitial) {
				$('#draftModal').modal('toggle');
				setTimeout(function(){
					var url = Config.getBaseURL() + "/overTimeWhite/initiateMail/" + form.id;
					$.ajax({
						url: url, //这个就是请求地址对应sAjaxSource
						data: {},
						type: 'get',
						dataType: 'json',
						success: function(data) {
						
							if(Config.MODE_TYPE === 'apon') {
							top.location.href = Config.getAPONURL();
							} else {
								router.push({
									path: '/index/application'
								});
							}
						},
						error: function(msg) {
							$.alertApon(msg.responseText);
						}
					});
				},2000);
			} else if(form.appStatus == "waiting for employee"){
				$('#draftModal').modal('toggle');
			} else {
				this.form.employeeApplications = form.employeeApplications;
			}
			this.form.existPrevious = false;
		}); 
  },
  computed: {

    readonly: {
      // 动态计算readonly的值
      get: function() {
        return ( //true ||
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("edit") == -1) ||
          (this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
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
	showTerms: {
		get: function() {
			return (this.form.batchSubmit == 'true');
		}
	},
	//加班周期是否只读
	readonlyPeriod: {
		get: function() {
			if(this.form.noAuthorized) {
				return true;
			}
			if((this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("edit") == -1) ||
          (this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)) {
				return true;
			} else {
				if(this.form.appStatus == 'Initiated') {
					return true;
				} else {
					return false;
				}
			}
		}
	},
	//申请加班时数是否只读	employee身份：false
	readonlyPlanned: {
		get: function() {
			if(this.form.processInstanceId != null && this.form.status != 2 && this.form.status != 9) {
				return true;
			}
			if(this.form.appStatus) {
				return true;
			}
			var uid = localStorage.getItem("uid");
			if(uid == this.form.employeeId || this.form.onBehalf) {
				return false;
			} else {
				return true;
			}
		}
	},
	//批准加班时数是否只读	AM身份：false
	readonlyApproved: {
		get: function() {
			if(this.form.processInstanceId != null && this.form.status != 2 && this.form.status != 9) {
				return true;
			}
			if(this.form.appStatus == 'Initiated') {
				return true;
			} else {
				return false;
			}
		}
	},
	//加班详情-原因是否只读
	readonlyDetailReason: {
		get: function() {
			if(!this.form.appStatus) {
				return false;
			} else if(this.form.appStatus == 'Initiated' && (this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf("edit") > -1)) {
				var uid = localStorage.getItem("uid");
				if(uid == this.form.employeeId) {
					return false;
				} else{
					return true;
				}
			} else if(this.$route.query.taskKey != null && this.processTaskKey == 'employee' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)) {
				return false;
			} else {
				return true;
			}
			
		}
	},
	//批准加班时数是否可见
	showApproved: {
		get: function() {
			if(this.form.status != 2) {
				return true;
			}
			var uid = localStorage.getItem("uid"); 
			if(uid == this.form.applicantUserId) {
				return true;
			} else  {
				return false;
			}
		}
	},
	//加班原因是否可见
	showReason: {
		get: function() {
			if(this.form.status == 0) {
				return true;
			} 
			var uid = localStorage.getItem("uid");
			if(uid == this.form.applicantUserId) {
				return true;
			} else  {
				return false;
			}
		}
	},
	showEmployee: {
		get: function() {
			return this.form.batchSubmit == 'false';
		}
	},
	showApplicant: {
		get: function() {
			return this.form.batchSubmit == 'true';
		}
	},
	showWithdraw : {
		get: function() {
			if(this.form.appStatus == 'waiting for dept head' && this.form.createId != this.form.applicantUserId && this.form.createId != this.form.employeeId) {
				var uid = localStorage.getItem("uid"); 
				return (uid == this.form.createId );
			} else {
				return false;
			}
		}
	},
	rules:{
		// 动态计算rules的值
		get:function() {
			return this.getRules();
		}
	},
    ckeckInApproveFlow:{
      get: function() {
        return (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1);
      }
    },
    applicationTime: {
      get: function() {
        if(this.form.createDate == null){
          return "";
        }
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      }
    }
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
.form-group-mar-0 .form-group {
	margin-bottom:0px;
}
</style>

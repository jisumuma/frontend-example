<template>
  <div>
    <section class="content-header">
		<h1 style="font-size:22px;">Blue Collar Planned Additional Working Time Application
		</h1>
		<ol class="breadcrumb" v-if="form.foreman">
			<li><a>1.Applicant</a></li>
			<li><a>2.Disciplinary Supervisor</a></li>
			<li><a>3.Department Head</a></li>
			<li v-if="hour20"><a>4.Division Head/BU Head</a></li>
		</ol>
		<ol class="breadcrumb" v-else>
			<li><a>1.Applicant</a></li>
			<li><a>2.Department Head</a></li>
			<li v-if="hour20"><a>3.Division Head/BU Head</a></li>
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
				<h3 class="box-title">Applicant Info. <label>申请人信息</label></h3><!--existCompleteCnt-{{form.existCompleteCnt}}   >20:{{form.headcountnumber}} -->
				<label v-if="!readonly" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
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
						<form-group v-if="!onbehalf" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="true" label="OverTimeBlue.creatorStaffcode"></form-group>
						<!--选中的时候显示-->
						<div class="col-md-3" v-if="onbehalf">
							<div class="form-group">
							  <label for="">
							   <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
								Staff Code 员工号 </label>
							  <div class="input-group ">
								<input type="text" class="form-control" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="true">
								<span class="input-group-btn" id="selectotherperson">
										<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelect"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
								</span>
							  </div>
							</div>
						</div>
						<form-group col="md-3" type="input" v-model="form.creatorName" name="creatorName" readonly="true" label="OverTimeBlue.creatorName"></form-group>
						<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" :readonly="readonly" label="OverTimeBlue.telephone"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorDept" name="creatorDept" readonly="true" label="OverTimeBlue.creatorDept"></form-group>
					</div>
					<div class="row panel-collapse collapse " id="collapseZero">
						<form-group col="md-3" type="input" v-model="form.creatorFunction" name="creatorFunction" readonly="true" label="OverTimeBlue.creatorFunction"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorEmail" name="creatorEmail" readonly="true" label="OverTimeBlue.creatorEmail"></form-group>
						<form-group col="md-3" type="input" v-model="form.disciplinarySupervisor" name="disciplinarySupervisor" readonly="true" label="OverTimeBlue.disciplinarySupervisor"></form-group>
						<form-group col="md-3" type="input" v-model="form.departmentHead" name="supervisor" readonly="true" label="OverTimeBlue.supervisor"></form-group>
						<form-group col="md-3" type="input" v-model="form.costCenter" name="costCenter" readonly="true" label="OverTimeBlue.costCenter"></form-group>
						<form-group col="md-3" type="input" v-model="form.costCenterName" name="costCenterName" readonly="true" label="OverTimeBlue.costCenterName"></form-group>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Planned Additional Working Time Info. <label>计划额外工时信息 {{(form.showDivisionHead || viewForDivisionHead) ? '(OT>20 hours)' : ''}}</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<div class="row"><!-- 加班日期-->
						<form-group col="md-3" type="datepicker" :readonly="form.noAuthorized || readonly" other-rules="required" v-model="form.overtimeDate" name="overtimeDate" label="OverTimeBlue.overtimeDate" dateformate="yyyy-mm-dd"></form-group>
					</div>
				</div>
			</form>

		<div v-if="form.overtimeDate">
			<div class="box-header with-border">
				<label v-show="!readonly" class="btn btn-primary btn-xs" style='margin-top: 1px;margin-left: 1px;float: left;font-size: 14px;' @click="batchCalculate();" title="Calculate">Calculate</label>
				<label v-show="!readonly" class="btn btn-primary btn-xs" style='margin-top: 1px;margin-left: 15px;float: right;font-size: 14px;' for="xFile2">Upload</label>
				<input v-show="!readonly" style='display: inline-block; position: absolute; clip: rect(0px, 0px, 0px, 0px);' id="xFile2"  type="file"  @change="importDetails" >
				<a v-show="!readonly" style='display: inline-block; margin-left: 15px;margin-top: 5px;float: right;'  target='_blank' :href="GL.getURL('/overTimeBlue/downloadTemplate')"><i class='fa fa-download'></i>&nbsp; Batch Upload Template  批量上传模板</a>
			</div>
		  
			<form role="form">
				<div class="box-body">
					<table class="table mar-bot-0" style="table-layout:fixed;">
						<tbody v-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1 && viewForDivisionHead">
							<tr class="bg-gray-light">
								<th width="2%">No. <br>序号</th>
								<th width="8%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th width="10%">Name <br>姓名</th>
								<th width="8%">Time Account Balance by Last Month <br>截止到上个月的时间账户</th>
								<th width="8%">Monthly Accumulated Applied Hours <br>月平均时数<i class="fa fa-fw fa-info-circle text-info" title="Comprehensive working hours calculation cycle 综合工时计算周期内"></i></th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> From (Plan) <br>预计开始时间</th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> To (Plan) <br>预计结束时间</th>
								<th width="6%">Planned Additional Working Time <br>计划额外工时</th>
								<th width="6%">Applied Hours in Current Month <br>本月已申请时数</th>
								<th width="15%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Reason of Application <br>申请原因</th>
								<th width="15%" v-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1">Reasons of Rejection <br>拒绝/ 说明</th>
								<th width="4%">History Records in Current Month <br>本月申请明细</th>
							</tr>
							<tr v-bind:key="index" v-for="(entry,index) in form.overtimeDetailsDivision" v-if="index>=pageStart&&index<pageEnd">
								<td>
									{{index + 1}}
								</td>
								<td><!-- 员工号 select-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeStaffcode" :name="'employeeStaffcode'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- 姓名-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeName" :name="'employeeName'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- 时间账户-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- 月平均-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgHours" :name="'avgHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- From-->
									<form-group v-if="entry.employeeId" type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeFrom" :name="'overtimeFrom'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- To-->
									<form-group v-if="entry.employeeId" type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeTo" :name="'overtimeTo'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Hours-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.plannedOvertimeHours" :name="'plannedOvertimeHours'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Current-->
									<input type="input" class="form-control input" readonly="true" v-model="entry.currentOvertimeHours" :name="'currentOvertimeHours'+index" :style="entry.status==9?'color : red':(entry.currentOvertimeHours > 36 ? 'color : red' : (entry.currentOvertimeHours > 20 ? 'color : orange' : ''))"></input>
								</td>
								<td><!-- Reason-->
									<form-group v-if="entry.employeeId" type="input" haslable="false" isTable="true" :readonly="readonly" other-rules="required" v-model="entry.overtimeReason" :name="'overtimeReason'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Division reject-->
									<input style="float:left;" type="checkbox" v-model="checked[entry.id]" @change="approve(entry,'Division')" />
									<form-group style="margin-left: 20px;" :other-rules="checked[entry.id]?'required|max:300':'max:300'" type="input" haslable="false" isTable="true" v-model="entry.divisionHeadRemark" :name="'divisionHeadRemark'+index" v-on:change="inputRemark(entry.divisionHeadRemark)" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- List open Overtime Details Window-->
									<OvertimeBlueDetailList v-if="showOvertimeBlueDetailList && entry.employeeId" :chooseID="'otbDetail'+entry.employeeStaffcode+'_'+index" :overtimePeriod="form.overtimeDate.substring(0,form.overtimeDate.length-3)" :employeeId="entry.employeeId"></OvertimeBlueDetailList>
								</td>
							</tr>
						</tbody>
						<tbody v-else-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1 && !viewForDivisionHead">
							<tr class="bg-gray-light">
								<th width="2%">No. <br>序号</th>
								<th width="8%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th width="10%">Name <br>姓名</th>
								<th width="8%">Time Account Balance by Last Month <br>截止到上个月的时间账户</th>
								<th width="8%">Monthly Accumulated Applied Hours <br>月平均时数<i class="fa fa-fw fa-info-circle text-info" title="Comprehensive working hours calculation cycle 综合工时计算周期内"></i></th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> From (Plan) <br>预计开始时间</th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> To (Plan) <br>预计结束时间</th>
								<th width="6%">Planned Additional Working Time <br>计划额外工时</th>
								<th width="6%">Applied Hours in Current Month <br>本月已申请时数</th>
								<th width="15%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Reason of Application <br>申请原因</th>
								<th width="15%" v-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1">Reasons of Rejection <br>拒绝/ 说明</th>
								<th width="4%">History Records in Current Month <br>本月申请明细</th>
							</tr>
							<tr v-bind:key="index" v-for="(entry,index) in form.overtimeDetailsInProcess" v-if="index>=pageStart&&index<pageEnd">
								<td>
									{{index + 1}}
								</td>
								<td><!-- 员工号 select-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeStaffcode" :name="'employeeStaffcode'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- 姓名-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeName" :name="'employeeName'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- 时间账户-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- 月平均-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgHours" :name="'avgHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- From-->
									<form-group v-if="entry.employeeId" type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeFrom" :name="'overtimeFrom'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- To-->
									<form-group v-if="entry.employeeId" type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeTo" :name="'overtimeTo'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Hours-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.plannedOvertimeHours" :name="'plannedOvertimeHours'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Current-->
									<input type="input" class="form-control input" readonly="true" v-model="entry.currentOvertimeHours" :name="'currentOvertimeHours'+index" :style="entry.status==9?'color : red':(entry.currentOvertimeHours > 36 ? 'color : red' : (entry.currentOvertimeHours > 20 ? 'color : orange' : ''))"></input>
								</td>
								<td><!-- Reason-->
									<form-group v-if="entry.employeeId" type="input" haslable="false" isTable="true" :readonly="readonly" other-rules="required" v-model="entry.overtimeReason" :name="'overtimeReason'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td v-if="viewForDirect"><!-- Direct reject-->
									<input style="float:left;" type="checkbox" v-model="checked[entry.id]" @change="approve(entry,'Direct')" />
									<form-group style="margin-left: 20px;" :other-rules="checked[entry.id]?'required|max:300':'max:300'" type="input" haslable="false" isTable="true" v-model="entry.directRemark" :name="'directRemark'+index" v-on:change="inputRemark(entry.directRemark)" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td v-else-if="viewForDeptHead"><!-- Dept reject-->
									<input style="float:left;" type="checkbox" v-model="checked[entry.id]" @change="approve(entry,'Dept')" />
									<form-group style="margin-left: 20px;" :other-rules="checked[entry.id]?'required|max:300':'max:300'" type="input" haslable="false" isTable="true" v-model="entry.deptHeadRemark" :name="'deptHeadRemark'+index" v-on:change="inputRemark(entry.deptHeadRemark)" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td v-else >
								</td>
								<td><!-- List open Overtime Details Window-->
									<OvertimeBlueDetailList v-if="showOvertimeBlueDetailList && entry.employeeId" :chooseID="'otbDetail'+entry.employeeStaffcode+'_'+index" :overtimePeriod="form.overtimeDate.substring(0,form.overtimeDate.length-3)" :employeeId="entry.employeeId"></OvertimeBlueDetailList>
								</td>
							</tr>
						</tbody>
						<tbody v-else-if="readonly && (form.showDirect || form.showDeptHead)">
							<tr class="bg-gray-light">
								<th width="2%">No. <br>序号</th>
								<th width="8%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th width="10%">Name <br>姓名</th>
								<th width="8%">Time Account Balance by Last Month <br>截止到上个月的时间账户</th>
								<th width="8%">Monthly Accumulated Applied Hours <br>月平均时数<i class="fa fa-fw fa-info-circle text-info" title="Comprehensive working hours calculation cycle 综合工时计算周期内"></i></th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> From (Plan) <br>预计开始时间</th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> To (Plan) <br>预计结束时间</th>
								<th width="6%">Planned Additional Working Time <br>计划额外工时</th>
								<th width="6%">Applied Hours in Current Month <br>本月已申请时数</th>
								<th width="15%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Reason of Application <br>申请原因</th>
								<th width="15%">Reasons of Rejection <br>拒绝/ 说明</th>
								<th width="4%">History Records in Current Month <br>本月申请明细</th>
							</tr>
							<tr v-bind:key="index" v-for="(entry,index) in form.overtimeDetailsApproved" v-if="index>=pageStart&&index<pageEnd">
								<td>
									{{index + 1}}
								</td>
								<td><!-- 员工号 select  class="form-control" style="padding-right:10%;float:left;"-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" other-rules="required" v-model="entry.employeeStaffcode" :name="'employeeStaffcode'+index" customStyle="color:red;" style="float:left;" :customStyle="entry.status==9?'color : red':''"></form-group>
									
								</td>
								<td><!-- 姓名-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeName" :name="'employeeName'+index" customStyle="color:red;" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- 时间账户-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- 月平均-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgHours" :name="'avgHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- From-->
									<form-group type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeFrom" :name="'overtimeFrom'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- To-->
									<form-group type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeTo" :name="'overtimeTo'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Hours-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.plannedOvertimeHours" :name="'plannedOvertimeHours'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Current-->
									<input type="input" class="form-control input" readonly="true" v-model="entry.currentOvertimeHours" :name="'currentOvertimeHours'+index" :style="entry.status==9?'color : red':(entry.currentOvertimeHours > 36 ? 'color : red' : (entry.currentOvertimeHours > 20 ? 'color : orange' : ''))"></input>
								</td>
								<td><!-- Reason-->
									<form-group type="input" haslable="false" isTable="true" :readonly="readonly" other-rules="required|max:300" v-model="entry.overtimeReason" :name="'overtimeReason'+index" v-on:change="inputText(entry, readonly)" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Direct reject-->
									<input style="float:left;" type="checkbox" v-model="checkRecorded[entry.id]" readonly="true" disabled="true" />
									<form-group style="margin-left: 20px;" type="input" haslable="false" isTable="true" v-model="entry.remark" :name="'remark'+index" readonly="true" :customStyle="entry.status==9?'color : red':''" ></form-group>
								</td>
								<td><!-- List open Overtime Details Window-->
									<OvertimeBlueDetailList v-if="showOvertimeBlueDetailList && entry.employeeId" :chooseID="'otbDetail'+entry.employeeStaffcode+'_'+index" :overtimePeriod="form.overtimeDate.substring(0,form.overtimeDate.length-3)" :employeeId="entry.employeeId"></OvertimeBlueDetailList>
								</td>
							</tr>
						</tbody>
						<tbody v-else-if="readonly && showDivisionHead">
							<tr class="bg-gray-light">
								<th width="2%">No. <br>序号</th>
								<th width="8%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th width="10%">Name <br>姓名</th>
								<th width="8%">Time Account Balance by Last Month <br>截止到上个月的时间账户</th>
								<th width="8%">Monthly Accumulated Applied Hours <br>月平均时数<i class="fa fa-fw fa-info-circle text-info" title="Comprehensive working hours calculation cycle 综合工时计算周期内"></i></th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> From (Plan) <br>预计开始时间</th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> To (Plan) <br>预计结束时间</th>
								<th width="6%">Planned Additional Working Time <br>计划额外工时</th>
								<th width="6%">Applied Hours in Current Month <br>本月已申请时数</th>
								<th width="15%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Reason of Application <br>申请原因</th>
								<th width="15%">Reasons of Rejection <br>拒绝/ 说明</th>
								<th width="4%">History Records in Current Month <br>本月申请明细</th>
							</tr>
							<tr v-bind:key="index" v-for="(entry,index) in form.overtimeDetailsDivisionApproved" v-if="index>=pageStart&&index<pageEnd">
								<td>
									{{index + 1}}
								</td>
								<td><!-- 员工号 select  class="form-control" style="padding-right:10%;float:left;"-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" other-rules="required" v-model="entry.employeeStaffcode" :name="'employeeStaffcode'+index" style="float:left;" :customStyle="entry.status==9?'color : red':''"></form-group>
									
								</td>
								<td><!-- 姓名-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeName" :name="'employeeName'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- 时间账户-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- 月平均-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgHours" :name="'avgHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- From-->
									<form-group type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeFrom" :name="'overtimeFrom'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- To-->
									<form-group type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeTo" :name="'overtimeTo'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Hours-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.plannedOvertimeHours" :name="'plannedOvertimeHours'+index" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Current-->
									<input type="input" class="form-control input" readonly="true" v-model="entry.currentOvertimeHours" :name="'currentOvertimeHours'+index" :style="entry.status==9?'color : red':(entry.currentOvertimeHours > 36 ? 'color : red' : (entry.currentOvertimeHours > 20 ? 'color : orange' : ''))"></input>
								</td>
								<td><!-- Reason-->
									<form-group type="input" haslable="false" isTable="true" :readonly="readonly" other-rules="required|max:300" v-model="entry.overtimeReason" :name="'overtimeReason'+index" v-on:change="inputText(entry, readonly)" :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- Direct reject-->
									<input style="float:left;" type="checkbox" v-model="checkRecorded[entry.id]" readonly="true" disabled="true" />
									<form-group style="margin-left: 20px;" type="input" haslable="false" isTable="true" v-model="entry.remark" :name="'remark'+index" readonly="true"  :customStyle="entry.status==9?'color : red':''"></form-group>
								</td>
								<td><!-- List open Overtime Details Window-->
									<OvertimeBlueDetailList v-if="showOvertimeBlueDetailList && entry.employeeId" :chooseID="'otbDetail'+entry.employeeStaffcode+'_'+index" :overtimePeriod="form.overtimeDate.substring(0,form.overtimeDate.length-3)" :employeeId="entry.employeeId"></OvertimeBlueDetailList>
								</td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr class="bg-gray-light">
								<th width="2%">No. <br>序号</th>
								<th v-if="!readonly" width="8%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th v-if="readonly" width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Staff Code <br>员工号</th>
								<th width="8%">Name <br>姓名</th>
								<th width="8%">Time Account Balance by Last Month <br>截止到上个月的时间账户</th>
								<th width="8%">Monthly Accumulated Applied Hours <br>月平均时数<i class="fa fa-fw fa-info-circle text-info" title="Comprehensive working hours calculation cycle 综合工时计算周期内"></i></th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> From (Plan) <br>预计开始时间</th>
								<th width="6%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> To (Plan) <br>预计结束时间</th>
								<th width="6%">Planned Additional Working Time <br>计划额外工时</th>
								<th width="6%">Applied Hours in Current Month <br>本月已申请时数</th>
								<th width="14%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Reason of Application <br>申请原因</th>
								<th width="14%" v-if="readonly">Reasons of Rejection <br>拒绝/ 说明</th>
								<th width="6%">History Records<br>in Current Month <br>本月申请明细</th>
								<th v-if="!readonly" width="2%" class="text-center" style="vertical-align: middle;">
									<a href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
								</th>
							</tr>
							<tr v-bind:key="index" v-for="(entry,index) in form.overtimeDetails" v-if="index>=pageStart&&index<pageEnd" :style="entry.status == 91 ? 'background-color:lightgray':''" :title="entry.status == 91?'Please be noted that this employee’s additional working plan record is invalid since it has been replaced by new additional working plan application. 由于新的额外工作计划申请已将该申请覆盖，此员工的这笔额外工作计划申请已失效。':''" >
								<td>
									{{index + 1}}
								</td>
								<td v-if="readonly">
									<input type="text" class="form-control" :id="'employeeStaffcode'+index" :name="'employeeStaffcode'+index"
									v-model="entry.employeeStaffcode" readonly="true" :style="(entry.status==9 || entry.danger=='1')?'color : red':''">
								</td>
								<td v-if="!readonly">
									<div class="input-group " style="width:110%;">
										<input type="text" class="form-control" :id="'employeeStaffcode'+index" :name="'employeeStaffcode'+index"
										v-model="entry.employeeStaffcode" readonly="true" :style="(entry.status==9 || entry.danger=='1')?'width:68%;color : red':'width:68%;'">
										<span class="input-group-btn" id="selectotherperson" style="float:left;width:5px;">
											<ChooseBlueCollar v-if="showChooseBlueCollar && !readonly" :chooseID="'otbChoose'+'_'+index" :vclass="'btn btn-primary btn-flat'"
											v-on:callbackfunction="doAfterSelectEmployee" :isForeman="form.foreman" :creatorStaffcode="form.creatorStaffcode" :direct="form.creatorEmail" :detailIndex="index">
											<i class="fa fa-fw fa-search"></i>
											</ChooseBlueCollar>
										</span>
									</div>
								</td>
									<!--</div>-->
								<td><!-- 姓名-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.employeeName" :name="'employeeName'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- 时间账户-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- 月平均-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgHours" :name="'avgHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- From-->
									<form-group type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeFrom" :name="'overtimeFrom'+index"  @change="calculate(index)" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- To-->
									<form-group type="timepicker2" haslable="false" isTable="true" :disabled="readonly" other-rules="required" v-model="entry.overtimeTo" :name="'overtimeTo'+index"  @change="calculate(index)" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- Hours-->
									<form-group type="input" haslable="false" isTable="true" readonly="true" other-rules="required" v-model="entry.plannedOvertimeHours" :name="'plannedOvertimeHours'+index" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- Current  -->
									<input type="input" class="form-control input" readonly="true" v-model="entry.currentOvertimeHours" :name="'currentOvertimeHours'+index" :style="(entry.status==9 || entry.danger=='1')?'color : red':(entry.currentOvertimeHours > 36 ? 'color : red' : (entry.currentOvertimeHours > 20 ? 'color : orange' : ''))"></input>
								</td>
								<td><!-- Reason-->
									<form-group type="input" haslable="false" isTable="true" :readonly="readonly" other-rules="required|max:300" v-model="entry.overtimeReason" :name="'overtimeReason'+index" v-on:change="inputText(entry, readonly)" :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td v-if="readonly">
									<input style="float:left;" type="checkbox" v-model="checkRecorded[entry.id]" readonly="true" disabled="true" />
									<form-group style="margin-left: 20px;" type="input" haslable="false" isTable="true" v-model="entry.remark" :name="'remark'+index" readonly="true"  :customStyle="(entry.status==9 || entry.danger=='1')?'color : red':''"></form-group>
								</td>
								<td><!-- List open Overtime Details Window-->
									<OvertimeBlueDetailList v-if="showOvertimeBlueDetailList && entry.employeeId" :chooseID="'otbDetail'+entry.employeeStaffcode+'_'+index" :overtimePeriod="form.overtimeDate.substring(0,form.overtimeDate.length-3)" :employeeId="entry.employeeId"></OvertimeBlueDetailList>
								</td>
								<td v-if="!readonly" class="text-center" style="vertical-align: middle;">
									<a href="javascript:;" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
								</td>
							</tr>
						</tbody>
						<tfoot v-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1 && viewForDivisionHead"">
							<tr>
								<td v-if="!readonly" colspan="11">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsDivision.length?form.overtimeDetailsDivision.length:pageEnd}} of {{form.overtimeDetailsDivision.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsDivision.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
								<td v-if="readonly" colspan="10">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsDivision.length?form.overtimeDetailsDivision.length:pageEnd}} of {{form.overtimeDetailsDivision.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsDivision.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
						<tfoot v-else-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1 && !viewForDivisionHead"">
							<tr>
								<td v-if="!readonly" colspan="11">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsInProcess.length?form.overtimeDetailsInProcess.length:pageEnd}} of {{form.overtimeDetailsInProcess.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsInProcess.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
								<td v-if="readonly" colspan="10">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsInProcess.length?form.overtimeDetailsInProcess.length:pageEnd}} of {{form.overtimeDetailsInProcess.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsInProcess.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
						<tfoot v-else-if="readonly && (form.showDirect || form.showDeptHead)">
							<tr>
								<td v-if="!readonly" colspan="11">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsApproved.length?form.overtimeDetailsApproved.length:pageEnd}} of {{form.overtimeDetailsApproved.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsApproved.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
								<td v-if="readonly" colspan="10">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsApproved.length?form.overtimeDetailsApproved.length:pageEnd}} of {{form.overtimeDetailsApproved.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsApproved.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
						<tfoot v-else-if="readonly && form.showDivisionHead">
							<tr>
								<td v-if="!readonly" colspan="11">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsDivisionApproved.length?form.overtimeDetailsDivisionApproved.length:pageEnd}} of {{form.overtimeDetailsDivisionApproved.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsDivisionApproved.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
								<td v-if="readonly" colspan="10">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetailsDivisionApproved.length?form.overtimeDetailsDivisionApproved.length:pageEnd}} of {{form.overtimeDetailsDivisionApproved.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetailsDivisionApproved.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
						<tfoot v-else>
							<tr>
								<td v-if="!readonly" colspan="11">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetails.length?form.overtimeDetails.length:pageEnd}} of {{form.overtimeDetails.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetails.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
								<td v-if="readonly" colspan="10">
									<div class="row">
										<div class="col-sm-5">
											<div class="dataTables_info" >Showing {{pageStart+1}} to {{pageEnd>form.overtimeDetails.length?form.overtimeDetails.length:pageEnd}} of {{form.overtimeDetails.length}} entries</div>
										</div>
										<div class="col-sm-7">
											<div class="dataTables_paginate paging_simple_numbers" >
												<ul class="pagination">
													<li class="paginate_button previous" v-if="pageStart>0"><a href="javascript:;" @click="prePage()">Previous</a></li>
													<li class="paginate_button active"><a href="javascript:;" >{{currPage}}</a></li>
													<li class="paginate_button next" v-if="pageEnd<form.overtimeDetails.length"><a href="javascript:;" @click="nextPage()">Next</a></li>
												</ul>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</form>
		</div>
		</div>
		
		<div class="box box-primary" v-if="form.sendOvertime == 'N'">
			<div class="box-header with-border">
				<h3 class="box-title">Sync Overtime Info. <label>同步加班信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<button type="button" class="btn btn-primary" @click="Upload();" title="Sync"> Sync</button>
				</div>
			</form>
		</div>
		
		<div class="checkbox mar-bot-20" v-if="!readonly" ><!-- 申请阶段显示 -->
			<label>
				<input type="checkbox" id="statement" name="terms">
				When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
				当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。
			</label>
		</div>
		<div v-if="this.form.headcountnumber && ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1 && this.processTaskKey != 'divisionHead'">
			<OvertimeBlueAuditList :headcountnumber="this.form.headcountnumber" :overtimeIds="this.form.employeeIdsOver20" :overtimePeriod="form.overtimePeriod"></OvertimeBlueAuditList>
		</div>
		
		<div class="modal fade" id="AppliedListModal" tabindex="-1" role="dialog" aria-labelledby="submitModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<span>Please be noted that there {{this.appliedIds.length==1?'is':'are'}} {{this.appliedIds.length}} {{this.appliedIds.length==1?'employee has':'employees have'}} applied additional working plan applications. You can click <a @click="popmodal();" title="List">List</a> button to see more detailed information.</span><br>
						<span>请注意有{{this.appliedIds.length}}位员工已申请蓝领额外工作计划单。您可点击<a @click="popmodal();" title="List">列表</a>按钮查看更多详细信息。</span>
					</div>
					<div class="modal-footer">
						<button type="button" id="AppliedBtn" @click="popmodal()" class="btn btn-primary pull-left" >&nbsp;List</button>
					</div>
				</div>
			</div>
		</div>
		<!-- backModal start-->
		<div class="modal fade" id="personapplied" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="AppliedModalLabel">Planned Additional Working Time Details (Applied) 计划额外工时详情 （已申请）</h4>
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
											<div id="Appliedtask_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
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
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class=" control-label pad-top-7">
																		Staff Code
																	</label>
																	<div>
																		<input type="text" id="'Staffcodepersonapplied'" class="form-control col-sm-4 Staffcode" style="width: 100%" placeholder="Staffcode">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class="control-label pad-top-7">
																		EN Name
																	</label>
																	<div>
																		<input type="text" class="form-control" id="'ENNamepersonapplied'" style="width: 100%" placeholder="ENName">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();">
																		<span class="fa fa-search">
																		</span>
																		&nbsp;&nbsp;Search
																	</button>
																</div>
															</div>
														</form>
														<table id="applied_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Staff Code<br>员工号</th>
																	<th>Name<br>姓名</th>
																	<th>From (Plan) <br>预计开始时间</th>
																	<th>To (Plan) <br>预计结束时间</th>
																	<th>Ticket No. <br>单据号</th>
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
		<comment v-if="processTaskId != null && form.status != 9 && form.status != 2 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
		<Confirm v-if="ckeckInApproveFlow && this.$route.query.taskKey.indexOf('edit') == -1" :form="form" lableName="Approve" uri="/overTimeBlue/save" v-on:beforeapprovel="beforeapprovel" :validator="this.$validator" ></Confirm>
		<router-view v-else :form="form" entityId="OverTimeBlue" vclass="btn-left" uri="/form/OverTimeBlue/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel"></router-view>
		<comment-list v-if="form.processInstanceId !=null" ></comment-list>
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
export default {
	name: "OverTimeBlue",
	methods: {
		//在onbehalf不勾选的时候拿去在data方法缓存的值赋值文本框
		onbehalfclick: function() {
		  var temp = $("#onbehalf").is(":checked");
		  this.onbehalf = temp;
		  if (!temp) {
			this.form.creatorUserId = this.tempcreatorUserId;
			this.form.applicantUserId = this.tempapplicantUserId;
			this.form.creatorStaffcode = this.tempcreatorStaffcode;
			this.form.creatorName = this.tempcreatorName;
			this.form.telephone = this.tempcreatorPhoneNum;
			this.form.creatorDept = this.tempcreatorDept;
			this.form.creatorDivision = this.tempcreatorDivision;
			this.form.creatorFunction = this.tempcreatorFunction;
			this.form.creatorEmail = this.tempcreatorEmail;
			this.form.disciplinarySupervisor = this.tempdisciplinarySupervisor;
			this.form.supervisor = this.tempsupervisor;
			this.form.costCenter = this.tempcostCenter;
			this.form.hrbp = this.temphrbp;
			this.form.costCenterName = this.tempcostCenterName;
			this.form.directId = this.tempdirectId;
			this.form.noAuthorized = this.tempnoAuthorized;
			this.form.deptHeadId = this.tempdeptHeadId;
			this.form.departmentHead = this.tempdepartmentHead;
			this.form.divisionHeadId = this.tempdivisionHeadId;
			this.form.divisionHead = this.tempdivisionHead;
			this.form.foreman = this.tempforeman;
		  }
		},
		doAfterSelect: function(data) {
			$("#selectotherperson").attr("class", "input-group-btn");
			var newItem = {};
			for(var key in this.form.overtimeDetails[0]) {
				newItem[key] = "";
			}
			if(this.form.overtimeDetailIds) {
				global_.actUtil.query("post", "/overTimeBlue/deleteDetails/"+this.form.overtimeDetailIds, "", function(data) {});
			} else {
				//if(this.form.overtimeDetails && this.form.overtimeDetails[0] )
			}
			this.form.overtimeDetails = [];
			this.form.overtimeDetails.push(newItem);
			this.form.empMap = {};
			this.firstPage();
			this.form.applicantUserId = data.id;
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
			this.form.supervisor = data.supervisor;
			this.form.costCenter = data.costCenterCode;
			this.form.hrbp = data.hrbp;
			this.form.onBehalf = true;
			var me = this;
			global_.actUtil.query("get","/overTimeBlue/doAfterSelect/"+data.id,"",function(data){
				var result = JSON.parse(data);
				me.form.costCenterName = result.costCenterName;
				me.form.foreman = result.isForeman;
				me.form.directId = result.directId;
				me.form.noAuthorized = result.noAuthorized;
				me.form.deptHeadId = result.deptHeadId;
				me.form.departmentHead = result.departmentHead;
				me.form.divisionHeadId = result.divisionHeadId;
				me.form.divisionHead = result.divisionHead;
			});
			this.showChooseBlueCollar = false;
			this.$nextTick(() => {
				this.showChooseBlueCollar = true;
			});
		},
		doAfterSelectEmployee: function(data) {
			var detailIndex = data.detailIndex;
			var row = this.form.overtimeDetails[detailIndex];
			//row.punchingfromtime = "09:00";
			//row.punchingtotime = "10:00";
			row.employeeId = data.id;
			row.employeeStaffcode = data.staffCode;
			row.employeeName = data.printENName;
			row.currentOvertimeHours = "";
			row.plannedOvertimeHours = "";
			this.calculate(detailIndex);
			this.showChooseBlueCollar = false;
			this.showOvertimeBlueDetailList = false;
			this.$nextTick(() => {
				this.showChooseBlueCollar = true;
				this.showOvertimeBlueDetailList = true;
			});
		},
		batchCalculate() {
			$("#loadingMask,#progressBar").show();			
			var me = this;
			setTimeout(function() {
				var neeUpdate = false;
				var hour20 = false;
				var count = 0;
				var laterTime = false;
				var conflict = false;
				for(var x=0;x<me.form.overtimeDetails.length;x++){
					var rowId = x;
					var row = me.form.overtimeDetails[rowId];
					var employeeId = row.employeeId;
					var overtimeFrom = row.overtimeFrom;
					var overtimeTo = row.overtimeTo;
					if(employeeId && overtimeFrom && overtimeTo && overtimeFrom.length == 5 && overtimeTo.length == 5) {
						
						neeUpdate = true;
						row.status = 2;
						if(overtimeTo == '00:00') {
							overtimeTo = '24:00';
						}
						var rowtoh = ((overtimeTo.split(":")[0])/1) + ((overtimeTo.split(":")[1])/60);				//当前行结束时间
						var rowfromh = ((overtimeFrom.split(":")[0])/1) + ((overtimeFrom.split(":")[1])/60);		//当前行开始时间
						var isValid = true;
						row.danger = "0";
						var toMinute = overtimeTo.split(":")[1];
						if(toMinute != '00' && toMinute != '15' && toMinute != '30' && toMinute != '45') {
							row.currentOvertimeHours = "";
							row.plannedOvertimeHours = "";
							row.danger = "1";
							isValid = false;
						}
						var fromMinute = overtimeFrom.split(":")[1];
						if(fromMinute != '00' && fromMinute != '15' && fromMinute != '30' && fromMinute != '45') {
							row.currentOvertimeHours = "";
							row.plannedOvertimeHours = "";
							row.danger = "1";
							isValid = false;
						}
						if(rowfromh > rowtoh) {
							//$.alertApon('加班时数超过最大加班时数或小于最小加班时数！Additional working plan hours is longer than the maximum additional working plan hours or shorter than minimum additional working plan hours!');
							//laterTime = true;  //允许跨天
							//row.overtimeTo = "";
							//row.currentOvertimeHours = "";
							//row.plannedOvertimeHours = "";
							//row.danger = "1";
							//isValid = false;
						} else if(rowfromh == rowtoh) { 
							//$.alertApon('加班时数超过最大加班时数或小于最小加班时数！Additional working plan hours is longer than the maximum additional working plan hours or shorter than minimum additional working plan hours!');
							laterTime = true;
							//row.overtimeTo = "";
							row.currentOvertimeHours = "";
							row.plannedOvertimeHours = "";
							row.danger = "1";
							isValid = false;
						} else {
							var employeeId = row.employeeId;
							for(var i=0;i<me.form.overtimeDetails.length;i++){
								var tempRow = me.form.overtimeDetails[i];
								var employeeIdtemp = tempRow.employeeId;
								var fromtemp = tempRow.overtimeFrom;
								var totemp = tempRow.overtimeTo;
								if(i != rowId && tempRow.danger != "1" && employeeId == employeeIdtemp && fromtemp && totemp) {
									var temptoh = (totemp.split(":")[0])/1 + (totemp.split(":")[1])/60;
									var tempfromh = (fromtemp.split(":")[0])/1 + (fromtemp.split(":")[1])/60;
									if(!(rowfromh <= tempfromh && rowtoh <= tempfromh) && !(rowfromh >= temptoh && rowtoh >= temptoh)) {
										//$.alertApon("第" + (rowId + 1) + "行加班时间设定与第" + (i + 1) + "行冲突！The overtime is conflict with line " + (i + 1) + "!");		
										conflict = true;
										//row.overtimeFrom = "";
										//row.overtimeTo = "";
										row.currentOvertimeHours = "";
										row.plannedOvertimeHours = "";
										row.danger = "1";
										isValid = false;
										break;
									}
								}
							}
						}
						//row.punchingCards = rowtoh - rowfromh;
						if(isValid) {
							count++;
						} else {
							row.needCal = false;
						}
					}
				}console.log('count:'+count);
				if(laterTime) {
					$.alertApon("Additional working plan start time does not later than end time. 额外工作计划开始时间不能晚于额外工作计划结束时间");					//from 与to大小比较
				}
				if(conflict) {
					$.alertApon("Please be noted that you have already applied additional working plan for the emoployee, no need to resubmit. 请注意您已为此员工申请额外工作计划，无需重复提交");
					//$("#loadingMask,#progressBar").hide();
				} 
				if(count > 0) {
					me.batchCalculateResult = true;
					me.query("POST","/overTimeBlue/batchCheck",me.form,function(data){
						var result = JSON.parse(data);
						me.form.overtimeDetails = result.overtimeDetails;
						me.form.empMap = result.empMap;
						if(result.message) {
							$.alertApon(result.message);
							//$("#loadingMask,#progressBar").hide();
							me.batchCalculateResult = false;
						}
						
						me.query("POST","/overTimeBlue/batchCalculate",me.form,function(data){
							var result = JSON.parse(data);
							me.form.overtimeDetails = result.overtimeDetails;
							me.form.empMap = result.empMap;
							if(result.totalHoursMax) {
								console.log("totalHoursMax" + result.totalHoursMax);
								$.alertApon('额外工作计划时数超过最大额外工作计划时数或小于最小额外工作计划时数！Additional working plan hours is longer than the maximum additional working plan hours or shorter than minimum additional working plan hours!');
								//$("#loadingMask,#progressBar").hide();
								me.batchCalculateResult = false;
							}
							if(result.draftOverlapIds) {
								console.log("draftOverlapIds" + result.draftOverlapIds);
								if(me.form.draftOverlapIds) {
									me.form.draftOverlapIds += "," + result.draftOverlapIds;
								} else {
									me.form.draftOverlapIds = result.draftOverlapIds;
								}
							}
							if(result.appliedIds.length>0) {
								me.appliedIds = result.appliedIds;	
								$("#Staffcodepersonapplied").val("");
								$("#ENNamepersonapplied").val("");
								$("#applied_table").DataTable().draw();
								$('#AppliedListModal').modal('toggle');
							}
							for(var rowId=0;rowId<me.form.overtimeDetails.length;rowId++) {
								var row = me.form.overtimeDetails[rowId];
								row.needCal = false;
								var current = row.currentOvertimeHours > 0 ? row.currentOvertimeHours : 0.0;
								if(!hour20 && current > 20) {
									hour20 = true;
								}
							}
							if(neeUpdate) {
								me.hour20 = hour20;
							}
							$("#loadingMask,#progressBar").hide();
						});
					});
				} else {
					$("#loadingMask,#progressBar").hide();
				}
			}, 100);
		},
		query:function(type, uri, data,callbackfn, errFn) {
			var _baseUrl = Config.getBaseURL();
			$.ajax({
				url: _baseUrl+uri,
				type: type,
				contentType: "application/json",
				data: data?JSON.stringify(data):"",
				cache: false,
				async: false,
	　　			timeout : 1000, //超时时间设置，单位毫秒
				success: function(serverData, textStatus) {
					callbackfn(serverData);
				}
			}).fail(function(jqXHR, textStatus, error){
				$("#loadingMask,#progressBar").hide();
				$.alert('Send request failed. 发起请求失败。', textStatus, 'error: ', error, jqXHR);
			});
		},
		calculate: function(rowId) {
			var row = this.form.overtimeDetails[rowId];
			var staffCode = row.employeeStaffcode;
			var employeeId = row.employeeId;
			var overtimeFrom = row.overtimeFrom;
			var overtimeTo = row.overtimeTo;
			if(!row.stay) {
				row.plannedOvertimeHours = null;
				row.currentOvertimeHours = null;
				row.ticketnoOverlap = null;
				row.addfirst = null;
			}
			//row.danger = "0";
			row.needCal = true;
			if(employeeId && overtimeFrom && overtimeTo && overtimeFrom.length == 5 && overtimeTo.length == 5) {
				if(row.danger) {
					row.danger = "0";
				} else {
					var index = this.contains(this.form.overtimeDetailsRevised, staffCode);
					if(index == false) {
						this.form.overtimeDetailsRevised.push(staffCode);
					}
				}
			}
		},
		insertItemRows: function() {
			var newItem = {};
			for(var key in this.form.overtimeDetails[0]) {
				newItem[key] = "";
			}
			var items = [];
			items.push(newItem);
			this.form.overtimeDetails = items.concat(this.form.overtimeDetails);
			this.firstPage();
		},
		deleteItemRows: function(rowId) {
			if(this.form.overtimeDetails.length > 1) {
				var employeeId = this.form.overtimeDetails[rowId].employeeId;
				var danger = this.form.overtimeDetails[rowId].danger;
				var current = this.form.overtimeDetails[rowId].currentOvertimeHours - this.form.overtimeDetails[rowId].plannedOvertimeHours;
				console.log(current);console.log(danger);
				if(danger != '1') {
					var hour20 = false;console.log("222");
					for(var i=0;i<this.form.overtimeDetails.length;i++){
						var employeeIdtemp = this.form.overtimeDetails[i].employeeId;
						if(i != rowId && employeeId == employeeIdtemp && this.form.overtimeDetails[i].danger != '1') {
							this.form.overtimeDetails[i].currentOvertimeHours = current;
							this.form.overtimeDetails[i].stay = true;
						}
						if(i != rowId && !hour20 && this.form.overtimeDetails[i].currentOvertimeHours > 20) {
							hour20 = true;
						}
					}
					this.hour20 = hour20;
				}
				var id = this.form.overtimeDetails[rowId].id;
				if(id) {
					global_.actUtil.query("post", "/overTimeBlue/deleteOvertime/"+id, "", function(data) {});
				}
				this.form.overtimeDetails.splice(rowId, 1);
				this.showOvertimeBlueDetailList = false;
				this.$nextTick(() => {
					this.showOvertimeBlueDetailList = true;
				});
				//this.firstPage();
			} else {
				$.alertApon("Please apply the additional working plan application for at least one employee. 请至少为一位员工提交额外工作计划申请。");
			}
		},
		contains: function(arrays, obj) {
			var i = arrays.length;
			while (i--) {
				if (arrays[i] === obj) {
					return true;
				}
			}
			return false;
		},
		importDetails:function(event){
			$("#loadingMask,#progressBar").show(); 
			let file = event.target.files[0];
			var zipFormData = new FormData();
			zipFormData.append('file', file);

			this.$http.post(Config.getBaseURL() + "/overTimeBlue/importDetails/" + this.form.foreman + "/" + this.form.creatorEmail + "/" + this.form.creatorStaffcode, zipFormData,{
				headers: {"Content-Type": "multipart/form-data"}
			}).then(function (response) {
				var staffcodes = response.data.staffcodes;
				if(staffcodes) {
					var msg = staffcodes + "<br> Employee(s) is not under your management. " + staffcodes + "<br>员工不在管辖范围内。";
					$.alertApon(msg);
				}
				var notBlue = response.data.notBlue;
				if(notBlue) {
					var msg2 = notBlue + " Employee(s) is not Blue Collar. " + notBlue + "员工不是蓝领";
					$.alertApon(msg2);
				}
				var multi = response.data.multi;
				if(multi) {
					var msg3 = multi + " is not unique, please contract administrator. 员工号" + multi + "不是唯一的，请联系管理员";
					$.alertApon(msg3);
				}
				if(this.form.overtimeDetails.length == 1 && (!this.form.overtimeDetails[0].employeeStaffcode && !this.form.overtimeDetails[0].overtimeFrom && !this.form.overtimeDetails[0].overtimeTo)){
					this.form.overtimeDetails = [];
				}
				var newList = response.data.form.overtimeDetails;
				var length = this.form.overtimeDetails.length;
				for(var i=0;i<newList.length;i++){
					var item = newList[i];
					if(item.employeeId && item.overtimeFrom && item.overtimeTo) {
						this.form.overtimeDetails.push(item);//把a数组内的元素添加到b数组
						this.calculate(length + i);
					}
				}
				$("#loadingMask,#progressBar").hide();
				$("#xFile2").val("");
			}, function (response) {
				$("#loadingMask,#progressBar").hide();
			});
		},
		downloadTemplate:function(){
			var iHeight = 650;
			var iWidth = 950;
			var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
			var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
			var date = this.date;
			var area = this.area;
			var url = Config.getBaseURL() + "/overTimeBlue/downloadTemplate";
			var showSelectWin = window.open(url, 'print', 'directories=no,height=' +
				iHeight + ',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width=' +
				iWidth + ',top=' + iTop + ',left=' + iLeft);
			showSelectWin.focus();
	    },
		canSubmit: function() {
			if(!$('#statement').prop('checked')){
				$.alertApon("Please read 'Employee Statement' and check it.请阅读员工声明，并勾选。");
				return false;
			}
			if(this.form.overtimeDetails.length == 0) {
				$.alertApon("Please apply the additional working plan application for at least one employee. 请至少为一位员工提交额外工作计划申请。");
				return false;
			}
			for(var i=0;i<this.form.overtimeDetails.length;i++){
				var danger = this.form.overtimeDetails[i].danger;
				if(danger == '1' || !this.form.overtimeDetails[i].plannedOvertimeHours) {
					var pageIndex = (i > 0 && i % 10 == 0) ? Math.floor(i / 10) : (Math.floor(i / 10) + 1);
					this.pageStart=(pageIndex - 1) * 10;
					this.pageEnd=pageIndex * 10;
					this.currPage = pageIndex;
					$.alertApon("There is an error in Planned Additional Working Time Info list, please check. 参与者列表中包含错误项，请检查。");
					return false;
				}
			}
			return true;
		},
		//提交前校验
		beforesubmit: function() {
			//this.batchCalculateResult = true;
			//this.batchCalculate(true);
			//if(this.batchCalculateResult) {
				var result = this.canSubmit();console.log("1 "+this.batchCalculateResult);console.log("2 "+result);
				if(result){
					this.form.submitstatus=true;
				}else{
					this.form.submitstatus=false;
					return;
				}
			//} else {
			//	this.form.submitstatus=false;
			//	return;
			//}
		},
		beforeapprovel: function() {
			if(this.form.status != 1) {
				var result = this.canSubmit();
				if(result){
					//resubmit check is overlap
					var overlap = false;
					for(var i=0;i<this.form.overtimeDetails.length;i++){
						var raw = this.form.overtimeDetails[i];
						global_.actUtil.query("get","/overTimeBlue/searchIsOverlap?overtimeDate=" + this.form.overtimeDate
							+ "&staffCode=" + row.employeeStaffcode 
							+ "&fromTime=" + row.overtimeFrom
							+ "&toTime=" + row.overtimeTo
							+ "&id=" + row.id
							,"",function(data){
							var result = JSON.parse(data);
							if(result.overlap) {
								$.alertApon(result.msg);
								me.form.overtimeDetails[rowId].overtimeFrom = "";
								me.form.overtimeDetails[rowId].overtimeTo = "";
								overlap = true;
							} else{
								if(result.ticketnoOverlap) {
									row.ticketnoOverlap = result.ticketnoOverlap;
									row.approvedHours = result.approvedHours;
									row.overlapId = result.overlapId;
								}
							}
						});
					}
					if(overlap) {
						this.form.approvelstatus = false;
						return;
					} else {
						this.form.approvelstatus=true;
					}
				}else{
					this.form.approvelstatus=false;
					return;
				}
			}else {
				for(var k=0;k<this.form.overtimeDetailsInProcess.length;k++){
					var row = this.form.overtimeDetailsInProcess[k];
					if(row.status != 9) {
						row.status = 1;
					}
				}
			}
		},
		approve:function(entry, type){
	    	var check = this.checked[entry.id];
			if(check) {
				entry.status = 9;
			} else {
				entry.status = 1;
			}
			var isRejected = true;
			var approveCnt = 0, rejectCnt = 0, employeeCnt = 0;
			var details;
			if(type == 'Division') {
				details = this.form.overtimeDetailsDivision;
				employeeCnt = this.form.overtimeDetailsDivision.length;
			} else {
				details = this.form.overtimeDetailsInProcess;
				employeeCnt = this.form.overtimeDetailsInProcess.length;
			}
			if(details && details.length>0) {
				for(var i=0;i<details.length;i++){
					var status = details[i].status;
					if(status == 9) {
						rejectCnt++;
					}
					if(isRejected && status == 1) {
						isRejected = false;
					}
				}
			}
			approveCnt = employeeCnt - rejectCnt;
			this.form.approveCnt = approveCnt;
			this.form.rejectCnt = rejectCnt;
			this.form.isRejected = isRejected;			
		},
		Upload: function() {
			var url = Config.getBaseURL() + "/overTimeBlue/uploadOverTime/" + this.form.id;
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
		inputText: function(entry, readonly) {
			var value = entry.overtimeReason;
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
					//entry.overtimeReason=limitvalue;
				$.alertApon('300 characters max, '+length+' characters have been filled in currently. 最多只能填写300个字节，目前已填写'+length+'个字节。');
				}
			}
		},
		inputRemark: function(value) {
			var reg =/^[0-9]*$/;
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
				//value=limitvalue;
				$.alertApon('300 characters max, '+length+' characters have been filled in currently. 最多只能填写300个字节，目前已填写'+length+'个字节。');
			}
		},
		popmodal: function() {
			//$('#personModal').modal('toggle');


			$("#personapplied").modal({
				backdrop: false, //点击空白处不关闭对话框
				keyboard: false, //键盘关闭对话框
				toggle: true //弹出对话框
			});
			setTimeout(function() {
				$('#selectotherperson').attr("class", "");
			}, 300);

		},
		closemodal: function() {
			$('#selectotherperson').attr("class", "input-group-btn");
			$("#Staffcodepersonapplied").val("");
			$("#ENNamepersonapplied").val("");
			$("#applied_table").DataTable().draw();
		},
		draw: function() {
			$("#applied_table").DataTable().draw();
		},
		retrieveData: function(url, aoData, fnCallback) {
			var staffcode = $("#Staffcodepersonapplied").val();
			var enname = $("#ENNamepersonapplied").val();
			var appliedIds = this.appliedIds;console.log('--------'+appliedIds);
			if(appliedIds) {
				var appliedIdsstrs = "";
				for(var i = 0; i < appliedIds.length; i++) {
					appliedIdsstrs += appliedIds[i] + ",";
				}
				appliedIdsstrs = appliedIdsstrs.substring(0, appliedIdsstrs.length-1);
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
							"staffCode": staffcode,
							"printENName": enname,
							"existCompleteIds": appliedIdsstrs
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
			}
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
		if (id) {
		  var url = "/form/OverTimeBlue/get/" + id;
		} else {
		  var url = "/form/OverTimeBlue/create/";
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
		dm.onbehalf = false;
		dm.hour20 = false;
		dm.tempcreatorUserId = dm.form.creatorUserId;
		dm.tempapplicantUserId = dm.form.applicantUserId;
		dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
		dm.tempcreatorName = dm.form.creatorName;
		dm.tempcreatorPhoneNum = dm.form.telephone;
		dm.tempcreatorDept = dm.form.creatorDept;
		dm.tempcreatorDivision = dm.form.creatorDivision;
		dm.tempcreatorFunction = dm.form.creatorFunction;
		dm.tempcreatorEmail = dm.form.creatorEmail;
		dm.tempdisciplinarySupervisor = dm.form.disciplinarySupervisor;
		dm.tempsupervisor = dm.form.supervisor;
		dm.tempcostCenter = dm.form.costCenter;
		dm.temphrbp = dm.form.hrbp;
		dm.tempcostCenterName = dm.form.costCenterName;
		dm.tempdirectId = dm.form.directId;
		dm.tempnoAuthorized = dm.form.noAuthorized;
		dm.tempdeptHeadId = dm.form.deptHeadId;
		dm.tempdepartmentHead = dm.form.departmentHead;
		dm.tempdivisionHeadId = dm.form.divisionHeadId;
		dm.tempdivisionHead = dm.form.divisionHead;
		dm.tempforeman = dm.form.foreman;
		dm.showOvertimeBlueDetailList = true;
		dm.showChooseBlueCollar = true;
		dm.checked = {};
		dm.appliedIds=[];
		dm.form.existDraftIds = [];
		dm.form.existCompleteIds = [];
		dm.form.employeeIdsOver20 = [];
		var k = 1;
		if(dm.form.overtimeDetailsInProcess && dm.form.overtimeDetailsInProcess.length>0) {
			for(var i=0;i<dm.form.overtimeDetailsInProcess.length;i++){
				var id = dm.form.overtimeDetailsInProcess[i].id;
				dm.checked[id] = false;
				if(dm.form.overtimeDetailsInProcess[i].currentOvertimeHours > 20) {
					dm.form.overtimeDetailsInProcess[i].index = k++;
					var employeeId = dm.form.overtimeDetailsInProcess[i].employeeId;
					var index = this.contains(dm.form.employeeIdsOver20, employeeId);
					if(index == false) {
						dm.form.employeeIdsOver20.push(employeeId);
					}
				}
			}
		}
		dm.form.headcountnumber = dm.form.employeeIdsOver20.length;
		dm.checkRecorded = {};
		if(dm.form.overtimeDetails && dm.form.overtimeDetails.length>0) {
			for(var i=0;i<dm.form.overtimeDetails.length;i++){
				dm.form.overtimeDetails[i].needCal = false;
				var id = dm.form.overtimeDetails[i].id;
				if(dm.form.showDirect) {
					dm.checkRecorded[id] = dm.form.overtimeDetails[i].directReject == 1;
					dm.form.overtimeDetails[i].remark = dm.form.overtimeDetails[i].directRemark;
				} else if(dm.form.showDeptHead) {
					dm.checkRecorded[id] = dm.form.overtimeDetails[i].deptHeadReject == 1;
					dm.form.overtimeDetails[i].remark = dm.form.overtimeDetails[i].deptHeadRemark;
				} else if(dm.form.showDivisionHead) {
					dm.checkRecorded[id] = dm.form.overtimeDetails[i].divisionHeadReject == 1;
					dm.form.overtimeDetails[i].remark = dm.form.overtimeDetails[i].divisionHeadRemark;
				} else {
					if(dm.form.overtimeDetails[i].directReject == 1) {
						dm.checkRecorded[id] = true;
						dm.form.overtimeDetails[i].remark = dm.form.overtimeDetails[i].directRemark;
					} else if(dm.form.overtimeDetails[i].deptHeadReject == 1) {
						dm.checkRecorded[id] = true;
						dm.form.overtimeDetails[i].remark = dm.form.overtimeDetails[i].deptHeadRemark;
					} else if(dm.form.overtimeDetails[i].divisionHeadReject == 1) {
						dm.checkRecorded[id] = true;
						dm.form.overtimeDetails[i].remark = dm.form.overtimeDetails[i].divisionHeadRemark;
					} else {
						dm.checkRecorded[id] = false;
					}
				}
				if(!dm.hour20 && dm.form.overtimeDetails[i].status != 9 && dm.form.overtimeDetails[i].currentOvertimeHours > 20) {
					dm.hour20 = true;
				}
			}
		}
		var j = 1;
		if(dm.form.overtimeDetailsApproved && dm.form.overtimeDetailsApproved.length>0) {
			for(var i=0; i<dm.form.overtimeDetailsApproved.length;i++){
				if(dm.form.showDirect) {
					dm.form.overtimeDetailsApproved[i].remark = dm.form.overtimeDetailsApproved[i].directRemark;
				} else if(dm.form.showDeptHead) {
					dm.form.overtimeDetailsApproved[i].remark = dm.form.overtimeDetailsApproved[i].deptHeadRemark;
				} else if(dm.form.showDivisionHead) {
					dm.form.overtimeDetailsApproved[i].remark = dm.form.overtimeDetailsApproved[i].divisionHeadRemark;
				}
				if(dm.form.overtimeDetailsApproved[i].currentOvertimeHours > 20) {
					dm.form.overtimeDetailsApproved[i].index = j++;
				}
			}
		}
		if(dm.form.noAuthorized) {
			$.alertApon("You are not authorized to apply for this application if you department is null. 如果部门为空没有权限申请此单据。");
		}
		if(this.$route.query.taskKey != null &&  this.$route.query.taskKey == 'divisionHead') {
			dm.form.approveCnt = dm.form.overtimeDetailsDivision.length;
		} else if(this.$route.query.taskKey != null){
			dm.form.approveCnt = dm.form.overtimeDetailsInProcess.length;
		}
		dm.form.rejectCnt = 0;
		dm.pageStart=0;
		dm.pageEnd=10;
		dm.currPage=1;
		return dm;
	},
	watch: {
		"form.overtimeDate":{
			handler(curVal,oldVal){
				if(this.form.overtimeDate) {
					this.form.overtimePeriod = this.form.overtimeDate.substring(0, this.form.overtimeDate.length -3);
				}
				if(curVal != oldVal) {
					var newItem = {};
					for(var key in this.form.overtimeDetails[0]) {
						newItem[key] = "";
					}
					if(this.form.overtimeDetailIds) {
						global_.actUtil.query("post", "/overTimeBlue/deleteDetails/"+this.form.overtimeDetailIds, "", function(data) {});
					} else {
						//if(this.form.overtimeDetails && this.form.overtimeDetails[0] )
					}
					this.form.overtimeDetails = [];
					this.form.overtimeDetails.push(newItem);
					this.form.empMap = {};
					this.firstPage();
				}
			},
			deep:true
		}
	},
	//在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
	mounted() {
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
		
		if(this.form.status==2||this.form.status==9) {
			this.batchCalculate();
		}
		if(this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) {
			$('#OTBAuditModal').modal('toggle');
		}
		this.$root.eventHub.$off('updateFormData');
		this.$root.eventHub.$on('updateFormData', (form)=>{
			this.form = form;
			this.showOvertimeBlueDetailList = false;
			this.$nextTick(() => {
				this.showOvertimeBlueDetailList = true;
			});
		});
		//AppliedListModal
		$('#AppliedListModal').on('shown.bs.modal', function (e) { 
		  $(this).css('display', 'block'); 
		  var modalHeight=$(window).height() / 2 - $('#AppliedListModal .modal-dialog').height() / 2; 
		  $(this).find('.modal-dialog').css({ 
			'margin-top': modalHeight 
		  }); 
		});
		if(this.appliedIds && this.appliedIds.length > 0) {console.log('00000'+this.appliedIds);
			var queryData = this.retrieveData;
			var draw = this.draw;
			var table = $("#applied_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/overTimeBlue/showOverlapDetails",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "employeeStaffcode"
					},
					{
						data: "employeeName"
					},
					{
						data: "overtimeFrom"
					},
					{
						data: "overtimeTo"
					},
					{
						data: "ticketno"
					}
				],
				"fnRowCallback": function(row, data, index) { 
					return row;
				}
			});
		}
  },
  computed: {
	person_table: {
		get:function(){
			return "applied_table";
		}
	},
	personModal: {
		get:function(){
			return "personapplied";
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
	viewForDirect: {
	  get: function() {
			return (this.$route.query.taskKey != null && this.processTaskKey == 'directiveSupervisor' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))
	  }
	},
	viewForDeptHead: {
	  get: function() {
			return (this.$route.query.taskKey != null && this.processTaskKey == 'deptHead' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))
	  }
	},
	viewForDivisionHead: {
	  get: function() {
			return (this.$route.query.taskKey != null && this.processTaskKey == 'divisionHead' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))
	  }
	},
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

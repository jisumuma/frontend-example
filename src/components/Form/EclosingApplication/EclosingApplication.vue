<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">E-Closing 离职</h1>
      <ol class="breadcrumb" v-if="approvalFlow">
        <li><a >1.Applicant</a></li>
        <li><a >2.Disciplinary Supervisor</a></li>
        <li><a >3.EHS OHC</a></li>
        <li><a >4.HRBP</a></li>
        <li><a >5.Department Head</a></li>
        <li><a >6.Head of HR Orga & Education</a></li>
        <li><a :title="titleParallel" href="###" >7.Confirmation Parallel</a></li>
        <li><a >8.HR C&B</a></li>
        <li><a >9.Finance Cashier</a></li>
        <li><a >10.HRBP Preparation</a></li>
      </ol>
      <ol class="breadcrumb" v-if="!approvalFlow">
        <li><a >1.Applicant</a></li>
        <li><a :title="titleParallel" href="###" >2.Confirmation Parallel</a></li>
        <li><a >3.HR C&B</a></li>
        <li><a >4.Finance Cashier</a></li>
        <li><a >5.HRBP Preparation</a></li>
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
			  <h3 class="box-title">Employee Info. <label>员工信息</label></h3>
        <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-toggle="collapse" id="minusplusbtnwpedApplicant" href="#collapseApplicant"><i class="fa fa-minus" id="minusplusiwpedApplicant"></i></button>
        </div>
        <label v-if="this.selectanemployeeCheck" class="mar-left-20">
          &nbsp;&nbsp;&nbsp;
          <input type="checkbox" :checked="selectanemployee" :disabled="readonly" id="selectanemployee" @click="onselect" >
          <strong>Select an employee</strong>
        </label>
        <label v-if="(this.form.hrbp && (this.form.status == null || this.form.status == 2 || this.form.status == 9)) || (this.form.immediateTermination != null && (this.form.immediateTermination==true || this.form.immediateTermination=='true'))">
          &nbsp;&nbsp;&nbsp;
          <input type="checkbox" v-model="form.immediateTermination" :disabled="readonly" other-rules="required" name="immediateTermination" id="immediateTermination" >
          Immediate Termination 紧急离职申请
        </label>
			</div>

      <form role="form" >
				<input type="hidden" v-model="form.id" name="id">
				<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
				<input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
				<div class="box-body">
					<div class="row">
            <!--选中的时候显示-->
            <div class="col-md-3" v-if="selectanemployee">
              <div class="form-group">
                <label for="">
                  {{$t("EclosingApplication.creatorStaffcode")}} </label>
                <div class="input-group ">
                  <input type="text" class="form-control" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
                  <span class="input-group-btn" id="selectotherperson">
                    <ChooseUser4Eclosing  :vclass="'btn btn-primary btn-flat'" v-if="selectanemployee" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseUser4Eclosing>
                  </span>
                </div>
              </div>
            </div>
            <!--不选中的时候显示-->
            <form-group col="md-3" type="input" v-if="!selectanemployee" v-model="form.creatorStaffcode" name="creatorStaffcode" disabled="true" label="EclosingApplication.creatorStaffcode"></form-group>
            <form-group col="md-3" type="input"  v-model="form.creatorName" name="name" disabled="true" label="EclosingApplication.name"></form-group>
            <form-group col="md-3" type="input"  v-model="form.creatorPosition" name="creatorPosition" disabled="true" label="EclosingApplication.creatorPosition"></form-group>
						<form-group col="md-3" type="input"  v-model="form.creatorDept" name="creatorDept" disabled="true" label="EclosingApplication.creatorDept"></form-group>
					</div>

          <div class="row panel-collapse collapse in" id="collapseApplicant" > 
            <form-group col="md-3" type="input"  v-model="form.telephone" name="telephone" disabled="true" label="EclosingApplication.telephone"></form-group>
            <form-group col="md-3" type="input" @input="getPhoneNumber" other-rules="required" :disabled="readonly" v-model="form.mobile" name="mobile" label="EclosingApplication.mobile"></form-group>
            <form-group col="md-3" type="datepicker"  v-model="form.joindate" name="joindate" disabled="true" label="EclosingApplication.joindate"></form-group>
            <form-group col="md-3" type="input" v-model="form.currentContractPeriod" name="currentContractPeriod" disabled="true" label="EclosingApplication.currentContractPeriod"></form-group>   
          </div>
        </div>
			</form>
    </div>

    <div class="box box-primary" v-if="!showResignationInfoAll">
      <div class="box-header with-border">
			  <h3 class="box-title">Resignation Info. <label>离职信息</label></h3>
        <!--<i class="fa fa-asterisk text-required text-required-title"></i>-->
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <form-group col="md-3" type="datepicker2" dateformate="yyyy-mm-dd" :title="titleTips1" :disabled="lastWorkingReadonly" other-rules="required" v-model="form.lastWorkingDateString" name="lastWorkingDateString"  label="EclosingApplication.lastWorkingDate"></form-group>
            <form-group col="md-3" type="datepicker2" dateformate="yyyy-mm-dd" :title="titleTips2" :disabled="lastWorkingReadonly" other-rules="required" v-model="form.lastContractDateString" name="lastContractDateString"  label="EclosingApplication.lastContractDate"></form-group>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary" v-if="showResignationInfoAll">
      <div class="box-header with-border">
			  <h3 class="box-title">Resignation Info. <label>离职信息</label></h3>
        <!--<i class="fa fa-asterisk text-required text-required-title"></i>-->
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" :disabled="lastWorkingReadonly" other-rules="required" v-model="form.resignationReqDate" name="resignationReqDate"  label="EclosingApplication.resignationReqDate"></form-group>
            <form-group col="md-3" type="datepicker2" dateformate="yyyy-mm-dd" :title="titleTips1" :disabled="lastWorkingReadonly" other-rules="required" v-model="form.lastWorkingDateString" name="lastWorkingDateString"  label="EclosingApplication.lastWorkingDate"></form-group>
            <form-group col="md-3" type="datepicker2" dateformate="yyyy-mm-dd" :title="titleTips2" :disabled="lastWorkingReadonly" other-rules="required" v-model="form.lastContractDateString" name="lastContractDateString"  label="EclosingApplication.lastContractDate"></form-group>
            
            <form-group col="md-3" v-show="this.form.ifNoFse" type="select" :disabled="lastWorkingReadonly" :other-rules="otherRulesNoFse" uri="/eclosingApplication/reasonlist?groupName=ResignationType" v-model="form.resignationType" name="resignationType" label="EclosingApplication.resignationType"/>
            <form-group col="md-3" v-show="this.form.ifFse" type="select" :disabled="lastWorkingReadonly" :other-rules="otherRulesFse" uri="/eclosingApplication/reasonlist?groupName=ResignationTypeForFse" v-model="form.resignationType" name="resignationType" label="EclosingApplication.resignationType"/>
            <div class="form-group col-md-12">
              <table id="ResignationReasonTable" class="table table-bordered table-hover table-permanent-position">
									  <tbody>
                  <tr>
                    <td style="width: 20%" rowspan="4" class="is-safe">
                      <i class="fa fa-asterisk text-required text-required-title"></i>
                      <b>Resignation Reason <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离职原因</b>
                    </td>
                    <td style="width: 20%;" class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                      <input type="checkbox" v-validate="'required'" @change="checkReason" v-model="regReason" :disabled="readonly" value="Lack of Career Development 缺乏职业发展机会">Lack of Career Development<br />缺乏职业发展机会
                      </label></div>
                    </td>
                    <td style="width: 20%" class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" v-validate="'required'" @change="checkReason" v-model="regReason" :disabled="readonly" value="Better Job Opportunity 更好的工作机会">Better Job Opportunity<br />更好的工作机会
                      </label></div>
                    </td>
                    <td style="width: 20%" class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Dissatisfied with Salary 不满意薪资福利待遇">Dissatisfied with Salary<br />不满意薪资福利待遇
                      </label></div>
                    </td>
                    <td style="width: 20%" class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Workload 工作负荷过大">Workload<br />工作负荷过大
                      </label></div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Family Reason 家庭原因">Family Reason<br />家庭原因
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Health Problem 健康问题">Health Problem<br />健康问题
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Not Used to Shift Work 不习惯轮班工作">Not Used to Shift Work<br />不习惯轮班工作
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Cooperation Problem 配合问题">Cooperation Problem<br />配合问题
                      </label></div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Further Study 进修">Further Study<br />进修
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Contract Ended 合同到期">Contract Ended<br />合同到期
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Misconduct 行为不当">Misconduct<br />行为不当
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Unsatisfactory Performance 业绩不合格">Unsatisfactory Performance<br />业绩不合格
                      </label></div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                      <label style="font-weight:normal">
                        <input type="checkbox" @change="checkReason" v-model="regReason" :disabled="readonly" value="Company Workforce Reduction 公司裁员">Company Workforce Reduction<br />公司裁员
                      </label></div>
                    </td>
                    <td class="is-safe">
                      <div class="checkbox mar-bot-5">
                        <label style="font-weight:normal">
                          <input type="checkbox" @change="checkReason" v-model="regReason" name="resignationReason" :disabled="readonly" value="Others (please specify) 其他（请具体描述）">
                          Others (please specify)<br />其他（请具体描述）
                        </label>
                      </div>
                    </td>
                    <td colspan="2" class="is-safe">
                      <div class="form-group" v-if="resignationReasonOther">
                      <textarea style="resize:vertical;" :class="{'form-control':true,'pull-left': true,'input':true }" id="otherReason" rows="2" name ="otherReason"  placeholder="" v-validate="'required'" v-model="form.otherReason" @blur="otherReasonCheck" :disabled="readonly"></textarea>
                      <p>{{$t("textareaNoticeComment")}}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
           
            <form-group col="md-3" type="select" :disabled="lastWorkingReadonly" other-rules="required" uri="/eclosingApplication/reasonlist?groupName=CompanyCar" v-model="form.boolCompanyCar" name="boolCompanyCar" label="EclosingApplication.boolCompanyCar"/>
            <div class="col-md-9">
              <div class="form-group">
                <label for=""> &nbsp;  </label>
                <p><span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;
                  <font color="red">
                  Please check this section if employee has company car.&nbsp;如果员工有公务车，请检查这一部分。</font></span></p>
              </div>
            </div>
          </div>   
				</div>
			</form>
		</div>

    <div class="box box-primary" v-if="showResignationInfoAll && uploadShow">
      <div class="box-header with-border">
			  <h3 class="box-title" v-if="!readonly">Upload Attachment <label>上传附件</label></h3>
        <h3 class="box-title" v-else >Attachment <label>附件</label></h3>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <upload3 class="col-md-11" uploadLimit="5" fileSizeLimit="5MB" :readonly="readonly" v-model="form.resId" buttonText="Attachments" :attachments="form.resignationAttachments" multi="true" required="false"></upload3>
					</div>
        </div>
      </form>
    </div>

    <div class="checkbox mar-bot-5" v-if="!readonly" ><!-- 申请阶段显示 -->
      <label>
        <span class="help is-danger" v-show="errors.has('terms')">
						{{$t("checkPolicyNotice")}}
				</span>
        <input name="terms" type="checkbox" v-validate="'required'" >
        <div v-if="!selectanemployee">
          <b>Employee Statement 员工声明</b><br>
          I promise that I will attend Exit Occupational Health Check which is required and arranged by the company on time and I hereby confirm that the information given above is complete and true to the best of my knowledge. 
          I will undertake the responsibility for any consequences deriving from the false information.<br />
          本人承诺将按时参加公司安排的离岗职业健康体检并确认以上信息属实，如有虚假，本人承担全部责任。<br />
        </div>
        <!--HRBP发起时只需要显示下面的-->
        When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
        当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。<br /><br />
      </label>
    </div>

    <div class="box box-primary" id="ehsDiv" v-if="this.ehsDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">Occupational Health Checkup <label>职业健康检查</label>（EHS OHC）</h3>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass1" data-toggle="collapse" id="minusplusbtnwpedEhsOhc" href="#collapseEHSOHC"><i :class="this.iClassPlus1" id="minusplusiwpedEhsOhc"></i></button>
        </div>
			</div>
      <form role="form" id="collapseEHSOHC" :class="this.formClassCollapse1"> 
				<div class="box-body">
          <div class="form-group">
            <div class="radio no-margin overflow-auto" style="padding: 10px"> 
            <label class="col-md-3">
              <input type="radio" v-model="form.boolPhysicalExam" name="boolPhysicalExam" id="boolPhysicalExam1" :disabled="readonlyHrbpPreparation" value="N" @change="noExamination">
              Not Required Occupational Physical Examination <br>无需离职体检
            </label>
            <label class="col-md-3">
              <input type="radio" v-model="form.boolPhysicalExam" name="boolPhysicalExam" id="boolPhysicalExam2" :disabled="readonlyHrbpPreparation" value="Y" @change="noExamination">
              Required Occupational Physical Examination <br>需要离职体检<!--, 体检日期为：-->
            </label>
            <!--
            <form-group col="md-3" type="datepicker" v-if="examinationDateO" v-model="form.examinationDate" name="examinationDate" :readonly="readonlyHrbpPreparation" label="EclosingApplication.examinationDate"></form-group>
            v-if="examinationDateO"-->
            <!--examinationDateDisabled={{this.examinationDateDisabled}}-->
            <label class="col-md-3" v-if="examinationDateO" >
              <i class="fa fa-asterisk text-required text-required-title"></i>Examination Date 体检日期
              <form-group type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" haslable="false" :disabled="readonlyHrbpPreparation" id="examinationDate" name="examinationDate"  v-model="form.examinationDate" ></form-group>
              <!--
              <datepicker2 v-if="!examinationDateDisabled" v-model="form.examinationDate" :default-value="modelValue" id="examinationDate" name="examinationDate" :placeholder="placeholder"  ></datepicker2>
              <input type="text" v-if="examinationDateDisabled" v-model="form.examinationDate" :readonly="readonlyHrbpPreparation" name="examinationDate" class="form-control input">
              -->
            </label>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="hrbpDiv" v-if="this.hrbpDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">Exit Interview Result <label>离职访谈结果</label>（HRBP）</h3>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass1" data-toggle="collapse" id="minusplusbtnwpedHrbp" href="#collapseHrbp"><i :class="this.iClassPlus1" id="minusplusiwpedHrbp"></i></button>
        </div>
			</div>
      <form role="form" id="collapseHrbp" :class="this.formClassCollapse1">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-12" style="margin-bottom: 0;">
              <label>Q1. Your appraisal for the company in the following points is: 您对公司以下各方面的评价是:</label>
              <table class="table table-bordered">
                <thead>
                  <tr class="bg-gray-light">
                    <th style="width: 248px">Appraisal Criteria 评估因素</th>
                    <th>Comment 评价</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="bg-gray-light">Salary & Benefits 薪酬和福利</td>
                    <td>
                      <div class="radio">
                        <label class="col-md-3" style="width: 20%">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalSalaryBenefits" name="appraisalSalaryBenefits" id="appraisalSalaryBenefits1" value="Very Satisfied">Very Satisfied 非常满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalSalaryBenefits" name="appraisalSalaryBenefits" id="appraisalSalaryBenefits2" value="Satisfied">Satisfied 满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalSalaryBenefits" name="appraisalSalaryBenefits" id="appraisalSalaryBenefits3" value="General">General 一般 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalSalaryBenefits" name="appraisalSalaryBenefits" id="appraisalSalaryBenefits4" value="Dissatisfied">Dissatisfied 不满意 
                        </label>
                        <label class="col-md-3">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalSalaryBenefits" name="appraisalSalaryBenefits" id="appraisalSalaryBenefits5" value="Very Dissatisfied">Very Dissatisfied 非常不满意 
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-gray-light">Communication 沟通</td>
                    <td>
                      <div class="radio">
                        <label class="col-md-3" style="width: 20%">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCommunication" name="appraisalCommunication" id="appraisalCommunication1" value="Very Satisfied">Very Satisfied  非常满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCommunication" name="appraisalCommunication" id="appraisalCommunication2" value="Satisfied">Satisfied 满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCommunication" name="appraisalCommunication" id="appraisalCommunication3" value="General">General 一般 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCommunication" name="appraisalCommunication" id="appraisalCommunication4" value="Dissatisfied">Dissatisfied  不满意 
                        </label>
                        <label class="col-md-3">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCommunication" name="appraisalCommunication" id="appraisalCommunication5" value="Very Dissatisfied">Very Dissatisfied 非常不满意 
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-gray-light">Personal Development 个人发展</td>
                    <td>
                      <div class="radio">
                        <label class="col-md-3" style="width: 20%">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalPersonalDevelopment" name="appraisalPersonalDevelopment" id="appraisalPersonalDevelopment1" value="Very Satisfied">Very Satisfied  非常满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalPersonalDevelopment" name="appraisalPersonalDevelopment" id="appraisalPersonalDevelopment2" value="Satisfied">Satisfied 满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalPersonalDevelopment" name="appraisalPersonalDevelopment" id="appraisalPersonalDevelopment3" value="General">General 一般 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalPersonalDevelopment" name="appraisalPersonalDevelopment" id="appraisalPersonalDevelopment4" value="Dissatisfied">Dissatisfied  不满意 
                        </label>
                        <label class="col-md-3">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalPersonalDevelopment" name="appraisalPersonalDevelopment" id="appraisalPersonalDevelopment5" value="Very Dissatisfied">Very Dissatisfied 非常不满意 
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-gray-light">Company Management 公司管理</td>
                    <td>
                      <div class="radio">
                        <label class="col-md-3" style="width: 20%">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCompanyManagement" name="appraisalCompanyManagement" id="appraisalCompanyManagement1" value="Very Satisfied">Very Satisfied  非常满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCompanyManagement" name="appraisalCompanyManagement" id="appraisalCompanyManagement2" value="Satisfied">Satisfied 满意 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCompanyManagement" name="appraisalCompanyManagement" id="appraisalCompanyManagement3" value="General">General 一般 
                        </label>
                        <label class="col-md-2">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCompanyManagement" name="appraisalCompanyManagement" id="appraisalCompanyManagement4" value="Dissatisfied">Dissatisfied  不满意 
                        </label>
                        <label class="col-md-3">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.appraisalCompanyManagement" name="appraisalCompanyManagement" id="appraisalCompanyManagement5" value="Very Dissatisfied">Very Dissatisfied 非常不满意 
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- only for VWATJ -->
            <div class="form-group col-md-12">
              <label>Q2. The relationship between your new employer and Volkswagen Automatic Transmission (Tianjin) Co., Ltd. is: <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您将加入的新公司与大众汽车自动变速器（天津）有限公司关系是：</label>
              <div class="radio no-margin overflow-auto bg-gray-light" style="padding: 10px">
                <label class="col-md-2" style="width: 170px;">
                  <input type="checkbox" @change="relationshipTianjinCheck" :disabled="readonlyHrbpPreparation" v-model="relationship" id="relationshipTianjin1" value="Competitor 竞争者"> Competitor 竞争者
                </label>
                <label class="col-md-2" style="width: 150px;">
                  <input type="checkbox" @change="relationshipTianjinCheck" :disabled="readonlyHrbpPreparation" v-model="relationship" id="relationshipTianjin2" value="Supplier 供应商"> Supplier 供应商
                </label>
                <label class="col-md-2" style="width: 150px;">
                  <input type="checkbox" @change="relationshipTianjinCheck" :disabled="readonlyHrbpPreparation" v-model="relationship" id="relationshipTianjin3" value="Customer 客户"> Customer 客户
                </label>
                <label class="col-md-3" style="width: 310px;">
                  <input type="checkbox" @change="relationshipTianjinCheck" :disabled="readonlyHrbpPreparation" v-model="relationship" id="relationshipTianjin4" value="Volkswagen Group Internal 大众集团内部"> Volkswagen Group Internal 大众集团内部
                </label>
                <label class="col-md-2" style="width: 130px;">
                  <input type="checkbox" @change="relationshipTianjinCheck" :disabled="readonlyHrbpPreparation" v-model="relationship" id="relationshipTianjin5" value="Others 其他"> Others 其他
                </label>
                <label v-if="relationshipTianjinOther">
                  <textarea  style="resize:vertical;" :class="{'form-control':true,'pull-left': true,'input':true }" id="relationshipTianjinothers" rows="1" name ="relationshipTianjinothers"  placeholder="" v-validate="'required'" v-model="form.relationshipTianjinothers" @blur="relationshipTianjinothersCheck" :disabled="readonlyHrbpPreparation" ></textarea>
                  <p>{{$t("textareaNoticeComment")}}</p>
                </label>
              </div>
              <form-group col="md-12" type="hidden"  v-model="form.relationshipTianjin" name="relationshipTianjin" />
            </div>
            
            <div class="form-group col-md-12">
              <label>Q3. During the employment period, are you aware of any non-compliant action or behavior? If yes, please specify which kind of ? <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您在职期间是否发现有违规范的行动或行为？如是，请具体说明何种行为？</label>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td class="bg-gray-light" style="width: 120px;">
                      <div class="radio no-margin overflow-auto bg-gray-light">                
                        <label class="col-md-12">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.boolNoncompliantAction" name="boolNoncompliantAction" id="boolNoncompliantAction1" value="Yes" @change="noncompliantActionCheck">Yes
                        </label>
                      </div>
                    </td>
                    <td v-if="actionCommentO">
                      <textarea  style="resize:vertical;" :class="{'form-control':true,'pull-left': true,'input':true }" id="actionComment" rows="1" name ="actionComment"  placeholder="" v-validate="'required'" v-model="form.actionComment" @blur="actionCommentCheck" :disabled="readonlyHrbpPreparation" ></textarea>
                      <p>{{$t("textareaNoticeComment")}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="bg-gray-light">
                      <div class="radio no-margin overflow-auto bg-gray-light">                
                        <label class="col-md-12">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.boolNoncompliantAction"  name="boolNoncompliantAction" id="boolNoncompliantAction2" value="No" @change="noncompliantActionCheck">No
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="form-group col-md-12">
              <label>Q4. Do you want to be rehired by VWATJ? 您是否愿意被VWATJ重新雇佣？</label>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td class="bg-gray-light" style="width: 120px;">
                      <div class="radio no-margin overflow-auto bg-gray-light">                
                        <label class="col-md-12">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.boolRehired" name="boolRehired" id="rehired1" value="Yes">Yes
                        </label>
                      </div>
                    </td>
                    <td colspan="2" class="bg-gray-light">
                      <div class="radio no-margin overflow-auto bg-gray-light">                
                        <label class="col-md-12">
                          <input type="radio" :disabled="readonlyHrbpPreparation" v-model="form.boolRehired" name="boolRehired" id="rehired2" value="No">No
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
					</div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="hrbpDiv2" v-if="this.hrbp2Display">
          <div class="box-header with-border">
            <h3 class="box-title">Non-Competition Agreement Status 竞业限制协议状态</h3>
            <div class="box-tools pull-right">
              <button type="button" :class="this.btnClass1" data-toggle="collapse" id="minusplusbtnwpedHrbp2" href="#collapseHrbp2"><i :class="this.iClassPlus1" id="minusplusiwpedHrbp2"></i></button>
            </div>
          </div>
          <form role="form" id="collapseHrbp2" :class="this.formClassCollapse1">
            <div class="box-body">
              <div class="form-group overflow-auto ">
                <label>Whether the Employee has signed on the Non-Competition agreement 员工是否签署竞业限制协议</label>
                  <div class="radio no-margin overflow-auto">                
                      <label class="col-md-2" style="width: 150px">
                        <input type="radio" v-model="form.boolSignedAgreement" :disabled='signedAgreementDisabled' name="boolSignedAgreement" id="boolSignedAgreement1" value="Y">Yes <small>员工签署</small>
                      </label>
                      <label class="col-md-2">
                        <input type="radio" v-model="form.boolSignedAgreement" :disabled='signedAgreementDisabled' name="boolSignedAgreement" id="boolSignedAgreement2" value="N">No <small>员工未签署</small>
                      </label>
                      <!--form.boolSignedAgreement:{{form.boolSignedAgreement}}-->
                  </div>
                </div>
                <hr>
                <!-- 4 Confirmer –Department Head <label>确认者-部门领导 -->
                <div class="form-group overflow-auto" id="departmentHeadDiv" v-if="this.departmentHeadDisplay">
                  <div class="radio no-margin overflow-auto"> 
                      <label class="col-md-12">
                        <input type="radio" :disabled="clauseExecutionDisabled" v-model="form.boolClauseExecution"  name="boolClauseExecution" id="boolClauseExecution1" value="Yes">
                        The company hereby confirms in writing to <b>retain</b> the execution of this clause. 公司书面确认<b>保有</b>此条款的执行。
                      </label>
                        <br />
                      <label class="col-md-12">
                        <input type="radio" :disabled="clauseExecutionDisabled" v-model="form.boolClauseExecution"  name="boolClauseExecution" id="boolClauseExecution2" value="No">
                        The company hereby confirms in writing to <b>waive</b> the execution of this clause. 公司书面确认<b>放弃</b>此条款的执行。
                      </label>
                  </div>
                </div>
              </div>
          </form>
    </div>

    <div class="box box-primary" id="directiveSupervisorDiv" v-if="this.directiveSupervisorDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">Work Handover <label>工作交接</label>(Disciplinary Supervisor)</h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedDs" href="#collapseDS"><i :class="this.iClassPlus" id="minusplusiwpedDs"></i></button>
        </div>
			</div>
      <form role="form" id="collapseDS" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <table id="DirectSupervisorTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe " style="width: 70%">Item<br />事项</th>
                    <th class="text-center is-safe " style="width: 30%">Checked<br />检查确认</th>
                    <!-- <td class="text-center is-safe " style="width: 15%"></td>-->
                  </tr>
                  <tr>
                    <td class="is-safe">Work Handover to Successor 已完成交接：</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" v-model="form.boolHandover" :disabled="readonlyHrbpPreparation || deputyDirect" name="boolHandover" id="boolHandover" value="Yes">
                    </td>
                    <!--  <td class="is-safe"></td>-->
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group col-md-11" v-if="this.uploadDsShow">
              <label v-if="directiveSupervisorA">Upload Attachment 上传附件：</label>
              <label v-else>Attachment 附件：</label>
              <br /><br />
		          <upload3 :readonly="readonlyHrbpPreparation || deputyDirect" v-model="form.dsId" name="dsId" buttonText="Attachment" :attachments="form.dsAttachments" multi="true"></upload3>
			      </div>
					</div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="administrationDeptDiv" v-if="this.administrationDeptDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">Administration Department <label>行政部门</label></h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedDept" href="#collapseDepartment"><i :class="this.iClassPlus" id="minusplusiwpedDept"></i></button>
        </div>
        <p v-if="this.dept2Display"><span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>
        Due to the information delay of the traffic management system, if any new traffic violations showed after your leaving, Admin will contact you and you are obliged to cooperate with Admin in handling those violations. 
        由于违章系统信息延迟，无法在您还车时查到所有的违章情况，如发现新的交通违章，行政将及时联系您，您有义务配合行政处理这些违章。
        </span></p>
			</div>
      <form role="form" id="collapseDepartment" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <table id="DepartmentTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 50%" >Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 15%" >Checked<br />检查确认</th>
                    <th class="text-center is-safe" style="width: 35%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                  </tr>
                  <tr v-if="this.dept1Display">
                    <td class="is-safe">Return Employee Card 员工卡</td>
                    <td class="text-center is-safe" >
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept1" v-model="form.boolReturnEmployeeCard" name="boolReturnEmployeeCard" id="boolReturnEmployeeCard" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept1" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="employeeCardRemark" id="employeeCardRemark" v-model="form.employeeCardRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.dept1Display">
                    <td class="is-safe">Office Key (if any) 办公室钥匙（如有）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept1" v-model="form.boolReturnOfficeKey" name="boolReturnOfficeKey" id="boolReturnOfficeKey" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept1" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="officeKeyRemark" id="officeKeyRemark" v-model="form.officeKeyRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.dept1Display">
                    <td class="is-safe">Office Drawer Key 办公室抽屉钥匙</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept1" v-model="form.boolReturnOfficeDrawerKey" name="boolReturnOfficeDrawerKey" id="boolReturnOfficeDrawerKey" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept1" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="officeDrawerKeyRemark" id="officeDrawerKeyRemark" v-model="form.officeDrawerKeyRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.dept2Display">
                    <td class="is-safe">Return Company Car 公务车<br />
                      <!--
                      Due to the information delay of the traffic management system, if any new traffic violations showed after your leaving, Admin will contact you and you are obliged to cooperate with Admin in handling those violations.
                      由于违章系统信息延迟，无法在您还车时查到所有的违章情况，如发现新的交通违章，行政将及时联系您，您有义务配合行政处理这些违章。
                      -->
                    </td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept2" v-model="form.boolReturnCompanyCar" name="boolReturnCompanyCar" id="boolReturnCompanyCar" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept2" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="companyCarRemark" id="companyCarRemark" v-model="form.companyCarRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.dept3Display">
                    <td class="is-safe">Dormitory Check-out (if any) 宿舍退宿（如有）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept3" v-model="form.boolReturnDormitory" name="boolReturnDormitory" id="boolReturnDormitory" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept3" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="dormitoryRemark" id="dormitoryRemark" v-model="form.dormitoryRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.dept4Display">
                    <td class="is-safe">Return Key of Locker (if any) 更衣柜钥匙（如有）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept4" v-model="form.boolReturnLockeKey" name="boolReturnLockeKey" id="boolReturnLockeKey" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept4" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="lockeKeyRemark" id="lockeKeyRemark" v-model="form.lockeKeyRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.dept4Display">
                    <td class="is-safe">Return Work Clothes 工服
                      <!--
                      <input type="text" @input="oninputNumClothes" :disabled="readonlyHrbpPreparation || deputyDept4" name="returnClothesCount" v-model="form.returnClothesCount" style="width: 60px" >Sets 套<br />
                      -->
                    </td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyDept4" v-model="form.boolReturnClothes" name="boolReturnClothes" id="boolReturnClothes" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyDept4" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="clothesRemark" id="clothesRemark" v-model="form.clothesRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="ehsDeptDiv" v-if="this.ehsDeptDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">EHS Department <label>EHS 部门</label></h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedEHS" href="#collapseEHS"><i :class="this.iClassPlus" id="minusplusiwpedEHS"></i></button>
        </div>
			</div>
      <form role="form" id="collapseEHS" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6" >
              <table id="EHSTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe " style="width: 65%">Item<br />事项</th>
                    <th class="text-center is-safe " style="width: 35%">Checked<br />检查确认</th>
                  </tr>
                  <tr v-if="this.ehsTrDisplay" >
                    <td class="is-safe">Return Safety Shoes 安全鞋
                      <input type="text" @input="oninputNum" :disabled="readonlyHrbpPreparation || deputyEhs" v-model="form.returnShoesCount" name="returnShoesCount" style="width: 60px"> Pairs 双
                    </td>
                    <td class="text-center is-safe ">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyEhs" v-model="form.boolReturnShoes" name="boolReturnShoes" id="boolReturnShoes" value="Yes">
                    </td>
                    <!--<td class="is-safe"></td>-->
                  </tr>
                  <tr v-if="this.ehsTrDisplay" >
                    <td class="is-safe ">Return Safety Hats (only applicable during the construction phase of the factory) 安全帽（仅适用于工厂建设阶段）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyEhs" v-model="form.boolReturnHats" name="boolReturnHats" id="boolReturnHats" value="Yes">
                    </td>
                    <!--<td class="is-safe"></td>-->
                  </tr>
                  <tr v-if="this.ehsOhcTrDisplay">
                    <td class="is-safe ">Occupational Health Checkup 职业健康检查</td>
                    <td class="text-center is-safe ">
                      <form-group type="select" haslable="false" :disabled="readonlyHrbpPreparation || deputyEhsOhc" other-rules="required" uri="/eclosingApplication/reasonlist?groupName=Occupational Physical Examination" v-model="form.boolExamination" name="boolExamination"/>
                      <!--
                      <select class="form-control" style="width:180px;" :disabled="readonlyHrbpPreparation || deputyEhsOhc" v-model="form.boolExamination" name="boolExamination">
                        <option value="">-- Please select--</option>
                        <option value="Not Required 不需要">Not Required 不需要</option>
                        <option value="Pass 通过">Pass 通过</option>
                        <option value="Not Pass 未通过">Not Pass 未通过</option>
                      </select>-->
                    </td>
                    <!--<td class="is-safe"></td>-->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="hrTrainingDiv" v-if="this.hrTrainingDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">HR Dept -Training <label>人力资源部-培训</label></h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedTraining" href="#collapseTraining"><i :class="this.iClassPlus" id="minusplusiwpedTraining"></i></button>
        </div>
			</div>
      <form role="form" id="collapseTraining" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <table id="TrainingTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 50%" >Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 15%" >Checked<br />检查确认</th>
                    <th class="text-center is-safe" style="width: 35%">Amount (if any)<br />金额（如有）</th>
                  </tr>
                  <tr>
                    <td class="is-safe">Training Expense Refund 培训费用返还金额</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyTraining" v-model="form.boolRefundTrainingExpense" name="boolRefundTrainingExpense" id="boolRefundTrainingExpense" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyTraining" @change="oninputTraining" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="trainingExpenseRefundRemark" id="trainingExpenseRefundRemark" v-model="form.trainingExpenseRefundRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-12" id="TrainingTable" v-if="this.form.trainingExpenseRefundRemark && this.form.trainingExpenseRefundRemark !='0' ">
              <font style="font-size:14px;">Detail 详情</font>
                <table class="table table-bordered mar-bot-0" width="100%" height="15px" id="extendNon">
                  <tbody>
                  <tr>
                    <th class="text-center" width="20%">Category 类别</th>
                    <th class="text-center" width="20%">Name 名称</th>
                    <th class="text-center" width="20%">Bond Period 绑定期限起止</th>
                    <th class="text-center" width="20%">Amount 金额</th>
                    <th  width="5%" v-if="!(readonlyHrbpPreparation || deputyTraining)" class="text-center" > <!--v-if="!readonly"-->
                      <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.eclosingTrainingList" style="height: 15px;">
                    <td>
                      <input type="hidden" class="form-control" id="" v-model="entry.id">                    
                      <form-group type="input" other-rules="required" haslable="false" :disabled="readonlyHrbpPreparation || deputyTraining"  :name="'trainingCategory'+(index+1)" :id="'trainingCategory'+index" v-model="entry.trainingCategory"  ></form-group>				
									  </td>
                    <td>
                      <form-group type="input" other-rules="required" haslable="false" :disabled="readonlyHrbpPreparation || deputyTraining"  :name="'trainingName'+(index+1)" :id="'trainingName'+index" v-model="entry.trainingName"  ></form-group>				
									  </td>
                    <td>
                      <form-group type="daterangepicker" haslable="false" :disabled="readonlyHrbpPreparation || deputyTraining"  :name="'bondPeriod'+(index+1)" :id="'bondPeriod'+index" v-model="entry.bondPeriod"  ></form-group>				
									  </td>
                    <td>
                      <form-group type="input" other-rules="required" @change="inputAmount(index)" haslable="false" :disabled="readonlyHrbpPreparation || deputyTraining" :name="'amount'+(index+1)"  v-model="entry.amount" :id="'amount'+index"></form-group>				
										</td>
                    <td v-if="!readonlyHrbpPreparation" class="text-center" style="vertical-align: middle;">
                      <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div> 


          </div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="hrbpDeptDiv" v-if="this.hrbpDeptDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">HR - HRBP <label>人力资源HRBP</label></h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedHRBP" href="#collapseHRBP"><i :class="this.iClassPlus" id="minusplusiwpedHRBP"></i></button>
        </div>
			</div>
      <form role="form" id="collapseHRBP" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-12">
              <table id="HRBPTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 30%">Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 20%">Checked<br />检查确认</th>
                    <th class="text-center is-safe" style="width: 24%">Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 8%">Checked<br />检查确认</th>
                    <th class="text-center is-safe" style="width: 18%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                  </tr>
                  <tr>
                    <td class="is-safe">Unused Annual Leave 剩余年假</td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyHrbp" @change="oninputUnusedAnnualLeave" type="input" :class="{'form-control':true,'pull-left': true,'input':true  }" name="unusedAnnualLeaveRemark" id="unusedAnnualLeaveRemark" v-model="form.unusedAnnualLeaveRemark" placeholder="Days" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;Days</div>
                      </div>
                      <!--
                      <input :disabled="readonlyHrbpPreparation || deputyHrbp" class="form-control input-sm" v-model="form.unusedAnnualLeaveRemark" name="unusedAnnualLeaveRemark" id="unusedAnnualLeaveRemark" type="number" @change="oninputUnusedAnnualLeave" style="width:120px;" placeholder="Days">
                      -->
                    </td>
                    <td class="is-safe">Hukou Bond Refund 户口绑定返还金额</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolHukouBond" name="boolHukouBond" id="boolHukouBond" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyHrbp" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="hukouBondRefundRemark" id="hukouBondRefundRemark" v-model="form.hukouBondRefundRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">Overtime 加班</td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyHrbp" @change="oninputOvertime" type="input" :class="{'form-control':true,'pull-left': true,'input':true }" name="overtimeRemark" id="overtimeRemark" v-model="form.overtimeRemark" placeholder="Hours" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;Hours</div>
                      </div>
                    </td>
                    <td class="is-safe">Return Employee Handbook 归还员工手册</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolReturnHandbook" name="boolReturnHandbook" id="boolReturnHandbook" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyHrbp" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="handbookRemark" id="handbookRemark" v-model="form.handbookRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">Resignation Letter 辞职信</td>
                    <td class="text-center is-safe">
                    <!--  <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolTerminationLetter" name="boolTerminationLetter" id="boolTerminationLetter" value="Yes"> -->
                      <div class="radio mar-top-0 ">
                        <label>
                          <input type="radio" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolTerminationLetter" name="boolTerminationLetter" value="Yes">Yes
                        </label>
                        <label class="mar-left-20">
                          <input type="radio" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolTerminationLetter" name="boolTerminationLetter" value="No">No
                        </label>
                        <label class="mar-left-20">
                          <input type="radio" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolTerminationLetter" name="boolTerminationLetter" value="NA">NA
                        </label>
                      </div>
                    </td>
                    <td v-if="form.notLC" class="is-safe">Company Credit Card 公司信用卡</td>
                    <td v-if="form.notLC" class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolCreditCardAccount" name="boolCreditCardAccount" id="boolCreditCardAccount" value="Yes">
                    </td>
                    <td v-if="form.notLC" class="text-left is-safe"></td>
                  </tr>
                  <tr v-if="this.form.ifFseLe">
                    <td class="is-safe ">Return Work Permit to FSE/LE Consultant (if any) 归还外国人就业证明</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolReturnWorkPermit" name="boolReturnWorkPermit" id="boolReturnWorkPermit" value="Yes">
                    </td>
                    <td class="is-safe">Settlement of Home Leave Budget Account 结算探亲预算</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolHomeLeaveAccount" name="boolHomeLeaveAccount" id="boolHomeLeaveAccount" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyHrbp" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="homeLeaveAccountRemark" id="homeLeaveAccountRemark" v-model="form.homeLeaveAccountRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="this.form.ifFseLe">
                    <td class="is-safe">Accommodation Registration Form 住宿备查卡</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyHrbp" v-model="form.boolAccommodationReg" name="boolAccommodationReg" id="boolAccommodationReg" value="Yes">
                    </td>
                    <td class="text-center is-safe" colspan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="itDeptDiv" v-if="this.itDeptDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">IT Department <label>IT 部门</label></h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedIT" href="#collapseIT"><i :class="this.iClassPlus" id="minusplusiwpedIT"></i></button>
        </div>
			</div>
      <form role="form" id="collapseIT" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-12">
              <table id="ITTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 24%">Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 8%">Checked<br />检查确认</th>
                    <th class="text-center is-safe" style="width: 18%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                    <th class="text-center is-safe" style="width: 35%">Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 15%">Checked<br />检查确认</th>
                    <!--
                    <th class="text-center is-safe" style="width: 18%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                    -->
                  </tr>
                  <tr>
                    <td class="is-safe">Return Company SIM Card (if have)<br />归还公司SIM卡（如有）
                      <input type="text" @change="getPhoneNumber" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.mobilePhoneNumber" name="mobilePhoneNumber" style="width: 200px" placeholder="Mobile Phone Number">
                    </td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolReturnSimCard" name="boolReturnSimCard" id="boolReturnSimCard" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <!--
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="simCardRemark" id="simCardRemark" v-model="form.simCardRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>-->
                    </td>
                    <td class="is-safe">Close Intranet Accounts and Email Address<br />关闭内网账户和电子邮件 </td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolCloseEmailIntranet" name="boolCloseEmailIntranet" id="boolCloseEmailIntranet" value="Yes">
                    </td>
                    <!--
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="closeEmailIntranetRemark" id="closeEmailIntranetRemark" v-model="form.closeEmailIntranetRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>-->
                  </tr>
                  <tr>
                    <!--
                    <td class="is-safe">Mobile Phone Number (if any)  手机号（如有）
                      <input type="text" @change="getPhoneNumber" :disabled="readonlyHrbpPreparation" v-model="form.mobilePhoneNumber" name="mobilePhoneNumber" style="width: 200px" placeholder="Mobile Phone Number">
                    </td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolPhoneNumber" name="boolPhoneNumber" id="boolPhoneNumber" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="phoneNumberRemark" id="phoneNumberRemark" v-model="form.phoneNumberRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>-->
                    <td class="is-safe">Return Company Mobile Phone (if have) <br />归还公司手机（如有）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolReturnMobilePhone" name="boolReturnMobilePhone" id="boolReturnMobilePhone" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="mobilePhoneRemark" id="mobilePhoneRemark" v-model="form.mobilePhoneRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>

                    <td class="is-safe">Close SAP and KSRM Account (if have) <br />关闭SAP和KSRM系统账户（如有）</td>
                      <td class="text-center is-safe">
                        <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolCloseSap" name="boolCloseSap" id="boolCloseSap" value="Yes">
                      </td>
                      <!--
                      <td class="text-center is-safe">
                        <div class="form-group">
                          <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="closeSapRemark" id="closeSapRemark" v-model="form.closeSapRemark" placeholder="Amount" >
                          <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                        </div>
                      </td>-->
                  </tr>
                  <tr>
                    <td class="is-safe">Return Company Computer (Desktop/ Laptop/ Monitor) <br />归还电脑（台式机/笔记本/显示器）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolReturnPc" name="boolReturnPc" id="boolReturnPc" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="pcRemark" id="pcRemark" v-model="form.pcRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                    <td class="is-safe">Close All Other System Accounts (if have)<br>关闭其它系统账户（如有）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolCloseOtherAccounts" name="boolCloseOtherAccounts" id="boolCloseOtherAccounts" value="Yes">
                    </td>
                    <!--
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="colseOtherAccountsRemark" id="colseOtherAccountsRemark" v-model="form.colseOtherAccountsRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>-->
                  </tr>
                  <tr>
                    <td class="is-safe">Return Other Company Assets (Pad/ Mobile hard disk/ USB stick…)<br />其它公司财产（如Pad/移动硬盘/USB…等）</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolReturnOtherAssets" name="boolReturnOtherAssets" id="boolReturnOtherAssets" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="otherAssetsRemark" id="otherAssetsRemark" v-model="form.otherAssetsRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                    <td class="is-safe">Turn-off Phone Number and Voicemail<br />关闭电话姓名显示和语音信箱</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" v-model="form.boolChangeNameOnTelephone" name="boolChangeNameOnTelephone" id="boolChangeNameOnTelephone" value="Yes">
                    </td>
                    <!--
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="nameOnTelephoneRemark" id="nameOnTelephoneRemark" v-model="form.nameOnTelephoneRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>-->
                  </tr>
                  <tr v-if="this.form.ifFse"><!--v-if="this.form.ifFse"-->
                    <td class="is-safe">Settlement of Private Call Cost (FSE only)<br />结算私人话费（仅适用于FSE）</td>
                    <td class="text-center is-safe" >
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyIT" @change="checkboxDoneIT"  v-model="boolCallCost" name="boolCallCost" id="boolCallCost" value="Yes">
                    </td>
                    <td class="text-center is-safe" >
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyIT" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="settlementCallCostRemark" id="settlementCallCostRemark" v-model="form.settlementCallCostRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                    <td class="text-center is-safe" colspan="2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="financeAccountingDiv" v-if="this.financeAccountingDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">Finance - Accounting <label>财务会计</label></h3>
        <a type="button" href="###" style="padding-right: 0;" :title="this.titleTips" class="btn"> 
        <i class="fa fa-info-circle" style="font-size: 20px;"></i></a>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedAccounting" href="#collapseAccounting"><i :class="this.iClassPlus" id="minusplusiwpedAccounting"></i></button>
        </div>
			</div>
      <form role="form" id="collapseAccounting" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <table id="AccountingTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 50%" >Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 15%" >Checked<br />检查确认</th>
                    <th class="text-center is-safe" style="width: 35%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                  </tr>
                  <tr>
                    <td class="is-safe">Advance Money from Company 员工借款</td>
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation || deputyAccounting" v-model="form.boolAdvanceCompany" name="boolAdvanceCompany" id="boolAdvanceCompany" value="Yes">
                    </td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonlyHrbpPreparation || deputyAccounting" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="advanceFromCompanyRemark" id="advanceFromCompanyRemark" v-model="form.advanceFromCompanyRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="box box-primary" id="hrcbDiv" v-if="this.hrcbDisplay"><!---->
      <div class="box-header with-border">
			  <h3 class="box-title">HR - C&B <label>人力资源-薪酬福利部</label></h3>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedHRCB" href="#collapseHRCB"><i :class="this.iClassPlus" id="minusplusiwpedHRCB"></i></button>
        </div>
			</div>
		<form role="form" id="collapseHRCB" :class="this.formClassCollapse">
			<div class="box-body">
				<div class="row">
					<div class="form-group col-md-12">
						<table id="HrcbTable" class="table table-bordered table-hover table-permanent-position">
							<tbody>
								<tr>
									<th class="text-center is-safe" style="width: 24%">Item<br />事项</th>
									<th class="text-center is-safe" style="width: 8%">Checked<br />检查确认</th>
									<th class="text-center is-safe" style="width: 18%">Amount (if any)<br />金额（如有）</th>
									<th class="text-center is-safe" style="width: 24%">Item<br />事项</th>
									<th class="text-center is-safe" style="width: 8%">Checked<br />检查确认</th>
									<th class="text-center is-safe" style="width: 18%">Amount (if any)<br />金额（如有）</th>
								</tr>
								<tr>
									<td class="is-safe">Net Pay 应付工资（税后） </td>
									<td class="text-center is-safe">
									  <input type="checkbox" :disabled="readonlyHrbpPreparation" v-model="form.boolNetPay" name="boolNetPay" id="boolNetPay" value="Yes">
									</td>
									<td class="text-center is-safe">
									  <div class="form-group"><!--@change="oninputHrcb"-->
										<input style="width: 70%" :disabled="readonlyHrbpPreparation" @change="oninputHrcb"  type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="netPayRemark" id="netPayRemark" v-model="form.netPayRemark" placeholder="Amount" >
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
									  </div>
									</td>
									<td class="is-safe">Other Deductions (if any) 其他扣减项（如有）</td>
									<td class="text-center is-safe">
									  <input type="checkbox" :disabled="readonlyHrbpPreparation" v-model="form.boolDeductions" name="boolDeductions" id="boolDeductions" value="Yes">
									</td>
									<td class="text-center is-safe">
									  <div class="form-group">
										<input style="width: 70%" :disabled="readonly" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="otherDeductionsRemark" id="otherDeductionsRemark" v-model="form.otherDeductionsRemark" placeholder="Amount" >
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
									  </div>
									</td>
								</tr>
								<tr v-if="this.form.ifFseLe">
									<td class="is-safe" v-if="this.form.ifFse">Social Insurance 社会保险</td>
									<td class="text-center is-safe" v-if="this.form.ifFse">
									  <input type="checkbox" :disabled="readonlyHrbpPreparation" v-model="form.boolSocialInsurance" name="boolSocialInsurance" id="boolSocialInsurance" value="Yes">
									</td>
									<td class="text-center is-safe" v-if="this.form.ifFse">
									  <div class="form-group">
										<input style="width: 70%" :disabled="readonlyHrbpPreparation" @change="oninput" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="socialInsuranceRemark" id="socialInsuranceRemark" v-model="form.socialInsuranceRemark" placeholder="Amount" >
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
									  </div>
									</td>
									<td class="is-safe" v-if="this.form.ifFseLe">Social Insurance by 社会保险至 
                    <input type="text" @change="oninputNumYear" :disabled="readonlyHrbpPreparation" v-model="form.socialInsuranceYear" name="socialInsuranceYear" style="width: 20%" />年
										<!--
                    <form-group type="select" style="width: 160px;" :disabled="readonlyHrbpPreparation" haslable="false" other-rules="required" uri="/eclosingApplication/reasonlist?groupName=Month" v-model="form.socialInsuranceMonth" name="socialInsuranceMonth" label="EclosingApplication.socialInsuranceMonth" />   
                    -->
                    <select :disabled="readonlyHrbpPreparation" v-model="form.socialInsuranceMonth" name="socialInsuranceMonth" >
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="22">11</option>
											<option value="12">12</option>
										</select>
                    月
                  </td>
									<td class="text-center is-safe" colspan="2" v-if="this.form.ifFseLe"></td>
								</tr>
								<tr style="height:50px" v-if="this.form.ifLc">
									<td class="is-safe">Social Insurance by 社会保险至 
										<input type="text" @change="oninputNumYear" :disabled="readonlyHrbpPreparation" v-model="form.socialInsuranceYear" name="socialInsuranceYear" style="width: 15%" />年
										<select :disabled="readonlyHrbpPreparation" v-model="form.socialInsuranceMonth" name="socialInsuranceMonth" >
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="22">11</option>
											<option value="12">12</option>
										</select>月</td>
									<td class="text-center is-safe" colspan="2"></td>
									<td class="is-safe">Housing Fund by 公积金至 
										<input type="text" @change="oninputNumYear" :disabled="readonlyHrbpPreparation" v-model="form.housingFundYear" name="housingFundYear" style="width: 15%" />年
										<select :disabled="readonlyHrbpPreparation" v-model="form.housingFundMonth" name="housingFundMonth" >
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="22">11</option>
											<option value="12">12</option>
										</select>月</td>
									<td class="text-center is-safe" colspan="2"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
        <div class="row">
          <form-group col="md-3" type="input" v-model="form.netPayFinal" name="netPayFinal" disabled="true" label="EclosingApplication.netPayFinal"></form-group>
          <input type="hidden" name="minusNetPayRemark" id="minusNetPayRemark" v-model="form.minusNetPayRemark" >
        </div>
			</div>
		</form>
    </div>
    <div class="box box-primary" id="financeCashierDiv" v-if="this.financeCashierDisplay">
      <div class="box-header with-border">
			  <h3 class="box-title">Finance - Cashier <label>财务出纳</label></h3>
        <div class="box-tools pull-right">
          <button type="button" :class="this.btnClass" data-toggle="collapse" id="minusplusbtnwpedCahier" href="#collapseCahier"><i :class="this.iClassPlus" id="minusplusiwpedCahier"></i></button>
        </div>
			</div>
      <form role="form" id="collapseCahier" :class="this.formClassCollapse">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-12">
              <table id="CahierTable" class="table table-bordered table-hover table-permanent-position">
                <tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 30%">Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 20%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                    <th class="text-center is-safe" style="width: 30%">Item<br />事项</th>
                    <th class="text-center is-safe" style="width: 20%">Deduction Amount (if any)<br />扣除金额（如有）</th>
                  </tr>
                  <tr>
                    <td class="is-safe">Net Pay Settlement (for minus) 应付工资清算（有欠款）</td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonly" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="minusNetPayRemark" id="minusNetPayRemark" v-model="form.minusNetPayRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                    <td class="is-safe">Hukou Bond Settlement 户口绑定清算</td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonly" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="hukouBondSettlementRemark" id="hukouBondSettlementRemark" v-model="form.hukouBondSettlementRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">Training Expense Settlement 培训费用清算</td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonly" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="trainingExpenseRemark" id="trainingExpenseRemark" v-model="form.trainingExpenseRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                    <td class="is-safe">Return Advance Money from Company 员工借款</td>
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonly" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="reAdvanceFromCompanyRemark" id="reAdvanceFromCompanyRemark" v-model="form.reAdvanceFromCompanyRemark" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="is-safe">Total Amount 总金额</td>
                    <!--
                    <td class="text-center is-safe">
                      <input type="checkbox" :disabled="readonlyHrbpPreparation" v-model="form.boolTotalAmount" name="boolTotalAmount" id="boolTotalAmount" value="Yes">
                    </td>
                    -->
                    <td class="text-center is-safe">
                      <div class="form-group">
                        <input style="width: 70%" :disabled="readonly" type="text" :class="{'form-control':true,'pull-left': true,'input':true  }" name="totalAmount" id="totalAmount" v-model="form.totalAmount" placeholder="Amount" >
                        <div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
                      </div>
                    </td>
                    <td class="text-center is-safe" colspan="2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--
          <div class="row">
            <form-group col="md-3" type="input" v-model="form.netPayFinal" name="netPayFinal" disabled="true" label="EclosingApplication.netPayFinal"></form-group>
          </div>-->
        </div>
      </form>
    </div>

	    <!--
      <input type="button"  name="testApprovel" value="测试审批人approvel" @click="beforeapprovel" v-if="this.form.status==1">
      
      <input type="button"  name="testP" value="测试申请人submit" @click="beforesubmit" v-if="this.form.status==2 || this.form.status== null">
      -->
      <commentMax v-if="processTaskId !=null && form.status != 9 && form.status != 2 && ckeckInApproveFlow && deputySelfApprove " v-model="form.approval.approvalRemark" name="approval.approvalRemark"></commentMax>
      
      <!-- 普通审批的save\approve\back 按钮  -->
      <ConfirmwithsaveShow id="EclosingApplicationS" v-if="this.confirmwithsaveBtn && form.status != 9 && form.status != 2 && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Confirm" uri="/eclosingApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></ConfirmwithsaveShow>
      <!-- Direct supervisor 无save 有reject-->
      <Confirmwithreject v-else-if="this.confirmRejectBtn  && deputySelfApprove && form.status != 9 && form.status != 2 && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Confirm" rejectLableName="Reject" uri="/eclosingApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></Confirmwithreject>
      <!-- Head of HR Operation的approve\back按钮 -->
      <ConfirmShow id="EclosingApplicationC" v-else-if="this.confirmBtn && form.status != 9 && form.status != 2 && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Confirm" uri="/eclosingApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></ConfirmShow>
      
      <!-- 平行审批HRBP的save\approve\print\back按钮  -->
      <ConfirmwithSavePrint id="EclosingApplicationSP" entityId="EclosingApplication" v-else-if="this.confirmwithSavePrintBtn && form.status != 9 && form.status != 2 && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)"  :form="form" :validator="this.$validator" lableName="Confirm" uri="/eclosingApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></ConfirmwithSavePrint>
      
      <!-- 最后一步 HRBP preparation 审批的 approve\print\back按钮-->
      <ConfirmWithPrint id="EclosingApplicationCP" entityId="EclosingApplication" v-else-if="this.confirmWithPrintBtn && form.status != 9 && form.status != 2 && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)"  :form="form" :validator="this.$validator" lableName="Confirm" uri="/eclosingApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></ConfirmWithPrint>

      <router-view id="EclosingApplicationSubmit" v-else :form="form" entityId="EclosingApplication" approveLableName="Confirm" vclass="btn-left" uri="/form/EclosingApplication/update" :validator="this.$validator"  v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel"></router-view>      
      
      <br />
      <comment-list v-if="form.processInstanceId !=null"></comment-list>
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
var ok = false;
export default {
  name: "EclosingApplication",
  methods: {
	checkStatus: function(status) {
		//BR.001
		if(status == 1 && this.$route.query.taskKey == null && this.$route.query.processInstanceId == null){
      //需要判断当前角色，再弹出该提示框：HRBP和申请人本人的时候弹出
      //判断入口：
      $.alertApon('Employee has an E-Closing application with open status already, please update and submit pervious un-finished application. 此员工已有未完成的E-Closing申请单，请更新并提交上次未完成的申请单');
      var router = this.$router;
			if(process.env.MODE === 'dev'){//原来是apon  看dev.env.js文件中的配置
				top.location.href = Config.getAPONURL();//看http.js文件 原来是getAPONURL
			}else{
				router.push({ path: '/index/application'});
			}
		}
	},
	onselect: function() {
		var temp = $("#selectanemployee").is(':checked');
    this.selectanemployee = temp;
		if(!temp){
			var me = this;
			this.GL.actUtil.query("post","/eclosingApplication/selfApply?eclId="+this.form.id,"",function(data){
        me.form = JSON.parse(data).form;
        var status = me.form.status;
        me.form.createForOther=false;
        me.regReason=[];
				console.log('status='+status);
				//me.checkStatus(status);
			});
		}else{
      this.form.createForOther=true;
      this.form.creatorName="";
      this.form.creatorStaffcode="";
      this.form.creatorPosition="";
      this.form.creatorDept="";
      this.form.telephone="";
      this.form.mobile="";
      this.form.joindate="";
      this.form.currentContractPeriod="";
      this.form.startingDate="";
      this.form.immediateTermination="";
      //this.form.lastWorkingDateString="请选择";
      //this.form.lastContractDateString="请选择";
      this.form.resignationReason="";
      this.regReason=[];
      this.form.otherReason="";
      this.form.boolCompanyCar="";
      this.form.resId="";
      this.form.ifFse=false;
    }
		
	},
  doAfterSelectOtherPerson: function(data) {
    this.regReason=[];
    $('#selectotherperson').attr("class", "input-group-btn");
    var me = this;
    var eclId=this.form.id;
    var ticketNoOld = this.form.ticketNo
		this.GL.actUtil.query("get","/eclosingApplication/selectOne/"+data.id+"?eclId="+eclId,"",function(data){
    //this.GL.actUtil.query("get","/eclosingApplication/selectOne/"+data.id,"",function(data){
      var form = JSON.parse(data).form;
      me.form = form;
      me.form.resId="";
	  });
  },
  //离职原因调用显示具体原因框
	checkReason(){
      var newarr = this.regReason;
      var resignationReason="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others (please specify) 其他（请具体描述）'){
            otherR="Others (please specify) 其他（请具体描述）";
            ifOther=true;
          }else{
            resignationReason +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others (please specify) 其他（请具体描述）'){
            otherR=",Others (please specify) 其他（请具体描述）";
            ifOther=true;
          }else{
            resignationReason +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(resignationReason !="" && resignationReason != null){
          resignationReason+=otherR;
        }else{
          resignationReason="Others (please specify) 其他（请具体描述）";
        }
        this.resignationReasonOther=true;
      }else{
        this.resignationReasonOther=false;
        this.form.otherReason="";
      }
      this.form.resignationReason=resignationReason;
    },
    //需要体检，则显示体检日期
    noExamination: function() {
      var boolPhysicalExam = this.form.boolPhysicalExam;
      if(boolPhysicalExam=='Y'){
        this.examinationDateO=true;
      }else{
        this.examinationDateO=false;
        this.form.examinationDate="";
      }
    },
    //关系是其他，则显示文本框
    relationshipTianjinCheck: function() {
      var newarr = this.relationship;
      var relationshipTianjin="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others 其他'){
            ifOther=true;
            otherR="Others 其他";
          }else{
            relationshipTianjin +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others 其他'){
            ifOther=true;
            otherR=",Others 其他";
          }else{
            relationshipTianjin +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(relationshipTianjin !="" && relationshipTianjin != null){
          relationshipTianjin+=otherR;
        }else{
          relationshipTianjin="Others 其他";
        }
        this.relationshipTianjinOther=true;
      }else{
        this.relationshipTianjinOther=false;
        this.form.relationshipTianjinothers="";
      }
      this.form.relationshipTianjin=relationshipTianjin;
    },
    //违规范行动有，则显示文本框
    noncompliantActionCheck: function() {
      var boolNoncompliantAction = this.form.boolNoncompliantAction;
      if(boolNoncompliantAction=='Yes'){
        this.actionCommentO=true;
      }else{
        this.actionCommentO=false;
        this.form.actionComment="";
      }
    },
    //Unused Annual Leave 剩余年假
    oninputUnusedAnnualLeave:function(e){
      if(this.form.unusedAnnualLeaveRemark != null && this.form.unusedAnnualLeaveRemark != ""){
        var num = this.form.unusedAnnualLeaveRemark;
        //num = num.replace('-','');   
        var regu = /^(-?\d+)(\.\d+)?$/;
        if (!regu.test(num)) {
          this.form.unusedAnnualLeaveRemark=0;
        }else{
          num = num.match(/^[+-]?\d*(\.?\d{0,1})/g)[0];//保留1位小数
          this.form.unusedAnnualLeaveRemark = num;
        } 
      }
    },
    //Overtime 加班
    oninputOvertime:function(e){
      if(this.form.overtimeRemark != null && this.form.overtimeRemark != ""){
        var num = this.form.overtimeRemark;
        var regu = /^(-?\d+)(\.\d+)?$/;
        if (!regu.test(num)) {
          this.form.overtimeRemark=0;
        }else{
          num = num.match(/^[+-]?\d*(\.?\d{0,2})/g)[0];//正数保留2位小数
          this.form.overtimeRemark = num;
        }     
      }
    },
    oninputNumYear:function(e){
      //var reg=/^(1949|19[5-9]\d|20\d{2}|2100)$/;
      //社会保险年
      if(this.form.socialInsuranceYear != null && this.form.socialInsuranceYear != ""){
        this.form.socialInsuranceYear = this.form.socialInsuranceYear.replace("-","");
        var socialInsuranceYear = this.form.socialInsuranceYear;
        if(!/^\d{4}$/.test(socialInsuranceYear)){
          $.alertApon("Please enter the correct year 请输入正确的年份");
          this.form.socialInsuranceYear="";
          return;
        }
        var date = new Date();
        var max = date.getFullYear()+1;//当前年份+1
        var min = date.getFullYear();//当前年份
        //var n = new Number(year);
        if ((socialInsuranceYear.valueOf() > max) || (socialInsuranceYear.valueOf() < min)) {
          $.alertApon('Please enter the correct time range 请输入正确的时间范围');
          this.form.socialInsuranceYear="";
          return;
        }
      }
      //LC 公积金  年
      if(this.form.housingFundYear != null && this.form.housingFundYear != ""){
        this.form.housingFundYear = this.form.housingFundYear.replace("-","");
        var housingFundYear = this.form.housingFundYear;
        if(!/^\d{4}$/.test(housingFundYear)){
          $.alertApon("Please enter the correct year 请输入正确的年份");
          this.form.housingFundYear="";
          return;
        }
        var date = new Date();
        var max = date.getFullYear()+1;//当前年份+1
        var min = date.getFullYear();//当前年份
        //var n = new Number(year);
        if ((housingFundYear.valueOf() > max) || (housingFundYear.valueOf() < min)) {
          $.alertApon('Please enter the correct time range 请输入正确的时间范围');
          this.form.housingFundYear="";
          return;
        }
      }
    },
    //工服、鞋的数字判断，不可是负数，小数
    oninputNum:function(e){
      if(this.form.returnShoesCount != null){
        this.form.returnShoesCount=this.form.returnShoesCount.replace(/[^\d]/g,'');
        var num = this.form.returnShoesCount;
        if(""==num || isNaN(num)){
          this.form.returnShoesCount ="0";
        }
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
        if('' == cents){
          if(num.length>1 && '0' == num.substr(0,1)){
            this.form.returnShoesCount ="0";
          }
        }
        //this.form.returnShoesCount = this.form.returnShoesCount.replace("-","");
      }
    },
    //废弃
    oninputNumClothes:function(e){
      if(this.form.returnClothesCount != null){
        this.form.returnClothesCount=this.form.returnClothesCount.replace(/[^\d]/g,'');
        var num = this.form.returnClothesCount;
        if(""==num || isNaN(num)){
          this.form.returnClothesCount ="0";
        }
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
        if('' == cents){
          if(num.length>1 && '0' == num.substr(0,1)){
            this.form.returnClothesCount ="0";
          }
        }
        //this.form.returnClothesCount = this.form.returnClothesCount.replace("-","");
      }
    },
    //金额校验：不可是负数，保留2位小数
    oninput:function(e){
      // 通过正则过滤小数点后两位
      //e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      //console.log('e',e.target.value)
      //Direct Supervisor
      
      //Administration Department
      if(this.form.employeeCardRemark != null){
        var newnum = this.formatCurrency(this.form.employeeCardRemark);
        this.form.employeeCardRemark=newnum;
      }
      if(this.form.officeKeyRemark != null){
        var newnum = this.formatCurrency(this.form.officeKeyRemark);
        this.form.officeKeyRemark=newnum;
      }
      if(this.form.officeDrawerKeyRemark != null){
        var newnum = this.formatCurrency(this.form.officeDrawerKeyRemark);
        this.form.officeDrawerKeyRemark=newnum;
      }
      if(this.form.companyCarRemark != null){
        var newnum = this.formatCurrency(this.form.companyCarRemark);
        this.form.companyCarRemark=newnum;
      }
      if(this.form.dormitoryRemark != null){
        var newnum = this.formatCurrency(this.form.dormitoryRemark);
        this.form.dormitoryRemark=newnum;
      }
      if(this.form.lockeKeyRemark != null){
        var newnum = this.formatCurrency(this.form.lockeKeyRemark);
        this.form.lockeKeyRemark=newnum;
      }
      if(this.form.clothesRemark != null){
        var newnum = this.formatCurrency(this.form.clothesRemark);
        this.form.clothesRemark=newnum;
      }
      //EHS
      //去除-号
      
      
      //HRBP
      if(this.form.hukouBondRefundRemark != null){
        var newnum = this.formatCurrency(this.form.hukouBondRefundRemark);
        this.form.hukouBondRefundRemark=newnum;
      }
      
      if(this.form.handbookRemark != null){
        var newnum = this.formatCurrency(this.form.handbookRemark);
        this.form.handbookRemark=newnum;
      }
 
      if(this.form.homeLeaveAccountRemark != null){
        var newnum = this.formatCurrency(this.form.homeLeaveAccountRemark);
        this.form.homeLeaveAccountRemark=newnum;
      }
      
      //IT 部门
      //if(this.form.simCardRemark != null){
      //  var newnum = this.formatCurrency(this.form.simCardRemark);
      //  this.form.simCardRemark=newnum;
      //}
      //if(this.form.phoneNumberRemark != null){
      //  var newnum = this.formatCurrency(this.form.phoneNumberRemark);
      //  this.form.phoneNumberRemark=newnum;
      //}
      if(this.form.mobilePhoneRemark != null){
        var newnum = this.formatCurrency(this.form.mobilePhoneRemark);
        this.form.mobilePhoneRemark=newnum;
      }
      if(this.form.pcRemark != null){
        var newnum = this.formatCurrency(this.form.pcRemark);
        this.form.pcRemark=newnum;
      }
      if(this.form.otherAssetsRemark != null){
        var newnum = this.formatCurrency(this.form.otherAssetsRemark);
        this.form.otherAssetsRemark=newnum;
      }
      //if(this.form.closeEmailIntranetRemark != null){
      //  var newnum = this.formatCurrency(this.form.closeEmailIntranetRemark);
      //  this.form.closeEmailIntranetRemark=newnum;
      //}
      //if(this.form.closeSapRemark != null){
      //  var newnum = this.formatCurrency(this.form.closeSapRemark);
      //  this.form.closeSapRemark=newnum;
      //}
      //if(this.form.colseOtherAccountsRemark != null){
      //  var newnum = this.formatCurrency(this.form.colseOtherAccountsRemark);
      //  this.form.colseOtherAccountsRemark=newnum;
      //}
      //if(this.form.nameOnTelephoneRemark != null){
      //  var newnum = this.formatCurrency(this.form.nameOnTelephoneRemark);
      //  this.form.nameOnTelephoneRemark=newnum;
      //}
      if(this.form.settlementCallCostRemark != null){
        var newnum = this.formatCurrency(this.form.settlementCallCostRemark);
        this.form.settlementCallCostRemark=newnum;
      }
      //Finance - Accounting
      if(this.form.advanceFromCompanyRemark != null){
        var newnum = this.formatCurrency(this.form.advanceFromCompanyRemark);
        this.form.advanceFromCompanyRemark=newnum;
      }
      //HR - C&B 
      if(this.form.socialInsuranceRemark != null){
        var newnum = this.formatCurrency(this.form.socialInsuranceRemark);
        this.form.socialInsuranceRemark=newnum;
      }
      
    },
    oninputTraining:function(e){
      //HR Dept -Training
      if(this.form.trainingExpenseRefundRemark != null){
        var newnum = this.formatCurrency(this.form.trainingExpenseRefundRemark);
        this.form.trainingExpenseRefundRemark=newnum;
      }
    },
    //
    oninputHrcb:function(e){
        var netPayRemark="";
				if(this.form.netPayRemark != null){
          netPayRemark = this.form.netPayRemark.replace(/,/g, '');//去除千分符
        }else{
          netPayRemark="0";
        }
        var otherDeductionsRemark="";
        if(this.form.otherDeductionsRemark !=null){
          otherDeductionsRemark=this.form.otherDeductionsRemark.replace(/,/g, '');//先去除千分符
        }else{
          otherDeductionsRemark="0";
        }
        var netPayFinal= Number(netPayRemark) - Number(otherDeductionsRemark);
        //this.form.netPayFinal = this.formatCurrency2(netPayFinal);//正负都显示
        console.log("watch  netPayFinal="+netPayFinal);
        if(netPayFinal < 0){
          this.form.minusNetPayRemark=this.formatCurrency(netPayFinal);//处理掉负数
          this.form.netPayFinal = '-' + this.formatCurrency(netPayFinal);
        }else{
          this.form.minusNetPayRemark="";
          this.form.netPayFinal = this.formatCurrency(netPayFinal);
        }
        console.log("oninputHrcb  minusNetPayRemark="+this.form.minusNetPayRemark);
        var newnum = this.formatCurrency2(this.form.netPayRemark);//正负都显示
        console.log("newnum: " + newnum);
        this.form.netPayRemark=newnum;
    },
    //给remark数字加千分符:失败
    get_thousand_num:function (remark) {
      var num = $("#"+remark).val();
      if(''==num){
      }else if(isNaN(num)){
        $("#"+remark).val("");
      }else{
        var newnum = this.formatCurrency(num);
        $("#"+remark).val(newnum);
      }
    },
    formatCurrency:function (num){
      if(num){
        //将num中的$,去掉，将num变成一个纯粹的数据格式字符串 
        num = num.toString().replace(/\$|\,/g,'');
        //不可是负数
        num = num.replace('-','');
        //保留2位小数
        num = num.match(/^\d*(\.?\d{0,2})/g)[0];
        //如果num不是数字，则将num置0，并返回
        if(''==num || isNaN(num)){return '0';}//Not a Number ! 
        //如果num是负数，则获取她的符号
        var sign = num.indexOf("-")> 0 ? '-' : '';
        //如果存在小数点，则获取数字的小数部分
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;//注意：这里如果是使用change方法不断的调用，小数是输入不了的
        //获取数字的整数数部分
        num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
        //如果没有小数点，整数部分不能以0开头
        if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return '0';}}//Not a Number ! 
        //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
        else{if(num.length>1 && '0' == num.substr(0,1)){return '0';}}//Not a Number ! 
        //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
        if(num >= 0) {
          for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
          }
        }else{
          for (var i = 0; i < Math.floor((num.length - (2 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
          }
        }
        //将数据（符号、整数部分、小数部分）整体组合返回
        return (sign + num + cents);    
      }
    },
    formatCurrency2:function (num){
      if(num){
        //将num中的$,去掉，将num变成一个纯粹的数据格式字符串 
        num = num.toString().replace(/\$|\,/g,'');
        //如果num不是数字，则将num置0，并返回
        if(isNaN(num)){return '0';}
        //if(''==num || isNaN(num)){return '0';}//Not a Number ! 
        //如果num是负数，则获取她的符号
        var sign = num.indexOf("-")> 0 ? '-' : '';
        //如果存在小数点，则获取数字的小数部分
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf("."),3) : '';
        cents = cents.length>1 ? cents : '' ;//注意：这里如果是使用change方法不断的调用，小数是输入不了的
        //获取数字的整数数部分
        num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
        //如果没有小数点，整数部分不能以0开头
        if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return '0';}}//Not a Number ! 
        //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
        else{if(num.length>1 && '0' == num.substr(0,1)){return '0';}}//Not a Number ! 
        //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
        if(num >= 0) {
          for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
          }
        }else {
          for (var i = 0; i < Math.floor((num.length - (2 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
          }
        }
        //将数据（符号、整数部分、小数部分）整体组合返回
        return (sign + num + cents);    
      }
    },
    getPhoneNumber:function(){
      //申请人信息：mobile
      var mobileN=this.form.mobile;
      if(this.form.mobile !="" && this.form.mobile!=null){
        if(mobileN.length>20){
          mobileN=this.form.mobile.substring(0,20);
          this.form.mobile=mobileN;
          return;
        }
      }
      //IT 
      if(this.form.mobilePhoneNumber!="" && this.form.mobilePhoneNumber!=null){
        if(this.form.mobilePhoneNumber.length>75){
          var mmobilePhoneNumberN=this.form.mobilePhoneNumber.substring(0,75);
          this.form.mobilePhoneNumber=mmobilePhoneNumberN;
          return;
        }
      }

    },

    otherReasonCheck:function(){
      var reg = /^[0-9]*$/;
      if ($("#otherReason").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#otherReason").val()) {
          var value = $("#otherReason").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= 500 * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, 500);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(500 * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (500 * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (500 * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon("500 Characters Max for Other Reason. 其他原因最多只能填写500个字节。");
          this.form.otherReason = limitvalue;
        }
      }
    },
    actionCommentCheck:function(){
      var reg = /^[0-9]*$/;
      if ($("#actionComment").attr("disabled")) {
        //只读不做操作
      } else {
        if ($("#actionComment").val()) {
          var value = $("#actionComment").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= 500 * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, 500);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(500 * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (500 * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (500 * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon("500 Characters Max for Specify Action. 具体行为最多只能填写500个字节。");
          this.form.actionComment = limitvalue;
        }
      }
    },
    relationshipTianjinothersCheck:function(){
      var reg = /^[0-9]*$/;
      if ($("#relationshipTianjinothers").attr("disabled")) {
        //只读不做操作
      } else {
        if ($("#relationshipTianjinothers").val()) {
          var value = $("#relationshipTianjinothers").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= 500 * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, 500);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(500 * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (500 * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (500 * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon("500 Characters Max for Others Relationship. 其他关系最多只能填写500个字节。");
          this.form.relationshipTianjinothers = limitvalue;
        }
      }
    },

    //提交前校验
    beforesubmit: function() {
      //必须得有员工号 creatorStaffcode
      if(this.form.creatorStaffcode=="" || this.form.creatorStaffcode==null){
        $.alertApon("Applicant information should not be empty. 申请人信息不可为空。");
        this.form.submitstatus=false;
        return;
      }
      //判断是否有in processing的单子
      var result;
      var hrbpNull;
      var directSupervisorNull;
      var departmentHeadNull;
      var me = this;
      this.GL.actUtil.query("get","/eclosingApplication/existOpen/"+this.form.applicantUserId+"?immediateTermination="+this.form.immediateTermination,"",function(data){
        result = JSON.parse(data).result;
        hrbpNull = JSON.parse(data).hrbpNull;
        directSupervisorNull = JSON.parse(data).directSupervisorNull;
        departmentHeadNull = JSON.parse(data).departmentHeadNull;
        if(result){
          $.alertApon('Employee has an E-Closing application with open status already, please update and submit pervious un-finished application. 此员工已有未完成的E-Closing申请单，请更新并提交上次未完成的申请单。');
          me.form.submitstatus=false;
          return;
        }
        if(hrbpNull){//判断hrbp是否有值
          $.alertApon("The HRBP value of this employee is empty. Please maintain the data before submitting it. 此员工的HRBP值为空，请维护数据后再提交。");
          me.form.submitstatus=false;
          return;
        }
        if(directSupervisorNull){//判断Direct Supervisor是否有值
          $.alertApon("The disciplinary supervisor value of this employee is empty. Please maintain the data before submitting it. 此员工的Direct Supervisor值为空，请维护数据后再提交。");
          me.form.submitstatus=false;
          return;
        }
        if(departmentHeadNull){//判断deptment head（FSE、Immediate termination 不判断）是否有值
          $.alertApon("The Department Head value of this employee is empty. Please maintain the data before submitting it. 此员工的Department Head值为空，请维护数据后再提交。");
          me.form.submitstatus=false;
          return;
        }
      });
      
      var status = this.form.status;
      //根据状态，是否在流程中
      if(!result && !hrbpNull && !directSupervisorNull && !departmentHeadNull && (status== 2 || status==null )){
        //手机号
        if(this.form.mobile!="" && this.form.mobile!=null){
          if(this.form.mobile.length>20){
            $.alertApon("Mobile phone number length should not exceed 20 bits. 手机号长度不能超过20位。");
            this.form.submitstatus=false;
            return;
          }
          //if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.mobile)) {
          //  $.alertApon("Incorrect format of the mobile phone number. 手机号格式不正确。");
          //  this.form.submitstatus=false;
          //  return;
          //}
        }
        //Resignation Request Date 离职申请提交日期
        if(this.form.resignationReqDate!="" && this.form.resignationReqDate!=null){
          if(this.form.resignationReqDate=="NaN-NaN-NaN"){
            $.alertApon("The resignation request date format error. 离职申请提交日期格式错误。");
            this.form.submitstatus=false;
            return;
          }
        }
        //Last Working Date 最终工作日期
        if(this.form.lastWorkingDateString=="--Please Select--"){
          $.alertApon("Please select the last working date. 请选择最后工作日。");
          this.form.submitstatus=false;
          return;
        }
        else if(this.form.lastWorkingDateString!="" && this.form.lastWorkingDateString!=null){
          if(this.form.lastWorkingDateString=="NaN-NaN-NaN"){
            $.alertApon("The last working date format error. 最后工作日格式错误。");
            this.form.submitstatus=false;
            return;
          }
        }
        //Last Contract Date 最终合同日期
        if(this.form.lastContractDateString=="--Please Select--"){
          $.alertApon("Please select the last contract date. 请选择合同终止日。");
          this.form.submitstatus=false;
          return;
        }else if(this.form.lastContractDateString!="" && this.form.lastContractDateString!=null){
          if(this.form.lastContractDateString=="NaN-NaN-NaN"){
            $.alertApon("The last contract date format error. 合同终止日格式错误。");
            this.form.submitstatus=false;
            return;
          }
        }
        //Resignation Type 离职类型
        //if(this.form.resignationType==""){
        //  $.alertApon("Please select the resignation type. 请选择离职类型。");
        //  this.form.submitstatus=false;
        //  return;
        //}
        //离职原因不可为空
        if(this.form.resignationReason == "" || this.form.resignationReason== null){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Resignation Reason 离职原因”。");
          this.form.submitstatus=false;
          return;
        }else{
          //Others 其他  文本框需要填
          var regReasonStrs= new Array(); //定义一数组 
          regReasonStrs=this.form.resignationReason.split(",");
          var ifOther=false;
          for (var i = 0, len = regReasonStrs.length; i < len; i++) {
            if(regReasonStrs[i]=='Others (please specify) 其他（请具体描述）'){
              ifOther=true;
            }
          }
          if(ifOther){//如果离职原因是其他，则必须填写具体原因
            //判断文本框不可为空
            if(this.form.otherReason=="" || this.form.otherReason==null){
              $.alertApon("Please specify other reasons for resignation. 请具体描述其他离职原因。");
              this.form.submitstatus=false;
              return;
            }else{
              var value = $("#otherReason").val();
              var newvalue = value.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>500){
                $.alertApon("500 Characters Max for Other Reason. 其他原因最多只能填写500个字节。");
                this.form.submitstatus=false;
                return;
              }else{
                this.form.submitstatus=true;
              }
            }
          }else{
            this.form.otherReason="";
            this.form.submitstatus=true;
          }
        }
        
      }
    },
    //审批时提交校验
    beforeapprovel: function() {
      //form.approval.approvalRemark
      var value = this.form.approval.approvalRemark;
      if(value !=null && value !="" && value !="null"){
        var newvalue = value.replace(/[^\x00-\xff]/g, "**");
        var length = newvalue.length;
        if(length>500){
          $.alertApon("500 Characters Max for Comments. 备注最多只能填写500个字节。");
          this.form.approvelstatus=false;
          return;
        }
      }

      var status = this.form.status;
      var processTaskKey=this.processTaskKey;
      //reject之后的Resubmit
      if(status== 9){
        if(this.form.creatorStaffcode=="" || this.form.creatorStaffcode==null){
          $.alertApon("Applicant information should not be empty. 申请人信息不可为空。");
          this.form.approvelstatus=false;
          return;
        }
        //判断是否有in processing的单子
        var result;
        var hrbpNull;
        var directSupervisorNull;
        var departmentHeadNull;
        var me = this;
        this.GL.actUtil.query("get","/eclosingApplication/existOpen/"+this.form.applicantUserId+"?immediateTermination="+this.form.immediateTermination,"",function(data){
          result = JSON.parse(data).result;
          hrbpNull = JSON.parse(data).hrbpNull;
          directSupervisorNull = JSON.parse(data).directSupervisorNull;
          departmentHeadNull = JSON.parse(data).departmentHeadNull;
          if(result){
            $.alertApon('Employee has an E-Closing application with open status already, please update and submit pervious un-finished application. 此员工已有未完成的E-Closing申请单，请更新并提交上次未完成的申请单。');
            me.form.approvelstatus=false;
            return;
          }
          if(hrbpNull){//判断hrbp是否有值
            $.alertApon("The HRBP value of this employee is empty. Please maintain the data before submitting it. 此员工的HRBP值为空，请维护数据后再提交。");
            me.form.approvelstatus=false;
            return;
          }
          if(directSupervisorNull){//判断Direct Supervisor是否有值
            $.alertApon("The disciplinary supervisor value of this employee is empty. Please maintain the data before submitting it. 此员工的Direct Supervisor值为空，请维护数据后再提交。");
            me.form.approvelstatus=false;
            return;
          }
          if(departmentHeadNull){//判断deptment head（FSE、Immediate termination 不判断）是否有值
            $.alertApon("The Department Head value of this employee is empty. Please maintain the data before submitting it. 此员工的Department Head值为空，请维护数据后再提交。");
            me.form.approvelstatus=false;
            return;
          }
        });
        //根据状态，是否在流程中
        if(!result && !hrbpNull && !directSupervisorNull && !departmentHeadNull){
          //手机号
          if(this.form.mobile!="" && this.form.mobile!=null){
            if(this.form.mobile.length>20){
              $.alertApon("Mobile phone number length should not exceed 20 bits. 手机号长度不能超过20位。");
              this.form.approvelstatus=false;
              return;
            }
            //if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.mobile)) {
            //  $.alertApon("Incorrect format of the mobile phone number. 手机号格式不正确。");
            //  this.form.submitstatus=false;
            //  return;
            //}
          }
          //Resignation Request Date 离职申请提交日期
          if(this.form.resignationReqDate!="" && this.form.resignationReqDate!=null){
            if(this.form.resignationReqDate=="NaN-NaN-NaN"){
              $.alertApon("The resignation request date format error. 离职申请提交日期格式错误。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Last Working Date 最终工作日期
          if(this.form.lastWorkingDateString=="--Please Select--"){
            $.alertApon("Please select the last working date. 请选择最后工作日。");
            this.form.approvelstatus=false;
            return;
          }
          else if(this.form.lastWorkingDateString!="" && this.form.lastWorkingDateString!=null){
            if(this.form.lastWorkingDateString=="NaN-NaN-NaN"){
              $.alertApon("The last working date format error. 最后工作日格式错误。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Last Contract Date 最终合同日期
          if(this.form.lastContractDateString=="--Please Select--"){
            $.alertApon("Please select the last contract date. 请选择合同终止日。");
            this.form.approvelstatus=false;
            return;
          }else if(this.form.lastContractDateString!="" && this.form.lastContractDateString!=null){
            if(this.form.lastContractDateString=="NaN-NaN-NaN"){
              $.alertApon("The last contract date format error. 合同终止日格式错误。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Resignation Type 离职类型
          //if(this.form.resignationType==""){
          //  $.alertApon("Please select the resignation type. 请选择离职类型。");
          //  this.form.submitstatus=false;
          //  return;
          //}
          //离职原因不可为空
          if(this.form.resignationReason == "" || this.form.resignationReason== null){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Resignation Reason 离职原因”。");
            this.form.approvelstatus=false;
            return;
          }else{
            //Others 其他  文本框需要填
            var regReasonStrs= new Array(); //定义一数组 
            regReasonStrs=this.form.resignationReason.split(",");
            var ifOther=false;
            for (var i = 0, len = regReasonStrs.length; i < len; i++) {
              if(regReasonStrs[i]=='Others (please specify) 其他（请具体描述）'){
                ifOther=true;
              }
            }
            if(ifOther){//如果离职原因是其他，则必须填写具体原因
              //判断文本框不可为空
              if(this.form.otherReason=="" || this.form.otherReason==null){
                $.alertApon("Please specify other reasons for resignation. 请具体描述其他离职原因。");
                this.form.approvelstatus=false;
                return;
              }else{
                var value = $("#otherReason").val();
                var newvalue = value.replace(/[^\x00-\xff]/g, "**");
                var length = newvalue.length;
                if(length>500){
                  $.alertApon("500 Characters Max for Other Reason. 其他原因最多只能填写500个字节。");
                  this.form.approvelstatus=false;
                  return;
                }else{
                  this.form.approvelstatus=true;
                }
              }
            }else{
              this.form.otherReason="";
              this.form.approvelstatus=true;
            }
          }
        }
      }
      //审批流程中的校验
      if(status== 1){
        //$.alertApon("processTaskKey="+processTaskKey);
        //Direct Supervisor
        if(processTaskKey=='directiveSupervisor'){
          
        }
        if(processTaskKey=='ehs'){
          //EHS角色 校验
          var boolPhysicalExam = $("input:radio[name='boolPhysicalExam']:checked").val();
          if(boolPhysicalExam==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“Occupational Health Checkup. 请选择是否需要职业健康检查”。");
            this.form.approvelstatus=false;
            return;
          }else{
            if(boolPhysicalExam=='Y'){
              //判断体检日期框不可为空
              if(this.form.examinationDate==""){
                //$.alertApon("Please write the Examination Date. 请填写体检日期。");
                //this.form.approvelstatus=false;
                //return;
              }else{
                if(this.form.examinationDate=="NaN-NaN-NaN"){
                  $.alertApon("The Examination Date format error. 最终体检日期格式错误。");
                  this.form.approvelstatus=false;
                  return;
                }else{
                  this.form.approvelstatus=true;
                }
              }
            }else{
              this.form.examinationDate="";
              this.form.approvelstatus=true;
            }
          }
        }
        if(processTaskKey=='hrbp'){// || processTaskKey=='hrbp2'
          //Resignation Request Date 离职申请提交日期
          if(this.form.resignationReqDate!="" && this.form.resignationReqDate!=null){
            if(this.form.resignationReqDate=="NaN-NaN-NaN"){
              $.alertApon("The resignation request date format error. 离职申请提交日期格式错误。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Last Working Date 最终工作日期
          if(this.form.lastWorkingDateString!="" && this.form.lastWorkingDateString!=null){
            if(this.form.lastWorkingDateString=="NaN-NaN-NaN"){
              $.alertApon("The last working date format error. 最后工作日格式错误。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Last Contract Date 最终合同日期
          if(this.form.lastContractDateString!="" && this.form.lastContractDateString!=null){
            if(this.form.lastContractDateString=="NaN-NaN-NaN"){
              $.alertApon("The last contract date format error. 合同终止日格式错误。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }

          var appraisalSalaryBenefits = $("input:radio[name='appraisalSalaryBenefits']:checked").val();
          if(appraisalSalaryBenefits==undefined){
            $.alertApon("Please choose one of Q1:'Salary & Benefits 薪酬和福利' Comment.");
            this.form.approvelstatus=false;
            return;
          }
          var appraisalCommunication = $("input:radio[name='appraisalCommunication']:checked").val();
          if(appraisalCommunication==undefined){
            $.alertApon("Please choose one of Q1:'Communication 沟通' Comment.");
            this.form.approvelstatus=false;
            return;
          }
          var appraisalPersonalDevelopment = $("input:radio[name='appraisalPersonalDevelopment']:checked").val();
          if(appraisalPersonalDevelopment==undefined){
            $.alertApon("Please choose one of Q1:'Personal Development 个人发展' Comment.");
            this.form.approvelstatus=false;
            return;
          }
          var appraisalCompanyManagement = $("input:radio[name='appraisalCompanyManagement']:checked").val();
          if(appraisalCompanyManagement==undefined){
            $.alertApon("Please choose one of Q1:'Company Management 公司管理' Comment.");
            this.form.approvelstatus=false;
            return;
          }
          if(this.form.relationshipTianjin == "" || this.form.relationshipTianjin== null){
            $.alertApon("Please click the checkbox of Q2:'The relationship between your new employer and VWATJ'. 请选择您与VWATJ公司的关系。");
            this.form.approvelstatus=false;
            return;
          }else{
            //Others 其他  文本框需要填
            var relationshipStrs= new Array(); //定义一数组 
            relationshipStrs=this.form.relationshipTianjin.split(",");
            var ifOther=false;
            for (var i = 0, len = relationshipStrs.length; i < len; i++) {
              if(relationshipStrs[i]=='Others 其他'){
                ifOther=true;
              }
            }
            if(ifOther){
              //判断文本框不可为空
              if(this.form.relationshipTianjinothers=="" || this.form.relationshipTianjinothers==null){
                $.alertApon("Please specify others relationship. 请描述您与VWATJ公司的关系。");
                this.form.approvelstatus=false;
                return;
              }
            }else{
              this.form.relationshipTianjinothers="";
            }
          }
          var boolNoncompliantAction = $("input:radio[name='boolNoncompliantAction']:checked").val();
          if(boolNoncompliantAction==undefined){
            $.alertApon("Please choose one of Q3:'Are you aware of any non-compliant action or behavior'. 您在职期间是否发现有违规范的行动或行为。");
            this.form.approvelstatus=false;
            return;
          }else{
            //是否选了 Yes 是 文本框需要填
            if(boolNoncompliantAction=='Yes'){
              //判断文本框不可为空
              if(this.form.actionComment=="" || this.form.actionComment==null){
                $.alertApon("Please specify which kind of action or behavior. 请具体说明何种行为。");
                this.form.approvelstatus=false;
                return;
              }
            }else{
              this.form.actionComment="";
            }
          }
          var boolRehired = $("input:radio[name='boolRehired']:checked").val();
          if(boolRehired==undefined){
            $.alertApon("Please choose one of Q4:'Do you want to be rehired by VWATJ'. 您是否愿意被VWATJ重新雇佣。");
            this.form.approvelstatus=false;
            return;
          }
          var boolSignedAgreement = $("input:radio[name='boolSignedAgreement']:checked").val();
          if(boolSignedAgreement==undefined){
            $.alertApon("Please choose one of 'Non-Competition Agreement 竞业限制协议'.");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(processTaskKey=='departmentHead' && this.form.boolSignedAgreement=='Y' ){
          var boolClauseExecution = $("input:radio[name='boolClauseExecution']:checked").val();
          if(boolClauseExecution==undefined){
            $.alertApon("Please choose retain or waive. 请选择保留还是放弃。");
            this.form.approvelstatus=false;
            //return;
          }else{
            this.form.approvelstatus=true;
          }
        }

        if(this.parallelConfirmation && ( processTaskKey=='parallelDirectiveSupervisor' || this.form.byDirect ) && !this.deputyDirect){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byDirect){
          if(!$('#boolHandover').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Work Handover to Successor 已完成交接”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.parallelConfirmation && ( processTaskKey=='administrationOfficer1' || this.form.byAdm1) && !this.deputyDept1){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byAdm1){
          if(!$('#boolReturnEmployeeCard').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Employee Card 员工卡”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolReturnOfficeKey').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Office Key (if any) 办公室钥匙（如有）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolReturnOfficeDrawerKey').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Office Drawer Key 办公室抽屉钥匙”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='administrationOfficer2' || this.form.byAdm2) && this.form.boolCompanyCar=='1' && !this.deputyDept2){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byAdm2 && this.form.boolCompanyCar=='1'){
          if(!$('#boolReturnCompanyCar').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Company Car 公务车”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        
        if(this.parallelConfirmation && (processTaskKey=='administrationOfficer3' || this.form.byAdm3) && (!this.deputyDept3)){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byAdm3){
          if(!$('#boolReturnDormitory').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Dormitory Check-out (if any) 宿舍退宿（如有）”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='administrationOfficer4' || this.form.byAdm4) && !this.deputyDept4){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byAdm4){
          if(!$('#boolReturnLockeKey').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Key of Locker (if any) 更衣柜钥匙（如有）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolReturnClothes').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Work Clothes 工服”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
            //判断文本框不可为空
            //if(this.form.returnClothesCount==null){
            //  $.alertApon("Please write the return clothes sets. 请输入工服套数。");
            //  this.form.approvelstatus=false;
            //  return;
            //}else{
              //判断是否是数字
            //  if(isNaN(Number(this.form.returnClothesCount))){//当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
            //    $.alertApon("Please enter the numbers. 请输入数字。");
            //    this.form.approvelstatus=false;
            //    return;
            //  }else{
            //    this.form.approvelstatus=true;
            //  }
            //}
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='parallelEHS' || this.form.byEhs) && !this.deputyEhs){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byEhs){
          //负责安全帽等相关信息
          if(!$('#boolReturnShoes').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Safety Shoes 安全鞋”。");
            this.form.approvelstatus=false;
            return;
          }else{
            if(this.form.returnShoesCount ==null){
              $.alertApon("Please write the safety shoes pairs. 请输入安全鞋双数。");
              this.form.approvelstatus=false;
              return;
            }else {
              if(isNaN(Number(this.form.returnShoesCount))){//isNaN(Number(this.form.returnShoesCount)) 当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
                $.alertApon("Please enter the numbers. 请输入数字。");
                this.form.approvelstatus=false;
                return;
              }
            } 
          }

          if(!$('#boolReturnHats').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Safety Hats 安全帽”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='parallelEHSOHC' || this.form.byEhsOhc) && !this.deputyEhsOhc){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byEhsOhc){
          //确认健康体检相关的信息
          if(this.form.boolExamination==null || this.form.boolExamination==""){
            $.alertApon("Please choose the dropdown list for item: 请在事项的下拉框里面选择：“Occupational Health Checkup 职业健康检查”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='trainingOfficer' || this.form.byHrTraining) && !this.deputyTraining){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byHrTraining){
          if(!$('#boolRefundTrainingExpense').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Training Expense Refund 培训费用返还金额”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
            //判断有无培训列表  trainingExpenseRefundRemark  eclosingTrainingList
            //if(this.form.eclosingTrainingList.length >= 1 && this.form.trainingExpenseRefundRemark==null) {
            //  $.alertApon("Please fill out the amount in the box for item: 请在事项的文本框里输入金额：“Training Expense Refund 培训费用返还金额”。");
            //  this.form.approvelstatus=false;
            //  return;
            //}else{
            //  this.form.approvelstatus=true;
            //}
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='parallelHrbp' || this.form.byHRBP) && !this.deputyHrbp){
        //if((processTaskKey=='confirmationParallelUser' || this.processTaskKey == 'confirmationParallel' ) && this.form.byHRBP){
          //if(!$('#boolAnnualLeave').prop('checked')){
          //  $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Unused Annual Leave 剩余年假”。");
          //  this.form.approvelstatus=false;
          //  return;
          //}
          //if(!$('#boolOvertime').prop('checked')){
          //  $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Overtime 加班”。");
          //  this.form.approvelstatus=false;
          //  return;
          //}
          if(!$('#boolHukouBond').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Hukou Bond Refund 户口绑定返还金额”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!this.form.boolTerminationLetter){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Resignation Letter 辞职信”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolReturnHandbook').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Employee Handbook 归还员工手册”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
          if(this.form.ifFseLe){
            if(!$('#boolReturnWorkPermit').prop('checked')){
              $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Work Permit to FSE/LE Consultant (if any) 归还外国人就业证明”。");
              this.form.approvelstatus=false;
              return;
            }
            if(!$('#boolAccommodationReg').prop('checked')){
              $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Accommodation Registration Form 住宿备查卡”。");
              this.form.approvelstatus=false;
              return;
            }
            if(!$('#boolHomeLeaveAccount').prop('checked')){
              $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Settlement of Home Leave Budget Account 结算探亲预算”。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(!$('#boolCreditCardAccount').prop('checked') && this.form.notLC){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Company Credit Card 公司信用卡”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='itOfficer' || this.form.byItDept) && !this.deputyIT){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byItDept){
          if(!$('#boolReturnSimCard').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Company SIM Card (if have) 归还公司SIM卡（如有）”。");
            this.form.approvelstatus=false;
            return;
          }

          //if(!$('#boolPhoneNumber').prop('checked')){
          //  $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Mobile Phone Number (if any)  手机号（如有）”。");
          //  this.form.approvelstatus=false;
          //  return;
          //}
          else{
              //如果有手机号，需要填手机号
              //if(this.form.mobilePhoneNumber=="" || this.form.mobilePhoneNumber==null){
              //  $.alertApon("Please write the mobile phone number. 请填写手机号。");
              //  this.form.approvelstatus=false;
              //  return;
              //}else{
              if(this.form.mobilePhoneNumber !="" && this.form.mobilePhoneNumber!=null){
                if(this.form.mobilePhoneNumber.length>75){
                  $.alertApon("Mobile phone number length should not exceed 75 bits. 手机号长度不能超过75位。");
                  this.form.approvelstatus=false;
                  return;
                }
                //if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.mobilePhoneNumber)) {
                //  $.alertApon("Incorrect format of the mobile phone number。 手机号格式不正确。");
                //  this.form.approvelstatus=false;
                //  return;
                //}
              }
          }
          if(!$('#boolReturnMobilePhone').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Company Mobile Phone (if have) 归还公司手机（如有）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolReturnPc').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Company Computer (Desktop/ Laptop/ Monitor) 归还电脑（台式机/笔记本/显示器）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolReturnOtherAssets').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Return Other Company Assets (Pad/ Mobile hard disk/ USB stick…) 其它公司财产（如Pad/移动硬盘/USB…等）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolCloseEmailIntranet').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Close Intranet Accounts and Email Address<br />关闭内网账户和电子邮件”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolCloseSap').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Close SAP and KSRM Account (if have) 关闭SAP和KSRM系统账户（如有）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolCloseOtherAccounts').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Close All Other System Accounts (if have) 关闭其它系统账户（如有）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(!$('#boolChangeNameOnTelephone').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Turn-off Phone Number and Voicemail<br />关闭电话姓名显示和语音信箱”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
          if(this.form.ifFse){
            //不是必填
            //if(!$('#boolCallCost').prop('checked')){
            //  $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Settlement of private call cost (FSE only) 结算私人话费（仅适用于FSE）'.");
            //  this.form.approvelstatus=false;
            //  return;
            //}else{
            //  this.form.approvelstatus=true;
            //}
          }
        }
        if(this.parallelConfirmation && (processTaskKey=='financeAccountant' || this.form.byFinanceAccounting)){
        //if((processTaskKey=='confirmationParallelUser' || processTaskKey=='confirmationParallel') && this.form.byFinanceAccounting){
          if(!$('#boolAdvanceCompany').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Advance Money from Company 员工借款”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(processTaskKey=='hrcb' || processTaskKey=='hrcb2'){
          if(!$('#boolNetPay').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Net Pay 应付工资（税后）”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.form.ifFse){
            if(!$('#boolSocialInsurance').prop('checked')){
              $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Social Insurance 社会保险”。");
              this.form.approvelstatus=false;
              return;
            }
          }
          if(!$('#boolDeductions').prop('checked')){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Other Deductions (if any) 其他扣减项（如有）”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(processTaskKey=='financeCashier'){
          //Total Amount 总金额
          //if(!$('#boolTotalAmount').prop('checked')){
          //  $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Total Amount 总金额”。");
          //  this.form.approvelstatus=false;
          //  return;
          //}else{
          //  this.form.approvelstatus=true;
          //}
        }
      }
    },

    //IT
    checkboxDoneIT(){
      this.form.boolCallCost = this.boolCallCost[0];
    },
    //添加一行
		insertItineraryRows: function() {
		  var newItem = {};
		  for(var key in this.form.eclosingTrainingList[0]) {
			newItem[key] = "";
		  }
		  this.form.eclosingTrainingList.push(newItem);
		},
    //表格行删除调用方法
		deleteItineraryRows: function(rowId) {
		  if(this.form.eclosingTrainingList.length > 1) {
        var id = this.form.jdaIndicatorsList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/eclosingApplication/deleteTraining/"+id, "", function(data) {});
        }
			  this.form.eclosingTrainingList.splice(rowId, 1);
		  } else {
        //this.form.eclosingTrainingList.splice(rowId, 1);
			  $.alertApon("At least one complete record in Training List is needed. 至少需要填写一条完整的培训列表。");
		  }
		},
    inputAmount: function(index) {
			var regDetail2 = new RegExp("^\\d+$");
			var amount = this.form.eclosingTrainingList[index].amount;
			if(amount){
        var newnum = this.formatCurrency(amount);
        this.form.eclosingTrainingList[index].amount=newnum;
			}
		}

  },
  data() {
    //返回的数据对象
    var dm = {};
    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/EclosingApplication/get/" + id;
    } else {
      var url = "/form/EclosingApplication/create/";
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
	  //var status = dm.form.status;
	  //this.checkStatus(status);
    if(dm.form.hrbp && dm.form.status == null){
      dm.selectanemployee = true;
    }else if(dm.form.hrbp && (dm.form.status == 2 || dm.form.status == 9) && dm.form.createUserId != dm.form.applicantUserId){
      dm.selectanemployee=true;
    }else if(dm.form.hrbp && (dm.form.status == 2 || dm.form.status == 9) && dm.form.createUserId == dm.form.applicantUserId){
      dm.selectanemployee=false;
    }else{
      dm.selectanemployee=false;
    }

    //离职原因
    if(dm.form.resignationReason !="" && dm.form.resignationReason != null){
      var regReasonStrs= new Array(); //定义一数组 
      regReasonStrs=dm.form.resignationReason.split(",");
      dm.regReason=regReasonStrs;
      var ifOther=false;
      for (var i = 0, len = regReasonStrs.length; i < len; i++) {
        if(regReasonStrs[i]=='Others (please specify) 其他（请具体描述）'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.resignationReasonOther=true;
      }else{
        dm.resignationReasonOther=false;
        dm.form.otherReason="";
      }
    }else{
      dm.regReason=[];
      dm.resignationReasonOther=false;
      dm.form.otherReason="";
    }

    //var reasonO = dm.form.resignationReason;
    //if(reasonO==14){
    //  dm.resignationReasonOther=true;
    //}else{
    //  dm.resignationReasonOther=false;
    //  dm.form.otherReason="";//先清空具体原因为空  regReason
    //}

    //体检日期
    var boolPhysicalExam = dm.form.boolPhysicalExam;
    if(boolPhysicalExam=='Y'){
      dm.examinationDateO=true;
    }else{
      dm.examinationDateO=false;
      dm.form.examinationDate="";
    }
    //与公司关系
    if(dm.form.relationshipTianjin !="" && dm.form.relationshipTianjin != null){
      var relationshipStrs= new Array(); //定义一数组 
      relationshipStrs=dm.form.relationshipTianjin.split(",");
      dm.relationship=relationshipStrs;
      var ifOther=false;
      for (var i = 0, len = relationshipStrs.length; i < len; i++) {
        if(relationshipStrs[i]=='Others 其他'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.relationshipTianjinOther=true;
      }else{
        dm.relationshipTianjinOther=false;
        dm.form.relationshipTianjinothers="";
      }
    }else{
      dm.relationship=[];
      dm.relationshipTianjinOther=false;
      dm.form.relationshipTianjinothers="";
    }
    //具体行为
    var boolNoncompliantAction = dm.form.boolNoncompliantAction;
    if(boolNoncompliantAction=='Yes'){
      dm.actionCommentO=true;
    }else{
      dm.actionCommentO=false;
      dm.form.actionComment="";
    }
    //byDirect
    if(this.$route.query.taskKey != null && this.$route.query.taskKey == 'directiveSupervisor'){
		  dm.byDirect = true;
    }
    //控制审批信息区域的显示  this.processTaskKey=='hrbpPreparation' || this.form.byCreateUser
    if(this.$route.query.taskKey=='hrbpPreparation' ){//|| this.$route.query.taskKey=='hrbpPreparation2'
      dm.regionDisplay=true;
    }else if(this.$route.query.taskKey == null && dm.form.byCreateUser && dm.form.status != null && dm.form.status !=2){
      dm.regionDisplay=true;
    }else{
      dm.regionDisplay=false;
    }

    //判断各个信息块的显示或隐藏
    //EHS ehsDiv
    if(this.$route.query.taskKey != null && this.$route.query.taskKey=='ehs'){
      dm.ehsDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolPhysicalExam != null ){
      dm.ehsDisplay=true;
    }else{
      dm.ehsDisplay=false;
    }
    //HRBP hrbpDiv
    if(this.$route.query.taskKey != null && this.$route.query.taskKey=='hrbp'){// || this.$route.query.taskKey=='hrbp2'
      dm.hrbpDisplay=true;
    }else if(dm.regionDisplay && dm.form.appraisalSalaryBenefits != null ){
      dm.hrbpDisplay=true;
    }else{
      dm.hrbpDisplay=false;
    }
    //hrbpDiv2
    if(this.$route.query.taskKey != null && this.$route.query.taskKey=='hrbp'){// || this.$route.query.taskKey=='hrbp2'
      dm.hrbp2Display=true;
    }else if(this.$route.query.taskKey=='departmentHead' || this.$route.query.taskKey=='headofHr'){
      dm.hrbp2Display=true;
    }else if(dm.regionDisplay && dm.form.boolSignedAgreement != null ){
      dm.hrbp2Display=true;
    }else{
      dm.hrbp2Display=false;
    }

    //Department Head departmentHeadDiv
    if(this.$route.query.taskKey != null && this.$route.query.taskKey=='departmentHead' && dm.form.boolSignedAgreement== 'Y'){
      dm.departmentHeadDisplay=true;
    }else if(this.$route.query.taskKey=='headofHr' && dm.form.boolSignedAgreement == 'Y'){
      dm.departmentHeadDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolSignedAgreement == 'Y' && dm.form.boolClauseExecution != null){
      dm.departmentHeadDisplay=true;
    }else{
      dm.departmentHeadDisplay=false;
    }

    //判断是否是平行审批
    if(this.$route.query.taskKey != null && dm.form.status==1 ){
      if(this.$route.query.taskKey == 'parallelDirectiveSupervisor' || this.$route.query.taskKey == 'parallelHrbp' 
        || this.$route.query.taskKey == 'administrationOfficer1' || this.$route.query.taskKey == 'administrationOfficer2' 
        || this.$route.query.taskKey == 'administrationOfficer3' || this.$route.query.taskKey == 'administrationOfficer4' 
        || this.$route.query.taskKey == 'trainingOfficer' || this.$route.query.taskKey == 'parallelEHS' 
        || this.$route.query.taskKey == 'parallelEHSOHC' || this.$route.query.taskKey == 'itOfficer' 
        || this.$route.query.taskKey == 'financeAccountant' ){
        dm.parallelConfirmation = true;
      }else{
        dm.parallelConfirmation = false;
      }
    }else if(this.$route.query.taskKey != null && dm.form.status==0 ){
      dm.parallelConfirmation = true;
    }else {
      dm.parallelConfirmation = false;
    }

    //Direct Supervisor directiveSupervisorDiv
    if(dm.parallelConfirmation && (dm.form.byDirect || this.$route.query.taskKey == 'parallelDirectiveSupervisor')){
      dm.directiveSupervisorDisplay=true;
      dm.directiveSupervisorA=true;
    }else if(dm.regionDisplay && dm.form.boolHandover != null){
      dm.directiveSupervisorDisplay=true;
      dm.directiveSupervisorA=false;
    }else{
      dm.directiveSupervisorDisplay=false;
      dm.directiveSupervisorA=false;
    }
    //administrationDeptDiv 
    if(dm.parallelConfirmation && ( (dm.form.byAdm1 || (dm.form.byAdm2 && dm.form.boolCompanyCar=='1') || dm.form.byAdm3 || dm.form.byAdm4) || ( this.$route.query.taskKey == 'administrationOfficer1' || (this.$route.query.taskKey == 'administrationOfficer2' && dm.form.boolCompanyCar=='1' ) || this.$route.query.taskKey == 'administrationOfficer3' || this.$route.query.taskKey == 'administrationOfficer4'))){
      dm.administrationDeptDisplay=true;
    }else if(dm.regionDisplay && (dm.form.boolReturnEmployeeCard != null || dm.form.boolReturnCompanyCar != null || dm.form.boolReturnDormitory != null || dm.form.boolReturnLockeKey != null)){
      dm.administrationDeptDisplay=true;
    }else{
      dm.administrationDeptDisplay=false;
    }
    //dept1 
    if(dm.parallelConfirmation && (dm.form.byAdm1 || this.$route.query.taskKey == 'administrationOfficer1') ){
      dm.dept1Display=true;
    }else if(dm.regionDisplay && dm.form.boolReturnEmployeeCard != null){
      dm.dept1Display=true;
    }else{
      dm.dept1Display=false;
    }
    //dept2
    if(dm.parallelConfirmation && (dm.form.byAdm2 || this.$route.query.taskKey == 'administrationOfficer2') && dm.form.boolCompanyCar=='1' ){
      dm.dept2Display=true;
    }else if(dm.regionDisplay && dm.form.boolReturnCompanyCar != null){
      dm.dept2Display=true;
    }else{
      dm.dept2Display=false;
    }
    //dept3
    if(dm.parallelConfirmation && (dm.form.byAdm3 || this.$route.query.taskKey == 'administrationOfficer3')){
      dm.dept3Display=true;
    }else if(dm.regionDisplay && dm.form.boolReturnDormitory != null){
      dm.dept3Display=true;
    }else{
      dm.dept3Display=false;
    }
    //dept4
    if(dm.parallelConfirmation && (dm.form.byAdm4 || this.$route.query.taskKey == 'administrationOfficer4') ){
      dm.dept4Display=true;
    }else if(dm.regionDisplay && dm.form.boolReturnLockeKey != null){
      dm.dept4Display=true;
    }else{
      dm.dept4Display=false;
    }
    //EHS/EHS OHC ehsDeptDiv
    if(dm.parallelConfirmation && (( this.$route.query.taskKey == 'parallelEHS' || this.$route.query.taskKey == 'parallelEHSOHC') || (dm.form.byEhs || dm.form.byEhsOhc) )){
      dm.ehsDeptDisplay=true;
    }else if(dm.regionDisplay && (dm.form.boolReturnShoes != null || dm.form.boolExamination != null )){
      dm.ehsDeptDisplay=true;
    }else{
      dm.ehsDeptDisplay=false;
    }
    //EHS  this.form.byEhs || (this.regionDisplay && this.ehsOhcValue)
    if(dm.parallelConfirmation && (dm.form.byEhs || this.$route.query.taskKey == 'parallelEHS')){
      dm.ehsTrDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolReturnShoes != null){
      dm.ehsTrDisplay=true;
    }else{
      dm.ehsTrDisplay=false;
    }
    //EHS OHC  this.form.byEhsOhc || (this.regionDisplay &&  this.ehsEhsValue)
    if( dm.parallelConfirmation && ( dm.form.byEhsOhc || this.$route.query.taskKey == 'parallelEHSOHC')){
      dm.ehsOhcTrDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolExamination != null){
      dm.ehsOhcTrDisplay=true;
    }else{
      dm.ehsOhcTrDisplay=false;
    }
    //Training hrTrainingDiv
    if(dm.parallelConfirmation && (dm.form.byHrTraining || this.$route.query.taskKey == 'trainingOfficer')){
      dm.hrTrainingDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolRefundTrainingExpense != null){
      dm.hrTrainingDisplay=true;
    }else{
      dm.hrTrainingDisplay=false;
    }
    //HRBP hrbpDeptDiv
    if(dm.parallelConfirmation && (dm.form.byHRBP || this.$route.query.taskKey == 'parallelHrbp' )){
      dm.hrbpDeptDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolHukouBond != null){
      dm.hrbpDeptDisplay=true;
    }else{
      dm.hrbpDeptDisplay=false;
    }
    //IT itDeptDiv
    if(dm.parallelConfirmation && (dm.form.byItDept || this.$route.query.taskKey == 'itOfficer' )){
      dm.itDeptDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolReturnSimCard != null){
      dm.itDeptDisplay=true;
    }else{
      dm.itDeptDisplay=false;
    }
    //Finance Accounting financeAccountingDiv
    if(dm.parallelConfirmation && (dm.form.byFinanceAccounting || this.$route.query.taskKey == 'financeAccountant')){
      dm.financeAccountingDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolAdvanceCompany != null){
      dm.financeAccountingDisplay=true;
    }else{
      dm.financeAccountingDisplay=false;
    }
    // HR C&B hrcbDiv
    if(this.$route.query.taskKey != null && (this.$route.query.taskKey == 'hrcb' || this.$route.query.taskKey == 'hrcb2')){
      dm.hrcbDisplay=true;
    }else if(dm.regionDisplay && dm.form.boolNetPay != null){
      dm.hrcbDisplay=true;
    }else{
      dm.hrcbDisplay=false;
    }
    //Finance Cashier financeCashierDiv
    if(this.$route.query.taskKey != null && this.$route.query.taskKey == 'financeCashier'){
      dm.financeCashierDisplay=true;
    }else if(dm.regionDisplay && dm.form.financeCashierTask != null){
      dm.financeCashierDisplay=true;
    }else{
      dm.financeCashierDisplay=false;
    }

    //控制按钮显示/隐藏
    //ConfirmwithsaveBtn
    if(this.$route.query.taskKey != null && this.$route.query.taskKey!='headofHr' 
      && this.$route.query.taskKey !='hrbpPreparation' && this.$route.query.taskKey !='directiveSupervisor'){
      if(dm.form.byHRBP){
		    if(this.$route.query.taskKey=='parallelHrbp'){
          dm.confirmwithsaveBtn=false;//是平行审批的HRBP
        }else if(this.$route.query.taskKey=='hrbp'){
          dm.confirmwithsaveBtn=true;//平行审批之前的HRBP
        }else{
          dm.confirmwithsaveBtn=false;
        }
      }else{
        dm.confirmwithsaveBtn=true;
      }
    }else{
      dm.confirmwithsaveBtn= false;
    }
    //Confirm
    if(this.$route.query.taskKey != null && this.$route.query.taskKey=='headofHr'){
      dm.confirmBtn=true;
    }else{
      dm.confirmBtn= false;
    }
    //confirmRejectBtn
    if(this.$route.query.taskKey != null && this.$route.query.taskKey=='directiveSupervisor'){
      dm.confirmRejectBtn=true;
    }else{
      dm.confirmRejectBtn= false;
    }
    //ConfirmwithSavePrint  平行审批的HRBP print
    if(this.$route.query.taskKey != null 
      && (dm.form.byHRBP || this.$route.query.taskKey=='parallelHrbp') //不可是平行审批外的任何Task
      && this.$route.query.taskKey!='hrbp' && this.$route.query.taskKey!='hrbpPreparation'
      && this.$route.query.taskKey!='headofHr' && this.$route.query.taskKey!='departmentHead'
      && this.$route.query.taskKey!='ehs' && this.$route.query.taskKey!='directiveSupervisor'
      && this.$route.query.taskKey!='financeCashier' && this.$route.query.taskKey!='hrcb' && this.$route.query.taskKey!='hrcb2'){
      dm.confirmwithSavePrintBtn=true;
    }else{
      dm.confirmwithSavePrintBtn= false;
    }
    //ConfirmWithPrint
    if(this.$route.query.taskKey != null && (this.$route.query.taskKey =='hrbpPreparation')){// || this.$route.query.taskKey =='hrbpPreparation2' 
      dm.confirmWithPrintBtn=true;
    }else{
      dm.confirmWithPrintBtn= false;
    }

    //Note
    dm.titleParallel="Disciplinary Supervisor、Administration Dept1、Administration Dept2、Administration Dept3、Administration Dept4、HR Dept -Training、HRBP、EHS Dept、EHS Dept -Occupational Physical Examination、IT Dept、Finance Accounting";
    dm.titleTips="Note:Please click in the check box for items that the employee need to return/finish. For any money deduction, please fill out the amount in the box behind the item.对于员工需要归还或完成的事项，请在方框里打勾。如有扣款，请将扣款金额填入事项后面的方框中。";
    dm.titleTips1="Note:This date is the last working date in office, please align with supervisor and HRBP.此日期为最后一个工作日期，请与直接主管和HRBP核对。";
    dm.titleTips2="Note:This date is the last date for end of contract date.此日期为最终合同日期。";
 
    dm.formClassCollapse1="panel-collapse collapse in";
    dm.iClassPlus1="fa fa-minus";
    dm.btnClass1="btn btn-box-tool"


    //判断各个信息区域的+ -是折叠还是展开
    if(this.$route.query.taskKey == 'hrbpPreparation'){// || this.$route.query.taskKey == 'hrbpPreparation2'
      dm.formClassCollapse="panel-collapse collapse";
      dm.iClassPlus="fa fa-plus";
      dm.btnClass="btn btn-box-tool collapsed"
    }else if(this.$route.query.taskKey == null && dm.form.byCreateUser && dm.form.status != null && dm.form.status !=2){
      //TaskKey 空，并且是本人  状态不是2  form.byCreateUser
      dm.formClassCollapse="panel-collapse collapse";
      dm.iClassPlus="fa fa-plus";
      dm.btnClass="btn btn-box-tool collapsed"
    }
    else{
      //展开
      dm.formClassCollapse="panel-collapse collapse in";
      dm.iClassPlus="fa fa-minus";
      dm.btnClass="btn btn-box-tool"
    }

    //代理是否也是审批人，控制 被代理角色区域置灰 deputyApproveRole
    var strs= new Array(); //定义一数组 
    dm.deputyHrbp=false;
    dm.deputyDirect=false;
    dm.deputyDept1=false;
    dm.deputyDept2=false;
    dm.deputyDept3=false;
    dm.deputyDept4=false;
    dm.deputyTraining=false;
    dm.deputyEhs=false;
    dm.deputyEhsOhc=false;
    dm.deputyIT=false;
    dm.deputyAccounting=false;

    if(dm.form.deputyApproveRole != "" && dm.form.deputyApproveRole != null){
      strs=dm.form.deputyApproveRole.split(","); //字符分割 
      for(i=0;i<strs.length ;i++ ) {
        if(strs[i]=='hrbp'){
          dm.deputyHrbp=true;
        }else if(strs[i]=='direct'){
          dm.deputyDirect=true;
        }else if(strs[i]=='dept1'){
          dm.deputyDept1=true;
        }else if(strs[i]=='dept2'){
          dm.deputyDept2=true;
        }else if(strs[i]=='dept3'){
          dm.deputyDept3=true;
        }else if(strs[i]=='dept4'){
          dm.deputyDept4=true;
        }else if(strs[i]=='training'){
          dm.deputyTraining=true;
        }else if(strs[i]=='ehs'){
          dm.deputyEhs=true;
        }else if(strs[i]=='ehsohc'){
          dm.deputyEhsOhc=true;
        }else if(strs[i]=='it'){
          dm.deputyIT=true;
        }else if(strs[i]=='accounting'){
          dm.deputyAccounting=true;
        }
      } 
    }   
    
    if(!dm.form.boolCallCost) {
			dm.boolCallCost = [];
		} else{
			dm.boolCallCost = [dm.form.boolCallCost];
    }

    return dm;
  },

  watch: {
    //form.netPayRemark
    // "form.netPayRemark":{
		// 	handler(curVal,oldVal){
		// 		var netPayRemark="";
		// 		if(this.form.netPayRemark != null){
    //       netPayRemark = this.form.netPayRemark.replace(/,/g, '');//去除千分符
    //     }else{
    //       netPayRemark="0";
    //     }
    //       var otherDeductionsRemark="";
    //       if(this.form.otherDeductionsRemark !=null){
    //         otherDeductionsRemark=this.form.otherDeductionsRemark.replace(/,/g, '');//先去除千分符
    //       }else{
    //         otherDeductionsRemark="0";
    //       }
    //       var netPayFinal= Number(netPayRemark) - Number(otherDeductionsRemark);
    //       //this.form.netPayFinal = this.formatCurrency2(netPayFinal);//正负都显示
    //       console.log("watch  netPayFinal="+netPayFinal);
    //       if(netPayFinal < 0){
    //         //minusNetPayRemark
    //         this.form.minusNetPayRemark=this.formatCurrency(netPayFinal);//处理掉负数
    //         this.form.netPayFinal = '-' + this.formatCurrency(netPayFinal);
    //       }else{
    //         this.form.minusNetPayRemark=this.formatCurrency(netPayFinal);//处理掉负数
    //         this.form.netPayFinal = this.formatCurrency(netPayFinal);
    //       }
    //       console.log("watch  minusNetPayRemark="+this.form.minusNetPayRemark);
    //       var newnum = this.formatCurrency2(this.form.netPayRemark);//正负都显示
    //       this.form.netPayRemark=newnum;
    //
    //
		// 	},
		// 	deep:true
    // },
    //boolNetPay
    "form.boolNetPay":{
			handler(curVal,oldVal){
        var netPayRemark="";
				if(this.form.netPayRemark != null){
          netPayRemark = this.form.netPayRemark.replace(/,/g, '');//去除千分符
        }else{
          netPayRemark="0";
        }
        var otherDeductionsRemark="";
        if(this.form.otherDeductionsRemark !=null){
          otherDeductionsRemark=this.form.otherDeductionsRemark.replace(/,/g, '');//先去除千分符
        }else{
          otherDeductionsRemark="0";
        }        
        var netPayFinal= Number(netPayRemark) - Number(otherDeductionsRemark);
        //this.form.netPayFinal = this.formatCurrency2(netPayFinal);//正负都显示
        console.log("watch  netPayFinal="+netPayFinal);
        if(netPayFinal < 0){
          //minusNetPayRemark
          this.form.minusNetPayRemark=this.formatCurrency(netPayFinal);//处理掉负数
          this.form.netPayFinal = '-' + this.formatCurrency(netPayFinal);
        }else{
          this.form.minusNetPayRemark="";
          //this.form.minusNetPayRemark=this.formatCurrency(netPayFinal);//处理掉负数
          this.form.netPayFinal = this.formatCurrency(netPayFinal);
        }
        console.log("watch form.boolNetPay minusNetPayRemark="+this.form.minusNetPayRemark);
        var newnum = this.formatCurrency2(this.form.netPayRemark);//正负都显示
        this.form.netPayRemark=newnum;
			},
			deep:true
    },

		
	},
  //在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
  mounted() {
	  this.$root.eventHub.$off('updateFormData');
    this.$root.eventHub.$on('updateFormData', (form) => {
    this.form = form;
    });
    //判断
    if((this.$route.query.taskKey=='trainingOfficer' || this.form.byHrTraining) && this.form.eclosingTrainingList.length < 1 
      && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
      this.insertItineraryRows();
    }
    //lastWorkingDate默认空,lastContractDate无值时为空
    if(this.form.status == null || this.form.status == 2 || this.form.status == 9){
      if(this.form.ifLastContractDate){
        this.form.lastContractDateString="--Please Select--";
      }
      if(this.form.ifLastWorkingDate){
        this.form.lastWorkingDateString="--Please Select--";
      }
    }

    if(this.form.status == 1){
      if(this.form.ifExaminationDate){
        this.form.examinationDate="";
      }
    }

    //trainingExpenseRemark
    if(this.form.trainingExpenseRefundRemark != null && this.$route.query.taskKey=='financeCashier' && this.form.trainingExpenseRemark == null){
      this.form.trainingExpenseRemark=this.form.trainingExpenseRefundRemark;
    }
    //hukouBondSettlementRemark
    if(this.form.hukouBondRefundRemark != null && this.$route.query.taskKey=='financeCashier' && this.form.hukouBondSettlementRemark == null){
      this.form.hukouBondSettlementRemark=this.form.hukouBondRefundRemark;
    }
    //reAdvanceFromCompanyRemark
    if(this.form.advanceFromCompanyRemark != null && this.$route.query.taskKey=='financeCashier' && this.form.reAdvanceFromCompanyRemark == null){
      this.form.reAdvanceFromCompanyRemark=this.form.advanceFromCompanyRemark;
    }
    //HR C&B审批时:Other Deductions (If any)其他扣减项（如有）：&& this.form.deductions != "0"
    //Load the sum of all deduction except Hukou Bond Settlement and Training Expense Settlement.
    if(this.form.deductions != null && (this.$route.query.taskKey=='hrcb' || this.$route.query.taskKey=='hrcb2' ) && this.form.otherDeductionsRemark == null){
      //this.form.otherDeductionsRemark=this.form.deductions;
      console.log("deductions="+this.form.deductions);
      var newnum = this.formatCurrency(this.form.deductions);
      console.log("newnum="+newnum);
      this.form.otherDeductionsRemark=newnum;
    }
    //折叠收缩
    $('body').on('click', '#minusplusbtnwped', function() {
			//console.log("0000");
			if($("#minusplusbtnwped").hasClass("collapsed")) {
				//console.log(111);
				$("#minusplusiwped").removeClass("fa-plus");
				$("#minusplusiwped").addClass("fa-minus");
			} else {
				//console.log(2222);
				$("#minusplusiwped").removeClass("fa-minus");
				$("#minusplusiwped").addClass("fa-plus");
			}
    });
    //Applicant
    $('body').on('click', '#minusplusbtnwpedApplicant', function() {
			if($("#minusplusbtnwpedApplicant").hasClass("collapsed")) {
				$("#minusplusiwpedApplicant").removeClass("fa-plus");
				$("#minusplusiwpedApplicant").addClass("fa-minus");
			} else {
				$("#minusplusiwpedApplicant").removeClass("fa-minus");
				$("#minusplusiwpedApplicant").addClass("fa-plus");
			}
    });
    //EhsOhc
    $('body').on('click', '#minusplusbtnwpedEhsOhc', function() {
			if($("#minusplusbtnwpedEhsOhc").hasClass("collapsed")) {
				$("#minusplusiwpedEhsOhc").removeClass("fa-plus");
				$("#minusplusiwpedEhsOhc").addClass("fa-minus");
			} else {
				$("#minusplusiwpedEhsOhc").removeClass("fa-minus");
				$("#minusplusiwpedEhsOhc").addClass("fa-plus");
			}
    });
    //Hrbp
    $('body').on('click', '#minusplusbtnwpedHrbp', function() {
			if($("#minusplusbtnwpedHrbp").hasClass("collapsed")) {
				$("#minusplusiwpedHrbp").removeClass("fa-plus");
				$("#minusplusiwpedHrbp").addClass("fa-minus");
			} else {
				$("#minusplusiwpedHrbp").removeClass("fa-minus");
				$("#minusplusiwpedHrbp").addClass("fa-plus");
			}
    });
    $('body').on('click', '#minusplusbtnwpedHrbp2', function() {
			if($("#minusplusbtnwpedHrbp2").hasClass("collapsed")) {
				$("#minusplusiwpedHrbp2").removeClass("fa-plus");
				$("#minusplusiwpedHrbp2").addClass("fa-minus");
			} else {
				$("#minusplusiwpedHrbp2").removeClass("fa-minus");
				$("#minusplusiwpedHrbp2").addClass("fa-plus");
			}
    });
    //Ds
    $('body').on('click', '#minusplusbtnwpedDs', function() {
			if($("#minusplusbtnwpedDs").hasClass("collapsed")) {
				$("#minusplusiwpedDs").removeClass("fa-plus");
				$("#minusplusiwpedDs").addClass("fa-minus");
			} else {
				$("#minusplusiwpedDs").removeClass("fa-minus");
				$("#minusplusiwpedDs").addClass("fa-plus");
			}
    });
    //Dept
    $('body').on('click', '#minusplusbtnwpedDept', function() {
			if($("#minusplusbtnwpedDept").hasClass("collapsed")) {
				$("#minusplusiwpedDept").removeClass("fa-plus");
				$("#minusplusiwpedDept").addClass("fa-minus");
			} else {
				$("#minusplusiwpedDept").removeClass("fa-minus");
				$("#minusplusiwpedDept").addClass("fa-plus");
			}
    });
    //EHS
    $('body').on('click', '#minusplusbtnwpedEHS', function() {
			if($("#minusplusbtnwpedEHS").hasClass("collapsed")) {
				$("#minusplusiwpedEHS").removeClass("fa-plus");
				$("#minusplusiwpedEHS").addClass("fa-minus");
			} else {
				$("#minusplusiwpedEHS").removeClass("fa-minus");
				$("#minusplusiwpedEHS").addClass("fa-plus");
			}
    });
    //Training
    $('body').on('click', '#minusplusbtnwpedTraining', function() {
			if($("#minusplusbtnwpedTraining").hasClass("collapsed")) {
				$("#minusplusiwpedTraining").removeClass("fa-plus");
				$("#minusplusiwpedTraining").addClass("fa-minus");
			} else {
				$("#minusplusiwpedTraining").removeClass("fa-minus");
				$("#minusplusiwpedTraining").addClass("fa-plus");
			}
    });
    //HRBP
    $('body').on('click', '#minusplusbtnwpedHRBP', function() {
			if($("#minusplusbtnwpedHRBP").hasClass("collapsed")) {
				$("#minusplusiwpedHRBP").removeClass("fa-plus");
				$("#minusplusiwpedHRBP").addClass("fa-minus");//折叠
			} else {
				$("#minusplusiwpedHRBP").removeClass("fa-minus");
				$("#minusplusiwpedHRBP").addClass("fa-plus");//展开
			}
    });
    //IT
    $('body').on('click', '#minusplusbtnwpedIT', function() {
			if($("#minusplusbtnwpedIT").hasClass("collapsed")) {
				$("#minusplusiwpedIT").removeClass("fa-plus");
				$("#minusplusiwpedIT").addClass("fa-minus");
			} else {
				$("#minusplusiwpedIT").removeClass("fa-minus");
				$("#minusplusiwpedIT").addClass("fa-plus");
			}
    });
    //Accounting
    $('body').on('click', '#minusplusbtnwpedAccounting', function() {
			if($("#minusplusbtnwpedAccounting").hasClass("collapsed")) {
				$("#minusplusiwpedAccounting").removeClass("fa-plus");
				$("#minusplusiwpedAccounting").addClass("fa-minus");
			} else {
				$("#minusplusiwpedAccounting").removeClass("fa-minus");
				$("#minusplusiwpedAccounting").addClass("fa-plus");
			}
    });
    //HRCB
    $('body').on('click', '#minusplusbtnwpedHRCB', function() {
			if($("#minusplusbtnwpedHRCB").hasClass("collapsed")) {
				$("#minusplusiwpedHRCB").removeClass("fa-plus");
				$("#minusplusiwpedHRCB").addClass("fa-minus");
			} else {
				$("#minusplusiwpedHRCB").removeClass("fa-minus");
				$("#minusplusiwpedHRCB").addClass("fa-plus");
			}
    });
    //Cahier
    $('body').on('click', '#minusplusbtnwpedCahier', function() {
			if($("#minusplusbtnwpedCahier").hasClass("collapsed")) {
				$("#minusplusiwpedCahier").removeClass("fa-plus");
				$("#minusplusiwpedCahier").addClass("fa-minus");
			} else {
				$("#minusplusiwpedCahier").removeClass("fa-minus");
				$("#minusplusiwpedCahier").addClass("fa-plus");
			}
    });

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
    otherRulesFse:{
      get: function() {
        if(this.form.ifFse){
          return "required";
        }else{
          return "";
        }
      }
    },
    otherRulesNoFse:{
      get: function() {
        if(this.form.ifNoFse){
          return "required";
        }else{
          return "";
        }
      }
    },

    
    
    
    //控制selectanemployee checkbox显示/隐藏
    selectanemployeeCheck:{
      get:function(){
        if(this.form.hrbp && this.form.status == null){
          return true;
        }else if(this.form.hrbp && (this.form.status == 2 || this.form.status == 9) && this.form.createUserId ==localStorage.getItem("uid") ){//&& this.form.createUserId != this.form.applicantUserId
          return true;
        }else{
          return false;
        }
      }
    },
    
    //Last Working Date 最终工作日期 计算readonly的值
    lastWorkingReadonly:{
      get: function() {
        var uid = localStorage.getItem("uid");//判断是代理、且是自己的单子
        var selfFlag = (this.form.createUserId == uid && this.form.ifDeputy);
        if(this.form.byHRBP && this.form.status != null && this.form.status==1 ){
          if(!selfFlag && this.processTaskKey == 'hrbp' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
            return false;
          }else if(this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
            return true;//从myApproval进来就是只读
          }else {
            return true;//departmentHead及其他审批都是 只读
          }
        }else if(this.form.status==null || this.form.status==2 ){
          return false;//draft
        }else if(this.form.status==9 && this.form.createUserId == uid){
          return false;//draft
        }else{
          return true;
        }
      }
    },
    //申请人信息 离职信息的 只读控制
    readonly: {
      // 动态计算readonly的值
      get: function() {
        return (
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("edit") == -1) ||
          (this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
      }
    },
    //HRBP最终审判 申请人查看申请时可以看所有已审批的信息 只读控制
    readonlyHrbpPreparation: {
      // 动态计算readonly的值
      get: function() {
        var uid = localStorage.getItem("uid");
        var selfFlag = (this.form.createUserId == uid && this.form.ifDeputy);
        if(this.processTaskKey == 'hrbpPreparation'){// || this.processTaskKey == 'hrbpPreparation2'
          return true;
        }else if(this.processTaskKey == null && this.form.byCreateUser && this.form.status != null && this.form.status !=2){
          //processTaskKey 空，并且是本人  状态不是2  form.byCreateUser
          return true;
        }else if(this.form.status!=2 && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从myApprove进来就是只读
        }//非平行审批并且是本人申请，且是代理
        else if(selfFlag && (this.processTaskKey == 'directiveSupervisor' || this.processTaskKey == 'ehs' || this.processTaskKey == 'hrbp'
         || this.processTaskKey == 'departmentHead' || this.processTaskKey == 'headofHr' )){
          return true;
        }else{
          return false;
        }
      }
    },
    //竞业限制 只读控制
    signedAgreementDisabled:{
      get: function() {
        var uid = localStorage.getItem("uid");
        var selfFlag = (this.form.createUserId == uid && this.form.ifDeputy);
        if(!selfFlag && this.processTaskKey == 'hrbp' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1 )){// || this.processTaskKey == 'hrbp2'
          return false;
        }else if(this.processTaskKey == 'departmentHead' || this.processTaskKey == 'headofHr'){
          return true;
        }else if(this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从myApprove进来就是只读
        }else{
          return true;
        }
      }
    },
    //竞业限制保留 放弃 只读控制
    clauseExecutionDisabled:{
      get: function() {
        var uid = localStorage.getItem("uid");
        var selfFlag = (this.form.createUserId == uid && this.form.ifDeputy);
        if(this.processTaskKey == 'hrbp' || this.processTaskKey == 'headofHr'){
          return true;
        }else if(!selfFlag && this.processTaskKey == 'departmentHead' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1 )){
          return false;
        }else if(this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从myApprove进来就是只读
        }else{
          return true;
        }
      }
    },
    //Examination Date 日期框的只读控制
    examinationDateDisabled:{
      get: function() {
        if(this.processTaskKey == 'ehs' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;
        }else if(this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从myApprove进来就是只读
        }else{
          return true;
        }
      }
    },
    
    deputySelfApprove:{
      get:function(){
        //平行审批，并且是代理，并且是本人申请的
        if(this.$route.query.taskKey == 'parallelDirectiveSupervisor' || this.$route.query.taskKey == 'parallelHrbp' 
        || this.$route.query.taskKey == 'administrationOfficer1' || this.$route.query.taskKey == 'administrationOfficer2' || this.$route.query.taskKey == 'administrationOfficer3' || this.$route.query.taskKey == 'administrationOfficer4' 
        || this.$route.query.taskKey == 'trainingOfficer' || this.$route.query.taskKey == 'parallelEHS' || this.$route.query.taskKey == 'parallelEHSOHC' || this.$route.query.taskKey == 'itOfficer' || this.$route.query.taskKey == 'financeAccountant' 
        ){
          if(this.form.ifHasConfirm){
            return true;//有按钮
          }else{
            return false;//无按钮
          }
        }else{//非平行审批，并且是代理，并且是本人申请的
          if(this.form.ifDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return false;//无按钮
          }else{
            return true;//有按钮
          }
        }
      }
    },
    //控制离职信息显示哪块区域
    showResignationInfoAll:{
      get:function(){
        if((this.form.status==null || this.form.status==2 || this.form.status==9 )&& this.processTaskKey == null){
          return true;//my applicaton 申请时
        }else if(this.form.status==9 && this.form.byCreateUser){
          return true;//拒绝后 resubmit页面
        }else if(this.form.status==1 || this.form.status==0){
          if(this.processTaskKey != null && 
          (this.processTaskKey == 'directiveSupervisor' || this.processTaskKey == 'hrbp' 
          || this.processTaskKey == 'departmentHead' || this.processTaskKey == 'headofHr' 
          || this.processTaskKey == 'parallelHrbp' || this.processTaskKey == 'hrbpPreparation' ) ){
            return true;
          }else if(this.form.byCreateUser){
            return true;//本人申请的
          }else{
            return false;
          }
        }else{
          return false;
        }

        //if(this.form.status!=2 && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){

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
      },
    },
    showDirectSupervisorInfo :function(){
      return this.GL.hasRole('IT Client Service');
    },
    approvalFlow: function(){
      if(this.form.immediateTermination != null && (this.form.immediateTermination==true || this.form.immediateTermination=='true') ){
        return false;
      }else if(this.form.ifFse){
        return false;
      }else{
        return true;
      }
    },
    uploadShow: {
      get: function() {
        if(this.form.status== null || this.form.status==2){
          console.log("uploadShow  true  1");
          return true;
        }else if(this.form.status==9 && (this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm") ){
          console.log("uploadShow  true  2");
          return true;
        }else if(this.form.resId != null && this.form.resId !=""){//有值则显示 
          console.log("uploadShow  true  3");
          return true;
        }else{
          console.log("uploadShow  false  4");
          return false;
        }
      }
    },
    //附件显示
    uploadDsShow: {
      get: function() {
        if((this.form.status==1 || this.form.status==0) 
          && this.parallelConfirmation && (this.form.byDirect || this.$route.query.taskKey == 'parallelDirectiveSupervisor')){
          console.log("uploadDsShow  true");
          return true;
        }else if(this.form.dsId != null && this.form.dsId !=""){//有值则显示 dsAttachments
          console.log("uploadDsShow  true");
          return true;
        }else{
          console.log("uploadDsShow  false");
          return false;
        }
      }
    },
   
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
/*.bg-gray-light*/
table#ResignationReasonTable td.is-safe,table#ResignationReasonTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#DirectSupervisorTable td.is-safe,table#DirectSupervisorTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#DepartmentTable td.is-safe,table#DepartmentTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#EHSTable td.is-safe,table#EHSTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#HRBPTable td.is-safe,table#HRBPTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#TrainingTable td.is-safe,table#TrainingTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#ITTable td.is-safe,table#ITTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#AccountingTable td.is-safe,table#AccountingTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#HrcbTable td.is-safe,table#HrcbTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}
table#CahierTable td.is-safe,table#CahierTable th {
  border: 1px solid #e4e4e4 !important;
  white-space: normal !important;
}

</style>

<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Job Description 职位描述申请</h1>
      <ol class="breadcrumb" v-if="approvalFlow1"><!--AM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.MK / OMK</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow2"><!--MK-->
        <li><a >1.Applicant</a></li>
        <li><a >2.OMK</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow3"><!--OMK-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BOMC</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow32"><!--OMK-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BOMT</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow4"><!--BOM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.Orga Partner</a></li>
        <li><a >3.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow41"><!--BOM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BoM T</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow42"><!--BOM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BoM C</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow5"><!--Orga Partner-->
        <li><a >1.Applicant</a></li>
        <li><a >2.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow51"><!--Orga Partner-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BoM C</a></li>
        <li><a >3.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow52"><!--Orga Partner-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BoM T</a></li>
        <li><a >3.Head of CHO</a></li>
      </ol>
      <ol class="breadcrumb" v-else>
        <li><a >1.Applicant</a></li>
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
			  <h3 class="box-title">Applicant Information&nbsp;申请人信息</h3>
			</div>
      <form role="form" >
				<input type="hidden" v-model="form.id" name="id">
				<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
				<input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
				<div class="box-body">
					<div class="row">
            <form-group col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="true" label="JobDescriptionApplication.creatorStaffcode"></form-group>
            <form-group col="md-3" type="input" v-model="form.creatorName" name="name" readonly="true" label="JobDescriptionApplication.name"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorTelephone" name="creatorTelephone" readonly="true" label="JobDescriptionApplication.creatorTelephone"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorDept" name="creatorDept" readonly="true" label="JobDescriptionApplication.creatorDept"></form-group>
					</div>
        </div>
			</form>
    </div>
    
    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Organization Setting 组织结构设置</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle1"></i>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              Please select the position for which you want to apply for Job Description. In case of selecting serveral position, be reminded that these position should have the same Job Description. 
              In case of updating an existing Job Description, please select the respective position which is marked with existing Job Description.
              After selecting, the information of the previous Job Description will be loaded into APON automatically.
            </div>
          </div>
          
					<div class="row">
            <form-group col="md-3" type="input" other-rules="required" v-model="form.positionName" name="positionName" readonly="true" label="JobDescriptionApplication.positionName"></form-group>
            <form-group col="md-3" type="input" v-model="form.reportTo" name="reportTo" readonly="true" label="JobDescriptionApplication.reportTo"></form-group>
            <form-group col="md-3" type="input" v-model="form.divisionDepartment" name="divisionDepartment" readonly="true" label="JobDescriptionApplication.divisionDepartment"></form-group>
            <!--approverReadonly-->
            <form-group col="md-3" type="datepicker" other-rules="required" v-model="form.organizationSettingDate" name="organizationSettingDate" :readonly="readonly" label="JobDescriptionApplication.organizationSettingDate"></form-group>
          </div>
          <div class="row">
            <form-group col="md-3" type="input" v-model="form.approvalDirectSupervisor" name="approvalDirectSupervisor" readonly="true" label="JobDescriptionApplication.approvalDirectSupervisor"></form-group>
            <form-group col="md-3" type="input" v-model="form.approvalPositionHolder" name="approvalPositionHolder" readonly="true" label="JobDescriptionApplication.approvalPositionHolder"></form-group>
            <form-group col="md-3" type="input" v-model="form.approvalFurtherParty" name="approvalFurtherParty" :readonly="approvalFurtherPartyReadonly" label="JobDescriptionApplication.approvalFurtherParty" placeholder="Filled by Orga. partner"></form-group>
          </div>
				</div>
			</form>
		</div>
    
    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Scope, Objective and Relevance of Position 职位的范围，目标和相关性</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle2"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Old Scope, Objective and Relevance of Position 原职位的范围，目标和相关性</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="positionScopeObjectiveStyle" other-rules="required" haslable="false" v-model="formExist.positionScopeObjective" name="positionScopeObjective" :readonly="readonly" label="JobDescriptionApplication.positionScopeObjective" placeholder=""></form-group>
            </div>
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              New Scope, Objective and Relevance of Position 新职位的范围，目标和相关性</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="positionScopeObjectiveStyle" other-rules="required" haslable="false" v-model="form.positionScopeObjective" name="positionScopeObjective" :readonly="readonly" label="JobDescriptionApplication.positionScopeObjective" placeholder=""></form-group>
            </div>
          </div>   
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Range of Responsibility 责任范围</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle3"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Old Range of Responsibility 原责任范围</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="responsibilityRangeStyle" other-rules="required" haslable="false" v-model="formExist.responsibilityRange" name="responsibilityRange" :readonly="readonly" label="JobDescriptionApplication.responsibilityRange" placeholder=""></form-group>
            </div>
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              New Range of Responsibility 新责任范围</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="responsibilityRangeStyle" other-rules="required" haslable="false" v-model="form.responsibilityRange" name="responsibilityRange" :readonly="readonly" label="JobDescriptionApplication.responsibilityRange" placeholder=""></form-group>
            </div>
          </div>   
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
			  <h3 class="box-title">Key Tasks and Responsibilities 主要任务和责任</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle4"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="col-md-6">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="45%">Old Task Description <br />原任务描述</th>
                <th class="text-center" width="25%">Old Responsibility <br />原责任</th>
                <th class="text-center" v-if="readonly" width="25%">Old Interface Partners <br />原接口伙伴</th>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in formExist.jdaTasksList" style="height: 15px;">
                <td class="text-center">{{index+1}}
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <!--<input type="hidden" class="form-control" id="" v-model="entry.item">-->
                </td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  <form-group type="input4" :hasstyle="entry.taskDescriptionStyle" other-rules="required|max:75" haslable="false" :disabled="readonly" :name="'taskDescription'+(index+1)" :id="'taskDescription'+index" v-model="entry.taskDescription"></form-group>
                </td>
                <td>
                  <form-group type="select" :hasstyle="entry.taskDescriptionStyle" uri="/dict/list?groupName=Responsibility" other-rules="required" haslable="false" :disabled="readonly" :name="'responsibility'+(index+1)" :id="'responsibility'+index" v-model="entry.responsibility"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.interfacePartnersStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'interfacePartners'+(index+1)" :id="'interfacePartners'+index" v-model="entry.interfacePartners"  ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>

            <div class="col-md-6">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="45%">New Task Description <br />新任务描述</th>
                <th class="text-center" width="25%">New Responsibility <br />新责任</th>
                <th class="text-center" v-if="readonly" width="25%">New Interface Partners <br />新接口伙伴</th>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.jdaTasksList" style="height: 15px;">
                <td class="text-center">{{index+1}}
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <!--<input type="hidden" class="form-control" id="" v-model="entry.item">-->
                </td>
                <td  style="table-layout:fixed;word-break:break-all;width:250px;">
                  <form-group type="input4" :hasstyle="entry.taskDescriptionStyle" other-rules="required|max:75" haslable="false" :disabled="readonly" :name="'taskDescription'+(index+1)" :id="'taskDescription'+index" v-model="entry.taskDescription"></form-group>
                </td>
                <td>
                  <form-group type="select" :hasstyle="entry.taskDescriptionStyle" uri="/dict/list?groupName=Responsibility" other-rules="required" haslable="false" :disabled="readonly" :name="'responsibility'+(index+1)" :id="'responsibility'+index" v-model="entry.responsibility"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.interfacePartnersStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'interfacePartners'+(index+1)" :id="'interfacePartners'+index" v-model="entry.interfacePartners"  ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>   
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Qualification and Skills 资格和技能</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle5"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Old Qualification and Skills 原资格和技能</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="qualificationSkillsStyle" other-rules="required" haslable="false" v-model="formExist.qualificationSkills" name="qualificationSkills" :readonly="readonly" label="JobDescriptionApplication.qualificationSkills" placeholder=""></form-group>
            </div>
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              New Qualification and Skills 新资格和技能</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="qualificationSkillsStyle" other-rules="required" haslable="false" v-model="form.qualificationSkills" name="qualificationSkills" :readonly="readonly" label="JobDescriptionApplication.qualificationSkills" placeholder=""></form-group>
            </div>
          </div>   
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Quantitative Indicators 量化指标</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle6"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="col-md-6">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="45%">Old Indicators <br />原标志</th><!--<i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>-->
                <th class="text-center" width="25%">Old Unit <br />原单位</th>
                <th class="text-center" width="25%">Old Value<br />原值</th>
              </tr>
              <tr>
                <th class="text-center" colspan="5" style="background-color:gray;">
                  <font color="white">I. General indicators -  e.g.: budget (personnel costs and overhead costs)</font>
                </th>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">1</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  [Budget – directly allotted – direct cost center + subordinated cost centers]<br />
                  (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                </td>
                <td>
                  <form-group type="select" :hasstyle="unitOneStyle" uri="/dict/list?groupName=JDA Currency" haslable="false" :disabled="readonly" name="unitOne" v-model="formExist.unitOne"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueOneStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueOne" v-model="formExist.indicatorsValueOne" placeholder="in Mio. p.a. + period"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">2</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  [Budget – directly allotted – direct cost center]<br />
                  (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                </td>
                <td>
                  <form-group type="select" :hasstyle="unitTwoStyle" uri="/dict/list?groupName=JDA Currency" haslable="false" :disabled="readonly" name="unitTwo" v-model="formExist.unitTwo"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueTwoStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueTwo" v-model="formExist.indicatorsValueTwo" placeholder="in Mio. p.a. + period"  ></form-group>				
                </td>
              </tr>
              <tr>
                <th class="text-center" colspan="5" style="background-color:gray;">
                  <font color="white">II.	Function specific indicators (monetary/non-monetary)</font>
                </th>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">3</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  Monetary
                </td>
                <td>
                  <form-group type="select" :hasstyle="unitThreeStyle" uri="/dict/list?groupName=JDA Currency" haslable="false" :disabled="readonly" name="unitThree" v-model="formExist.unitThree"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueThreeStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueThree" v-model="formExist.indicatorsValueThree" placeholder="in Mio. p.a. + period" ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">4</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                 Non-monetary
                </td>
                <td>
                  <form-group type="input4" :hasstyle="unitFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="unitFour" v-model="formExist.unitFour" placeholder="" ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueFour" v-model="formExist.indicatorsValueFour" placeholder="amount + period" ></form-group>				
                </td>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in formExist.jdaIndicatorsList" style="height: 15px;">
                <td class="text-center">{{index+5}}
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.indicatorsStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'indicators'+(index+1)" :id="'indicators'+index" v-model="entry.indicators"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.unitStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'unit'+(index+1)" :id="'unit'+index" v-model="entry.unit"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.indicatorsValueStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'indicatorsValue'+(index+1)" :id="'indicatorsValue'+index" v-model="entry.indicatorsValue"  ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>

            <div class="col-md-6">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="45%">New Indicators <br />新标志</th>
                <th class="text-center" width="25%">New Unit <br />新单位</th>
                <th class="text-center" width="25%">New Value<br />新值</th>
              </tr>
              <tr>
                <th class="text-center" colspan="4" style="background-color:gray;">
                  <font color="white">I. General indicators -  e.g.: budget (personnel costs and overhead costs)</font>
                </th>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">1</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  [Budget – directly allotted – direct cost center + subordinated cost centers]<br />
                  (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                </td>
                <td>
                  <form-group type="select" :hasstyle="unitOneStyle" uri="/dict/list?groupName=JDA Currency" haslable="false" :disabled="readonly" name="unitOne" v-model="form.unitOne"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueOneStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueOne" v-model="form.indicatorsValueOne" placeholder="in Mio. p.a. + period"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">2</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  [Budget – directly allotted – direct cost center]<br />
                  (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                </td>
                <td>
                  <form-group type="select" :hasstyle="unitTwoStyle" uri="/dict/list?groupName=JDA Currency" haslable="false" :disabled="readonly" name="unitTwo" v-model="form.unitTwo"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueTwoStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueTwo" v-model="form.indicatorsValueTwo" placeholder="in Mio. p.a. + period"  ></form-group>				
                </td>
              </tr>
              <tr>
                <th class="text-center" colspan="4" style="background-color:gray;">
                  <font color="white">II.	Function specific indicators (monetary/non-monetary)</font>
                </th>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">3</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  Monetary
                </td>
                <td>
                  <form-group type="select" :hasstyle="unitThreeStyle" uri="/dict/list?groupName=JDA Currency" haslable="false" :disabled="readonly" name="unitThree" v-model="form.unitThree"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueThreeStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueThree" v-model="form.indicatorsValueThree" placeholder="in Mio. p.a. + period" ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">4</td>
                <td style="table-layout:fixed;word-break:break-all;width:250px;">
                  Non-monetary
                </td>
                <td>
                  <form-group type="input4" :hasstyle="unitFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="unitFour" v-model="form.unitFour" placeholder="" ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="indicatorsValueFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueFour" v-model="form.indicatorsValueFour" placeholder="amount + period" ></form-group>				
                </td>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.jdaIndicatorsList" style="height: 15px;">
                <td class="text-center">{{index+5}}
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.indicatorsStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'indicators'+(index+1)" :id="'indicators'+index" v-model="entry.indicators"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.unitStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'unit'+(index+1)" :id="'unit'+index" v-model="entry.unit"  ></form-group>				
                </td>
                <td>
                  <form-group type="input4" :hasstyle="entry.indicatorsValueStyle" other-rules="required|max:75" haslable="false" :disabled="readonly"  :name="'indicatorsValue'+(index+1)" :id="'indicatorsValue'+index" v-model="entry.indicatorsValue"  ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div><br />  
          <div class="row">
            <div class="form-group col-md-6">
              <label>Old Optional Remarks 原可选的备注</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="indicatorsRemarksStyle" haslable="false" v-model="formExist.indicatorsRemarks" name="indicatorsRemarks" :readonly="readonly" label="JobDescriptionApplication.indicatorsRemarks" placeholder=""></form-group>
            </div>
            <div class="form-group col-md-6">
              <label>New Optional Remarks 新可选的备注</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="indicatorsRemarksStyle" haslable="false" v-model="form.indicatorsRemarks" name="indicatorsRemarks" :readonly="readonly" label="JobDescriptionApplication.indicatorsRemarks" placeholder=""></form-group>
            </div>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Leadership and Coordination Responsibility 领导和协调责任</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle7"></i>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-6">
              <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              <label>Old Personnel Responsibility 原人员职责</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal;">
                <input type="radio" :disabled="readonly" v-model="formExist.personnelResponsibility" name="personnelResponsibilityOld" value="Yes" >&nbsp;<font :style="personnelResponsibilityStyle">Yes</font>
              </label>&nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal;">
                <input type="radio" :disabled="readonly" v-model="formExist.personnelResponsibility" name="personnelResponsibilityOld" value="No" >&nbsp;<font :style="personnelResponsibilityStyle">No</font>
              </label>
            </div>

            <div class="form-group col-md-6">
              <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              <label>New Personnel Responsibility 新人员职责</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal;">
                <input type="radio" :disabled="readonly" v-model="form.personnelResponsibility" name="personnelResponsibility" value="Yes" >&nbsp;<font :style="personnelResponsibilityStyle">Yes</font>
              </label>&nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal;">
                <input type="radio" :disabled="readonly" v-model="form.personnelResponsibility" name="personnelResponsibility" value="No" >&nbsp;<font :style="personnelResponsibilityStyle">No</font>
              </label>
            </div>

          </div>
					<div class="row">
            <div class="col-md-6">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="45%">Old Responsibility Type <br />原责任类型</th>
                <th class="text-center" width="15%">Old Number of Employees <br />原员工数量</th>
                <th class="text-center" width="35%">Old Remarks  <br />原备注</th>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">1</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Span of control I (Number of employees that are led directly and disciplinarily, based on approved Zielwert) 
                </td>
                <td><!--
                  <input :disabled="readonly" type="number" :class="{'form-control':true,'pull-left': true,'input':true }" name="employeeNumber" id="employeeNumber" v-model="form.employeeNumber" >
                  -->
                  <form-group :hasstyle="employeeNumberStyle" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber" v-model="formExist.employeeNumber"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarksStyle" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks" v-model="formExist.leadershiRemarks"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">2</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Span of supervision (Number of employees within the whole area of disciplinary responsibility) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumber2Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber2" v-model="formExist.employeeNumber2"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks2Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks2" v-model="formExist.leadershiRemarks2"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">3</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Optional: span of control II (in addition – number of employees, that are led 100% functionally) (add explanation as to which employees under “optional remarks”) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumber3Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber3" v-model="formExist.employeeNumber3"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks3Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks3" v-model="formExist.leadershiRemarks3"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">4</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Optional: number of employees from external partners, that are coordinated on a regular, daily manner (add explanation as to which employees under “remarks”) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumber4Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber4" v-model="formExist.employeeNumber4"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks4Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks4" v-model="formExist.leadershiRemarks4"  ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>
            
            <div class="col-md-6">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="45%">New Responsibility Type <br />新责任类型</th>
                <th class="text-center" width="15%">New Number of Employees <br />新员工数量</th>
                <th class="text-center" width="35%">New Remarks  <br />新备注</th>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">1</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Span of control I (Number of employees that are led directly and disciplinarily, based on approved Zielwert) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumberStyle" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber" v-model="form.employeeNumber"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarksStyle" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks" v-model="form.leadershiRemarks"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">2</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Span of supervision (Number of employees within the whole area of disciplinary responsibility) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumber2Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber2" v-model="form.employeeNumber2"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks2Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks2" v-model="form.leadershiRemarks2"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">3</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Optional: span of control II (in addition – number of employees, that are led 100% functionally) (add explanation as to which employees under “optional remarks”) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumber3Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber3" v-model="form.employeeNumber3"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks3Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks3" v-model="form.leadershiRemarks3"  ></form-group>				
                </td>
              </tr>
              <tr style="height: 15px;">
                <td class="text-center">4</td>
                <td  style="table-layout:fixed;word-break:break-all;">
                  Optional: number of employees from external partners, that are coordinated on a regular, daily manner (add explanation as to which employees under “remarks”) 
                </td>
                <td>
                  <form-group :hasstyle="employeeNumber4Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber4" v-model="form.employeeNumber4"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks4Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks4" v-model="form.leadershiRemarks4"  ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>   
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Further Remarks 更多备注</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle8"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-6">
              <label>Old Further Remarks 原更多备注</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="furtherRemarksStyle" haslable="false" v-model="formExist.furtherRemarks" name="furtherRemarks" :readonly="readonly" label="JobDescriptionApplication.furtherRemarks" placeholder=""></form-group>
            </div>
            <div class="form-group col-md-6">
              <label>New Further Remarks 新更多备注</label>
              <form-group limit="5000" type="textareaEnglish" :hasstyle="furtherRemarksStyle" haslable="false" v-model="form.furtherRemarks" name="furtherRemarks" :readonly="readonly" label="JobDescriptionApplication.furtherRemarks" placeholder=""></form-group>
            </div>
          </div>   
				</div>
			</form>
		</div>
    <!--
    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Upload Organization Charts 上传组织结构图</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle9"></i>
        &nbsp;&nbsp;&nbsp;
        <a href="###" @click="getOrganizationChartsTemplate" target="_blank"> Organization Charts Template 组织结构图模板</a>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <upload3 class="col-md-12" accept=".jpg,.png" :readonly="readonly" v-model="form.ocAttachmentIds" buttonText="Attachments" :attachments="form.ocAttachments" multi="true" required="false"></upload3>
          </div>  
				</div>
			</form>
		</div>
    -->

    <!--
    <div class="box box-primary" v-if="functionGradingShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Function Grading 岗位级别</h3>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <form-group col="md-3" type="input" other-rules="required" v-model="form.functionGrading" name="functionGrading" :readonly="functionGradingReadonly" label="JobDescriptionApplication.functionGrading"></form-group>
					</div>  
				</div>
			</form>
		</div>
    -->

    <div class="checkbox mar-bot-5" v-if="!readonly" >
      <label>
        <span class="help is-danger" v-show="errors.has('terms')">
						{{$t("checkPolicyNotice")}}
				</span>
        <input name="terms" type="checkbox" v-validate="'required'" >
        <!--When submitting the application, I have read and agreed to relevant policies of Volkswagen Automatic Transmission Tianjin.
        当提交此申请时，我已经理解并承诺遵守大众汽车变速器（天津）有限公司的相关政策。
        -->
        When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
        当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。
        <br /><br />
      </label>
    </div>

      <comment v-if="processTaskId !=null && form.status != 9 && ckeckInApproveFlow" v-model="form.approval.approvalRemark" name="approval.approvalRemark"></comment>
      
      <router-view id="JobDescriptionApplicationSubmit" v-else :form="form" entityId="JobDescriptionApplication" vclass="btn-left" uri="/form/JobDescriptionApplication/update" :validator="this.$validator"  v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel"></router-view>      
      
      <comment-list v-if="form.processInstanceId !=null"></comment-list>
      
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
var ok = false;
export default {
  name: "JobDescriptionApplication",
  methods: {
    checkStatus: function(status) {
      //BR.001
      if(status == 1 && this.$route.query.taskKey == null && this.$route.query.processInstanceId == null){
        var router = this.$router;
        alert("process.env.MODE="+process.env.MODE);//dev
        if(process.env.MODE === 'dev'){//原来是apon  看dev.env.js文件中的配置
          top.location.href = Config.getAPONURL();//看http.js文件 原来是getAPONURL
        }else{
          router.push({ path: '/index/application'});
        }
      }
    },
    beforesubmit: function() {},
    beforeapprovel: function() {},
    

    //下载PPT模板
    getOrganizationChartsTemplate: function() {
      var url = Config.getBaseURL() + "/jobDescriptionApplication/getOrganizationChartsTemplate" + "?token=" + Config.getToken();
		  var showSelectWin = window.open(url);
		  showSelectWin.focus();
    },
    //只可是数字
    oninputNum:function(e){
      if(this.form.employeeNumber != null){
        this.form.employeeNumber=this.form.employeeNumber.replace(/[^\d]/g,'');
        var num = this.form.employeeNumber;
        if(""==num || isNaN(num)){
          this.form.employeeNumber ="0";
        }
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
        if('' == cents){
          if(num.length>1 && '0' == num.substr(0,1)){
            this.form.employeeNumber ="0";
          }
        }
      }
      if(this.form.employeeNumber2 != null){
        this.form.employeeNumber2 = this.form.employeeNumber2.replace(/[^\d]/g,'');
        var num = this.form.employeeNumber2;
        if(""==num || isNaN(num)){
          this.form.employeeNumber2 ="0";
        }
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
        if('' == cents){
          if(num.length>1 && '0' == num.substr(0,1)){
            this.form.employeeNumber2 ="0";
          }
        }
      }
      if(this.form.employeeNumber3 != null){
        this.form.employeeNumber3 = this.form.employeeNumber3.replace(/[^\d]/g,'');
        var num = this.form.employeeNumber3;
        if(""==num || isNaN(num)){
          this.form.employeeNumber3 ="0";
        }
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
        if('' == cents){
          if(num.length>1 && '0' == num.substr(0,1)){
            this.form.employeeNumber3 ="0";
          }
        }
      }
      if(this.form.employeeNumber4 != null){
        this.form.employeeNumber4 = this.form.employeeNumber4.replace(/[^\d]/g,'');
        var num = this.form.employeeNumber4;
        if(""==num || isNaN(num)){
          this.form.employeeNumber4 ="0";
        }
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
        if('' == cents){
          if(num.length>1 && '0' == num.substr(0,1)){
            this.form.employeeNumber4 ="0";
          }
        }
      }


    },


  },
  data() {
    //返回的数据对象
    var dm = {};
    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    console.log("Review Change  id="+id);
    if (id) {
      //var url = "/form/JobDescriptionApplication/get/" + id;
      var url = "/jobDescriptionApplication/getReviewChange/" + id;
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
    

    dm.organizationSettingTitle1="Please describe the organizational setting of the position within the scope of the company.";
    dm.organizationSettingTitle2="Please describe the core mission and objectives of the position as well as its importance and contribution to overall business results / success.";
    dm.organizationSettingTitle3="Please describe the area of responsibility in terms of companies, entities, business units, departments, regions, locations, products, modules. (Phrasing example: This position holds the responsibility for the described tasks for the following entities, divisions, departments, etc.).";
    dm.organizationSettingTitle4="Please describe the key tasks that are executed in this position with corresponding core interface partners (internal and external). Please define the degree of responsibility.";
    dm.organizationSettingTitle5="Please describe the minimum required qualifications and skills in terms of education, professional experience (be specific on the years of experience needed), special skills etc. to perform the function in scope.";
    dm.organizationSettingTitle6="Please state the following indicators according to the definition.";
    dm.organizationSettingTitle7="Please state the span of control and span of supervision.";
    dm.organizationSettingTitle8="Further remark for the job description.";
    dm.organizationSettingTitle9="Please include a valid organization chart, showing the positioning of the function in scope within the business unit (e.g. reporting line to Head of Division), those management positions that are located on the same level as well as the positions directly below. Please contact CH Organization Team for actual organization charts of your area.";

    console.log("dm.form.jdaIndicatorsList="+dm.form.jdaIndicatorsList);
    if(dm.form.jdaIndicatorsList != null){

    }else{
      dm.form.jdaIndicatorsList=[];
    }
    if(dm.form.unitOne != dm.formExist.unitOne){
      dm.unitOneStyle=true;
    }else{
      dm.unitOneStyle=false;
    }
    if(dm.form.unitTwo != dm.formExist.unitTwo){
      dm.unitTwoStyle=true;
    }else{
      dm.unitTwoStyle=false;
    }
    if(dm.form.unitThree != dm.formExist.unitThree){
      dm.unitThreeStyle=true;
    }else{
      dm.unitThreeStyle=false;
    }
    if(dm.form.unitFour != dm.formExist.unitFour){
      dm.unitFourStyle=true;
    }else{
      dm.unitFourStyle=false;
    }
    if(dm.form.indicatorsValueOne != dm.formExist.indicatorsValueOne){
      dm.indicatorsValueOneStyle=true;
    }else{
      dm.indicatorsValueOneStyle=false;
    }
    if(dm.form.indicatorsValueTwo != dm.formExist.indicatorsValueTwo){
      dm.indicatorsValueTwoStyle=true;
    }else{
      dm.indicatorsValueTwoStyle=false;
    }
    if(dm.form.indicatorsValueThree != dm.formExist.indicatorsValueThree){
      dm.indicatorsValueThreeStyle=true;
    }else{
      dm.indicatorsValueThreeStyle=false;
    }
    if(dm.form.indicatorsValueFour != dm.formExist.indicatorsValueFour){
      dm.indicatorsValueFourStyle=true;
    }else{
      dm.indicatorsValueFourStyle=false;
    }
    if(dm.form.indicatorsRemarks != dm.formExist.indicatorsRemarks){
      dm.indicatorsRemarksStyle=true;
    }else{
      dm.indicatorsRemarksStyle=false;
    }
    if(dm.form.qualificationSkills != dm.formExist.qualificationSkills){
      dm.qualificationSkillsStyle=true;
    }else{
      dm.qualificationSkillsStyle=false;
    }
    if(dm.form.responsibilityRange != dm.formExist.responsibilityRange){
      dm.responsibilityRangeStyle=true;
    }else{
      dm.responsibilityRangeStyle=false;
    }
    if(dm.form.positionScopeObjective != dm.formExist.positionScopeObjective){
      dm.positionScopeObjectiveStyle=true;
    }else{
      dm.positionScopeObjectiveStyle=false;
    }
    if(dm.form.furtherRemarks != dm.formExist.furtherRemarks){
      dm.furtherRemarksStyle=true;
    }else{
      dm.furtherRemarksStyle=false;
    }
    if(dm.form.employeeNumber != dm.formExist.employeeNumber){
      dm.employeeNumberStyle=true;
    }else{
      dm.employeeNumberStyle=false;
    }
    if(dm.form.employeeNumber2 != dm.formExist.employeeNumber2){
      dm.employeeNumber2Style=true;
    }else{
      dm.employeeNumber2Style=false;
    }
    if(dm.form.employeeNumber3 != dm.formExist.employeeNumber3){
      dm.employeeNumber3Style=true;
    }else{
      dm.employeeNumber3Style=false;
    }
    if(dm.form.employeeNumber4 != dm.formExist.employeeNumber4){
      dm.employeeNumber4Style=true;
    }else{
      dm.employeeNumber4Style=false;
    }
    if(dm.form.leadershiRemarks != dm.formExist.leadershiRemarks){
      dm.leadershiRemarksStyle=true;
    }else{
      dm.leadershiRemarksStyle=false;
    }
    if(dm.form.leadershiRemarks2 != dm.formExist.leadershiRemarks2){
      dm.leadershiRemarks2Style=true;
    }else{
      dm.leadershiRemarks2Style=false;
    }
    if(dm.form.leadershiRemarks3 != dm.formExist.leadershiRemarks3){
      dm.leadershiRemarks3Style=true;
    }else{
      dm.leadershiRemarks3Style=false;
    }
    if(dm.form.leadershiRemarks4 != dm.formExist.leadershiRemarks4){
      dm.leadershiRemarks4Style=true;
    }else{
      dm.leadershiRemarks4Style=false;
    }
    if(dm.form.personnelResponsibility != dm.formExist.personnelResponsibility){
      dm.personnelResponsibilityStyle="color:#FF0000;";
    }else{
      dm.personnelResponsibilityStyle="";
    }
    
    //子表
    //jdaTasksList
    var newJdat=dm.form.jdaTasksList.length;
    var oldJdat=dm.formExist.jdaTasksList.length;
    console.log("newJdat="+newJdat+",oldJdat="+oldJdat);
    if(newJdat>=oldJdat){
      for(var i=0;i<dm.form.jdaTasksList.length;i++){
        if(i<oldJdat){
          if(dm.form.jdaTasksList[i].taskDescription != dm.formExist.jdaTasksList[i].taskDescription){
            dm.form.jdaTasksList[i].taskDescriptionStyle=true;
            dm.formExist.jdaTasksList[i].taskDescriptionStyle=true;
          }else{
            dm.form.jdaTasksList[i].taskDescriptionStyle=false;
            dm.formExist.jdaTasksList[i].taskDescriptionStyle=false;
          }

          if(dm.form.jdaTasksList[i].responsibility != dm.formExist.jdaTasksList[i].responsibility){
            dm.form.jdaTasksList[i].responsibilityStyle=true;
            dm.formExist.jdaTasksList[i].responsibilityStyle=true;
          }else{
            dm.form.jdaTasksList[i].responsibilityStyle=false;
            dm.formExist.jdaTasksList[i].responsibilityStyle=false;
          }

          if(dm.form.jdaTasksList[i].interfacePartners != dm.formExist.jdaTasksList[i].interfacePartners){
            dm.form.jdaTasksList[i].interfacePartnersStyle=true;
            dm.formExist.jdaTasksList[i].interfacePartnersStyle=true;
          }else{
            dm.form.jdaTasksList[i].interfacePartnersStyle=false;
            dm.formExist.jdaTasksList[i].interfacePartnersStyle=false;
          }
        }else{
          dm.form.jdaTasksList[i].taskDescriptionStyle=true;
          dm.form.jdaTasksList[i].responsibilityStyle=true;
          dm.form.jdaTasksList[i].interfacePartnersStyle=true;
        }        
      }
    }else{
      for(var i=0;i<dm.formExist.jdaTasksList.length;i++){
        if(i<newJdat){
          if(dm.form.jdaTasksList[i].taskDescription != dm.formExist.jdaTasksList[i].taskDescription){
            dm.form.jdaTasksList[i].taskDescriptionStyle=true;
            dm.formExist.jdaTasksList[i].taskDescriptionStyle=true;
          }else{
            dm.form.jdaTasksList[i].taskDescriptionStyle=false;
            dm.formExist.jdaTasksList[i].taskDescriptionStyle=false;
          }

          if(dm.form.jdaTasksList[i].responsibility != dm.formExist.jdaTasksList[i].responsibility){
            dm.form.jdaTasksList[i].responsibilityStyle=true;
            dm.formExist.jdaTasksList[i].responsibilityStyle=true;
          }else{
            dm.form.jdaTasksList[i].responsibilityStyle=false;
            dm.formExist.jdaTasksList[i].responsibilityStyle=false;
          }

          if(dm.form.jdaTasksList[i].interfacePartners != dm.formExist.jdaTasksList[i].interfacePartners){
            dm.form.jdaTasksList[i].interfacePartnersStyle=true;
            dm.formExist.jdaTasksList[i].interfacePartnersStyle=true;
          }else{
            dm.form.jdaTasksList[i].interfacePartnersStyle=false;
            dm.formExist.jdaTasksList[i].interfacePartnersStyle=false;
          }
        }else{
          dm.formExist.jdaTasksList[i].taskDescriptionStyle=true;
          dm.formExist.jdaTasksList[i].responsibilityStyle=true;
          dm.formExist.jdaTasksList[i].interfacePartnersStyle=true;
        }
      }
    }
    //jdaIndicatorsList
    //先判空
    var newJdai=0;
    var oldJdai=0;
    if(dm.form.jdaIndicatorsList != null && dm.form.jdaIndicatorsList.length > 0){
      newJdai=dm.form.jdaIndicatorsList.length;
    }
    if(dm.formExist.jdaIndicatorsList != null && dm.formExist.jdaIndicatorsList.length > 0){
      oldJdai=dm.formExist.jdaIndicatorsList.length;
    }
    console.log("newJdai="+newJdai+",oldJdai="+oldJdai);
    if(newJdai>=oldJdai){
      for(var i=0;i<dm.form.jdaIndicatorsList.length;i++){
        if(i<oldJdat){
          if(dm.form.jdaIndicatorsList[i].indicators != dm.formExist.jdaIndicatorsList[i].indicators){
            dm.form.jdaIndicatorsList[i].indicatorsStyle=true;
            dm.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
          }else{
            dm.form.jdaIndicatorsList[i].indicatorsStyle=false;
            dm.formExist.jdaIndicatorsList[i].indicatorsStyle=false;
          }

          if(dm.form.jdaIndicatorsList[i].unit != dm.formExist.jdaIndicatorsList[i].unit){
            dm.form.jdaIndicatorsList[i].unitStyle=true;
            dm.formExist.jdaIndicatorsList[i].unitStyle=true;
          }else{
            dm.form.jdaIndicatorsList[i].unitStyle=false;
            dm.formExist.jdaIndicatorsList[i].unitStyle=false;
          }

          if(dm.form.jdaIndicatorsList[i].indicatorsValue != dm.formExist.jdaIndicatorsList[i].indicatorsValue){
            dm.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
            dm.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
          }else{
            dm.form.jdaIndicatorsList[i].indicatorsValueStyle=false;
            dm.formExist.jdaIndicatorsList[i].indicatorsValueStyle=false;
          }

        }else{
          dm.form.jdaIndicatorsList[i].indicatorsStyle=true;
          dm.form.jdaIndicatorsList[i].unitStyle=true;
          dm.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
        }
      }
    }else{
      for(var i=0;i<dm.formExist.jdaIndicatorsList.length;i++){
        if(i<newJdai){
          if(dm.form.jdaIndicatorsList[i].indicators != dm.formExist.jdaIndicatorsList[i].indicators){
            dm.form.jdaIndicatorsList[i].indicatorsStyle=true;
            dm.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
          }else{
            dm.form.jdaIndicatorsList[i].indicatorsStyle=false;
            dm.formExist.jdaIndicatorsList[i].indicatorsStyle=false;
          }

          if(dm.form.jdaIndicatorsList[i].unit != dm.formExist.jdaIndicatorsList[i].unit){
            dm.form.jdaIndicatorsList[i].unitStyle=true;
            dm.formExist.jdaIndicatorsList[i].unitStyle=true;
          }else{
            dm.form.jdaIndicatorsList[i].unitStyle=false;
            dm.formExist.jdaIndicatorsList[i].unitStyle=false;
          }

          if(dm.form.jdaIndicatorsList[i].indicatorsValue != dm.formExist.jdaIndicatorsList[i].indicatorsValue){
            dm.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
            dm.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
          }else{
            dm.form.jdaIndicatorsList[i].indicatorsValueStyle=false;
            dm.formExist.jdaIndicatorsList[i].indicatorsValueStyle=false;
          }

        }else{
          dm.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
          dm.formExist.jdaIndicatorsList[i].unitStyle=true;
          dm.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
        }
      }
    }


    return dm;
  },

  watch: {
   
	},
  //在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
  mounted() {
	  this.$root.eventHub.$off('updateFormData');
    this.$root.eventHub.$on('updateFormData', (form) => {
      this.form = form;
    });
    if(this.form.status != null && this.form.status == 1 
      && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
      
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

    //申请人信息 只读控制
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
    approverReadonly: {
      // 动态计算readonly的值
      get: function() {
        if(this.form.status == null || this.form.status == 2 && this.form.status == 9){
          return false;
        }else if(this.form.status == 1 && this.$route.query.taskKey != null && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;
        }else{
          return true;
        }
      }
    },
    //Approval Further Party  进一步审批人 只读
    approvalFurtherPartyReadonly: {
      // 动态计算readonly的值
      get: function() {
        if(this.form.status == 1 
          && this.$route.query.taskKey != null && (this.$route.query.taskKey =="orgaPartner" )
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;//Orga. partner填写 审批页面
        }else{
          return true;
        }
      }
    },
    //Function Grading 岗位级别 显示
    functionGradingShow: {
      // 动态计算readonly的值
      get: function() {
        if(this.form.status == 1 
          && this.$route.query.taskKey != null && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="headOfCho")
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;//审批页面
        }else if(this.$route.query.taskKey == null && this.form.functionGrading != null 
          && this.form.status != null && (this.form.status!=2 || this.form.status!=9) ){
          return false;//详情页面
        }else if(this.$route.query.taskKey != null && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="headOfCho") 
          && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return false;
        }
      }
    },
    //Function Grading 岗位级别 只读
    functionGradingReadonly: {
      // 动态计算readonly的值
      get: function() {
        if(this.form.status == 1 
          && this.$route.query.taskKey != null && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="headOfCho" )
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;//审批页面
        }else{
          return true;
        }
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
    confirmBtn:{
      get: function() {
        if(this.$route.query.taskKey != null && this.$route.query.taskKey=='orgaPartner'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else{
          return false;
        }
      }
    },
    confirmSaveRejectBtn:{
      get: function() {
        if(this.$route.query.taskKey != null && this.$route.query.taskKey=='headOfCho'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else{
          return false;
        }
      }
    },
    confirmWithSaveRejectReviewBtn:{
      get: function() {
        if(this.$route.query.taskKey != null && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="directSupervisor" )
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else{
          return false;
        }
      }
    },

    //AM 审批流
    approvalFlow1: function(){
      if(this.form.roleType=="AM"){
        return true;
      }else{
        return false;
      }
    },
    //MK 审批流
    approvalFlow2: function(){
      if(this.form.roleType=="MK"){
        return true;
      }else{
        return false;
      }
    },
    //OMK BOMC审批
    approvalFlow3: function(){
      if(this.form.roleType=="OMK" && this.form.bomType=="C"){
        return true;
      }else{
        return false;
      }
    },
    //OMK BOMT审批
    approvalFlow32: function(){
      if(this.form.roleType=="OMK" && this.form.bomType=="T"){
        return true;
      }else{
        return false;
      }
    },
    //BOM
    approvalFlow4: function(){
      if((this.form.roleType=="BoM C" || this.form.roleType=="BoM T" 
        || this.form.roleType=="BoM C Assistant" || this.form.roleType=="BoM T Assistant")
        && (this.form.reportToFuncton!="General Manager Commercial" && this.form.reportToFuncton!="General Manager Technical")){
        return true;
      }else{
        return false;
      }
    },
    //BOM申请GMC职位 BoM T审批
    approvalFlow41: function(){
      if((this.form.roleType=="BoM C" || this.form.roleType=="BoM C Assistant") 
        && this.form.reportToFuncton=="General Manager Commercial"){
        return true;
      }else{
        return false;
      }
    },
    //BOM申请GMT职位 BoM C审批
    approvalFlow42: function(){
      if((this.form.roleType=="BoM T" || this.form.roleType=="BoM T Assistant") 
        && this.form.reportToFuncton=="General Manager Technical"){
        return true;
      }else{
        return false;
      }
    },
    //Orga Partner申请普通职位
    approvalFlow5: function(){
      if(this.form.roleType=="Orga Partner" 
        && (this.form.reportToFuncton!="General Manager Commercial" && this.form.reportToFuncton!="General Manager Technical") 
        && (this.form.positionName!="BoM Assistant" && this.form.positionName!="BoM Secretary") ){
        return true;
      }else{
        return false;
      }
    },
    //Orga Partner申请GMC职位  BoM T审批
    approvalFlow51: function(){
      if(this.form.roleType=="Orga Partner" && this.form.reportToFuncton=="General Manager Commercial" 
        && (this.form.positionName=="BoM Assistant" || this.form.positionName=="BoM Secretary")){
        return true;
      }else{
        return false;
      }
    },
    //Orga Partner申请GMT职位  BoM C审批
    approvalFlow52: function(){
      if(this.form.roleType=="Orga Partner" && this.form.reportToFuncton=="General Manager Technical" 
        && (this.form.positionName=="BoM Assistant" || this.form.positionName=="BoM Secretary")){
        return true;
      }else{
        return false;
      }
    },
   


   
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
table#SamplingDataTable td.is-safe,table#SamplingDataTable th {
  border: 1px solid #e4e4e4 !important;
}
</style>

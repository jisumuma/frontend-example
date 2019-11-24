<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Job Description 
        <i class="fa fa-fw fa-info-circle text-info" title="Preface" @click="startProcess"></i>
      </h1>
      
      <ol class="breadcrumb" v-if="approvalFlow1"><!--AM/MK/OMK-->
        <li><a >1.Applicant</a></li>
        <li><a >2.Disciplinary Supervisor (MK or above FG >= T+/29)</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of HRO</a></li>
        <li><a >5.Orga Partner (FG)</a></li>
        <li><a >6.Head of HRO (FG)</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow4"><!--BOM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.Orga Partner</a></li>
        <li><a >3.Head of HRO</a></li>
        <li><a >4.Orga Partner (FG)</a></li>
        <li><a >5.Head of HRO (FG)</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow41"><!--BOM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BoM T</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of HRO</a></li>
        <li><a >5.Orga Partner (FG)</a></li>
        <li><a >6.Head of HRO (FG)</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow42"><!--BOM-->
        <li><a >1.Applicant</a></li>
        <li><a >2.BoM C</a></li>
        <li><a >3.Orga Partner</a></li>
        <li><a >4.Head of HRO</a></li>
        <li><a >5.Orga Partner (FG)</a></li>
        <li><a >6.Head of HRO (FG)</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow5"><!--Orga Partner-->
        <li><a >1.Applicant</a></li>
        <li><a >2.Position holder`s Supervisor (MK or above FG >= T+/29)</a></li>
        <li><a >3.Head of HRO</a></li>
        <li><a >4.Orga Partner (FG)</a></li>
        <li><a >5.Head of HRO (FG)</a></li>
      </ol>
      <ol class="breadcrumb" v-else-if="approvalFlow6"><!--Orga Partner Assign-->
        <li><a >1.Applicant</a></li>
        <li><a >2.Position holder`s Supervisor (MK or above FG >= T+/29)</a></li>
      </ol>
      <ol class="breadcrumb" v-else>
        <li><a >1.Applicant</a></li>
      </ol>
      <span style="margin-top: 10px;display: block;">
      Please use <strong>English language</strong> to fill in the job description.
      </span>
      <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
		    <strong>Application No. : {{form.ticketNo}}</strong>
        <strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
	    </span>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">
		<div class="box box-primary">
			<div class="box-header with-border">
			  <h3 class="box-title">Applicant Information</h3>
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
    <div class="box box-primary" v-if="this.form.roleType=='Orga Partner'"><!-- v-if="this.form.roleType=='Orga Partner'" -->
			<div class="box-header with-border">
			  <h3 class="box-title">Job Description Type</h3>
			</div>
      <form role="form" >
				<div class="box-body">
					<div class="row">
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="jdTypeChoose"  v-model="form.jdType" name="jdType" value="Apply JD" >
                Apply JD
              </label>
            </div>
            <div class="form-group col-md-6">
              <table>
                <tr>
                  <td>
                    <label style="font-weight:normal">
                      <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="jdTypeChoose"  v-model="form.jdType" name="jdType" value="Assign Existing JD to Other Positions" >
                      Assign Existing JD to Other Positions&nbsp;&nbsp;
                    </label>
                  </td>
                  <td>
                    <span class="input-group-btn" id="selectotherjd" v-if="this.form.jdType=='Assign Existing JD to Other Positions' && !readonly">
                      <ChooseJD :form="form" ref="c1" :vclass="'btn btn-primary btn-flat btn-xs'" v-on:callbackfunction="doAfterSelectOneJD">Select JD</ChooseJD>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
			</form>
    </div>
    <!--
    jdType={{this.form.jdType}};
    applicationTypeOld={{applicationTypeOld}}
    roleType={{this.form.roleType}}；reportToFunction={{this.form.reportToFunction}}
    -->
    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Organization Setting</h3>
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
					<div class="row" v-if="this.form.jdType=='Apply JD' || this.form.jdType=='' || this.form.jdType==null">
            <!--不选中的时候显示-->
            <form-group col="md-3" v-if="readonly" type="input" other-rules="required" v-model="form.positionNameShortUnit" name="positionNameShortUnit" readonly="true" label="JobDescriptionApplication.positionName"></form-group>
            <!--选中的时候显示-->
            <div class="col-md-3" v-if="!readonly">
              <div class="form-group">
                <label for="">
                  <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                  {{$t("JobDescriptionApplication.positionName")}} </label>
                  <div class="input-group ">
                    <input type="text" class="form-control" id="positionNameShortUnit" name="positionNameShortUnit" v-model="form.positionNameShortUnit" readonly="readonly">
                    <span class="input-group-btn" id="selectotherperson">
                      <ChoosePosition :form="form" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOnePosition"><i class="fa fa-fw fa-search"></i></ChoosePosition>
                    </span>
                  </div>
              </div>
            </div>
            <form-group col="md-3" type="input" v-model="form.reportTo" name="reportTo" readonly="true" label="JobDescriptionApplication.reportTo"></form-group>
            <form-group col="md-3" type="input" v-model="form.divisionDepartment" name="divisionDepartment" readonly="true" label="JobDescriptionApplication.divisionDepartment"></form-group>
            <form-group col="md-3" type="input" v-model="form.organizationSettingDate" name="organizationSettingDate" readonly="true" label="JobDescriptionApplication.organizationSettingDate"></form-group>
          </div>
          <div class="row" v-if="this.form.jdType=='Apply JD' || this.form.jdType=='' || this.form.jdType==null">
            <form-group col="md-3" type="input" v-model="form.approvalDirectSupervisor" name="approvalDirectSupervisor" readonly="true" label="JobDescriptionApplication.approvalDirectSupervisor"></form-group>
            <form-group col="md-3" type="input" v-model="form.approvalPositionHolder" name="approvalPositionHolder" :readonly="approvalPositionHolderReadonly" label="JobDescriptionApplication.approvalPositionHolder"></form-group>
            <form-group col="md-3" type="input2" :title="approvalFurtherPartyTitle" v-model="form.approvalFurtherParty" name="approvalFurtherParty" :readonly="approvalFurtherPartyReadonly" label="JobDescriptionApplication.approvalFurtherParty" placeholder="Filled by Orga. partner"></form-group>
          </div>


        <div class="row" v-if="this.form.jdType=='Assign Existing JD to Other Positions'">
          <div class="col-md-12">
            <table class="table table-bordered mar-bot-0" width="100%">
              <tbody>
              <tr>
                <th class="text-center" width="3%">Item</th>
                <th class="text-center" width="16%">
                  <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                  Position Name / Shor Unit</th>
                <th class="text-center" width="15%">Report to</th>
                <th class="text-center" width="15%">Division/Department </th>

                <th class="text-center" width="13%">Valid Date</th>
                <th class="text-center" width="12%">Approval Direct Supervisor</th>

                <th class="text-center" width="11%">Position Holder</th>
                <th class="text-center" width="11%">Approval Further Party
                  <i class="fa fa-fw fa-info-circle text-info" :title="approvalFurtherPartyTitle"></i>
                </th>
                <th  width="3%" v-if="!readonly" class="text-center" > <!--v-if="!readonly"-->
                  <a href="javascript:;" @click="insertPositionRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                </th>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.jdaPositionList">
                <td class="text-center">{{index+1}}</td>
                <td>
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <input type="hidden" class="form-control" id="" v-model="entry.positionCode">
                  <form-group v-if="readonly" haslable="false" type="input" other-rules="required" v-model="entry.positionNameShortUnit" :name="'positionNameShortUnit'+(index+1)" :id="'positionNameShortUnit'+index" disabled="true" label="JobDescriptionApplication.positionName"></form-group>
                  <div class="form-group" v-if="!readonly">
                      <div class="input-group ">
                        <input type="text" class="form-control" :name="'positionNameShortUnit'+(index+1)" :id="'positionNameShortUnit'+index" v-model="entry.positionNameShortUnit" disabled="true">
                        <span class="input-group-btn" :id="'selectotherpersonOgra'+index">
                          <ChoosePositionOrga :chooseID="'person_tableJD_'+index" :tableID="index" :form="form" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOnePositionByOrga"><i class="fa fa-fw fa-search"></i></ChoosePositionOrga>
                        </span>
                      </div>
                  </div>
                </td>
                <td>
                  <input type="hidden" class="form-control" id="" v-model="entry.shortUnit">
                  <input type="hidden" class="form-control" id="" v-model="entry.positionName">
                  <form-group type="input" haslable="false" disabled="true" :name="'reportToFunction'+(index+1)" :id="'reportToFunction'+index" v-model="entry.reportToFunction" placeholder=""></form-group>
                  <input type="hidden" class="form-control" id="" v-model="entry.reportToFunctionCode">
                </td>
                <td>
                  <form-group type="input" haslable="false" disabled="true"  :name="'divisionDepartment'+(index+1)" :id="'divisionDepartment'+index" v-model="entry.divisionDepartment"  ></form-group>				
                </td>
                <td>
                  <form-group type="input" haslable="false" disabled="true"  name="organizationSettingDate" v-model="form.organizationSettingDate"  ></form-group>				
                </td>
                <td>
                  <form-group type="input" haslable="false" disabled="true"  :name="'reportToPerson'+(index+1)" :id="'reportToPerson'+index" v-model="entry.reportToPerson"  ></form-group>				
                  <input type="hidden" class="form-control" id="" v-model="entry.reportToPersonCode">
                </td>
                <td>
                  <form-group type="input" other-rules="max:100" haslable="false" :disabled="entry.positionHolderReadonly" :name="'positionHolder'+(index+1)" :id="'positionHolder'+index" v-model="entry.positionHolder"  ></form-group>				
                  <input type="hidden" class="form-control" id="" v-model="entry.positionHolderStaffcode">
                </td>
                <td>
                  <form-group type="input" :title="approvalFurtherPartyTitle" haslable="false" :disabled="approvalFurtherPartyReadonly"  :name="'approvalFurtherParty'+(index+1)" :id="'approvalFurtherParty'+index"  v-model="entry.approvalFurtherParty"></form-group>				
                </td>
                <td v-if="!readonly" class="text-center" style="vertical-align: middle;">
                  <a href="javascript:;" @click="deletePositionRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>
				</div>
			</form>
		</div>

    <!-- New JD -->
    <div v-if="!reviewChangeShow">

    <div class="box box-primary">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
			  <h3 class="box-title">Scope, Objective and Relevance of Position</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle2"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <form-group col="md-12" rows="4" limit="5000" type="textareaEnglish" other-rules="required" haslable="false" v-model="form.positionScopeObjective" name="positionScopeObjective" :readonly="allReadonly" label="JobDescriptionApplication.positionScopeObjective" placeholder=""></form-group>
          </div>   
          <div class="row" v-if="modifySuggest1Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest1" name="modifySuggest1" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
			  <h3 class="box-title">Range of Responsibility</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle3"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <form-group col="md-12" rows="4" limit="5000" type="textareaEnglish" other-rules="required" haslable="false" v-model="form.responsibilityRange" name="responsibilityRange" :readonly="allReadonly" label="JobDescriptionApplication.responsibilityRange" placeholder=""></form-group>
          </div> 
          <div class="row" v-if="modifySuggest2Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest2" name="modifySuggest2" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
			  <h3 class="box-title">Key Tasks and Responsibilities</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle4"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="col-md-12">
            <table class="table table-bordered mar-bot-0" width="100%"  >
              <tbody>
              <tr>
                <!--
                <th class="text-center" width="5%">Item</th>-->
                <th class="text-center" width="50%">Task Description</th>
                <th class="text-center" width="25%">Responsibility 
                  <i class="fa fa-fw fa-info-circle text-info" title="[Main responsibility] e.g.: Sole responsibility for achieving set projecttargets. 
[Partial responsibility] e.g.: Partial responsibility for achieving set project targets or delivering services to other parties."></i>
                </th>
                <th class="text-center" v-if="!allReadonly" width="20%">Interface Partners</th>
                <th class="text-center" v-if="allReadonly" width="25%">Interface Partners</th>
                <th  width="5%" v-if="!allReadonly" class="text-center" > <!--v-if="!readonly"-->
                  <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                </th>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.jdaTasksList"  >
                <!--
                <td class="text-center">{{index+1}}</td>-->
                <td>
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <form-group type="input" v-on:change="inputText(entry, false,0)" other-rules="required|max:300" haslable="false" :disabled="allReadonly" :name="'taskDescription'+(index+1)" :id="'taskDescription'+index" v-model="entry.taskDescription" placeholder="300 Characters Max."></form-group>
                </td>
                <td v-if="form.jdType=='Assign Existing JD to Other Positions'">
                  <form-group type="input" other-rules="required" haslable="false" :disabled="allReadonly" :name="'responsibility'+(index+1)" :id="'responsibility'+index" v-model="entry.responsibility" ></form-group>
                </td>
                <td v-if="form.jdType!='Assign Existing JD to Other Positions'">
                  <form-group type="select" v-if="showArrResponsibility" uri="/dict/list?groupName=Responsibility" other-rules="required" haslable="false" :disabled="allReadonly" :name="'responsibility'+(index+1)" :id="'responsibility'+index" v-model="entry.responsibility"  ></form-group>				
                </td>
                <td>
                  <form-group type="input" other-rules="required|max:100" haslable="false" :disabled="allReadonly"  :name="'interfacePartners'+(index+1)" :id="'interfacePartners'+index" v-model="entry.interfacePartners"  ></form-group>				
                </td>
                <td v-if="!allReadonly" class="text-center" style="vertical-align: middle;">
                  <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>  
          <div class="row" v-if="modifySuggest3Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest3" name="modifySuggest3" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div> 
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
			  <h3 class="box-title">Qualification and Skills</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle5"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <form-group col="md-12" rows="4" limit="5000" type="textareaEnglish" other-rules="required" haslable="false" v-model="form.qualificationSkills" name="qualificationSkills" :readonly="allReadonly" label="JobDescriptionApplication.qualificationSkills" placeholder=""></form-group>
          </div>   
          <div class="row" v-if="modifySuggest4Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest4" name="modifySuggest4" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Quantitative Indicators</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle6"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <div class="col-md-12">
            <table class="table table-bordered mar-bot-0 JdTable" width="100%"  >
              <tbody>
              <tr>
                <th class="text-center" width="50%">Quantitative Indicators, definitions</th><!--<i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>-->
                <th class="text-center" width="25%">Unit</th>
                <th class="text-center" v-if="allReadonly" width="25%">Value</th>
                <th class="text-center" v-if="!allReadonly" width="20%">Value</th>
                <th v-if="!allReadonly" class="text-center" width="5%">
                </th>
              </tr>
              <tr>
                <th class="text-center" colspan="4" style="background-color:gray;">
                  <font color="white">I. General indicators -  e.g.: budget (personnel costs and overhead costs)</font>
                </th>
              </tr>
              <tr>
                <td>
                  [Budget – directly allotted – direct cost center + subordinated cost centers]<br />
                  (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                </td>
                <td class="text-center">
                  <form-group type="input" haslable="false" disabled="true" name="unitOne" v-model="form.unitOne" ></form-group>
                </td>
                <td>
                  <form-group type="input" other-rules="max:75" haslable="false" :disabled="allReadonly" name="indicatorsValueOne" v-model="form.indicatorsValueOne" placeholder="in Mio. p.a. + period"  ></form-group>				
                </td>
                <td v-if="!allReadonly" class="text-center" style="vertical-align: middle;"></td>
              </tr>
              <tr>
                <td>
                  [Budget – directly allotted – direct cost center]<br />
                  (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                </td>
                <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitTwo" v-model="form.unitTwo" ></form-group></td>
                <td>
                  <form-group type="input" other-rules="max:75" haslable="false" :disabled="allReadonly" name="indicatorsValueTwo" v-model="form.indicatorsValueTwo" placeholder="in Mio. p.a. + period"  ></form-group>				
                </td>
                <td v-if="!allReadonly" class="text-center" style="vertical-align: middle;"></td>
              </tr>
              <tr>
                <th class="text-center" colspan="4" style="background-color:gray;">
                  <font color="white">II.	Function specific indicators (monetary / non-monetary)</font>
                </th>
              </tr>
              <tr>
                <td>
                  <table width="100%">
                    <tr>
                      <td width="20%">Monetary</td>
                      <td><form-group type="input" v-on:change="inputTextMonetary(1)" other-rules="max:300" haslable="false" :disabled="allReadonly" name="indicatorsThree" v-model="form.indicatorsThree" placeholder="300 Characters Max." ></form-group></td>
                    </tr>
                  </table>
                </td>
                <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitThree" v-model="form.unitThree" ></form-group></td>
                <td>
                  <form-group type="input" other-rules="max:75" haslable="false" :disabled="allReadonly" name="indicatorsValueThree" v-model="form.indicatorsValueThree" placeholder="in Mio. p.a. + period" ></form-group>
                </td>
                <td v-if="!allReadonly" class="text-center" style="vertical-align: middle;"></td>
              </tr>
              <tr>
                <td>
                  <table width="100%">
                    <tr>
                      <td width="20%">Non-monetary<i class="fa fa-fw fa-info-circle text-info" :title="nonMonetaryTitle"></i></td>
                      <td><form-group type="input" v-on:change="inputTextMonetary(2)" other-rules="max:300" haslable="false" :disabled="allReadonly" name="indicatorsFour" v-model="form.indicatorsFour" placeholder="300 Characters Max." ></form-group></td>
                    </tr>
                  </table>
                </td>
                <td>
                  <!--
                  <form-group type="select" uri="/dict/list?groupName=JDA Currency" other-rules="required" haslable="false" :disabled="allReadonly" name="unitFour" v-model="form.unitFour"  ></form-group>				
                  -->
                  <form-group v-on:change="inputTextMessage(4)" :hasstyle="unitFourStyle" type="input" other-rules="max:75" haslable="false" :disabled="allReadonly" name="unitFour" v-model="form.unitFour" placeholder="" ></form-group>				
                </td>
                <td>
                  <form-group v-on:change="inputTextMessage(4)" :hasstyle="indicatorsValueFourStyle" type="input" other-rules="max:75" haslable="false" :disabled="allReadonly" name="indicatorsValueFour" v-model="form.indicatorsValueFour" placeholder="amount + period" ></form-group>				
                </td>
                <td v-if="!allReadonly" class="text-center" style="vertical-align: middle;">
                  <a href="javascript:;" @click="insertItineraryRowsIndicators()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                </td>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.jdaIndicatorsList"  >
                <td><!-- v-on:change="inputTextListMessage(entry,1)" -->
                <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <form-group type="input" :hasstyle="entry.indicatorsStyle" other-rules="required|max:300" haslable="false" :disabled="allReadonly"  :name="'indicators'+(index+1)" :id="'indicators'+index" v-model="entry.indicators"  ></form-group>				
                </td>
                <td><!--v-on:change="inputTextListMessage(entry,2)"-->
                  <form-group type="input" :hasstyle="entry.unitStyle" other-rules="required|max:75" haslable="false" :disabled="allReadonly"  :name="'unit'+(index+1)" :id="'unit'+index" v-model="entry.unit"  ></form-group>				
                </td>
                <td><!--v-on:change="inputTextListMessage(entry,3)"-->
                  <form-group type="input" :hasstyle="entry.indicatorsValueStyle" other-rules="required|max:75" haslable="false" :disabled="allReadonly"  :name="'indicatorsValue'+(index+1)" :id="'indicatorsValue'+index" v-model="entry.indicatorsValue"  ></form-group>				
                </td>
                <td v-if="!allReadonly" class="text-center" style="vertical-align: middle;">
                  <a href="javascript:;" @click="deleteItineraryRowsIndicators(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div><br />  
          <div class="row">
            <div class="form-group col-md-12">
              <label>Optional Remarks</label>
            </div>
            <form-group col="md-12" rows="4" limit="5000" type="textareaEnglish" haslable="false" v-model="form.indicatorsRemarks" name="indicatorsRemarks" :readonly="allReadonly" label="JobDescriptionApplication.indicatorsRemarks" placeholder=""></form-group>
          </div>
          <div class="row" v-if="modifySuggest5Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest5" name="modifySuggest5" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Leadership and Coordination Responsibility</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle7"></i>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              <label>Personnel Responsibility</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal">
                <input type="radio" :disabled="allReadonly" @change="personnelResponsibilityCheck" v-model="form.personnelResponsibility" name="personnelResponsibility" value="Yes" >&nbsp;Yes
              </label>&nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal"><!--@change="personnelResponsibilityCheck"-->
                <input type="radio" :disabled="allReadonly" @change="personnelResponsibilityCheck" v-model="form.personnelResponsibility" name="personnelResponsibility" value="No" >&nbsp;No
              </label>
            </div>
          </div>
					<div class="row" v-if="this.personnelResponsibilityArea">
            <div class="col-md-12">
            <table class="table table-bordered mar-bot-0 JdTable" width="100%"  >
              <tbody>
              <tr>
                <!--
                <th class="text-center" width="5%">Item</th>
                <td class="text-center">1</td>
                -->
                <th class="text-center" width="50%">
                  Responsibility Type</th>
                <th class="text-center" width="12%">
                  Number of Employees</th>
                <th class="text-center" width="38%">Remarks</th>
              </tr>
              <tr>
                <td>
                  <span v-if="this.form.personnelResponsibility=='Yes'">
                  <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                  </span>
                  Span of control I (Number of employees that are led directly and disciplinarily, based on approved Zielwert) 
                </td>
                <td><!--
                  <input :disabled="readonly" type="number" :class="{'form-control':true,'pull-left': true,'input':true }" name="employeeNumber" id="employeeNumber" v-model="form.employeeNumber" >
                  -->
                  <form-group @change="oninputNum(1)" :hasstyle="employeeNumberStyle" type="input" other-rules="max:75|decimal" haslable="false" :disabled="allReadonly"  name="employeeNumber" v-model="form.employeeNumber"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarksStyle" type="input" v-on:change="inputText(null, false,1)" other-rules="max:300" haslable="false" :disabled="allReadonly"  name="leadershiRemarks" v-model="form.leadershiRemarks" placeholder="300 Characters Max." ></form-group>				
                </td>
              </tr>
              <tr>
                <td>
                  <span v-if="this.form.personnelResponsibility=='Yes'">
                  <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                  </span>
                  Span of supervision (Number of employees within the whole area of disciplinary responsibility) 
                </td>
                <td>
                  <form-group @change="oninputNum(2)" :hasstyle="employeeNumber2Style" type="input" other-rules="max:75" haslable="false" :disabled="allReadonly"  name="employeeNumber2" v-model="form.employeeNumber2"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks2Style" type="input" v-on:change="inputText(null, false,2)" other-rules="max:300" haslable="false" :disabled="allReadonly"  name="leadershiRemarks2" v-model="form.leadershiRemarks2" placeholder="300 Characters Max." ></form-group>				
                </td>
              </tr>
              <tr>
                <td>
                  Optional: span of control II (in addition – number of employees, that are led 100% functionally) (add explanation as to which employees under "optional remarks") 
                </td>
                <td>
                  <form-group @change="oninputNum(3)" :hasstyle="employeeNumber3Style" type="input" other-rules="max:75" haslable="false" :disabled="allReadonly"  name="employeeNumber3" v-model="form.employeeNumber3"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks3Style" type="input" v-on:change="inputText(null, false,3)" other-rules="max:300" haslable="false" :disabled="allReadonly"  name="leadershiRemarks3" v-model="form.leadershiRemarks3" placeholder="300 Characters Max." ></form-group>				
                </td>
              </tr>
              <tr>
                <td>
                  Optional: number of employees from external partners, that are coordinated on a regular, daily manner (add explanation as to which employees under "remarks") 
                </td>
                <td>
                  <form-group @change="oninputNum(4)" :hasstyle="employeeNumber4Style" type="input" other-rules="max:75" haslable="false" :disabled="allReadonly"  name="employeeNumber4" v-model="form.employeeNumber4"  ></form-group>				
                </td>
                <td>
                  <form-group :hasstyle="leadershiRemarks4Style" type="input" v-on:change="inputText(null, false,4)" other-rules="max:300" haslable="false" :disabled="allReadonly"  name="leadershiRemarks4" v-model="form.leadershiRemarks4" placeholder="300 Characters Max." ></form-group>				
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>   
          <div class="row" v-if="modifySuggest6Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest6" name="modifySuggest6" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div>
				</div>
			</form>
		</div>

    <div class="box box-primary">
      <div class="box-header with-border">
			  <h3 class="box-title">Further Remarks</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle8"></i>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <form-group col="md-12" rows="4" limit="5000" type="textareaEnglish" haslable="false" v-model="form.furtherRemarks" name="furtherRemarks" :readonly="allReadonly" label="JobDescriptionApplication.furtherRemarks" placeholder=""></form-group>
          </div> 
          <div class="row" v-if="modifySuggest7Show">
            <div class="form-group col-md-12">
              <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest7" name="modifySuggest7" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
            </div>
          </div>  
				</div>
			</form>
		</div>
    </div>

    <!-- Update of existing JD -->
    <div v-if="reviewChangeShow">

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Scope, Objective and Relevance of Position</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle2"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="form-group col-md-6">
                <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Old Scope, Objective and Relevance of Position</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="positionScopeObjectiveStyle" other-rules="required" haslable="false" v-model="formExist.positionScopeObjective" name="positionScopeObjective" :readonly="readonly" label="JobDescriptionApplication.positionScopeObjective" placeholder=""></form-group>
              </div>
              <div class="form-group col-md-6">
                <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                New Scope, Objective and Relevance of Position</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="positionScopeObjectiveStyle" other-rules="required" haslable="false" v-model="form.positionScopeObjective" name="positionScopeObjective" :readonly="readonly" label="JobDescriptionApplication.positionScopeObjective" placeholder=""></form-group>
              </div>
            </div>
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest1" name="modifySuggest1" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div>
          </div>
        </form>
		  </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Range of Responsibility</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle3"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="form-group col-md-6">
                <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Old Range of Responsibility</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="responsibilityRangeStyle" other-rules="required" haslable="false" v-model="formExist.responsibilityRange" name="responsibilityRange" :readonly="readonly" label="JobDescriptionApplication.responsibilityRange" placeholder=""></form-group>
              </div>
              <div class="form-group col-md-6">
                <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                New Range of Responsibility</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="responsibilityRangeStyle" other-rules="required" haslable="false" v-model="form.responsibilityRange" name="responsibilityRange" :readonly="readonly" label="JobDescriptionApplication.responsibilityRange" placeholder=""></form-group>
              </div>
            </div>  
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest2" name="modifySuggest2" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div> 
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
          <h3 class="box-title">Key Tasks and Responsibilities</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle4"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="col-md-6">
              <table class="table table-bordered mar-bot-0" width="100%"  >
                <tbody>
                <tr>
                  <th class="text-center" width="50%">Old Task Description</th>
                  <th class="text-center" width="25%">Old Responsibility
                    <i class="fa fa-fw fa-info-circle text-info" title="[Main responsibility] e.g.: Sole responsibility for achieving set projecttargets. 
[Partial responsibility] e.g.: Partial responsibility for achieving set project targets or delivering services to other parties."></i>
                  </th>
                  <th class="text-center" width="25%">Old Interface Partners</th>
                </tr>
                <tr v-bind:key="index" v-for="(entry,index) in formExist.jdaTasksList"  >
                  <td>
                    <input type="hidden" class="form-control" id="" v-model="entry.id">
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
              <table class="table table-bordered mar-bot-0" width="100%"  >
                <tbody>
                <tr>
                  <th class="text-center" width="50%">New Task Description</th>
                  <th class="text-center" width="25%">New Responsibility
                    <i class="fa fa-fw fa-info-circle text-info" title="[Main responsibility] e.g.: Sole responsibility for achieving set projecttargets. 
[Partial responsibility] e.g.: Partial responsibility for achieving set project targets or delivering services to other parties."></i>
                  </th>
                  <th class="text-center" width="25%">New Interface Partners</th>
                </tr>
                <tr v-bind:key="index" v-for="(entry,index) in form.jdaTasksList"  >
                  <td>
                    <input type="hidden" class="form-control" id="" v-model="entry.id">
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
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest3" name="modifySuggest3" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Qualification and Skills</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle5"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="form-group col-md-6">
                <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Old Qualification and Skills</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="qualificationSkillsStyle" other-rules="required" haslable="false" v-model="formExist.qualificationSkills" name="qualificationSkills" :readonly="readonly" label="JobDescriptionApplication.qualificationSkills" placeholder=""></form-group>
              </div>
              <div class="form-group col-md-6">
                <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                New Qualification and Skills</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="qualificationSkillsStyle" other-rules="required" haslable="false" v-model="form.qualificationSkills" name="qualificationSkills" :readonly="readonly" label="JobDescriptionApplication.qualificationSkills" placeholder=""></form-group>
              </div>
            </div>  
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest4" name="modifySuggest4" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div> 
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Quantitative Indicators</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle6"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="col-md-6">
              <table class="table table-bordered mar-bot-0 JdTable" width="100%"  >
                <tbody>
                <tr>
                  <th class="text-center" width="50%">Old Quantitative Indicators, definitions</th><!--<i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>-->
                  <th class="text-center" width="25%">Old Unit</th>
                  <th class="text-center" width="25%">Old Value</th>
                </tr>
                <tr>
                  <th class="text-center" colspan="5" style="background-color:gray;">
                    <font color="white">I. General indicators -  e.g.: budget (personnel costs and overhead costs)</font>
                  </th>
                </tr>
                <tr>
                  <td>
                    [Budget – directly allotted – direct cost center + subordinated cost centers]<br />
                    (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                  </td>
                  <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitOne" v-model="formExist.unitOne" ></form-group></td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueOneStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueOne" v-model="formExist.indicatorsValueOne" placeholder="in Mio. p.a. + period"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                    [Budget – directly allotted – direct cost center]<br />
                    (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                  </td>
                  <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitTwo" v-model="formExist.unitTwo" ></form-group></td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueTwoStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueTwo" v-model="formExist.indicatorsValueTwo" placeholder="in Mio. p.a. + period"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <th class="text-center" colspan="5" style="background-color:gray;">
                    <font color="white">II.	Function specific indicators (monetary/non-monetary)</font>
                  </th>
                </tr>
                <tr>
                  <td>
                    <table width="100%">
                    <tr>
                      <td width="20%">Monetary</td>
                      <td><form-group type="input" :hasstyle="indicatorsThreeStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsThree" v-model="formExist.indicatorsThree" placeholder="300 Characters Max." ></form-group></td>
                    </tr>
                  </table>
                  </td>
                  <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitThree" v-model="formExist.unitThree" ></form-group></td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueThreeStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueThree" v-model="formExist.indicatorsValueThree" placeholder="in Mio. p.a. + period" ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                  <table width="100%">
                    <tr>
                      <td width="20%">Non-monetary<i class="fa fa-fw fa-info-circle text-info" :title="nonMonetaryTitle"></i></td>
                      <td><form-group type="input" :hasstyle="indicatorsFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsFour" v-model="formExist.indicatorsFour" placeholder="300 Characters Max." ></form-group></td>
                    </tr>
                  </table>
                  </td>
                  <td>
                    <form-group type="input4" :hasstyle="unitFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="unitFour" v-model="formExist.unitFour" placeholder="" ></form-group>				
                  </td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueFour" v-model="formExist.indicatorsValueFour" placeholder="amount + period" ></form-group>				
                  </td>
                </tr>
                <tr v-bind:key="index" v-for="(entry,index) in formExist.jdaIndicatorsList"  >
                  <td><input type="hidden" class="form-control" id="" v-model="entry.id">
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
              <table class="table table-bordered mar-bot-0 JdTable" width="100%"  >
                <tbody>
                <tr>
                  <th class="text-center" width="50%">New Quantitative Indicators, definitions</th>
                  <th class="text-center" width="25%">New Unit</th>
                  <th class="text-center" width="25%">New Value</th>
                </tr>
                <tr>
                  <th class="text-center" colspan="3" style="background-color:gray;">
                    <font color="white">I. General indicators -  e.g.: budget (personnel costs and overhead costs)</font>
                  </th>
                </tr>
                <tr>
                  <td>
                    [Budget – directly allotted – direct cost center + subordinated cost centers]<br />
                    (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                  </td>
                  <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitOne" v-model="form.unitOne" ></form-group></td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueOneStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueOne" v-model="form.indicatorsValueOne" placeholder="in Mio. p.a. + period"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                    [Budget – directly allotted – direct cost center]<br />
                    (Must: amount current year in Mio. p.a. / preferable: Ø-amount in Mio. p.a. over planning period + specification of planning period in years)
                  </td>
                  <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitTwo" v-model="form.unitTwo" ></form-group></td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueTwoStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueTwo" v-model="form.indicatorsValueTwo" placeholder="in Mio. p.a. + period"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <th class="text-center" colspan="3" style="background-color:gray;">
                    <font color="white">II.	Function specific indicators (monetary/non-monetary)</font>
                  </th>
                </tr>
                <tr>
                  <td>
                    <table width="100%">
                    <tr>
                      <td width="20%">Monetary</td>
                      <td><form-group type="input" :hasstyle="indicatorsThreeStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsThree" v-model="form.indicatorsThree" placeholder="300 Characters Max." ></form-group></td>
                    </tr>
                  </table>
                  </td>
                  <td class="text-center"><form-group type="input" haslable="false" disabled="true" name="unitThree" v-model="form.unitThree" ></form-group></td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueThreeStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueThree" v-model="form.indicatorsValueThree" placeholder="in Mio. p.a. + period" ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%">
                    <tr>
                      <td width="20%">Non-monetary<i class="fa fa-fw fa-info-circle text-info" :title="nonMonetaryTitle"></i></td>
                      <td><form-group type="input" :hasstyle="indicatorsFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsFour" v-model="form.indicatorsFour" placeholder="300 Characters Max." ></form-group></td>
                    </tr>
                  </table>
                  </td>
                  <td>
                    <form-group type="input4" :hasstyle="unitFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="unitFour" v-model="form.unitFour" placeholder="" ></form-group>				
                  </td>
                  <td>
                    <form-group type="input4" :hasstyle="indicatorsValueFourStyle" other-rules="max:75" haslable="false" :disabled="readonly" name="indicatorsValueFour" v-model="form.indicatorsValueFour" placeholder="amount + period" ></form-group>				
                  </td>
                </tr>
                <tr v-bind:key="index" v-for="(entry,index) in form.jdaIndicatorsList"  >
                  <td><input type="hidden" class="form-control" id="" v-model="entry.id">
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
                <label>Old Optional Remarks</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="indicatorsRemarksStyle" haslable="false" v-model="formExist.indicatorsRemarks" name="indicatorsRemarks" :readonly="readonly" label="JobDescriptionApplication.indicatorsRemarks" placeholder=""></form-group>
              </div>
              <div class="form-group col-md-6">
                <label>New Optional Remarks</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="indicatorsRemarksStyle" haslable="false" v-model="form.indicatorsRemarks" name="indicatorsRemarks" :readonly="readonly" label="JobDescriptionApplication.indicatorsRemarks" placeholder=""></form-group>
              </div>
            </div>
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest5" name="modifySuggest5" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Leadership and Coordination Responsibility</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle7"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="form-group col-md-6">
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                <label>Old Personnel Responsibility</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label style="font-weight:normal;">
                  <input type="radio" :disabled="readonly" v-model="formExist.personnelResponsibility" name="personnelResponsibilityOld" value="Yes" >&nbsp;<font :style="personnelResponsibilityStyle">Yes</font>
                </label>&nbsp;&nbsp;&nbsp;
                <label style="font-weight:normal;">
                  <input type="radio" :disabled="readonly" v-model="formExist.personnelResponsibility" name="personnelResponsibilityOld" value="No" >&nbsp;<font :style="personnelResponsibilityStyle">No</font>
                </label>
              </div>

              <div class="form-group col-md-6">
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                <label>New Personnel Responsibility</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label style="font-weight:normal;">
                  <input type="radio" :disabled="readonly" v-model="form.personnelResponsibility" name="personnelResponsibility" value="Yes" >&nbsp;<font :style="personnelResponsibilityStyle">Yes</font>
                </label>&nbsp;&nbsp;&nbsp;
                <label style="font-weight:normal;">
                  <input type="radio" :disabled="readonly" v-model="form.personnelResponsibility" name="personnelResponsibility" value="No" >&nbsp;<font :style="personnelResponsibilityStyle">No</font>
                </label>
              </div>

            </div>
            <div class="row" v-if="!(this.formExist.personnelResponsibility=='No' && this.form.personnelResponsibility=='No')">
              <div class="col-md-6">
              <table class="table table-bordered mar-bot-0 JdTable" width="100%"  >
                <tbody>
                <tr>
                  <th class="text-center" width="50%">Old Responsibility Type</th>
                  <th class="text-center" width="15%">Old Number of Employees</th>
                  <th class="text-center" width="35%">Old Remarks</th>
                </tr>
                <tr>
                  <td>
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
                <tr>
                  <td>
                    Span of supervision (Number of employees within the whole area of disciplinary responsibility) 
                  </td>
                  <td>
                    <form-group :hasstyle="employeeNumber2Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber2" v-model="formExist.employeeNumber2"  ></form-group>				
                  </td>
                  <td>
                    <form-group :hasstyle="leadershiRemarks2Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks2" v-model="formExist.leadershiRemarks2"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                    Optional: span of control II (in addition – number of employees, that are led 100% functionally) (add explanation as to which employees under “optional remarks”) 
                  </td>
                  <td>
                    <form-group :hasstyle="employeeNumber3Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber3" v-model="formExist.employeeNumber3"  ></form-group>				
                  </td>
                  <td>
                    <form-group :hasstyle="leadershiRemarks3Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks3" v-model="formExist.leadershiRemarks3"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
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
              <table class="table table-bordered mar-bot-0 JdTable" width="100%"  >
                <tbody>
                <tr>
                  <th class="text-center" width="50%">New Responsibility Type</th>
                  <th class="text-center" width="15%">New Number of Employees</th>
                  <th class="text-center" width="35%">New Remarks</th>
                </tr>
                <tr>
                  <td>
                    Span of control I (Number of employees that are led directly and disciplinarily, based on approved Zielwert) 
                  </td>
                  <td>
                    <form-group :hasstyle="employeeNumberStyle" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber" v-model="form.employeeNumber"  ></form-group>				
                  </td>
                  <td>
                    <form-group :hasstyle="leadershiRemarksStyle" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks" v-model="form.leadershiRemarks"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                    Span of supervision (Number of employees within the whole area of disciplinary responsibility) 
                  </td>
                  <td>
                    <form-group :hasstyle="employeeNumber2Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber2" v-model="form.employeeNumber2"  ></form-group>				
                  </td>
                  <td>
                    <form-group :hasstyle="leadershiRemarks2Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks2" v-model="form.leadershiRemarks2"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
                    Optional: span of control II (in addition – number of employees, that are led 100% functionally) (add explanation as to which employees under “optional remarks”) 
                  </td>
                  <td>
                    <form-group :hasstyle="employeeNumber3Style" type="input4" other-rules="max:75" haslable="false" :disabled="readonly"  name="employeeNumber3" v-model="form.employeeNumber3"  ></form-group>				
                  </td>
                  <td>
                    <form-group :hasstyle="leadershiRemarks3Style" type="input4" other-rules="max:100" haslable="false" :disabled="readonly"  name="leadershiRemarks3" v-model="form.leadershiRemarks3"  ></form-group>				
                  </td>
                </tr>
                <tr>
                  <td>
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
            </div><br />   
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest6" name="modifySuggest6" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Further Remarks</h3>
          <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle8"></i>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="form-group col-md-6">
                <label>Old Further Remarks</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="furtherRemarksStyle" haslable="false" v-model="formExist.furtherRemarks" name="furtherRemarks" :readonly="readonly" label="JobDescriptionApplication.furtherRemarks" placeholder=""></form-group>
              </div>
              <div class="form-group col-md-6">
                <label>New Further Remarks</label>
                <form-group limit="5000" rows="4" type="textareaEnglish" :hasstyle="furtherRemarksStyle" haslable="false" v-model="form.furtherRemarks" name="furtherRemarks" :readonly="readonly" label="JobDescriptionApplication.furtherRemarks" placeholder=""></form-group>
              </div>
            </div>
            <div class="row" v-if="modifySuggestShow">
              <div class="form-group col-md-12">
                <form-group limit="3000" type="textareaEnglish" v-model="form.modifySuggest7" name="modifySuggest7" :readonly="modifySuggestReadonly" label="JobDescriptionApplication.modifySuggest" placeholder=""></form-group>
              </div>
            </div> 
          </div>
        </form>
      </div>
    </div>
    <!-- Update of existing JD over -->
    <div class="box box-primary" v-if="functionGradingShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Function Grade</h3>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <form-group col="md-3" type="input" other-rules="required" v-model="form.functionGrading" name="functionGrading" :disabled="functionGradingReadonly" label="JobDescriptionApplication.functionGrading"></form-group>
					</div>  
				</div>
			</form>
		</div>

    <div class="box box-primary" v-if="organizationChartsShow"><!--v-if="organizationChartsShow"-->
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
			  <h3 class="box-title">Upload Organization Charts</h3>
        <i class="fa fa-fw fa-info-circle text-info" :title="organizationSettingTitle9"></i>
        &nbsp;&nbsp;&nbsp;
        <a href="###" @click="getOrganizationChartsTemplate"> Organization Charts Template</a>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row" v-if="this.form.jdType=='Apply JD' || this.form.jdType=='' || this.form.jdType==null">
            <!-- PNG / JPG  allReadonly -->
            <uploadEnglish class="col-md-12" accept=".jpg,.png" :readonly="readonly" v-model="form.ocAttachmentIds" buttonText="Attachments" :attachments="form.ocAttachments" multi="true" required="true"></uploadEnglish>
          </div>
          <div class="row" v-if="this.form.jdType=='Assign Existing JD to Other Positions'">
            <uploadEnglish2 class="col-md-12" accept=".jpg,.png" :readonly="allReadonly" v-model="form.ocAttachmentIds" buttonText="Attachments" :attachments="form.ocAttachments" multi="true" required="true"></uploadEnglish2>
          </div>
				</div>
			</form>
		</div>

    <div class="checkbox mar-bot-5" v-if="!readonly" >
      <label>
        <span class="help is-danger" v-show="errors.has('terms')">
						{{$t("checkPolicyNotice")}}
				</span>
        <input name="terms" type="checkbox" v-validate="'required'" >
        When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
        <!--当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatdportal.ap.vwg/web/vwatd/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。-->
        <br /><br />
      </label>
    </div>

    <div class="modal fade" id="ruleModal" style="position: fixed;width:100%;height:100%;" tabindex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" id="ruleModal2" style="width:800px;top: 10%;height:300px;margin-top: -151px;" role="document"><!--margin-top: 15%;-->
        <div class="modal-content" style="overflow-y:auto;" >
          <div class="modal-header">
            <h3 class="modal-title" id="modalLabel">
              <span>Preface:</span>
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <span>
              <ul>
              <li>The document at hands describes the basic focus and tasks of the position as well as the corresponding duties and responsibilities.</li>
              <li>Through completing this form, you are making an important contribution to the documentation of the organizational structure of your company and to the subsequent function grading.</li>
              <li>Please describe the position in an objective and fact based manner, <strong>independently from present job holder</strong>. Please define the requirements of the position as if it would to be assigned newly.</li>
              <li>Please fill in the content according to the corresponding data fields and try to avoid double entries.</li>
              <li>Please document the focus and area of responsibility that is currently in scope, independent of whether all allocated tasks are already performed in the planned manner.</li>
              <li>Please always focus on the most important aspects and name the items with highest priority first.</li>
              <li>For questions please contact the CH Organization Team.</li>
              <li>Each job description lies within the responsibility of the supervisor and should in addition be approved by the position holder and the Head of Organization & Talent Management.</li>
              <li>Please use <strong>English language</strong> to fill in the job description. </li>
              
              </ul>
            </span><br/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal"  @click="submitProcess()" >OK</button>
          </div>
        </div>
      </div>
    </div>
      <!--
      <input type="button"  name="testApprovel" value="测试审批人approvel" @click="beforeapprovel" v-if="this.form.status==1">
      <input type="button"  name="testP" value="测试申请人submit" @click="beforesubmit" v-if="this.form.status==2 || this.form.status== null">
      -->
      <comment v-if="commentShow && processTaskId !=null && ckeckInApproveFlow" v-model="form.approval.approvalRemark" name="approval.approvalRemark" ifEnglish="true" placeholder="Comments"></comment>
      <!-- Orga. Partner(Approval)  save as word/save as pdf-->
      <ConfirmwithSaveRejectReview v-if="confirmWithSaveAsWordPdfBtn && ckeckInApproveFlow" :form="form" :validator="this.$validator" lableName="Approve" rejectLableName="Reject" uri="/jobDescriptionApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></ConfirmwithSaveRejectReview>
      <!-- Orga. Partner (Fill in FG)： Confirm  save as word/save as pdf-->
      <ConfirmWithWordPdf v-else-if="confirmBtn && ckeckInApproveFlow" :form="form" :validator="this.$validator" lableName="Confirm" uri="/jobDescriptionApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></ConfirmWithWordPdf>
      
      <!-- Head of CHO 节点：save\approve\reject
      <Confirmwithsavereject v-else-if="confirmSaveRejectBtn && this.form.status != 9 && ckeckInApproveFlow" :form="form" :validator="this.$validator" lableName="Approve" uri="/jobDescriptionApplication/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></Confirmwithsavereject>
      -->

      <!-- 第二节点、Head of CHO  approve\reject按钮 -->
      <router-view id="JobDescriptionApplicationSubmit" v-else :form="form" entityId="JobDescriptionApplication" vclass="btn-left" uri="/form/JobDescriptionApplication/update" :validator="this.$validator"  v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel" v-on:beforeRealApprovel="beforeapprovel"></router-view>      
      
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
    submitProcess: function(){
      $("#ruleModal").modal("hide");
    },

    startProcess: function(){
      console.log("startProcess");
      //$("#ruleModal").modal("show");//点击空白处关闭对话框
      $("#ruleModal").modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
    },
    checkStatus: function(status) {
      //BR.001
      if(status == 1 && this.$route.query.taskKey == null && this.$route.query.processInstanceId == null){
        var router = this.$router;
        if(process.env.MODE === 'dev'){//原来是apon  看dev.env.js文件中的配置
          top.location.href = Config.getAPONURL();//看http.js文件 原来是getAPONURL
        }else{
          router.push({ path: '/index/application'});
        }
      }
    },
    doAfterSelectOnePosition: function(data) {
			$('#selectotherperson').attr("class", "input-group-btn");
			//console.log(data);
      if(data.jdaid){
        console.log("doAfterSelectOnePosition  data.jdaid="+data.jdaid);
        this.form.applicationType="Update of existing JD";        
        //回填已有的Position单子 的其他各个信息
        var me = this;
        this.GL.actUtil.query("post","/jobDescriptionApplication/getExistingJD?jdaId="+data.jdaid+"&jdId="+me.form.id,"",function(data){
          me.form = JSON.parse(data).form;
          var status = me.form.status;
          me.form.applicationType="Update of existing JD";
          me.form.organizationSettingDate="";
		  if(me.form.jdaIndicatorsList != null){
          }else{
            me.form.jdaIndicatorsList=[];
          }
          //me.checkStatus(status);
        });
      }else{
        this.form.applicationType="New JD";
        this.form.existJd=0;
        //比较选择position后是否清空值
        if(this.applicationTypeOld != this.form.applicationType){
          //回填的值 清空
          this.form.organizationSettingDate="";
          this.form.approvalFurtherParty="";
          this.form.positionScopeObjective="";
          this.form.responsibilityRange="";
          this.form.jdaTasksList=[];
          this.insertItineraryRows();
          this.form.qualificationSkills="";
          this.form.indicatorsValueOne="";
          this.form.indicatorsValueTwo="";
          this.form.indicatorsValueThree="";
          this.form.unitFour="";
          this.form.indicatorsValueFour="";
          this.form.jdaIndicatorsList=[];
          this.form.indicatorsRemarks="";
          this.form.personnelResponsibility="";
          this.form.employeeNumber="";
          this.form.leadershiRemarks="";
          this.form.employeeNumber2="";
          this.form.leadershiRemarks2="";
          this.form.employeeNumber3="";
          this.form.leadershiRemarks3="";
          this.form.employeeNumber4="";
          this.form.leadershiRemarks4="";
          this.form.furtherRemarks="";
          this.form.ocAttachmentIds="";
          this.form.ocAttachments="";
          this.form.functionGrading="";
        }
      }
      this.applicationTypeOld=this.form.applicationType;//用于比较选择position后是否清空值
      if(data.jdaid){
        this.form.existJd=data.jdaid;
      }
      console.log("doAfterSelectOnePosition jdaid="+data.jdaid+",existJd="+this.form.existJd);

      this.form.positionName = data.positionname;
      this.form.positionCode = data.positioncode;
			this.form.reportTo = data.reporttofunction;
			var tempdep = data.department;
			if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
				tempdep = data.division;
			}
      this.form.divisionDepartment = tempdep;
      this.form.reportToPerson=data.reporttoperson;
      this.form.reportToPersonCode=data.reporttopersoncode;
      this.form.reportToFunction=data.reporttofunction;
      this.form.reportToFunctionCode=data.reporttofunctioncode;
      this.form.approvalDirectSupervisor = data.reporttoperson;
      this.form.approvalPositionHolder = data.staffname;
      this.form.positionHolderStaffcode= data.staffcode;
      this.form.positionHolderOld = data.staffname;
      this.form.jdType="Apply JD";
      this.form.positionNameShortUnit=data.positionname;
      //shortUnit  positionNameShortUnit
      if(data.positioncode != null && data.positioncode != ""){
        var me = this;
        this.GL.actUtil.query("post","/jobDescriptionApplication/getPositionShortUnit?positionCode="+data.positioncode,"",function(data){
          var shortUnit = JSON.parse(data).shortUnit;
          me.form.shortUnit = shortUnit;
          if(shortUnit != null && shortUnit != ""){
            me.form.positionNameShortUnit+=" / "+shortUnit;
          }
        });
      }
      console.log("shortUnit="+this.form.shortUnit+",positionNameShortUnit="+this.form.positionNameShortUnit);
      this.form.organizationSettingDate="";
    },
    //Orga Partner选择职位
    doAfterSelectOnePositionByOrga: function(data,dataIndex) {
      console.log('#selectotherpersonOgra'+dataIndex);
      console.log("doAfterSelectOnePositionByOrga dataIndex="+dataIndex);
			$('#selectotherpersonOgra'+dataIndex).attr("class", "input-group-btn");
			//console.log(data);
      this.form.applicationType="Assign Existing JD";
      this.form.existJd=0;
      console.log("doAfterSelectOnePositionByOrga jdaid="+data.jdaid);
			var tempdep = data.department;
			if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
				tempdep = data.division;
      }
      //值回填
      this.form.jdaPositionList[dataIndex].positionName=data.positionname;
      this.form.jdaPositionList[dataIndex].positionCode=data.positioncode;
      this.form.jdaPositionList[dataIndex].reportToPerson=data.reporttoperson;
      this.form.jdaPositionList[dataIndex].reportToPersonCode=data.reporttopersoncode;
      this.form.jdaPositionList[dataIndex].reportToFunction=data.reporttofunction;
      this.form.jdaPositionList[dataIndex].reportToFunctionCode=data.reporttofunctioncode;
      this.form.jdaPositionList[dataIndex].divisionDepartment=tempdep;
      this.form.jdaPositionList[dataIndex].positionHolder=data.staffname;
      this.form.jdaPositionList[dataIndex].positionHolderStaffcode=data.staffcode;
      this.form.jdaPositionList[dataIndex].positionHolderOld=data.staffname;

      this.form.jdaPositionList[dataIndex].positionNameShortUnit=data.positionname;
      //shortUnit  positionNameShortUnit
      if(data.positioncode != null && data.positioncode != ""){
        var me = this;
        this.GL.actUtil.query("post","/jobDescriptionApplication/getPositionShortUnit?positionCode="+data.positioncode,"",function(data){
          var shortUnit = JSON.parse(data).shortUnit;
          console.log("shortUnit="+shortUnit);
          me.form.jdaPositionList[dataIndex].shortUnit = shortUnit;
          if(shortUnit != null && shortUnit != ""){
            me.form.jdaPositionList[dataIndex].positionNameShortUnit += " / "+shortUnit;
          }
        });
      }
      console.log("shortUnit="+this.form.jdaPositionList[dataIndex].shortUnit+",positionNameShortUnit="+this.form.jdaPositionList[dataIndex].positionNameShortUnit);

      if(data.staffname == null || data.staffname == ""){
        this.form.jdaPositionList[dataIndex].positionHolderReadonly=false;
      }else{
        this.form.jdaPositionList[dataIndex].positionHolderReadonly=true;
      }

      for(var i=0;i<this.form.jdaPositionList.length;i++){
        var reportToPersonCode = this.form.jdaPositionList[i].reportToPersonCode;
        var positioncode = this.form.jdaPositionList[i].positionCode;
        console.log("positioncode="+positioncode+",reportToPersonCode="+reportToPersonCode);
        if(positioncode !=null && positioncode !="" && (reportToPersonCode == null || reportToPersonCode =="") ){
          $.alertApon("Please select position code of the same approval disciplinary supervisor.");
          return;
        }
        if(positioncode !=null && positioncode !="" && reportToPersonCode != null && reportToPersonCode !="" ){
          for(var j=1;j<this.form.jdaPositionList.length;j++){
            var reportToPersonCode2 = this.form.jdaPositionList[j].reportToPersonCode;
            var positioncode2 = this.form.jdaPositionList[j].positionCode;
            console.log("positioncode2="+positioncode2+",reportToPersonCode2="+reportToPersonCode2);
            if(positioncode2 != null && positioncode2 !="" 
              && reportToPersonCode2 != null && reportToPersonCode2 !=""
              && reportToPersonCode != reportToPersonCode2){
              $.alertApon("Please select position code of the same approval disciplinary supervisor.");
              //Approval Direct Supervisor must be the same person.
              return;
            }
          }
        }
      }
      this.form.jdType="Assign Existing JD to Other Positions";
    },
    doAfterSelectOneJD: function(data) {
      //selectotherjd
      $('#selectotherjd').attr("class", "input-group-btn");
      this.showArrResponsibility=false;
      //根据ID查询然后返回
      var me = this;      
      this.GL.actUtil.query("post","/jobDescriptionApplication/assignExistingJD?jdaId="+data.id+"&jdId="+me.form.id,"",function(data){
        me.form = JSON.parse(data).form;
        me.form.organizationSettingDate="";
        //me.checkStatus(status);
      });
      this.form.applicationType="Assign Existing JD";
      this.form.existJd=0;
      this.form.jdType="Assign Existing JD to Other Positions";
      this.showArrResponsibility=true;
      this.form.organizationSettingDate="";
    },
    
     //提交前校验
    beforesubmit: function() {
      if(this.form.roleType == null || this.form.roleType==""){
        $.alertApon("Data issues, you cannot submit! Please contact the Administrator to mantain the data.");
        this.form.submitstatus=false;
        return;
      }
      if(this.form.roleType=="AmMkOmk"){
        //this.form.submitstatus=false;
        var result;
        var me = this;
        this.GL.actUtil.query("get","/jobDescriptionApplication/existNullValue/"+this.form.applicantUserId,"",function(data){
          result = JSON.parse(data).result;
          if(result){
            $.alertApon("Can't find supervisor! Please contact the Administrator to mantain the data.");
            me.form.submitstatus=false;
            return;
          }else{
            me.form.submitstatus=true;
          }
        });
      }
      //reportToPerson
      if(this.form.roleType=="Orga Partner" && this.form.jdType=="Assign Existing JD to Other Positions"){
        for(var i=0;i<this.form.jdaPositionList.length;i++){
          var reportToPersonCode = this.form.jdaPositionList[i].reportToPersonCode;
          var positioncode = this.form.jdaPositionList[i].positionCode;
          console.log("positioncode="+positioncode+",reportToPersonCode="+reportToPersonCode);
          if(positioncode == "" || positioncode== null){
            $.alertApon("Please choose a position.");
            this.form.submitstatus=false;
            return;
          }
          if(positioncode && (reportToPersonCode == null || reportToPersonCode =="") ){
            $.alertApon("Please select position code of the same approval disciplinary supervisor.");
            this.form.submitstatus=false;
            return;
          }
          if(positioncode !=null && positioncode !="" && reportToPersonCode != null && reportToPersonCode !="" ){
            for(var j=1;j<this.form.jdaPositionList.length;j++){
              var reportToPersonCode2 = this.form.jdaPositionList[j].reportToPersonCode;
              var positioncode2 = this.form.jdaPositionList[j].positionCode;
              console.log("positioncode2="+positioncode2+",reportToPersonCode2="+reportToPersonCode2);
              if(positioncode2 != null && positioncode2 !="" 
                && reportToPersonCode2 != null && reportToPersonCode2 !=""
                && reportToPersonCode != reportToPersonCode2){
                $.alertApon("Please select position code of the same approval disciplinary supervisor.");
                //Approval Direct Supervisor must be the same person.
                this.form.submitstatus=false;
                return;
              }
            }
          }
        }
      }else{
        //判断是否选择了Position
        if(this.form.positionCode == null || this.form.positionCode==""){
          $.alertApon("Please choose a position.");
          this.form.submitstatus=false;
          return;
        }
      }

      //Quantitative Indicators 量化指标
      if(this.form.unitFour != null && this.form.unitFour !=""){
        if(this.form.indicatorsValueFour ==null || this.form.indicatorsValueFour =="" ){
          $.alertApon("The value on item 4 cannot be empty. 行项4的值不可为空。");
          this.form.submitstatus=false;
          return;
        }else{
          this.form.submitstatus=true;
        }
      }
      if(this.form.indicatorsValueFour != null && this.form.indicatorsValueFour !=""){
        if(this.form.unitFour ==null || this.form.unitFour =="" ){
          $.alertApon("The unit on item 4 cannot be empty. 行项4的单位不可为空。");
          this.form.submitstatus=false;
          return;
        }else{
          this.form.submitstatus=true;
        }
      }
      
      //Personnel Responsibility 人员职责  personnelResponsibility
      var personnelResponsibility = $("input:radio[name='personnelResponsibility']:checked").val();
      if(personnelResponsibility==undefined){
        $.alertApon("Please click in the radio button for item: “Personnel Responsibility”.");
        this.form.submitstatus=false;
        return;
      }else{
        this.form.submitstatus=true;
      }
      if(personnelResponsibility=="Yes"){
        //Leadership and Coordination Responsibility 领导和协调责任 
        //至少填写2行
        if((this.form.employeeNumber == null || this.form.employeeNumber =="") 
          && (this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="")
          && (this.form.employeeNumber2 == null || this.form.employeeNumber2 =="")
          && (this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="" )){
          $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
          this.employeeNumberStyle=true;
          this.leadershiRemarksStyle=true;
          this.employeeNumber2Style=true;
          this.leadershiRemarks2Style=true;
          this.form.submitstatus=false;
          return;
        }
        if((this.form.employeeNumber == null || this.form.employeeNumber =="") 
          && (this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="")){
          //$.alertApon("Leadership and coordination responsibility need to be filled in line 1.");
          $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
          this.employeeNumberStyle=true;
          this.leadershiRemarksStyle=true;
          this.form.submitstatus=false;
          return;
        }
        if((this.form.employeeNumber2 == null || this.form.employeeNumber2 =="")
          && (this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="" )){
          //$.alertApon("Leadership and coordination responsibility need to be filled in line 2.");
          $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
          this.employeeNumber2Style=true;
          this.leadershiRemarks2Style=true;
          this.form.submitstatus=false;
          return;
        }
        if(this.form.employeeNumber != null && this.form.employeeNumber !="" ){
          if(this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="" ){
            //提示不可为空
            //$.alertApon("The remarks on line 1 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.leadershiRemarks != null && this.form.leadershiRemarks !="" ){
          if(this.form.employeeNumber ==null || this.form.employeeNumber =="" ){
            //提示不可为空
            //$.alertApon("The number of employees on line 1 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.employeeNumber2 != null && this.form.employeeNumber2 !=""){
          if(this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="" ){
            //提示不可为空
            //$.alertApon("The remarks on line 2 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.leadershiRemarks2 != null && this.form.leadershiRemarks2 !=""){
          if(this.form.employeeNumber2 ==null || this.form.employeeNumber2 =="" ){
            //提示不可为空
            //$.alertApon("The number of employees on line 2 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.employeeNumber3 != null && this.form.employeeNumber3 !=""){
          if(this.form.leadershiRemarks3 ==null || this.form.leadershiRemarks3 =="" ){
            //提示不可为空
            //$.alertApon("The remarks on line 3 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.leadershiRemarks3 != null && this.form.leadershiRemarks3 !=""){
          if(this.form.employeeNumber3 ==null || this.form.employeeNumber3 =="" ){
            //提示不可为空
            //$.alertApon("The number of employees on line 3 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.employeeNumber4 != null && this.form.employeeNumber4 !=""){
          if(this.form.leadershiRemarks4 ==null || this.form.leadershiRemarks4 =="" ){
            //提示不可为空
            //$.alertApon("The remarks on line 4 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
        if(this.form.leadershiRemarks4 != null && this.form.leadershiRemarks4 !=""){
          if(this.form.employeeNumber4 ==null || this.form.employeeNumber4 =="" ){
            //提示不可为空
            //$.alertApon("The number of employees on line 4 cannot be empty.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }

      }

    },
    //审批时提交校验
    beforeapprovel: function() {
      var status = this.form.status;
      var processTaskKey=this.processTaskKey;
      
      //resubmit
      //reject之后的Resubmit
      if(status == 9){

        if(this.form.roleType=="AmMkOmk"){
          //this.form.submitstatus=false;
          var result;
          var me = this;
          this.GL.actUtil.query("get","/jobDescriptionApplication/existNullValue/"+this.form.applicantUserId,"",function(data){
            result = JSON.parse(data).result;
            if(result){
              $.alertApon("Can't find supervisor! Please contact the Administrator to mantain the data.");
              me.form.approvelstatus=false;
              return;
            }else{
              me.form.approvelstatus=true;
            }
          });
        }

        //reportToPerson
        if(this.form.roleType=="Orga Partner" && this.form.jdType=="Assign Existing JD to Other Positions"){
          for(var i=0;i<this.form.jdaPositionList.length;i++){
            var reportToPersonCode = this.form.jdaPositionList[i].reportToPersonCode;
            var positioncode = this.form.jdaPositionList[i].positionCode;
            console.log("positioncode="+positioncode+",reportToPersonCode="+reportToPersonCode);
            if(positioncode == "" || positioncode== null){
              $.alertApon("Please choose a position.");
              this.form.approvelstatus=false;
              return;
            }
            if(positioncode && (reportToPersonCode == null || reportToPersonCode =="") ){
              $.alertApon("Please select position code of the same approval disciplinary supervisor.");
              this.form.approvelstatus=false;
              return;
            }
            if(positioncode !=null && positioncode !="" && reportToPersonCode != null && reportToPersonCode !="" ){
              for(var j=1;j<this.form.jdaPositionList.length;j++){
                var reportToPersonCode2 = this.form.jdaPositionList[j].reportToPersonCode;
                var positioncode2 = this.form.jdaPositionList[j].positionCode;
                console.log("positioncode2="+positioncode2+",reportToPersonCode2="+reportToPersonCode2);
                if(positioncode2 != null && positioncode2 !="" 
                  && reportToPersonCode2 != null && reportToPersonCode2 !=""
                  && reportToPersonCode != reportToPersonCode2){
                  $.alertApon("Please select position code of the same approval disciplinary supervisor.");
                  //Approval Direct Supervisor must be the same person.
                  this.form.approvelstatus=false;
                  return;
                }
              }
            }
          }
        }else{
          //判断是否选择了Position
          if(this.form.positionCode == null || this.form.positionCode==""){
            $.alertApon("Please choose a position.");
            this.form.approvelstatus=false;
            return;
          }
        }

        //Quantitative Indicators 量化指标
        if(this.form.unitFour != null && this.form.unitFour !=""){
          if(this.form.indicatorsValueFour ==null || this.form.indicatorsValueFour =="" ){
            $.alertApon("The value on item 4 cannot be empty.");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        if(this.form.indicatorsValueFour != null && this.form.indicatorsValueFour !=""){
          if(this.form.unitFour ==null || this.form.unitFour =="" ){
            $.alertApon("The unit on item 4 cannot be empty.");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        //Personnel Responsibility 人员职责  personnelResponsibility
        var personnelResponsibility = $("input:radio[name='personnelResponsibility']:checked").val();
        if(personnelResponsibility==undefined){
          $.alertApon("Please click in the radio button for item: “Personnel Responsibility”.");
          this.form.approvelstatus=false;
          return;
        }else{
          this.form.approvelstatus=true;
        }
        if(personnelResponsibility=="Yes"){
          //Leadership and Coordination Responsibility 领导和协调责任 
          //至少填写一行
          if((this.form.employeeNumber == null || this.form.employeeNumber =="") 
            && (this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="")
            && (this.form.employeeNumber2 == null || this.form.employeeNumber2 =="")
            && (this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="")){
            //$.alertApon("Leadership and coordination responsibility need to be filled in line 1 and 2.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
	    this.employeeNumberStyle=true;
            this.leadershiRemarksStyle=true;
            this.employeeNumber2Style=true;
            this.leadershiRemarks2Style=true;
            this.form.approvelstatus=false;
            return;
          }
          if((this.form.employeeNumber == null || this.form.employeeNumber =="") 
            && (this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="")){
            //$.alertApon("Leadership and coordination responsibility need to be filled in line");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
	    this.employeeNumberStyle=true;
            this.leadershiRemarksStyle=true;
            this.form.approvelstatus=false;
            return;
          }
          if((this.form.employeeNumber2 == null || this.form.employeeNumber2 =="")
            && (this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="")){
            //$.alertApon("Leadership and coordination responsibility need to be filled in line 2.");
            $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
	    this.employeeNumber2Style=true;
            this.leadershiRemarks2Style=true;
            this.form.approvelstatus=false;
            return;
          }

          if(this.form.employeeNumber != null && this.form.employeeNumber !=""){
            if(this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="" ){
              //提示不可为空
              //$.alertApon("The remarks on line 1 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.leadershiRemarks != null && this.form.leadershiRemarks !="" ){
            if(this.form.employeeNumber ==null || this.form.employeeNumber =="" ){
              //提示不可为空
              //$.alertApon("The number of employees on line 1 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.employeeNumber2 != null && this.form.employeeNumber2 !=""){
            if(this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="" ){
              //提示不可为空
              //$.alertApon("The remarks on line 2 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.leadershiRemarks2 != null && this.form.leadershiRemarks2 !=""){
            if(this.form.employeeNumber2 ==null || this.form.employeeNumber2 =="" ){
              //提示不可为空
              //$.alertApon("The number of employees on line 2 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.employeeNumber3 != null && this.form.employeeNumber3 !=""){
            if(this.form.leadershiRemarks3 ==null || this.form.leadershiRemarks3 =="" ){
              //提示不可为空
              //$.alertApon("The remarks on line 3 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.leadershiRemarks3 != null && this.form.leadershiRemarks3 !=""){
            if(this.form.employeeNumber3 ==null || this.form.employeeNumber3 =="" ){
              //提示不可为空
              //$.alertApon("The number of employees on line 3 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.employeeNumber4 != null && this.form.employeeNumber4 !=""){
            if(this.form.leadershiRemarks4 ==null || this.form.leadershiRemarks4 =="" ){
              //提示不可为空
              //$.alertApon("The remarks on line 4 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(this.form.leadershiRemarks4 != null && this.form.leadershiRemarks4 !=""){
            if(this.form.employeeNumber4 ==null || this.form.employeeNumber4 =="" ){
              //提示不可为空
              //$.alertApon("The number of employees on line 4 cannot be empty.");
              $.alertApon("Please fill in mandatory fields in 'Leadership and coordination responsibility'.");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
        }
      }
      //approve 
      if(status == 1){
        var today = this.DT.getCurrentDay();
        if(this.form.applicationType=="Update of existing JD" && this.form.status == 1
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
          && this.$route.query.taskKey != null 
          && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="directSupervisor"
          || this.$route.query.taskKey =="bomBOMC" || this.$route.query.taskKey =="bomBOMT"
          || this.$route.query.taskKey =="supervisor" || this.$route.query.taskKey =="headOfCho")){
            console.log("review change");
          //modifySuggest1
          if((this.form.modifySuggest1 != null && this.form.modifySuggest1 != "") 
            || (this.form.modifySuggest2 != null && this.form.modifySuggest2 != "") 
            || (this.form.modifySuggest3 != null && this.form.modifySuggest3 != "") 
            || (this.form.modifySuggest4 != null && this.form.modifySuggest4 != "") 
            || (this.form.modifySuggest5 != null && this.form.modifySuggest5 != "") 
            || (this.form.modifySuggest6 != null && this.form.modifySuggest6 != "") 
            || (this.form.modifySuggest7 != null && this.form.modifySuggest7 != "") ){
		        console.log("review change  gggggg");
            $.alertApon("Due to your input in “Modification Suggestion”, the application will return to the applicant to modify the JD content. Please reject the application.");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }        
      }
    },

    personnelResponsibilityCheck: function() {
      //personnelResponsibilityArea
      var personnelResponsibility = $("input:radio[name='personnelResponsibility']:checked").val();
      if(personnelResponsibility=="Yes"){
        this.personnelResponsibilityArea=true;
      }else{
		    //清空
        this.form.employeeNumber="";
        this.form.leadershiRemarks="";
        this.form.employeeNumber2="";
        this.form.leadershiRemarks2="";
        this.form.employeeNumber3="";
        this.form.leadershiRemarks3="";
        this.form.employeeNumber4="";
        this.form.leadershiRemarks4="";
        this.personnelResponsibilityArea=false;
		    //样式清空
        this.employeeNumberStyle=false;
        this.employeeNumber2Style=false;
        this.employeeNumber3Style=false;
        this.employeeNumber4Style=false;
        this.leadershiRemarksStyle=false;
        this.leadershiRemarks2Style=false;
        this.leadershiRemarks3Style=false;
        this.leadershiRemarks4Style=false;
      }

    },

    //Position   添加一行
		insertPositionRows: function() {
      var newItem = {};
		  for(var key in this.form.jdaPositionList[0]) {
        newItem[key] = "";
      }
		  this.form.jdaPositionList.push(newItem);
		},
    // 删除行
		deletePositionRows: function(rowId) {
		  if(this.form.jdaPositionList.length > 1) {
        //删除数据库的数据
        var id = this.form.jdaPositionList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/jobDescriptionApplication/deleteJdaPosition/"+id, "", function(data) {});
        }
			  this.form.jdaPositionList.splice(rowId, 1);
		  } else {
			  $.alertApon("At least one complete record in position List is needed.");
		  }
		},

    //Key Tasks and Responsibilities 主要任务和责任   添加一行
		insertItineraryRows: function() {
      var newItem = {};
      //var item=this.form.jdaTasksList.length;
		  for(var key in this.form.jdaTasksList[0]) {
        newItem[key] = "";
      }
		  this.form.jdaTasksList.push(newItem);
		},
    //Key Tasks and Responsibilities 主要任务和责任  删除行
		deleteItineraryRows: function(rowId) {
		  if(this.form.jdaTasksList.length > 1) {
        //删除数据库的数据
        var id = this.form.jdaTasksList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/jobDescriptionApplication/deleteJdaTasks/"+id, "", function(data) {});
        }
			  this.form.jdaTasksList.splice(rowId, 1);
		  } else {
			  $.alertApon("At least one complete record in Key Tasks and Responsibilities List is needed.");
		  }
		},

    //Quantitative Indicators 量化指标  添加一行
		insertItineraryRowsIndicators: function() {
      var newItem = {};
		  for(var key in this.form.jdaIndicatorsList[0]) {
        newItem[key] = "";
        console.log("key="+key);

		  }
      this.form.jdaIndicatorsList.push(newItem);
		},
    //Quantitative Indicators 量化指标  删除行
		deleteItineraryRowsIndicators: function(rowId) {
		  //if(this.form.jdaIndicatorsList.length > 1) {
        //删除数据库的数据
        var id = this.form.jdaIndicatorsList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/jobDescriptionApplication/deleteJdaIndicators/"+id, "", function(data) {});
        }
			  this.form.jdaIndicatorsList.splice(rowId, 1);
		  //} else {
			//  $.alertApon("At least one complete record in Quantitative Indicators List is needed. 至少需要填写一条完整的量化指标列表。");
      //}
    },
    //下载PPT模板
    getOrganizationChartsTemplate: function() {
      var url = Config.getBaseURL() + "/jobDescriptionApplication/getOrganizationChartsTemplate" + "?token=" + Config.getToken();
		  var showSelectWin = window.open(url);
		  showSelectWin.focus();
    },
    leadershipInput:function(){
      //Yes
      var personnelResponsibility = $("input:radio[name='personnelResponsibility']:checked").val();
      if(personnelResponsibility=="Yes"){
        if(this.form.leadershiRemarks ==null || this.form.leadershiRemarks =="" ){
          this.leadershiRemarksStyle=true;
        }else{
          this.leadershiRemarksStyle=false;
        }
        if(this.form.employeeNumber ==null || this.form.employeeNumber =="" ){
          this.employeeNumberStyle=true;
        }else{
          this.employeeNumberStyle=false;
        }
        if(this.form.leadershiRemarks2 ==null || this.form.leadershiRemarks2 =="" ){
          this.leadershiRemarks2Style=true;
        }else{
          this.leadershiRemarks2Style=false;
        }
        if(this.form.employeeNumber2 ==null || this.form.employeeNumber2 =="" ){
          this.employeeNumber2Style=true;
        }else{
          this.employeeNumber2Style=false;
        }
      }
    },
    //只可是数字
    oninputNum:function(flag){
      this.leadershipInput();
      if(flag==1){
        if(this.form.employeeNumber != null && this.form.employeeNumber !=""){
          this.form.employeeNumber=this.form.employeeNumber.replace(/[^\d]/g,'');
          var num = this.form.employeeNumber;
          if(isNaN(num)){
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
      }
      if(flag==2){
        if(this.form.employeeNumber2 != null && this.form.employeeNumber2 !=""){
          this.form.employeeNumber2 = this.form.employeeNumber2.replace(/[^\d]/g,'');
          var num = this.form.employeeNumber2;
          if(isNaN(num)){
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
      }
      if(flag==3){
        if(this.form.employeeNumber3 != null && this.form.employeeNumber3 !=""){
          this.employeeNumber3Style=false;
          this.form.employeeNumber3 = this.form.employeeNumber3.replace(/[^\d]/g,'');
          var num = this.form.employeeNumber3;
          if(isNaN(num)){
            this.form.employeeNumber3 ="0";
          }
          var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
          cents = cents.length>1 ? cents : '' ;
          if('' == cents){
            if(num.length>1 && '0' == num.substr(0,1)){
              this.form.employeeNumber3 ="0";
            }
          }
        }else{
          this.employeeNumber3Style=true;
        }
        if(this.form.employeeNumber3 != null && this.form.employeeNumber3 !=""){
          this.employeeNumber3Style=false;
          if(this.form.leadershiRemarks3 ==null || this.form.leadershiRemarks3 =="" ){
            this.leadershiRemarks3Style=true;
            return;
          }else{
            this.leadershiRemarks3Style=false;
          }
        }else{
          this.employeeNumber3Style=true;
        }
        if(this.form.employeeNumber3 == null || this.form.employeeNumber3 ==""){
          if(this.form.leadershiRemarks3 ==null || this.form.leadershiRemarks3 =="" ){
            this.employeeNumber3Style=false;
            this.leadershiRemarks3Style=false;
          }
        }
      }
      if(flag==4){
        if(this.form.employeeNumber4 != null && this.form.employeeNumber4 !=""){
          this.employeeNumber4Style=false;
          this.form.employeeNumber4 = this.form.employeeNumber4.replace(/[^\d]/g,'');
          var num = this.form.employeeNumber4;
          if(isNaN(num)){
            this.form.employeeNumber4 ="0";
          }
          var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
          cents = cents.length>1 ? cents : '' ;
          if('' == cents){
            if(num.length>1 && '0' == num.substr(0,1)){
              this.form.employeeNumber4 ="0";
            }
          }
        }else{
          this.employeeNumber4Style=true;
        }
        if(this.form.employeeNumber4 != null && this.form.employeeNumber4 !=""){
          this.employeeNumber4Style=false;
          if(this.form.leadershiRemarks4 ==null || this.form.leadershiRemarks4 =="" ){
            this.leadershiRemarks4Style=true;
            return;
          }else{
            this.leadershiRemarks4Style=false;
          }
        }else{
          this.employeeNumber4Style=true;
        }
        if(this.form.employeeNumber4 == null || this.form.employeeNumber4 ==""){
          if(this.form.leadershiRemarks4 ==null || this.form.leadershiRemarks4 =="" ){
            this.employeeNumber4Style=false;
            this.leadershiRemarks4Style=false;
          }
        }
      }      
    },
    inputText: function(entry, readonly,flag) {
      this.leadershipInput();
			var value = null;
      if(flag == 0) {
				value = entry.taskDescription;
			}else if(flag == 1){
				value = this.form.leadershiRemarks;
			}else if(flag == 2){
				value = this.form.leadershiRemarks2;
			}else if(flag == 3){
				value = this.form.leadershiRemarks3;
        if(this.form.employeeNumber3 != null && this.form.employeeNumber3 !=""){
          if(this.form.leadershiRemarks3 ==null || this.form.leadershiRemarks3 =="" ){
            this.leadershiRemarks3Style=true;
            return;
          }else{
            this.leadershiRemarks3Style=false;
          }
        }
        if(this.form.leadershiRemarks3 != null && this.form.leadershiRemarks3 !=""){
          if(this.form.employeeNumber3 ==null || this.form.employeeNumber3 =="" ){
            this.employeeNumber3Style=true;
            return;
          }else{
            this.employeeNumber3Style=false;
          }
        }
        if(this.form.employeeNumber3 == null || this.form.employeeNumber3 ==""){
          if(this.form.leadershiRemarks3 ==null || this.form.leadershiRemarks3 =="" ){
            this.employeeNumber3Style=false;
            this.leadershiRemarks3Style=false;
          }
        }
			}else if(flag == 4){
				value = this.form.leadershiRemarks4;
        if(this.form.employeeNumber4 != null && this.form.employeeNumber4 !=""){
          if(this.form.leadershiRemarks4 ==null || this.form.leadershiRemarks4 =="" ){
            this.leadershiRemarks4Style=true;
            return;
          }else{
            this.leadershiRemarks4Style=false;
          }
        }
        if(this.form.leadershiRemarks4 != null && this.form.leadershiRemarks4 !=""){
          if(this.form.employeeNumber4 ==null || this.form.employeeNumber4 =="" ){
            this.employeeNumber4Style=true;
            return;
          }else{
            this.employeeNumber4Style=false;
          }
        }
        if(this.form.employeeNumber4 == null || this.form.employeeNumber4 ==""){
          if(this.form.leadershiRemarks4 ==null || this.form.leadershiRemarks4 =="" ){
            this.employeeNumber4Style=false;
            this.leadershiRemarks4Style=false;
          }
        }
			}
			var reg =/^[0-9]*$/;
			if(readonly) {
				//只读不做操作
			} else {
				if(value) {
					var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
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
					if(flag == 0) {
						entry.taskDescription=limitvalue;
					}else if(flag == 1) {
						this.form.leadershiRemarks=limitvalue;
					}else if(flag == 2) {
						this.form.leadershiRemarks2=limitvalue;
					}else if(flag == 3) {
						this.form.leadershiRemarks3=limitvalue;
					}else if(flag == 4) {
						this.form.leadershiRemarks4=limitvalue;
					}
					$.alertApon(limitSize+' Characters Max.');
				}
			}
		},
    inputTextMessage: function(flag) {
      if(flag==4){
        if(this.form.unitFour != null && this.form.unitFour !=""){
          if(this.form.indicatorsValueFour ==null || this.form.indicatorsValueFour =="" ){
            this.indicatorsValueFourStyle=true;
            return;
          }else{
            this.indicatorsValueFourStyle=false;
          }
        }
        if(this.form.indicatorsValueFour != null && this.form.indicatorsValueFour !=""){
          if(this.form.unitFour ==null || this.form.unitFour =="" ){
            this.unitFourStyle=true;
            return;
          }else{
            this.unitFourStyle=false;
          }
        }
        if(this.form.unitFour == null || this.form.unitFour ==""){
          if(this.form.indicatorsValueFour ==null || this.form.indicatorsValueFour =="" ){
            this.unitFourStyle=false;
            this.indicatorsValueFourStyle=false;
          }
        }
      }
    },
    //无效
    inputTextListMessage: function(entry,flag) {
      console.log("inputTextListMessage");
      if(flag == 1) {
        if(entry.indicators!="" && entry.indicators != null){
          entry.indicatorsStyle=false;
          if(entry.unit=="" || entry.unit == null){
            entry.unitStyle=true;
            console.log("entry.unitStyle="+entry.unitStyle);
            return;
          }else{
            entry.unitStyle=false;
          }
          if(entry.indicatorsValue=="" || entry.indicatorsValue == null){
            entry.indicatorsValueStyle=true;
            return;
          }else{
            entry.indicatorsValueStyle=false;
          }
        }else{
          entry.indicatorsStyle=true;
        }
      }
      if(flag == 2) {
        if(entry.unit!="" && entry.unit != null){
          entry.unitStyle=false;
          if(entry.indicators=="" || entry.indicators == null){
            entry.indicatorsStyle=true;
            return;
          }else{
            entry.indicatorsStyle=false;
          }
          if(entry.indicatorsValue=="" || entry.indicatorsValue == null){
            entry.indicatorsValueStyle=true;
            return;
          }else{
            entry.indicatorsValueStyle=false;
          }
        }else{
          entry.unitStyle=true;
        }
      }
      if(flag == 3) {
        if(entry.indicatorsValue!="" && entry.indicatorsValue != null){
          entry.indicatorsValueStyle=false;
          if(entry.indicators=="" || entry.indicators == null){
            entry.indicatorsStyle=true;
            return;
          }else{
            entry.indicatorsStyle=false;
          }
          if(entry.unit=="" || entry.unit == null){
            entry.unitStyle=true;
            console.log("entry.unitStyle="+entry.unitStyle);
            return;
          }else{
            entry.unitStyle=false;
          }
        }else{
          entry.indicatorsValueStyle=false;
        }
      }


    },
    jdTypeChoose(){
      if(this.form.jdType=="Assign Existing JD to Other Positions"){
        this.form.applicationType="Assign Existing JD";
        this.$nextTick(() => {
          //console.log(this.refs); 
          //console.log(this.$refs.c1); //返回的是一个vue对象，所以可以直接调用其方法
          //this.$refs.c1.popmodal(); //取消自动弹出
        })        
      }
    },
    inputTextMonetary: function(flag) {
			var value = null;
      if(flag == 1){
				value = this.form.indicatorsThree;
			}else if(flag == 2){
				value = this.form.indicatorsFour;
			}
      var reg =/^[0-9]*$/;
      var readonly=false;
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
						this.form.indicatorsThree=limitvalue;
					}else if(flag == 2) {
						this.form.indicatorsFour=limitvalue;
					}
					$.alertApon('300 Characters Max.');
				}
			}
		},

  },
  data() {
    //返回的数据对象
    var dm = {};
    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/JobDescriptionApplication/get/" + id;
    } else {
      var url = "/form/JobDescriptionApplication/create/";
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

    if(dm.form.applicationType=="Update of existing JD"){
      var url = "/jobDescriptionApplication/getReviewChange/" + id;
      if(this.GL){
        this.GL.actUtil.query("get",url,"",function(data){
          dm = JSON.parse(data);
        });
      }else{
        global_.actUtil.query("get",url,"",function(data){
          dm = JSON.parse(data);
        });
      }
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
    dm.nonMonetaryTitle="e.g.: Further KPIs that are directly impacted by the function and help define its scope and importance.";
    dm.approvalFurtherPartyTitle="The appropriate level of the designated party has to be identified for each brand or entity individually and may differ.";
    if(dm.form.jdaIndicatorsList != null){
    }else{
      dm.form.jdaIndicatorsList=[];
    }

    if(dm.form.personnelResponsibility=="No"){
      dm.personnelResponsibilityArea=false;
    }else{
      dm.personnelResponsibilityArea=true;
    }

    dm.showArrResponsibility=true;

    //申请的时候
    if((dm.form.status == null || dm.form.status == 2 || dm.form.status ==9)
      && dm.form.createUserId==dm.form.applicantUserId){
      if(dm.form.jdType==null || dm.form.jdType==""){
        dm.form.jdType="Apply JD";
      }
    }
    dm.unitOneStyle=false;
    dm.unitTwoStyle=false;
    dm.unitThreeStyle=false;
    dm.unitFourStyle=false;
    dm.indicatorsValueOneStyle=false;
    dm.indicatorsValueTwoStyle=false;
    dm.indicatorsValueThreeStyle=false;
    dm.indicatorsValueFourStyle=false;
    
    dm.employeeNumberStyle=false;
    dm.employeeNumber2Style=false;
    dm.employeeNumber3Style=false;
    dm.employeeNumber4Style=false;
    dm.leadershiRemarksStyle=false;
    dm.leadershiRemarks2Style=false;
    dm.leadershiRemarks3Style=false;
    dm.leadershiRemarks4Style=false;

    dm.positionScopeObjectiveStyle=false;
    dm.responsibilityRangeStyle=false;
    dm.qualificationSkillsStyle=false;
    dm.indicatorsThreeStyle=false;
    dm.indicatorsFourStyle=false;
    dm.indicatorsRemarksStyle=false;
    dm.personnelResponsibilityStyle="";
    dm.furtherRemarksStyle=false;
    
    if(dm.form.applicationType != null && dm.form.applicationType !="" ){
      dm.applicationTypeOld=dm.form.applicationType;
    }else{
      dm.applicationTypeOld="New JD";
    }

    if(dm.form.jdType=="Assign Existing JD to Other Positions" 
      && dm.form.createUserId==dm.form.createUserId 
      && (dm.form.status==null || dm.form.status==2 || dm.form.status==9)){
      for(var i=0;i<dm.form.jdaPositionList.length;i++){
        if(dm.form.jdaPositionList[i].positionHolderOld == null || dm.form.jdaPositionList[i].positionHolderOld == ""){
          dm.form.jdaPositionList[i].positionHolderReadonly=false;
        }else{
          dm.form.jdaPositionList[i].positionHolderReadonly=true;
        }
      }
    }
    if(dm.form.applicationType != null && dm.form.applicationType !="" ){
      dm.applicationTypeOld=dm.form.applicationType;
    }else{
      dm.applicationTypeOld="New JD";
    }

    return dm;
  },

  watch: {
    "form.personnelResponsibility":{
			handler(curVal,oldVal){
        if(this.form.personnelResponsibility=="No"){
          this.personnelResponsibilityArea=false;
        }else{
          this.personnelResponsibilityArea=true;
        }
				this.$nextTick(() => {
				
        });
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
    if(this.form.status != null && this.form.status == 1 
      && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
      
    }
    if(this.form.createUserId==this.form.applicantUserId && this.form.status == null){// || this.form.status == 2 || this.form.status == 9)
      this.startProcess();
    }
    if(this.form.roleType == null || this.form.roleType==""){
      $.alertApon("Data issues, you cannot submit! Please contact the Administrator to mantain the data.");
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
    //废弃
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
    //approvalPositionHolder只读与否
    approvalPositionHolderReadonly:{
      get: function() {
        if(this.form.positionName && (this.form.status == null || this.form.status == 2 || this.form.status == 9)
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm") ){
          if(this.form.positionHolderOld != null && this.form.positionHolderOld !=""){
            return true;
          }else{
            return false;
          }
        }else{
          return true;
        }
      }
    },
    //Approval Further Party  进一步审批人 只读
    approvalFurtherPartyReadonly: {
      // 动态计算readonly的值
      get: function() {
        if((this.form.status == 1 || this.form.status == 9) && this.$route.query.taskKey != null 
          && (this.$route.query.taskKey =="orgaPartner" )
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;//Orga. partner填写 审批页面
        }else if((this.form.status == null || this.form.status == 2 || this.form.status == 9)
          && this.form.roleType=="Orga Partner" && (this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" )){
          return false;//Orga. partner申请时填写
        }else{
          return true;
        }
      }
    },
    //Function Grading 岗位级别 显示
    functionGradingShow: {
      // 动态计算readonly的值
      get: function() {
        if(this.$route.query.taskKey != null && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
          && (this.$route.query.taskKey =="orgaPartnerFillFG" || this.$route.query.taskKey =="headOfChoFG")){
          return true;//审批页面
        }else if(this.form.functionGrading != null && this.form.functionGrading != "" 
          && this.$route.query.taskKey != null
          && (this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1)
          && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="orgaPartnerFillFG" 
          || this.$route.query.taskKey =="headOfCho" || this.$route.query.taskKey =="headOfChoFG") ){
          return true;//My Approval进来 显示
        }else if(this.form.functionGrading != null && this.form.functionGrading != "" 
          && this.form.ifOrgaPartner && this.form.roleType=="Orga Partner" && this.$route.query.taskKey == null 
          && this.form.status != null && this.form.status!=2){
          return true;//Orga Partner申请，详情页面显示 
        }else{
          return false;
        }
      }
    },
    //Function Grading 岗位级别 只读
    functionGradingReadonly: {
      // 动态计算readonly的值
      get: function() {
        if(this.$route.query.taskKey != null 
          && (this.$route.query.taskKey =="orgaPartnerFillFG" || this.$route.query.taskKey =="headOfChoFG")
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;//审批页面
        }else{
          return true;
        }
      }
    },
    //Organization Charts 附件显示
    organizationChartsShow: {
      get: function() {
        if(this.form.status== null || this.form.status==2){
          console.log("organizationChartsShow  true");
          return true;
        }else if(this.form.status==9 && (this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm") ){
          console.log("organizationChartsShow  true");
          return true;
        }else if(this.form.ocAttachmentIds != null && this.form.ocAttachmentIds !=""){//有值则显示
          console.log("organizationChartsShow  true");
          return true;
        }else{
          console.log("organizationChartsShow  false");
          return false;
        }
      }
    },

    ckeckInApproveFlow:{
      get: function() {
        return ((this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) &&
          !(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")));
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
    //Orga. Partner(Fill in FG)
    confirmBtn:{
      get: function() {
        if((this.form.status==1 || this.form.status==9 ) 
          && this.$route.query.taskKey != null && this.$route.query.taskKey=='orgaPartnerFillFG'){
          console.log("confirmBtn  true");
          return true;
        }else{
          console.log("confirmBtn  false");
          return false;
        }
      }
    },
    //废弃
    confirmSaveRejectBtn:{
      get: function() {
        if(this.$route.query.taskKey != null && this.$route.query.taskKey=='headOfCho'){
          console.log("confirmSaveRejectBtn  true");
          return true;
        }else{
          console.log("confirmSaveRejectBtn  false");
          return false;
        }
      }
    },
    //Orga. Partner申请有save as word、pdf按钮
    confirmWithSaveAsWordPdfBtn:{
      get: function() {
        if(this.form.status==1 && this.$route.query.taskKey != null && this.$route.query.taskKey =="orgaPartner" ){
          console.log("confirmWithSaveAsWordPdfBtn  true");
          return true;
        }else{
          console.log("confirmWithSaveAsWordPdfBtn  false");
          return false;
        }
      }
    },

    //AM/MK/OMK 审批流
    approvalFlow1: function(){
      console.log("this.form.roleType="+this.form.roleType);
      if(this.form.roleType=="AmMkOmk"){
        return true;
      }else{
        return false;
      }
    },
    //BOM
    approvalFlow4: function(){
      console.log("this.form.reportToFunction="+this.form.reportToFunction);
      if((this.form.roleType=="BoM C" || this.form.roleType=="BoM T" 
        || this.form.roleType=="BoM C Assistant" || this.form.roleType=="BoM T Assistant")
        && (this.form.reportToFunction!="General Manager Commercial" && this.form.reportToFunction!="General Manager Technical")){
        return true;
      }else{
        return false;
      }
    },
    //BOM申请GMC职位 BoM T审批
    approvalFlow41: function(){
      if((this.form.roleType=="BoM C" || this.form.roleType=="BoM C Assistant") 
        && this.form.reportToFunction=="General Manager Commercial"){
        return true;
      }else if((this.form.roleType=="BoM T" || this.form.roleType=="BoM T Assistant") 
        && this.form.reportToFunction=="General Manager Commercial"){
        return true;
      }else{
        return false;
      }
    },
    //BOM申请GMT职位 BoM C审批
    approvalFlow42: function(){
      if((this.form.roleType=="BoM T" || this.form.roleType=="BoM T Assistant") 
        && this.form.reportToFunction=="General Manager Technical"){
        return true;
      }else if((this.form.roleType=="BoM C" || this.form.roleType=="BoM C Assistant") 
        && this.form.reportToFunction=="General Manager Technical"){
        return true;
      }else{
        return false;
      }
    },
    //Orga Partner申请普通职位
    approvalFlow5: function(){
      console.log("this.form.positionName="+this.form.positionName);
      if(this.form.roleType=="Orga Partner" && this.form.jdType=="Apply JD"){
        return true;
      }else{
        return false;
      }
    },
    //Orga Partner Assign to
    approvalFlow6: function(){
      if(this.form.roleType=="Orga Partner" && this.form.jdType=="Assign Existing JD to Other Positions"){
        return true;
      }else{
        return false;
      }
    },

    //reviewChange对比区域显示
    reviewChangeShow:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD"
          && this.$route.query.taskKey != null && this.$route.query.taskKey!="editForm"){

            //if(this.form.applicationType=="Update of existing JD" && this.form.status != 2 
            //  && this.form.status !=9){
                //&& this.form.createUserId !=this.form.applicantUserId
              //Scope, Objective and Relevance of Position 
              if(this.form.positionScopeObjective != this.formExist.positionScopeObjective){
                this.positionScopeObjectiveStyle=true;
              }else{
                this.positionScopeObjectiveStyle=false;
              }
              //Range of Responsibility
              if(this.form.responsibilityRange != this.formExist.responsibilityRange){
                this.responsibilityRangeStyle=true;
              }else{
                this.responsibilityRangeStyle=false;
              }

              //Key Tasks and Responsibilities 
              var newJdat=this.form.jdaTasksList.length;
              var oldJdat=this.formExist.jdaTasksList.length;
              console.log("newJdat="+newJdat+",oldJdat="+oldJdat);
              if(newJdat>=oldJdat){
                for(var i=0;i<this.form.jdaTasksList.length;i++){
                  if(i<oldJdat){
                    if(this.form.jdaTasksList[i].taskDescription != this.formExist.jdaTasksList[i].taskDescription){
                      this.form.jdaTasksList[i].taskDescriptionStyle=true;
                      this.formExist.jdaTasksList[i].taskDescriptionStyle=true;
                    }else{
                      this.form.jdaTasksList[i].taskDescriptionStyle=false;
                      this.formExist.jdaTasksList[i].taskDescriptionStyle=false;
                    }

                    if(this.form.jdaTasksList[i].responsibility != this.formExist.jdaTasksList[i].responsibility){
                      this.form.jdaTasksList[i].responsibilityStyle=true;
                      this.formExist.jdaTasksList[i].responsibilityStyle=true;
                    }else{
                      this.form.jdaTasksList[i].responsibilityStyle=false;
                      this.formExist.jdaTasksList[i].responsibilityStyle=false;
                    }

                    if(this.form.jdaTasksList[i].interfacePartners != this.formExist.jdaTasksList[i].interfacePartners){
                      this.form.jdaTasksList[i].interfacePartnersStyle=true;
                      this.formExist.jdaTasksList[i].interfacePartnersStyle=true;
                    }else{
                      this.form.jdaTasksList[i].interfacePartnersStyle=false;
                      this.formExist.jdaTasksList[i].interfacePartnersStyle=false;
                    }
                  }else{
                    this.form.jdaTasksList[i].taskDescriptionStyle=true;
                    this.form.jdaTasksList[i].responsibilityStyle=true;
                    this.form.jdaTasksList[i].interfacePartnersStyle=true;
                  }        
                }
              }else{
                for(var i=0;i<this.formExist.jdaTasksList.length;i++){
                  if(i<newJdat){
                    if(this.form.jdaTasksList[i].taskDescription != this.formExist.jdaTasksList[i].taskDescription){
                      this.form.jdaTasksList[i].taskDescriptionStyle=true;
                      this.formExist.jdaTasksList[i].taskDescriptionStyle=true;
                    }else{
                      this.form.jdaTasksList[i].taskDescriptionStyle=false;
                      this.formExist.jdaTasksList[i].taskDescriptionStyle=false;
                    }

                    if(this.form.jdaTasksList[i].responsibility != this.formExist.jdaTasksList[i].responsibility){
                      this.form.jdaTasksList[i].responsibilityStyle=true;
                      this.formExist.jdaTasksList[i].responsibilityStyle=true;
                    }else{
                      this.form.jdaTasksList[i].responsibilityStyle=false;
                      this.formExist.jdaTasksList[i].responsibilityStyle=false;
                    }

                    if(this.form.jdaTasksList[i].interfacePartners != this.formExist.jdaTasksList[i].interfacePartners){
                      this.form.jdaTasksList[i].interfacePartnersStyle=true;
                      this.formExist.jdaTasksList[i].interfacePartnersStyle=true;
                    }else{
                      this.form.jdaTasksList[i].interfacePartnersStyle=false;
                      this.formExist.jdaTasksList[i].interfacePartnersStyle=false;
                    }
                  }else{
                    this.formExist.jdaTasksList[i].taskDescriptionStyle=true;
                    this.formExist.jdaTasksList[i].responsibilityStyle=true;
                    this.formExist.jdaTasksList[i].interfacePartnersStyle=true;
                  }
                }
              }
              //Qualification and Skills
              if(this.form.qualificationSkills != this.formExist.qualificationSkills){
                this.qualificationSkillsStyle=true;
              }else{
                this.qualificationSkillsStyle=false;
              }
              if(this.form.unitOne != this.formExist.unitOne){
                this.unitOneStyle=true;
              }else{
                this.unitOneStyle=false;
              }
              if(this.form.unitTwo != this.formExist.unitTwo){
                this.unitTwoStyle=true;
              }else{
                this.unitTwoStyle=false;
              }
              if(this.form.unitThree != this.formExist.unitThree){
                this.unitThreeStyle=true;
              }else{
                this.unitThreeStyle=false;
              }
              if(this.form.unitFour != this.formExist.unitFour){
                this.unitFourStyle=true;
              }else{
                this.unitFourStyle=false;
              }
              if(this.form.indicatorsValueOne != this.formExist.indicatorsValueOne){
                this.indicatorsValueOneStyle=true;
              }else{
                this.indicatorsValueOneStyle=false;
              }
              if(this.form.indicatorsValueTwo != this.formExist.indicatorsValueTwo){
                this.indicatorsValueTwoStyle=true;
              }else{
                this.indicatorsValueTwoStyle=false;
              }
              if(this.form.indicatorsValueThree != this.formExist.indicatorsValueThree){
                this.indicatorsValueThreeStyle=true;
              }else{
                this.indicatorsValueThreeStyle=false;
              }
              if(this.form.indicatorsValueFour != this.formExist.indicatorsValueFour){
                this.indicatorsValueFourStyle=true;
              }else{
                this.indicatorsValueFourStyle=false;
              }
              if(this.form.indicatorsThree != this.formExist.indicatorsThree){
                this.indicatorsThreeStyle=true;
              }else{
                this.indicatorsThreeStyle=false;
              }
              if(this.form.indicatorsFour != this.formExist.indicatorsFour){
                this.indicatorsFourStyle=true;
              }else{
                this.indicatorsFourStyle=false;
              }
              //Old Optional Remarks
              if(this.form.indicatorsRemarks != this.formExist.indicatorsRemarks){
                this.indicatorsRemarksStyle=true;
              }else{
                this.indicatorsRemarksStyle=false;
              }

              //jdaIndicatorsList
              //先判空
              var newJdai=0;
              var oldJdai=0;
              if(this.form.jdaIndicatorsList != null && this.form.jdaIndicatorsList.length > 0){
                newJdai=this.form.jdaIndicatorsList.length;
              }
              if(this.formExist.jdaIndicatorsList != null && this.formExist.jdaIndicatorsList.length > 0){
                oldJdai=this.formExist.jdaIndicatorsList.length;
              }
              console.log("newJdai="+newJdai+",oldJdai="+oldJdai);
              //新的行大于旧的行
              if(newJdai>=oldJdai && oldJdai>0 && newJdai>0){
                //console.log("新的行大于旧的行");
                for(var i=0;i<this.form.jdaIndicatorsList.length;i++){
                  if(i<oldJdat){
                    if(this.form.jdaIndicatorsList[i].indicators != this.formExist.jdaIndicatorsList[i].indicators){
                      this.form.jdaIndicatorsList[i].indicatorsStyle=true;
                      this.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
                    }else{
                      this.form.jdaIndicatorsList[i].indicatorsStyle=false;
                      this.formExist.jdaIndicatorsList[i].indicatorsStyle=false;
                    }
                    if(this.form.jdaIndicatorsList[i].unit != this.formExist.jdaIndicatorsList[i].unit){
                      this.form.jdaIndicatorsList[i].unitStyle=true;
                      this.formExist.jdaIndicatorsList[i].unitStyle=true;
                    }else{
                      this.form.jdaIndicatorsList[i].unitStyle=false;
                      this.formExist.jdaIndicatorsList[i].unitStyle=false;
                    }
                    if(this.form.jdaIndicatorsList[i].indicatorsValue != this.formExist.jdaIndicatorsList[i].indicatorsValue){
                      this.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
                      this.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
                    }else{
                      this.form.jdaIndicatorsList[i].indicatorsValueStyle=false;
                      this.formExist.jdaIndicatorsList[i].indicatorsValueStyle=false;
                    }
                  }else{
                    this.form.jdaIndicatorsList[i].indicatorsStyle=true;
                    this.form.jdaIndicatorsList[i].unitStyle=true;
                    this.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
                  }
                }
              }else if(newJdai==0 && oldJdai>0){
                //console.log("新的行=0");
                for(var i=0;i<this.formExist.jdaIndicatorsList.length;i++){
                  this.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
                  this.formExist.jdaIndicatorsList[i].unitStyle=true;
                  this.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
                }
              }else if(oldJdai==0 && newJdai>0){
                //console.log("旧的行=0");
                for(var i=0;i<this.form.jdaIndicatorsList.length;i++){
                  this.form.jdaIndicatorsList[i].indicatorsStyle=true;
                  this.form.jdaIndicatorsList[i].unitStyle=true;
                  this.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
                }
              }else if(newJdai<oldJdai && oldJdai>0 && newJdai>0 ){
                //旧的大于新的
                //console.log("旧的大于新的");
                for(var i=0;i<this.formExist.jdaIndicatorsList.length;i++){
                  if(i<newJdai){
                    if(this.form.jdaIndicatorsList[i].indicators != this.formExist.jdaIndicatorsList[i].indicators){
                      this.form.jdaIndicatorsList[i].indicatorsStyle=true;
                      this.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
                    }else{
                      this.form.jdaIndicatorsList[i].indicatorsStyle=false;
                      this.formExist.jdaIndicatorsList[i].indicatorsStyle=false;
                    }
                    if(this.form.jdaIndicatorsList[i].unit != this.formExist.jdaIndicatorsList[i].unit){
                      this.form.jdaIndicatorsList[i].unitStyle=true;
                      this.formExist.jdaIndicatorsList[i].unitStyle=true;
                    }else{
                      this.form.jdaIndicatorsList[i].unitStyle=false;
                      this.formExist.jdaIndicatorsList[i].unitStyle=false;
                    }
                    if(this.form.jdaIndicatorsList[i].indicatorsValue != this.formExist.jdaIndicatorsList[i].indicatorsValue){
                      this.form.jdaIndicatorsList[i].indicatorsValueStyle=true;
                      this.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
                    }else{
                      this.form.jdaIndicatorsList[i].indicatorsValueStyle=false;
                      this.formExist.jdaIndicatorsList[i].indicatorsValueStyle=false;
                    }
                  }else{
                    this.formExist.jdaIndicatorsList[i].indicatorsStyle=true;
                    this.formExist.jdaIndicatorsList[i].unitStyle=true;
                    this.formExist.jdaIndicatorsList[i].indicatorsValueStyle=true;
                  }
                }
              }else{
                console.log("jdaIndicatorsList都不符合");
              }
              if(this.form.employeeNumber != this.formExist.employeeNumber){
                this.employeeNumberStyle=true;
              }else{
                this.employeeNumberStyle=false;
              }
              if(this.form.employeeNumber2 != this.formExist.employeeNumber2){
                this.employeeNumber2Style=true;
              }else{
                this.employeeNumber2Style=false;
              }
              if(this.form.employeeNumber3 != this.formExist.employeeNumber3){
                this.employeeNumber3Style=true;
              }else{
                this.employeeNumber3Style=false;
              }
              if(this.form.employeeNumber4 != this.formExist.employeeNumber4){
                this.employeeNumber4Style=true;
              }else{
                this.employeeNumber4Style=false;
              }
              if(this.form.leadershiRemarks != this.formExist.leadershiRemarks){
                this.leadershiRemarksStyle=true;
              }else{
                this.leadershiRemarksStyle=false;
              }
              if(this.form.leadershiRemarks2 != this.formExist.leadershiRemarks2){
                this.leadershiRemarks2Style=true;
              }else{
                this.leadershiRemarks2Style=false;
              }
              if(this.form.leadershiRemarks3 != this.formExist.leadershiRemarks3){
                this.leadershiRemarks3Style=true;
              }else{
                this.leadershiRemarks3Style=false;
              }
              if(this.form.leadershiRemarks4 != this.formExist.leadershiRemarks4){
                this.leadershiRemarks4Style=true;
              }else{
                this.leadershiRemarks4Style=false;
              }
              if(this.form.personnelResponsibility != this.formExist.personnelResponsibility){
                this.personnelResponsibilityStyle="color:#FF0000;";
              }else{
                this.personnelResponsibilityStyle="";
              }
              if(this.form.furtherRemarks != this.formExist.furtherRemarks){
                this.furtherRemarksStyle=true;
              }else{
                this.furtherRemarksStyle=false;
              }
            //}

          return true;
        }else{
          return false;
        }
      }
    },
    //审批时是否只读控制
    modifySuggestReadonly:{
      // 动态计算readonly的值
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && this.form.status == 1
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
          && this.$route.query.taskKey != null 
          && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="directSupervisor"
          || this.$route.query.taskKey =="bomBOMC" || this.$route.query.taskKey =="bomBOMT"
          || this.$route.query.taskKey =="supervisor" || this.$route.query.taskKey =="headOfCho") ){
          return false;
        }else{
          return true;
        }
      }
    },
    modifySuggestShow:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD"
          && this.$route.query.taskKey != null 
          && (this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="directSupervisor"
          || this.$route.query.taskKey =="bomBOMC" || this.$route.query.taskKey =="bomBOMT"
          || this.$route.query.taskKey =="supervisor" || this.$route.query.taskKey =="headOfCho") ){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest1Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest1 !=null && this.form.modifySuggest1 !="" 
          && this.form.createUserId==this.form.applicantUserId
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm") ){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest2Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest2 !=null && this.form.modifySuggest2 !="" 
          && this.form.createUserId==this.form.applicantUserId 
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest3Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest3 !=null && this.form.modifySuggest3 !="" 
          && this.form.createUserId==this.form.applicantUserId 
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest4Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest4 !=null && this.form.modifySuggest4 !="" 
          && this.form.createUserId==this.form.applicantUserId 
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest5Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest5 !=null && this.form.modifySuggest5 !="" 
          && this.form.createUserId==this.form.applicantUserId 
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest6Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest6 !=null && this.form.modifySuggest6 !="" 
          && this.form.createUserId==this.form.applicantUserId 
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")){
          return true;
        }else{
          return false;
        }
      }
    },
    //在申请人的my application里拒绝和draf状态显示
    modifySuggest7Show:{
      get:function() {
        if(this.form.applicationType=="Update of existing JD" && (this.form.status == 2 || this.form.status == 9)
          && this.form.modifySuggest7 !=null && this.form.modifySuggest7 !="" 
          && this.form.createUserId==this.form.applicantUserId 
          && (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")){
          return true;
        }else{
          return false;
        }
      }
    },
    //Orga 申请时assign时都是只读
    allReadonly:{
      get:function() {
        if(this.form.applicationType=="Assign Existing JD" && this.form.jdType=='Assign Existing JD to Other Positions'){
          return true;
        }else{
          if((this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("edit") == -1) ||
            (this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)){
            return true;
          }else{
            return false;
          }          
        }
      }
    },
    commentShow:{
      get: function() {
        if(this.$route.query.taskKey != null && this.$route.query.taskKey=='orgaPartnerFillFG'
          && this.form.status == 9){
          console.log("commentShow  true");
          return true;//orgaPartnerFillFG节点被拒绝时Confirm显示comments
        }else if(this.$route.query.taskKey != null && this.form.status == 1){
          console.log("commentShow  true");
          return true;//审批时显示
        }else{
          console.log("commentShow  fasle");
          return false;
        }
      }
    }
   


   
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
.JdTable tbody td{
white-space: normal !important;
}
</style>

<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">

		<!-- Content Header (Page header) -->

		<section class="content-header" style="padding-bottom:15px;">
			<h1>Business Card</h1>
			<ol class="breadcrumb" style="max-width:70%;" >
                <li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li >
					<a>3.Orga Partner</a>
			    </li >
				<li v-if="form.policyDeviation">
					<a>4.Head of CHO</a>
			    </li >
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
			</span>
		</section>
		<div>
		<!-- Main content -->
		<section class="content container-fluid" style="background: white;margin-left: 1.5%;margin-right: 1.5%;">
            <div >
				<div>
					<!-- <div>请用英文填写表单 English input is mandatory</div> -->
					<div v-if="!readonly" class="checkbox" ><label><input type="checkbox"  id="onbehalf" @click="onbehalfclick" v-model="this.onbehalf"> On Behalf </label></div>
				</div>
			</div>
            <form role="form" style="margin-bottom:15px;margin-top:10px;">
              	<div class="">
					<!--
                    <div v-if="!processTaskKey||processTaskKey=='editForm'"></div>
					-->
						<div class="">
							<div style="overflow: auto;margin-bottom:0px !important;" :class="{'form-group':true,'is-danger': errors.has('withHeadOfTemplateRadio') }">
								<div class="radio mar-top-0">
									<label class="" >
                                     	<input type="radio" name="withHeadOfTemplateRadio" :class="{'is-danger': errors.has('withHeadOfTemplateRadio') }" v-model="form.withHeadOfTemplateRadio"  v-validate="'required'"  value="false" :disabled="readonly">
                                        Without "Head of" Template
                                    </label>  
									<label class="mar-left-20">
                                        <input type="radio" name="withHeadOfTemplateRadio" :class="{'is-danger': errors.has('withHeadOfTemplateRadio') }" v-model="form.withHeadOfTemplateRadio"  v-validate="'required'"  value="true" :disabled="readOnlyByRole" >
                                        With "Head of" Template
                                    </label> 
                                    <label class="mar-left-40">
					                    <input type="checkbox" name="changeName" value="true" id="changeName" v-model="changeName"  @change="changeNameClick" :disabled="readonly">
					                    Change the order of Last Name and First Name
					                </label>
					            </div>
					        </div>
                        </div>    
                    
                    <div class="">
                        <div style="overflow: auto;margin-bottom:5px !important;" :class="{'form-group':true,'is-danger': errors.has('plant') }">
							<div class="mar-top-0">
								<label for=""><i class="fa fa-asterisk text-red" ></i> Plant: </label>
								<label class="mar-left-20" >
                                    <input type="radio" name="plant" :class="{'is-danger': errors.has('plant') }" v-model="form.plant"  value="DL" v-validate="'required'" :disabled="readonly" >
                                    DL
                                </label>
								<label class="mar-left-20">
                                    <input type="radio" name="plant" :class="{'is-danger': errors.has('plant') }" v-model="form.plant"  value="DQ" v-validate="'required'" :disabled="readonly">
                                    DQ
                                </label>
					        </div>
					    </div> 
                    </div>
					<div class="">
                        <div style="overflow: auto;" class="form-group">
							<div class="mar-top-0">
								<label>
									<input :disabled="readonly" id="policyDeviation"  value="true"  type="checkbox" name="policyDeviation" v-model="form.policyDeviation" >
									Policy Deviation 政策偏差 <font color="gray">(Choose “Policy Deviation” need Head of CHO approval.) </font>
								</label>
					        </div>
					    </div> 
                    </div>


                    <div style="border: 1px solid; width: 150px; border-color: #cccccc;" align="left">
                        <h3 style="margin-top: 5px;"><font style="font-size:12px;">&nbsp;English Page</font></h3>
                    </div>
                    <div style="border: 1px solid; width: 600px; border-color: #cccccc;" align="left">
                        <table style="width: 100%;"> 
                         	<tbody>
                         		<tr> 
                         			<td colspan="6" align="center">
                         				<img alt="" src="../../../assets/img/vwatj-logo.png" style="margin-top:15px;width:45%;"><br/>
					                    <br/>
                         			</td> 
                         		</tr> 
                         		<tr style="margin-top: 10px;"> 
                         			<td width="5%" rowspan="8"></td> 
                         			<td rowspan="4" algin="left" valgin="top" style="vertical-align: top" width="30%">
                         				<span name="showName" id="showName">{{form.creatorName}}</span> 
                         				<br/>
                         				<span :class="{'form-group':true,'is-danger': errors.has('titleGender') }"> 
                         					<label style="font-weight:normal">
												<input  name="titleGender" value="Mr." type="radio" :class="{'is-danger': errors.has('titleGender') }" v-model="form.titleGender"  :disabled="readonly">&nbsp;Mr.&nbsp; 
                         					</label>
											<label style="font-weight:normal">
											 	<input  name="titleGender" value="Ms." type="radio" :class="{'is-danger': errors.has('titleGender') }" v-model="form.titleGender"  :disabled="readonly"> &nbsp;Ms.&nbsp; 
											</label>
											<label style="font-weight:normal">
												<input  name="titleGender" value="Dr." type="radio" :class="{'is-danger': errors.has('titleGender') }" v-model="form.titleGender"  :disabled="readonly"> &nbsp;Dr.&nbsp;&nbsp;&nbsp;&nbsp; 
											</label>
										 </span>
                         				<br/>
                         				<span v-if="!this.orgaApprove && !this.policyDeviationShow" class="spanTd2" style="margin-top:5px;">{{form.jobTitle}}</span>
                         				<span v-if="!this.orgaApprove && !this.policyDeviationShow" class="spanTd2">{{form.functionType}}</span>
										<!--<span :class="`spanShow-${form.ifShowSub=='true' ? 'b' : 'n' }`">-->
                         				<span v-if="!this.orgaApprove && !this.policyDeviationShow" class="spanTd2">{{form.subDepartment}}</span>
                         				<span v-if="!this.orgaApprove && !this.policyDeviationShow" class="spanTd2">{{form.divisionDept}}</span>
										<!-- 审批时，Orga Partner审批显示 -->
										<form-group v-if="this.orgaApprove && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.jobTitleRequired+'max:75'" v-model="form.jobTitle" name="jobTitle" :readonly="readonlyByOrga" :placeholder="'Title'+jobTitleMustFillEn"></form-group>
										<form-group v-if="this.orgaApprove && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.functionTypeRequired+'max:100'" v-model="form.functionType" name="functionType" :readonly="readonlyByOrga" :placeholder="'Function Name'+functionTypeMustFillEn"></form-group>
										<form-group v-if="this.orgaApprove && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.subDepartmentRequired+'max:100'" v-model="form.subDepartment" name="subDepartment" :readonly="readonlyByOrga" :placeholder="'Sub Department'+subDepartmentMustFillEn"></form-group>
										<form-group v-if="this.orgaApprove && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.divisionDeptRequired+'max:100'" v-model="form.divisionDept" name="divisionDept" :readonly="readonlyByOrga" :placeholder="'Division/Department'+divisionDeptMustFillEn"></form-group>
										<!-- 申请时，Policy Deviation显示 -->
										<div v-show="this.policyDeviationShow">
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.jobTitleRequired+'max:75'" v-model="form.jobTitle" name="jobTitle" :readonly="readonlyByOrga" :placeholder="'Title'+jobTitleMustFillEn"></form-group>
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.functionTypeRequired+'max:100'" v-model="form.functionType" name="functionType" :readonly="readonlyByOrga" :placeholder="'Function Name'+functionTypeMustFillEn"></form-group>
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.subDepartmentRequired+'max:100'" v-model="form.subDepartment" name="subDepartment" :readonly="readonlyByOrga" :placeholder="'Sub Department'+subDepartmentMustFillEn"></form-group>
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.divisionDeptRequired+'max:100'" v-model="form.divisionDept" name="divisionDept" :readonly="readonlyByOrga" :placeholder="'Division/Department'+divisionDeptMustFillEn"></form-group>
										</div>	
                         			</td>
									<td width="4%" rowspan="8"></td> 
                         			<td colspan="2" rowspan="3" style="vertical-align: top;height:90px;" algin="left" valgin="top" id="plantAddress" >
                         				VOLKSWAGEN AUTOMATIC TRANSMISSION <br />(TIANJIN) CO.,&nbsp;LTD.
                         			</td> 
                         		</tr> 
                         		<tr> 
                         			<td width="1%">&nbsp;</td> 
                         		</tr> 
                         		<tr> 
                         			<td >&nbsp;</td> 
                         		</tr> 
                         		<tr>									
                         			<td width="20%"> 
										<span>TELEPHONE (86-22)</span>
									</td>
									<td  width="40%" colspan="2">
										<form-group col="md-8" type="input5" haslable="false" other-rules="required|max:75" v-model="form.telephone"  updatestyle="margin-left" name="telephone" :readonly="readonly"></form-group>
									</td> 
								</tr>
								<tr >
									<td rowspan="4">
										<!--二维码 margin-top:15px;-->
										<img alt="" src="../../../assets/img/BCQRCode.png" style="width:40%;">
									</td>
                         			<td> 
										 <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
										<span>TELEFAX&nbsp;(86-22)</span>
									</td>
									<td colspan="2">
										<form-group col="md-8" type="input5" haslable="false" other-rules="max:75" v-model="form.telefax" updatestyle="margin-left" name="telefax" :readonly="readonly"></form-group>
									</td> 
								</tr> 
								<tr > 
                         			<td > 
										<span>MOBILE&nbsp;(86)</span>
									</td>
									<td colspan="2">
										<form-group col="md-8" type="input5" haslable="false" other-rules="max:75" v-model="form.mobile" updatestyle="margin-left" name="mobile" :readonly="readonly"></form-group>
									</td> 
								</tr> 
								<tr > 
									<td style="height:36px;">EMAIL</td>
									<td colspan="2" style="word-wrap:break-word; word-break:break-all;padding-left:4px;">{{form.email}}</td>
								</tr>
								<tr > 
									<td colspan="3">&nbsp;</td> 
								</tr>
							</tbody>
						</table>
					</div>
                    <div style="height: 30px;"> </div>
                    <div style="border: 1px solid; width: 150px; border-color: #cccccc;" align="left">
                        <h3 style="margin-top: 5px;"><font style="font-size:12px;">&nbsp;中文页面</font></h3>
                    </div>
                    <div style="border: 1px solid; width: 600px; border-color: #cccccc;" align="left">
						<table style="width: 100%;"> 
							<tbody>
								<tr> 
									<td colspan="5" align="center">
										<img alt="" src="../../../assets/img/vwatj-logo.png" style="margin-top:15px;width:45%;"><br/>
										<br/>
									</td> 
								</tr> 
								<tr style="margin-top: 10px;"> 
									<td width="5%" rowspan="9">&nbsp;</td> 
									<td rowspan="5" algin="left" style="vertical-align: top;" width="30%">
										<!--<span class="spanTd2" name="showNameCn" id="showNameCN">{{form.nameCn}}{{form.titleGenderCN}}</span>-->
										<form-group v-if="!readonly && !this.orgaApprove" class="md-12-no-left" type="input5" haslable="false" other-rules="required|max:75" updatestyle="margin-right" v-model="form.nameCn" name="nameCn" :readonly="readonlyByOrga"></form-group>
										<form-group v-if="!readonly && !this.orgaApprove" class="md-12-no-left" type="input5" haslable="false" other-rules="required|max:75" updatestyle="margin-right" v-model="form.titleGenderCN" name="titleGenderCN" readonly="true"></form-group>
                         				<span v-if="readonly" class="spanTd2">{{form.nameCn}}</span>
                         				<span v-if="readonly" class="spanTd2">{{form.titleGenderCN}}</span>
										<span v-if="readonly && !this.orgaApprove && !this.policyDeviationShow" class="spanTd2" style="margin-top:5px;">{{form.jobTitleCn}}</span>
                         				<span v-if="readonly && !this.orgaApprove && !this.policyDeviationShow" class="spanTd2">{{form.functionTypeCn}}</span>
                         				<span v-if="readonly && !this.orgaApprove && !this.policyDeviationShow" class="spanTd2">{{form.subDepartmentCn}}</span>
                         				<span v-if="readonly && !this.orgaApprove && !this.policyDeviationShow" class="spanTd2">{{form.divisionDeptCn}}</span>

										<form-group v-if="this.form.ifShowJobTitleCn && !this.orgaApprove && !readonly && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" other-rules="required|max:75" updatestyle="margin-right" v-model="form.jobTitleCn" name="jobTitleCn" :readonly="readonlyByOrga" placeholder="头衔（必填）"></form-group>
										<form-group v-if="this.form.ifShowFunctionTypeCn && !this.orgaApprove && !readonly && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" other-rules="required|max:100" updatestyle="margin-right" v-model="form.functionTypeCn" name="functionTypeCn" :readonly="readonlyByOrga" placeholder="岗位名称（必填）"></form-group>
										<!--:class="`inputShow-${form.ifShowSub=='true' ? 'b' : 'n' }`" -->
										<form-group v-if="this.form.ifShowSubDepartmentCn && !this.orgaApprove && !readonly && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" other-rules="required|max:100" v-model="form.subDepartmentCn" name="subDepartmentCn" :readonly="readonlyByOrga" placeholder="子部门（必填）"></form-group>
										<form-group v-if="this.form.ifShowDivisionDeptCn && !this.orgaApprove && !readonly && !this.policyDeviationShow" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" other-rules="required|max:100" v-model="form.divisionDeptCn" name="divisionDeptCn" :readonly="readonlyByOrga" placeholder="部门（必填）"></form-group>
										<!-- 审批时，Orga Partner审批显示 -->
										<form-group v-if="this.orgaApprove" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.jobTitleCnRequired+'max:75'" v-model="form.jobTitleCn" name="jobTitleCn" :readonly="readonlyByOrga" :placeholder="'头衔'+this.jobTitleMustFillCn"></form-group>
										<form-group v-if="this.orgaApprove" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.functionTypeCnRequired+'max:100'" v-model="form.functionTypeCn" name="functionTypeCn" :readonly="readonlyByOrga" :placeholder="'岗位名称'+functionTypeMustFillCn"></form-group>
										<form-group v-if="this.orgaApprove" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.subDepartmentCnRequired+'max:100'" v-model="form.subDepartmentCn" name="subDepartmentCn" :readonly="readonlyByOrga" :placeholder="'子部门'+subDepartmentMustFillCn"></form-group>
										<form-group v-if="this.orgaApprove" class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.divisionDeptCnRequired+'max:100'" v-model="form.divisionDeptCn" name="divisionDeptCn" :readonly="readonlyByOrga" :placeholder="'部门'+divisionDeptMustFillCn"></form-group>
										<!-- 申请时，Policy Deviation显示 -->
										<div v-show="this.policyDeviationShow">
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.jobTitleCnRequired+'max:75'" v-model="form.jobTitleCn" name="jobTitleCn" :readonly="readonly" :placeholder="'头衔'+this.jobTitleMustFillCn"></form-group>
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.functionTypeCnRequired+'max:100'" v-model="form.functionTypeCn" name="functionTypeCn" :readonly="readonly" :placeholder="'岗位名称'+this.functionTypeMustFillCn"></form-group>
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.subDepartmentCnRequired+'max:100'" v-model="form.subDepartmentCn" name="subDepartmentCn" :readonly="readonly" :placeholder="'子部门'+this.subDepartmentMustFillCn"></form-group>
											<form-group class="md-12-no-left" type="input5" haslable="false" updatestyle="margin-right" :other-rules="this.divisionDeptCnRequired+'max:100'" v-model="form.divisionDeptCn" name="divisionDeptCn" :readonly="readonly" :placeholder="'部门'+this.divisionDeptMustFillCn"></form-group>
										</div>
										</td> 
									<td width="4%" rowspan="9"></td> 
									<td rowspan="3" style="vertical-align: top;padding-bottom: 10px;" algin="left" valgin="top" id="plantCnAddress">
										大众汽车自动变速器（天津）有限公司
									</td> 
								</tr> 
								<tr> 
									<td width="1%">&nbsp;</td> 
								</tr> 
								<tr> 
									<td>&nbsp;</td> 
								</tr> 
								<tr> 
									<td width="60%" colspan="2"> 
										<span class="spanTd" >邮编 300462</span>
									</td>
								</tr>
								<tr> 
									<td colspan="2"> 
										<span class="spanTd">电话 (86-22) {{form.telephone}}</span>
									</td>
								</tr> 
								<tr> 
									<td rowspan="4">
										<!--二维码  margin-top:15px;-->
										<img alt="" src="../../../assets/img/BCQRCode.png" style="width:40%;">	
									</td> 
									<td colspan="2">
										<span class="spanTd">传真 (86-22) {{form.telefax}}</span>
									</td>
								</tr> 
								<tr> 
									<td colspan="2">
										<span class="spanTd">手机 (86) {{form.mobile}}</span>
									</td>
								</tr> 
								<tr> 
									<td style="height:28.15px;word-wrap:break-word; word-break:break-all;" colspan="2">邮箱 {{form.email}}</td>
								</tr>
								<tr> 
									<td colspan="2">&nbsp;</td> 
								</tr>
							</tbody>
						</table>
                    </div>

					<div class="" style="margin-top: 20px;">
						<div style="overflow: auto;" :class="{'form-group':true,'is-danger': errors.has('applicationType') }">
							<div class="mar-top-0">
								<label for=""><i class="fa fa-asterisk text-red" ></i> Application Type : </label>
								<label class="mar-left-20" >
									<input type="radio" name="applicationType" :class="{'is-danger': errors.has('applicationType') }" v-model="form.applicationType" v-validate="'required'" value="New Application" :disabled="readonly" >
										New Application 
								</label>
								<label class="mar-left-20">
									<input type="radio" name="applicationType" :class="{'is-danger': errors.has('applicationType') }" v-model="form.applicationType" v-validate="'required'" value="Reprint" :disabled="readonly">
										Reprint
								</label>
							</div>
						</div> 
					    <div style="overflow: auto;" :class="{'form-group':true,'is-danger': errors.has('quantity') }">
							<div class="mar-top-0">
								<label for=""><i class="fa fa-asterisk text-red" ></i> Quantity : </label>
								<label class="mar-left-20"  style="margin-left:64px;">
									<input type="radio" name="quantity" :class="{'is-danger': errors.has('quantity') }" v-model="form.quantity"  value="1 Box" :disabled="readonly" >
									1 Box
								</label>
								<label  :class="`dis-${form.roleType ? 'b' : 'n' }`">
									<input type="radio" name="quantity" :class="{'is-danger': errors.has('quantity') }" v-model="form.quantity"  value="2 Boxes" :disabled="readonly" > 
									2 Boxes
								</label>
							</div>
						</div>

						<div style="overflow: auto;">
							<div class="mar-top-0">
								<label style="font-weight:normal">
									<input value="Yes" type="checkbox" name="urgent" v-model="form.urgent" :disabled="readonly">
									Urgent (Normally printing time takes 7 working days after final approval)
								</label>
							</div>
						</div>

					</div>
					<div style="margin-top: 20px;">
						<div class="mar-top-0" style="overflow: auto;">
							<div style=" float:left;width:55px;height:70px;"> 
								<span style="line-height:70px;">Reason</span>
							</div>
							<div style=" float:left;width:585px;margin-left: -24px;"> 
								<form-group type="textarea2" ifEnglish="true" col="md-12" limit="300" haslable="false" v-model="form.reason" name="reason" :readonly="readonlyByOrga"  placeholder=" "></form-group>
							</div>
						</div>
					</div>
              	</div>
            </form>

			<div class="checkbox mar-bot-20" v-if="!readonly&&(!processTaskKey||processTaskKey=='editForm')">
				<label style="margin-top: 10px;">
					<span class="help is-danger" v-show="errors.has('terms')">
						{{$t("checkPolicyNotice")}}
					</span>
				<input  name="terms" type="checkbox" v-validate="'required'" >
				When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
				</label>
			</div>

      		<!--
			<input type="button"  name="testApprovel" value="测试审批人approvel" @click="beforeapprovel" v-if="this.form.status==1">
			-->
			<comment v-if="processTaskId !=null&&form.status != 9&&processTaskKey!='editForm' && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
			<Confirmwithreject v-if="this.$route.query.taskKey=='hrOrga'&& ckeckInApproveFlow" entityId="BusinessCard" :form="form" :validator="this.$validator" 
				lableName="Approve" rejectLableName="Reject" uri="/BusinessCard/save" v-on:beforeapprovel="beforeapprovel"  ></Confirmwithreject>
			<router-view  v-else   :form="form" entityId="BusinessCard" vclass="btn-left" uri="/form/BusinessCard/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel"  v-on:beforeRealApprovel="beforeapprovel"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>
		</section>
	</div>
 
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
													<div class="col-sm-6"></div>
													<div class="col-sm-6"></div>
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
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float:right;">
																		<span class="fa fa-search"></span>
																		&nbsp;&nbsp;Search
																	</button>
																</div>
															</div>
														</form>
														<table id="person_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Staff Code</th>
																	<th>EN Name</th>
																	<th>CN Name</th>
																	<th>Email</th>
																	<th>AD Account</th>
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
	</div>

</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'BusinessCard',
		methods: {
			beforesubmit: function() {
				if(this.form.status == null || this.form.status == 2 || this.form.status ==9){
					var result;
					var me = this;
					this.GL.actUtil.query("get","/BusinessCard/existNullValue/"+this.form.applicantUserId,"",function(data){
						result = JSON.parse(data).result;
						if(result){
							$.alertApon("Can't find disciplinary supervisor! Please contact the Administrator to mantain the data. 找不到直属上级！请联系管理员维护数据。");
							me.form.submitstatus=false;
							return;
						}else{
							me.form.submitstatus=true;
						}
					});
					if(this.form.reason!="" && this.form.reason != null ){
						var limitSize=300;
						var newvalue = this.form.reason.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						if(length>limitSize){
							$.alertApon(limitSize+" characters max for reason, "+length+" characters have been filled in currently.");
							this.form.submitstatus=false;
							return;
						}else{
							this.form.submitstatus=true;
						}
					}
				}
			},
			beforeapprovel: function() {
				if(this.form.status ==9){
					var result;
					var me = this;
					this.GL.actUtil.query("get","/BusinessCard/existNullValue/"+this.form.applicantUserId,"",function(data){
						result = JSON.parse(data).result;
						if(result){
							$.alertApon("Can't find disciplinary supervisor! Please contact the Administrator to mantain the data. 找不到直属上级！请联系管理员维护数据。");
							me.form.approvelstatus=false;
							return;
						}else{
							me.form.approvelstatus=true;
						}
					});
				}
				//Orga Partner
				if(this.form.status ==1 && this.$route.query.taskKey =="hrOrga"){
					if(this.form.reason!="" && this.form.reason != null ){
						var limitSize=300;
						var newvalue = this.form.reason.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						if(length>limitSize){
							$.alertApon(limitSize+" characters max for description of reason, "+length+" characters have been filled in currently.");
							this.form.approvelstatus=false;
							return;
						}else{
							this.form.approvelstatus=true;
						}
					}
				}
				//this.form.approvelstatus=false;
			},
			onbehalfclick: function() {
				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId = this.tempapplicantUserId;
					this.form.creatorStaffcode = this.tempcreatorStaffcode;
					this.form.applicantStaffcode = this.tempapplicantStaffcode;
					this.form.creatorName = this.tempcreatorName;
					this.form.telephone = this.temptelephone;
					this.form.mobile = this.tempmobile;
					this.form.nameCn = this.tempnameCn;
					this.form.titleGender = this.temptitleGender;
					this.form.email=this.tempemail;
					this.form.roleType=this.temproleType;
					this.form.withRole=this.tempwithRole;
					this.form.bcTypeRole=this.tempbcTypeRole
					this.form.jobTitle=this.tempjobTitle;
					this.form.functionType=this.tempfunctionType;
					this.form.subDepartment=this.tempsubDepartment;
					this.form.divisionDept=this.tempdivisionDept;
					this.form.jobTitleCn=this.tempjobTitleCn;
					this.form.functionTypeCn=this.tempfunctionTypeCn;
					this.form.subDepartmentCn=this.tempsubDepartmentCn;
					this.form.divisionDeptCn=this.tempdivisionDeptCn; 
					//this.form.ifShowSub=this.tempifShowSub;                   
				}else{
					$('#personModal').modal({
						backdrop: false, //点击空白处不关闭对话框
						keyboard: false, //键盘关闭对话框
						toggle: true //弹出对话框
					});
				}
			},
			changeNameClick: function() {
				//console.log("this.changeName="+this.changeName+",this.changeName[0]="+this.changeName[0]+",1="+this.changeName[1]);
				var result = $("#changeName").is(':checked');
				this.form.changeName = this.changeName[0];
				//this.changeName = result;
				//得连带着onbehalf功能
				if(!this.onbehalf){
					if(!result) {
						//this.form.creatorName = this.tempcreatorName;
						var changedName=this.form.firstName+", "+this.form.lastName+" ";
						console.log("1  changedName="+changedName);
						this.form.creatorName=changedName;
				    }else{
						var changedName=this.form.lastName+", "+this.form.firstName+" ";
						console.log("1  changedName="+changedName);
						this.form.creatorName=changedName;
				    }
				}else{
					//onbehalf
					if(!result) {
						var changedName=this.form.firstName+", "+this.form.lastName+" ";
						console.log("2  changedName="+changedName);
						this.form.creatorName=changedName;
					    //var names=this.form.creatorName.split(",");
					    //var changedName=names[1]+","+names[0];
					    //this.form.creatorName=changedName;
				    }else{
						var changedName=this.form.lastName+", "+this.form.firstName+" ";
						console.log("2  changedName="+changedName);
						this.form.creatorName=changedName;
					    //var names=this.form.creatorName.split(",");
					    //var changedName=names[1]+","+names[0];
					    //this.form.creatorName=changedName;
				    }
				}
			},
			doAfterSelectOtherPerson: function(data) {
				console.log(data);
				this.form.applicantUserId = data.id;
				this.form.applicantStaffcode = data.staffCode;
				this.form.creatorName = data.printENName.toUpperCase();
				var telephone = data.telephone;
				if(telephone != null && telephone != ""){
					telephone = telephone.replace("+86 22 ","");
					telephone = telephone.replace("+86 022 ","");
					telephone = telephone.replace("022-","");
					telephone = telephone.replace("022","");
				}
				this.form.telephone = telephone;
				var mobile = data.mobile;
				if(mobile != null && mobile !=""){
					mobile = mobile.replace("+86 ","");
				}
				this.form.mobile = mobile;
				this.form.nameCn = data.printCNName;
				this.form.email=data.email.toUpperCase();
				if(data.titleGender=="Mr"){
					this.form.titleGender="Mr.";
				}else if(data.titleGender=="Mrs" || data.titleGender=="Miss" || data.titleGender=="Ms"){
					this.form.titleGender="Ms.";
				}else{
					this.form.titleGender="Dr.";
				}
				this.form.firstName="";
				this.form.lastName="";
				var _this = this;
				//根据id获取behalf对象是否是AM及以上
				$.ajax({
					url: Config.getBaseURL() +"/BusinessCard/checkRoleById/", //这个就是请求地址对应sAjaxSource
					data: {
						"id": data.id
					}, 
					type: 'get',
					dataType: 'json',
					success: function(data) {
						console.log(data);
						console.log(data.roleType)
					    _this.form.roleType=data.roleType;
					    _this.form.jobTitle=data.jobTitle;
					    _this.form.functionType=data.functionType;
					    _this.form.subDepartment=data.subDepartment;
					    _this.form.divisionDept=data.divisionDept;
					    _this.form.jobTitleCn=data.jobTitleCn;
					    //_this.form.functionTypeCn=data.functionTypeCn;
					    _this.form.subDepartmentCn=data.subDepartmentCn;
						_this.form.divisionDeptCn=data.divisionDeptCn;
						//if(data.ifShowSub==true){
						//   	_this.form.ifShowSub="true";
						//}else{
						//	_this.form.ifShowSub="false";
						//}
						//_this.form.ifShowSub=data.ifShowSub;
						//后来还是得查表判断
						_this.form.withRole=data.withRole;
						if(_this.form.withRole){
							_this.form.bcTypeRole="Yes";
						}else{
							_this.form.bcTypeRole="No";
						}
						_this.form.firstName=data.firstName;
						_this.form.lastName=data.lastName;
					},
					error: function(msg) {
						
					}
				});
                
			},
			closemodal: function() {
		        $("#Staffcode").val("");
		        $("#ENName").val("");
		        $("#CNName").val("");
		        $("#Email").val("");
		        $("#person_table").DataTable().draw();
			},
			draw: function() {
				$("#person_table").DataTable().draw();
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
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/BusinessCard/get/" + id;
			} else {
				var url = "/form/BusinessCard/create/";
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
			
			if(dm.form.applicantUserId!=dm.form.createUserId){
			  	dm.onbehalf = true;
			}else{
			    dm.onbehalf = false;
			}
			
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreateUserId = dm.form.createUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempapplicantStaffcode = dm.form.applicantStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempnameCn = dm.form.nameCn;
			dm.tempmobile = dm.form.mobile;
			dm.temptelephone = dm.form.telephone;
			dm.temptitleGender = dm.form.titleGender;
			dm.tempemail=dm.form.email;
			//dm.changeName = false;
			dm.temproleType=dm.form.roleType;
			dm.tempwithRole=dm.form.withRole;
			dm.tempbcTypeRole=dm.form.bcTypeRole;
			dm.tempjobTitle=dm.form.jobTitle;
			dm.tempfunctionType=dm.form.functionType;
			dm.tempsubDepartment=dm.form.subDepartment;
			dm.tempdivisionDept=dm.form.divisionDept;
			dm.tempjobTitleCn=dm.form.jobTitleCn;
			dm.tempfunctionTypeCn=dm.form.functionTypeCn;
			dm.tempsubDepartmentCn=dm.form.subDepartmentCn;
			dm.tempdivisionDeptCn=dm.form.divisionDeptCn;
			//dm.tempifShowSub=dm.form.ifShowSub;
			//dm.form.submitstatus = true;
			//dm.form.approvelstatus = true;	
			//初始化时默认form.withHeadOfTemplateRadio
			if(dm.form.withHeadOfTemplateRadio==null || dm.form.withHeadOfTemplateRadio==""){
				dm.form.withHeadOfTemplateRadio=false;
			}			
			//初始化时默认form.quantity
			if(dm.form.quantity==null || dm.form.quantity==""){
				dm.form.quantity="1 Box";
			}			

			if(dm.form.plant=="DL"){
				 $("#plantAddress").html("VOLKSWAGEN AUTOMATIC TRANSMISSION<br/> (TIANJIN) CO.,&nbsp;LTD.<br/>NO. 8, TAIMIN ROAD<br/> TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT<br/> AREA, TEDA WEST TIANJIN 300462, P.R. CHINA");
                 $("#plantCnAddress").html("大众汽车自动变速器（天津）有限公司<br/><br/>中国天津市经济技术开发区西区泰民路8号");
			     dm.form.plantAddress="NO. 8, TAIMIN ROAD TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT AREA, TEDA WEST TIANJIN 300462, P.R. CHINA";
			     dm.form.plantAddressCn="中国天津市经济技术开发区西区泰民路8号";
		    }else if(dm.form.plant=="DQ"){
			  	 $("#plantAddress").html("VOLKSWAGEN AUTOMATIC TRANSMISSION<br/> (TIANJIN) CO.,&nbsp;LTD.<br/>NO. 49, ZHONG NAN WU STREET<br/> TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT<br/> AREA, TEDA WEST TIANJIN 300462, P.R. CHINA");
			     $("#plantCnAddress").html("大众汽车自动变速器（天津）有限公司<br/><br/>中国天津市经济技术开发区西区中南五街49号");
			     dm.form.plantAddress="NO. 49, ZHONG NAN WU STREET TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT AREA, TEDA WEST TIANJIN 300462, P.R. CHINA";
			     dm.form.plantAddressCn="中国天津市经济技术开发区西区中南五街49号";
			}
			
			if(dm.form.jobTitle != null && dm.form.jobTitle !=""){
				dm.form.ifShowJobTitleCn=true;
			}else{
				dm.form.ifShowJobTitleCn=false;
			}
			if(dm.form.functionType != null && dm.form.functionType !=""){
				dm.form.ifShowFunctionTypeCn=true;
			}else{
				dm.form.ifShowFunctionTypeCn=false;
			}
			if(dm.form.subDepartment != null && dm.form.subDepartment !=""){
				dm.form.ifShowSubDepartmentCn=true;
			}else{
				dm.form.ifShowSubDepartmentCn=false;
			}
			if(dm.form.divisionDept != null && dm.form.divisionDept !=""){
				dm.form.ifShowDivisionDeptCn=true;
			}else{
				dm.form.ifShowDivisionDeptCn=false;
			}
			dm.jobTitleRequired="";
			dm.jobTitleCnRequired="";
			dm.functionTypeRequired="";
			dm.functionTypeCnRequired="";
			dm.subDepartmentRequired="";
			dm.subDepartmentCnRequired="";
			dm.divisionDeptRequired="";
			dm.divisionDeptCnRequired="";

			dm.jobTitleMustFillCn="";
			dm.jobTitleMustFillEn="";
			dm.functionTypeMustFillCn="";
			dm.functionTypeMustFillEn="";
			dm.subDepartmentMustFillCn="";
			dm.subDepartmentMustFillEn="";
			dm.divisionDeptMustFillCn="";
			dm.divisionDeptMustFillEn="";

			dm.jobTitleRequired2="";
			dm.jobTitleCnRequired2="";
			dm.functionTypeRequired2="";
			dm.functionTypeCnRequired2="";
			dm.subDepartmentRequired2="";
			dm.subDepartmentCnRequired2="";
			dm.divisionDeptRequired2="";
			dm.divisionDeptCnRequired2="required|";

			if(!dm.form.changeName) {
				dm.changeName = [];
			} else{
				dm.changeName = [dm.form.changeName];
			}

			//dm.form.ifShowJobTitleCn=true;
			//dm.form.ifShowFunctionTypeCn=true;
			//dm.form.ifShowSubDepartmentCn=true;
			//dm.form.ifShowDivisionDeptCn=true;
			return dm;
		},
		watch: {
			"form.plant":{
		        handler(curVal,oldVal){
		          if(curVal=="DL"){
				        $("#plantAddress").html("VOLKSWAGEN AUTOMATIC TRANSMISSION <br/>(TIANJIN) CO.,&nbsp;LTD.<br/>NO. 8, TAIMIN ROAD<br/> TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT <br/>AREA, TEDA WEST TIANJIN 300462, P.R. CHINA");
                        $("#plantCnAddress").html("大众汽车自动变速器（天津）有限公司<br/><br/>中国天津市经济技术开发区西区泰民路8号");
			            this.form.plantAddress="NO. 8, TAIMIN ROAD TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT AREA, TEDA WEST TIANJIN 300462, P.R. CHINA";
			            this.form.plantAddressCn="中国天津市经济技术开发区西区泰民路8号";
		          }else if(curVal=="DQ"){
			  	       $("#plantAddress").html("VOLKSWAGEN AUTOMATIC TRANSMISSION <br/>(TIANJIN) CO.,&nbsp;LTD.<br/>NO. 49, ZHONG NAN WU STREET<br/> TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT<br/> AREA, TEDA WEST TIANJIN 300462, P.R. CHINA");
			           $("#plantCnAddress").html("大众汽车自动变速器（天津）有限公司<br/><br/>中国天津市经济技术开发区西区中南五街49号");
			           this.form.plantAddress="NO. 49, ZHONG NAN WU STREET TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT AREA, TEDA WEST TIANJIN 300462, P.R. CHINA";
			           this.form.plantAddressCn="中国天津市经济技术开发区西区中南五街49号";
		          }
		        },
		        deep:false
		     },
		    "form.telephone":{
		        handler(curVal,oldVal){
					var telephone = this.form.telephone;
					if(telephone != null && telephone != ""){
						telephone = telephone.replace("+86 22 ","");
						telephone = telephone.replace("+86 022 ","");
						telephone = telephone.replace("022-","");
						telephone = telephone.replace("022","");
					}
					this.form.telephone = telephone;
		        },
		        deep:false
		     },
		     "form.teleFax":{
		        handler(curVal,oldVal){
		         
		        },
		        deep:false
		     },
		    "form.mobile":{
		        handler(curVal,oldVal){
		        	var mobile = this.form.mobile;
					if(mobile != null && mobile !=""){
						mobile = mobile.replace("+86 ","");
					}
					this.form.mobile = mobile;
		        },
		        deep:false
			},
			"form.titleGender":{
		        handler(curVal,oldVal){
		        	if(this.form.titleGender=="Ms."){
						this.form.titleGenderCN="女士";
					}
					if(this.form.titleGender=="Mr."){
						this.form.titleGenderCN="先生";
					}
					if(this.form.titleGender=="Dr."){
						this.form.titleGenderCN="博士";
					}
		        },
		        deep:false
			},
			"form.jobTitle":{
		        handler(curVal,oldVal){
					if(this.form.jobTitle != null && this.form.jobTitle !=""){
						this.form.ifShowJobTitleCn=true;
						this.jobTitleCnRequired="required|";
						this.jobTitleMustFillCn="（必填）"
					}else{
						this.form.ifShowJobTitleCn=false;
						this.jobTitleCnRequired="";
						this.jobTitleMustFillCn=""
					}
					if(this.form.jobTitleCn != null && this.form.jobTitleCn !=""){
						this.jobTitleRequired="required|";
						this.jobTitleMustFillEn=" (Mandatory)";
					}else{
						this.jobTitleRequired="";
						this.jobTitleMustFillEn="";
					}
		        },
		        deep:false
			},
			"form.jobTitleCn":{
		        handler(curVal,oldVal){
					if(this.form.jobTitleCn != null && this.form.jobTitleCn !=""){
						this.jobTitleRequired="required|";
						this.jobTitleMustFillEn=" (Mandatory)";
					}else{
						this.jobTitleRequired="";
						this.jobTitleMustFillEn="";
					}
					if(this.form.jobTitle != null && this.form.jobTitle !=""){
						this.jobTitleCnRequired="required|";
						this.jobTitleMustFillCn="（必填）"
					}else{
						this.jobTitleCnRequired="";
						this.jobTitleMustFillCn=""
					}
		        },
		        deep:false
			},
			"form.functionType":{
		        handler(curVal,oldVal){
					if(this.form.functionType != null && this.form.functionType !=""){
						this.form.ifShowFunctionTypeCn=true;
						this.functionTypeCnRequired="required|";
						this.functionTypeMustFillCn="（必填）"
					}else{
						this.form.ifShowFunctionTypeCn=false;
						this.functionTypeCnRequired="";
						this.functionTypeMustFillCn=""
					}
					if(this.form.functionTypeCn != null && this.form.functionTypeCn !=""){
						this.functionTypeRequired="required|";
						this.functionTypeMustFillEn=" (Mandatory)";
					}else{
						this.functionTypeRequired="";
						this.functionTypeMustFillEn="";
					}
		        },
		        deep:false
			},
			"form.functionTypeCn":{
		        handler(curVal,oldVal){
					if(this.form.functionTypeCn != null && this.form.functionTypeCn !=""){
						this.functionTypeRequired="required|";
						this.functionTypeMustFillEn=" (Mandatory)";
					}else{
						this.functionTypeRequired="";
						this.functionTypeMustFillEn="";
					}
					if(this.form.functionType != null && this.form.functionType !=""){
						this.functionTypeCnRequired="required|";
						this.functionTypeMustFillCn="（必填）"
					}else{
						this.functionTypeCnRequired="";
						this.functionTypeMustFillCn=""
					}
		        },
		        deep:false
			},
			"form.subDepartment":{
		        handler(curVal,oldVal){
					if(this.form.subDepartment != null && this.form.subDepartment !=""){
						this.form.ifShowSubDepartmentCn=true;
						this.subDepartmentCnRequired="required|";
						this.subDepartmentMustFillCn="（必填）"
					}else{
						this.form.ifShowSubDepartmentCn=false;
						this.subDepartmentCnRequired="";
						this.subDepartmentMustFillCn=""
					}
					if(this.form.subDepartmentCn != null && this.form.subDepartmentCn !=""){
						this.subDepartmentRequired="required|";
						this.subDepartmentMustFillEn=" (Mandatory)";
					}else{
						this.subDepartmentRequired="";
						this.subDepartmentMustFillEn="";
					}
		        },
		        deep:false
			},
			"form.subDepartmentCn":{
		        handler(curVal,oldVal){
					if(this.form.subDepartmentCn != null && this.form.subDepartmentCn !=""){
						this.subDepartmentRequired="required|";
						this.subDepartmentMustFillEn=" (Mandatory)";
					}else{
						this.subDepartmentRequired="";
						this.subDepartmentMustFillEn="";
					}
					if(this.form.subDepartment != null && this.form.subDepartment !=""){
						this.subDepartmentCnRequired="required|";
						this.subDepartmentMustFillCn="（必填）"
					}else{
						this.subDepartmentCnRequired="";
						this.subDepartmentMustFillCn=""
					}
		        },
		        deep:false
			},
			"form.divisionDept":{
		        handler(curVal,oldVal){
					if(this.form.divisionDept != null && this.form.divisionDept !=""){
						this.form.ifShowDivisionDeptCn=true;
						this.divisionDeptCnRequired="required|";
						this.divisionDeptMustFillCn="（必填）"
					}else{
						this.form.ifShowDivisionDeptCn=false;
						this.divisionDeptCnRequired="";
						this.divisionDeptMustFillCn=""
					}
					if(this.form.divisionDeptCn != null && this.form.divisionDeptCn !=""){
						this.divisionDeptRequired="required|";
						this.divisionDeptMustFillEn=" (Mandatory)";
					}else{
						this.divisionDeptRequired="";
						this.divisionDeptMustFillEn="";
					}
		        },
		        deep:false
			},
			"form.divisionDeptCn":{
		        handler(curVal,oldVal){
					if(this.form.divisionDeptCn != null && this.form.divisionDeptCn !=""){
						this.divisionDeptRequired="required|";
						this.divisionDeptMustFillEn=" (Mandatory)";
					}else{
						this.divisionDeptRequired="";
						this.divisionDeptMustFillEn="";
					}
					if(this.form.divisionDept != null && this.form.divisionDept !=""){
						this.divisionDeptCnRequired="required|";
						this.divisionDeptMustFillCn="（必填）"
					}else{
						this.divisionDeptCnRequired="";
						this.divisionDeptMustFillCn=""
					}
		        },
		        deep:false
			},
			"form.policyDeviation":{
		        handler(curVal,oldVal){
					console.log("this.form.policyDeviation="+this.form.policyDeviation);
					if(this.form.policyDeviation || this.form.policyDeviation=="true"){
						if(this.form.jobTitleCn != null && this.form.jobTitleCn !=""){
							this.jobTitleRequired="required|";
							this.jobTitleMustFillEn=" (Mandatory)";
						}
						if(this.form.jobTitle != null && this.form.jobTitle !=""){
							this.jobTitleCnRequired="required|";
							this.jobTitleMustFillCn="（必填）"
						}
						if(this.form.functionTypeCn != null && this.form.functionTypeCn !=""){
							this.functionTypeRequired="required|";
							this.functionTypeMustFillEn=" (Mandatory)";
						}
						if(this.form.functionType != null && this.form.functionType !=""){
							this.functionTypeCnRequired="required|";
							this.functionTypeMustFillCn="（必填）"
						}
						if(this.form.subDepartmentCn != null && this.form.subDepartmentCn !=""){
							this.subDepartmentRequired="required|";
							this.subDepartmentMustFillEn=" (Mandatory)";
						}
						if(this.form.subDepartment != null && this.form.subDepartment !=""){
							this.subDepartmentCnRequired="required|";
							this.subDepartmentMustFillCn="（必填）"
						}
						if(this.form.divisionDeptCn != null && this.form.divisionDeptCn !=""){
							this.divisionDeptRequired="required|";
							this.divisionDeptMustFillEn=" (Mandatory)";
						}
						if(this.form.divisionDept != null && this.form.divisionDept !=""){
							this.divisionDeptCnRequired="required|";
							this.divisionDeptMustFillCn="（必填）"
						}
					}
				}
			},
			
			
			


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
					return (this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			readonlyByOrga:{
       			// 动态计算readonly的值
				get: function() {
					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('hrOrga') != -1   && this.form.status != 0 &&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
						return false;
					}else{
						return (this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
					}
				}
			},
			readOnlyByRole: {
				// 动态计算readonly的值
				get: function() {
					if((this.form.status == null || this.form.status == 2 || this.form.status == 9) 
						&& (this.$route.query.taskKey == null || this.$route.query.taskKey =="editForm")
						&& this.form.withRole){
						return false;
					}else{
						return true;
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
			ckeckInApproveFlow:{
				get: function() {
					return ((this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) &&
          				!(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")));
				}
			},
			token:{
				get: function(){
					return Config.getToken();
				}
			},
			orgaApprove:{
       			// 动态计算readonly的值
				get: function() {
					if(this.$route.query.taskKey != null && this.$route.query.taskKey =="hrOrga"
						&& this.form.status == 1 
						&& (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) ){
						return true;
					}
					//else if((this.form.status == null || this.form.status == 2 || this.form.status == 9)
					//	&& (this.form.policyDeviation || this.form.policyDeviation=='true') ){
					//	return true;
					//}
					else{
						return false;
					}
				}
			},
			policyDeviationShow:{
       			// 动态计算readonly的值
				get: function() {
					if((this.form.status == null || this.form.status == 2 || this.form.status == 9)
						&& (this.form.policyDeviation || this.form.policyDeviation=='true') ){
						return true;
					}else{
						return false;
					}
				}
			},


		},
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

			if(this.form.plant=="DL"){
				$("#plantAddress").html("VOLKSWAGEN AUTOMATIC TRANSMISSION <br/>(TIANJIN) CO.,&nbsp;LTD.<br/>NO. 8, TAIMIN ROAD<br/> TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT <br/>AREA, TEDA WEST TIANJIN 300462, P.R. CHINA");
				$("#plantCnAddress").html("大众汽车自动变速器（天津）有限公司<br/><br/>中国天津市经济技术开发区西区泰民路8号");
				this.form.plantAddress="NO. 8, TAIMIN ROAD TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT AREA, TEDA WEST TIANJIN 300462, P.R. CHINA";
				this.form.plantAddressCn="中国天津市经济技术开发区西区泰民路8号";
			}else if(this.form.plant=="DQ"){
				$("#plantAddress").html("VOLKSWAGEN AUTOMATIC TRANSMISSION <br/>(TIANJIN) CO.,&nbsp;LTD.<br/>NO. 49, ZHONG NAN WU STREET<br/> TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT<br/> AREA, TEDA WEST TIANJIN 300462, P.R. CHINA");
				$("#plantCnAddress").html("大众汽车自动变速器（天津）有限公司<br/><br/>中国天津市经济技术开发区西区中南五街49号");
				this.form.plantAddress="NO. 49, ZHONG NAN WU STREET TIANJIN ECONOMIC TECHNOLOGICAL DEVELOPMENT AREA, TEDA WEST TIANJIN 300462, P.R. CHINA";
				this.form.plantAddressCn="中国天津市经济技术开发区西区中南五街49号";
			}

			var _this = this;
			
			var queryData = this.retrieveData;
			var doAfterSelectOtherPerson = this.doAfterSelectOtherPerson;
			var draw = this.draw;
			var table = $("#person_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/chooseuserinfo/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [5]
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
					{
						data: "screenName"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					$('td:eq(5)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

					return row;
				}
			});
			var router = this.$router;

			$('#person_table tbody').on('click', '.task-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				doAfterSelectOtherPerson(data);
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

<style scoped>
	div.is-danger {
		border: solid red 1px;
	}
	.dis-b{
		margin-left: 78px;
	}
	.dis-n{
		display:none;
	}
	.md-12-no-left{
		width:100%;
		position: relative;
		min-height: 1px;
		padding-right: 15px;
	}
	.spanShow-b{
		display:block;
		margin-bottom:5px;
	}
	.spanShow-n{
     	display:none;
	}
	.inputShow-b{
		width:100%;
		position: relative;
		min-height: 1px;
		padding-right: 15px;
	}
	.inputShow-n{
      	display:none;
	}
	.form-group label{
		font-weight: normal;
	}
	input[type='radio']{
		top: 2px;
		margin-right: 3px !important;
    	position: relative !important;
	}
	input[type='checkbox']{
	  	top: 2px;
		margin-right: 3px !important;
    	position: relative !important;
	}
	.spanTd{
		display:block;
		margin: 5px 1px 5px 0;
		font-size: 12px;
	}
	.spanTd2{
		display:block;
		margin-bottom:5px;
		font-size: 12px;
	}
	/*
	table,table tr th, table tr td { border:1px solid #0094ff; }*/
</style>
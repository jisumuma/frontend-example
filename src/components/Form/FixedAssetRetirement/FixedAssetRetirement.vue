<template>
	<div>
		<section class="content-header">
			<h1 style="font-size:22px;">Fixed Asset Retirement Application</h1>
			<ol class="breadcrumb" v-if="form.bomType=='C'">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Supervisor</a>
				</li>
				<li>
					<a>3.BU Head</a>
				</li>
				<li>
					<a>4.Asset Accountant</a>
				</li>
				<li>
					<a>5.Head of CF</a>
				</li>
				<li>
					<a>6.BoMC</a>
				</li>
				<li>
					<a>7.BoMT</a>
				</li>
				<li>
					<a>8.Asset Accountant</a>
				</li>
			</ol>
			<ol class="breadcrumb" v-else>
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Supervisor</a>
				</li>
				<li>
					<a>3.BU Head</a>
				</li>
				<li>
					<a>4.Asset Accountant</a>
				</li>
				<li>
					<a>5.Head of CF</a>
				</li>
				<li>
					<a>6.BoMT</a>
				</li>
				<li>
					<a>7.BoMC</a>
				</li>
				<li>
					<a>8.Asset Accountant</a>
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
							<form-group col="md-3" type="input" v-model="form.staffCode" name="staffCode" readonly="readonly" label="FixedAssetRetirement.staffCode"></form-group>
							<!--不选中的时候显示-->
							<form-group v-if="!onbehalf" col="md-3" type="input" v-model="form.applicantName" name="applicantName" readonly="readonly" label="FixedAssetRetirement.applicantName"></form-group>
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										 {{$t("FixedAssetRetirement.applicantName")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" id="applicantName" name="applicantName" v-model="form.applicantName" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    	</span>
									</div>
								</div>
							</div>
							<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" readonly="readonly" label="FixedAssetRetirement.telephone"></form-group>
							<form-group col="md-3" type="input" v-model="form.department" name="department" readonly="readonly" label="FixedAssetRetirement.department"></form-group>
						</div>
						<div class="row panel-collapse collapse " id="collapseZero">
							<form-group col="md-3" type="input" v-model="form.supervisor" name="supervisor" readonly="readonly" label="FixedAssetRetirement.supervisor"></form-group>
							<form-group col="md-3" type="input" v-model="form.buHeader" name="buHeader" readonly="readonly" label="FixedAssetRetirement.buHeader"></form-group>
							<form-group col="md-3" type="input" v-model="form.costCenter" name="costCenter" readonly="readonly" label="FixedAssetRetirement.costCenter"></form-group>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<!-- <i class="fa fa-asterisk text-required-header"></i> -->
					<h3 class="box-title">Asset Info. 资产信息</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<form-group col="md-4" type="input" :readonly="readonly" v-model="form.assetName" other-rules="required|max:300" name="assetName" label="FixedAssetRetirement.assetName"></form-group>
							<div class="col-md-4">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-required-header"></i>Retirement Manner 报废形式</label>
									<div class="radio mar-top-0" :class="{'is-danger': errors.has('retirementManner') }">
										<label class="mar-left-40">
                                  <input type="radio" name="retirementManner" v-validate="'required'" value="Entire Retirement" :disabled="readonly" v-model="form.retirementManner" >
                                  Entire Retirement 整体报废
                                </label>
										<label class="mar-left-20">
                                  <input type="radio" name="retirementManner" v-validate="'required'"  value="Partial Retirement" :disabled="readonly" v-model="form.retirementManner">
                                  Partial Retirement 部分报废
                                </label>
									</div>
								</div>
							</div>
							<form-group col="md-4" type="input" v-if="validateRetirementManner" :readonly="readonly" v-model="form.partialDisposal" other-rules="max:300" name="partialDisposal" label="FixedAssetRetirement.partialDisposal"></form-group>
							<form-group col="md-4" type="input" v-else readonly="readonly" v-model="form.partialDisposal" other-rules="max:300" name="partialDisposal" label="FixedAssetRetirement.partialDisposal"></form-group>
						</div>
						<div class="row">
							<form-group col="md-4" type="input" :readonly="readonly" v-model="form.assetNumber" other-rules="required|max:300" name="assetNumber" label="FixedAssetRetirement.assetNumber"></form-group>
							<form-group col="md-4" type="select2" other-rules="required" :readonly="readonly" v-model="form.retirementReason" name="retirementReason" label="FixedAssetRetirement.retirementReason" uri="/dict/listOrder?groupName=retirementReason" tags="false" @change="clearOtherValue"></form-group>
							<form-group col="md-4" type="input" v-if="form.retirementReason=='Others'" :readonly="readonly" v-model="form.othersReason" other-rules="max:300" name="othersReason" label="FixedAssetRetirement.othersReason"></form-group>
							<form-group col="md-4" type="input" v-else readonly="readonly" v-model="form.othersReason" other-rules="max:300" name="othersReason" label="FixedAssetRetirement.othersReason"></form-group>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<!-- <i class="fa fa-asterisk text-required-header"></i> -->
					<h3 class="box-title">The Suggestions of Disposal 处置意见</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<form-group col="md-4" type="select2" other-rules="required" :readonly="readonly" v-model="form.expectedSettleManners" name="expectedSettleManners" label="FixedAssetRetirement.expectedSettleManners" uri="/dict/listOrder?groupName=expectedSettleManners" tags="false" @change="clearOtherValue"></form-group>
							<form-group col="md-4" type="select" v-if="form.expectedSettleManners =='Disposal with Residual value'" :readonly="readonly" v-model="form.residualValue" name="residualValue" label="FixedAssetRetirement.residualValue" uri="/dict/listOrder?groupName=residualValue" tags="false" @change="clearOtherValue"></form-group>
							<form-group col="md-4" type="select" v-else readonly="readonly" v-model="form.residualValue" name="residualValue" label="FixedAssetRetirement.residualValue" uri="/dict/listOrder?groupName=residualValue" tags="false" @change="clearOtherValue"></form-group>
							<form-group col="md-4" type="input" v-if="form.residualValue=='Others'" :readonly="readonly" v-model="form.othersResidual" other-rules="max:300" name="othersResidual" label="FixedAssetRetirement.othersResidual"></form-group>
							<form-group col="md-4" type="input" v-else readonly="readonly" v-model="form.othersResidual" other-rules="max:300" name="othersResidual" label="FixedAssetRetirement.othersResidual"></form-group>
						</div>
						<div class="row">
							<form-group col="md-4" type="datepicker" other-rules="required" :readonly="readonly" v-model="form.estimatedSettleTime" name="estimatedSettleTime" label="FixedAssetRetirement.estimatedSettleTime"></form-group>
							<form-group col="md-4" type="input" :readonly="readonly" v-model="form.contractPerson" other-rules="max:300" name="contractPerson" label="FixedAssetRetirement.contractPerson"></form-group>
							<form-group col="md-4" type="input" :readonly="readonly" v-model="form.phoneNo" other-rules="max:300" name="phoneNo" label="FixedAssetRetirement.phoneNo"></form-group>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary"  v-if="viewForFinanceAssetAccountant">
				<div class="box-header with-border">
					<!-- <i class="fa fa-asterisk text-required-header"></i> -->
					<h3 class="box-title">The Accounting Information of Asset 资产财务信息</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<form-group col="md-3" type="datepicker" other-rules="required" :readonly="inputForFinanceAssetAccountant" v-model="form.capitalizationDate" name="capitalizationDate" label="FixedAssetRetirement.capitalizationDate"></form-group>
						    <form-group col="md-3" type="input" :readonly="inputForFinanceAssetAccountant" v-model="form.sapAssetNumber" other-rules="max:300" name="sapAssetNumber" label="FixedAssetRetirement.sapAssetNumber"></form-group>
						</div>
						<div class="row col-md-12">
							<table class="table table-bordered table-faa" style="text-align: center" id="extendNon">
								<tbody>
									<tr style="height: 50px;">
										<th width="25%"></th>
										<th width="25%"></th>
										<th width="25%" style="text-align: center;">中国准则 HB1 RMB</th>
										<th width="25%" style="text-align: center;">国际准则 IFRS RMB</th>
									</tr>
									<tr style="background-color: #eee;">
										<td>资产原值</td>
										<td>Original Book Value</td>
										<td>
											<!--<form-group col="md-10" type="input2" haslable="false" other-rules="max:30|regex:^-?\d*\.?\d*$" :readonly="readonly" :name="'originalBookValue_HB1'+(1)" :id="'originalBookValue_HB1'+1" v-model="form.originalBookValue_HB1"></form-group>
											<div class="col-md-2" style="margin-top: 5px;padding-left: 0px;">RMB</div>-->
											<CurrencyInput style="width: 70%;float:left;" class="form-control" :disabled="inputForFinanceAssetAccountant" isInt="false" xlength="30" v-model="form.originalBookValue_HB1"></CurrencyInput>
											<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>

										</td>
										<td>
											<!--<form-group col="md-10" type="input2" haslable="false" other-rules="max:30|regex:^-?\d*\.?\d*$" :readonly="readonly" :name="'originalBookValue_IFRS'+(1)" :id="'originalBookValue_IFRS'+1" v-model="form.originalBookValue_IFRS"></form-group>
											<div class="col-md-2" style="margin-top: 5px;padding-left: 0px;">RMB</div>-->
											<CurrencyInput style="width: 70%;float:left;" class="form-control" :disabled="inputForFinanceAssetAccountant"  isInt="false" xlength="30" v-model="form.originalBookValue_IFRS"></CurrencyInput>
											<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>
										</td>
									</tr>
									<tr style="background-color: #eee;">
										<td>累计折旧</td>
										<td>- Accumulated Depreciation</td>
										<td>
											<!--<form-group col="md-10" type="input2" haslable="false" other-rules="max:30|regex:^-?\d*\.?\d*$" :readonly="readonly" :name="'accumulatedDEPR_HB1'+(1)" :id="'accumulatedDEPR_HB1'+1" v-model="form.accumulatedDEPR_HB1"></form-group>
											<div class="col-md-2" style="margin-top: 5px;padding-left: 0px;">RMB</div>-->
											<CurrencyInput style="width: 70%;float:left;" class="form-control" :disabled="inputForFinanceAssetAccountant"  isInt="false" xlength="30" v-model="form.accumulatedDEPR_HB1"></CurrencyInput>
											<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>

										</td>
										<td>
											<!--<form-group col="md-10" type="input2" haslable="false" other-rules="max:30|regex:^-?\d*\.?\d*$" :readonly="readonly" :name="'accumulatedDEPR_IFRS'+(1)" :id="'accumulatedDEPR_IFRS'+1" v-model="form.accumulatedDEPR_IFRS"></form-group>
											<div class="col-md-2" style="margin-top: 5px;padding-left: 0px;">RMB</div>-->
											<CurrencyInput style="width: 70%;float:left;" class="form-control" :disabled="inputForFinanceAssetAccountant"  isInt="false" xlength="30" v-model="form.accumulatedDEPR_IFRS"></CurrencyInput>
											<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>

										</td>
									</tr>
									<tr style="background-color: #eee;">
										<td>资产净值</td>
										<td>=Net Book Value</td>
										<td>
											<!--<form-group col="md-10" type="input2" haslable="false" other-rules="max:30|regex:^-?\d*\.?\d*$" readonly="readonly" :name="'netBookValue_HB1'+(1)" :id="'netBookValue_HB1'+1" v-model="netBookValue_HB1_Temp"></form-group>
											<div class="col-md-2" style="margin-top: 5px;padding-left: 0px;">RMB</div>-->
											<CurrencyInput style="width: 70%;float:left;" class="form-control" disabled="readonly" isInt="false" xlength="30" v-model="netBookValue_HB1_Temp"></CurrencyInput>
											<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>

										</td>
										<td>
											<!--<form-group col="md-10" type="input2" haslable="false" other-rules="max:30|regex:^-?\d*\.?\d*$" readonly="readonly" :name="'netBookValue_IFRS'+(1)" :id="'netBookValue_IFRS'+1" v-model="netBookValue_IFRS_Temp"></form-group>
											<div class="col-md-2" style="margin-top: 5px;padding-left: 0px;">RMB</div>-->
											<CurrencyInput style="width: 70%;float:left;" class="form-control" disabled="readonly" isInt="false" xlength="30" v-model="netBookValue_IFRS_Temp"></CurrencyInput>
											<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>

										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary" v-if="viewForLastAssetAccountant">
				<div class="box-header with-border">
					<!-- <i class="fa fa-asterisk text-required-header"></i> -->
					<h3 class="box-title">Consequence of disposal 处置结果</h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<form-group col="md-4" type="select" other-rules="required" :readonly="inputForLastAssetAccountant" v-model="form.actualSettleManners" name="actualSettleManners" label="FixedAssetRetirement.actualSettleManners" uri="/dict/listOrder?groupName=actualSettleManners" tags="false" @change="clearOtherValue"></form-group>
							<form-group col="md-4" type="input" v-if="form.actualSettleManners=='Others'" :readonly="inputForLastAssetAccountant" v-model="form.othersSettleManners" other-rules="max:300" name="othersSettleManners" label="FixedAssetRetirement.othersSettleManners"></form-group>
							<form-group col="md-4" type="input" v-else readonly="readonly" v-model="form.othersSettleManners" other-rules="max:300" name="othersSettleManners" label="FixedAssetRetirement.othersSettleManners"></form-group>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="form-group"><br />
									<label>If the actual settlement manner is different with expected one, please specify the reason here <br/>如果实际处置方式与预期处理方式不同，请写明原因</label>
									<textarea :readonly="inputForLastAssetAccountant" other-rules="max:300" @blur="specifySettleMannersCheck('specifySettleManners',300,'Specify Reason','补充注释')" :class="{'form-control':true,'input':true,'is-danger': errors.has('specifySettleManners')}" id="specifySettleManners" rows="3" name="specifySettleManners" v-model="form.specifySettleManners"></textarea>
								    <p>300 Characters Max (最多填写300个字节)</p>
								</div>
							</div>
						</div>
						<div class="row">
							<form-group col="md-3" type="datepicker" other-rules="required" :readonly="inputForLastAssetAccountant" v-model="form.actualDisposalTime" name="actualDisposalTime" label="FixedAssetRetirement.actualDisposalTime"></form-group>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">The Net Book Value at Disposal Month 处置月资产净值</label>
									<div class="form-group">
										<!--<input style="width: 70%" :readonly="inputForLastAssetAccountant" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('netBookValDisposal') }" name="netBookValDisposal" id="netBookValDisposal" v-model="form.netBookValDisposal" value="" >-->
										<CurrencyInput style="width: 70%;float:left;" class="form-control" :disabled="inputForLastAssetAccountant" isInt="false" xlength="30" v-model="form.netBookValDisposal"></CurrencyInput>
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">Disposal Income 处置收入</label>
									<div class="form-group">
										<!--<input style="width: 70%" :readonly="inputForLastAssetAccountant" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('disposalIncome') }" name="disposalIncome" id="disposalIncome" v-model="form.disposalIncome" value="" >-->
										<CurrencyInput style="width: 70%;float:left;" class="form-control" :disabled="inputForLastAssetAccountant"  isInt="false" xlength="30" v-model="form.disposalIncome"></CurrencyInput>
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</form>
			</div>

			<!-- 上传附件starts  -->
			<div class="box box-primary" v-if="showUploadContract">
				<div class="box-header with-border">
					<h3 class="box-title"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Upload Contract  上传采购合同</h3>					
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<upload2 id="uploadContract" :readonly="inputForLastAssetAccountant"  buttonText="Upload Contract" v-model="form.uploadContractIds" :attachments="form.uploadContracts" multi="false" required="true" fileSizeLimit="5MB"></upload2>
							</div>
						</div>
					</div>
				</div>
			</div>
		   <div class="box box-primary" v-if="showAttachment">
				<div class="box-header with-border">
				<h3 class="box-title pull-left" style="margin-right:10px;">Upload Attachment 上传附件</h3>
				</div>
				<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<upload2 id="uploadAttachment" :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" required="false"></upload2>
					</div>
				</div>
				</div>
			</div>
			<div class="checkbox mar-bot-20" v-if="!readonly">
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
			<router-view :form="form" entityId="FixedAssetRetirement" vclass="btn-left" uri="/form/FixedAssetRetirement/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeRealApprovel="beforeRealApprovel"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>
		</section>
	</div>
</template>

<script>
	import global_ from "./../../../components/Common/Util/Global.vue";
	import daterangepicker from "bootstrap-daterangepicker"
	// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
	export default {
		name: "FixedAssetRetirement",
		methods: {			
			beforesubmit: function() {
			},
			beforeRealApprovel:function(){				
				var originalBookValue_HB1_temp = this.form.originalBookValue_HB1+"";
				if(originalBookValue_HB1_temp == "false"){
					this.form.originalBookValue_HB1 = null;
				}
				var originalBookValue_IFRS_temp = this.form.originalBookValue_IFRS+"";
				if(originalBookValue_IFRS_temp == "false"){
					this.form.originalBookValue_IFRS = null;
				}
				var accumulatedDEPR_HB1_temp = this.form.accumulatedDEPR_HB1+"";
				if(accumulatedDEPR_HB1_temp == "false"){
					this.form.accumulatedDEPR_HB1 = null;
				}
				var accumulatedDEPR_IFRS_temp = this.form.accumulatedDEPR_IFRS+"";
				if(accumulatedDEPR_IFRS_temp == "false"){
					this.form.accumulatedDEPR_IFRS = null;
				}
				
				var netBookValDisposal_temp = this.form.netBookValDisposal+"";
				if(netBookValDisposal_temp == "false"){
					this.form.netBookValDisposal = null;
				}				
				var disposalIncome_temp = this.form.disposalIncome+"";
				if(disposalIncome_temp == "false"){
					this.form.disposalIncome = null;
				}
				if((this.form.originalBookValue_HB1 != null && this.form.originalBookValue_HB1 !="") && (this.form.accumulatedDEPR_HB1 != null && this.form.accumulatedDEPR_HB1 !="")){
					var tempValue=0;
					tempValue = this.form.originalBookValue_HB1 - this.form.accumulatedDEPR_HB1;
					if(tempValue < 0 ) {
						$.alert("Accumlated Depreciation is greater than Original Book Value,please re-enter. 累计折旧大于资产原值，请重新输入。");
					    this.form.approvelstatus= false;
						return false;
					}
				}
				if((this.form.originalBookValue_IFRS != null && this.form.originalBookValue_IFRS !="") && (this.form.accumulatedDEPR_IFRS != null && this.form.accumulatedDEPR_IFRS !="")){
						var tempValue=0;
						tempValue = this.form.originalBookValue_IFRS - this.form.accumulatedDEPR_IFRS;
						if(tempValue < 0) {
						  $.alert("Accumlated Depreciation is greater than Original Book Value,please re-enter. 累计折旧大于资产原值，请重新输入。");
						  this.form.approvelstatus= false;
						  return false;
						}
				}
			},
			specifySettleMannersCheck: function(id, num, enLabel, cnLabel) {
				this.form.caculationProcess = this.CheckLimit(id, num, enLabel, cnLabel);
			},
			CheckLimit: function(id, num, enLabel, cnLabel) {
				var reg = /^[0-9]*$/;
				var obj = $("#" + id);
				if(obj.attr("readonly")) {
					//只读不做操作 
				} else {
					if(obj.val()) {
						var value = obj.val();
						var newvalue = value.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						//当填写的字节数小于设置的字节数
						if(length * 1 <= num * 1) {
							return value;
						}
						var limitDate = newvalue.substr(0, num);
						var count = 0;
						var limitvalue = "";
						for(var i = 0; i < limitDate.length; i++) {
							var flat = limitDate.substr(i, 1);
							if(flat == "*") {
								count++;
							}
						}
						var size = 0;
						var istar = newvalue.substr(num * 1 - 1, 1); //校验点是否为“×”
						//if 基点是×; 判断在基点内有×为偶数还是奇数
						if(count % 2 == 0) {
							//当为偶数时
							size = count / 2 + (num * 1 - count);
							limitvalue = value.substr(0, size);
						} else {
							//当为奇数时
							size = (count - 1) / 2 + (num * 1 - count);
							limitvalue = value.substr(0, size);
						}
						$.alert(num + " characters max for " + enLabel + ". " + cnLabel + "最多只能填写" + num + "个字节。");
						return limitvalue;
					}
				}
			},
			clearOtherValue: function() {
				if(this.form.retirementReason != "Others") {
					this.form.othersReason = "";
				}
				if(this.form.expectedSettleManners != "Disposal with Residual value") {
					this.form.residualValue = "";
				}
				if(this.form.residualValue != "Others") {
					this.form.othersResidual = "";
				}
				if(this.form.actualSettleManners != "Others") {
					this.form.othersSettleManners = "";
				}
			},

		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/FixedAssetRetirement/get/" + id;
			} else {
				var url = "/form/FixedAssetRetirement/create/";
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
			dm.onbehalf = false;
			dm.flag = false;
			dm.itServicerules = "required";
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.staffCode;
			dm.tempcreatorName = dm.form.applicantName;
			dm.tempcreatorPhoneNum = dm.form.telephone;
			dm.tempcreatorDept = dm.form.department;
			dm.tempcostCenter = dm.form.costCenter;
			dm.tempbuHeader = dm.form.buHeader;
			dm.tempsupervisor = dm.form.supervisor;			
			this.$root.actProcessType = "none";
			return dm;
		},
		watch: {
			"$root.actProcessType": {
				handler(curVal, oldVal) {
					if("approve" == curVal) {
						this.itServicerules = "required";

					} else if("reject" == curVal) {
						this.itServicerules = '';

					} else {
						this.itServicerules = "";

					}
					console.log(this.itServicerules);
				},
				deep: true
			}
		},
		//在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
		mounted() {
			var form = this.form;
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

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_form = this.form;
			});

		},
		computed: {
		netBookValue_HB1_Temp: {
				get: function() {
					if((this.form.originalBookValue_HB1 == null || this.form.originalBookValue_HB1=="") && (this.form.accumulatedDEPR_HB1 == null || this.form.accumulatedDEPR_HB1=="")){
                       this.form.netBookValue_HB1 =null;
					}else{
						var tempValue=0;
						tempValue = this.form.originalBookValue_HB1 - this.form.accumulatedDEPR_HB1;
						if(tempValue < 0 ) {
							$.alert("Accumlated Depreciation is greater than Original Book Value,please re-enter.累计折旧大于资产原值，请重新输入。");
						}else{
							this.form.netBookValue_HB1 = tempValue;
						}
					}
					return this.form.netBookValue_HB1;
				}
			},
			netBookValue_IFRS_Temp: {
				get: function() {
				if((this.form.originalBookValue_IFRS == null || this.form.originalBookValue_IFRS=="") && (this.form.accumulatedDEPR_IFRS == null || this.form.accumulatedDEPR_IFRS=="")){
                       this.form.netBookValue_IFRS =null;
					}else{
						var tempValue=0;
						tempValue = this.form.originalBookValue_IFRS - this.form.accumulatedDEPR_IFRS;
						if(tempValue < 0) {
							$.alert("Accumlated Depreciation is greater than Original Book Value,please re-enter.累计折旧大于资产原值，请重新输入。");
						}else{
							this.form.netBookValue_IFRS = tempValue;
						}
					}
					return this.form.netBookValue_IFRS;
				}
			},
			processTaskId: {
				// 动态计算processTaskId的值
				get: function() {
					return this.$route.query.taskId;
				}
			},
			processTaskKey: {
				// 动态计算processTaskKey的值s
				get: function() {
					return this.$route.query.taskKey;
				}
			},
			validateRetirementManner: {
				get: function() {
					if(this.form.retirementManner == 'Partial Retirement') {
						return true;
					} else {
						this.form.partialDisposal = "";
						return false;
					}

				}
			},
			ckeckInApproveFlow: {
				get: function() {
					return(this.$route.path.indexOf('audit') > -1);
				}
			},
			readonly: {
				// 动态计算readonly的值
				get: function() {
					return(
						(this.$route.query.taskKey != null &&
							this.$route.query.taskKey.indexOf("edit") == -1) ||
						(this.form.processInstanceId != null &&
							this.form.status != null &&
							this.form.status != 2 &&
							this.form.status != 9)
					);
				}
			},
			showAttachment: {
				get: function() {
					return(!this.readonly || (this.form.attachmentIds != null && this.form.attachmentIds !=""));
				}
			},
			showUploadContract: {
				get: function() {
					return(this.form.actualSettleManners == "Sales as second hand goods");
				}
			},
			applicationTime: {
				get: function() {
					if(this.form.createDate == null) {
						return "";
					}
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + "-" + parts[1] + "-" + parts[2];
				},

			},
			//控制 Consequence of disposal处置结果 显示
			viewForLastAssetAccountant: {
				get: function() {
					if(this.$route.query.taskKey != null && this.processTaskKey == 'assetAccountant' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)) {
						return true; //FAA审批时显示
					} else if(this.$route.query.taskKey == null && this.form.actualSettleManners != null && (this.form.status != null && this.form.status != 2 && this.form.status != 9)) {
						return true; //My Application 显示 详情有值时显示
					} else if(this.form.actualSettleManners != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1) {
						return true; //从My Approval进来显示 
					} else {
						return false;
					}
				}
			},
			//控制 财务信息 显示
			viewForFinanceAssetAccountant: {
				get: function() {
					if(this.$route.query.taskKey != null && (this.processTaskKey == 'financeAssetAccountant'|| this.processTaskKey == 'assetAccountant') && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)) {
						return true; //FAA审批时显示
					} else if(this.$route.query.taskKey != null && (this.processTaskKey == 'headOfCF' || this.processTaskKey == 'BOMT' || this.processTaskKey == 'BOMC') && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)) {
						return true; //Head Of CF  & BoM审批时显示
					} else if(this.$route.query.taskKey == null && this.form.capitalizationDate != null && (this.form.status != null && this.form.status != 2 && this.form.status != 9)) {
						return true; //My Application 显示 详情有值时显示
					} else if(this.form.capitalizationDate != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1) {
						return true; //从My Approval进来显示 
					} else {
						return false;
					}
				}
			},
			inputForLastAssetAccountant: {
				get: function() {
					if(this.$route.query.taskKey != null && this.processTaskKey == 'assetAccountant' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)) {
						return false; //FAA审批时显示
					} else {
						return true;
					}
				}
			},
			inputForFinanceAssetAccountant: {
				get: function() {
					if(this.$route.query.taskKey != null && this.processTaskKey == 'financeAssetAccountant' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)) {
						return false; //FAA审批时显示
					} else {
						return true;
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
	
	.table-faa>thead>tr>th,
	.table-faa>tbody>tr>th,
	.table-faa>tfoot>tr>th,
	.table-faa>thead>tr>td,
	.table-faa>tbody>tr>td,
	.table-faa>tfoot>tr>td {
		padding: 2px;
	}
</style>
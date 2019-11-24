<template>
	<!-- Content Wrapper. Contains page content -->
	<div id="currentpage">

		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("WorkCertificate Application")}}</h1>
			<ol class="breadcrumb" style="max-width:70%;" v-if="(form.stampType=='HR Stamp')">
        		<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.HRBP</a>
				</li>
				<li v-if="(form.certificateType=='Income Certificate'||form.certificateType=='Certificate for Visa' )">
					<a>3.HR C&B</a>
				</li>
				<li v-if="(form.certificateType=='Income Certificate'||form.certificateType=='Certificate for Visa' )">
					<a>4.HRBP</a>
				</li>
				<li v-if="(form.certificateType!='Income Certificate'&&form.certificateType!='Certificate for Visa' )">
					<a>3.HRBP</a>
				</li>
			</ol>
			<ol class="breadcrumb" style="max-width:70%;" v-else-if="(form.stampType=='Company Stamp')">
        		<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.HRBP</a>
				</li>
				<li v-if="(form.certificateType=='Income Certificate'||form.certificateType=='Certificate for Visa')">
					<a>3.HR C&B</a>
			  	</li>
				<li v-if="(form.certificateType=='Income Certificate'||form.certificateType=='Certificate for Visa')">
					<a>4.Head of HRBP</a>
				</li>
				<li v-if="(form.certificateType=='Income Certificate'||form.certificateType=='Certificate for Visa')">
					<a>5.Linked to Company Stamp</a>
				</li>
				<li v-if="(form.certificateType=='Income Certificate'||form.certificateType=='Certificate for Visa')">
					<a>6.HRBP</a>
				</li>
				<li v-if="(form.certificateType!='Income Certificate'&&form.certificateType!='Certificate for Visa')">
					<a>3.Head of HRBP</a>
				</li>
				<li v-if="(form.certificateType!='Income Certificate'&&form.certificateType!='Certificate for Visa')">
					<a>4.Linked to Company Stamp</a>
				</li>
				<li v-if="(form.certificateType!='Income Certificate'&&form.certificateType!='Certificate for Visa')">
					<a>5.HRBP</a>
				</li>
			</ol>
			<ol class="breadcrumb" style="max-width:70%;" v-else>
				<li>
					<a>1.Applicant</a>
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
						<h3 class="box-title">Applicant Info.  <label>申请人信息</label></h3>
						<div class="box-tools pull-right">
					<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero">
						<i class="fa fa-plus" id="minusplusi"></i>
					</button>
					</div>
				</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<form-group other-rules="" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorMobile" name="creatorMobile" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							</div>
							<div class="row panel-collapse collapse " id="collapseZero">
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorSupervisor" name="creatorSupervisor" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorBuHead" name="creatorBuHead" readonly="readonly"></form-group>
								<form-group col="md-3" type="input" other-rules="" v-model="form.creatorCostCenter" name="creatorCostCenter" readonly="readonly"></form-group>
							</div>
						</div>
					</form>
				</div>

				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left"> 
							<i class="fa fa-asterisk text-red text-required-header" style="font-size: 12px;"></i>
							 Work Certificate Information 在职证明信息</h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="form-group col-md-12" v-if="form.certificateType=='Certificate for Visa'">
									<span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>
        								To apply for Certificate for Visa in Chinese language, please select Certificate Type “Special Template Certificate”. 如需申请中文版签证证明，请选择“特殊模板证明”。
									</span>
								</div>
								<div v-if="form.certificateType=='Employment Certificate' || form.certificateType=='Income Certificate' || form.certificateType=='Certificate for Visa'" class="form-group col-md-12" >
									<a href="###" @click="getWorkCertificateTemplate" style="font-size: 12px;text-decoration:underline;">Please check whether the available Work Certificate Templates meet your request. If not, please choose and attach your special template. 请点击查看证明模板是否符合您的要求，如果不匹配，请选择并上传特殊模板证明。</a>
								</div>
							</div>
							<div class="row">
								<form-group col="md-3" hasAsterisk="false" haslable="false" type="select3" uri="/dict/listOrder?groupName=workCertificateType" other-rules="required" v-model="form.certificateType" name="certificateType" label="WorkCertificate.certificateType" :readonly="readonly"></form-group>
								<form-group col="md-3" hasAsterisk="false" haslable="false" type="select3" uri="/dict/list?groupName=workCertificateStampType" other-rules="required" v-model="form.stampType" name="stampType" label="WorkCertificate.stampType" :readonly="readonlyByHrbpKey"></form-group>

								<section v-if="form.certificateType && form.certificateType!='Special Template Certificate' && form.certificateType!='Certificate for Visa'">
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.language" type="select3" uri="/dict/list?groupName=workCertificateLanguage" other-rules="required" v-model="form.language" name="language" :readonly="readonly"></form-group>
								</section>
								<section v-if="form.certificateType =='Certificate for Visa' || form.certificateType=='Employment Certificate'">
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.dateOfBirth" type="datepicker" other-rules="required" v-model="form.dateOfBirth" name="dateOfBirth" :readonly="readonly"></form-group>
								</section>

								<form-group v-if="form.certificateType =='Certificate for Visa'" col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.passportNoVisa" type="input" other-rules="required|max:75" v-model="form.passportNo" name="passportNo" :readonly="readonly"></form-group>

              				</div>
							
						  	<!--收入证明--> 
						  	<section v-if="form.certificateType=='Income Certificate'">
                				<div class="row">
									<form-group v-if="form.language=='Chinese'" col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.department" type="select2" uri="/divisionDepartment/listDeptCn" other-rules="required" v-model="form.department" name="department" :readonly="readonlyByHrbpKey" key="department1"></form-group>
									<form-group v-else col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.department" type="select2" uri="/divisionDepartment/listDept" other-rules="required" v-model="form.departmentEn" name="departmentEn" :readonly="readonlyByHrbpKey" key="departmentEn1"></form-group>
									<form-group v-if="form.language=='Chinese'" col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.position" type="input" other-rules="required|max:100" v-model="form.position" name="position" :readonly="readonlyByHrbpKey" key="position1"></form-group>
									<form-group v-else col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.position" type="input" other-rules="required|max:100" v-model="form.positionEn" name="positionEn" :readonly="readonlyByHrbpKey" key="positionEn1"></form-group>
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.passportNo" type="input" other-rules="required|max:75" v-model="form.passportNo" name="passportNo" :readonly="readonly"></form-group>
									<form-group v-if="(this.form.monthlyCompensationStr==null || this.form.monthlyCompensationStr=='') && !this.incomeCertificateShow" col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.joinVwatjYear" type="datepicker" other-rules="required" v-model="form.joinVwatjYear" name="joinVwatjYear" :readonly="readonly"></form-group>
              					</div>
								<div class="row" v-if="this.incomeCertificateShow">
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.joinVwatjYear" type="datepicker" other-rules="required" v-model="form.joinVwatjYear" name="joinVwatjYear" :readonly="readonly"></form-group>
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.monthlyCompensation" type="currency" other-rules="required|max:26" v-model="form.monthlyCompensationStr" name="monthlyCompensation" :readonly="readonlyByHrcbKey"></form-group>
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.yearlyCompensation" type="currency" other-rules="required|max:26" v-model="form.yearlyCompensationStr" name="yearlyCompensation" :readonly="readonlyByHrcbKey"></form-group>
								</div>
            				</section>
              				<!--工作证明-->
							<div class="row" v-if="form.certificateType=='Employment Certificate'">
								<!--
								<form-group col="md-3" label="WorkCertificate.dateOfBirth" type="datepicker" other-rules="required" v-model="form.dateOfBirth" name="dateOfBirth" :readonly="readonly" key="birthDate"></form-group>    	
								-->
								<form-group v-if="form.language=='Chinese'" col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.department" type="select2" uri="/divisionDepartment/listDeptCn" other-rules="required" v-model="form.department" name="department" :readonly="readonlyByHrbpKey" key="department2"></form-group>
								<form-group v-else col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.department" type="select2" uri="/divisionDepartment/listDept" other-rules="required" v-model="form.departmentEn" name="departmentEn" :readonly="readonlyByHrbpKey" key="departmentEn2"></form-group>
								<form-group v-if="form.language=='Chinese'" col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.position" type="input" other-rules="required|max:100" v-model="form.position" name="position" :readonly="readonlyByHrbpKey" key="position2"></form-group>
								<form-group v-else col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.position" type="input" other-rules="required|max:100" v-model="form.positionEn" name="positionEn" :readonly="readonlyByHrbpKey" key="positionEn2"></form-group>
								<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.passportNo" type="input" other-rules="required|max:75" v-model="form.passportNo" name="passportNo" :readonly="readonly"></form-group>
								<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.joinVwatjYear" type="datepicker" other-rules="required" v-model="form.joinVwatjYear" name="joinVwatjYear" :readonly="readonly" key="joinDate"></form-group>
							</div>
							<!--目的-->
							<div class="row">
								<div class="form-group col-md-12" v-if="form.certificateType == null || form.certificateType!='Certificate for Visa'">
									<label>Purpose 目的</label>
									<form-group label="WorkCertificate.purpose" haslable="false" type="textarea2" limit="300" other-rules="required" v-model="form.purpose" name="purpose" :readonly="readonly" ></form-group>
								</div>
							</div>

							<!--签证证明-->
						  	<section v-if="form.certificateType=='Certificate for Visa'">
                				<div class="row">
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.department" type="select2" uri="/divisionDepartment/listDept" other-rules="required" v-model="form.departmentEn" name="departmentEn" :readonly="readonlyByHrbpKey" key="departmentEn"></form-group>
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.position" type="input" other-rules="required|max:100" v-model="form.positionEn" name="positionEn" :readonly="readonlyByHrbpKey" key="positionEn"></form-group>
								 	<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.startDateOfTravel" dateformate="yyyy-mm-dd" :startDate="this.dateStart" type="datepicker" other-rules="required" v-model="form.startDateOfTravel" name="startDateOfTravel" :readonly="readonly"></form-group>
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.endDateOfTravel" dateformate="yyyy-mm-dd" v-if="this.showArrEndDate" :startDate="generateStartDate" type="datepicker" other-rules="required" v-model="form.endDateOfTravel" name="endDateOfTravel" :readonly="readonly"></form-group>
									<form-group col="md-3" hasAsterisk="false" haslable="false" label="WorkCertificate.joinVwatjYear" type="datepicker" other-rules="required" v-model="form.joinVwatjYear" name="joinVwatjYear" :readonly="readonly" key="visaJoinDate"></form-group>
							  	
								    <div class="form-group col-md-9" v-if="form.certificateType=='Certificate for Visa'">
										<label>Purpose 目的</label>
										<textarea @blur="purposeCheck" style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('purpose') }" rows="1" v-model="form.purpose" name="purpose" :readonly="readonly" id="purpose" placeholder="300 Characters Max (最多填写300个字节)" v-validate="'required'"   ></textarea>
										<!--
										<form-group rows="1" style="resize:vertical;font-weight:normal;height:34px;" label="WorkCertificate.purpose" haslable="false" type="textarea" limit="300" other-rules="required" v-model="form.purpose" name="purpose" :readonly="readonly" ></form-group>
										 -->
									</div>
									<form-group v-if="this.visaCertificateShow" col="md-3" label="WorkCertificate.monthlyCompensation" type="currency" other-rules="required|max:26" v-model="form.monthlyCompensationStr" name="monthlyCompensation" :readonly="readonlyByHrcbKey"></form-group>
								</div>
              				</section>
						</div>
					</form>
				</div>

				<div class="box box-primary" v-if="(readonly&&form.specializedAttchments)||form.certificateType=='Special Template Certificate'" >
					<div class="box-header with-border">
						<h3 class="box-title pull-left"><i v-if="attachmentRequired == 'true'" class="fa fa-asterisk text-red text-required-header" style="font-size: 10px;"></i> Upload Special Template Certificate 上传特殊模板证明</h3>
						<span v-if="attachmentRequired == 'true'" class="text-muted mar-left-20">
						<i class="fa fa-fw fa-info-circle"></i>Please upload special template certificate (Zditable version is preferred). 请优先上传可编辑版本的特殊模板证明。</span>
					</div>
					<div class="box-body">
 						<div class="row">
							<div class="col-md-12 form-group">
								<!--multi="false" accept="application/pdf" fileSizeLimit="5MB"   特殊证明文件类型不应该有限制 multi=false:只能是一个附件-->
								<upload2 multi="true" :readonly="readonly" v-model="form.specializedAttchmentId" buttonText="Upload 上传" :attachments="form.specializedAttchments" :required="attachmentRequired" ></upload2>
							</div>
						</div>
					</div>
				</div>
				<div class="checkbox mar-bot-20" v-if="!readonly&&(!processTaskKey||processTaskKey=='editForm')">
					<label>
              			<span class="help is-danger" v-show="errors.has('certificateNotice')">
							{{$t("checkCertificateNotice")}}
						</span>
						<input  name="certificateNotice" type="checkbox" v-validate="'required'" >
						I understand that the company shall issue the certificate in accordance with my actual situation. I hereby undertake that I will use this certificate for the purpose declared in my application and be liable for the consequences thus incurred.
						<br>
						本人理解公司将根据本人真实情况出具证明。本人在此承诺，将仅出于申请中声明的目的使用该份证明并自行承担由此产生的一切责任。
           			</label>
					<label style="margin-top: 10px;">
              			<span class="help is-danger" v-show="errors.has('terms')">
							{{$t("checkPolicyNotice")}}
						</span>
               			<input  name="terms" type="checkbox" v-validate="'required'" >
              			When submitting the application, I have read and agreed to
                  		<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission TianJin.</a>
                  		当提交此申请时，我已经理解并承诺遵守
                  		<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
            		</label>
				</div>
				<comment v-if="checkInApproveFlow && processTaskId !=null && form.status != 9 && processTaskKey!='editForm'" v-model="form.approval.approvalRemark"></comment>
				<!--<Confirm v-if="this.$route.query.taskKey=='hrbpConfirm'" :form="form" :validator="this.$validator" lableName="Finished"  ></Confirm>-->
				<PrintAndFinished v-if="checkInApproveFlow && this.$route.query.taskKey=='hrbpConfirm'" entityId="WorkCertificate" :form="form" :validator="this.$validator" lableName="Finish" ></PrintAndFinished>
				
				<div v-else>
					<router-view :form="form" entityId="WorkCertificate" vclass="btn-left" uri="/form/WorkCertificate/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" v-on:beforeRealApprovel="beforesubmit"></router-view>
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
		name: 'WorkCertificate',
		methods: {
			beforesubmit: function() {
				if(this.form.status == null || this.form.status == 2 || this.form.status ==9){
					var result;
					var me = this;
					this.GL.actUtil.query("get","/WorkCertificate/existNullValue/"+this.form.applicantUserId,"",function(data){
						result = JSON.parse(data).result;
						if(result){
							$.alertApon("Can't find hrbp! Please contact the Administrator to mantain the data. 找不到HRBP！请联系管理员维护数据。");
							me.form.submitstatus=false;
							return;
						}else{
							me.form.submitstatus=true;
						}
					});

					if(this.form.purpose!="" && this.form.purpose != null ){
						var limitSize=300;
						var newvalue = this.form.purpose.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						if(length>limitSize){
							$.alertApon(limitSize+" characters max for purpose, "+length+" characters have been filled in currently. 目的最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
							this.form.submitstatus=false;
							return;
						}else{
							this.form.submitstatus=true;
						}
					}
				}
				if(this.form.status == 1){
					if(this.processTaskKey=='hrcb'){
						
					}
				}
			},
			purposeCheck(){
				if ($("#purpose").attr("readonly")) {
					//只读不做操作
				} else {
					if ($("#purpose").val()) {
						var value = $("#purpose").val();
						var newvalue = value.replace(/[^\x00-\xff]/g, "**");
						var length = newvalue.length;
						var limitSize=300;
						//当填写的字节数小于设置的字节数
						if (length * 1 <= limitSize * 1) {
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
						var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
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
						$.alertApon(limitSize+' characters max, '+length+' characters have been filled in currently. 最多只能填写'+limitSize+'个字节，目前已填写'+length+'个字节。');
						//$.alertApon(limitSize+' Characters Max. 最多只能填写'+limitSize+'个字节。');
						//this.form.purpose = limitvalue;
					}
				}
			},
			getWorkCertificateTemplate: function() {
				var url = Config.getBaseURL() + "/WorkCertificate/getWorkCertificateTemplate" + "?token=" + Config.getToken();
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			},
			
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/WorkCertificate/get/" + id;
			} else {
				var url = "/form/WorkCertificate/create/";
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
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempcreatorSupervisor = dm.form.creatorSupervisor;
			dm.tempcreatorDept = dm.form.creatorDept;
			dm.tempcreatorBuHead = dm.form.creatorBuHead;
			dm.tempcreatorMobile = dm.form.creatorMobile;
			dm.tempcreatorCostCenter = dm.form.creatorCostCenter;
			
			dm.form.submitstatus = true;
			dm.form.approvelstatus = true;
			
			dm.tempdateOfBirth = dm.form.dateOfBirth;
			dm.tempdepartment = dm.form.department;
			dm.tempdepartmentEn = dm.form.departmentEn;
			dm.tempposition = dm.form.position;
			dm.temppositionEn = dm.form.positionEn;
			dm.tempjoinVwatjYear = dm.form.joinVwatjYear;
			dm.showArrEndDate=true;
			dm.dateStart = new Date();			
			if(dm.form.certificateType=="Certificate for Visa"){
				dm.showMessage=true;
			}else{
				dm.showMessage=false;
			}
			return dm;
		},
		watch: {
			"form.certificateType":{
		        handler(curVal,oldVal){
		          	var _this=this;
		          	if(curVal!=oldVal&&curVal=="Certificate for Visa"){
		          	 	_this.form.stampType="";
		          	 	_this.form.purpose="";
		          	 	_this.form.dateOfBirth= _this.tempdateOfBirth;
						_this.form.department=_this.tempdepartment;
						_this.form.departmentEn=_this.tempdepartmentEn;
						_this.form.position=_this.tempposition;
						_this.form.positionEn=_this.temppositionEn;
						_this.form.passportNo=_this.form.userPassportNo;
						_this.form.startDateOfTravel="";
						_this.form.endDateOfTravel="";
						_this.form.joinVwatjYear=_this.tempjoinVwatjYear;
						_this.showMessage=true;
		          	}else if(curVal!=oldVal&&curVal=="Employment Certificate"){
						_this.form.stampType="";
						_this.form.purpose="";
						_this.form.dateOfBirth= _this.tempdateOfBirth;
						_this.form.department=_this.tempdepartment;
						_this.form.departmentEn=_this.tempdepartmentEn;
						_this.form.position=_this.tempposition;
						_this.form.positionEn=_this.temppositionEn;
						_this.form.passportNo="";
						_this.form.language="";
						_this.form.joinVwatjYear=_this.tempjoinVwatjYear;
						_this.showMessage=false;
		          	}else if(curVal!=oldVal&&curVal=="Income Certificate"){
						_this.form.stampType="";
						_this.form.purpose="";
						_this.form.department=_this.tempdepartment;
						_this.form.departmentEn=_this.tempdepartmentEn;
						_this.form.position=_this.tempposition;
						_this.form.positionEn=_this.temppositionEn;
						_this.form.passportNo="";
						_this.form.language="";
						_this.form.joinVwatjYear=_this.tempjoinVwatjYear;
						_this.showMessage=false;
		          	}else if(curVal!=oldVal&&curVal=="Special Template Certificate"){
						_this.form.stampType="";
						_this.form.purpose="";
						_this.showMessage=false;
		          	}
		        },
		        deep:false
		     },
		    "form.applicantUserId":{
		        handler(curVal,oldVal){
		        
		        	var _this=this;
                    
		        	
		        },
		        deep:false
		    },
		    "form.language":{
		        handler(curVal,oldVal){
		        	
		        },
		        deep:false
		     },
		     "form.department":{
		        handler(curVal,oldVal){
		        	
		        },
		        deep:false
		     },
		     "form.departmentEn":{
		        handler(curVal,oldVal){
		        	
		        },
		        deep:false
		     },
		     "form.monthlyCompensationStr":{
		        handler(curVal,oldVal){
		        	if(curVal){
						this.form.monthlyCompensation=curVal.replace(new RegExp(",","gm"),"");
					}
					if(this.form.monthlyCompensation=='Not a Number ! '){
						this.form.monthlyCompensation="";
						this.form.monthlyCompensationStr="";
					}
		        },
		        deep:false
		     },
		     "form.yearlyCompensationStr":{
		        handler(curVal,oldVal){
		        	if(curVal){
						this.form.yearlyCompensation=curVal.replace(new RegExp(",","gm"),"");
					}
					if(this.form.yearlyCompensation=='Not a Number ! '){
						this.form.yearlyCompensation="";
						this.form.yearlyCompensationStr="";
					}
		        },
		        deep:false
			 },
			 "form.endDateOfTravel":{
				handler(curVal,oldVal){
					var startDateOfTravel = this.form.startDateOfTravel;
					var endDateOfTravel = this.form.endDateOfTravel;
					if(startDateOfTravel && endDateOfTravel && endDateOfTravel < startDateOfTravel){
						$.alertApon("The end date of itinerary should not be earlier than the start date of itinerary. 行程截止日期不能早于行程起始日期。");
						return false;
					}
				},
				deep:true
			},
			"form.startDateOfTravel":{
				handler(curVal,oldVal){
					this.showArrEndDate = false;
					if(this.form.startDateOfTravel && this.form.startDateOfTravel != "NaN-NaN-NaN") {
						var date = new Date(this.form.startDateOfTravel);
						var newDate = date.getDate();
						date.setDate(newDate);
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						var strDate = date.getDate();
						if(month >= 1 && month <= 9) {
							month = "0" + month;
						}
						if(strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
						}
						this.form.endDateOfTravel = year + "-" + month + "-" + strDate;
						console.log("watch endDateOfTravel="+this.form.endDateOfTravel);  
					}
					this.$nextTick(() => {
						this.showArrEndDate = true;
					});
					
				},
				deep:true
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
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			readonlyByHrbpKey:{
				// 动态计算readonly的值
				get: function() {
					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('hrbp') != -1 && this.$route.query.taskKey.indexOf('Confirm') == -1 && this.$route.query.taskKey.indexOf('headof') == -1 && this.form.status != 0 &&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
						return false;
					}else{
						return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
					}
				}
			},
			readonlyByHrcbKey:{
				// 动态计算readonly的值
				get: function() {
					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('hrcb') != -1 && this.form.status != 0 &&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
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
			token:{
				get: function(){
					return Config.getToken();
				}
			},
			attachmentRequired:{
				get: function(){
					return 'true';
				}
			},
			checkInApproveFlow:{
				get: function() {
					return ((this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) &&
          				!(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")));
				}
			},
			incomeCertificateShow:{
				get: function(){
					if(this.processTaskKey=='hrcb' || this.processTaskKey=='headofhrbp' || this.processTaskKey=='hrbpConfirm'){
						return true;
					}else if(this.form.status!=9 && this.form.status!=2 && this.form.monthlyCompensationStr!=null && this.form.monthlyCompensationStr!=""){
						return true;
					}else{
						return false;
					}
				}
			},
			visaCertificateShow:{
				get: function(){
					if(this.processTaskKey=='hrcb' || this.processTaskKey=='headofhrbp' || this.processTaskKey=='hrbpConfirm'){
						return true;
					}else if(this.form.status!=9 && this.form.status!=2 && this.form.monthlyCompensationStr!=null && this.form.monthlyCompensationStr!=""){
						return true;
					}else{
						return false;
					}
				}
			},
			generateStartDate: {
				get: function() {
					if(this.form.startDateOfTravel && this.form.startDateOfTravel != "NaN-NaN-NaN") {
						var date = new Date(this.form.startDateOfTravel);
						var newDate = date.getDate();
						date.setDate(newDate);
						return date;
					} else {
						return new Date();
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

			var _this = this;
			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_this = this;
			});
		}
	}
</script>

<style>
  .content-wrapper{
		min-height: 796px !important;
	}
</style>
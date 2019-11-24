<template>
	<div>
		<!--	<div>Signature:</div>
		<img v-if="imgdata" :src="this.imgdata" width="750" height="400"></img>-->
		<div v-if="showmsg">{{msg}}</div>
		<!--
		supervisorValue={{this.form.supervisorValue}};
		officerValue={{this.form.officerValue}};
		onsiteValue={{this.form.onsiteValue}}<br />

		_this.supervisor={{this.supervisor}};
		_this.officer={{this.officer}};
		_this.onSite={{this.onSite}}<br />
		colorofficer={{this.colorofficer}};colorsupervisor={{this.colorsupervisor}}
		-->
		<table style="width:100%;" v-if="!selfApprove">
			<tr v-if="this.moreSignature">
				<td style="width:33%;" >
					<div class="box" style="width:300px;height:250px;">
						<p>&nbsp;<i class="fa fa-asterisk text-required text-required-title"></i>
						<font :color="colorsupervisor">&nbsp;Signature of on-site supervisor person: &nbsp;作业监护人员签字确认：</font></p>
						<vueSignature ref="signatureContentSupervisor" :sigOption="option" :w="'300px'" :h="'220px'"></vueSignature>
					</div>
				</td>
				<td style="width:33%;">
					<div class="box" style="width:300px;height:250px;">
						<p>&nbsp;<i class="fa fa-asterisk text-required text-required-title"></i>
						<font :color="colorofficer">&nbsp;Safety officer signature of Vender/VWATJ: &nbsp;作业单位安全员签字确认：</font></p>
						<vueSignature ref="signatureContentOfficer" :sigOption="option" :w="'300px'" :h="'220px'"></vueSignature>
					</div>
				</td>
				<td style="width:33%;">
					<div class="box" style="width:300px;height:250px;">
						<p>&nbsp;<i class="fa fa-asterisk text-required text-required-title"></i>
						<font :color="color">&nbsp;Signature of on-site responsibility person: &nbsp;作业单位现场负责人签字确认：</font></p>
						<vueSignature ref="signature" :sigOption="option" :w="'300px'" :h="'220px'"></vueSignature>
					</div>
				</td>
			</tr>
			<tr v-if="!this.moreSignature">
				<td style="width:100%;" v-if="!otherDangerousWorkApprove">
					<div class="box" style="width:750px;height:400px;">
						<p>&nbsp;<i class="fa fa-asterisk text-required text-required-title"></i>
						<font :color="color">&nbsp;Signature of on-site responsibility person: &nbsp;作业单位现场负责人签字确认：</font></p>
						<vueSignature ref="signature" :sigOption="option" :w="'750px'" :h="'380px'"></vueSignature>
					</div>
				</td>
				<td style="width:100%;" v-if="otherDangerousWorkApprove">
					<div class="box" style="width:750px;height:400px;">
						<p>&nbsp;<i class="fa fa-asterisk text-required text-required-title"></i>
						<font :color="color">&nbsp;Signature of responsibility person/ date:&nbsp;（承包商）现场负责人签字/日期：</font></p>
						<vueSignature ref="signature" :sigOption="option" :w="'750px'" :h="'380px'"></vueSignature>
					</div>
				</td>
			</tr>
		</table>
		

		<div style="margin-top:15px;">
			<button v-if="!selfApprove" type="button" @click="saveApprove()" class="btn btn-primary pull-left"><i class="fa fa-save"></i>&nbsp;Save</button>
			
			<button v-if="!selfApprove" type="button" @click="approve" style="margin-left:15px;" class="btn btn-success pull-left" id="vue_approve_btn1"><i class="fa fa-fw fa-check"></i>&nbsp;Approve</button>
			<button v-if="!selfApprove" type="button" @click="reject()" style="margin-left:15px;" id="vue_reject_btn1" class="btn btn-danger pull-left" ><i class="fa fa-fw fa-close"></i>&nbsp;Reject</button>

			<button v-if="!selfApprove" type="button" class="btn btn-warning pull-left  btn-left" @click="clear"><i class="fa fa-fw fa-paint-brush"></i>&nbsp;Clear</button>
			<button type="button" class="btn btn btn-primary pull-right btn-right" @click="back">Back</button>
			<!--btnDisabled={{this.btnDisabled}}
			<reject :form="form" vclass="pull-left  btn-left" labelName="Reject" :validator="validator"></reject>-->
		</div><br />

	</div>
</template>

<script>
	export default {
		name: "SignatureWithReject",
		props: ["otherdata", "uri","saveuri","geturi","vclass","form","labelName","validator"],
		data() {
			var dm = {};
			dm.option= {penColor: "rgb(0, 0, 0)"};
			dm.imgdata="";
			dm.imgdataSupervisor="";
			dm.imgdataOfficer="";
			dm.showmsg=false;
			dm.msg="";
			//dm.cwpsForm="";
			dm.supervisor=false;
			dm.officer=false;
			dm.onSite=false;
			dm.color="black";
			dm.colorofficer="black";
			dm.colorsupervisor="black";
			dm.dgCommitment="";

			


			return dm;
		},
		methods: {
			completeTask:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"approve",this.form,function(data){
					//$('#approveModal').modal('toggle');
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#approveModal').modal('toggle');
						setTimeout(function(){
							//if(process.env.MODE === 'apon'){
							//	top.location.href = Config.getAPONURL();
							//}else{
								router.push({ path: '/index/cePermitTask'});//cePermitTask  task
							//}
						},100);
					},800);
					$("#vue_approve_btn").removeAttr("disabled");
				});
			},
			approve: function () {
				$("#vue_approve_btn").attr("disabled","true");
				this.$emit("beforeapprovel");
				//查一遍签名表
				var getSignatureFn=this.getSignature;
				getSignatureFn();
				//alert("查一遍签名表结束");
				var saveFn = this.save;
				saveFn();//保存签名
				//alert("保存签名结束");

				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
					$("#loadingMask,#progressBar").show();
					var completeTaskFn = this.completeTask;
					this.$root.actProcessType="approve";
					var validatorFn = this.validator;
					var _this=this;
					setTimeout(function(){
						if(validatorFn){
							validatorFn.validateAll().then(result => {
								if (result) {
									completeTaskFn();
								}else{
									//var str='';
									//this.validator.errorBag.all().forEach(function(e){
										//str+=e+'\n';
									//});
								 if(validatorFn.errors.has('terms')){
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();
									//alert("correct them");
									$("#vue_approve_btn").removeAttr("disabled");
								}
							});
						}else{
							completeTaskFn();
						}
					},100);
				}else{
					$("#vue_approve_btn").removeAttr("disabled");
				}
			},
			//保存签名
			save() {
				//this.$emit("beforeapprovel");//CWP 提交时需校验
				if(this.form.approvelstatus == true || this.form.approvelstatus == undefined || this.form.approvelstatus ==null) {
					var _this = this;
					//alert("_this.moreSignature="+_this.moreSignature);
					if(_this.moreSignature){
						//多个签名
						if(_this.$refs.signatureContentSupervisor.isEmpty() && (_this.supervisor==null || _this.supervisor=="" || _this.supervisor==false)) {
							_this.form.approvelstatus=false;
							$.alert("Signature of on-site supervisor person please signature! 作业监护人员请签名确认！");
							_this.showmsg = true;
							_this.msg = "Signature of on-site supervisor person please signature! 作业监护人员请签名确认！";
							return ;
							setTimeout(function() {
								_this.showmsg = false;
								_this.msg = "";
							}, 3000);
						}else {
							if(!_this.$refs.signatureContentSupervisor.isEmpty()){
								var saveSignatureDraftSupervisorFn = this.saveSignatureDraftSupervisor;
								saveSignatureDraftSupervisorFn();
							}
						}
						if(_this.$refs.signatureContentOfficer.isEmpty() && (_this.officer==null || _this.officer=="" || _this.officer==false)){
							_this.form.approvelstatus=false;
							$.alert("Safety officer signature of Vender/VWATJ please signature! 作业单位安全员请签名确认！");
							_this.showmsg = true;
							_this.msg = "Safety officer signature of Vender/VWATJ please signature! 作业单位安全员请签名确认！";
							return ;
							setTimeout(function() {
								_this.showmsg = false;
								_this.msg = "";
							}, 3000);							
						}else {
							// alert("保存 signatureContentOfficer");
							if(!_this.$refs.signatureContentOfficer.isEmpty()){
								var saveSignatureDraftOfficerFn = this.saveSignatureDraftOfficer;
								saveSignatureDraftOfficerFn();
							}
						}
					}
					//Signature of on-site responsibility person：作业单位现场负责人签字确认：
					if(_this.$refs.signature.isEmpty() && (_this.onSite==null || _this.onSite=="" || _this.onSite==false)){
						_this.form.approvelstatus=false;
						//this.form.permitCategory != null && this.form.permitCategory=="Other Dangerous Work"
						if(_this.form.permitCategory != null && _this.form.permitCategory=="Other Dangerous Work"){
							//Signature of responsibility person/ date: （承包商）现场负责人签字/日期
							$.alert("Signature of responsibility person please signature! （承包商）现场负责人请签名确认！");
							_this.msg = "Signature of responsibility person please signature! （承包商）现场负责人请签名确认！";
						}else{
							$.alert("Signature of on-site responsibility person please signature! 作业单位现场负责人请签名确认！");
							_this.msg = "Signature of on-site responsibility person please signature! 作业单位现场负责人请签名确认！";
						}
						_this.showmsg = true;
						return ;
						setTimeout(function() {
							_this.showmsg = false;
							_this.msg = "";
						}, 3000);						
					}else {
						if(!_this.$refs.signature.isEmpty()){
							var saveSignatureDraftFn = this.saveSignatureDraft;
							saveSignatureDraftFn();
						}
					}
				}
			},
			clear() {
				var _this = this;
				_this.imgdata = "";
				_this.imgdataSupervisor = "";
				_this.imgdataOfficer = "";
				if(_this.moreSignature){
					_this.$refs.signatureContentSupervisor.clear();
					_this.$refs.signatureContentOfficer.clear();
				}
				_this.$refs.signature.clear();
				
			},
			back: function () {
				var router = this.$router;
				router.push({ path: '/index/cePermitTask'});
				//if(Config.MODE_TYPE === 'apon'){
				//	top.location.href = Config.getAPONURL();
				//}else{
				//	this.$router.back();
				//}
			},
			completeTaskReject:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"reject",this.form,function(data){
					//$('#rejectModal').modal('toggle');
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#rejectModal').modal('toggle');
						setTimeout(function(){
							//if(process.env.MODE === 'apon'){
							//	top.location.href = Config.getAPONURL();
							//}else{
								router.push({ path: '/index/cePermitTask'});//task  cePermitTask
							//}
						},100);
					},800);
						$("#vue_reject_btn").removeAttr("disabled");
				});
			},
			reject: function () {
				$("#loadingMask,#progressBar").show();
				$("#vue_reject_btn").attr("disabled","true");
				var saveSignatureDraftFn = this.saveSignatureDraft;
				var saveSignatureDraftSupervisorFn = this.saveSignatureDraftSupervisor;
				var saveSignatureDraftOfficerFn = this.saveSignatureDraftOfficer;
				if(this.moreSignature){
					saveSignatureDraftSupervisorFn();
					saveSignatureDraftOfficerFn();
				}
				saveSignatureDraftFn();




				var completeTaskReject = this.completeTaskReject;
				this.$root.actProcessType="reject";
				var validatorFn = this.validator;
				var _this=this;
				//validatorFn.attach("comment","required");
				if(window.commentInterval){
					window.clearInterval(window.commentInterval);
				}
				window.commentTimeout =setTimeout(function(){
					if(JSON.stringify(validatorFn.fields.find({ name: 'comment' }).rules) != "{}"){
						if(validatorFn){
							//拒绝时应该只校验一个comment
							validatorFn.validate('comment').then(result => {//validatorFn.validateAll()是校验所有字段
								if (result) {
									completeTaskReject();
								}else{
									if(validatorFn.errors.has('terms')){
										$.alertApon(_this.$t("checkPolicyNotice"));
									}
									 $.alertApon(_this.$t("rejectCommentNotice"));
									$("#loadingMask,#progressBar").hide();
									$("#vue_reject_btn").removeAttr("disabled");
								}
							});
						}else{
							completeTaskReject();
						}
						window.clearInterval(window.commentInterval);
					}else{
						$("#vue_reject_btn").removeAttr("disabled");
					}
				},100);
			},
			draft:function(){
				var createForm = "";
				//var cwpsForm="";
				var _this=this;
				this.GL.actUtil.query("POST",this.saveuri,this.form,function(data){
					$('#draftModal').modal('toggle');
					var dataJson = JSON.parse(data);
					createForm = dataJson.form;
					//cwpsForm = dataJson.cwps;
					if(dataJson.supervisorValue != null && dataJson.supervisorValue == "true"){
						_this.supervisor=true;
						_this.colorsupervisor="black";
					}else{
						_this.supervisor=false;
						_this.colorsupervisor="red";
					}
					if(dataJson.officerValue != null && dataJson.officerValue == "true"){
						_this.officer=true;
						_this.colorofficer="black";
					}else{
						_this.officer=false;
						_this.colorofficer="red";
					}
					if(dataJson.onsiteValue != null && dataJson.onsiteValue == "true"){
						_this.onSite=true;
						_this.color="black";
					}else{
						_this.onSite=false;
						_this.color="red";
					}
					setTimeout(function(){
						$("#loadingMask,#progressBar").hide();
						$('#draftModal').modal('toggle');
					},800);
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
				//this.$root.eventHub.$on('updateFormData', (cwpsForm) => {});
			},
			saveApprove: function () {
				$("#loadingMask,#progressBar").show();
				var draftFn = this.draft;
				var saveSignatureDraftFn = this.saveSignatureDraft;
				var saveSignatureDraftSupervisorFn = this.saveSignatureDraftSupervisor;
				var saveSignatureDraftOfficerFn = this.saveSignatureDraftOfficer;
				var validatorFn = this.validator;
				var _this=this;
				setTimeout(function(){
					if(validatorFn){
						validatorFn.validateAll().then(result => {
							if (result) {
								if(_this.moreSignature){
									saveSignatureDraftSupervisorFn();
									saveSignatureDraftOfficerFn();
								}
								saveSignatureDraftFn();
								draftFn();
							}else{
								//var str='';
								//this.validator.errorBag.all().forEach(function(e){
									//str+=e+'\n';
								//});
								if(validatorFn.errors.has('terms')){
									$.alert(_this.$t("checkPolicyNotice"));
								}
								$("#loadingMask,#progressBar").hide();
								//alert("correct them");
							}
						});
					}else{
						if(_this.moreSignature){
							saveSignatureDraftSupervisorFn();
							saveSignatureDraftOfficerFn();
						}
						saveSignatureDraftFn();
						draftFn();
					}
				},100);
			},
			//Signature of on-site responsibility person：
			saveSignatureDraft() {
				var _this = this;
				if(!_this.$refs.signature.isEmpty()) {
					var png = _this.$refs.signature.save();
					_this.imgdata = png;
					if(_this.uri) {
						$.ajax({
							url: Config.getBaseURL() + _this.uri,
							data: {
								otherdata: _this.otherdata,
								imgdata: png,
								cwpid:_this.form.id
							},
							type: "post",
							dataType: "json",
							async: false,
							success: function(data) {
								if(data.supervisorValue != null && data.supervisorValue == "true"){
									_this.supervisor=true;
									_this.colorsupervisor="black";
								}else{
									_this.supervisor=false;
									_this.colorsupervisor="red";
								}
								if(data.officerValue != null && data.officerValue == "true"){
									_this.officer=true;
									_this.colorofficer="black";
								}else{
									_this.officer=false;
									_this.colorofficer="red";
								}
								if(data.onsiteValue != null && data.onsiteValue == "true"){
									_this.onSite=true;
									_this.color="black";
								}else{
									_this.onSite=false;
									_this.color="red";
								}
								/* 	var dm = JSON.parse(data);
								if(dm.data=='yes'){*/
								_this.showmsg = true;
								if(_this.form.permitCategory != null && _this.form.permitCategory=="Other Dangerous Work"){
									//Signature of responsibility person/ date: （承包商）现场负责人签字/日期
									_this.msg = "Signature of responsibility person upload success! （承包商）现场负责人签名上传成功！";
								}else{
									_this.msg = "Signature of on-site responsibility person upload success! 作业单位现场负责人签名上传成功！";
								}
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
								//_this.confirm();
								/*}*/
							},
							error: function(msg) {
								// $.alert(msg.responseText);
								_this.showmsg = true;
								_this.msg = msg.responseText
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
							}
						});
					} else {
						$.alert("Please give a uri! 请提供一个后台上传签名的uri！");
					}
				}
				
			},
			//Signature of on-site supervisor person：
			saveSignatureDraftSupervisor() {				
				var _this = this;
				if(!_this.$refs.signatureContentSupervisor.isEmpty()) {
					var pngSupervisor = _this.$refs.signatureContentSupervisor.save();
					_this.imgdataSupervisor = pngSupervisor;
					if(_this.uri) {
						$.ajax({
							url: Config.getBaseURL() + _this.uri,
							data: {
								otherdata: _this.otherdata,
								imgdataSupervisor: pngSupervisor,
								cwpid:_this.form.id
							},
							type: "post",
							dataType: "json",
							async: false,
							success: function(data) {
								if(data.supervisorValue != null && data.supervisorValue == "true"){
									_this.supervisor=true;
									_this.colorsupervisor="black";
								}else{
									_this.supervisor=false;
									_this.colorsupervisor="red";
								}
								if(data.officerValue != null && data.officerValue == "true"){
									_this.officer=true;
									_this.colorofficer="black";
								}else{
									_this.officer=false;
									_this.colorofficer="red";
								}
								if(data.onsiteValue != null && data.onsiteValue == "true"){
									_this.onSite=true;
									_this.color="black";
								}else{
									_this.onSite=false;
									_this.color="red";
								}

								/* 	var dm = JSON.parse(data);
								if(dm.data=='yes'){*/
								_this.showmsg = true;
								_this.msg = "Signature of on-site supervisor person upload success! 作业监护人员签名上传成功！";
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
								//_this.confirm();
								/*}*/
							},
							error: function(msg) {
								// $.alert(msg.responseText);
								_this.showmsg = true;
								_this.msg = msg.responseText
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
							}
						});
					} else {
						$.alert("Please give a uri! 请提供一个后台上传签名的uri！");
					}
				}
				
			},
			saveSignatureDraftOfficer() {
				var _this = this;
				if(!_this.$refs.signatureContentOfficer.isEmpty()) {
					//lert("保存 signatureContentOfficer   2");
					var pngOfficer = _this.$refs.signatureContentOfficer.save();
					_this.imgdataOfficer = pngOfficer;
					if(_this.uri) {
						$.ajax({
							url: Config.getBaseURL() + _this.uri,
							data: {
								otherdata: _this.otherdata,
								imgdataOfficer: pngOfficer,
								cwpid:_this.form.id
							},
							type: "post",
							dataType: "json",
							async: false,
							success: function(data) {
								if(data.supervisorValue != null && data.supervisorValue == "true"){
									_this.supervisor=true;
									_this.colorsupervisor="black";
								}else{
									_this.supervisor=false;
									_this.colorsupervisor="red";
								}
								if(data.officerValue != null && data.officerValue == "true"){
									_this.officer=true;
									_this.colorofficer="black";
								}else{
									_this.officer=false;
									_this.colorofficer="red";
								}
								if(data.onsiteValue != null && data.onsiteValue == "true"){
									_this.onSite=true;
									_this.color="black";
								}else{
									_this.onSite=false;
									_this.color="red";
								}
								//alert("data.onsiteValue="+data.onsiteValue+",data.officerValue="+data.officerValue+",data.supervisorValue="+data.supervisorValue);
								//alert("_this.onSite="+_this.onSite+",_this.officer="+_this.officer+",_this.supervisor="+_this.supervisor);

								/* 	var dm = JSON.parse(data);
								if(dm.data=='yes'){*/
								_this.showmsg = true;
								_this.msg = "Safety officer signature of Vender/VWATJ upload success! 作业单位安全员签名上传成功！";
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
								//_this.confirm();
								/*}*/
							},
							error: function(msg) {
								// $.alert(msg.responseText);
								_this.showmsg = true;
								_this.msg = msg.responseText
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
							}
						});
					} else {
						$.alert("Please give a uri! 请提供一个后台上传签名的uri！");
					}
				}
			},
			getSignature() {
				var _this = this;
					if(_this.geturi) {
						$.ajax({
							url: Config.getBaseURL() + _this.geturi,
							data: {
								otherdata: _this.otherdata,
								cwpid:_this.form.id
							},
							type: "post",
							dataType: "json",
							async: false,
							success: function(data) {
								if(data.supervisorValue != null && data.supervisorValue == "true"){
									_this.supervisor=true;
									_this.colorsupervisor="black";
								}else{
									_this.supervisor=false;
									_this.colorsupervisor="red";
								}
								if(data.officerValue != null && data.officerValue == "true"){
									_this.officer=true;
									_this.colorofficer="black";
								}else{
									_this.officer=false;
									_this.colorofficer="red";
								}
								if(data.onsiteValue != null && data.onsiteValue == "true"){
									_this.onSite=true;
									_this.color="black";
								}else{
									_this.onSite=false;
									_this.color="red";
								}
								//alert("data.onsiteValue="+data.onsiteValue+",data.officerValue="+data.officerValue+",data.supervisorValue="+data.supervisorValue);
								//alert("_this.onSite="+_this.onSite+",_this.officer="+_this.officer+",_this.supervisor="+_this.supervisor);

								/* 	var dm = JSON.parse(data);
								if(dm.data=='yes'){*/
								//_this.confirm();
								/*}*/
							},
							error: function(msg) {
								// $.alert(msg.responseText);
								_this.showmsg = true;
								_this.msg = msg.responseText
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
							}
						});
					}
				}
		},
		mounted() {
			var _this = this;
			setTimeout(function() {
				_this.clear();
			}, 2000);			
		},
		computed:{
			selfApprove:{
				get:function() {
					var uid = localStorage.getItem("uid");
					var selfFlag = (this.form.applicantUserId == uid && this.form.byDeputy) 
					return selfFlag;
				}
			},
			moreSignature:{
				get:function() {
					if(this.form.permitCategory != null && this.form.permitCategory=="Confine Space Permit"){
						return true;
					}else{
						return false;
					}					
				}
			},
			otherDangerousWorkApprove:{
				get:function() {
					if(this.form.permitCategory != null && this.form.permitCategory=="Other Dangerous Work"){
						return true;
					}else{						
						return false;
					}					
				}
			},
			
		},
		watch: {
			
		}
	};
</script>

<style>

</style>
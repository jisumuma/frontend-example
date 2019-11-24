<template>
	<div v-if="this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1">
		<!--
		<button style="margin-right:15px;" v-if="form.status==0" :entityId="entityId" type="button" @click="printClosingDocument()" :class="'btn btn-primary pull-left ' + vclass" >Print Closing Document</button>
		-->
		<button style="margin-right:15px;" v-if="(form.processDefinitionKey =='EclosingApplication' || form.processDefinitionKey =='EclosingApplicationNew') && form.byHRBP && printForm" :entityId="entityId" type="button" @click="printEmployeeExitForm()" :class="'btn btn-primary pull-left ' + vclass" >Print Exit Form</button>
		<button style="margin-right:15px;" v-if="form.processDefinitionKey =='WorkCertificate' && printCertificate" :entityId="entityId" type="button" @click="printType()" :class="'btn btn-primary pull-left ' + vclass" >Print Certificate</button>
		<button style="margin-right:15px;" v-if="form.processDefinitionKey =='BusinessCard' && orgaPrintBusinessCard" type="button" @click="printBusinessCard()" :class="'btn btn-primary pull-left ' + vclass" ><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Business Card</button>
	</div>
</template>

<script>
	export default{
		name: "PrintForm",
		props:['vclass',"entityId","form"],
		methods: {
			printEmployeeExitForm: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/eclosingApplication/printEmployeeExitForm/"+this.form.id+"?token="+Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			},
			printClosingDocument: function() {
				//alert("printClosingDocument="+this.form.id);
				var url = Config.getBaseURL() + "/eclosingApplication/printClosingDocument/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();

			},
			//WorkCertificate
			printType: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/WorkCertificate/printCertificate/" + this.form.id+"?token="+Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			},
			printBusinessCard: function () {
				//alert("printClosingDocument="+this.form.id);
				var url = Config.getBaseURL() + "/BusinessCard/printCard/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			},
		},
		computed: {
			printForm: function(){
				if(this.form.status==0){
					return true;
				}else if(this.form.status==1 && this.form.taskDefinitionKey == null){
					if((this.form.immediateTermination != null && this.form.immediateTermination=='true') 
						|| this.form.ifFse){
						//需要判断第一步：是Immediate Termination \是fse
						return true;
					}else{
						return false;
					}
				}else if(this.form.status==1 && this.form.taskDefinitionKey != null){
					if(this.form.taskDefinitionKey =='directiveSupervisor' 
						|| this.form.taskDefinitionKey =='ehs' 
						|| this.form.taskDefinitionKey =='hrbp' 
						|| this.form.taskDefinitionKey =='departmentHead'){
						return false;
					}else{
						return true;
					}
				}else{
					return false;
				}
			},
			printCertificate:function(){
				if(this.$route.query.taskKey =='hrbpConfirm' 
					&& this.form.certificateType !=null && this.form.certificateType !="" 
					&& this.form.certificateType!='Special Template Certificate'){
					return true;
				}else{
					return false;
				}
			},
			orgaPrintBusinessCard:function(){
				if(this.form.status==0 
					&& this.$route.query.taskKey != null && this.$route.query.taskKey =='hrOrga' 
				){
					return true;
				}else{
					return false;
				}
			}
		}
  	}
</script>

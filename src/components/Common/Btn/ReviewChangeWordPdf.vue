<template>
	<div v-if="form.processDefinitionKey =='JobDescriptionApplication' ">
		<!--
		<button v-if="!selfApprove && reviewChangeShow" type="button" class="btn btn-warning btn-left" @click="goReviewChange" ><i class="fa fa-fw fa-columns"></i>&nbsp;Review Change</button>
		-->
		<!--Orga. Partner审批 显示 -->
		<button title="Word without log" v-if="saveJDas" type="button" class="btn btn-primary btn-left" @click="saveJDasWord"><i class="fa fa-fw fa-file-word-o"></i>&nbsp;Save JD as Word</button>
		<button title="PDF with log" v-if="saveJDas" type="button" class="btn btn-primary btn-left" @click="saveJDasPdf" ><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Save JD as PDF</button>
		<!--
		<button type="button" class="btn btn-primary btn-left" @click="personalInfoGetJd" ><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Personal Info JD</button>
		-->
	</div>
	
</template>

<script>
	export default{
		name: "ReviewChangeWordPdf",
		props:['vclass',"entityId","form"],
		methods: {
			saveJDasPdf:function(){
				//var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsPdf/" + this.form.id +"?token=" + Config.getToken();
				//console.log("url="+url);
				//var showSelectWin = window.open(url);
				//showSelectWin.focus();
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
				var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
				var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsPdf/" + this.form.id + "?token=" + Config.getToken();
				var showSelectWin = window.open(url, 'Save JD as Pdf', 'directories=no,height=' +
					iHeight + ',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width=' +
					iWidth + ',top=' + iTop + ',left=' + iLeft);
				showSelectWin.focus();
			},
			personalInfoGetJd:function(){
				//userinfoid
				var userinfoid="24707";//本地可以的 267143  无JD24707
				console.log("userinfoid="+userinfoid);
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
				var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
				var url = Config.getBaseURL() + "/jobDescriptionApplication/personalInfoGetJd?userinfoid=" + userinfoid + "&token=" + Config.getToken();
				var showSelectWin = window.open(url, 'Save JD as Pdf', 'directories=no,height=' +
					iHeight + ',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width=' +
					iWidth + ',top=' + iTop + ',left=' + iLeft);
				showSelectWin.focus();
			},
			saveJDasWord:function(){
				var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsWord/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			},
			goReviewChange:function(){
				if(this.form.existJd > 0){
					let routeData = this.$router.resolve({ name: 'Home - VWATJ', path: '/index/JobDescriptionApplicationReviewChange/'+this.form.id, query: {  noback: true }});
					window.open(routeData.href, '_blank');
					//let routeData = this.$router.resolve({ name: 'Home - VWATJ', path: '/index/form/JobDescriptionApplication/detail/'+this.form.id, query: {  noback: true }});
					//window.open(routeData.href, '_blank');
				}				
			},
		},
		computed: {
			selfApprove:{
				// 动态计算readonly的值
				get:function() {
					var uid = localStorage.getItem("uid");
					// 是不是审批者自己的单子
					var selfFlag = (this.form.applicantUserId == uid && this.form.byDeputy);
					return selfFlag;
				}
			},
			saveJDas:{
				get:function() {
					var uid = localStorage.getItem("uid");
					if((this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="orgaPartnerFillFG")
						&& this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
						console.log("saveJDas 1 true");
						return true;
					}else if(this.form.roleType=="Orga Partner" && this.$route.query.taskKey == null && this.form.applicantUserId == uid){
						console.log("saveJDas 2 true");
						return true;
					}else{
						console.log("saveJDas false");
						return false;
					}
				}
			},
			reviewChangeShow:{
				// 动态计算readonly的值
				get:function() {
					if(this.form.applicationType=="Update of existing JD" && 
						(this.$route.query.taskKey =="orgaPartner" || this.$route.query.taskKey =="directSupervisor" 
						|| this.$route.query.taskKey =="bomBOMC" || this.$route.query.taskKey =="bomBOMT" 
						|| this.$route.query.taskKey =="orgaPartnerBOMC" || this.$route.query.taskKey =="orgaPartnerBOMT"
						|| (this.form.roleType=="Orga Partner" && this.$route.query.taskKey =="headOfCho" 
						&& (this.form.reportToFuncton!="General Manager Commercial" && this.form.reportToFuncton!="General Manager Technical") 
        				&& (this.form.positionName!="BoM Assistant" && this.form.positionName!="BoM Secretary"))) 
						&& this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
						return true;
					}else{
						return false;
					}
				}
			},
		}
  	}
</script>

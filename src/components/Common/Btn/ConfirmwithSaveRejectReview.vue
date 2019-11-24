<template>
	<div class="row">
	    <div class="col-xs-12">
    		<back :vclass="vclass"></back>
			<!-- orgaPartner 节点有save\approve\reject按钮 
        	<save v-if="!selfApprove && saveBtnShow " :form="form" :uri="uri" vclass="pull-left" ></save>
			-->
	    	<approve v-if="!selfApprove" :form="form" vclass="pull-left" :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
	    	<reject v-if="!selfApprove" :form="form" vclass="pull-left btn-left" :labelName="realrejectLableName" :validator="validator"></reject>
			
			<!--Orga. Partner审批 显示 -->
			<button type="button" title="PDF with log" :class="'btn btn-primary pull-right ' + vclass" style="margin-right:15px;" @click="saveJDasPdf" ><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Save as PDF</button>
			<button type="button" title="Word without log" :class="'btn btn-primary pull-right ' + vclass" style="margin-right:15px;" @click="saveJDasWord"><i class="fa fa-fw fa-file-word-o"></i>&nbsp;Save as Word</button>
			<!--
			<button v-if="!selfApprove && reviewChangeShow" type="button" :class="'btn btn-warning pull-right ' + vclass" style="margin-right:15px;" @click="goReviewChange" ><i class="fa fa-fw fa-columns"></i>&nbsp;Review Change</button>
			-->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmwithSaveRejectReview',
		props:['vclass',"uri","form","validator","lableName","rejectLableName"],
		methods:{
	    	beforeapprovel:function(){
	    		 this.$emit("beforeapprovel");
			},
			saveJDasPdf:function(){
				//$.alert("未实现");
				console.log("this.form.id="+this.form.id);
				//var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsPdf/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
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
			saveJDasWord:function(){
				//$.alert("未实现");
				console.log("this.form.id="+this.form.id);
				var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsWord/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				console.log("url="+url);
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			},
			goReviewChange:function(){
				if(this.form.existJd > 0){
					let routeData = this.$router.resolve({ name: 'Home - VWATJ', path: '/index/JobDescriptionApplicationReviewChange/'+this.form.id, query: {  noback: true }});
					window.open(routeData.href, '_blank');
					//obj.document.title="Review Change Page";
					//let routeData = this.$router.resolve({ name: 'Home - VWATJ', path: '/index/form/JobDescriptionApplication/detail/'+this.form.id, query: {  noback: true }});
					//window.open(routeData.href, '_blank');
				}				
			},
			saveJDasPdf2:function(){
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL() + "/form/JobDescriptionApplication/print?id=" + this.form.id + "&token=" + Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			},
    	},
		computed:{
			realrejectLableName: {
				get:function(){
					if(this.rejectLableName){
						return this.rejectLableName;
					}
					return "Reject";
				}
			},
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
					if(this.$route.query.taskKey =="orgaPartner"){
						return true;
					}else{
						return false;
					}
				}
			},
			reviewChangeShow:{
				// 动态计算readonly的值
				get:function() {
					if(this.form.applicationType=="Update of existing JD"){
						return true;
					}else{
						return false;
					}
				}
			},


		}
	}
</script>

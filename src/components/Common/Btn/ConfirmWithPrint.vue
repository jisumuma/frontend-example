<template>
	<div class="row">
	    <div class="col-xs-12">
        	<back :vclass="vclass"></back>
			<div v-if="this.deputySelfApprove">
				<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator"></approve>
				<!--
				<ConfirmAndPrint :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator"></ConfirmAndPrint>
				-->
			</div>
			<!--
			<button style="margin-right:15px;" v-if="form.status==1" :entityId="entityId" type="button" @click="printClosingDocument()" :class="'btn btn-primary pull-right ' + vclass" >Print Closing Document</button>
			-->
			<button style="margin-right:15px;"  :entityId="entityId" type="button" @click="printEmployeeExitForm()" :class="'btn btn-primary pull-right ' + vclass" >Print Exit Form</button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmWithPrint',
		props:['vclass',"form","validator","lableName","entityId"],
		computed:{
			deputySelfApprove:{
				get:function(){
					//非平行审批，并且是代理，并且是本人申请的
					if(this.form.ifDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
						return false;//无按钮
					}else{
						return true;//有按钮
					}
				}
			}
		},
		methods:{
			print: function () {
				//alert("this.entityId="+this.entityId);
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/form/"+this.entityId+"/print?id="+this.form.id+"&token="+Config.getToken();
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

			},printEmployeeExitForm: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/eclosingApplication/printEmployeeExitForm/"+this.form.id+"?token="+Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			}
    	}
	}
</script>

<template>
	<div class="row">
	    <div class="col-xs-12">
			<back :vclass="vclass"></back>
			<print :form="form" :entityId="entityId"></print>
			<div v-if="this.deputySelfApprove">
				<save  :form="form" :uri="uri" vclass="pull-left" ></save>
				<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
			</div>
			<button style="margin-right:15px;" v-if="form.status==1" :entityId="entityId" type="button" @click="printEmployeeExitForm()" :class="'btn btn-primary pull-right ' + vclass" >Print Exit Form</button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmwithSavePrint',
		props:['vclass',"uri","form","validator","lableName","entityId"],
		computed:{
			deputySelfApprove:{
				get:function(){
					//平行审批，并且是代理，并且是本人申请的
					if(this.$route.query.taskKey == 'parallelDirectiveSupervisor' || this.$route.query.taskKey == 'parallelHrbp' 
						|| this.$route.query.taskKey == 'administrationOfficer1' || this.$route.query.taskKey == 'administrationOfficer2' || this.$route.query.taskKey == 'administrationOfficer3' || this.$route.query.taskKey == 'administrationOfficer4' 
						|| this.$route.query.taskKey == 'trainingOfficer' || this.$route.query.taskKey == 'parallelEHS' || this.$route.query.taskKey == 'parallelEHSOHC' 
						|| this.$route.query.taskKey == 'itOfficer' || this.$route.query.taskKey == 'financeAccountant' 
						|| this.$route.query.taskKey == 'hrcb'  || this.$route.query.taskKey == 'hrcb2' 
					){
						if(this.form.ifHasConfirm){
							return true;//有按钮
						}else{
							return false;//无按钮
						}
					}else{//非平行审批，并且是代理，并且是本人申请的
						if(this.form.ifDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
							return false;//无按钮
						}else{
							return true;//有按钮
						}
					}
				}
			}
		},
    	methods:{
			beforeapprovel:function(){
				this.$emit("beforeapprovel");
			},
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
			}
    	}
	}
</script>

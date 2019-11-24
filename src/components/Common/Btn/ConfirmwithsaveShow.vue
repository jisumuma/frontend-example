<template>
	<div class="row">
	    <div class="col-xs-12">
			<back :vclass="vclass"></back>
			<div v-if="this.deputySelfApprove">
				<!--ifHasConfirm={{this.form.ifHasConfirm}};processTaskKey={{this.$route.query.taskKey}};
			deputySelfApprove={{this.deputySelfApprove}} -->
				<save  :form="form" :uri="uri" vclass="pull-left" ></save>
				<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmwithsaveShow',
		props:['vclass',"uri","form","validator","lableName"],
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
			}
		}
	}
</script>

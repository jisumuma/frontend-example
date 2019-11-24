<template>
	<div class="row">
	    <div class="col-xs-12">
			<back :vclass="vclass"></back>
			<div v-if="this.deputySelfApprove">
				<!--ifHasConfirm={{this.form.ifHasConfirm}}-->
				<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator"></approve>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmShow',
		props:['vclass',"form","validator","lableName"],
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
		}
	}
</script>

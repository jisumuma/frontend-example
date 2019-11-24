<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
        	<save v-if="!selfApprove" :form="form" :uri="uri" vclass="pull-left" ></save>
	    	<approve v-if="!selfApprove" :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
	    	<reject v-if="!selfApprove" :form="form" vclass="pull-left  btn-left" :labelName="realrejectLableName" :validator="validator"></reject>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Confirmwithsavereject',
		props:['vclass',"uri","form","validator","lableName","rejectLableName"],
		methods:{
	    	beforeapprovel:function(){
	    		 this.$emit("beforeapprovel");
	    	}
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
			}
		}
	}
</script>

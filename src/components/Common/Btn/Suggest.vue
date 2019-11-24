<template>
	<div class="row">
	    <div class="col-xs-12 approval">
        <back :vclass="vclass"></back>
	    	<approve :form="form" vclass="pull-left" :labelName="realApproveLabelName" :validator="validator" v-on:beforeRealApprovel="beforeRealApprovel"></approve>
	    	<reject :form="form" :vclass="vclass" :labelName="realRejectLabelName" :validator="validator"></reject>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Suggest',
		props:['vclass',"form","validator","approveLabelName","rejectLabelname"],
		methods:{
	    	beforeRealApprovel:function(){
	    		this.$emit("beforeRealApprovel");
			}
		},
		computed:{
			realApproveLabelName:{
				get: function(){
					if(this.approveLabelName){
						return this.approveLabelName;
					}else{
						return "Approve";
					}
				}
			},
			realRejectLabelName:{
				get: function(){
					if(this.rejectLabelname){
						return this.rejectLabelname;
					}else{
						return "Reject";
					}
				}
			}
		}
	}
</script>

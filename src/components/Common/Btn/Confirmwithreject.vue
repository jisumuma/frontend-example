<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
	    	<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
	    	<reject :form="form" vclass="pull-left  btn-left" :labelName="realrejectLableName" :validator="validator"></reject>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Confirmwithreject',
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
			}
		}
	}
</script>

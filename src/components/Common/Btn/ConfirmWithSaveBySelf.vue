<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
            <save :form="form" :uri="uri" vclass="pull-left" ></save>
	    	<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
	    	
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmWithSaveBySelf',
		props:['vclass',"form","validator","lableName","uri",],
		methods:{
	    	beforeapprovel:function(){
	    		 this.$emit("beforeapprovel");
	    	}
    	}
	}
</script>

<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
        	<saveToConfirm :form="form" :uri="uri" vclass="pull-left  btn-left" :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel" ></saveToConfirm>
	  		
	    </div>
	</div>
</template>
<script>
	export default {
		name: 'Savewithback',
		props:['vclass',"uri","form","validator","lableName"],
		methods:{
	    	beforeapprovel:function(){
	    		 this.$emit("beforeapprovel");
	    	}
    	},
	}
</script>

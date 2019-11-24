<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
	    	<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
	    	<button v-if="form.processDefinitionKey =='JobDescriptionApplication'" type="button" :class="'btn btn-primary pull-right ' + vclass" style="margin-right:15px;" @click="saveJDasPdf" ><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Save as PDF</button>
			<button v-if="form.processDefinitionKey =='JobDescriptionApplication'" type="button" :class="'btn btn-primary pull-right ' + vclass" style="margin-right:15px;" @click="saveJDasWord"><i class="fa fa-fw fa-file-word-o"></i>&nbsp;Save as Word</button>

		</div>
	</div>
</template>
<script>
	export default {
		name: 'Confirm',
		props:['vclass',"form","validator","lableName", "validon"],
		methods:{
	    	beforeapprovel:function(){
				if(this.validon) {
					this.$emit("beforeapprovel");
				}
	    	}
    	   }
	}
</script>

<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
        	 <update :form="form" vclass="pull-left "   :validator="validator"></update>
	    	<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator"></approve>
	    	
		</div>
	</div>
</template>
<script>
	export default {
		name: 'SaveSubmitAndBack',
		props:['vclass',"uri","form","validator","lableName"]
	}
</script>

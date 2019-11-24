<template>
	<div class="row">
	    <div class="col-xs-12">
          <back :vclass="vclass"></back>
           <approve :form="form" vclass="pull-left  btn-left"  		labelName="Confirm" :validator="validator"></approve>
			<PrintNotice :form="form" vclass="pull-left  btn-left"   ></PrintNotice>
	    	
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmWithSendEmail',
		props:['vclass',"form","validator","lableName"]
	}
</script>

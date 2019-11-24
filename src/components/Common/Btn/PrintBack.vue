<template>
	<div class="row">
	    <div class="col-xs-12">
	    	<back :vclass="vclass"></back>
	    	<print :vclass="vclass" :form="form" :entityId="entityId"></print>
	    </div>
	    <router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: "Vform",
    props:['vclass',"form","entityId"]
  }
</script>
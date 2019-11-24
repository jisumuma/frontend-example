<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>

			<!--<draft  :form="form" :uri="uri" :validator="validator"></draft>-->
			  <draft :form="form" :uri="uri" ></draft>
        <submitAndPrint :form="form" :entityId="entityId" :vclass="vclass" :validator="validator"  v-on:beforesubmit="beforesubmit"></submitAndPrint>
	    </div>
	    <router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: "VformAndPrint",
    props:['form','uri',"vclass","validator","entityId"],
    methods:{
    	beforesubmit:function(){
    		 this.$emit("beforesubmit");
    	}
    }
  }
</script>

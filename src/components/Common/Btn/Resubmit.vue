<template>
	<div class="row">
	    <div class="col-xs-12">
        <back :vclass="vclass"></back>
		
        <draft :form="form" :uri="uri" style="margin-right:25px;" vclass="pull-left" ></draft>
		<ReSubmit4BlueCollar v-if="this.form.processDefinitionKey == 'OverTimeBlue'" :form="form" :uri="uri" :vclass="vclass" :validator="validator"  v-on:beforesubmit="beforeapprovel" chooseID="otb"></ReSubmit4BlueCollar>
        <approve v-else :form="form" vclass="pull-left  btn-left" style="padding-right:25px;" labelName="Resubmit" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
		
        <cancel v-if="showCancel" :form="form" vclass="pull-left  btn-left" :uri="cancelURI" labelName="Cancel" ></cancel>
	    </div>
	    <router-view></router-view>
	</div>
</template>

<script>
  import Cancel from "./Cancel";
  export default{
    components: {Cancel}, name: "Resubmit",
    props:['vclass','uri',"form","validator"],
    methods:{
	    	beforeapprovel:function(){
	    		 this.$emit("beforeapprovel");
	    	}
    },
    mounted(){
      //console.log(this.cancelURI);
    },
    computed:{
        cancelURI: {
            get: function(){
              var id = this.$route.params.id || this.$route.query.id;
              return this.uri.replace("update","cancel") + "/"+id;
            }
        },
		showCancel: {
            get: function(){
              return ( this.form.processDefinitionKey != 'QuotationProcessApplication' 
                && this.form.processDefinitionKey != 'EclosingApplication' 
                && this.form.processDefinitionKey != 'EclosingApplicationNew' );
            }
        }
    }
  }
</script>

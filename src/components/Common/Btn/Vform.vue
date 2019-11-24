<template>
	<div class="row">
	    <div class="col-xs-12">
		<back :vclass="vclass"></back>
		<Invalid :form="form" :uri="uri" vclass="pull-left" :validator="validator"></Invalid>
		<!--<draft  :form="form" :uri="uri" :validator="validator"></draft>-->

		<draft v-if="showWhiteCollarSave" :form="form" :uri="uri" vclass="btn-left" :validator="validator" v-on:beforesubmit="beforesubmit" ></draft>
		<draft v-else :form="form" :uri="uri" vclass="btn-left"  v-on:beforesubmit="beforesave"></draft>
		
		<Submit4BlueCollar v-if="showBuleCollarSubmit" :form="form" :uri="uri" :vclass="vclass" :validator="validator"  v-on:beforesubmit="beforesubmit" chooseID="otb"></Submit4BlueCollar>
		<Submit4WhiteCollar v-else-if="showWhiteCollarBatch" :form="form" :uri="uri" :vclass="vclass" :validator="validator"  v-on:beforesubmit="beforesubmit"></Submit4WhiteCollar>
		<submit v-else-if="otherSubmit" :form="form" :vclass="vclass" :validator="validator"  v-on:beforesubmit="beforesubmit"></submit>
	    </div>
	    <router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: "Vform",
    props:['form','uri',"vclass","validator"],
    computed:{
		showWhiteCollarSave:{
			get:function() {
				if(this.form.processDefinitionKey == "OverTimeWhite" && this.form.batchSubmit=='false') {
					return true;
				} else {
					return false;
				}
			}
		},
		otherSubmit:{
			get:function() {
				if(this.form.processDefinitionKey != "OverTimeBlue" && this.form.processDefinitionKey != "OverTimeWhite") {
					return true;
				} else {
					return false;
				}
			}
		},
		showBuleCollarSubmit:{
			get:function() {
				if(this.form.processDefinitionKey == "OverTimeBlue") {
					return true;
				} else {
					return false;
				}
			}
		},
		showWhiteCollarBatch:{
			get:function() {
				if(this.form.processDefinitionKey == "OverTimeWhite" && this.form.batchSubmit=='true') {
					return true;
				} else {
					return false;
				}
			}
		}
	},
    methods:{
    	beforesubmit:function(){
    		 this.$emit("beforesubmit");
    	},
		beforesave:function(){
    		 this.$emit("beforesave");
    	}
    }
  }
</script>

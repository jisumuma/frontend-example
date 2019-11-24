<template>
    <select :id="'select-'+name" v-validate="'required'" :class="{'form-control':true,'select2': true, 'is-danger': errors.has(name) }"  v-select2='options' :disabled="disabled" :uri="uri" v-model="selectValue" :name="name" :data-value="value" :required="required"  @change="change"></select>
</template>
<script>
  export default{
    name: "Velect",
    props:["options","uri","name","value","disabled","required"],
	computed:{
		selectValue: {
			// 动态计算selectValue的值
			get:function() {
				return this.value;
			},
			set:function(val) {
				this.$emit('input', val);
			}
		}
	},
	methods:{
		change: function (){
	      this.$emit('change');
	    }
	}
  }
</script>

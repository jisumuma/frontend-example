<template>
  <div :id="divid">
    <!-- invalidate 使用-->
    <textarea v-model="modelValue" :rows="rowsvalue" :placeholder="placeholder" :id="id" :name="name" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }"></textarea>
    <p>{{limitSize}}{{$t("textareaNotice1")}}{{limitSize}}{{$t("textareaNotice2")}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Textarea3',
    props:["name","value","readonly","placeholder","otherRules","maxlength","disabled","id","rows","limit"],
    inject: {
      $validator: '$validator'
    },
    data(){
      return {isRequired:false,divid:this.generateUUID()+"-"+new Date().getTime(),
        limitSize:this.limit?this.limit:300}
    },
    watch: {
      "value":{
        handler(curVal,oldVal){
          this.modelValue=curVal;
        },
        deep:true
      }
    },
    computed:{
      modelValue:{
        // 动态计算modelValue的值
        get:function() {
          if(this.value){
            return this.value;
          }else{
            return "";
          }
        },
        set:function(val) {
          this.$emit('input', val);
        }
      },
      rules:{
        // 动态计算rules的值
        get:function() {
          return this.getRules();
        }
      },
      rowsvalue:{
        get:function() {
          if(this.rows){
            return this.rows;
          }
          return 2;
        }
      }

    },
    methods:{
      generateUUID:function(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
      },
      getRules:function(){
        var formValid = this.$route.query.formValid;
        if(!formValid){
          formValid={};
        }
        var fieldRules = formValid[this.name];
        var rules="";
        if(this.otherRules){
          rules = this.otherRules+"|";

          if(this.otherRules.indexOf('required')!=-1){
            this.isRequired = true;
          }
        }
        if(fieldRules){
          rules += fieldRules;
          if(fieldRules.indexOf('required')!=-1){
            this.isRequired = true;
          }
        }
        return rules;
      }
    }
  }
</script>

<style>
</style>

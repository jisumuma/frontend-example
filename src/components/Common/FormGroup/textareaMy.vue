<template>
  <div :id="divid">
    <textarea v-model="modelValue" :rows="rowsvalue" :placeholder="placeholder" :id="id" :name="name" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }"></textarea>
    <p>{{limitSize}}{{$t("textareaNotice1")}}{{limitSize}}{{$t("textareaNotice2")}}</p>
  </div>
</template>

<script>
  export default {
    name: 'TextareaMy',
    props:["name","value","readonly","placeholder","otherRules","maxlength","disabled","id","rows","limit"],
    inject: {
      $validator: '$validator'
    },
    data(){
      return {
        isRequired:false,
        divid:this.generateUUID()+"-"+new Date().getTime(),
        limitSize:this.limit?this.limit:300
      }
    },
    watch: {
      "value":{
        handler(curVal,oldVal){
          this.modelValue=curVal;
        },
        deep:true
      }
    },
    mounted(){
      var _this=this;
      $("div#"+_this.divid).on('input','textarea.form-control',function() {
        var reg =/^[0-9]*$/;
        if($(this).attr("readonly")) {
          //只读不做操作
        } else {
          if($(this).val()) {
            var value=$(this).val();
            var newvalue = value.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;

            //当填写的字节数小于设置的字节数
            if (length * 1 <=_this.limitSize * 1){
              return;
            }
            var limitDate = newvalue.substr(0, _this.limitSize);
            var count = 0;
            var limitvalue = "";
            for (var i = 0; i < limitDate.length; i++) {
              var flat = limitDate.substr(i, 1);
              if (flat == "*") {
                count++;
              }
            }
            var size = 0;
            var istar = newvalue.substr(_this.limitSize * 1 - 1, 1);//校验点是否为“×”

            //if 基点是×; 判断在基点内有×为偶数还是奇数
            if (count % 2 == 0) {
              //当为偶数时
              size = count / 2 + (_this.limitSize * 1 - count);
              limitvalue = value.substr(0, size);
            } else {
              //当为奇数时
              size = (count - 1) / 2 + (_this.limitSize * 1 - count);
              limitvalue = value.substr(0, size);
            }
            _this.modelValue=limitvalue;
            $.alertApon(_this.limitSize+' Characters Max. 最多只能填写'+_this.limitSize+'个字节。');
          }
        }
      });
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

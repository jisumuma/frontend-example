<template>
    <div class="checkbox overflow-auto mar-0" :class="{'is-danger':errors.has('reportedCoiType')}" id="coiReportTypeCheckBoxDiv">
    <label class="col-md-3">
      <input type="checkbox" name="reportedCoiType" v-model="reportedColTypeI" value="Type I" :disabled="disabledCon"
        v-validate="'required'" :class="{'is-danger':errors.has('reportedCoiType')}"> Type I  
    </label >
    <label class="col-md-3">
      <input type="checkbox" name="reportedCoiType" v-model="reportedColTypeII" value="Type II" :disabled="disabledCon"> Type II 
    </label>
    <label class="col-md-3">
      <input type="checkbox" name="reportedCoiType" v-model="reportedColTypeIII" value="Type III" :disabled="disabledCon"> Type III
    </label>
    <label class="col-md-3">
      <input type="checkbox" name="reportedCoiType" v-model="reportedColTypeIV" value="Type IV" :disabled="disabledCon"> Type IV 
    </label>
  </div>
</template>

<script>
	export default {
		name: "CoiReportTypeCheckBox",
    props:["cvals", "disabledCon"],
    inject: {
			$validator: '$validator'
		},
    data(){
      if(this.cvals){
        return {
          "cvalArrs" : this.cvals.split(",")
        };
      }else{
        return {
          "cvalArrs" : ["0", "0", "0", "0"]
        }
      }
    },
		methods: {

		},
		mounted() {
      // $(".checkbox overflow-auto").on("click", "checkbox", function(){
      //   sendFinalResultToParent($(".checkbox overflow-auto checkbox").map(function(){
      //     if($(this).prop("checked")){
      //       return "1";
      //     }else{
      //       return "0";
      //     }
      //   }).get().join(","));
      // });
      // console.log("mounted!");
	  },
    computed:{
        reportedColTypeI:{
          get:function(){
            //console.log(this.$data.cvalArrs);
            return (this.$data.cvalArrs[0] === "0") ? "": "Type I";
          },
          set:function(val){
            this.$emit("callbackfunction", $("#coiReportTypeCheckBoxDiv :input").map(function(){
                                                if($(this).prop("checked")){
                                                  return "1";
                                                }else{
                                                  return "0";
                                                }
                                              }).get().join(","));
          }
        },
        reportedColTypeII:{
          get:function(){
            return (this.$data.cvalArrs[1] === "0") ? "": "Type II";
          },
          set:function(val){
            this.$emit("callbackfunction", $("#coiReportTypeCheckBoxDiv :input").map(function(){
                                                if($(this).prop("checked")){
                                                  return "1";
                                                }else{
                                                  return "0";
                                                }
                                              }).get().join(","));
          }
        },
        reportedColTypeIII:{
          get:function(){
            return (this.$data.cvalArrs[2] === "0") ? "": "Type III";
          },
          set:function(val){
            this.$emit("callbackfunction", $("#coiReportTypeCheckBoxDiv :input").map(function(){
                                                if($(this).prop("checked")){
                                                  return "1";
                                                }else{
                                                  return "0";
                                                }
                                              }).get().join(","));
          }
        },
        reportedColTypeIV:{
          get:function(){
            return (this.$data.cvalArrs[3] === "0") ? "": "Type IV";
          },
          set:function(val){
            this.$emit("callbackfunction", $("#coiReportTypeCheckBoxDiv :input").map(function(){
                                                if($(this).prop("checked")){
                                                  return "1";
                                                }else{
                                                  return "0";
                                                }
                                              }).get().join(","));
          }
        }
    }
	}
</script>

<style>

</style>
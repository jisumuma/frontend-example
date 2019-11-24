<template>
	<div class="row">
	    <div class="col-xs-12">
	    	<back :vclass="vclass"></back>
			  <WithDraw v-if="draft"  :form="form" :uri="uri" ></WithDraw>
			  <PrintNotice   :form="form" vclass="pull-left  btn-left"   ></PrintNotice>
			  <PrintForm :form="form" :entityId="entityId"></PrintForm>
        <print :form="form" :entityId="entityId"></print>
	<Invalidate :form="form" :entityId="entityId"></Invalidate>
	    </div>
	    <router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: "DetailForm",
    props:['form','uri',"vclass","validator","entityId"],
    data(){
      return {
        draft:false
      }
    },
    methods: {
      isDraft:function() {
          var isfinish=this.isfinish;
          var me = this ;
          //判断是不是流程第一步;如果是第一步则显示withDraw按钮
          $.ajax({
            url: Config.getBaseURL() + "/base/findApprovalList?processInstanceId="+this.form.processInstanceId,
            data: {
              //"processInstanceId":data['processInstanceId'],
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {
              //console.log("--"+data);
              if((me.form.processDefinitionKey != 'OverTimeWhiteSheet' && me.form.processDefinitionKey != 'OverTimeWhiteSheets') && data=="1" &&isfinish){
                if((me.form.processDefinitionKey == 'EclosingApplication' || me.form.processDefinitionKey == 'EclosingApplicationNew' ) 
                && ( me.form.immediateTermination != null && (me.form.immediateTermination==true || me.form.immediateTermination=='true') 
                || me.form.ifFse)){
                  me.draft= false ;
                }else if(me.form.processDefinitionKey == 'OverTimeWhite' && me.form.appStatus == 'fetched by dept head' ) {
                  me.draft= false ;
                }else{
                  me.draft= true ;
                }
              }else{
                me.draft= false ;
              }
            },
            error: function(msg) {
              alert(msg);
            }
          });
        }
    },
    mounted(){
          this.isDraft();
    },
    computed:{
       isfinish:{
        get:function() {
				   return this.form.status!=0;
				}
       }
    },

  }
</script>

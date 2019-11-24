<template>
	<div class="row">
	    <div class="col-xs-12">
		  <back :vclass="vclass"></back>
          <button v-if="showPrintCertificate" type="button" @click="printType()" :class="'btn btn-primary pull-left ' + vclass"><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Print Certificate</button>
          <approve v-if="showFinishBtn || this.showFinishBtn2" :form="form" vclass="pull-left  btn-left" labelName="Finish" :validator="validator"></approve>
			<!--
			finishSHow={{this.form.finishSHow}};showFinishBtn2={{this.showFinishBtn2}}-->
	   </div>
   </div>
</template>

<script>
	export default {
		name: 'PrintAndFinished',
		props:['vclass',"form","labelName","validator","entityId"],
		data() {
			var dm = {};
			dm.showFinishBtn2=false;
			return dm;
		},
		methods: {
	        printType: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/WorkCertificate/printCertificate/" + this.form.id+"?token="+Config.getToken();
				if(this.form.status=="0"){
					url=Config.getBaseURL()+"/form/"+this.entityId+"/print?id="+this.form.id+"&token="+Config.getToken();
				}
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
				//审批完了，在我的审核页面打开，不应该出现
				//这时候状态为0
				if(this.form.status!="0"){
					this.showFinishBtn2=true;
				}
			},
		},
		mounted() {
			
		},
		watch: {
			"showFinishBtn2":{
				handler(curVal,oldVal){
					console.log("showFinishBtn2="+this.showFinishBtn2);
					if(this.showFinishBtn2){
						this.form.finishSHow=="1";
					}else{
						this.form.finishSHow=="0";
					}
					this.$nextTick(() => {
					});
				},
				deep:true
			},
		},
		computed:{
			showFinishBtn:{
				get:function() {
					if(this.form.finishSHow=="1"){
						return true;
					}else if(this.form.certificateType=="Special Template Certificate"){
						return true;
					}else{
						return false;
					}
				}
			},
			showPrintCertificate:{
				get:function() {
					if(this.form.certificateType=="Special Template Certificate"){
						return false;
					}else{
						return true;
					}
				}
			},
		}
	}
</script>

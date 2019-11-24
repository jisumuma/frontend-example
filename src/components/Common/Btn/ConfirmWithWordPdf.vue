<template>
	<div class="row">
	    <div class="col-xs-12">
        	<back :vclass="vclass"></back>
	    	<approve :form="form" vclass="pull-left  btn-left"  :labelName="lableName" :validator="validator" v-on:beforeapprovel="beforeapprovel"></approve>
	    	<!--Orga. Partner审批 显示 -->
			<button title="PDF with log" type="button" :class="'btn btn-primary pull-right ' + vclass" style="margin-right:15px;" @click="saveJDasPdf" ><i class="fa fa-fw fa-file-pdf-o" ></i>&nbsp;Save as PDF</button>
			<button title="Word without log" type="button" :class="'btn btn-primary pull-right ' + vclass" style="margin-right:15px;" @click="saveJDasWord"><i class="fa fa-fw fa-file-word-o" ></i>&nbsp;Save as Word</button>
			
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ConfirmWithWordPdf',
		props:['vclass',"form","validator","lableName", "validon"],
		methods:{
	    	beforeapprovel:function(){
				if(this.validon) {
					this.$emit("beforeapprovel");
				}
			},
			saveJDasPdf:function(){
				//$.alert("未实现");
				console.log("this.form.id="+this.form.id);
				//var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsPdf/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				//console.log("url="+url);
				//var showSelectWin = window.open(url);
				//showSelectWin.focus();

				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
				var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
				var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsPdf/" + this.form.id + "?token=" + Config.getToken();
				var showSelectWin = window.open(url, 'Save JD as Pdf', 'directories=no,height=' +
					iHeight + ',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width=' +
					iWidth + ',top=' + iTop + ',left=' + iLeft);
				showSelectWin.focus();
			},
			saveJDasWord:function(){
				//$.alert("未实现");
				console.log("this.form.id="+this.form.id);
				var url = Config.getBaseURL() + "/jobDescriptionApplication/goJdaSaveAsWord/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				console.log("url="+url);
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			},
    	}
	}
</script>

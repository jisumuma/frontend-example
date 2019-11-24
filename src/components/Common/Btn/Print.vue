<template>
	<div v-if="form.status==0 || form.status==3">
		<button v-if="(form.processDefinitionKey != 'EclosingApplication' && form.processDefinitionKey != 'EclosingApplicationNew') && (form.status==0 || form.status==3)" type="button" @click="print()" :class="'btn btn-primary pull-left ' + vclass" >Print</button>
		<button v-if="form.processDefinitionKey =='EclosingApplication' && form.status==0" type="button" @click="print()" :class="'btn btn-primary pull-left ' + vclass" >Print All</button>
	    <button v-if="form.processDefinitionKey =='EclosingApplicationNew' && form.status==0" type="button" @click="printNew()" :class="'btn btn-primary pull-left ' + vclass" >Print All</button>

		<!--
		<button style="margin-left:15px;" v-if="form.processDefinitionKey =='BusinessCard' && form.status==0" type="button" @click="printBusinessCard()" :class="'btn btn-primary pull-left ' + vclass" ><i class="fa fa-fw fa-file-pdf-o"></i>&nbsp;Business Card</button>
		-->
	</div>
</template>

<script>
	export default{
		name: "Print",
		props:['vclass',"entityId","form"],
		methods: {
			print: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/form/"+this.entityId+"/print?id="+this.form.id+"&token="+Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			},
			printNew: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/form/"+this.entityId+"/print?id="+this.form.id+"&token="+Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			},
			printBusinessCard: function () {
				//alert("printClosingDocument="+this.form.id);
				var url = Config.getBaseURL() + "/BusinessCard/printCard/" + this.form.id +"?token=" + Config.getToken();
				//window.location.href=url;
				var showSelectWin = window.open(url);
				showSelectWin.focus();
			},
		}
  	}
</script>

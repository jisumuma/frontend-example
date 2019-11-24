<template>
	<div v-if="form.commentsByBU==2&&form.createUserId==this.GL.getLoginUser()">
		<button type="button" @click="print()" :class="'btn btn-primary pull-right ' + vclass" >Print Labor Contract Expiration Notice</button>
	</div>
</template>

<script>
	export default{
		name: "PrintNotice",
		props:['vclass',"form"],
		methods: {
			print: function () {
				var iHeight = 650;
				var iWidth = 950;
				var iTop = (window.screen.availHeight-30-iHeight)/2;
				var iLeft = (window.screen.availWidth-10-iWidth)/2;
				var url = Config.getBaseURL()+"/ContractExtension/printNotice?id="+this.form.id+"&token="+Config.getToken();
				var showSelectWin = window.open(url,'print','directories=no,height='+
					iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
					iWidth+',top='+iTop+',left='+iLeft);
				showSelectWin.focus();
			}
		}
  	}
</script>

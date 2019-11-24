<template>
	<div >
  		<button id="withDrawBtn" type="button" @click="save()" :class="'btn btn-primary pull-right ' + vclass">Withdraw</button>
		<!-- draftModal start-->
        <div class="modal fade jconfirm" id="withDrawModal" tabindex="-1" role="dialog" aria-labelledby="withDrawModalLabel">
			<div class="modal-dialog modal-sm jconfirm-cell" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="withDrawModalLabel">Withdraw 撤回</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('WITHDRAW') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- draftModal end-->
	</div>
</template>
<script>
	export default{
		name: "WithDraw",
		props:["form","uri","vclass","validator"],
		methods: {
			draft:function(){
			    var withdrawURI = '/form/'+this.form.processDefinitionKey+'/withdraw/'+this.form.id;
				var createForm = "";
                                var router = this.$router;
				var me = this ;
				this.GL.actUtil.query("POST",withdrawURI,this.form,function(data){
					//$('#withDrawModal').modal('toggle');
					var dataJson = JSON.parse(data);
					if(dataJson) {
						createForm = dataJson.form;
						setTimeout(function(){
							//$("#loadingMask,#progressBar").hide();
							//$('#withDrawModal').modal('toggle');
							if(process.env.MODE === 'apon'){
							  top.location.href = Config.getAPONURL();
							}else{
							  router.push({ path: '/index/task'});
							}
						},800);
					} else {
						if(me.form.processDefinitionKey == 'OverTimeWhite') {
							$.alert('现在已经生成整合单据，无法撤销');
						}
					}
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
			},
			save: function () {
				$("#loadingMask,#progressBar").show();
				var draftFn = this.draft;
				var _this=this;
				setTimeout(function(){
				    draftFn();
				},100);
			}
		}
    }
</script>

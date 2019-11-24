<template>
	<div>
  		<button type="button" @click="save()" :class="'btn btn-primary ' + vclass"><i class="fa fa-save"></i>&nbsp;&nbsp;Save</button>
		<!-- draftModal start-->
        <div class="modal fade" id="draftModal" tabindex="-1" role="dialog" aria-labelledby="draftModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="draftModalLabel">Save 保存</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('DRAFT') }}</span>
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
		name: "Save",
		props:["form","uri","vclass","validator"],
		methods: {
			draft:function(){
				var createForm = "";
				this.GL.actUtil.query("POST",this.uri,this.form,function(data){
					$('#draftModal').modal('toggle');
					var dataJson = JSON.parse(data);
					createForm = dataJson.form;
					setTimeout(function(){
						$("#loadingMask,#progressBar").hide();
						$('#draftModal').modal('toggle');
					},800);
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
			},
			save: function () {
				$("#loadingMask,#progressBar").show();
				var draftFn = this.draft;
				var validatorFn = this.validator;
				var _this=this;
				setTimeout(function(){
					if(validatorFn){
						validatorFn.validateAll().then(result => {
							if (result) {
								draftFn();
							}else{
								//var str='';
								//this.validator.errorBag.all().forEach(function(e){
									//str+=e+'\n';
								//});
								if(validatorFn.errors.has('terms')){
									$.alert(_this.$t("checkPolicyNotice"));
								}
								$("#loadingMask,#progressBar").hide();
								//alert("correct them");
							}
						});
					}else{
						draftFn();
					}
				},100);
			}
		}
    }
</script>

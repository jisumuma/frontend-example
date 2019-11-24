<template>
	<div>
		<button type="button" :class="'btn btn-danger ' + vclass" @click="cancel()"><i class="fa fa-fw fa-times"></i>{{labelName}}</button>
		<!-- approveModal start-->
        <div class="modal fade jconfirm" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="cancelModalLabel">
			<div class="modal-dialog modal-sm jconfirm-cell" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="cancelModalLabel">Cancel 取消</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('CANCEL') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- approveModal end-->
	</div>
</template>

<script>
	export default {
		name: 'Cancel',
		props:['vclass',"uri","form","labelName","validator"],
		methods: {
			cancelTask:function(){
				//console.log(this.uri);
        var router = this.$router;
        this.GL.actUtil.query("POST",this.uri,"",function(data){
          $('#cancelModal').modal('toggle');
          var dataJson = JSON.parse(data);
          setTimeout(function(){
            if(process.env.MODE === 'apon'){
              top.location.href = Config.getAPONURL();
            }else{
              router.push({ path: '/index/task'});
            }
          },100);
        });

			},
			cancel: function () {
				$("#loadingMask,#progressBar").show();
				var cancelTaskFn = this.cancelTask;
				var validatorFn = this.validator;
				var _this=this;
				setTimeout(function(){
					if(validatorFn){
						validatorFn.validateAll().then(result => {
							if (result) {
                cancelTaskFn();
							}else{
								//var str='';
								//this.validator.errorBag.all().forEach(function(e){
									//str+=e+'\n';

								$("#loadingMask,#progressBar").hide();
								//alert("correct them");
							}
						});
					}else{
            cancelTaskFn();
					}
				},100);
			}
		}
	}
</script>

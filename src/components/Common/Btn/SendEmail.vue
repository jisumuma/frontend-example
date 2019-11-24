<template>
	<div>
		<button v-if="form.commentsByBU==2" type="button" @click="sendEmail()" :class="'btn btn-primary ' + vclass"></i>&nbsp;&nbsp;SendEmail</button>
	 
		<!-- updateModal start-->
        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="updateModalLabel">SendEmail 发送邮件</h4>
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
		<!-- approveModal end-->
	</div>
</template>

<script>
	export default {
		name: 'SendEmail',
		props:["vclass","form","validator"],
  
		methods: {
			send:function(){
				var createForm = "";
				this.GL.actUtil.sendEmail(this.form,function(data){
					$('#draftModal').modal('toggle');
					var dataJson = JSON.parse(data);
					createForm = dataJson.form;
					setTimeout(function(){
						$.alert("Send Success. 发送成功。");
						$("#loadingMask,#progressBar").hide();
						$('#draftModal').modal('toggle');
					},800);
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
			},
			sendEmail: function () {
				$("#loadingMask,#progressBar").show();
				var sendFn = this.send;
				var validatorFn = this.validator;
				var _this=this;
				sendFn();
			}
		}
	}
</script>

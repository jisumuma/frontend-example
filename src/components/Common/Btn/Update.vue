<template>
	<div>
		<button type="button" id="vue_update_btn"  @click="update()" :class="'btn btn-primary ' + vclass"><i class="fa fa-save"></i>&nbsp;&nbsp;Save</button>

		<!-- updateModal start-->
        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="updateModalLabel">Save 保存</h4>
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
		name: 'Update',
		props:["vclass","form","validator"],
    mounted() {
      $("#vue_save_btn_fixed").css("display","");
      $("#vue_save_btn_fixed").click(function(){
        document.getElementById('vue_update_btn').click();
      });
    },
		methods: {
			draft:function(){
				var createForm = "";
				this.GL.actUtil.updateForm(this.form,function(data){
					$('#draftModal').modal('toggle');
					var dataJson = JSON.parse(data);
					createForm = dataJson.form;
					setTimeout(function(){
					$.alert("Save success. 保存成功。");
						$("#loadingMask,#progressBar").hide();
						$('#draftModal').modal('toggle');
					},800);
				});
				this.$root.eventHub.$emit('updateFormData', createForm);
			},
			update: function () {
				$("#loadingMask,#progressBar").show();
				var draftFn = this.draft;
				var validatorFn = this.validator;
				var _this=this;
				draftFn();
			}
		}
	}
</script>

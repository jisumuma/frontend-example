<template>
	<div v-if="!this.$route.query.noback">
		<button type="button" @click="back()" :class="'btn btn-primary pull-right ' + vclass" >Back</button>
		<!-- backModal start-->
        <div class="modal fade jconfirm" id="backModal" tabindex="-1" role="dialog" aria-labelledby="backModalLabel">
			<div class="modal-dialog modal-sm jconfirm-cell" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="backModalLabel">CONFIRM</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('BACK') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-default" data-dismiss="modal" @click="back()">Confirm</button>
					</div>
				</div>
			</div>
		</div>
		<!-- backModal end-->
	</div>
</template>

<script>
	export default{
		name: "Back",
		props:['vclass'],
		methods: {
			back: function () {
				if(Config.MODE_TYPE === 'apon'){
					top.location.href = Config.getAPONURL();
				}else{
					this.$router.back();
				}
			},
			confirm: function () {
				//$('#backModal').modal('toggle');
			}
		}
  	}
</script>

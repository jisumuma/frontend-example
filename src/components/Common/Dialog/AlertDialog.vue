<template>
	<div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document" style="width:500px;top:180px">
				<div class="modal-content">
					<div class="modal-header" style="font-size:14px">
					   Upload failed, please check your data or contact the Administrator. 上传失败，请检查数据或联系管理员。
					</div>
					<div class="modal-body overflow-auto" style="height:100px;">
							<div :id="id+'_msg'"></div>
					</div>
					<div class="modal-footer">                        
						<button type="button" class="btn btn-secondary" data-dismiss="modal" >OK</button>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
	export default {
		name: "AlertDialog",
		props: ["id"],
		computed: {
		   
		}
	}
</script>

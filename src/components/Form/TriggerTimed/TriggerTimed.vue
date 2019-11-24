<template>
	<div>
		<section class="content-header">
			<h1>
        New Manager 
      </h1>
		</section>
		<section class="content">
			<div class="row">
				<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
					<button type="button" class="btn btn-primary mar-left-5" @click="hrualpushdatatohrone();" title="Untaken Annual Leave Carry-over Push Data To Hrone" style="margin-left: 5px;">Untaken Annual Leave Carry-over Push Data To Hrone</button>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
					<button type="button" class="btn btn-primary mar-left-5" @click="hrualinvalidnofinish();" title="Untaken Annual Leave Carry-over Invalid No Finish" style="margin-left: 5px;">Untaken Annual Leave Carry-over Invalid No Finish</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: "TriggerTimed",
		props: ['vclass'],
		methods: {
			hrualpushdatatohrone:function(){
				var uri = "/hrualcarryover/pushdatatohrone" ;
				$("#loadingMask,#progressBar").show();
				setTimeout(function() {
					global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								$.alert(dm.msg);
								$("#loadingMask,#progressBar").hide();
					});
				},300);
			},
			hrualinvalidnofinish:function(){
				var uri = "/hrualcarryover/invalidnofinish" ;
				$("#loadingMask,#progressBar").show();
				setTimeout(function() {
					global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								$.alert(dm.msg);
								$("#loadingMask,#progressBar").hide();
					});
				},300);
			}
		},
		mounted() {
			
		}
	}
</script>

<style>

</style>
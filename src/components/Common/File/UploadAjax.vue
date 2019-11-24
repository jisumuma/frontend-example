<template>
	<div>
			<span :id="'upload-span-'+id" v-show="errors.has('uploadInput'+id)" class="help is-danger">{{ errors.first('uploadInput'+id)|uploadMsgFilter}}</span>
			<input type="file" :id="id" :buttonText="buttonText" :queueID="'queue-'+id" :multi=multi :uploadScript="uri" 
				:buttonClass="buttonClass" :accept=accept :uploadLimit=uploadLimit :fileSizeLimit=fileSizeLimit :fileList="'inline-file-'+id" />
			<input type="hidden"  :id="'upload-'+id"   :name="'uploadInput'+id">
			
			<div :id="'queue-'+id" style="display:none;"></div>
	</div>
</template>

<script>
	export default {
		name: 'UploadAjax',
		inject: {
			$validator: '$validator'
		},
		props:["value","buttonText","multi","accept","uploadLimit","fileSizeLimit","uri","buttonClass"],
		data() {
			return {
				id: this.generateUUID() + "-" + new Date().getTime()
			}
		},
		watch: {
		},
		computed:{
			
		},
		methods: {
			generateUUID:function(){
				var d = new Date().getTime();
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (d + Math.random()*16)%16 | 0;
					d = Math.floor(d/16);
					return (c=='x' ? r : (r&0x3|0x8)).toString(16);
				});
				return uuid;
			},
			changed:function(val){
				this.$emit('afterupload', val);
			}
		},
		mounted(){
			this.$root.UPFILEAJAX.File.init(this.id);
			var sid = "upload-"+this.id;
			var change = this.changed;
  			$(function () {
				$("#"+sid).bind('input:changed', function (e, val) {
				    change(val);
				});
  			});
  			
  			
		}
	}
</script>
<style >
	
</style>
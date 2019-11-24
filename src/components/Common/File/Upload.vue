<template>
	<div>
		<div v-if="!readonly">
			<span :id="'upload-span-'+id" v-show="errors.has('uploadInput'+id)" class="help is-danger">{{ errors.first('uploadInput'+id)|uploadMsgFilter}}</span>
			<input type="file" :id="id" :buttonText="buttonText" :queueID="'queue-'+id" :multi=multi :accept=accept :uploadLimit=uploadLimit :fileSizeLimit=fileSizeLimit :fileList="'inline-file-'+id" />
			<input type="hidden"  :id="'upload-'+id" v-model="selectValue" v-validate="rules" :name="'uploadInput'+id">
			<span :id="'inline-file-'+id">
				<div v-for="(entry,index) in realattachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id" class="inline-block  btn-group btn-right">
					<span class="fileName btn btn-default">
						<a target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)" :title="entry.attachName">{{entry.attachName}}</a>
					</span>
					<span class="btn btn-danger upload-close">
						<button type="button" class="close"><span>×</span></button>
					</span>
				</div>
			</span>
			<div :id="'queue-'+id"></div>
		</div>
		<div v-if="readonly">
			<div class="uploadifive-button btn btn-default" style="position: relative;">{{buttonText}}
				<input type="text" style="font-size: 30px; opacity: 0; position: absolute; right: -3px; top: -3px;">
			</div>
			<span :id="'inline-file-'+id">
				<div v-for="(entry,index) in realattachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id" class="inline-block  btn-group btn-right">
					<span class="fileName btn btn-default">
						<a target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)" :title="entry.attachName">{{entry.attachName}}</a>
					</span>
				</div>
			</span>
			<div :id="'queue-'+id"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Upload',
		inject: {
			$validator: '$validator'
		},
		props:["value","buttonText","multi","attachments","readonly","required","accept","uploadLimit","fileSizeLimit"],
		data() {
			return {
				id: this.generateUUID() + "-" + new Date().getTime(),
				realattachments:this.attachments
			}
		},
		watch: {
			"attachments": {
				handler(curVal, oldVal) {
					//console.log("curVal:"+curVal);
					//console.log("oldVal:"+oldVal);
					if(curVal!=oldVal){
						//this.realattachments=oldVal;

					}
				},
				deep: true
			},
			"required":{
				handler(curVal,oldVal){
					if(curVal){
						this.rules='required';
					}else{
						this.rules="";
					}
				},
				deep:true
			}
		},
		computed:{
			selectValue: {
				// 动态计算selectValue的值
				get:function() {
					return this.value;
				}
			},
			rules: {
				// 动态计算rules的值
				get:function() {
					if(this.required==undefined||this.required){
						return 'required';
					}else{
						return '';
					}
				},
				set: function (newValue) {
                    this.rules = newValue;
                }
			}
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
				this.$emit('input', val);
				var spanId = 'upload-span-'+this.id;
				var inlineFileId = 'inline-file-'+this.id;
				if($("#"+inlineFileId).find("div").length > 0){
					$("#"+spanId).css("display","none");
				}else{
					$("#"+spanId).css("display","block");
				}
			}
		},
		mounted(){
			this.$root.UPFILE.File.init(this.id);
			var sid = "upload-"+this.id;
			var change = this.changed;
			var remove = this.$root.UPFILE.File.onRemove;
  			$(function () {
				$("#"+sid).bind('input:changed', function (e, val) {
				    change(val);
				});
  			});

  			$('#inline-file-'+this.id).on('click', '.upload-close', function() {
				var el = $(this).parents("div[x-file-id]");
						remove(el);
			});
		}
	}
</script>
<style scoped>
	span.fileName a {
		width: 100px;
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		-moz-text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
	}
</style>

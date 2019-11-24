<template>
	<div>
		<div v-if=!readonly>
			<span :id="'upload-span-'+id" v-show="errors.has('uploadInput')" class="help is-danger">Please upload the attachment.请上传附件.</span>
			<input type="file" :id="id" :buttonText="buttonText" :queueID="'queue-'+id" :multi=multi :fileList="'inline-file-'+id" accept=".jpg,.jpeg,.gif,.png" :uploadLimit="uploadLimit" :fileSizeLimit="fileSizeLimit" />
			<input type="hidden" :id="'upload-'+id" v-model="selectValue" v-validate="rules" name="uploadInput">
			<!--	<span :id="'inline-file-'+id" style="display:block;margin-top:5px;">
				<div v-for="(entry,index) in attachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id" class="inline-block  btn-group btn-right">
					<div style="height:100px;"><img :src="GL.getURL('/attachment/downloadimage/'+entry.id)" height="100px" /></div>
					<span class="fileName btn btn-default">
						<a target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)">{{entry.attachName}}</a>
					</span>
			<span class="btn btn-danger upload-close">
						<button type="button" class="close"><span>×</span></button>
			</span>
		</div>
		</span>-->
			<ul :id="'inline-file-'+id" style="display:block;margin-top:5px;" class="users-list clearfix upload-images-list">
				<li v-for="(entry,index) in realattachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id">
					<div><img :src="GL.getURL('/attachment/downloadimage/'+entry.id)" :alt="entry.attachName"></div>
					<a class="users-list-name" target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)"><i class="fa fa-download"></i>&nbsp;Download 下载</a>
					<span class="users-list-date fileNameForImage"><a>{{entry.attachName}}</a></span>
					<span class="btn btn-danger upload-close">
						<button type="button" class="close"><span>×</span></button>
					</span>
				</li>
			</ul>
			<div :id="'queue-'+id"></div>
		</div>
		<div v-if=readonly>
			<!--<div class="uploadifive-button btn btn-default" style="position: relative;">{{buttonText}}
				<input type="text" style="font-size: 30px; opacity: 0; position: absolute; right: -3px; top: -3px;">
			</div>-->
			<ul :id="'inline-file-'+id" style="display:block;margin-top:5px;" class="users-list clearfix upload-images-list">
				<li v-for="(entry,index) in realattachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id">
					<div><img :src="GL.getURL('/attachment/downloadimage/'+entry.id)" :alt="entry.attachName"></div>
					<a class="users-list-name" target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)"><i class="fa fa-download"></i>&nbsp;Download 下载</a>
					<span class="users-list-date fileNameForImage"><a>{{entry.attachName}}</a></span>
				</li>
			</ul>
			<!--<span :id="'inline-file-'+id" style="display:block;margin-top:5px;">
				<div v-for="(entry,index) in attachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id" class="inline-block  btn-group btn-right">
						<div style="height:100px;"><img :src="GL.getURL('/attachment/downloadimage/'+entry.id)" height="100px" /></div>
					<span class="fileName btn btn-default">
						<a target='_blank' :href="GL.getURL('/attachment/download/'+entry.id)">{{entry.attachName}}</a>
					</span>
				</div>
			</span>-->
			<div :id="'queue-'+id"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UploadImage',
		inject: {
			$validator: '$validator'
		},
		props: ["value", "buttonText", "multi", "attachments", "readonly", "required", "uploadLimit", "fileSizeLimit"],
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
			}
		},
		computed: {
			selectValue: {
				// 动态计算selectValue的值
				get: function() {
					return this.value;
				}
			},
			rules: {
				// 动态计算rules的值
				get: function() {
					if(this.required == "false") {
						return '';
					} else {
						return 'required';
					}
				}
			}
		},
		methods: {
			generateUUID: function() {
				var d = new Date().getTime();
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (d + Math.random() * 16) % 16 | 0;
					d = Math.floor(d / 16);
					return(c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
				});
				return uuid;
			},
			changed: function(val) {
				this.$emit('input', val);
				var spanId = 'upload-span-' + this.id;
				var inlineFileId = 'inline-file-' + this.id;
				if($("#" + inlineFileId).find("div").length > 0) {
					$("#" + spanId).css("display", "none");
				} else {
					$("#" + spanId).css("display", "block");
				}
			}
		},
		mounted() {
			this.$root.UPIMAGE.File.init(this.id);
			var sid = "upload-" + this.id;
			var change = this.changed;
			var remove = this.$root.UPIMAGE.File.onRemove;
			$(function() {
				$("#" + sid).bind('input:changed', function(e, val) {
					change(val);
				});
				/*$(".upload-close").each(function() {
					$(this).bind('click', function() {
						var el = $(this).parents("li[x-file-id]");
						remove(el);
					})
				});*/

			});
			$(".upload-images-list").on('click', '.upload-close', function() {
				var el = $(this).parents("li[x-file-id]");
						remove(el);
			});
		}
	}
</script>
<style >
	span.fileNameForImage a {
		width: 100%;
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		-moz-text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
	}
	
	.pad-top-5 {
		padding-top: 5px;
	}
	
	.upload-images-list>li {
		width: 18%;
		padding:3px !important;
	}
	
	.upload-images-list>li div {
		background-color: #eee;
		border: 1px solid #ccc;
		width: 100%;
		height: 220px;
		margin: 0 auto;
		padding: 10px;
	}
	
	.upload-images-list>li img {
		border-radius: 0 !important;
		max-height: 200px;
		width: auto;
		max-width: 100%;
		height: auto;
	}
	
	.upload-images-list .users-list-name {
		color: #2274ac;
		margin-top: 10px;
	}
	
	.upload-images-list .users-list-name:hover {
		color: #3c8dbc;
	}
	
	@media (max-width: 768px) {
		.upload-images-list>li {
			width: 50%;
		}
	}
	
	.box-border {
		border: 1px solid #ccc;
		padding: 10px;
		overflow: auto;
	}
</style>
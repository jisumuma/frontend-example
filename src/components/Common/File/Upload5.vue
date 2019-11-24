<template>
	<div>
		<div v-if=!readonly :id="'parent-'+id">
			<span :id="'upload-span-'+id" v-show="errors.has(uploadInputName)" class="help is-danger"></span>
			
			<input type="file" :accept="accept" :id="id" :buttonText="buttonText" :queueID="'queue-'+id" :multi=multi :uploadLimit="uploadLimit" :fileSizeLimit="fileSizeLimit" :fileList="'inline-file-'+id" /><span v-show="value==null||value==''" style="margin-left:5px;vertical-align:middle;">No file was selected 未选择任何文件</span>
			
			<input type="hidden" :id="'upload-'+id" v-model="selectValue" v-validate="rules" :name="uploadInputName">
			<span :id="'inline-file-'+id" style="display:block;margin-top:5px;">
				<div   v-for="(entry,index) in realattachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id" class="inline-block  btn-group btn-right" >
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
			<div class="uploadifive-button btn btn-primary" style="position: relative;">{{buttonText}}
				<input type="text" style="font-size: 30px; opacity: 0; position: absolute; right: -3px; top: -3px;">
			</div> 
			<span :id="'inline-file-'+id" style="display:block;margin-top:5px;">
				<div v-for="(entry,index) in realattachments" :id="'file-id-'+entry.id" :data-attachment-id="entry.id" :x-file-id="id" class="inline-block  btn-group btn-right" style="margin-top:5px;">
					<span class="fileName btn btn-default ">
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
		name: 'Upload5',
		inject: {
			$validator: '$validator'
		},
		props: ["form","uri","value","accept","name", "buttonText", "multi", "attachments", "readonly", "required", "uploadLimit", "fileSizeLimit","vclass","form","labelName","validator"],
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
			},
			uploadInputName:{
				get: function() {
					if(this.name ) {
						return this.name;
					} else {
						return 'uploadInput';
					}
				}
			}
		},
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
				//自动finished
				var inlineFileId = 'inline-file-' + this.id;
				if($("#" + inlineFileId).find("div").length > 0) {
					//有上传才可提交
					//alert("有文件");
					var approveFn = this.approve;
					approveFn();
				} else {
					//alert("无文件");
				}
			},
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
				$("#loadingMask,#progressBar").show();
				var draftFn = this.draft;
				setTimeout(function(){
					draftFn();
				},100);
			},
			completeTask:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"approve",this.form,function(data){
					//$('#approveModal').modal('toggle');
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#approveModal').modal('toggle');
						setTimeout(function(){
							if(process.env.MODE === 'apon'){
								top.location.href = Config.getAPONURL();
							}else{
								router.push({ path: '/index/task'});
							}
						},100);
					},800);
				});
			},
			approve: function () {
				this.$emit("beforeapprovel");
				if(this.form.approvelstatus == true||this.form.approvelstatus == undefined||this.form.approvelstatus ==null) {
					$("#loadingMask,#progressBar").show();
					var completeTaskFn = this.completeTask;
					this.$root.actProcessType="approve";
					var validatorFn = this.validator;
					var _this=this;
					setTimeout(function(){
						if(validatorFn){
							validatorFn.validateAll().then(result => {
								if (result) {
									completeTaskFn();
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
							completeTaskFn();
						}
					},100);
				}
			}
		},
		mounted() {
			this.$root.UPFILE.File.init(this.id);
			var sid = "upload-" + this.id;
			var change = this.changed;
			var remove = this.$root.UPFILE.File.onRemove;
			$(function() {
				$("#" + sid).bind('input:changed', function(e, val) {
					change(val);
				});

				/*$(".upload-close").each(function() {
					$(this).bind('click', function() {
						var el = $(this).parents("div[x-file-id]");
						remove(el);
					})
				});*/

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
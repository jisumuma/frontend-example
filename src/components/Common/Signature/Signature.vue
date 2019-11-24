<template>
	<div>
		<!--	<div>Signature:</div>
		<img v-if="imgdata" :src="this.imgdata" width="750" height="400"></img>-->
		<div v-if="showmsg">{{msg}}</div>
		<div class="box  " style="width:750px;height:400px;">

			<vueSignature ref="signature" :sigOption="option" :w="'750px'" :h="'400px'"></vueSignature>
			<!-- <vueSignature ref="signature1" :sigOption="option"></vueSignature> -->

		</div>
		<div style="margin-top:15px;">
			<button class="btn btn-success pull-left" @click="save">Confirm</button>
			<button class="btn btn-danger pull-left  btn-left" @click="clear">Clear</button>
			<button class="btn btn btn-primary pull-right  btn-right" @click="confirm">Back</button>
		</div>

	</div>
</template>

<script>
	export default {
		name: "Signature",
		props: ["otherdata", "uri"],
		data() {
			return {
				option: {
					penColor: "rgb(0, 0, 0)"
				},
				imgdata: "",
				showmsg: false,
				msg: ""
			};
		},
		methods: {
			save() {
				var _this = this;
				if(!_this.$refs.signature.isEmpty()) {
					var png = _this.$refs.signature.save();
					_this.imgdata = png;
					if(_this.uri) {
						$.ajax({
							url: Config.getBaseURL() + _this.uri,
							data: {
								otherdata: _this.otherdata,
								imgdata: png
							},
							type: "post",
							dataType: "json",
							async: false,
							success: function(data) {
								/* 	var dm = JSON.parse(data);
								if(dm.data=='yes'){*/
								_this.showmsg = true;
								_this.msg = "Signature upload success! 签名上传成功！";
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
								_this.confirm();
								/*}*/
							},
							error: function(msg) {
								// $.alert(msg.responseText);
								_this.showmsg = true;
								_this.msg = msg.responseText
								setTimeout(function() {
									_this.showmsg = false;
									_this.msg = "";
								}, 3000);
							}
						});
					} else {
						$.alert("Please give a uri! 请提供一个后台上传签名的uri！");
					}

				} else {
					//$.alert("Please Signature! 请签名！");
					_this.showmsg = true;
					_this.msg = "Please Signature! 请签名！";
					setTimeout(function() {
						_this.showmsg = false;
						_this.msg = "";
					}, 3000);
				}

			},
			clear() {
				var _this = this;
				_this.imgdata = "";
				_this.$refs.signature.clear();
			},
			confirm(){
				this.$emit("confirm");
			}
		},
		mounted() {
			var _this = this;
			setTimeout(function() {
				_this.clear();
			}, 2000);

		}
	};
</script>

<style>

</style>
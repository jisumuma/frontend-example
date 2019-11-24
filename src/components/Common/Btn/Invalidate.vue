<template>
	<div v-if="form.status==0 && this.form.processDefinitionKey =='ConstructionWorkPermit'">
		<!--
		<button  type="button" @click="invalidate()" :class="'btn btn-warning pull-left ' + vclass" style="margin-left:15px;">Invalidate old</button>
		-->
		<button type="button" :class="'btn btn-warning pull-left ' + vclass" data-toggle="modal" data-target="#modal-default" style="margin-left:15px;" >Invalidate</button>
		<div class="modal fade" id="modal-default">
          <div class="modal-dialog" :style="permitstyle"><!--top: 50%;left:15%;position:fixed;-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Please fill in invalidate reason 请填写作废原因</h4>
              </div>
              <div class="modal-body" style="width:100%;height:100%;margin:0px;padding:0px;">
				  <form-group col="md-12" haslable="false" type="textarea3" rows="5" other-rules="required" v-model="form.invalidateReason" name="invalidateReason" label="ConstructionWorkPermit.invalidateReason"></form-group>
				  <div v-if="showmsg">&nbsp;&nbsp;&nbsp;&nbsp;<font color="red">{{msg}}</font></div>
				<!--invalidateReason={{this.form.invalidateReason}}-->
				<!-- 上传图片 -->

              </div>
              <div class="modal-footer">
              	<button type="button" @click="invalidateTest()" class="btn btn-primary pull-left" >Confirm 确定</button>
				<button type="button" class="btn btn-primary pull-left" data-dismiss="modal" style="margin-left:15px;">Cancel 取消</button>
			  <!-- 
				<button type="button" @click="invalidateTest()" class="btn btn-primary pull-right" >Invalidate 作废</button>
              	<button type="button" class="btn btn-primary pull-right" data-dismiss="modal" style="margin-right:15px;" >Close 关闭</button>
			   -->
			  </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>


	</div>
</template>

<script>
	export default{
		name: "Invalidate",
		props:['vclass',"entityId","form"],
		data() {
			var dm = {};
			dm.permitstyle="bottom:30%;position:fixed;left:15%;";
			dm.showmsg=false;
			dm.msg="";
			return dm;
		},
		methods: {
			invalidateTest:function (){
				var _this=this;
				var cwpid=_this.form.id;
				var router = this.$router;
				var invalidateReason=this.form.invalidateReason;				
				_this.showmsg = false;
				_this.msg ="";
				if(invalidateReason != null && invalidateReason!=""){
					var limitSize=300;
					var newvalue = invalidateReason.replace(/[^\x00-\xff]/g, "**");
					var length = newvalue.length;
					if(length>limitSize){
						_this.showmsg = true;
                		_this.msg =limitSize+" characters max for invalidate reason, "+length+" characters have been filled in currently. 作废原因最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。";
						return;
					}
								
					$.ajax({
							url: Config.getBaseURL() + "/constructionWorkPermit/invalidate/"+_this.form.id, //这个就是请求地址对应sAjaxSource
							data: {
								"invalidateReason": _this.form.invalidateReason
							},
							type: "post",
							dataType: "json",
							success: function(data) {
								console.log("11 data="+data);
								//$.alert("Invalidate successfully! 作废成功！");
								_this.showmsg = true;
                				_this.msg ="Invalidate successfully! 作废成功！";
								$('#modal-default').modal('hide');
								setTimeout(function() {
									if(process.env.MODE == 'apon'){
										top.location.href = Config.getAPONURL();
									}else{
										console.log("22 data="+data);
										router.push({ path: '/index/task'});
									}
								}, 1000);
							},
							error: function(msg) {
								console.log("msg.responseText="+msg.responseText);
								//$.alert(msg.responseText);
							}
						});
				}else{
					_this.showmsg = true;
                	_this.msg ="Please fill in invalidate reason. 请填写作废原因。";
					return ;
				}
				
			},
			//点击按钮，弹出输入框
			invalidate: function () {
				var _this=this;
				var cwpid=_this.form.id;
				var router = this.$router;
				var invalidateReason="测试";
				$.confirm({
					title: "",
					content:
					"Are you sure you want to invalidate this record? 是否确定想要作废这条记录？",
					buttons: {
					ok: {
						text: "Yes",
						btnClass: "btn btn-primary",
						keys: ["enter"],
						action: function() {
						$.ajax({
							url: Config.getBaseURL() + "/constructionWorkPermit/invalidate/"+_this.form.id+"?invalidateReason="+_this.form.invalidateReason, //这个就是请求地址对应sAjaxSource
							data: {
								"cwpid": cwpid
							}, 
							type: "get",
							dataType: "json",
							success: function(data) {
								console.log("11 data="+data);
								$.alert("Invalidate successfully! 作废成功！");
								setTimeout(function() {
									if(process.env.MODE == 'apon'){
										top.location.href = Config.getAPONURL();
									}else{
										router.push({ path: '/index/task'});
									}									
								}, 2000);
							},
							error: function(msg) {
								console.log("msg.responseText="+msg.responseText);
								//$.alert(msg.responseText);
							}
						});
						}
					},
					cancel: {
						text: "No",
						btnClass: "btn btn-primary",
						keys: ["esc"],
						action: function() {
						//alert("你点击了取消按钮！")
						}
					}
					}
				});

			}
		},
		watch:{
			"form.invalidateReason":{
				handler(curVal,oldVal){
					var value = curVal;
					this.showmsg = false;
					this.msg ="";
					var newvalue = value.replace(/[^\x00-\xff]/g, "**");
					var length = newvalue.length;
					var limitSize=300;
					//当填写的字节数小于设置的字节数
					if (length * 1 <= limitSize * 1) {
						return;
					}
					var limitDate = newvalue.substr(0, limitSize);
					var count = 0;
					var limitvalue = "";
					for (var i = 0; i < limitDate.length; i++) {
						var flat = limitDate.substr(i, 1);
						if (flat == "*") {
						count++;
						}
					}
					var size = 0;
					var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
					//if 基点是×; 判断在基点内有×为偶数还是奇数
					if (count % 2 == 0) {
						//当为偶数时
						size = count / 2 + (limitSize * 1 - count);
						limitvalue = value.substr(0, size);
					} else {
						//当为奇数时
						size = (count - 1) / 2 + (limitSize * 1 - count);
						limitvalue = value.substr(0, size);
					}
					this.showmsg = true;
					this.msg =limitSize+" characters max for invalidate reason, "+length+" characters have been filled in currently. 作废原因最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。";
					//判断长度
				},
				deep:true
			}
		},
		mounted() {
			if(this.form.permitCategory != null && this.form.permitCategory=="Confine Space Permit"){
				this.permitstyle="bottom:40%;position:fixed;left:15%;";
				console.log("permitstyle="+this.permitstyle);
			}else{
				this.permitstyle="bottom:30%;position:fixed;left:15%;";
				console.log("permitstyle="+this.permitstyle);
			}
		}
  	}
</script>

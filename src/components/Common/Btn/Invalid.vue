<template>
	<div v-if="showBtn">
	  <button id="invalid_btn" type="button"  :class="'btn btn-primary ' + vclass" @click="popmodal()"><i class="fa fa-fw fa-close"></i>Invalidate</button>
		<div class="modal fade" id="modal-default">
          <div class="modal-dialog" :style="permitstyle">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Please fill in invalidate reason 请填写作废原因</h4>
              </div>
              <div class="modal-body" style="width:100%;height:90%;padding:0px;">
				  <form-group col="md-12" haslable="false" type="textarea3" rows="5" other-rules="required" v-model="form.approval.approvalRemark" name="invalidateReason" label="InvalidateReason"></form-group>
				  <div v-if="showmsg">&nbsp;&nbsp;&nbsp;&nbsp;<font color="red">{{msg}}</font></div>				
              </div>
              <div class="modal-footer">
              	<button type="button" @click="invalidate()" class="btn btn-primary pull-left" >Confirm 确定</button>
				<button type="button" class="btn btn-primary pull-left" data-dismiss="modal" style="margin-left:15px;">Cancel 取消</button>
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
		name: "Invalid",
		props:["form","uri","vclass","validator"],
		data() {
			var dm = {};
			dm.permitstyle="bottom:30%;position:fixed;left:15%;";
			dm.showmsg=false;
			dm.msg="";
			return dm;
		},
	  computed:{
				showBtn:{
					// 动态计算readonly的值
					get:function() {
						return this.form.applicantUserId == localStorage.getItem("uid") && this.form.status == '2' && this.form.processDefinitionKey == "FixedAssetAcquisition";
					}
				}
        },
		methods: {	
			popmodal: function() {
				//$('#costCenterModal').modal('toggle');		
				var me = this;
				$("#modal-default").modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
				setTimeout(function() {			
				}, 300);

			},
			completeTask:function(){
			    var invalidateURI = '/form/'+this.form.processDefinitionKey+'/invalidate/'+this.form.id;
				var router = this.$router;
				var me = this ;
				this.GL.actUtil.query("POST",invalidateURI,this.form,function(data){
					$.alert("Invalidate successfully! 作废成功！");
					setTimeout(function(){							     
							if(process.env.MODE === 'apon'){
								top.location.href = Config.getAPONURL();
							}else{
								router.push({ path: '/index/task'});
							}
						},1000);
				});
			},
			
			//点击按钮，弹出输入框
			invalidate: function () {
			    var _this=this;				
				var router = this.$router;
				var invalidateReason=this.form.approval.approvalRemark;				
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
						_this.completeTask();
				}else{
					_this.showmsg = true;
                	_this.msg ="Please fill in invalidate reason. 请填写作废原因。";
					return ;
				}
			}
		},
		watch:{
			"form.approval.approvalRemark":{
				handler(curVal,oldVal){
					var value = curVal;
					if(value !=null){
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
					}
				},
				deep:true
			}
		},

  	}
</script>

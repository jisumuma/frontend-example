<template>
	<div class="box box-primary" :id="divid">
        <div class="box-header with-border">
            <h3 class="box-title">
              Comments 备注
          </h3>
        </div>
        <form role="form">
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <textarea placeholder="Comments 备注" v-model="commentVal" v-validate="rules" name="comment" :class="{'form-control':true,'input': true, 'is-danger': errors.has('comment') }"></textarea>
                        	<p>{{$t("textareaNoticeComment")}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
	export default {
		name: 'Comment',
		props:["required"],
		inject: {
			$validator: '$validator'
		},
		data(){
			var rule="";
			var commentVal = '';
			if(this.required){
				rule="required";
			}

			this.$root.actProcessType="none";
			return {
				rules:rule,
        commentVal: this.value,
        divid:this.generateUUID()+"-"+new Date().getTime()
			}
		},
		watch:{
			"$root.actProcessType":{
				handler(curVal,oldVal){
					if("approve"==curVal){
						this.rules="";
					}else if("reject"==curVal){
						this.rules='required';
					}else{
						this.rules="";
					}
				},
				deep:true
			},
      "commentVal":{
        handler(curVal,oldVal){
          this.selectValue=curVal;
          //console.log("after...."+this.selectValue);
        },
        deep:true
      }
    },mounted(){
    	var _this=this;
    	$("div#"+_this.divid).on('blur','textarea.form-control',function() {
				var reg =/^[0-9]*$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
							var value=$(this).val();
							var newvalue = value.replace(/[^\x00-\xff]/g, "**");    
							var length = newvalue.length;    

							//当填写的字节数小于设置的字节数    
							if (length * 1 <=500 * 1){    
										return;    
							}    
							var limitDate = newvalue.substr(0, 500);    
							var count = 0;    
							var limitvalue = "";    
						for (var i = 0; i < limitDate.length; i++) {    
										var flat = limitDate.substr(i, 1);    
										if (flat == "*") {    
													count++;    
										}    
						}    
						var size = 0;    
						var istar = newvalue.substr(500 * 1 - 1, 1);//校验点是否为“×”    

						//if 基点是×; 判断在基点内有×为偶数还是奇数     
						if (count % 2 == 0) {    
											//当为偶数时    
										size = count / 2 + (500 * 1 - count);    
										limitvalue = value.substr(0, size);    
						} else {    
										//当为奇数时    
										size = (count - 1) / 2 + (500 * 1 - count);    
										limitvalue = value.substr(0, size);    
						}    
					$.alert('500 Characters Max for Comment. 备注最多只能填写500个字节。');

	 				_this.commentVal=limitvalue;
				}
				}
			});
    },
		
		computed:{
			selectValue: {
				// 动态计算selectValue的值
				get:function() {
					return this.value;
				},
				set:function(val) {
					this.$emit('input', val);
				}
			}
		},
		methods:{
			generateUUID:function(){
				var d = new Date().getTime();
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (d + Math.random()*16)%16 | 0;
					d = Math.floor(d/16);
					return (c=='x' ? r : (r&0x3|0x8)).toString(16);
				});
				return uuid;
			},
			getRules:function(){
				var formValid = this.$route.query.formValid;
				var fieldRules = formValid[this.name];
				var rules="";
				if(this.otherRules){
					rules = this.otherRules+"|";

					if(this.otherRules.indexOf('required')!=-1){
						this.isRequired = true;
					}
				}
				if(fieldRules){
					rules += fieldRules;
					if(fieldRules.indexOf('required')!=-1){
						this.isRequired = true;
					}
				}
				return rules;
			}
		}
	}
</script>

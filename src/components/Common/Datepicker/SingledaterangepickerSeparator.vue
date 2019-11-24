<template>
	<div class="input-group date" style="width:100%;" :class="{'input': errors.has(symbol), 'div-danger': errors.has(symbol) }">
		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>
		</div>
		<input :readonly="readonly" :disabled="readonly" :id="'daterangepicker-' + currTimes" :name="'daterangepicker-' + currTimes" v-model="selectValue" v-validate="rules" type="text" class="form-control pull-right">
    </div>
    <!-- /.input group -->
</template>
<script>
	import adminlte from "adminlte"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"
	export default{
		name: "Singledaterangepicker",
		inject: {
			$validator: '$validator'
		},
		props: ["value","readonly","required","singleDatePicker","init","minDate","maxDate"],
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
			updateValue: function (value) {
				this.$emit('input', value);
			},
			formatDate:function(){
			    var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				//myDate.getHours(); //获取当前小时数(0-23)
				//myDate.getMinutes(); //获取当前分钟数(0-59)
				//var str = month + "/" + strDate + "/" + year + " 00:00";
				//var str = year + "-" + month + "-" + strDate + " "+date.getHours()+":"+date.getMinutes();
				var str = year + "-" + month + "-" + strDate  + " 00:00";
				return str;
			}
		},
		mounted(){
			var vueComponent = this;
			var format = this.formatDate;
			var startDate = "";
			var endDate = "";
			var singleDatePickerFlag =vueComponent.singleDatePicker;
			if(typeof singleDatePickerFlag == "undefined" ||singleDatePickerFlag == null || singleDatePickerFlag== ""){
				singleDatePickerFlag=false;
			}
			if(this.value && this.value != '') {
				if(singleDatePickerFlag){
					startDate = this.value;
					endDate = this.value;
				}else{
					startDate = this.value.split("~")[0];
					endDate = this.value.split("~")[1];
				}
			} else {
				startDate = vueComponent.formatDate();
				endDate = vueComponent.formatDate();
			}
			$('#daterangepicker-'+this.currTimes).daterangepicker({
			    "singleDatePicker": vueComponent.singleDatePicker,
			    "timePicker": true,
			    "timePicker24Hour": true,
			    "startDate": startDate,
			    "endDate": endDate,
			    "minDate":vueComponent.minDate,
			    "maxDate":vueComponent.maxDate,
				"autoUpdateInput":false,
			    "opens" :"right",
			    "locale": {
                    format: 'YYYY-MM-DD HH:mm',//MM/DD/YYYY HH:mm
                    separator: ' ~ '
                }
			}, function(start, end, label) {
				if(vueComponent.singleDatePicker){
					$('#daterangerpicker-' + this.currTimes).val(start.format('YYYY-MM-DD HH:mm'));
					vueComponent.updateValue(start.format('YYYY-MM-DD HH:mm'));
				}else{
					$('#daterangerpicker-' + this.currTimes).val(start.format('YYYY-MM-DD HH:mm')+ ' ~ ' + end.format('YYYY-MM-DD HH:mm'));
					vueComponent.updateValue(start.format('YYYY-MM-DD HH:mm') + ' ~ ' + end.format('YYYY-MM-DD HH:mm'));
				}
			}).on('apply.daterangepicker', function(ev, picker) {
				vueComponent.updateValue(picker.startDate.format('YYYY-MM-DD HH:mm'));
				vueComponent.updateValue(picker.endDate.format('YYYY-MM-DD HH:mm'));
				vueComponent.$emit("afterapply");
	     	});
			if(this.value){
				$('#daterangerpicker-' + this.currTimes).val(this.value);
					vueComponent.updateValue(this.value);
			}else{
				if(this.init){
						if(vueComponent.singleDatePicker){
							$('#daterangerpicker-' + this.currTimes).val(startDate);
							vueComponent.updateValue(startDate);
						}else{
							$('#daterangerpicker-' + this.currTimes).val(startDate + ' ~ ' +endDate);
							vueComponent.updateValue(startDate + ' ~ ' + endDate);
						}

				}
			}
		},
		data(){
			var times = this.generateUUID()+"-"+new Date().getTime();
			var symbol = "daterangepicker-"+times;
			return {
				currTimes:times,
				symbol:symbol
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
					if(this.required){
						return 'required';
					}else{
						return '';
					}
				}
			}
		}
	}
</script>

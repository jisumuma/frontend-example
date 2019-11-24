<template>
	<div class="input-group date" style="width:100%;">
		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>
		</div>
		<input :id="'daterangerpicker-' + currTimes" v-model="selectValue" type="text" class="form-control pull-right datepicker" placeholder="MM/DD/YYYY-MM/DD/YYYY">
	</div>
	<!-- /.input group -->
</template>
<script>
	import adminlte from "adminlte"
	//import bootstrap from "bootstrap"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"
	export default {
		name: "Daterangepicker",
		props: ["value", "showTime", "dateLimit"],
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
			updateValue: function(value) {
				this.$emit('input', value)
			},
			formatDate: function() {
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
				var str = month + "/" + strDate + "/" + year;
				return str;
			}
		},
		mounted() {
			var vueComponent = this;
			var startDate = "";
			var endDate = "";
			var dateLimit = vueComponent.dateLimit;
			if(this.value && this.value != '') {
				startDate = this.value.split("-")[0];
				endDate = this.value.split("-")[1];
			} else {
				startDate = vueComponent.formatDate();
				endDate = vueComponent.formatDate();
			}
			if(dateLimit) {
				$('#daterangerpicker-' + this.currTimes).daterangepicker({
					  "dateLimit": {
					        "days": dateLimit
					    },
					"timePicker": vueComponent.ifshowTime,
					"timePicker24Hour": true,
					"timePickerIncrement": 10,
					"linkedCalendars": false,
					"startDate": startDate,
					"endDate": endDate,
					"opens" : "right"
				}, function(start, end) {
					if(vueComponent.ifshowTime) {
						$('#daterangerpicker-' + this.currTimes).val(start.format('MM/DD/YYYY HH:mm') + ' - ' + end.format('MM/DD/YYYY HH:mm'));
						vueComponent.updateValue(start.format('MM/DD/YYYY HH:mm') + ' - ' + end.format('MM/DD/YYYY HH:mm'));
					} else {
						$('#daterangerpicker-' + this.currTimes).val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
						vueComponent.updateValue(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
					}
				});
			} else {
				$('#daterangerpicker-' + this.currTimes).daterangepicker({
					"timePicker": vueComponent.ifshowTime,
					"timePicker24Hour": true,
					"timePickerIncrement": 10,
					"linkedCalendars": false,
					"autoUpdateInput": false,
					"startDate": startDate,
					"endDate": endDate,
					"opens" : "right"
				}, function(start, end) {
					if(vueComponent.ifshowTime) {
						$('#daterangerpicker-' + this.currTimes).val(start.format('MM/DD/YYYY HH:mm') + ' - ' + end.format('MM/DD/YYYY HH:mm'));
						vueComponent.updateValue(start.format('MM/DD/YYYY HH:mm') + ' - ' + end.format('MM/DD/YYYY HH:mm'));
					} else {
						$('#daterangerpicker-' + this.currTimes).val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
						vueComponent.updateValue(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
					}
				});
			}

			if(this.value && this.value != '') {

			} else {
				vueComponent.updateValue(startDate + ' - ' + endDate);
			}
			
		},
		data() {
			return {
				currTimes: this.generateUUID() + "-" + new Date().getTime()
			}
		},
		computed: {
			selectValue: {
				// 动态计算selectValue的值
				get: function() {
					return this.value;
				}
			},
			ifshowTime: {
				get: function() {
					if(this.showTime == 'true') {
						return true;
					} else {
						return false;
					}
				}
			}
		}
	}
</script>

<template>
	<div class="input-group date" style="width:100%;">
		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>
		</div>
		<input :id="'datepicker-' + currTimes" v-model="selectValue" type="text" class="form-control pull-right datepicker input" :name="realname" :class="{'is-danger': errors.has(realname) }" :placeholder="placeholder" v-validate="rules">
	</div>
	<!-- /.input group -->
</template>
<script>
	export default {
		name: "Datepicker",
		props: ["value", "placeholder", "dateformate", "name", "otherRules"],
		inject: {
			$validator: '$validator'
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
			updateValue: function(value) {
				this.$emit('input', value)
			},
			formatDate: function(d) {
				var date = new Date(d);
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var str = year + "-" + month + "-" + strDate;
				return str;
			},
			getRules: function() {
				var rules = "";
				if(this.otherRules) {
					rules = this.otherRules + "|";

					if(this.otherRules.indexOf('required') != -1) {
						this.isRequired = true;
					}
				}

				return rules;
			}
		},
		mounted() {
			var vueComponent = this;
			var format = this.formatDate;
			if(this.dateformate) {
				var dateformate_ = this.dateformate;
				$('#datepicker-' + this.currTimes).datepicker({
					autoclose: true,
					format: dateformate_
				}).on("changeDate", function(e) {
					vueComponent.updateValue($(this).datepicker("getFormattedDate"));
				});
				//$('#datepicker-'+this.currTimes).datepicker("setDate",format(this.value));
			} else {
				$('#datepicker-' + this.currTimes).datepicker({
					autoclose: true,
					format: "yyyy-mm-dd"
				}).on("changeDate", function(e) {
					vueComponent.updateValue(format($(this).datepicker("getDate")));
				});
				$('#datepicker-' + this.currTimes).datepicker("setDate", format(this.value));
			}

		},
		data() {
			return {
				currTimes: this.generateUUID() + "-" + new Date().getTime()
			}
		},
		watch: {
			"value": {
				handler(curVal, oldVal) {
					this.value = curVal;
				},
				deep: true
			}
		},
		computed: {
			selectValue: {
				// 动态计算selectValue的值
				get: function() {
					return this.value;
				},
				set:function(val){
					this.$emit('input', val);
				}
			},
			rules: {
				// 动态计算rules的值
				get: function() {
					return this.getRules();
				}
			},
			realname: {
				get: function() {
					if(this.name) {
						return this.name;
					} else {
						return this.currTimes;
					}
				}
			}
		}
	}
</script>
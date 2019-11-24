<template>
	<div class="input-group date bootstrap-timepicker" style="width:100%;">
		<div class="input-group-addon">
			<i class="fa fa-clock-o"></i>
		</div>
		<input :id="'timepicker-' + currTimes" v-model="selectValue" type="text" class="form-control pull-right timepicker input" :name="realname" :class="{'is-danger': errors.has(realname) }" :placeholder="placeholder" v-validate="rules" @change="change" :style="customStyle">
	</div>
	<!-- /.input group -->
</template>
<script>
	export default {
		name: "Timepicker2",
		props: ["value", "placeholder", "name", "otherRules","customStyle"],
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
			getRules: function() {
				var rules = "";
				if(this.otherRules) {
					rules = this.otherRules + "|";

					if(this.otherRules.indexOf('required') != -1) {
						this.isRequired = true;
					}
				}

				return rules;
			},
			change: function (){
			  this.$emit('change');
			}
		},
		mounted() {
			var vueComponent = this;
			//http://www.uedsc.com/bootstrap-timepicker.html

			$('#timepicker-' + this.currTimes).timepicker({
				showInputs: false,
				showMeridian: false
			});

			$('#timepicker-' + this.currTimes).timepicker().on('changeTime.timepicker', function(e) {
				//console.log('The time is ' + e.time.value);
				$('#timepicker-' + this.currTimes).val(e.time.value);
				vueComponent.updateValue(e.time.value);
				
				//console.log('The hour is ' + e.time.hours);
				//console.log('The minute is ' + e.time.minutes);
				//console.log('The meridian is ' + e.time.meridian);
			});
			//console.log('this.value is ' + this.value);
			if(!this.value){
				setTimeout(function(){
					//vueComponent.updateValue('');
					vueComponent.$emit('input', '');
					//vueComponent.value='';
					//$('#timepicker-' + this.currTimes).val('');
				},900);
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
					this.$emit('change');
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
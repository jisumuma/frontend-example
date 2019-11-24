<template>
	<div class="vue-city-picker" @mouseout="endChoice" @mouseover="startMouseOver">
		<input v-show="!noInput" type="text" autocomplete="off" disableautocomplete :name="field" :id="field" :class="{'form-control':true,'input': true, 'is-danger': errors.has(field) }" :value="currCityName" :placeholder="placeholder" @focus="startChoice" @keypress="startChoice" @blur="endChoice" ref="input" v-validate="rules" style="box-sizing: border-box;">
		<!--城市选择-->
		<div class="vcp-panel" :class="position" v-show="cityPanelIsShow">
			<h5>城市选择</h5>
			<ul class="vcp-tags">
				<li :class="{'z-on': item==tagKey}" v-for="item in tagsArr" @click="choiceTag(item)">{{ item }}</li>
			</ul>
			<div class="vcp-list">
				<div :class="{'z-hot': initial == 'hot'}" v-for="(citys,initial) in cityList" v-show="currTagIncludes(initial)">
					<h6 v-if="initial != 'hot'&&initial != 'abroad'">{{ initial }}</h6>
					<ul>
						<li v-for="v in citys" @click="choiceCity(v.id)" :title="v.name">{{ v.name }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	'use strict';
	import cityListJson from './china-city-data.json'
	export default {
		name: 'CityPicker',
		inject: {
			$validator: '$validator'
		},
		props: {
			field: {
				type: String,
				default: ''
			},
			value: {
				default: '',
				twoWay: true
			},
			placeholder: {
				type: String,
				default: ''
			},
			noInput: {
				type: Boolean,
				default: false
			},
			// 没有热门城市
			noHot: {
				type: Boolean,
				default: false
			},
			required: {
				type: Boolean,
				default: true
			},
			leftorright: {
				type: String,
				default: ''
			}
		},
		data() {
			let cityList = cityListJson;

			let tagsArr = ['热门', 'ABCDE', 'FGHJ', 'KLMN', 'PQRST', 'WXYZ', 'Abroad 国外 '],
				tagKey = '热门',
				tags = {};
			if(this.noHot) {
				tagsArr = ['ABCD', 'EFGH', 'JKL', 'MNPQ', 'RSTW', 'XYZ', 'Abroad 国外 '];
				tagKey = 'ABCD';
			}
			tagsArr.forEach((item) => {
				if(item == '热门') {
					tags[item] = ['hot'];
				} else if(item == 'Abroad 国外 ') {
					tags[item] = ['abroad'];
				} else {
					tags[item] = item.split('');
				}
			});
			return {
				cityList,
				cityPanelIsShow: false,
				isMouseOver: false,
				tagsArr,
				tags,
				tagKey
			};
		},
		mounted() {
			let url = "/city/getcitypickerjson";
			let dm;

			if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}
			if(dm) {
				this.cityList = dm.cityList;
			} else {
				this.cityList = cityListJson || {};
			}
		},
		watch: {
			"value": {
				handler(curVal, oldVal) {
					this.modelValue = curVal;
				},
				deep: true
			}
		},
		computed: {
			// 当前城市名字
			currCityName() {
				let {
					value,
					cityList
				} = this,
				cityName = '';
				Object.keys(cityList).forEach((item) => {
					cityList[item].forEach((item) => {
						if(value == item.id) {
							cityName = item.name;
						}
					})
				});
				return cityName;
			},
			currTag() {
				let {
					tagKey,
					tags
				} = this;
				return tags[tagKey];
			},
			modelValue: {
				// 动态计算modelValue的值
				get: function() {
					if(this.value) {
						return this.value;
					} else {
						return "";
					}
				},
				set: function(val) {
					this.$emit('input', val);
				}
			},

			rules: {
				// 动态计算rules的值
				get: function() {
					if(!this.required) {
						return '';
					} else {
						return 'required';
					}
				}
			},
			position: {
				get: function() {
					if(this.leftorright == 'right') {
						return 'vcp-panel-right';
					}
					return 'vcp-panel-left'
				}
			}
		},
		methods: {
			// 列表是否属于当前标签
			currTagIncludes(ini) {
				let {
					currTag
				} = this;
				return $.inArray(ini, currTag) > -1;
			},
			// 选择标签
			choiceTag(key) {
				this.tagKey = key;
			},
			// 开始城市选择
			startChoice(e) {
				if(e && e.type == 'keypress') {
					e.returnValue = false;
				}
				this.cityPanelIsShow = true;
			},
			choiceCity(id) {
				this.modelValue = id;
				this.errors.remove(this.field);
				this.immEndChoice();
			},
			// 鼠标离开城市选择区域时超过一定时间，关闭城市面板
			endChoice(e) {
				let that = this,
					inputEle = that.$refs.input;
				if(e.type == 'mouseout') {
					that.isMouseOver = false;
				}
				setTimeout(function() {
					if(!that.isMouseOver && inputEle != document.activeElement) {
						that.cityPanelIsShow = false;
					}
				}, 300);
			},
			startMouseOver() {
				this.isMouseOver = true;
			},
			// 立即关闭城市面板
			immEndChoice() {
				this.isMouseOver = true;
				this.cityPanelIsShow = false;
			}
		}
	}
</script>

<style scoped>
	@import "./city-picker.css"
</style>
<template>
	<div v-if="type === 'input'">
		<div :class="'col-' + col">
			<div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" @blur="blur" :style="'overflow: hidden;white-space: nowrap;text-overflow: ellipsis;' + customStyle">
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
				<label v-if="!ifAsterisk && !iflable">
					{{labelName}}
				</label>
	            <input type="text" :style="inputStyle" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" @blur="blur" >
	        </div>
	    </div>
    </div>	
	<div v-else-if="type === 'inputHorizon'">
		<div :class="'col-' + col">
			<div v-if="ifTable">
	            <label class="pull-left" for="" v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}&nbsp;&nbsp;
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" style="float:right;width:23%;height:23px;">
	        </div>
	        <div v-else class="form-group">
	            <label class="pull-left" for="" v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}&nbsp;&nbsp;
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" style="float:right;width:23%;height:30px;">
	        </div>
	    </div>
	</div>
	<div v-else-if="type === 'input2'">
		<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
					&nbsp;<i class="fa fa-fw fa-info-circle text-info" :title="titleTips"></i>
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'input3'">
		<div :class="'col-' + col">
			<div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="inputTitle" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="inputTitle" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change">
	        </div>
	    </div>
    </div>
	<!--JDA -->
	<div v-else-if="type === 'input4'">
		<div :class="'col-' + col">
			<div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" :style="inputStyle" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change">
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'input5'">
		<div :class="'col-' + col">
			<div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" :style="groupStyle" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" >
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'input6'">
		<div :class="'col-' + col" :style="paddingShow">
			<div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" @blur="blur">
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
				<label v-if="!ifAsterisk && !iflable">
					{{labelName}}
				</label>
	            <input type="text" v-model="modelValue" :title="modelValue" :name="name" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" @blur="blur" >
	        </div>
	    </div>
    </div>
    <div v-else-if="type === 'datepicker'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
				<label v-if="!ifAsterisk && !iflable">
					{{labelName}}
				</label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else-if="disabled">
					<input type="text" :disabled="disabled" v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<datepicker v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules" :dateformate="dateformate" :endDate="endDate" :startDate="startDate" :maxViewMode="maxViewMode" :minViewMode="minViewMode"></datepicker>
  				</div>
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'datepicker2'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
					&nbsp;<i class="fa fa-fw fa-info-circle text-info" :title="titleTips"></i>
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else-if="disabled">
					<input type="text" :disabled="disabled" v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<datepicker v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules" :dateformate="dateformate"></datepicker>
  				</div>
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'datepicker3'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<datepicker v-model="modelValue" :showTime="showTime" :name="name" :placeholder="placeholder" :other-rules="otherRules" :dateformate="dateformate"></datepicker>
  				</div>
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'datepicker4'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<datepicker3 v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules" :dateformate="dateformate"></datepicker3>
  				</div>
	        </div>
	    </div>
    </div>
        <div v-else-if="type === 'timepicker'">
    	<div :class="'col-' + col">
			<div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<timepicker v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules"></timepicker>
  				</div>
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<timepicker v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules"></timepicker>
  				</div>
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'timepicker2'">
    	<div :class="'col-' + col">
	        <div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else-if="disabled">
					<input type="text" :disabled="disabled" v-model="modelValue" :name="name" class="form-control input" :style="customStyle">
				</div>
				<div v-else>
					<timepicker2 v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules" @change="change" :customStyle="customStyle"></timepicker2>
  				</div>
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else-if="disabled">
					<input type="text" :disabled="disabled" v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<timepicker2 v-model="modelValue" :name="name" :placeholder="placeholder" :other-rules="otherRules" @change="change"></timepicker2>
  				</div>
	        </div>
	    </div>
    </div>
     <div v-else-if="type === 'daterangepicker'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else-if="disabled">
					<input type="text" :disabled="disabled" v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<daterangepicker v-model="modelValue" :name="name" :showTime="showTime" :dateLimit="dateLimit"></daterangepicker>
  				</div>
	        </div>
	    </div>
    </div>
	 <div v-else-if="type === 'daterangepicker2'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<daterangepicker v-model="modelValue" :name="name" :showTime="showTime" :dateLimit="dateLimit"></daterangepicker>
  				</div>
	        </div>
	    </div>
    </div>
    <div v-else-if="type === 'singledaterangepicker'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<Singledaterangepicker v-model="modelValue" :name="name" :init="init" :singleDatePicker="singleDatePicker" :required="otherRules"></Singledaterangepicker>
  				</div>
	        </div>
	    </div>
    </div>
	<div v-else-if="type === 'singledaterangepicker2'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<Singledaterangepicker v-on:afterapply="$emit('afterapply')" :maxDate="endDate" :minDate="startDate" v-model="modelValue" :name="name" :init="init" :singleDatePicker="singleDatePicker" :required="otherRules"></Singledaterangepicker>
  				</div>
	        </div>
	    </div>
    </div>
	<!-- YYYY-MM-DD HH:mm 格式 -->
	<div v-else-if="type === 'singledaterangepickerSeparator'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
					<input type="text" readonly v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else-if="disabled">
					<input type="text" disabled="disabled" v-model="modelValue" :name="name" class="form-control input">
				</div>
				<div v-else>
					<SingledaterangepickerSeparator :maxDate="endDate" :minDate="startDate" v-model="modelValue" :name="name" :init="init" :singleDatePicker="singleDatePicker" :required="otherRules"></SingledaterangepickerSeparator>
  				</div>
	        </div>
	    </div>
    </div>
    <div v-else-if="type === 'select'">
    	<div :class="'col-' + col" :style="paddingShow">
	        <div v-if="ifTable">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" readonly v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else-if="disabled">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" :disabled="disabled" v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else>
					<select :id="'select-'+name" :value="modelValue" v-select :uri="uri" :name="name" v-model="modelValue" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" :other-rules="otherRules"></select>
  				</div>
	        </div>
	        <div v-else class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" readonly v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else-if="disabled">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" :style="inputStyle" :disabled="disabled" v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else>
					<select :id="'select-'+name" :style="inputStyle" :disabled="disabled" :value="modelValue" v-select :uri="uri" :name="name" v-model="modelValue" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" :other-rules="otherRules"></select>
  				</div>
	        </div>
	    </div>
    </div>
     <div v-else-if="type === 'select2'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
				<label v-if="!ifAsterisk && !iflable">
					{{labelName}}
				</label>
	            <div v-if="readonly">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" readonly v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else  :class="{'input': errors.has(name) , 'is-danger': errors.has(name) }">
					<select style="width:99%;" :id="'select-'+name" :value="modelValue" :title="modelValue" :data-value="modelValue" :disabled="disabled" v-select2 :uri="uri" :name="name" v-model="modelValue"  :multiple="multiple"  :data-maximum-selection-length="maxlength" :data-tags="realtags"
						v-validate="rules" data-vv-validate-on="input" :class="{'form-control':true,'input': true}" @change="change"></select>
  				</div>
	        </div>
	    </div>
    </div>
	<!--Please Select 请选择-->
	<div v-else-if="type === 'select3'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequiredTwo" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
				<label v-if="!ifAsterisk && !iflable">
					{{labelName}}
				</label>
	            <div v-if="readonly">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" readonly v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else-if="disabled">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" :style="inputStyle" :disabled="disabled" v-search="modelValue" :uri="uri" class="form-control input">
				</div>
				<div v-else>
					<select :id="'select-'+name" :style="inputStyle" :disabled="disabled" :value="modelValue" v-select3 :uri="uri" :name="name" v-model="modelValue" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" @change="change" :other-rules="otherRules"></select>
  				</div>
	        </div>
	    </div>
    </div>
    <div v-else-if="type === 'citypicker'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <div v-if="readonly">
						<input type="hidden" v-model="modelValue" :name="name" class="form-control input">
						<input type="text" readonly v-model="modelValue"  class="form-control input">
				</div>
				<div v-else  >
					<CityPicker :field="name" :required="cityisrequired" placeholder="select city 选择城市"  :leftorright="leftorright"  v-model="modelValue"></CityPicker>
  				</div>
	        </div>
	    </div>
    </div>
	<!-- 只有FAT使用 -->
	<div v-else-if="type === 'textarea0'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <textarea-my v-model="modelValue" :rows="rows" :placeholder="labelName" :name="name" :readonly="readonly" :other-rules="otherRules" ></textarea-my>
	        </div>
	    </div>
    </div>
	<!--limit默认300，超出会自动截取-->
    <div v-else-if="type === 'textarea'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="this.otherRules.indexOf('required')!=-1" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <textarea-my :hasstyle="hasstyle" v-model="modelValue" :rows="rows" :placeholder="labelName" :name="name" :readonly="readonly" :other-rules="otherRules" :limit="limit"></textarea-my>
	        </div>
	    </div>
    </div>
	<!--limit默认100，超出会自动截取 只有QPA使用-->
	<div v-else-if="type === 'textarea1'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <textarea-h v-model="modelValue" :rows="rows" :placeholder="labelName" :name="name" :readonly="readonly" :other-rules="otherRules" :limit="limit" ></textarea-h>
	        </div>
	    </div>
    </div>
	<!--limit默认300，长度超出不会截取，且ifEnglish=true则是英文，hasstyle=true边框显示红色 - -->
	<div v-else-if="type === 'textarea2'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <textarea2 :ifEnglish="ifEnglish" :hasstyle="hasstyle" v-model="modelValue" :rows="rows" :placeholder="labelName" :name="name" :readonly="readonly" :other-rules="otherRules" :limit="limit" ></textarea2>
	        </div>
	    </div>
    </div>
	<!--无提示信息，invalidate使用-->
	<div v-else-if="type === 'textarea3'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <textarea3 v-model="modelValue" :rows="rows" :placeholder="labelName" :name="name" :readonly="readonly" :other-rules="otherRules" :limit="limit" ></textarea3>
	        </div>
	    </div>
    </div>
	<!--只有JD使用 纯英文，limit默认100，超出会自动截取，hasstyle=true边框显示红色 - -->
	<div v-else-if="type === 'textareaEnglish'">
    	<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <textareaEnglish :hasstyle="hasstyle" v-model="modelValue" :rows="rows" :placeholder="labelName" :name="name" :readonly="readonly" :other-rules="otherRules" :limit="limit" ></textareaEnglish>
	        </div>
	    </div>
    </div>
    <div v-else-if="type === 'upload'">

    </div>
    <div v-else-if="type === 'currency'">
		<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
				<label v-if="!ifAsterisk && !iflable">
					{{labelName}}
				</label>
	            <input type="text" v-model="modelValue" :title="modelValue" @change="change" @blur="currencyblur" @focus="currencyfocus" :name="name" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"> 
	        </div>
	    </div>
    </div>
    <div v-else-if="type === 'passport'">
		<div :class="'col-' + col">
	        <div class="form-group">
	            <label v-if="iflable">
					<i v-if="isRequired" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
	            	{{labelName}}
	            </label>
	            <input type="text" v-model="modelValue" :title="modelValue" @change="passportValid" :name="name" :readonly="readonly" v-validate="rules" :class="{'form-control':true,'input': true, 'is-danger': errors.has(name) }" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"> 
	        </div>
	    </div>
    </div>
    <div v-else>

    </div>
</template>
<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'FormGroup',
		props:["col","type","name","value","readonly","uri","otherRules","multiple","haslable","isTable","maxlength","disabled","showTime","leftorright","placeholder","dateformate","dateLimit","tags","label","hideRisk","titleTips","init","singleDatePicker","inputTitle","startDate","endDate", "maxViewMode", "minViewMode","limit","rows","hasstyle","updatestyle","hasAsterisk","paddingShow","ifEnglish","customStyle"],
		inject: {
			$validator: '$validator'
		},
		data(){
			return {
				isRequired:false,
				validRequired:false
			}
		},
    watch: {
      "value":{
        handler(curVal,oldVal){
          this.modelValue=curVal;
        },
        deep:true
      }
    },
		computed:{
			modelValue:{
				// 动态计算modelValue的值
				get:function() {
					if(this.value){
						return this.value;
					}else if(this.value === 0){
						return "0";
					}else{
						return "";
					}
				},
				set:function(val) {
					this.$emit('input', val);
				}
			},
			labelName: {
				// 动态计算labelName的值
				get:function() {
                    if(this.label != null && this.label != ""){
                      var deafaultLabel = this.$t(this.label);
					  return deafaultLabel;
					}			
					if(this.$route.query.formId){
						var labelId = this.$route.query.formId+"."+this.name;
						var deafaultLabel = this.$t(labelId);
						if(labelId == deafaultLabel){
							deafaultLabel = this.name.replace(/([a-z])([A-Z])/,"$1 $2");
							deafaultLabel = deafaultLabel.substring(0,1).toUpperCase()+deafaultLabel.substring(1);
						}
						return deafaultLabel;
					}else{
						var deafaultLabel = this.name.replace(/([a-z])([A-Z])/,"$1 $2");
						deafaultLabel = deafaultLabel.substring(0,1).toUpperCase()+deafaultLabel.substring(1);
						return deafaultLabel;
					}
				}
			},
			rules:{
				// 动态计算rules的值
				get:function() {
					return this.getRules();
				}
			},
			isRequiredTwo:{
				// 动态计算rules的值
				get:function() {
				if(this.otherRules=='required'){
						return true;
					}else{
						return false;
					}
				}
			},
			iflable:{
				get:function() {
					if(this.haslable == "false") {
						return false;
					} else {
						return true;
					}
				}
			},
			ifAsterisk:{
				get:function() {
					if(this.hasAsterisk == "false") {
						return false;
					} else {
						return true;
					}
				}
			},
			ifTable:{
				get:function() {
					if(this.isTable == "true") {
						return true;
					} else {
						return false;
					}
				}
			},
			cityisrequired:{
				get:function() {
					this.getRules();
					if(this.validRequired ) {
						return true;
					} else {
						return false;
					}
				}
			},
			realtags:{
				get:function() {
					if(this.tags!=undefined&&this.tags!=null&&this.tags!='' ) {
						return this.tags;
					} else {
						return "true";
					}
				}
			},
			//JDA 比较 显示红色边框
			inputStyle:{
				get:function() {
					if(this.hasstyle) {
						return "overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border-color:#FF0000;";
					} else {
						return "overflow: hidden;white-space: nowrap;text-overflow: ellipsis;";
					}
				}
			},
			//BusinessCard修改样式
            groupStyle:{
                get:function() {
					if(this.updatestyle=='margin-left') {
						return "height:30px !important;margin-bottom:-12px !important;margin-top: 2px !important;margin-left:-10px !important;font-family: Arial,simsun !important;font-size: 12px;padding: 0 0 !important;";
					}else{
						return "height:30px !important;margin-bottom:-12px !important;margin-top: 2px !important;font-family: Arial,simsun !important;font-size:12px;padding: 0 0 !important;"
					}
				}
			}

		},
		methods:{
			currencyblur: function(){
				var reg = /^\d{1,18}(?:\.\d{0,2})?$/;
				if(this.readonly) {
					//只读不做操作
				} else {
					if(this.modelValue) {
						if(!(reg.test(this.modelValue))) {

							$.alert(' Only 18 numbers and 2 decimal point.  只能输入18位数字和2位小数点。');
							this.modelValue="";

						} 
						//强制保留两位小数
						var newVal = global_.toDecimal2(this.modelValue);
						newVal=global_.formatCurrency(newVal);
						this.modelValue=newVal;
						
					}
				}
			},
			currencyfocus: function(){
				if(this.readonly) {
					//只读不做操作
				} else {
					if(this.modelValue) {
						var newVal=this.modelValue.replace(new RegExp(",","gm"),"");
						this.modelValue=newVal;
					}
				}
			},
			passportValid:function(){
				//验证护照是否正确
				//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
                var reg=/(E\d{8})|(SE\d{7})|(DE\d{7})|(PE\d{7})|(MA\d{7})|(K\d{7})/;
				if(this.modelValue) {
					if(!(reg.test(this.modelValue))) {
							$.alert(' Only passport.  只能输入正确的护照号。');
							this.modelValue="";
					} 
				}
			},
			change: function (){
		      	this.$emit('change');
		    },
		    blur: function (){
		      	this.$emit('blur');
		    },
			getRules:function(){
				var formValid =[];
				if(this.$route.query.formValid)
					formValid= this.$route.query.formValid;

				var fieldRules = formValid[this.name];
				var rules="";
				if(this.otherRules){
					rules = this.otherRules+"|";

					if(this.otherRules.indexOf('required')!=-1){
						this.validRequired = true;
						this.isRequired = true;
					}
				}
				if(fieldRules){
					rules += fieldRules;
					if(fieldRules.indexOf('required')!=-1){
						this.validRequired = true;
						this.isRequired = true;
					}
				}
				if(this.hideRisk){
					this.isRequired = false;
				}
				return rules;
			}
		},
		mounted() {
			//console.log(this);
			this.$validator.reset();
		}
	}
</script>
<style>
	textarea.form-control{
		padding:4px 12px;
	}
</style>

import Vue from 'vue'
import VeeValidate from 'vee-validate'
const veeConfig = {
	errorBagName: 'errors', // change if property conflicts.
	fieldsBagName: 'fields', 
	delay: 200, //延长校验
	locale: 'en', 
	dictionary: null, 
	strict: true, 
	enableAutoClasses: false, 
	classNames: {
		touched: 'touched', // the control has been blurred
	    untouched: 'untouched', // the control hasn't been blurred
	    valid: 'valid', // model is valid
	    invalid: 'invalid', // model is invalid
	    pristine: 'pristine', // control has not been interacted with
	    dirty: 'dirty' // control has been interacted with
	}
};
Vue.use(VeeValidate,veeConfig)

//自定义提示
const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => field + '不能为空'
        }
    }
};
//Validator.updateDictionary(dictionary);

//自定义验证
import { Validator } from 'vee-validate';

Validator.extend('verify_amount', {
	getMessage: (field) => `The ${field} is may be larger than 10.`,
	validate: (value) => new Promise(resolve => {
		resolve({
			valid: value > 10
		});
	})
});


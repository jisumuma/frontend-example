<template>
  <input type="text" v-validate="rules" :id="'currencyInput-'+ currTimes" :name="currTimes"
         :class="{'error':errors.has(currTimes)}" @focus="onFocus" @blur="onBlur"
         v-model="currency" :title="currency" class="input currencyInput" :disabled="disabled" @keydown="onlyNum"
         style="text-align: right"/>
</template>

<script>
  export default {
    name: 'CurrencyInput',
    props: ["value", "required", "isInt", "xlength", "disabled"],
    inject: {
      $validator: '$validator'
    },
    data() {
      return {
        currTimes: this.generateUUID() + "-" + new Date().getTime(),
        currency: this.value
      }
    },
    watch: {
      value: function (nval, oval) {      
        if(nval=="" || nval ==null){
          this.currency =null;
        }else if (nval > 0 && nval != "0") {
          this.currency = this.numToCurrency(this.currencyToNumber(nval));
        } else {
          this.currency = "0.00";
        }
      }
    },
    methods: {
      generateUUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      },
      numToCurrency: function (value) {
        var util = new Util();
        var temp;
        if (this.isInt == true || this.isInt == "true")
          temp = util.formatIntToCurrency(value);
        else
          temp = util.formatNumberToCurrency(value);     
        return temp;
      },
      currencyToNumber: function (value) {
        let util = new Util();
        let temp = util.formatCurrencyToNumber(value);
        return temp;
      },
      onFocus: function () {
        this.currency = this.currencyToNumber(this.currency);
        // if (this.currency == "0") {
        //   this.currency = "";
        // }
      },
      onBlur: function (event) {
        console.log(this.currency);
        // if (this.currency == "") {
        //   this.currency = "0";
        // }
        // let value = parseInt(this.currency); // convert input value to num
        // console.log(value);
        let re = /^-?\d*\.?\d*$/;  // parseInt has error use reg
        if (!re.test(this.currency)) { // if value is NaN
          let _this = this;
          $.confirm({
            title: "",
            content: this.$t("input_num"),
            buttons: {
              ok: {
                text: this.$t("ok"),
                action: function () {
                  _this.currency = "0";
                  _this.$emit("input", "0");
                  setTimeout(function () {
                    $(event.target).focus();
                  }, 200);
                }
              }
            }
          })
        } else {
          let util = new Util();
          if (this.isInt == true || this.isInt == "true") {
            this.$emit('input', util.toInt(this.currency));
          }
          else {
            this.$emit('input', util.toDecimal2(this.currency));
          }
          this.currency = this.numToCurrency(this.currency);
        }
      },
      // only allow num and arrow key, when input content using chinese IME, there will be problem
      onlyNum: function (e) {
        let ch = e.key;
        if (!(/\d*\.?\d*/.test(ch) || ch == "Backspace" || ch == "ArrowRight" || ch == "ArrowLeft")) {
          e.preventDefault();
        }
      }
    },
    computed: {
      rules: {
        // 动态计算rules的值
        get: function () {
          let temp = '';
          if (this.required) {
            if (this.required == 'true' || this.required == true) {
              temp += 'required';
            }
          }
          if (this.xlength) {
            if (temp.length > 0) {
              temp += '|max:' + this.xlength;
            }
            else {
              temp += 'max:' + this.xlength;
            }
          }
          return temp;
        }
      },
    },
    mounted() {
        this.currency = this.numToCurrency(this.currency);
    }
  }
</script>

<style>
</style>

import Vue from 'vue'
//global variable
import global_ from './components/Common/Util/Global.vue'
Vue.prototype.GL = global_

/**
 * select2 下拉框指令设定
 */
Vue.directive('select2', {
    inserted: function(el, binding, vnode) {
    	function isArray(o){
        	return Object.prototype.toString.call(o)=='[object Array]';
        }
        var options = binding.value || {};

        var uri = $(el).attr("uri");
        var valthis = $(el).attr("data-value");
        if(valthis){
	        if(isArray(valthis)){

	        }else{
	        	valthis=valthis.split(",");
	        }
        }
        if (uri) {
            global_.actUtil.query("get", uri, "", function(data) {
                var dm = JSON.parse(data);
                var ops = { data: [{ id: '', text: '' }] };
                for (var d in dm) {
                	if(valthis&&valthis.length>0){
                		if($.inArray(d,valthis)>-1){
                			valthis.splice($.inArray(d, valthis), 1);
                		}
                	}
                    var op = { id: null, text: null };
                    op.id = d;
                    op.text = dm[d];
                    ops.data.push(op);
                }
                if(valthis&&valthis.length>0){
                	for(var te in valthis){
	                	 var op = { id: null, text: null };
	                     op.id = valthis[te];
	                     op.text = valthis[te];
	                     ops.data.push(op);
                	}
                }
                options = ops;

            });
        }

        var multiple=$(el).attr("multiple");
        var tags = $(el).attr("data-tags");
        if("true"==tags){
            options.tags = true;
        }
        options.placeholder = "--Please Select--";
        options.placeholderOption = "first";
        options.allowClear = true;
        if("multiple"!=multiple){
	        $(el).select2(options).on("select2:select", (e) => {
	            el.dispatchEvent(new Event('change', { target: e.target }));
	        });
        }else{
        	options.allowClear = false;
        	var maxlength=$(el).attr("data-maximum-selection-length");
        	if(maxlength)
        		options.maximumSelectionLength=maxlength;
        	var val = $(el).attr("data-value");
        	if (val) {
        		val=val.split(",");
	        	$(el).select2(options).on("select2:select", (e) => {
		            el.dispatchEvent(new Event('change', { target: e.target }));
		        }).val(val).trigger('change');
	        	$(el).select2().val(val).trigger('change');
        	}else{
        		$(el).select2(options).on("select2:select", (e) => {
    	            el.dispatchEvent(new Event('change', { target: e.target }));
    	        });
        	}
        }
        //回显
        var val = $(el).attr("data-value");
        if (val) {
            $(el).find("option").each(function() {
                if (val == $(this).attr('value')) {
                    $(this).attr("selected", 'selected');
                }
            });

            if("multiple"!=multiple){
            	$(el).select2(options);
            }else{
            	val=val.split(",");
            	$(el).select2(options).val(val).trigger('change');
            }
        }else{
        	$(el).select2(options);
        }

      if("multiple"!=multiple){
        //allowClear:清除选中
	       $(el).select2(options).on("select2:unselecting", (e) => {
	          //清空这个值，这个值即vuejs model绑定的值
	          e.target.value = "";
	        el.dispatchEvent(new Event('change', {
	          target: e.target
	        })); //双向绑定不生效
	      });
      }else{
    	  $(el).select2(options).on("select2:unselecting", (e) => {
              //清空这个值，这个值即vuejs model绑定的值
    		  setTimeout(function(){
    			  var ary=$(el).val();
    			  $(e.target).val(ary);
    			  el.dispatchEvent(new Event('change', {
    	              target: e.target
    	            })); //双向绑定不生效
    			  },300);
    		  
          }); 
      }



    },
    update: function(el, binding, vnode) {
        var multiple=$(el).attr("multiple");
        var opts = {};
        opts.placeholder = "--Please Select--";
        opts.placeholderOption = "first";
        opts.allowClear = true;
        var tags = $(el).attr("data-tags");
        if("true"==tags){
            opts.tags = true;
        }
    	if("multiple"!=multiple){
    		$(el).trigger("change");
        }else{
        	opts.allowClear = false;
        	var maxlength=$(el).attr("data-maximum-selection-length");
        	if(maxlength)
        		opts.maximumSelectionLength=maxlength;
        	var val = $(el).attr("data-value");
        	if(val){
        		val=val.split(",");
        		$(el).select2(opts).val(val).trigger('change');
        	}else{
        		$(el).select2(opts).val([]).trigger('change');
        	}
        }
    }
});

/**
 * select 下拉框指令设定
 */
Vue.directive('select', {
    inserted: function(el, binding, vnode) {
        var uri = $(el).attr("uri");
        var html = '<option value=""  >--Please Select--</option>';
        if (uri) {
            global_.actUtil.query("get", uri, "", function(data) {
                var dm = JSON.parse(data);
                for (var d in dm) {
                    html += '<option value="' + d + '">' + dm[d] + '</option>'
                }
            });
        }
        $(el).append(html);

    }
});
/**
 * select 下拉框指令设定
 */
Vue.directive('select3', {
    inserted: function(el, binding, vnode) {
        var uri = $(el).attr("uri");
        var html = '<option value=""  >--Please Select 请选择--</option>';
        if (uri) {
            global_.actUtil.query("get", uri, "", function(data) {
                var dm = JSON.parse(data);
                for (var d in dm) {
                    html += '<option value="' + d + '">' + dm[d] + '</option>'
                }
            });
        }
        $(el).append(html);

    }
});
/**
 * select 下拉框readonly回显指令设定
 */
Vue.directive('search', {
    inserted: function(el, binding, vnode) {
        var uri = $(el).attr("uri");
        var selected = binding.value || "";
        function isArray(o){
        	return Object.prototype.toString.call(o)=='[object Array]';
        }
        if (uri) {
            global_.actUtil.query("get", uri, "", function(data) {
                var dm = JSON.parse(data);
                var tempvalue="";
                for (var d in dm) {
                	if(isArray(selected)){
                		if($.inArray(d,selected)>-1){
                			if(tempvalue==""){
                				tempvalue+=dm[d];
                			}else{
                				tempvalue+=","+dm[d];
                			}
                			selected.splice($.inArray(d, selected), 1);
                		}
                	}else{
	                	if(d == selected){
	                		tempvalue=dm[d];
	                		break;
	                	}
                	}
                }
                if(isArray(selected)&&selected.length>0){
                	for(var te in selected){
	                	if(tempvalue==""){
	        				tempvalue+=selected[te];
	        			}else{
	        				tempvalue+=","+selected[te];
	        			}
                	}
                }
                if(tempvalue==""){
                	tempvalue=selected;
                }
                $(el).attr("value",tempvalue);

            });
        }else{
        	$(el).attr("value",selected);
        }

    }
});

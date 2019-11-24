<template>

	<!-- Content Wrapper. Contains page content -->
	<div>
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>Request for Quotations Application<a href="#" class="hidden" style="margin-left: 10px; font-size: 18px;"><i class="fa fa-fw fa-info-circle"></i>Check IT portal</a></h1>
			<ol class="breadcrumb" v-if="form.creatorDept=='Information Technology'">
				<li>
					<a>1.Applicant</a>
				</li>
				<li >
					<a>2.Information Security</a>
				</li>
				<li>
					<a>3.Cost Center Owner</a>
				</li>
			</ol>
			<ol class="breadcrumb" v-else>
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Cost Center Owner</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date : {{applicationTime}}</strong>
		</span>
		</section>
		<!-- Main content -->
		<section class="content container-fluid">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"> Applicant Info. 申请人信息  </h3>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.creatorStaffcode" name="creatorStaffcode" id="creatorStaffcode">
					<div class="box-body">
						<div class="row">
							<!-- <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Name 姓名 </label>
                      <input type="text" class="form-control" id="" placeholder="姓名 Name" value="Yin,Xueming" disabled="">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Division / Dept. 部门 </label>
                      <input type="text" class="form-control" id="" placeholder="部门 Division / Dept." value="HR, Organization & Education" disabled="">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Telephone 电话</label>
                      <input type="text" class="form-control" id="" placeholder="电话 Telephone" value="18322143376" disabled="">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">E-mail 邮箱 </label>
                      <input type="text" class="form-control" id="" placeholder="员工号 Staff Code" value="xueming.yin@atj.volkswagen.com.cn" disabled="">
                  </div>
                </div>-->
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorEmail" name="creatorEmail" readonly="readonly"></form-group>

						</div>
					</div>
				</form>
			</div>
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Request For Quotations Information 招标申请信息 </h3>
				</div>
				<form role="form">
					<div id="requestforquotations" class="box-body">
						<div class="row">
							<!--<div class="col-md-3">
                  <div class="form-group">
                      <label for="">Contract Purchasing Person 致采购员 </label>
                     <select class="form-control">
                        <option>--Please select--</option>
                      </select>
                  </div>
                </div>-->
							<div class="col-md-3">
								<div class="form-group">
									<form-group type="select2" uri="/requestForQuotationst/listbuyers" :readonly="readonly" v-model="form.purchasingPersonId" name="purchasingPersonId" tags="false"></form-group>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">Product Category  产品类别编号 </label>
									<input type="text" class="form-control" id="productCategry" placeholder="e-Class No." v-model="form.productCategry" name="productCategry" value="" :readonly="readonly">
								</div>
							</div>
							<div class="col-md-6" style="margin-top: 22px;">
								<div>
									<a target="_blank" :href="xlsxhref"><i class="fa fa-info-circle" style="font-size: 16px;
                              margin-right: 10px;
                              line-height: 20px; "></i>
									</a>
									<span><small>If E-Class No. is not clear, please contact the department's key user  如果不清楚E-Class编号请联系部门 Key User</small></span>
								</div>
							</div>
						</div>
						<div class="row">
							<!--<div class="col-md-3">
                  <div class="form-group">
                      <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Project 项目</label>
                      <select class="form-control">
                        <option>--Please select--</option>
                        <option>DQ380</option>
                        <option>DQ500</option>
                        <option>Other</option>
                      </select>
                  </div>
                </div>-->
							<div class="col-md-3">
								<div class="form-group">

									<form-group other-rules="required" type="select2" multiple="multiple" uri="/purchaseProject/listforselect" :readonly="readonly" v-model="form.purchaseProjectArray" name="purchaseProjectArray" tags="false"></form-group>

								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">Reference Process PR or PO PR或PO参考</label>
									<input type="text" class="form-control" id="" placeholder="Reference Process PR or PO PR或PO参考" value="" v-model="form.prOrPo" name="prOrPo" :readonly="readonly">
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Estimated (Budget)  &nbsp;估价（预算）</label>
									<!--  <div class="form-group">
                        <input type="text" class="form-control pull-left" style="width: 70%" id="" placeholder="Estimated (Budget)  &nbsp;估价（预算）" value="" width="70%" >

                        <div class="pull-left" style="position:relative;width: 30%; ">
                          <span style="margin-left:80px;width:18px;overflow:hidden;">
                          <select style="width:98px;margin-left:-80px;height: 34px;" select2 ng-model="b" onchange="this.parentNode.nextSibling.value=this.value" >
                          <option value="RMB">RMB</option>
                          <option value="EUR">EUR</option>
                          <option value="EUR"> EUR</option>
                          <option value="USD">USD</option>
                          </select></span><input class="form-control" name="box" placeholder="Currency" style="width:80px;padding:10px;position:absolute;left:0px;display: inline-block;" >
                        </div>
                      </div>-->
									<div class="form-group">
										<input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('estimatedBudget') }" name="estimatedBudget" style="width: 70%" id="estimatedBudget" :readonly="readonly" v-validate="'required'" v-model="form.estimatedBudget" placeholder="Estimated (Budget)  估价（预算）" value="" width="70%">
										<!-- 货币搜索 -->
										<div class="pull-left" style="position:relative;width: 30%; ">
											<span style="width:18px;overflow:hidden;" v-if="!readonly">
                            <select style="width:98px;margin-left:-80px;height: 34px;" v-select2 v-model="form.estimatedBudgetUnit"  onchange="this.parentNode.nextSibling.value=this.value">
                            	 <option value="">--</option>
                            <option value="RMB">RMB</option>
                            <option value="CHF">CHF</option>
                            <option value="EUR"> EUR</option>
                            <option value="USD">USD</option>
                            </select></span><input :class="{'form-control':true,'input':true, 'is-danger': errors.has('estimatedBudgetUnit'),'input-margintop-34':!readonly }" name="estimatedBudgetUnit" v-validate="'required'" :readonly="readonly" placeholder="Currency" v-model="form.estimatedBudgetUnit" style="width:80px;position:absolute;left:0px;display: inline-block;padding: 10px;">
										</div>
									</div>
								</div>

							</div>

						</div>
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label for="" style="height:40px;"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Arrival Date 到货日期</label>
									<div class="input-group date">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" :class="{'form-control':true,'input': true,'pull-right':true, 'is-danger': errors.has('arrivalDate') }" id="datepicker" v-validate="'required'" placeholder="_ _ /_ _ /_ _"
											v-model="form.arrivalDate" name="arrivalDate" :readonly="readonly" :disabled="readonly">
									</div>
								</div>
							</div>
							<!--<form-group other-rules="required" col="md-3" type="datepicker" v-model="form.arrivalDate" name="arrivalDate" :readonly="readonly"></form-group>-->
							<div class="col-md-3">
								<div class="form-group">
									<label for="" style="height:40px;">Operation Date 使用日期</label>
									<div class="input-group date">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" id="datepicker2" v-model="form.operationDate" name="operationDate"
											:readonly="readonly" placeholder="_ _ /_ _ /_ _" :disabled="readonly">
									</div>
								</div>
							</div>
							<!--<form-group col="md-3" type="datepicker" v-model="form.operationDate" name="operationDate" :readonly="readonly"></form-group>-->
							<div class="col-md-3">
								<div class="form-group">
									<label for="" style="height:40px;">Installation or Commissioning Date 安装调试日期</label>
									<div class="input-group date">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" id="datepicker3" placeholder="_ _ /_ _ /_ _"
											v-model="form.installOrCommissionDate" name="installOrCommissionDate" :readonly="readonly" :disabled="readonly">
									</div>
								</div>
							</div>
							<!--<form-group col="md-3" type="datepicker" v-model="form.installOrCommissionDate" name="installOrCommissionDate" :readonly="readonly"></form-group>-->
							<div class="col-md-3">
								<div class="form-group">
									<label for="" style="height:40px;">Final Acceptance Date 最终验货日期</label>
									<div class="input-group date">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" id="datepicker4" placeholder="_ _ /_ _ /_ _" v-model="form.finalAcceptDate"
											 name="finalAcceptDate" :readonly="readonly" :disabled="readonly">
									</div>
								</div>
							</div>
							<!--<form-group col="md-3" type="datepicker" v-model="form.finalAcceptDate" name="finalAcceptDate" :readonly="readonly"></form-group>-->
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Description for Scope of Supply and Services  供货及服务范围描述 </h3>
					<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> The total size of the attachment cannot exceed 18M. 附件总大小不能超过18M。</span>
					<button type="button" class="btn btn-default hidden" style="margin-left: 10px;">Attachment</button>
				</div>
				<div class="box-body">
					<!--<div class="row">
              <div class="col-md-12">
                <p>
                <input type="file" id="exampleInputFile">
                </p>
              </div>

            </div>-->
					<!--<form role="form">
						<div class="box-body">-->

						<!--</div>-->
						<!-- /.box-body -->
					<!--</form>-->
					<div class="row">
						<div class="col-md-6">
							<textarea-my rows="3" v-model="form.supplyServiceScopeDes" other-rules="required" :readonly="readonly" name="supplyServiceScopeDes" id="supplyServiceScopeDes"   :limit="3000" placeholder="Description for Scope of Supply and Services 供货及服务范围描述"></textarea-my>
						</div>
						<div class="col-md-6">
							<p style="line-height: 18px;">The following requirement books shall be met: 请满足以下有关任务书的要求:<br> E.G. Name of specification books and date 例如：任务书的名称及日期 <br> E.G. Name of drawing and date 例如：图纸的名称及日期 <br> Others 其它</p>
						</div>
					</div>
					<br>
						<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<upload2 :readonly="readonly" required="true" v-model="form.attachmentIds" buttonText="Select File 选择文件" :attachments="form.attachments" multi="true"></upload2>
									</div>
								</div>
						</div>
				</div>
			</div>
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><!--<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>--> Bidder Proposal List 建议投标商列表 </h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-6">
							<table class="table table-bordered">
								<tbody>
									<tr>
										<th style="width: 80px;">No.</th>
										<th>Bidder Proposal 建议投标商</th>
										<th class="text-center">
											<a v-if="!readonly" href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
										</th>
									</tr>
									<tr v-bind:key="index" v-for="(entry,index) in form.bridderList">
										<td>{{ index+ 1}}</td>
										<td>
											<input type="hidden" class="form-control" id="" v-model="entry.id">
											<input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('briddername'+index) }" :name="'briddername'+index" id="" v-model="entry.briddername"  :readonly="readonly" placeholder="Bidder Proposal 建议投标商" value="">
										</td>
										<td class="text-center" style="vertical-align: middle;">
											<a href="javascript:;" v-if="!readonly" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
										</td>
									</tr>

								</tbody>
							</table>
						</div>
					</div>
					<div class="form-group">
						<p>Every demand through purchasing department should abide the rules of the Volkswagen group production equipment and general purchasing conditions. (Production equipment and general procurement regulations can be referenced in purchasing Portal or
							<a target="_blank" href="http://www.vwgroupsupply.com">www.vwgroupsupply.com</a>).<br> 通过采购部的每一个需求都应遵守大众集团的生产设备条例和通用的采购条件 (生产设备条例和通用的采购条例可以参见采购内网或
							<a target="_blank" href="http://www.vwgroupsupply.com">www.vwgroupsupply.com</a>)。</p>
						<div class="checkbox" v-if="!readonly">
							<label>
                	<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  <input  name="terms" type="checkbox" v-validate="'required'">When submitting the application, I have read and agreed to
                  	<a href="http://vwatjportal.ap.vwg/upload/2017032209494257218.pdf"
                  	 target="_blank" >relevant policies of Volkswagen Automatic Transmission Tianjin. </a> 当提交此申请时，我已经理解并承诺遵守
                  	 <a href="http://vwatjportal.ap.vwg/upload/2017032209494257218.pdf"
                  	 target="_blank" >大众汽车自动变速器（天津）有限公司的相关政策。</a>
                </label>
						</div>
					</div>
				</div>
			</div>

			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view :form="form" entityId="RequestForQuotationst" vclass="btn-left" uri="/form/RequestForQuotationst/update" :validator="this.$validator"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>
		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	export default {
		name: 'RequestForQuotationst',
		methods: {
			insertItemRows: function() {
				var newItem = {};
				for(var key in this.form.bridderList[0]) {
					newItem[key] = "";
				}
				this.form.bridderList.push(newItem);
			},
			//表格行删除调用方法
			deleteItemRows: function(rowId) {
				//if(this.form.bridderList.length > 1) {
					this.form.bridderList.splice(rowId, 1);
				//} else {
				//	$.alert("At least one complete record in “Bridder Proposal List” is needed 至少需要填写一条完整的投标商列表记录");
				//}
			}

		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/RequestForQuotationst/get/" + id;
			} else {
				var url = "/form/RequestForQuotationst/create/";
			}

			if(this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}

			dm.xlsxhref=Config.getBaseURL()+"/requestForQuotationst/getEclasslist";

			return dm;
		},
		watch: {

		},
		mounted() {

			var _form = this.form;
			//初始化数字加,展示
			function formatCurrency(num) {
				if(num) {
					//将num中的$,去掉，将num变成一个纯粹的数据格式字符串
					num = num.toString().replace(/\$|\,/g, '');
					//如果num不是数字，则将num置0，并返回
					if('' == num || isNaN(num)) {
						return 'Not a Number ! ';
					}
					//如果num是负数，则获取她的符号
					var sign = num.indexOf("-") > 0 ? '-' : '';
					//如果存在小数点，则获取数字的小数部分
					var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : '';
					cents = cents.length > 1 ? cents : ''; //注意：这里如果是使用change方法不断的调用，小数是输入不了的
					//获取数字的整数数部分
					num = num.indexOf(".") > 0 ? num.substring(0, (num.indexOf("."))) : num;
					//如果没有小数点，整数部分不能以0开头
					if('' == cents) {
						if(num.length > 1 && '0' == num.substr(0, 1)) {
							return 'Not a Number ! ';
						}
					}
					//如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
					else {
						if(num.length > 1 && '0' == num.substr(0, 1)) {
							return 'Not a Number ! ';
						}
					}
					//针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
					/*
					  也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
					  字符串长度为0/1/2/3时都不用添加
					  字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
					 */
					for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
						num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
					}
					//将数据（符号、整数部分、小数部分）整体组合返回
					return(sign + num + cents);
				}

			}
			//强制数字保留两位小数
			function toDecimal2(x) {
				var f = parseFloat(x);
				if(isNaN(f)) {
					return false;
				}
				var f = Math.round(x * 100) / 100;
				var s = f.toString();
				var rs = s.indexOf('.');
				if(rs < 0) {
					rs = s.length;
					s += '.';
				}
				while(s.length <= rs + 2) {
					s += '0';
				}
				return s;
			}

			$("#requestforquotations").on('blur', '#productCategry', function() {
				var reg = /^\d+$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert('Only numbers is allowed for Product Category 对于产品编号只能输入数字');
							_form.productCategry = "";
							$(this).val("");

						}
					}
				}
			});

			$("#requestforquotations").on('blur', '#estimatedBudget', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert('  Only numbers and decimal point are allowed for Estimated (Budget)  对于估价（预算）只能输入数字和小数点');
							_form.estimatedBudget = "";
							$(this).val("");

						} else {
							//强制保留两位小数
							var newVal = toDecimal2($(this).val());
							newVal=formatCurrency(newVal);
							_form.estimatedBudget = newVal;
							$(this).val(newVal);
						}
					}
				}
			});
			$("#requestforquotations").on('focus', '#estimatedBudget', function() {
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						var newVal=$(this).val().replace(new RegExp(",","gm"),"");
						_form.estimatedBudget = newVal;
						$(this).val(newVal);
					}
				}
			});

			//初始化只读状态的estimatedBudget的值为加，展示
			var estimatedBudget = $("#estimatedBudget");
			if(estimatedBudget.attr("readonly")) {
				_form.estimatedBudget = formatCurrency(estimatedBudget.val());
				estimatedBudget.val(formatCurrency(estimatedBudget.val()));
			}

			$('#datepicker').datepicker({
				autoclose: true
			});
			$('#datepicker').on('changeDate', function() {
				$('#datepicker').val(
					$('#datepicker').datepicker('getFormattedDate')
				);
				_form.arrivalDate = $('#datepicker').datepicker('getFormattedDate');
			});

			$('#datepicker2').datepicker({
				autoclose: true
			})
			$('#datepicker2').on('changeDate', function() {
				$('#datepicker2').val(
					$('#datepicker2').datepicker('getFormattedDate')
				);
				_form.operationDate = $('#datepicker2').datepicker('getFormattedDate');
			});

			$('#datepicker3').datepicker({
				autoclose: true
			});
			$('#datepicker3').on('changeDate', function() {
				$('#datepicker3').val(
					$('#datepicker3').datepicker('getFormattedDate')
				);
				_form.installOrCommissionDate = $('#datepicker3').datepicker('getFormattedDate');
			});

			$('#datepicker4').datepicker({
				autoclose: true
			});
			$('#datepicker4').on('changeDate', function() {
				$('#datepicker4').val(
					$('#datepicker4').datepicker('getFormattedDate')
				);
				_form.finalAcceptDate = $('#datepicker4').datepicker('getFormattedDate');
			});

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_form=this.form;
			});
		},
		computed: {

			processTaskId: {
				// 动态计算processTaskId的值
				get: function() {
					return this.$route.query.taskId;
				}
			},
			processTaskKey: {
				// 动态计算processTaskKey的值
				get: function() {
					return this.$route.query.taskKey;
				}
			},
			readonly: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			}
		}
	}
</script>

<style>
.input-margintop-34{margin-top:0px;}
</style>

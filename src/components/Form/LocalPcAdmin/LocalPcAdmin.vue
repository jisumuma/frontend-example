<template>
	<div id="currentpage">
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("LocalPcAdmin")}}
				<a  v-if="!readonly"  href="http://vwatjportal.ap.vwg/web/vwatj/it-service" target="_blank" style="margin-left: 10px; font-size: 18px;">
					<i class="fa fa-fw fa-info-circle"></i>Check IT portal</a>


			</h1>
			<ol class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.Head of IT</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date : {{applicationTime}}</strong>
			</span>
		</section>
		<!-- Main content -->
		<section class="content container-fluid">

			<!--------------------------
			| Your Page Content Here |
			-------------------------->
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> {{$t("LocalPcAdmin.createUserTitle")}}

					</h3>
					<label class="mar-left-20" v-if="!readonly"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>

				</div>

				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.validityPeriodBeginDate" name="validityPeriodBeginDate">
					<input type="hidden" v-model="form.validityPeriodEndDate" name="validityPeriodEndDate">
					<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
					<input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">
					<div class="box-body">

						<div class="row">
							<!--不选中的时候显示-->
							<form-group v-if="!onbehalf" other-rules="required" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<!--选中的时候显示-->
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 {{$t("LocalPcAdmin.creatorStaffcode")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
									</div>
								</div>
							</div>

							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
						</div>

					</div>
				</form>
			</div>
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">{{$t("LocalPcAdmin.localPcTitle")}} </h3>
					<span class="help is-danger" v-show="errors.has('localPcName')"> Please fill in the computer name. 请填写计算机名称</span>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label for="">
										<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> {{$t("LocalPcAdmin.localPcName")}} </label>
									<div class="input-group ">
										<input type="input" v-model="form.localPcName" name="localPcName" :readonly="readonly" v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('localPcName') }" />
										<span class="input-group-btn">
											<a type="button" href="http://10.120.140.46/vgcapon-portlet/images/it/howtocheckpcname.png" target="_blank" style="padding-right: 0;" title="How to check Computer Name 如何查看计算机 " class="btn">
												<i class="fa fa-info-circle" style="font-size: 20px;"></i>
											</a>
										</span>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>
										<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> {{$t("LocalPcAdmin.validityPeriod")}}</label>
                  <span class="text-muted"><i class="fa fa-fw fa-info-circle"></i>  Maximum 6 months 最长6个月 </span>
									<div class="input-group">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" :readonly="readonly" v-validate="'required'" id="reservation" name="reservation" v-model="reservation">
									</div>
									<!-- /.input group -->
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">{{$t("LocalPcAdmin.applyReason")}}</h3>
					<span class="help is-danger" v-show="errors.has('applyReason')"> Please select at least one reason. 请至少选择一条申请原因</span>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<form-group other-rules="required" type="select" uri="/dict/list?groupName=LocalPcAdminApplyReason" :readonly="readonly" v-model="form.applyReason" name="applyReason"></form-group>
							</div>
						</div>
					</div>
					<div class="row" v-if="form.applyReason=='5'">
						<div class="col-md-6">
							<div class="form-group">
								<form-group other-rules="required" type="textarea" :readonly="readonly" v-model="form.applyReasonOther" name="applyReasonOther"></form-group>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="box box-solid">
				<div class="box-body">
					<i class="text-red">It's easily to get infected of virus if System is running as the administrator's group! 作为管理组运行，系统将更容易被病毒感染!</i>
					<div v-if="!readonly" class="form-group">
						<div class="checkbox" :class="{'is-danger':errors.has('terms1')}">
							<label>
								<span class="help is-danger" v-show="errors.has('terms1')">
									<!--{{$t("checkPolicyNotice")}}-->
								</span>
								<input name="terms1" type="checkbox" id="terms1" v-validate="'required'" >Here with I officially confirm, when I got the local PC Administrator rights after the confirmation from IT Manager: 我正式确认，当IT经理批准我本地PC管理员的权利后：<br> 1- Without the official authorization from IT, I won't install/uninstall software or change system security setting on the PC 没有它的官方授权，我不会在PC上安装/卸载软件或更改系统安全设置。<br>
								<a href="http://vwatjportal.ap.vwg/web/vwatj/software-black-list" target="_blank" style="padding-left: 14px;">
									<i>Blacklist for software 软件黑名单</i>
								</a><br> 2- Never do the settings/installation using Administrator without IT department permission 未经IT部门许可，不使用管理员进行设置/安装操作。<br> 3- Check the Anti-Virus software daily, and report to IT department / disconnect the network connection immediately when some virus is found 每天检查反病毒软件，并在发现病毒时立即向IT部门报告并断开网络连接。<br>
								4 - Accept that IT Department check the PC health status by regularly 接受IT部门定期检查PC健康状况。<br><br> </label>

						</div>
						<div class="checkbox">
							<label>
								<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
								<input name="terms" type="checkbox" v-validate="'required'" >

									 When submitting the application, I have read and agreed to
									<a href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf" target="_blank">
									 relevant policies of Volkswagen Automatic Transmission Tianjin.
								</a> 当提交此申请时，我已经理解并承诺遵守
								<a href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策。</a> </label>

						</div>
					</div>

				</div>
			</div>

			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view :form="form" entityId="LocalPcAdmin" vclass="btn-left" uri="/form/LocalPcAdmin/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>

		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->
</template>
<script>
	//import "./../../plugins/daterangepicker/daterangepicker.css"
	import jQuery from "jquery"
	import adminlte from "adminlte"
	//import bootstrap from "bootstrap"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"
	// daterangepicker(jQuery('#reservation'))

	export default {
		name: 'LocalPcAdmin',
		methods: {
			beforesubmit:function(){
					if(!$("#terms1").prop("checked")){
						$.alert("Please read and agreed to the notice!请阅读并确认提示！");
						this.form.submitstatus=false;
					}else{
						this.form.submitstatus=true;
					}

			},
			onbehalfclick: function() {

				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId=this.tempcreatorUserId;

					this.form.creatorUserId = this.tempcreatorUserId;
					this.form.creatorStaffcode = this.tempcreatorStaffcode;
					this.form.creatorName = this.tempcreatorName;
					this.form.creatorPhoneNum = this.tempcreatorPhoneNum;
					this.form.creatorDept = this.tempcreatorDept;
				}
			},
			doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				//console.log(data);

				this.form.applicantUserId = data.id;

				this.form.creatorUserId = data.id;
				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName = data.printENName;
				this.form.creatorPhoneNum = data.mobile;
				var tempdep=data.department;
				if( tempdep==null||tempdep==''||tempdep=='null'||tempdep==undefined ){
					tempdep=data.division;
				}

				this.form.creatorDept = tempdep;

			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/LocalPcAdmin/get/" + id;
			} else {
				var url = "/form/LocalPcAdmin/create/";
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
			dm.onbehalf = false;
			dm.tempcreatorUserId = dm.form.creatorUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempcreatorPhoneNum = dm.form.creatorPhoneNum;
			dm.tempcreatorDept = dm.form.creatorDept;

			dm.form.submitstatus=true;
			return dm;
		},
		watch: {

		},
		mounted() {
			var _form = this.form;
			$('#reservation').daterangepicker({
        "dateLimit": {
          "days": "182"
        },
				"linkedCalendars": false/**,
				startDate:_form.validityPeriodBeginDate,
				endDate: _form.validityPeriodEndDate**/
			}, function(start, end) {
				$('#reservation').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
				_form.validityPeriodBeginDate = start.format('MM/DD/YYYY');
				_form.validityPeriodEndDate = end.format('MM/DD/YYYY');
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
			reservation: {
				//动态根据后台开始和结束日期给有效期赋值或者根据有效期的值给后台开始和结束日期赋值
				get: function() {
					Date.prototype.Format = function(fmt) { //author: meizz
						var o = {
							"M+": this.getMonth() + 1, //月份
							"d+": this.getDate(), //日
							"h+": this.getHours(), //小时
							"m+": this.getMinutes(), //分
							"s+": this.getSeconds(), //秒
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度
							"S": this.getMilliseconds() //毫秒
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
					}
					if(!this.form.validityPeriodBeginDate) {
						this.form.validityPeriodBeginDate = new Date().Format("MM/dd/yyyy");
					}
					if(!this.form.validityPeriodEndDate) {
						this.form.validityPeriodEndDate = new Date().Format("MM/dd/yyyy");
					}
					return this.form.validityPeriodBeginDate + " - " + this.form.validityPeriodEndDate;
				},
				set: function(newValue) {
					var dates = newValue.split(' - ')
					this.form.validityPeriodBeginDate = dates[0]
					this.form.validityPeriodEndDate = dates[dates.length - 1]
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

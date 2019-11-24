<template>
	<div id="currentpage">
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("ItSystemAccount")}}
				<a v-if="!readonly" href="http://vwatjportal.ap.vwg/web/vwatj/it-service" target="_blank" style="margin-left: 10px; font-size: 18px;">
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
					<a>3. Resource Owner </a>
				</li>
				<li>
					<a>4.Head of IT</a>
				</li>
				<li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a>5.BoM</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
			</span>
		</section>
		<!-- Main content -->
		<section class="content container-fluid">

			<!--------------------------
			| Your Page Content Here |
			-------------------------->
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> {{$t("ItSystemAccount.createUserTitle")}}
					</h3>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.createUserId" name="createUserId">
					<div class="box-body">

						<div class="row">
							<form-group col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
						</div>

					</div>
				</form>
			</div>
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">{{$t("ItSystemAccount.useUserTitle")}} </h3>
					<span class="help is-danger" v-show="errors.has('useUserStaffcode')"> Please select user information. 请选择资源使用人</span>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3" v-if="!readonly">
								<div class="form-group">
									<label for="">
										<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>  {{$t("ItSystemAccount.useUserId")}} </label>
									<div class="input-group ">
										<input type="hidden" v-model="form.useUserId" name="useUserId" id="useUserId">
										<input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('useUserStaffcode') }" placeholder="员工号 Staff Code" id="useUserStaffcode" name="useUserStaffcode" v-validate="'required'" v-model="form.useUserStaffcode" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson" v-if="!readonly">
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
									</div>
								</div>
							</div>
							<form-group v-if="readonly" col="md-3" type="input" other-rules="required" v-model="form.useUserStaffcode" name="useUserStaffcode" readonly="readonly"></form-group>


							<form-group col="md-3" type="input" other-rules="required" v-model="form.useUserName" name="useUserName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.useUserPhoneNum" name="useUserPhoneNum" :readonly="readonly"></form-group>
						</div>
						<div class="row">
							<form-group col="md-3" type="input" other-rules="required" v-model="form.useUserDept" name="useUserDept" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.useUserAdAccount" name="useUserAdAccount" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.useUserEmail" name="useUserEmail" readonly="readonly"></form-group>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">{{$t("ItSystemAccount.resourceTitle")}}</h3>
					<span class="help is-danger" v-show="errors.has('resourceId')"> Please select at least one system resource. 请至少选择一条系统资源记录</span>
					<input type="hidden" id="selectedresourceids" name="resourceId" v-validate="'required'" v-model="form.resourceId" />
					<input type="hidden" id="selectedresourceownerids" name="resourceOwnerId" v-validate="'required'" v-model="form.resourceOwnerId" />

				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group" v-if="!readonly">
							<div class="col-md-3">
								<label style="height:40px;">{{$t("ItSystemAccount.resourceDepartment")}} </label>
								<select id="departmentselect" size="7" class="form-control" style="height: 150px;" uri="/ItSystemAccount/department" v-model="departmenttemp" @click="changedept">

								</select>
							</div>
							<div class="col-md-3">
								<label style="height:40px;">{{$t("ItSystemAccount.resourceSystem")}} </label>
								<select id="systemselect" size="7" class="form-control" style="height: 150px;" :uri="systemUri" v-model="systemtemp" @click="changesystem">

								</select>
							</div>
							<div class="col-md-3">
								<label style="height:40px;">{{$t("ItSystemAccount.resourceName")}} </label>
								<select id="resourceselect" size="7" class="form-control" style="height: 150px;" :uri="resourceUri" v-model="resourcetemp">

								</select>
							</div>
							<div class="col-md-3" style="padding-left: 0;">
								<div class="col-md-2 text-center" style="padding-top: 30px;padding-left: 0;">
									<a href="javascript:;" @click="selectresource"><i class="fa fa-arrow-circle-right" style="font-size: 24px;"></i></a>
								</div>
								<div class="col-md-10 pull-right" style="padding: 0;">
									<label style="height:40px;">{{$t("ItSystemAccount.resourceSelected")}}</label>

									<div multiple="" :class="{'form-control':true,'input': true, 'is-danger': errors.has('resourceId') }" style="height: 150px;overflow: auto;" id="selectedResources">
										<!--<div>IT - Apon - Orga Role (Cheng Shengjun)
											<i class="fa fa-trash pull-right text-danger" style="line-height: 20px;"></i>
										</div>
										<div>IT - Apon - Accountant Role (Cheng Shengjun)
											<i class="fa  fa-trash pull-right text-danger" style="line-height: 20px;"></i>
										</div>
										<div>IT - Apon - CISO (Cheng Shengjun)
											<i class="fa fa-trash pull-right text-danger" style="line-height: 20px;"></i>
                          				</div>
										<div>IT - Apon - Delegation (Cheng Shengjun)
											<i class="fa fa-trash pull-right text-danger" style="line-height: 20px;"></i>
										</div>-->
										<div v-if="form.resourceList != null && form.resourceList.length > 0 " v-for="(entry,index) in form.resourceList" style="display: inline-block;width:100%;">
											{{entry.departmentNameValue}}-{{entry.systemNameValue}}-{{entry.resourceName}}({{entry.resourceOwnerName}})
											<i class="fa fa-trash pull-right text-danger" rsvalue="entry.id" style="line-height: 20px;"></i>
										</div>

									</div>
								</div>
							</div>
						</div>

						<div class="form-group" v-if="form.resourceList != null && form.resourceList.length > 0 && readonly">
							<div class="col-md-9">
								<table class="table table-bordered">
									<tbody>
										<tr>
											<th> No.</th>
											<th> Department 所属部门</th>
											<th>System 系统 </th>
											<th>Resource Name 资源名称 </th>
										</tr>
										<tr v-for="(entry,index) in form.resourceList">
											<td>{{ index+ 1}}</td>
											<td>{{entry.departmentNameValue}}</td>
											<td>{{entry.systemNameValue}}</td>
											<td>{{entry.resourceName}}</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>

					</div>
					<div class="row form-group" style="margin-top:10px;">
							<form-group col="md-12" type="textarea" other-rules="" v-model="form.applyReason" name="applyReason" :readonly="readonly"></form-group>
					</div>
        </div>
      </div>
      <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-required text-required-title" style="font-size: 12px;"></i>
          <h3 class="box-title" v-if="!readonly">Upload Attachment <label>上传附件</label></h3>
          <h3 class="box-title" v-else >Attachment <label>附件</label></h3>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <upload2 class="col-md-11" :readonly="readonly" v-model="form.attachmentIds" buttonText="Attachments" :attachments="form.systemAccountAttachments" multi="true" required="true"></upload2>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div>
					<div class="form-group">
						<div class="checkbox">
							<label>
                  				<input :disabled="readonly&&(form.policyDeviation=='true')" id="policyDeviation"  value="true"  type="checkbox" name="policyDeviation" v-model="form.policyDeviation" >{{$t("ItSystemAccount.policyDeviation")}}
							</label>
							<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Choose “Policy Deviation” need BoM's approval. 选择此项需要BoM的审批。 </span>
						</div>
						<div class="checkbox" v-if="!readonly">
							<label>
								<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  				<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf">大众汽车自动变速器（天津）有限公司的相关政策。</a>
               				 </label>
						</div>
					</div>

				</div>
			</div>
			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view :form="form" entityId="ItSystemAccount" vclass="btn-left" uri="/form/ItSystemAccount/update" :validator="this.$validator"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>

		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->
</template>
<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'ItSystemAccount',
		methods: {
			doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				//console.log(data);
				this.form.useUserId = data.id;
				this.form.useUserStaffcode = data.staffCode;
				this.form.useUserName = data.printENName;
				this.form.useUserPhoneNum = data.mobile;

				var tempdep=data.department;
				if( tempdep==null||tempdep==''||tempdep=='null'||tempdep==undefined ){
					tempdep=data.division;
				}

				this.form.useUserDept = tempdep;
				this.form.useUserAdAccount = data.screenName;
				this.form.useUserEmail = data.email;

			},
			initselect: function(el) {
				setTimeout(function(){
					var uri = $(el).attr("uri");

				//var html = '<option value="">--Please Select--</option>';
				var html = '';
				if(uri) {
					global_.actUtil.query("get", uri, "", function(data) {
						var dm = JSON.parse(data);
						for(var d in dm) {
							html += '<option value="' + d + '">' + dm[d] + '</option>'
						}
					});
				}
				$(el).html(html);
				$(el).val("");
				},300);

				// $.alert(uri);
			},
			changedept: function() {
        $("#systemselect").html("");
				this.initselect($("#systemselect")[0]);
				//var html = '<option value="">--Please Select--</option>';
				$("#resourceselect").html("");

			},
			changesystem: function() {
        $("#resourceselect").html("");
				this.initselect($("#resourceselect")[0]);
			},
			selectresource: function() {
				var html = '';
				var deptext = $('#departmentselect option:selected').text(); //选中的文本
				var depvalue = $('#departmentselect option:selected').val(); //选中的值

				var systext = $('#systemselect option:selected').text(); //选中的文本
				var sysvalue = $('#systemselect option:selected').val(); //选中的值

				var rstext = $('#resourceselect option:selected').text(); //选中的文本
				var rsvalue = $('#resourceselect option:selected').val(); //选中的值

				var selectedresourceids = $("#selectedresourceids").val();
				var selectedresourceownerids = $("#selectedresourceownerids").val();

				var rsidarray = selectedresourceids.split(",");
				var rsowneridarray = selectedresourceownerids.split(",");

				if(rstext && rsvalue) {
					if($.inArray(rsvalue.split(",")[0], rsidarray) > -1) {
						$.alert("The selected resource already exists. 所选择的资源已经被选中。");
						/*$.alert({
						    title: false,
						    content: 'The selected resource already exists 所选择的资源已经被选中',
						    buttons: {
						        ok: function () {
						            //$.alert('Confirmed!');
						        }
						    }
						});*/
						return;
					}
					if(selectedresourceownerids != '' && selectedresourceownerids != null && selectedresourceownerids != undefined) {
						if($.inArray(rsvalue.split(",")[1], rsowneridarray) == -1) {
							$.alert("Please select system resource that owned to one person.请选择同一位资源负责人名下的资源。");
							return;
						}
					}
					if(selectedresourceids != '' && selectedresourceids != null && selectedresourceids != undefined) {
						selectedresourceids = selectedresourceids + "," + rsvalue.split(",")[0];
					} else {
						selectedresourceids = rsvalue.split(",")[0];
					}
					$("#selectedresourceids").val(selectedresourceids);
					this.form.resourceId = selectedresourceids;

					selectedresourceownerids = rsvalue.split(",")[1];
					$("#selectedresourceownerids").val(selectedresourceownerids);
					this.form.resourceOwnerId = selectedresourceownerids;

					html = '<div style="display: inline-block;width:100%;">' + deptext + '-' + systext + '-' + rstext + '<i class="fa fa-trash pull-right text-danger" rsvalue="' + rsvalue.split(",")[0] + '" style="line-height: 20px;" ></i></div>'
					$("#selectedResources").append(html);

				} else {
					$.alert("Please select a resource. 请选择一条资源。");
				}

			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/ItSystemAccount/get/" + id;
			} else {
				var url = "/form/ItSystemAccount/create/";
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
			dm.departmenttemp = "";
			dm.systemtemp = "";
			dm.resourcetemp = "";
			return dm;
		},
		watch: {

		},

		computed: {
			systemUri: {
				get: function() {
					//console.log("System:"+this.departmenttemp+"---"+$("#departmentselect").val());
					return '/ItSystemAccount/system?department=' + this.departmenttemp;
				}
			},
			resourceUri: {
				get: function() {
					//console.log("resource:"+this.systemtemp+"---"+$("#systemselect").val());
					return '/ItSystemAccount/resource?department=' + this.departmenttemp + '&system=' + this.systemtemp;
				}
			},
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
		},
		mounted() {
			var initselect = this.initselect;
			initselect($("#departmentselect")[0]);
			var _this = this;
			$('#selectedResources').on('click', '.text-danger', function() {
				var _rsvalue = $(this).attr("rsvalue");
				var _ids = _this.form.resourceId.split(",");
				_ids.splice($.inArray(_rsvalue, _ids), 1);
				if(_ids.length > 0) {
					_this.form.resourceId = _ids.join(",");
					$("#selectedresourceids").val(_ids.join(","));
				} else {
					_this.form.resourceId = "";
					$("#selectedresourceids").val("");
					_this.form.resourceOwnerId = "";
					$("#selectedresourceownerids").val("")
				}
				$(this).parent().remove();
			});


				if(_this.form.policyDeviation=='true'){
					$("#policyDeviation").prop("checked",true);
				}else{
					_this.form.policyDeviation=null;
					$("#policyDeviation").prop("checked",false);
				}


			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
			});
		}
	}
</script>

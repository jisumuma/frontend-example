<template>

	<!-- Content Wrapper. Contains page content -->
	<div>
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>Business Unit´s Supplier Nomination Recommendation Application<a class="hidden" href="#" style="margin-left: 10px; font-size: 18px;"><i class="fa fa-fw fa-info-circle"></i>Check IT portal</a></h1>
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
					<h3 class="box-title"> Application Type <label>申请类型</label>  </h3>
					<span class="help is-danger" v-show="errors.has('applyType')">
									Please select a Type.
									请选择一个类型
								</span>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" :disabled="disabled" v-validate="'required'" name="applyType" id="optionsRadios1" v-model="form.applyType" value="New" checked="">New Application 新建申请</label>
								</div>

							</div>
							<div class="col-md-4">
								<div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" :disabled="disabled" v-validate="'required'" name="applyType" id="optionsRadios2" v-model="form.applyType" value="Update">Update Existing Application 更新已有的申请</label>
								</div>
							</div>

						</div>
						<div class="row" v-if="form.applyType=='Update'">
							<div class="col-md-3">
								<div class="form-group">
									<label for="">Supplier Recommendation Application No. 供应商推荐申请单号 </label>
									<div class="input-group">
										<input type="hidden" v-validate="'required'" v-model="form.updateApplicationId" name="updateApplicationId" id="updateApplicationId" />
										<input type="text" class="form-control" id="updateApplicationTicketNo" placeholder="Select the Existing Application 选择现有申请单" v-model="form.updateApplicationTicketNo" name="updateApplicationTicketNo" readonly>
										<span class="input-group-btn">
                            <button type="button" :disabled="readonly" class="btn btn-primary btn-flat"  data-toggle="modal" data-target="#modal-default" ><i class="fa fa-fw fa-search"></i></button>
                          </span>
									</div>
								</div>
							</div>
							<div class="col-md-9" style="padding-top: 23px;">
								<span class="text-muted"> <i class="fa fa-fw fa-info-circle"></i> Please select "Update Existing Application" if you need to modify inquired company list in the existing application. 如需更新供应商列表，请选择“更新已有的申请“ </span> <br>
								<span class="text-muted" style="display: inline-block;"><i class="fa fa-fw fa-info-circle"></i> If select to update, it is mandatory to fill the SC No. and choose buyer 如果选择更新已有申请单，需求编号和采购人员是必填的</span>
							</div>
							<div class="col-md-9 hidden">
								<span class="pad-top-20" style="display: inline-block;"><i class="fa fa-fw fa-info-circle"></i> If the purchasing request is a frame contract or frame contract extension and there is no shopping cart, please send this form to buyer via email. 如果采购需求是框架合同或框架合同延期，并且没有需求编号，请通过电子邮件将此表单发送给采购员</span>
							</div>

						</div>

					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"> Applicant Info. <label>申请人信息</label>  </h3>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.creatorStaffcode" name="creatorStaffcode" id="creatorStaffcode">
					<div class="box-body">
						<div class="row">
							<!--<div class="col-md-3">
                  <div class="form-group">
                      <label for="">Name <small>姓名</small> </label>
                      <input type="text" class="form-control" id="" placeholder="姓名 Name" value="" readonly="true">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Division / Dept.  <small>部门</small> </label>
                      <input type="text" class="form-control" id="" placeholder="部门 Division / Dept." value="HR, Organization & Education" readonly="true">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                     <label for="">Telephone <small>电话</small> </label>
                      <input type="text" class="form-control" id="" placeholder="电话 Telephone" value="18322143376" readonly="true">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">E-mail <small>邮箱</small> </label>
                      <input type="text" class="form-control" id="" placeholder="员工号 Staff Code" value="xueming.yin@atj.volkswagen.com.cn" readonly="true">
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
					<h3 class="box-title"> Details <label>详细信息</label>  </h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<!--<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Whether Frame Contract<small> 是否为框架合同</small> </label>
                      <select  :class="{'form-control':true,'input': true, 'is-danger': errors.has('isFrameContract') }" name="isFrameContract"  v-model="form.isFrameContract" >
                        <option value="">--Please select--</option>
                        <option value="Yes 是">Yes 是</option>
                        <option value="No 否">No 否</option>
                      </select>-->
									<form-group v-if="form.applyType=='New'" other-rules="required" type="select" uri="/dict/list?groupName=isFrameContract" :readonly="readonly" v-model="form.isFrameContract" name="isFrameContract"></form-group>
									<form-group v-else other-rules="required" type="select" uri="/dict/list?groupName=isFrameContract" disabled="true" v-model="form.isFrameContract" name="isFrameContract"></form-group>

								</div>
							</div>
							<div class="col-md-9">
								<div class="checkbox"  v-if="form.isFrameContract=='Yes'" :class="{'is-danger':errors.has('terms1')}">
									<label >
					              	<span class="help is-danger" v-show="errors.has('terms1')">
									</span>
					                <input v-if="!readonly" name="terms1" type="checkbox" v-validate="'required'" > <span  style="font-weight: bold;"> Please note that: If the purchasing request is a frame contract or frame contract extension
					                	and there is no shopping cart number, you need to send this form to buyer via email.
					                	请注意：如果采购需求是框架合同或框架合同延期，并且没有需求编号，您需要通过电子邮件将此表单发送给采购员。</span>
					              </label>
								</div>
								<div class="checkbox" v-if="form.isFrameContract=='No'" :class="{'is-danger':errors.has('terms1')}">
									<label  >
					              	<span class="help is-danger" v-show="errors.has('terms1')">
									</span>
					                <input v-if="!readonly" name="terms1" type="checkbox" v-validate="'required'" ><span  style="font-weight: bold;">  Please note that: If the purchasing request is not a frame contract or frame contract extension,
					                	you need to upload this form to the shopping cart in K-SRM system.
					                	请注意：如果采购需求不是框架合同或框架合同延期，您需要将此表单上传到K-SRM系统的Shopping cart。</span>
					              </label>
								</div>
							</div>
						</div>
						<div class="row">


							<div class="col-md-3">
								<div class="form-group">
									<!--<label for=""><i v-if="form.applyType=='Update'" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Shopping Cart/PR Number <small>需求编号</small> </label>
                      <input :class="{'form-control':true,'input': true, 'is-danger': errors.has('prNumber') }" type="text"
                      	 id="prNumber" placeholder="Shopping Cart/PR Number 需求编号" v-model="form.prNumber" name="prNumber" :readonly="readonly">-->

									<form-group :other-rules="prNumberRule" type="input" :readonly="readonly" v-model="form.prNumber" name="prNumber"></form-group>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label for=""> Globe Number Globe系统编号</label>
									<input type="text" class="form-control" id="globeNumber" placeholder="Globe Number Globe系统编号" v-model="form.globeNumber" name="globeNumber" :readonly="readonly||(form.applyType=='Update')">
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<!--<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Project <small>项目</small> </label>
                      <select class="form-control" name="purchaseProject" v-model="form.purchaseProject" uri="">
                        <option>--Please select--</option>
                        <option>DQ380</option>
                        <option>DQ500</option>
                        <option>Other</option>
                      </select>-->
									<form-group v-if="form.applyType=='New'" other-rules="required" type="select2"  multiple="multiple" uri="/purchaseProject/listforselect" :readonly="readonly" v-model="form.purchaseProjectArray" name="purchaseProjectArray" tags="false"></form-group>
									<form-group v-else other-rules="required" type="select2" multiple="multiple" uri="/purchaseProject/listforselect" :readonly="readonly" disabled="true" v-model="form.purchaseProjectArray" name="purchaseProjectArray" tags="false"></form-group>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<!--<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Buyer <small>采购</small> </label>
                      <select class="form-control">
                        <option>--Please select--</option>
                        <option>Buyer1</option>
                        <option>Buyer2</option>
                        <option>Buyer3</option>
                      </select>-->
									<form-group v-if="form.applyType=='Update'" other-rules="required" type="select" uri="/buSupplierRecommendation/listbuyers" :readonly="readonly" v-model="form.buyerUserId" name="buyerUserId"></form-group>
								</div>
							</div>

						</div>
						<div class="row">
							<div class="col-md-6 col-sm-12">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Description for Scope of Supply and Services 供货及服务范围描述</label>
									<textarea-my other-rules="required"  rows="2" :limit="3000" :readonly="readonly||(form.applyType=='Update')" v-model="form.supplyServiceScopeDes" name="supplyServiceScopeDes" id="supplyServiceScopeDes" placeholder="Description for Scope of Supply and Services 供货及服务范围描述"></textarea-my>
								</div>
							</div>
							<div class="col-md-6 col-sm-12">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Reason/ Purpose of Purchase 采购原因/ 用途</label>
									<textarea-my other-rules="required"  rows="2" :limit="3000" :readonly="readonly||(form.applyType=='Update')" v-model="form.reasonPurppose" name="reasonPurppose" id="reasonPurppose" placeholder="Reason/ Purpose of Purchase 采购原因/ 用途"></textarea-my>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Inquired Company List <label>投标商列表</label> </h3>
					<!--<span><i class="fa fa-fw fa-info-circle"></i>  At lease need to enter one record in Inquired Companies and Technically </span>-->
				</div>

				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-bordered" id="companyTable">
								<tbody>
									<tr>
										<th style="width: 50px;">No. </th>
										<th style="width:200px;">Inquired Company Name 投标商名称</th>
										<th style="width: 280px;">Total Price 总额</th>
										<th style="width: 240px;">Technically 技术检验</th>
										<th style="width: 240px;">Comments 备注</th>
										<th v-if="!readonly" style="width: 50px;" class="text-center">
											<a v-if="!readonly" href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
										</th>
									</tr>
									<tr v-bind:key="index" v-for="(entry,index) in form.companyList">
										<td>{{ index+ 1}}</td>
										<td>
											<input type="hidden" class="form-control" id="" v-model="entry.id">
											<textarea  :class="{'form-control':true,'input': true, 'is-danger': errors.has('companyName'+index) }" :name="'companyName'+index" id="" v-model="entry.companyName" v-validate="'required'" :readonly="readonly" placeholder="Bidder Proposal 建议投标商" value=""></textarea>
										</td>
										<td>
											<div class="form-group">
												<input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('totalPrice'+index) }" :name="'totalPrice'+index" style="width: 65%" id="" :readonly="readonly" v-validate="'required'" v-model="entry.totalPrice" placeholder="Total Price 总额" value="" width="70%" :index="index">
												<!-- 货币搜索 -->
												<div class="pull-left" style="position:relative;width: 35%; ">
													<span style="width:18px;overflow:hidden;" v-if="!readonly">
                            <select style="width:98px;margin-left:-80px;height: 34px;" v-select2 v-model="entry.totalPriceUnit"  onchange="this.parentNode.nextSibling.value=this.value">
                            	 <option value="">--</option>
                            <option value="RMB">RMB</option>
                            <option value="CHF">CHF</option>
                            <option value="EUR"> EUR</option>
                            <option value="USD">USD</option>
                            </select></span><input :class="{'form-control':true,'input': true, 'is-danger': errors.has('totalPriceUnit'+index) }" :name="'totalPriceUnit'+index" v-validate="'required'" :readonly="readonly" placeholder="Currency" v-model="entry.totalPriceUnit" style="width:80px;position:absolute;left:0px;display: inline-block;padding: 10px;">
												</div>
											</div>
										</td>
										<td>
											<div class="radio" :class="{'is-danger': errors.has('optionsRadios'+index) }" style="margin-bottom: 5px;margin-top: 5px;">
												<label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadios'+index) }" v-validate="'required'" :name="'optionsRadios'+index" :id="'optionsRadios'+index" :disabled="readonly" v-model="entry.technically" value="OK">OK 合格</label>
												<label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadios'+index) }" v-validate="'required'" :name="'optionsRadios'+index" :id="'optionsRadios'+index" :disabled="readonly" v-model="entry.technically" value="NotOK">Not OK 不合格</label>
											</div>
										</td>
										<td>
											<textarea v-if="entry.technically!='OK'"  :class="{'form-control':true,'input': true, 'is-danger': errors.has('comment'+index) }" :name="'comment'+index" id="" v-model="entry.comment" v-validate="'required'" :readonly="readonly" placeholder="Comments 备注" value=""></textarea>
											<textarea v-if="entry.technically=='OK'"  :class="{'form-control':true,'input': true, 'is-danger': errors.has('comment'+index) }" :name="'comment'+index" id="" v-model="entry.comment"  :readonly="readonly" placeholder="Comments 备注" value=""></textarea>
										</td>
										<td class="text-center" v-if="!readonly" style="vertical-align: middle;">
											<a href="javascript:;" v-if="!readonly" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
										</td>
									</tr>

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><!--<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>--> Reason for Awarding and Refusal &nbsp;<label>推荐以及拒绝理由</label> </h3>
				</div>
				<div class="box-body">

					<div class="row">
						<div class="col-md-12">
							<!--v-validate="'required'"-->
							<textarea-my   rows="2"  :limit="3000" :readonly="readonly" v-model="form.awardingRefusalReason" name="awardingRefusalReason" id="awardingRefusalReason" placeholder="Reason for Awarding and Refusal 推荐以及拒绝理由"></textarea-my>
						</div>
					</div>

				</div>
			</div>
      <!--<div class="box box-primary">-->
        <!--<div class="box-header with-border">-->
          <!--<h3 class="box-title"> <i class="fa fa-asterisk text-required"></i>  Upload Attachment 上传附件 </h3>-->
          <!--&lt;!&ndash;<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i>Please upload the evidence for losing IT equipment. 请上传设备丢失证明。</span>&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="box-body">-->
          <!--<span>The attachement only supports pdf format.附件格式只支持pdf。</span>-->
          <!--<div class="row">-->
            <!--<div class="col-md-12">-->
              <!--<div class="form-group">-->
                <!--<upload :readonly="disabled"  :accept="'.pdf'"    v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" ></upload>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

			<div class="checkbox" v-if="!readonly">
				<label>
              	<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                <input  name="terms" type="checkbox" v-validate="'required'">When submitting the application, I have read and agreed to
                <a target="_blank" href="http://vwatjportal.ap.vwg/upload/2017032311223520602.pdf">relevant policies of Volkswagen Automatic Transmission Tianjin.</a> 当提交此申请时，我已经理解并承诺遵守
                <a href="http://vwatjportal.ap.vwg/upload/2017032311223520602.pdf"
                  	 target="_blank" >大众汽车自动变速器（天津）有限公司的相关政策。</a>
              </label>
			</div>

			<!--<div class="row">
				<div class="form-group overflow-auto mar-bot-20">
					<div class="col-md-12">
						<span class="" style="display: inline-block;font-weight: bold;"><i class="fa fa-fw fa-info-circle"></i> If the purchasing request is a frame contract or frame contract extension and there is no shopping cart number, please send this form to buyer via email. 如果采购需求是框架合同或框架合同延期，并且没有需求编号，请通过电子邮件将此表单发送给采购员</span>
					</div>
				</div>
			</div>-->

			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view :form="form" entityId="BuSupplierRecommendation" vclass="btn-left" uri="/form/BuSupplierRecommendation/update" :validator="this.$validator"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>

		</section>
		<!-- /.content -->
		<div class="modal fade" id="modal-default">
			<div class="modal-dialog" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			                  <span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Update Exist Business Unit´s Supplier Nomination Recommendation Application 更新已有的申请</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-sm-12">
								<table class="table table-bordered table-hover" id="select_table" role="grid" aria-describedby="example2_info" style="table-layout: fixed;">

									<thead>
										<tr role="row">
											<th>Ticket No. <br>申请单号</th>
											<th>Shopping Cart/PR Number <br>需求编号</th>
											<th>Project <br>项目</th>
											<th>Description for Scope of Supply and Services <br>供货及服务范围描述</th>
											<th>Reason/ Purpose of Purchase <br>采购原因/ 用途</th>
											<th>Application Time <br>申请时间</th>
											<th class="text-center">Select</th>
										</tr>
									</thead>
									<tbody>
										<!--<tr>
					                		<td>SR2017080107</td>
					                		<td>001</td>
					                		<td>DQ380</td>
					                		<td>Description for DQ380</td>
					                		<td>Purchase for DQ380</td>
					                		<td>2017-08-25 04:25</td>
					                		<td class="text-center"><a href="javascript:;" data-dismiss="modal" ><i class="fa fa-check"></i></a></td>
				                		</tr>
				                		-->
									</tbody>
								</table>
							</div>
						</div>
					</div>

				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	export default {
		name: 'BuSupplierRecommendation',
		methods: {
			doAfterSelectApplication: function(data) {

				this.form.updateApplicationTicketNo = data.ticketNo;
				this.form.updateApplicationId = data.id;
				this.form.prNumber = data.prNumber;
				this.form.globeNumber = data.globeNumber;
				this.form.purchaseProjectArray = data.purchaseProjectArray;
				this.form.supplyServiceScopeDes = data.supplyServiceScopeDes;
				this.form.reasonPurppose = data.reasonPurppose;
				this.form.awardingRefusalReason = data.awardingRefusalReason;
				this.form.isFrameContract = data.isFrameContract;

				var companyArray=[];
				if(data.companyList) {
					for(var i = 0; i < data.companyList.length; i++) {
						var newItem={}
						for(var key in data.companyList[i]) {
							newItem[key] = data.companyList[i][key];
						}
						newItem.id = "";
						companyArray.push(newItem);
					}
				}
				this.form.companyList = companyArray;

			},
			insertItemRows: function() {
				var newItem = {};
				for(var key in this.form.companyList[0]) {
					newItem[key] = "";
				}
				this.form.companyList.push(newItem);
			},
			//表格行删除调用方法
			deleteItemRows: function(rowId) {
				if(this.form.companyList.length > 1) {
					this.form.companyList.splice(rowId, 1);
				} else {
					$.alert("At least one complete record in “Inquired Company List”(Including Inquired companies and technical ly information) is needed. 至少需要填写一条完整的投标商列表记录（包含投标商信息和技术是否合格信息）。");
				}
			},
			retrieveData: function(url, aoData, fnCallback) {

				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData)
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			changeTableCol: function(key) {
				return this.$t(key);
				/*return key;*/
			}

		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/BuSupplierRecommendation/get/" + id;
			} else {
				var url = "/form/BuSupplierRecommendation/create/";
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
			return dm;
		},
		watch: {
			applyType: {
				handler: function(nowVal, oldVal) {
					if(oldVal == 'Update' && nowVal == 'New') {
						this.form.updateApplicationTicketNo = "";
						this.form.updateApplicationId = "";
						this.form.prNumber = "";
						this.form.globeNumber = "";
						this.form.purchaseProjectArray = [];
						this.form.supplyServiceScopeDes = "";
						this.form.reasonPurppose = "";
						this.form.awardingRefusalReason = "";
						this.form.isFrameContract = "";

						var newItem = {};
						for(var key in this.form.companyList[0]) {
							newItem[key] = "";
						}
						this.form.companyList.splice(0,this.form.companyList.length);
						this.form.companyList.push(newItem);
					}
				},
				deep: true
			}
		},
		mounted() {
			var companylist = this.form.companyList;
			var _this=this;
			var doAfterSelectApplication = this.doAfterSelectApplication;

			var queryData = this.retrieveData;
			var table = $("#select_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/buSupplierRecommendation/listapplicationforselect",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [6]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "ticketNo"
					},
					{
						data: "prNumber"
					},
					{
						data: "projectName"
					},
					{
						data: "supplyServiceScopeDes"
					},
					{
						data: "reasonPurppose"
					},
					{
						data: "createDate"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					function formateDate(isostr) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
						var parts = isostr.match(/\d+/g);
						return parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4];
					}
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					$('td:eq(5)', row).html(formateDate(data.createDate));
					$('td:eq(6)', row).html('<a href="javascript:;" class="opt-select" data-dismiss="modal" ><i class="fa fa-check"></i></a>');

					return row;
				}
			});

			$('#select_table tbody').on('click', '.opt-select', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				doAfterSelectApplication(data);

			});
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

			$("#companyTable tbody").on('blur', '.price', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert(' Only numbers and decimal point for Total Price.  对于总额只能输入数字和小数点。');
							_this.form.companyList[$(this).attr("index")].totalPrice = "";
							$(this).val("");

						} else {
							//强制保留两位小数
							var newVal = toDecimal2($(this).val());
							newVal=formatCurrency(newVal);
							_this.form.companyList[$(this).attr("index")].totalPrice = newVal;
							$(this).val(newVal);
						}
					}
				}
			});

			$("#companyTable tbody").on('focus', '.price', function() {
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {

							//强制保留两位小数
							var newVal=$(this).val().replace(new RegExp(",","gm"),"");
							_this.form.companyList[$(this).attr("index")].totalPrice = newVal;
							$(this).val(newVal);
					}
				}
			});

			//初始化只读状态的totalPrice的值为加，展示
			var pricelist = $(".price");
			for(var i = 0; i < pricelist.length; i++) {
				//var reg = /^\d+(?:\.\d{0,2})?$/;
				//$.alert($(pricelist[i]).attr("readonly"));
				if($(pricelist[i]).attr("readonly")) {
					_this.form.companyList[$(pricelist[i]).attr("index")].totalPrice = formatCurrency($(pricelist[i]).val());
					$(pricelist[i]).val(formatCurrency($(pricelist[i]).val()));
				}

			}

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
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
					if(this.form.applyType == null) {
						return true;
					}
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			disabled: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			prNumberRule: {
				get: function() {
					if(this.form.applyType == 'Update' && this.form.isFrameContract == 'No') {
						return 'required';
					}
					return null;
				}
			},
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			},
			applyType: {
				get: function() {

					return this.form.applyType;
				}
			}
		}
	}
</script>

<style>
	div.is-danger {
		border: solid red 1px;
	}
	table.table-bordered tbody td {
		overflow: hidden;
   		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

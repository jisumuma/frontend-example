<template>
	<!-- Content Wrapper. Contains page content -->
	<div>
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>Hazardous Waste Disposal Application</h1>
			<ol class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.EHS Coordinator</a>
				</li>
				<li>
					<a>4.EHS Manager</a>
				</li>
				<li>
					<a>5.Logistics</a>
				</li>
			</ol>
			<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date : {{applicationTime}}</strong>
		</span>
		</section>
		<!-- Main content -->
		<section class="content container-fluid">

			<!-- <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Staff Code 员工号 </label>
                      <input type="text" class="form-control" id="" placeholder="员工号 Staff Code" value="00180122" disabled="">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Name 姓名 </label>
                      <input type="text" class="form-control" id="" placeholder="姓名 Name" value="Yin,Xueming" disabled="">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Telephone 电话 </label>
                      <input type="text" class="form-control" id="" placeholder="电话 Telephone" value="18322143376" disabled="">
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                      <label for="">Division / Dept. 部门 </label>
                      <input type="text" class="form-control" id="" placeholder="部门 Division / Dept." value="HR, Organization & Education" disabled="">
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>-->
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"> Applicant Info. 申请人信息  </h3>
					<label class="mar-left-20"  v-if="!readonly"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
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
					<h3 class="box-title"> Hazardous Waste Information 危险废弃物信息 </h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group">
							<div class="col-md-12">
								<table class="table table-bordered mar-bot-0" id="wasteTable" style="table-layout:fixed;">
									<tbody>
										<tr>
											<th width="3%"> No.</th>
											<th width="22%"><i class="fa fa-asterisk text-required"></i> Category 种类 </th>
											<th width="25%"><i class="fa fa-asterisk text-required"></i> Name 名称 </th>
											<th width="25%"> Subject No. 科目号</th>
											<th width="22%"><i class="fa fa-asterisk text-required"></i> Estimated Weight / Quantity 预估重量/数量</th>
											<th v-if="!readonly" class="text-center" width="3%">
												<a href="javascript:;" @click="insertWasteRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
											</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form.wasteList">
											<td>{{ index+ 1}}</td>
											<td>
												<input type="hidden" class="form-control" id="" v-model="entry.id">
												<div v-if="readonly">
													<input type="hidden" v-model="entry.firstCategory" :name="'firstCategory'+index" class="form-control input">
													<input type="text" readonly v-search="entry.firstCategory" uri="/wastecategory/listlevel/1" class="form-control input">
												</div>
												<select v-if="!readonly" :class="{'form-control':true,'input':true, 'is-danger': errors.has('firstCategory'+index) }" v-validate="'required'" v-select uri="/wastecategory/listlevel/1" v-model="entry.firstCategory" :id="'firstCategory'+index" :name="'firstCategory'+index" :index="index" @change="changeFirstCategory(index)">

												</select>
											</td>
											<td>
												<div class=" pad-0" :class="{'col-md-8':(entry.ifhasOtherinput=='YES'||entry.otherInput),'col-md-12':(entry.ifhasOtherinput!='YES'&&!entry.otherInput)}">
													<div v-if="readonly">
														<input type="hidden" v-model="entry.secondCategory" :name="'secondCategory'+index" class="form-control input">
														<input type="text" readonly v-search="entry.secondCategory" :uri="'/wastecategory/listlevel2/'+entry.firstCategory" class="form-control input">
													</div>
													<select v-if="!readonly&&entry.firstCategory==''" :class="{'form-control':true,'input':true, 'is-danger': errors.has('secondCategory'+index) }" v-validate="'required'" :uri="'/wastecategory/listlevel2/'+entry.firstCategory" v-model="entry.secondCategory" :id="'secondCategory'+index" :name="'secondCategory'+index" :index="index" @change="changeSecondCategory(index)">
														<option value="">--Please Select--</option>
													</select>
													<select v-if="!readonly&&entry.firstCategory!=''" :class="{'form-control':true,'input':true, 'is-danger': errors.has('secondCategory'+index) }" v-validate="'required'" v-select :uri="'/wastecategory/listlevel2/'+entry.firstCategory" v-model="entry.secondCategory" :id="'secondCategory'+index" :name="'secondCategory'+index" :index="index" @change="changeSecondCategory(index)">
													</select>
												</div>
												<div class="col-md-4 pad-0" v-if="!readonly">
													<input v-if="entry.ifhasOtherinput=='YES'||entry.otherInput" v-validate="'required'" :readonly="readonly" :class="{'form-control':true,'input':true, 'is-danger': errors.has('otherinput'+index) }" :index="index" :name="'otherinput'+index" :id="'otherinput'+index" v-model="entry.otherInput" />
												</div>
												<div class="col-md-4 pad-0" v-if="readonly">
													<input v-if="entry.otherInput" type="text" class="form-control input" readonly="readonly" :index="index" :name="'otherinput'+index" :id="'otherinput'+index" v-model="entry.otherInput" />
												</div>
											</td>
											<td><input class="form-control input" type="text" :name="'subjectNo'+index" placeholder="Subject No. 科目号" readonly="readonly" value="" v-model="entry.subjectNo" :id="'subjectNo'+index"></td>
											<td>
												<div class="col-md-8 pad-0">
													<input type="text" :name="'quantity'+index" :id="'quantity'+index" :index="index" :class="{'form-control':true,'input':true,'number':true, 'is-danger': errors.has('quantity'+index) }" placeholder="Weight / Quantity 重量/数量" value="" :readonly="readonly" v-validate="'required'" v-model="entry.quantity">
												</div>
												<div class="col-md-4 pad-0">
													<input class="form-control input" type="text" :name="'quantityUnit'+index" placeholder="Unit 单位" readonly="readonly" value="" v-model="entry.quantityUnit" :id="'quantityUnit'+index">
												</div>
											</td>
											<td v-if="!readonly" class="text-center" style="vertical-align: middle;">
												<a href="javascript:;" @click="deleteWasteRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
											</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"> <i class="fa fa-asterisk text-required"></i>  Upload Photos 上传照片</h3>
					<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> The image format requirement is 200*200px. 图片格式要求是200*200像素.</span>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<uploadImage :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Photos" :attachments="form.attachments" multi="true" fileSizeLimit="5MB"  uploadLimit="6"></uploadImage>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 网上联单申报信息 start -->
			<div class="box box-primary" v-if="onlineShow">
				<div class="box-header with-border">
					<h3 class="box-title" style="line-height: 30px;"> Online Declaration Info. 网上联单申报信息 </h3>
					<button v-if="!onlineReadonly" class="btn btn-default pull-right btn-sm " @click="sortbyname"><i class="fa  fa-sort-amount-asc"></i> &nbsp;Sort by Name</button>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group">
							<div class="col-md-12">
								<table class="table table-bordered mar-bot-0" id="onlineTable" style="table-layout:fixed;">
									<tbody>
										<tr>
											<th width="40px"> No.</th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Name 名称 </th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Declaration No. 联单号 </th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Weight / Quantity 重量/数量</th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Service Vender Name 委托处置供应商</th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Planned Transfer Date 计划转移日期</th>
											<th v-if="!onlineReadonly" class="text-center" width="40px">
												<a href="javascript:;" @click="insertOnlineRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
											</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form.onlineList">
											<td><div class="form-group">
												{{index+1}}
											</div></td>
											<td>
												<div class="form-group">
												<input type="hidden" class="form-control" id="" v-model="entry.id">
												<input type="text" :name="'onlineName'+index" value="" :readonly="onlineReadonly" v-validate="onlinerules" :class="{'form-control':true,'input':true,'is-danger': errors.has('onlineName'+index) }" v-model="entry.onlineName" placeholder="Name 名称">
												</div>
											</td>
											<td>
												<div class="form-group">
												<input type="text" :name="'onlineNo'+index" value="" :readonly="onlineReadonly" :disabled="entry.onlineName.indexOf('电子电器')>-1" v-validate="onlinerules" :class="{'form-control':true,'input':true, 'is-danger': errors.has('onlineNo'+index) }" v-model="entry.onlineNo" placeholder="Declaration No. 联单号">
												</div>
											</td>
											<td>
												
												<div class="col-md-8 pad-0">
													<div class="form-group">
													<input type="text" :name="'onlineQuantity'+index" v-model="entry.onlineQuantity" :index="index" v-validate="onlinerules" :class="{'form-control':true,'input':true,'number':true,  'is-danger': errors.has('onlineQuantity'+index) }" placeholder="Weight / Quantity 重量/数量" value="" :readonly="onlineReadonly">
													</div>
													</div>
												<div class="col-md-4 pad-0">
													<div class="form-group">
													<input type="text" :name="'onlineQuantityUnit'+index" v-model="entry.onlineQuantityUnit" v-validate="onlinerules" :class="{'form-control':true,'input':true, 'is-danger': errors.has('onlineQuantityUnit'+index) }" placeholder="Unit 单位" value="" :readonly="onlineReadonly">
													</div>
												</div>
											</td>
											<td>
												<div class="form-group">
												<input type="text" :name="'onlineVender'+index" v-model="entry.onlineVender" v-validate="onlinerules" :class="{'form-control':true,'input':true, 'is-danger': errors.has('onlineVender'+index) }" value="" placeholder="Service Vender Name 委托处置供应商" :readonly="onlineReadonly">
												</div>
											</td>
											<td>
												<!--<div class="input-group date">
													<div class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</div>
													<input type="text" v-validate="'required'" :class="{'form-control':true,'input':true,'input-sm': true,'pull-right':true,'onlineTransferDate':true,'datepicker':true, 'is-danger': errors.has('onlineTransferDate'+index) }" :name="'onlineTransferDate'+index" :id="'onlineTransferDate'+index" v-model="entry.onlineTransferDate" :index="index" placeholder="Planned Transfer Date 计划转移日期" :readonly="onlineReadonly" :disabled="onlineReadonly">
												</div>-->
												<form-group type="datepicker"  :other-rules="onlinerules" v-model="entry.onlineTransferDate" showTime="true" :name="'onlineTransferDate'+index" haslable="false" 
													placeholder="Planned Transfer Date 计划转移日期" :readonly="onlineReadonly" :disabled="onlineReadonly" dateformate="mm/dd/yyyy"
													></form-group>

												<!-- /.input group -->
											</td>
											<td v-if="!onlineReadonly" class="text-center" style="vertical-align: middle;">
												<div class="form-group">
												<a href="javascript:;" @click="deleteOnlineRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
												</div>
											</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 网上联单申报信息 end -->

			<!-- 危险废物出厂确认信息 start -->
			<div class="box box-primary" v-if="transferShow">
				<div class="box-header with-border">
					<h3 class="box-title">Hazardous Waste Transfer Confirmation Info. 危险废物出厂确认信息 </h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group">
							<div class="col-md-12">
								<table class="table table-bordered mar-bot-0" id="transferTable" style="table-layout:fixed;">
									<tbody>
										<tr>
											<th width="40px"> No.</th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Name 名称 </th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i> Declaration No. 联单号 </th>
											<th style="width: 20%;"> Transfer Weight / Quantity 实际出厂重量/数量 </th>
											<th style="width: 20%;"><i class="fa fa-asterisk text-required"></i>Transfer Date and Time 实际转移日期及时间</th>
											<th style="width: 20%;"> Remark 注释</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form.transferList">
											<td>	<div class="form-group">{{index+1}}</div></td>
											<td>
													<div class="form-group">
												<input type="hidden" class="form-control" id="" v-model="entry.id">
												<input class="form-control input" type="text" name="" value="" v-model="entry.transferName" readonly="readonly">
												</div>
											</td>
											<td>
													<div class="form-group">
												<input class="form-control input" type="text" name="" value="" v-model="entry.transferOnlineNo" readonly="readonly">
												</div>
											</td>
											<td>
												<div class="col-md-8 pad-0">
														<div class="form-group">
													<input class="form-control input number" type="text" name="" :index="index" placeholder="Weight / Quantity 重量/数量 " value="" v-model="entry.transferQuantity" :readonly="transferReadonly">
													</div>
												</div>
												<div class="col-md-4 pad-0">
													<!--<div class="form-group">
														<input class="form-control input" type="text" name="" value="" v-model="entry.transferQuantityUnit" readonly="readonly">
													</div>-->
													<form-group type="select" other-rules="required" uri="/wastecategory/listunits"  v-model="entry.transferQuantityUnit" haslable="false" :name="'transferQuantityUnit'+index" :readonly="transferReadonly"></form-group>
												</div
											</td>
											<td>
												<div class=" date col-md-6 pad-0 pull-left">
													<!--<div class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</div>
													<input type="text" v-validate="'required'" :class="{'form-control':true,'input':true,'input-sm': true,'pull-right':true,'transferDate':true,'datepicker':true, 'is-danger': errors.has('transferDate'+index) }" :name="'transferDate'+index" :id="'transferDate'+index" v-model="entry.transferDate" :index="index" placeholder="实际转移日期" value="" :readonly="transferReadonly" :disabled="transferReadonly">
											-->	<form-group v-if="entry.transferQuantity!=0" type="datepicker"  other-rules="required" v-model="entry.transferDate" showTime="true" :name="'transferDate'+index" haslable="false" 
													placeholder="Transfer Date 实际转移日期" :readonly="transferReadonly" :disabled="transferReadonly" dateformate="mm/dd/yyyy"
													></form-group>
												<form-group v-if="entry.transferQuantity==0" type="datepicker"  other-rules="" v-model="entry.transferDate" showTime="true" :name="'transferDate'+index" haslable="false" 
													placeholder="Transfer Date 实际转移日期" :readonly="transferReadonly" :disabled="transferReadonly" dateformate="mm/dd/yyyy"
													></form-group>
												</div>
												<!-- /.input group -->

												<div class="col-md-6 pad-0 pull-left bootstrap-timepicker">
													<!--<div class="input-group-addon">
														<i class="fa fa-clock-o"></i>
													</div>
													<input type="text" v-validate="'required'" :class="{'form-control':true,'input':true,'input-sm': true,'pull-right':true,'transferTime':true,'timepicker':true, 'is-danger': errors.has('transferTime'+index) }" :name="'transferTime'+index" :id="'transferTime'+index" v-model="entry.transferTime" :index="index" placeholder="实际转移时间" value="" :readonly="transferReadonly" :disabled="transferReadonly">
											-->
											<form-group v-if="entry.transferQuantity!=0" type="timepicker"  other-rules="required" v-model="entry.transferTime"  :name="'transferTime'+index" haslable="false" 
													placeholder="Transfer Time 实际转移时间" :readonly="transferReadonly" :disabled="transferReadonly" 
													></form-group>
											<form-group v-if="entry.transferQuantity==0" type="timepicker"  other-rules="" v-model="entry.transferTime"  :name="'transferTime'+index" haslable="false" 
													placeholder="Transfer Time 实际转移时间" :readonly="transferReadonly" :disabled="transferReadonly" 
													></form-group>
												</div>
												<!-- /.input group -->
											</td>
											<td>
													<div class="form-group">
												<input class="form-control input" type="text" name="" v-model="entry.remark" placeholder="Remark 注释" :readonly="transferReadonly">
											</div>
											</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 危险废物出厂确认信息 end -->

			<div class="checkbox mar-bot-20" v-if="!readonly">
				<label>
                	<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  <input  name="terms" type="checkbox" v-validate="'required'">When submitting the application, I have read and agreed to
                  	<a href="http://vwatjportal.ap.vwg/upload/2017032311223520602.pdf"
                  	 target="_blank" >relevant policies of Volkswagen Automatic Transmission Dalian.</a>
                  	  当提交此申请时，我已经理解并承诺遵守
                  	 <a href="http://vwatjportal.ap.vwg/upload/2017032311223520602.pdf"
                  	 target="_blank" > 大众汽车自动变速器（大连）有限公司的相关政策。</a>
                </label>
			</div>
			<comment v-if="processTaskId !=null&&!transferbuttonShow&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view v-if="(!transferbuttonShow&&this.$route.query.taskKey!='online')||this.$route.path.indexOf('detail') > -1||this.form.status=='0'||this.form.status=='9'" :form="form" entityId="WasteDisposal" vclass="btn-left" uri="/form/WasteDisposal/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
			<Confirmwithsavereject v-if="!transferbuttonShow&&this.$route.query.taskKey=='online'&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Submit" uri="/wasteDisposal/save" v-on:beforeapprovel="beforesubmit"></Confirmwithsavereject>
			<Confirmwithsave v-if="transferbuttonShow&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Submit" uri="/wasteDisposal/save" ></Confirmwithsave>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>

		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	import timepicker from "./../../../plugins/timepicker/bootstrap-timepicker.min.js"
	import "./../../../plugins/timepicker/bootstrap-timepicker.min.css"
	export default {
		name: 'WasteDisposal',
		methods: {
			beforesubmit:function(){
				if(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
					if(!(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') != -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)){
						this.form.transferList=[];
						this.form.transferIds="";
					}
				}
				if(this.$route.path.indexOf('create') > -1||this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
					if(!(this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('online') != -1||this.$route.query.taskKey.indexOf('transfer') != -1))||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)){
						this.form.onlineList=[];
						this.form.onlineIds="";
					}
				}	
			},
			sortbyname:function(){
				if(this.onlinesort=="asc"){
					this.onlinesort="desc";
				}else{
					this.onlinesort="asc";
				}
				var tempsort=this.onlinesort;
				this.form.onlineList.sort(function(a,b){
					var temp=0;
					if(a.onlineName>b.onlineName) {
						temp=1;
					}else if(a.onlineName<b.onlineName){
						temp=-1;
					}else{
						temp=0;
					}
					if(tempsort=="asc"){
						return temp;
					}else{
						return 0-temp;
					}
				});
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
					this.form.creatorEmail = this.tempcreatorEmail;
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
				this.form.creatorEmail = data.email;

				var tempdep=data.department;
				if( tempdep == null||tempdep == ''||tempdep == 'null'||tempdep == undefined ){
					tempdep=data.division;
				}

				this.form.creatorDept = tempdep;

			},
			insertWasteRows: function() {
				var newItem = {};
				for(var key in this.form.wasteList[0]) {
					newItem[key] = "";
				}
				this.form.wasteList.push(newItem);
			},
			//表格行删除调用方法
			deleteWasteRows: function(rowId) {
				if(this.form.wasteList.length > 1) {
					this.form.wasteList.splice(rowId, 1);
				} else {
					$.alert("At least one complete record in “Hazardous Waste Information” is needed 至少需要填写一条完整的危险废弃物信息");
				}
			},
			initselect: function(el) {
				setTimeout(function() {
					var uri = $(el).attr("uri");
					var html = '<option value="">--Please Select--</option>';
					//var html = '';
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
				}, 300);

				// $.alert(uri);
			},
			changeFirstCategory: function(rowId) {
				var form = this.form;
				if($("#firstCategory" + rowId).val() != '' && $("#firstCategory" + rowId).val() != null && $("#firstCategory" + rowId).val() != 'null') {
					this.initselect($("#secondCategory" + rowId)[0]);

				} else {
					$("#secondCategory" + rowId).html('<option value="">--Please Select--</option>');
				}
				form.wasteList[rowId].secondCategory = '';
				$("#secondCategory" + rowId).val('');
				//$("#otherinput"+ rowId).hide();
				this.changeSecondCategory(rowId);
			},

			changeSecondCategory: function(rowId) {
				var form = this.form;
				//var secondCategory=this.form.wasteList[rowId].secondCategory;
				var secondCategory = $("#secondCategory" + rowId).val();
				if(secondCategory != null && secondCategory != '' && secondCategory != 'null') {
					global_.actUtil.query("get", "/wastecategory/get/" + secondCategory, "", function(data) {
						var dm = JSON.parse(data);
						form.wasteList[rowId].subjectNo = dm.obj.subjectNo;
						//$("#subjectNo"+rowId).val(dm.obj.subjectNo);
						form.wasteList[rowId].quantityUnit = dm.obj.quantityUnit;
						//$("#quantityUnit"+rowId).val(dm.obj.quantityUnit);

						form.wasteList[rowId].ifhasOtherinput = dm.obj.ifhasOtherinput;
						form.wasteList[rowId].otherInput = undefined;

					});
				} else {
					form.wasteList[rowId].subjectNo = '';
					//$("#subjectNo"+rowId).val(dm.obj.subjectNo);
					form.wasteList[rowId].quantityUnit = '';
					//$("#quantityUnit"+rowId).val(dm.obj.quantityUnit);

					form.wasteList[rowId].ifhasOtherinput = '';
					form.wasteList[rowId].otherInput = undefined;
				}
			},
			insertOnlineRows: function() {
				var newItem = {};
				for(var key in this.form.onlineList[0]) {
					newItem[key] = "";
				}
				this.form.onlineList.push(newItem);
			},
			//表格行删除调用方法
			deleteOnlineRows: function(rowId) {
				if(this.form.onlineList.length > 1) {
					this.form.onlineList.splice(rowId, 1);
				} else {
					$.alert("At least one complete record in “Online Declaration Info” is needed 至少需要填写一条完整的网上联单申报信息 ");
				}
			}

		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/WasteDisposal/get/" + id;
			} else {
				var url = "/form/WasteDisposal/create/";
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
			dm.tempcreatorEmail=dm.form.creatorEmail ;
			dm.onlinesort="asc";
			dm.onlinerules="required";
			this.$root.actProcessType="none";
			return dm;
		},watch:{
			"$root.actProcessType":{
				handler(curVal,oldVal){
					if("approve"==curVal){
						this.onlinerules="required";
					}else if("reject"==curVal){
						this.onlinerules='';
					}else{
						this.onlinerules="";
					}
					console.log(this.onlinerules);
				},
				deep:true
			}
			},
		mounted() {

			var _form = this.form;
			var _this = this;
			//强制数字保留两位小数

			function sleep(numberMillis) {
				var now = new Date();
				var exitTime = now.getTime() + numberMillis;
				while(true) {
					now = new Date();
					if(now.getTime() > exitTime)
						return;
				}
			}

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

			$("#wasteTable tbody").on('blur', '.number', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert(' Only numbers and decimal point for this input  只能输入数字和小数点');
							_form.wasteList[$(this).attr("index")].quantity = "";
							$(this).val("");

						} else {
							//强制保留两位小数
							/*var newVal=toDecimal2($(this).val());
							companylist[$(this).attr("index")].totalPrice=newVal;
							$(this).val(newVal);*/
						}
					}
				}
			});

			$("#onlineTable tbody").on('blur', '.number', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert(' Only numbers and decimal point for this input  只能输入数字和小数点');
							_form.onlineList[$(this).attr("index")].onlineQuantity = "";
							$(this).val("");

						} else {
							//强制保留两位小数
							/*var newVal=toDecimal2($(this).val());
							companylist[$(this).attr("index")].totalPrice=newVal;
							$(this).val(newVal);*/
						}
					}
				}
			});

			$("#transferTable tbody").on('blur', '.number', function() {
				var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert(' Only numbers and decimal point for this input  只能输入数字和小数点');
							_form.transferList[$(this).attr("index")].transferQuantity = "";
							$(this).val("");

						} else {
							//强制保留两位小数
							/*var newVal=toDecimal2($(this).val());
							companylist[$(this).attr("index")].totalPrice=newVal;
							$(this).val(newVal);*/
						}
					}
				}
			});
/*
			var onlineTransferDateList = $(".onlineTransferDate");
			for(var i = 0; i < onlineTransferDateList.length; i++) {
				var rowId = $("#onlineTransferDate" + i).attr("index");
				$("#onlineTransferDate" + rowId).datepicker({
					autoclose: true
				});
				$("#onlineTransferDate" + rowId).on('changeDate', function() {
					$("#onlineTransferDate" + rowId).val(
						$("#onlineTransferDate" + rowId).datepicker('getFormattedDate')
					);
					_form.onlineList[rowId].onlineTransferDate = $("#onlineTransferDate" + rowId).datepicker('getFormattedDate');
				});
			}*/

		/*	var transferDateList = $(".transferDate");
			for(var i = 0; i < transferDateList.length; i++) {
				var rowId = $("#transferDate" + i).attr("index");
				$("#transferDate" + rowId).datepicker({
					autoclose: true
				});
				$("#transferDate" + rowId).on('changeDate', function() {
					$("#transferDate" + rowId).val(
						$("#transferDate" + rowId).datepicker('getFormattedDate')
					);
					_form.transferList[rowId].transferDate = $("#transferDate" + rowId).datepicker('getFormattedDate');
				});
			}*/

			//Timepicker
			/*var transferTimeList = $(".transferTime");
			for(var i = 0; i < transferTimeList.length; i++) {
				var rowId = $("#transferTime" + i).attr("index");
				$("#transferTime" + rowId).timepicker({
					showInputs: false
				});

				$("#transferTime" + rowId).timepicker().on('changeTime.timepicker', function(e) {
					//console.log('The time is ' + e.time.value);
					$("#transferTime"+rowId).val(e.time.value);
					_form.transferList[rowId].transferTime =e.time.value;
					//console.log('The hour is ' + e.time.hours);
					//console.log('The minute is ' + e.time.minutes);
					//console.log('The meridian is ' + e.time.meridian);
				});
			}*/

			/*	$(".transferTime").timepicker({
						 showInputs: true
					});
				*/
				
			if(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
					if(!(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') != -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)){
						this.form.transferList=[];
						this.form.transferIds="";
					}
				}
				if(this.$route.path.indexOf('create') > -1||this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
					if(!(this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('online') != -1||this.$route.query.taskKey.indexOf('transfer') != -1))||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)){
						this.form.onlineList=[];
						this.form.onlineIds="";
					}
				}	

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_form=this.form;
				if(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
					if(!(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') != -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)){
						this.form.transferList=[];
						this.form.transferIds="";
					}
				}
				if(this.$route.path.indexOf('create') > -1||this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
					if(!(this.$route.query.taskKey != null && (this.$route.query.taskKey.indexOf('online') != -1||this.$route.query.taskKey.indexOf('transfer') != -1))||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)){
						this.form.onlineList=[];
						this.form.onlineIds="";
					}
				}	
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
			},
			onlineShow: {
				get: function() {
					if(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
						return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('online') != -1) || (this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') != -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
					}else{
						return this.form.onlineIds!=undefined&&this.form.onlineIds!=null&&this.form.onlineIds!=''&&this.form.onlineIds!='null';
					}
				}
			},
			onlineReadonly: {
				get: function() {
					if(this.$route.path.indexOf('detail') > -1){
						return true;
					}
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('online') == -1) || (this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('onlineApprove') != -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			transferShow: {
				get: function() {
					if(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1){
						return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') != -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
					}else{
						return this.form.transferIds!=undefined&&this.form.transferIds!=null&&this.form.transferIds!=''&&this.form.transferIds!='null';
					}
				}
			},
			transferReadonly: {
				get: function() {
					if(this.$route.path.indexOf('detail') > -1){
						return true;
					}
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') == -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			transferbuttonShow: {
				get: function() {
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('transfer') != -1);
				}
			}
		}
	}
</script>

<style scoped>
	.pad-0 {
		padding: 0px !important;
	}
	
</style>

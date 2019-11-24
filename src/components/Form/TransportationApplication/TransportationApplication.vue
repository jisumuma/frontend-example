<template>
  <div>
    <section class="content-header">
		<h1 style="font-size:22px;">Logistic Transportation Application</h1>
		<ol class="breadcrumb" >
			<li><a >1.Applicant</a></li>
			<li v-if="isAir"><a >2.Disciplinary Supervisor</a></li>
			<li v-if="isAir"><a >3.TL Responsible</a></li>
			<li v-if="isAir"><a >4.TL L3 Manager</a></li>
			<li v-if="isAir"><a >5.TL L2 Manager</a></li>
			<li v-if="isAir"><a >6.Head of TL</a></li>
			<li v-if="isAir"><a >7.TL Responsible</a></li>
			<li v-if="isOtherMode"><a >2.Disciplinary Supervisor</a></li>
			<li v-if="isOtherMode"><a >3.TL Responsible</a></li>
			<li v-if="isOtherMode"><a >4.TL L3 Manager</a></li>
			<li v-if="isOtherMode"><a >5.TL Responsible</a></li>
		</ol>

		<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
			<strong>Application No. : {{form.ticketNo}}</strong>
			<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
		</span>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">
		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Applicant Info. <label>申请人信息</label></h3>
				<label v-if="!readonly" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
				<div class="box-tools pull-right">
					<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero">
						<i class="fa fa-plus" id="minusplusi"></i>
					</button>
				</div>
			</div>
			<form role="form">
				<input type="hidden" v-model="form.id" name="id">
				<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
				<input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
				<div class="box-body">
					<div class="row">
						<!--onbehalf不选中的时候显示-->
						<form-group v-if="!onbehalf" col="md-3" type="input" v-model="form.creatorName" name="creatorName" readonly="true" label="TransportationApplication.creatorName"></form-group>
						<!--选中的时候显示-->
						<div class="col-md-3" v-if="onbehalf">
							<div class="form-group">
							  <label for="">
							   <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
								Name 姓名 </label>
							  <div class="input-group ">
								<input type="text" class="form-control" placeholder="Applicant Name 申请人姓名" id="creatorName" name="name" v-model="form.creatorName" readonly="true">
								<span class="input-group-btn" id="selectotherperson">
										<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
								</span>
							  </div>
							</div>
						</div>
						<form-group col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="true" label="TransportationApplication.creatorStaffcode"></form-group>
						<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" readonly="true" label="TransportationApplication.telephone"></form-group>
						<form-group col="md-3" type="input" v-model="form.creatorDept" name="creatorDept" readonly="true" label="TransportationApplication.creatorDept"></form-group>
					</div>
					<div class="row panel-collapse collapse " id="collapseZero">
						<form-group col="md-3" type="input" v-model="form.supervisor" name="supervisor" readonly="true" label="TransportationApplication.supervisor"></form-group>
						<form-group col="md-3" type="input" v-model="form.buHead" name="buHead" readonly="true" label="TransportationApplication.buHead"></form-group>
						<form-group col="md-3" type="input" v-model="form.costCenter" name="costCenter" readonly="true" label="TransportationApplication.costCenter"></form-group>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Transportation Service Info. <label>运输服务信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<div class="row">
						<div class="col-md-12 form-group">
							<label class="col-md-3" style="width:110px;padding-left:0px;" for="">
								<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Type 类型: </label>
							<div class="radio mar-top-0">
								<label>
									<input type="radio" v-model="form.transType" name="Trans_Type" value="D" :disabled="readonly" @input="inputType">
									Domestic 国内
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.transType" name="Trans_Type" value="I" :disabled="readonly" @input="inputType">
									International 国际
								</label>
							</div>
						</div>
					</div>
					<div class="row">
						<!-- Urgent Shippment 紧急发运 -->
						<div class="col-md-3">
							<div style="overflow: auto;" >
								<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>  Urgent Shipment 紧急发运 </label>
								<div class="radio mar-top-0">
									<label>
										<input type="radio" v-model="form.urgentShipment" name="Urgent_Shippment" :class="{'is-danger': errors.has('urgentShipment') }" value="Yes" :disabled="readonly">
										Yes
									</label>
									<label class="mar-left-20">
										<input type="radio" v-model="form.urgentShipment" name="Urgent_Shippment" :class="{'is-danger': errors.has('urgentShipment') }" value="No" :disabled="readonly">
										No
									</label>						
								</div>
							</div>
						</div>
						<!-- 发货时间 -->
						<form-group col="md-3" type="datepicker" v-model="form.departureTimeString" name="departureTimeString" :readonly="readonly" label="TransportationApplication.departureTime" :startDate="this.generateDepartureStart" v-if="this.showDpt" ></form-group>
						<!-- 最迟到货时间 -->
						<form-group col="md-3" type="datepicker" v-model="form.arrivalDeadlineString" name="arrivalDeadlineString" :readonly="readonly" label="TransportationApplication.arrivalDeadline" other-rules="required" :startDate="generateArrivalDeadlineStart" v-if="this.showArr" ></form-group>
						<!-- 确保包装完成 -->
						<div class="col-md-3">
						<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
						<input type="checkbox" style="margin-top:33px;" v-model="makeSurePackageDone" @change="checkPackageDone" :disabled="readonly" name="makeSurePackageDone" id="makeSurePackageDone" value="Yes"> Make Sure Package Done 确保包装完成
						</div>
					</div>
					<div class="row">
						<!-- 发货人 发货部门 -->
						<div class="col-md-3 ">
							<label v-if="showIntel">
								<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
								Shipper 发货人 & Department 发货部门
							</label>
							<label v-else>
								<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
								Shipper 发货人
							</label>
							<form-group type="input" style="width:50%; float:left; padding-right:5px;" v-model="form.shipper" name="shipper" :readonly="readonly" haslable="false" other-rules="required|max:75" placeholder="Shipper 发货人" v-if="showIntel"></form-group>
							<form-group type="input" style="width:100%; float:left; padding-right:5px;" v-model="form.shipper" name="shipper" :readonly="readonly" haslable="false" other-rules="required|max:75" placeholder="Shipper 发货人" v-else></form-group>
							<form-group type="input" style="width:50%; float:left;" v-model="form.department" name="department" :readonly="readonly" haslable="false" other-rules="required|max:75" placeholder="Department 发货部门" v-if="showIntel"></form-group>
						</div>
						<!-- 联系方式 -->
						<form-group col="md-3" type="input" v-model="form.shipperContact" name="shipperContact" :readonly="readonly" label="TransportationApplication.shipperContact" other-rules="required|max:75"></form-group>
						<!-- consignee -->
						<form-group col="md-3" type="input" v-model="form.consignee" name="consignee" :readonly="readonly" label="TransportationApplication.consignee" other-rules="required|max:75"></form-group>
						<!-- consignee 联系方式 -->
						<form-group col="md-3" type="input" v-model="form.consigneeContact" name="consigneeContact" :readonly="readonly" label="TransportationApplication.consigneeContact" other-rules="required|max:75"></form-group>
					</div>
					<div class="row"> <!-- v-if="showIntel || showDomestic"-->
						<!-- 提货地址 仓库名称 -->
						<div class="col-md-6 ">
							<label style="clear: both;display: block;">
								<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
								Pickup Address 提货地址 / Warehouse Name 仓库名称
							</label>
							<form-group class="form-group-mar-0" type="select2" uri="/city/listcitys" style="width:30%; float:left;" other-rules="required" haslable="false" :readonly="readonly" v-model="form.pickupAddress" name="pickupAddress"></form-group>
							<form-group class="form-group-mar-0" type="input" style="width:70%; float:right;" other-rules="required|max:300" haslable="false" :readonly="readonly"v-model="form.wareHouse" name="wareHouse" placeholder="具体地址 / 仓库"></form-group>
						</div>
						
						<!-- 送货地址 -->
						<div class="col-md-6 ">
							<label style="clear: both;display: block;">
								<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
								Delivery Address 送货地址
							</label>
							<form-group class="form-group-mar-0" type="select2" uri="/city/listcitys" style="width:30%; float:left;" other-rules="required" haslable="false" :readonly="readonly" v-model="form.deliveryAddress" name="deliveryAddress"></form-group>
							<form-group class="form-group-mar-0" type="input" style="width:70%; float:right;" other-rules="required|max:300" haslable="false" :readonly="readonly" v-model="form.deliveryAddressDetail" name="deliveryAddressDetail" placeholder="具体地址 / 仓库"></form-group>
							<span style="font-size: 12px;font-weight:bold" class="text-muted">If the line is not under existing contract, the contract time should be considered. 如果线路不在现有合同，需要考虑合同时间。</span>
						</div>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
				<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
				<h3 class="box-title">Lanes Covered in Current Frame Contract <label>现有运输合同是否涵盖</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<div class="row">
						<div class="col-md-6">
							<div class="radio mar-top-0">
								<label>
									<input type="radio" v-model="form.boolInContract" name="boolInContract" value="Yes" :disabled="readonly">
									Yes
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.boolInContract" name="boolInContract" value="No" :disabled="readonly">
									No
								</label>						
							</div>					
						</div>
					</div>   
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
				
				<h3 class="box-title">Cargo Description <label>货物信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
						<tbody>
							<tr class="bg-gray-light">
								<th width="18%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Cargo Name 品名</th>
								<th width="19%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Parts No. 零件号</th>
								<th width="38%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Project 项目</th>
								<th width="12%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Quantity 数量</th>
								<th width="12%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Unit Weight/kg 重量/kg</th>
								<th width="14%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Hazard 危品&nbsp;<i class="fa fa-fw fa-info-circle text-info" :title="this.titleTips"></i></th>
								<th width="32%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Packed In 包装方式</th>
								<th width="5%" class="text-center">
									<a v-if="!readonly" href="javascript:;" @click="insertCargosItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
								</th>
							</tr>
							<tr v-for="(entry,index) in form.transportationCargosList">
								<td>
									<form-group other-rules="required|max:30" type="input" haslable="false" isTable="true" style="padding-left:2px;padding-right:5px" :readonly="readonly" v-model="entry.cargoName" :name="'cargoName'+index"></form-group>
								</td>
								<td>
									<form-group other-rules="required|max:30" type="input" haslable="false" isTable="true" style="padding-left:2px;padding-right:5px" :readonly="readonly" v-model="entry.partsNo" :name="'partsNo'+index"></form-group>
								</td>
								<td>
									<form-group style="width:50%; float:left; padding-right:15px;" other-rules="required" type="select" uri="/dict/list?groupName=Cargo_Project" haslable="false" isTable="true" :readonly="readonly" v-model="entry.project" :name="'project'+index" @change="clearOtherValue(index)"></form-group>
									<form-group v-if="entry.project != 'Others'" style="width:50%; float:left;" type="input" haslable="false" isTable="true" placeholder="Others 其他" readonly="true" v-model="entry.otherProject" :name="'otherProject'+index"></form-group>
									<form-group v-else style="width:50%; float:left;" other-rules="required|max:75" type="input" haslable="false" isTable="true" placeholder="Others 其他" :readonly="readonly" v-model="entry.otherProject" :name="'otherProject'+index"></form-group>
								</td>
								<td>
									<form-group v-on:change="inputNum(entry.quantity, 'Quantity', '数量')" other-rules="required|max:30|decimal" type="input" haslable="false" isTable="true" style="padding-left:5px;padding-right:5px" :readonly="readonly" v-model="entry.quantity" :name="'quantity'+index"></form-group>
								</td>
								<td>
									<form-group v-on:change="inputNum(entry.unitWeight, 'Weight', '重量')" other-rules="required|max:30|decimal" type="input" haslable="false" isTable="true" style="padding-left:5px;padding-right:5px" :readonly="readonly" v-model="entry.unitWeight" :name="'unitWeight'+index"></form-group>
								</td>
								<td>
									<form-group other-rules="required" type="select" uri="/dict/list?groupName=Cargo_Hazard" haslable="false" isTable="true" :readonly="readonly" v-model="entry.hazard" :name="'hazard'+index"></form-group>
								</td>
								<td>
									<form-group style="width:50%; float:left; padding-right:15px;" other-rules="required" type="select" uri="/dict/list?groupName=Packed_In" haslable="false" isTable="true" :readonly="readonly" v-model="entry.packedIn" :name="'packedIn'+index" @change="clearOtherValue(index)"></form-group>
									<form-group v-if="entry.packedIn != '7Others'" style="width:50%; float:left;" type="input" haslable="false" isTable="true" placeholder="Others 其他" readonly="true" v-model="entry.otherPack" :name="'otherPack'+index"></form-group>
									<form-group v-else style="width:50%; float:left;" other-rules="required|max:75" type="input" haslable="false" isTable="true" placeholder="Others 其他" :readonly="readonly" v-model="entry.otherPack" :name="'otherPack'+index"></form-group>
								</td>
								<td class="text-center" style="vertical-align: middle;">
									<div class="form-group" >
										<a v-if="!readonly" href="javascript:;" @click="deleteCargosItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="row">
						<!-- 运输方式 -->
						<form-group v-if="showIntel" col="md-3" type="select" v-model="form.modeOfTransport" name="modeOfTransport" :readonly="readonly" label="TransportationApplication.modeOfTransport" other-rules="required" uri="/dict/list?groupName=Mode_Of_Transport"></form-group>
						<!-- location -->
						<form-group v-if="showIntel" col="md-3" other-rules="max:30" type="input" v-model="form.location" name="location" :readonly="readonly" label="TransportationApplication.location" ></form-group>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
			  <h3 class="box-title">Other Cargo Info. <label>其他货物信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
						<tbody>
							<tr class="bg-gray-light">
								<th width="18%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Length 长(cm)</th>
								<th width="18%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Width 宽(cm)</th>
								<th width="18%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Height 高(cm)</th>
								<th width="19%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Package Pieces 件数</th>
								<th width="37%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Weight per Item 单个重量(kg)</th>
								<th width="31%"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Volume per Item 单个体积(cm3)</th>
								<th width="5%" class="text-center">
									<a v-if="!readonly" href="javascript:;" @click="insertPackItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
								</th>
							</tr>
							<tr v-for="(entry,index) in form.transportationPacksList">
								<td>
									<form-group v-on:change="inputLWH(index)" other-rules="required|decimal" type="input" haslable="false"  isTable="true" :readonly="readonly" v-model="entry.length" :name="'length'+index"></form-group>
									<input type="hidden" v-model="entry.id">
								</td>
								<td>
									<form-group v-on:change="inputLWH(index)" other-rules="required|decimal" type="input" haslable="false" isTable="true" :readonly="readonly" v-model="entry.width" :name="'width'+index"></form-group>
								</td>
								<td>
									<form-group v-on:change="inputLWH(index)" other-rules="required|decimal" type="input" haslable="false" isTable="true" :readonly="readonly" v-model="entry.height" :name="'height'+index"></form-group>
								</td>
								<td>
									<form-group v-on:change="inputPcs(index)" other-rules="required|numeric" type="input" haslable="false" isTable="true" :readonly="readonly" v-model="entry.packagePcs" :name="'packagePcs'+index"></form-group>
								</td>
								<td>
									<form-group v-on:change="inputWht(index)" other-rules="required|decimal" type="input" haslable="false" isTable="true" :readonly="readonly" v-model="entry.weightperItem" :name="'weightperItem'+index"></form-group>
								</td>
								<td>
									<form-group v-on:change="inputVolum(index)" other-rules="required|decimal" type="input" haslable="false" isTable="true" :readonly="readonly" v-model="entry.volumeperItem" :name="'volumeperItem'+index"></form-group>
								</td>
								<td class="text-center" style="vertical-align: middle;">
									<div class="form-group" >
										<a v-if="!readonly" href="javascript:;" @click="deletePackItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="row">
						<!-- 总包装 -->
						<form-group col="md-3" type="input" v-model="form.totalNumber" name="totalNumber" readonly="true" label="TransportationApplication.totalNumber" ></form-group>
						<!-- 总重量 -->
						<form-group col="md-3" type="input" v-model="form.totalWeight" name="totalWeight" readonly="true" label="TransportationApplication.totalWeight" ></form-group>
						<!-- 总立方厘米数 -->
						<form-group col="md-3" type="input" v-model="form.totalSize" name="totalSize" readonly="true" label="TransportationApplication.totalSize" ></form-group>
						<!-- 运输方式要求 -->
						<form-group v-show="showDomestic" col="md-3" type="select" v-model="form.transportWished" name="transportWished" :readonly="readonly" label="TransportationApplication.transportWished" :otherRules="showDomestic?'required':''" uri="/dict/list?groupName=Transport_Wished_Domestic"></form-group>
						<form-group v-show="showIntel" col="md-3" type="select" v-model="form.transportWished" name="transportWished" :readonly="readonly" label="TransportationApplication.transportWished" :otherRules="showIntel?'required':''" uri="/dict/list?groupName=Transport_Wished_International"></form-group>
					</div>
				</div>
			</form>
		</div>

		<div class="box box-primary">
			<div class="box-header with-border">
			  <h3 class="box-title">Other Info. <label>其他信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<div class="row">
						<!-- 成本中心 -->
						<form-group col="md-3" type="input" v-model="form.costCenterOrder" name="costCenterOrder" :readonly="readonly" label="TransportationApplication.costCenterOrder" other-rules="required"></form-group>
						<!-- 发件原因 -->
						<form-group v-show="showDomestic" col="md-3" type="select" v-model="form.transportationReason" name="transportationReason" :readonly="readonly" label="TransportationApplication.transportationReason" :otherRules="showDomestic?'required':''" uri="/dict/list?groupName=Transportation_Reason_Domestic"></form-group>
						<form-group v-show="showIntel" col="md-3" type="select" v-model="form.transportationReason" name="transportationReason" :readonly="readonly" label="TransportationApplication.transportationReason" :otherRules="showIntel?'required':''" uri="/dict/list?groupName=Transportation_Reason_International"></form-group>
						<!-- 其他 -->
						<form-group v-if="form.transportationReason == 'Others' || form.transportationReason == '2'" style="padding-top:25px;" col="md-3" type="input" v-model="form.otherReason" name="otherReason" :readonly="readonly" haslable="false" :placeholder="form.transportationReason=='2'? '需要返回的单据类型':'Others 其他'" other-rules="required|max:75"></form-group>
						
						
					</div>   
				</div>
			</form>
		</div>
		
		<div class="box box-primary" >
			<div class="box-header with-border">
				<h3 class="box-title" v-if="!readonly">Upload Attachment <label>上传附件</label></h3>
				<h3 class="box-title" v-else >Attachment <label>附件</label></h3>
			</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<upload2 class="col-md-11" :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true" required="false"></upload2>
						</div>
					</div>
			</form>
					
		</div>

		<div class="box box-primary" v-if="this.verifiedShow">
			<div class="box-header with-border">
				<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
				<h3 class="box-title">Verified by TL Responsible <label>物流部接单人审核</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div v-show="showIntel" class="radio mar-top-0">
								<label>
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="Courier Express 快递" :disabled="readonlyTLVerified">
									Courier Express 快递
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="Air Freight 空运" :disabled="readonlyTLVerified">
									Air Freight 空运
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="Ocean Freight 海运" :disabled="readonlyTLVerified">
									Ocean Freight 海运
								</label>
                <label v-if="form.transType == 'I'" class="mar-left-20">
                  <input type="radio" v-model="form.tlVerified" name="tlVerified" value="Rail 铁路" :disabled="readonlyTLVerified">
                  Rail 铁路
                </label>
							</div>
							<div v-show="showDomestic" class="radio mar-top-0">
								<label>
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="Courier" :disabled="readonlyTLVerified">
									Courier
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="LTL" :disabled="readonlyTLVerified">
									LTL
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="2 Ton" :disabled="readonlyTLVerified">
									2 Ton
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="5 Ton" :disabled="readonlyTLVerified">
									5 Ton
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="8 Ton" :disabled="readonlyTLVerified">
									8 Ton
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="10 Ton" :disabled="readonlyTLVerified">
									10 Ton
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="15 Ton" :disabled="readonlyTLVerified">
									15 Ton
								</label>
								<label class="mar-left-20">
									<input type="radio" v-model="form.tlVerified" name="tlVerified" value="30 Ton" :disabled="readonlyTLVerified">
									30 Ton
								</label>
							</div>
						</div>
					</div>   
				</div>
			</form>
		</div>
	
		<div class="checkbox mar-bot-20" v-if="!readonly" ><!-- 申请阶段显示 -->
				<b>Remarks 提示信息：</b><br><br>
				<div v-show = "form.transType == 'D'">1. Application need to submit to TL min. 1 day before pick up.<br></div>
				<div v-show = "form.transType == null || form.transType == 'I'">1. Export Application need to submit to TL min. 1 day before pick up.<br></div>
				2. Cargo package/package labeling must be ready before pick up.<br>
				3. Any document needed for transport must be ready together with cargo.<br>
				4. If the cargo belongs to dangerous goods or contains magnet or oil, please consult with transport team in advance.<br>
				5. Shipping date is the next day after the finish of approval.<br><br>
				<div v-show = "form.transType == 'D'">1. 运输单必须在提货前至少一天提交给物流。<br></div>
				<div v-show = "form.transType == null || form.transType == 'I'">1. 出口运输单必须在提货前至少一天提交给物流。<br></div>
				2. 提货前，货物必须已经包装/贴标完好。<br>
				3. 任何需要随货的单据，必须和货物一起准备好。<br>
				4. 如果货物属于危险品或含磁、含油，请和运输组提前沟通。<br>
				5. 发运时间为申请单审批完成后的第二天。<br><br>
			<label>
				<input type="checkbox" id="statement" name="terms">
				When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
				当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。
			</label>
		</div>
		<comment v-if="!selfApprove && processTaskId != null && form.status != 9 && form.status != 2 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
		<Confirmwithsavereject v-if="!showTLVerified" :form="form" lableName="Submit" uri="/transportationApplication/save" v-on:beforeapprovel="beforeapprovel" :validator="this.$validator" ></Confirmwithsavereject>
		<Confirm v-else-if="this.$route.query.taskKey == 'TLResponsible2' && ckeckInApproveFlow" :form="form" lableName="Confirm" uri="/transportationApplication/save" v-on:beforeapprovel="beforeapprovel"></Confirm>
		<router-view v-else :form="form" entityId="TransportationApplication" vclass="btn-left" uri="/form/TransportationApplication/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel"></router-view>
		<comment-list v-if="form.processInstanceId !=null"></comment-list>
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
export default {
	name: "TransportationApplication",
	methods: {
		//在onbehalf不勾选的时候拿去在data方法缓存的值赋值文本框
		onbehalfclick: function() {
		  var temp = $("#onbehalf").is(":checked");
		  this.onbehalf = temp;
		  if (!temp) {
			this.form.creatorUserId = this.tempcreatorUserId;
			this.form.applicantUserId = this.tempapplicantUserId;
			this.form.creatorStaffcode = this.tempcreatorStaffcode;
			this.form.creatorName = this.tempcreatorName;
			this.form.telephone = this.tempcreatorPhoneNum;
			this.form.creatorDept = this.tempcreatorDept;
			this.form.supervisor = this.tempdirectSupervisor;
			this.form.buHead = this.tempbuHead;
			this.form.costCenter = this.tempcostCenter;
			this.form.creatorDivision = this.tempcreatorDivision;
		  }
		},
		doAfterSelectOtherPerson: function(data) {
		  $("#selectotherperson").attr("class", "input-group-btn");
		  this.form.applicantUserId = data.id;
		  this.form.creatorUserId = data.id;
		  this.form.creatorStaffcode = data.staffCode;
		  this.form.creatorName = data.printENName;
		  this.form.telephone = data.telephone;
		  var tempdep = data.department;
		  if (
			tempdep == null ||
			tempdep == "" ||
			tempdep == "null" ||
			tempdep == undefined
		  ) {
			tempdep = data.division;
		  }

		  this.form.creatorDept = tempdep;
		  this.form.creatorDivision = data.division;
		  this.form.supervisor = data.supervisor;
		  this.form.buHead = data.buHead;
		  this.form.costCenter = data.costCenterCode;
		},
		canSubmit: function() {
			if(this.form.arrivalDeadlineString=="--Please Select--"){
			  $.alert("Please select the Arrival Deadline. 请选择最迟到货日期。");
			  return;
			}
			if(this.form.arrivalDeadlineString=="NaN-NaN-NaN"){
                  $.alert("The Arrival Deadline format error. 最迟到货日期格式错误。");
                  return;
            }
			var today = this.DT.getCurrentDay();
			if(this.form.departureTimeString){
				if(today > this.form.departureTimeString) {
					$.alert("Departure Date should be later than Today. Please check! 发货日期不能为过去时间。 请检查！");
					return false;
				} else if(today == this.form.departureTimeString && this.form.urgentShipment == 'No') {
					$.alert("Departure date should not be today if it is not urgent shipment. Please check! 非紧急发货时发货日期不能为当天。 请检查！");
					return false;
				}
			}
			if(this.form.arrivalDeadlineString && today > this.form.arrivalDeadlineString) {
				$.alert("Arrival deadline date should be later than Today. Please check! 最迟到货日期不能为过去时间。 请检查！");
				return false;
			}
			if(this.form.arrivalDeadlineString < this.form.departureTimeString) {
				$.alert("Arrival deadline date should not be earlier than departure date. Please check! 最迟到货日期不能早于发货日期。 请检查！");
				return false;
			}
			if(!this.form.transType) {
				$.alert("Please click in the radio box for 'Type'.");
				return false;
			}
			if(!this.form.urgentShipment){
				$.alert("Please click in the radio box for 'Urgent Shippment 紧急发运'.");
				return false;
			}
			if(!$('#makeSurePackageDone').prop('checked')){
				$.alert("Please click in the check box for 'Make Sure Package Done 确保包装完成'.");
				return false;
			}
			if(!this.form.boolInContract){
				$.alert("Please click in the radio box for 'Lanes Covered in Current Frame Contract 现有运输合同是否涵盖'.");
				return false;
			}
			if(!this.form.transportationCargosList || this.form.transportationCargosList.length == 0) {
				$.alert("Please add Cargos Info. 请添加货物信息");
				return false;
			}
			if(!$('#statement').prop('checked')){
				$.alert("Please read 'Employee Statement' and check it.请阅读员工声明，并勾选。");
				return false;
			}
			return true;
		},
		//提交前校验
		beforesubmit: function() {
			var reuslt = this.canSubmit();
			if(reuslt){
				this.form.submitstatus=true;
			}else{
				this.form.submitstatus=false;
				return;
			}
		},
		beforeapprovel: function() {
			if(this.form.status != 1) {
				var reuslt = this.canSubmit();
				if(reuslt){
					this.form.approvelstatus=true;
				}else{
					this.form.approvelstatus=false;
					return;
				}
			} else {
        var processTaskKey = this.$route.query.taskKey;
				if(processTaskKey == 'TLResponsible' && !this.form.tlVerified) {
					$.alert("Please click in the radio box for 'Verified by TL Responsible 物流部接单人审核'.");
					this.form.approvelstatus=false;
					return;
				} else {
					this.form.approvelstatus=true;
				}
			}
		},
		inputType: function() {
			var url = "/form/TransportationApplication/create/";
			var me = this;
			var id = this.form.id;
			var ticketNo = this.form.ticketNo;
			var processInstanceId = this.form.processInstanceId;
			var createDate = this.form.createDate;
			var tempcreatorUserId = this.form.creatorUserId;
			var tempapplicantUserId = this.form.applicantUserId;
			var tempcreatorStaffcode = this.form.creatorStaffcode;
			var tempcreatorName = this.form.creatorName;
			var tempcreatorPhoneNum = this.form.telephone;
			var tempcreatorDept = this.form.creatorDept;
			var tempdirectSupervisor = this.form.supervisor;
			var tempbuHead = this.form.buHead;
			var tempcostCenter = this.form.costCenter;
			var tempcreatorDivision = this.form.creatorDivision;
			var dm = {};
			if(this.GL){
				this.GL.actUtil.query("get",url,"",function(data){
					dm = JSON.parse(data);
				});
			}else{
				global_.actUtil.query("get",url,"",function(data){
					dm = JSON.parse(data);
				});
			}
			me.makeSurePackageDone = [];
			me.form = dm.form;
			me.form.id = id;
			me.form.ticketNo = ticketNo;
			me.form.processInstanceId = processInstanceId;
			me.form.createDate = createDate;
			me.form.creatorUserId = tempcreatorUserId;
			me.form.applicantUserId = tempapplicantUserId;
			me.form.creatorStaffcode = tempcreatorStaffcode;
			me.form.creatorName = tempcreatorName;
			me.form.telephone = tempcreatorPhoneNum;
			me.form.creatorDept = tempcreatorDept;
			me.form.supervisor = tempdirectSupervisor;
			me.form.buHead = tempbuHead;
			me.form.costCenter = tempcostCenter;
			me.form.creatorDivision = tempcreatorDivision;
		},
		clearOtherValue:function(index){
			if(this.form.transportationCargosList[index].project !="Others"){
				this.form.transportationCargosList[index].otherProject ="";
			}
			if(this.form.transportationCargosList[index].packedIn !="7Others"){
				this.form.transportationCargosList[index].otherPack ="";
			}
			
		},
		inputNum: function(ctx,a,b) {
			var regDetail = new RegExp("^\\d+(\\.\\d+)?$");
			if(ctx){
				if(!regDetail.test(ctx)) {
					$.alert('Please make sure the format is right! 请输入正确格式！');
				}
			}
		},
		inputLWH: function(index) {
			var regDetail = new RegExp("^\\d+(\\.\\d+)?$");
			var len = this.form.transportationPacksList[index].length;
			var wid = this.form.transportationPacksList[index].width;
			var hgh = this.form.transportationPacksList[index].height;
			if(len && !regDetail.test(len)) {
				$.alert('Please make sure the format of cargo length is right! 货物长度请输入正确格式！');
			} else if(wid && !regDetail.test(wid)) {
				$.alert('Please make sure the format of cargo width is right! 货物宽度请输入正确格式！');
			} else if(hgh && !regDetail.test(hgh)) {
				$.alert('Please make sure the format of cargo height is right! 货物高度请输入正确格式！');
			} else if(len && wid && hgh){
				var vol = (len * wid * hgh);
				this.form.transportationPacksList[index].volumeperItem = vol.toFixed(2);
				this.calculateVolum();
			}
		},
		inputVolum: function(index) {
			var regDetail = new RegExp("^\\d+(\\.\\d+)?$");
			var volumeperItem = this.form.transportationPacksList[index].volumeperItem;
			if(volumeperItem){
				if(!regDetail.test(volumeperItem)) {
					$.alert('Please make sure the format of cargo volume is right! 货物体积请输入正确格式！');
				} else{
					this.calculateVolum();
				}
			}
		},
		inputPcs: function(index) {
			var regDetail2 = new RegExp("^\\d+$");
			var packagePcs = this.form.transportationPacksList[index].packagePcs;
			if(packagePcs){
				if(!regDetail2.test(packagePcs)) {
					$.alert('Please make sure the format of cargo pieces is right! 货物件数请输入正确格式！');
				} else{
					this.calculatePcs();
				}
			}
		},
		inputWht: function(index) {
			var regDetail = new RegExp("^\\d+(\\.\\d+)?$");
			var weightperItem = this.form.transportationPacksList[index].weightperItem;
			if(weightperItem) {
				if(!regDetail.test(weightperItem)) {
					$.alert('Please make sure the format of cargo weight is right! 货物重量请输入正确格式！');
				} else{
					this.calculateWht();
				}
			}
		},
		//计算总体积
		calculateVolum: function() {
			var totalVolume=Number(0);
			if(this.form.transportationPacksList!=undefined&&this.form.transportationPacksList!=""&&this.form.transportationPacksList.length>0){
				for(var i=0;i<this.form.transportationPacksList.length;i++){
					var volumeperItem = this.form.transportationPacksList[i].volumeperItem;
					var packagePcs = this.form.transportationPacksList[i].packagePcs;
					if(volumeperItem && packagePcs){
						totalVolume += Number(volumeperItem * packagePcs);
					}
				}
				this.form.totalSize = totalVolume.toFixed(2);
			}
		},
		//计算总数量
		calculatePcs: function() {
			var sumPcs=Number(0);
			if(this.form.transportationPacksList!=undefined&&this.form.transportationPacksList!=""&&this.form.transportationPacksList.length>0){
				for(var i=0;i<this.form.transportationPacksList.length;i++){
					var packagePcs = this.form.transportationPacksList[i].packagePcs;
					sumPcs += Number(packagePcs);
				}
			}
			this.form.totalNumber = sumPcs;
			this.calculateVolum();
			this.calculateWht();
		},
		//计算总重量
		calculateWht: function() {
			var totalWeight=Number(0);
			if(this.form.transportationPacksList!=undefined&&this.form.transportationPacksList!=""&&this.form.transportationPacksList.length>0){
				for(var i=0;i<this.form.transportationPacksList.length;i++){
					var weightperItem = this.form.transportationPacksList[i].weightperItem;
					var packagePcs = this.form.transportationPacksList[i].packagePcs;
					if(weightperItem && packagePcs){
						totalWeight += Number(weightperItem * packagePcs);
					}
				}
			}
			this.form.totalWeight = totalWeight.toFixed(2);
		},
		//表格行添加调用方法
		//表格行删除调用方法
		insertCargosItemRows: function() {
			var newItem = {};
			for(var key in this.form.transportationCargosList[0]) {
				newItem[key] = "";
			}
			this.form.transportationCargosList.push(newItem);
		},
		deleteCargosItemRows: function(rowId) {
      if(this.form.transportationCargosList.length > 1) {
        this.form.transportationCargosList.splice(rowId, 1);
      }else {
        $.alert("At least one complete record in “Cargo Description” is needed 至少需要填写一条完整的货物信息");
      }
		},
		insertPackItemRows: function() {
			var newItem = {};
			for(var key in this.form.transportationPacksList[0]) {
				newItem[key] = "";
			}
			this.form.transportationPacksList.push(newItem);
		},
		deletePackItemRows: function(rowId) {
      if(this.form.transportationPacksList.length > 1) {
        this.form.transportationPacksList.splice(rowId, 1);
      }else {
        $.alert("At least one complete record in “Other Cargo Info.” is needed 至少需要填写一条完整的其他货物信息");
      }
		},
		checkPackageDone(){
			this.form.makeSurePackageDone = this.makeSurePackageDone[0];
		}
	},
	data() {
		//返回的数据对象
		var dm = {};
		//判断是创建还是获取
		var id = this.$route.params.id || this.$route.query.id;
		if (id) {
		  var url = "/form/TransportationApplication/get/" + id;
		} else {
		  var url = "/form/TransportationApplication/create/";
		}
		if(this.GL){
			this.GL.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}else{
			global_.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}
		if(!dm.form.makeSurePackageDone) {
			dm.makeSurePackageDone = [];
		} else{
			dm.makeSurePackageDone = [dm.form.makeSurePackageDone];
		}
		if((dm.form.status == 1 && ((this.$route.query.taskKey != null && (this.$route.query.taskKey != 'directiveSupervisor')) || !this.$route.query.taskKey && this.$route.query.processInstanceId!= null && dm.form.tlVerified != null))|| dm.form.status == 0) {
			dm.verifiedShow = true;
		}else{
			dm.verifiedShow = false;
		}
		//在选染页面之后拿去后台传过来的值做缓存
		dm.onbehalf = false;

		dm.tempcreatorUserId = dm.form.creatorUserId;
		dm.tempapplicantUserId = dm.form.applicantUserId;
		dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
		dm.tempcreatorName = dm.form.creatorName;
		dm.tempcreatorPhoneNum = dm.form.telephone;
		dm.tempcreatorDept = dm.form.creatorDept;
		dm.tempdirectSupervisor = dm.form.supervisor;
		dm.tempbuHead = dm.form.buHead;
		dm.tempcostCenter = dm.form.costCenter;
		dm.tempcreatorDivision = dm.form.creatorDivision;
		dm.showDpt = true;
		dm.showArr = true;
		dm.generateDepartureStart = new Date();
		dm.titleTips = "第1类 爆炸品(explosives)\n第2类 压缩气体和液化气体 (compressed gases and liquefied gases)\n第3类 易燃液体 (flammable liquids)\n第4类 易燃固体、自然物品和遇湿易燃物品(flammable solids substances liable to spontaneous combustion and substances emitting flammable gases when wet)\n第5类 氧化剂和有机过氧化物(oxidizing substances and organic peroxides)\n第6类 毒害品和感染性物品(poisons and infectious substances)\n第7类 放射性物品(radioactive substances)\n第8类 腐蚀品(corrosives)\n第9类 杂类 (miscellaneous dangerous substances)\n常见危险品，油脂类/磁性物质/电池/压力容器等， usual DG material: oil/magnet/battery/pressure device…";
		return dm;
	},
	watch: {
		"form.urgentShipment":{
			handler(curVal,oldVal){
				if(this.form.urgentShipment == 'No') {
					var today = this.DT.getCurrentDay();
					if(today == this.form.departureTimeString) {
						this.form.departureTimeString = "--Please Select--";
						$.alert("Departure date should not be today if it is not urgent shipment. Please check! 非紧急发货时发货日期不能为当天。 请检查！");
						return false;
					}
					var date = new Date();
					var newDate = date.getDate() + 1;
					date.setDate(newDate);
					this.generateDepartureStart = date;
					this.showDpt = false;
          var date = new Date(this.form.departureTimeString);
          var newDate = date.getDate()+7;
          date.setDate(newDate);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if(month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if(strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          this.form.arrivalDeadlineString = year + "-" + month + "-" + strDate;
          this.showArr = false;
					this.$nextTick(() => {
						this.showDpt = true;
						this.showArr = true;
					});
				} else {
					this.generateDepartureStart = new Date();
					this.showDpt = false;
          var date = new Date(this.form.departureTimeString);
          var newDate = date.getDate();
          date.setDate(newDate);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if(month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if(strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          this.form.arrivalDeadlineString = year + "-" + month + "-" + strDate;
          this.showArr = false;
					this.$nextTick(() => {
						this.showDpt = true;
            this.showArr = true;
					});
				}
			},
			deep:true
		},	
		"form.departureTimeString":{
			handler(curVal,oldVal){
				var today = this.DT.getCurrentDay();
				if(this.form.departureTimeString=="NaN-NaN-NaN"){
					$.alert("The Departure Date format error. 发货日期格式错误。");
					return;
				}else if(this.form.departureTimeString && this.form.departureTimeString != "--Please Select--" && today > this.form.departureTimeString) {
					$.alert("Departure Date should be later than Today. Please check! 发货日期不能为过去时间。 请检查！");
					return false;
				}else if(this.form.urgentShipment == 'No' && today == this.form.departureTimeString) {
					this.form.departureTimeString = this.tempDepartureTimeString;
					$.alert("Departure date should not be today if it is not urgent shipment. Please check! 非紧急发货时发货日期不能为当天。 请检查！");
					return false;
				}
				this.showArr = false;//console.log(this.form.departureTimeString);
				if(this.form.departureTimeString && this.form.departureTimeString != "NaN-NaN-NaN" && this.form.departureTimeString != "--Please Select--") {
					var date = new Date(this.form.departureTimeString);
					var newDate;
					if(this.form.urgentShipment == 'Yes'){
            newDate = date.getDate();
          }else{
            newDate = date.getDate() + 7;
          }
					date.setDate(newDate);
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var strDate = date.getDate();
					if(month >= 1 && month <= 9) {
						month = "0" + month;
					}
					if(strDate >= 0 && strDate <= 9) {
						strDate = "0" + strDate;
					}
					this.form.arrivalDeadlineString = year + "-" + month + "-" + strDate;
				}
				this.$nextTick(() => {
					this.showArr = true;
				});
			},
			deep:true
		},
		"form.arrivalDeadlineString":{
			handler(curVal,oldVal){
				var today = this.DT.getCurrentDay();
				if(this.form.arrivalDeadlineString=="NaN-NaN-NaN"){
					$.alert("The Arrival Deadline format error. 最迟到货日期格式错误。");
					return;
				} else if(this.form.arrivalDeadlineString && this.form.arrivalDeadlineString != '--Please Select--' && today > this.form.arrivalDeadlineString) {
					$.alert("Arrival deadline date should be later than Today. Please check! 最迟到货日期不能为过去时间。 请检查！");
					return false;
				}
			},
			deep:true
		}
	},
	//在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
	mounted() {
		//折叠收缩
		$('body').on('click', '#minusplusbtn', function() {
			if($("#minusplusbtn").hasClass("collapsed")) {
				$("#minusplusi").removeClass("fa-plus");
				$("#minusplusi").addClass("fa-minus");
			} else {
				$("#minusplusi").removeClass("fa-minus");
				$("#minusplusi").addClass("fa-plus");

			};
		});
		this.$root.eventHub.$off('updateFormData');
		this.$root.eventHub.$on('updateFormData', (form)=>{
			this.form = form;
		});
		this.tempDepartureTimeString = this.form.departureTimeString;
  },
  computed: {
	generateArrivalDeadlineStart: {
      get: function() {
		if(this.form.departureTimeString && this.form.departureTimeString != "NaN-NaN-NaN" && this.form.departureTimeString != "--Please Select--") {
			var date = new Date(this.form.departureTimeString);
			var newDate ;
      if(this.form.urgentShipment == 'Yes'){
        newDate = date.getDate();
      }else{
        newDate = date.getDate() + 7;
      }
			date.setDate(newDate);
			return date;
		} else {
			return new Date();
		}
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
	isAir: {
		get: function() {
			if(this.form.transportWished == 'Air') {
				return true;
			} else {
				return false;
			}
		}
	},
	isOtherMode: {
		get: function() {
			if(this.form.transportWished && this.form.transportWished != 'Air') {
				return true;
			} else {
				return false;
			}
		}
	},
	showDomestic: {
		get: function() {
			if(this.form.transType == 'D') {
				return true;
			} else {
				return false;
			}
		}
	},
	showIntel: {
		get: function() {
			if(this.form.transType == 'I') {
				return true;
			} else {
				return false;
			}
		}
	},
	readonlyTLVerified: {
      // 动态计算readonly的值
      get: function() {
		var uid = localStorage.getItem("uid");
		// 是不是审批者自己的单子
		var selfFlag = (this.form.applicantUserId == uid && this.form.byDeputy);
		var processTaskKey = this.$route.query.taskKey;
		if(!selfFlag && processTaskKey != null && processTaskKey == 'TLResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
			return false;
		}else{
			return true;
		}
	  }
	},
	showTLVerified: {
      // 动态计算readonly的值
      get: function() {
		var processTaskKey = this.$route.query.taskKey;
		if(processTaskKey != null && processTaskKey == 'TLResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
			return false;
		}else{
			return true;
		}
	  }
	},
	selfApprove:{
		// 动态计算readonly的值
		get:function() {
			var uid = localStorage.getItem("uid");
			// 是不是审批者自己的单子
			var selfFlag = (this.form.applicantUserId == uid && this.form.byDeputy);
			return selfFlag;
		}
	},
    readonly: {
      // 动态计算readonly的值
      get: function() {
        return ( //true ||
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("edit") == -1) ||
          (this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
      }
    },
    ckeckInApproveFlow:{
      get: function() {
        return (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1);
      }
    },
    applicationTime: {
      get: function() {
        if(this.form.createDate == null){
          return "";
        }
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      }
    }
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
.form-group-mar-0 .form-group {
	margin-bottom:0px;
}
</style>

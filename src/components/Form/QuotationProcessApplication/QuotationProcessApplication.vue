<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Quotation Request 报价</h1>
      <ol class="breadcrumb">
        <li><a >1.Applicant</a></li>
        <li><a >2.Taed Team</a></li>
        <li><a >3.Packaging Cost Input</a></li>
				<li><a >4.Transportation Cost Input</a></li>
        <li><a >5.Controlling</a></li>
				<li><a >6.CFC Internal Check</a></li>
        <li><a >7.Head of CFC</a></li>
        <li><a >8.GP</a></li>
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
          <h3 class="box-title">Applicant Info.&nbsp;申请人信息</h3>
        		<label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" v-model="this.onbehalf" > <strong>On Behalf </strong></label>
						<div class="box-tools pull-right">
							<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero">
								<i class="fa fa-plus" id="minusplusi"></i>
							</button>
						</div>
				 </div>
        <form role="form">
          <input type="hidden" v-model="form.id" name="id" id="id">
          <input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
          <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
          <div class="box-body">
            <div class="row">
							  <!--不选中的时候显示-->
             	<form-group v-if="!onbehalf" col="md-3" type="input"  v-model="form.staffCode" name="staffCode" readonly="readonly" label="QuotationProcessApplication.staffCode"></form-group>
              <!--选中的时候显示-->
              <div class="col-md-3" v-if="onbehalf">
                <div class="form-group">
                  <label for="">
                    <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                    {{$t("QuotationProcessApplication.staffCode")}} </label>
                  <div class="input-group ">
                    <input type="text" class="form-control" id="staffCode" name="staffCode" v-model="form.staffCode" readonly="readonly">
                    <span class="input-group-btn" id="selectotherperson">
                          <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    	</span>
                  </div>
                </div>
              </div>
              <form-group col="md-3" type="input" v-model="form.creatorName" name="creatorName" readonly="readonly"  label="QuotationProcessApplication.creatorName"></form-group>
              <form-group col="md-3" type="input"  v-model="form.telephone" name="telephone" readonly="readonly" label="QuotationProcessApplication.telephone"></form-group>
              <form-group col="md-3" type="input"  v-model="form.department" name="department" readonly="readonly" label="QuotationProcessApplication.department"></form-group>
            </div>
           <div class="row panel-collapse collapse " id="collapseZero">
             <form-group col="md-3" type="input"  v-model="form.supervisor" name="supervisor" readonly="readonly" label="QuotationProcessApplication.supervisor"></form-group>
             <form-group col="md-3" type="input"  v-model="form.buhead" name="buhead" readonly="readonly" label="QuotationProcessApplication.buhead"></form-group>
             <form-group col="md-3" type="input"  v-model="form.costCenter" name="costCenter" readonly="readonly" label="QuotationProcessApplication.costCenter"></form-group>
           </div>
          </div>
        </form>
      </div>
      <div class="box box-primary" >
        <div class="box-header with-border">
         <i class="fa fa-asterisk text-required-header"></i>
          <h3 class="box-title">Quotation Info. 报价信息</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class=row>
              <form-group col="md-3" type="select" other-rules="required" :readonly="readonly" v-model="form.deliveryTerms" name="deliveryTerms"  label="QuotationProcessApplication.deliveryTerms" hideRisk=true uri="/dict/listOrder?groupName=deliveryTerms" tags="false"  @change="clearOtherValue"></form-group>
              <form-group col="md-3"  v-if="form.deliveryTerms=='Others'" type="input" other-rules="required|max:300" :readonly="readonly" v-model="form.deliveryTermsOthers" name="deliveryTermsOthers" label="QuotationProcessApplication.deliveryTermsOthers"  hideRisk=true ></form-group>
						  <form-group col="md-3"  v-else type="input" other-rules="max:300" readonly="readonly" v-model="form.deliveryTermsOthers" name="deliveryTermsOthers"   hideRisk=true label="QuotationProcessApplication.deliveryTermsOthers" ></form-group>
							<form-group col="md-3"  type="select" other-rules="required" :readonly="readonly" v-model="form.customer" name="customer"  label="QuotationProcessApplication.customer" hideRisk=true uri="/dict/listOrder?groupName=customer" tags="false" @change="clearOtherValue"></form-group>
              <form-group col="md-3"  v-if="form.customer=='Others'" type="input" other-rules="required|max:300" :readonly="readonly" v-model="form.customerOthers" name="customerOthers" label="QuotationProcessApplication.customerOthers"  hideRisk=true ></form-group>
              <form-group col="md-3"  v-else type="input" readonly="readonly" v-model="form.customerOthers" name="customerOthers" hideRisk=true label="QuotationProcessApplication.customerOthers"></form-group>
						</div>
						  <div class=row>
									<form-group col="md-3" type="select" other-rules="required" :readonly="readonly" v-model="form.destination" name="destination"  label="QuotationProcessApplication.destination" hideRisk=true uri="/dict/list?groupName=destination" tags="false" ></form-group>
									<form-group col="md-3" type="select" other-rules="required" :readonly="readonly" v-model="form.project" name="project"  label="QuotationProcessApplication.project" hideRisk=true uri="/dict/listOrder?groupName=project" tags="false"  @change="clearOtherValue"></form-group>
									<form-group col="md-3" type="input" v-if="form.project=='Others'"  other-rules="required|max:300" :readonly="readonly" label="QuotationProcessApplication.projectOthers" v-model="form.projectOthers" name="projectOthers"   hideRisk=true haslable=true ></form-group>
									<form-group col="md-3" type="input" v-else readonly="readonly" v-model="form.projectOthers" name="projectOthers"  label="QuotationProcessApplication.projectOthers" hideRisk=true haslable=true ></form-group>
									<form-group col="md-3" type="select" other-rules="required" :readonly="readonly" v-model="form.priorityStatus" name="priorityStatus"  label="QuotationProcessApplication.priorityStatus" hideRisk=true uri="/dict/list?groupName=priorityStatus" tags="false" ></form-group>
							</div>
		      <div class=row>
						  <form-group col="md-3" type="input" other-rules="required|max:75" :readonly="readonly" v-model="form.customerRequestor" name="customerRequestor"  label="QuotationProcessApplication.customerRequestor" hideRisk=true></form-group>
              <form-group col="md-3" type="input" id="customerEmail" other-rules="required|max:75" :readonly="readonly" v-model="form.customerEmail" name="customerEmail"  label="QuotationProcessApplication.customerEmail" hideRisk=true></form-group>
              <form-group col="md-3" type="input" other-rules="required|max:75" :readonly="readonly" v-model="form.customerTelephone" name="customerTelephone"  label="QuotationProcessApplication.customerTelephone" hideRisk=true></form-group>
		       </div>
            <div class="row">
              <form-group col="md-12" type="textarea1" other-rules="required|max:3000" :readonly="readonly" v-model="form.deliveryAddress" name="deliveryAddress"  label="QuotationProcessApplication.deliveryAddress" hideRisk=true limit="3000"></form-group>
            </div>
            <div class="row">
            	<div class="col-md-12">
								<div class="form-group"><br />
									<label >{{$t("QuotationProcessApplication.additionalComment")}}</label>
									<textarea :readonly="readonly"  v-validate="'required'" other-rules="max:3000" @blur="additionalCommentCheck('additionalComment',3000,'additional comment','补充注释')" :class="{'form-control':true,'input':true,'is-danger': errors.has('additionalComment')}" id="additionalComment" rows="3" name ="additionalComment" v-model="form.additionalComment"></textarea>
									<p>{{$t("detailsComment")}}</p>
								</div>
							</div>
						
						</div>

          </div>
        </form>
      </div>
      <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Quotation List 报价列表</h3>
		<label v-show="!readonly" class="btn btn-primary btn-xs" style='margin-top: 1px;margin-left: 5px;float: right;font-size: 14px;' for="xFile2">Upload</label>
        <input v-show="!readonly" style='display: inline-block; position: absolute; clip: rect(0px, 0px, 0px, 0px);' id="xFile2"  type="file"  @change="importQuotation" >
        <a v-show="!readonly" style='display: inline-block; margin-left: 15px;margin-top: 5px;float: right;'  target='_blank' :href="GL.getURL('/QuotationProcessApplication/downloadTemplate')"><i class='fa fa-download'></i>&nbsp; Batch Upload Template  批量上传模板</a>
		  
		<label v-show="viewForTaedTeam" class="btn btn-primary btn-xs" style='margin-top: 1px;margin-left: 15px;float: right;font-size: 14px;' for="xFile3">Upload</label>
        <input v-show="viewForTaedTeam" style='display: inline-block; position: absolute; clip: rect(0px, 0px, 0px, 0px);' id="xFile3"  type="file"  @change="importForTaedTeam" >
        <a v-show="viewForTaedTeam" style='display: inline-block; margin-left: 15px;margin-top: 5px;float: right;'  target='_blank' :href="GL.getURL('/QuotationProcessApplication/downloadForApprove/' + this.form.id + '?type=ForTaedTeam')"><i class='fa fa-download'></i>&nbsp; Download List  下载列表</a>
		
		<label v-show="viewForControlling" class="btn btn-primary btn-xs" style='margin-top: 1px;margin-left: 15px;float: right;font-size: 14px;' for="xFile4">Upload</label>
        <input v-show="viewForControlling" style='display: inline-block; position: absolute; clip: rect(0px, 0px, 0px, 0px);' id="xFile4"  type="file"  @change="importForControlling" >
        <a v-show="viewForControlling" style='display: inline-block; margin-left: 15px;margin-top: 5px;float: right;'  target='_blank' :href="GL.getURL('/QuotationProcessApplication/downloadForApprove/' + this.form.id + '?type=ForControlling')"><i class='fa fa-download'></i>&nbsp; Download List  下载列表</a>
		  
         </div>
        <form role="form">
          <div class="box-body" id="quotationProcessApplication">
            <div class="row">
              <div class="col-md-12" >

                <table class="table table-bordered mar-bot-0" width="100%" height="15px" id="extendNon">
                  <tbody>
                  <tr>
                    <th class="text-center" width="10%"><i class="fa fa-asterisk text-required-header"></i>Part No.<br />零件编号</th>
                    <th class="text-center" width="10%"><i class="fa fa-asterisk text-required-header"></i>Quantity<br />数量</th>
                    <th class="text-center" width="20%">Part Description<br />零件描述</th>
                    <th class="text-center" width="27%">Part Status<br />零件状态</th>
                    <th class="text-center" width="10%">Part Weight(g)<br />零件重量（克）</th>
                    <th class="text-center" width="10%"><i class="fa fa-asterisk text-required-header"></i>Unit Price<br />单价</th>
                    <th class="text-center" width="10%"><i class="fa fa-asterisk text-required-header"></i>Total Price<br />总价</th>
                    <th  width="3%" v-if="!readonly" class="text-center" >
                      <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.quotationList" style="height: 15px;">
                    <td>
                      <input type="hidden" class="form-control" id="" v-model="entry.id">                    
                      <form-group type="input" other-rules="required" haslable="false" :readonly="readonly"  :name="'partNo'+(index+1)" :id="'partNo'+index" v-model="entry.partNo"  ></form-group>				
									  </td>
                    <td>
                     <form-group type="input" other-rules="required" @change="inputQuantity(index)" haslable="false" :readonly="readonly" :name="'quantity'+(index+1)"  v-model="entry.quantity" :id="'quantity'+index"></form-group>				
										</td>
                    <td>
											<div class="form-group">
												<textarea style="height: 34px;" v-if="!readonly" :class="{'form-control':true,'input':true,'price':true}"  rows="1" :name ="'partDescription'+index" v-model="entry.partDescription" :id="'partDescription'+index" :index="index"  ></textarea>
												<textarea style="height: 34px;" v-validate="'required'" v-else-if="viewForTaedTeam" :class="{'form-control':true,'input':true,'is-danger': errors.has('partDescription'+index)}"  rows="1" :name ="'partDescription'+index" v-model="entry.partDescription" :id="'partDescription'+index" :index="index" ></textarea>
												<textarea style="height: 34px;" v-else readonly="readonly" :class="{'form-control':true,'input':true,'price':true}" rows="1" :name ="'partDescription'+index" v-model="entry.partDescription"   :id="'partDescription'+index" :index="index" ></textarea>
											</div>
										</td>
                    <td >
											<form-group type="select" style="width: 50%;float: left;" v-if="!readonly" uri="/dict/listOrder?groupName=partStatus" haslable="false" :name="'partStatus'+(index+1)" v-model="entry.partStatus" :id="'partStatus'+index" placeholder="Filled by taed team" :index="index" @change="clearTableOtherValue(index)"></form-group>
                      <form-group type="select" style="width: 50%;float: left;"  v-validate="'required'" v-else-if="viewForTaedTeam" uri="/dict/listOrder?groupName=partStatus" haslable="false" :name="'partStatus'+(index+1)" v-model="entry.partStatus" :id="'partStatus'+index" placeholder="Filled by taed team" :index="index" @change="clearTableOtherValue(index)"></form-group>
                      <form-group type="input" style="width: 50%;float: left" readonly="readonly" v-else haslable="false" :name="'partStatus'+(index+1)" v-model="entry.partStatus" placeholder="Filled by taed team"  :id="'partStatus'+index" :index="index"></form-group>	
                   		<form-group  type="input3" style="width: 50%;float: left;padding-left: 3px;" v-if="!readonly && entry.partStatus=='Others'"  other-rules="max:300" v-model="entry.partStatusOthers" :name="'partStatusOthers'+(index+1)"  label="QuotationProcessApplication.partStatusOthers" hideRisk=true haslable=false :id="'partStatusOthers'+index" :index="index" placeholder="Please add details ...." :inputTitle="getTitleDesc(index)" ></form-group>
											<form-group  type="input3" style="width: 50%;float: left;padding-left: 3px;" v-else-if="viewForTaedTeam && entry.partStatus=='Others'"  other-rules="required|max:300" v-model="entry.partStatusOthers" :name="'partStatusOthers'+(index+1)"  label="QuotationProcessApplication.partStatusOthers" hideRisk=true haslable=false :id="'partStatusOthers'+index" :index="index" placeholder="Please add details ...." :inputTitle="getTitleDesc(index)" ></form-group>
								      <form-group  type="input3"  style="width: 50%;float: left;padding-left: 3px;" v-else  readonly="readonly" v-model="entry.partStatusOthers" :name="'partStatusOthers'+(index+1)"  label="QuotationProcessApplication.partStatusOthers" hideRisk=true haslable=false :id="'partStatusOthers'+index" :index="index" placeholder="Please add details ...." :inputTitle="getTitleDesc(index)"></form-group>
									  </td>
                    <td>
											<form-group type="input3" :readonly="!viewForTaedTeam" @change="inputWeight(index)" haslable="false"  name="partWeight" v-model="entry.partWeight" placeholder="Filled by **" :inputTitle="getInputTitleDesc(entry.partWeight,'Filled by taed team')"></form-group>				
										</td>
                    <td>
											<form-group type="input3" v-if="viewForFinancialControllingPrice"  other-rules="required" @change="inputPrice(index)" haslable="false" :readonly="!viewForFinancialControlling"  :name="'priceInput'+index"  v-model="entry.priceInput" :id="'priceInput'+index" :index="index"  placeholder="Filled by **" :inputTitle="getInputTitleDesc(entry.priceInput,'Filled by controlling')"></form-group>				
											<form-group type="input3" readonly="readonly" v-else haslable="false"  :name="'priceInput'+index"  v-model="entry.priceInput" :id="'priceInput'+index" :index="index" placeholder="Filled by **" :inputTitle="getInputTitleDesc(entry.priceInput,'Filled by controlling')"></form-group>				
										</td>
                    <td>
											<form-group type="input3" readonly="readonly" haslable="false" :name="'totalPrice'+index"  v-model="entry.totalPrice" :id="'totalPrice'+index" :index="index"  placeholder="Filled by **" :inputTitle="getInputTitleDesc(entry.totalPrice,'Filled by controlling')"></form-group>				
										</td>
                    <td v-if="!readonly" class="text-center" style="vertical-align: middle;">
                      <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>
                  </tr>
                  </tbody>
                </table>
				<div class="row">
					<!-- 总重量 -->
					<form-group col="md-3" type="input" v-model="form.totalWeight" name="totalWeight" readonly="true" label="QuotationProcessApplication.totalWeight" ></form-group>
					<!-- 总价 -->
					<form-group col="md-3" type="input" v-model="form.totalPrice" name="totalPrice" readonly="true" label="QuotationProcessApplication.totalPrice" ></form-group>
				</div>
              </div>
            </div>
            <br/>
					 <div class="row">
						 	<div class="col-md-3">
								<div class="form-group">
									<label for="">&nbsp;</label>
									<div class="form-group" >
										<input :disabled="readonlyDelivery" type="checkbox" v-model="lotRegular_delivery" @change="checkLotRegular" name="lotRegular_delivery" id="lotRegular_delivery" value="checked">
										<label>	Regular Delivery 常规运送	</label>								
									</div>
								</div>
							</div>
						</div>
            <div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label for="">Lot Information 批次信息</label>
									<div class="form-group" >
										<input style="width: 70%" v-if="this.form.lotRegular_delivery" readonly="true" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('lotInformation') }" name="lotInformation" id="lotInformation" v-model="form.lotInformation" value="" >
										<input style="width: 70%" v-else :readonly="readonlyDelivery" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('lotInformation') }" name="lotInformation" id="lotInformation" v-model="form.lotInformation" value="" >
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;Lot(s)</div>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">Lot Size 批次件数</label>
									<div class="form-group">
										<input style="width: 70%" v-if="this.form.lotRegular_delivery" readonly="true" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('size') }" name="size" id="size" v-model="form.size" value="" >
										<input style="width: 70%" v-else :readonly="readonlyDelivery" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('size') }" name="size" id="size" v-model="form.size" value="" >
										<div class="pull-left" style="height:34px;width:30%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;Piece(s)/Lot</div>
									</div>
								</div>
							</div>
            </div>
          </div>
        </form>
      </div>

			<div class="box box-primary" v-if="viewForPackagingCost"><!---->
        <div class="box-header with-border">
          <h3 class="box-title">Packaging Cost Info. 包装成本信息</h3>
        </div>
        <form role="form">
          <div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<i class="fa fa-asterisk text-required-header"></i>
									<label for="">Packaging Cost 包装成本</label>
									<div class="form-group" >
										<input style="width: 80%" :readonly="packagingCostDisabled" @change="inputPackagingCost" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('packagingCost') }" name="packagingCost" id="packagingCost" v-validate="'required'" v-model="form.packagingCost" placeholder="" value="" >
										<div class="pull-left" style="height:34px;width:20%;position:relative;line-height: 32px;border:1px solid #d2d6de; text-align:center;">&nbsp;RMB</div>
									</div>
								</div>
							</div>
							<form-group col="md-3" other-rules="required" type="input" :readonly="packagingCostDisabled" v-model="form.packagingSize" name="packagingSize"  label="QuotationProcessApplication.packagingSize"></form-group>
							<div class="col-md-12">
								<div class="form-group">
									<label for="">Packaging Cost Details 包装成本明细</label>（Please input packaging weight, etc. 请填写包装重量等）
									<textarea :readonly="packagingCostDisabled" @blur="packagingCostDetailsCheck" :class="{'form-control':true,'input':true,'price':true}" id="packagingCostDetails" rows="3" name ="packagingCostDetails" v-model="form.packagingCostDetails"  ></textarea>
									<p>{{$t("detailsComment")}}</p>
								</div>
							</div>
						</div>
					</div>
        </form>
      </div>

			<div class="box box-primary" v-if="viewForTransportationCost"><!---->
        <div class="box-header with-border">
          <h3 class="box-title">Transportation Cost Info. 运输成本信息</h3>
        </div>
        <form role="form">
          <div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<i class="fa fa-asterisk text-required-header"></i>
									<label for="">Transportation Cost 运输成本</label>
									<div class="form-group" >
										<input style="width: 80%" :readonly="transportationCostDisabled" @change="inputTransportationCost" type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('transportationCost') }" name="transportationCost" id="transportationCost" v-validate="'required'" v-model="form.transportationCost" placeholder="" value="" >
										<div class="pull-left" style="height:34px;width:20%;position:relative;line-height: 32px;border:1px solid #d2d6de;text-align:center; ">&nbsp;RMB</div>
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group"><br />
									<label for="">Transportation Cost Details 运输成本明细</label>
									<textarea :readonly="transportationCostDisabled" @blur="transportationCostDetailsCheck" :class="{'form-control':true,'input':true,'price':true}" id="transportationCostDetails" rows="3" name ="transportationCostDetails" v-model="form.transportationCostDetails"  ></textarea>
									<p>{{$t("detailsComment")}}</p>
								</div>
							</div>
           	</div>
					</div>
        </form>
      </div>
			
			<div class="box box-primary" v-if="viewForFinancialControlling || viewForCaculationProcess">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-required-header"></i>
          <h3 class="box-title">Additional Information 附加信息</h3>
        </div>
        <form role="form">
          <div class="box-body">
            <div class="row" v-if="viewForFinancialControlling">
              <form-group col="md-3" :readonly="readOnlyForFinancialControlling"  type="select" other-rules="required"  v-model="form.currency" name="currency"  label="QuotationProcessApplication.currency" hideRisk=true uri="/dict/list?groupName=Currency" tags="false" ></form-group>
            </div>
						<div class="row" v-if="viewForCaculationProcess">
							 <div class="col-md-12">
								<div class="form-group"><br />
									<label >{{$t("QuotationProcessApplication.caculationProcess")}}</label>
									<textarea :readonly="readOnlyForFinancialControlling"  v-validate="'required'" other-rules="max:3000" @blur="caculationProcessCheck('caculationProcess',3000,'calculation process','计算过程')" :class="{'form-control':true,'input':true,'is-danger': errors.has('caculationProcess')}" id="caculationProcess" rows="3" name ="caculationProcess" v-model="form.caculationProcess"></textarea>
									<p>{{$t("detailsComment")}}</p>
								</div>
							</div>
              <!-- <form-group col="md-12" :readonly="readOnlyForFinancialControlling"  type="textarea" other-rules="required|max:300"  v-model="form.caculationProcess" name="caculationProcess"  label="QuotationProcessApplication.caculationProcess" hideRisk=true  haslable=true></form-group> -->
            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary" v-if="viewForGP">
        <div class="box-header with-border">
          <h3 class="box-title"> Price Input in APON. 输入价格</h3>
          <!--<label>(please upload the responsibility certificate and/or insurance form 请上传事故责任认定书和/或保险公司出险单)</label>-->
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <button type="button" class="btn btn-primary mar-left-5" @click="printGP();"  style="margin-left: 5px;"><i class="fa fa-fw fa-external-link"></i> Export</button><br/><br/>
                <upload5 :form="form" uri="/QuotationProcessApplication/save" multi="false" v-model="form.attachmentIds" buttonText="Upload " :attachments="form.attachments"  fileSizeLimit="5MB" :readonly="!editForGP" ></upload5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="checkbox mar-bot-20" v-if="!readonly">
        <label>
					<span class="help is-danger" v-show="errors.has('terms')">
						{{$t("checkPolicyNotice")}}
					</span>
					<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
					<a target="_blank" href="https://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
					当提交此申请时，我已经理解并承诺遵守
					<a target="_blank" href="https://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
				</label>
			</div>


	
		<comment v-if="processTaskId !=null && form.status != 9 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
		<Confirmwithreject v-if="ckeckInApproveFlow" :form="form" :validator="this.$validator" :lableName="lableName" :rejectLableName="rejectLableName" uri="/QuotationProcessApplication/save" v-on:beforeapprovel="beforesubmit" ></Confirmwithreject>
		<router-view v-else :form="form" entityId="QuotationProcessApplication" vclass="btn-left" uri="/form/QuotationProcessApplication/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
		<comment-list v-if="form.processInstanceId !=null"></comment-list>

    </section>
  </div>
</template>



<script>

import global_ from "./../../../components/Common/Util/Global.vue";
import daterangepicker from "bootstrap-daterangepicker"
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
	name: "QuotationProcessApplication",
	methods: {
		beforesubmit: function() { 
			//Signed off offer should be uploaded.
			if((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('GP') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))) {
				if(this.form.attachmentIds) {
					this.form.submitstatus=true;
				} else {
					$.alert('Signed off offer should be uploaded. 请上传签字的报价单。');
					this.form.submitstatus=false;
					return;
				}
			}
		},
		printGP: function() {
		  var url = Config.getBaseURL() + "/QuotationProcessApplication/printGP/" + this.form.id + "?token=" + Config.getToken();
		  var showSelectWin = window.open(url);
		  showSelectWin.focus();

		},
   clearOtherValue:function(){
		  if(this.form.deliveryTerms !="Others"){
					  this.form.deliveryTermsOthers ="";
				}
        if(this.form.customer !="Others"){
					  this.form.customerOthers ="";
				}
			 if(this.form.project !="Others"){
					  this.form.projectOthers ="";
				}
	 },
		onbehalfclick: function() {
			var temp = $("#onbehalf").is(':checked');
			this.onbehalf = temp;
			if(this.onbehalfFlag){
							if(!temp) {
								var userInfoId = localStorage.getItem("userInfoId");
								if(userInfoId == null || userInfoId ==""){
											var url = Config.getBaseURL()+ "/auth/getUserInfo";
											var me = this;
												$.ajax({
														url: url,
														contentType: "application/json",
														data: { "uid": this.form.createUserId},
														async: false,
														type: 'get',
														dataType: 'json',
														success: function(data) {
																	me.form.applicantUserId = data.id;
																	me.form.staffCode = data.staffCode;
																	me.form.creatorName = data.printENName;
																	me.form.telephone = data.telephone;
																	var tempdep = data.department;
																	if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
																		tempdep = data.division;
																	}
																	me.form.department = tempdep;
																	me.form.email = data.email;
																	me.form.costCenter = data.costCenterCode;
																	me.form.mobile = data.mobile;
																	me.form.supervisor = data.supervisor;
																	me.form.buhead = data.buHead;
																	localStorage.setItem("userInfoId",data.id);
																	localStorage.setItem("staffCode",data.staffCode);
																	localStorage.setItem("printENName",data.printENName);
																	localStorage.setItem("telephone",data.telephone);
																	localStorage.setItem("tempdep",data.tempdep);
																	localStorage.setItem("email",data.email);
																	localStorage.setItem("costCenterCode",data.costCenterCode);
																	localStorage.setItem("mobile",data.mobile);
																	localStorage.setItem("supervisor",data.supervisor);
																	localStorage.setItem("buHead",data.buHead);
														},
														error: function(msg) {
																	
														}
													})
								}else{
									this.form.applicantUserId = localStorage.getItem("userInfoId");
									this.form.staffCode = localStorage.getItem("staffCode");
									this.form.creatorName = localStorage.getItem("printENName");
									this.form.telephone = localStorage.getItem("telephone");
									this.form.department = localStorage.getItem("tempdep");
									this.form.email = localStorage.getItem("email");
									this.form.costCenter = localStorage.getItem("costCenterCode");
									this.form.mobile = localStorage.getItem("mobile");
								  this.form.supervisor = localStorage.getItem("supervisor");
									this.form.buhead = localStorage.getItem("buHead");
								}
					
					}else{
	           this.form.applicantUserId = this.tempapplicantUserId;
							this.form.staffCode = this.tempcreatorStaffcode;
							this.form.creatorName = this.tempcreatorName;
							this.form.telephone = this.tempcreatorPhoneNum;
							this.form.department = this.tempcreatorDept;
							this.form.email = this.tempemail;
							this.form.costCenter = this.tempcostCenter;
							this.form.mobile = this.tempmobile;
							this.form.supervisor = this.tempSupervisor;
							this.form.buhead = this.tempBuHeader;
					}
				}else{
					if(!temp){
							this.form.applicantUserId = this.tempapplicantUserId;
							this.form.staffCode = this.tempcreatorStaffcode;
							this.form.creatorName = this.tempcreatorName;
							this.form.telephone = this.tempcreatorPhoneNum;
							this.form.department = this.tempcreatorDept;
							this.form.email = this.tempemail;
							this.form.costCenter = this.tempcostCenter;
							this.form.mobile = this.tempmobile;
							this.form.supervisor = this.tempSupervisor;
							this.form.buhead = this.tempBuHeader;
				}
			}
		}, 
    doAfterSelectOtherPerson: function(data) {
			$('#selectotherperson').attr("class", "input-group-btn");
			//console.log(data);

			this.form.applicantUserId = data.id;

			this.form.staffCode = data.staffCode;
			this.form.creatorName = data.printENName;
			this.form.telephone = data.telephone;
			var tempdep = data.department;
			if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
				tempdep = data.division;
			}
			this.form.costCenter = data.costCenterCode;
			this.form.department = tempdep;
			this.form.mobile = data.mobile;
			this.form.email = data.email;
			this.form.supervisor = data.supervisor;
			this.form.buhead = data.buHead;
		},
		//无效
		checkOthersDesc:function(){
			var obj=$("#othersDesc");
        	var reg =/^[0-9]*$/;
			if($(obj).attr("readonly")) {
					//只读不做操作
			} else {
					if($(obj).val()) {
							var value=$(obj).val();
							var newvalue = value.replace(/[^\x00-\xff]/g, "**");    
							var length = newvalue.length;    

							//当填写的字节数小于设置的字节数    
							if (length * 1 <=300 * 1){    
										return;    
							}    
							var limitDate = newvalue.substr(0, 300);    
							var count = 0;    
							var limitvalue = "";    
						for (var i = 0; i < limitDate.length; i++) {    
										var flat = limitDate.substr(i, 1);    
										if (flat == "*") {    
													count++;    
										}    
						}    
						var size = 0;    
						var istar = newvalue.substr(300 * 1 - 1, 1);//校验点是否为“×”    

						//if 基点是×; 判断在基点内有×为偶数还是奇数     
						if (count % 2 == 0) {    
											//当为偶数时    
										size = count / 2 + (300 * 1 - count);    
										limitvalue = value.substr(0, size);    
						} else {    
										//当为奇数时    
										size = (count - 1) / 2 + (300 * 1 - count);    
										limitvalue = value.substr(0, size);    
						}    
					$.alert('300 Characters Max. 最多只能填写300个字节。');
				this.form.othersDesc=limitvalue;
	 				//$("#othersDesc").val(limitvalue);
				}
			}
		},

		//添加一行
		insertItineraryRows: function() {
		  var newItem = {};
		  for(var key in this.form.quotationList[0]) {
			newItem[key] = "";
		  }
		  this.form.quotationList.push(newItem);
		},
		//数量加减器：废弃
		cuts:function(key){
		  if(this.form.wpExtendDevice[0].standardDeviceList[key].deviceNum<1) return
		  this.form.wpExtendDevice[0].standardDeviceList[key].deviceNum--;
		},
		//废弃
		add:function(key){
		  //console.log(key);
		  //  var addValue=  parseInt(key);
		  this.form.wpExtendDevice[0].standardDeviceList[key].deviceNum++;
		},
		//表格行删除调用方法
		deleteItineraryRows: function(rowId) {
		  if(this.form.quotationList.length > 1) {
			var id = this.form.quotationList[rowId].id;
			if(id) {
				global_.actUtil.query("post", "/QuotationProcessApplication/deleteQuotation/"+id, "", function(data) {});
			}
			this.form.quotationList.splice(rowId, 1);
		  } else {
			$.alert("At least one complete record in Quotation List is needed. 至少需要填写一条完整的报价列表。");
		  }
		},
		//计算总价格
		calculatePrice: function() {
			var totalPrice=Number(0);
			if(this.form.quotationList!=undefined&&this.form.quotationList!=""&&this.form.quotationList.length>0){
				for(var i=0;i<this.form.quotationList.length;i++){
					var tpperItem = this.form.quotationList[i].totalPrice;
					if(tpperItem){
						tpperItem = tpperItem.toString().replace(/\,/g, '');
						totalPrice += Number(tpperItem);
					}
				}
			}
			var newtotalPrice=this.toDecimal2(totalPrice);
			newtotalPrice=this.formatCurrency(newtotalPrice);
			this.form.totalPrice = newtotalPrice;
		},
		//计算总重量
		calculateWht: function() {
			var totalWeight=Number(0);
			if(this.form.quotationList!=undefined&&this.form.quotationList!=""&&this.form.quotationList.length>0){
				for(var i=0;i<this.form.quotationList.length;i++){
					var weightperItem = this.form.quotationList[i].partWeight;
					var quantity = this.form.quotationList[i].quantity;
					if(weightperItem){
						weightperItem = weightperItem.toString().replace(/\,/g, '');
						totalWeight += (Number(weightperItem)*quantity);
					}
				}
			}
			var newtotalWeight=this.toDecimal2(totalWeight);
			newtotalWeight=this.formatCurrency(newtotalWeight);
			this.form.totalWeight = newtotalWeight;
		},
		//废弃
		calculateQuantity: function() {
			var sumQuan=Number(0);
			if(this.form.quotationList!=undefined&&this.form.quotationList!=""&&this.form.quotationList.length>0){
				for(var i=0;i<this.form.quotationList.length;i++){
					var quantity = this.form.quotationList[i].quantity;
					sumQuan += Number(quantity);
				}
			}
			this.form.totalQuantity = sumQuan;
		},
		inputQuantity: function(index) {
			var regDetail2 = new RegExp("^\\d+$");
			var quantity = this.form.quotationList[index].quantity;
			if(!this.form.totalRegular_delivery && quantity){
				if(!regDetail2.test(quantity)) {
					$.alert('Please make sure the format of quantity is right! 数量请输入正确格式！');
					this.form.quotationList[index].quantity="";
				} else{
					//this.calculateQuantity();
				}
			}
			//this.calculateWht();
		},
		//废弃
		checkTotalRegular(){
			this.form.totalRegular_delivery = this.totalRegular_delivery[0];
			if(this.form.totalRegular_delivery) {
				this.form.totalQuantity = '';
			} else {
				this.calculateQuantity();
			}
		},
		//清空Lot Information 批次信息 Lot Size 批次尺寸
		checkLotRegular(){
			this.form.lotRegular_delivery = this.lotRegular_delivery[0];
			if(this.form.lotRegular_delivery) {
				this.form.lotInformation = '';
				this.form.size = '';
			}
		},
		//强制数字保留两位小数
		toDecimal2:function(x) {
			//alert("toDecimal2="+x);
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
		},
		//初始化数字加,展示
		formatCurrency:function (num) {
			//alert("formatCurrency="+num);
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

		},
		clearTableOtherValue:function(index){
			if(this.form.quotationList[index].partStatus !="Others"){
        this.form.quotationList[index].partStatusOthers="";
			}
		},
		getTitleDesc:function(index){
			if(this.form.quotationList[index].partStatusOthers != null){
				return this.form.quotationList[index].partStatusOthers;
			}else{
				return "Please add details information if you choose 'Others'.";
			}
		},
		getInputTitleDesc:function(value,msg){
          if(value != null){
						return value;
					}else{
						return msg;
					}
		},
		inputWeight: function(index) {
			var partWeight = this.form.quotationList[index].partWeight;
			var newVal = this.toDecimal2(partWeight);
			newVal=this.formatCurrency(newVal);
			this.form.quotationList[index].partWeight=newVal;
			this.calculateWht();
		},
		//Unit Price 单价;计算Total Price 总价
		inputPrice: function(index) {
			var priceInput = this.form.quotationList[index].priceInput;
			var quantity = this.form.quotationList[index].quantity;
			var newVal = this.toDecimal2(priceInput);
			newVal=this.formatCurrency(newVal);
			this.form.quotationList[index].priceInput=newVal;
			//计算总价
			//totalPrice
			var totalPrice = priceInput*quantity;
			var newtotalPrice=this.toDecimal2(totalPrice);
			newtotalPrice=this.formatCurrency(newtotalPrice);
			this.form.quotationList[index].totalPrice=newtotalPrice;
			this.calculatePrice();
		},
		//Packaging Cost 包装成本 
		inputPackagingCost: function() {
			var packagingCost = this.form.packagingCost;
			var newVal = this.toDecimal2(packagingCost);
			newVal=this.formatCurrency(newVal);
			this.form.packagingCost=newVal;
		},
		//Transportation Cost 运输成本 
		inputTransportationCost: function() {
			var transportationCost = this.form.transportationCost;
			var newVal = this.toDecimal2(transportationCost);
			newVal=this.formatCurrency(newVal);
			this.form.transportationCost=newVal;
		},
		//Part Description 零件描述
		
		partDescriptionCheck:function(index){
      var reg = /^[0-9]*$/;
      var partDescription = this.form.quotationList[index].partDescription;
        if (partDescription) {
          var value = partDescription;
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          //alert("length="+length);
          //当填写的字节数小于设置的字节数
          if (length * 1 <= 200 * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, 200);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(200 * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (200 * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (200 * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alert("200 characters max for part description. 零件描述最多只能填写200个字节。");
          this.form.quotationList[index].partDescription = limitvalue;
        }
    },
		packagingCostDetailsCheck:function(){
			this.form.packagingCostDetails = this.CheckLimit('packagingCostDetails',3000,'packaging cost details','包装成本明细');
    },
		transportationCostDetailsCheck:function(){
      this.form.transportationCostDetails =  this.CheckLimit('transportationCostDetails',3000,'transportation cost details','运输成本明细');
		},
		additionalCommentCheck:function(id,num,enLabel,cnLabel){
			this.form.additionalComment = this.CheckLimit(id,num,enLabel,cnLabel);
		},
		caculationProcessCheck:function(id,num,enLabel,cnLabel){
			this.form.caculationProcess = this.CheckLimit(id,num,enLabel,cnLabel);
		},
		importQuotation:function(event){
			$("#loadingMask,#progressBar").show();
			let file = event.target.files[0];
			var zipFormData = new FormData();
			zipFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名

			this.$http.post(Config.getBaseURL() + "/QuotationProcessApplication/importQuotation", zipFormData,{
				headers: {"Content-Type": "multipart/form-data"}
			}).then(function (response) {
				var err = response.data.err;
				if(err) {
					$.alert(err);
				}
				var newList = response.data.list;
				if(newList.length > 0){
					var dodelete = true;
					for(var index = 0; index < this.form.quotationList.length;index++) {
						var row = this.form.quotationList[index];
						if(row.partNo || row.quantity || row.partDescription || row.partStatus || row.partStatusOthers ) {
							dodelete = false;
						}
					}
					if(dodelete) {
						this.form.quotationList = [];
					}
					for(var i=0;i<newList.length;i++){//循环获取a数组内的元素
						this.form.quotationList.push(newList[i]);
					}
				}
				$("#loadingMask,#progressBar").hide();
				$("#xFile2").val("");
			}, function (response) {
				$("#loadingMask,#progressBar").hide();
			});
		},
		importForTaedTeam:function(event){
			$("#loadingMask,#progressBar").show();
			let file = event.target.files[0];
			var zipFormData = new FormData();
			zipFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名

			this.$http.post(Config.getBaseURL() + "/QuotationProcessApplication/importForTaedTeam", zipFormData,{
				headers: {"Content-Type": "multipart/form-data"}
			}).then(function (response) {
				var err = response.data.err;
				if(err) {
					$.alert(err);
				}
				var newList = response.data.list;
				var length = newList.length < this.form.quotationList.length ? newList.length : this.form.quotationList.length;
				for(var i=0;i<length;i++){//循环获取a数组内的元素
					var newpartWeight=this.toDecimal2(newList[i].partWeight);
					newpartWeight=this.formatCurrency(newpartWeight);
					this.form.quotationList[i].partWeight = newpartWeight;
					this.form.quotationList[i].partDescription = newList[i].partDescription;
					this.form.quotationList[i].partStatus = newList[i].partStatus;
					this.form.quotationList[i].partStatusOthers = newList[i].partStatusOthers;
					
				}
				this.calculateWht();
				$("#loadingMask,#progressBar").hide();
				$("#xFile3").val("");
			}, function (response) {
				$("#loadingMask,#progressBar").hide();
			});
		},
		importForControlling:function(event){
			$("#loadingMask,#progressBar").show();
			let file = event.target.files[0];
			var zipFormData = new FormData();
			zipFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名

			this.$http.post(Config.getBaseURL() + "/QuotationProcessApplication/importForControlling", zipFormData,{
				headers: {"Content-Type": "multipart/form-data"}
			}).then(function (response) {
				var err = response.data.err;
				if(err) {
					$.alert(err);
				}
				var newList = response.data.list;
				var length = newList.length < this.form.quotationList.length ? newList.length : this.form.quotationList.length;
				for(var i=0;i<length;i++){//循环获取a数组内的元素
					var newpriceInput=this.toDecimal2(newList[i].priceInput);
					newpriceInput=this.formatCurrency(newpriceInput);
					this.form.quotationList[i].priceInput = newpriceInput;
					var newtotalPrice=this.toDecimal2(newList[i].totalPrice);
					newtotalPrice=this.formatCurrency(newtotalPrice);
					this.form.quotationList[i].totalPrice=newtotalPrice;
				}
				this.calculatePrice();
				$("#loadingMask,#progressBar").hide();
				$("#xFile4").val("");
			}, function (response) {
				$("#loadingMask,#progressBar").hide();
			});
		},
		CheckLimit:function(id,num,enLabel,cnLabel){
			var reg = /^[0-9]*$/;
			var obj = $("#"+id);
      if (obj.attr("readonly")) {
        //只读不做操作
		return obj.val();
      } else {
        if (obj.val()) {
          var value = obj.val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= num * 1) {
            return value;
          }
          var limitDate = newvalue.substr(0, num);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(num * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (num * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (num * 1 - count);
            limitvalue = value.substr(0, size);
          }
					$.alert(num+" characters max for "+enLabel+". "+cnLabel+"最多只能填写"+num+"个字节。");
				  return limitvalue;
        }
      }
		}
		
	},
	data() {
		//返回的数据对象
		var dm = {};

		//判断是创建还是获取
		var id = this.$route.params.id || this.$route.query.id;
		if (id) {
		  var url = "/form/QuotationProcessApplication/get/" + id;
		} else {
		  var url = "/form/QuotationProcessApplication/create/";
		}

		if (this.GL) {
		  this.GL.actUtil.query("get", url, "", function(data) {
			dm = JSON.parse(data);
		  });
		} else {
		  global_.actUtil.query("get", url, "", function(data) {
			dm = JSON.parse(data);
		  });
		}
		//在选染页面之后拿去后台传过来的值做缓存 0 1 2 9 空
		if((dm.form.status == null || dm.form.status == 2 || dm.form.status == 9) && dm.form.applicantUserId != null && dm.form.createUserId != null && dm.form.applicantUserId!=dm.form.createUserId){
			dm.onbehalf = true;
			dm.onbehalfFlag = true;
		}else{
			dm.onbehalf = false;
			dm.onbehalfFlag = false;
		}

		dm.itServicerules="required";
		dm.tempapplicantUserId = dm.form.applicantUserId;
		dm.tempcreatorStaffcode = dm.form.staffCode;
		dm.tempcreatorName = dm.form.creatorName;
		dm.tempcreatorPhoneNum = dm.form.telephone;
		dm.tempcreatorDept = dm.form.department;
		dm.tempcostCenter = dm.form.costCenter;
		dm.tempemail = dm.form.email;
		dm.tempmobile = dm.form.mobile;
		dm.tempSupervisor	= dm.form.supervisor ;
		dm.tempBuHeader	=	dm.form.buhead;
		if(!dm.form.totalRegular_delivery) {
			dm.totalRegular_delivery = [];
		} else{
			dm.totalRegular_delivery = [dm.form.totalRegular_delivery];
		}
		if(!dm.form.lotRegular_delivery) {
			dm.lotRegular_delivery = [];
		} else{
			dm.lotRegular_delivery = [dm.form.lotRegular_delivery];
		}
		this.$root.actProcessType="none";

		var uid = localStorage.getItem("uid");
		if(dm.form.status == null || dm.form.status==2 ){
			dm.filledbyTaedTeam="(Filled by taed team)";
			dm.filledbyControlling="(Filled by controlling)";
		}else if((dm.form.status==1 || dm.form.status==0) && dm.form.createUserId == uid){
			dm.filledbyTaedTeam="(Filled by taed team)";
			dm.filledbyControlling="(Filled by controlling)";
		}else{
			dm.filledbyTaedTeam="";
			dm.filledbyControlling="";
		}
		
		if(this.$route.query.taskKey != null && this.$route.query.taskKey=='HeadofCFC'){
			dm.lableName="Approve";
			dm.rejectLableName="Reject";
		}else{
			dm.lableName="Received";
			dm.rejectLableName="Cancelled"
		}

		return dm;
	},
	watch: {
		"$root.actProcessType":{
			handler(curVal,oldVal){
				if("approve"==curVal){
					this.itServicerules="required";
				}else if("reject"==curVal){
					this.itServicerules='';
				}else{
					this.itServicerules="";
				}
				//console.log(this.itServicerules);  
			},
			deep:true
		}
	},
	//在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
	mounted() {
		var form = this.form;
		
		//初始化数字加,展示
		var _this = this;

		  //申请人信息显示隐藏
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
		this.$root.eventHub.$on('updateFormData', (form) => {
			this.form = form;
		  if(this.form.quotationList == ""){
				this.insertItineraryRows();
			}
		});
		 if(this.form.quotationList == ""){
				this.insertItineraryRows();
			}
    $("div#customerEmail div div input.form-control.input").on('blur', function() {
			//var regs=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;//原
			var regs = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			if($(this).attr("readonly")) {
				//只读不做操作
			} else {
				if($(this).val()) {
					if(!(regs.test($(this).val()))) {
						$.alert('E-mail format is not correct.邮箱格式不正确。');
						form.customerEmail="";
					}
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
			return (
			  (this.$route.query.taskKey != null &&
				this.$route.query.taskKey.indexOf("edit") == -1) ||
			  (this.form.processInstanceId != null &&
				this.form.status != null &&
				this.form.status != 2 &&
				this.form.status != 9)
			);
		  }
		},
		readonlyDelivery: {
			get: function() {
				//if(((this.$route.query.taskKey != null && this.processTaskKey == 'TaedTeam' && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))) {
				//	return false;
				//} else {
					return ((this.$route.query.taskKey != null &&
					this.$route.query.taskKey.indexOf("edit") == -1) ||
					(this.form.processInstanceId != null &&
					this.form.status != null &&
					this.form.status != 2 &&
					this.form.status != 9));
				//}
			}
		},
		viewForApplication: {
		  // 动态计算readonly的值
		  get: function() {
			return (this.$route.path.indexOf('create') > -1 );
		  }
		},
		viewForTaedTeam: {
		  // 动态计算readonly的值
		  get: function() {
				return (this.$route.query.taskKey != null && this.processTaskKey == 'TaedTeam' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))
		  }
		},
		//控制Unit Price 单价 显示可编辑/只读
		viewForControlling: {
		  get: function() {
			return ((this.$route.query.taskKey != null && this.processTaskKey == 'FinancialControlling' && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
			}
		},
		//Packaging Cost Info. 包装成本信息
		viewForPackagingCost: {
		  get: function() {
				if(this.$route.query.taskKey != null && this.processTaskKey == 'PackagingCost' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)) {
					return true;
				}else if(this.$route.query.taskKey != null &&  this.form.packagingCost != null &&
						(this.processTaskKey == 'TransportationCost' || this.processTaskKey == 'FinancialControlling' 
						|| this.processTaskKey == 'CFCInternalCheck' || this.processTaskKey == 'HeadofCFC' || this.processTaskKey == 'GP' ) 
						&& (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)) {
					return true;//后续审批人显示
				}else if(this.$route.query.taskKey == null && this.form.packagingCost !=null && this.form.status != null && this.form.status != 2 && this.form.status != 9){
					return true;//My Application 显示
				}else if( this.form.packagingCost != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
					return true;//从My Approval进来显示 
				}else{
					return false;
				}
		  }
		},
		//Packaging Cost Info 只读
    packagingCostDisabled:{
      get: function() {
        if(this.$route.query.taskKey != null && this.processTaskKey == 'PackagingCost' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;
        }else if(this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从myApprove进来就是只读
        }else{
          return true;
        }
      }
    },
		//Transportation Cost Info. 运输成本信息
		viewForTransportationCost: {
		  get: function() {
				if(this.$route.query.taskKey != null && this.processTaskKey == 'TransportationCost' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)) {
					return true;
				}else if(this.$route.query.taskKey != null && this.form.transportationCost != null &&
						(this.processTaskKey == 'PackagingCost' || this.processTaskKey == 'FinancialControlling' 
						|| this.processTaskKey == 'CFCInternalCheck' || this.processTaskKey == 'HeadofCFC' || this.processTaskKey == 'GP' ) 
						&& (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)) {
					return true;//后续审批人显示
				}else if(this.$route.query.taskKey == null && this.form.transportationCost != null && this.form.status != null && this.form.status != 2 && this.form.status != 9){
					return true;//My Application 显示
				}else if(this.form.transportationCost != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
					return true;//从My Approval进来显示 
				}else{
					return false;
				}
		  }
		},

		//Transportation Cost Info 只读
    transportationCostDisabled:{
      get: function() {
        if(this.$route.query.taskKey != null && this.processTaskKey == 'TransportationCost' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return false;
        }else if(this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从myApprove进来就是只读
        }else{
          return true;
        }
      }
    },

	//控制 Caculation Process计算过程 显示
		viewForCaculationProcess: {
		  get: function() {
				var roles = localStorage.getItem("role");
				if(this.$route.query.taskKey != null && this.processTaskKey == 'FinancialControlling' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return true;//FinancialControlling审批时显示
				}else if(this.$route.query.taskKey != null && this.processTaskKey == 'CFCInternalCheck' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) ){
					return true;//CFCInternalCheck审批时显示
				}
				else if(this.$route.query.taskKey != null && this.processTaskKey == 'HeadofCFC' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return true;//HeadofCFC审批时显示
				}
				// else if(this.$route.query.taskKey == null && this.form.currency != null && ( this.form.status != null && this.form.status != 2 && this.form.status != 9)){
				
				// 	return true;//My Application 显示 详情有值时显示
				// }
				else if(this.form.currency != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
						if(roles.indexOf('Controlling')>-1 || roles.indexOf('CFC Internal Check')>-1 || roles.indexOf('Head of CFC')>-1){
							return true;//从My Approval进来显示 
						}
					return false;//从My Approval进来显示 
				}
				else{
					return false;
				}
		  }
		},

		//控制 Additional Information 附加信息 显示
		viewForFinancialControlling: {
		  get: function() {
				if(this.$route.query.taskKey != null && this.processTaskKey == 'FinancialControlling' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return true;//FinancialControlling审批时显示
				}else if(this.$route.query.taskKey != null && (this.processTaskKey == 'CFCInternalCheck'||this.processTaskKey == 'HeadofCFC' )&& (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) ){
					return true;//CFCInternalCheck审批时显示
				}else if(this.$route.query.taskKey != null && this.processTaskKey == 'GP' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) ){
					return true;//GP审批时显示
				}
				//else if(this.form.currency != null){
				//	return true;//有值就显示
				//}
				else if(this.$route.query.taskKey == null && this.form.currency != null && ( this.form.status != null && this.form.status != 2 && this.form.status != 9)){
					return true;//My Application 显示 详情有值时显示
				}else if(this.form.currency != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
					return true;//从My Approval进来显示 
				}else{
					return false;
				}
		  }
		},
		//控制Unit Price 单价 显示可编辑/只读
		viewForFinancialControllingPrice: {
		  get: function() {
			return ((this.$route.query.taskKey != null && (this.processTaskKey == 'FinancialControlling'||this.processTaskKey == 'CFCInternalCheck') && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
			}
		},
		//控制FinancialControlling 只读
		readOnlyForFinancialControlling: {
		  get: function() {
				if(this.$route.query.taskKey != null && (this.processTaskKey == 'FinancialControlling'||this.processTaskKey == 'CFCInternalCheck') && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return false;
				}else{
					return true;
				}
		  }
		},
		//控制显示
		viewForGP: {
			get: function() {
				if(this.$route.query.taskKey != null && this.processTaskKey == 'GP' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return true;//GP审批时显示
				}else if(this.$route.query.taskKey == null && this.form.attachmentIds != null && ( this.form.status != null && this.form.status != 2 && this.form.status != 9)){
					return true;//My Application 显示 详情有值时显示
				}else if(this.form.attachmentIds != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
					return true;//从My Approval进来显示 
				}else{
					return false;
				}
				//return this.form.attachmentIds != null || ((this.$route.query.taskKey != null && this.processTaskKey == 'GP' && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
		  }
		},
		editForGP: {
		  //动态计算readonly的值
			get: function() {
			return ((this.$route.query.taskKey != null && this.processTaskKey == 'GP' && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
		  }
		},

		readonlyForCc: {//无效
		  // 动态计算readonly的值
		  get: function() {
			return (
			  this.form.processInstanceId == null ||
				this.form.status == null ||
				this.form.status == 2 ||
				this.form.status == 9);
		  }
		},
		readonlyForHrbp: {//无效
		  // 动态计算readonly的值
		  get: function() {
		   // console.log("readonlyForHrbp:"+((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('hrbp') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))));
		   // return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('hrbp') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
			return false;
		 }
		},
		 readonlyForFlt: {//无效
		  // 动态计算readonly的值
		  get: function() {
	   //     console.log("readonlyForFlt:"+((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('adminFleetManager') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))));
		//    return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('adminFleetManager') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
		   return false;
		 }
		},
		ckeckInApproveFlow:{
		  get: function() {
			return (this.$route.path.indexOf('audit') > -1);
		  }
		},
		applicationTime: {
		  get: function() {
			if(this.form.createDate == null){
			  return "";
			}
			var parts = this.form.createDate.match(/\d+/g);
			return parts[0] + "-" + parts[1] + "-" + parts[2];
		  },
		  
		}
    
	}
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
</style>

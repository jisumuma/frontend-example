<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Fixed Asset Transfer Application</h1>
      <ol class="breadcrumb">
        <li><a >1.Applicant</a></li>
        <li><a >2.Disciplinary Supervisor</a></li>
        <li><a >3.Acceptor</a></li>
        <li><a >4.Acceptor Disciplinary Supervisor</a></li>
        <li><a >5.Asset Accountant</a></li>
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
        	<label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label>
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
							<!--选中的时候显示-->
              <form-group col="md-3" v-if="!onbehalf" type="input"  v-model="form.staffCode" name="staffCode" readonly="readonly" label="FixedAssetTransfer.staffCode"></form-group>
             		<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										 {{$t("FixedAssetTransfer.staffCode")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" id="staffCode" name="staffCode" v-model="form.staffCode" readonly="readonly">
                    <span class="input-group-btn" id="selectotherperson">                          		
                        <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                     </span>
									</div>
								</div>
							</div>
               	<!--不选中的时候显示-->
							<form-group  col="md-3" type="input" v-model="form.applicantName" name="applicantName" readonly="readonly"  label="FixedAssetTransfer.applicantName"></form-group>
             	<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" readonly="readonly" label="FixedAssetTransfer.telephone"></form-group>
              <form-group col="md-3" type="input"  v-model="form.department" name="department" readonly="readonly" label="FixedAssetTransfer.department"></form-group>
            </div>
           <div class="row panel-collapse collapse " id="collapseZero">
               <form-group col="md-3" type="input"  v-model="form.supervisor" name="supervisor" readonly="readonly" label="FixedAssetTransfer.supervisor"></form-group>
               <form-group col="md-3" type="input"  v-model="form.buHeader" name="buHeader" readonly="readonly" label="FixedAssetTransfer.buHeader"></form-group>
               <form-group col="md-3" type="input"  v-model="form.costCenter" name="costCenter" readonly="readonly" label="FixedAssetTransfer.costCenter"></form-group>
            </div>
          </div>
        </form>
      </div>
      
     <div class="box box-primary">
        <div class="box-header with-border">
          <!--<i class="fa fa-asterisk text-required-header"></i>-->
            <h3 class="box-title">Asset Transfer letter 固定资产转移单</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class="row">              
              <div class="col-md-12" >
                <table class="table table-bordered mar-bot-0 table-faa table-space-xs" width="100%" height="15px" id="extendNon">
                  <tbody>
                  <tr>
                       <th colspan="6" width="50%" style="text-align: center;"><label> Filled by the old management Dept. 旧管理部门填写 </label></th>
                       <th colspan="5" width="50%" style="text-align: center;"><label>Filled by new management Dept. 新管理部门填写 </label></th>
                  </tr>  
                  <tr>
                    <th width="2%" style="text-align: center;" >Item<br/>行项</th>
                    <th width="17%" style="text-align: center;" ><!--<i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>-->Fix Asset Description<br/>固定资产名称</th>
                    <th width="8%" style="text-align: center;" ><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Inventory No.<br/>固定资产编号</th>
                    <th width="11%" style="text-align: center;" >Type/Model<br/>型号</th>
                    <th width="8%" style="text-align: center;" ><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Old Cost Center<br/>旧成本中心</th>
                    <th width="4%" style="text-align: center;" ><!--<i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>-->Quantity<br/>数量</th>
                    <th width="8%" style="text-align: center;" ><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>New Cost Center<br/>新成本中心</th>
                    <th width="8%" style="text-align: center;" ><!--<i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>-->New Inventory No.<br/>新固定资产编号</th>
                    <th width="13%" style="text-align: center;" ><!--<i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>-->Using Dept.<br/>使用部门</th>
                    <th width="19%" style="text-align: center;" ><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Location (Workshop Section)<br/>资产放置位置（工段）</th>
                    <th width="2%" v-if="!readonly" class="text-center" >
                      <a href="javascript:;" @click="insertRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.assetTransferList">
                    <td>
                       <input type="hidden" class="form-control" id="" v-model="entry.id">
                      <div style="margin-bottom: 15px;"> {{index+1}}</div>
                    </td>
                   <td>
                      <form-group  type="input2" haslable="false" :readonly="readonly"  v-model="entry.assetDesc" v-validate="" :name="'assetDesc'+(index+1)"   :id="'assetDesc'+index"></form-group>
                    </td>
                   <td>
                      <form-group  type="input2" haslable="false" :readonly="readonly"  :name="'inventoryNumber'+(index+1)"   :id="'inventoryNumber'+index"   v-model="entry.inventoryNumber" v-validate="'required'" ></form-group>
                    </td>
                   <td>
                      <form-group  type="input2" haslable="false" :readonly="readonly" name="model"  v-model="entry.model" ></form-group>
                    </td>
                    <!-- <td>
                      <form-group type="input2" haslable="false" :readonly="readonly" :name="'oldCostCenter'+(index+1)" :id="'oldCostCenter'+index"  v-model="entry.oldCostCenter" v-validate="'required'"></form-group>
                    </td> -->
                    <td>
                      <div v-if="!readonly">
                        <div class="form-group">							
                          <div class="input-group ">
                             <input type="text" :class="{'form-control':true,'input': true,'is-danger':errors.has('oldCostCenter'+(index+1)) }" :id="'oldCostCenter'+(index+1)" :name="'oldCostCenter'+(index+1)" :title="entry.oldCostCenter" v-model="entry.oldCostCenter" v-validate="'required'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="onChooseCostCenter('chooseOldCostCenter'+(index+1),index)">
                            <ChooseCostCenterForTable :chooseID="'chooseOldCostCenter'+(index+1)" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOldCostCenter" :index="index"></ChooseCostCenterForTable>
                          </div>
                        </div>
                      </div>
                    <form-group  type="input2" haslable="false" v-else readonly="readonly" :name="'oldCostCenter'+(index+1)" :id="'oldCostCenter'+(index+1)"  v-model="entry.oldCostCenter"></form-group>
                   </td>
                   <td>
                      <form-group  type="input2" haslable="false" :readonly="readonly" :name="'quantity'+(index+1)"   :id="'quantity'+index"  other-rules="regex:^-?\d*\.?\d*$" v-model="entry.quantity"></form-group>
                    </td>
                   <td>
                      <div v-if="inputForAcceptor">
                        <div class="form-group">							
                          <div class="input-group ">
                            <input type="text" :class="{'form-control':true,'input': true,'is-danger': errors.has('newCostCenter'+(index+1)) }" :id="'newCostCenter'+(index+1)" :name="'newCostCenter'+(index+1)" :title="entry.newCostCenter" v-model="entry.newCostCenter" v-validate="'required'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="onChooseCostCenter('chooseNewCostCenter'+(index+1),index)">
                            <ChooseCostCenterForTable :chooseID="'chooseNewCostCenter'+(index+1)" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectCostCenter" :index="index"></ChooseCostCenterForTable>                      
                          </div>
                        </div>
                      </div>
                     <form-group  type="input2" haslable="false" v-else readonly="readonly" :name="'newCostCenter'+(index+1)" :id="'newCostCenter'+(index+1)"  v-model="entry.newCostCenter"></form-group>
                   </td>
                     <td>
                       <form-group   type="input2" haslable="false" v-if="inputForAcceptorAndAssetAccountant" :name="'newInventoryNumber'+(index+1)"   :id="'newInventoryNumber'+index"   v-model="entry.newInventoryNumber" ></form-group>
                       <form-group  type="input2" haslable="false" v-else readonly="readonly"  :name="'newInventoryNumber'+(index+1)"   :id="'newInventoryNumber'+index"   v-model="entry.newInventoryNumber"></form-group>
                    </td>
                   <td>
                      <form-group type="input2" haslable="false" v-if="inputForAcceptor"   :name="'usingDept'+(index+1)"   :id="'usingDept'+index"   v-model="entry.usingDept" ></form-group>
                      <form-group type="input2" haslable="false" v-else readonly="readonly"  :name="'usingDept'+(index+1)"   :id="'usingDept'+index"   v-model="entry.usingDept" ></form-group>
                    </td>
                   <td>
                      <form-group  type="input2" haslable="false" v-if="inputForAcceptor" :name="'location'+(index+1)"   :id="'location'+index"  v-model="entry.location" v-validate="'required'" ></form-group>
                      <form-group  type="input2" haslable="false" v-else readonly="readonly"   :name="'location'+(index+1)"   :id="'location'+index"  v-model="entry.location" ></form-group>
                    </td>
                    <td v-if="!readonly" class="text-center" style="vertical-align: middle;">
                      <a href="javascript:;" @click="deleteRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="box box-primary" >
        <div class="box-header with-border">
         <!--<i class="fa fa-asterisk text-required-header"></i>-->
          <h3 class="box-title">Document Handover List & Management Person 文件交接清单 & 管理人</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="col-md-3">
                  <div class="checkbox mar-bot-20">
                    <label>
                        <input :disabled="readonly" name="assetAcceptanceReport"  v-model="form.assetAcceptanceReport" type="checkbox" >Asset Acceptance Report 验收报告</a>
                      </label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="checkbox mar-bot-20">
                    <label>
                        <input :disabled="readonly" name="productDesc"  v-model="form.productDesc" type="checkbox" >Product Description\CD\Design Drawing 产品说明\CD\图纸等</a>
                      </label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="checkbox mar-bot-20">
                    <label>
                        <input :disabled="readonly" name="purchasingRO"  v-model="form.purchasingRO" type="checkbox" >Purchasing Request\Order 设备采购时PR/PO</a>
                      </label>
                  </div>
                </div>
                 <div class="col-md-3">
                  <div class="checkbox mar-bot-20">
                    <label>
                        <input :disabled="readonly" name="assetRepairRecord"  v-model="form.assetRepairRecord" type="checkbox" >The Asset Daily Maintenance\Repair Record 资产日常保养\维修记录</a>
                      </label>
                  </div>
                </div>
            </div>
           <div class="row">
                 <div class="checkbox mar-bot-20 col-md-1" >
                    <label>
                        <input :disabled="readonly" name="isHasOthers"  v-model="form.isHasOthers" type="checkbox">Others 其他</a>
                      </label>
                  </div>
                  <div class="col-md-2" style="padding-left: 0px !important;margin-top: 5px !important;"> 
                    <input type="text"  v-if="checkHasOthers" :readonly="readonly" :class="{'form-control':true,'pull-left': true,'input':true,'others':true, 'is-danger': errors.has('others') }" id="others" name="others"  v-model="form.others" other-rules="max:300" />
                    <input type="text"  v-else  readonly="readonly" other-rules="max:300" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('others') }" id="others" name="others"  v-model="form.others"/>
                  </div>   
          </div>
           <div class="row">
             <!-- <div class="col-md-3">
                  <div class="form-group">
                    <label for="">
                       <i class="fa fa-asterisk text-required-header"></i>
                      {{$t("FixedAssetTransfer.oldManager")}} </label>
                    <div class="input-group ">
                      <input type="text"  v-validate="'required'" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('oldManagerName') }" id="oldManagerName" name="oldManagerName" v-model="form.oldManagerName" readonly="readonly">
                       <span class="input-group-btn" id="selectOldManager">
                           <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" :chooseID="'chooseOldManager'" v-on:callbackfunction="doAfterSelectOldManager" ><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        </span>
                    </div>
                  </div>
							</div> -->
              <div class="col-md-3" v-if="!readonly">
								<div class="form-group">
									<label for="">
                    <i class="fa fa-asterisk text-required-header"></i>
										 {{$t("FixedAssetTransfer.newManager")}} </label>
									<div class="input-group ">
										<input type="text"  v-validate="'required'" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('newManagerName') }" id="newManagerName"  name="newManagerName" v-model="form.newManagerName" readonly="readonly">
									  	<span class="input-group-btn" id="selectNewManager">
                          <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" :chooseID="'chooseNewManager'" v-on:callbackfunction="doAfterSelectNewManager"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    	</span> 
									</div>
								</div>
							</div> 
               <form-group col="md-3" v-else type="input"  v-model="form.newManagerName" name="newManagerName" readonly="readonly" label="FixedAssetTransfer.newManager"></form-group>
          </div>
          <div class="row">
            <form-group col="md-12" type="textarea0" :readonly="readonly" id="transferReason" v-model="form.transferReason" name="transferReason"></form-group>
          </div>
         </div>
        </form>
      </div>
      <div class="box box-primary" v-if="showAttachment">
        <div class="box-header with-border">
          <h3 class="box-title">  Upload Attachment 上传附件 </h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" required="false"></upload2>
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
      <comment v-if="processTaskId !=null &&form.status != 9 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>     
      <router-view :form="form" entityId="FixedAssetTransfer" vclass="btn-left" uri="/form/FixedAssetTransfer/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>
   </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
import daterangepicker from "bootstrap-daterangepicker"
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
  name: "FixedAssetTransfer",
  methods: {
        beforesubmit: function() {
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
                                    me.form.applicantName = data.printENName;
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
                                    me.form.buHeader = data.buHead;
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
                    this.form.applicantName = localStorage.getItem("printENName");
                    this.form.telephone = localStorage.getItem("telephone");
                    this.form.department = localStorage.getItem("tempdep");
                    this.form.email = localStorage.getItem("email");
                    this.form.costCenter = localStorage.getItem("costCenterCode");
                    this.form.mobile = localStorage.getItem("mobile");
                    this.form.supervisor = localStorage.getItem("supervisor");
                    this.form.buHeader = localStorage.getItem("buHead");
                  }
            
            }else{
              this.form.applicantUserId = this.tempapplicantUserId;
                this.form.staffCode = this.tempcreatorStaffcode;
                this.form.applicantName = this.tempcreatorName;
                this.form.telephone = this.tempcreatorPhoneNum;
                this.form.department = this.tempcreatorDept;
                this.form.email = this.tempemail;
                this.form.costCenter = this.tempcostCenter;
                this.form.mobile = this.tempmobile;
                this.form.supervisor = this.tempSupervisor;
                this.form.buHeader = this.tempBuHeader;
            }
          }else{
            if(!temp){
                this.form.applicantUserId = this.tempapplicantUserId;
                this.form.staffCode = this.tempcreatorStaffcode;
                this.form.applicantName = this.tempcreatorName;
                this.form.telephone = this.tempcreatorPhoneNum;
                this.form.department = this.tempcreatorDept;
                this.form.email = this.tempemail;
                this.form.costCenter = this.tempcostCenter;
                this.form.mobile = this.tempmobile;
                this.form.supervisor = this.tempSupervisor;
                this.form.buHeader = this.tempBuHeader;
          }
        }
      },
    doAfterSelectOtherPerson: function(data) {
			$('#selectotherperson').attr("class", "input-group-btn");
			//console.log(data);
			this.form.applicantUserId = data.id;
			this.form.staffCode = data.staffCode;
			this.form.applicantName = data.printENName;
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
			this.form.buHeader = data.buHead;
		},


    //  doAfterSelectOldManager:function(data){     
    //    	$('#selectOldManager').attr("class", "input-group-btn");
    //     this.form.oldManager = data.staffCode;  
    //     this.form.oldManagerName= data.printENName;  
    //     $('#selectotherperson').attr("class", "input-group-btn");    
    //  },
    onChooseCostCenter:function(chooseID,index){
          var costCenterModal =chooseID+"costCenterModal";
     			$("#"+costCenterModal+index).modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});		
    },
    doAfterSelectOldCostCenter:function(data,index){           
        this.form.assetTransferList[index].oldCostCenter = data.costCenterCode;
    },
    doAfterSelectCostCenter: function(data,index) {
        this.form.assetTransferList[index].newCostCenter = data.costCenterCode;
        this.form.assetTransferList[index].usingDept =data.costCenterName;  
      },
     doAfterSelectNewManager:function(data){       
      	$('#selectNewManager').attr("class", "input-group-btn");
        this.form.newManager = data.staffCode; 
        this.form.newManagerName = data.printENName; 
         $('#selectotherperson').attr("class", "input-group-btn");     
     },
    //添加一行
    insertRows: function() {
      var newItem = {};
      for(var key in this.form.assetTransferList[0]) {
        newItem[key] = "";
      }
      this.form.assetTransferList.push(newItem);
    },
    //表格行删除调用方法
    deleteRows: function(rowId) {
      if(this.form.assetTransferList.length > 1) {
        this.form.assetTransferList.splice(rowId, 1);
      } else {
        $.alert("At least one complete record of fixes asset transfer infomation. 至少需要填写一条完整的固定资产转移信息。");
      }
    },

  },
  data() {
    //返回的数据对象
    var dm = {};
    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/FixedAssetTransfer/get/" + id;
    } else {
      var url = "/form/FixedAssetTransfer/create/";
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
    //在选染页面之后拿去后台传过来的值做缓存
      dm.itServicerules="required";
      dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.staffCode;
			dm.tempcreatorName = dm.form.applicantName;
			dm.tempcreatorPhoneNum = dm.form.telephone;
			dm.tempcreatorDept = dm.form.department;
			dm.tempcostCenter = dm.form.costCenter;
      dm.tempbuHeader = dm.form.buHeader;
      dm.tempsupervisor = dm.form.supervisor;
		  this.$root.actProcessType="none";
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
          console.log(this.itServicerules);  
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
      // 动态计算processTaskKey的值s
      get: function() {
        return this.$route.query.taskKey;
      }
    },
  ckeckInApproveFlow:{
		  get: function() {
			return (this.$route.path.indexOf('audit') > -1);
		  }
		},
  showAttachment: {
				get: function() {
					return(!this.readonly || (this.form.attachmentIds != null && this.form.attachmentIds !=""));
				}
	},
  inputForAcceptor: {
		  get: function() {
				if(this.$route.query.taskKey != null && this.processTaskKey == 'acceptor' && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return true;//Acceptor审批时显示
				}else{
					return false;
				}
		  }
    },
    inputForAcceptorAndAssetAccountant:{
		  get: function() {
				if(this.$route.query.taskKey != null && (this.processTaskKey == 'acceptor'|| this.processTaskKey == 'assetAccountant') && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)){
					return true;//Acceptor审批时显示
				}else{
					return false;
				}
		  }
    },
    checkHasOthers:{
      get:function(){
         // alert(this.form.isHasOthers);
         if(this.form.isHasOthers != true){
           this.form.others ="";
         }
          return this.form.isHasOthers;
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
  
    applicationTime: {
      get: function() {
        if(this.form.createDate == null){
          return "";
        }
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      },
      
    },
   
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
.table-faa > thead > tr > th, .table-faa > tbody > tr > th, .table-faa > tfoot > tr > th, .table-faa > thead > tr > td, .table-faa > tbody > tr > td, .table-faa > tfoot > tr > td {
    padding: 2px;
}
.table.table-space-xs > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 6px 3px !important;    
}
</style>

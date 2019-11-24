<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Fixed Asset Acquisition Application</h1>
      <ol class="breadcrumb">
        <li><a >1.Asset Accountant</a></li>
        <li><a >2.Requester</a></li>
        <li><a >3.Disciplinary Supervisor</a></li>
        <li><a >4.Asset Accountant</a></li>
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
          <h3 class="box-title">Requester Info.&nbsp;需求人信息</h3>
        		<!-- <label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label> -->
         <!-- <button type="button" class="btn btn-primary btn-sm pull-right" data-toggle="collapse" id="baseext-hide-show" href="#collapseZerowp"><i class="fa fa-plus" id="minusplusiwp"></i></button> -->
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
              <form-group col="md-3" type="input"  v-model="form.staffCode" name="staffCode" readonly="readonly" label="FixedAssetAcquisition.staffCode"></form-group>
             		<!--不选中的时候显示-->
							<form-group v-if="!onbehalf"  col="md-3" type="input" v-model="form.applicantName" name="applicantName" readonly="readonly"  label="FixedAssetAcquisition.applicantName"></form-group>
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										 {{$t("FixedAssetAcquisition.applicantName")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" id="applicantName" name="applicantName" v-model="form.applicantName" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    	</span>
									</div>
								</div>
							</div>
             	<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" readonly="readonly" label="FixedAssetAcquisition.telephone"></form-group>
              <form-group col="md-3" type="input"  v-model="form.department" name="department" readonly="readonly" label="FixedAssetAcquisition.department"></form-group>
            </div>
           <div class="row panel-collapse collapse " id="collapseZero">
               <form-group col="md-3" type="input"  v-model="form.supervisor" name="supervisor" readonly="readonly" label="FixedAssetAcquisition.supervisor"></form-group>
               <form-group col="md-3" type="input"  v-model="form.buHeader" name="buHeader" readonly="readonly" label="FixedAssetAcquisition.buHeader"></form-group>
               <form-group col="md-3" type="input"  v-model="form.costCenter" name="costCenter" readonly="readonly" label="FixedAssetAcquisition.costCenter"></form-group>
            </div>
          </div>
        </form>
      </div>
      
    <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-required-header"></i>
            <h3 class="box-title">Fixed Asset Acquisition Letter固定资产入账单</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <div class="col-md-12" >
                <table class="table table-bordered mar-bot-0 table-faa table-space-xs table-striped" style="background-color: #F1F1F1;" width="100%" height="15px" id="extendNon">
                  <tbody>
                  <tr v-bind:key="index" v-for="(entry,index) in form.fixedAssetList" style="height: 60px;">
                    <td style="width: 2%">
                     <input type="hidden" class="form-control" id="" v-model="entry.id">
                      <div style="margin-bottom: 15px;text-align: center"> {{index+1}}</div>
                    </td>
                    <td style="padding: 0px !important;">
                        <table class="table table-bordered mar-bot-0 table-faa table-space-xs" style="border: none;background: none;" width="100%" height="15px">
                          <tbody>
                          <tr style="height: 15px;">
					                    <th style="width: 11% ;text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>SC/PR<br/>请购单编号</th>
					                    <th style="width: 11%;text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>PO#<br/>采购单编号</th>
					                    <th style="width: 15%;text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>PO Description<br/>PO描述</th>
					                    <th style="width: 12%;text-align: center">Vendor Name<br/>供应商名称</th>
					                    <th style="width: 10%;text-align: center">Vendor Code<br/>供应商代码</th>
					                    <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Fixed Asset Description(CN/EN)<br/>固定资产名称（中/英文）</th>
					                    <th style="width: 10%;text-align: center">Inventory/Equipment No. <br/>固定资产/设备编号</th>
                              <th v-if="!readonly" class="text-center" style="width: 3%;vertical-align: middle;">
                                <a href="javascript:;" @click="insertRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                              </th>
                          </tr>
                          <tr style="padding: 0px !important;">
		                           <td>                     
					                      <!-- <input type="text" readonly="readonly" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('requisitionNo') }" name="requisitionNo"  v-model="entry.requisitionNo" /> -->
					                      <form-group type="input2" haslable="false" v-if="entry.fromUpload=='Y'" readonly="readonly"   :name="'requisitionNo'+(index+1)"   :id="'requisitionNo'+index" v-model="entry.requisitionNo" ></form-group>
					                      <form-group type="input2" haslable="false" v-else :readonly="readonly"  v-validate="'required'"  :name="'requisitionNo'+(index+1)"  :id="'requisitionNo'+index" v-model="entry.requisitionNo" ></form-group>
					                    </td>
					                    <td>                     
					                      <form-group type="input2" haslable="false" v-if="entry.fromUpload=='Y'" readonly="readonly"  :name="'purchaseOrder'+(index+1)"   :id="'purchaseOrder'+index" v-model="entry.purchaseOrder" ></form-group>
					                      <form-group type="input2" haslable="false" v-else :readonly="readonly"  v-validate="'required'" :name="'purchaseOrder'+(index+1)"   :id="'purchaseOrder'+index" v-model="entry.purchaseOrder" ></form-group>
					                    </td>
					                    <td>                     
					                      <form-group type="input2" haslable="false" v-if="entry.fromUpload=='Y'" readonly="readonly"  :name="'poDesc'+(index+1)"   :id="'poDesc'+index" v-model="entry.poDesc" ></form-group>
					                      <form-group type="input2" haslable="false" v-else :readonly="readonly"  v-validate="'required'" :name="'poDesc'+(index+1)"   :id="'poDesc'+index" v-model="entry.poDesc" ></form-group>
					                    </td>
					                    <td>
					                      <form-group type="input2" haslable="false" :readonly="readonly" name="vendoName"  v-model="entry.vendoName" ></form-group>
					                    </td>
					                   <td>
					                      <form-group type="input2" haslable="false" :readonly="readonly" name="vendoCode"  v-model="entry.vendoCode" ></form-group>
					                    </td>
					                   <td>
					                      <form-group type="input2" haslable="false" :readonly="readonly"  v-model="entry.assetDesc" v-validate="'required'" :name="'assetDesc'+(index+1)"   :id="'assetDesc'+index"></form-group>
					                    </td>
					                   <td>
					                      <form-group type="input2" haslable="false" :readonly="inputForRequestorAndAssetAccountant"  :name="'inventoryNumber'+(index+1)"   :id="'inventoryNumber'+index"   v-model="entry.inventoryNumber"></form-group>
					                    </td>
                              <td v-if="!readonly">
                                &nbsp;
                              </td>
                          </tr>
                          <tr style="height: 15px;">
                            <th style="text-align: center">Type/Model<br/>型号</th>
				                    <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Quantity<br/>数量</th>
                            <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Using Dept. Cost Center<br/>使用部门成本中心</th>
				                    <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Using Dept.<br/>使用部门</th>
				                    <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Date of Start Used<br/>开始使用日期</th>
				                    <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i>Location (Workshop Section)<br/>资产放置位置（工段）</th>
				                    <th style="text-align: center"><i class="fa fa-asterisk text-required" style="font-size: 9px;position: relative;bottom: 2px;"></i><a target='_blank' :href="GL.getURL('/FixedAssetAcquisition/getIFRSLifes')">IAS Asset Useful Life<br/>IAS使用年限</a></th>
                            <th v-if="!readonly">
                               &nbsp;
                            </th>
                          </tr>
                          <tr>
                              <td>
					                      <form-group type="input2" haslable="false" :readonly="readonly" name="model"  v-model="entry.model" ></form-group>
					                    </td>
					                   <td>
					                      <form-group type="input2" haslable="false" :readonly="readonly" :name="'quantity'+(index+1)"   :id="'quantity'+index"  other-rules="regex:^-?\d*\.?\d*$" v-model="entry.quantity" v-validate="'required'"></form-group>
					                    </td>
                             
					                    <td>
					                      <div v-if="!readonly">
					                        <div class="form-group">							
					                          <div class="input-group ">
					                            <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('costCenter'+(index+1)) }" :id="'costCenter'+(index+1)" :name="'costCenter'+(index+1)" :title="entry.costCenter" v-model="entry.costCenter" v-validate="'required'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					                            <span class="input-group-btn" :id="'selectCostCenter'+(index+1)">
					                                <ChooseCostCenter :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectCostCenter" :index="index"><i class="fa fa-fw fa-search"></i></ChooseCostCenter>
					                              </span>
					                          </div>
					                        </div>
					                      </div>
					                    <form-group type="input2" haslable="false" v-else readonly="readonly" :name="'costCenter'+(index+1)" :id="'costCenter'+index"  v-model="entry.costCenter" v-validate="'required'"></form-group>
					                   </td>
                             <td>
					                    	<form-group type="select2" v-if="!readonly" uri="/common/listDept" haslable="false" :name="'usingDept'+index" v-model="entry.usingDept" :id="'usingDept'+index" :index="index" v-validate="'required'"></form-group>
					                      <form-group type="input2" haslable="false" v-else :readonly="readonly"  :name="'usingDept'+(index+1)"   :id="'usingDept'+index"   v-model="entry.usingDept" v-validate="'required'"></form-group>
					                    </td>
					                   <td>
					                      <form-group type="datepicker4" :readonly="readonly"  v-model="entry.startUsedDate"  haslable="false" :name="'startUsedDate'+(index+1)"   :id="'startUsedDate'+index"  v-validate="'required'"></form-group>
					                    </td>
					                   <td>
					                      <form-group type="input2" haslable="false" :readonly="inputForRequestorAndAssetAccountant"  :name="'location'+(index+1)"   :id="'location'+index"  v-model="entry.location" v-validate="'required'" ></form-group>
					                    </td>
					                   <td>
					                      <form-group type="input2" haslable="false" :readonly="inputForRequestorAndAssetAccountant"  :name="'assetUsefulLife'+(index+1)"   :id="'assetUsefulLife'+index"   v-model="entry.assetUsefulLife" v-validate="'required'"  other-rules="regex:^-?\d*\.?\d*$"></form-group>
					                    </td>
                              <td v-if="!readonly" class="text-center">
                                 <a href="javascript:;" @click="deleteRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                              </td>
                           </tr>
                          </tbody>
                      </table>
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
         <i class="fa fa-asterisk text-required-header"></i>
          <h3 class="box-title">Acceptance Description&nbsp;验收说明</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class="checkbox mar-bot-20">
               <label>
                     <span class="help is-danger" v-show="errors.has('acceptanceDesc')">
                                Please confirm acceptance status!
                              </span>
                       <input :disabled="readonly" name="acceptanceDesc"  v-model="form.acceptanceDesc" type="checkbox" v-validate="'required'" >The technical inspection of machines has been completed and the expected conditions of machines have been reached which are qualified for use. 以上所列设备已经经过技术检测达到预定可使用状态，可投入使用。</a>
                </label>
            </div>
          </div>
        </form>
      </div>
       <!-- 上传附件end  -->
       <div style="margin-bottom: 20px;">
        <p> <b>Remark</b></p>
         1. Please fill in all columns. 请填写所有内容。<br/>
         2. "Cost center" should be filled by the latest cost center list; if you are not sure please contact Ms. Jiang Xing jin(5880 9609) controlling department. "成本中心" 应按照最新的成本中心列表填写， 如果不确定请联系控制部蒋幸女士(5880 9609)。<br/>
         3. "Location" must be an articulated description of produciton line or work station. "安装地点"栏必须填写到生产线或工段 。<br/>
         4. The original asset inventory number should be provided if it is a case of subsequent capital expenditure. 如果为机器设备的后续改造支出，必须填写改造设备的“原固定资产编号”。<br/>
         5. Please fill the document in English, but the name of machine must be filled in Chinese/Englisn or Chinese/German. 请使用英文填写但是设备名称请使用中英/中德填写。<br/>
         6. Please consult CR department for Custom duty Clearance status. 关于是否见面过进口关税的信息，请咨询CR部门。
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
      <comment v-if="processTaskId !=null &&form.status != 9 &&form.status!=91&& ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>     
      <router-view :form="form" entityId="FixedAssetAcquisition" vclass="btn-left" uri="/form/FixedAssetAcquisition/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
      <comment-list v-if="(form.processInstanceId !=null || form.status==91)"></comment-list>
   </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
import daterangepicker from "bootstrap-daterangepicker"
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
  name: "FixedAssetAcquisition",
  methods: {
      beforesubmit: function() {
       },
      onbehalfclick: function() {
				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId = this.tempapplicantUserId;
					this.form.staffCode = this.tempcreatorStaffcode;
					this.form.applicantName = this.tempcreatorName;
					this.form.telephone = this.tempcreatorPhoneNum;
					this.form.department = this.tempcreatorDept;
          this.form.costCenter = this.tempcostCenter;
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
      },
     doAfterSelectCostCenter: function(data,index) {
        $('#selectCostCenter'+(index+1)).attr("class", "input-group-btn");
        this.form.fixedAssetList[index].costCenter = data.costCenterCode;
        this.form.fixedAssetList[index].usingDept =data.costCenterName;  
      },
    //添加一行
    insertRows: function() {
      var newItem = {};
      for(var key in this.form.fixedAssetList[0]) {
        newItem[key] = "";
      }
      this.form.fixedAssetList.push(newItem);
    },
    //表格行删除调用方法
    deleteRows: function(rowId) {
      if(this.form.fixedAssetList.length > 1) {
        this.form.fixedAssetList.splice(rowId, 1);
      } else {
        $.alert("At least one complete record of fixes asset infomation. 至少需要填写一条完整的固定资产信息。");
      }
    },

  },
  data() {
    //返回的数据对象
    var dm = {};
    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/FixedAssetAcquisition/get/" + id;
    } else {
      var url = "/form/FixedAssetAcquisition/create/";
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
    //在选染页面之后拿去后台传过来的值做缓存
      dm.onbehalf = false;
      dm.flag = false;
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
    inputForRequestorAndAssetAccountant:{
		  get: function() {
				if(!this.readonly ||(this.$route.query.taskKey != null && (this.processTaskKey == 'assetAccountant') && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))){
					return false;//assetAccountant审批时显示
				}else{
					return true;
				}
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
    padding: 0px;
}
.table.table-space-xs > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 0px 0px !important;
}
</style>

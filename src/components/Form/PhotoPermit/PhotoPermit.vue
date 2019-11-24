<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Photo Permit Application 拍照许可申请</h1>
      <ol class="breadcrumb">
       <li><a >1.Applicant</a></li>
        <li v-if ="this.form.flag == 'Y' ||(form.onboard=='true'||form.onboard)"><a >2.Admin Security Officer</a></li>
        <li v-if ="this.form.flag == 'Y' ||(form.onboard=='true'||form.onboard)"><a >3.Disciplinary Supervisor</a></li>
        <li v-if ="this.form.flag == 'Y' ||(form.onboard=='true'||form.onboard)"><a >4.BU Head in charge applied zone</a></li>
        <li v-if="form.onboard=='true'||form.onboard"><a >5.BOM</a></li>
       
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
          <h3 class="box-title"> Applicant Information 申请人信息</h3>
          <label v-if="!readonly" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
        </div>
        <form role="form">
         <input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
          <input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">
          <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
          <div class="box-body">
            <div class="row">
              <!--不选中的时候显示-->
              <form-group v-if="!onbehalf"  col="md-3" type="input" v-model="form.creatorName" name="name" readonly="readonly"></form-group>
              <!--选中的时候显示-->
              <div class="col-md-3" v-if="onbehalf">
                <div class="form-group">
                  <label for="">
                   <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
                    Applicant Name 申请人姓名 </label>
                  <div class="input-group ">
                    <input type="text" class="form-control" placeholder="Applicant Name 申请人姓名" id="creatorStaffcode" name="name" v-model="form.creatorName" readonly="readonly">
                    <span class="input-group-btn" id="selectotherperson">
                          	<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    </span>
                  </div>
                </div>
              </div>
              <form-group col="md-3" type="input"  v-model="form.creatorStaffcode" name="Staffcode" readonly="readonly"></form-group>
              <form-group col="md-3" type="input"  v-model="form.creatorDept" name="Division" readonly="readonly"></form-group>
             <form-group col="md-3" type="input"  v-model="form.creatorPhoneNum" name="Telephone" readonly="readonly"></form-group>
            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title pull-left">Notice 注意事项: </h3></br></br>
           <p><span>&nbsp;&nbsp;&nbsp;1.&nbsp; This application is only valid with all approvals. 此申请只在所有审批完成时有效。</span></p>
           <p><span>&nbsp;&nbsp;&nbsp;2.&nbsp; This application can only be used by the applicant. 此申请不能被申请人以外的任何人使用。 </span></p>
           <p><span>&nbsp;&nbsp;&nbsp;3.&nbsp; Please use the camera model in this application when taking picture. 仅限使用申请表中填写的相机拍照。 </span></p>
           <p><span>&nbsp;&nbsp;&nbsp;4.&nbsp; Please print this application out and take it with you when taking picture. 申请人将此申请表打印出来，进行拍照时需携带此表，以便检查。 </span></p>
           <p><span>&nbsp;&nbsp;&nbsp;5.&nbsp; Picture can only be taken in specified location and period. 仅限在下列提及的地点和规定的期限进行拍照。 </span></p>
           </div>
      </div>

  <!-- 时间与区域 starts -->
         <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title pull-left">Time and Area 时间与区域</h3>
        </div>
        <form role="form">
          <div class="box-body" id="bmApplicatio">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <form-group  type="daterangepicker2" showTime="true"  other-rules="required" v-model="form.shootingTime" name="shootingTime" :readonly="readonly"></form-group>
                </div>
              </div>

            
               

              </div>
              <div class="row">
                <div class="col-md-6">
                <div class="form-group">
                  <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> &nbsp;Cameral Model & Camera ID No. 相机型号及序列号   </label>
                  <!-- <input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('cameraModel') }" v-validate="'required'"  id="cameraModel" name="cameraModel"  placeholder=""   v-model="form.cameraModel" :readonly="readonly"> -->
                  <textarea style="resize:vertical;" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('cameraModel') }" id="cameraModel" rows="2" name ="cameraModel"  placeholder="" v-validate="'required'" v-model="form.cameraModel"  :readonly="readonly"></textarea>
                </div>
              </div>

            
               <div class="col-md-6">
                <div class="form-group">
                  <label for=""> &nbsp;  </label>
                  <p><span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;The devices should be authorized by company (company phone or other camera device).
                  此设备为公司授权的设备 （公司移动电话或其他相机设备)。 (Please list all devices. 请列出全部设备。)</span></p>
                </div>
              </div>
              </div>


      <div>
				<div>
					 <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> &nbsp;Shooting Location 拍照地点  </label>
          <a type="button" target='_blank' :href="GL.getURL('/photoPermit/download')"  style="padding-right: 0;" title="DQ and DL plant map with different zones " class="btn"> 
												<i class="fa fa-info-circle" style="font-size: 20px;"></i>
											</a>
									
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									 <label for="" style="font-size: 15px;font-weight:normal;" ><i class="fa fa-asterisk text-red" style="font-size: 10px;" v-if="form.inZone=='true' || form.inZone"></i>&nbsp; <span style="text-decoration:underline;">Internal Zone 内部区域</span> </label>&nbsp;&nbsp;&nbsp;<input  type="checkbox" id="inZone" v-model="form.inZone"  :disabled="readonly">
                  <!-- <input type="text" v-if="form.inZone=='true' || form.inZone" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('internalZoneDesc') }"  id="internalZoneDesc" name="internalZoneDesc" v-validate="'required'"  placeholder="Please specify"   v-model="form.internalZoneDesc" :readonly="readonly || !(form.inZone=='true' || form.inZone)">
                  
                  <input type="text" v-else :class="{'form-control':true,'pull-left': true,'input':true,'price':true}"  id="internalZoneDesc" name="internalZoneDesc"  placeholder="Please specify"   v-model="form.internalZoneDesc" :readonly="readonly || !(form.inZone=='true' || form.inZone)"> -->
								<textarea style="resize:vertical;" v-if="form.inZone=='true' || form.inZone" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('internalZoneDesc') }" id="internalZoneDesc" name ="internalZoneDesc" rows="2" placeholder="" v-validate="'required'" v-model="form.internalZoneDesc"  :readonly="readonly || !(form.inZone=='true' || form.inZone)"></textarea>
               <textarea style="resize:vertical;" v-else :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('internalZoneDesc') }" id="internalZoneDesc" name ="internalZoneDesc" rows="2" placeholder=""  v-model="form.internalZoneDesc"  :readonly="readonly || !(form.inZone=='true' || form.inZone)"></textarea>
                </div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for=""> &nbsp; </label>
                  <p><span class="text-muted" style="font-size: 15px;margin-top: 10px; "><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;In the internal zone, VWATJ employees are allowed to take pictures with authorized company phone or company camera. For external visitors, please give detailed description of the location. e.g. other office, production halls, outside of workshop and guardhouses. 
在内部区域，VWATJ员工允许使用授权公司电话和相机进行拍照。对于外部人员，请列出区域详细说明。例如，其他办公室， 生产区域，外围区域和保安室。(Please fill out the form in English and Chinese, 300 characters max. 请用中英文填写，最多填写300个字节。)</span></p>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
               

          
            
            
            
            <div class="form-group">
                  <label><label for="" style="font-size: 15px;font-weight:normal;" >&nbsp;&nbsp;&nbsp; <span style="text-decoration:underline;">Confidential Zone 机密区域</span></label></label>
                  <div class="radio mar-top-0">
                    <label v-bind:key="index" v-for="(entry,index) in form.confidentialZoneList">
                      <input :id="entry.id" type="checkbox" v-model="entry.queryFlag" :disabled="readonly" @change="checkProcess">
                        {{entry.areaName}}&nbsp;&nbsp;<span v-if="entry.comments=='Declined'&& (entry.isShow=='true'||bomShow || formUser == localUser)" style="color:red;font-size:15px;"><i class="fa fa-fw fa-close text-red" style="font-size: 25px;" ></i></span><span v-if="entry.comments=='Authorized'&& (entry.isShow=='true'||bomShow || formUser == localUser)" style="color:green;font-size:15px;"><i class="fa fa-fw fa-check" style="font-size: 25px;"></i></span>
                        <a  href="javascript:;" v-if="buHeadShow && entry.isShow=='true' && form.creatorUserId!=localUser" @click="reject(index)" class="text-red opt-edit">Declined </a>&nbsp;&nbsp; 
                        <a  href="javascript:;" v-if="buHeadShow && entry.isShow=='true' && form.creatorUserId!=localUser" @click="approve(index)" class="text-green opt-edit">Authorized </a>&nbsp;&nbsp;
                    </label>
                    <!-- <label class="mar-left-18">
                     <input id="cf" type="checkbox" value="cf" :disabled="readonly" v-model="form.confidentialZone">
                  CF Office / 财务办公室
                    </label>
                    <label class="mar-left-18" >
                      <input id="ch" type="checkbox" value="ch" :disabled="readonly" v-model="form.confidentialZone">
                   CH Office / 人事办公室
                    </label>
                    <label class="mar-left-18">
                     <input id="it" type="checkbox" value="it" :disabled="readonly" v-model="form.confidentialZone">
                   IT Patch Room  / IT机房
                    </label> -->
                   </div>
                </div>
            </br>
            <div class="form-group">
                  <label><label for="" style="font-size: 15px;font-weight:normal;" >&nbsp;&nbsp;&nbsp; <span style="text-decoration:underline;">Secret Zone 绝密区域</span> </label></label>
                  <div class="radio mar-top-0">
                    <label v-bind:key="index" v-for="(entry,index) in form.secretZoneList">
                      <input :id="entry.id"  type="checkbox" :disabled="readonly" v-model="entry.queryFlag" @change="checkProcess">
                   {{entry.areaName}} &nbsp;&nbsp;<span v-if="entry.comments=='Declined'&& (entry.isShow=='true'||bomShow || formUser == localUser)" style="color:red;font-size:16px;"><i class="fa fa-fw fa-close text-red" style="font-size: 25px;" ></i></span><span v-if="entry.comments=='Authorized'&& (entry.isShow=='true'||bomShow || formUser == localUser)" style="color:green;font-size:16px;"><i class="fa fa-fw fa-check" style="font-size: 25px;"></i></span>
                   <a v-if="buHeadShow && entry.isShow=='true' && form.creatorUserId!=localUser" @click="rejectSec(index)" href="javascript:;" class="text-red opt-edit">Declined </a>&nbsp;&nbsp; 
                   <a v-if="buHeadShow && entry.isShow=='true' && form.creatorUserId!=localUser" @click="approveSec(index)" href="javascript:;" class="text-green opt-edit">Authorized </a>&nbsp;&nbsp;
                    </label>
                   <!--  <label class="mar-left-18">
                     <input id="tqaBasic1" value="tqaBasic1" type="checkbox" :disabled="readonly" v-model="form.secretZone">
                   EAZ TAQ Basic 1 / TQA办公室
                    </label>
                    <label class="mar-left-18" >
                      <input id="tqaBasic2" value="tqaBasic2" type="checkbox" :disabled="readonly" v-model="form.secretZone">
                   EAZ TAQ Basic 2 / TAQ一楼入口
                    </label>
                    <label class="mar-left-18">
                     <input id="tdArea" value="tdArea" type="checkbox" :disabled="readonly" v-model="form.secretZone">
                  EAZ TD Area / 研发区域
                    </label>
                    <label class="mar-left-18">
                      <input id="H3a" value="H3a" type="checkbox" :disabled="readonly" v-model="form.secretZone">
                   H3a TD Workshop / H3a研发区域
                    </label> -->

                  </div>
                </div>

          </div>
        </form>
      </div>



  <!-- 时间与区域 end -->
    
     <!-- 拍摄目的 starts-->
       <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i><h3 class="box-title"> Shooting Purpose 具体拍照目的 </h3>
          <span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;This field has to be filled in English and Chinese, 300 Characters Max. (此处需用英语和中文同时描述，最多300字。)</span>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
            <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('description') }" id="description" name ="description" rows="2" placeholder="" v-validate="'required'" v-model="form.description" :disabled="readonly"></textarea>
            </div>
          </div>
        </div>
      </div>
    <!-- 拍摄目的 end-->


    <!-- 外部拍摄人员信息 starts-->
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">External Visitor Information 外部拍摄人员信息</h3>
          &nbsp;&nbsp;</h3><label><input type="checkbox"  id="onboard" v-model="form.onboard" :disabled="readonly"></label>
           <span class="text-muted"> Please check here for adding external visitor information. 请勾选此处添加外部人员信息。 </span>
         <span class="text-muted" tyle="font-size: 15px;">&nbsp;&nbsp;&nbsp;<i class="fa  fa-info-circle" ></i>&nbsp;External visitors always have to be accompanied by applicant. 外部人员需由申请人全程陪同。</span>
      </div>
        <div class="box-body" v-if="form.onboard">
          <div class="row">
            <div class="form-group">
              <div class="col-md-12">

                <table class="table table-bordered mar-bot-0">
                  <tbody>
                  <tr>
                   <th><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> &nbsp;External Visitor Name / 外部拍摄人员姓名</th>
                    <th><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> &nbsp;ID No./ 身份证号 </th>
                    <th><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> &nbsp;External Visitor Company / 申请人公司</th>
                    <th><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> &nbsp;Telephone / 联系电话</th>
                    <th width="5%" v-if="!readonly" class="text-center">
                      <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.evInformationsList">
                  
                    <td>
                      <input type="hidden" class="form-control" id="" v-model="entry.id">
                      <form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.externalVisitor" :name="'externalVisitor'+(index+1)"></form-group>
                    </td>
                    <td><form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.idNo" :name="'idNo'+(index+1)"></form-group></td>
                    <td><form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.externalVisitorCompany" :name="'externalVisitorCompany'+(index+1)"></form-group></td>
                    <td><form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.telephone" :name="'telephone'+(index+1)"></form-group></td>
                    <td v-if="!readonly" class="text-center" style="vertical-align: middle;">
                      <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 外部拍摄人员信息 ends-->

      <div class="checkbox mar-bot-20" v-if="!readonly">
       <label>
								<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  				<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
               				 </label>
      </div>
      <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>
      <router-view v-if="!buHeadShow" :form="form" entityId="PhotoPermit" vclass="btn-left" uri="/form/PhotoPermit/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit"></router-view>
      <savewithback v-else :form="form" uri="/photoPermit/save"  lableName="Confirm" v-on:beforeapprovel="beforeapprovel" :validator="this.$validator"></savewithback>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>

    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";

export default {
  name: "PhotoPermit",
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
        this.form.creatorPhoneNum = this.tempcreatorPhoneNum;
        this.form.creatorDept = this.tempcreatorDept;
        this.form.creatorEmail = this.tempcreatorEmail;
      }
    },
    doAfterSelectOtherPerson: function(data) {
      $("#selectotherperson").attr("class", "input-group-btn");
      //console.log(data);
      this.form.applicantUserId = data.id;
      this.form.creatorUserId = data.id;
      this.form.creatorStaffcode = data.staffCode;
      this.form.creatorName = data.printENName;
      this.form.creatorPhoneNum = data.telephone;
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
    },
    //提交前检验
    beforesubmit: function() {
      // var templist=this.form.confidentialZoneList;
      // var sectemplist=this.form.secretZoneList;

      // this.form.flag = 'N';
      // 	if(templist!=null&&templist.length>0){
      //     for(var tempdev in templist){
      // 		 if(templist[tempdev].queryFlag || templist[tempdev].queryFlag=='true'){

      //         this.form.flag = 'Y';

      //        break;
      //       }
      //     }

      //   }
      //     if(this.form.flag == 'N'){
      //       if(sectemplist!=null&&sectemplist.length>0){
      //         for(var tempdev in sectemplist){
      //           if(sectemplist[tempdev].queryFlag ||sectemplist[tempdev].queryFlag=='true'){
      //             this.form.flag = 'Y';
      //             break;
      //           }
      //         }
      //       }
      //     }
      // console.log(this.form.flag);

      if (!this.form.inZone && this.form.flag == "N") {
        $.alert(
          "Please choose at least shooting location. 请至少选择一个拍照地点。"
        );
        this.form.submitstatus = false;
        return;
      } else {
        this.form.submitstatus = true;
      }
       if (!this.form.onboard && this.form.flag == "N") {
        $.alert(
          "In the internal zone, VWATJ employee are allowed to take pictures with authorized company phone or company camera. In such case application for photo permit is not needed. 在内部区域，VWATJ员工允许使用授权公司电话和相机进行拍照。无需申请拍照许可。"
        );
        this.form.submitstatus = false;
      } else {
        this.form.submitstatus = true;
      }

    },
    //检查approve之前是否审核
    beforeapprovel: function() {
      var templist = this.form.confidentialZoneList;
      var sectemplist = this.form.secretZoneList;
      var aa = true;
     this.$root.actProcessType="approve";
       this.form.approveInfo='reject';
      if (templist != null && templist.length > 0) {
        for (var tempdev in templist) {
          if (templist[tempdev].isShow == "true" &&(templist[tempdev].comments == "" ||templist[tempdev].comments == null)) {
            $.alert("Please review the application area. 请审核申请的区域。" );
            this.form.approvelstatus = false;
            aa = false;
            break;
          }
          else{
            this.form.approvelstatus = true;
          }
           if (templist[tempdev].isShow == "true") {
             if(templist[tempdev].comments == "Authorized"){
                 this.form.approveInfo='approve';
             }
             if(templist[tempdev].comments == "Declined"){
               
                	this.$root.actProcessType="reject";
             }
        }
      }
      }
       if (aa) {
        if (sectemplist != null && sectemplist.length > 0) {
          for (var tempdev in sectemplist) {
            if (sectemplist[tempdev].isShow == "true" &&(sectemplist[tempdev].comments == "" ||sectemplist[tempdev].comments == null) ){
              $.alert("Please review the application area. 请审核申请的区域。");
               this.form.approvelstatus = false;
                break;
            }else{
            this.form.approvelstatus = true;
            }
            if (sectemplist[tempdev].isShow == "true") {
             if(sectemplist[tempdev].comments == "Authorized"){
                 this.form.approveInfo='approve';
             }
             if(sectemplist[tempdev].comments == "Declined"){
                	this.$root.actProcessType="reject";
                  
             }
          }
        }
      }
       }
     
      
    },

    //检查是否勾选机密区域和绝密区域
    checkProcess: function() {
      var templist = this.form.confidentialZoneList;
      var sectemplist = this.form.secretZoneList;
      console.log(111);
      this.form.flag = "N";
      if (templist != null && templist.length > 0) {
        for (var tempdev in templist) {
          if (
            templist[tempdev].queryFlag ||
            templist[tempdev].queryFlag == "true"
          ) {
            this.form.flag = "Y";

            break;
          }
        }
      }
      if (this.form.flag == "N") {
        if (sectemplist != null && sectemplist.length > 0) {
          for (var tempdev in sectemplist) {
            if (
              sectemplist[tempdev].queryFlag ||
              sectemplist[tempdev].queryFlag == "true"
            ) {
              this.form.flag = "Y";
              break;
            }
          }
        }
      }
      console.log(this.form.flag);
    },

    //添加一列
    insertItineraryRows: function() {
      var newItem = {};
      for (var key in this.form.evInformationsList[0]) {
        newItem[key] = "";
      }
      this.form.evInformationsList.push(newItem);
    },
    //表格行删除调用方法
    deleteItineraryRows: function(rowId) {
      if (this.form.evInformationsList.length > 1) {
        this.form.evInformationsList.splice(rowId, 1);
      } else {
        $.alert(
          "At least one complete record in external visitor information is needed. 至少需要填写一条完整的外部拍摄人员信息。"
        );
      }
    },
    //机密区域的审核
    approve: function(index) {
      var _this = this;
      $.confirm({
        title: "Information:",
        content: "Are you sure to authorize photo permit to this area? 你确定允许此区域的拍照吗?",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              _this.form.confidentialZoneList[index].comments = "Authorized";
            }
          },
          cancel: {
            text: "No",
            btnClass: "",
            keys: ["esc"],
            action: function() {
              //alert("你点击了取消按钮！")
            }
          }
        }
      });
    },

    reject: function(index) {
      var _this = this;
      $.confirm({
        title: "Information:",
        content: "Are you sure to decline photo permit for this area? 你确定拒绝此区域的拍照吗?",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              _this.form.confidentialZoneList[index].comments = "Declined";
            }
          },
          cancel: {
            text: "No",
            btnClass: "",
            keys: ["esc"],
            action: function() {
              //alert("你点击了取消按钮！")
            }
          }
        }
      });
    },
    //绝密区域的审核
    approveSec: function(index) {
      var _this = this;
      $.confirm({
        title: "Information:",
        content: "Are you sure to authorize photo permit to this area? 你确定允许此区域的拍照吗?",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              _this.form.secretZoneList[index].comments = "Authorized";
            }
          },
          cancel: {
            text: "No",
            btnClass: "",
            keys: ["esc"],
            action: function() {
              //alert("你点击了取消按钮！")
            }
          }
        }
      });
    },

    rejectSec: function(index) {
      var _this = this;
      $.confirm({
        title: "Information:",
        content: "Are you sure to decline photo permit for this area? 你确定拒绝此区域的拍照吗?",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "",
            keys: ["enter"],
            action: function() {
              _this.form.secretZoneList[index].comments = "Declined";
            }
          },
          cancel: {
            text: "No",
            btnClass: "",
            keys: ["esc"],
            action: function() {
              //alert("你点击了取消按钮！")
            }
          }
        }
      });
    },

    changeTableCol: function(key) {
      return this.$t(key);
      /*return key;*/
    }
  },
  	watch:{

			"form.inZone":{
				handler(curVal,oldVal){
          console.log(curVal);
				if(!curVal){
        
          this.form.internalZoneDesc="";
        }
				},
				deep:true
			}
    },
  data() {
    //返回的数据对象
    var dm = {};

    //判断是创建还是获取
    var taskId = this.$route.params.taskId || this.$route.query.taskId;
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      if(taskId){
      var url = "/photoPermit/get/" + id+"/"+taskId;
      }else{
        	var url = "/form//photoPermit/get/"+id;
      }
    } else {
      var url = "/form/photoPermit/create/";
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

    dm.tempcreatorUserId = dm.form.creatorUserId;
    dm.tempapplicantUserId = dm.form.applicantUserId;
    dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
    dm.tempcreatorName = dm.form.creatorName;
    dm.tempcreatorPhoneNum = dm.form.creatorPhoneNum;
    dm.tempcreatorDept = dm.form.creatorDept;
    dm.tempcreatorEmail = dm.form.creatorEmail;
    dm.tempbuHead = dm.form.buHead;
    dm.tempdateOfBirth = dm.form.dateOfBirth;
    dm.tempdirectSupervisor = dm.form.directSupervisor;
    dm.tempcnName = dm.form.cnName;
    return dm;
  },
 
  //在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
  mounted() {
    var form = this.form;
    //初始化数字加,展示
    var _this = this;
    
    
  $("#cameraModel").on("blur", function() {
      var reg = /^[0-9]*$/;
      if ($(this).attr("readonly")) {
        //只读不做操作
      } else {
        if ($(this).val()) {
          var value = $(this).val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;

          //当填写的字节数小于设置的字节数
          if (length * 1 <= 300 * 1) {
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
          var istar = newvalue.substr(300 * 1 - 1, 1); //校验点是否为“×”

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
          $.alert("300 Characters Max for Camera Model. 相机型号最多只能填写300个字节。");

          form.cameraModel = limitvalue;
        }
      }
    });




    $("#description").on("blur", function() {
      var reg = /^[0-9]*$/;
      if ($(this).attr("readonly")) {
        //只读不做操作
      } else {
        if ($(this).val()) {
          var value = $(this).val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;

          //当填写的字节数小于设置的字节数
          if (length * 1 <= 300 * 1) {
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
          var istar = newvalue.substr(300 * 1 - 1, 1); //校验点是否为“×”

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
          $.alert("300 Characters Max for shooting purpose. 拍照目的最多只能填写300个字节。");

          form.description = limitvalue;
        }
      }
    });


    $("#internalZoneDesc").on("blur", function() {
      var reg = /^[0-9]*$/;
      if ($(this).attr("readonly")) {
        //只读不做操作
      } else {
        if ($(this).val()) {
          var value = $(this).val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;

          //当填写的字节数小于设置的字节数
          if (length * 1 <= 300 * 1) {
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
          var istar = newvalue.substr(300 * 1 - 1, 1); //校验点是否为“×”

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
          $.alert("300 Characters Max for specify. 详情最多只能填写300个字节。");

          form.internalZoneDesc = limitvalue;
        }
      }
    });
    if (this.processTaskKey) {
      this.form.processTaskKey = this.processTaskKey;
      console.log(this.form.processTaskKey);
    } else {
      this.form.processTaskKey = "usero";
      console.log(this.form.processTaskKey);
    }

    if (this.processTaskId) {
      this.form.processTaskId = this.processTaskId;
      console.log(this.form.processTaskId);
    } else {
      this.form.processTaskId = "111";
      console.log(this.form.processTaskId);
    }

    //放在save，submit是数据在数据库中保存两次
    this.$root.eventHub.$off("updateFormData");
    this.$root.eventHub.$on("updateFormData", form => {
      this.form = form;
      var parts = this.form.createDate.match(/\d+/g);
      this.form.createDate = parts[0] + "-" + parts[1] + "-" + parts[2];
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
    buHeadShow: {
      // 动态计算是否显示confirm按钮
      get: function() {
        return (
          this.$route.query.taskKey != null &&
          this.$route.query.taskKey.indexOf("buHead") != -1 &&
          (this.$route.path.indexOf("audit") > -1 ||
            this.$route.path.indexOf("reAudit") > -1)
        );
      }
    },
    bomShow: {
      // 动态计算是否显示confirm按钮
      get: function() {
        return (
          this.$route.query.taskKey != null &&
          this.$route.query.taskKey.indexOf("BOM") != -1 &&
          (this.$route.path.indexOf("audit") > -1 ||
            this.$route.path.indexOf("reAudit") > -1)
        );
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
    disabled: {
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

 		localUser: {
      // 动态计算processTaskId的值
      get: function() {
        return localStorage.getItem("uid");
      }
		},
		formUser: {
      // 动态计算processTaskId的值
      get: function() {
        return this.form.createUserId;
      }
    },

    applicationTime: {
      get: function() {
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
</style>

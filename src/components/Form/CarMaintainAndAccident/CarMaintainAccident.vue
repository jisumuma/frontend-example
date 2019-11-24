<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Company Car Repair | Maintenance | Accident</h1>
      <ol class="breadcrumb">
       <li><a >1.Applicant</a></li>
        <li><a >2.Admin Fleet Manager</a></li>
        <li><a >3.Head of Administration</a></li>
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
          <h3 class="box-title">Application Information&nbsp;申请人信息</h3>
        		<label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label>
             <!-- <button type="button" class="btn btn-box-tool btn-sm pull-right" id="baseext-hide-show" > Hide</button> -->
         <button type="button" class="btn btn-primary btn-sm pull-right" data-toggle="collapse" id="baseext-hide-show" href="#collapseZerowp"><i class="fa fa-plus" id="minusplusiwp"></i></button>
         </div>
        <form role="form">
          <input type="hidden" v-model="form.id" name="id">
          <input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
          <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
          <div class="box-body">
            <div class="row">
             		<!--不选中的时候显示-->
							<form-group v-if="!onbehalf" other-rules="required" col="md-3" type="input" v-model="form.carUserName" name="carUserName" readonly="readonly"  label="CarMaintainAndAccident.carUserName"></form-group>
							<!--选中的时候显示-->
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 {{$t("CarMaintainAndAccident.carUserName")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" id="carUserName" name="carUserName" v-model="form.carUserName" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    	</span>
									</div>
								</div>
							</div>
              <form-group col="md-3" type="input"  v-model="form.staffCode" name="staffCode" readonly="readonly" label="CarMaintainAndAccident.staffCode"></form-group>
              <form-group col="md-3" type="input"  v-model="form.department" name="department" readonly="readonly" label="CarMaintainAndAccident.department"></form-group>
             							<form-group col="md-3" type="input" v-model="form.telephone" name="telephone" readonly="readonly" label="CarMaintainAndAccident.telephone"></form-group>
            </div>
           <div class="row base-ext">
               <form-group col="md-3" type="input"  v-model="form.costCenter" name="costCenter" readonly="readonly" label="CarMaintainAndAccident.costCenter"></form-group>
            	 <form-group col="md-3" type="input"  v-model="form.mobile" other-rules="required|max:300"  name="mobile" :readonly="!readonlyForCc" label="CarMaintainAndAccident.mobile"></form-group>
              <form-group col="md-3" type="input"  v-model="form.email" name="email" readonly="readonly" label="CarMaintainAndAccident.email"></form-group>
            </div>
          </div>
        </form>
      </div>
      <div class="box box-primary" >
        <div class="box-header with-border">
         <i class="fa fa-asterisk text-required-header"></i>
          <h3 class="box-title">Company Car Information&nbsp;车辆信息</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
              <form-group col="md-3" type="input" :readonly="readonly" v-model="form.carModel" name="carModel" other-rules="required|max:300" label="CarMaintainAndAccident.carModel" hideRisk=true></form-group>
              <form-group col="md-3" type="input" :readonly="readonly" v-model="form.plateNumber" name="plateNumber" other-rules="required|max:300" label="CarMaintainAndAccident.plateNumber" hideRisk=true> </form-group>
              <form-group col="md-3" type="input" :readonly="readonly" v-model="form.currentCarMilage" name="currentCarMilage" other-rules="required|max:300|regex:^-?\d*\.?\d*$" label="CarMaintainAndAccident.currentCarMilage" hideRisk=true></form-group>
              <form-group col="md-3"  type="select" :readonly="readonly"  uri="/dict/list?groupName=parkingArea" name="parkingArea" v-model="form.parkingArea" tags="false" other-rules="required" hideRisk=true label="CarMaintainAndAccident.parkingArea"></form-group>
            </div>
          </div>
        </form>
      </div>
      <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-required-header"></i>
          <h3 class="box-title">Repair | Maintenance | Accident Information 维修 | 保养 | 事故信息</h3>
         </div>
        <form role="form">
          <div class="box-body">
            <div class="row">
                 <!-- Unnamed (Radio Button) -->
                 <div class="col-md-2 form-group" style="width: 90px;">
                   <div class="radio ">
                      <label>
                         <input id="u282_input"  v-model="form.applicationType" :disabled="readonly"  type="radio" value="Repair"  @click="clearAccidentData()" name="applicationType" checked />
                      <b>Repair</b>
                      </label>
                    </div>
                 </div>
                 <div class="col-md-2 form-group" style="width: 130px;">
                   <div class="radio ">
                      <label>
                            <input id="u286_input" type="radio"  v-model="form.applicationType" :disabled="readonly"  @click="clearAccidentData()"  value="Maintenance" name="applicationType" />
                      <b>Maintenance</b>
                      </label>
                    </div>
                 </div>
                <div class="col-md-2 form-group">
                   <div class="radio ">
                      <label>
                          <input id="u284_input" type="radio"  v-model="form.applicationType" :disabled="readonly"  value="Accident" name="applicationType" @click="clearRepairData()" />
                         <b>Accident</b>
                      </label>
                    </div>
                 </div>
            </div>
            <div id="ForMaintainCar" class="row" v-if="hideShow">
                <div class="col-md-12">
                  <div class="form-group">
                    	<label >
                         Repair & Maintenance Items 维修保养项目
                      </label>
                    <textarea-my  rows="5" other-rules="required|max:300"  placeholder="Please fill in repair & maintenance details. 请输入维修和保养细节." :readonly="readonly" v-model="form.carMaintainDesc" name="carMaintainDesc" id="carMaintainDesc"></textarea-my>
                  </div>
                </div>
             </div>
            <div id="ForAccident" v-if="!hideShow">
                <div class="row" >
                    <!-- <div class="col-md-4">
                          <div class="form-group">
                            <form-group   type="daterangepicker" showTime="true" v-validate="'required'"  other-rules="required" v-model="form.accidentTime" name="accidentTime" :readonly="readonly" label="CarMaintainAndAccident.accidentTime" hideRisk=true></form-group>
                          </div>
                    </div> -->
                  <form-group col="md-4" type="singledaterangepicker" other-rules="required" :readonly="readonly" v-model="form.accidentTime" name="accidentTime" v-validate="'required'" hideRisk=true label="CarMaintainAndAccident.accidentTime" :singleDatePicker="true" :init="true"></form-group>
                  <form-group col="md-4" type="input2" :readonly="readonly" v-model="form.companyCarDriverName" other-rules="max:300" name="companyCarDriverName" label="CarMaintainAndAccident.companyCarDriverName"  titleTips="If not official company car user or applicant, need to upload the actual driver’s ID copy and driver’s license 如不是正式公司汽车使用人或申请人，需要上传实际司机身份证和驾驶执照"> </form-group>
                  <form-group col="md-4" type="input" :readonly="readonly" v-model="form.companyCarDriverLicense" other-rules="max:300" name="companyCarDriverLicense" label="CarMaintainAndAccident.companyCarDriverLicense"> </form-group>
                </div> 
                <div class="row">
                  <form-group col="md-4" type="input" :readonly="readonly" v-model="form.otherDriverName" other-rules="required|max:300" name="otherDriverName" label="CarMaintainAndAccident.otherDriverName" hideRisk=true></form-group>
                  <form-group col="md-4" type="input" :readonly="readonly" v-model="form.otherDriverTel"  other-rules="required|max:300" name="otherDriverTel" label="CarMaintainAndAccident.otherDriverTel" hideRisk=true> </form-group>
                  <form-group col="md-4" type="input" :readonly="readonly" v-model="form.otherDriverNumberPlate" other-rules="required|max:300" name="otherDriverNumberPlate" label="CarMaintainAndAccident.otherDriverNumberPlate" hideRisk=true> </form-group>
                </div>
                <div class="well well-sm">
                    <div class="row">
                      <div class="col-md-4 form-group">
                          <div class="radio ">
                              <label>
                                  <input  type="radio"  v-model="form.accidentType" :disabled="readonly" value="Traffic" name="accidentType" checked="true"/>
                                <b>Traffic Accident 交通事故</b>
                              </label>
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                          <div class="radio ">
                              <label>
                                  <input type="radio"  v-model="form.accidentType" :disabled="readonly"  value="Non-Traffic" name="accidentType"/>
                                <b>Non-Traffic Accident 独立事故</b>
                              </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                          <div class="checkbox ">
                              <label>
                                  <input  type="checkbox"  v-model="form.hasInjuredOrDead" :disabled="readonly" name="hasInjuredOrDead"/>
                                <b>Person Injured or Dead 有人员伤亡</b>
                              </label>
                            </div>
                        </div>
                      <div class="col-md-8" id="otherDesDiv">
                          <div class="checkbox row">
                            <div class="col-sm-2">
                              <label>
                                  <input type="checkbox" :disabled="readonly"  v-model="form.others"  name="others"/>
                                <b>Others 其他</b>
                              </label>
                            </div>
                            <div class="col-sm-10" style="padding-left:0;" v-if="hideOtherdesc">
                              <textarea style="resize:vertical;" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('othersDesc') }" id="othersDesc" name ="othersDesc" rows="2" placeholder="" v-validate="'required'" v-model="form.othersDesc" @blur="checkOthersDesc()"  :readonly="readonly"></textarea>
                                <p>300 characters max  (最多填写300个字节)</p>         
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="well well-sm">
                  <div class="row">
                        <div class="col-md-4">
                              <div class="form-group">
                                <label>
                                  Did you call the police? 是否通知警察?
                                </label>
                              </div>
                          </div>
                          <div class="col-md-4">
                              <div class="form-group">
                                  <div class="radio mar-top-0" :class="{'is-danger': errors.has('didCallPolice') }">
                                      <label class="mar-left-40" style="font-weight:bold;">
                                        <input type="radio" name="didCallPolice" v-validate="'required'" value="Y" :disabled="readonly" v-model="form.didCallPolice" >
                                        Yes
                                      </label>
                                      <label class="mar-left-20" style="font-weight:bold;">
                                        <input type="radio" name="didCallPolice" v-validate="'required'"  value="N" :disabled="readonly" v-model="form.didCallPolice">
                                        No
                                      </label>
                                    </div>
                              </div>
                          </div>
                  </div>
                  <div class="row">
                        <div class="col-md-4">
                              <div class="form-group">
                                <label>
                                Did you call the insurance company?  是否通知保险公司?
                                </label>
                              </div>
                          </div>
                          <div class="col-md-4">
                              <div class="form-group">
                                  <div class="radio mar-top-0" :class="{'is-danger': errors.has('didCallInsuranceCompany') }">
                                      <label class="mar-left-40" style="font-weight:bold;">
                                        <input type="radio"  v-validate="'required'"  :class="{'is-danger': errors.has('didCallInsuranceCompany') }"  name="didCallInsuranceCompany" :disabled="readonly" value="Y" v-model="form.didCallInsuranceCompany" >
                                        Yes
                                      </label>
                                      <label class="mar-left-20" style="font-weight:bold;">
                                        <input type="radio"  v-validate="'required'" name="didCallInsuranceCompany" :class="{'is-danger': errors.has('didCallInsuranceCompany') }"  :disabled="readonly" value="N" v-model="form.didCallInsuranceCompany">
                                        No
                                      </label>
                                    </div>
                              </div>
                          </div>
                  </div>
                  <div class="row">
                        <div class="col-md-4">
                              <div class="">
                                <label>
                                  Accident Responsibility 事故责任
                                </label>
                              </div>
                          </div>
                          <form-group col="md-4" haslable="false" :readonly="readonly"  type="select"  uri="/dict/list?groupName=accidentResponsibility" name="accidentResponsibility" v-model="form.accidentResponsibility" tags="false" other-rules="required"></form-group>
                  </div>
                </div>
                <div class="row">
                   <div class="col-md-12">
                      <div class="form-group">
                          <label>
                           Accident Location 事故地点   
                          </label>
                        <textarea-my  rows="5"  :readonly="readonly" v-model="form.accidentLocation" name="accidentLocation" id="accidentLocation"></textarea-my>
                      </div>
                   </div>
                </div>
                <div class="row">
                   <div class="col-md-12">
                      <div class="form-group">
                          <label >
                           Accident Description 事故过程描述
                          </label>
                        <textarea-my  rows="5"  :readonly="readonly" v-model="form.accidentDescription" name="accidentDescription" id="accidentDescription"></textarea-my>
                      </div>
                   </div>
                </div>

                <div class="row">
                   <div class="col-md-12">
                      <div class="form-group">
                          <label>
                           Accident Repair Items 事故维修项目
                          </label>
                        <textarea-my  rows="5"  placeholder="Please fill in repair details. 请输入具体维修项目." :readonly="readonly" v-model="form.accidentRepairItems" name="accidentRepairItems" id="accidentRepairItems"></textarea-my>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </form>
      </div>
      <!-- 上传附件starts  -->
        <div class="box box-primary" v-if="this.form.applicationType!='Accident'">
          <div class="box-header with-border">
          <h3 class="box-title"> Upload Attachment 上传附件</h3>
          <label>(please upload the responsibility certificate and/or insurance form 请上传事故责任认定书和/或保险公司出险单)</label>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                 <upload2 :readonly="!readonlyForCc" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" required="false" fileSizeLimit="5MB"></upload2>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="box box-primary" v-else>
         <div class="box-header with-border">
          <h3 class="box-title"> <i class="fa fa-asterisk text-required-header" ></i> Upload Attachment 上传附件</h3>
           <label>(please upload the responsibility certificate and/or insurance form 请上传事故责任认定书和/或保险公司出险单)</label>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <upload2 :readonly="!readonlyForCc" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" fileSizeLimit="5MB"></upload2>
              </div>
            </div>
          </div>
        </div>
      </div>
       <!-- 上传附件end  -->

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
      <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>
      <Confirmwithsavereject v-if="readonlyForFlt" :form="form" :validator="this.$validator"
				 lableName="Approve" rejectLableName="Reject" uri="/CarMaintainAndAccident/save" v-on:beforeapprovel="beforesubmit" ></Confirmwithsavereject>
        
      <Confirmwithsave v-else-if="readonlyForHrbp" :form="form" :validator="this.$validator" lableName="Confirm" uri="/CarMaintainAndAccident/save" v-on:beforeapprovel="beforesubmit" ></Confirmwithsave>
      <router-view v-else :form="form" entityId="CarMaintainAndAccident" vclass="btn-left" uri="/form/CarMaintainAndAccident/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>

    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
import daterangepicker from "bootstrap-daterangepicker"
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
  name: "CarMaintainAndAccident",
  methods: {
        beforesubmit: function() {
       },
       hideOrShow:function(){
              if(this.form.applicationType=="Repair" || this.form.applicationType=="Maintenance"){
                // $("#ForMaintainCar").css("display","block");
                // $("#ForAccident").css("display","none");
                this.form.accidentType=null;
                return true;
              }else{
                  // $("#ForMaintainCar").css("display","none");
                  // $("#ForAccident").css("display","block");
                if(this.form.accidentType == null || this.form.accidentType==""){
                  this.form.accidentType="Traffic";
                }
                return false;
              }
        },
      onbehalfclick: function() {

				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId = this.tempapplicantUserId;
					this.form.staffCode = this.tempcreatorStaffcode;
					this.form.carUserName = this.tempcreatorName;
					this.form.telephone = this.tempcreatorPhoneNum;
					this.form.department = this.tempcreatorDept;
          this.form.email = this.tempemail;
          this.form.costCenter = this.tempcostCenter;
          this.form.mobile = this.tempmobile;
				}
      },
    	doAfterSelectOtherPerson: function(data) {
				$('#selectotherperson').attr("class", "input-group-btn");
				//console.log(data);

				this.form.applicantUserId = data.id;

				this.form.staffCode = data.staffCode;
				this.form.carUserName = data.printENName;
				this.form.telephone = data.telephone;
				var tempdep = data.department;
				if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
					tempdep = data.division;
				}
        this.form.costCenter = data.costCenterCode;
        this.form.department = tempdep;
        this.form.mobile = data.mobile;
				this.form.email = data.email;
		

			},
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
      clearRepairData:function(){
        
        this.form.carMaintainDesc="";

      },
        clearAccidentData:function(){
        
        this.form.companyCarDriverName="";
        this.form.companyCarDriverLicense="";
        this.form.otherDriverName="";
        this.form.otherDriverTel="";
        this.form.otherDriverNumberPlate="";
        this.form.accidentType="Traffic";
        this.form.hasInjuredOrDead="";
        this.form.others="";
        this.form.othersDesc="";
        this.form.didCallPolice="";
        this.form.didCallInsuranceCompany="";
        this.form.accidentResponsibility="";
        this.form.accidentLocation="";
        this.form.accidentDescription="";
        this.form.accidentRepairItems="";
                     

      }
      
  },
  data() {
    //返回的数据对象
    var dm = {};

    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/CarMaintainAndAccident/get/" + id;
    } else {
      var url = "/form/CarMaintainAndAccident/create/";
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
    dm.businessTrip = false;
    dm.itServicerules="required";
      dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.staffCode;
			dm.tempcreatorName = dm.form.carUserName;
			dm.tempcreatorPhoneNum = dm.form.telephone;
			dm.tempcreatorDept = dm.form.department;
			dm.tempcostCenter = dm.form.costCenter;
      dm.tempemail = dm.form.email;
      dm.tempmobile = dm.form.mobile;
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

   if(form.applicationType == null || form.applicationType==""){
        form.applicationType ="Repair";
    } 
    
      //申请人信息显示隐藏
    $(".base-ext").hide();
    $("#minusplusiwp").addClass("fa-plus");
    var hideorshow = "0";
    $("body").on("click", "#baseext-hide-show", function() {
      if (hideorshow == "0") {
        $(".base-ext").hide();
         $("#minusplusiwp").removeClass("fa-minus");
         $("#minusplusiwp").addClass("fa-plus");
        //$("#baseext-hide-show").text("More");
        hideorshow = "1";
      } else {
        $(".base-ext").show();
         $("#minusplusiwp").removeClass("fa-plus");
         $("#minusplusiwp").addClass("fa-minus");
       // $("#baseext-hide-show").text("Hide");
        hideorshow = "0";
      }
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
    hideShow:{
      get: function() {
        return this.hideOrShow();
      }
    },
    hideOtherdesc:{
      get: function() {
         if(this.form.others==true || this.form.others=="true"){
           return true;
         }else{
           return false;
         }
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
    readonlyForCc: {
      // 动态计算readonly的值
      get: function() {
        return (
          this.form.processInstanceId == null ||
            this.form.status == null ||
            this.form.status == 2 ||
            this.form.status == 9);
      }
    },
    readonlyForHrbp: {
      // 动态计算readonly的值
      get: function() {
       // console.log("readonlyForHrbp:"+((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('hrbp') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))));
       // return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('hrbp') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
        return false;
     }
    },
     readonlyForFlt: {
      // 动态计算readonly的值
      get: function() {
   //     console.log("readonlyForFlt:"+((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('adminFleetManager') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))));
    //    return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('adminFleetManager') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
       return false;
     
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
</style>

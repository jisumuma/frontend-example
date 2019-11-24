<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Betriebsmittelanforderung/BM Application</h1>
      <ol class="breadcrumb">
        <li>
          <a>1.Applicant</a>
        </li>
        <li>
          <a>2.Cost Center Owner</a>
        </li>
        <li>
          <a>3.Compliance Officer</a>
        </li>
        <li>
          <a>4.CF Controller</a>
        </li>
        <li>
          <a>5.Head Of CF</a>
        </li>
        <li>
          <a>6.DGMT&DGMC</a>
        </li>
        <li>
          <a>7.GMC&GMT</a>
        </li>
      </ol>
     <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}} </strong>

		  </span>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"> Applicant Info. 申请人信息</h3>
          <label v-if="!readonly" style="margin: 0; margin-left: 15px;"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
        </div>
        <form role="form">
          <input type="hidden" v-model="form.id" name="id">
          <input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
          <input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">
          <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
          <!-- <input type="hidden" v-model="form.participant_ids" name="participant_ids" id="participant_ids"> -->
          <input type="hidden" v-model="form.participantInflag" name="participantInflag" id="participantInflag">
          <div class="box-body">
            <div class="row">
              <!--不选中的时候显示-->
              <form-group v-if="!onbehalf"  col="md-3" type="input" v-model="form.creatorName" name="name" readonly="readonly"></form-group>
              <!--选中的时候显示-->
              <div class="col-md-3" v-if="onbehalf">
                <div class="form-group">
                  <label for="">
                   <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
                    Name 姓名 </label>
                  <div class="input-group ">
                    <input type="text" class="form-control" placeholder="Name 中文名" id="creatorStaffcode" name="name" v-model="form.creatorName" readonly="readonly">
                    <span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
                  </div>
                </div>
              </div>
              <form-group col="md-3" type="input"  v-model="form.creatorPhoneNum" name="Telephone" :readonly="readonly"></form-group>
              <form-group col="md-3" type="input"  v-model="form.creatorDept" name="Division" readonly="readonly"></form-group>
              <form-group col="md-3" type="datepicker"   name="applicationDate" v-model="form.createDate" readonly="readonly"></form-group>
            </div>
          </div>
        </form>
      </div>


      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title pull-left">Detail Information 详细信息 </h3>

        </div>
        <form role="form">
          <div class="box-body" id="bmApplicatio">
            <div class="row">
              <div class="col-md-3" v-if="!readonly">
                <div class="form-group" >
                  <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Cost Center 成本中心 </label>
                  <div class="input-group ">
                    <input type="text" id="costCenterCode" name="costCenterCode" v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('costCenterCode') }" v-model="form.costCenterCode" placeholder="Cost Center 成本中心" value="" readonly="readonly">
                    <span class="input-group-btn" v-if="!readonly">
                          					<button type="button" class="btn btn-primary btn-flat" data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i></button>
                        				</span>
                  </div>
                </div>
              </div>
              <div class="col-md-3" v-if="readonly">
                <div class="form-group">
                  <form-group  type="input" v-model="form.costCenterCode" name="costCenterCode" readonly="readonly"></form-group>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <form-group  type="input" v-model="form.costCenterOwner" name="costCenterOwner" readonly="readonly"></form-group>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <form-group  type="input" v-model="form.costCenterName" name="costCFController" readonly="readonly"></form-group>
                </div>
              </div>
              <div class="col-md-3">
               <div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Application Amount  &nbsp;申请金额(excl.VAT)</label>
								    <div class="form-group">
										  <input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('appAmount') }" name="appAmount" style="width: 60%" id="appAmount" :readonly="readonly" v-validate="'required'" v-model="form.applicationAmountNo" placeholder="Application Amount  申请金额" value="" width="50%">
                      <input type="hidden" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('estimatedBudget') }" name="appAmount"  style="width: 70%"  :readonly="readonly" v-validate="'required'" v-model="form.applicationAmount" placeholder="Application Amount 申请金额" value="" width="70%">
                    <!-- 货币搜索 -->
										<div class="pull-left" style="position:relative;width: 30%; ">
											<span style="width:20px;overflow:hidden;" v-if="!readonly">
                            <select  style="width:80px;margin-left:-80px;height: 34px;" v-select2 v-model="form.bmApplicationUnit"  onchange="this.parentNode.nextSibling.value=this.value">
                            	 <option value="">--</option>
                              <option value="RMB">RMB</option>
                              <option value="JPY">JPY</option>
                              <option value="CHF">CHF</option>
                              <option value="EUR">EUR</option>
                              <option value="USD">USD</option>
                              <option value="GBP">GBP</option>
                            </select></span><input :class="{'form-control':true,'input':true, 'is-danger': errors.has('bmApplicationUnit'),'input-margintop-34':!readonly }" name="bmApplicationUnit" v-validate="'required'" readonly="readonly" placeholder="Currency" v-model="form.bmApplicationUnit" style="width:60px;position:absolute;left:0px;display: inline-block;padding: 10px;">
										</div>
									</div>
								</div>
              </div>

            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <form-group other-rules="required"  type="select2" uri="/bmCostElement/listforselect" :readonly="!confirmkey"  name="CostElementNameEN" v-model="form.costElementEn" @change="changedept(form.costElementEn)" ></form-group>

                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label for="">Cost Element Name(CN) 成本要素名称（中文） </label>
                  <input type="text" class="form-control" id="ElementName"  placeholder="" value=""  v-model="form.costElementCn" readonly="readonly">
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label for="">Cost Element No. 成本要素编号 </label>
                  <input class="form-control" type="text" id="ElementNo" value="" readonly="readonly" v-model="form.costElementNo">

                </div>
              </div>
              <div class="col-md-3" style="padding-top: 10px">
                <br>
                <div class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input id="governmentOfficialid" type="checkbox" :disabled="readonly" v-model="form.governmentOfficials"><strong>Government Officials 政府官员</strong></label></div>
              </div>
            </div>


            <div class="row" v-if="OtherLabor">
              <div class="col-md-6">
                <!-- This part only for "Other Labor Welfare"/ -->

                <div class="form-group">
                  <label><label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Other Labor Welfare 其他员工福利费用 </label></label>
                  <div class="radio mar-top-0">
                    <label>
                      <input type="radio" name="optionsRadios"  value="1" v-model="form.otherLaborWelfare" :disabled="readonly" @click="Laborss()">
                      Internal Entertainment
                    </label>
                    <label class="mar-left-18">
                      <input type="radio" name="optionsRadios"  value="2" v-model="form.otherLaborWelfare" :disabled="readonly" @click="Laborss()">
                      Internal Gifts
                    </label>
                    <label class="mar-left-18" v-show="false">
                      <input type="radio" name="optionsRadios"  value="3" v-model="form.otherLaborWelfare" :disabled="readonly" @click="Laborss()">
                      Internal Building
                    </label>
                    <label class="mar-left-18">
                      <input type="radio" name="optionsRadios"  value="4" v-model="form.otherLaborWelfare" :disabled="readonly" @click="otherLaborss()">
                      Workshop
                    </label>
                    <label class="mar-left-18">
                      <input type="radio" name="optionsRadios"  value="5" v-model="form.otherLaborWelfare" :disabled="readonly"  @click="otherLaborss()">
                      Other
                    </label>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i><h3 class="box-title"> Description 详述 </h3>
          <span class="text-muted"> Description need to be filled in Chinese and English or Chinese and German. 需要填写中文和英文或中文和德文。</span>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('description') }" id="description" name ="description" rows="2" placeholder="" v-validate="'required'" v-model="form.description" :disabled="readonly"></textarea>
            <p>500 Characters Max  (最多500个字符)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="box box-primary" v-if="entertainmentType" id="participantid">
        <div class="box-header with-border">
          <h3 class="box-title"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Participant Information 参与者信息</h3>
		  <div>
          <span class="text-muted">Please specify all the participants, and cost per person over 400 RMB need to be approved by GMT/GMC according to GRC policy.&nbsp;请详述所有参与者信息，根据GRC规定，人均超过400人民币需要GMT/GMC审批。</span>
          </div>
          <!-- <div id="app" class="box-body" v-show="!readonly" >
           -->
          <!-- <input type="file" @change="getFile($event)" /><button @click="upload">上传</button> -->

          <label v-show="!readonly" class="btn btn-primary btn-xs" style='margin-top: -3px;margin-left: 15px;float: right;font-size: 14px;' for="xFile2">Upload</label>
          <input v-show="!readonly" style='display: inline-block; position: absolute; clip: rect(0px, 0px, 0px, 0px);' id="xFile2"  type="file"  @change="upload" >
          <a v-show="!readonly" style='display: inline-block; margin-left: 15px;float: right;'  target='_blank' :href="GL.getURL('/bmApplication/download')"><i class='fa fa-download'></i>&nbsp; Batch Upload Template  批量上传模板</a>
         <!-- </div> -->
      </div>



        <div class="box-body">
          <div class="row">
            <div class="form-group">
              <div class="col-md-12" style="overflow-y:auto;width:100%;height:150px; width:1400px;">

                <table class="table table-bordered mar-bot-0" width="100%" height="30px">
                  <tbody>
                  <tr>
                    <th width="40px"> No.</th>
                    <th>Name  姓名</th>
                    <th>Company 公司 </th>
                    <th>Division / Dept. 部门  </th>
                    <th>Event Date  事件时间 </th>
                    <th style="width:500px;" >Remark 备注<span class="mar-left-5 text-muted" style="font-size: 12px;"><i class="fa  fa-info-circle" ></i>      Please input location or gift type 请注明地点或礼品类型</span></th>
                    <th width="5%" v-if="!readonly" class="text-center">
                      <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.participantInformationsList">
                    <td>{{ index+ 1}}</td>
                    <td>
                      <input type="hidden" class="form-control" id="" v-model="entry.id">
                      <form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.nameList" name="nameList"></form-group>
                    </td>
                    <td><form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.company" name="company"></form-group></td>
                    <td><form-group type="input" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.divisionDept" name="divisionDept"></form-group></td>
                    <td>
                      <form-group type="datepicker" other-rules="required" v-model="entry.createDate" name="eventDate" haslable="false" :readonly="readonly"></form-group>

                    </td>
                    <td><form-group type="input"  haslable="false" :readonly="readonly" v-model="entry.remark" name="remark"></form-group></td>
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

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"> <i class="fa fa-asterisk text-required"></i> Upload Attachment 上传附件 </h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true"></upload2>
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
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2017032209494257218.pdf">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2017032209494257218.pdf">大众汽车自动变速器（天津）有限公司的相关政策。</a>
               				 </label>
      </div>
      <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>
      <router-view :form="form" entityId="BmApplication" vclass="btn-left" uri="/form/BmApplication/update" :validator="this.$validator"></router-view>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>

    </section>
    <div class="modal fade" id="modal-default">
      <div class="modal-dialog" style="width: 900px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"> Choose a Cost Center 选择一个成本中心 </h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-muted well well-sm no-shadow mar-bot-10">
                  <div class="row">
                    <div class="form-group col-md-3">
                      <label for="">Code 编码</label>
                      <input type="text" class="form-control" id="codeSearch" placeholder="Code 编码">
                    </div>
                    <div class="form-group col-md-3" style="margin-bottom: 0;">
                      <label for=""> Name 名称</label>
                      <input type="text" class="form-control" id="nameSearch" placeholder="Name 名称">
                    </div>
                    <div class="form-group col-md-3">
                      <label for="">Owner 负责人</label>
                      <input type="email" class="form-control" id="ownerSearch" placeholder="Owner 负责人">
                    </div>

                    <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                      <button type="submit" class="btn btn-primary" title="选择" @click="drawcostcenter();"><i class="fa fa-fw fa-search"></i> Search</button>
                    </div>
                  </div>

                </div>
                <table class="table table-bordered table-hover" id="example2">

                  <thead>
                  <tr role="row">
                    <th>Code</th>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Controller</th>
                    <th class="text-center">Select</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>301000001</td>
                    <td>EHS</td>
                    <td>yong.ang@atd.volkswagen.com.cn</td>
                    <td>Zhou Ashuang</td>
                    <td class="text-center">
                      <a class="select"><i class="fa fa-check"></i></a>
                    </td>
                  </tr>

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
  </div>
</template>

<script>

import global_ from './../../../components/Common/Util/Global.vue'
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
  export default {
    name: 'BmApplication',
    methods: {
      //在onbehalf不勾选的时候拿去在data方法缓存的值赋值文本框
      onbehalfclick: function() {
        var temp = $("#onbehalf").is(':checked');
        this.onbehalf = temp;
        if(!temp) {
          this.form.creatorUserId = this.tempcreatorUserId;
          this.form.applicantUserId = this.tempapplicantUserId;
          this.form.creatorStaffcode = this.tempcreatorStaffcode;
          this.form.creatorName = this.tempcreatorName;
          this.form.creatorPhoneNum = this.tempcreatorPhoneNum;
          this.form.creatorDept = this.tempcreatorDept;
          this.form.creatorEmail = this.tempcreatorEmail;
          this.form.buHead = this.tempbuHead;
          this.form.dateOfBirth = this.tempdateOfBirth;
          this.form.directSupervisor = this.tempdirectSupervisor;
          this.form.cnName = this.tempcnName;
          this.form.nationality = this.tempnationality;

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
        var tempdep = data.department;
        if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
          tempdep = data.division;
        }

        this.form.creatorDept = tempdep;

        this.form.creatorEmail = data.email;
        this.form.buHead = data.buHead;
        this.form.dateOfBirth = data.dateOfBirthString;
        this.form.directSupervisor = data.directSupervisor;
        this.form.cnName = data.printCNName;
        this.form.nationality = data.nationality;

      },
      // doAfterSelectApplication: function(data) {
      //   this.form.creatorUserId = data.creatorUserId;
      //   this.form.creatorStaffcode = data.creatorStaffcode;
      //   this.form.creatorName = data.creatorName;
      //   this.form.creatorPhoneNum = data.creatorPhoneNum;
      //   this.form.creatorDept = data.creatorDept;
      //   this.form.creatorEmail = data.creatorEmail;
      //   this.form.buHead = data.buHead;
      //   this.form.dateOfBirth = data.dateOfBirth;
      //   this.form.directSupervisor = data.directSupervisor;
      //   this.form.cnName = data.cnName;
      //   this.form.nationality = data.nationality;
      //   this.form.internalOrder = data.internalOrder;
      //   //this.form.idCard = data.idCard;
      //  // this.form.passport = data.passport;
      //  // this.form.expireDateOfIdCard = data.expireDateOfIdCard;
      //  // this.form.expireDateOfPassport = data.expireDateOfPassport;

      //   this.form.costCenterCode = data.costCenterCode;
      //   this.form.costCenterName = data.costCenterName;
      //   this.form.costCenterOwner = data.costCenterOwner;
      //   //this.form.travelDestinationArray = data.travelDestinationArray;

      //   //this.form.travelType = data.travelType;
      //   //this.form.travelDestination = data.travelDestination;
      //  // this.form.travelPeriod = data.travelPeriod;
      //   //this.form.travelDetaile = data.travelDetaile;
      //  // this.form.specialRequirement = data.specialRequirement;

      //   this.form.participantInformationsList = data.participantInformationsList;
      // },

      //加载exec表格触发
      //  upload: function () {
      //   console.log(this.upath);
      //   var zipFormData = new FormData();
      //   zipFormData.append('file', this.upath);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      //    //let config = { headers: { 'Content-Type': 'multipart/form-data'} };

      //   this.$http.post(Config.getBaseURL() + "/bmApplication/uploadParticipant", zipFormData,{
      //   headers: {"Content-Type": "multipart/form-data"}
      //   }).then(function (response) {
      //     //console.log(response);
      //     console.log(response.data);
      //     this.form.participantInformationsList =response.data.form.participantInformationsList;

      //   });
      // },
       //获取要加载的文件
      // getFile: function (e) {
      //   var theEvent = window.event || e;
      //   var srcElement = theEvent.srcElement;
      //   if (!srcElement) {
      //     srcElement = theEvent.target;
      //     }
      //   // this.upath = srcElement.target.files[0];
      //   this.upath = srcElement.files[0];
      // },
         upload: function (event) {
          let file = event.target.files[0]
        var zipFormData = new FormData();
        zipFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
         //let config = { headers: { 'Content-Type': 'multipart/form-data'} };

        this.$http.post(Config.getBaseURL() + "/bmApplication/uploadParticipant", zipFormData,{
        headers: {"Content-Type": "multipart/form-data"}
        }).then(function (response) {
          //console.log(response);
          //console.log(response.data);
          var newList = response.data.form.participantInformationsList;
        if(this.form.participantInformationsList[0].nameList==null || this.form.participantInformationsList[0].nameList==''){
          this.form.participantInformationsList=[];
        }
        for(var i=0;i<newList.length;i++){//循环获取a数组内的元素
         this.form.participantInformationsList.push(newList[i]);//把a数组内的元素添加到b数组
        }
         // this.form.participantInformationsList =response.data.form.participantInformationsList;

        });
      },


      doAfterSelectCostCenter: function(data) {

        this.form.costCenterCode = data.costCenterCode;
        this.form.costCenterName = data.cfController;
        this.form.costCenterOwner = data.costCenterOwner;
        //this.form.cfController = data.cfController;

        },
     insertItineraryRows: function() {

        var newItem = {};
        for(var key in this.form.participantInformationsList[0]) {
          newItem[key] = "";
        }
        this.form.participantInformationsList.push(newItem);
      },
      changedept: function(id) {

        if(this.cfControllers) {
            if(id!=null){
         if( id=="--Please Select--"){
           this.form.costElementEn=null;
           console.log(this.form.costElementEn);
           id=0;
          }
        var aa;
        var bb;
        console.log(11111);
        global_.actUtil.query("get", "/bmCostElement/costElement/"+ id, "", function(data) {
         var da = JSON.parse(data);
           if(da.obj){
           aa=da.obj.shortTextCn;
            bb=da.obj.glAcct;
          console.log(da.obj);
          }

          });


          this.form.costElementCn=aa;
          this.form.costElementNo=bb;
          console.log(this.form.costElementCn);


         // this.form.participantInformationsList=[];


          this.form.otherLaborWelfare = this.temotherLaborWelfare;
         // this.form.otherLaborWelfare=null;

          this.entertainmentType=false;
          this.form.participantInflag="N";
          this.OtherLabor=false;

         if(id==2||id==3){
          this.OtherLabor=false;
          this.entertainmentType=true;
          this.form.participantInflag="Y";
          // var newItem ={};
          // for(var key in this.form.participantInformationsList[0]) {

          //    newItem[key] = "";

          // }
          // var parts = this.form.createDate.match(/\d+/g);
          // newItem['createDate']=parts[0] + '-' + parts[1] + '-' + parts[2];

          // this.form.participantInformationsList.push(newItem);
        }
        if(id==8){
          if(this.form.otherLaborWelfare==1 || this.form.otherLaborWelfare==2){
          this.entertainmentType=true;
          }
          // this.form.otherLaborWelfare='1';
      //     var newItem ={};
      //  for(var key in this.form.participantInformationsList[0]) {

      //        newItem[key] = "";

      //   }
      //     var parts = this.form.createDate.match(/\d+/g);
      //     newItem['createDate']=parts[0] + '-' + parts[1] + '-' + parts[2];
      //   this.form.participantInformationsList.push(newItem);

          this.OtherLabor=true;
          this.form.participantInflag="Y";
        }
       }



        }  else{
       if(id!=null){
         if( id=="--Please Select--"){
           this.form.costElementEn=null;
           console.log(this.form.costElementEn);
           id=0;
          }
        var aa;
        var bb;
        console.log(11111);
        global_.actUtil.query("get", "/bmCostElement/costElement/"+ id, "", function(data) {
         var da = JSON.parse(data);
           if(da.obj){
           aa=da.obj.shortTextCn;
            bb=da.obj.glAcct;
          console.log(da.obj);
          }

          });


          this.form.costElementCn=aa;
          this.form.costElementNo=bb;
          console.log(this.form.costElementCn);


          this.form.participantInformationsList=[];


          this.form.otherLaborWelfare = this.temotherLaborWelfare;
          this.form.otherLaborWelfare=null;

          this.entertainmentType=false;
          this.form.participantInflag="N";
          this.OtherLabor=false;

         if(id==2||id==3){
          this.OtherLabor=false;
          this.entertainmentType=true;
          this.form.participantInflag="Y";
          var newItem ={};
          for(var key in this.form.participantInformationsList[0]) {

             newItem[key] = "";

          }
          var parts = this.form.createDate.match(/\d+/g);
          newItem['createDate']=parts[0] + '-' + parts[1] + '-' + parts[2];

          this.form.participantInformationsList.push(newItem);
        }
        if(id==8){
          this.entertainmentType=true;
          this.form.otherLaborWelfare='1';
          var newItem ={};
       for(var key in this.form.participantInformationsList[0]) {

             newItem[key] = "";

        }
          var parts = this.form.createDate.match(/\d+/g);
          newItem['createDate']=parts[0] + '-' + parts[1] + '-' + parts[2];
        this.form.participantInformationsList.push(newItem);

          this.OtherLabor=true;
          this.form.participantInflag="Y";
        }
       }
        }
       },





      //表格行删除调用方法
      deleteItineraryRows: function(rowId) {
        if(this.form.participantInformationsList.length > 1) {
          this.form.participantInformationsList.splice(rowId, 1);
        } else {
          $.alert("At least one complete record in Participant Information is needed. 至少需要填写一条完整的行程记录。");
        }
      },

      //控制区域是否显示
      otherLaborss: function(){
       this.entertainmentType=false;
      this.form.participantInformationsList=[];
      this.form.participantInflag="N";
      //  var newItem ={};
      //  for(var key in this.form.participantInformationsList[0]) {
      //     newItem[key] = "";
      //   }
      //   this.form.participantInformationsList.push(newItem);
      },
       Laborss: function(){
        this.entertainmentType=true;
        // this.form.participantInformationsList=[];
        if(this.form.participantInformationsList.length<1){
        var newItem ={};
        for(var key in this.form.participantInformationsList[0]) {

           newItem[key] = "";
         }
         this.form.participantInformationsList.push(newItem);
        }
      },
      drawcostcenter: function() {
        $("#example2").DataTable().draw();
      },
      retrievecostcenterData: function(url, aoData, fnCallback) {
        var codeSearch = $("#codeSearch").val();
        var nameSearch = $("#nameSearch").val();
        var ownerSearch = $("#ownerSearch").val();
        $.ajax({
          url: url, //这个就是请求地址对应sAjaxSource
          data: {
            "aoData": JSON.stringify(aoData),
            "code": codeSearch,
            "name": nameSearch,
            "owner": ownerSearch
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
        var url = "/form/BmApplication/get/" + id;
      } else {
        var url = "/form/BmApplication/create/";
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
      //在选染页面之后拿去后台传过来的值做缓存
      dm.onbehalf = false;
      dm.flag=false;

     // dm.entertainmentType =false;
      //dm.OtherLabor =false;
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
      dm.tempnationality = dm.form.nationality;
      dm.temotherLaborWelfare =dm.form.otherLaborWelfare;
      dm.temparticipantInformationsList =dm.form.participantInformationsList;

    //console.log(dm.form.participantInformationsList);
      if(dm.form.governmentOfficials=='N'){
           dm.form.governmentOfficials=null;
      }
      if(dm.form.costElementEn==2||dm.form.costElementEn==3){
          dm.OtherLabor=false;
          dm.entertainmentType=true;

        }else if(dm.form.costElementEn==8){
          dm.OtherLabor=true;
          if(dm.form.otherLaborWelfare==5 || dm.form.otherLaborWelfare==4 || dm.form.otherLaborWelfare==3){
          dm.entertainmentType=false;
          }else{
            dm.entertainmentType=true;
          }
        }else{
          dm.entertainmentType=false;
          dm.OtherLabor=false;
        }

     return dm;
    },
    watch: {

    },
    //在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
    mounted() {
      var form = this.form;
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

      var _this = this;

      var tableCostCenter = $("#example2").DataTable({
        "fnServerData": _this.retrievecostcenterData,
        "sAjaxSource": Config.getBaseURL() + "/bmApplication/listcostcenter",
        "serverSide": true,
        "filter": false,
        "lengthChange": false,
        "aoColumnDefs": [{
          "bSortable": false,
          "aTargets": [4]
        }],
        "aaSorting": [
          [0, "desc"]
        ], //给列表排序
        columns: [{
          data: "costCenterCode"
        },
          {
            data: "costCenterName"
          },
          {
            data: "costCenterOwner"
          },
          {
            data: "cfController"
          },

          {
            data: null
          }
        ],
        "fnRowCallback": function(row, data, index) { //设置列从0开始

          $('td:eq(4)', row).html('<a href="javascript:;" class="opt-select" ><i class="fa fa-check"></i></a>');

          return row;
        }
      });
      //拿取模态框查询出来的数据赋值到页面
      $('#example2 tbody').on('click', '.opt-select', function() {
        var row = $(this).parents("tr");
        var data = tableCostCenter.row(row).data();
        _this.doAfterSelectCostCenter(data);
        $("#modal-default").modal('hide');

      });

$("#description").on('blur', function() {
				var reg =/^[0-9]*$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
							var value=$(this).val();
							var newvalue = value.replace(/[^\x00-\xff]/g, "**");
							var length = newvalue.length;

							//当填写的字节数小于设置的字节数
							if (length * 1 <=500 * 1){
										return;
							}
							var limitDate = newvalue.substr(0, 500);
							var count = 0;
							var limitvalue = "";
						for (var i = 0; i < limitDate.length; i++) {
										var flat = limitDate.substr(i, 1);
										if (flat == "*") {
													count++;
										}
						}
						var size = 0;
						var istar = newvalue.substr(500 * 1 - 1, 1);//校验点是否为“×”

						//if 基点是×; 判断在基点内有×为偶数还是奇数
						if (count % 2 == 0) {
											//当为偶数时
										size = count / 2 + (500 * 1 - count);
										limitvalue = value.substr(0, size);
						} else {
										//当为奇数时
										size = (count - 1) / 2 + (500 * 1 - count);
										limitvalue = value.substr(0, size);
						}
					$.alert('500 Characters Max for reason. 原因最多只能填写500个字符。');

	 				form.description=limitvalue;
					}
				}
			});


      //显示申请日期为当前日期
      var parts = this.form.createDate.match(/\d+/g);
      this.form.createDate= parts[0] + '-' + parts[1] + '-' + parts[2];
      //form.applicationAmountNo=formatCurrency(formatCurrency(form.applicationAmount));

      this.form.participantInflag="Y";


      //控制金额以千分号隔开
      $("#bmApplicatio").on('blur', '#appAmount', function() {
			var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {
              $.alert('Only numbers and decimal point are allowed for Application Amount  对于申请金额只能输入数字和小数点');
							form.applicationAmountNo = "";
							//$(this).val("");

						} else {
              //var newVal = toDecimal2($(this).val());
              form.applicationAmountNo=formatCurrency($(this).val());
              form.applicationAmount=$(this).val();
						}
					}
				}
      });
      $("#bmApplicatio").on('focus', '#appAmount', function() {
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						var newVal=$(this).val().replace(new RegExp(",","gm"),"");
						form.applicationAmountNo = newVal;
						$(this).val(newVal);
					}
				}
			});

      if(_this.form.policyDeviation == 'true') {
        $("#policyDeviation").prop("checked", true);
      } else {
        _this.form.policyDeviation = null;
        $("#policyDeviation").prop("checked", false);
      }
      //放在save，submit是数据在数据库中保存两次
      this.$root.eventHub.$off('updateFormData');
      this.$root.eventHub.$on('updateFormData', (form) => {
        this.form = form;
        var parts = this.form.createDate.match(/\d+/g);
      this.form.createDate= parts[0] + '-' + parts[1] + '-' + parts[2];
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
      confirmkey:{
				// 动态计算是否显示confirm按钮
				get:function() {
					return (this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('CfController') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))|| (this.$route.query.taskKey == null&&this.form.status==null)|| (this.$route.query.taskKey == null&&this.form.status==2) ||(this.form.status==9&&((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)));
				}
			},
      cfControllers:{
				// 动态计算是否显示confirm按钮
				get:function() {
					return (this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('CfController') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)));
				}
			},
      readonly: {
        // 动态计算readonly的值
        get: function() {

          return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
        }
      },
      disabled: {
        // 动态计算readonly的值
        get: function() {

          return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
        }
      },
      ifrequired: {
        get: function() {
          if(this.form.travelType == '1') {
            return "false";
          }
          return "true";
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

<style>
  div.is-danger {
    border: solid red 1px;
  }
</style>

<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Attendance Deviation Application</h1>
      <ol class="breadcrumb">
       <li><a >1.Applicant</a></li>
        <li><a >2.Disciplinary Supervisor</a></li>
        <li><a >3.Head of Department (FG ≥ T+/29)</a></li>
        <li v-if="form.reasonFlag=='Y'"><a >4.HRBP</a></li>
        <li v-if="form.reasonFlag=='Y'"><a >5.Head of HR, Orga. & Education</a></li>
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
          <h3 class="box-title"> Applicant Info. 申请人信息</h3>
         </div>
        <form role="form">
          <input type="hidden" v-model="form.id" name="id">
          <input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
          <input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">
          <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
          <div class="box-body">
            <div class="row">
              <form-group col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
              <form-group col="md-3" type="input"  v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
              <form-group col="md-3" type="input"  v-model="form.creatorPhoneNum" name="creatorPhoneNum" readonly="readonly"></form-group>
            </div>
            <div class="row">
							<form-group col="md-3" type="input" v-model="form.creatorBusinessUnit" name="businessUnit" readonly="readonly"></form-group>
							<form-group col="md-3" type="input"  v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							<form-group col="md-3" type="input"  v-model="form.creatorSubDepartment" name="subdePartment" readonly="readonly"></form-group>
             <div class="col-md-3">
                <div class="form-group" style="margin: 0; margin-top: 13px;">
                 <br><label>Applied&nbsp;&nbsp;</label> <label  style="color:red;">{{form.times}}</label><label>&nbsp;&nbsp;times in current month</label>
                </div>
              </div>
						</div>
          </div>
        </form>
      </div>
      <!-- 考勤异常内容 starts-->
      <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Attendance Deviation Information  考勤异常信息 </h3>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <!--<div class="form-group">
                     <form-group other-rules="required" :readonly="readonly"  type="select2" uri='/hrAttendanceDeviation/getDate' name="deviationDate" v-model="form.deviationDate" tags="false" @change="changeDate"></form-group>
                  </div>-->
                  <div v-if="form.processInstanceId ==null||form.status==2||form.status==9">
                  <label>
                    <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                            Date of Attendance Deviation 异常发生日期
                  </label>
                  </div>
                  <div  v-if="form.processInstanceId ==null||form.status==2||form.status==9">
                    <select class="form-control form-group" @change="changeDate" name="deviationDate" v-model="form.deviationDate">
                      <option v-bind:key="index" v-for="(entry,index) in form.adiDateList" :value="entry">{{entry}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <!--<div class="form-group">
                     <form-group other-rules="required" :readonly="readonly"  type="select2" uri='/hrAttendanceDeviation/getDate' name="deviationDate" v-model="form.deviationDate" tags="false" @change="changeDate"></form-group>
                  </div>-->
                  <div>
                    <label>
                      <i class="fa" style="font-size: 10px;"></i>
                    </label>
                  </div>
                  <div  v-if="form.processInstanceId ==null||form.status==2||form.status==9">
                    <button type="button" class="btn btn-primary btn-sm" @click="insertItemRows()"><i class="model"></i>Add</button>
                  </div>
                </div>
                <div class="col-md-3" v-if="(form.businessTripess=='Y' && !readonly)|| businessTrip">
                  <a class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-default" style="margin-top: 26px">Select Business Trip/ Training 选择出差/培训</a>
                </div>
              </div>
               <div class="row">
            <div class="form-group">
              <div class="col-md-12">

                <table class="table mar-bot-0" width="100%">
                  <tbody>
                  <tr>
                    <th style="text-align:center;width: 20%;">Abnormal Date 异常打卡日期</th>
                    <th style="text-align:center;width: 20%;">Scheduled Punch Time 计划打卡时间</th>
                    <th style="text-align:center;width: 20%;">Actual Punch Time 实际打卡时间 </th>
                    <th style="text-align:center;width: 20%;">Adjusted Punch Time 调整打卡时间  </th>
                    <th style="text-align:center;width: 20%;">Reason for Attendance Deviation 考勤异常原因</th>
                    <th style="text-align:center;width: 80px;" v-if="form.processInstanceId ==null||form.status==2||form.status==9">Operation <br>操作</th>
                  </tr>
                  <tr v-bind:key="index" v-for="(entry,index) in form.adInformationsList" >
                    <td style="text-align:center;width: 20%;">
                        <form-group type="timepicker2" other-rules="required"  haslable="false" readonly="readonly" v-model="entry.timecarddate" name="timecarddate"></form-group>
                    </td>
                    <td style="text-align:center;width: 20%;">
                        <form-group type="timepicker2" other-rules="required"  haslable="false" readonly="readonly" v-model="entry.scheduletime" name="scheduletime"></form-group>
                    </td>
                    <td style="text-align:center;width: 20%;">
                        <form-group type="timepicker2" other-rules="required"  haslable="false" readonly="readonly" v-model="entry.pushtime" name="pushtime"></form-group>
                    </td>
                    <td style="text-align:center;width: 20%;">
                      <form-group type="timepicker2" other-rules="required"  haslable="false" :readonly="readonly" v-model="entry.adjustedTime" name="adjustedTime"></form-group></td>
                    <td style="text-align:center;width: 20%;">
                        <form-group type="select" haslable="false" uri="/dict/list?groupName=hrReason" :readonly="readonly"  name="entry" v-model="entry.reason" tags="false" @change="queryReason"></form-group>
                    </td>
                    <td style="text-align:center;width: 80px;" v-if="form.processInstanceId ==null||form.status==2||form.status==9">
                      <a href="javascript:;"  @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>


                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>



              <div class="row" >

                <div class="col-md-12" v-if="form.reasonFlag=='Y'">
                  <div class="form-group">
                     <span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;300 Characters Max.最多只能填写300个字节。</span>
                       <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('description') }" id="description" name ="description" rows="2" placeholder="Please specify other reason, such as company activity. Lateness or early leave due to personal reason cannot be applied for attendance deviation. 请详述其他原因，如公司活动。因个人原因的迟到或早退不应申请考勤异常。" v-validate="'required'" v-model="form.description" :disabled="readonly"></textarea>
                  </div>
                </div>
                <div class="col-md-12" v-show="form.businessTripess=='Y'  || businessTrip">
                  <div class="form-group">
                      <h4>Business Trip/Training Information 出差/培训信息</h4>
                      <div class="row">
                        <div class="col-md-3">
                              <label for="">Application No. 申请单号</label>
                              <input type="text" class="form-control" id="" placeholder="Application No. 申请单号"  disabled="" v-model="form.applicationNo">
                            </div>
                        <div class="col-md-3">
                          <div class="form-group">
                              <label for="">Travel Destination 目的地</label>
                              <input type="text" class="form-control" id="" placeholder="Travel Destination 目的地"  disabled="" v-model="form.travelDestination">
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                              <label for="">Business Travel Period 出差时段</label>
                              <div class="input-group">
                                <div class="input-group-addon">
                                  <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right" id="reservation" placeholder="Business Travel Period 出差时段"  disabled="" v-model="form.travelPeriod">
                              </div>
                              <!-- /.input group -->
                          </div>
                        </div>
                      </div>
                       <h4>Itinerary 行程</h4>
                      <table class="table table-bordered table-hover" id="exampleittd" width="80%">
                        <thead>
                         <tr role="row">

                          <th width="5px">No.</th>
                          <th >Transportation 交通方式 </th>
                          <th width="30%">Duration 期间 </th>
                          <th >Departure Place 出发地</th>
                          <th >Travel Destination 目的地</th>

                        </tr>
                        </thead>
                         <tbody>


                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </form>
        </div>

<!-- 考勤异常内容 end -->



     <div class="box box-primary" v-if="this.form.reasonFlag=='Y'">
        <div class="box-header with-border">
          <h3 class="box-title"> <i v-if="!readonly" class="fa fa-asterisk text-required"></i> Upload Attachment 上传附件</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" ></upload2>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="box box-primary" v-else>
        <div class="box-header with-border">
          <h3 class="box-title"> Upload Attachment 上传附件</h3>
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
      <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>
      <router-view  v-if="'hrbp' == processTaskKey&&(form.status==1)" :form="form" entityId="HrAttendanceDeviation" vclass="btn-left" uri="/form/HrAttendanceDeviation/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit" approveLabelName="Confirm" rejectLabelname="Decline"></router-view>
      <router-view v-else :form="form" entityId="HrAttendanceDeviation" vclass="btn-left" uri="/form/HrAttendanceDeviation/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
	  <comment-list v-if="form.processInstanceId !=null"></comment-list>

    </section>
      <div class="modal fade" id="modal-default">
      <div class="modal-dialog" style="width: 900px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"> Select Business Trip/ Training  选择出差/培训</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-muted well well-sm no-shadow mar-bot-10">
                  <div class="row">
                            <div class="form-group col-md-3">
                              <label for="">Application No. 申请单号</label>
                              <input type="email" class="form-control" id="ticketNoSearch" placeholder="Application No. 申请单号">
                            </div>
                            <div class="form-group col-md-3" style="margin-bottom: 0;">
                              <label for=""> Travel Destination 目的地</label>
                              <input type="text" class="form-control" id="destinationoSearch" placeholder="Travel Destination 目的地">
                            </div>
                            <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                              <button type="submit" class="btn btn-primary" title="选择" @click="drawcostcenter()"><i class="fa fa-fw fa-search"></i> Search</button>
                            </div>
                          </div>

                </div>
                 <table class="table table-bordered table-hover" id="examplebt">

                  <thead>
                 <tr role="row">
                    <th>Application No. 申请单号</th>
                    <th>Travel Destination 目的地</th>
                    <th>Business Travel Period 出差时段</th>
                    <th class="text-center">Select 选择</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>0000000000000000001</td>
                    <td>上海</td>
                    <td>11/29/2017 - 11/29/2017</td>
                    <td class="text-center"><a href=""><i class="fa fa-check"></i></a></td>
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
import global_ from "./../../../components/Common/Util/Global.vue";
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
  name: "HrAttendanceDeviation",
  methods: {

    beforesubmit: function() {
      //校验异常日期是否在流程中
      let form = this.form;
      var creatorUserId = this.form.creatorUserId;
      var deviationDate = this.form.deviationDate;
      var ticketNo = this.form.ticketNo;
      //let _this = this;
      // $.ajax({
      //   url: Config.getBaseURL() + "/hrAttendanceDeviation/checkDate",
      //   type: 'POST',
      //   dataType:'text',
      //   contentType: "application/json",
      //   data: JSON.stringify(form),
      //   cache: false,
      //   async: false,

      // success: function(da) {
      //     var data = JSON.parse(da);
      //     console.log(data.form);
      //     if (data.form == "false") {
      //       $.alert(
      //         "The selected attendance deviation date has been contained in other Attendance Deviation application, please change attendance deviation date 所选考勤异常日期已经在其他考勤异常申请单中，请更换考勤异常日期。"
      //       );
      //       _this.form.deviationDate = null;
      //        _this.form.times = "0";
      //        _this.form.submitstatus = false;
      //        _this.form.approvelstatus = false;
      //         return;
      //     }else{
      //        _this.form.submitstatus = true;
      //         _this.form.approvelstatus = true;
      //     }



      //   }
      // });
            this.form.submitstatus=true;
						this.form.approvelstatus = true;
            var listaa = this.form.adInformationsList;
            var businessTripess = this.form.businessTripess;
						var uri = "/hrAttendanceDeviation/checkDate";
            var _this=this;
            if(listaa!=null&&listaa.length>0){
              var checkTime = new Array();
              for(var index in listaa){
                checkTime.push(listaa[index].timecarddate);
              }
              if(checkTime!=null&&checkTime.length>0) {
                var notAvailable = false;
                for (var index in checkTime) {
                  console.log(checkTime[index]);
                  this.form.deviationDate=checkTime[index];
                this.GL.actUtil.query("POST",uri,this.form,function(da){
                    var data = JSON.parse(da);
                    console.log(data.form);
                    if (data.form == "false") {
                      $.alert(
                        "The selected attendance deviation date has been contained in other Attendance Deviation application, please change attendance deviation date 所选考勤异常日期已经在其他考勤异常申请单中，请更换考勤异常日期。"
                      );
                      _this.form.deviationDate = null;
                      //_this.form.times = "0";
                      _this.form.submitstatus = false;
                      _this.form.approvelstatus = false;
                      notAvailable = true;
                    }else{
                      _this.form.submitstatus = true;
                        _this.form.approvelstatus = true;
                    }


                });
                }
                if(notAvailable){
                  return false;
                }
              }
            }
          //var listaa = this.form.adInformationsList;
          if(listaa!=null&&listaa.length>0){
            for(var index in listaa){
              if((listaa[index].reason==null || listaa[index].reason=="")){
                $.alert("Please select reason for attendance deviation or delete the attendance deviation. 请选择考勤异常原因或者删除这条异常。");
                    this.form.submitstatus=false;
                    this.form.approvelstatus = false;
                    return;
              }
            }
              this.form.submitstatus=true;
              this.form.approvelstatus = true;
          }

          var value = this.form.travelPeriod;
          if(value){
            var checkTravelTime = new Array();
            if(listaa!=null&&listaa.length>0){
              /*for(var index in listaa){
                if(listaa[index].reason==7){
                  checkTime.push(listaa[index].timecarddate);
                }
              }*/
              $.each(listaa, function(j, val) {
                if(val.reason=="4"){
                  checkTravelTime.push(val.timecarddate);
                }
              });
            }
            //when checked 4 reason numbers > 0
            var check7 = true;
            if(checkTravelTime!=null&&checkTravelTime.length>0){
              for(var index in checkTravelTime){
                var deTime = checkTravelTime[index];
                console.log("deTime:"+deTime);
                var startDate=value.substring(0,10);
                var endDate=value.substring(11,21);
                console.log("startDate:"+startDate);
                console.log("endDate:"+endDate);
                var smonth=startDate.substring(0,2);
                var sdays=startDate.substring(3,5);
                var syear=startDate.substring(6,10);

                var emonth=endDate.substring(0,2);
                var edays=endDate.substring(3,5);
                var eyear=endDate.substring(6,10);

                var demonth=deTime.substring(5,7);
                var dedays=deTime.substring(8,10);
                var deyear=deTime.substring(0,4);

                var d=new Date();
                d.setFullYear(syear);
                d.setMonth(smonth-1);
                d.setDate(sdays);

                var ed=new Date();
                ed.setFullYear(eyear);
                ed.setMonth(emonth-1);
                ed.setDate(edays);

                var de=new Date();
                de.setFullYear(deyear);
                de.setMonth(demonth-1);
                de.setDate(dedays);
                console.log("startDate:"+d);
                console.log("endDate:"+ed);
                console.log(de);
                if(de<d || de>ed){
                  check7 = false;
                  $.alert( "The deviation date should be within business travel period. 异常日期应在出差时段内。" );
                  this.form.submitstatus = false;
                  this.form.approvelstatus = false;
                  return;
                }
              }
              if(check7){
                this.form.submitstatus=true;
                this.form.approvelstatus = true;
              }
            }else{
              $.alert( "The deviation date should be within business travel period. 异常日期应在出差时段内。" );
              this.form.submitstatus = false;
              this.form.approvelstatus = false;
              return;
            }
          }else{
            this.form.submitstatus=true;
            this.form.approvelstatus = true;
          }
      if(businessTripess == 'Y'){
        var applicationNo = this.form.applicationNo;
        var travelDestination = this.form.travelDestination;
        var travelPeriod = this.form.travelPeriod;
        if(applicationNo == '' || travelDestination == '' || travelPeriod == ''||applicationNo == null || travelDestination == null || travelPeriod == null){
          $.alert("Please Select Business Trip/Training 请选择出差/培训");
          _this.form.submitstatus = false;
          _this.form.approvelstatus = false;
          return;
        }

      }
        },

       queryReason: function(){
        var adinfo = this.form.adInformationsList;
        this.businessTrip=false;
         this.form.reasonFlag='N';
         this.form.businessTripess='N';

        for(var tempdev in adinfo){
           if(adinfo[tempdev].reason==4){
             this.form.businessTripess='Y';
             this.businessTrip=true;

             break;
           }
        }
        if(!this.businessTrip){
          this.form.itineraryIds=null;
          this.form.businessTripess='N';
          this.form.applicationNo=null;
          this.form.travelDestination=null;
          this.form.travelPeriod=null;
          $("#exampleittd").DataTable().draw();


        }
          for(var tempdev in adinfo){
           if(adinfo[tempdev].reason==7){
             this.form.reasonFlag='Y';
             break;
           }
          }
       },
      //出差信息
       retrieveApplicationData: function(url, aoData, fnCallback) {
        var ticketNoSearch = $("#ticketNoSearch").val();
        var destinationoSearch = $("#destinationoSearch").val();
        var applicantUserId = this.form.applicantUserId;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
            "ticketNo": ticketNoSearch,
            "destinationoSearch":destinationoSearch,
           "applicantUserId":applicantUserId
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
      //更换日期重置参数
      changeDate: function(){
          let form = this.form;
          /*this.form.itineraryIds=null;
          this.businessTrip=false;
          this.form.businessTripess='N';
          this.form.reasonFlag=null;
          this.form.description=null;
          this.form.applicationNo=null;
          this.form.travelDestination=null;
          this.form.travelPeriod=null;*/
          $("#exampleittd").DataTable().draw();
          var adinfo = this.form.adInformationsList;
          /*for(var vo in adinfo){
              adinfo[vo].reason=null;
          }*/
           //校验异常日期是否在流程中
           var creatorUserId= this.form.creatorUserId;
           var deviationDate= this.form.deviationDate;
           var ticketNo= this.form.ticketNo;
           let _this = this;
      },
      //考勤异常插入
      insertItemRows: function(){
        let form = this.form;
        let _this = this;
        var selectDate = this.form.deviationDate;
        var check = true;
        var isChecked = false;
        $.each(_this.form.adInformationsList, function(j, val) {
          if(val.timecarddate==selectDate){
            isChecked = true;
          }
        });
        if(isChecked){
          $.alert("The selected attendance deviation date has been contained in this Attendance Deviation application, please change attendance deviation date 所选考勤异常日期已经在本次考勤异常申请单中，请更换考勤异常日期。");
          return false;
        }
      $.ajax({
        url: Config.getBaseURL() + "/hrAttendanceDeviation/checkDate",
        type: 'POST',
        dataType:'text',
        contentType: "application/json",
        data: JSON.stringify(form),
        async: false,

      success: function(da) {
          var data = JSON.parse(da);
          console.log(data.form);
            if(data.form=='false'){
              check = false;
              $.alert("The selected attendance deviation date has been contained in other Attendance Deviation application, please change attendance deviation date 所选考勤异常日期已经在其他考勤异常申请单中，请更换考勤异常日期。");
              _this.form.deviationDate=null;
              //_this.form.times = "0";
              return false;
            }else if(data.form=='true'){
              //_this.form.times=data.time;
              //if(data.adInfo){
                //this.form.adInformationsList =data.adInfo;
              //}
            }
          },
        });
        if(check){
          if(selectDate!=null&&selectDate!=""&&selectDate!=undefined){
            $.ajax({
              url: Config.getBaseURL() + "/hrAttendanceDeviation/getDateList", //这个就是请求地址对应sAjaxSource
              data: {
                "dateTime": selectDate
              }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
              type: 'get',
              dataType: 'json',
              success: function(data) {
                console.log(data);
                var arr = new Array();
                $.each(_this.form.adInformationsList, function(j, val) {
                  if(val.timecarddate!=null||val.timecarddate!=""||val.timecarddate!=undefined){
                    arr.push(val);
                  }
                });
                $.each(data, function(j, val) {
                  if(val.timecarddate!=null||val.timecarddate!=""||val.timecarddate!=undefined){
                    arr.push(val);
                  }
                });
                _this.form.adInformationsList=arr;
                _this.form.deviationDate = null;
              },
              error: function(msg) {
                _this.form.deviationDate = null;
                $.alert("The selected attendance deviation date has been error, Please Try Again 返回时间有误,请重试");
              }
            })
          }else{
            _this.form.deviationDate = null;
            $.alert("Please select an attendance deviation date, please try again. 请选择一个异常发生日期，请重试。");
          }
        }
      },
      //考勤异常删除
      deleteItemRows:function(rowId){
        this.form.adInformationsList.splice(rowId, 1);
        //增加判断是否剩余的有出行和其他选项
        var listaa = this.form.adInformationsList;
        var reasonFlag = false;
        var travelFlag = false;
        if(listaa!=null&&listaa.length>0){
          for(var index in listaa){
            if((listaa[index].reason==7)){
              reasonFlag = true;
            }
            if((listaa[index].reason==4)){
              travelFlag = true;
            }
          }
        }
        if(reasonFlag){
          this.form.reasonFlag='Y';
        }else{
          this.form.reasonFlag='N';
        }
        if(travelFlag){
          this.form.businessTripess='Y';
          this.businessTrip=true;
        }else{
          this.form.businessTripess='N';
          this.businessTrip=false;
        }
        this.form.submitstatus=true;
        this.form.approvelstatus = true;
      },
        //模态框查询功能
        drawcostcenter: function() {
        $("#examplebt").DataTable().draw();
      },

    //行程信息
    retrieveApplicationIt: function(url, aoData, fnCallback) {
      var itineraryIds = this.form.itineraryIds;
      var ticketNo = this.form.applicationNo;

      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          itineraryIds: itineraryIds,
          ticketNo: ticketNo
        }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type: "get",
        dataType: "json",
        success: function(data) {
          fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
        },
        error: function(msg) {
          $.alert(msg.responseText);
        }
      });
    },
    //选择出差信息之后
    doAfterSelectApplication: function(data) {
      this.form.travelDestination = data.travelDestination;
      this.form.travelPeriod = data.travelPeriod;
      this.form.applicationNo = data.ticketNo;
      this.form.itineraryIds = data.id;
      console.log(this.form.itineraryIds);
      $("#exampleittd")
        .DataTable()
        .draw();
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
    if (id) {
      var url = "/form/hrAttendanceDeviation/get/" + id;
    } else {
      var url = "/form/hrAttendanceDeviation/create/";
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
    // dm.onbehalf = false;
    dm.flag = false;
    dm.businessTrip = false;
      dm.form.adiDateList=new Array();
      $.ajax({
        url: Config.getBaseURL() + "/hrAttendanceDeviation/getDate", //这个就是请求地址对应sAjaxSource
        data: {
        }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type: 'get',
        dataType: 'json',
        success: function(data) {
          //dm.form.adiDateList.push('请选择');
          $.each(data,function (index,item) {
            console.log(item);
            dm.form.adiDateList.push(item);
          })
        },
        error: function(msg) {
          $.alert("The selected attendance deviation date has been error, Please Try Again 返回时间有误,请重试");
        }
      });
      //判断是创建还是获取
      if(id){

      }else{
        dm.form.adInformationsList=null;
      }
    return dm;
  },
  watch: {},
  //在页面渲染之前就执行，data()在渲染页面之后才执行computed在mounted的前面,method在computed的前面
  mounted() {
    var form = this.form;
    //初始化数字加,展示
    var _this = this;
    //出差信息
    var tableApplication = $("#examplebt").DataTable({
      fnServerData: _this.retrieveApplicationData,
      sAjaxSource:
        Config.getBaseURL() + "/hrAttendanceDeviation/listapplicationforselect",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [0, 1, 2, 3]
        }
      ],
      aaSorting: [[0, "desc"]], //给列表排序
      columns: [
        {
          data: "ticketNo"
        },
        {
          data: "travelDestination"
        },
        {
          data: "travelPeriod"
        },
        {
          data: null
        }
      ],
      fnRowCallback: function(row, data, index) {
        //设置列从0开始
        // function formateDate(isostr) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
        // 	var parts = isostr.match(/\d+/g);
        // 	return parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4];
        // }

        // $('td:eq(1)', row).html(formateDate(data.createDate));
        $("td:eq(3)", row).html(
          '<div style="width:100%;text-align:center;"><a href="javascript:;" class="opt-select" ><i class="fa fa-check"></i></a></div>'
        );

        return row;
      }
    });

    $("#examplebt tbody").on("click", ".opt-select", function() {
      var row = $(this).parents("tr");
      var data = tableApplication.row(row).data();
      _this.doAfterSelectApplication(data);
      $("#modal-default").modal("hide");
    });

    var table = $("#exampleittd").DataTable({
      fnServerData: _this.retrieveApplicationIt,
      sAjaxSource: Config.getBaseURL() + "/hrAttendanceDeviation/findItinerary",
      serverSide: true,
      filter: false,
      lengthChange: false,
      paging: false,
      bAutoWidth:false,
      // "scrollY": 200,
      // "scrollCollapse": true,
      bPaginate: true,
      iDisplayLength: 20,
      info: false,
      // "aoColumnDefs": [{
      // 	"bSortable": false,
      // 	"aTargets": [1,2,3,4]
      // }],
      // "aaSorting": [
      // 	[0, "asc"]
      // ], //给列表排序
      bSort: false, //排序功能
      columns: [
        { data: "id" },
        { data: "transportationName" },
        { data: "duration" },
        { data: "departurePlace" },
        { data: "travelDestination" }
      ],
      fnRowCallback: function(row, data, index) {
        //设置列从0开始
        console.log(data.transportationName);
        $("td:eq(0)", row).html(index + 1);

        return row;
      }
    });
    $('body').on('blur', '#description', function() {
   //$("#descriptionss").on("blur", function() {
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
          $.alert("300 Characters Max. 最多只能填写300个字节。");

          form.description = limitvalue;
        }
      }
    });
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

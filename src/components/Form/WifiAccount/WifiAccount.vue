<template>
 <!-- Content Wrapper. Contains page content -->
  <div class="content-header">
    <!-- Content Header (Page header) -->

    <section class="content-header">
      <h1>Guest WIFI Account Application
       <a  v-if="!readonly"  href="http://vwatjportal.ap.vwg/web/vwatj/it-service" target="_blank" style="margin-left: 10px; font-size: 18px;">
					<i class="fa fa-fw fa-info-circle"></i>Check IT portal</a>

      </h1>
      <ol class="breadcrumb">
        <li><a href="#">1.Applicant</a></li>
        <li><a href="#">2.Head of IT</a></li>
        <li class=""><a href="#">3.Client Service</a></li>
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
          </div>
          <form role="form">
          <input type="hidden" v-model="form.wifiUserId1" name="wifiUserId1">
          <input type="hidden" v-model="form.wifiUserId2" name="wifiUserId2">
          <input type="hidden" v-model="form.wifiUserId3" name="wifiUserId3">
          <input type="hidden" v-model="form.wifiUserId4" name="wifiUserId4">
					<input type="hidden" v-model="form.usingPeriodFrom" name="usingPeriodFrom">
					<input type="hidden" v-model="form.usingPeriodTo" name="usingPeriodTo">
          <input type="hidden" v-model="form.usingPeriodFrom1" name="usingPeriodFrom">
					<input type="hidden" v-model="form.usingPeriodTo1" name="usingPeriodTo">
          <input type="hidden" v-model="form.usingPeriodFrom2" name="usingPeriodFrom">
					<input type="hidden" v-model="form.usingPeriodTo2" name="usingPeriodTo">
          <input type="hidden" v-model="form.usingPeriodFrom3" name="usingPeriodFrom">
					<input type="hidden" v-model="form.usingPeriodTo3" name="usingPeriodTo">
          <input type="hidden" v-model="form.usingPeriodFrom4" name="usingPeriodFrom">
					<input type="hidden" v-model="form.usingPeriodTo4" name="usingPeriodTo">
          <input type="hidden" v-model="form.clientService" name="clientService">
          <input type="hidden" v-model="form.id" name="id">
           <input type="hidden" v-model="form.tempNum" name="tempNum">

            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
                         <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                         <label style="margin-right: 10px;" v-if="readonly">
                         <input type="radio" disabled="form.applicationType!=1" v-model="form.applicationType"  name="applicationType" id="applicationType1" value="1" checked="">New WIFI Account <small>新建WIFI账号</small>
                         </label>
                         <label style="margin-right: 10px;" v-else>
                         <input type="radio" v-model="form.applicationType"  name="applicationType" id="applicationType1" value="1" checked="" @click="clearData()">New WIFI Account <small>新建WIFI账号</small>
                         </label>
                  </div>
                 </div>
                <div class="col-md-3">
                  <div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
                        <label style="margin-right: 10px;"v-if="readonly">
                        <input type="radio" disabled="form.applicationType!=2" v-model="form.applicationType"  name="applicationType" id="applicationType2" value="2">WIFI Account Extension <small>WIFI账号延期</small>
                        </label>
                        <label style="margin-right: 10px;"v-else>
                        <input type="radio" v-model="form.applicationType"  name="applicationType" id="applicationType2" value="2" @click="clearData()">WIFI Account Extension <small>WIFI账号延期</small>
                        </label>
                  </div>
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
            <div class="box-body">
              <div class="row">

                  	<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>



                  <form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>


                  <form-group col="md-3" type="input" other-rules="required" v-model="form.creatorEmail" name="creatorEmail" readonly="readonly"></form-group>


              </div>
              <div class="row">


                  <form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>


                  <form-group col="md-3" type="input" other-rules="required" v-model="form.creatorFunction" name="creatorFunction" readonly="readonly"></form-group>


                  <form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>



              </div>
            </div>
          </form>
        </div>

        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">  WIFI User Info. &nbsp;&nbsp;<label> WIFI用户信息</label>  </h3>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">

                <form-group v-if="readonly" col="md-3" type="input" other-rules="required" v-model="form.wifiUserName" name="wifiUserName" :readonly="readonlyForExtension"></form-group>

                <div class="col-md-3" v-if="!readonly">

                  <div class="form-group" >
                    <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                    <label for="">
                      {{$t("WifiAccount.wifiUserName")}} </label>
                    <div class="input-group ">
                      <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiUserName') }" v-validate="'required'" placeholder="Name 姓名" id="wifiUserName" name="wifiUserName" v-model="form.wifiUserName" :readonly="readonlyForExtension">
                      <span class="input-group-btn" id="selectotherperson">
                        <ChooseWifiUser :vclass="'btn btn-primary btn-flat'"style="margin-top:0 px;margin-left:0px;"  v-on:callbackWifi="afterChooseUser"><i class="fa fa-fw fa-search"></i></ChooseWifiUser>
                        </span>
                    </div>

                  </div>
                </div>

                    <form-group col="md-3" type="input" other-rules="required" v-model="form.wifiUserCompany" name="wifiUserCompany" :readonly="readonlyForExtension"></form-group>
                    <form-group col="md-3" type="input" id="wifiUserPhone" other-rules="required" v-model="form.wifiUserPhone" name="wifiUserPhone" :readonly="readonlyForExtension"></form-group>
                    <form-group col="md-3" type="input" id="wifiUserEmail"  other-rules="required" v-model="form.wifiUserEmail" name="wifiUserEmail" :readonly="readonlyForExtension"></form-group>


                <div class="col-md-3" v-if="form.applicationType==1">
                  <div class="form-group">
                      <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                      <label for="">Account Numbers 帐号数量 </label>
                      <div class="radio mar-top-0" v-if="readonly">
                        <label class="col-md-2">
                            <input type="radio" disabled="form.wifiAccountNum!=1" v-model="form.wifiAccountNum" name="wifiAccountNum" id="wifiAccountNum1" value="1">
                            1
                        </label>
                        <label class="col-md-2">
                            <input type="radio" disabled="form.wifiAccountNum!=2" v-model="form.wifiAccountNum" name="wifiAccountNum" id="wifiAccountNum2" value="2">
                            2
                        </label>
                        <label class="col-md-2">
                            <input type="radio" disabled="form.wifiAccountNum!=2" v-model="form.wifiAccountNum"  name="wifiAccountNum" id="wifiAccountNum3" value="3">
                            3
                        </label>
                        <label class="col-md-2">
                            <input type="radio" disabled="form.wifiAccountNum!=4" v-model="form.wifiAccountNum"  name="wifiAccountNum" id="wifiAccountNum4" value="4">
                            4
                        </label>
                      </div>
                       <div class="radio " :class="{'is-danger': errors.has('wifiAccountNum') }" style="margin-bottom: 5px;margin-top: 5px;" v-else>
                        <label class="col-md-2">
                            <input type="radio"   v-model="form.wifiAccountNum" :class="{'is-danger': errors.has('wifiAccountNum1') }" :name="'wifiAccountNum'" :id="'wifiAccountNum1'" v-validate="'required'" value="1">
                            1
                        </label>
                        <label class="col-md-2">
                            <input type="radio"   v-model="form.wifiAccountNum" :class="{'is-danger': errors.has('wifiAccountNum2') }" :name="'wifiAccountNum'" :id="'wifiAccountNum2'" value="2">
                            2
                        </label>
                        <label class="col-md-2">
                            <input type="radio"   v-model="form.wifiAccountNum"  :class="{'is-danger': errors.has('wifiAccountNum3') }" :name="'wifiAccountNum'" :id="'wifiAccountNum3'" value="3">
                            3
                        </label>
                        <label class="col-md-2">
                            <input type="radio"  v-model="form.wifiAccountNum"  :class="{'is-danger': errors.has('wifiAccountNum4') }" :name="'wifiAccountNum'" :id="'wifiAccountNum4'" value="4">
                            4
                        </label>
                      </div>
                  </div>
                </div>
                <div class="col-md-3" v-if="form.applicationType==1">
                  <div class="form-group">
                       <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                      <label for="">Using Period  使用时间</label>
                      <span class="text-muted"><i class="fa fa-fw fa-info-circle"></i>  Maximum 3 months 最长3个月 </span>
                      <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-clock-o"></i>
                          </div>
                          <input v-if="readonly" type="text" class="form-control pull-right" :readonly="readonly" v-validate="'required'" id="usingPeriods" name="usingPeriod" v-model="usingPeriodDate">
                          <input v-else type="text" class="form-control pull-right" :readonly="readonly" :class="{'form-control':true,'input': true, 'is-danger': errors.has('usingPeriodDate') }" v-validate="'required'" id="usingPeriodDate" name="usingPeriodDate" v-model="usingPeriodDate"   >
                      </div>
                  </div>
                </div>

              </div>

            </div>
          </form>
        </div>



      <div class="box box-primary" v-if="this.form.applicationType=='2'">
          <div class="box-header with-border">
            <h3 class="box-title">WIFI Account &nbsp;<label>WIFI账号 </label> </h3>
          </div>
          <div class="box-body">
              <div class="row">
                  <div class="form-group">
                    <div class="col-md-12">
                      <table class="table table-bordered mar-bot-0">
                        <tbody>
                        <tr v-if="wifiList1">
                          <th width="40px"> No.</th>
                          <th>WIFI Account WIFI账号 </th>
                          <th>Password 密码</th>
                          <th>Using Period 使用时间 <span class="text-muted"><i class="fa fa-fw fa-info-circle"></i>  Maximum 3 months 最长3个月 </span></th>
                          <th class="text-center"><a href="#" class="hidden"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th>
                        </tr>
                        <tr v-if="wifiList1" id="wifiAccountTr1">
                          <td>01</td>
                          <td>
                            <div class="input-group">
                              <div class="input-group-addon">
                               <i class="fa fa-user"></i>
                              </div>
                               <input v-if="readonly" v-model="form.wifiList[0].wifiAccount" class="form-control" type="text"  id="wifiAccountex1" placeholder="Account 账号"   disabled="">
                              <input v-else class="form-control" type="text" v-model="form.wifiAccount1" id="wifiAccountex1" placeholder="Account 账号"   disabled="">
                            </div>
                          </td>
                          <td>
                            <div class="input-group " v-if="isLoginUser">
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                              <input v-if="readonly" class="form-control" type="text" v-model="form.wifiList[0].wifiPassword" id="wifiAPsswordex1" placeholder="Password 密码" disabled=""  >
                              <input v-else class="form-control" type="text" v-model="form.wifiPassword1" id="wifiAPsswordex1" placeholder="Password 密码" disabled=""  >
                            </div>
                             <div class="input-group " v-else>
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                              <input v-if="readonly" class="form-control" type="password" v-model="form.wifiList[0].wifiPassword" id="wifiAPsswordex1" placeholder="Password 密码" disabled=""  >
                              <input v-else class="form-control" type="text" v-model="form.wifiPassword1" id="wifiAPsswordex1" placeholder="Password 密码" disabled=""  >
                            </div>
                          </td>
                          <td>
                            <form-group col="md-8" :readonly="readonly" type="daterangepicker" dateLimit="91"  other-rules="required"  v-model="form.usingPeriod1" name="usingPeriod1"></form-group>

                          </td>
                          <td id="deleteBtn1" v-if="!readonly" class="text-center" style="vertical-align: middle;"><a href="javascript:;"  @click="hideTr(1)" ><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                        </tr>
                        <tr v-if="wifiList2" id="wifiAccountTr2">
                          <td>02</td>
                          <td>
                            <div class="input-group">
                              <div class="input-group-addon">
                               <i class="fa fa-user"></i>
                              </div>
                               <input v-if="readonly" v-model="form.wifiList[1].wifiAccount" class="form-control" type="text"  id="wifiAccountex2" placeholder="Account 账号"   disabled="">
                              <input v-else class="form-control" type="text" v-model="form.wifiAccount2"  id="wifiAccountex2" placeholder="Account 账号"  disabled="">
                            </div>
                          </td>
                          <td>
                            <div class="input-group " v-if="isLoginUser">
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                               <input v-if="readonly" class="form-control" type="text" v-model="form.wifiList[1].wifiPassword" id="wifiAPsswordex2" placeholder="Password 密码" disabled=""  >
                               <input v-else class="form-control" type="text" v-model="form.wifiPassword2" id="wifiAPsswordex2" placeholder="Password 密码" disabled=""  >
                            </div>
                             <div class="input-group"  v-else>
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                               <input v-if="readonly" class="form-control" type="password" v-model="form.wifiList[1].wifiPassword" id="wifiAPsswordex2" placeholder="Password 密码" disabled=""  >
                               <input v-else class="form-control" type="text" v-model="form.wifiPassword2" id="wifiAPsswordex2" placeholder="Password 密码" disabled=""  >
                            </div>
                          </td>
                           <td>
                             <form-group col="md-8" :readonly="readonly" type="daterangepicker" dateLimit="91"  other-rules="required"  v-model="form.usingPeriod2" name="usingPeriod2"></form-group>
                           </td>
                          <td id="deleteBtn2" v-if="!readonly" class="text-center" style="vertical-align: middle;"><a href="javascript:;"  @click="hideTr(2)" ><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                        </tr>
                         <tr v-if="wifiList3" id="wifiAccountTr3">
                          <td>03</td>
                          <td>
                            <div class="input-group">
                              <div class="input-group-addon">
                               <i class="fa fa-user"></i>
                              </div>
                               <input v-if="readonly" v-model="form.wifiList[2].wifiAccount" class="form-control" type="text"  id="wifiAccountex3" placeholder="Account 账号"   disabled="">
                              <input v-else class="form-control" type="text" v-model="form.wifiAccount3" id="wifiAccountex3" placeholder="Account 账号"  disabled="">
                            </div>
                          </td>
                          <td>
                            <div class="input-group " v-if="isLoginUser">
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                              <input v-if="readonly" class="form-control" type="text" v-model="form.wifiList[2].wifiPassword" id="wifiAPsswordex3" placeholder="Password 密码" disabled=""  >

                              <input v-else class="form-control" type="text"  v-model="form.wifiPassword3" id="wifiAPsswordex3" placeholder="Password 密码"  disabled="">
                            </div>
                            <div class="input-group " v-else>
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                              <input v-if="readonly" class="form-control" type="password" v-model="form.wifiList[2].wifiPassword" id="wifiAPsswordex3" placeholder="Password 密码" disabled=""  >

                              <input v-else class="form-control" type="text"  v-model="form.wifiPassword3" id="wifiAPsswordex3" placeholder="Password 密码"  disabled="">
                            </div>
                          </td>
                           <td>
                             <form-group col="md-8" :readonly="readonly" type="daterangepicker" dateLimit="91"  other-rules="required"  v-model="form.usingPeriod3" name="usingPeriod3"></form-group>
                           </td>
                          <td id="deleteBtn3" v-if="!readonly" class="text-center" style="vertical-align: middle;"><a href="javascript:;"  @click="hideTr(3)" ><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                        </tr>
                         <tr v-if="wifiList4" id="wifiAccountTr4">
                          <td>04</td>
                          <td>
                            <div class="input-group">
                              <div class="input-group-addon">
                               <i class="fa fa-user"></i>
                              </div>
                               <input v-if="readonly" v-model="form.wifiList[3].wifiAccount" class="form-control" type="text"  id="wifiAccountex4" placeholder="Account 账号"   disabled="">
                              <input v-else class="form-control" type="text" v-model="form.wifiAccount4"  id="wifiAccountex4" placeholder="Account 账号"  disabled="">
                            </div>
                          </td>
                          <td>
                            <div class="input-group " v-if="isLoginUser">
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                              <input v-if="readonly" class="form-control" type="text" v-model="form.wifiList[3].wifiPassword" id="wifiAPsswordex4" placeholder="Password 密码" disabled=""  >
                              <input v-else class="form-control" type="text" v-model="form.wifiPassword4" id="wifiAPsswordex4" placeholder="Password 密码"  disabled="">
                            </div>
                            <div class="input-group " v-else >
                              <div class="input-group-addon">
                               <i class="fa fa-lock"></i>
                              </div>
                              <input v-if="readonly" class="form-control" type="password" v-model="form.wifiList[3].wifiPassword" id="wifiAPsswordex4" placeholder="Password 密码" disabled=""  >
                              <input v-else class="form-control" type="text" v-model="form.wifiPassword4" id="wifiAPsswordex4" placeholder="Password 密码"  disabled="">
                            </div>
                          </td>
                           <td>
                             <form-group col="md-8" :readonly="readonly" type="daterangepicker" dateLimit="91"  other-rules="required"  v-model="form.usingPeriod4" name="usingPeriod4"></form-group>
                           </td>
                          <td id="deleteBtn4" v-if="!readonly" class="text-center" style="vertical-align: middle;"><a href="javascript:;"  @click="hideTr(4)" ><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
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
            <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
            <h3 class="box-title">Reason &nbsp;<label>原因</label> </h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">

                <form-group other-rules="required" type="textarea" haslable="false"  :readonly="readonly" id="reason" v-model="form.reason" name="reason"></form-group>

              </div>
            </div>
           </div>
        </div>

        <div class="box box-primary" v-if="(isFinish&&this.form.applicationType=='1')||(showWifiUserInfo&&readonly&&this.form.applicationType=='1')">
          <div class="box-header with-border">
            <h3 class="box-title">WIFI Account &nbsp;<label>WIFI账号 </label> </h3>
          </div>
          <form role="form">

            <table class="table table-bordered" id="WifiUserList" style="width:50%">
                <tbody>

                <tr v-if="wifiList1">
			          	<td>
                    <div class="form-group overflow-auto">
                      <label for="">1. WIFI Account/Password &nbsp;WIFI账号/密码 </label>
                      <div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-user"></i>
                          </div>
                            <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[0].wifiAccount" id="wifiAccount1" placeholder="Account 账号"  disabled>
                            <input v-else :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiAccount1') }" v-validate="'required'"  type="text" name="wifiAccount1"  id="wifiAccount1" placeholder="Account 账号"  >
                        </div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-lock"></i>
                          </div>
                          <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[0].wifiPassword"  id="wifiPassword1" placeholder="Password 密码" disabled="" >
                           <input  v-else :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiPassword1') }" v-validate="'required'"   type="text" name="wifiPassword1"  id="wifiPassword1" placeholder="Password 密码" >

                        </div>
                      </div>
                     </div>
                   </td>
                 </tr>
                <tr v-if="wifiList2">
			          	<td>
                    <div class="form-group overflow-auto">
                      <label for="">2. WIFI Account/Password &nbsp;WIFI账号/密码 </label>
                      <div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-user"></i>
                          </div>

                          <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[1].wifiAccount" id="wifiAccount2" placeholder="Account 账号"  disabled>
                          <input v-else  :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiAccount2') }" v-validate="'required'"  type="text" name="wifiAccount2"  id="wifiAccount2" placeholder="Account 账号"  >
                        </div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-lock"></i>
                          </div>
                           <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[1].wifiPassword"  id="wifiPassword2" placeholder="Password 密码" disabled="" >
                           <input  v-else :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiPassword2') }" v-validate="'required'" name="wifiPassword2"  type="text"   id="wifiPassword2" placeholder="Password 密码" >

                        </div>
                      </div>
                     </div>
                   </td>
                 </tr>
                  <tr v-if="wifiList3">
			          	<td>
                    <div class="form-group overflow-auto">
                      <label for="">3. WIFI Account/Password &nbsp;WIFI账号/密码 </label>
                      <div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-user"></i>
                          </div>

                          <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[2].wifiAccount" id="wifiAccount3" placeholder="Account 账号" disabled >
                          <input v-else  :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiAccount3') }" v-validate="'required'" name="wifiAccount3"  type="text"   id="wifiAccount3" placeholder="Account 账号"  >
                        </div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-lock"></i>
                          </div>
                           <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[2].wifiPassword"  id="wifiPassword3" placeholder="Password 密码" disabled="" >
                           <input  v-else  :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiPassword3') }" v-validate="'required'" name="wifiPassword3" type="text"   id="wifiPassword3" placeholder="Password 密码" >

                        </div>
                      </div>
                     </div>
                   </td>
                 </tr>
                  <tr v-if="wifiList4">
			          	<td>
                    <div class="form-group overflow-auto">
                      <label for="">4. WIFI Account/Password &nbsp;WIFI账号/密码 </label>
                      <div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-user"></i>
                          </div>

                          <input  v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[3].wifiAccount" id="wifiAccount4" placeholder="Account 账号"  disabled="">
                           <input  v-else :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiAccount4') }" v-validate="'required'" name="wifiAccount4"  type="text" id="wifiAccount4" placeholder="Account 账号"  >
                        </div>
                        <div class="input-group col-md-6 pull-left">
                          <div class="input-group-addon">
                           <i class="fa fa-lock"></i>
                          </div>
                          <input v-if="isFinish" class="form-control"  type="text" v-model="form.wifiList[3].wifiPassword"  id="wifiPassword4" placeholder="Password 密码" disabled="" >
                           <input  v-else :class="{'form-control':true,'input': true, 'is-danger': errors.has('wifiPassword4') }" v-validate="'required'" name="wifiPassword4" type="text"   id="wifiPassword4" placeholder="Password 密码" >
                        </div>
                      </div>
                     </div>
                   </td>
                 </tr>
              </tbody>
            </table>


          </form>
        </div>









        <div class="checkbox" v-if="!check()">
              <label>
              <span class="help is-danger" v-show="errors.has('terms')">
                {{$t("checkPolicyNotice")}}
              </span>
                <input name="terms" v-validate="'required'" type="checkbox">When submitting the application, I have read and agreed to <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin. </a> 当提交此申请时，我已经理解并承诺遵守<a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策。</a>
              </label>
        </div>
            <!-- /.box -->
             <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>
        <div class="row" v-if="showWifiUserInfo&&readonly&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)">
            <div class="col-md-12 mar-bot-20">
                <button id="vue_commit_btn" type="button" class="btn btn-success" @click="commit()"><i class="fa fa-fw fa-check"></i>&nbsp;Commit</button>
				 <button type="button" @click="back()" :class="'btn btn-primary pull-right ' + vclass" >Back</button>

            </div>
          </div>
      <router-view :form="form" entityId="WifiAccount" vclass="btn-left" uri="/form/WifiAccount/update" :validator="this.$validator"></router-view>
    	<comment-list v-if="form.processInstanceId !=null"></comment-list>
    <!-- commitModal start-->
      <div class="modal fade" id="commitModal" tabindex="-1" role="dialog" aria-labelledby="commitModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="commitModalLabel">APPROVE</h4>
					</div>
					<div class="modal-body">
						<span>{{ $t('APPROVE') }}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- commitModal end-->


    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->



</template>
		<modaldialog :vclass="vclass"></modaldialog>
<script>
	//import "./../../plugins/daterangepicker/daterangepicker.css"
	import jQuery from "jquery"
	import adminlte from "adminlte"
	//import bootstrap from "bootstrap"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"

  var tmpNum=0;
	export default {
		name: 'WifiAccount',
		methods:{
      beforesubmit:function(){
       // alert("2");
      },
       clearData :function(){
        this.form.wifiUserName="";
        this.form.wifiUserCompany="";
        this.form.wifiUserPhone="";
        this.form.wifiUserEmail="";
        this.form.wifiAccountNum="";
        this.form.wifiAccount1="";
        this.form.wifiAccount2="";
        this.form.wifiAccount3="";
        this.form.wifiAccount4="";

        this.form.wifiPassword1="";
        this.form.wifiPassword2="";
        this.form.wifiPassword3="";
        this.form.wifiPassword4="";
        this.form.wifiUserId1="";
        this.form.wifiUserId2="";
        this.form.wifiUserId3="";
        this.form.wifiUserId4="";
        this.form.usingPeriodFrom1="";
        this.form.usingPeriodTo1="";
        this.form.usingPeriodFrom2="";
        this.form.usingPeriodTo2="";
        this.form.usingPeriodFrom3="";
        this.form.usingPeriodTo3="";
        this.form.usingPeriodFrom4="";
        this.form.usingPeriodTo4="";
       },
      hideTr:function(num){
        $("#wifiAccountTr"+num).hide();

        if(num==1){
          this.form.wifiAccount1="";
          this.form.wifiPassword1="";

        }else if(num==2){
           this.form.wifiAccount2="";
          this.form.wifiPassword2="";
        }else if(num==3){
           this.form.wifiAccount3="";
          this.form.wifiPassword3="";
        }else if(num==4){
           this.form.wifiAccount4="";
          this.form.wifiPassword4="";
        }
         tmpNum=tmpNum-1;
         this.form.tempNum=tmpNum;

         if(tmpNum==1){
            if( this.form.wifiAccount1!=""){
              $("#deleteBtn1").hide();
            }
            if( this.form.wifiAccount2!=""){
              $("#deleteBtn2").hide();
            }
            if( this.form.wifiAccount3!=""){
              $("#deleteBtn3").hide();
            }
            if( this.form.wifiAccount4!=""){
              $("#deleteBtn4").hide();
            }
         }
      },
      afterChooseUser :function(data){
        $("#wifiAccountTr1").show();
        $("#wifiAccountTr2").show();
        $("#wifiAccountTr3").show();
        $("#wifiAccountTr4").show();
        $("#deleteBtn1").show();
        $("#deleteBtn2").show();
        $("#deleteBtn3").show();
        $("#deleteBtn4").show();
        this.form.wifiUserName=data.wifiUserName;
        this.form.wifiUserCompany=data.wifiUserCompany;
        this.form.wifiUserPhone=data.wifiUserPhone;
        this.form.wifiUserEmail=data.wifiUserEmail;
        this.form.wifiAccount1=data.wifiAccount1;
        this.form.wifiAccount2=data.wifiAccount2;
        this.form.wifiAccount3=data.wifiAccount3;
        this.form.wifiAccount4=data.wifiAccount4;

        this.form.wifiPassword1=data.wifiPassword1;
        this.form.wifiPassword2=data.wifiPassword2;
        this.form.wifiPassword3=data.wifiPassword3;
        this.form.wifiPassword4=data.wifiPassword4;
        this.form.wifiUserId1=data.wifiUserId1;
        this.form.wifiUserId2=data.wifiUserId2;
        this.form.wifiUserId3=data.wifiUserId3;
        this.form.wifiUserId4=data.wifiUserId4;

        var period=data.usingPeriod;
        var arr=period.split("-");

        this.form.usingPeriodFrom1=arr[0];
        this.form.usingPeriodTo1=arr[1];
        this.form.usingPeriodFrom2=arr[0];
        this.form.usingPeriodTo2=arr[1];
        this.form.usingPeriodFrom3=arr[0];
        this.form.usingPeriodTo3=arr[1];
        this.form.usingPeriodFrom4=arr[0];
        this.form.usingPeriodTo4=arr[1];


        if(data.wifiAccount4!="-"){
          this.form.wifiAccountNum='4';

        }else
         if(data.wifiAccount3!="-"){
          this.form.wifiAccountNum='3';
        }else
         if(data.wifiAccount2!="-"){
          this.form.wifiAccountNum='2';
        }else
           {
          this.form.wifiAccountNum='1';
        }
        tmpNum=parseInt(this.form.wifiAccountNum);
        this.form.tempNum=tmpNum;
		this.$forceUpdate();
      },
		    check:function(){
           return ((this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit')==-1)||(this.form.processInstanceId !=null && this.form.status != null && this.form.status != 2 && this.form.status != 9));
			  },

      saveWifiList:function(){
          var wifiId=this.form.id;
          var num=this.form.wifiAccountNum;
          var appType=this.form.applicationType;
        if(appType=='1'){
          var usingPeriodFrom=this.form.usingPeriodFrom;
          var usingPeriodTo=this.form.usingPeriodTo;
          var wifiAccount1=$("#wifiAccount1").val();
          var wifiAccount2=$("#wifiAccount2").val();
          var wifiAccount3=$("#wifiAccount3").val();
          var wifiAccount4=$("#wifiAccount4").val();

          var wifiPassword1=$("#wifiPassword1").val();
          var wifiPassword2=$("#wifiPassword2").val();
          var wifiPassword3=$("#wifiPassword3").val();
          var wifiPassword4=$("#wifiPassword4").val();


          var wifiList="";
          if(num=='1'){
            if(wifiAccount1==""||wifiPassword1==""){
              $.alert("WIFI Account/Password WIFI is null!账号/密码不能为空！");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1;
            }
          }
          if(num=='2'){
            if(wifiAccount1==""||wifiPassword1==""||wifiAccount2==""||wifiPassword2==""){
              $.alert(" Account/Password WIFI is null!账号/密码不能为空！WIFI");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1+"&"+wifiAccount2+"@w@"+wifiPassword2;
            }
          }
          if(num=='3'){
             if(wifiAccount1==""||wifiPassword1==""||wifiAccount2==""||wifiPassword2==""||wifiAccount3==""||wifiPassword3==""){
              $.alert("WIFI Account/Password WIFI is null!账号/密码不能为空！");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1+"&"+wifiAccount2+"@w@"+wifiPassword2+"&"+wifiAccount3+"@w@"+wifiPassword3;
            }
          }
          if(num=='4'){
             if(wifiAccount1==""||wifiPassword1==""||wifiAccount2==""||wifiPassword2==""||wifiAccount3==""||wifiPassword3==""||wifiAccount4==""||wifiPassword4==""){
              $.alert("WIFI Account/Password WIFI is null!账号/密码不能为空！");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1+"&"+wifiAccount2+"@w@"+wifiPassword2+"&"+wifiAccount3+"@w@"+wifiPassword3+"&"+wifiAccount4+"@w@"+wifiPassword4;
            }
          }

          $.ajax({
            url: Config.getBaseURL() + "/WifiAccount/commit",
            data: {
              "wifiId":wifiId,
              "wifiAccountNum":  num,
              "appType": appType,
              "usingPeriodFrom": usingPeriodFrom,
              "usingPeriodTo": usingPeriodTo,
              "wifiList": wifiList,
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {
              //$.alert(data);
            },
            error: function(msg) {
              //$.alert(msg);
             // this.closemodal;

            }
				});
      }
        },
        completeTaskCom:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"approve",this.form,function(data){
					//$('#commitModal').modal('toggle');
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#commitModal').modal('toggle');
						setTimeout(function(){
							if(process.env.MODE === 'apon'){
								//top.location.href = Config.APONURL;
								top.location.href = Config.getAPONURL();
							}else{
								router.push({ path: '/index/task'});
							}
						},100);
					},800);
				});
			},
		back: function () {
				if(Config.MODE_TYPE === 'apon'){
					top.location.href = Config.getAPONURL();
				}else{
					this.$router.back();
				}
			},
			commit: function () {
				$("#loadingMask,#progressBar").show();
        var saveAccount=this.saveWifiList;
				var completeTaskFn = this.completeTaskCom;
				var validatorFn = this.$validator;
				setTimeout(function(){

					if(validatorFn){

						validatorFn.validateAll().then(result => {
							if (result) {
                saveAccount();
                setTimeout(function(){
								completeTaskFn();},1000);

							}else{
								$("#loadingMask,#progressBar").hide();

							}
						});
					}else{

              saveAccount();
					 setTimeout(function(){
								completeTaskFn();},1000);
					}
				},100);
			},

			//表格行添加调用方法
	    	insertItemRows:function(){
	    		var newItem = {};
	    		for(var key in this.form.shareList[0]){
	    			newItem[key] = "";
				}
				this.form.shareList.push(newItem);
	    	},
	    	//表格行删除调用方法
	    	deleteItemRows:function(rowId){
	    		this.form.shareList.splice(rowId, 1);
	    	},
	    	//表格内组件检查调用方法
	    	checkOther:function(data){
	    		//console.log("this is check");
	    	},
        checkPhoneNum:function(){
          var wifiUserPhone=$("#wifiUserPhone").val();

          var regs=/^[0-9]*$/;
          if(!regs.test(wifiUserPhone)){
              $.alert("Cell-Phone format is not correct.手机号码格式不正确。");
              $("#wifiUserPhone").val("");
          }
        },
        checkEmail:function(){
          var wifiUserEmail=$("#wifiUserEmail").val();
         // var regs="^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";
         var regs="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$";
          if(!regs.test(wifiUserEmail)){
              $.alert("E-mail format is not correct.邮箱格式不正确。");
              $("#wifiUserEmail").val("");
          }
        }

		},

		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id){
				var url = "/form//WifiAccount/get/"+id;
			}else{
				var url = "/form//WifiAccount/create/";
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

			return dm;
		},
		watch:{


		},
    	mounted() {
			var form = this.form;

        $('#usingPeriodDate').daterangepicker({
          "linkedCalendars": false,
          dateLimit : {
            months : 3
          }/**,
           startDate:form.usingPeriodFrom,
           endDate: form.usingPeriodTo**/
        }, function(start, end) {
          $('#usingPeriodDate').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
          form.usingPeriodFrom = start.format('MM/DD/YYYY');
          form.usingPeriodTo = end.format('MM/DD/YYYY');
        });

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
			});

      if(this.GL.hasRole('IT Client Service')){
        $(".col-xs-12.approval").hide();
      }

      $("div#wifiUserPhone div div input.form-control.input").on('blur', function() {
				var reg =/^[0-9]*$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert(' Cell-Phone format is not correct.手机号码格式不正确。');
						 form.wifiUserPhone="";


						}
					}
				}
			});
       $("div#wifiUserEmail div div input.form-control.input").on('blur', function() {
				//var reg =/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        var regs="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$";
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {

							$.alert(' E-mail format is not correct.邮箱格式不正确。');
						  form.wifiUserEmail="";


						}
					}
				}
			});

		},
		computed:{
			processTaskId: {
				// 动态计算processTaskId的值
				get:function() {
					return this.$route.query.taskId;
				}
			},
			processTaskKey:{
				// 动态计算processTaskKey的值
				get:function() {
					return this.$route.query.taskKey;
				}
			},
      readonly: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
      isLoginUser:{
        get:function(){

          var curUser=this.GL.getLoginUser();
          if(curUser==this.form.createUserId){
            return true;

          }else{
            return false;
          }
        }

      },
      readonlyForExtension: {
				// 动态计算readonly的值
				get: function() {
          //console.log(this.form.applicationType);

					return(this.form.applicationType=='2'||this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
      isFinish:{

        get:function(){
          return (this.form.processInstanceId != null && this.form.status != null && this.form.status == 0);
        }
      },
      wifiList1:function(){
          var num=this.form.wifiAccountNum;

         if(parseInt(num)>=1){
           return true;
         }
        },
       wifiList2:function(){
          var num=this.form.wifiAccountNum;
         if(parseInt(num)>=2){
           return true;
         }
        },
      wifiList3:function(){
          var num=this.form.wifiAccountNum;
         if(parseInt(num)>=3){
           return true;
         }
      },
      wifiList4:function(){
        var num=this.form.wifiAccountNum;
        if(parseInt(num)>=4){
           return true;
         }
      },

       showWifiUserInfo:function(){

       	return this.GL.hasRole('IT Client Service');
      },
			usingPeriodDate: {

				//动态根据后台开始和结束日期给有效期赋值或者根据有效期的值给后台开始和结束日期赋值
				get: function() {

					Date.prototype.Format = function(fmt) { //author: meizz
						var o = {
							"M+": this.getMonth() + 1, //月份
							"d+": this.getDate(), //日
							"h+": this.getHours(), //小时
							"m+": this.getMinutes(), //分
							"s+": this.getSeconds(), //秒
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度
							"S": this.getMilliseconds() //毫秒
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

            return fmt;
					}
					if(this.form.usingPeriodFrom == undefined || this.form.usingPeriodFrom == null || this.form.usingPeriodFrom == '') {
						this.form.usingPeriodFrom = new Date().Format("MM/dd/yyyy");
					}
					if(this.form.usingPeriodTo == undefined || this.form.usingPeriodTo == null || this.form.usingPeriodTo == '') {
						this.form.usingPeriodTo = new Date().Format("MM/dd/yyyy");
					}
           return this.form.usingPeriodFrom + "-" + this.form.usingPeriodTo;


				},
				set: function(newValue) {
					var dates = newValue.split('-')

					this.form.usingPeriodFrom = dates[0]
					this.form.usingPeriodTo = dates[dates.length - 1]
				}
			},
       usingPeriod1: {
				//动态根据后台开始和结束日期给有效期赋值或者根据有效期的值给后台开始和结束日期赋值
				get: function() {
					Date.prototype.Format = function(fmt) { //author: meizz
						var o = {
							"M+": this.getMonth() + 1, //月份
							"d+": this.getDate(), //日
							"h+": this.getHours(), //小时
							"m+": this.getMinutes(), //分
							"s+": this.getSeconds(), //秒
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度
							"S": this.getMilliseconds() //毫秒
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
					}
					if(this.form.usingPeriodFrom1 == undefined || this.form.usingPeriodFrom1 == null || this.form.usingPeriodFrom1 == '') {
						this.form.usingPeriodFrom1 = new Date().Format("MM/dd/yyyy");
					}
					if(this.form.usingPeriodTo1 == undefined || this.form.usingPeriodTo1 == null || this.form.usingPeriodTo1 == '') {
						this.form.usingPeriodTo1 = new Date().Format("MM/dd/yyyy");
					}
					return this.form.usingPeriodFrom1 + "-" + this.form.usingPeriodTo1;
				},
				set: function(newValue) {
					var dates = newValue.split('-')

					this.form.usingPeriodFrom1 = dates[0]
					this.form.usingPeriodTo1 = dates[dates.length - 1]
				}
			},
      usingPeriod2: {
				//动态根据后台开始和结束日期给有效期赋值或者根据有效期的值给后台开始和结束日期赋值
				get: function() {
					Date.prototype.Format = function(fmt) { //author: meizz
						var o = {
							"M+": this.getMonth() + 1, //月份
							"d+": this.getDate(), //日
							"h+": this.getHours(), //小时
							"m+": this.getMinutes(), //分
							"s+": this.getSeconds(), //秒
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度
							"S": this.getMilliseconds() //毫秒
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
					}
					if(this.form.usingPeriodFrom2 == undefined || this.form.usingPeriodFrom2 == null || this.form.usingPeriodFrom2 == '') {
						this.form.usingPeriodFrom2 = new Date().Format("MM/dd/yyyy");
					}
					if(this.form.usingPeriodTo2 == undefined || this.form.usingPeriodTo2 == null || this.form.usingPeriodTo2 == '') {
						this.form.usingPeriodTo2 = new Date().Format("MM/dd/yyyy");
					}
					return this.form.usingPeriodFrom2 + "-" + this.form.usingPeriodTo2;
				},
				set: function(newValue) {
					var dates = newValue.split('-')
					this.form.usingPeriodFrom2 = dates[0]
					this.form.usingPeriodTo2 = dates[dates.length - 1]
				}
			},
       usingPeriod3: {
				//动态根据后台开始和结束日期给有效期赋值或者根据有效期的值给后台开始和结束日期赋值
				get: function() {
					Date.prototype.Format = function(fmt) { //author: meizz
						var o = {
							"M+": this.getMonth() + 1, //月份
							"d+": this.getDate(), //日
							"h+": this.getHours(), //小时
							"m+": this.getMinutes(), //分
							"s+": this.getSeconds(), //秒
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度
							"S": this.getMilliseconds() //毫秒
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
					}
					if(this.form.usingPeriodFrom3 == undefined || this.form.usingPeriodFrom3 == null || this.form.usingPeriodFrom3 == '') {
						this.form.usingPeriodFrom3 = new Date().Format("MM/dd/yyyy");
					}
					if(this.form.usingPeriodTo3 == undefined || this.form.usingPeriodTo3 == null || this.form.usingPeriodTo3 == '') {
						this.form.usingPeriodTo3 = new Date().Format("MM/dd/yyyy");
					}
					return this.form.usingPeriodFrom3 + "-" + this.form.usingPeriodTo3;
				},
				set: function(newValue) {
					var dates = newValue.split('-')
					this.form.usingPeriodFrom3 = dates[0]
					this.form.usingPeriodTo3 = dates[dates.length - 1]
				}
			},
       usingPeriod4: {
				//动态根据后台开始和结束日期给有效期赋值或者根据有效期的值给后台开始和结束日期赋值
				get: function() {
					Date.prototype.Format = function(fmt) { //author: meizz
						var o = {
							"M+": this.getMonth() + 1, //月份
							"d+": this.getDate(), //日
							"h+": this.getHours(), //小时
							"m+": this.getMinutes(), //分
							"s+": this.getSeconds(), //秒
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度
							"S": this.getMilliseconds() //毫秒
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
					}
					if(this.form.usingPeriodFrom4 == undefined || this.form.usingPeriodFrom4 == null || this.form.usingPeriodFrom4 == '') {
						this.form.usingPeriodFrom4 = new Date().Format("MM/dd/yyyy");
					}
					if(this.form.usingPeriodTo4 == undefined || this.form.usingPeriodTo4 == null || this.form.usingPeriodTo4 == '') {
						this.form.usingPeriodTo4 = new Date().Format("MM/dd/yyyy");
					}
					return this.form.usingPeriodFrom4 + "-" + this.form.usingPeriodTo4;
				},
				set: function(newValue) {
					var dates = newValue.split('-')
					this.form.usingPeriodFrom4 = dates[0]
					this.form.usingPeriodTo4 = dates[dates.length - 1]
				}
			},
      usingPeriod1Display:{
        get:function(){
          return this.form.wifiList[0].usingPeriodFrom+ "-" + this.form.wifiList[0].usingPeriodTo;
          }
      },
      usingPeriod2Display:{
        get:function(){
          return this.form.wifiList[1].usingPeriodFrom+ "-" + this.form.wifiList[1].usingPeriodTo;
          }
      },
      usingPeriod3Display:{
        get:function(){
          return this.form.wifiList[2].usingPeriodFrom+ "-" + this.form.wifiList[2].usingPeriodTo;
          }
      },
      usingPeriod4Display:{
        get:function(){
          return this.form.wifiList[3].usingPeriodFrom+ "-" + this.form.wifiList[3].usingPeriodTo;
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

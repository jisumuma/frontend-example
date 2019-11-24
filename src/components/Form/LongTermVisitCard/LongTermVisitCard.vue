<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-header">
    <!-- Content Header (Page header) -->

    <section class="content-header">
      <h1>Long Term Visit Card Application</h1>
       <ol class="breadcrumb">
        <li><a href="#">1.Applicant</a></li>
        <li><a href="#">2.Administration Security Officer</a></li>
        <li  v-if="((form.applicationType==1 && form.ltcvType==1)|| (form.applicationType==2 && form.osscType==1))"><a href="#">3.CF Accountant</a></li>
        <li v-if="((form.applicationType==1 && form.ltcvType==1)|| (form.applicationType==2 && form.osscType==1))"><a href="#">4.Card Maker</a></li>
        <li v-if="!((form.applicationType==1 && form.ltcvType==1)|| (form.applicationType==2 && form.osscType==1))"><a href="#">3.Card Maker</a></li>
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
            <h3 class="box-title"> Application Type 申请类型 </h3>
          </div>
          <form role="form" class="ng-pristine ng-valid">


            <div class="box-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="radio overflow-auto" style="">
                        <!-- <i class="fa fa-asterisk text-red" style="margin-right: 0px;display: inline-block;margin-top: 6px;font-size: 10px;"></i> -->
                        <label class="pull-left" style="margin-right: 10px;display: inline-block;margin-top: 6px;"  >
                           <input type="radio" name="applicationType" id="applicationType1" value="1" v-model="form.applicationType"  :disabled="readonly" @click="plushUser">Long Term Service Card  <small>长期服务卡</small>
                        </label>
                         <select class="form-control input-sm pull-left" style="width: 120px;display: inline-block;" id="ltcvType" name="ltcvType" v-model="form.ltcvType"  :disabled="(readonly|| form.applicationType==2)" @change="plushUser" >
                          <option value="1" >New Card</option>
                          <option value="2">Renew Card</option>
                      </select>
                    </div>
                  </div>
                <div class="col-md-6">

                    <div class="radio overflow-auto" style="">
                        <label class="pull-left" style="margin-right: 10px;display: inline-block;margin-top: 6px;">
                            <input type="radio" name="applicationType" id="applicationType2" value="2" v-model="form.applicationType"   :disabled="readonly" @click="plushUser2">Onsite Supplier Card  <small>驻场供应商卡</small>
                        </label>
                         <select class="form-control input-sm pull-left" style="width: 120px;display: inline-block;" id="osscType" name="osscType" v-model="form.osscType"   :disabled="(readonly|| form.applicationType==1)" @change="plushUser2">
                          <option value="1">New Card</option>
                          <option value="2">Renew Card</option>
                      </select>
                    </div>


                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- 个人信息 start -->
       <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Applicant Info. 申请人信息</h3>
            <div class="checkbox pull-left" style="margin: 0; margin-left: 20px;" v-if="!check()"><label ><input type="checkbox" id="onbehalf" @click="onbehalfclick" >  <strong>On Behalf </strong> </label></div>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">

              <!--不选中的时候显示-->
							<form-group v-if="!onbehalf" other-rules="required" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<!--选中的时候显示-->
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										 Staff Code 员工号</label>
									<div class="input-group ">
										<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
										<input type="hidden" v-model="form.tempDate" name="tempDate" id="tempDate">
                    <span class="input-group-btn" id="selectotherperson">

                       <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>

                      </span>
									</div>
								</div>
							</div>
            <form-group col="md-3" type="hidden"  v-model="form.isOnbehalf" name="isOnbehalf" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required"  v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
						</div>
            </div>
          </form>
        </div>
        <!-- 个人信息  end -->

        <!-- 供应商信息 start -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title " v-if="form.applicationType==1"> Service Vender Info. 长期服务商信息</h3>
            <h3 class="box-title " v-if="form.applicationType==2">Onsite Supplier Information 驻场供应商信息</h3>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row" v-if="form.applicationType==1">
                <!-- <form-group col="md-3" type="input" other-rules="required" v-model="form.verdorName" name="verdorName" :readonly="readonly"></form-group> -->
                <div class="col-md-3" v-if="!readonly">
                <div class="form-group">
                  <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Vendor Name 供应商名称</label>
                  <div class="input-group ">
                    <input type="text" id="verdorName"  v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('verdorName') }" v-model="form.verdorName" placeholder="Vendor Name 供应商名称" name="verdorName" :readonly="readonly || ((form.applicationType==1 && form.ltcvType==2)|| (form.applicationType==2 && form.osscType==2))">
                    <span class="input-group-btn" >
                          					<button type="button" class="btn btn-primary btn-flat" data-toggle="modal" data-target="#modal-defaultcheck"><i class="fa fa-fw fa-search"></i></button>
                        				</span>
                  </div>
                </div>
              </div>
                 <form-group v-if="readonly" col="md-3" type="input" other-rules="required" v-model="form.verdorName" name="verdorName" :readonly="readonly || ((form.applicationType==1 && form.ltcvType==2)|| (form.applicationType==2 && form.osscType==2))"></form-group>
                <form-group col="md-3" type="input" other-rules="required" v-model="form.serviceContent" name="serviceContent" :readonly="readonly"></form-group>
              </div>
              <div class="row" v-if="form.applicationType==2">
                <!-- <form-group col="md-3" type="input" other-rules="required" v-model="form.verdorName" name="verdorName" :readonly="readonly"></form-group> -->
                 <div class="col-md-3" v-if="!readonly">
                <div class="form-group">
                  <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Vendor Name 供应商名称</label>
                  <div class="input-group ">
                    <input type="text" id="verdorName"  v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('verdorName') }" v-model="form.verdorName" placeholder="Vendor Name 供应商名称" name="verdorName" :readonly="readonly || ((form.applicationType==1 && form.ltcvType==2)|| (form.applicationType==2 && form.osscType==2))">
                    <span class="input-group-btn" v-if="!readonly">
                          					<button type="button" class="btn btn-primary btn-flat" data-toggle="modal" data-target="#modal-defaultcheck"><i class="fa fa-fw fa-search"></i></button>
                        				</span>
                  </div>
                </div>
              </div>
               <form-group v-if="readonly" col="md-3" type="input" other-rules="required" v-model="form.verdorName" name="verdorName" :readonly="readonly || ((form.applicationType==1 && form.ltcvType==2)|| (form.applicationType==2 && form.osscType==2))"></form-group>
                <!-- <div class="col-md-3" >
                  <div class="form-group">
                      <input type="hidden" v-model="form.startDate" name="startDate">
                      <input type="hidden" v-model="form.endDate" name="endDate">
                       <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                      <label for="">Contract Period 服务合同有效期限 </label>
                      <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-clock-o"></i>
                          </div>
                          <input v-if="readonly" type="text" class="form-control pull-right" :readonly="readonly"  id="contractPeriodDates" name="contractPeriodDates" v-model="form.FullDate">
                          <input v-else type="text" class="form-control pull-right" :readonly="readonly" :class="{'form-control':true,'input': true, 'is-danger': errors.has('contractPeriodDate') }" v-validate="'required'" id="contractPeriodDate" name="contractPeriodDate"  :click="setDatePacker()" v-model="form.FullDate" >
                      </div>
                  </div>
                </div> -->
                <!-- <div class="col-md-3">
                <div class="form-group"> -->
                  <!-- <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> -->
                 <form-group col="md-3"  type="daterangepicker2"  other-rules="required" v-model="form.fullDate" name="contractPeriod" :readonly="readonly"></form-group>
              <!-- </div>
                </div> -->
                <form-group col="md-3" type="input"  v-model="form.onsiteManager" name="onsiteManager" :readonly="readonly || ((form.applicationType==1 && form.ltcvType==2)|| (form.applicationType==2 && form.osscType==2))"></form-group>
                <form-group col="md-3" type="input"  v-model="form.onsiteManagerTelephone" name="onsiteManagerTelephone" :readonly="readonly || ((form.applicationType==1 && form.ltcvType==2)|| (form.applicationType==2 && form.osscType==2))"></form-group>
               </div>

                <div class="row" v-if="form.applicationType==2">
                    <div class="col-md-12">
                      <div class="form-group">
                          <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                          <label for="">Onsite Service Content 服务内容 </label> <span class="text-muted"><i class="fa fa-fw fa-info-circle"></i>  300 Characters Max  (最多300个字节)  </span>
                          <textarea type="text" rows="2" class="form-control" v-model="form.onsiteServiceContent" placeholder="服务内容" :readonly="readonly"></textarea>
                      </div>
                    </div>
                </div>
            </div>
          </form>
        </div>
        <!-- 供应商信息 end -->
             <!-- 制卡金额 start -->
       <div class="box box-primary" v-show="readonlyAmount&&((form.applicationType==1 && form.ltcvType==1)|| (form.applicationType==2 && form.osscType==1))">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Total Fee. 总金额</h3>
            <span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Currency: RMB 币种: 人民币.</span>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">
                 <div class="col-md-3">
                <div class="form-group">
                 <input type="text" class="form-control" id="amount" v-model="form.applicationAmount" readonly="readonly" >
                </div>
              </div>


						</div>
            </div>
          </form>
        </div>
        <!-- 驻场人员名单 start -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <!-- <h3 class="box-title pull-left"> Long Term Service Person List 长期服务人员名单 </h3> -->
            <!-- <button v-if="!readonly" class="btn btn-default btn-sm pull-right">Upload Onsite Supplier</button> -->
           <div id="app" class="box-body" v-if="form.applicationType==1">

             <h3 class="box-title pull-left" > Long Term Service Person List 长期服务人员名单   </h3>


              <label v-if="!readonly&&form.applicationType==1&&form.ltcvType==1" class="btn btn-primary btn-xs" style='margin-top: -3px;margin-left: 15px;float: right;font-size: 14px;' for="xFile">Upload</label>
                <input v-if="!readonly&&form.applicationType==1&&form.ltcvType==1"  style='display:inline-block;position:absolute;clip:rect(0 0 0 0);' id="xFile"  type="file"  @change="upload" >
               <a v-if="!readonly&&form.applicationType==1&&form.ltcvType==1"  style='display: inline-block; margin-left: 15px;float: right;'  target='_blank' :href="GL.getURL('/LongTermVisitCard/download')"><i class='fa fa-download'></i>&nbsp;&nbsp;Batch Upload Template 批量上传模板</a>
         </div>

          <div id="app" class="box-body" v-if="form.applicationType==2">


           <h3 class="box-title pull-left" >Onsite Suppliers List 驻场人员名单 </h3>



            <label  v-if="!readonly&&form.applicationType==2&&form.osscType==1" class="btn btn-primary btn-xs" style='margin-top: -3px;margin-left: 15px;float: right;font-size: 14px;'  for="xFile2">Upload</label>
            <input  v-if="!readonly&&form.applicationType==2&&form.osscType==1" style='display:inline-block;position:absolute;clip:rect(0 0 0 0);' id="xFile2"  type="file"  @change="uploadonsite" >
         <a  v-if="!readonly&&form.applicationType==2&&form.osscType==1" style='display: inline-block; margin-left: 15px;float: right;'  target='_blank' :href="GL.getURL('/LongTermVisitCard/downloadonsite')"><i class='fa fa-download'></i>&nbsp;&nbsp;Batch Upload Template 批量上传模板</a>
         </div>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="form-group">
                <div class="col-md-12">
                  <p  v-if="((form.applicationType==1 && form.ltcvType==1)|| (form.applicationType==2 && form.osscType==1))&&!readonly" ><a class="editor_create" data-toggle="modal" data-target="#modal-ltsp" href="#" @click="closeltcvmodal"><i class="fa fa-plus-circle" ></i> Create new record</a></p>
                  <p  v-if="((form.applicationType==1 && form.ltcvType==2) || (form.applicationType==2 && form.osscType==2))&&!readonly" ><a class="editor_create" data-toggle="modal" data-target="#modal-default" href="#" @click="plushcvmodal" ><i class="fa fa-plus-circle" ></i> Add Onsite Person</a></p>
                  <table class="table table-bordered mar-bot-0 dataTable" role="grid" aria-describedby="service_info" style="margin-top: 20px;" id="ltcvtable">

                     <thead>
                      <tr role="row">
                        <th align="center"> No.</th>
                        <th  align="center">Name 姓名</th>
                        <th align="center">ID No. <br/>身份证/护照号</th>
                         <th v-show="form.applicationType==2">Position  <br/>职务 </th>
                        <th align="center">Suppliers Card Period <br/>供应商卡有效期 </th>
                        <th align="center">Reason 申请原因</th>
                        <th v-show="form.applicationType==1" align="center">Onsite Service Content <br/>服务内容 </th>
                        <th v-show="form.applicationType==1" align="center">Application Date <br/>申请日期 </th>
                        <!-- <th class="hidden">Onsite Suppliers Photo 照片</th> -->
                        <th v-show="!readonly" >Edit 编辑 / Delete 删除</th>
                        <th class="hidden">id</th>
                    </tr>
                    </thead>
                     <tbody>

                   </tbody>
                </table>

                <!-- Long Term Service Person List 长期服务人员名单 编辑表格弹出框  -->
                <div class="modal fade" id="modal-ltsp">
                    <div class="modal-dialog" style="width: 1000px;">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                          <h4 class="modal-title" v-if="form.applicationType==1">Long Term Service Person Detail 长期服务人员详细信息</h4>
                          <h4 class="modal-title" v-if="form.applicationType==2">Onsite Suppliers Detail 驻场人员详细信息</h4>
                        </div>
                      <form data-vv-scope="modal-ltsp" class="form-horizontal">
                        <div class="modal-body">
                              <div class="form-group overflow-auto">

                                <label for="" class="col-sm-4 control-label">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                  Name 姓名</label>
                                <div class="col-sm-8">
                                  <input class="form-control input-sm" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-ltsp.personName') }" v-validate="'required'" type="text" id="personName" name="personName" placeholder="Name 姓名">
                                <input type="hidden"  name="applicantUserId" id="UserListId">
                                </div>
                              </div>

                              <div class="form-group overflow-auto">
                                <label for="" class="col-sm-4 control-label">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                ID No. 身份证/护照号</label>
                                <div class="col-sm-8">
                                  <input class="form-control input-sm" type="text" id="idno" name="idno" placeholder="ID No. 身份证/护照号" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-ltsp.idno') }" v-validate="'required'">
                                </div>
                              </div>
                              <div class="form-group overflow-auto" v-if="form.applicationType==2">
                                <label for="" class="col-sm-4 control-label">

                                Position 职务</label>
                                <div class="col-sm-8">
                                  <input class="form-control input-sm" type="text" id="position" name="position" placeholder="Position 职务"  >
                                </div>
                              </div>

                               <div class="form-group overflow-auto">

                                <label for="" class="col-sm-4 control-label pad-right-0">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                Suppliers Card Period 供应商卡有效期</label>
                                <div class="col-sm-8">
                                  <div class="input-group">
                                    <div class="input-group-addon">
                                      <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="hidden" id="startDate" name="startDate">
                                    <input type="hidden" id="endDate" name="endDate">
                                    <input type="text" class="form-control pull-right" id="cardPeriod" name="cardPeriod"   placeholder="Suppliers Card Period 供应商卡有效期" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-ltsp.cardPeriod') }" v-validate="'required'" :click="setDate()">
                                  </div>
                                </div>
                                </div>

                              <div class="form-group overflow-auto">
                                <label for="" class="col-sm-4 control-label">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                Reason 申请原因</label>
                                <div class="col-sm-8 row pad-right-0">
                                  <div class="col-md-6 radio mar-0" :class="{'is-danger': errors.has('modal-ltsp.reasonRadio') }">
                                    <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('modal-ltsp.reasonRadio') }" :name="'reasonRadio'" :id="'reasonRadio1'" value="1" checked   @click="setAbsentPersonDisabled()">New Servise 业务增加</label>
                                    <label style="margin-right: 10px;" ><input type="radio" :class="{'is-danger': errors.has('modal-ltsp.reasonRadio') }" :name="'reasonRadio'" :id="'reasonRadio2'" value="2"   @click="setAbsentPersonAbled">Supplier Employee Absence 供应商员工离职</label>
                                  </div>

                                  <div class="col-md-3 pad-0" style="padding-top: 14px;" ><input type="hidden" id="absentPersonName" name="absentPersonName" class="form-control" placeholder="Absent Person Name"  readonly ></div>
                                   <div class="col-md-6 pad-right-0" style="padding-top: 14px;" ><input type="text" id="absentPersonNo" name="absentPersonNo" class="form-control" placeholder="Absent Person ID No." ></div>

                              </div>
                              </div>

                              <div class="form-group overflow-auto" v-if="form.applicationType==1">
                                <label for="" class="col-sm-4 control-label">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                Onsite Service Content 服务内容</label>
                                <div class="col-sm-8">
                                  <input class="form-control input-sm" type="text"  id="serviceContent" name="serviceContent" placeholder="Onsite Service Content 服务内容" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-ltsp.serviceContent') }" v-validate="'required'">
                                </div>
                              </div>

                        </div>
                      </form>
                        <div class="modal-footer">
                          <button type="button" id="ltcvClose" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" @click="validateAllFn(saveLtcvInfo,'modal-ltsp')">Save changes</button>
                        </div>
                      </div>
                      <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- 编辑表格弹出框  end  -->





                <!-- 续卡弹出框  -->
                <!-- <div class="modal fade" id="modal-os">
                      <div class="modal-dialog" style="width: 900px;">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"> Select an Employee 选择一名员工 </h4>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-sm-12">
                              <div class="text-muted well well-sm no-shadow mar-bot-10">
                                <div class="row">
                                  <div class="form-group col-md-3">
                                    <label for="">Vendor Name 供应商名称</label>
                                    <input type="email" class="form-control" id="" placeholder="Vendor Name 供应商名称">
                                  </div>
                                  <div class="form-group col-md-3" style="margin-bottom: 0;">
                                    <label for=""> Name 姓名</label>
                                    <input type="text" class="form-control" id="" placeholder="Name 姓名">
                                  </div>
                                  <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                                    <button type="submit" class="btn btn-primary" title="选择"><i class="fa fa-fw fa-search"></i> Search</button>
                                  </div>
                                </div>

                              </div>

                              <p>
                                <button style=" width: 100px;" type="button" class="btn pull-right btn-success btn-sm"><i class="fa fa-check"></i> Select </button>
                              </p>
                              <table class="table table-bordered table-hover">
                                <thead>
                                  <tr role="row">
                                    <th>Vendor Name 供应商名称</th>
                                    <th>Name 姓名</th>
                                    <th>Application Date 申请日期</th>


                                    <th class="text-center">Select</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Aden</td>
                                    <td>孙秀梅</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                   <tr>
                                    <td>Aden</td>
                                    <td>孔淑云</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>王素萍</td>
                                    <td>09/20/2017</td>
                                    <td class="text-muted">Inactive 离职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>孙为宽</td>
                                    <td>09/20/2017</td>
                                    <td class="text-muted">Inactive 离职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>贺爱珍</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green"> Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>孙淑颖</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>王锦秋</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>孙桂芬</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                   <tr>
                                    <td>Aden</td>
                                    <td>刘志凯</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                   <tr>
                                    <td>Aden</td>
                                    <td>张淑玲</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                  <tr>
                                    <td>Aden</td>
                                    <td>穆淑娟</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                   <tr>
                                    <td>Aden</td>
                                    <td>孙永凤</td>
                                    <td>09/20/2017</td>
                                    <td class="text-green">Active 在职</td>
                                    <td class="text-center"><input type="checkbox"></td>
                                  </tr>
                                </tbody>
                              </table>
                             </div>
                            </div>
                          </div>
                          <div class="modal-footer hidden">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div> -->
                        <!-- /.modal-content -->
                      <!-- </div> -->
                      <!-- /.modal-dialog -->
                  <!-- </div> -->
                  <!-- /.modal -->
                  <!--续卡弹出框 end -->


                </div>
              </div>
            </div>
          </div>
        </div>


      <!-- 续卡弹出框-->
      <div class="modal fade" id="modal-default">
      <div class="modal-dialog" style="width: 900px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" id="closePerson" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"> Renew Person List 续卡人员名单 </h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-muted well well-sm no-shadow mar-bot-10">
                  <div class="row">
                    <div class="form-group col-md-3">
                      <label for="">Name 姓名</label>
                      <input type="text" class="form-control" id="nameSearch" placeholder="Name 姓名">
                    </div>
                   <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                      <button type="submit" class="btn btn-primary" title="选择" @click="drawcostcenter();"><i class="fa fa-fw fa-search"></i> Search</button>
                    </div>
                  </div>

                </div>
                  <p>
                    <button style=" width: 100px;margin-left: 20px;" type="button" class="btn pull-right btn-success btn-sm" @click="surePersonAll"><i class="fa fa-check"></i> Select All </button>
                    <button style=" width: 100px;" type="button" class="btn pull-right btn-info btn-sm" @click="surePerson"><i class="fa fa-check"></i> Select </button>

                  </p>
                <table class="table table-bordered table-hover" id="examples">

                  <thead>

                    <tr role="row">
                    <th style="width:80px" v-if="form.applicationType==2">Onsite Supplier Name 驻场供应商名称</th>
                     <th style="width:80px" v-else>Long Term Service Name 长期服务商名称</th>
                    <th style="width:40px;">Name 姓名</th>
                    <th style="width:80px;">ID No. 身份证/护照号</th>
                    <th style="width:40px;">Application Date 申请日期</th>
                    <th style="width:40px;">Status 状态</th>
                    <th style="width:40px;" ><input type='hidden' id="checkallName" name='checkAll' @click="checkAlls">Select</th>

                  </tr>

                  </thead>
                  <tbody>


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


    <!-- 驻场人员名单 end -->

       <!-- <div class="box box-primary" v-if="setAttachment">
          <div class="box-header with-border">
            <h3 class="box-title pull-left">Attachment 附件</h3>
          </div>
          <form role="form" class="ng-pristine ng-valid">
            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                      <label for=""><i class="fa fa-asterisk text-required"></i>Contract  合同</label>
                      <div class="box-body">
                       <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <upload2 :readonly="readonly" v-model="form.contractAttachment" buttonText="选择文件" :attachments="form.contractAttachments" multi="true"></upload2>
                          </div>
                        </div>
                      </div>
                      </div>
                     </div>
                </div>
            <div class="col-md-3">
                  <div class="form-group">
                      <label for=""><i class="fa fa-asterisk text-required"></i>Photo 照片</label>
                       <div class="box-body">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <uploadImage :readonly="readonly" v-model="form.photoAttachment" buttonText="Upload Photos" :attachments="form.photoAttachments" multi="true" fileSizeLimit="5MB"  uploadLimit="5"></uploadImage>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

                    <div class="col-md-3">
                  <div class="form-group">
                      <label for=""><i class="fa fa-asterisk text-required"></i>ID Scan File 身份证或护照扫描件</label>
                       <div class="box-body">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <uploadImage :readonly="readonly" v-model="form.idscanAttachment" buttonText="Upload Photos" :attachments="form.idscanAttachments" multi="true" fileSizeLimit="5MB"  uploadLimit="5"></uploadImage>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div> -->

        <!-- <div class="box box-primary" >
				<div class="box-header with-border">
          <h3 class="box-title"> <i class="fa fa-asterisk text-required"></i> Upload Attachment 上传附件 </h3>
        </div>
				<div class="box-body">

					<div class="row">
						 <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="">
									<i class="fa fa-asterisk text-required"></i>Photo 照片 </label>
                <upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true"></upload2>
              </div>
            </div>
          </div>



					</div>
				</div>
			</div> -->
      <div class="box box-primary" v-if="((form.applicationType==1 && form.ltcvType==1)|| (form.applicationType==2 && form.osscType==1))" >
        <div class="box-header with-border">
          <h3 class="box-title">Attachment 附件 </h3>

      </div>
        <div class="box-body">
          <div class="row" v-if="!confirmSee">
            <div class="col-md-12">
              <div class="form-group">
                 <label for="">
									<i  style="font-size: 10px;"></i>Upload Contract 上传合同 </label><p>Please update the following content in the contract: contract period of
            validity, service content and counter sign page by two parties.
            请上传合同中的以下内容：合同有效期，服务内容及双签页面。</p>
                <upload2 :readonly="readonly" name="upload1" required="false" v-model="form.contractAttachment" buttonText="Upload Attachment " :attachments="form.contractAttachments" multi="true"></upload2>

              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                 <label for="">
								<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Upload Photo 上传照片 </label>
                <p>The attachment only supports JPG. format. The limitation of attachment size is 10MB*10, please send attachments to Administration Security(CA) Officer offline
                      if attachments size is over limitation.附件格式只支持JPG， 附件大小限制是10MB* 10个，如果附件总大小超过100MB，请线下发送给行政负责人。</p>
                <upload2 :readonly="readonly" name="upload2" accept=".jpg" v-model="form.photoAttachment" buttonText="Upload Attachment " :attachments="form.photoAttachments" multi="true" fileSizeLimit="10MB"  uploadLimit="10"></upload2>
              </div>
            </div>
          </div>
           <div class="row" v-if="!confirmSee">
            <div class="col-md-12">
              <div class="form-group">
                 <label for="">
									<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Upload Identify Card / Passport scan file 上传证件扫描件 </label>
                <upload2 :readonly="readonly" name="upload3" v-model="form.idscanAttachment" buttonText="Upload Attachment " :attachments="form.idscanAttachments" multi="true"></upload2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  检索模态框-->
          <div class="modal fade" id="modal-defaultcheck">
      <div class="modal-dialog" style="width: 900px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"> Choose a Service Vender Info  选择一个服务商信息</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-muted well well-sm no-shadow mar-bot-10">
                  <div class="row">
                    <div class="form-group col-md-3">
                      <label for="">Vendor Name 供应商名称</label>
                      <input type="text" class="form-control" id="vendorNames" placeholder="Vendor Name 供应商名称">
                    </div>


                    <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                      <button type="submit" class="btn btn-primary" title="选择" @click="drawVendorName();"><i class="fa fa-fw fa-search"></i> Search</button>
                    </div>
                  </div>

                </div>
                <table class="table table-bordered table-hover" id="exampleName">

                  <thead>
                  <tr role="row">
                    <th>Vendor Name </th>
                    <th v-show="form.applicationType==1">Service Content</th>
                    <th v-show="form.applicationType==2">Contract Period</th>
                    <th v-show="form.applicationType==2">Onsite Manager</th>
                    <th v-show="form.applicationType==2">Onsite Manager Telephone</th>
                    <th >Select</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>301000001</td>
                    <td>EHS</td>
                    <td>yong.ang@atd.volkswagen.com.cn</td>
                    <td>Zhou Ashuang</td>
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





        <!-- 声明 section -->
        <!-- <div class="checkbox mar-bot-20" v-if="!readonly">
	          <label>
	            <input type="checkbox">When submitting the application, I have read and agreed to <a href="http://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.. </a> 当提交此申请时，我已经理解并承诺遵守大众汽车自动变速器（天津）有限公司的<a href="#">相关政策</a>。
	          </label>
	      </div> -->
        <div class="checkbox mar-bot-20" v-if="!readonly">
        <label>
								<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  				<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf">大众汽车自动变速器（天津）有限公司的相关政策。</a>
               				 </label>
      </div>

     <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>

      <router-view v-if="!confirmkey" :form="form" entityId="LongTermVisitCard" vclass="btn-left" uri="/form/LongTermVisitCard/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit"></router-view>
    	 <back :vclass="vclass" v-if="confirmkey"></back>
      <Approve v-if="confirmkey" :form="form" entityId="LongTermVisitCard" vclass="btn-left"  labelName="Confirm" :validator="this.$validator"></Approve>

      <comment-list v-if="form.processInstanceId !=null"></comment-list>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Main Footer -->

<!-- </div> -->
<!-- ./wrapper -->
</template>
<!-- REQUIRED JS SCRIPTS -->


<script>
	import jQuery from "jquery"
	import adminlte from "adminlte"
	//import bootstrap from "bootstrap"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"
export default {
		name: 'LongTermVisitCard',

		methods:{
      	beforesubmit:function(){
      // var value = this.form.fullDate;
      // var startDate=value.substring(0,10);
      // var endDate=value.substring(11,23);
      //   var smonth=startDate.substring(0,2);
      //    var sdays=startDate.substring(3,5);
      //   var syear=startDate.substring(6,10);
      //   console.log(startDate);
      //   console.log(endDate);
      //    var emonth=endDate.substring(0,2);
      //    var edays=endDate.substring(3,5);
      //   var eyear=endDate.substring(6,10);
      //    var  d=new Date();
      //    d.setFullYear(syear);
      //    d.setMonth(smonth-1+3);
      //    d.setDate(sdays);
      //      var ed=new Date();
      //    ed.setFullYear(eyear);
      //    ed.setMonth(emonth-1);
      //    ed.setDate(edays);
      //        if(ed>d){
      //      $.alert("Contract Period cannot be more than three months.服务合同有效期限不能超过三个月。");
      //        //this.form.fullDate="";
      //        	this.form.submitstatus=false;
      //        }else{
      //          	this.form.submitstatus=true;
      //        }

				},
        doAfterSelectVendorName: function(data) {
        if(this.form.applicationType==1){
           this.form.verdorName = data.verdorName;
          this.form.serviceContent = data.serviceContent;
        }else{
        this.form.verdorName = data.verdorName;
        this.form.fullDate = data.fullDate;
        this.form.onsiteManager = data.onsiteManager;
        this.form.onsiteManagerTelephone = data.onsiteManagerTelephone;
        this.form.onsiteServiceContent=data.onsiteServiceContent;
        }
        },


    setDate:function(){
      if(this.form.applicationType==1){
      $('#cardPeriod').daterangepicker({
        "linkedCalendars": false,
         dateLimit : {
              months : 6
            } //起止时间的最大间隔
			}, function(start, end) {

				$('#cardPeriod').val(start.format('MM/DD/YYYY') + '-' + end.format('MM/DD/YYYY'));
				$("#startDate").val(start.format('MM/DD/YYYY'));
				$("#endDate").val(end.format('MM/DD/YYYY'));

			});
      }else{
        $('#cardPeriod').daterangepicker({
        "linkedCalendars": false,

			}, function(start, end) {

				$('#cardPeriod').val(start.format('MM/DD/YYYY') + '-' + end.format('MM/DD/YYYY'));
				$("#startDate").val(start.format('MM/DD/YYYY'));
				$("#endDate").val(end.format('MM/DD/YYYY'));

			});
      }
    },
     setAbsentPersonDisabled:function(){

      //  $("#absentPersonName").attr("readonly","");
      //  $("#absentPersonNo").attr("readonly","");
        $("#absentPersonName").hide();
        $("#absentPersonNo").hide();
       $("#absentPersonName").val("");
       $("#absentPersonNo").val("");
     },
      setAbsentPersonAbled:function(){
       //$("#absentPersonName").removeAttr("readonly");
      // $("#absentPersonNo").removeAttr("readonly");
        $("#absentPersonName").show();
       $("#absentPersonNo").show();

     },
     //全选和反选
     checkAlls:function(){
       // var temp = $("#checkallName").is(':checked');
      // console.log(temp);

      //$("#checkallName").attr("checked",false);
     $("input[name='test']").prop("checked",$("#checkallName").prop("checked"));
     //  if(temp){

      //     $("input[name='test']").attr("checked","checked");
      //   }else{
      //     $("input[name='test']").attr("checked",false);
      //   }

     },
      plushUser2:function(){
        this.form.applicationType=2;
        this.form.ltcvType=1;
        this.form.verdorName=null;
         this.form.serviceContent=null;
         var deleteList = this.deleteLtcvlist;
          this.form.onsiteServiceContent=null;
       this.form.onsiteManager=null;

           this.form.onsiteManagerTelephone=null;
        deleteList(this.form.tempDate);
      $("#exampleName").DataTable().draw();

     },
      plushUser:function(){
         this.form.verdorName=null;
          this.form.serviceContent=null;
        this.form.onsiteServiceContent=null;
       this.form.onsiteManager=null;

           this.form.onsiteManagerTelephone=null;
         this.form.osscType=1
        this.form.applicationType=1;
         var deleteList = this.deleteLtcvlist;
         deleteList(this.form.tempDate);
      $("#exampleName").DataTable().draw();

     },
      plushcvmodal:function(){
       $("#examples").DataTable().draw();

     },
    //校验字符不大于300个
     checkString:function(flag){
        var reg =/^[0-9]*$/;
				if($("#onsiteServiceContent").attr("readonly")) {
          //只读不做操作

				} else {
					if(flag) {
             console.log(23);
							var value=flag;
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
					$.alert('300 Characters Max for reason. 原因最多只能填写300个字节。');

	 				this.form.onsiteServiceContent=limitvalue;
					}
				}



     },

     //批量上传1
      upload: function (event) {
         var code = this.form.createUserId;
          let file = event.target.files[0]
        var zipFormData = new FormData();
         //console.log(this.form.tempDate);
       var tempDate =this.form.tempDate;
        var tikectNo=this.form.ticketNo;
        zipFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
         //let config = { headers: { 'Content-Type': 'multipart/form-data'} };
        zipFormData.append('code', code);
       zipFormData.append('tempDate', tempDate);
       zipFormData.append('tikectNo', tikectNo);
       //zipFormData.append('time', new Date().getTime());
        this.$http.post(Config.getBaseURL() + "/LongTermVisitCard/uploadServicePerson", zipFormData,{
        headers: {"Content-Type": "multipart/form-data"}
        }).then(function (response) {
          console.log(response);
          console.log(response.data);
           if(response.data.form=='false'){
             $.alert("Excel format error, please submit after correction.Excel格式错误，请更正后提交！")
           }if(response.data.form=='true'){
             $("#ltcvtable").DataTable().draw();
           }

        });
      },

      //批量上传2
      uploadonsite: function (event) {
         var code = this.form.createUserId;
         var tempDate =this.form.tempDate;
          var datesd =this.form.fullDate;
           var tikectNo=this.form.ticketNo;
          let file = event.target.files[0]
        var zipFormData = new FormData();
        zipFormData.append('datesd', datesd);
        zipFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
         //let config = { headers: { 'Content-Type': 'multipart/form-data'} };
        zipFormData.append('code', code);
         zipFormData.append('tikectNo', tikectNo);
        zipFormData.append('tempDate', tempDate);
        this.$http.post(Config.getBaseURL() + "/LongTermVisitCard/uploadServicePersonOnsite", zipFormData,{
        headers: {"Content-Type": "multipart/form-data"}
        }).then(function (response) {
          console.log(response);
          console.log(response.data);
           if(response.data.form=='false'){
             $.alert("Excel format error, please submit after correction.Excel格式错误，请更正后提交！")
           }if(response.data.form=='true'){
             $("#ltcvtable").DataTable().draw();
           }

        });
      },
    //选择添加人
    surePerson: function() {
    var checkeds =  $("input[name='test']:checked");
    var tempDate= this.form.tempDate;
    var staffcode=this.form.createUserId;
    var tikectNo=this.form.ticketNo;
    if(this.form.applicationType==2){
    var valueDate = this.form.fullDate;
    }else{
      var valueDate='N';
    }
    //console.log(checkeds[0].id);
    // console.log(tempDate);
     // console.log(staffcode);
    for(var i = 0;i<checkeds.length;i++){

      //从模态框中批量添加用户
           $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/addPerson",
            //async:false,
            data: {
             "id": checkeds[i].id,
            "tempDate": tempDate,
            "staffcode":staffcode,
             "valueDate":valueDate,
              "tikectNo":tikectNo

          },
            type: 'get',
            dataType: 'json',
            success: function(data) {
               $("#closePerson").click();
               $("#ltcvtable").DataTable().draw();
               $("#nameSearch").val("");
              },

        });
    }
   $("#checkallName").removeAttr("checked");
   },
  //一次添加所有人
  surePersonAll:function () {
     var tempDate= this.form.tempDate;
     var nameSearch = $("#nameSearch").val();
      var type = this.form.applicationType;
       var vendorName = this.form.verdorName;
       var staffcode=this.form.createUserId;
       var tikectNo=this.form.ticketNo;
      if(this.form.applicationType==2){
        var valueDate = this.form.fullDate;
      }else{
       var valueDate='N';
      }
       //从模态框中批量添加用户
           $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/addPersonAll",
            //async:false,
            data: {
             "type": type,
            "tempDate": tempDate,
            "nameSearch":nameSearch,
            "vendorName":vendorName,
            "staffcode":staffcode,
             "valueDate":valueDate,
              "tikectNo":tikectNo
          },
            type: 'get',
            dataType: 'json',
            success: function(data) {
               $("#closePerson").click();
               $("#ltcvtable").DataTable().draw();
               $("#nameSearch").val("");
              },

        });

  },

    //关闭模态框
    	closeltcvmodal: function() {
       $("#UserListId").val("");
        $("#personName").val("");
        $("#idno").val("");
        $("#position ").val("");
        $("#startDate").val("");
        $("#endDate").val("");
        $("#reason").val("");
        $('#reasonRadio1').prop("checked",true);
        $("#absentPersonName").attr("readonly","");
      //  $("#absentPersonNo").attr("readonly","");
         $("#absentPersonNo").hide();
        // $("[name='reasonRadio']").removeAttr("checked");
        $("#absentPersonName").val("");
        $("#absentPersonNo").val("");
        $("#serviceContent").val("");
        // $('#cardPeriod').val("");
        $("#ltcvtable").DataTable().draw();
        $("#ltcvClose").click();

      },
      //检验时间

      	checkDate: function() {
            var value = this.form.fullDate;
            var startDate=value.substring(0,10);
            var endDate=value.substring(12,23);
            // var startsd=  $("#startDate").val();
            // var endsd= $("#endDate").val();
            var dateTem = $("#cardPeriod").val();
            var startsd= dateTem.substring(0,10);
            var endsd= dateTem.substring(12,23);
            var smonth=startDate.substring(0,2);
            var sdays=startDate.substring(3,5);
            var syear=startDate.substring(6,10);
            var sdmonth=startsd.substring(0,2);
            var sddays=startsd.substring(3,5);
            var sdyear=startsd.substring(6,10);
            console.log(smonth);
            console.log(sdays);
            console.log(syear);
            console.log(sdmonth);
            console.log(sddays);
            console.log(sdyear);

            console.log(startDate);
            console.log(endDate);
            console.log(startsd);
            console.log(endsd);
            var emonth=endDate.substring(1,3);
            var edays=endDate.substring(4,6);
            var eyear=endDate.substring(7,11);
            var edmonth=endsd.substring(1,3);
            var eddays=endsd.substring(4,6);
            var edyear=endsd.substring(7,11);
              console.log(emonth);
            console.log(edays);
            console.log(eyear);
            console.log(edmonth);
            console.log(eddays);
            console.log(edyear);

            var d=new Date();
            d.setFullYear(syear);
            d.setMonth(smonth-1);
            d.setDate(sdays);
            var sd=new Date();
            sd.setFullYear(sdyear);
            sd.setMonth(sdmonth-1);
            sd.setDate(sddays);

            var ed=new Date();
            ed.setFullYear(eyear);
            ed.setMonth(emonth-1);
            ed.setDate(edays);
            var edd=new Date();
            edd.setFullYear(edyear);
            edd.setMonth(edmonth-1);
            edd.setDate(eddays);
             console.log(d);
            console.log(sd);
            console.log(ed);
            console.log(edd);

                if(d>sd||ed<edd){
              $.alert("The visit card period should within contract period.供应商卡有效期限应在服务合同有效期内。");
                this.flag='N';

                }else{
                    this.flag='Y';
                }
        },

     saveLtcvInfo:function (){
          var check = this.checkDate;
          this.flag='Y'
          if(this.form.applicationType==2){
            check();
          }
          if(this.flag=='Y'){
          var staffcode=this.form.createUserId;
          var tempDate= this.form.tempDate;
          var applicationType=this.form.applicationType;
          var personName=$("#personName").val();
          var ido=$("#idno").val();
          var position=$("#position ").val();
          var cardPeriod = $('#cardPeriod').val();
          var startDate=$("#startDate").val();
          var endDate=$("#endDate").val();

          if(startDate==null ||startDate==''){
            startDate=cardPeriod.substring(0,10);
            endDate=cardPeriod.substring(12,23);
            console.log(startDate);
            console.log(endDate);

          }
          var reason=$("input[name='reasonRadio']:checked").val();
          var absentPersonName=$("#absentPersonName").val();
          var absentPersonNo=$("#absentPersonNo").val();
          var serviceContent=$("#serviceContent").val();
          var tikectNo=this.form.ticketNo;
          var personid = $("#UserListId").val();
          var closeLtcv=this.closeltcvmodal;
          $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/saveLtcvInfo",
            data: {
              "staffcode":staffcode,
              "personName":personName,
              "ido":  ido,
              "startDate": startDate,
              "endDate": endDate,
              "reason": reason,
              "absentPersonName": absentPersonName,
              "absentPersonNo": absentPersonNo,
              "serviceContent": serviceContent,
              "tikectNo":tikectNo,
              "personid":personid,
              "position":position,
              "applicationType":applicationType,
              "tempDate":tempDate
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {

              closeLtcv();
            },
            error: function(msg) {
              $.alert(msg);
             // this.closemodal;

            }
				});
          }
     },
   	validateAllFn: function(callbackfunction, validateScope) {
				this.$validator.validateAll(validateScope).then(result => {

					if(result) {
          //校验离职员工
          var reason=$("input[name='reasonRadio']:checked").val();
          var absentPersonName=$("#absentPersonName").val();
          var absentPersonNo=$("#absentPersonNo").val();
          var personName=$("#personName").val();
          var ido=$("#idno").val();
          var b=true;
          var c=true;
          //校验用户名是否已注册
          console.log(this.form.osscType);
           if((this.form.osscType==1 && this.form.applicationType==2) || (this.form.ltcvType==1 && this.form.applicationType==1)){
           $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/chenckInfoTwwo",
            async:false,
            data: {
            // "personName": personName,
            "ido": ido
          },
            type: 'get',
            dataType: 'json',
            success: function(data) {

              console.log(data);
              if(data.obj=='Y'){
                 $.alert("Personal ID number or passport number has already been registered.身份证号或护照号已经被注册。");
                 b=false;
                  c=false;
                 return;
                 }else{


                 b=true;
                 c=true;
                 }
              },

        });
      }else{
        b=true;
        c=true;
      }
        if(c){
          if(reason==2){
             if(absentPersonNo==null||absentPersonNo==""){
                $.alert("Please fill out Absent personal ID number or passport number.请填写离职员工身份证号或护照号。");
                b=false;
             }else{
              // var absentPersonName=$("#absentPersonName").val();
            var absentPersonNo=$("#absentPersonNo").val();
            $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/chenckInfo",
            async:false,
            data: {
            // "absentPersonName": absentPersonName,
            "absentPersonNo": absentPersonNo
          },
            type: 'get',
            dataType: 'json',
            success: function(data) {
              console.log(data);
              if(data.obj=='N'){
                 $.alert("Please fill in the correct Absent personal ID number or passport number.请填写正确的离职员工身份证号或护照号。");
                 b=false;
                 return;
                 }else{


                 b=true;
                 }
              },

        });
             }
          }else{
             b=true;
          }
        }
          if(b){
             callbackfunction();
            }

					} else {
						//$.alert("correct them");
					}
				});
			},
      //删除一条数据
      deleteLtcv:function(data){
        var rowID=data.id;
        $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/deleteLtcvInfo",
            data: {
              "rowID": rowID
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {

               $("#ltcvtable").DataTable().draw();
            },
            error: function(msg) {
              $.alert(msg);


            }
				});

      },

       //切换批量删除
      deleteLtcvlist:function(tem){
       console.log(21423);
        $.ajax({
            url: Config.getBaseURL() + "/LongTermVisitCard/deleteLtcvInfolist",
            data: {
              "tempDate": tem
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {

               $("#ltcvtable").DataTable().draw();
            },
            error: function(msg) {
              $.alert(msg);


            }
				});

      },
			check:function(){

				return ((this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit')==-1)||(this.form.processInstanceId !=null && this.form.status != null && this.form.status != 2 && this.form.status != 9));
			},
        onbehalfclick: function() {
            var temp = $("#onbehalf").is(':checked');
            this.onbehalf = temp;
           if(temp==true){
              this.form.isOnbehalf="1";
           }else{
              this.form.isOnbehalf="0";
            this.form.createUserId=this.tempcreateUserId;
             console.log(this.tempcreateUserId);
            this.form.applicantUserId = this.tempcreateUserId;;
            this.form.creatorStaffcode=this.tempcreatorStaffcode;
            this.form.creatorName=this.tempcreatorName;
            this.form.creatorPhoneNum=this.tempcreatorPhoneNum;
            this.form.creatorDept=this.tempcreatorDept;

           }
			},

			doAfterSelectOtherPerson:function(data){
				$('#selectotherperson').attr("class","input-group-btn");

			  //this.form.createUserId = data.id;
        console.log(data.id);
        this.form.applicantUserId = data.id;
				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName=data.printENName;
				this.form.creatorPhoneNum=data.mobile;
				this.form.creatorDept=data.department;

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
	    		console.log("this is check");
	    	},
        //---------ltcvtable start---------------//
        ltcvDraw: function() {
          // alert("a");
				$("#ltcvtable").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				  var staffcode = this.form.createUserId;
          var tikectNo=this.form.ticketNo;
          var type = this.form.applicationType;
          var tempDate = this.form.tempDate;
          console.log(type);

				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffcode": staffcode,
            "tikectNo": tikectNo ,
            "applicationType": type,
            "tempDate":tempDate
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
      },

      drawcostcenter: function() {
        $("#examples").DataTable().draw();
      },

        drawVendorName: function() {
        $("#exampleName").DataTable().draw();
      },
      //驻场信息搜索
      retrievecostcenterData: function(url, aoData, fnCallback) {
        var nameSearch = $("#nameSearch").val();
        var type = this.form.applicationType;
        var vendorName = this.form.verdorName;
        console.log(type);
        $.ajax({
          url: url, //这个就是请求地址对应sAjaxSource
          data: {
            "aoData": JSON.stringify(aoData),
            "nameSearch": nameSearch,
            "vendorName": vendorName,
            "type": type

          }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
          type: 'get',
          dataType: 'json',
          success: function(data) {
            console.log(data);
            fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
          },
          error: function(msg) {
            $.alert(msg.responseText);
          }
        });
      },
    //检索厂商

      retrievevendorName: function(url, aoData, fnCallback) {
        var vendorNames = $("#vendorNames").val();
        var type = this.form.applicationType;
        console.log(type);
        $.ajax({
          url: url, //这个就是请求地址对应sAjaxSource
          data: {
            "aoData": JSON.stringify(aoData),
            "vendorNames": vendorNames,
            "type": type

          }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
          type: 'get',
          dataType: 'json',
          success: function(data) {
            console.log(data);
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
			},
      //------------------ltcvtable end-------------------/



		},
		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id){
				var url = "/form//LongTermVisitCard/get/"+id;
			}else{
				var url = "/form//LongTermVisitCard/create/";
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
    dm.onbehalf = false;

				dm.tempcreateUserId=dm.form.createUserId;
				dm.tempcreatorStaffcode=dm.form.creatorStaffcode;
				dm.tempcreatorName=dm.form.creatorName;
				dm.tempcreatorPhoneNum=dm.form.creatorPhoneNum;
				dm.tempcreatorDept=dm.form.creatorDept;
			return dm;
		},
		watch:{

			"form.travelType":{
				handler(curVal,oldVal){
					console.log("travel type="+curVal);
				},
				deep:true
			}
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
      confirmkey:{
				// 动态计算是否显示confirm按钮
				get:function() {
					return (this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('usertask4') != -1 && (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)) || (this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('usertask3') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)));
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
      confirmSee:{
				// 动态计算是否显示confirm按钮
				get:function() {
					return this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('usertask4') != -1;
				}
			},
      readonly: {
				// 动态计算readonly的值
				get: function() {
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
       readonlyAmount: {
				// 动态计算readonly的值
				get: function() {
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1 && this.form.createUserId != localStorage.getItem("uid")) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9 && this.form.createUserId != localStorage.getItem("uid"));
				}
			},

			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			},
       setAttachment:{
         get:function(){
          var appType=this.form.applicationType;
          var ltcvType=this.form.ltcvType;
          var osscType=this.form.osscType;
          if((appType==1&&ltcvType==1)||(appType==2&&osscType==1)){
            return true;
          }else{
            return false;
          }

         }

      }
		},
		mounted(){
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

      form.applicationAmount=formatCurrency(form.applicationAmount);
       console.log(111111111111);
      console.log(form.applicationAmount);

        $('#cardPeriod').val("");
    	var queryData = this.retrieveData;
      var deleteLtcv=this.deleteLtcv;
			var draw = this.ltcvDraw;
      var isRead=this.check;
			var table = $("#ltcvtable").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/LongTermVisitCard/findLtcvInfo",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [0,1,2,3,4,5,6,7,8]
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [
              {data: "no"},
              {data: "personName"},
              {data: "ido"},
              {data: "personPosition"},
              {data: "suppliersCardPeriod"},
              {data: "reason"},
              {data: "serviceContent"},
              {data: "applicationDate"},
              {data: null},
              {data:"id"}

				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					 $('td:eq(0)', row).html(index+1);
              $('td:eq(1)', row).html(data.personName);
             $('td:eq(2)', row).html(data.ido);

             if(data.applicationType==1){
             if(data.personPosition==null||data.personPosition==''){
                $('td:eq(3)', row).hide();
              }else{
                $('td:eq(3)', row).html(data.personPosition);
             }
             }else if(data.applicationType==2){
                if(data.personPosition==null||data.personPosition==''){
                 $('td:eq(3)', row).html('');
              }else{
                $('td:eq(3)', row).html(data.personPosition);
             }
             }
				    $('td:eq(4)', row).html(data.suppliersCardPeriod);
            $('td:eq(5)', row).html(data.reason);
            if(data.serviceContent==null||data.serviceContent==''){
              $('td:eq(6)', row).hide();
              $('td:eq(7)', row).hide();
            }else{
            $('td:eq(6)', row).html(data.serviceContent);
            $('td:eq(7)', row).html(data.applicationDate);
            }
            if(!isRead()){
              $('td:eq(8)', row).html("<a href='#' class='ltcv-edit' data-toggle='modal' data-target='#modal-ltsp'>Edit</a> <a  class='ltcv-delete' style='margin-left: 5px' href='javascript:;' >Delete</a> ");
              $('td:eq(9)', row).hide();
            }else{
               $('td:eq(8)', row).html("");
               $('td:eq(9)', row).hide();
            }
					return row;
				}
			});
    //续卡弹出框
    var _this = this;

      var tableCostCenter = $("#examples").DataTable({
        "fnServerData": _this.retrievecostcenterData,
        "sAjaxSource": Config.getBaseURL() + "/LongTermVisitCard/listcostcenter",
        "serverSide": true,
        "filter": false,
        "lengthChange": false,
        "aoColumnDefs": [{
          "bSortable": false,
          "aTargets": [5]
        }],
        "aaSorting": [
          [0, "desc"]
        ], //给列表排序
     columns: [{
          data: "vendorName"
        },
          {
            data: "personName"
          },
          {
            data: "ido"
          },
          {
            data: "applicationDate"
          },
           {
            data: "status"
          },

          {
            data: null
          }
        ],
        "fnRowCallback": function(row, data, index) { //设置列从0开始
         $('td:eq(5)', row).html("<td class='text-center'><input type='checkbox' id="+data.id+" name='test'></td>");
          $('td:eq(4)', row).html(data.status=="Active"?"<td class='text-green'>Active 在职</td>" :"<td class='text-muted'>Inactive 离职</td>");
        //$('td:eq(4)', row).html(data.id);
           return row;

        }
      });

      //检索模态框exampleName
       var tableCostCenter = $("#exampleName").DataTable({
        "fnServerData": _this.retrievevendorName,
        "sAjaxSource": Config.getBaseURL() + "/LongTermVisitCard/searchVendorName",
        "serverSide": true,
        "filter": false,
        "lengthChange": false,
        "aoColumnDefs": [{
          "bSortable": false,
          "aTargets": [5]
        }],
        "aaSorting": [
          [0, "desc"]
        ], //给列表排序
     columns: [{
          data: "verdorName"
        },
          {
            data: "serviceContent"
          },
          {
            data: "fullDate"
          },
          {
            data: "onsiteManager"
          },
           {
            data: "onsiteManagerTelephone"
          },

          {
            data: null
          }
        ],
        "fnRowCallback": function(row, data, index) { //设置列从0开始
         if(data.applicationType==1){
           $('td:eq(1)', row).html(data.serviceContent);
            $('td:eq(2)', row).hide();
             $('td:eq(3)', row).hide();
              $('td:eq(4)', row).hide();
              if((data.verdorName==null||data.verdorName=='')){
                $( row).hide();
              }
         }else if(data.applicationType==2){

            $('td:eq(1)', row).hide();
             $('td:eq(2)', row).html(data.fullDate);
              $('td:eq(3)', row).html(data.onsiteManager);
               $('td:eq(4)', row).html(data.onsiteManagerTelephone);
               if((data.verdorName==null||data.verdorName=='')){
                $( row).hide();
              }

         }
         $('td:eq(5)', row).html('<a href="javascript:;" class="opt-select" ><i class="fa fa-check"></i></a>');

         // $('td:eq(4)', row).html(data.status=="Active"?"<td class='text-green'>Active 在职</td>" :"<td class='text-muted'>Inactive 离职</td>");
        //$('td:eq(4)', row).html(data.id);
           return row;

        }
      });
    //拿取模态框查询出来的数据赋值到页面
      $('#exampleName tbody').on('click', '.opt-select', function() {
        var row = $(this).parents("tr");
        var data = tableCostCenter.row(row).data();
        _this.doAfterSelectVendorName(data);
        $("#modal-defaultcheck").modal('hide');

      });



    //人员编辑删除
			var router = this.$router;
    	$('#ltcvtable tbody').on('click', '.ltcv-delete', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
			  deleteLtcv(data);
      });
        //校验字符不大于20个
    $("#onsiteServiceContent").on('blur', function() {
        console.log(2432)
        var reg =/^[0-9]*$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
							var value=$(this).val();
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
					$.alert('300 Characters Max for reason. 原因最多只能填写300个字节。');

	 				this.form.onsiteServiceContent=limitvalue;
					}
				}
			});


      	$('#ltcvtable tbody').on('click', '.ltcv-edit', function() {
				var row = $(this).parents("tr");
        var data = table.row(row).data();
           $("#personName").val(data.personName);
           $("#idno").val(data.ido);
           $("#startDate").val(data.startDate);
           $("#endDate").val(data.endDate);
          $("#position").val(data.personPosition);
           $("#UserListId").val(data.id);

         $("#cardPeriod").val(data.suppliersCardPeriod);

           if(data.reason.indexOf("业务增加")<0){

             $('#reasonRadio2').prop("checked",true);
            //  $("#absentPersonName").removeAttr("readonly");
            //   $("#absentPersonNo").removeAttr("readonly");
            $("#absentPersonNo").show();
         }else{
           $('#reasonRadio1').prop("checked",true);
      //       $("#absentPersonName").attr("readonly","");
      //  $("#absentPersonNo").attr("readonly","");
      $("#absentPersonNo").hide();

         }

           $("#absentPersonName").val(data.absentPersonName);
           $("#absentPersonNo").val(data.absentPersonNo);
           $("#serviceContent").val(data.serviceContent);

			});
			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form)=>{
				this.form = form;
			});
		}
	}

</script>

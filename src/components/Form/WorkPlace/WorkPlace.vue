<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Workplace Application</h1>
      <ol class="breadcrumb">
        <li>
          <a>1.Applicant</a>
        </li>
        <li v-if="form.applicationType==1 || form.applicationType==3">
          <a>2.Supervisor(MK or above FG >= T+/29)</a>
        </li>
        <li>
          <a v-if="form.applicationType==1 || form.applicationType==3">3.Head of IT</a>
          <a v-else>2.Head of IT</a>
        </li>
        <li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a v-if="form.applicationType==1 || form.applicationType==3">4.BOMC/BOMT</a>
          	<a v-else>3.BOMC/BOMT</a>
				</li>
        <li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a v-if="form.applicationType==1 || form.applicationType==3">5.IT Client Service</a>
          <a v-else>4.IT Client Service</a>

				</li>
         <li v-if="!(form.policyDeviation=='true'||form.policyDeviation)">
					<a v-if="form.applicationType==1 || form.applicationType==3">4.IT Client Service</a>
				<a  v-else>3.IT Client Service</a>
        </li>
      </ol>
     <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}} </strong>
		</span>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">

      <!-- 申请类型starts-->
      <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title"> Application Type 申请类型</h3>
          </div>
          <form role="form" class="ng-pristine ng-valid">
            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
                        <label style="margin-right: 10px;"><input type="radio" v-model="form.applicationType" name="optionsRadios" id="optionsRadios1" value="1"  :disabled="readonly">Apply new Devices 申请新设备</label>
                  </div>

                </div>
                <div class="col-md-3">
                  <div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
                        <label style="margin-right: 10px;"><input type="radio" v-model="form.applicationType" name="optionsRadios" id="optionsRadios1" value="2" :disabled="readonly">Replace Devices 更换已有设备</label>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
                        <label style="margin-right: 10px;"><input type="radio" v-model="form.applicationType" name="optionsRadios" id="optionsRadios1" value="3" :disabled="readonly">Borrow Devices 借用设备</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      <!-- 申请类型end-->


      <!-- 申请人信息starts-->
       <div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Applicant Info. 申请人信息 </h3>
					<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox" id="onbehalf" @click="onbehalfclick" ><strong> On Behalf</strong> </label></div>
					 <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtnwp" href="#collapseZerowp"><i class="fa fa-plus" id="minusplusiwp"></i></button>
            </div>
        </div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
					<input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">

            <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
					<div class="box-body declare-box form-group">
						<div class="row">
							<!--不选中的时候显示-->
							<form-group v-if="!onbehalf"  col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<!--选中的时候显示-->
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
								 <label for="">
                   <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
                    Staff Code 员工号 </label>
									<div class="input-group ">
										<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                      <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    </span>
									</div>
								</div>
						</div>
							<form-group col="md-3" type="input"  v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							<form-group col="md-3" type="input"  v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
						</div>

						<div class="row  panel-collapse collapse "  id="collapseZerowp">
							<form-group col="md-3" type="input"  v-model="form.creatorTitle" name="title" readonly="readonly"></form-group>
							<form-group col="md-3" type="input"  v-model="form.creatorEmail" name="eamil" readonly="readonly"></form-group>
						</div>
        	</div>
				</form>
			</div>
<!-- 申请人信息end-->

<!--审核页面的套装人员选择 starts-->
          <div class="box box-primary" v-if="itService&& form.applicationType==1">
          <div class="box-body">
            <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <input type="hidden" v-model="form.userId" name="userId" id="userId">
                    <!-- <input type="hidden" v-model="form.userName" name="userName" id="userName"> -->
                    <input type="hidden" v-model="form.userStaffcode" name="userStaffcode" id="userStaffcode">
                    <input type="hidden" v-model="form.userDept" name="userDept" id="userDept">
                      <label for=""> Employee Standard Set Owner 套装设备使用员工 </label>
                      	<div class="input-group " v-if="this.form.status != 0">
                          <input type="text" class="form-control" placeholder="Name 姓名" id="userName" name="userName" v-model="form.userName" readonly="readonly">
                          <span class="input-group-btn" id="selectotherUser">
                            <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherUser"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                          </span>
									      </div>
                          <div  v-if="this.form.status == 0">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Name 姓名" id="userName" name="userName" v-model="form.userName" readonly="readonly">
                            </div>
                          </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
<!--审核页面的套装人员选择 ends-->

   <!-- 套装申请页面starts-->
        <div class="box box-primary" v-if="!readonly && form.applicationType==1" id="wpes">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Employee Standard Set 套装 &nbsp;&nbsp; &nbsp;&nbsp; </h3><label><input type="checkbox"  @click="checkBoxSet" id="onboard" v-model="form.onboard"><strong> On Board 入职</strong> </label>
            <span class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i> Select the checkbox if HR sent the onboard email notification. 如果收到人力资源发送的入职通知，请选择该选项 </span>
             <div class="box-tools pull-right">
              <!-- <button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtnwpes" href="#collapseZerowpes"><i class="fa fa-plus" id="minusplusiwpes"></i></button> -->
            </div>
            <!-- /.box-tools -->
          </div>
          <div class="box-body" v-show="form.onboard">
            <div class="row">
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                 <ul class="nav nav-tabs" id="tagType">
                    <li :class="{'tab-pane':true,  'overflow-auto':true, 'text-center':true,'active':(entry.id==form.employeeType)||(!form.employeeType&&index==0)}" v-bind:key="index" v-for="(entry,index) in form.wpEmployeeStandard" ><a :href="'#tab_'+index"  data-toggle="tab" @click="checkSet(entry.id,index,entry.name)">{{index+1}}.{{entry.name}}</a></li>
                  </ul>
                  <div class="tab-content workspace-tz">
                    <div :class="{'tab-pane':true,  'overflow-auto':true, 'text-center':true,'active':(entry.id==form.employeeType)||(!form.employeeType&&index==0)}" v-bind:key="index" v-for="(entry,index) in form.wpEmployeeStandard" :id="'tab_'+index">
                      <!-- <div class="checkbox text-left">
                        <div >
                          <strong>Standard Set for {{entry.name}} : &nbsp;&nbsp;</strong>
                         <label>
                            <input type="checkbox"  name='test' :id="'checkbox_'+index"  @click="checkSet(entry.id,index,entry.name)"> &nbsp;
                          </label>
                        </div>
                        </div> -->
                      <div class="col-md-2 col-sm-6 col-xs-12"  v-bind:key="indexs" v-for="(entrys,indexs) in entry.standardDeviceList">

                       <div :title="entrys.deviceDesc"> <img style='height: 120px;width: 120px;'   :id="'device'+indexs" :src="GL.getURL('/attachmentlob/downloadimage/'+entrys.devicePic)"></div>

                     <p class="text-center" >{{entrys.deviceName}}</p>
                        <!-- <input type="text" class="spinnerExample"/> -->
                        <button disabled style='color:#8B8970;font-size: 17px;font-weight:bold;' class="cut" @click="cuts(indexs)">-</button><button   style='margin-left: -3px;color:#0000FF;font-size: 17px;' disabled>1</button><button class="add" style='margin-left: -5px;color: #8B8970;font-size: 17px;font-weight:bold;'  @click="add(indexs)" disabled>+</button>
                       </div>

                    </div>

                  </div>
                  </div>

              </div>
            </div>
          </div>
        </div>

         <!-- 套装申请页面end-->

        <!-- 套装审核页面starts-->
         <div class="box box-primary" v-if="readonly && form.applicationType==1 && !itService && form.employeeType">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Employee Standard Set 套装</h3>
            <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
            <!-- /.box-tools -->
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">{{form.employeeName}}</a></li>

                  </ul>
                  <div class="tab-content workspace-tz">
                    <div class="tab-pane active" id="tab_1">
                      <div class="row">
                        <div class="col-md-9 col-xs-12">
                          <table class="table table-bordered table-hover" id="wpStandardtable">
                              <thead>
                                <tr role="row">
                                  <th>No.</th>
                                  <th>Device 设备 </th>
                                  <th>Device Name 设备名称</th>
                                  <th>Quantity 数量</th>
                                </tr>
                            </thead>
                            <tbody>
                          </tbody>
                        </table>
                        </div>
                      </div>
                    </div>
                    <!-- /.tab-pane -->
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>
          <!-- 套装审核页面end-->

          <!-- 套装发布页面starts-->
           <div class="box box-primary" v-if="itService && form.applicationType==1 && form.employeeType">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Employee Standard Set 套装</h3>
            <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
            <!-- /.box-tools -->
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">1.{{form.employeeName}}</a></li>

                  </ul>
                  <div class="tab-content workspace-tz">
                    <div class="tab-pane active overflow-auto" id="tab_1">
                      <table class="table table-bordered mar-bot-0 itservicetable">
                        <tbody><tr>
                          <th>No.</th>
                          <th class="text-center">Device 设备 </th>
                          <th>Device Name 设备名称</th>
                          <th>Substitute Device 替换设备</th>
                          <th>Substitute Reason 替换原因</th>
                          <th>Device SN Number 设备编号</th>
                          <th>Device Release Date 设备交付日期 </th>
                        </tr>
                        <tr v-bind:key="index" v-for="(entry,index) in form.wpFinStandardDeviceList">
                          <td>{{ index+ 1}}</td>
                          <td>
                            <input type="hidden" class="form-control" id="" v-model="entry.id">
                           <img :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
                          </td>
                          <td><p  >{{entry.deviceName}}</p></td>
                          <td>
                          	<form-group  type="select" other-rules=""  haslable="false" :readonly="itServiceReadonly" :uri="'/standarddevice/listforselect/'+entry.deviceType"    :name="'replaceDevice'+index" v-model="entry.replaceMentDevice"></form-group>
					              	</td>
                          <td>
                          	<form-group v-if="!entry.replaceMentDevice" type="input"  other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                          	<form-group v-if="entry.replaceMentDevice" type="input"  other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                          </td>

                          <td><form-group type="input" other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceNo" :name="'deviceSnno'+index"></form-group></td>
                          <td>
                            <form-group type="datepicker" :other-rules="itServicerules" v-model="entry.releaseDate" :name="'releaseDate'+index" haslable="false" :readonly="itServiceReadonly"></form-group>
                          </td>

                    </tr>






                      </tbody>
                    </table>
                    </div>
                    <!-- /.tab-pane -->
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>

          <!-- 套装发布页面end-->



          <!-- 扩展设备申请页面starts-->
        <div class="box box-primary" v-if="!readonly && (form.applicationType==1 ||form.applicationType==3)">
          <div class="box-header with-border">
            <h3 v-if="form.applicationType==1" class="box-title pull-left"> Extend Devices  扩展设备</h3>
            <h3 v-if="form.applicationType==3" class="box-title pull-left"> Borrow  借用 </h3>
            <span v-if="form.applicationType==3" class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i>Maximum of borrowing day is 30. 最长借用30天。 </span>
            <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool " data-toggle="collapse" id="minusplusbtnwped" href="#collapseZerowped"><i class="fa fa-minus" id="minusplusiwped"></i></button>
            </div>
            <!-- /.box-tools -->
          </div>



          <div class="box-body declare-box form-group panel-collapse collapse in " id="collapseZerowped">
            <div class="row">
               <form-group col="md-3" v-if="form.applicationType==3"  type="daterangepicker2" dateLimit="30"  other-rules="required" v-model="form.borrowDate" name="contractPeriod" :readonly="readonly"></form-group>
            </div>
             <div class="row">
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#extab_0" data-toggle="tab" aria-expanded="true">1.Standard</a></li>
                    <li class=""><a href="#extab_5" data-toggle="tab" aria-expanded="false">2.Non-Standard</a></li>
                  </ul>
                  <div class="tab-content overflow-auto">
                    <div :class="{'tab-pane':true,  'overflow-auto':true, 'text-center':true,'active':true}" v-bind:key="index" v-for="(entry,index) in form.wpExtendDevice" id="extab_0">

                      <div class="col-md-2 col-sm-6 col-xs-12"  v-bind:key="indexs" v-for="(entrys,indexs) in entry.standardDeviceList">
                        <div :title="entrys.deviceDesc"><img style='height: 120px;width: 120px;'  :id="'device'+indexs" :src="GL.getURL('/attachmentlob/downloadimage/'+entrys.devicePic)"></div>

                        <p class="text-center" >{{entrys.deviceName}} </p>
                        <!-- <input type="text" id="spinnValue" value="2" class="spinnerExample2" v-model="entrys.deviceNum"/> -->
                     <button style='color:#B22222;font-size: 17px;font-weight:bold;' class="cut" @click="cuts(indexs)">-</button><button   style='margin-left: -2.5px;color:#0000FF;font-size: 17px;'>{{entrys.deviceNum}}</button><button class="add" style='margin-left: -5px;color: #228B22;font-size: 17px;font-weight:bold;'  @click="add(indexs)">+</button>

                       </div>

                    </div>

                  <!-- Non Standard-->
                      <div class="tab-pane fade" id="extab_5">
                        <!-- <div class="row"> -->
                          <div class="form-group">
                            <div class="col-md-12" >

                              <table class="table table-bordered mar-bot-0" width="100%" height="15px" id="extendNon">
                                <tbody>
                                <tr>
                                  <th class="text-center" width="6%">No 编号</th>
                                  <th class="text-center">Device 设备名称</th>
                                  <th class="text-center">Model  设备型号</th>
                                  <th class="text-center">Quantity 数量</th>
                                  <th class="text-center">Purpose 申请原因</th>
                                <th  width="5%" v-if="!readonly" class="text-center">
                                    <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                                  </th>
                                </tr>
                                <tr v-bind:key="index" v-for="(entry,index) in form.wpExtendDeviceNon" style="height: 15px;">
                                  <td>{{ index+ 1}}</td>
                                  <td>
                                    <input type="hidden" class="form-control" id="" v-model="entry.id">
                                    <input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('deviceName') }" name="deviceName" :readonly="readonly" v-model="entry.deviceName" placeholder="Device"/>
                                  </td>
                                   <td>
                                    <input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('model') }" name="model" :readonly="readonly" v-model="entry.model" placeholder="Model"/></td>
                                  <td width="10%"><input type="text" :class="{'form-control':true,'number':true,'input':true, 'is-danger': errors.has('quantity'+index) }" :name="'quantity'+index" :readonly="readonly" v-model="entry.deviceNum" :index="index" :id="'quantity'+index" placeholder="Quantity"/></td>
                                  <td><input type="text" :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('extendReason') }" name="extendReason" :readonly="readonly" v-model="entry.extendReason" placeholder="Purpose"/></td>
                                <td v-if="!readonly" class="text-center" style="vertical-align: middle;">
                                    <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                                  </td>
                                </tr>

                                </tbody>
                              </table>
                               <!-- <div class="box box-primary"> -->
                                    <!-- <div class="box-header with-border">
                                      <h3 class="box-title"> Reason 原因 </h3>
                                    </div>
                                    <div class="box-body">
                                      <div class="row">
                                        <div class="col-md-12">
                                          <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('reason') }"  id="reason" name ="reason" rows="2" placeholder="" v-validate="'required'" v-model="form.extendReason" :disabled="readonly"></textarea>
                                        </div>
                                      </div>
                                    </div> -->
                                 <!-- </div> -->
                            </div>
                          </div>



                        </div>
                      <!-- </div> -->



                    <!-- /.tab-pane -->

                    <!-- /.tab-pane -->
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>


        <!-- 扩展设备审核页面 starts-->
        <div class="box box-primary" v-if="readonly && (form.applicationType==1 || form.applicationType==3)  && !itService &&(form.extendReason=='Y' || form.flag=='Y')">

         <div class="box-header with-border">
            <h3 v-if="form.applicationType==1" class="box-title pull-left"> Extend Devices  扩展设备</h3>
            <h3 v-if="form.applicationType==3" class="box-title pull-left"> Borrow  借用 </h3>
            <span v-if="form.applicationType==3" class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i>Maximum of borrowing day is 30. 最长借用30天。 </span>
            <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
            <!-- /.box-tools -->
          </div>
          <div class="box-body">
            <div class="row">
               <form-group col="md-3" v-if="form.applicationType==3"  type="daterangepicker2" dateLimit="30"  other-rules="required" v-model="form.borrowDate" name="contractPeriod" :readonly="readonly"></form-group>
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active" v-if="form.extendReason=='Y'"><a href="#extabsh_0" data-toggle="tab" aria-expanded="true">1.Standard</a></li>
                    <li class="" v-if="form.flag=='Y'&& form.extendReason=='Y'"><a href="#extabsh_5" data-toggle="tab" aria-expanded="false">2.Non-Standard</a></li>
                  <li class="" v-if="form.flag=='Y' && form.extendReason=='N'"><a href="#extabsh_5" data-toggle="tab" aria-expanded="true" >1.Non-Standard</a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="extabsh_0" v-if="form.extendReason=='Y'">
                      <!-- <div class="tab-pane active" id="tab_1"> -->
                        <div class="row">
                          <div class="col-md-9 col-xs-12">
                            <table class="table table-bordered table-hover" id="extendStandard">
                              <thead>
                                <tr role="row">
                                  <th>No.</th>
                                  <th>Device 设备 </th>
                                  <th>Device Name 设备名称</th>
                                  <th>Quantity 数量</th>
                                </tr>
                            </thead>
                            <tbody>
                          </tbody>
                        </table>
                          </div>
                        </div>
                      <!-- </div> -->
                      <!-- /.tab-pane -->
                    </div>

                  <div class="tab-pane fade" id="extabsh_5" v-if="form.flag=='Y'&& form.extendReason=='Y'">
                    <!-- <div class="tab-pane active" id="tab_1"> -->
                      <div class="row">
                        <div class="col-md-9 col-xs-12">
                          <table class="table table-bordered table-hover" id="extendStandardNon">
                              <thead>
                                <tr role="row">
                                <th>No.</th>
                                  <th>Device Name 设备名称</th>
                                  <th>Model  设备型号</th>
                                  <th width="10%">Quantity 数量</th>
                                  <th>Purpose 申请原因</th>
                                </tr>
                            </thead>
                            <tbody>
                          </tbody>
                        </table>

                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- /.tab-pane -->
                  </div>

                        <div class="tab-pane active" id="extabsh_5" v-if="form.flag=='Y' && form.extendReason=='N'">
                    <!-- <div class="tab-pane active" id="tab_1"> -->
                      <div class="row">
                        <div class="col-md-9 col-xs-12">
                          <table class="table table-bordered table-hover" id="extendStandardNon">
                              <thead>
                                <tr role="row">
                                <th>No.</th>
                                  <th>Device Name 设备名称</th>
                                  <th>Model  设备型号</th>
                                  <th width="10%">Quantity 数量</th>
                                  <th>Purpose 申请原因</th>
                                </tr>
                            </thead>
                            <tbody>
                          </tbody>
                        </table>

                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- /.tab-pane -->
                  </div>
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>





        <!-- 扩展设备审核页面 end-->
         <!-- 扩展设备发布页面 starts-->


        <div class="box box-primary" v-if="itService &&(form.applicationType==1|| form.applicationType==3)&&(form.extendReason=='Y' || form.flag=='Y')">

          <div class="box-header with-border">
            <h3 v-if="form.applicationType==1" class="box-title pull-left"> Extend Devices  扩展设备</h3>
            <h3 v-if="form.applicationType==3" class="box-title pull-left"> Borrow  借用 </h3>
            <span v-if="form.applicationType==3" class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i>Maximum of borrowing day is 30. 最长借用30天。 </span>
            <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
            <!-- /.box-tools -->
          </div>
          <div class="box-body">
            <div class="row">
               <form-group col="md-3" v-if="form.applicationType==3"  type="daterangepicker2" dateLimit="30"  other-rules="required" v-model="form.borrowDate" name="contractPeriod" :readonly="readonly"></form-group>
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"  v-if="form.extendReason=='Y'"><a href="#extabsh_0" data-toggle="tab" aria-expanded="true">1.Standard</a></li>
                  <li class="" v-if="form.flag=='Y'&& form.extendReason=='Y'"><a href="#extabsh_5" data-toggle="tab" aria-expanded="false">2.Non-Standard</a></li>
                  <li class="" v-if="form.flag=='Y' && form.extendReason=='N'"><a href="#extabsh_5" data-toggle="tab" aria-expanded="true" >1.Non-Standard</a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="extabsh_0" v-if="form.extendReason=='Y'">
                      <!-- <div class="tab-pane active" id="tab_1"> -->
                        <div class="row">
                          <div class="col-md-12 col-xs-12">
                            <table class="table table-bordered table-hover itservicetableed" >
                              <thead>
                                <tr role="row">
                                 <th>No.</th>
                                  <th class="text-center">Device 设备 </th>
                                  <th>Device Name 设备名称</th>
                                  <th>Substitute Device 替换设备</th>
                                  <th>Substitute Reason 替换原因</th>
                                  <th>Device SN Number 设备编号</th>
                                  <th>Device Release Date 设备交付日期 </th>
                                </tr>
                            </thead>
                            <tbody>
                              <tr v-bind:key="index" v-for="(entry,index) in form.wpFinExtendDevice">
                                <td>{{ index+ 1}}</td>
                                <td>
                                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                                <img :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
                                </td>
                                <td><p  >{{entry.deviceName}}</p></td>
                                 <td>
                                  <form-group  type="select" other-rules=""  haslable="false" :readonly="itServiceReadonly" :uri="'/standarddevice/listforselect/'+entry.deviceType"    :name="'replaceDevice'+index" v-model="entry.replaceMentDevice"></form-group>
                                </td>
                                <td>
                                  <form-group v-if="!entry.replaceMentDevice" type="input"  other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                                  <form-group v-if="entry.replaceMentDevice" type="input"  other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                                </td>

                                <td><form-group type="input" other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceNo" :name="'deviceSnno'+index"></form-group></td>
                                <td>
                                  <form-group type="datepicker" :other-rules="itServicerules" v-model="entry.releaseDate" :name="'releaseDate'+index" haslable="false" :readonly="itServiceReadonly"></form-group>
                                </td>

                             </tr>

                          </tbody>
                        </table>
                          </div>
                        </div>
                      <!-- </div> -->
                      <!-- /.tab-pane -->
                    </div>

                  <div class="tab-pane fade" id="extabsh_5" v-if="form.flag=='Y'&& form.extendReason=='Y'">
                    <!-- <div class="tab-pane active" id="tab_1"> -->
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <table class="table table-bordered table-hover itservicetableednon" >
                              <thead>
                                <tr role="row">
                                 <th>No.</th>
                                  <th>Device Name 设备名称</th>
                                  <th >Model  设备型号</th>
                                   <th>Purpose 申请原因</th>
                                  <th>Device SN Number 设备编号</th>
                                  <th>Device Release Date 设备交付日期 </th>
                                </tr>
                            </thead>
                            <tbody>
                              <tr v-bind:key="index" v-for="(entry,index) in form.wpFinExtendDeviceNon">
                                <td>{{ index+ 1}}
                                   <input type="hidden" class="form-control" id="" v-model="entry.id">
                                </td>

                                <td><p  >{{entry.deviceName}}</p></td>
                                <td>{{entry.model}}</td>
                                <!-- <td><form-group type="input"   haslable="false" :readonly="readonly" v-model="entry.extendReason" :name="'extendReason'+index"></form-group></td> -->
                                <td>{{entry.extendReason}}</td>
                                <td><form-group type="input" other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceNo" :name="'deviceSnno'+index"></form-group></td>
                                <td>
                                  <form-group type="datepicker" :other-rules="itServicerules" v-model="entry.releaseDate" :name="'releaseDate'+index" haslable="false" :readonly="itServiceReadonly"></form-group>
                                </td>

                             </tr>

                          </tbody>
                        </table>

                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- /.tab-pane -->
                  </div>


                    <div class="tab-pane active" id="extabsh_5" v-if="form.flag=='Y'&& form.extendReason=='N'">
                    <!-- <div class="tab-pane active" id="tab_1"> -->
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <table class="table table-bordered table-hover itservicetableednon" >
                              <thead>
                                <tr role="row">
                                 <th>No.</th>
                                  <th>Device Name 设备名称</th>
                                  <th>Model  设备型号</th>
                                   <th>Purpose 申请原因</th>
                                  <th>Device SN Number 设备编号</th>
                                  <th>Device Release Date 设备交付日期 </th>
                                </tr>
                            </thead>
                            <tbody>
                              <tr v-bind:key="index" v-for="(entry,index) in form.wpFinExtendDeviceNon">
                                <td>{{ index+ 1}}
                                   <input type="hidden" class="form-control" id="" v-model="entry.id">
                                </td>

                                <td><p  >{{entry.deviceName}}</p></td>
                                <td>{{entry.model}}</td>
                                <!-- <td><form-group type="input"   haslable="false" :readonly="readonly" v-model="entry.extendReason" :name="'extendReason'+index"></form-group></td> -->
                                <td>{{entry.extendReason}}</td>
                                <td><form-group type="input" other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceNo" :name="'deviceSnno'+index"></form-group></td>
                                <td>
                                  <form-group type="datepicker" :other-rules="itServicerules" v-model="entry.releaseDate" :name="'releaseDate'+index" haslable="false" :readonly="itServiceReadonly"></form-group>
                                </td>

                             </tr>

                          </tbody>
                        </table>

                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- /.tab-pane -->
                  </div>
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>

        <!--更换设备的申请页面starts-->
           <div class="box box-primary" v-if="!readonly && form.applicationType==2">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Select Devices for Replacement </h3>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool " data-toggle="collapse" id="minusplusbtnwpre" href="#collapseZerowpre"><i class="fa fa-minus" id="minusplusiwpre"></i></button>
            </div>
          </div>
          <div class="box-body declare-box form-group panel-collapse collapse in" id="collapseZerowpre">
            <div class="row">
              <div class="col-md-12">
               <table class="table table-bordered mar-bot-0">
                    <tbody><tr>
                      <th> Device S/N No.</th>
                      <th class="text-center">Device Picture </th>
                      <th>Device Name</th>
                      <th width="10%">Release Date</th>
                      <th width="30%">Replace Reason </th>
                      <th class="text-center">Select</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(entry,index) in form.wpReplaceDevice">
                      <td>{{entry.deviceNoOld}}</td>
                      <td class="text-center"><img v-if="entry.devicePic" :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)"></td>
                      <td>
                        {{entry.deviceName}}
                      </td>
                      <td width="10%">{{entry.releaseDateOld}}</td>
                      <td width="30%">
                         <!-- <select style="width:100%;" class="form-control" v-model="entry.replaceReason" v-select2>
                          <option value="1">The device is broken 设备损坏</option>
                          <option value="2">The device is out of service period 设备超过保修期</option>
                        </select> -->
                         <form-group :disabled="!(entry.queryFlag == 'true' || entry.queryFlag)" other-rules="required" type="select" uri="/dict/list?groupName=itcpReplaceReason"
                        	 haslable="false" :readonly="readonly" v-model="entry.replaceReason" :name="'replaceReason'+index"></form-group>
                      </td>
                      <td class="text-center" style="width:8%;">
                        <input type="checkbox" name="queryFlag" v-model="entry.queryFlag">
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        <!--更换设备的申请页面 end-->
         <!--更换设备的审核页面 starts-->
         <div class="box box-primary" v-if="readonly && form.applicationType==2 && !itService">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Select Devices for Replacement </h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
               <table class="table table-bordered mar-bot-0" id="replaceTable">
                    <thead><tr>
                      <th> No.</th>
                      <th> Device S/N No.</th>
                      <th class="text-center">Device Image </th>
                      <th>Device Name</th>
                      <th width="15%">Release Date</th>
                      <th width="30%">Reason</th>
                    </tr>


                 </thead>
                   <tbody>
                          </tbody>


                </table>
              </div>
            </div>
          </div>
        </div>
      <!--更换设备的审核页面 ends-->

       <!--更换设备的发布页面 statrs-->

           <div class="box box-primary" v-if="itService && form.applicationType==2">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Select Devices for Replacement</h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
               <table class="table table-bordered mar-bot-0 itservicetablere" >
                    <tbody><tr>
                      <!-- <th> Device S/N No.</th> -->
                      <th>No.</th>
                      <th class="text-center">Device 设备 </th>
                      <th>Device Name 设备名称</th>
                      <th>Substitute Device 替换设备</th>
                      <th>Substitute Reason 替换原因</th>
                      <th>Device SN Number 设备编号</th>
                      <th>Device Release Date 设备交付日期 </th>
                     </tr>
                    <tr v-bind:key="index" v-for="(entry,index) in form.wpFinReplaceDevice">
                                <td>{{ index+ 1}}</td>
                                <td>
                                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                                <img v-if="entry.devicePic" :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
                                </td>
                                <td><p>{{entry.deviceName}}</p></td>

                                 <td>
                                  <form-group v-if="entry.devicePic"  type="select" other-rules=""  haslable="false" :readonly="itServiceReadonly" :uri="'/standarddevice/listforselect/'+entry.deviceType"    :name="'replaceDevice'+index" v-model="entry.replaceMentDevice"></form-group>
                                 <form-group v-if="!entry.devicePic"  type="select"   haslable="false" readonly="readonly" :uri="'/standarddevice/listforselect/'+entry.deviceType"    :name="'replaceDevice'+index" v-model="entry.replaceMentDevice"></form-group>
                                </td>
                                <td>
                                  <form-group v-if="!entry.devicePic" type="input"    haslable="false" readonly="readonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                                  <form-group v-if="!entry.replaceMentDevice&&entry.devicePic" type="input"  other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                                  <form-group v-if="entry.replaceMentDevice && entry.devicePic" type="input"  other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceMentReason" :name="'replaceReason'+index"></form-group>
                                </td>
                                <td><form-group type="input" other-rules=""  haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceNo" :name="'deviceSnno'+index"></form-group></td>
                                <td>
                                  <form-group type="datepicker" :other-rules="itServicerules" v-model="entry.releaseDate" :name="'releaseDate'+index" haslable="false" :readonly="itServiceReadonly"></form-group>
                                </td>

                             </tr>

                  </tbody>


                </table>
              </div>
            </div>
          </div>
        </div>



       <!--更换设备的发布页面 end-->


          <!-- 注解starts-->
        <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"> <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Comment 注释 </h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <!-- <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('description') }"  id="description" name ="description" rows="2" placeholder="" v-validate="'required'" v-model="form.description" :disabled="readonly"></textarea> -->
            	<textarea-my rows="2" placeholder="Comment 注释" other-rules="required" :readonly="readonly" v-model="form.description" name="description" id="description"></textarea-my>
            </div>
          </div>
        </div>
      </div>

       <!-- 套装end-->

       <!--MODEL -->
       		<div class="modal fade" id="summaryModal" tabindex="-1" role="dialog" aria-labelledby="deviceModalLabel" v-if="!readonly">
			<!--modal-sm modal-lg modal-full-->
			<div class="modal-dialog modal-lg" role="document" style="width:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>-->
						<h4 class="modal-title" id="deviceModalLabel">Summary 概要</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
			        <!-- 套装提交前页面starts-->
            <div class="box box-primary" v-if="!readonly && form.applicationType==1 && form.onboard">
             <div class="box-header with-border">
                <h3 class="box-title pull-left"> Employee Standard Set 套装</h3>
                <span class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i> Select the checkbox if HR sent the onboard email notification. 如果收到人力资源发送的入职通知，请选择该选项 </span>
                <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
              </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">{{form.employeeName}}</a></li>

                  </ul>
                  <div class="tab-content workspace-tz">
                    <div class="tab-pane active overflow-auto" id="tab_1">
                      <table class="table table-bordered mar-bot-0">
                        <tbody><tr>
                            <!-- <th>No.</th> -->
                            <th>Device 设备 </th>
                            <th>Device Name 设备名称</th>
                            <th>Quantity 数量</th>
                        </tr>
                        <tr v-bind:key="index" v-for="(entry,index) in form.wpEmployeeStandard[form.employeeNum].standardDeviceList">
                          <!-- <td>{{ index+ 1}}</td> -->
                          <td>
                            <input type="hidden" class="form-control" id="" v-model="entry.id">
                           <img :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
                          </td>
                          <td><p>{{entry.deviceName}}</p></td>
                          <td><p>{{entry.deviceNum}}</p></td>
                        </tr>

                      </tbody>
                    </table>
                    </div>
                    <!-- /.tab-pane -->
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>


              <!-- 扩展设备申请页面starts-->

        <div class="box box-primary" v-if="!readonly &&(form.applicationType==1|| form.applicationType==3) &&(form.extendReason=='Y' || form.wpExtendDeviceNon[0].deviceName)">

          <div class="box-header with-border">
            <h3 v-if="form.applicationType==1" class="box-title pull-left"> Extend Devices  扩展设备</h3>
            <h3 v-if="form.applicationType==3" class="box-title pull-left"> Borrow  借用 </h3>
            <span v-if="form.applicationType==3" class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i>Maximum of borrowing day is 30. 最长借用30天。 </span>
            <!-- <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> -->
            <!-- /.box-tools -->
          </div>
          <div class="box-body">
            <div class="row">
               <form-group col="md-3" v-if="form.applicationType==3"  type="daterangepicker2" dateLimit="30"  other-rules="required" v-model="form.borrowDate" name="contractPeriod" readonly="readonly"></form-group>
              <div class="col-md-12">
               <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"  v-if="form.extendReason=='Y'"><a href="#extabsh_0" data-toggle="tab" aria-expanded="true">1.Standard</a></li>
                    <li class="" v-if="form.wpExtendDeviceNon[0].deviceName && form.extendReason=='N'"><a href="#extabsh_5" data-toggle="tab" aria-expanded="true" >1.Non-Standard</a></li>
                   <li class="" v-if="form.wpExtendDeviceNon[0].deviceName && form.extendReason=='Y'"><a href="#extabsh_5" data-toggle="tab" aria-expanded="false" >2.Non-Standard</a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="extabsh_0"  v-if="form.extendReason=='Y'">
                      <!-- <div class="tab-pane active" id="tab_1"> -->
                        <div class="row">
                          <div class="col-md-12 col-xs-12">
                            <table class="table table-bordered table-hover">
                              <thead>
                                <tr role="row">
                                 <!-- <th>No.</th> -->
                                <th>Device 设备 </th>
                                <th>Device Name 设备名称</th>
                                <th>Quantity 数量</th>
                                </tr>
                            </thead>
                            <tbody>
                              <tr v-if="entry.deviceNum>0" v-bind:key="index" v-for="(entry,index) in form.wpExtendDevice[0].standardDeviceList">
                                <!-- <td>{{ index+ 1}}</td> -->
                                <td>
                                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                                <img :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
                                </td>
                                <td><p>{{entry.deviceName}}</p></td>
                               <td><p>{{entry.deviceNum}}</p></td>

                             </tr>

                          </tbody>
                        </table>
                          </div>
                        </div>
                      <!-- </div> -->
                      <!-- /.tab-pane -->
                    </div>

                  <div class="tab-pane active" id="extabsh_5" v-if="form.wpExtendDeviceNon[0].deviceName&& form.extendReason=='N'">

                    <!-- <div class="tab-pane active" id="tab_1"> -->
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <table class="table table-bordered table-hover" >
                              <thead>
                                <tr role="row">
                                 <!-- <th>No.</th> -->
                                  <th>Device Name 设备名称</th>
                                  <th >Model  设备型号</th>
                                  <th>Quantity 数量</th>
                                   <th>Purpose 申请原因</th>

                                </tr>
                            </thead>
                            <tbody>
                              <tr v-bind:key="index" v-for="(entry,index) in form.wpExtendDeviceNon">
                                <!-- <td>{{ index+ 1}} -->

                                <!-- </td> -->

                                <td>
                                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                                  <p  >{{entry.deviceName}}</p></td>
                                <td>{{entry.model}}</td>
                                <!-- <td><form-group type="input"   haslable="false" :readonly="readonly" v-model="entry.extendReason" :name="'extendReason'+index"></form-group></td> -->
                                <td>{{entry.deviceNum}}</td>
                                <td>{{entry.extendReason}}</td>


                             </tr>

                          </tbody>
                        </table>
                           <!-- <div class="box-header with-border">
                                      <h3 class="box-title"> Reason 原因 </h3>
                                    </div>
                                    <div class="box-body">
                                      <div class="row">
                                        <div class="col-md-12">
                                          <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('reason') }"  id="reason" name ="reason" rows="2" placeholder=""  v-model="form.extendReason" :disabled="readonly"></textarea>
                                        </div>
                                      </div>
                                    </div> -->
                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- /.tab-pane -->
                  </div>




                  <div class="tab-pane fade" id="extabsh_5" v-if="form.wpExtendDeviceNon[0].deviceName &&form.extendReason=='Y'">

                    <!-- <div class="tab-pane active" id="tab_1"> -->
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <table class="table table-bordered table-hover" >
                              <thead>
                                <tr role="row">
                                 <!-- <th>No.</th> -->
                                  <th>Device Name 设备名称</th>
                                  <th>Model  设备型号</th>
                                  <th>Quantity 数量</th>
                                   <th>Purpose 申请原因</th>

                                </tr>
                            </thead>
                            <tbody>
                              <tr v-bind:key="index" v-for="(entry,index) in form.wpExtendDeviceNon">
                                <!-- <td>{{ index+ 1}} -->

                                <!-- </td> -->

                                <td>
                                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                                  <p  >{{entry.deviceName}}</p></td>
                                  <td>{{entry.model}}</td>
                                <!-- <td><form-group type="input"   haslable="false" :readonly="readonly" v-model="entry.extendReason" :name="'extendReason'+index"></form-group></td> -->
                                <td>{{entry.deviceNum}}</td>
                                <td>{{entry.extendReason}}</td>


                             </tr>

                          </tbody>
                        </table>
                           <!-- <div class="box-header with-border">
                                      <h3 class="box-title"> Reason 原因 </h3>
                                    </div>
                                    <div class="box-body">
                                      <div class="row">
                                        <div class="col-md-12">
                                          <textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('reason') }"  id="reason" name ="reason" rows="2" placeholder=""  v-model="form.extendReason" :disabled="readonly"></textarea>
                                        </div>
                                      </div>
                                    </div> -->
                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- /.tab-pane -->
                  </div>
                  </div>
                  <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
              </div>
            </div>
          </div>
        </div>

          <!--更换设备的申请页面starts-->
           <div class="box box-primary" v-if="!readonly && form.applicationType==2">
          <div class="box-header with-border">
            <h3 class="box-title pull-left"> Select Devices for Replacement </h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
               <table class="table table-bordered mar-bot-0">
                    <tbody><tr>
                      <th> Device S/N No.</th>
                      <th class="text-center">Device Image </th>
                      <th>Device Name</th>
                      <th width="8%">Release Date</th>
                      <th>Reason </th>

                    </tr>
                    <tr v-bind:key="index" v-for="(entry,index) in form.wpReplaceDevice" v-if="entry.queryFlag">
                      <td>{{entry.deviceNoOld}}</td>
                      <td class="text-center"><img v-if="entry.devicePic" :title="entry.deviceDesc" style='height: 70px;width: 70px;'  :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)"></td>
                      <td>
                        {{entry.deviceName}}
                      </td>
                      <td width="8%">{{entry.releaseDateOld}}</td>
                      <td width="25%">
                         <!-- <select style="width:100%;" class="form-control" v-model="entry.replaceReason" v-select2 disabled>
                          <option value="1">The device is broken 设备损坏</option>
                          <option value="2">The device is out of service period 设备超过保修期</option>
                        </select> -->
                        <form-group type="select" uri="/dict/list?groupName=itcpReplaceReason" haslable="false" disabled="true" v-model="entry.replaceReason" :name="'replaceReason'+index"></form-group>
                      </td>

                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


						<div class="row">
						    <div class="col-xs-12">
					      <submit v-if="this.$route.path.indexOf('create') > -1" v-on:beforesubmit="closesummary" :form="form"  labelName="Confirm" vclass="" :validator="this.$validator" @click="closesummary" ></submit>
						    <approve v-if="this.$route.path.indexOf('reAudit') > -1"  :form="form" vclass="pull-left" labelName="Confirm" :validator="this.$validator" @click="closesummary"></approve>
								<button style="margin-left:20px;" type="button" class="btn btn-danger pull-left " @click="closesummary"><i class="fa fa-fw fa-close"></i>Cancel</button>
						    </div>
						</div>


						<br/>
						<br/>

					</div>
				</div>
			</div>
		</div>



       <!-- MODEL END -->

        <!-- 附件starts-->
        <div class="box box-primary" v-if="(form.devicesLost=='true'||form.devicesLost) && form.applicationType==1">
          <div class="box-header with-border">
           <h3 class="box-title"> <i class="fa fa-asterisk text-required"></i>  Upload related material 上传相关材料    </h3>
          <span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i>Please upload the evidence for losing IT equipment. 请上传设备丢失证明。</span>
          </div>
          <div class="box-body">
           <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <upload :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" ></upload>
              </div>
            </div>
           </div>
          </div>
        </div>

        <div class="box box-primary" v-else>
          <div class="box-header with-border">
           <h3 class="box-title">  Upload related material 上传相关材料</h3>

          </div>
          <div class="box-body">
           <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <upload :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" :required="false"></upload>
              </div>
            </div>
           </div>
          </div>
        </div>
        <!-- 附件end-->

        <!-- 基本信息-->

      <div class="box box-primary" v-if="form.applicationType==1">
        <div class="box-body">
          <div class="checkbox">
            <label>
             <input type="checkbox" :disabled="readonly"   v-model="form.devicesLost" >{{$t("WorkPlace.devicesLost")}}</label>
          </div>
        </div>
      </div>
      <div class="form-group" >

            <div class="checkbox">
							<label>
              <input :disabled="readonly&&(form.policyDeviation=='true') || itServicePolicy" id="policyDeviation"  value="true"  type="checkbox" name="policyDeviation" v-model="form.policyDeviation" >{{$t("WorkPlace.policyDeviation")}}
							</label>
							<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Choose “Policy Deviation” need BoM's approval. 选择此项需要BoM的审批。 </span>
            </div>
						<div class="checkbox" v-if="!readonly">
							<label>
								<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  <!-- <input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to <a target="_blank" href="http://vwatdportal.ap.vwg/upload/2016051111193145544.18_Information%20Security%20Policy">relevant policies of Volkswagen Automatic Transmission Dalian.. </a> 当提交此申请时，我已经理解并承诺遵守大众汽车自动变速器（大连）有限公司的相关政策。 -->
              	<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
                  				<a target="_blank" href="https://vwatjportal.ap.vwg/upload/2018032919024823789.pdf">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  				当提交此申请时，我已经理解并承诺遵守
                  				<a target="_blank" href="https://vwatjportal.ap.vwg/upload/2018032919024823789.pdf">大众汽车自动变速器（天津）有限公司的相关政策。</a>
              </label>
						</div>
					</div>
          <!-- 基本信息end-->
      <comment v-if="processTaskId !=null" v-model="form.approval.approvalRemark"></comment>
      	<!-- <button type="button" class="btn btn-primary btn-flat" data-toggle="modal" data-target="#summaryModal"><i class="fa fa-fw fa-search"></i>sum
        </button> -->
      <router-view v-if="!itServiceButton" :form="form" entityId="WorkPlace" vclass="btn-left" uri="/form/WorkPlace/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
      <!-- IT页面按钮-->
       <!-- <div class="row" style="margin-bottom: 20px;">
          <div class="col-md-12">
            <Save v-if="itServiceButton" style="float: left;" :form="form" uri="/WorkPlace/save"    labelName="Save" ></Save>
            <Approve v-if="itServiceButton" style="float: left;margin-left: 5px;" :form="form" entityId="WorkPlace"   labelName="Confirm" :validator="this.$validator"></Approve>
            <Reject v-if="itServiceButton" :form="form" entityId="WorkPlace" style="float: left;margin-left: 5px;"  labelName="Decline" :validator="this.$validator"></Reject>
          </div>
        </div> -->
          <Confirm v-if="(form.signature)&&itServiceButton" :form="form" :validator="this.$validator" lableName="Confirm"  ></Confirm>
        	<Confirmwithsavereject v-if="(!form.signature)&&itServiceButton" :form="form" :validator="this.$validator"
				 lableName="Confirm" rejectLableName="Decline" uri="/workPlace/save" v-on:beforeapprovel="beforeapprovel" ></Confirmwithsavereject>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>

			<div style="margin-top:15px;" v-if="form.signature">
					<p>Signature:</p>
					<img  :src="form.signature.signatureContent" width="750" height="400"></img>
			</div>

  </section>

  </div>
</template>

<script>

import global_ from './../../../components/Common/Util/Global.vue'

// import  "./../../../plugins/spinner/css/jquery.spinner.css"
// import  "./../../../plugins/spinner/js/jquery.spinner.js"
  export default {
    name: 'WorkPlace',
    methods: {
      	beforesubmit: function() {
				if(this.form.applicationType==1){
					//  if(this.form.employeeType){

          var templist=this.form.wpExtendDevice[0].standardDeviceList;
					if(templist!=null&&templist.length>0){
					this.form.extendReason='N';
						for(var tempdev in templist){
							if(templist[tempdev].deviceNum>0){

								this.form.extendReason='Y';
								break;
              }
            }

          }
           if(this.form.extendReason!='Y' && (this.form.wpExtendDeviceNon[0].deviceName==null || this.form.wpExtendDeviceNon[0].deviceName=='') && this.form.employeeName==null){
           $.alert("At least one device need to be selected. 至少应该选择一个设备。");
            this.form.submitstatus=false;
            this.form.approvelstatus=false;
            }else{

            this.form.submitstatus=true;
            this.form.approvelstatus=true;

            }

				}else if(this.form.applicationType==2){
					var templist=this.form.wpReplaceDevice;
					if(templist!=null&&templist.length>0){
						var tempselected=false;
						for(var tempdev in templist){
							if(templist[tempdev].queryFlag||templist[tempdev].queryFlag=='true'){
								tempselected=true;
								break;
							}
						}
						if(tempselected){
              this.form.submitstatus=true;
              this.form.approvelstatus=true;
						}else{
							$.alert("Please choose the replacement devices. 请选择更换的设备。");
              this.form.submitstatus=false;
              this.form.approvelstatus=false;
						}
					}else{
						$.alert("There is no replacement devices. 没有可供更换的设备。");
            this.form.submitstatus=false;
            this.form.approvelstatus=false;
					}
				}else if(this.form.applicationType==3){
         	var templist=this.form.wpExtendDevice[0].standardDeviceList;
					if(templist!=null&&templist.length>0){
					this.form.extendReason='N';
						for(var tempdev in templist){

							if(templist[tempdev].deviceNum>0){

								this.form.extendReason='Y';

								break;
              }
            }
          }
            if(this.form.extendReason!='Y' && (this.form.wpExtendDeviceNon[0].deviceName==null || this.form.wpExtendDeviceNon[0].deviceName=='')){
           $.alert("At least one device need to be selected. 至少应该选择一个设备。");
            this.form.submitstatus=false;
            this.form.approvelstatus=false;
            }else{

            this.form.submitstatus=true;
            this.form.approvelstatus=true;

            }

        }
				if(this.form.submitstatus){
					var validatorFn = this.$validator;
          this.form.submitstatus=false;
          this.form.approvelstatus=false;
					var _this = this;
					var router = this.$router;
					setTimeout(function() {

						if(validatorFn) {
							validatorFn.validateAll().then(result => {
								if(result) {
									_this.summary();
								} else {
									if(validatorFn.errors.has('terms')) {
										$.alert(_this.$t("checkPolicyNotice"));
									}
									$("#loadingMask,#progressBar").hide();
								}
							});
						} else {
							_this.summary();
						}
					}, 100);
				}

			 },
			summary:function(){
				window.top.scroll(0, 0);
        this.form.submitstatus=true;
        this.form.approvelstatus=true;
				  $("#summaryModal").modal({
			        backdrop: false, //点击空白处不关闭对话框
			        keyboard: false, //键盘关闭对话框
			        toggle: true //弹出对话框
			      });
			},
			closesummary:function(){
				$("#summaryModal").modal('hide');
			},
      	beforeapprovel:function(){
				var uri = "/workPlace/getpadsign?ticketNo="+this.form.ticketNo;
				var _this = this;
					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var dm = JSON.parse(data);
							if(dm.data=='yes'){
								_this.form.approvelstatus=true;
							}else{
								$.alert("There is no signature. 没有电子签名确认。");
								_this.form.approvelstatus=false;
							}
						});
					}

			},
      //在onbehalf不勾选的时候拿去在data方法缓存的值赋值文本框
      onbehalfclick: function() {
        var temp = $("#onbehalf").is(':checked');
        this.onbehalf = temp;
        if(!temp) {
          this.form.creatorUserId = this.tempcreatorUserId;
          this.form.applicantUserId = this.tempapplicantUserId;
          this.form.createUserId = this.temcreateUserId;
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
      //选择用户后
      doAfterSelectOtherPerson: function(data) {
        $('#selectotherperson').attr("class", "input-group-btn");
        //console.log(data);
        this.form.applicantUserId = data.id;
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
      //选择套装使用人后
      doAfterSelectOtherUser: function(data) {
        $('#selectotherUser').attr("class", "input-group-btn");

        this.form.userId = data.id;
        this.form.userStaffcode = data.staffCode;
        this.form.userName = data.printENName;

        var tempdep = data.department;
        if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
          tempdep = data.division;
        }

        this.form.userDept = tempdep;



      },

      changeTableCol: function(key) {
        return this.$t(key);
        /*return key;*/
      },
     //套装复选框
      checkSet: function(key,index,name) {
      // var ifchecked=$("#checkbox_"+index).prop("checked");
      // if(ifchecked){
      //   this.form.employeeType=key;
      //   this.form.employeeNum=index;
      //   // if(index==0){
      //   //   this.abc=1;
      //   // }
      //   this.abc=1
      //   this.form.employeeName=name;
      //   $("input[name='test']").prop("checked",false);
      //   $("#checkbox_"+index).prop("checked",true);
      // }else{
      //   this.abc=2;
      //    this.form.employeeNum=null
      //     this.form.employeeName=null;
      // }


        this.form.employeeType=key;
        this.form.employeeNum=index;

        this.form.employeeName=name;
     },

     //onBoard 入职套装
     checkBoxSet: function(){
      var ifchecked=$("#onboard").prop("checked");
      if(ifchecked){
        this.form.employeeType=this.form.wpEmployeeStandard[0].id;
        this.form.employeeNum=0;
        this.form.employeeName=this.form.wpEmployeeStandard[0].name;

      }else{
          this.form.employeeNum=null
          this.form.employeeName=null;
      }

     },

     //添加一行
     insertItineraryRows: function() {
          var newItem = {};
        for(var key in this.form.wpExtendDeviceNon[0]) {
          newItem[key] = "";
        }
        this.form.wpExtendDeviceNon.push(newItem);
      },
      // //数量加减器
        cuts:function(key){
            if(this.form.wpExtendDevice[0].standardDeviceList[key].deviceNum<1) return
           this.form.wpExtendDevice[0].standardDeviceList[key].deviceNum--;

        },
        add:function(key){
        //  var addValue=  parseInt(key);
        this.form.wpExtendDevice[0].standardDeviceList[key].deviceNum++;


        },

        	retrieveData: function(url, aoData, fnCallback) {
            var tikectNo=this.form.ticketNo;
              var type = "1";
              $.ajax({
                url: url, //这个就是请求地址对应sAjaxSource
                data: {
                  "aoData": JSON.stringify(aoData),
                  "tikectNo": tikectNo ,
                  "type": type

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

          retrieveDataExtend: function(url, aoData, fnCallback) {
            var tikectNo=this.form.ticketNo;
            var type = "2";
              $.ajax({
                url: url, //这个就是请求地址对应sAjaxSource
                data: {
                  "aoData": JSON.stringify(aoData),
                  "tikectNo": tikectNo ,
                  "type": type

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
           retrieveDataExtendNon: function(url, aoData, fnCallback) {
            var tikectNo=this.form.ticketNo;
            var type = "3";
              $.ajax({
                url: url, //这个就是请求地址对应sAjaxSource
                data: {
                  "aoData": JSON.stringify(aoData),
                  "tikectNo": tikectNo ,
                  "type": type

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

           replaceTable: function(url, aoData, fnCallback) {
            var tikectNo=this.form.ticketNo;
            var type = "4";
              $.ajax({
                url: url, //这个就是请求地址对应sAjaxSource
                data: {
                  "aoData": JSON.stringify(aoData),
                  "tikectNo": tikectNo ,
                  "type": type

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
          //设置借用时间
           setDate:function(){
             let _this = this;
              $('#cardPeriod').daterangepicker({
                "linkedCalendars": false,
                dateLimit : {
                      days : 30
                    } //起止时间的最大间隔
              }, function(start, end) {
                $('#cardPeriod').val(start.format('MM/DD/YYYY') + '-' + end.format('MM/DD/YYYY'));

                $("#startDate").val(start.format('MM/DD/YYYY'));
                $("#endDate").val(end.format('MM/DD/YYYY'));

              });

    },

    //表格行删除调用方法
      deleteItineraryRows: function(rowId) {
        if(this.form.wpExtendDeviceNon.length > 1) {
          this.form.wpExtendDeviceNon.splice(rowId, 1);
        } else {
          $.alert("At least one complete record in Extend Devices Information is needed. 至少需要填写一条完整的扩展设备信息。");
        }
      },
    },
    data() {
      //返回的数据对象
      var dm = {};

      //判断是创建还是获取
      var id = this.$route.params.id || this.$route.query.id;
      if(id) {
        var url = "/form/WorkPlace/get/" + id;
      } else {
        var url = "/form/WorkPlace/create/";
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
      dm.employeeType=null;

     // dm.entertainmentType =false;
      //dm.OtherLabor =false;
      dm.tempcreatorUserId = dm.form.creatorUserId;
      dm.tempapplicantUserId = dm.form.applicantUserId;
      dm.temcreateUserId = dm.form.createUserId;
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
      dm.abc=0;
      dm.itServicerules="required";
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
				},
				deep:true
			}
		},
    //在页面渲染之前就执行，data()在渲染页面之后才执行
    mounted() {
      var form = this.form;
      var gal = this.GL;
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

      //校验数字
      $("body").on('blur', '.number', function() {

       var reg = /^\d+(?:\.\d{0})?$/;
      if ($(this).attr("readonly")) {
        //只读不做操作
      } else {
        if ($(this).val()) {
          if (!reg.test($(this).val())) {
            $.alert("Only integers are allowed for this input area. 该区域只能输入整数");
            form.wpExtendDeviceNon[$(this).attr("index")].deviceNum = "";
            $(this).val("");
          } else {

          }
        }
      }
			});


      //审核页面的套餐显示
      var queryData = this.retrieveData;
      var table = $("#wpStandardtable").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [1,2,3]
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [
              {data: "id"},
              {data: "devicePic"},
              {data: "deviceName"},
              {data: "deviceNum"}
        ],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					 var url= gal.getURL('/attachmentlob/downloadimage/'+data.devicePic);
            $('td:eq(0)', row).html(index+1);
            var html="<img title='"+data.deviceDesc+"' style='height: 70px;width: 70px;' id='pic"+ data.id +"' data-imgId='"+data.devicePic+"' style='width:50%' src='"+url+"' >";
			      $('td:eq(1)', row).html(html);
            $('td:eq(2)', row).html(data.deviceName);
            $('td:eq(3)', row).html(data.deviceNum);


					return row;
				}
			});


        //审核页面的扩展标准设备显示
      var queryDataExtend = this.retrieveDataExtend;
      var table = $("#extendStandard").DataTable({
				"fnServerData": queryDataExtend,
				"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
				"serverSide": true,
				"filter": false,
       "lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [1,2,3]
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [
              {data: "id"},
              {data: "devicePic"},
              {data: "deviceName"},
              {data: "deviceNum"}
        ],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
           var url= gal.getURL('/attachmentlob/downloadimage/'+data.devicePic);
            $('td:eq(0)', row).html(index+1);
            var html="<img title='"+data.deviceDesc+"' style='height: 70px;width: 70px;' id='pic"+ data.id +"' data-imgId='"+data.devicePic+"' style='width:50%' src='"+url+"' >";
			      $('td:eq(1)', row).html(html);
					  $('td:eq(2)', row).html(data.deviceName);
            $('td:eq(3)', row).html(data.deviceNum);
            //  if((data.deviceNum==0)){
            //     $(row).hide();
            //   }

					return row;
				}
			});

        //审核页面的扩展非标准显示 replaceTable
      var queryDataNon = this.retrieveDataExtendNon;
      var table = $("#extendStandardNon").DataTable({
				"fnServerData": queryDataNon,
				"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [1,2,3]
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [
              {data: "id"},
              {data: "deviceName"},
              {data: "model"},
              {data: "deviceNum"},
              {data: "extendReason"}
        ],
				"fnRowCallback": function(row, data, index) { //设置列从0开始

             var url= gal.getURL('/attachmentlob/downloadimage//'+data.devicePic);
            $('td:eq(0)', row).html(index+1);

			      $('td:eq(1)', row).html(data.deviceName);
            $('td:eq(2)', row).html(data.model);
            $('td:eq(3)', row).html(data.deviceNum);
             $('td:eq(4)', row).html(data.extendReason);


					return row;
				}
			});

       //审核页面更换设备显示
      var replaceTable = this.replaceTable;
      var table = $("#replaceTable").DataTable({
				"fnServerData": replaceTable,
				"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [1,2,3,4,5]
				}],
				"aaSorting": [
					[0, "asc"]
				], //给列表排序
				columns: [
            {data: "id"},
            {data: "deviceNoOld"},
              {data: "devicePic"},
              {data: "deviceName"},
              {data: "releaseDateOld"},
               {data: "replaceReason"}
        ],
				"fnRowCallback": function(row, data, index) { //设置列从0开始

           var url= gal.getURL('/attachmentlob/downloadimage/'+data.devicePic);
            $('td:eq(0)', row).html(index+1);
            var html="<img title='"+data.deviceDesc+"'  style='height: 70px;width: 70px;' id='pic"+ data.id +"' data-imgId='"+data.devicePic+"' style='width:50%' src='"+url+"' >";
			     $('td:eq(1)', row).html(data.deviceNoOld);
           if(data.devicePic){
              $('td:eq(2)', row).html(html);
           }else{
              $('td:eq(2)', row).html("");
           }

					  $('td:eq(3)', row).html(data.deviceName);
            $('td:eq(4)', row).html(data.releaseDateOld);
            $('td:eq(5)', row).html(data.replaceReason==1?'The device is broken 设备损坏':data.replaceReason==2?'The device is out of service period 设备超过保修期':'Other 其它');


					return row;
				}
			});

      	$('body').on('click', '#minusplusbtnwp', function() {
				//console.log("0000");
				if($("#minusplusbtnwp").hasClass("collapsed")) {
					//console.log(111);
					$("#minusplusiwp").removeClass("fa-plus");
					$("#minusplusiwp").addClass("fa-minus");
				} else {
					//console.log(2222);
					$("#minusplusiwp").removeClass("fa-minus");
					$("#minusplusiwp").addClass("fa-plus");

				};


			});

      // $('body').on('click', '#minusplusbtnwpes', function() {

			// 	if($("#minusplusbtnwpes").hasClass("collapsed")) {

			// 		$("#minusplusiwpes").removeClass("fa-plus");
			// 		$("#minusplusiwpes").addClass("fa-minus");
			// 	} else {

			// 		$("#minusplusiwpes").removeClass("fa-minus");
			// 		$("#minusplusiwpes").addClass("fa-plus");

			// 	};


      // });

       $('body').on('click', '#minusplusbtnwpre', function() {
				//console.log("0000");
				if($("#minusplusbtnwpre").hasClass("collapsed")) {
					//console.log(111);
					$("#minusplusiwpre").removeClass("fa-plus");
					$("#minusplusiwpre").addClass("fa-minus");
				} else {
					//console.log(2222);
					$("#minusplusiwpre").removeClass("fa-minus");
					$("#minusplusiwpre").addClass("fa-plus");

				}


      });

      $('body').on('click', '#minusplusbtnwped', function() {
				//console.log("0000");
				if($("#minusplusbtnwped").hasClass("collapsed")) {
					//console.log(111);
					$("#minusplusiwped").removeClass("fa-plus");
					$("#minusplusiwped").addClass("fa-minus");
				} else {
					//console.log(2222);
					$("#minusplusiwped").removeClass("fa-minus");
					$("#minusplusiwped").addClass("fa-plus");

				}


			});
       var _this = this.form;
      //1.Device SN Number验证
			$(".itservicetable tbody").on('blur', ':input', function() {

				var tempList=[];
				if(_this.applicationType==1){
          tempList=_this.wpFinStandardDeviceList;
      	}

				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).attr("name")&&$(this).attr("name").contains("deviceSnno")&&$(this).val()) {
						var uri = "/workPlace/findBydeviceSnno?deviceSnno="+$(this).val();
            var tempindex=$(this).attr("name").substring(10);
            var es =true;
            	var dd=_this.wpFinStandardDeviceList;
              var bb = _this.wpFinExtendDevice;
              var cc = _this.wpFinExtendDeviceNon;
              var tem = [];
               var tem1 = [];
              for(var i=0;i<dd.length;i++){//循环获取a数组内的元素

                tem1.push(dd[i]);//把a数组内的元素添加到b数组
              }
              for(var i=0;i<bb.length;i++){//循环获取a数组内的元素
                tem.push(bb[i]);//把a数组内的元素添加到b数组
              }
              for(var i=0;i<cc.length;i++){//循环获取a数组内的元素
                tem.push(cc[i]);//把a数组内的元素添加到b数组
              }
              for(var i in tem1){
               if(i!=tempindex){
                if(tempList[tempindex].deviceNo==tem1[i].deviceNo){
                  tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
                 es=false;
                 break;

                }
               }
              }
              if(es){
                for(var i in tem){
                  if(tempList[tempindex].deviceNo==tem[i].deviceNo){
                    tempList[tempindex].deviceNo="";
                    $(this).val("");
                    $.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
                    break;
                  }
                }
              }
            //和数据库里比对是不是有重复的Device SN Number
							global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								if(dm.data=='yes'){
									tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
								}else{

								}
							});

					}
				}
			});


       //2.Device SN Number验证
			$(".itservicetableed tbody").on('blur', ':input', function() {

				var tempList=[];
        var temed = [];
        var temedNon = [];
        var aa1=[];
        var aa2=[];
        tempList=_this.wpFinExtendDevice;
         for(var i=0;i<tempList.length;i++){//循环获取a数组内的元素
              temed.push(tempList[i]);//把a数组内的元素添加到b数组
          }
				if(_this.applicationType==1){

          aa1 = _this.wpFinStandardDeviceList;
          aa2 = _this.wpFinExtendDeviceNon;

          for(var i=0;i<aa1.length;i++){//循环获取a数组内的元素
                temedNon.push(aa1[i]);//把a数组内的元素添加到b数组
          }
          for(var i=0;i<aa2.length;i++){//循环获取a数组内的元素

             temedNon.push(aa2[i]);//把a数组内的元素添加到b数组
          }

        }else if(_this.applicationType==3){
					aa2=_this.wpFinExtendDeviceNon;
           for(var i=0;i<aa2.length;i++){//循环获取a数组内的元素
              temedNon.push(aa2[i]);//把a数组内的元素添加到b数组
          }

				}

				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).attr("name")&&$(this).attr("name").contains("deviceSnno")&&$(this).val()) {
						var uri = "/workPlace/findBydeviceSnno?deviceSnno="+$(this).val();
						var tempindex=$(this).attr("name").substring(10);
            	var ed =true;
              for(var i in temed){
               if(i!=tempindex){
                if(tempList[tempindex].deviceNo==temed[i].deviceNo){
                  tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
                   ed=false;
                  break;

                }
               }
              }
              if(ed){
                for(var i in temedNon){
                  if(tempList[tempindex].deviceNo==temedNon[i].deviceNo){
                    tempList[tempindex].deviceNo="";
                    $(this).val("");
                    $.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
                    break;
                  }
                }
              }
            //和数据库里比对是不是有重复的Device SN Number
							global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								if(dm.data=='yes'){
									tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
								}else{

								}
							});

					}
				}
      });

       //3.Device SN Number验证
			$(".itservicetableednon tbody").on('blur', ':input', function() {

				var tempList=[];
        var temed = [];
        var temedNon = [];
        var aa1=[];
        var aa2=[];
         tempList=_this.wpFinExtendDeviceNon;
          for(var i=0;i<tempList.length;i++){//循环获取a数组内的元素
                temed.push(tempList[i]);//把a数组内的元素添加到b数组
          }
				if(_this.applicationType==1){

          aa1 = _this.wpFinStandardDeviceList;
          aa2 = _this.wpFinExtendDevice;

          for(var i=0;i<aa1.length;i++){//循环获取a数组内的元素
                temedNon.push(aa1[i]);//把a数组内的元素添加到b数组
          }
          for(var i=0;i<aa2.length;i++){//循环获取a数组内的元素

             temedNon.push(aa2[i]);//把a数组内的元素添加到b数组
          }

        }else if(_this.applicationType==3){
					aa2=_this.wpFinExtendDevice;
           for(var i=0;i<aa2.length;i++){//循环获取a数组内的元素
              temedNon.push(aa2[i]);//把a数组内的元素添加到b数组
          }

				}

				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).attr("name")&&$(this).attr("name").contains("deviceSnno")&&$(this).val()) {
						var uri = "/workPlace/findBydeviceSnno?deviceSnno="+$(this).val();
						var tempindex=$(this).attr("name").substring(10);
            	var ednon =true;
              for(var i in temed){
               if(i!=tempindex){
                if(tempList[tempindex].deviceNo==temed[i].deviceNo){
                  tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
                   ednon=fasle;
                  break;

                }
               }
              }
              if(ednon){
                for(var i in temedNon){
                  if(tempList[tempindex].deviceNo==temedNon[i].deviceNo){
                    tempList[tempindex].deviceNo="";
                    $(this).val("");
                    $.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
                    break;
                  }
                }
              }
            //和数据库里比对是不是有重复的Device SN Number
							global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								if(dm.data=='yes'){
									tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
								}else{

								}
							});

					}
				}
      });

       //4.Device SN Number验证
			$(".itservicetablere tbody").on('blur', ':input', function() {

				var tempList=[];
       	if(_this.applicationType==2){
           tempList=_this.wpFinReplaceDevice;
         }

				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).attr("name")&&$(this).attr("name").contains("deviceSnno")&&$(this).val()) {
						var uri = "/workPlace/findBydeviceSnno?deviceSnno="+$(this).val();
						var tempindex=$(this).attr("name").substring(10);

              for(var i in tempList){
               if(i!=tempindex){
                if(tempList[tempindex].deviceNo==tempList[i].deviceNo){
                  tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
									break;
                }
               }
              }

            //和数据库里比对是不是有重复的Device SN Number
							global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								if(dm.data=='yes'){
									tempList[tempindex].deviceNo="";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
								}else{

								}
							});

					}
				}
			});





      // var _this = this;

       if(this.processTaskKey){
       this.form.processTaskKey =this.processTaskKey;
       }else{
          this.form.processTaskKey='usero';
       }
     $('.spinnerExample').spinner({
       value: 1, min: 1, max: 1,step:1,
    });
    $('.spinnerExample2').spinner({
       value: 0,
    });
    if(_this.employeeNum!=null){
       $("#checkbox_"+_this.employeeNum).prop("checked",true);
    }
     if(_this.policyDeviation == 'true') {
        $("#policyDeviation").prop("checked", true);
      } else {
        _this.policyDeviation = null;
        $("#policyDeviation").prop("checked", false);
      }
      //放在save，submit是数据在数据库中保存两次
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
        // 动态计算processTaskKey的值
        get: function() {
          return this.$route.query.taskKey;
        }
      },
      readonly: {
        // 动态计算readonly的值
        get: function() {

          return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
        }
      },
       itService:{
				// 动态计算是否显示confirm按钮
				get:function() {
					return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('usertask5') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))|| this.form.status == 0);
				}
      },
       itServiceButton:{
				// 动态计算是否显示confirm按钮
				get:function() {
					return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('usertask5') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))));
				}
			},
      	itServicePolicy: {
				get: function() {
					if(this.$route.path.indexOf('detail') > -1){
						return true;
					}
				return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('usertask5') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)))|| this.form.status == 0);
				}
			},
      	itServiceReadonly: {
				get: function() {
					if(this.$route.path.indexOf('detail') > -1){
						return true;
					}

					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('usertask5') != -1&&this.form.signature){
						return true;
					}
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('usertask5') == -1)||(this.$route.query.taskKey == null&&this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
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

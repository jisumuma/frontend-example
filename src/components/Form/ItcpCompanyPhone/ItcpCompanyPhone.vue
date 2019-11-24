<template>
	<div id="currentpage">
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("ItcpCompanyPhone")}}
			</h1>
			<ol v-if="form.applyType=='New'" class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Supervisor(MK or above FG >= T+/29) </a>
				</li>
				<li>
					<a>3. Orga Partner</a>
				</li>
				<li>
					<a>4.Head of IT</a>
				</li>
				<li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a>5.BOMC/BOMT</a>
				</li>
				<li v-else>
					<a>5.IT Client Service</a>
				</li>
				<li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a>6.IT Client Service</a>
				</li>

			</ol>
			<ol v-if="form.applyType=='Replace'" class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>

				<li>
					<a>2.Head of IT</a>
				</li>
				<li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a>3.BOMC/BOMT</a>
				</li>
				<li v-else>
					<a>3.IT Client Service</a>
				</li>
				<li v-if="form.policyDeviation=='true'||form.policyDeviation">
					<a>4.IT Client Service</a>
				</li>

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
					<h3 class="box-title"> Application Type <label>申请类型</label>  </h3>
					<span class="help is-danger" v-show="errors.has('applyType')">
									Please select a Type.
									请选择一个类型
								</span>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" :disabled="disabled" v-validate="'required'"
										 name="applyType" id="optionsRadios1" v-model="form.applyType" value="New" checked="">Apply New Company Phone 申请新公司电话</label>
								</div>

							</div>
							<div class="col-md-4">
								<div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" :disabled="disabled" v-validate="'required'" 
										name="applyType" id="optionsRadios2" v-model="form.applyType" value="Replace">Replace Company Phone 更换公司电话</label>
								</div>
							</div>

						</div>

					</div>
				</form>
			</div>

			<!--------------------------
			| Your Page Content Here |
			-------------------------->
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
					<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label></div>
					<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool collapsed" data-toggle="collapse" id="minusplusbtn" href="#collapseZero"><i class="fa fa-plus" id="minusplusi"></i></button>

					</div>
					<!-- /.box-tools -->
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
					<input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
					<div class="box-body declare-box form-group">
						<div class="row">

							<!--不选中的时候显示-->
							<form-group v-if="!onbehalf" other-rules="required" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<!--选中的时候显示-->
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 {{$t("LocalPcAdmin.creatorStaffcode")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
									</div>
								</div>
							</div>

							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
						</div>
						<div class="row  panel-collapse collapse "  id="collapseZero">							
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorTitle" name="creatorTitle" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorEmail" name="creatorEmail" readonly="readonly"></form-group>
						</div>
					</div>
				</form>
			</div>
			<!--审核页面的套装人员选择 starts-->
			<div class="box box-primary" v-if="form.applyType=='New'&&itServicebuttonShow&&this.$route.query.taskKey=='itClentService'&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)">
				<div class="box-body">
					<div class="row">
						<div class="col-md-3">
							<div class="form-group">
								<label for=""> Employee Standard Set Owner 套装设备使用员工 </label>
								<div class="input-group ">
									<input type="text" class="form-control" placeholder="Name 姓名" id="creatorName" name="creatorName" v-model="form.creatorName" readonly="readonly">
									<span class="input-group-btn" id="selectotherperson">
                      <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    </span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--审核页面的套装人员选择 ends-->
			<!--	{{form.emsetIds}}/{{form.emsetId}}/{{form.emsetName}}/{{form.devicePhoneId}}/{{form.devicePadId}}/{{form.deviceSimId}}-->
			<div class="box box-primary" v-if="form.applyType=='New'&&!readonly">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Company Phone Device 公司电话设备</h3>
					<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><button class="btn btn-sm btn-success"  style="padding:0px 10px;" @click="clearcheck()">Clear</button></div>
					<!--  <div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox" v-model="form.onboard" value="true"  @click="checkBoxSet"  id="onboard" v-validate="'required'"  name="emsetId"><strong> On Board 入职</strong> </label>
            <span class="text-muted"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i> Select the checkbox if HR sent the onboard email notification. 如果收到人力资源发送的入职通知，请选择该选项 </span></div>-->
					<div class="box-tools pull-right">
						<!--  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>-->
					</div>
					<!-- /.box-tools -->
				</div>
				<div class="box-body" v-show="form.emsetId">
					<div class="row">
						<div class="col-md-12">
							<!-- Custom Tabs -->
							<div class="nav-tabs-custom">
								<ul class="nav nav-tabs">
									<!--<li><a href="#tab_1" data-toggle="tab" aria-expanded="true">1.BoM</a></li>
                    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="false">2.OMK</a></li>
                    <li><a href="#tab_1" data-toggle="tab">3.MK</a></li>
                    <li><a href="#tab_1" data-toggle="tab">4.BOM Assistant</a></li>-->
									<li :class="{'tab-pane':true,  'overflow-auto':true, 'text-center':true,'active':((form.emsetId&&entry.id==form.emsetId)||(!form.emsetId&&index==0))}" v-bind:key="index" v-for="(entry,index) in form.emsetList">
										<a :href="'#tab_'+entry.id" @click="setcheck(index,entry)" data-toggle="tab">{{index+1}}.{{entry.setName}}</a>
									</li>

								</ul>
								<div class="tab-content workspace-tz">
									<div :class="{'tab-pane':true,  'overflow-auto':true, 'text-center':true,'active':((form.emsetId&&entry.id==form.emsetId)||(!form.emsetId&&index==0))}" v-bind:key="index" v-for="(entry,index) in form.emsetList" :id="'tab_'+entry.id">

										<!--<div class="checkbox text-left">
                        <strong>Standard Set for {{entry.setName}} : &nbsp;&nbsp;</strong>
                        <label>
                          <input type="checkbox" :value="entry.id" @click="setcheck(index,entry)" :id="'emsetId'+index" v-model="form.emsetIds" v-validate="'required'"  name="emsetId"> &nbsp;
                        </label>
                      </div>-->
										<div v-if="entry.phoneIds" class="box-border col-md-4 col-xs-12" style="overflow:hidden;">
											<div class="col-md-6 col-sm-6 col-xs-12" v-for="(phone,phoneindex) in entry.phoneList">
												<img :src="GL.getURL('/attachmentlob/downloadimage/'+phone.devicePic)" :title="phone.deviceDesc" width="160px" height="160px">
												<p class="text-center"><strong>{{phone.deviceName}}</strong></p>
												<div class="form-group">
													<label>
                              <input type="radio" name="devicePhoneId" :disabled="!form.emsetId||form.emsetId!=entry.id" class="minimal-red" :value="entry.setName+','+phone.id" v-model="form.devicePhoneId">
                            </label>
												</div>
											</div>

										</div>
										<div v-if="entry.padIds" class="box-border col-md-4 col-xs-12 mar-left-20" style="overflow:hidden;">
											<div class="col-md-6 col-sm-6 col-xs-12" v-for="(pad,padindex) in entry.padList">
												<img :src="GL.getURL('/attachmentlob/downloadimage/'+pad.devicePic)" :title="pad.deviceDesc" width="160px" height="160px">
												<p class="text-center"><strong>{{pad.deviceName}}</strong></p>
												<div class="form-group">
													<label>
                              <input type="radio" name="devicePadId" :disabled="!form.emsetId||form.emsetId!=entry.id"   class="minimal-red" :value="entry.setName+','+pad.id" v-model="form.devicePadId">
                            </label>
												</div>
											</div>
										</div>
										<div v-if="entry.simIds" class="box-border col-md-3 col-xs-12 mar-left-20" style="overflow:hidden;">
											<div class="col-md-12 col-sm-12 col-xs-12" v-for="(sim,simindex) in entry.simList">
												<img :src="GL.getURL('/attachmentlob/downloadimage/'+sim.devicePic)" :title="sim.deviceDesc" width="160px" height="160px">
												<p class="text-center"><strong>{{sim.deviceName}}</strong></p>
												<div class="form-group">
													<label>
                              <input type="checkbox" name="deviceSimId" :id="'deviceSimId'+entry.id+sim.id" @click="simcheck(entry,sim)" :disabled="!form.emsetId||form.emsetId!=entry.id"  class="minimal-red" :value="entry.setName+','+sim.id" v-model="form.deviceSimIds">
                            </label>
												</div>
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

			<div class="box box-primary" v-if="form.applyType=='New'&&readonly&&!itService">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Company Phone Device 公司电话设备</h3>
					<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
					</div>
					<!-- /.box-tools -->
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<!-- Custom Tabs -->
							<div class="nav-tabs-custom">
								<ul class="nav nav-tabs">
									<li class="active">
										<a href="#tab_1" data-toggle="tab" aria-expanded="true">1.{{form.emsetName}}</a>
									</li>
								</ul>
								<div class="tab-content workspace-tz">
									<div class="tab-pane active" id="tab_1">
										<div class="row">
											<div class="col-md-6 col-xs-12">
												<table class="table table-bordered mar-bot-0">
													<tbody>
														<tr>
															<th>No.</th>
															<th class="text-center">Device 设备 </th>
															<th>Device Name 设备名称</th>
															<th>Quantity 数量</th>
														</tr>
														<tr v-for="(temp,index) in form.devicecpNewInstanceList">
															<td>
																<span v-if="index<9">0{{index+1}}</span>
																<span v-else>{{index+1}}</span>
															</td>
															<td class="text-center"><img width="60px" height="60px" :src="GL.getURL('/attachmentlob/downloadimage/'+temp.devicePic)" :title="temp.deviceDesc"></td>
															<td>
																{{temp.deviceName}}
															</td>
															<td>1</td>
														</tr>

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

			<div class="box box-primary" v-if="form.applyType=='Replace'&&!readonly">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Select Company Phone for Replacement 选择需要更换的公司电话</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-bordered mar-bot-0">
								<tbody>
									<tr>
										<th>Device S/N No. 设备编号</th>
										<th class="text-center">Device 设备</th>
										<th>Device Name 设备名称</th>
										<th>Release Date 交付时间</th>
										<th>Replace Reason 更换原因</th>
										<th class="text-center">Select</th>
									</tr>
									<tr v-for="(temp,index) in form.devicecpReplaceList">
										<td>
											<div class="form-group">{{temp.deviceSnno}}</div>
										</td>
										<td class="text-center">
											<div class="form-group">
												<img width="100px" height="100px" :src="GL.getURL('/attachmentlob/downloadimage/'+temp.devicePic)" :title="temp.deviceDesc">
											</div>
										</td>
										<td>
											<div class="form-group">
												{{temp.deviceName}}
											</div>
										</td>
										<td>
											<div class="form-group">
												{{temp.releaseDate}}
											</div>
										</td>
										<td>
											<!--<select class="form-control">
                          <option value="The device is broken 设备损坏">The device is broken 设备损坏</option>
                          <option value="The device is out of service period 设备超过保修期">The device is out of service period 设备超过保修期</option>
                        </select>-->
											<form-group :disabled="!(temp.isChecked == 'true' || temp.isChecked)" other-rules="required" type="select" uri="/dict/list?groupName=itcpReplaceReason" haslable="false" :readonly="readonly" v-model="temp.replaceReason" :name="'replaceReason'+index"></form-group>

										</td>
										<td class="text-center">
											<div class="form-group">
												<input type="checkbox" value="true" :name="'isChecked'+index" v-model="temp.isChecked" />
											</div>
										</td>
									</tr>

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary" v-if="form.applyType=='Replace'&&readonly&&!itService">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Select Company Phone for Replacement 选择需要更换的公司电话</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-bordered mar-bot-0">
								<tbody>
									<tr>
										<th>Device S/N No. 设备编号</th>
										<th class="text-center">Device 设备</th>
										<th>Device Name 设备名称</th>
										<th>Release Date 交付时间</th>
										<th>Replace Reason 更换原因</th>

									</tr>
									<tr v-for="(temp,index) in form.devicecpReplaceInstanceList">
										<td>
											<div class="form-group">{{temp.deviceSnno}}</div>
										</td>
										<td class="text-center">
											<div class="form-group">
												<img width="100px" height="100px" :src="GL.getURL('/attachmentlob/downloadimage/'+temp.devicePic)" :title="temp.deviceDesc">
											</div>
										</td>
										<td>
											<div class="form-group">
												{{temp.deviceName}}
											</div>
										</td>
										<td>
											<div class="form-group">{{temp.releaseDate}}</div>
										</td>
										<td>
											<!--<select class="form-control">
                          <option value="The device is broken 设备损坏">The device is broken 设备损坏</option>
                          <option value="The device is out of service period 设备超过保修期">The device is out of service period 设备超过保修期</option>
                        </select>-->
											<form-group :disabled="!(temp.isChecked == 'true' || temp.isChecked)" other-rules="required" type="select" uri="/dict/list?groupName=itcpReplaceReason" haslable="false" :readonly="readonly" v-model="temp.replaceReason" :name="'replaceReason'+index"></form-group>

										</td>

									</tr>

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary" v-if="itService&&form.applyType=='New'">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Company Phone Device 公司电话设备</h3>
					<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
					</div>
					<!-- /.box-tools -->
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<!-- Custom Tabs -->
							<div class="nav-tabs-custom">
								<ul class="nav nav-tabs">
									<li class="active">
										<a href="#tab_itclent1" data-toggle="tab" aria-expanded="true">1.{{form.emsetName}}</a>
									</li>

								</ul>
								<div class="tab-content workspace-tz">
									<div class="tab-pane active overflow-auto" id="tab_itclent1">
										<table class="table table-bordered mar-bot-0 itservicetable">
											<tbody>
												<tr>
													<th>No.</th>
													<th class="text-center">Device 设备 </th>
													<th>Device Name 设备名称</th>
													<th>Substitute Device 替换设备</th>
													<th>Substitute Reason 替换原因</th>
													<th>Device SN Number 设备编号</th>
													<th>Device Release Date 设备交付日期 </th>
												</tr>
												<tr v-bind:key="index" v-for="(entry,index) in form.devicecpNewInstanceList">
													<td>
														<div class="form-group">
															<span v-if="index<9">0{{index+1}}</span>
															<span v-else>{{index+1}}</span>
														</div>
													</td>
													<td>
														<div class="form-group">
															<input type="hidden" class="form-control" id="" v-model="entry.id">
															<img :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)" width="100px" height="100px" :title="entry.deviceDesc">
														</div>
													</td>
													<td>
														<div class="form-group">
															<p class="text-center">{{entry.deviceName}}</p>
														</div>
													</td>
													<td>
														<form-group type="select" other-rules="" haslable="false" :readonly="itServiceReadonly" :uri="'/standarddevice/listforselect/'+entry.deviceType" :name="'replaceDevice'+index" v-model="entry.replaceDevice"></form-group>
													</td>

													<td>
														<form-group v-if="!entry.replaceDevice" type="input" other-rules="" haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceReason" :name="'replaceReason'+index"></form-group>
														<form-group v-if="entry.replaceDevice" type="input" :other-rules="itServicerules" haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceReason" :name="'replaceReason'+index"></form-group>
													</td>

													<td>
														<form-group type="input" other-rules="" haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceSnno" :name="'deviceSnno'+index"></form-group>
													</td>
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

			<div class="box box-primary" v-if="form.applyType=='Replace'&&itService">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Select Company Phone for Replacement 选择需要更换的公司电话</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<table class="table table-bordered mar-bot-0 itservicetable">
								<tbody>
									<tr>
										<th>No.</th>
										<th class="text-center">Device 设备 </th>
										<th>Device Name 设备名称</th>
										<th>Substitute Device 替换设备</th>
										<th>Substitute Reason 替换原因</th>
										<th>Device SN Number 设备编号</th>
										<th>Device Release Date 设备交付日期 </th>
									</tr>
									<tr v-bind:key="index" v-for="(entry,index) in form.devicecpReNewInstanceList">
										<td>
											<div class="form-group">
												<span v-if="index<9">0{{index+1}}</span>
												<span v-else>{{index+1}}</span>
											</div>
										</td>
										<td>
											<div class="form-group">
												<input type="hidden" class="form-control" id="" v-model="entry.id">
												<img :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)" width="100px" height="100px" :title="entry.deviceDesc">
											</div>
										</td>
										<td>
											<div class="form-group">
												<p class="text-center">{{entry.deviceName}}</p>
											</div>
										</td>
										<td>
											<form-group type="select" haslable="false" :readonly="itServiceReadonly" other-rules="" :uri="'/standarddevice/listforselect/'+entry.deviceType" :name="'replaceDevice'+index" v-model="entry.replaceDevice"></form-group>
										</td>

										<td>
											<form-group v-if="!entry.replaceDevice" type="input" other-rules="" haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceReason" :name="'replaceReason'+index"></form-group>
											<form-group v-if="entry.replaceDevice" type="input" :other-rules="itServicerules" haslable="false" :readonly="itServiceReadonly" v-model="entry.replaceReason" :name="'replaceReason'+index"></form-group>
										</td>

										<td>
											<form-group type="input" other-rules="" haslable="false" :readonly="itServiceReadonly" v-model="entry.deviceSnno" :name="'deviceSnno'+index"></form-group>
										</td>
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

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"><i class="fa fa-asterisk text-required"></i> Comment 注释</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<textarea-my rows="2" placeholder="Comment 注释" other-rules="required" :readonly="readonly" v-model="form.commentRemark" name="commentRemark" id="commentRemark"></textarea-my>

							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><i v-if="form.ifLost=='true'||form.ifLost" class="fa fa-asterisk text-required"></i>Upload related material  上传相关材料</h3>
					<span class="text-muted" v-if="form.ifLost=='true'||form.ifLost"> &nbsp;&nbsp;<i class="fa fa-fw fa-info-circle"></i> Please upload the evidence for losing IT equipment. 请上传设备丢失证明。</span>
				</div>
				<div class="box-body">

					<div class="row">
						<div class="col-md-12 form-group">
							<upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true" :required="ifrequired"></upload2>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary" v-if="form.applyType=='New'">
				<div class="box-body">
					<div class="checkbox">
						<label>
		              <input type="checkbox" :disabled="readonly" value="true" id="ifLost" name="ifLost" v-model="form.ifLost" >Select this section if previous devices are lost. 如果原有设备丢失勾选此项。</label>
					</div>
				</div>
			</div>

			<!--<div class="box box-primary">-->
			<!--<div class="box-header with-border">

					<label>
							<h3 class="box-title">
                  				<input :disabled="readonly&&(form.policyDeviation=='true')" id="policyDeviation"  value="true"  type="checkbox" name="policyDeviation" v-model="form.policyDeviation" >
							Policy Deviation 政策偏差   (Please complete in English / Chinese German 请用英文/中德文填写)</h3>
						</label>
					<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Choose “Policy Deviation” need BoM's approval. 选择此项需要BoM的审批。 </span>
				</div>-->
			<!--<div class="box-body" v-if="(!readonly&&(form.policyDeviation=='true'||form.policyDeviation==true))||(readonly&&(form.policyDeviation=='true'||form.policyDeviation==true)&&form.policyDeviationContent)" >
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<textarea-my 
									 rows="2" placeholder="Please state the reason for policy deviation. 请陈述原因。" :readonly="readonly&&(form.policyDeviation=='true')" v-model="form.policyDeviationContent" name="policyDeviationContent" id="policyDeviationContent"></textarea-my>
							</div>
						</div>
					</div>
				</div>-->
			<!--</div>-->

			<!--<div class="box box-primary">-->

			<div class="">

				<div class="form-group">
					<div class="checkbox">
						<label>
							
                  				<input :disabled="(readonly&&(form.policyDeviation=='true'))||itService||this.$route.path.indexOf('detail') > -1" id="policyDeviation"  value="true"  type="checkbox" name="policyDeviation" v-model="form.policyDeviation" >
							Policy Deviation 政策偏差   (Please complete in English / Chinese German 请用英文/中德文填写)
						</label>
						<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Choose “Policy Deviation” need BoM's approval. 选择此项需要BoM的审批。 </span>
					</div>

					<div class="checkbox" v-if="!readonly">
						<label>
								<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  				<input  name="terms" type="checkbox" v-validate="'required'" >When submitting the application, I have read and agreed to
                          <a target="_blank" href="https://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin</a> and <a target="_blank" href="https://vwatjportal.ap.vwg/upload/2019102211184343319.pdf">Statement of Commitment for Usage of Mobile Devices and Communication Services.</a>
                          当提交此申请时，我已经理解并承诺遵守
                          <a target="_blank" href="https://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策</a>及<a target="_blank" href="https://vwatjportal.ap.vwg/upload/2019102211184343319.pdf">移动设备和通讯服务的使用承诺声明。</a>
            </label>
					</div>
				</div>

			</div>
			<!--</div>-->
			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view v-if="!itServicebuttonShow||this.$route.path.indexOf('detail') > -1||this.form.status=='0'||this.form.status=='9'" :form="form" entityId="ItcpCompanyPhone" vclass="btn-left" uri="/form/ItcpCompanyPhone/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
			<Confirm v-if="(form.signature)&&itServicebuttonShow&&this.$route.query.taskKey=='itClentService'&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Confirm"  ></Confirm>
			<Confirmwithsavereject v-if="(!form.signature)&&itServicebuttonShow&&this.$route.query.taskKey=='itClentService'&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Confirm" rejectLableName="Decline" uri="/itcpcompanyphone/save" v-on:beforeapprovel="beforeapprovel"></Confirmwithsavereject>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>
			<div style="margin-top:15px;" v-if="form.signature">
				<p>Signature:</p>
				<img :src="form.signature.signatureContent" width="750" height="400"></img>
			</div>

		</section>
		<!-- /.content -->
		<!--modal edit Resource start-->
		<div class="modal fade" id="summaryModal" tabindex="-1" role="dialog" aria-labelledby="deviceModalLabel">
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
						<!--<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title"> Application Type <label>申请类型</label>  </h3>
									<span class="help is-danger" v-show="errors.has('applyType')">
													Please select a Type.
													请选择一个类型
												</span>
								</div>
								<form role="form">
									<div class="box-body">
										<div class="row">
											<div class="col-md-3">
												<div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
													<label style="margin-right: 10px;"><input type="radio" disabled="true" 
														v-model="form.applyType" value="New" checked="">Apply New Company Phone 申请新公司电话</label>
												</div>
											</div>
											<div class="col-md-4">
												<div class="radio" style="margin-bottom: 5px;margin-top: 5px;">
													<label style="margin-right: 10px;"><input type="radio" disabled="true" 
														 v-model="form.applyType" value="Replace">Replace Company Phone 更换公司电话</label>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>-->
						<!--<div class="box box-primary">
							<div class="box-header with-border">
								<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
							</div>
							<form role="form">
								<div class="box-body declare-box form-group" >
									<div class="row">
										<form-group  col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
										<form-group col="md-3" type="input"  v-model="form.creatorName"  name="creatorName"  readonly="readonly"></form-group>
										<form-group col="md-3" type="input"  v-model="form.creatorEmail" name="creatorEmail"  readonly="readonly"></form-group>
			
									</div>
									<div class="row">
										<form-group col="md-3" type="input"  v-model="form.creatorDept" name="creatorDept"   readonly="readonly"></form-group>
										<form-group col="md-3" type="input"  v-model="form.creatorTitle" name="creatorTitle"   readonly="readonly"></form-group>
										<form-group col="md-3" type="input"  v-model="form.creatorPhoneNum" name="creatorPhoneNum"   readonly="readonly"></form-group>
									</div>
								</div>
							</form>
						</div>-->

						<div class="box box-primary" v-if="form.applyType=='New'">
							<div class="box-header with-border">
								<h3 class="box-title pull-left"> Company Phone Device 公司电话设备</h3>
								<div class="box-tools pull-right">
									<!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>-->
								</div>
							</div>
							<div class="box-body">
								<div class="row">
									<div class="col-md-12">
										<div class="nav-tabs-custom">
											<ul class="nav nav-tabs">
												<li :class="{'tab-pane':true,  'text-center':true,'active':((form.emsetId&&entry.id==form.emsetId)||(!form.emsetId&&index==0))}" v-bind:key="index" v-for="(entry,index) in form.emsetList" v-if="entry.id==form.emsetId">
													<a :href="'#tab_'+entry.id" data-toggle="tab">1.{{entry.setName}}</a>
												</li>

											</ul>
											<div class="tab-content workspace-tz">

												<div :class="{'tab-pane':true, 'text-center':true,'active':((form.emsetId&&entry.id==form.emsetId)||(!form.emsetId&&index==0))}" v-bind:key="index" v-for="(entry,index) in form.emsetList" v-if="entry.id==form.emsetId" :id="'tab_'+entry.id">

													<div class="row">
														<div class="col-md-6 col-xs-12">
															<table class="table table-bordered mar-bot-0">
																<tbody>
																	<tr>
																		<th>No.</th>
																		<th class="text-center">Device 设备 </th>
																		<th>Device Name 设备名称</th>
																		<th>Quantity 数量</th>
																	</tr>
																	<tr v-for="(phone,phoneindex) in entry.phoneList" v-if="(entry.setName+','+phone.id)==form.devicePhoneId&&entry.phoneIds">
																		<td>
																			01
																		</td>
																		<td class="text-center"><img width="60px" height="60px" :src="GL.getURL('/attachmentlob/downloadimage/'+phone.devicePic)" :title="phone.deviceDesc"></td>
																		<td>
																			{{phone.deviceName}}
																		</td>
																		<td>1</td>
																	</tr>
																	<tr v-for="(pad,padindex) in entry.padList" v-if="(entry.setName+','+pad.id)==form.devicePadId&&entry.padIds">
																		<td>
																			02
																		</td>
																		<td class="text-center"><img width="60px" height="60px" :src="GL.getURL('/attachmentlob/downloadimage/'+pad.devicePic)" :title="pad.deviceDesc"></td>
																		<td>
																			{{pad.deviceName}}
																		</td>
																		<td>1</td>
																	</tr>
																	<tr v-for="(sim,simindex) in entry.simList" v-if="(entry.setName+','+sim.id)==form.deviceSimId&&entry.simIds">
																		<td>
																			03
																		</td>
																		<td class="text-center"><img width="60px" height="60px" :src="GL.getURL('/attachmentlob/downloadimage/'+sim.devicePic)" :title="sim.deviceDesc"></td>
																		<td>
																			{{sim.deviceName}}
																		</td>
																		<td>1</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="box box-primary" v-if="form.applyType=='Replace'">
							<div class="box-header with-border">
								<h3 class="box-title pull-left"> Select Company Phone for Replacement 选择需要更换的公司电话</h3>
							</div>
							<div class="box-body">
								<div class="row">
									<div class="col-md-12">
										<table class="table table-bordered mar-bot-0">
											<tbody>
												<tr>
													<th>Device S/N No. 设备编号</th>
													<th class="text-center">Device 设备</th>
													<th>Device Name 设备名称</th>
													<th>Release Date 交付时间</th>
													<th>Replace Reason 更换原因</th>
												</tr>
												<tr v-for="(temp,index) in form.devicecpReplaceList" v-if="temp.isChecked">
													<td>
														<div class="form-group">{{temp.deviceSnno}}</div>
													</td>
													<td class="text-center">
														<div class="form-group">
															<img width="100px" height="100px" :src="GL.getURL('/attachmentlob/downloadimage/'+temp.devicePic)" :title="temp.deviceDesc">
														</div>
													</td>
													<td>
														<div class="form-group">
															{{temp.deviceName}}
														</div>
													</td>
													<td>
														<div class="form-group">
															{{temp.releaseDate}}
														</div>
													</td>
													<td>
														<form-group type="select" uri="/dict/list?groupName=itcpReplaceReason" haslable="false" disabled="true" v-model="temp.replaceReason" :name="'replaceReason'+index"></form-group>
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
								<submit v-if="this.$route.path.indexOf('create') > -1" v-on:beforesubmit="closesummary" :form="form" labelName="Confirm" vclass="" :validator="this.$validator" @click="closesummary"></submit>
								<approve v-if="this.$route.path.indexOf('reAudit') > -1" v-on:beforeapprovel="closesummary" :form="form" vclass="pull-left" labelName="Confirm" :validator="this.$validator" @click="closesummary"></approve>
								<button style="margin-left:20px;" type="button" class="btn btn-danger pull-left " @click="closesummary"><i class="fa fa-fw fa-close"></i>Cancel</button>
							</div>
						</div>
						<br/>
						<br/>

					</div>
				</div>
			</div>
		</div>
		<!--modal edit Resource end-->
	</div>
	<!-- /.content-wrapper -->
</template>
<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'ItcpCompanyPhone',
		methods: {
			beforesubmit: function() {
				if(this.$route.path.indexOf('create') > -1 || this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) {
					if(!(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('itClentService') != -1) || (this.$route.query.taskKey == null && this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)) {
						this.form.devicecpNewInstanceList = [];
						this.form.devicecpNewInstanceids = "";

						this.form.devicecpReNewInstanceList = [];
						this.form.devicecpReNewInstanceids = "";
					}
				}

				if(this.form.applyType == 'New') {
					if(this.form.emsetIds.length < 1) {
						$.alert("Please select Employee Standard Set. 请选择套装。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
					} else {
						if(this.form.devicePhoneId == ""&&this.form.devicePadId == ""&&this.form.deviceSimId == ""){
							$.alert("Please choose at least one device. 请至少选择一个设备。");
							this.form.submitstatus = false;
							this.form.approvelstatus = false;
						}else{
							this.form.submitstatus = true;
							this.form.approvelstatus = true;
						}
						
					}
				} else if(this.form.applyType == 'Replace') {
					var templist = this.form.devicecpReplaceList;
					if(templist != null && templist.length > 0) {
						var tempselected = false;
						for(var tempdev in templist) {
							console.log(templist[tempdev]);
							if(templist[tempdev].isChecked || templist[tempdev].isChecked == 'true') {
								tempselected = true;
								break;
							}
						}
						if(tempselected) {
							this.form.submitstatus = true;
							this.form.approvelstatus = true;
						} else {
							$.alert("Please choose the replacement devices. 请选择更换的设备。");
							this.form.submitstatus = false;
							this.form.approvelstatus = false;
						}
					} else {
						$.alert("There is no replacement devices. 没有可供更换的设备。");
						this.form.submitstatus = false;
						this.form.approvelstatus = false;
					}
				}
				if(this.form.submitstatus) {
					var validatorFn = this.$validator;
					this.form.submitstatus = false;
					this.form.approvelstatus = false;
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
			beforeapprovel: function() {
				var uri = "/itcpcompanyphone/getpadsign?ticketNo=" + this.form.ticketNo;
				var _this = this;
				if(uri) {
					global_.actUtil.query("get", uri, "", function(data) {
						var dm = JSON.parse(data);
						if(dm.data == 'yes') {
							_this.form.approvelstatus = true;
						} else {
							$.alert("There is no signature. 没有电子签名确认。");
							_this.form.approvelstatus = false;
						}
					});
				}

			},
			summary: function() {
				//$('html, body').animate({scrollTop: $('#currentpage').offset().top}, 10);
				//window.location.href = "#currentpage";
				//window.parent.location.href="#iframepage";
				//window.scroll(0, 0);
				//　window.top.document.documentElement.scrollTop = "100";
				　　 //window.top.document.body.scrollTop = "100" // 不能带px
				window.top.scroll(0, 0);
				this.form.submitstatus = true;
				this.form.approvelstatus = true;
				$("#summaryModal").modal({
					backdrop: false, //点击空白处不关闭对话框
					keyboard: false, //键盘关闭对话框
					toggle: true //弹出对话框
				});
			},
			closesummary: function() {
				if(this.$route.path.indexOf('create') > -1 || this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) {
					if(!(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('itClentService') != -1) || (this.$route.query.taskKey == null && this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9)) {
						this.form.devicecpNewInstanceList = [];
						this.form.devicecpNewInstanceids = "";

						this.form.devicecpReNewInstanceList = [];
						this.form.devicecpReNewInstanceids = "";
					}
				}
				$("#summaryModal").modal('hide');
			},
			onbehalfclick: function() {

				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId = this.tempapplicantUserId;

					this.form.creatorStaffcode = this.tempcreatorStaffcode;
					this.form.creatorName = this.tempcreatorName;
					this.form.creatorPhoneNum = this.tempcreatorPhoneNum;
					this.form.creatorDept = this.tempcreatorDept;
					this.form.creatorTitle = this.tempcreatorTitle;
					this.form.creatorEmail = this.tempcreatorEmail;
					this.form.devicecpReplaceList = this.tempdevicecpReplaceList;
				}
			},
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
				this.form.creatorTitle = data.title;
				this.form.creatorEmail = data.email;
				var _this = this;
				setTimeout(function() {
					var uri = "/itcpcompanyphone/listcurrentuserdevice?userid=" + data.id;

					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var dm = JSON.parse(data);
							_this.form.devicecpReplaceList = dm.data;
						});
					}
				}, 300);

			},
			setcheck: function(indexid, set) {
				/*var ifchecked=$("#emsetId"+indexid).prop("checked");
				
				if(ifchecked){*/
				this.form.emsetId = set.id;
				this.form.emsetIds.splice(0, this.form.emsetIds.length);
				this.form.emsetIds.push(set.id);

				this.form.devicePhoneId = "";
				if(set.phoneIds) {
					//this.form.devicePhoneId = set.setName + "," + set.phoneIds.split(",")[0];
				}
				this.form.devicePadId = "";
				if(set.padIds) {
					//this.form.devicePadId = set.setName + "," + set.padIds.split(",")[0];
				}
				this.form.deviceSimId = "";
				this.form.deviceSimIds.splice(0, this.form.deviceSimIds.length);
				this.form.emsetName = set.setName;

				$("#onboard").prop("checked", true);
				/*}else{
					//this.form.emsetId="";
					this.form.emsetIds.splice(0,this.form.emsetIds.length);
					this.form.devicePhoneId="";
					this.form.devicePadId="";
					this.form.deviceSimId="";
					this.form.deviceSimIds.splice(0,this.form.deviceSimIds.length);
					this.form.emsetName="";
				}*/

			},
			simcheck: function(set, sim) {
				var ifchecked = $("#deviceSimId" + set.id + sim.id).prop("checked");

				if(ifchecked) {
					this.form.deviceSimId = set.setName + "," + sim.id;
					this.form.deviceSimIds.splice(0, this.form.deviceSimIds.length);
					this.form.deviceSimIds.push(set.setName + "," + sim.id);
				} else {

					this.form.deviceSimId = "";
					this.form.deviceSimIds.splice(0, this.form.deviceSimIds.length);
				}

			},
			checkBoxSet: function() {
				var ifchecked = $("#onboard").prop("checked");
				/* if(ifchecked){
				     this.form.emsetIds=this.form.emsetList[0].id;
				  
				 }else{
				     this.form.emsetIds=null;
				 }*/
				if(ifchecked) {
					this.form.emsetId = this.form.emsetList[0].id;
					this.form.emsetIds = [];
					this.form.emsetIds.push(this.form.emsetList[0].id);

					this.form.devicePhoneId = "";
					if(this.form.emsetList[0].phoneIds) {
						//this.form.devicePhoneId = this.form.emsetList[0].setName + "," + this.form.emsetList[0].phoneIds.split(",")[0];
					}
					this.form.devicePadId = "";
					if(this.form.emsetList[0].padIds) {
						//this.form.devicePadId = this.form.emsetList[0].setName + "," + this.form.emsetList[0].padIds.split(",")[0];
					}
					this.form.deviceSimId = "";
					this.form.deviceSimIds.splice(0, this.form.deviceSimIds.length);
					this.form.emsetName = this.form.emsetList[0].setName;
				} else {
					this.form.emsetId = "";
					this.form.emsetIds = [];
					this.form.devicePhoneId = "";
					this.form.devicePadId = "";
					this.form.deviceSimId = "";
					this.form.deviceSimIds.splice(0, this.form.deviceSimIds.length);
					this.form.emsetName = "";
				}

			},
			clearcheck:function(){
				this.form.devicePhoneId = "";
				this.form.devicePadId = "";
				this.form.deviceSimId = "";
				this.form.deviceSimIds.splice(0, this.form.deviceSimIds.length);
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/ItcpCompanyPhone/get/" + id;
			} else {
				var url = "/form/ItcpCompanyPhone/create/";
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
			dm.onbehalf = false;
			dm.tempapplicantUserId = dm.form.applicantUserId;
			dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
			dm.tempcreatorName = dm.form.creatorName;
			dm.tempcreatorPhoneNum = dm.form.creatorPhoneNum;
			dm.tempcreatorDept = dm.form.creatorDept;
			dm.tempcreatorTitle = dm.form.creatorTitle;
			dm.tempcreatorEmail = dm.form.creatorEmail;
			dm.tempdevicecpReplaceList = dm.form.devicecpReplaceList;

			dm.form.submitstatus = true;
			dm.form.approvelstatus = true;
			if(!dm.form.emsetId){
				dm.form.emsetId = dm.form.emsetList[0].id;
				dm.form.emsetIds = [];
				dm.form.emsetIds.push(dm.form.emsetList[0].id);
			}
			if(!dm.form.devicePhoneId){
				dm.form.devicePhoneId = "";
				if(dm.form.emsetList[0].phoneIds) {
					//dm.form.devicePhoneId = dm.form.emsetList[0].setName + "," + dm.form.emsetList[0].phoneIds.split(",")[0];
				}
			}
			if(!dm.form.devicePhoneId){
				dm.form.devicePadId = "";
				if(dm.form.emsetList[0].padIds) {
					//dm.form.devicePadId = dm.form.emsetList[0].setName + "," + dm.form.emsetList[0].padIds.split(",")[0];
				}
			}
			if(!dm.form.deviceSimId){
				dm.form.deviceSimId = "";
				dm.form.deviceSimIds.splice(0, dm.form.deviceSimIds.length);
				dm.form.emsetName = dm.form.emsetList[0].setName;
			}
			

			if(dm.form.emsetId) {
				dm.form.onboard = true;
			} else {
				dm.form.onboard = false;
			}

			dm.itServicerules = "required";
			this.$root.actProcessType = "none";

			return dm;
		},
		watch: {
			"$root.actProcessType": {
				handler(curVal, oldVal) {
					if("approve" == curVal) {
						//this.itServicerules = "required";
						this.itServicerules = "";
					} else if("reject" == curVal) {
						this.itServicerules = '';
					} else {
						this.itServicerules = "";
					}
					console.log(this.itServicerules);
				},
				deep: true
			}
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
			disabled: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			ifrequired: {
				get: function() {
					if(this.form.ifLost == 'true' || this.form.ifLost) {
						return "true";
					}
					return "false";
				}
			},
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			},
			itService: {
				// 动态计算是否显示confirm按钮
				get: function() {
					if(this.$route.path.indexOf('detail') > -1 && (this.form.devicecpNewInstanceids || this.form.devicecpReNewInstanceids)) {
						return true;
					}
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('itClentService') != -1 && ((this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)));
				}
			},
			itServiceReadonly: {
				get: function() {
					if(this.$route.path.indexOf('detail') > -1) {
						return true;
					}
					if(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('itClentService') != -1&&this.form.signature){
						return true;
					}
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('itClentService') == -1) || (this.$route.query.taskKey == null && this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			itServicebuttonShow: {
				get: function() {
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('itClentService') != -1);
				}
			}
		},
		mounted() {
			var _this = this;

			if(_this.form.policyDeviation == 'true') {
				$("#policyDeviation").prop("checked", true);
			} else {
				_this.form.policyDeviation = null;
				$("#policyDeviation").prop("checked", false);
			}

			if(_this.form.ifLost == 'true') {
				$("#ifLost").prop("checked", true);
			} else {
				_this.form.ifLost = null;
				$("#ifLost").prop("checked", false);
			}

			$('body').on('click', '#minusplusbtn', function() {
				//console.log("0000");
				if($("#minusplusbtn").hasClass("collapsed")) {
					//console.log(111);
					$("#minusplusi").removeClass("fa-plus");
					$("#minusplusi").addClass("fa-minus");
				} else {
					//console.log(2222);
					$("#minusplusi").removeClass("fa-minus");
					$("#minusplusi").addClass("fa-plus");

				};
			});

			//Device SN Number验证
			$(".itservicetable tbody").on('blur', ':input', function() {

				var tempList = [];
				if(_this.form.applyType == 'New') {
					tempList = _this.form.devicecpNewInstanceList;
				} else if(_this.form.applyType == 'Replace') {
					tempList = _this.form.devicecpReNewInstanceList;
				}

				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).attr("name") && $(this).attr("name").contains("deviceSnno") && $(this).val()) {
						var uri = "/itcpcompanyphone/findBydeviceSnno?deviceSnno=" + $(this).val();
						var tempindex = $(this).attr("name").substring(10);
						var tempboolean = true;
						//先比对，新赋值的，是不是有重复Device SN Number
						for(var i in tempList) {
							if(i != tempindex) {
								if(tempList[i].deviceSnno == tempList[tempindex].deviceSnno) {
									tempboolean = false;
									tempList[tempindex].deviceSnno = "";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
									break;
								}

							}
						}
						if(uri && tempboolean) {
							//和数据库里比对是不是有重复的Device SN Number
							global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								if(dm.data == 'yes') {
									tempList[tempindex].deviceSnno = "";
									$(this).val("");
									$.alert("The Device SN Number has been assigned and unavailable. 设备编号已被分配，不可用。");
								} else {

								}
							});
						}
					}
				}
			});

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_this = this;
			});
		}
	}
</script>

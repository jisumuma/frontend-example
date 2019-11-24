<template>
	<div id="currentpage">
		<section class="content-header">
			<h1>Workplace / Company Phone Application
			</h1>

		</section>
		<section class="content container-fluid">

			<div class="box box-primary">
				<div class="box-body">
					<div class="row">
						<div class="col-md-3" style="display: inline-block;width:25%;">
							<div class="form-group">
								<label for="">
													 Ticket No.申请单号: </label>
								<div class="input ">
									<input type="text" class="form-control" placeholder="Ticket No.申请单号" id="applicationNumber" name="applicationNumber" v-model="searchTicketNo1">

								</div>
							</div>
						</div>
						<div class="col-md-3" style="display: inline-block;width:25%;">
							<div class="form-group">
								<label for="">
													 Applicant 申请人: </label>
								<div class="input">
									<input type="text" class="form-control" placeholder="Applicant 申请人" id="applicantName" name="applicantName" v-model="searchApplicantName">

								</div>
							</div>
						</div>
						<div class="col-md-3" style="display: inline-block;width:25%;">
							<div class="form-group">
								<label for="">
													 Staff Code 员工号: </label>
								<div class="input ">
									<input type="text" class="form-control" placeholder="Staff Code" id="staffcode" name="staffcode" v-model="searchStaffcode">

								</div>
							</div>
						</div>
						<div class="col-md-3" style="display: inline-block;width:20%;">
							<div class="form-group">
								<label for="">
													&nbsp;</label>
								<div class="input ">
									<span id="selectotherperson">
			                          	<button type="button" class="btn btn-primary btn-flat" @click="search1"><i class="fa fa-fw fa-search"></i>Search</button>
			                        </span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="listTable">
				<!--更换设备的审核页面 starts-->
				<div class="box box-primary">
					<!--<div class="box-header with-border">
		            <h3 class="box-title pull-left"> Select Devices for Replacement </h3>
		          </div>-->
					<div class="box-body">
						<div class="row">
							<div class="col-md-12">
								<table class="table table-bordered   table-hover mar-bot-0 dataTable" id="listTableSearch">
									<thead>
										<tr>
											<th> Ticket No.申请单号</th>
											<th> Department 部门</th>
											<th> Staff Code 员工号</th>
											<th> Applicant 申请人</th>
											<th> Arrive Time 到达时间</th>
											<!--<th width="15%">Action 操作</th>-->
										</tr>

									</thead>
									<tbody>
										<tr v-for="(temp,index) in listTable" v-if="listTable.length>0" @click="search(temp.TICKETNO)" style="cursor:pointer;">
											<td>
												{{temp.TICKETNO}}
											</td>
											<td>
												{{temp.DEPARTMENT}}
											</td>
											<td>
												{{temp.STAFFCODE}}
											</td>
											<td>
												{{temp.PRINTENNAME}}
											</td>
											<td>
												{{temp.ARRIVETIME}}
											</td>
											<!--<td>
												<a class="detailbj" href="javascript:;" style="margin-left: 10px;" @click="search(temp.TICKETNO)"> <i class="fa fa-search detail"></i></a>
											</td>-->
										</tr>
										<tr v-if="listTable.length<=0">
											<td colspan="4">No search results 没有搜索结果</td>
										</tr>
									</tbody>

								</table>
							</div>
						</div>
					</div>
				</div>
				<!--更换设备的审核页面 ends-->
			</div>

			<div v-if="form">
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
						<div class="box-body declare-box form-group panel-collapse collapse " id="collapseZero">
							<div class="row">
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
							            	Staff Code 员工号
							            </label>
										<input type="text" v-model="form.creatorStaffcode" title="form.creatorStaffcode" placeholder="Staff Code 员工号" name="creatorStaffcode" readonly="readonly" :class="{'form-control':true,'input': true}">
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
							            	Name 姓名
							            </label>
										<input type="text" v-model="form.creatorName" title="form.creatorName" placeholder="Name 姓名" name="creatorName" readonly="readonly" :class="{'form-control':true,'input': true}">
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
							            	Email 邮箱
							            </label>
										<input type="text" v-model="form.creatorEmail" title="form.creatorEmail" placeholder="Email 邮箱" name="creatorEmail" readonly="readonly" :class="{'form-control':true,'input': true}">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
							            	Division / Dept. 部门
							            </label>
										<input type="text" v-model="form.creatorDept" title="form.creatorDept" placeholder="Division / Dept. 部门" name="creatorDept" readonly="readonly" :class="{'form-control':true,'input': true}">
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<!--<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
							            	Title 职称
							            </label>
										<input type="text" v-model="form.creatorTitle" title="form.creatorTitle" placeholder="Title 职称" name="creatorTitle" readonly="readonly" :class="{'form-control':true,'input': true}">
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<!--<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
							            	Telephone 电话
							            </label>
										<input type="text" v-model="form.creatorPhoneNum" title="form.creatorPhoneNum" placeholder="Telephone 电话" name="creatorPhoneNum" readonly="readonly" :class="{'form-control':true,'input': true}">
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<!--Itcp和WP的要分开判断-->
				<div v-if="type=='ITCP'">
					<div class="box box-primary" v-if="form.applyType=='New'&&readonly">
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
													<div class="col-md-12 col-xs-12">
														<!--<table class="table table-bordered mar-bot-0">
															<tbody>
																<tr>
																	<th>No.</th>
																	<th class="text-center">Device 设备 </th>
																	<th>Device Name 设备名称</th>
																	<th>Quantity 数量</th>
																	<th>Device S/N No. 设备编号</th>
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
																	<td>&nbsp;{{temp.deviceSnno}}</td>
																</tr>

															</tbody>
														</table>-->
														<table class="table table-bordered mar-bot-0 itservicetable">
															<tbody>
																<tr>
																	<th class="text-center" style="vertical-align:middle;">No.</th>
																	<th class="text-center" style="vertical-align:middle;">Device <br>设备 </th>
																	<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
																	<th class="text-center" style="vertical-align:middle;">Substitute Device <br>替换设备</th>
																	<th class="text-center" style="vertical-align:middle;">Substitute Reason <br>替换原因</th>
																	<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
																	<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
																</tr>
																<tr v-bind:key="index" v-for="(entry,index) in form.devicecpNewInstanceList">
																	<td class="text-center">
																		<div class="form-group">
																			<span v-if="index<9">0{{index+1}}</span>
																			<span v-else>{{index+1}}</span>
																		</div>
																	</td>
																	<td class="text-center">
																		<div class="form-group">
																			<input type="hidden" class="form-control" id="" v-model="entry.id">
																			<img :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)" width="100px" height="100px" :title="entry.deviceDesc">
																		</div>
																	</td>
																	<td class="text-center">
																		<div class="form-group">
																			<p class="text-center">{{entry.deviceName}}</p>
																		</div>
																	</td>
																	<td class="text-center">
																		{{entry.replaceDeviceName}}
																	</td>

																	<td class="text-center">
																		{{entry.replaceReason}}
																	</td>

																	<td class="text-center">
																		{{entry.deviceSnno}}
																	</td>
																	<td class="text-center">
																		{{entry.releaseDate}}
																	</td>
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

					<div class="box box-primary" v-if="form.applyType=='Replace'&&readonly">
						<div class="box-header with-border">
							<h3 class="box-title pull-left"> Select Company Phone for Replacement 选择需要更换的公司电话</h3>
						</div>
						<div class="box-body">
							<div class="row">
								<div class="col-md-12">
									<!--<table v-if="!form.devicecpReNewInstanceids" class="table table-bordered mar-bot-0">
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
									
													<form-group :disabled="!(temp.isChecked == 'true' || temp.isChecked)" other-rules="required" type="select" uri="/dict/list?groupName=itcpReplaceReason" haslable="false" :readonly="readonly" v-model="temp.replaceReason" :name="'replaceReason'+index"></form-group>

												</td>

											</tr>

										</tbody>
									</table>-->
									<!--v-if="form.devicecpReNewInstanceids"-->
									<table class="table table-bordered mar-bot-0 itservicetable">
										<tbody>
											<tr>
												<th class="text-center" style="vertical-align:middle;">No.</th>
												<th class="text-center" style="vertical-align:middle;">Device <br>设备 </th>
												<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
												<th class="text-center" style="vertical-align:middle;">Substitute Device <br>替换设备</th>
												<th class="text-center" style="vertical-align:middle;">Substitute Reason <br>替换原因</th>
												<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
												<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
											</tr>
											<tr v-bind:key="index" v-for="(entry,index) in form.devicecpReNewInstanceList">
												<td class="text-center">
													<div class="form-group">
														<span v-if="index<9">0{{index+1}}</span>
														<span v-else>{{index+1}}</span>
													</div>
												</td>
												<td class="text-center">
													<div class="form-group">
														<input type="hidden" class="form-control" id="" v-model="entry.id">
														<img :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)" width="100px" height="100px" :title="entry.deviceDesc">
													</div>
												</td>
												<td class="text-center">
													<div class="form-group">
														<p class="text-center">{{entry.deviceName}}</p>
													</div>
												</td>
												<td class="text-center">
													{{entry.replaceDeviceName}}
												</td>

												<td class="text-center">
													{{entry.replaceReason}}
												</td>

												<td class="text-center">
													{{entry.deviceSnno}}
												</td>
												<td class="text-center">
													{{entry.releaseDate}}
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
										<textarea-my rows="2" placeholder="Comment 注释" :readonly="readonly" v-model="form.commentRemark" name="commentRemark" id="commentRemark"></textarea-my>

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
									<upload :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="true"></upload>
								</div>
							</div>
						</div>
					</div>

					<div class="box box-primary">
						<div class="box-body">
							<div class="checkbox">
								<label>
		              <input type="checkbox" :disabled="readonly" value="true" id="ifLost" name="ifLost" v-model="form.ifLost" >Select this section if pervious devices are lost. 如果原有设备丢失勾选此项。</label>
							</div>
						</div>
					</div>
				</div>
				<div v-if="type=='ITWP'">
					<!-- 套装审核页面starts-->
					<div class="box box-primary" v-if="readonly && form.applicationType==1&& form.employeeType">
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
											<li class="active">
												<a href="#tab_1" data-toggle="tab" aria-expanded="true">{{form.employeeName}}</a>
											</li>

										</ul>
										<div class="tab-content workspace-tz">
											<div class="tab-pane active" id="tab_1">
												<div class="row">
													<div class="col-md-12 col-xs-12">
														<!-- <table class="table table-bordered table-hover" id="wpStandardtable">
															<thead>
																<tr role="row">
																	<th>No.</th>
																	<th>Device 设备 </th>
																	<th>Device Name 设备名称</th>
																	<th>Quantity 数量</th>
																	<th>Device S/N No. 设备编号</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table> -->
														<table class="table table-bordered mar-bot-0 itservicetable">
															<tbody>
																<tr>
																	<th class="text-center" style="vertical-align:middle;">No.</th>
																	<th class="text-center" style="vertical-align:middle;">Device <br>设备 </th>
																	<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
																	<th class="text-center" style="vertical-align:middle;">Substitute Device <br>替换设备</th>
																	<th class="text-center" style="vertical-align:middle;">Substitute Reason <br>替换原因</th>
																	<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
																	<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
																</tr>
																<tr v-bind:key="index" v-for="(entry,index) in form.wpFinStandardDeviceList">
																	<td class="text-center" style="vertical-align:middle;">{{ index+ 1}}</td>
																	<td class="text-center" style="vertical-align:middle;">
																		<input type="hidden" class="form-control" id="" v-model="entry.id">
																		<img style='height: 70px;width: 70px;' :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
																	</td>
																	<td class="text-center" style="vertical-align:middle;">
																		<p>{{entry.deviceName}}</p>
																	</td>

																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.replaceDeviceName}}
																	</td>
																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.replaceMentReason}}
																	</td>
																	<td class="text-center" style="vertical-align:middle;">{{entry.deviceNo}}</td>
																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.releaseDate}}
																	</td>

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
					<!-- 套装审核页面end-->

					<!-- 扩展设备审核页面 starts-->
					<div class="box box-primary" v-if="readonly && (form.applicationType==1 || form.applicationType==3)  &&(form.extendReason=='Y' || form.flag=='Y')">

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
								
								<div class="col-md-3">
									<div class="form-group">
										<label>
											<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
							            	Borrowing Time 借用时间
							            </label>
										<form-group  v-if="form.applicationType==3" type="daterangepicker2" haslable="false" dateLimit="30" other-rules="required" v-model="form.borrowDate" name="contractPeriod" :readonly="readonly"></form-group>
									</div>
								</div>
								<div class="col-md-12">
									<!-- Custom Tabs -->
									<div class="nav-tabs-custom">
										<ul class="nav nav-tabs">
											<li class="active" v-if="form.extendReason=='Y'">
												<a href="#extabsh_0" data-toggle="tab" aria-expanded="true">1.Standard</a>
											</li>
											<li class="" v-if="form.flag=='Y'&& form.extendReason=='Y'">
												<a href="#extabsh_5" data-toggle="tab" aria-expanded="false">2.Non-Standard</a>
											</li>
											<li class="" v-if="form.flag=='Y' && form.extendReason=='N'">
												<a href="#extabsh_5" data-toggle="tab" aria-expanded="true">1.Non-Standard</a>
											</li>
										</ul>
										<div class="tab-content">
											<div class="tab-pane active" id="extabsh_0" v-if="form.extendReason=='Y'">
												<!-- <div class="tab-pane active" id="tab_1"> -->
												<div class="row">
													<div class="col-md-12 col-xs-12">
														<!-- <table class="table table-bordered table-hover" id="extendStandard">
															<thead>
																<tr role="row">
																	<th>No.</th>
																	<th>Device 设备 </th>
																	<th>Device Name 设备名称</th>
																	<th>Quantity 数量</th>
																	<th>Device S/N No. 设备编号</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table> -->
														<table class="table table-bordered table-hover itservicetableed">
															<thead>
																<tr role="row">
																	<th class="text-center" style="vertical-align:middle;">No.</th>
																	<th class="text-center" style="vertical-align:middle;">Device <br>设备 </th>
																	<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
																	<th class="text-center" style="vertical-align:middle;">Substitute Device <br>替换设备</th>
																	<th class="text-center" style="vertical-align:middle;">Substitute Reason <br>替换原因</th>
																	<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
																	<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
																</tr>
															</thead>
															<tbody>
																<tr v-bind:key="index" v-for="(entry,index) in form.wpFinExtendDevice">
																	<td class="text-center" style="vertical-align:middle;">{{ index+ 1}}</td>
																	<td class="text-center" style="vertical-align:middle;">
																		<input type="hidden" class="form-control" id="" v-model="entry.id">
																		<img style='height: 70px;width: 70px;' :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
																	</td>
																	<td class="text-center" style="vertical-align:middle;">
																		<p>{{entry.deviceName}}</p>
																	</td>

																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.replaceDeviceName}}
																	</td>

																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.replaceMentReason}}
																	</td>
																	<td class="text-center" style="vertical-align:middle;">{{entry.deviceNo}}</td>
																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.releaseDate}}
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
														<!-- <table class="table table-bordered table-hover" id="extendStandardNon">
															<thead>
																<tr role="row">
																	<th>No.</th>
																	<th>Device Name 设备名称</th>
																	<th>Model 设备型号</th>
																	<th width="10%">Quantity 数量</th>
																	<th>Purpose 申请原因</th>
																	<th>Device S/N No. 设备编号</th>
																	
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table> -->
														<table class="table table-bordered table-hover itservicetableednon">
															<thead>
																<tr role="row">
																	<th class="text-center" style="vertical-align:middle;">No.</th>
																	<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
																	<th class="text-center" style="vertical-align:middle;">Model <br>设备型号</th>
																	<th class="text-center" style="vertical-align:middle;">Purpose <br>申请原因</th>
																	<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
																	<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
																</tr>
															</thead>
															<tbody>
																<tr v-bind:key="index" v-for="(entry,index) in form.wpFinExtendDeviceNon">
																	<td class="text-center" style="vertical-align:middle;">{{ index+ 1}}
																		<input type="hidden" class="form-control" id="" v-model="entry.id">
																	</td>

																	<td class="text-center" style="vertical-align:middle;">
																		<p>{{entry.deviceName}}</p>
																	</td>
																	<td class="text-center" style="vertical-align:middle;">{{entry.model}}</td>
																	<!-- <td><form-group type="input"   haslable="false" :readonly="readonly" v-model="entry.extendReason" :name="'extendReason'+index"></form-group></td> -->
																	<td class="text-center" style="vertical-align:middle;">{{entry.extendReason}}</td>
																	<td class="text-center" style="vertical-align:middle;">{{entry.deviceNo}}</td>
																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.releaseDate}}
																	</td>

																</tr>

															</tbody>
														</table>

													</div>
												</div>
												<!-- </div> -->
												<!-- /.tab-pane -->
											</div>

											<div class="tab-pane active" id="extabsh_5" v-if="form.flag=='Y' && form.extendReason=='N'">

												<div class="row">
													<div class="col-md-9 col-xs-12">
														<!-- <table class="table table-bordered table-hover" id="extendStandardNon">
															<thead>
																<tr role="row">
																	<th>No.</th>
																	<th>Device Name 设备名称</th>
																	<th>Model 设备型号</th>
																	<th width="10%">Quantity 数量</th>
																	<th>Purpose 申请原因</th>
																	<th>Device S/N No. 设备编号</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table> -->
														<table class="table table-bordered table-hover itservicetableednon">
															<thead>
																<tr role="row">
																	<th class="text-center" style="vertical-align:middle;">No.</th>
																	<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
																	<th class="text-center" style="vertical-align:middle;">Model <br>设备型号</th>
																	<th class="text-center" style="vertical-align:middle;">Purpose <br>申请原因</th>
																	<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
																	<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
																</tr>
															</thead>
															<tbody>
																<tr v-bind:key="index" v-for="(entry,index) in form.wpFinExtendDeviceNon">
																	<td class="text-center" style="vertical-align:middle;">{{ index+ 1}}
																		<input type="hidden" class="form-control" id="" v-model="entry.id">
																	</td>

																	<td class="text-center" style="vertical-align:middle;">
																		<p>{{entry.deviceName}}</p>
																	</td>
																	<td class="text-center" style="vertical-align:middle;">{{entry.model}}</td>
																	<!-- <td><form-group type="input"   haslable="false" :readonly="readonly" v-model="entry.extendReason" :name="'extendReason'+index"></form-group></td> -->
																	<td class="text-center" style="vertical-align:middle;">{{entry.extendReason}}</td>
																	<td class="text-center" style="vertical-align:middle;">{{entry.deviceNo}}</td>
																	<td class="text-center" style="vertical-align:middle;">
																		{{entry.releaseDate}}
																	</td>

																</tr>

															</tbody>
														</table>

													</div>
												</div>

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

					<!--更换设备的审核页面 starts-->
					<div class="box box-primary" v-if="readonly && form.applicationType==2 ">
						<div class="box-header with-border">
							<h3 class="box-title pull-left"> Select Devices for Replacement </h3>
						</div>
						<div class="box-body">
							<div class="row">
								<div class="col-md-12">
									<!-- <table class="table table-bordered mar-bot-0" id="replaceTable">
										<thead>
											<tr>
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

									</table> -->
									<table class="table table-bordered mar-bot-0 itservicetablere">
										<tbody>
											<tr>
												<!-- <th> Device S/N No.</th> -->
												<th class="text-center" style="vertical-align:middle;">No.</th>
												<th class="text-center" style="vertical-align:middle;">Device <br>设备 </th>
												<th class="text-center" style="vertical-align:middle;">Device Name <br>设备名称</th>
												<th class="text-center" style="vertical-align:middle;">Substitute Device <br>替换设备</th>
												<th class="text-center" style="vertical-align:middle;">Substitute Reason <br>替换原因</th>
												<th class="text-center" style="vertical-align:middle;">Device SN Number <br>设备编号</th>
												<th class="text-center" style="vertical-align:middle;">Device Release Date <br>设备交付日期 </th>
											</tr>
											<tr v-bind:key="index" v-for="(entry,index) in form.wpFinReplaceDevice">
												<td class="text-center" style="vertical-align:middle;">{{ index+ 1}}</td>
												<td class="text-center" style="vertical-align:middle;">
													<input type="hidden" class="form-control" id="" v-model="entry.id">
													<img v-if="entry.devicePic" style='height: 70px;width: 70px;' :id="'device'+index" :src="GL.getURL('/attachmentlob/downloadimage/'+entry.devicePic)">
												</td>
												<td class="text-center" style="vertical-align:middle;">
													<p>{{entry.deviceName}}</p>
												</td>

												<td class="text-center" style="vertical-align:middle;">
													{{entry.replaceDeviceName}}
												</td>

												<td class="text-center" style="vertical-align:middle;">
													{{entry.replaceMentReason}}
												</td>
												<td class="text-center" style="vertical-align:middle;">{{entry.deviceNo}}</td>
												<td class="text-center" style="vertical-align:middle;">
													{{entry.releaseDate}}
												</td>

											</tr>

										</tbody>

									</table>
								</div>
							</div>
						</div>
					</div>
					<!--更换设备的审核页面 ends-->

					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title"> <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Comment 注释 </h3>
						</div>
						<div class="box-body">
							<div class="row">
								<div class="col-md-12">
									<textarea :class="{'form-control':true,'pull-left': true,'input':true,'price':true, 'is-danger': errors.has('description') }" id="description" name="description" rows="2" placeholder="" v-validate="'required'" v-model="form.description" :disabled="readonly"></textarea>
								</div>
							</div>
						</div>
					</div>

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
										<upload :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload Attachment " :attachments="form.attachments" multi="true"></upload>
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

				</div>
				<comment-list v-if="form.processInstanceId !=null" :processInstanceId="form.processInstanceId"></comment-list>
				<div style="margin-top:15px;" v-if="signature">
					<p>Signature:</p>
					<img :src="signature.signatureContent" width="750" height="400"></img>
				</div>
				<div style="margin-top:15px;" v-if="!signature">
					<Signature ref="signature" uri="/signatureuserdevice/uploadsignature" :otherdata="searchTicketNo" v-on:confirm="confirm"></Signature>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
	import global_ from './../../../components/Common/Util/Global.vue'
	export default {
		name: 'SignatureUserDevice',
		methods: {
			confirm: function() {
				this.searchApplicantName = "";
				this.searchTicketNo1 = "";
				this.searchStaffcode = "";
				this.search1();
			},
			search1: function() {
				var applicantName = this.searchApplicantName;
				var ticketNo = this.searchTicketNo1;
				var staffcode = this.searchStaffcode;
				this.signature = null;
				this.form = null;
				this.searchTicketNo = "";
				this.listTable = {};

				var _this = this;

				setTimeout(function() {
					var uri = "/signatureuserdevice/getapplication?ticketNo=" + ticketNo + "&applicantName=" + applicantName + "&staffcode=" + staffcode;

					if(uri) {
						global_.actUtil.query("get", uri, "", function(data) {
							var dm = JSON.parse(data);
							_this.listTable = dm.data;
						});
					}
				}, 300);

			},
			search: function(tempticketNo) {
				//console.log(tempticketNo);
				this.searchTicketNo = tempticketNo;
				var ticketNo = this.searchTicketNo;
				this.signature = null;
				if(!ticketNo) {
					$.alert("Please input application number! 请输入办件号！");
				} else {
					var _this = this;
					if(_this.$refs.signature)
						_this.$refs.signature.clear();
					setTimeout(function() {
						var uri = "/signatureuserdevice/getapplicationbyticketno?ticketNo=" + ticketNo;

						if(uri) {
							global_.actUtil.query("get", uri, "", function(data) {
								var dm = JSON.parse(data);
								if(dm.success == 'Y') {
									_this.form = dm.data;
									_this.signature = dm.signature;
									_this.type = dm.type;
									// if(dm.type == 'ITWP') {
									// 	setTimeout(function() {
									// 		var queryData = _this.retrieveData;
									// 		var table1 = $("#wpStandardtable").DataTable({
									// 			"fnServerData": queryData,
									// 			"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
									// 			"serverSide": true,
									// 			"filter": false,
									// 			"lengthChange": false,
									// 			"retrieve": true,
									// 			"aoColumnDefs": [{
									// 				"bSortable": false,
									// 				"aTargets": [1, 2, 3,4]
									// 			}],
									// 			"aaSorting": [
									// 				[0, "asc"]
									// 			], //给列表排序
									// 			columns: [{
									// 					data: "id"
									// 				},
									// 				{
									// 					data: "devicePic"
									// 				},
									// 				{
									// 					data: "deviceName"
									// 				},
									// 				{
									// 					data: "deviceNum"
									// 				},
									// 				{
									// 					data: null
									// 				}
									// 			],
									// 			"fnRowCallback": function(row, data, index) { //设置列从0开始
									// 				var url = _this.GL.getURL('/attachmentlob/downloadimage/' + data.devicePic);
									// 				$('td:eq(0)', row).html(index + 1);
									// 				var html = "<img style='height: 70px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
									// 				$('td:eq(1)', row).html(html);
									// 				$('td:eq(2)', row).html(data.deviceName);
									// 				$('td:eq(3)', row).html(data.deviceNum);
									// 				$('td:eq(4)', row).html("");

									// 				return row;
									// 			}
									// 		});

									// 		var queryDataExtend = _this.retrieveDataExtend;
									// 		var table2 = $("#extendStandard").DataTable({
									// 			"fnServerData": queryDataExtend,
									// 			"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
									// 			"serverSide": true,
									// 			"filter": false,
									// 			"lengthChange": false,
									// 			"retrieve": true,
									// 			"aoColumnDefs": [{
									// 				"bSortable": false,
									// 				"aTargets": [1, 2, 3,4]
									// 			}],
									// 			"aaSorting": [
									// 				[0, "asc"]
									// 			], //给列表排序
									// 			columns: [{
									// 					data: "id"
									// 				},
									// 				{
									// 					data: "devicePic"
									// 				},
									// 				{
									// 					data: "deviceName"
									// 				},
									// 				{
									// 					data: "deviceNum"
									// 				},
									// 				{
									// 					data: null
									// 				}
									// 			],
									// 			"fnRowCallback": function(row, data, index) { //设置列从0开始
									// 				var url = _this.GL.getURL('/attachmentlob/downloadimage/' + data.devicePic);
									// 				$('td:eq(0)', row).html(index + 1);
									// 				var html = "<img style='height: 70px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
									// 				$('td:eq(1)', row).html(html);
									// 				$('td:eq(2)', row).html(data.deviceName);
									// 				$('td:eq(3)', row).html(data.deviceNum);
									// 				$('td:eq(4)', row).html("");
									// 				//  if((data.deviceNum==0)){
									// 				//     $(row).hide();
									// 				//   }

									// 				return row;
									// 			}
									// 		});

									// 		//审核页面的扩展非标准显示 replaceTable
									// 		var queryDataNon = _this.retrieveDataExtendNon;
									// 		var table3 = $("#extendStandardNon").DataTable({
									// 			"fnServerData": queryDataNon,
									// 			"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
									// 			"serverSide": true,
									// 			"filter": false,
									// 			"lengthChange": false,
									// 			"retrieve": true,
									// 			"aoColumnDefs": [{
									// 				"bSortable": false,
									// 				"aTargets": [1, 2, 3,4,5]
									// 			}],
									// 			"aaSorting": [
									// 				[0, "asc"]
									// 			], //给列表排序
									// 			columns: [{
									// 					data: "id"
									// 				},
									// 				{
									// 					data: "deviceName"
									// 				},
									// 				{
									// 					data: "model"
									// 				},
									// 				{
									// 					data: "deviceNum"
									// 				},
									// 				{
									// 					data: "extendReason"
									// 				},
									// 				{
									// 					data: null
									// 				}
									// 			],
									// 			"fnRowCallback": function(row, data, index) { //设置列从0开始

									// 				var url = _this.GL.getURL('/attachmentlob/downloadimage//' + data.devicePic);
									// 				$('td:eq(0)', row).html(index + 1);

									// 				$('td:eq(1)', row).html(data.deviceName);
									// 				$('td:eq(2)', row).html(data.model);
									// 				$('td:eq(3)', row).html(data.deviceNum);
									// 				$('td:eq(4)', row).html(data.extendReason);
									// 				$('td:eq(5)', row).html("");

									// 				return row;
									// 			}
									// 		});

									// 		//审核页面更换设备显示 
									// 		var replaceTable = _this.replaceTable;
									// 		var table4 = $("#replaceTable").DataTable({
									// 			"fnServerData": replaceTable,
									// 			"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
									// 			"serverSide": true,
									// 			"filter": false,
									// 			"lengthChange": false,
									// 			"retrieve": true,
									// 			"aoColumnDefs": [{
									// 				"bSortable": false,
									// 				"aTargets": [1, 2, 3, 4, 5]
									// 			}],
									// 			"aaSorting": [
									// 				[0, "asc"]
									// 			], //给列表排序
									// 			columns: [{
									// 					data: "id"
									// 				},
									// 				{
									// 					data: "deviceNoOld"
									// 				},
									// 				{
									// 					data: "devicePic"
									// 				},
									// 				{
									// 					data: "deviceName"
									// 				},
									// 				{
									// 					data: "releaseDateOld"
									// 				},
									// 				{
									// 					data: "replaceReason"
									// 				}
									// 			],
									// 			"fnRowCallback": function(row, data, index) { //设置列从0开始

									// 				var url = _this.GL.getURL('/attachmentlob/downloadimage/' + data.devicePic);
									// 				$('td:eq(0)', row).html(index + 1);
									// 				var html = "<img style='height: 70px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
									// 				$('td:eq(1)', row).html(data.deviceNoOld);
									// 				if(data.devicePic) {
									// 					$('td:eq(2)', row).html(html);
									// 				} else {
									// 					$('td:eq(2)', row).html("");
									// 				}

									// 				$('td:eq(3)', row).html(data.deviceName);
									// 				$('td:eq(4)', row).html(data.releaseDateOld);
									// 				$('td:eq(5)', row).html(data.replaceReason == 1 ? 'The device is broken 设备损坏' : 'The device is out of service period 设备超过保修期');

									// 				return row;
									// 			}
									// 		});

									// 	}, 1000)

									// }
									_this.listTable = null;
								} else if(dm.success == 'N') {
									$.alert("Number does not exist! 办件号不存在！");
									_this.form = null;
									_this.signature = null;
									_this.listTable = null;
								}

							});
						}
					}, 300);
				}

			},
			retrieveData: function(url, aoData, fnCallback) {
				var tikectNo = this.searchTicketNo;
				//console.log(tikectNo);
				var type = "1";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"tikectNo": tikectNo,
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
				var tikectNo = this.searchTicketNo;
				//console.log(tikectNo);
				var type = "2";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"tikectNo": tikectNo,
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
				var tikectNo = this.searchTicketNo;
				//console.log(tikectNo);
				var type = "3";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"tikectNo": tikectNo,
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
				var tikectNo = this.searchTicketNo;
				//console.log(tikectNo);
				var type = "4";
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"tikectNo": tikectNo,
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
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			dm.form = null;
			dm.searchTicketNo = "";
			dm.searchTicketNo1 = "";
			dm.searchApplicantName = "";
			dm.searchStaffcode = "";
			dm.listTable = {};
			dm.signature = null;
			dm.type = "";

			return dm;
		},
		watch: {

		},

		computed: {

			readonly: {
				// 动态计算readonly的值
				get: function() {

					return true;
				}
			}

		},
		mounted() {

			var _this = this;
			this.search1();
			if(this.form) {
				if(_this.form.ifLost == 'true') {
					$("#ifLost").prop("checked", true);
				} else {
					_this.form.ifLost = null;
					$("#ifLost").prop("checked", false);
				}
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

			//审核页面的套餐显示
			// var queryData = _this.retrieveData;
			// var table1 = $("#wpStandardtable").DataTable({
			// 	"fnServerData": queryData,
			// 	"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
			// 	"serverSide": true,
			// 	"filter": false,
			// 	"lengthChange": false,
			// 	"retrieve": true,
			// 	"aoColumnDefs": [{
			// 		"bSortable": false,
			// 		"aTargets": [1, 2, 3,4]
			// 	}],
			// 	"aaSorting": [
			// 		[0, "asc"]
			// 	], //给列表排序
			// 	columns: [{
			// 			data: "id"
			// 		},
			// 		{
			// 			data: "devicePic"
			// 		},
			// 		{
			// 			data: "deviceName"
			// 		},
			// 		{
			// 			data: "deviceNum"
			// 		},
			// 		{
			// 			data: null
			// 		}
			// 	],
			// 	"fnRowCallback": function(row, data, index) { //设置列从0开始
			// 		var url = _this.GL.getURL('/attachmentlob/downloadimage/' + data.devicePic);
			// 		$('td:eq(0)', row).html(index + 1);
			// 		var html = "<img style='height: 70px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
			// 		$('td:eq(1)', row).html(html);
			// 		$('td:eq(2)', row).html(data.deviceName);
			// 		$('td:eq(3)', row).html(data.deviceNum);
			// 		$('td:eq(4)', row).html("");
			// 		return row;
			// 	}
			// });

			//审核页面的扩展标准设备显示
			// var queryDataExtend = _this.retrieveDataExtend;
			// var table2 = $("#extendStandard").DataTable({
			// 	"fnServerData": queryDataExtend,
			// 	"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
			// 	"serverSide": true,
			// 	"filter": false,
			// 	"lengthChange": false,
			// 	"retrieve": true,
			// 	"aoColumnDefs": [{
			// 		"bSortable": false,
			// 		"aTargets": [1, 2, 3,4]
			// 	}],
			// 	"aaSorting": [
			// 		[0, "asc"]
			// 	], //给列表排序
			// 	columns: [{
			// 			data: "id"
			// 		},
			// 		{
			// 			data: "devicePic"
			// 		},
			// 		{
			// 			data: "deviceName"
			// 		},
			// 		{
			// 			data: "deviceNum"
			// 		},
			// 		{
			// 			data: null
			// 		}
			// 	],
			// 	"fnRowCallback": function(row, data, index) { //设置列从0开始
			// 		var url = _this.GL.getURL('/attachmentlob/downloadimage/' + data.devicePic);
			// 		$('td:eq(0)', row).html(index + 1);
			// 		var html = "<img style='height: 70px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
			// 		$('td:eq(1)', row).html(html);
			// 		$('td:eq(2)', row).html(data.deviceName);
			// 		$('td:eq(3)', row).html(data.deviceNum);
			// 		$('td:eq(4)', row).html("");
			// 		//  if((data.deviceNum==0)){
			// 		//     $(row).hide();
			// 		//   }

			// 		return row;
			// 	}
			// });

			//审核页面的扩展非标准显示 replaceTable
			// var queryDataNon = _this.retrieveDataExtendNon;
			// var table3 = $("#extendStandardNon").DataTable({
			// 	"fnServerData": queryDataNon,
			// 	"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
			// 	"serverSide": true,
			// 	"filter": false,
			// 	"lengthChange": false,
			// 	"retrieve": true,
			// 	"aoColumnDefs": [{
			// 		"bSortable": false,
			// 		"aTargets": [1, 2, 3,4,5]
			// 	}],
			// 	"aaSorting": [
			// 		[0, "asc"]
			// 	], //给列表排序
			// 	columns: [{
			// 			data: "id"
			// 		},
			// 		{
			// 			data: "deviceName"
			// 		},
			// 		{
			// 			data: "model"
			// 		},
			// 		{
			// 			data: "deviceNum"
			// 		},
			// 		{
			// 			data: "extendReason"
			// 		},
			// 		{
			// 			data: null
			// 		}
			// 	],
			// 	"fnRowCallback": function(row, data, index) { //设置列从0开始

			// 		var url = _this.GL.getURL('/attachmentlob/downloadimage//' + data.devicePic);
			// 		$('td:eq(0)', row).html(index + 1);

			// 		$('td:eq(1)', row).html(data.deviceName);
			// 		$('td:eq(2)', row).html(data.model);
			// 		$('td:eq(3)', row).html(data.deviceNum);
			// 		$('td:eq(4)', row).html(data.extendReason);
			// 		$('td:eq(5)', row).html("");

			// 		return row;
			// 	}
			// });

			//审核页面更换设备显示 
			// var replaceTable = _this.replaceTable;
			// var table4 = $("#replaceTable").DataTable({
			// 	"fnServerData": replaceTable,
			// 	"sAjaxSource": Config.getBaseURL() + "/workPlace/findStandard",
			// 	"serverSide": true,
			// 	"filter": false,
			// 	"lengthChange": false,
			// 	"retrieve": true,
			// 	"aoColumnDefs": [{
			// 		"bSortable": false,
			// 		"aTargets": [1, 2, 3, 4, 5]
			// 	}],
			// 	"aaSorting": [
			// 		[0, "asc"]
			// 	], //给列表排序
			// 	columns: [{
			// 			data: "id"
			// 		},
			// 		{
			// 			data: "deviceNoOld"
			// 		},
			// 		{
			// 			data: "devicePic"
			// 		},
			// 		{
			// 			data: "deviceName"
			// 		},
			// 		{
			// 			data: "releaseDateOld"
			// 		},
			// 		{
			// 			data: "replaceReason"
			// 		}
			// 	],
			// 	"fnRowCallback": function(row, data, index) { //设置列从0开始

			// 		var url = _this.GL.getURL('/attachmentlob/downloadimage/' + data.devicePic);
			// 		$('td:eq(0)', row).html(index + 1);
			// 		var html = "<img style='height: 70px;width: 70px;' id='pic" + data.id + "' data-imgId='" + data.devicePic + "' style='width:50%' src='" + url + "' >";
			// 		$('td:eq(1)', row).html(data.deviceNoOld);
			// 		if(data.devicePic) {
			// 			$('td:eq(2)', row).html(html);
			// 		} else {
			// 			$('td:eq(2)', row).html("");
			// 		}

			// 		$('td:eq(3)', row).html(data.deviceName);
			// 		$('td:eq(4)', row).html(data.releaseDateOld);
			// 		$('td:eq(5)', row).html(data.replaceReason == 1 ? 'The device is broken 设备损坏' : 'The device is out of service period 设备超过保修期');

			// 		return row;
			// 	}
			// });

		}
	}
</script>

<style scoped="scoped">
	/*#listTableSearch tr:hover{background-color: gray;} */
</style>
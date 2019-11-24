<template>
	<!-- Content Wrapper. Contains page content -->
	<div>
		<!-- Content Header (Page header) -->

		<section class="content-header">
			<h1>{{$t("CoiMain.title")}}</h1>
			<ol class="breadcrumb" v-if="form.coiDeclareOption=='3b'">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.HRBP</a>
				</li>
				<li>
					<a>3.Applicant</a>
				</li>
				<li>
					<a>4.BU Head/BOM</a>
				</li>
				<li>
					<a>5.Compliance Officer</a>
				</li>
				<li>
					<a>6.Head of HR,Orga.&Education</a>
				</li>
			</ol>
			<ol class="breadcrumb" v-if="form.coiDeclareOption=='3a'">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.HRBP</a>
				</li>
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
					<h3 class="box-title pull-left">{{$t("CoiMain.applicantInfo")}}</h3>
				</div>
				<form role="form">
					<input type="text" class="form-control hidden" id="coiMain-ticketNo" placeholder="Name" v-model="form.ticketNo">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label for="">{{$t("CoiMain.applicant.staffCode")}}</label>
									<input type="text" class="form-control" id="" :placeholder="$t('CoiMain.applicant.staffCode')" v-model="form.creatorStaffcode" disabled="">
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">{{$t("CoiMain.applicant.name")}}</label>
									<input type="text" class="form-control" id="" :placeholder="$t('CoiMain.applicant.name')" v-model="form.creatorName" disabled="">
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">{{$t("CoiMain.applicant.position")}}</label>
									<input type="text" class="form-control" id="" :placeholder="$t('CoiMain.applicant.position')" v-model="form.creatorPosition" disabled="">
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="">{{$t("CoiMain.applicant.dept")}}</label>
									<input type="text" class="form-control" id="" :placeholder="$t('CoiMain.applicant.dept')" v-model="form.creatorDept" disabled="">
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

				<div class="box box-primary1 box-solid" >
				<div class="box-header with-border1">
					<h3 class="box-title">I declare that 本人声明 ：</h3>
					<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool" data-toggle="collapse" id="minusplusbtn" href="#collapseZero"><i class="fa fa-minus" id="minusplusi"></i></button>
					</div>
				</div>
				<div class="box-body declare-box form-group panel-collapse collapse in" id="collapseZero">
					<dl class="dl-horizontal">
						<dt width="40px"> 1) </dt>
						<dd>I have read and understood Policy No. 9 “Avoiding Conflicts of Interest and Corruption”.</dd>
						<dd>本人已经阅读并理解政策9“避免利益冲突与腐败”。</dd>
						<dt width="40px"> 2) </dt>
						<dd> I am aware that I am not allowed to exploit the Company’s business relationships to my own or any other party’s advantage or to the Company’s disadvantage. This also includes any bribery or extortion. No exceptions by supervisors are permitted.</dd>
						<dd> 本人清楚本人不得利用公司的业务关系为自己或其他任何人谋取利益或损害公司利益。这也包括任何贿赂或敲诈。主管不得允许任何例外。</dd>
						<dt width="40px"> 3a) </dt>
						<dd>
							<div class="radio" :class="{'input': true, 'is-danger': errors.has('coiDeclareOption') }">
								<label>
                      <input type="radio" value="3a" v-validate="'required'" name="coiDeclareOption" v-model="form.coiDeclareOption" :disabled="readonly">
                        I and my close family members (including any person financially dependent on me as well as consanguineous relatives up to the 2nd degree of kinship, e.g. parents, grandparents, children, grandchildren; and collateral consanguineous or in-law relatives up to the 1st degree of kinship, e.g. spouse or siblings) <strong>do not have any conflicts of interest</strong> that I know of or would reasonably be expected to know of.
                        <br>
                        I am aware that this includes any connection, financial or otherwise, with third parties as described below.
                        <br><br>本人及本人的直系亲属（包括在经济上依赖本人的任何人，以及两代以内的直系血亲，如父母、（外）祖父母、子女、（外）孙子女；及旁系血亲及一代的姻亲，如配偶或兄弟姐妹）没有已知或本人应当知晓的任何利益冲突。
                        <br>本人清楚这包括与第三方具有上文描述的任何财务或其它关系。
                    </label>
							</div>
						</dd>
						<dt width="40px"> 3b) </dt>
						<dd>
							<div class="radio" :class="{'input': true, 'is-danger': errors.has('coiDeclareOption') }">
								<label>
                        <input type="radio" value="3b" v-model="form.coiDeclareOption" name="coiDeclareOption" :disabled="readonly">
                        I or a close family member (including life companion, spouse or long term partner) <strong>have or may have a conflict of interest</strong> due to:<br>
                        <ul class="list-unstyled">
                          <li>- A financial connection with a third party company either as an owner, shareholder, creditor, recipient of a benefit in money’s worth which could create a personal conflict of interest;</li>
                          <li>- As an employee, agent, contractor or service provider of a third party company that maintains business relationships, directly or indirectly, with Volkswagen; or</li>
                          <li>- Any other connection, financial or otherwise, with an individual or company which could create a compliance risk for embezzlement or fraud.</li>
                          </ul>
                          I agree to disclose details of all such potential conflicts of interest in Annex 5 of Policy No.9/ or via APON System.<br>
                          I agree to attend a discussion with the Human Resources department to clarify whether any conflict of interest could arise.
                          <br><br>本人或直系亲属（包括终身伴侣、配偶或长期伙伴）可能由于以下原因有或可能有利益冲突：
                          <ul class="list-unstyled">
                          	<li>- 作为所有人、股东、债权人、具有经济利益的获得者，与第三方公司的财务联系，这可能导致个人利益冲突；</li>
                          	<li>- 作为与VWATJ直接或间接保持业务关系的第三方公司的员工、代理人、承包商或服务提供者；</li>
                          	<li>- 与个人或公司的任何财务或其它可能产生侵占或欺诈的合规风险。</li>
                          </ul>
                          <br>本人同意在第9号政策的附件5/ 或通过APON系统中披露所有潜在利益冲突的细节。
                          <br>本人同意参加与人力资源部的讨论，澄清是否可能产生任何利益冲突。
                          </label>
							</div>
						</dd>

						<dt width="40px"> 4) </dt>
						<dd>I have fully and truthfully disclosed the existence and details of any potential conflicts of interest held by myself or my close family members (including any person financially
							<!--Annex 1 to Policy No. 9 │Donation of Gifts │ Version 1.0 │ Last update: 22. January 2015 2/4 -->
							dependent on me as well as consanguineous relatives up to the 2nd degree of kinship, e.g. parents, grandparents, children, grandchildren; and collateral consanguineous or in-law relatives up to the 1st degree of kinship, e.g. spouse or siblings).
						</dd>
						<dd>本人已经完全真实地披露了本人或本人的直系亲属（包括在经济上依赖本人的任何人，以及两代以内的直系血亲，如父母、（外）祖父母、子女、（外）孙子女；及旁系血亲及一代的姻亲，如配偶或兄弟姐妹）存在的任何潜在利益冲突的细节。</dd>
						<dt width="40px"> 5) </dt>
						<dd>I undertake to promptly report any future changes to the information provided herein to the Human Resources department, without waiting to be asked.</dd>
						<dd>本人承诺及时主动向人力资源部报告本申请表中提供信息的任何变更。</dd>
					</dl>
				</div>
			</div>

			<!--Detail box start-->
			<div class="box box-primary" v-if="form.coiDeclareOption == '3b'">
				<div class="box-header with-border">
					<h3 class="box-title">Details of Potential Conflict of Interest 潜在利益冲突的细节</h3>
					<span class="text-muted"><i class="fa fa-fw fa-info-circle"></i>  Please submit a separate form for each third party company 请为每个第三方公司提交一份单独的表格</span>
				</div>
				<div class="box-body ">
					<div :class="{'box-group':!readonly}" :id="ifaccordion">
						<!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->
						<div class="panel box " style="margin-bottom: 5px;">
							<div class="box-header with-border">
								<h4 class="box-title">
                      <a class="text-success" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                      	<dl class="dl-horizontal" style="margin-bottom:5px;">
                        <dt style="width:40px;">1. </dt>
                        <dd style="margin-left:40px;margin-bottom:5px;">I or a close family member have the following financial involvement:<br>本人或直系亲属有以下财务联系：</dd>
                     <!--   <dd>本人或直系亲属有以下财务联系：</dd>-->
                       </dl>
                      </a>
                    </h4>
							</div>
							<div id="collapseOne" :class="{'panel-collapse':true, 'collapse':true, 'in':((!readonly)||(readonly&&form.tableOneList.length>0))}">
								<div class="box-body">
									<div class="row">
										<div class="col-md-12">
											<p class="text-muted1 text-danger hidden"><i class="fa fa-info-circle"></i> Other financial connections that do not involve capital participation but do represent a benefit in money’s worth for me or a member of my family, life companion, spouse or long term partner.</p>
											<p v-if="!readonly">
												<a class="editor_create" data-toggle="modal" data-target="#modal-default-4-table1" href="#"><i class="fa fa-plus-circle"></i> Create new record 新增</a>
											</p>
											<table class="table table-bordered">
												<tbody>
													<tr>
														<th>Name 姓名</th>
														<th>Kinship 关系</th>
														<th>Company 公司名称</th>
														<th>Date of Formation 成立日期</th>
														<th>Scope of Company's business 公司经营范围</th>
														<th>Address of Company 公司地址</th>
														<th v-if="readonly">Detail 详细信息</th>
														<th v-else>Edit / Delete 修改/删除</th>
													</tr>
													<tr v-bind:key="index" v-for="(entry,index) in form.tableOneList">
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.id">
															<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.ticketNo">
															<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.name"> {{entry.name}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Kinship" v-model="entry.kinship">{{entry.kinship}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Company" v-model="entry.company">{{entry.company}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" v-model="entry.formationDate">{{entry.formationDate}}
														</td>
														<td>
															<textarea type="text" class="form-control hidden" id="" placeholder="Scope of Company's business" v-model="entry.scope"></textarea>{{entry.scope}}
														</td>
														<td>
															<textarea type="text" class="form-control hidden" id="" placeholder="Address of Company" v-model="entry.address"></textarea>{{entry.address}}
														</td>
														<td v-if="readonly">
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table1" :data-index="index">Detail 详细信息</a>
														</td>
														<td v-else>
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table1" :data-index="index">Edit 修改</a>
															<a style="margin-left: 5px" href="javascript:void(0);" @click="removeItem4Table1(index)">Delete 删除</a>
														</td>
													</tr>
												</tbody>
											</table>

											<div class="modal fade in" id="modal-default-4-table1">
												<form data-vv-scope="modal-default-4-table1">
													<div class="modal-dialog" style="width: 800px;">
														<div class="modal-content">
															<div class="modal-header">
																<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span></button>
																<h4 class="modal-title">Edit Details 编辑信息</h4>
															</div>
															<div class="modal-body">
																<input type="text" class="form-control hidden" id="table1-index">
																<input type="text" class="form-control hidden" id="table1-id">
																<input type="text" class="form-control hidden" id="table1-ticketNo">
																<div class="form-group overflow-auto">

																	<label for="" class="col-sm-4 control-label">Financial Connections <br>财务联系</label>
																	<div class="col-sm-8">
																		<select  id="table1-financialConnections" name="table1-financialConnections"
																			 v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-financialConnections') }"
																			 :disabled="readonly">
																			<option value="">--Please Select 请选择--</option>
																			<option>Sole owner</option>
																			<option>Shareholder - open</option>
																			<option>Shareholder - silent</option>
																			<option>Shareholder - through trustee</option>
																			<option>Shareholdings in company not listed on stock exchange</option>
																			<option>Creditor</option>
																			<option>Other</option>
																		</select>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Other <br>其它</label>
																	<div class="col-sm-8">
																		<input type="text" id="table1-other" placeholder="Other" :readonly="readonly" name="table1-other"
																			  v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-other') }"

																			 >
																	</div>
																	<p class="text-muted1 text-danger col-md-12">
																		<i class="fa fa-fw fa-info-circle"></i>
																		Other financial connections that do not involve capital participation but do represent a benefit in money’s worth for me or a member of my family, life companion, spouse or long term partner.
																		<br>不涉及资本参与但代表本人或本人家庭成员、终身伴侣、配偶或长期伙伴具有经济利益的其他财务联系。
																	</p>

																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Name of close family member <br>姓名</label>
																	<div class="col-sm-8">
																		<input type="text" id="table1-name" placeholder="Name" :readonly="readonly" name="table1-name"
																			 v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-name') }"

																			>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Kinship <br>关系</label>
																	<div class="col-sm-8">
																		<input type="text" id="table1-kinship" placeholder="Kinship" :readonly="readonly" name="table1-kinship"
																			 v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-kinship') }"

																			 >
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Company <br>公司名称</label>
																	<div class="col-sm-8">
																		<input type="text" id="table1-company" placeholder="Company" :readonly="readonly" name="table1-company"
																			v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-company') }"

																			 >
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Date of Formation <br>成立日期</label>
																	<div class="col-sm-8">
																		<div class="input-group date">
																			<div class="input-group-addon">
																				<i class="fa fa-calendar"></i>
																			</div>
																			<input type="text" class="form-control pull-right input-sm datepicker" id="table1-formationDate" name="table1-formationDate" :disabled="readonly"
																				v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-formationDate') }"
																				>
																		</div>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Scope of Company's business <br>公司经营范围</label>
																	<div class="col-sm-8">
																		<textarea type="text" rows="2" id="table1-scope" placeholder="Scope of Company's business" :readonly="readonly" name="table1-scope"
																			v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-scope') }"
																			></textarea>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Address of Company <br>公司地址 </label>
																	<div class="col-sm-8">
																		<textarea type="text" rows="2" id="table1-address" placeholder="Address of Company" :readonly="readonly" name="table1-address"
																			v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-address') }"

																			></textarea>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Relationship with Volkswagen (e.g., a competitor, customer or supplier)/ Shareholding Structure of Company  <br>与大众汽车集团的关系（例如：竞争关系，客户关系或供应商等）/公司股权架构 </label>
																	<div class="col-sm-8">
																		<textarea type="text" rows="4" id="table1-relationship" placeholder="Relationship with Volkswagen" :readonly="readonly" name="table1-relationship"
																			v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table1.table1-relationship') }"

																			></textarea>
																	</div>
																</div>
															</div>
															<div class="modal-footer">
																<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
																<button v-if="!readonly" type="button" class="btn btn-primary" @click="validateAllFn(insertItem4Table1,'modal-default-4-table1')" id="table1-saveButton">Save changes</button>
															</div>
														</div>
														<!-- /.modal-content -->
													</div>
													<!-- /.modal-dialog -->
												</form>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="panel box " style="margin-bottom: 5px;">
							<div class="box-header with-border">
								<h4 class="box-title">
                      <a class="text-success" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                       <dl class="dl-horizontal" style="margin-bottom:5px;">
                        <dt style="width:40px;">2. </dt>
                        <dd style="margin-left:40px;margin-bottom:5px;"> Within the last 12 months, I or close family member carry(ied) out work or provide(d) service for a company that maintains business relationships, directly or indirectly with Volkswagen:
                        	<br> 在过去的12个月内，我或我的近亲属在与大众汽车集团存在直接或间接的商业联系的公司里担任（过）职务或提供（过）服务：
                        </dd>
                       </dl>
                      </a>

                    </h4>
							</div>
							<div id="collapseTwo"  :class="{'panel-collapse':true, 'collapse':true, 'in':(readonly&&form.tableTwoList.length>0)}">
								<div class="box-body">
									<div class="row">
										<div class="col-md-12">
											<p v-if="!readonly">
												<a class="editor_create" data-toggle="modal" data-target="#modal-default-4-table2" href="#"><i class="fa fa-plus-circle"></i> Create new record 新增</a>
											</p>
											<table class="table table-bordered">
												<tbody>
													<tr>
														<th>Name 姓名</th>
														<th>Kinship 关系</th>
														<th>Company 公司名称</th>
														<th>Date of Formation 成立日期</th>
														<th>Scope of Company's business 公司经营范围</th>
														<th>Address of Company 公司地址</th>
														<th v-if="readonly">Detail 详细信息</th>
														<th v-else>Edit / Delete 修改/删除</th>
													</tr>
													<tr v-bind:key="index" v-for="(entry,index) in form.tableTwoList">
														<td>
															<input type="text" class="form-control hidden" v-model="entry.id">
															<input type="text" class="form-control hidden" v-model="entry.ticketNo">
															<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.name"> {{entry.name}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Kinship" v-model="entry.kinship">{{entry.kinship}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Company" v-model="entry.company">{{entry.company}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" v-model="entry.formationDate">{{entry.formationDate}}
														</td>
														<td>
															<textarea type="text" class="form-control hidden" id="" placeholder="Scope of Company's business" v-model="entry.scope"></textarea>{{entry.scope}}
														</td>
														<td>
															<textarea type="text" class="form-control hidden" id="" placeholder="Address of Company" v-model="entry.address"></textarea>{{entry.address}}
														</td>
														<td v-if="readonly">
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table1" :data-index="index">Detail 详细信息</a>
														</td>
														<td v-else>
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table2" :data-index="index">Edit 修改</a>
															<a style="margin-left: 5px" href="javascript:void(0);" @click="removeItem4Table2(index)">Delete 删除</a>
														</td>
													</tr>

												</tbody>
											</table>

											<div class="modal fade in" id="modal-default-4-table2">
												<form data-vv-scope="modal-default-4-table2">
												<div class="modal-dialog" style="width: 800px;">
													<div class="modal-content">
														<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span></button>
															<h4 class="modal-title">Edit Details 编辑信息</h4>
														</div>
														<div class="modal-body">
															<input type="text" class="form-control hidden" id="table2-index">
															<input type="text" class="form-control hidden" id="table2-id">
															<input type="text" class="form-control hidden" id="table2-ticketNo">
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Financial Connections <br>财务联系</label>
																<div class="col-sm-8">
																	<select  id="table2-financialConnections" name="table2-financialConnections"
																			 v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-financialConnections') }"
																			 :disabled="readonly">
																		<option value="">--Please Select 请选择--</option>
																		<option>Sole owner</option>
																		<option>Shareholder - open</option>
																		<option>Shareholder - silent</option>
																		<option>Shareholder - through trustee</option>
																		<option>Shareholdings in company not listed on stock exchange</option>
																		<option>Creditor</option>
																		<option>Other</option>
																	</select>
																</div>
															</div>
															<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Other <br>其它</label>
																	<div class="col-sm-8">
																		<input type="text" id="table2-other" placeholder="Other" :readonly="readonly" name="table2-other"
																			  v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-other') }"

																			 >
																	</div>
																	<p class="text-muted1 text-danger col-md-12">
																		<i class="fa fa-fw fa-info-circle"></i>
																		Other financial connections that do not involve capital participation but do represent a benefit in money’s worth for me or a member of my family, life companion, spouse or long term partner.
																		<br>不涉及资本参与但代表本人或本人家庭成员、终身伴侣、配偶或长期伙伴具有经济利益的其他财务联系。
																	</p>

																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Name of close family member <br>姓名</label>
																	<div class="col-sm-8">
																		<input type="text" id="table2-name" placeholder="Name" :readonly="readonly" name="table2-name"
																			 v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-name') }"

																			>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Kinship <br>关系</label>
																	<div class="col-sm-8">
																		<input type="text" id="table2-kinship" placeholder="Kinship" :readonly="readonly" name="table2-kinship"
																			 v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-kinship') }"

																			 >
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Company <br>公司名称</label>
																	<div class="col-sm-8">
																		<input type="text" id="table2-company" placeholder="Company" :readonly="readonly" name="table2-company"
																			v-validate="'required|max:75'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-company') }"

																			 >
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Date of Formation <br>成立日期</label>
																	<div class="col-sm-8">
																		<div class="input-group date">
																			<div class="input-group-addon">
																				<i class="fa fa-calendar"></i>
																			</div>
																			<input type="text" class="form-control pull-right input-sm datepicker" id="table2-formationDate" name="table2-formationDate" :disabled="readonly"
																				v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-formationDate') }"
																				>
																		</div>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Scope of Company's business <br>公司经营范围</label>
																	<div class="col-sm-8">
																		<textarea type="text" rows="2" id="table2-scope" placeholder="Scope of Company's business" :readonly="readonly" name="table2-scope"
																			v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-scope') }"
																			></textarea>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Address of Company <br>公司地址 </label>
																	<div class="col-sm-8">
																		<textarea type="text" rows="2" id="table2-address" placeholder="Address of Company" :readonly="readonly" name="table2-address"
																			v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-address') }"

																			></textarea>
																	</div>
																</div>
																<div class="form-group overflow-auto">
																	<label for="" class="col-sm-4 control-label">Relationship with Volkswagen (e.g., a competitor, customer or supplier)/ Shareholding Structure of Company  <br>与大众汽车集团的关系（例如：竞争关系，客户关系或供应商等）/公司股权架构 </label>
																	<div class="col-sm-8">
																		<textarea type="text" rows="4" id="table2-relationShipWithVm" placeholder="Relationship with Volkswagen" :readonly="readonly" name="table2-relationShipWithVm"
																			v-validate="'required|max:300'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table2.table2-relationShipWithVm') }"

																			></textarea>
																	</div>
																</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
															<button v-if="!readonly" type="button" class="btn btn-primary"  @click="validateAllFn(insertItem4Table2,'modal-default-4-table2')"  id="table2-saveButton">Save changes</button>
														</div>
													</div>
													<!-- /.modal-content -->
												</div>
												</form>
												<!-- /.modal-dialog -->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="panel box" style="margin-bottom: 5px;">
							<div class="box-header with-border">
								<h4 class="box-title">
                      <a class="text-success" data-toggle="collapse" data-parent="#accordion" href="#collapseFore">
                       <dl class="dl-horizontal" style="margin-bottom:5px;">
                        <dt style="width:40px;">3. </dt>
                        <dd style="margin-left:40px;margin-bottom:5px;"> My following close family members are also employees of the Volkswagen Group China and/or one of the Volkswagen affiliated companies in China:
                        	<br> 本人的下列直系亲属也是大众汽车集团中国公司和/或在中国与大众汽车集团相关联企业的员工：
                        </dd>
                       </dl>
                      </a>
                    </h4>
							</div>
							<div id="collapseFore" :class="{'panel-collapse':true, 'collapse':true, 'in':(readonly&&form.tableFourList.length>0)}">
								<div class="box-body">
									<div class="row">
										<div class="col-md-12">
											<p v-if="!readonly">
												<a class="editor_create" data-toggle="modal" data-target="#modal-default-4-table4" href="#"><i class="fa fa-plus-circle"></i> Create new record 新增</a>
											</p>
											<table class="table table-bordered">
												<tbody>
													<tr>
														<th>Name of Relative 姓名</th>
														<th>Kinship 关系</th>
														<th>Company 公司</th>
														<th>Department 部门</th>
														<th>Position 职位</th>
														<th v-if="readonly">Detail 详细信息</th>
														<th v-else>Edit / Delete 修改/删除</th>
													</tr>
													<tr v-bind:key="index" v-for="(entry,index) in form.tableFourList">
														<td>
															<input type="text" class="form-control hidden" v-model="entry.id">
															<input type="text" class="form-control hidden" v-model="entry.ticketNo">
															<input type="text" class="form-control hidden" id="" placeholder="Name of Relative" v-model="entry.nameOfRelative">{{entry.nameOfRelative}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Kinship" v-model="entry.kinship">{{entry.kinship}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Company" v-model="entry.company">{{entry.company}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Department" v-model="entry.dept">{{entry.dept}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Position" v-model="entry.position">{{entry.position}}
														</td>
														<td v-if="readonly">
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table4" :data-index="index">Detail 详细信息</a>
														</td>
														<td v-else>
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table4" :data-index="index">Edit 修改</a>
															<a style="margin-left: 5px" href="javascript:void(0);" @click="removeItem4Table4(index)">Delete 删除</a>
														</td>
													</tr>
												</tbody>
											</table>

											<div class="modal fade in" id="modal-default-4-table4">
												<form data-vv-scope="modal-default-4-table4">
												<div class="modal-dialog" style="width: 800px;">
													<div class="modal-content">
														<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span></button>
															<h4 class="modal-title">Edit Details 编辑信息</h4>
														</div>
														<div class="modal-body">
															<div class="form-group overflow-auto">
																<input type="text" class="form-control hidden" id="table4-index">
																<input type="text" class="form-control hidden" id="table4-id">
																<input type="text" class="form-control hidden" id="table4-ticketNo">
																<label for="" class="col-sm-4 control-label">Name of Relative <br>姓名</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table4-nameOfRelative" name="table4-nameOfRelative" placeholder="Name of Relative" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table4.table4-nameOfRelative') }"
																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Kinship <br>关系</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table4-kinship" name="table4-kinship" placeholder="Kinship" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table4.table4-kinship') }"
																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Company <br>公司</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table4-company" name="table4-company" placeholder="Company" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table4.table4-company') }"
																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Department <br>部门</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table4-dept" name="table4-dept" placeholder="Department" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table4.table4-dept') }"

																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Position <br>职位</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table4-position" name="table4-position" placeholder="Position" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table4.table4-position') }"
																		>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
															<button v-if="!readonly" type="button" class="btn btn-primary" @click="validateAllFn(insertItem4Table4,'modal-default-4-table4')" id="table4-saveButton">Save changes</button>
														</div>
													</div>
													<!-- /.modal-content -->
												</div>
												</form>
												<!-- /.modal-dialog -->
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="panel box" style="margin-bottom: 5px;">
							<div class="box-header with-border">
								<h4 class="box-title">
                      <a class="text-success" data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                       <dl class="dl-horizontal" style="margin-bottom:5px;">
                        <dt style="width:40px;">4. </dt>
                        <dd style="margin-left:40px;margin-bottom:5px;"> My following close family members are Politically Exposed Persons (PEPs). A “PEP” is a person who has been entrusted with a prominent public function (e.g., head or senior official of a government authority or political party, head or senior executive of a state-owned enterprise or public institution), or any other individual known to be closely related to such a person:
                        	<br> 我的下列近亲属是从政人员。“从政人员”是指被委任为高级别公职的人员（如政府机关或政党领导或担任高级别职务的人员，以及国有企业或在公共机构中担任领导或高级别职务的人员）或其他与上述职务人员密切联系之人员：
                        </dd>
                       </dl>
                      </a>
                    </h4>
							</div>
							<div id="collapseFive" :class="{'panel-collapse':true, 'collapse':true, 'in':(readonly&&form.tableFiveList.length>0)}">
								<div class="box-body">
									<div class="row">
										<div class="col-md-12">
											<p v-if="!readonly">
												<a class="editor_create" data-toggle="modal" data-target="#modal-default-4-table5" href="#"><i class="fa fa-plus-circle"></i> Create new record 新增</a>
											</p>
											<table class="table table-bordered">
												<tbody>
													<tr>
														<th>Name of Relative 亲属姓名</th>
														<th>Kinship 亲属关系</th>
														<th>Entity 任职单位</th>
														<th>Department 任职部门</th>
														<th>Position 职务</th>
														<th v-if="readonly">Detail 详细信息</th>
														<th v-else>Edit / Delete 修改/删除</th>
													</tr>
													<tr v-bind:key="index" v-for="(entry,index) in form.tableFiveList">
														<td>
															<input type="text" class="form-control hidden" v-model="entry.id">
															<input type="text" class="form-control hidden" v-model="entry.ticketNo">
															<input type="text" class="form-control hidden" id="" placeholder="Name of Relative" v-model="entry.nameOfRelative">{{entry.nameOfRelative}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Kinship" v-model="entry.kinship">{{entry.kinship}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Entity" v-model="entry.company">{{entry.company}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Department" v-model="entry.dept">{{entry.dept}}
														</td>
														<td>
															<input type="text" class="form-control hidden" id="" placeholder="Position" v-model="entry.position">{{entry.position}}
														</td>
														<td v-if="readonly">
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table5" :data-index="index">Detail 详细信息</a>
														</td>
														<td v-else>
															<a href="#" data-toggle="modal" data-target="#modal-default-4-table5" :data-index="index">Edit 修改</a>
															<a style="margin-left: 5px" href="javascript:void(0);" @click="removeItem4Table5(index)">Delete 删除</a>
														</td>
													</tr>
												</tbody>
											</table>

											<div class="modal fade in" id="modal-default-4-table5">
												<form data-vv-scope="modal-default-4-table5">
												<div class="modal-dialog" style="width: 800px;">
													<div class="modal-content">
														<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span></button>
															<h4 class="modal-title">Edit Details 编辑信息</h4>
														</div>
														<div class="modal-body">
															<div class="form-group overflow-auto">
																<input type="text" class="form-control hidden" id="table5-index">
																<input type="text" class="form-control hidden" id="table5-id">
																<input type="text" class="form-control hidden" id="table5-ticketNo">
																<label for="" class="col-sm-4 control-label">Name of Relative <br>亲属姓名</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table5-nameOfRelative" name="table5-nameOfRelative" placeholder="Name of Relative" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table5.table5-nameOfRelative') }"
																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Kinship <br>亲属关系</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table5-kinship" name="table5-kinship" placeholder="Kinship" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table5.table5-kinship') }"
																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Entity <br>任职单位</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table5-company" name="table5-company" placeholder="Entity" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table5.table5-company') }"
																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Department <br>任职部门</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table5-dept" name="table5-dept" placeholder="Department" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table5.table5-dept') }"

																		>
																</div>
															</div>
															<div class="form-group overflow-auto">
																<label for="" class="col-sm-4 control-label">Position <br>职务</label>
																<div class="col-sm-8">
																	<input type="text" class="form-control" id="table5-position" name="table5-position" placeholder="Position" :readonly="readonly"
																		v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('modal-default-4-table5.table5-position') }"
																		>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
															<button v-if="!readonly" type="button" class="btn btn-primary" @click="validateAllFn(insertItem4Table5,'modal-default-4-table5')" id="table5-saveButton">Save changes</button>
														</div>
													</div>
													<!-- /.modal-content -->
												</div>
												</form>
												<!-- /.modal-dialog -->
											</div>
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="panel box" style="margin-bottom: 5px;">
							<div class="box-header with-border">
								<h4 class="box-title">
                      <a class="text-success" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                       <dl class="dl-horizontal" style="margin-bottom:5px;">
                        <dt style="width:40px;">5. </dt>
                        <dd style="margin-left:40px;margin-bottom:5px;"> Other circumstances which may create a potential conflict of interest (specifying: (i) the private or business relation which may be the cause or object of the conflict of interest, (ii) point in time as of which and scope in which the conflict of interest has arisen or may yet arise, and (iii) other relevant circumstances helpful for assessment of the conflict of interest:
                        	<br> 其他可能产生潜在利益冲突的情形（具体分为：（1）因私人或商业联系而导致或阻止利益冲突（2）在可能或已经产生利益冲突的范围或时间点内（3）其他有利于评估利益冲突的相关情形）：
                        </dd>
                       </dl>
                      </a>
                    </h4>
							</div>
							<div id="collapseThree" :class="{'panel-collapse':true, 'collapse':true, 'in':(readonly&&form.tableThreeList[0].desc)}">
								<div class="box-body" v-bind:key="index" v-for="(entry,index) in form.tableThreeList">
									<input type="text" class="form-control hidden" v-model="entry.id">
									<input type="text" class="form-control hidden" v-model="entry.ticketNo">
									<textarea-my type="text" name="desc" id="" other-rules="" placeholder="Other circumstances which may create a potential conflict of interest" v-model="entry.desc" :readonly="readonly"></textarea-my>
								</div>

							</div>
						</div>
					</div>
				</div>
				<!-- /.box-body -->
			</div>
			<!--Detail box end-->
			<div v-if="showCoiConfirm">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left">{{$t("CoiMain.interests.info.title")}}</h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>{{$t("CoiMain.interests.info.type")}}</label>
										<coi-report-type-check-box :cvals="form.reportedColType" disabledCon="true" v-on:callbackfunction="doAfterChecked"></coi-report-type-check-box>
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-6">
									<div class="form-group">
										<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>{{$t("CoiMain.interests.info.hasFact")}}</label>
										<div class="radio overflow-auto mar-0" :class="{'is-danger':errors.has('hsCoiFact')}">
											<label class="col-md-3">
                              <input name="hsCoiFact" type="radio" v-model="form.hsCoiFact" value="1" :disabled="readonlyForCoiConfirm"
                                v-validate="'required'" :class="{'is-danger':errors.has('hsCoiFact')}"> Yes 是
                            </label >
                            <label class="col-md-3">
                              <input name="hsCoiFact" type="radio" v-model="form.hsCoiFact" value="0" :disabled="readonlyForCoiConfirm"
                                v-validate="'required'" :class="{'is-danger':errors.has('hsCoiFact')}"> No 否
                            </label>
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label class="" for=""><i v-if="form.hsCoiFact!='1'" class="fa fa-asterisk text-red " style="font-size: 10px;"></i> {{$t("CoiMain.interests.info.comment")}}</label>
										<textarea-my v-if="form.hsCoiFact!='1'" rows="2" name="coiFactComment" placeholder="Comments 备注" v-model="form.coiFactComment" :readonly="readonlyForCoiConfirm" other-rules="required" ></textarea-my>
										<textarea-my v-else rows="2"  name="coiFactComment" placeholder="Comments 备注" v-model="form.coiFactComment" :readonly="readonlyForCoiConfirm"> </textarea-my>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left">{{$t("CoiMain.counter.title")}}</h3>
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-12">
									<div v-if="form.hsCoiFact == '1'" class="form-group">
										<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>{{$t("CoiMain.counter.type")}}</label>
										<div class="radio overflow-auto mar-0" :class="{'is-danger':errors.has('typeOfCountermeasure')}">
											<label class="col-md-3">
                              <input name="typeOfCountermeasure" type="radio" v-model="form.typeOfCountermeasure" value="No Further Action 无需处理" :disabled="readonlyForCoiConfirm"
                                v-validate="'required'" :class="{'is-danger':errors.has('typeOfCountermeasure')}"> No Further Action 无需处理
                            </label >
											<label class="col-md-3">
                              <input name="typeOfCountermeasure" type="radio" v-model="form.typeOfCountermeasure" value="Position Transfer 转岗" :disabled="readonlyForCoiConfirm"
                                v-validate="'required'" :class="{'is-danger':errors.has('typeOfCountermeasure')}"> Position Transfer 转岗
                            </label >
                            <label class="col-md-3">
                              <input name="typeOfCountermeasure" type="radio" v-model="form.typeOfCountermeasure" value="Task Re-assignment 工作任务重新分配" :disabled="readonlyForCoiConfirm">
                              Task Re-assignment 工作任务重新分配
                            </label>
											<label class="col-md-3">
                              <input name="typeOfCountermeasure" type="radio" v-model="form.typeOfCountermeasure" value="Others 其他" :disabled="readonlyForCoiConfirm">
                              Others 其他
                            </label>
										</div>
									</div>
									<div v-else class="form-group">
										<label for="">{{$t("CoiMain.counter.type")}}</label>
										<div class="radio overflow-auto mar-0">
											<label class="col-md-3">
                              <input name="radio3" type="radio" v-model="form.typeOfCountermeasure" value="No Further Action 无需处理" :disabled="readonlyForCoiConfirm">
                              No Further Action 无需处理
                            </label >
											<label class="col-md-3">
                              <input name="radio3" type="radio" v-model="form.typeOfCountermeasure" value="Position Transfer 转岗" :disabled="readonlyForCoiConfirm">
                              Position Transfer 转岗
                            </label >
                            <label class="col-md-3">
                              <input name="radio3" type="radio" v-model="form.typeOfCountermeasure" value="Task Re-assignment 工作任务重新分配" :disabled="readonlyForCoiConfirm">
                              Task Re-assignment 工作任务重新分配
                            </label>
											<label class="col-md-3">
                              <input name="radio3" type="radio" v-model="form.typeOfCountermeasure" value="Others 其他" :disabled="readonlyForCoiConfirm">
                              Others 其他
                            </label>
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label class="" for=""><i  v-if="form.hsCoiFact == '1'"  class="fa fa-asterisk text-red " style="font-size: 10px;"></i>{{$t("CoiMain.counter.comment")}}</label>
										<textarea-my v-if="form.hsCoiFact == '1'" rows="2" name="commentOfCountermeasure" placeholder="Comments 备注" v-model="form.commentOfCountermeasure" :readonly="readonlyForCoiConfirm" other-rules="required" ></textarea-my>
										<textarea-my v-else rows="2"  name="commentOfCountermeasure" placeholder="Comments 备注" v-model="form.commentOfCountermeasure" :readonly="readonlyForCoiConfirm"></textarea-my>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div class="checkbox mar-bot-20" v-if="!readonly">
				<label>
              <span class="help is-danger" v-show="errors.has('terms')">
                    {{$t("checkPolicyNotice")}}
              </span>
	            <input name="terms" type="checkbox" v-validate="'required'">When submitting the application, I have read and agreed to
	            	<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
	            	当提交此申请时，我已经理解并承诺遵守
	            	<a target="_blank" href="http://vwatjportal.ap.vwg/web/vwatj/policies">大众汽车自动变速器（天津）有限公司的相关政策。</a>
	          </label>
			</div>
			<comment v-if="processTaskId !=null&&processTaskKey!='hrbp'&&form.status != 9" v-on:input="setProcessCommentVal"></comment>
			<router-view v-if="'complicanceOfficer' == processTaskKey || 'applicatorConfirm' == processTaskKey" :form="form" entityId="CoiMain" vclass="btn-left" uri="/form/CoiMain/update" :validator="this.$validator" approveLabelName="Confirm" rejectLabelname="Decline"></router-view>
			<router-view v-else-if="'directSupervisor' == processTaskKey || 'hrbp3a' == processTaskKey" :form="form" entityId="CoiMain" vclass="btn-left" uri="/form/CoiMain/update" :validator="this.$validator" approveLabelName="Acknowledge" rejectLabelname="Reject"></router-view>
			<Confirmwithsave v-else-if="'hrbp' == processTaskKey&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Submit" uri="/CoiMain/save" ></Confirmwithsave>
			<router-view v-else :form="form" entityId="CoiMain" vclass="btn-left" uri="/form/CoiMain/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" ></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>
		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->
</template>
<script>
	import Vue from 'vue'
	import CoiReportTypeCheckBox from './CoiReportTypeCheckBox.vue'
	Vue.component("CoiReportTypeCheckBox", CoiReportTypeCheckBox);

	export default {
		name: 'CoiMain',
		methods: {

			beforesubmit:function(){
					if(this.form.coiDeclareOption=='3b'){
						//console.log(this.form);
						if(this.form.tableOneList.length==0&&this.form.tableTwoList.length==0&&this.form.tableFourList.length==0&&(this.form.tableThreeList[0].desc==null||this.form.tableThreeList[0].desc=='')){
							$.alert(" Please fill out at least one type of conflict.请至少填写一种冲突事实。");
							this.form.submitstatus=false;

						}else{
							this.form.submitstatus=true;
						}

					}

			},
			validateAllFn: function(callbackfunction, validateScope) {
				this.$validator.validateAll(validateScope).then(result => {
					if(result) {
						callbackfunction();
					} else {
						//$.alert("correct them");
					}
				});
			},
			insertItem4Table1: function() {
				var index = $("#table1-index").val();
				if(index) {
					for(var key in this.form.tableOneList[index]) {
						this.form.tableOneList[index][key] = $("#table1-" + key).val();
					}
				} else {
					// console.log(newItem);
					var newItem = {};
					for(var key in this.form.tableOne) {
						newItem[key] = $("#table1-" + key).val();
					}
					newItem['ticketNo'] = this.form.ticketNo;
					// console.log(newItem);
					this.form.tableOneList.push(newItem);
				}
				$('#modal-default-4-table1').modal('hide');
			},
			removeItem4Table1: function(index) {
				this.form.tableOneList.splice(index, 1);
			},
			insertItem4Table2: function() {
				var index = $("#table2-index").val();
				if(index) {
					for(var key in this.form.tableTwoList[index]) {
						this.form.tableTwoList[index][key] = $("#table2-" + key).val();
					}
				} else {
					var newItem = {};
					for(var key in this.form.tableTwo) {
						newItem[key] = $("#table2-" + key).val();
					}
					newItem['ticketNo'] = this.form.ticketNo;
					// console.log(newItem);
					this.form.tableTwoList.push(newItem);
				}
				$('#modal-default-4-table2').modal('hide');
				$('#modal-default-4-table2 :input[name!=\'table2-approvalType\']').val("");
			},
			removeItem4Table2: function(index) {
				this.form.tableTwoList.splice(index, 1);
			},
			insertItem4Table4: function() {
				var index = $("#table4-index").val();
				if(index) {
					for(var key in this.form.tableFourList[index]) {
						this.form.tableFourList[index][key] = $("#table4-" + key).val();
					}
				} else {
					var newItem = {};
					for(var key in this.form.tableFour) {
						newItem[key] = $("#table4-" + key).val();
					}
					newItem['ticketNo'] = this.form.ticketNo;
					this.form.tableFourList.push(newItem);
				}
				$('#modal-default-4-table4').modal('hide');
				$('#modal-default-4-table4 :input[name!=\'table4-approvalType\']').val("");
			},
			removeItem4Table4: function(index) {
				this.form.tableFourList.splice(index, 1);
			},
			insertItem4Table5: function() {
				var index = $("#table5-index").val();
				if(index) {
					for(var key in this.form.tableFiveList[index]) {
						this.form.tableFiveList[index][key] = $("#table5-" + key).val();
					}
				} else {
					var newItem = {};
					for(var key in this.form.tableFive) {
						newItem[key] = $("#table5-" + key).val();
					}
					newItem['ticketNo'] = this.form.ticketNo;
					this.form.tableFiveList.push(newItem);
				}
				$('#modal-default-4-table5').modal('hide');
				$('#modal-default-4-table5 :input[name!=\'table5-approvalType\']').val("");
			},
			removeItem4Table5: function(index) {
				this.form.tableFiveList.splice(index, 1);
			},

			doAfterChecked: function(data) {
				// console.log(data);
				this.form.reportedColType = data;
			},

			setProcessCommentVal: function(data) {
				// console.log(data);
				this.form.approval.approvalRemark = data;
			}
		},
		data() {
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id) {
				var url = "/form/CoiMain/get/" + id;
			} else {
				var url = "/form/CoiMain/create/";
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
			dm.form.submitstatus=true;
			return dm;
		},
		watch: {

		},
		mounted() {
			var _form = this.form;
			_form.processTaskKey = this.$route.query.taskKey;
			$('body').on('hidden.bs.modal', '#modal-default-4-table1', function(e) {
				// console.log("modal-default-4-table1-hidden");
				$('#modal-default-4-table1 :input[name!=\'table1-approvalType\']').val("");
			});
			$('body').on('shown.bs.modal', '#modal-default-4-table1', function(e) {
				// console.log("modal-default-4-table1-shown-edit");
				var button = $(e.relatedTarget);
				var index = button.data("index");
				// console.log(index);
				var modal = $(this);
				if(index || index === 0) {
					modal.find("#table1-index").val(index);
					for(var key in _form.tableOneList[index]) {
						// console.log(key);
						if(modal.find("#table1-" + key)) {
							modal.find("#table1-" + key).val(_form.tableOneList[index][key]);
						}
					}
					var temp=$("#table1-financialConnections").val();
					if(temp=='Other'){
						$("#table1-other").attr("disabled",false);
					}else{
						$("#table1-other").attr("disabled",true);
						$("#table1-other").val("");
					}
				}
				
				modal.find('#table1-formationDate').datepicker({
					format: 'yyyy-mm-dd',
					autoclose: true
				});
			});
			$('body').on('hidden.bs.modal', '#modal-default-4-table2', function(e) {
				$('#modal-default-4-table2 :input[name!=\'table2-approvalType\']').val("");
			});

			$('body').on('shown.bs.modal', '#modal-default-4-table2', function(e) {
				// console.log("modal-default-4-table2-shown");
				var button = $(e.relatedTarget);
				var index = button.data("index");
				var modal = $(this);
				if(index || index === 0) {
					modal.find("#table2-index").val(index);
					for(var key in _form.tableTwoList[index]) {
						if(modal.find("#table2-" + key)) {
							modal.find("#table2-" + key).val(_form.tableTwoList[index][key]);
						}
					}
					var temp=$("#table2-financialConnections").val();
					if(temp=='Other'){
						$("#table2-other").attr("disabled",false);
					}else{
						$("#table2-other").attr("disabled",true);
						$("#table2-other").val("");
					}
				}
				modal.find('#table2-formationDate').datepicker({
					format: 'yyyy-mm-dd',
					autoclose: true
				});
			});
			$('body').on('hidden.bs.modal', '#modal-default-4-table4', function(e) {
				$('#modal-default-4-table4 :input[name!=\'table4-approvalType\']').val("");
			});

			$('body').on('shown.bs.modal', '#modal-default-4-table4', function(e) {
				var button = $(e.relatedTarget);
				var index = button.data("index");
				var modal = $(this);
				if(index || index === 0) {
					modal.find("#table4-index").val(index);
					for(var key in _form.tableFourList[index]) {
						if(modal.find("#table4-" + key)) {
							modal.find("#table4-" + key).val(_form.tableFourList[index][key]);
						}
					}
				}
			});

			$('body').on('change','#table1-financialConnections',function(e){
				var temp=$("#table1-financialConnections").val();
				if(temp=='Other'){
					$("#table1-other").attr("disabled",false);
				}else{
					$("#table1-other").attr("disabled",true);
					$("#table1-other").val("");
				}
			});
			$('body').on('change','#table2-financialConnections',function(e){
				var temp=$("#table2-financialConnections").val();
				if(temp=='Other'){
					$("#table2-other").attr("disabled",false);
				}else{
					$("#table2-other").attr("disabled",true);
					$("#table2-other").val("");
				}
			});
			
			$('body').on('hidden.bs.modal', '#modal-default-4-table5', function(e) {
				$('#modal-default-4-table5 :input[name!=\'table5-approvalType\']').val("");
			});

			$('body').on('shown.bs.modal', '#modal-default-4-table5', function(e) {
				var button = $(e.relatedTarget);
				var index = button.data("index");
				var modal = $(this);
				if(index || index === 0) {
					modal.find("#table5-index").val(index);
					for(var key in _form.tableFourList[index]) {
						if(modal.find("#table5-" + key)) {
							modal.find("#table5-" + key).val(_form.tableFiveList[index][key]);
						}
					}
				}
			});
			$('body').on('click','#minusplusbtn',function(){
				//console.log("0000");
				if($("#minusplusbtn").hasClass("collapsed")){
					//console.log(111);
					$("#minusplusi").removeClass("fa-plus");
					$("#minusplusi").addClass("fa-minus");
				}else{
					//console.log(2222);
					$("#minusplusi").removeClass("fa-minus");
					$("#minusplusi").addClass("fa-plus");

				};
			});

			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form) => {
				this.form = form;
				_form=this.form;
			});
			// console.log("mounted");
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
					console.log(this.$route.path);
					return !((this.$route.query.taskKey == null && this.$route.path.indexOf("detail") < 0) || this.$route.query.taskKey == "applicatorSignature");
				}
			},
			ifaccordion:{
				get: function() {
					if(!this.readonly){
						return "accordion";
					}
					return "";
				}
			},
			showCoiConfirm: {
				get: function() {
					return((this.$route.path.indexOf("detail") > -1&&this.form.hsCoiFact) || this.$route.query.taskKey != null) &&
						this.form.coiDeclareOption == '3b';
				}
			},
			readonlyForCoiConfirm: {
				// 动态计算readonly的值
				get: function() {

					return this.$route.query.taskKey != "hrbp" || this.$route.path.indexOf("detail") > -1;
				}
			},
			hello: {
				get: function() {
					return "0,1,0,1";
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
	div.is-danger{
		border:solid red 1px;
	}
</style>

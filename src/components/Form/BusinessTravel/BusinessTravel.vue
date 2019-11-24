<template>
	<div>
		<section class="content-header">
			<h1>Business Travel Application</h1>
			<ol class="breadcrumb">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Disciplinary Supervisor</a>
				</li>
				<li>
					<a>3.Supervisor</a>
				</li>
				<li>
					<a>4.BU Head</a>
				</li>
				<li v-if="form.travelType=='2'||form.travelType=='4'">
					<a>5.Head of HR,CR&Admin</a>
				</li>
				<li v-if="((form.travelType=='2')&&(form.policyDeviation=='true'||form.policyDeviation))||form.travelType=='4'">
					<a>6.BoM</a>
				</li>
				<li v-if="((form.travelType=='1')&&(form.policyDeviation=='true'||form.policyDeviation))||form.travelType=='3'">
					<a>5.BoM</a>
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
					<h3 class="box-title pull-left"> Applicant Info. 申请人信息  </h3>
					<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox"  id="onbehalf" @click="onbehalfclick" > <strong>On Behalf </strong></label></div>
					<div v-if="!readonly" class="checkbox pull-left" style="margin: 0; margin-left: 20px;"><label><input type="checkbox" id="copyapp" @click="copyappclick"><strong>Copy an Existing Business Travel Application</strong></label></div>
					<button  class="btn btn-primary btn-sm pull-right" id="baseext-hide-show" >Hide</button>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
					<input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">
					<div class="box-body">
						<div class="row">
							<!--不选中的时候显示-->
							<form-group  other-rules="required" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<!--选中的时候显示-->
							<!--<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										<i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
										 {{$t("BusinessTravel.creatorStaffcode")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                        				</span>
									</div>
								</div>
							</div>-->
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
						</div>

						<div class="row base-ext">
							<form-group col="md-3" type="input" v-model="form.internalOrder" name="internalOrder" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.cnName" name="cnName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.directSupervisor" name="directSupervisor" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.buHead" name="buHead" readonly="readonly"></form-group>
						</div>

						<div class="row base-ext">
							<form-group col="md-3" type="input" v-model="form.idCard" name="idCard" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" v-model="form.dateOfBirth" name="dateOfBirth" readonly="readonly"></form-group>
							<form-group col="md-3" type="datepicker" v-model="form.expireDateOfIdCard" name="expireDateOfIdCard" :readonly="readonly"></form-group>
							<!--<div class="col-md-3">
								<div class="form-group">
									<label for="">Expire Date Of ID Card 身份证过期时间 </label>
									<div class="input-group date">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" v-model="form.expireDateOfIdCard" name="expireDateOfIdCard" placeholder="Expire Date Of ID Card 身份证过期时间" id="datepicker1" :readonly="readonly" :disabled="readonly">
									</div>
								</div>
							</div>-->
						</div>

						<div class="row base-ext">
							<form-group col="md-3" type="input" v-model="form.passport" name="passport" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" v-model="form.nationality" name="nationality" readonly="readonly"></form-group>
							<form-group col="md-3" type="datepicker" v-model="form.expireDateOfPassport" name="expireDateOfPassport" :readonly="readonly"></form-group>
							<!--<div class="col-md-3">
								<div class="form-group">
									<label for="">Expire Date Of Passport 护照过期时间  </label>
									<div class="input-group date">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" v-model="form.expireDateOfPassport" name="expireDateOfPassport" placeholder="Expire Date Of Passport 护照过期时间 " id="datepicker2" :readonly="readonly" :disabled="readonly">
									</div>
								</div>
							</div>-->
						</div>

					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left">  Cost Center 成本中心 </h3>
				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3" v-if="!readonly">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Cost Center 成本中心 </label>
									<div class="input-group ">
										<input type="text" id="costCenterCode" name="costCenterCode" v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('costCenterCode') }" v-model="form.costCenterCode" placeholder="Cost Center 成本中心" value="" readonly="readonly">
										<span class="input-group-btn" v-if="!readonly">
                          					<button type="button" class="btn btn-primary btn-flat" data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i></button>
                        				</span>
									</div>
								</div>
							</div>
							<form-group v-if="readonly" col="md-3" type="input" v-model="form.costCenterCode" name="costCenterCode" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" v-model="form.costCenterName" name="costCenterName" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" v-model="form.costCenterOwner" name="costCenterOwner" readonly="readonly"></form-group>

						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left"> Travel Information 出差信息 </h3>

				</div>
				<form role="form">
					<div class="box-body">
						<div class="row">
							<div class="col-md-12">
								<div style="overflow: auto;" :class="{'form-group':true,'is-danger': errors.has('travelType') }">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>  Travel Type 出差类型 </label>
									<!--	<span class="help is-danger" v-show="errors.has('travelType')">
									Please select a Type.
									请选择一个类型
								</span>-->
									<div class="radio mar-top-0">
										<label class="">
                          <input type="radio" name="travelType" :class="{'is-danger': errors.has('travelType') }" v-model="form.travelType" v-validate="'required'" value="1" :disabled="readonly">
                           Domestic Business Travel 国内出差
                        </label>
										<label class="mar-left-20">
                          <input type="radio" name="travelType" :class="{'is-danger': errors.has('travelType') }"  v-model="form.travelType" v-validate="'required'" value="2" :disabled="readonly">
                           Domestic Training 国内培训
                        </label>
										<label class="mar-left-20">
                          <input type="radio" name="travelType" :class="{'is-danger': errors.has('travelType') }"  v-model="form.travelType" v-validate="'required'" value="3" :disabled="readonly">
                           Overseas Business Travel 海外出差
                        </label>
										<label class="mar-left-20">
                          <input type="radio" name="travelType" :class="{'is-danger': errors.has('travelType') }"  v-model="form.travelType" v-validate="'required'"  value="4" :disabled="readonly">
                           Overseas Training  海外培训
                        </label>
									</div>
								</div>
							</div>
						</div>

						<div class="row">
							<!--<div class="col-md-3">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>  Travel Destination  目的地</label>
									<input type="text" class="form-control" placeholder="Travel Destination  目的地" value="" size="15" id="homecity_name" name="homecity_name" mod="address|notice" mod_address_source="hotel" mod_address_suggest="" mod_address_reference="cityid" />
									<input id="cityid" name="cityid" type="hidden" value="{$cityid}" />
								</div>
							</div>-->
							<!--<form-group col="md-3" type="select2" other-rules="required" uri="/city/listcitys" :readonly="readonly" v-model="form.travelDestination" name="travelDestination"></form-group>-->
							<form-group col="md-6" type="select2" other-rules="required" uri="/city/listcitys" :readonly="readonly" v-model="form.travelDestinationArray" multiple="multiple" maxlength="5" name="travelDestinationArray"></form-group>
							<form-group col="md-3" type="daterangepicker" other-rules="required" v-model="form.travelPeriod" name="travelPeriod" :readonly="readonly"></form-group>
							<!--<div class="col-md-3">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Business Travel Period 出差时段</label>
									<div class="input-group">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" id="reservation" v-model="form.travelPeriod" name="travelPeriod" placeholder="Business Travel Period 出差时段">
									</div>
								</div>
							</div>-->

						</div>

						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>  Travel Purpose and Detailed Description 出差目的和详细信息</label> <span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> 2000 Characters Max (最多2000个字)</span>

									<textarea v-validate="'required|max:2000'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('travelDetaile') }" rows="2" :readonly="readonly" v-model="form.travelDetaile" name="travelDetaile" id="travelDetaile" placeholder=" Please specify detailed purpose of the trip, including date/time, visited company, locations and business purpose. 请简述出差的时间，访问公司，地点以及出差原因."></textarea>

								</div>
							</div>
							<!--<form-group other-rules="required" type="textarea" :readonly="readonly" v-model="form.travelDetaile" name="travelDetaile"></form-group>-->
						</div>

					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">

					<label>
							<h3 class="box-title">
                  				<input :disabled="readonly&&(form.policyDeviation=='true')" id="policyDeviation"  value="true"  type="checkbox" name="policyDeviation" v-model="form.policyDeviation" ><!--{{$t("BusinessTravel.policyDeviation")}}-->
							Policy Deviation 政策偏差   (Please complete in English / Chinese German 请用英文/中德文填写)</h3>
						</label>
					<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Choose “Policy Deviation” need BoM's approval. 选择此项需要BoM的审批。 </span>
				</div>
				<div class="box-body" v-if="(!readonly&&(form.policyDeviation=='true'||form.policyDeviation==true))||(readonly&&(form.policyDeviation=='true'||form.policyDeviation==true)&&form.policyDeviationContent)" >
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<textarea-my
									 rows="2" placeholder="Please state the reason for policy deviation. 请陈述原因。" :readonly="readonly&&(form.policyDeviation=='true')" v-model="form.policyDeviationContent" name="policyDeviationContent" id="policyDeviationContent"></textarea-my>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Itinerary 行程</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group">
							<div class="col-md-12">
								<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
									<tbody>
										<tr>
											<th width="40px"> No.</th>
											<th width="20%">Transportation 交通方式 </th>
											<th width="35%">Duration 期间 </th>
											<th width="17%">From 出发地</th>
											<th width="18%">To 目的地</th>
											<th width="10%" v-if="!readonly" class="text-center">
												<a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
											</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form.itineraryList">
											<td><div class="form-group" v-if="index<9" > 0{{ index+ 1}}</div><div class="form-group" v-if="index>=9" > {{ index+ 1}}</div></td>
											<td>
												<input type="hidden" class="form-control" id="" v-model="entry.id">
												<!--<select class="form-control">
													<option value="1">Air</option>
													<option value="2">Taxi</option>
													<option value="3">Rail</option>
													<option value="4">Car Rental</option>
													<option value="5">Other</option>

												</select>-->
												<!--<div v-if="readonly">
													<input type="hidden" v-model="entry.transportation" :name="'transportation'+index" class="form-control input">
													<input type="text" readonly v-search="entry.transportation" uri="/dict/list?groupName=travelTransportation" class="form-control input">
												</div>
												<select v-if="!readonly" :class="{'form-control':true,'input':true,'input-sm': true, 'is-danger': errors.has('transportation'+index) }" v-validate="'required'" v-select uri="/dict/list?groupName=travelTransportation"
													v-model="entry.transportation" :id="'transportation'+index" :name="'transportation'+index" :index="index" >

												</select>-->
												<form-group other-rules="required" type="select" uri="/dict/list?groupName=travelTransportation" haslable="false" :readonly="readonly" v-model="entry.transportation" :name="'transportation'+index"></form-group>
											</td>
											<td>
												<!--<div class="input-group">
													<div class="input-group-addon">
														<i class="fa fa-clock-o"></i>
													</div>
													<input type="text" class="form-control pull-right" id="reservationtime">
												</div>-->
												<form-group type="daterangepicker" other-rules="required" v-model="entry.duration" showTime="true" :name="'duration'+index" haslable="false" :readonly="readonly"></form-group>

											</td>
											<td>
												<!--<input type="text" class="form-control input-sm" placeholder="Departure Place 出发地" value="" size="15" id="homecity_name1" name="homecity_name" mod="address|notice" mod_address_source="hotel" mod_address_suggest="" mod_address_reference="cityid" />
												<input id="cityid" name="cityid" type="hidden" value="{$cityid}" />-->
												<form-group type="select2" other-rules="required" uri="/city/listcitys" haslable="false" :readonly="readonly" v-model="entry.departurePlace" :name="'departurePlace'+index"></form-group>
												<!--<form-group type="citypicker" leftorright="right" other-rules="required" uri="/city/listcitys" haslable="false" :readonly="readonly" v-model="entry.departurePlace" :name="'departurePlace'+index"></form-group>
-->
											</td>
											<td>
												<!--<input type="text" class="form-control input-sm" placeholder="Travel Destination 目的地" value="" size="15" id="homecity_name2" name="homecity_name" mod="address|notice" mod_address_source="hotel" mod_address_suggest="" mod_address_reference="cityid" />
												<input id="cityid" name="cityid" type="hidden" value="{$cityid}" />-->
												<form-group type="select2" other-rules="required" uri="/city/listcitys" haslable="false" :readonly="readonly" v-model="entry.travelDestination" :name="'travelDestination'+index"></form-group>
												<!--<form-group type="citypicker" leftorright="right" other-rules="required" uri="/city/listcitys" haslable="false" :readonly="readonly" v-model="entry.travelDestination" :name="'travelDestination'+index"></form-group>
-->
											</td>
											<td v-if="!readonly" class="text-center" style="vertical-align: middle;">
												<div class="form-group" >
													<a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
												</div>
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
					<h3 class="box-title">Hotel 酒店</h3>
					<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> The actual agreement hotel and price will be changed, subject to the agent. 实际协议酒店及价格会有变动，以代理为准。</span>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group">
							<div class="col-md-12">
								<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
									<tbody>
										<tr>
											<th width="40px"> No.</th>
											<th width="20%">City 城市</th>
											<th width="35%">Hotel Name 酒店名称</th>
											<th width="35%">Occupancy period 入住时段</th>
											<th width="10%" v-if="!readonly" class="text-center">
												<a href="javascript:;" @click="insertHotelRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
											</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form.hotelList">
											<td><div class="form-group" v-if="index<9" > 0{{ index+ 1}}</div><div class="form-group" v-if="index>=9" > {{ index+ 1}}</div></td>
											<td>
												<!--<input type="text" class="form-control input-sm" placeholder="City 城市" value="" size="15" id="homecity_name5" name="homecity_name" mod="address|notice" mod_address_source="hotel" mod_address_suggest="" mod_address_reference="cityid" />
										<input id="cityid" name="cityid" type="hidden" value="{$cityid}" />-->
												<form-group type="select2" other-rules="" uri="/city/listcitys" haslable="false" :readonly="readonly" v-model="entry.cityName" :name="'cityName'+index" v-on:change="citychange(index)"></form-group>

													<!--<form-group type="citypicker" other-rules="required" uri="/city/listcitys" haslable="false" :readonly="readonly" v-model="entry.cityName" :name="'cityName'+index"></form-group>
-->
											</td>
											<td>
												<!--<select class="form-control">
											<option>Hotel Name 酒店名称</option>
										</select>-->
												<form-group v-if="entry.cityName"  type="select2" other-rules="" :uri="'/hotelinfo/listforselect?cityName='+entry.cityName" haslable="false" :readonly="readonly" v-model="entry.hotelName" :name="'hotelNametrue'+index"></form-group>
												<form-group v-if="!entry.cityName" type="select" other-rules="" :uri="'/hotelinfo/listforselect?cityName=null'" haslable="false" :readonly="readonly" v-model="entry.hotelName" :name="'hotelNamefalse'+index"></form-group>

											</td>
											<td>
												<!--<div class="input-group">
											<div class="input-group-addon">
												<i class="fa fa-calendar"></i>
											</div>
											<input type="text" class="form-control pull-right" id="reservation2" placeholder="">
										</div>-->
												<form-group type="daterangepicker" other-rules="required" v-model="entry.occupancyPeriod" :name="'occupancyPeriod'+index" haslable="false" :readonly="readonly"></form-group>
											</td>
											<td v-if="!readonly" class="text-center" style="vertical-align: middle;">
												<div class="form-group" >
													<a href="javascript:;" @click="deleteHotelRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
												</div>
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
				<div class="box-header with-border" v-if="!readonly||(readonly&&form.specialRequirement)">
					<h3 class="box-title" v-if="!readonly||(readonly&&form.specialRequirement)">Special Requirement 特殊要求 </h3>
					<!--<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> 300 Characters Max (最多300个字)</span>-->
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<textarea-my v-if="!readonly||(readonly&&form.specialRequirement)" rows="3" placeholder="Please state the special requirement regarding  flight number or train number /luggage(2 PC or more) /food preference(vegetarian or Muslim) / seat preference (window or aisle) / children / accommodation etc. 请列出有关飞机航班号/火车车次，行李（两件行李或更多），餐饮喜好（素食或清真），座位偏好（靠窗或走道），儿童信息，住宿等的特殊要求。" :readonly="readonly" v-model="form.specialRequirement" name="specialRequirement" id="specialRequirement"></textarea-my>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i>  Please upload approved Training Application Form for training and/or Business Travel Agenda for overseas travel. 请上传培训申请单或者国外出差日程表。</span>
							<upload2 :readonly="readonly" v-model="form.attachmentIds" buttonText="Upload 上传" :attachments="form.attachments" multi="false" :required="ifrequired"></upload2>
						</div>
					</div>
				</div>
			</div>

			<div class="checkbox mar-bot-20" v-if="!readonly">
				<label>
                	<span class="help is-danger" v-show="errors.has('terms')">
									{{$t("checkPolicyNotice")}}
								</span>
                  <input  name="terms" type="checkbox" v-validate="'required'">When submitting the application, I have read and agreed to
                  	<a href="http://vwatdportal.ap.vwg/upload/2016051110530115628.6_Business%20Travel%20Policy_20150626"
                  	 target="_blank" >relevant policies of Volkswagen Automatic Transmission Tianjin. </a> 当提交此申请时，我已经理解并承诺遵守
                  	 <a href="http://vwatdportal.ap.vwg/upload/2016051110530115628.6_Business%20Travel%20Policy_20150626">大众汽车自动变速器（天津）有限公司的相关政策。</a>
                </label>
			</div>
			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>
			<router-view :form="form" entityId="BusinessTravel" vclass="btn-left" uri="/form/BusinessTravel/update" :validator="this.$validator"></router-view>
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
											<th class="text-center">Select</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>301000001</td>
											<td>EHS</td>
											<td>yong.ang@atd.volkswagen.com.cn</td>
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
		<!-- /.modal -->
		<div class="modal fade" id="modal-default3">
			<div class="modal-dialog" style="width: 1100px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title"> Choose a Travel Application 选择一个出差申请单 </h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-sm-12">
								<div class="text-muted well well-sm no-shadow mar-bot-10 ">
									<div class="row">
										<div class="form-group col-md-3">
											<label for="">Ticket No 单号</label>
											<input type="email" class="form-control" id="ticketNoSearch" placeholder="Ticket No 单号">
										</div>

										<div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
											<button type="submit" class="btn btn-primary" title="选择" @click="drawApplication();"><i class="fa fa-fw fa-search"></i> Search</button>
										</div>
									</div>

								</div>
								<table class="table table-bordered table-hover" id="example3">

									<thead>
										<tr role="row">
											<th style="width: 120px;">Ticket No. 单号</th>
											<th style="width: 180px;">Application Date 申请日期</th>
											<th style="width: 240px;">Travel Type 出差类型</th>
											<th>Destination 目的地</th>
											<th style="width: 220px;">Business Travel Period 出差时段</th>
											<th class="text-center">Select</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>301000001</td>
											<td>09/28/2017</td>
											<td> Domestic Business Travel 国内出差</td>
											<td>Beijing 北京</td>
											<td>09/28/2017 - 09/28/2017</td>
											<td class="text-center">
												<a href="#"><i class="fa fa-check"></i></a>
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
		<!-- /.modal -->
		<!-- /.modal -->
				<div class="modal fade" id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Choose User</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<!-- Main content -->
						<section class="content" style="margin:0px;padding:0px;">
							<!-- Main row -->
							<div class="row" style="width:margin:0px;padding:0px;">
								<!-- Left col -->
								<div class="col-md-12" style="margin:0px;padding:0px;">
									<!-- table 2 start-->
									<div class="box box-primary1" style="margin:0px;padding:0px;">

										<!-- /.box-header -->
										<div class="box-body">
											<div id="task_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
												<div class="row">
													<div class="col-sm-6">
													</div>
													<div class="col-sm-6">
													</div>
												</div>
												<div class="row">
													<div class="col-sm-12">
														<form role="form-horizontal" style="background-color: #F1F5F8">
															<div class="box-body">
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class=" control-label pad-top-7">
                                                Staff Code
                                            </label>
																	<div>
																		<input type="text" id="Staffcode" class="form-control col-sm-4" style="width: 100%" placeholder="Staffcode">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class="control-label pad-top-7">
                                                EN Name
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="ENName" style="width: 100%" placeholder="ENName">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class="control-label pad-top-7">
                                                CN Name
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="CNName" style="width: 100%" placeholder="CNName">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class="control-label pad-top-7">
                                               Email
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="Email" style="width: 100%" placeholder="Email">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;" >
																	<button type="button" class="btn btn-primary btn-sm" @click="draw();" style="float:right;">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
																</div>
															</div>
														</form>
														<table id="person_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Staff Code</th>
																	<th>EN Name</th>
																	<th>CN Name</th>
																	<th>Email</th>
																	<th>AD Account</th>
																	<th>Select</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
										<!-- /.box-body -->
									</div>
									<!-- /.box -->
									<!-- table 2 end-->
								</div>
								<!-- /.col -->
							</div>
							<!-- /.row -->
						</section>
						<!-- /.content -->
					</div>
					<!--<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					</div>-->
				</div>
			</div>
		</div>
		<!-- /.modal -->
	</div>
</template>

<script>
	//import adminlte from "adminlte"
	//import bootstrap from "bootstrap"
	//import locale from "locale"
	//import moment from "moment"
	//import daterangepicker from "bootstrap-daterangepicker"

	export default {
		name: 'BusinessTravel',
		methods: {
			citychange:function(no){
				var temp=this.form.hotelList[no].cityName;
				this.form.hotelList[no].cityName=undefined;
				this.form.hotelList[no].hotelName=undefined;
				var tempthis=this;
				setTimeout(function(){
					tempthis.form.hotelList[no].cityName=temp;
				},50);

			},
			copyappclick:function(){
				var temp = $("#copyapp").is(':checked');
				if(temp){
					$('#modal-default3').modal({
						backdrop: false, //点击空白处不关闭对话框
						keyboard: false, //键盘关闭对话框
						toggle: true //弹出对话框
					});
				}
			},

			onbehalfclick: function() {

				var temp = $("#onbehalf").is(':checked');
				this.onbehalf = temp;
				if(!temp) {
					this.form.applicantUserId=this.tempcreatorUserId;

					this.form.creatorUserId = this.tempcreatorUserId;
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
				}else{
					$('#personModal').modal({
						backdrop: false, //点击空白处不关闭对话框
						keyboard: false, //键盘关闭对话框
						toggle: true //弹出对话框
					});
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
			doAfterSelectApplication: function(data) {
				this.form.creatorUserId = data.creatorUserId;
				this.form.creatorStaffcode = data.creatorStaffcode;
				this.form.creatorName = data.creatorName;
				this.form.creatorPhoneNum = data.creatorPhoneNum;
				this.form.creatorDept = data.creatorDept;
				this.form.creatorEmail = data.creatorEmail;
				this.form.buHead = data.buHead;
				this.form.dateOfBirth = data.dateOfBirth;
				this.form.directSupervisor = data.directSupervisor;
				this.form.cnName = data.cnName;
				this.form.nationality = data.nationality;
				this.form.internalOrder = data.internalOrder;
				this.form.idCard = data.idCard;
				this.form.passport = data.passport;
				this.form.expireDateOfIdCard = data.expireDateOfIdCard;
				this.form.expireDateOfPassport = data.expireDateOfPassport;

				this.form.costCenterCode = data.costCenterCode;
				this.form.costCenterName = data.costCenterName;
				this.form.costCenterOwner = data.costCenterOwner;
				this.form.travelDestinationArray = data.travelDestinationArray;
				this.form.travelType = data.travelType;
				this.form.travelDestination = data.travelDestination;
				this.form.travelPeriod = data.travelPeriod;
				this.form.travelDetaile = data.travelDetaile;
				this.form.specialRequirement = data.specialRequirement;

				this.form.itineraryList = data.itineraryList;
				this.form.hotelList = data.hotelList;

			},
			doAfterSelectCostCenter: function(data) {

				this.form.costCenterCode = data.costCenterCode;
				this.form.costCenterName = data.costCenterName;
				this.form.costCenterOwner = data.costCenterOwner;

			},
			insertItineraryRows: function() {
				var newItem = {};
				for(var key in this.form.itineraryList[0]) {
					newItem[key] = "";
				}
				this.form.itineraryList.push(newItem);
			},
			//表格行删除调用方法
			deleteItineraryRows: function(rowId) {
				if(this.form.itineraryList.length > 1) {
					this.form.itineraryList.splice(rowId, 1);
				} else {
					$.alert("At least one complete record in “Itinerary” is needed. 至少需要填写一条完整的行程记录。");
				}
			},
			insertHotelRows: function() {
				var newItem = {};
				for(var key in this.form.hotelList[0]) {
					newItem[key] = "";
				}
				this.form.hotelList.push(newItem);
			},
			//表格行删除调用方法
			deleteHotelRows: function(rowId) {
				/*if(this.form.hotelList.length > 1) {
					this.form.hotelList.splice(rowId, 1);
				} else {
					$.alert("At least one complete record in “Hotel” is needed. 至少需要填写一条完整的酒店记录。");
				}*/
				this.form.hotelList.splice(rowId, 1);
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
			drawApplication: function() {
				$("#example3").DataTable().draw();
			},
			retrieveApplicationData: function(url, aoData, fnCallback) {
				var ticketNoSearch = $("#ticketNoSearch").val();

				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"ticketNo": ticketNoSearch
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
			closemodal: function() {
		        $("#Staffcode").val("");
		        $("#ENName").val("");
		        $("#CNName").val("");
		        $("#Email").val("");

		        $("#person_table").DataTable().draw();
			},
			draw: function() {
				$("#person_table").DataTable().draw();
			},
			retrieveData: function(url, aoData, fnCallback) {
				var staffcode = $("#Staffcode").val();
				var enname = $("#ENName").val();
				var cnname = $("#CNName").val();
				var email = $("#Email").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffCode": staffcode,
						"printENName": enname,
						"printCNName": cnname,
						"email": email
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
				var url = "/form/BusinessTravel/get/" + id;
			} else {
				var url = "/form/BusinessTravel/create/";
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
			dm.tempcreatorUserId = dm.form.creatorUserId;
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


			return dm;
		},
		watch: {

		},
		mounted() {

			var _this = this;

			var tableCostCenter = $("#example2").DataTable({
				"fnServerData": _this.retrievecostcenterData,
				"sAjaxSource": Config.getBaseURL() + "/businesstravel/listcostcenter",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [3]
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
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始

					$('td:eq(3)', row).html('<div style="width:100%;text-align:center;"><a href="javascript:;" class="opt-select" ><i class="fa fa-check"></i></a></div>');

					return row;
				}
			});

			$('#example2 tbody').on('click', '.opt-select', function() {
				var row = $(this).parents("tr");
				var data = tableCostCenter.row(row).data();
				_this.doAfterSelectCostCenter(data);
				$("#modal-default").modal('hide');

			});

			var tableApplication = $("#example3").DataTable({
				"fnServerData": _this.retrieveApplicationData,
				"sAjaxSource": Config.getBaseURL() + "/businesstravel/listapplicationforselect",
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
						data: "ticketNo"
					},
					{
						data: "createDate"
					},
					{
						data: "travelTypeValue"
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
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					function formateDate(isostr) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
						var parts = isostr.match(/\d+/g);
						return parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4];
					}

					$('td:eq(1)', row).html(formateDate(data.createDate));
					$('td:eq(5)', row).html('<div style="width:100%;text-align:center;"><a href="javascript:;" class="opt-select" ><i class="fa fa-check"></i></a></div>');

					return row;
				}
			});

			$('#example3 tbody').on('click', '.opt-select', function() {
				var row = $(this).parents("tr");
				var data = tableApplication.row(row).data();
				_this.doAfterSelectApplication(data);
				$("#modal-default3").modal('hide');

			});
			var hideorshow="0";
			$('body').on('click', '#baseext-hide-show', function() {
				if(hideorshow=="0"){
					$(".base-ext").hide();
					$("#baseext-hide-show").text("More");
					hideorshow="1";
				}else{
					$(".base-ext").show();
					$("#baseext-hide-show").text("Hide");
					hideorshow="0";
				}
			});
			$('#baseext-hide-show').trigger('click');
			if(_this.form.policyDeviation == 'true') {
				$("#policyDeviation").prop("checked", true);
			} else {
				_this.form.policyDeviation = null;
				$("#policyDeviation").prop("checked", false);
			}

			var queryData = this.retrieveData;
			var doAfterSelectOtherPerson = this.doAfterSelectOtherPerson;
			var draw = this.draw;
			var table = $("#person_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL() + "/chooseuserinfo/list",
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
						data: "staffCode"
					},
					{
						data: "printENName"
					},
					{
						data: "printCNName"
					},
					{
						data: "email"
					},
					{
						data: "screenName"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					$('td:eq(5)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

					return row;
				}
			});
			var router = this.$router;

			$('#person_table tbody').on('click', '.task-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				doAfterSelectOtherPerson(data);
				//router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});

			});

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

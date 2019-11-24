<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Company Car Application Form</h1>
      <ol class="breadcrumb">
       <li><a >1.Applicant</a></li>
        <li><a >2.HRBP</a></li>
        <li><a >3.Applicant</a></li>
        <li><a >4.Admin Fleet Manager</a></li>
        <li><a >5.Head of Administration</a></li>
     </ol>
     <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
        <strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>

		  </span>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">
        <!--  申请类别-->
         <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title"> Company Car Type 公司汽车类型</h3>
          </div>
          <form role="form" class="ng-pristine ng-valid">


            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="radio" style="margin-bottom: 5px; margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" name="type" v-model="form.type" value="1" v-bind:disabled="!readonlyForCc" @change="drawcostcenter">
										First Company Car&nbsp;第一辆公司汽车
									</label>
								</div>
                  </div>
                <div class="col-md-3">

                  <div class="radio" style="margin-bottom: 5px; margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio"  name="type" v-model="form.type" value="2" v-bind:disabled="!readonlyForCc" @change="drawcostcenter">
										Second Company Car &nbsp;第二辆公司汽车
									</label>
								</div>


                </div>
              </div>
            </div>
          </form>
        </div>




      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Employee Information&nbsp;员工信息</h3>
          <!-- <button type="button" class="btn btn-box-tool btn-sm pull-right" id="baseext-hide-show" > Hide</button> -->
          <button type="button" class="btn btn-primary btn-sm pull-right" data-toggle="collapse" id="baseext-hide-show" href="#collapseZerowp"><i class="fa fa-plus" id="minusplusiwp"></i></button>
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
              <form-group col="md-3" type="input"  v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
              <form-group col="md-3" type="input"  v-model="form.creatorPhoneNum" name="creatorPhoneNum" readonly="readonly"></form-group>
            </div>
           <div class="row base-ext">
							<form-group col="md-3" type="input" v-model="form.contractType" name="contractType" readonly="readonly"></form-group>
							<form-group col="md-3" type="input"  v-model="form.costCente" name="costCente" readonly="readonly"></form-group>
							<form-group col="md-3" type="input"  v-model="form.creatorEmail" name="creatorEmail" readonly="readonly"></form-group>
						 <form-group col="md-3" type="input"  other-rules="max:300" v-model="form.mobile" name="mobile" :readonly="!readonlyForCc"></form-group>
            </div>

						<!-- <div class="row base-ext">
							<form-group col="md-3" type="input" v-model="form.childrenNumber" name="childrenNumber" :readonly="!readonlyForHrbp"></form-group>

          </div> -->
          </div>
        </form>
      </div>
      <!-- Driving License Information starts-->
      <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Driving License Information&nbsp;驾驶证信息</h3>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">
              <div class="col-md-12">

                <div class="form-group">

                  <div class="radio mar-top-0">
                    <label class="mar-left-40" style="font-weight:bold;">
                      <input type="radio" name="optionsRadios"  value="1" v-model="form.drivingLicenseFlag" :disabled="!readonlyForCc" @click="query(1)">
                      Valid Chinese Driving License&nbsp;有效的中国驾驶证 &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    </label>
                    <label class="mar-left-40" style="font-weight:bold;">
                      <input type="radio" name="optionsRadios"    value="2" v-model="form.drivingLicenseFlag"  :disabled="!readonlyForCc" @click="query(2)">
                     Private Driver&nbsp;私人司机&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    </label>
                    <label class="mar-left-40" style="font-weight:bold;">
                      <input type="radio" name="optionsRadios"  value="3" v-model="form.drivingLicenseFlag" :disabled="!readonlyForCc" @click="query(3)">
                      Chinese Driving License not yet obtained&nbsp;暂未获得中国驾驶证
                    </label>


                  </div>
                </div>
              </div>

            </div>
            <br/>
            <div class="row" v-if="form.drivingLicenseFlag==1">
              <form-group other-rules="required|max:300" col="md-3" type="input" v-model="form.drivingLicenseNumber" name="drivingLicenseNumber" :readonly="!readonlyForCc"></form-group>
              <div class="col-md-6">
                <div class="form-group">
                  <label for=""> &nbsp;  </label>
                  <p><span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;Please upload driver license into the attachment.&nbsp;请在附件中上传驾驶证。</span></p>
                </div>
              </div>
            </div>
            <div class="row" v-if="form.drivingLicenseFlag==2">
              <form-group other-rules="required|max:300" col="md-3" type="input" v-model="form.drivingLicenseName" name="drivingLicenseName" :readonly="!readonlyForCc"></form-group>
              <form-group other-rules="required|max:300" col="md-3" type="input" v-model="form.drivingLicenseNumber" name="drivingLicenseNumber" :readonly="!readonlyForCc"></form-group>
              <div class="col-md-6">
                <div class="form-group">
                  <label for=""> &nbsp;  </label>
                  <p><span class="text-muted" tyle="font-size: 15px;"><i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;Please upload private driver's ID and driver license into the attachment.&nbsp;请在附件中上传司机驾驶证。</span></p>
                </div>
              </div>
            </div>
            <div class="row" v-if="form.drivingLicenseFlag==3">
              <form-group col="md-3" other-rules="required|max:75"  type="datepicker" v-model="form.drivingLicenseDate" name="drivingLicenseDate" :readonly="!readonlyForCc" dateformate="yyyy-mm-dd"></form-group>
          </div>
            </div>
          </form>
        </div>

<!-- Driving License Information end -->

<!-- Current Car Information starts-->
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Current Car Information&nbsp;目前正在使用的车辆信息&nbsp;(only in case of replacement&nbsp;只适用于更换)</h3>
          &nbsp;&nbsp;<label><input type="checkbox"  id="onboard" v-model="form.onboard" :disabled="!readonlyForCc"></label>

      </div>
        <div class="box-body" v-if="form.onboard">
          <div class="row">
            <form-group col="md-3" other-rules="required|max:300"  type="input" v-model="form.currentCarModel" name="currentCarModel" :readonly="!readonlyForCc"></form-group>
            <form-group col="md-3" other-rules="required|max:300"  type="input"  v-model="form.currentCarColor" name="currentCarColor" :readonly="!readonlyForCc"></form-group>
            <form-group col="md-3" other-rules="required|max:300"  type="input"  v-model="form.currentCarPlateNumber" name="currentCarPlateNumber" :readonly="!readonlyForCc"></form-group>
            <form-group col="md-3" other-rules="max:75"  type="datepicker2" titleTips="Please check car registration license 请查看行驶证"   v-model="form.currentCarAcquiringDate" dateformate="yyyy-mm-dd" name="currentCarAcquiringDate" :readonly="!readonlyForCc"></form-group>
         <!-- <div class="col-md-3">
                  <div class="form-group">
                    <label>
                    <i class="fa fa-asterisk text-red" style="font-size: 10px;font-weight:bold;"></i>Acquiring Date 购买日期 (Please check Car registration license 请查看行驶本)</label>

                  </div>
                </div> -->
          </div>
        </div>
      </div>

      <!-- Current Car Information ends-->

      <!--Available Car Information starts  other-rules="required"-->
      <div class="box box-primary" v-if="readonlyForHrbpCarInfo">
        <div class="box-header with-border">
          <h3 class="box-title">Available Company Car Information 可选车辆信息</h3>
          <a type="button" target='_blank' :href="GL.getURL('/attachment/downloadimage/'+form.pdfId)"  style="padding-right: 0;" title="Company Car Ordering List 公司汽车列表" class="btn">
												<i class="fa fa-info-circle" style="font-size: 20px;"></i>
											</a>&nbsp;&nbsp;Company Car Ordering List 公司车辆列表
        </div>
        <div class="box-body" >
          <div class="row">
           <div class="col-md-3">
                  <div class="form-group">
                     <form-group :other-rules="itServicerules"  :readonly="!readonlyForHrbp"  type="select2" uri='/companyCar/getCatrgory' name="carCategory" v-model="form.carCategory" tags="false"></form-group>
                  </div>
                </div>
            <form-group col="md-3" :other-rules="itServicerules+'|numeric|max:2'" type="input" v-model="form.childrenNumber" name="childrenNumber" id="childrenNumber" :readonly="!readonlyForHrbp"></form-group>
          </div>

        </div>
      </div>

      <!-- Available Car Information ends-->

      <!-- Expected Company Car information starts-->
      <div class="box box-primary"  v-if="readonlyForApp || form.expectedCarModel">
        <div class="box-header with-border">
          <h3 class="box-title">Expected Company Car Information 想要购买的车辆信息</h3><a type="button" target='_blank' :href="GL.getURL('/attachment/downloadimage/'+form.pdfId)"  style="padding-right: 0;" title="Company Car Ordering List 公司汽车列表" class="btn">
												<i class="fa fa-info-circle" style="font-size: 20px;"></i>
											</a>&nbsp;&nbsp;Company Car Ordering List 公司车辆列表
          </div>
        <div class="box-body" >
          <div class="row">
            <div class="col-md-3" v-if="readonlyForApp">
                <div class="form-group">
                  <label for=""><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Car Model 车型</label>
                  <div class="input-group " data-toggle="modal" data-target="#modal-default">
                    <input type="text" id="expectedCarModel"   :class="{'form-control':true,'input': true, 'is-danger': errors.has('expectedCarModel') }" v-model="form.expectedCarModel" placeholder="Car Model" v-validate="'required'" name="expectedCarModel" readonly="readonly">
                    <span class="input-group-btn">
                          					<button type="button" class="btn btn-primary btn-flat" ><i class="fa fa-fw fa-search"></i></button>
                        				</span>
                  </div>
                </div>
              </div>
              <form-group  v-if="!readonlyForApp" col="md-3"  type="input"  v-model="form.expectedCarModel" name="expectedCarModel" readonly="readonly"></form-group>
              <form-group other-rules="max:300" col="md-3"  type="input"  v-model="form.expectedCarColor" name="expectedCarColor" :readonly="!readonlyForApp"></form-group>
              <div class="col-md-3">
                <div class="form-group">
                      <label>
                          {{$t("CompanyCar.expectedCarConfig")}}&nbsp;<i class="fa fa-fw fa-info-circle text-info" title="See company car ordering list 请查看公司汽车列表"></i>
                    </label>
                    <input type="text" other-rules="max:300" class="form-control input" v-model="form.expectedCarConfig" name="expectedCarConfig" :readonly="!readonlyForApp" >
                  </div>
                      <!-- /.input group -->
               </div>
              <!-- <form-group other-rules="max:75" col="md-3"  type="input"  v-model="form.expectedCarConfig" name="expectedCarConfig" :readonly="!readonlyForApp"></form-group> -->
              <form-group col="md-3"  type="select"  uri="/dict/list?groupName=likeNumber" :disabled="!readonlyForApp"  name="likeNumber" v-model="form.likeNumber" tags="false"></form-group>
          </div>
        </div>
         <div class="row">
           <div class="col-md-12">
            <p><span  tyle="font-size: 15px;">&nbsp;&nbsp;<i class="fa  fa-info-circle" ></i>&nbsp;&nbsp;Remark: The availability of certain car models and certain colors depends on market situation. For questions, please contact Admin Fleet Team.
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆型号及颜色将根据市场情况而进行调整。如有疑问，请联系行政车辆管理组。</span></p>
           </div>
         </div>
      </div>

      <!-- msrp ends-->

            <div class="box box-primary" v-if="readonlyForFlthead">
              <div class="box-header with-border">
                <h3 class="box-title">Price Information 价格信息</h3>
                <!-- <span class="mar-left-5 text-muted"> <i class="fa  fa-info-circle"></i> Currency: RMB 币种: 人民币.</span> -->
              </div>
              <div class="box-body" >
                <div class="row">

                    <form-group col="md-3" :other-rules="itServicerules+'|max:75'"  type="input"  v-model="form.mspr" name="msrp" :readonly="!readonlyForFlt"></form-group>
                    <form-group col="md-3"   type="input"  v-model="form.purchasingTax" name="purchasingTax" readonly="readonly"></form-group>

                </div>

              </div>
             </div>





      <!-- 上传附件starts  -->
        <div class="box box-primary" v-if="this.form.drivingLicenseFlag==3">
          <div class="box-header with-border">
          <h3 class="box-title"> Upload Related Material 上传相关材料</h3>
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
          <h3 class="box-title"> <i v-if="!readonly" class="fa fa-asterisk text-required"></i> Upload Related Material 上传相关材料</h3>
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
				 lableName="Approve" rejectLableName="Reject" uri="/companyCar/save" v-on:beforeapprovel="beforesubmit" ></Confirmwithsavereject>
      <Confirmwithsave v-else-if="readonlyForApp|| readonlyForHrbp" :form="form" :validator="this.$validator" lableName="Confirm" uri="/companyCar/save" v-on:beforeapprovel="beforesubmit" ></Confirmwithsave>
      <router-view v-else :form="form" entityId="CompanyCar" vclass="btn-left" uri="/form/CompanyCar/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforesubmit"></router-view>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>

    </section>
    <!--  model starts -->
      <div class="modal fade" id="modal-default">
      <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"> Select Car</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-muted well well-sm no-shadow mar-bot-10">
                  <div class="row">
                            <div class="form-group col-md-3">
                              <label for="">Car Category</label>
                             <form-group  type="select2" haslable="false" uri='/carManagement/getCatrgory' name="carCategorySearch" id="carCategorySearch" v-model="form.carCategorySearch" tags="false"></form-group>
                            </div>
                            <div class="form-group col-md-3" style="margin-bottom: 0;">
                              <label for=""> Car Brand</label>
                              <input type="text" class="form-control" id="brandSearch" placeholder="Car Brand">
                            </div>
                            <div class="form-group col-md-3" style="margin-bottom: 0;" v-show="false">
                              <label for=""> Car Model</label>
                              <input type="text" class="form-control" id="modelSearch" placeholder="Car Model">
                            </div>
                            <div class="form-group col-md-3" style="padding-top: 24px;margin-bottom: 0;">
                              <button type="submit" class="btn btn-primary" title="选择" @click="drawcostcenter()"><i class="fa fa-fw fa-search"></i> Search</button>
                            </div>
                          </div>

                </div>
                 <table class="table table-bordered table-hover" id="examplebt">

                  <thead>
                 <tr role="row">
                    <th>No.</th>
                    <th>Car Category</th>
                    <th>Car Brand</th>
                    <th>Car Model</th>
                    <th class="text-center">Select 选择</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>奥迪</td>
                    <td>A5</td>
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
    <!--  model starts -->

  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
  name: "CompanyCar",
  methods: {
    beforesubmit: function() {

    },

    //模态框查询功能
    drawcostcenter: function() {
      console.log(this.form.type);
      $("#examplebt")
        .DataTable()
        .draw();
    },
    //选择车辆之后
     doAfterSelectApplication: function(data) {
      this.form.expectedCarModel = data.carModel;
      this.form.modelId = data.id;
     $("#examplebt")
        .DataTable()
        .draw();
    },
     //车辆信息
    retrieveApplicationData: function(url, aoData, fnCallback) {
      var categorySearch = this.form.carCategorySearch;
      var brandSearch = $("#brandSearch").val();
        var modelSearch = $("#modelSearch").val();
      var carCategory = this.form.carCategory;
      var type = this.form.type;
      var childrenNumber = this.form.childrenNumber;

      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          categorySearch: categorySearch,
          brandSearch: brandSearch,
          modelSearch: modelSearch,
          type: type,
          childrenNumber: childrenNumber,
          carCategory:carCategory
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
    //驾照切换
    query:function(data){
      if(data==1){
        this.form.drivingLicenseNumber="";
        this.form.drivingLicenseName="";
        this.form.drivingLicenseDate="";

      }else if(data==2){
         this.form.drivingLicenseNumber="";
        this.form.drivingLicenseName="";
        this.form.drivingLicenseDate="";
      }else if(data==3){
           this.form.drivingLicenseNumber="";
           this.form.drivingLicenseName="";

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;    //js从0开始取
            var date = date.getDate();
            if(month<10){
              month = "0" + month;
            }
            if(date<10){
              date = "0" + date;
            }
            this.form.drivingLicenseDate=year+"-"+month+"-"+date;

      }


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
      var url = "/form/companyCar/get/" + id;
    } else {
      var url = "/form/companyCar/create/";
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

       //控制金额以千分号隔开
      $("body").on('blur', "input[name='msrp']", function() {
			var reg = /^\d+(?:\.\d{0,})?$/;
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						if(!(reg.test($(this).val()))) {
              $.alert('Only numbers and decimal point are allowed for application amount  对于申请金额只能输入数字和小数点');
							form.mspr = "";
							//$(this).val("");

						} else {
              if(form.mspr){

                var num1 = parseFloat($(this).val());
                var num2 = parseFloat(11.7);
                var rs=num1/num2;
                var tax = Math.round(rs*100)/100;
                form.mspr=formatCurrency($(this).val());
                 form.purchasingTax=formatCurrency(tax);
              }else if(form.mspr==null || form.mspr=="" || form.mspr==undefined){
                form.purchasingTax="";
              }

              console.log(formatCurrency($(this).val()));
               console.log(formatCurrency(tax));

						}
					}
				}
      });
    //将千分号隔开的数字转换成纯数字
      $("body").on('focus', "input[name='msrp']", function() {
				if($(this).attr("readonly")) {
					//只读不做操作
				} else {
					if($(this).val()) {
						var newVal=$(this).val().replace(new RegExp(",","gm"),"");
						form.mspr = newVal;
             console.log(form.mspr);

						$(this).val(newVal);
					}
				}
			});

      //Chilrden只能输入数字
    //   $("body").on("blur", "#childrenNumber", function() {

		// 			var cn= form.childrenNumber;
		// 	 if(isNaN(Number(cn))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
		// 			 $.alert(' Please enter the Numbers.请输入数字。');
		// 		form.childrenNumber="";
		// 			 return;
    //     }else{
    //       if(cn.length>2){
    //         $.alert('2 Characters Max. 最多只能填写2个字节。');
		// 		    form.childrenNumber="";
    //       }
    //     }

		// });
    //车辆信息
    var tableApplication = $("#examplebt").DataTable({
      fnServerData: _this.retrieveApplicationData,
      sAjaxSource:
        Config.getBaseURL() + "/companyCar/findModel",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [0, 1, 2, 3,4]
        }
      ],
      aaSorting: [[0, "desc"]], //给列表排序
      columns: [
        {
          data: "id"
        },
        {
          data: "carCategory"
        },
        {
          data: "carBrand"
        },
         {
          data: "carModel"
        },
        {
          data: null
        }
      ],
      fnRowCallback: function(row, data, index) {


         $('td:eq(0)', row).html(index+1);
        $("td:eq(4)", row).html(
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


    // $("body").on("blur", "#description", function() {
    //   //$("#descriptionss").on("blur", function() {
    //   var reg = /^[0-9]*$/;
    //   if ($(this).attr("readonly")) {
    //     //只读不做操作
    //   } else {
    //     if ($(this).val()) {
    //       var value = $(this).val();
    //       var newvalue = value.replace(/[^\x00-\xff]/g, "**");
    //       var length = newvalue.length;

    //       //当填写的字节数小于设置的字节数
    //       if (length * 1 <= 300 * 1) {
    //         return;
    //       }
    //       var limitDate = newvalue.substr(0, 300);
    //       var count = 0;
    //       var limitvalue = "";
    //       for (var i = 0; i < limitDate.length; i++) {
    //         var flat = limitDate.substr(i, 1);
    //         if (flat == "*") {
    //           count++;
    //         }
    //       }
    //       var size = 0;
    //       var istar = newvalue.substr(300 * 1 - 1, 1); //校验点是否为“×”

    //       //if 基点是×; 判断在基点内有×为偶数还是奇数
    //       if (count % 2 == 0) {
    //         //当为偶数时
    //         size = count / 2 + (300 * 1 - count);
    //         limitvalue = value.substr(0, size);
    //       } else {
    //         //当为奇数时
    //         size = (count - 1) / 2 + (300 * 1 - count);
    //         limitvalue = value.substr(0, size);
    //       }
    //       $.alert("300 Characters Max. 最多只能填写300个字节。");

    //       form.description = limitvalue;
    //     }
    //   }
    // });
    //申请人信息显示隐藏
    var hideorshow = "0";
    $("body").on("click", "#baseext-hide-show", function() {
      if (hideorshow == "0") {
        $(".base-ext").hide();
         $("#minusplusiwp").removeClass("fa-minus");
         $("#minusplusiwp").addClass("fa-plus");
       // $("#baseext-hide-show").text("More");
        hideorshow = "1";
      } else {
        $(".base-ext").show();
         $("#minusplusiwp").removeClass("fa-plus");
         $("#minusplusiwp").addClass("fa-minus");
       // $("#baseext-hide-show").text("Hide");
        hideorshow = "0";
      }
    });
    $("#baseext-hide-show").trigger("click");
    if (_this.form.policyDeviation == "true") {
      $("#policyDeviation").prop("checked", true);
    } else {
      _this.form.policyDeviation = null;
      $("#policyDeviation").prop("checked", false);
    }

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
      // 动态计算processTaskKey的值s
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
    readonlyForCc: {
      // 动态计算readonly的值
      get: function() {
        return (
          this.form.processInstanceId == null ||
            this.form.status == null ||
            this.form.status == 2 ||
            this.form.status == 9
            || ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf("applicant") != -1 && ((this.$route.path.indexOf('reAudit') > -1))))
        );
      }
    },
    readonlyForHrbp: {
      // 动态计算readonly的值
      get: function() {
        return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('hrbp') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
      }
    },
     readonlyForHrbpCarInfo: {
      // 动态计算readonly的值
      get: function() {
        return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('hrbp') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('detail') > -1))))||
                ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('applicant') != -1 && (this.$route.path.indexOf('detail') > -1)))
      }
    },
    readonlyForApp: {
      // 动态计算readonly的值
      get: function() {
        return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('applicant') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
      }
    },
     readonlyForFlt: {
      // 动态计算readonly的值
      get: function() {
        return ((this.$route.query.taskKey != null &&this.$route.query.taskKey.indexOf('adminFleetManager') != -1 && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1))))
      }
    },
     readonlyForFlthead: {
      // 动态计算readonly的值
      get: function() {
        return ((this.$route.query.taskKey != null &&(this.$route.query.taskKey.indexOf('headOfAdmin') != -1 || this.$route.query.taskKey.indexOf('adminFleetManager') != -1) && ((this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1||this.$route.path.indexOf('detail') > -1))))
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
      },

    },

  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
.content-wrapper {
  font-family: arial,simsun;
}
</style>

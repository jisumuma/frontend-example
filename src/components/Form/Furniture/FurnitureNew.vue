<template>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-header">
		<!-- Content Header (Page header) -->
		<section class="content-header ">
			<h1>Furniture Service Application</h1>
			<ol class="breadcrumb" style="background-color: transparent !important; font-size: 14px;" v-if="form.appType=='1'|| form.appType=='3'">
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Furniture Administrator</a>
				</li>
				<li>
					<a>3.BU Head</a>
				</li>
			</ol>
			<ol class="breadcrumb" style="background-color: transparent !important; font-size: 14px;" v-else>
				<li>
					<a>1.Applicant</a>
				</li>
				<li>
					<a>2.Furniture Administrator</a>
				</li>
			</ol>
		</section>

		<!-- Main content -->
		<section class="content container-fluid">
		<span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
			<strong>Application No. : {{form.ticketNo}}</strong>
			<strong style="margin-left: 20px;">Application Date: {{applicationTime}}</strong>
		</span>
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Application Type 申请类型</h3>
				</div>
				<form role="form" class="ng-pristine ng-valid">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="radio" style="margin-bottom: 5px; margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" @change="radioNoFun" checked="checked" name="appType" v-model="form.appType" value="1" v-bind:disabled="readonly">New Furniture Application
										<small>家具申请</small>
									</label>
								</div>

							</div>
							<div class="col-md-3">
								<div class="radio" style="margin-bottom: 5px; margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" @change="radioNoFun" data-toggle="modal" data-target="#modal-default" name="appType" v-model="form.appType" value="2" v-bind:disabled="readonly">Furniture Maintenance Application
										<small>家具维修申请</small>
									</label>
								</div>
							</div>

							<div class="col-md-3">
								<div class="radio" style="margin-bottom: 5px; margin-top: 5px;">
									<label style="margin-right: 10px;"><input type="radio" @change="radioNoFun" data-toggle="modal" data-target="#modal-default" name="appType" v-model="form.appType" value="3" v-bind:disabled="readonly">Furniture Layout Adjustment Application
										<small>家具布局变更申请</small>
									</label>
								</div>
							</div>

						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title pull-left">Applicant Info. 申请人信息</h3>
				</div>
				<form role="form">
					<input type="hidden" v-model="form.id" name="id">
					<div class="box-body">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<form-group type="input" id="creatorStaffcode" v-model="form.creatorStaffcode" name="Staff Code 员工号" readonly="readonly"></form-group>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<form-group type="input" id="creatorName" v-model="form.creatorName" name="Name 姓名" readonly="readonly"></form-group>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<form-group type="input" id="creatorPhoneNum" v-model="form.creatorPhoneNum" name="Telephone 电话 " readonly="readonly"></form-group>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<form-group type="input" id="creatorDept" v-model="form.creatorDept" name="Division / Dept. 部门  " readonly="readonly"></form-group>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<div class="box box-primary" v-if="form.appType !='3'">
				<div class="box-header with-border" v-if="form.appType=='1'">
					<h3 class="box-title">Furniture List 家具清单</h3>
				</div>
				<div class="box-header with-border" v-if="form.appType=='2'">
					<h3 class="box-title">Maintenance Item List 维修物品清单</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="form-group">
							<div class="col-md-12">
								<table class="table table-bordered mar-bot-0" id="furniture">
									<tbody>
										<tr>
											<th width="40px">No.</th>
											<th width="180px">
												<i class="fa fa-asterisk text-required"></i>
												Category 种类</th>
											<th width="180px">
												<i class="fa fa-asterisk text-required"></i>
												Product Description 产品描述</th>												
											<th>
												<i class="fa fa-asterisk text-required"></i> Model 型号</th>
											<th width="140px" class="text-center">Photo 照片</th>
											<th width="140px">
												<i class="fa fa-asterisk text-required"></i>
												Amount 数量</th>
											<th v-if="form.appType !='2'">
												<i class="fa fa-asterisk text-required"></i> Reason 原因
											</th>
											<th v-if="form.appType =='2'">
												<i class="fa fa-asterisk text-required"></i> Detailed Description 详细描述
											</th>
											<th class="text-center" v-if="!readonly">
												<a v-if="!readonly" href="javascript:;" @click="insertFurItemRows()">
													<i class="fa fa-plus-circle text-success" style="font-size: 20px"></i>
												</a>
											</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form.furnitureItemsList">
											<td>{{ index+ 1}}</td>
											<td><input type="hidden" class="form-control" id="" v-model="entry.id">
												<div v-if="readonly">
													<input type="text" readonly v-search="entry.itemCategory" uri="/furnitureType/listfurnituretype" class="form-control input">
												</div>
												<select v-if="!readonly" :class="{'form-control':true,'input':true, 'is-danger': errors.has('itemCategory'+index) }" v-validate="'required'" v-select uri="/furnitureType/listfurnituretype" v-model="entry.itemCategory" :id="'itemCategory'+index" :name="'itemCategory'+index" :index="index" @change="changeFurType(index)">
												</select>
											</td>
											<td style="width:20%">
												<div v-if="readonly" >
													<input type="text" readonly v-search="entry.productDescription" class="form-control input" @change="changeFurDesc(index)">
												</div>
												<select v-if="!readonly&& entry.itemCategory==''" :class="{'form-control':true,'input':true, 'is-danger': errors.has('productDescription'+index) }" v-validate="'required'" :uri="'/furnitureType/listfurnitureProduct/'+entry.itemCategory" v-model="entry.productDescription" :id="'productDescription'+index" :name="'productDescription'+index" :index="index" @change="changeFurDesc(index)">
													<option  value= "">--Please Select--</option>
												</select>
												<select  v-if="!readonly&&entry.itemCategory!=''" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('productDescription'+index) }" v-validate="'required'" :uri="'/furnitureType/listfurnitureProduct/'+entry.itemCategory" v-model="entry.productDescription" :id="'productDescription'+index" :name="'productDescription'+index" :index="index" @change="changeFurDesc(index)">
												</select>
											</td>
											<td id="itemmodeldis" >
												<div v-if="readonly && entry.itemCategory!='O'" >
													<input type="text" readonly v-search="entry.itemModelName" class="form-control input" @change="changeFurModel(index)">
												</div>
												<select  v-if="!readonly&& entry.itemCategory!='O'&& entry.itemCategory==''" :class="{'form-control':true,'input':true, 'is-danger': errors.has('itemModel'+index) }" v-validate="'required'" :uri="'/furnitureType/listfurnitureDesc/'+entry.itemCategory+'?furDesc='+entry.productDescription" v-model="entry.itemModel" :id="'itemModel'+index" :name="'itemModel'+index" :index="index" @change="changeFurModel(index)">
													<option value= "">--Please Select--</option>
												</select>
												<select  v-if="!readonly&& entry.itemCategory!='O'&&entry.itemCategory!=''" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('itemModel'+index) }" v-validate="'required'" :uri="'/furnitureType/listfurnitureDesc/'+entry.itemCategory+'?furDesc='+entry.productDescription" v-model="entry.itemModel" :id="'itemModel'+index" :name="'itemModel'+index" :index="index" @change="changeFurModel(index)">
												</select>
												<form-group v-if="entry.itemCategory=='O' && entry.productDescription" type="select2" :readonly="readonly" other-rules="required" :uri="'/furnitureType/listfurnitureDesc/O/?furDesc='+entry.productDescription" :id="'itemModel'+index" :name="'itemModel'+index" v-validate="'required'" :index="index" v-model="entry.itemModel"  @change="changeFurModel(index)"  ></form-group>
												<form-group v-if="entry.itemCategory=='O' && !entry.productDescription" type="select" :readonly="readonly" other-rules="required"  :uri="'/furnitureType/listfurnitureDesc/O/?furDesc= null'" :id="'itemModel'+index" :name="'itemModel'+index" v-validate="'required'" :index="index" v-model="entry.itemModel"  @change="changeFurModel(index)"></form-group>
												<!-- <textarea v-if="entry.itemCategory=='O'" v-bind:readonly="readonly" type="text" class="form-control" :id="'itemModel'+index" :name="'itemModel'+index" :index="index" v-model="entry.itemModel" placeholder="Model 型号" v-validate="'required'"></textarea> -->
											</td>											
											<td class="text-center">
												<!-- <img v-if="!readonly" style="width: 50px;" :id="'itemImg'+index" src=""> -->
												<img style="width: 60px;height: 60px" :id="'itemImg'+index" :src="GL.getURL('/attachment/downloadimage/'+entry.itemPhoto)">
											</td>
											<td v-if="readonly"><input v-bind:readonly="readonly" type="text" :id="'itemAmout'+index" :maxlength="3" :name="'itemAmout'+index" :index="index" v-model="entry.itemAmout" placeholder="Amount 数量" v-validate="'required'" :class="{'form-control':true,'number':true,'input':true, 'is-danger': errors.has('itemAmout'+index) }"></td>
											<td v-if="!readonly"><input v-bind:readonly="readonly" type="text" :id="'itemAmout'+index" :maxlength="3" :name="'itemAmout'+index" :index="index" v-model="entry.itemAmout" placeholder="Amount 数量" v-validate="'required'" :class="{'form-control':true,'number':true,'input':true, 'is-danger': errors.has('itemAmout'+index) }"></td>
											<td><input v-if="form.appType !='2'" v-bind:readonly="readonly" type="text" class="form-control" :id="'reason'+index" :name="'reason'+index" :index="index" v-model="entry.reason" placeholder="Reason 原因" v-validate="'required'" :class="{'form-control':true,'input':true, 'is-danger': errors.has('reason'+index) }">
												<input v-if="form.appType =='2'" v-bind:readonly="readonly" type="text" class="form-control" :id="'reason'+index" :name="'reason'+index" :index="index" v-model="entry.reason" placeholder="Detailed Description 详细描述" v-validate="'required'" :class="{'form-control':true,'input':true, 'is-danger': errors.has('reason'+index) }">
											</td>
											<td v-if="!readonly" class="text-center" style="vertical-align: middle;">
												<a href="javascript:;" v-if="!readonly" @click="deleteFurItemRows(index)">
													<i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i>
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary" v-if="form.appType!='3'">
				<div class="box-header with-border">
					<h3 class="box-title">
						<i class="fa fa-asterisk text-required"></i> Comments 说明
					</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<!--<textarea class="form-control" id="comments" name="comments" rows="2" v-bind:readonly="readonly" v-model="form.comments" placeholder="Comments 说明" v-validate="'required'" :class="{'form-control':true,'input':true, 'is-danger': errors.has('comments') }"></textarea>
							--><textarea-my other-rules="required"  rows="2" :readonly="readonly" v-model="form.comments" name="comments" id="comments" placeholder="Comments 说明"></textarea-my>
						
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary" v-if="form.appType!='2'">
				<div class="box-header with-border">
					<h3 class="box-title">Update the Current Layout 是否更新当前布局</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<div class="radio">
									<label> <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" v-model="form.isLayout" checked="checked" v-bind:disabled="readonly" @click="currentLayout1"> Yes 是
									</label>
									<label class="mar-left-20"> <input type="radio" name="optionsRadios" id="optionsRadios1" v-model="form.isLayout" value="2" v-bind:disabled="readonly" @click="currentLayout2"> No 否
									</label>
								</div>
							</div>
						</div>
						<div class="col-md-6 hidden">

							<p class="help-block">
								<i class="fa fa-info-circle hidden"></i> Upload the current layout diagram, support PDF, Visio file 上传当前布局图，支持附件类型 PDF,VISIO。
							</p>
						</div>
						<div class="col-md-6 hidden">

							<p class="help-block">
								<i class="fa fa-info-circle hidden"></i> Upload the changed layout diagram, support PDF, Visio file 上传变更后布局图，支持附件类型 PDF,VISIO。
							</p>
						</div>
					</div>
					<div class="row" v-if="form.currentLayout">
						<div class="col-md-6">
							<div class="form-group">
								<label for="">
									<i class="fa fa-asterisk text-required"></i>Current Layout Diagram 当前布局图 </label>
								<div>
									<!--<input type="file" id="exampleInputFile" value="">-->
									<upload2 name="beforAttachment" :readonly="readonly" v-model="form.beforAttachment" accept=".pdf,.vsd,.vsdx" buttonText="Attachment 上传文件" :attachments="form.beforAttachments" multi="true" fileSizeLimit="5MB"></upload2>
									<p class="help-block" v-if="!readonly">
										<i class="fa fa-info-circle hidden"></i> Upload the current layout diagram, support PDF, Visio file 上传当前布局图，支持附件类型 PDF,VISIO。
									</p>
								</div>
							</div>
						</div>
						<div class="col-md-6" v-if="form.currentLayout">
							<div class="form-group">
								<label for="">
									<i class="fa fa-asterisk text-required"></i>Changed Layout Diagram 申请变更后布局图 </label>
								<div>
									<!--<input type="file" id="exampleInputFile" value="">-->
									<upload2 name="afterAttachment" :readonly="readonly" v-model="form.afterAttachment" accept=".pdf,.vsd,.vsdx" buttonText="Attachment 上传文件" :attachments="form.afterAttachments" multi="true" fileSizeLimit="5MB"></upload2>
									<p class="help-block" v-if="!readonly">
										<i class="fa fa-info-circle hidden"></i> Upload the changed layout diagram, support PDF, Visio file 上传变更后布局图，支持附件类型 PDF,VISIO。
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box box-primary" v-if="form.appType=='3'">
				<div class="box-header with-border">
					<h3 class="box-title">
						<i class="fa fa-asterisk text-required"></i> Comments 说明
					</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<!--<textarea class="form-control" id="comments" name="comments" rows="2" v-bind:readonly="readonly" v-model="form.comments" placeholder="Comments 说明" v-validate="'required'" :class="{'form-control':true,'input':true, 'is-danger': errors.has('comments') }"></textarea>
						-->	<textarea-my other-rules="required"  rows="2" :readonly="readonly" v-model="form.comments" name="comments" id="comments" placeholder="Comments 说明"></textarea-my>
						
						</div>
					</div>
				</div>
			</div>

			<div class="checkbox mar-bot-20" v-if="!readonly">
				<label> <input name="terms" type="checkbox" v-validate="'required'">When submitting the application, I have read and agreed to
					<a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin!</a>
					当提交此申请时，我已经理解并承诺遵守
					<a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策！</a>
				</label>
			</div>

			<comment v-if="processTaskId !=null&&form.status != 9" v-model="form.approval.approvalRemark"></comment>

			<div class="box box-primary"  v-if="form.appType =='2' && ((form.processInstanceId !=null && form.status == 1 && formUser != localUser)||(form.status == 0))">
				<div class="box-header with-border">
					<h3 class="box-title">
						<span>
							<i class="fa fa-asterisk text-red"></i> Maintenance Status 维修状态</span>
					</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-3" id="maintenance_Results">
							<form-group type="select2" :readonly="form.status == 0" v-validate="'required'" :class="{'is-danger': errors.has('comments') }" uri="/furnitureType/maintenance/"  v-model="form.maintenance_Results" name="maintenance_Results"></form-group>
							<!-- <select  v-model="form.maintenance_Results"  :class="{'is-danger': errors.has('comments') }" v-validate="'required'">
								<option value="">--</option>
								<option value="1">Complete Maintenance 已完成维修</option>
								<option value="2">No need maintain 不需要维修</option>
								<option value="3">Cannot Maintain, please apply new furniture 不能维修，请申请新家具</option>
							</select> -->
						</div>
					</div>
				</div>
			</div>

			<router-view :form="form" entityId="FurnitureNew" vclass="btn-left" uri="/form/FurnitureNew/update" :validator="this.$validator"></router-view>
			<comment-list v-if="form.processInstanceId !=null"></comment-list>

		</section>
	</div>
</template>

<script>
import global_ from "./../../../components/Common/Util/Global.vue";
export default {
  name: "FurnitureNew",
  methods: {
    radioNoFun: function() {
      let dmv = {};
      var url = "/form/FurnitureNew/create/";
      this.GL.actUtil.query("get", url, "", function(data) {
        dmv = JSON.parse(data);
      });
			this.form.furnitureItemsList = dmv.form.furnitureItemsList;
			$("#itemImg0").css('display','none');
    },
    mounted: function(el, name) {
      var GL = this.GL;
      var url = GL.getURL("/attachment/downloadimage/" + name);
      el.src = url;
    },
    changeFurModel: function(rowId) {
			var form = this.form;
      var el = $("#itemImg" + rowId)[0];
      $("#itemImg" + rowId).show();
			let modelval = form.furnitureItemsList[rowId].itemModel;
			// console.log(modelval);
      if (modelval != null && modelval != undefined) {
        //  console.log(form.furnitureItemsList[rowId].itemModel);
        let model = modelval.split(",")[0];
				// console.log(model);
        // console.log("modelval"+model);
        var mounted = this.mounted;
        $.ajax({
          url: Config.getBaseURL() + "/FurnitureNew/getfurltypepic", //这个就是请求地址对应sAjaxSource
          data: {
            modelval: model
          },
          type: "get",
          dataType: "json",
          success: function(data) {
						mounted(el, data.modelval);
						form.furnitureItemsList[rowId].itemPhoto=data.modelval;
						// console.log(data);
          }
        });
      }
    },
    currentLayout1: function() {
      this.form.currentLayout = true;
    },
    currentLayout2: function() {
      this.form.currentLayout = false;
    },
    changeFurType: function(rowId) {
      // var el = $("#itemImg" + rowId)[0];
			// $("#itemImg" + rowId).css("display","none");
			// el.src = "";
			this.form.furnitureItemsList[rowId].productDescription="";
			this.form.furnitureItemsList[rowId].itemModel="";
      var form = this.form;
      var itemval = $("#itemCategory" + rowId).val();
      if (itemval != "" && itemval != null && itemval != "null") {
				this.initselect($("#productDescription" + rowId)[0]);
      } else {
        $("#productDescription" + rowId).html("");
      }
      // form.furnitureItemsList[rowId].itemModel = "";
      //this.changeSecondCategory(rowId);
    },
		changeFurDesc: function(rowId) {
			if(this.form.furnitureItemsList[rowId].itemCategory=='O'){
				var temp=this.form.furnitureItemsList[rowId].productDescription;
				this.form.furnitureItemsList[rowId].productDescription=undefined;
				this.form.furnitureItemsList[rowId].itemModel=undefined;
				var tempthis=this;
				setTimeout(function(){
					tempthis.form.furnitureItemsList[rowId].productDescription=temp;
				},100);
			}
      var el = $("#itemImg" + rowId)[0];
			$("#itemImg" + rowId).css("display","none");
      el.src = "";
      var form = this.form;
      var itemval = $("#productDescription" + rowId).val();
      if (itemval != "" && itemval != null && itemval != "null") {
        // console.log(itemval);
        if (itemval != "O") {
          this.initselect($("#itemModel" + rowId)[0]);
        }
			}
    },
    initselect: function(el) {
      setTimeout(function() {
        var uri = $(el).attr("uri");
				// console.log(uri);
        var html = '<option value="">--Please Select--</option>';
        //var html = '';
        if (uri) {
          global_.actUtil.query("get", encodeURI(encodeURI(uri)), "", function(data) {
            var dm = JSON.parse(data);
            for (var d in dm) {
              html += '<option value="' + d + '">' + dm[d] + "</option>";
            }
          });
          $(el).html(html);
        }
        $(el).val("");
      }, 300);

      // alert(uri);
    },
    insertFurItemRows: function() {
      var newItem = {};
      for (var key in this.form.furnitureItemsList[0]) {
        newItem[key] = "";
      }
      let length = this.form.furnitureItemsList.length;
      this.form.furnitureItemsList.push(newItem);
      // console.log("#itemImg" + length);
      setTimeout(function time() {
        $("#itemImg" + length).hide();
      }, 0);
    },
    //表格行删除调用方法
    deleteFurItemRows: function(rowId) {
      if (this.form.furnitureItemsList.length > 1) {
				// $("#furniture tr")[rowId+1].remove();
				this.form.furnitureItemsList.splice(rowId, 1);
				var temp = this.form.furnitureItemsList;
				this.form.furnitureItemsList = [];
				// console.log(this.form.furnitureItemsList.it);
				let _this = this;
				setTimeout(function time(){
					_this.form.furnitureItemsList=temp
				},100);
				
      } else {
        alert("At least one furniture record is required 请至少输入一条家具记录");
      }
    }
  },
  mounted() {
		let list = this.form.furnitureItemsList;
		// console.log(list[0].itemModel === "");
		for(let i =0;i < list.length; i++){
			let furn = list[i];
			if(furn.itemModel==null || furn.itemModel==undefined ||furn.itemModel === ""){
				// console.log(1111111111);
				$("#itemImg"+i).css('display','none');
			}
		}

		//放在save，submit是数据在数据库中保存两次
		this.$root.eventHub.$off('updateFormData');
		this.$root.eventHub.$on('updateFormData', (form) => {
			this.form = form;
		});		

    var _form = this.form;
    var _this = this;
    $("#furniture tbody").on("blur", ".number", function() {
      var reg = /^\d+(?:\.\d{0})?$/;
      if ($(this).attr("readonly")) {
        //只读不做操作
      } else {
        if ($(this).val()) {
          if (!reg.test($(this).val())) {
            $.alert(" Only integers are allowed for this input area. 该区域只能输入整数");
            _form.furnitureItemsList[$(this).attr("index")].itemAmout = "";
            $(this).val("");
          } else {
            //强制保留两位小数
            /*var newVal=toDecimal2($(this).val());
							companylist[$(this).attr("index")].totalPrice=newVal;
							$(this).val(newVal);*/
          }
        }
      }
    });
  },
  data() {
    //返回的数据对象
    var dm = {};
    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/FurnitureNew/get/" + id;
    } else {
      var url = "/form/FurnitureNew/create/";
    }

    if (this.GL) {
      this.GL.actUtil.query("get", url, "", function(data) {
        dm = JSON.parse(data);
        if (url.includes("create/")) {
          dm.form.furnitureItemsList.forEach((val, index) => {
            val.create = null;
					});
					dm.form.furnitureItemsList[0].productDescription ="";
        }
      });
    } else {
      global_.actUtil.query("get", url, "", function(data) {
        dm = JSON.parse(data);
        if (url.includes("create/")) {
          dm.form.furnitureItemsList.forEach((val, index) => {
						val.create = null;
					});
					dm.form.furnitureItemsList[0].productDescription ="";
        }
      });
		}
    return dm;
	},		
  computed: {
		appTypeid: {
      // 动态计算processTaskId的值
      get: function() {
        return this.form.aooType;
      }
		},
    processTaskId: {
      // 动态计算processTaskId的值
      get: function() {
        return this.$route.query.taskId;
      }
		},
		appFrm: {
      // 动态计算processTaskId的值
      get: function() {
        return this.form.appType;
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
    applicationTime: {
      get: function() {
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      }
    },
    onlineShow: {
      get: function() {
        return (
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("online") != -1) ||
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("transfer") != -1) ||
          (this.$route.query.taskKey == null &&
            this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
      }
    },
    onlineReadonly: {
      get: function() {
        return (
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("online") == -1) ||
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("onlineApprove") != -1) ||
          (this.$route.query.taskKey == null &&
            this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
      }
    },
    transferShow: {
      get: function() {
        return (
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("transfer") != -1) ||
          (this.$route.query.taskKey == null &&
            this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
      }
    },
    transferReadonly: {
      get: function() {
        return (
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("transfer") == -1) ||
          (this.$route.query.taskKey == null &&
            this.form.processInstanceId != null &&
            this.form.status != null &&
            this.form.status != 2 &&
            this.form.status != 9)
        );
      }
    },
    transferbuttonShow: {
      get: function() {
        return (
          this.$route.query.taskKey != null &&
          this.$route.query.taskKey.indexOf("transfer") != -1
        );
      }
    }
  }
};
</script>

<style>
.pad-0 {
  padding: 0px !important;
}
#itemmodeldis div div div label {
  display: none;
}
#itemmodeldis div div.col-undefined {
  padding-top: 10px;
}
#maintenance_Results div div div label{
	display: none
}
</style>

<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">Construction Work Permit 施工作业许可证申请</h1>
      <ol class="breadcrumb" v-if="!approvalFlow3 && !approvalFlow1 && !approvalFlow2 && !approvalFlow4">
        <li><a >1.Applicant</a></li>
        <li><a >2.TPW Permit Responsible</a></li>
        <li><a >3.CE Permit Responsible</a></li>
      </ol>
      <ol class="breadcrumb" v-if="approvalFlow3 && !approvalFlow1 && !approvalFlow2">
        <li><a >1.Applicant</a></li>
        <li><a >2.CE Permit Responsible</a></li>
      </ol>
      <ol class="breadcrumb" v-if="approvalFlow1 && !approvalFlow2 && !approvalFlow3">
        <li><a >1.Applicant</a></li>
        <li><a >2.TPW Permit Responsible</a></li>
        <li><a >3.CA Permit Responsible</a></li>
      </ol>
      <ol class="breadcrumb" v-if="approvalFlow2 && !approvalFlow1 && !approvalFlow3">
        <li><a >1.Applicant</a></li>
        <li><a >2.TPW Permit Responsible</a></li>
        <li><a >3.Area Responsible</a></li>
      </ol>
      <ol class="breadcrumb" v-if="approvalFlow4">
        <li><a >1.Applicant</a></li>
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
			  <h3 class="box-title">Applicant Info. <label>申请人信息</label></h3>
        <label v-if="!readonly" class="mar-left-20"><input type="checkbox"  id="onbehalf" @click="onbehalfclick" v-model="this.onbehalf" > <strong>On Behalf </strong></label>
			</div>
      <form role="form" >
				<input type="hidden" v-model="form.id" name="id">
				<input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
				<input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
				<div class="box-body">
					<div class="row">
            <!--不选中的时候显示-->
            <form-group v-if="!onbehalf" col="md-3" type="input"  v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly" label="ConstructionWorkPermit.creatorStaffcode"></form-group>
            <!--选中的时候显示-->
            <div class="col-md-3" v-if="onbehalf">
              <div class="form-group">
                <label for="">
                  <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                  {{$t("ConstructionWorkPermit.creatorStaffcode")}} </label>
                <div class="input-group ">
                  <input type="text" class="form-control" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
                  <span class="input-group-btn" id="selectotherperson">
                        <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
                    </span>
                </div>
              </div>
            </div>
            <!--
              <form-group col="md-3" type="input"  v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="true" label="ConstructionWorkPermit.creatorStaffcode"></form-group>
					  -->
            <form-group col="md-3" type="input" v-model="form.creatorName" name="name" readonly="true" label="ConstructionWorkPermit.name"></form-group>
						<form-group col="md-3" type="input"  v-model="form.creatorTelephone" name="creatorTelephone" readonly="true" label="ConstructionWorkPermit.creatorTelephone"></form-group>
						<form-group col="md-3" type="input"  v-model="form.creatorDept" name="creatorDept" readonly="true" label="ConstructionWorkPermit.creatorDept"></form-group>
					</div>
        </div>
			</form>
    </div>

    <div class="box box-primary">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Permit Category <label>许可分类</label></h3>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row" v-if="createURI=='tpw' || this.form.permitType=='tpw' || (this.form.permitCategory!=null && this.form.permitCategory!='' && (this.form.permitCategory=='Construction Permit' || this.form.permitCategory=='Energy & Medium Application')) ">
            <!--
			<div class="form-group col-md-3">
              TPW 工厂服务部：
            </div>-->
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="permitCategoryChoose"  v-model="form.permitCategory" name="permitCategory" value="Construction Permit" >
                Construction Permit 施工许可
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="permitCategoryChoose"  v-model="form.permitCategory" name="permitCategory" value="Energy & Medium Application" >
                Energy & Medium Application 能源 & 介质申请
              </label>
            </div>
          </div> 
          <div class="row" v-if="createURI=='ehs' || this.form.permitType=='ehs' || (this.form.permitCategory!=null && this.form.permitCategory!='' && (this.form.permitCategory!='Construction Permit' && this.form.permitCategory!='Energy & Medium Application')) " >
            <!--<div class="form-group col-md-3">
              EHS 环境、职业健康与安全部：
            </div>-->
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="permitCategoryChoose"  v-model="form.permitCategory" name="permitCategory" value="Hot Work Permit" >
                Hot Work Permit 动火作业许可证
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="permitCategoryChoose"  v-model="form.permitCategory" name="permitCategory" value="Work at Height Permit" >
                Work at Height Permit 高处作业许可证
              </label>
            </div>   
          <!--
          </div>
          <div class="row" v-if="createURI=='ehs' || this.form.permitType=='ehs'">
            <div class="form-group col-md-3">&nbsp;</div>
            -->
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="permitCategoryChoose"  v-model="form.permitCategory" name="permitCategory" value="Confine Space Permit" >
                Confine Space Permit 有限空间许可证
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="readonly" @change="permitCategoryChoose"  v-model="form.permitCategory" name="permitCategory" value="Other Dangerous Work" >
                Other Dangerous Work 其他危险作业
              </label>
            </div>
          </div>
            <!--@change="permitCategoryChoose" 
            <div class="radio no-margin overflow-auto" style="padding: 10px"> </div>-->
				</div>
			</form>
		</div>

    <div class="box box-primary" id="ConstructionDiv" v-if="this.constructionPermitShow || this.energyMediumShow">
      <div class="box-header with-border" v-if="this.constructionPermitShow">
			  <h3 class="box-title" >Construction Permit Information 施工许可信息</h3>
			</div>
      <div class="box-header with-border" v-if="this.energyMediumShow">
        <h3 class="box-title" >Energy & Medium Application Information 能源 & 介质申请信息</h3>
			</div>

      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <form-group col="md-3" type="singledaterangepickerSeparator" :singleDatePicker="true" :init="true" other-rules="required" :startDate="this.permitStartDateStart" v-model="form.permitStartDateTime" name="permitStartDateTime" :disabled="startEndDateReadonlyConstruction" label="ConstructionWorkPermit.permitStartDateTime"></form-group>
            <form-group col="md-3" type="singledaterangepickerSeparator" :singleDatePicker="true" :init="true" v-if="this.showArrEndDate" :startDate="this.generateStartDateTime" :endDate="this.generateEndDateTime" other-rules="required" v-model="form.permitEndDateTime" name="permitEndDateTime" :disabled="startEndDateReadonlyConstruction" label="ConstructionWorkPermit.permitEndDateTime"></form-group>
            <!--
            <form-group col="md-6" type="singledaterangepicker2" iflable="true" other-rules="required" :disabled="startEndDateReadonlyConstruction" v-model="form.permitDate" name="permitDate"  id="permitDate" label="ConstructionWorkPermit.permitDate"></form-group>
						-->
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteResponsibilityPerson" name="onSiteResponsibilityPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteResponsibilityPerson"></form-group>
					  <form-group col="md-3" type="input" other-rules="required|max:300" @change="checkTelephone" v-model="form.telephone" name="telephone" :disabled="readonly" label="ConstructionWorkPermit.telephone"></form-group>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" @change="changePlant()" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            -->
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Plant 工厂
              </label>  
              <select :disabled="readonly" @change="changePlant()" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('plant') }" v-validate="'required'" uri="/constructionWorkPermit/plant" v-model="form.plant" id="plant" name="plant" >
              </select>
            </div>
            <!--workshop 必填-->            
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Workshop 车间
              </label>           
              <select @change="changePlantWorkshop()" v-if="form.plant!='' " :disabled="readonly" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant" v-model="form.workshop" id="workshop" name="workshop" >
              </select>              
              <select v-if="form.plant=='' " :disabled="readonly" :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant"  v-model="form.workshop" id="workshop" name="workshop">
              <option value= "">--Please Select--</option>
              </select>
            </div>
            <!--Area -->
            <div class="form-group col-md-3" v-if="form.workshop=='' || form.workshop==null || form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'">  
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Area 区域
              </label>
              <!-- 必填-->
              <select :disabled="readonly" v-if="form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'"  :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area">
              </select>
              <!-- 非必填
              <select v-else-if="form.workshop=='6' || form.workshop=='7' || form.workshop=='8' || form.workshop=='9' || form.workshop=='11' || form.workshop=='12'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              </select>-->
              <select :disabled="readonly" v-else-if="form.workshop=='' || form.workshop==null" :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              <option value= "">--Please Select--</option>
              </select>
            </div>

            <!--
            <form-group col="md-3" type="select" other-rules="required" v-if="this.showArrPlant" :uri="this.uriWorkshop" :disabled="readonly" v-model="form.workshop" name="workshop" label="ConstructionWorkPermit.workshop"></form-group>
            <form-group col="md-3" type="select" :other-rules="areaRequired" v-if="this.showArrArea" :uri="this.uriArea" :disabled="readonly" v-model="form.area" name="area" label="ConstructionWorkPermit.area"></form-group>
            -->
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Location Details 详细地点</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('locationDetails') }" rows="1" v-model="form.locationDetails" name="locationDetails" :readonly="readonly" id="locationDetails" placeholder="" v-validate="'required'"  @blur="locationDetailsCheck" ></textarea>
            </div>
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.locationDetails" name="locationDetails" :disabled="readonly" label="ConstructionWorkPermit.locationDetails"></form-group>
            -->
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Vendor Name/VWATJ Operation Dept. 项目施工单位/VWATJ 作业部门</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('vendorName') }" rows="1" v-model="form.vendorName" name="vendorName" :readonly="readonly" id="vendorName" placeholder="" v-validate="'required'"  @blur="vendorNameCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="HotDiv" v-if="this.hotPermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Hot Work Permit Information 动火作业许可证信息</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Hot Work Level 动火作业级别 
                <i class="fa fa-fw fa-info-circle text-info" @mouseenter="showInform()" @mouseleave="hiddenInform()"></i><!--:title="hotWorkLevelTitle" -->
                <div v-show="seen" id="inform">
                  <span >Level 2 hot work: All hot work except the level 1 hot work, special hot work and hot work in approved fixed hot work area. <br />
                  Level 1 hot work: Hot work within 10m or near a flammable and explosive place and all hot work of the contractor. For example, in the workshop, near the heat treatment equipment and pipelines, the forklift charging room, and the combustible storage area. <br />
                  Special hot fire: Fire work on flammable, explosive and toxic and harmful devices, pipelines, storage and containers. For example, ammonia plants and pipelines, liquefied petroleum gas plants and pipelines, gas cylinders, and natural gas pipelines. <br />
                  二级动火：除在一级动火、特殊动火和经批准的固定动火区外的所有动火作业。<br />
                  一级动火：在易燃易爆场所内或附近10m内的动火作业以及承包商所有的动火作业。例如车间内热处理设备及管道附近、叉车充电间、可燃物存放区。<br />
                  特殊动火：在易燃易爆及有毒有害装置、输送管道、存储、容器上的动火作业。例如氨气装置及管道、液化石油气装置及管道、气瓶集装阁、天然气管道。
                  </span>
                </div>
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.hotWorkLevel" name="hotWorkLevel" :disabled="readonly" value="Hot Work of Level 2 二级动火">&nbsp;Hot Work of Level 2 二级动火&nbsp;&nbsp;
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.hotWorkLevel" name="hotWorkLevel" :disabled="readonly" value="Hot Work of Level 1 一级动火">&nbsp;Hot Work of Level 1 一级动火&nbsp;&nbsp;
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.hotWorkLevel" name="hotWorkLevel" :disabled="readonly" value="Special Hot Work 特殊动火">&nbsp;Special Hot Work 特殊动火&nbsp;&nbsp;
              </label>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Hot Work Type 动火类型</label><br />
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Cutting 切割"> Cutting 切割
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Electric drilling 电钻"> Electric drilling 电钻
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Electric Welding 电焊"> Electric Welding 电焊
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Gas Welding 气焊"> Gas Welding 气焊
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Grinding Wheel 砂轮"> Grinding Wheel 砂轮
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal;">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Hot Air Gun 热风枪"> Hot Air Gun 热风枪
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotWorkType" v-model="hotWorkTypeArray" :disabled="readonly" value="Others 其他"> Others 其他
              </label>
            </div>
            <div class="form-group col-md-3">
              <textarea v-if="hotWorkTypeOther" style="resize:vertical;font-weight:normal;width:100%;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('hotType')}" rows="1" v-model="form.hotType" name="hotType" :readonly="readonly" id="hotType" placeholder="" v-validate="'required'"  @blur="hotTypeOthersCheck" ></textarea>
            </div>
          </div>

          <div class="row">
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" :startDate="this.permitStartDateStart" v-model="form.permitStartDateDate" name="permitStartDateDate" :disabled="hotApproveReadonly" label="ConstructionWorkPermit.permitStartDateHot"></form-group>
            <!--时间  HH:MM-->
						<form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.hotStartTime" name="hotStartTime" :disabled="hotApproveReadonly" label="ConstructionWorkPermit.hotStartTime"></form-group>
					  <form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.hotEndTime" name="hotEndTime" :disabled="hotApproveReadonly" label="ConstructionWorkPermit.hotEndTime"></form-group>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" @change="changePlant()" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            -->
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Plant 工厂
              </label>  
              <select :disabled="readonly" @change="changePlant()" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('plant') }" v-validate="'required'" uri="/constructionWorkPermit/plant" v-model="form.plant" id="plant" name="plant" >
              </select>
            </div>
            <!--workshop 必填-->            
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Workshop 车间
              </label>
              <select :disabled="readonly" @change="changePlantWorkshop()" v-if="form.plant!='' " v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant" v-model="form.workshop" id="workshop" name="workshop" >
              </select>              
              <select :disabled="readonly" v-if="form.plant=='' " :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant"  v-model="form.workshop" id="workshop" name="workshop">
              <option value= "">--Please Select--</option>
              </select>
            </div>
            <!--Area -->
            <div class="form-group col-md-3" v-if="form.workshop=='' || form.workshop==null || form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'">  
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Area 区域
              </label>
              <!-- 必填-->
              <select :disabled="readonly" v-if="form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'"  :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area">
              </select>
              <!-- 非必填
              <select v-else-if="form.workshop=='6' || form.workshop=='7' || form.workshop=='8' || form.workshop=='9' || form.workshop=='11' || form.workshop=='12'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              </select>-->
              <select :disabled="readonly" v-else-if="form.workshop=='' || form.workshop==null" :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              <option value= "">--Please Select--</option>
              </select>
            </div>

            <!--
            <form-group col="md-3" type="select" v-if="this.showArrPlant" :uri="this.uriWorkshop" other-rules="required" :disabled="readonly" v-model="form.workshop" name="workshop" label="ConstructionWorkPermit.workshop"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrArea" :uri="this.uriArea" :other-rules="areaRequired" :disabled="readonly" v-model="form.area" name="area" label="ConstructionWorkPermit.area"></form-group>
            -->
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Location Details 详细地点</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('locationDetails')}" rows="1" v-model="form.locationDetails" name="locationDetails" :readonly="readonly" id="locationDetails" placeholder="" v-validate="'required'"  @blur="locationDetailsCheck" ></textarea>
            </div>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.locationDetails" name="locationDetails" :disabled="readonly" label="ConstructionWorkPermit.locationDetails"></form-group>
            -->
            <!--
              <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.vendorName" name="vendorName" :disabled="readonly" label="ConstructionWorkPermit.vendorName"></form-group>
						-->            
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteResponsibilityPerson" name="onSiteResponsibilityPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteResponsibilityPerson"></form-group>
					  <form-group col="md-3" type="input" other-rules="required|max:300" @change="checkTelephone" v-model="form.telephone" name="telephone" :disabled="readonly" label="ConstructionWorkPermit.telephone"></form-group>
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;" ></i>Operator 作业人</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('operator') }" rows="1" v-model="form.operator" name="operator" :readonly="readonly" id="operator" placeholder="" v-validate="'required'"  @blur="operatorCheck" ></textarea>
            </div>          
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.operator" name="operator" :disabled="readonly" label="ConstructionWorkPermit.operator"></form-group>
						-->
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteSupervisorPerson" name="onSiteSupervisorPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteSupervisorPerson"></form-group>
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Vendor Name/VWATJ Operation Dept. 项目施工单位/VWATJ 作业部门</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('vendorName') }" rows="1" v-model="form.vendorName" name="vendorName" :readonly="readonly" id="vendorName" placeholder="" v-validate="'required'"  @blur="vendorNameCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="SpaceDiv" v-if="this.spacePermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Confine Space Permit Information 有限空间许可证信息</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" :startDate="this.permitStartDateStart" v-model="form.permitStartDateDate" name="permitStartDateDate" :disabled="spaceApproveReadonly" label="ConstructionWorkPermit.permitStartDateSpace"></form-group>
						<form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.dailyWorkingTimeFrom" name="dailyWorkingTimeFrom" :disabled="spaceApproveReadonly" label="ConstructionWorkPermit.dailyWorkingTimeFrom"></form-group>
					  <form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.dailyWorkingTimeTo" name="dailyWorkingTimeTo" :disabled="spaceApproveReadonly" label="ConstructionWorkPermit.dailyWorkingTimeTo"></form-group>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" @change="changePlant()" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            -->
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Plant 工厂
              </label>  
              <select :disabled="readonly" @change="changePlant()" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('plant') }" v-validate="'required'" uri="/constructionWorkPermit/plant" v-model="form.plant" id="plant" name="plant" >
              </select>
            </div>
            <!--workshop 必填-->            
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Workshop 车间
              </label>           
              <select :disabled="readonly" @change="changePlantWorkshop()" v-if="form.plant!='' " v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant" v-model="form.workshop" id="workshop" name="workshop" >
              </select>              
              <select :disabled="readonly" v-if="form.plant=='' " :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant"  v-model="form.workshop" id="workshop" name="workshop">
              <option value= "">--Please Select--</option>
              </select>
            </div>
            <!--Area -->
            <div class="form-group col-md-3" v-if="form.workshop=='' || form.workshop==null || form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'">  
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Area 区域
              </label>
              <!-- 必填-->
              <select :disabled="readonly" v-if="form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'"  :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area">
              </select>
              <!-- 非必填
              <select v-else-if="form.workshop=='6' || form.workshop=='7' || form.workshop=='8' || form.workshop=='9' || form.workshop=='11' || form.workshop=='12'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              </select>-->
              <select :disabled="readonly" v-else-if="form.workshop=='' || form.workshop==null" :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              <option value= "">--Please Select--</option>
              </select>
            </div>

            <!--
            <form-group col="md-3" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrPlant" :uri="this.uriWorkshop" other-rules="required" :disabled="readonly" v-model="form.workshop" name="workshop" label="ConstructionWorkPermit.workshop"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrArea" :uri="this.uriArea" :other-rules="areaRequired" :disabled="readonly" v-model="form.area" name="area" label="ConstructionWorkPermit.area"></form-group>
            -->
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Location Details 详细地点</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('locationDetails')}" rows="1" v-model="form.locationDetails" name="locationDetails" :readonly="readonly" id="locationDetails" placeholder="" v-validate="'required'"  @blur="locationDetailsCheck" ></textarea>
            </div>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.locationDetails" name="locationDetails" :disabled="readonly" label="ConstructionWorkPermit.locationDetails"></form-group>
            -->
            <!--
              <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.vendorName" name="vendorName" :disabled="readonly" label="ConstructionWorkPermit.vendorName"></form-group>
						-->
            
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteResponsibilityPerson" name="onSiteResponsibilityPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteResponsibilityPerson"></form-group>
					  <form-group col="md-3" type="input" other-rules="required|max:300" @change="checkTelephone" v-model="form.telephone" name="telephone" :disabled="readonly" label="ConstructionWorkPermit.telephone"></form-group>
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Operator 作业人</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('operator') }" rows="1" v-model="form.operator" name="operator" :readonly="readonly" id="operator" placeholder="" v-validate="'required'"  @blur="operatorCheck" ></textarea>
            </div>
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.operator" name="operator" :disabled="readonly" label="ConstructionWorkPermit.operator"></form-group>
						-->
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteSupervisorPerson" name="onSiteSupervisorPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteSupervisorPerson"></form-group>
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Vendor Name/VWATJ Operation Dept. 项目施工单位/VWATJ 作业部门</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('vendorName') }" rows="1" v-model="form.vendorName" name="vendorName" :readonly="readonly" id="vendorName" placeholder="" v-validate="'required'"  @blur="vendorNameCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="OtherDangerousDiv" v-if="this.otherDangerousShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Dangerous Work Permit Information 危险作业许可证信息</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Permit Type of Dangerous Work 危险作业施工许可种类
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousPermitType" v-model="dangerousPermitTypeArray" :disabled="readonly" value="Ground Digging 地面挖掘"> Ground Digging 地面挖掘
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
              <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousPermitType" v-model="dangerousPermitTypeArray" :disabled="readonly" value="Lifting Work 起重作业"> Lifting Work 起重作业
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousPermitType" v-model="dangerousPermitTypeArray" :disabled="readonly" value="Pressure Testing 压力试验"> Pressure Testing 压力试验
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousPermitType" v-model="dangerousPermitTypeArray" :disabled="readonly" value="Radiographic Inspection 射线探伤作业"> Radiographic Inspection 射线探伤作业
              </label>
            </div>
            
            
            
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousPermitType" v-model="dangerousPermitTypeArray" :disabled="readonly" value="Using Hazardous Materials Work 使用危险材料的作业"> Using Hazardous Materials Work 使用危险材料的作业
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousPermitType" v-model="dangerousPermitTypeArray" :disabled="readonly" value="Others Dangerous Work 其他危险作业"> Others Dangerous Work 其他危险作业
              </label>
            </div>
            <div class="form-group col-md-3">
              <textarea v-if="dangerousPermitTypeOther" style="resize:vertical;font-weight:normal;height: 34px;width:100%;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('dangerousWorkDetails')}" rows="1" v-model="form.dangerousWorkDetails" name="dangerousWorkDetails" :readonly="readonly" id="dangerousWorkDetails" placeholder="" v-validate="'required'"  @blur="dangerousWorkDetailsOthersCheck" ></textarea>
            </div>
          </div>
          <div class="row">
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" :startDate="this.permitStartDateStart" v-model="form.permitStartDateDate" name="permitStartDateDate" :disabled="dangerousApproveReadonly" label="ConstructionWorkPermit.permitStartDateHeight"></form-group>
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" v-if="this.showArrEndDate" :startDate="generateStartDate" :endDate="generateEndDate" v-model="form.permitEndDateDate" name="permitEndDateDate" :disabled="dangerousApproveReadonly" label="ConstructionWorkPermit.permitEndDateHeight"></form-group>
          </div>
          <div class="row">
            <!--时间  HH:MM-->
						<form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.dailyWorkingTimeFrom" name="dailyWorkingTimeFrom" :disabled="dangerousApproveReadonly" label="ConstructionWorkPermit.dailyWorkingTimeFrom"></form-group>
					  <form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.dailyWorkingTimeTo" name="dailyWorkingTimeTo" :disabled="dangerousApproveReadonly" label="ConstructionWorkPermit.dailyWorkingTimeTo"></form-group>
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label style="font-weight:bold">
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Working on Weekend 施工包含周六日
              </label>
              <br />
              <label style="font-weight:normal">
                  <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingWeekend" name="workingWeekend" :disabled="readonly" value="Yes">&nbsp;Yes&nbsp;&nbsp;
                <!--
                <input type="checkbox" v-model="workingWeekend" name="workingWeekend" @change="workingWeekendCheck" :disabled="dangerousApproveReadonly" value="Yes">Working on Weekend 施工包含周六日
                -->
              </label>
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingWeekend" name="workingWeekend" :disabled="readonly" value="No">&nbsp;No
              </label>              
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:bold">
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Working on Legal Holiday 施工包含法定节假日
              </label><br />
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingLegalHoliday" name="workingLegalHoliday" :disabled="readonly" value="Yes">&nbsp;Yes&nbsp;&nbsp;
              </label> 
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingLegalHoliday" name="workingLegalHoliday" :disabled="readonly" value="No">&nbsp;No
              </label>
            </div>
          </div>
          <div class="row">
            <!--
              <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.vendorName" name="vendorName" :disabled="readonly" label="ConstructionWorkPermit.vendorName"></form-group>
						-->
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteResponsibilityPerson" name="onSiteResponsibilityPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteResponsibilityPerson"></form-group>
					  <form-group col="md-3" type="input" other-rules="required|max:300" @change="checkTelephone" v-model="form.telephone" name="telephone" :disabled="readonly" label="ConstructionWorkPermit.telephone"></form-group>
          
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Operator 作业人</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('operator') }" rows="1" v-model="form.operator" name="operator" :readonly="readonly" id="operator" placeholder="" v-validate="'required'"  @blur="operatorCheck" ></textarea>
            </div>
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.operator" name="operator" :disabled="readonly" label="ConstructionWorkPermit.operator"></form-group>
						-->
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteSupervisorPerson" name="onSiteSupervisorPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteSupervisorPerson"></form-group>
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Vendor Name/VWATJ Operation Dept. 项目施工单位/VWATJ 作业部门</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('vendorName') }" rows="1" v-model="form.vendorName" name="vendorName" :readonly="readonly" id="vendorName" placeholder="" v-validate="'required'"  @blur="vendorNameCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="OtherDangerousDiv2" v-if="this.otherDangerousShow">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Main Devices or Materials 主要施工设备或材料</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Air Compressor 空压机"> Air Compressor 空压机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Angle Grinder 角磨机"> Angle Grinder 角磨机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Axial-flow Fan 轴流风机"> Axial-flow Fan 轴流风机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Bridge Crane 桥式起重机"> Bridge Crane 桥式起重机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Cantilever Crane 悬臂吊"> Cantilever Crane 悬臂吊
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Compressed Gas Cylinder 压缩气体钢瓶"> Compressed Gas Cylinder 压缩气体钢瓶
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Diagnostic Machine 探伤机"> Diagnostic Machine 探伤机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Drilling Machine 钻孔机"> Drilling Machine 钻孔机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Earthmover 推土机"> Earthmover 推土机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Excavator 挖掘机"> Excavator 挖掘机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Hazardous Chemical 危险化学品"> Hazardous Chemical 危险化学品
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Ladder 梯子"> Ladder 梯子
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Lift Truck 升降车"> Lift Truck 升降车
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Mobile Crane 汽车吊"> Mobile Crane 汽车吊
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Pneumatic Pick 风镐"> Pneumatic Pick 风镐
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Scaffold 脚手架"> Scaffold 脚手架
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Torch Cutting Machine 气割设备"> Torch Cutting Machine 气割设备
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Welding Machine 焊机"> Welding Machine 焊机
                </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkDangerousMainDevices" v-model="dangerousMainDevicesArray" :disabled="readonly" value="Other Equipment/Material 其他设备或材料"> Other Equipment/Material 其他设备或材料
              </label>
            </div>
            <div class="form-group col-md-3">
              <textarea v-if="dangerousMainDevicesOther" style="resize:vertical;font-weight:normal;height: 34px;width:100%;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('dangerousEquipmentName')}" rows="1" v-model="form.dangerousEquipmentName" name="dangerousEquipmentName" :readonly="readonly" id="dangerousEquipmentName" placeholder="" v-validate="'required'"  @blur="dangerousEquipmentNameOthersCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="HeightDiv" v-if="this.heightPermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Work at Height Permit Information 高处作业许可证信息</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" :startDate="this.permitStartDateStart" v-model="form.permitStartDateDate" name="permitStartDateDate" :disabled="heightApproveReadonly" label="ConstructionWorkPermit.permitStartDateHeight"></form-group>
            <form-group col="md-3" type="datepicker" dateformate="yyyy-mm-dd" other-rules="required" v-if="this.showArrEndDate" :startDate="generateStartDate" :endDate="generateEndDate" v-model="form.permitEndDateDate" name="permitEndDateDate" :disabled="heightApproveReadonly" label="ConstructionWorkPermit.permitEndDateHeight"></form-group>
          </div>
          <div class="row">
            <!--时间  HH:MM-->
						<form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.dailyWorkingTimeFrom" name="dailyWorkingTimeFrom" :disabled="heightApproveReadonly" label="ConstructionWorkPermit.dailyWorkingTimeFrom"></form-group>
					  <form-group col="md-3" type="timepicker2" other-rules="required" v-model="form.dailyWorkingTimeTo" name="dailyWorkingTimeTo" :disabled="heightApproveReadonly" label="ConstructionWorkPermit.dailyWorkingTimeTo"></form-group>
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label style="font-weight:bold">
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Working on Weekend 施工包含周六日
              </label>
              <br />
              <label style="font-weight:normal">
                  <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingWeekend" name="workingWeekend" :disabled="readonly" value="Yes">&nbsp;Yes&nbsp;&nbsp;
              </label>
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingWeekend" name="workingWeekend" :disabled="readonly" value="No">&nbsp;No
              </label>              
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:bold">
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Working on Legal Holiday 施工包含法定节假日
              </label><br />
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingLegalHoliday" name="workingLegalHoliday" :disabled="readonly" value="Yes">&nbsp;Yes&nbsp;&nbsp;
              </label> 
              <label style="font-weight:normal">
                <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" v-model="form.workingLegalHoliday" name="workingLegalHoliday" :disabled="readonly" value="No">&nbsp;No
              </label>
            </div>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" @change="changePlant()" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            -->
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Plant 工厂
              </label>  
              <select :disabled="readonly" @change="changePlant()" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('plant') }" v-validate="'required'" uri="/constructionWorkPermit/plant" v-model="form.plant" id="plant" name="plant" >
              </select>
            </div>
            <!--workshop 必填-->            
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Workshop 车间
              </label>           
              <select :disabled="readonly" @change="changePlantWorkshop()" v-if="form.plant!='' " v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant" v-model="form.workshop" id="workshop" name="workshop" >
              </select>              
              <select :disabled="readonly" v-if="form.plant=='' " :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant"  v-model="form.workshop" id="workshop" name="workshop">
              <option value= "">--Please Select--</option>
              </select>
            </div>
            <!--Area -->
            <div class="form-group col-md-3" v-if="form.workshop=='' || form.workshop==null || form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'">  
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Area 区域
              </label>
              <!-- 必填-->
              <select :disabled="readonly" v-if="form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'"  :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area">
              </select>
              <!-- 非必填
              <select v-else-if="form.workshop=='6' || form.workshop=='7' || form.workshop=='8' || form.workshop=='9' || form.workshop=='11' || form.workshop=='12'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              </select>-->
              <select :disabled="readonly" v-else-if="form.workshop=='' || form.workshop==null" :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              <option value= "">--Please Select--</option>
              </select>
            </div>

            <!--
            <form-group col="md-3" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrPlant" :uri="this.uriWorkshop" other-rules="required" :disabled="readonly" v-model="form.workshop" name="workshop" label="ConstructionWorkPermit.workshop"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrArea" :uri="this.uriArea" :other-rules="areaRequired" :disabled="readonly" v-model="form.area" name="area" label="ConstructionWorkPermit.area"></form-group>
            -->
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Location Details 详细地点</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('locationDetails')}" rows="1" v-model="form.locationDetails" name="locationDetails" :readonly="readonly" id="locationDetails" placeholder="" v-validate="'required'"  @blur="locationDetailsCheck" ></textarea>
            </div>
          </div>
          <div class="row">
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.locationDetails" name="locationDetails" :disabled="readonly" label="ConstructionWorkPermit.locationDetails"></form-group>
            -->
            <!--
              <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.vendorName" name="vendorName" :disabled="readonly" label="ConstructionWorkPermit.vendorName"></form-group>
						-->
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteResponsibilityPerson" name="onSiteResponsibilityPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteResponsibilityPerson"></form-group>
					  <form-group col="md-3" type="input" other-rules="required|max:300" @change="checkTelephone" v-model="form.telephone" name="telephone" :disabled="readonly" label="ConstructionWorkPermit.telephone"></form-group>
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Operator 作业人</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('operator') }" rows="1" v-model="form.operator" name="operator" :readonly="readonly" id="operator" placeholder="" v-validate="'required'"  @blur="operatorCheck" ></textarea>
            </div>
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.onSiteSupervisorPerson" name="onSiteSupervisorPerson" :disabled="readonly" label="ConstructionWorkPermit.onSiteSupervisorPerson"></form-group>
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.operator" name="operator" :disabled="readonly" label="ConstructionWorkPermit.operator"></form-group>
						-->
          </div>
          <div class="row">
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Vendor Name/VWATJ Operation Dept. 项目施工单位/VWATJ 作业部门</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('vendorName') }" rows="1" v-model="form.vendorName" name="vendorName" :readonly="readonly" id="vendorName" placeholder="" v-validate="'required'"  @blur="vendorNameCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>




    <!--作业内容-->
    <div class="box box-primary" id="DescriptionOperationDiv" v-if="this.constructionPermitShow || this.energyMediumShow || this.hotPermitShow || this.heightPermitShow  || this.spacePermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Description of Operation 作业内容</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Description of Operations 作业内容简述</label>
              &nbsp;&nbsp;&nbsp;&nbsp;<font color="gray">Please fill out by Chinese & English or Chinese&Germany. 请用中英或中德填写。</font>
            
            <form-group haslable="false" type="textarea2" other-rules="required" v-model="form.descriptionOperations" name="descriptionOperations" :readonly="readonly" label="ConstructionWorkPermit.descriptionOperations"></form-group>
          </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="HotDiv3" v-if="this.hotPermitShow || this.spacePermitShow || this.otherDangerousShow">
      <div class="box-header with-border">
        <!-- <i class="fa fa-asterisk text-required text-required-title"></i> -->
			  <h3 class="box-title">Operators Certificate 人员证件</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          
          <div class="row">
            <div class="col-md-12">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" width="20%">Special Operation Type <br />特种作业种类</th>
                <th class="text-center" width="25%">Operator Name <br />持证人姓名</th>
                <th class="text-center" width="25%">Certificate No <br />证件号</th>
                <th class="text-center" v-if="readonly" width="25%">Certificate Expiry Date <br />证件有效期至</th>
                <th class="text-center" v-if="!readonly" width="20%">Certificate Expiry Date <br />证件有效期至</th>
                <th  width="5%" v-if="!readonly" class="text-center" > <!--v-if="!readonly"-->
                  <a href="javascript:;" @click="insertItineraryRowsOperators()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                </th>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.operatorsCertificateList" style="height: 15px;">
                <td class="text-center">{{index+1}}
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <input type="hidden" class="form-control" id="" v-model="entry.item">
                  <!--
                  <form-group type="input" other-rules="required" haslable="false" disabled="readonly" :name="'item'+(index+1)" :id="'item'+index" v-model="entry.item"  ></form-group>				
                  -->
                </td>
                <td  style="table-layout:fixed;word-break:break-all;width:250px;">
                  <form-group type="select" uri="/dict/list?groupName=SpecialOperationType" haslable="false" :disabled="readonly" :name="'specialOperationType'+(index+1)" :id="'specialOperationType'+index" v-model="entry.specialOperationType"></form-group>
                </td>
                <td>
                  <form-group type="input" other-rules="max:300" haslable="false" :disabled="readonly"  :name="'operatorName'+(index+1)" :id="'operatorName'+index" v-model="entry.operatorName"  ></form-group>				
                </td>
                <td>
                  <form-group type="input" other-rules="max:300" haslable="false" :disabled="readonly"  :name="'certificateNo'+(index+1)" :id="'certificateNo'+index" v-model="entry.certificateNo"  ></form-group>				
                </td>
                <td>
                  <form-group type="datepicker" dateformate="yyyy-mm-dd" haslable="false" :disabled="readonly"  :name="'certificateExpiryDate'+(index+1)" :id="'certificateExpiryDate'+index" v-model="entry.certificateExpiryDate"  ></form-group>				
                </td>
                <td v-if="!readonly" class="text-center" style="vertical-align: middle;">
                  <a href="javascript:;" @click="deleteItineraryRowsOperators(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                </td>
              </tr>
              <tr >
                <td colspan="4" class="text-right">
                  <label>Total Number 总人数：</label>
                </td>
                <td>
                  <form-group type="input" haslable="false" v-model="form.totalNumber" name="totalNumber" :disabled="readonly" label="ConstructionWorkPermit.totalNumber"></form-group>
                </td>
                <td v-if="!readonly"></td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>
          <!--
          <div class="row">
            <div class="form-group col-md-3">
              <label>Total Number 总人数</label>
            </div>
            <div class="form-group col-md-3">
              <form-group type="input" haslable="false" v-model="form.totalNumber" name="totalNumber" :disabled="readonly" label="ConstructionWorkPermit.totalNumber"></form-group>
            </div>
          </div>-->
        </div>
      </form>
    </div>

    <div class="box box-primary" id="HotDiv4" v-if="this.hotPermitShow">
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Main Devices and Materials 主要作业设备及材料</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Angle Grinder 角磨机"> Angle Grinder 角磨机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Compressed Gas Cylinder 压缩气体钢瓶"> Compressed Gas Cylinder 压缩气体钢瓶
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Drilling Machine 钻孔机"> Drilling Machine 钻孔机
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Hazardous Chemical 危险化学品"> Hazardous Chemical 危险化学品
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Ladder 梯子"> Ladder 梯子
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Lift Truck 升降车"> Lift Truck 升降车
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Scaffold 脚手架"> Scaffold 脚手架
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Torch Cutting Machine 气割设备"> Torch Cutting Machine 气割设备
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Welding Machine 焊机"> Welding Machine 焊机
                </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHotMainDevicesMaterials" v-model="hotMainDevicesMaterialsArray" :disabled="readonly" value="Other Equipment/Material 其他设备或材料"> Other Equipment/Material 其他设备或材料
              </label>
            </div>
            <div class="form-group col-md-3">
              <textarea v-if="hotMainDevicesMaterialsOther" style="resize:vertical;font-weight:normal;width:100%;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('hotEquipmentName')}" rows="1"  v-model="form.hotEquipmentName" name="hotEquipmentName" :readonly="readonly" id="hotEquipmentName" placeholder="" v-validate="'required'"  @blur="hotEquipmentNameOthersCheck" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="HotDiv5" v-if="this.hotPermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Personal Protective Equipment and Fire Fighting Equipment 个人防护用品及消防器材</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-6">
              <label>Personal Protective Equipment 个人防护用品</label>
              <form-group  haslable="false" type="textarea2" v-model="form.hotPersonalProtectiveEquipment" name="hotPersonalProtectiveEquipment" :readonly="readonly" label="ConstructionWorkPermit.hotPersonalProtectiveEquipment"></form-group>
            </div>
            <div class="form-group col-md-6">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Fire Fighting Equipment (At Least 2 Extinguishers) 消防器材（至少2台灭火器）</label>
              <form-group haslable="false" type="textarea2" other-rules="required" v-model="form.hotFireFightingEquipment" name="hotFireFightingEquipment" :readonly="readonly" label="ConstructionWorkPermit.hotFireFightingEquipment"></form-group>
            </div>
            <!--
            <div class="form-group col-md-12">
              <label>Personal Protective Equipment 个人防护用品</label>
              <textarea style="resize:vertical;font-weight:normal;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('hotPersonalProtectiveEquipment') }" rows="2" v-model="form.hotPersonalProtectiveEquipment" name="hotPersonalProtectiveEquipment" :readonly="readonly" id="hotPersonalProtectiveEquipment" placeholder="Personal Protective Equipment 个人防护用品" @blur="hotPersonalProtectiveEquipmentCheck" ></textarea>
            </div>
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title"></i>Fire Fighting Equipment (At Least 2 Extinguishers) 消防器材（至少2台灭火器）</label>
              <textarea style="resize:vertical;font-weight:normal;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('hotFireFightingEquipment') }" rows="2" v-model="form.hotFireFightingEquipment" name="hotFireFightingEquipment" :readonly="readonly" id="hotFireFightingEquipment" placeholder="Fire Fighting Equipment (At Least 2 Extinguishers) 消防器材（至少2台灭火器）" v-validate="'required'"  @blur="hotFireFightingEquipmentCheck" ></textarea>
            </div>
            
            <form-group col="md-3" type="input" other-rules="max:300" v-model="form.hotPersonalProtectiveEquipment" name="hotPersonalProtectiveEquipment" :disabled="readonly" label="ConstructionWorkPermit.hotPersonalProtectiveEquipment"></form-group>
					  <form-group col="md-6" type="input" other-rules="required|max:300" v-model="form.hotFireFightingEquipment" name="hotFireFightingEquipment" :disabled="readonly" label="ConstructionWorkPermit.hotFireFightingEquipment"></form-group>
            -->
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="HeightDiv3" v-if="this.heightPermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Simple Risk Assessment 简单的风险评估</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <!--Risk in the Work 此次作业中的风险-->
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Risk in the Work 此次作业中的风险</label><br />
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightRiskInWork" v-model="heightRiskInWorkArray" :disabled="readonly" value="Falling 坠落"> Falling 坠落
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightRiskInWork" v-model="heightRiskInWorkArray" :disabled="readonly" value="Falling Objects 坠物"> Falling Objects 坠物
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightRiskInWork" v-model="heightRiskInWorkArray" :disabled="readonly" value="Slipping Stumbling 滑倒、绊倒"> Slipping, Stumbling 滑倒、绊倒
              </label>
            </div>
            <div class="form-group col-md-3">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <label style="font-weight:normal">
                      <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightRiskInWork" v-model="heightRiskInWorkArray" :disabled="readonly" value="Others 其他"> Others 其他
                    </label>
                  </td>
                  <td>
                    <textarea v-if="heightRiskInWorkOther" style="resize:vertical;font-weight:normal;width:100%;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('heightRiskName')}" rows="1" v-model="form.heightRiskName" name="heightRiskName" :readonly="readonly" id="heightRiskName" placeholder="" v-validate="'required'"  @blur="heightRiskNameOthersCheck" ></textarea>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="row">
            <!--Corresponding Prevention Measures 相应的防护措施-->
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Corresponding Prevention Measures 相应的防护措施</label><br />
            </div>

            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPrevention" v-model="heightPreventionArray" :disabled="readonly" value="Guardrail 护栏"> Guardrail 护栏
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPrevention" v-model="heightPreventionArray" :disabled="readonly" value="Ladder 梯子"> Ladder 梯子
              </label>
              &nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPrevention" v-model="heightPreventionArray" :disabled="readonly" value="Lift Truck 升降车"> Lift Truck 升降车
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPrevention" v-model="heightPreventionArray" :disabled="readonly" value="Platform 平台"> Platform 平台
              </label>
              &nbsp;&nbsp;&nbsp;
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPrevention" v-model="heightPreventionArray" :disabled="readonly" value="Scaffold 脚手架"> Scaffold 脚手架
              </label>              
            </div>
            <div class="form-group col-md-3">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <label style="font-weight:normal">
                      <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPrevention" v-model="heightPreventionArray" :disabled="readonly" value="Others 其他"> Others 其他
                    </label>
                  </td>
                  <td>
                    <textarea v-if="heightPreventionMeasuresOther" style="resize:vertical;font-weight:normal;width:100%;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('heightPreventionMeasures')}" rows="1" v-model="form.heightPreventionMeasures" name="heightPreventionMeasures" :readonly="readonly" id="heightPreventionMeasures" placeholder="" v-validate="'required'"  @blur="heightPreventionMeasuresOthersCheck" ></textarea>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="row">
            <!--Corresponding Protective Measures 相应的保护措施-->
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Corresponding Protective Measures 相应的保护措施</label><br />
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightProtective" v-model="heightProtectiveArray" :disabled="readonly" value="Grab Catcher 抓绳器"> Grab Catcher 抓绳器
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightProtective" v-model="heightProtectiveArray" :disabled="readonly" value="Safety Belt 安全带"> Safety Belt 安全带
              </label>
            </div>            
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightProtective" v-model="heightProtectiveArray" :disabled="readonly" value="Speed Differential 速差器"> Speed Differential 速差器
              </label>
            </div>
            <div class="form-group col-md-3">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <label style="font-weight:normal">
                      <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightProtective" v-model="heightProtectiveArray" :disabled="readonly" value="Others 其他"> Others 其他
                    </label>
                  </td>
                  <td>
                    <textarea v-if="heightProtectiveMeasuresOther" style="resize:vertical;font-weight:normal;width:100%;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('heightProtectiveMeasures')}" rows="1" v-model="form.heightProtectiveMeasures" name="heightProtectiveMeasures" :readonly="readonly" id="heightProtectiveMeasures" placeholder="" v-validate="'required'"  @blur="heightProtectiveMeasuresOthersCheck" ></textarea>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          
          <div class="row">
            <!--Hanging Point Selection 挂点的选择-->
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Hanging Point Selection 挂点的选择</label><br />
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPoint" v-model="heightPointArray" :disabled="readonly" value="Dedicated Hanging Point 专用挂点"> Dedicated Hanging Point 专用挂点
              </label>
            </div>
            <div class="form-group col-md-3">
              <label style="font-weight:normal">
                <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPoint" v-model="heightPointArray" :disabled="readonly" value="Lifeline 生命线"> Lifeline 生命线
              </label>
            </div>
            <div class="form-group col-md-3">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <label style="font-weight:normal">
                      <input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" @change="checkHeightPoint" v-model="heightPointArray" :disabled="readonly" value="Others 其他"> Others 其他
                    </label>
                  </td>
                  <td>
                    <textarea v-if="heightHangingPointSelectionOther" style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('heightHangingPointName')}" rows="1" id="heightHangingPointName" v-model="form.heightHangingPointName" name="heightHangingPointName" :readonly="readonly"  placeholder="" v-validate="'required'"  @blur="heightHangingPointNameOthersCheck" ></textarea>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="SpaceDiv4" v-if="this.spacePermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Main Hazards 主要危害因素</h3>
			</div>
      <form role="form">
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Main Hazards 主要危害因素</label>
              &nbsp;&nbsp;<font color="gray">Please fill out by Chinese & English or Chinese&Germany. 请用中英或中德填写。</font>
            </div>
            <form-group col="md-12" haslable="false" limit="3000" type="textarea2" other-rules="required" v-model="form.spaceMainHazards" name="spaceMainHazards" :readonly="readonly" label="ConstructionWorkPermit.spaceMainHazards"></form-group>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="SpaceDiv5" v-if="this.spacePermitShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Sampling Data 抽样数据</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <!--class="table table-bordered mar-bot-0"
              samplingDataRowspan={{this.samplingDataRowspan}};
              spaceSamplingDataList.length={{this.form.spaceSamplingDataList.length}}-->
              <table class="table table-bordered table-hover table-permanent-position" width="100%" id="SamplingDataTable">
								<tbody>
                  <tr>
                    <th class="text-center is-safe" style="width: 10%; vertical-align:middle" :rowspan="samplingDataRowspan">Sampling Analysis Data <br />采样分析数据</th>
                    <th class="text-center is-safe" style="width: 15%;vertical-align:middle" rowspan="2">Inspection Project <br />检测项目</th>
                    <th class="text-center is-safe" style="width: 13%;vertical-align:middle" rowspan="2">Oxygen Content <br />含氧量</th>
                    <th class="text-center is-safe" style="width: 12%;vertical-align:middle" rowspan="2">Combustible Gas Concentration <br />可燃气体浓度</th>
                    <th class="text-center is-safe" colspan="4">Toxic and Harmful Gas or Dust Concentration <br />有毒有害气体或粉尘浓度</th>
                    <th class="text-center is-safe" v-if="readonly" style="width: 25%; vertical-align:middle" rowspan="2">Inspection Time <br />检测时间</th>
                    <th class="text-center is-safe" v-if="!readonly" style="width: 20%; vertical-align:middle" rowspan="2">Inspection Time <br />检测时间</th>
                    <th  width="5%" v-if="!readonly" class="text-center is-safe" style="vertical-align:middle" rowspan="2"> <!--v-if="!readonly"-->
                      <a href="javascript:;" @click="insertItineraryRowsSamplingData()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                    </th>
                  </tr>
                  <tr>
                    <td style="width: 6%;" class="text-center is-safe">
                      <form-group type="input" haslable="false" v-model="form.spaceToxicHarmfulGas1" name="spaceToxicHarmfulGas1" id="spaceToxicHarmfulGas1" :readonly="readonly" ></form-group>
                    </td>
                    <td style="width: 6%;" class="text-center is-safe">
                      <form-group type="input" haslable="false" v-model="form.spaceToxicHarmfulGas2" name="spaceToxicHarmfulGas2" id="spaceToxicHarmfulGas2" :readonly="readonly" ></form-group>
                    </td>
                    <td style="width: 6%;" class="text-center is-safe">
                      <form-group type="input" haslable="false" v-model="form.spaceToxicHarmfulGas3" name="spaceToxicHarmfulGas3" id="spaceToxicHarmfulGas3" :readonly="readonly" ></form-group>
                    </td>
                    <td style="width: 7%;" class="text-center is-safe">
                      <form-group type="input" haslable="false" v-model="form.spaceToxicHarmfulGas4" name="spaceToxicHarmfulGas4" id="spaceToxicHarmfulGas4" :readonly="readonly" ></form-group>
                    </td>
                  </tr>

                  <tr v-bind:key="index" v-for="(entry,index) in form.spaceSamplingDataList" style="height: 15px;">
                    <td class="text-center is-safe">
                      <input type="hidden" class="form-control" id="" v-model="entry.id">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.inspectionProject" :name="'inspectionProject'+(index+1)" :id="'inspectionProject'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.oxygenContent" :name="'oxygenContent'+(index+1)" :id="'oxygenContent'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.combustibleGasConcentration" :name="'combustibleGasConcentration'+(index+1)" :id="'combustibleGasConcentration'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.toxicHarmfulGas1" :name="'toxicHarmfulGas1'+(index+1)" :id="'toxicHarmfulGas1'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.toxicHarmfulGas2" :name="'toxicHarmfulGas2'+(index+1)" :id="'toxicHarmfulGas2'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.toxicHarmfulGas3" :name="'toxicHarmfulGas3'+(index+1)" :id="'toxicHarmfulGas3'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe">
                      <form-group type="input" haslable="false" other-rules="max:300" v-model="entry.toxicHarmfulGas4" :name="'toxicHarmfulGas4'+(index+1)" :id="'toxicHarmfulGas4'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td class="text-center is-safe" style="overflow: auto;" >
                      <form-group type="timepicker2" haslable="false" other-rules="max:300" v-model="entry.inspectionTime" :name="'inspectionTime'+(index+1)" :id="'inspectionTime'+index" :readonly="readonly" ></form-group>
                    </td>
                    <td v-if="!readonly" class="text-center is-safe" style="vertical-align: middle;">
                      <a href="javascript:;" @click="deleteItineraryRowsSamplingData(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="8" class="text-right">
                  <label>Inspector Name 检测人员：</label></td>
                    <td>
                      <form-group haslable="false" type="input" label="ConstructionWorkPermit.spaceInspectorName" other-rules="max:300" v-model="form.spaceInspectorName" name="spaceInspectorName" :readonly="readonly" ></form-group>
                    </td>
                    <td v-if="!readonly"></td>
                  </tr>
								</tbody>
              </table>
            </div>
            
          </div>
        </div>
      </form>
    </div>

    

    <div class="box box-primary" id="OtherDangerousDiv3" v-if="this.otherDangerousShow">
      <div class="box-header with-border"><!--
        <i class="fa fa-asterisk text-required text-required-title"></i>-->
			  <h3 class="box-title">Working Area 施工区域</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <!--
            <form-group col="md-3" @change="changePlant()" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            -->
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Plant 工厂
              </label>  
              <select :disabled="readonly" @change="changePlant()" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('plant') }" v-validate="'required'" uri="/constructionWorkPermit/plant" v-model="form.plant" id="plant" name="plant" >
              </select>
            </div>
            <!--workshop 必填-->            
            <div class="form-group col-md-3">
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Workshop 车间
              </label>           
              <select :disabled="readonly" @change="changePlantWorkshop()" v-if="form.plant!='' " v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant" v-model="form.workshop" id="workshop" name="workshop" >
              </select>              
              <select :disabled="readonly" v-if="form.plant=='' " :class="{'form-control':true,'input':true, 'is-danger': errors.has('workshop') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshop?plantId='+form.plant"  v-model="form.workshop" id="workshop" name="workshop">
              <option value= "">--Please Select--</option>
              </select>
            </div>
            <!--Area -->
            <div class="form-group col-md-3" v-if="form.workshop=='' || form.workshop==null || form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'">  
              <label>
                <i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
                Area 区域
              </label>
              <!-- 必填-->
              <select :disabled="readonly" v-if="form.workshop=='1' || form.workshop=='2' || form.workshop=='3' || form.workshop=='4' || form.workshop=='5' || form.workshop=='10'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'"  :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area">
              </select>
              <!-- 非必填
              <select v-else-if="form.workshop=='6' || form.workshop=='7' || form.workshop=='8' || form.workshop=='9' || form.workshop=='11' || form.workshop=='12'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              </select>-->
              <select :disabled="readonly" v-else-if="form.workshop=='' || form.workshop==null" :class="{'form-control':true,'input':true, 'is-danger': errors.has('area') }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+form.workshop" v-model="form.area" id="area" name="area" >
              <option value= "">--Please Select--</option>
              </select>
            </div>

            <!--
            <form-group col="md-3" type="select" uri="/constructionWorkPermit/plant" other-rules="required" :disabled="readonly" v-model="form.plant" name="plant" label="ConstructionWorkPermit.plant"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrPlant" :uri="this.uriWorkshop" other-rules="required" :disabled="readonly" v-model="form.workshop" name="workshop" label="ConstructionWorkPermit.workshop"></form-group>
            <form-group col="md-3" type="select" v-if="this.showArrArea" :uri="this.uriArea" :other-rules="areaRequired" :disabled="readonly" v-model="form.area" name="area" label="ConstructionWorkPermit.area"></form-group>
            -->
            <div class="form-group col-md-3">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Location Details 详细地点</label>
              <textarea style="resize:vertical;font-weight:normal;height:34px;" :class="{'form-control':true,'pull-left': true,'input':true,'is-danger': errors.has('locationDetails')}" rows="1" v-model="form.locationDetails" name="locationDetails" :readonly="readonly" id="locationDetails" placeholder="" v-validate="'required'"  @blur="locationDetailsCheck" ></textarea>
            </div>
            <!--
            <form-group col="md-3" type="input" other-rules="required|max:300" v-model="form.locationDetails" name="locationDetails" :disabled="readonly" label="ConstructionWorkPermit.locationDetails"></form-group>
            -->
          </div>
        </div>
      </form>
    </div>

    

    <!--作业内容-->
    <div class="box box-primary" id="DescriptionOperationDiv2" v-if=" this.otherDangerousShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Description of Operation 作业内容</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Description of Operations 作业内容简述</label>
              <!--&nbsp;&nbsp;&nbsp;&nbsp;请详细描述作业内容，如果作业内容描述不清楚可能会被拒绝。-->
              &nbsp;&nbsp;&nbsp;&nbsp;<font color="gray">Please fill out by Chinese & English or Chinese&Germany. 请用中英或中德填写。</font>
              <form-group haslable="false" type="textarea2" other-rules="required" v-model="form.descriptionOperations" name="descriptionOperations" :readonly="readonly" label="ConstructionWorkPermit.descriptionOperations"></form-group>
            </div>
          </div>
        </div>
      </form>
    </div>



    <!--Energy & Medium Application Information 能源 & 介质申请信息    审批区域-->
    <div class="box box-primary" id="EnergyDiv" v-if="this.energyMediumApproveShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Affected Area and Area Responsible 影响区域和区域负责人</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="col-md-12" id="EnergyTable">
            <table class="table table-bordered mar-bot-0" width="100%" height="15px" id="extendNon">
              <tbody>
              <tr>
                <th class="text-center" width="5%">Item <br />行项</th>
                <th class="text-center" v-if="!energyTwpApproveReadonly" width="18%"><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Workshop <br />车间</th>
                <th class="text-center" v-if="!energyTwpApproveReadonly" width="18%"><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Area <br />区域</th>
                <th class="text-center" v-if="!energyTwpApproveReadonly" width="18%"><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Area Responsible 1 <br />区域负责人1</th>
                <th class="text-center" v-if="!energyTwpApproveReadonly" width="18%">Area Responsible 2 <br />区域负责人2</th>
                <th class="text-center" v-if="!energyTwpApproveReadonly" width="18%">Area Responsible 3 <br />区域负责人3</th>
                
                <th class="text-center" v-if="energyTwpApproveReadonly" width="19%"><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Workshop <br />车间</th>
                <th class="text-center" v-if="energyTwpApproveReadonly" width="19%"><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Area <br />区域</th>
                <th class="text-center" v-if="energyTwpApproveReadonly" width="19%"><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>Area Responsible 1 <br />区域负责人1</th>
                <th class="text-center" v-if="energyTwpApproveReadonly" width="19%">Area Responsible 2 <br />区域负责人2</th>
                <th class="text-center" v-if="energyTwpApproveReadonly" width="19%">Area Responsible 3 <br />区域负责人3</th>
                
                <th  width="5%" v-if="!energyTwpApproveReadonly" class="text-center" > <!--v-if="!readonly"-->
                  <a href="javascript:;" @click="insertItineraryRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a>
                </th>
              </tr>
              <tr v-bind:key="index" v-for="(entry,index) in form.energyAreaList" style="height: 15px;">
                <td class="text-center">{{index+1}}
                  <input type="hidden" class="form-control" id="" v-model="entry.id">
                  <input type="hidden" class="form-control" id="" v-model="entry.item">
                  <!--
                  <form-group type="input" other-rules="required" haslable="false" :disabled="readonly"  :name="'item'+(index+1)" :id="'item'+index" v-model="entry.item"  ></form-group>				
                  -->
                </td>
                <td>
                  <div class="form-group">
                    <select @change="changeWorkshop(index)" :disabled="energyTwpApproveReadonly" :class="{'form-control':true,'input':true, 'is-danger': errors.has('areaResponsibleWorkshop'+index) }" v-validate="'required'" v-select :uri="'/constructionWorkPermit/workshop?plantId='+form.plant" v-model="entry.areaResponsibleWorkshop" :id="'areaResponsibleWorkshop'+index" :name="'areaResponsibleWorkshop'+index" :index="index" >
                    </select>
                  </div>
                  <!--
                  <form-group type="input" other-rules="required|max:100" haslable="false" :disabled="energyTwpApproveReadonly"  :name="'areaResponsibleWorkshop'+(index+1)" :id="'areaResponsibleWorkshop'+index" v-model="entry.areaResponsibleWorkshop"  ></form-group>				
                  -->
                </td>
                <td>
                  <div class="form-group">                
                    <!-- 必填-->
                    <select  :disabled="energyTwpApproveReadonly" v-if="entry.areaResponsibleWorkshop=='1' || entry.areaResponsibleWorkshop=='2' || entry.areaResponsibleWorkshop=='3' || entry.areaResponsibleWorkshop=='4' || entry.areaResponsibleWorkshop=='5' || entry.areaResponsibleWorkshop=='10'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('areaResponsibleArea'+index) }" v-validate="'required'"  :uri="'/constructionWorkPermit/workshopArea?workshopId='+entry.areaResponsibleWorkshop" v-model="entry.areaResponsibleArea" :id="'areaResponsibleArea'+index" :name="'areaResponsibleArea'+index" :index="index" >
                    </select>
                    <!-- 非必填
                    <select v-else-if="entry.areaResponsibleWorkshop=='6' || entry.areaResponsibleWorkshop=='7' || entry.areaResponsibleWorkshop=='8' || entry.areaResponsibleWorkshop=='9' || entry.areaResponsibleWorkshop=='11' || entry.areaResponsibleWorkshop=='12'" v-select :class="{'form-control':true,'input':true, 'is-danger': errors.has('areaResponsibleArea'+index) }" :uri="'/constructionWorkPermit/workshopArea?workshopId='+entry.areaResponsibleWorkshop" v-model="entry.areaResponsibleArea" :id="'areaResponsibleArea'+index" :name="'areaResponsibleArea'+index" :index="index" >
                    </select>-->
                    <select  :disabled="energyTwpApproveReadonly" v-else-if="entry.areaResponsibleWorkshop=='' || entry.areaResponsibleWorkshop==null" :class="{'form-control':true,'input':true, 'is-danger': errors.has('areaResponsibleArea'+index) }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+entry.areaResponsibleWorkshop" v-model="entry.areaResponsibleArea" :id="'areaResponsibleArea'+index" :name="'areaResponsibleArea'+index" :index="index" >
                    <option value= "">--Please Select--</option>
                    </select>
                    <!--
                    <select v-else :class="{'form-control':true,'input':true, 'is-danger': errors.has('areaResponsibleArea'+index) }" v-validate="'required'" :uri="'/constructionWorkPermit/workshopArea?workshopId='+entry.areaResponsibleWorkshop" v-model="entry.areaResponsibleArea" :id="'areaResponsibleArea'+index" :name="'areaResponsibleArea'+index" :index="index" >
                    <option value= "">--Please Select--</option>
                    </select>-->
                  </div>
                  <!--
                  <form-group type="input" other-rules="required|max:100" haslable="false" :disabled="energyTwpApproveReadonly"  :name="'areaResponsibleArea'+(index+1)" :id="'areaResponsibleArea'+index" v-model="entry.areaResponsibleArea"  ></form-group>				
                  -->
                </td>
                <td>
                  <input type="hidden" class="form-control" v-model="form.areaResponsibleShow">
                  <div class="form-group" v-if="!energyTwpApproveReadonly">
                    <div class="input-group ">
                      <input type="hidden" class="form-control" :disabled="energyTwpApproveReadonly" :name="'areaResponsible1'+(index+1)"  v-model="entry.areaResponsible1" :id="'areaResponsible1'+index">
                      <input type="text" class="form-control" :disabled="readonly" :name="'areaResponsible1Name'+(index+1)"  v-model="entry.areaResponsible1Name" :id="'areaResponsible1Name'+index">
                      <span class="input-group-btn" id="selectareaResponsible1">
                        <ChooseAreaResponsible1 :chooseID="'person_tableCWP1_'+index" :tableID="index" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectAreaResponsible1"><i class="fa fa-fw fa-search"></i></ChooseAreaResponsible1>
                      </span>
                    </div>
                  </div>
                  <form-group v-if="energyTwpApproveReadonly"  haslable="false" :disabled="energyTwpApproveReadonly" type="input" v-model="entry.areaResponsible1Name" :name="'areaResponsible1Name'+(index+1)" :id="'areaResponsible1Name'+index"></form-group>
                  <!--
                    <form-group type="input" haslable="false" :disabled="readonly"  :name="'areaResponsible1'+(index+1)" :id="'areaResponsible1'+index" v-model="entry.areaResponsible1"  ></form-group>				
                  -->
                </td>
                <td>
                  <div class="form-group" v-if="!energyTwpApproveReadonly" >
                    <div class="input-group">
                      <input type="hidden" class="form-control" :disabled="energyTwpApproveReadonly" :name="'areaResponsible2'+(index+1)"  v-model="entry.areaResponsible2" :id="'areaResponsible2'+index">
                      <input type="text" class="form-control" :disabled="readonly" :name="'areaResponsible2Name'+(index+1)"  v-model="entry.areaResponsible2Name" :id="'areaResponsible2Name'+index">
                      <span class="input-group-btn" id="selectareaResponsible2">
                        <ChooseAreaResponsible2 :chooseID="'person_tableCWP2_'+index" :tableID="index" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectAreaResponsible2"><i class="fa fa-fw fa-search"></i></ChooseAreaResponsible2>
                      </span>
                    </div>
                  </div>

                  <form-group v-if="energyTwpApproveReadonly"  haslable="false" :disabled="energyTwpApproveReadonly" type="input" v-model="entry.areaResponsible2Name" :name="'areaResponsible2Name'+(index+1)" :id="'areaResponsible2Name'+index"></form-group>

                  <!--
                  <form-group type="input" haslable="false" :disabled="readonly" :name="'areaResponsible2'+(index+1)"  v-model="entry.areaResponsible2" :id="'areaResponsible2'+index"></form-group>				
                  -->
                </td>
                <td>
                  <div class="form-group" v-if="!energyTwpApproveReadonly">
                    <div class="input-group ">
                      <input type="hidden" class="form-control" :disabled="energyTwpApproveReadonly" :name="'areaResponsible3'+(index+1)"  v-model="entry.areaResponsible3" :id="'areaResponsible3'+index">
                      <input type="text" class="form-control" :disabled="readonly" :name="'areaResponsible3Name'+(index+1)"  v-model="entry.areaResponsible3Name" :id="'areaResponsible3Name'+index">
                      <span class="input-group-btn" id="selectareaResponsible3">
                        <ChooseAreaResponsible :chooseID="'person_tableCWP_'+index" :tableID="index" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectAreaResponsible"><i class="fa fa-fw fa-search"></i></ChooseAreaResponsible>
                      </span>
                    </div>
                  </div>

                  <form-group v-if="energyTwpApproveReadonly"  haslable="false" :disabled="energyTwpApproveReadonly" type="input" v-model="entry.areaResponsible3Name" :name="'areaResponsible3Name'+(index+1)" :id="'areaResponsible3Name'+index"></form-group>
                  <!--
                  <div class="form-group"  v-if="energyTwpApproveReadonly">
                    <div class="input-group ">
                      <input type="hidden" class="form-control" :disabled="energyTwpApproveReadonly" :name="'areaResponsible3'+(index+1)"  v-model="entry.areaResponsible3" :id="'areaResponsible3'+index">
                      <input type="text" class="form-control" :disabled="energyTwpApproveReadonly" :name="'areaResponsible3Name'+(index+1)"  v-model="entry.areaResponsible3Name" :id="'areaResponsible3Name'+index">
                    </div>
                  </div>-->
                </td>
                <td v-if="!energyTwpApproveReadonly" class="text-center" style="vertical-align: middle;">
                  <a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
                      
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="EnergyDiv2" v-if="this.energyMediumApproveShow">
      <div class="box-header with-border">
			  <h3 class="box-title">Confirm the Affected Area and Scope 确认影响区域和范围</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label><i class="fa fa-asterisk text-required text-required-title" style="font-size: 10px;"></i>
              Confirm the Affected Area and Scope 确认影响区域和范围</label>
              &nbsp;&nbsp;<font color="gray">Please fill out by Chinese & English or Chinese&Germany. 请用中英或中德填写。</font>
            </div>
            <form-group col="md-12" haslable="false" type="textarea2" other-rules="required" v-model="form.energyConfirmAreaScope" name="energyConfirmAreaScope" :readonly="energyTwpApproveReadonly" label="ConstructionWorkPermit.energyConfirmAreaScope"></form-group>
          </div>
          <!--样式与demo不一致  uploadLimit="5" upload6 -->
          <div class="row">
            <upload3 class="col-md-11" :readonly="energyTwpApproveReadonly" fileSizeLimit="10MB" v-model="form.energyAttachmentIds" buttonText="Attachments" :attachments="form.energyAttachments" multi="true" required="false"></upload3>
					</div>
        </div>
      </form>
    </div>

    <!--审批信息  Confine Space Permit /有限空间许可证  Work at Height Permit /高处作业许可证  Hot Work Permit /动火作业许可证  -->
    <div class="box box-primary" id="VerificationBeforeWorkingDivHot" v-if="this.hotPermitApproveShow"><!--v-if="this.energyMediumShow"-->
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Verification Before Working 作业前验证</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
            <table style="width:100%;">
              <tbody>
                <tr>
                  <td style="width:60%;">1. Is there any combustible material around?&nbsp;周围是否有可燃物？</td>
                  <td style="width:20%;">
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork1" name="hotVerificationBeforeWork1" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td style="width:20%;">
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork1" name="hotVerificationBeforeWork1" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>2. Do the relevant personnel wear appropriate protective equipment?&nbsp;相关人员是否佩戴合适的防护用品？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork2" name="hotVerificationBeforeWork2" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork2" name="hotVerificationBeforeWork2" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>             
                </tr>
                <tr>
                  <td>3. Is the correct fire equipment equipped?&nbsp;是否配备了正确的消防器材？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork3" name="hotVerificationBeforeWork3" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork3" name="hotVerificationBeforeWork3" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>4. Can the operator use fire equipment?&nbsp;作业人员是否会使用消防器材？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork4" name="hotVerificationBeforeWork4" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork4" name="hotVerificationBeforeWork4" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>5. Is the equipment properly grounded?&nbsp;设备是否适当接地？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork5" name="hotVerificationBeforeWork5" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork5" name="hotVerificationBeforeWork5" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>6. Is there any flammable material around?&nbsp;周围是否有可燃物？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork6" name="hotVerificationBeforeWork6" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork6" name="hotVerificationBeforeWork6" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>7. Is the welding slag effectively collected and isolated?&nbsp;是否对焊渣进行了有效收集和隔离防护？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork7" name="hotVerificationBeforeWork7" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork7" name="hotVerificationBeforeWork7" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>                  
                </tr>
                <tr>
                  <td>8. Are the nearby people informed of the risks?&nbsp;附近人员是否被告知风险？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork8" name="hotVerificationBeforeWork8" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork8" name="hotVerificationBeforeWork8" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>9. Are the operators qualified and trained?&nbsp;作业人员是否有相关资质并接受了培训？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork9" name="hotVerificationBeforeWork9" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="hotApproveReadonly" v-model="form.hotVerificationBeforeWork9" name="hotVerificationBeforeWork9" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <!--
                <tr>
                  <td style="height:40px;font-weight:bold;" >Signature of on-site responsibility person:&nbsp;作业单位现场负责人签字确认：</td>
                  <td colspan="2"></td>
                </tr>  -->              
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="VerificationBeforeWorkingDivSpace" v-if="this.spacePermitApproveShow"><!--v-if="this.energyMediumShow"-->
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Verification Before Working 作业前验证</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <table style="width:100%;">
              <tbody>
                <tr>
                  <td style="width:60%;">1. Are the operators qualified and trained?&nbsp;作业人员是否有相关资质并接受了培训？</td>
                  <td style="width:20%;">
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork1" name="spaceVerBeforeWork1" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td style="width:20%;">
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork1" name="spaceVerBeforeWork1" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>2. Are the people and instruments that have been continuously tested in place?&nbsp;连续测试的人员和仪器已就位？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork2" name="spaceVerBeforeWork2" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork2" name="spaceVerBeforeWork2" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>             
                </tr>
                <tr>
                  <td>3. Is the test instrument accurate and reliable?&nbsp;测试用仪器是否准确可靠？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork3" name="spaceVerBeforeWork3" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork3" name="spaceVerBeforeWork3" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>4. Is the emergency protective equipment in place?&nbsp;应急防护用品是否已就位？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork4" name="spaceVerBeforeWork4" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork4" name="spaceVerBeforeWork4" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>5. Is the ventilation and exhaust condition good?&nbsp;通风排气情况是否良好？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork5" name="spaceVerBeforeWork5" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork5" name="spaceVerBeforeWork5" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>6. Is the oxygen concentration and harmful gas test results qualified?&nbsp;氧气浓度、有害气体检测结果是否合格？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork6" name="spaceVerBeforeWork6" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork6" name="spaceVerBeforeWork6" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>                  
                </tr>
                <tr>
                  <td>7. Is the lighting facility in place?&nbsp;照明设施已就位？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork7" name="spaceVerBeforeWork7" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork7" name="spaceVerBeforeWork7" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>                  
                </tr>
                <tr>
                  <td>8. Personal protective equipment and anti-virus equipment are in place?&nbsp;个人防护用品及防毒用具已就位？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork8" name="spaceVerBeforeWork8" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork8" name="spaceVerBeforeWork8" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>9. Is the ventilation equipment in place?&nbsp;通风设备是否已就位？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork9" name="spaceVerBeforeWork9" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork9" name="spaceVerBeforeWork9" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>10. Are other supplementary measures completed?&nbsp;其他补充措施已完成？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork10" name="spaceVerBeforeWork10" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="spaceApproveReadonly" v-model="form.spaceVerBeforeWork10" name="spaceVerBeforeWork10" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <!--
                <tr>
                  <td style="height:40px;font-weight:bold;" >Signature of on-site supervisor person:&nbsp;作业监护人员签字确认：</td>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td style="height:40px;font-weight:bold;" >Safety officer signature of Vender/VWATJ:&nbsp;作业单位安全员签字确认：</td>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td style="height:40px;font-weight:bold;" >Signature of on-site responsibility person:&nbsp;作业单位现场负责人签字确认：</td>
                  <td colspan="2"></td>
                </tr> 
                -->
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="box box-primary" id="VerificationBeforeWorkingDivHeight" v-if="this.heightPermitApproveShow"><!--v-if="this.energyMediumShow"-->
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Verification Before Working 作业前验证</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <table style="width:100%;">
              <tbody>
                <tr>
                  <td style="width:60%;">1. Is there a safe protection solution for work at heights?&nbsp;高处作业是否有安全的防护方案？</td>
                  <td style="width:20%;">
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork1" name="heightVerBeforeWork1" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td style="width:20%;">
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork1" name="heightVerBeforeWork1" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>2. Do the relevant personnel wear appropriate protective equipment?&nbsp;相关人员是否佩戴合适的防护用品？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork2" name="heightVerBeforeWork2" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork2" name="heightVerBeforeWork2" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>             
                </tr>
                <tr>
                  <td>3. Are all protective equipment in good condition?&nbsp;所有的防护用品是否状态良好？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork3" name="heightVerBeforeWork3" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork3" name="heightVerBeforeWork3" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>4. Does the work at the height have a reasonable ascending channel?&nbsp;高处作业是否具备合理的上升通道？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork4" name="heightVerBeforeWork4" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork4" name="heightVerBeforeWork4" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>5. Is the work area isolated and alerted?&nbsp;作业区域是否进行了隔离和警示？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork5" name="heightVerBeforeWork5" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork5" name="heightVerBeforeWork5" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>6. Are the nearby people informed of the risks?&nbsp;附近人员是否被告知风险？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork6" name="heightVerBeforeWork6" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork6" name="heightVerBeforeWork6" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>                  
                </tr>
                <tr>
                  <td>7. Are the operators qualified and trained?&nbsp;作业人员是否有相关资质并接受了培训？</td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork7" name="heightVerBeforeWork7" value="Yes 是" >
                    Yes 是
                    </label>
                  </td>
                  <td>
                    <label style="font-weight:normal">
                    <input type="radio" style="height:20px; vertical-align:middle; margin-top:0;" :disabled="heightApproveReadonly" v-model="form.heightVerBeforeWork7" name="heightVerBeforeWork7" value="Not Involve 不涉及" >
                    Not Involve 不涉及
                    </label>
                  </td>
                </tr>
                <!--
                <tr>
                  <td style="height:40px;font-weight:bold;" >Signature of on-site responsibility person:&nbsp;作业单位现场负责人签字确认：</td>
                  <td colspan="2"></td>
                </tr>-->          
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </form>
    </div>

    
    <!--4种类型有  createURI=='ehs' || this.form.permitType=='ehs' || -->
    <div class="box box-primary" v-if="this.form.permitCategory!=null && this.form.permitCategory!='' && (this.form.permitCategory!='Construction Permit' && this.form.permitCategory!='Energy & Medium Application') ">
      <div class="box-header with-border">
			  <h3 class="box-title" v-if="!readonly">Upload Attachment <label>上传附件</label>
          <span class="text-muted-upload">&nbsp;&nbsp;<i class="fa  fa-info-circle" ></i>&nbsp;
          Please upload special operation certificate/ company qualification. 请上传特种作业证/公司资历。</span>
        </h3>
        <h3 class="box-title" v-else >Attachment <label>附件</label>
          <span class="text-muted-upload">&nbsp;&nbsp;<i class="fa  fa-info-circle" ></i>&nbsp;
          Please upload special operation certificate/ company qualification. 请上传特种作业证/公司资历。</span>
        </h3>
			</div>
      <form role="form">
				<div class="box-body">
					<div class="row">
            <upload3 class="col-md-11" :readonly="readonly" v-model="form.attachmentIds" buttonText="Attachments" :attachments="form.cwpAttachments" multi="true" required="false"></upload3>
          </div>
        </div>
      </form>
    </div>

    <!--Other Dangerous Work /其他危险作业 createURI=='ehs' || this.form.permitType=='ehs' || -->
    <div class="box box-primary" id="Commitment" v-if="this.form.permitCategory!=null && this.form.permitCategory!='' && (this.form.permitCategory!='Construction Permit' && this.form.permitCategory!='Energy & Medium Application') "><!--v-if="this.otherDangerousApproveShow"-->
      <div class="box-header with-border">
        <i class="fa fa-asterisk text-required text-required-title"></i>
			  <h3 class="box-title">Commitment 承诺</h3>
			</div>
      <form role="form"> 
				<div class="box-body">
          <div class="row">
            <div class="form-group col-md-12">
              <label style="font-weight:normal">
                <a href="###" @click="goRequirement" ><!--target="_blank"-->
                Dangerous Work Safety Measures and Requirement 危险作业安全措施及要求</a>
              </label>
              <div class="checkbox mar-bot-5">
                <label style="font-weight:normal">
                  <input name="dangerousCommitment" @change="commitmentCheck" :disabled="readonly" v-model="dangerousCommitment" type="checkbox" value="Yes" >
                  We fully understand this license's "Hazardous Operations Safety Measures and Requirements"(9 Items, 34 Articles) as well as other relevant local and national standards and regulations. We commit to the strict implementation of these safety measures, requirements, standards and regulations during the course of the relevant operations and are prepared to accept supervisor or inspection from the relevant VWATJ department and /or other relevant parties.
                  <br />
                  我方已明确本许可所包含的“危险作业安全措施及要求”（共9项，34条）以及其他本次危险作业涉及的国家（地方）标准及法律法规；我方承诺在本次作业过程中严格执行这些安全措施、要求、标准及法律法规并随时接受VWATJ相关部门及其他相关方的监督检查。
                  <br /><br />
                </label>
              </div>
              <div class="checkbox mar-bot-5" v-if="!readonly" >
                <label>
                  <span class="help is-danger" v-show="errors.has('terms')">
                      {{$t("checkPolicyNotice")}}
                  </span>
                  <input name="terms" type="checkbox" v-validate="'required'" >
                  <!--When submitting the application, I have read and agreed to relevant policies of Volkswagen Automatic Transmission Tianjin.
                  当提交此申请时，我已经理解并承诺遵守大众汽车变速器（天津）有限公司的相关政策。
                  -->
                  When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
                  当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。
                  <br /><br />
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>


    <div class="checkbox mar-bot-5" v-if="!readonly &&  ( this.form.permitCategory!=null && this.form.permitCategory!='' && (this.form.permitCategory=='Construction Permit' || this.form.permitCategory=='Energy & Medium Application')) " >
      <label>
        <span class="help is-danger" v-show="errors.has('terms')">
						{{$t("checkPolicyNotice")}}
				</span>
        <input name="terms" type="checkbox" v-validate="'required'" >
        <!--When submitting the application, I have read and agreed to relevant policies of Volkswagen Automatic Transmission Tianjin.
        当提交此申请时，我已经理解并承诺遵守大众汽车变速器（天津）有限公司的相关政策。
        -->
        When submitting the application, I have read and agreed to  <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin.</a>
        当提交此申请时，我已经理解并承诺遵守 <a href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank">大众汽车自动变速器（天津）有限公司的相关政策</a>。
        <br /><br />
      </label>
    </div>
	    <!--
      <input type="button"  name="testApprovel" value="测试审批人approvel" @click="beforeapprovel" v-if="this.form.status==1">
      
      <input type="button"  name="testP" value="测试申请人submit" @click="beforesubmit" v-if="this.form.status==2 || this.form.status== null">
      -->
      <comment :approvalComment="approvalComment" v-if="processTaskId !=null && form.status != 9 && form.status != 2 && ckeckInApproveFlow " v-model="form.approval.approvalRemark" name="approval.approvalRemark"></comment>
      
      <Confirmwithsavereject v-if="!signatureShow && processTaskId !=null && form.status != 9 && form.status != 2 && ckeckInApproveFlow" :form="form" :validator="this.$validator" :lableName="lableName" :rejectLableName="rejectLableName" uri="/constructionWorkPermit/save" v-on:beforeapprovel="beforeapprovel" v-on:beforesubmit="beforesubmit"></Confirmwithsavereject>
      <!--CE Permit Responsible 审批 -->
      <div style="margin-top:15px;" v-else-if="signatureShow">
        <!--/signatureuserdevice/uploadsignature  v-on:confirm="confirm"  -->
        <SignatureWithReject ref="signature" uri="/constructionWorkPermit/uploadsignature" saveuri="/constructionWorkPermit/save" geturi="/constructionWorkPermit/fetchSignature" :otherdata="searchTicketNo" :validator="this.$validator" :form="form" v-on:beforeapprovel="beforeapprovel"></SignatureWithReject>
      </div>
      <router-view id="ConstructionWorkPermitSubmit" v-else :form="form" entityId="ConstructionWorkPermit" vclass="btn-left" uri="/form/ConstructionWorkPermit/update" :validator="this.$validator"  v-on:beforesubmit="beforesubmit" v-on:beforeapprovel="beforeapprovel"></router-view>      
      

      <br />
      <comment-list v-if="form.processInstanceId !=null"></comment-list>
      
      <div style="margin-top:15px;" v-if="this.form.cwpSignature && signatureAreaShow">
        <!--CE Permit Responsible 签名的信息结果显示  && this.form.status !=9 && this.form.status !=2 -->
        <div v-if="this.form.cwpSignature.signatureContentSupervisor != null">
          <p>Signature of on-site supervisor person: 作业监护人员签字确认：</p>
          <img :src="this.form.cwpSignature.signatureContentSupervisor" width="100%" height="400" />
        </div>
        <div style="margin-top:15px;" v-if="this.form.cwpSignature.signatureContentOfficer != null">
          <p>Safety officer signature of Vender/VWATJ: 作业单位安全员签字确认：</p>
          <img :src="this.form.cwpSignature.signatureContentOfficer" width="100%" height="400" />
        </div>
        <div style="margin-top:15px;" v-if="this.form.cwpSignature.signatureContentOnsite != null">
          <p v-if="!otherDangerousShow">Signature of on-site responsibility person: 作业单位现场负责人签字确认：</p>
          <p v-if="otherDangerousShow">Signature of responsibility person/ date: （承包商）现场负责人签字/日期：</p>
          <img :src="this.form.cwpSignature.signatureContentOnsite" width="100%" height="400" />
        </div>
      </div>


    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
var ok = false;
export default {
  name: "ConstructionWorkPermit",
  methods: {    
    checkStatus: function(status) {
      //BR.001
      if(status == 1 && this.$route.query.taskKey == null && this.$route.query.processInstanceId == null){
        
        var router = this.$router;
        alertApon("process.env.MODE="+process.env.MODE);//dev
        if(process.env.MODE === 'dev'){//原来是apon  看dev.env.js文件中的配置
          top.location.href = Config.getAPONURL();//看http.js文件 原来是getAPONURL
        }else{
          router.push({ path: '/index/application'});
        }
      }
    },
    onbehalfclick: function() {
			var temp = $("#onbehalf").is(':checked');
      this.onbehalf = temp;
      if (!temp) {
        this.form.creatorUserId = this.tempcreatorUserId;
        this.form.applicantUserId = this.tempapplicantUserId;
        this.form.creatorStaffcode = this.tempcreatorStaffcode;
        this.form.creatorName = this.tempcreatorName;
        this.form.creatorTelephone = this.tempcreatorTelephone;
        this.form.creatorDept = this.tempcreatorDept;
      }else{
        this.form.creatorName="";
        this.form.creatorStaffcode="";
        this.form.creatorDept="";
        this.form.creatorTelephone="";
      }
    }, 
    doAfterSelectOtherPerson: function(data) {
			$('#selectotherperson').attr("class", "input-group-btn");
			//console.log(data);
			this.form.applicantUserId = data.id;
			this.form.creatorStaffcode = data.staffCode;
			this.form.creatorName = data.printENName;
			this.form.creatorTelephone = data.telephone;
			var tempdep = data.department;
			if(tempdep == null || tempdep == '' || tempdep == 'null' || tempdep == undefined) {
				tempdep = data.division;
			}
			this.form.creatorDept = tempdep;
    },
    doAfterSelectAreaResponsible1(data,dataIndex){
      $('#selectareaResponsible1').attr("class", "input-group-btn");
      //alertApon("printENName="+data.printENName+",dataIndex="+dataIndex);
      this.form.energyAreaList[dataIndex].areaResponsible1 = data.staffCode;
      this.form.energyAreaList[dataIndex].areaResponsible1Name = data.printENName;
      this.form.areaResponsibleShow=data.printENName;
    },
    doAfterSelectAreaResponsible2(data,dataIndex){
      $('#selectareaResponsible2').attr("class", "input-group-btn");
      //alertApon("staffCode="+data.staffCode+",dataIndex="+dataIndex);
      this.form.energyAreaList[dataIndex].areaResponsible2 = data.staffCode;
      this.form.energyAreaList[dataIndex].areaResponsible2Name = data.printENName;
      this.form.areaResponsibleShow=data.printENName;
    },
    doAfterSelectAreaResponsible(data,dataIndex){
      $('#selectareaResponsible3').attr("class", "input-group-btn");
      //alertApon("staffCode="+data.staffCode+",dataIndex="+dataIndex);
      this.form.energyAreaList[dataIndex].areaResponsible3 = data.staffCode;
      this.form.energyAreaList[dataIndex].areaResponsible3Name = data.printENName;
      this.form.areaResponsibleShow=data.printENName;
      //alertApon("areaResponsible3="+this.form.energyAreaList[tableID].areaResponsible3);
    },
    
    //提交前校验
    beforesubmit: function() {
      //alertApon("提交前校验beforesubmit");
      //Permit Category. 许可分类 必填
      var permitCategory = $("input:radio[name='permitCategory']:checked").val();
      if(permitCategory==undefined){
        $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“Permit Category. 许可分类”。");
        this.form.submitstatus=false;
        return;
      }
      if(this.form.telephone != null && this.form.telephone != ""){
        var regs=/^[0-9]*$/;
        if(!regs.test(this.form.telephone)){
          this.form.telephone="";
          $.alertApon("Incorrect format of the telephone number. 手机号格式不正确。");
          this.form.submitstatus=false;
          return;
        }
        //if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.telephone)) {
        //  $.alertApon("Incorrect format of the telephone number. 手机号格式不正确。");
        //  this.form.submitstatus=false;
        //  return;
        //}
      }
      //作业内容 
      if(this.form.descriptionOperations!="" && this.form.descriptionOperations != null ){
        var limitSize=300;
        var newvalue = this.form.descriptionOperations.replace(/[^\x00-\xff]/g, "**");
    		var length = newvalue.length;
        if(length>limitSize){
          $.alertApon(limitSize+" characters max for description of operations, "+length+" characters have been filled in currently. 作业内容最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          this.form.submitstatus=false;
          return;
        }
      }

      //日期校验
      var today = this.DT.getCurrentDay();
      //console.log("today="+today+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
      //alertApon("today="+today+",this.form.permitStartDate="+this.form.permitStartDate);
      //根据类型
      if(permitCategory != "Construction Permit" && permitCategory != "Energy & Medium Application"){
        //EHS 4个种类
        if(this.form.permitStartDateDate && today > this.form.permitStartDateDate) {
          $.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期，请检查！");
          this.form.submitstatus=false;
          return;
        }
        //locationDetails
        if(this.form.locationDetails!="" && this.form.locationDetails != null ){
          var limitSize=300;
          var newvalue = this.form.locationDetails.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){
            $.alertApon(limitSize+" characters max for location details, "+length+" characters have been filled in currently. 详细地点最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }
        }
        if(this.form.vendorName!="" && this.form.vendorName != null ){
          var limitSize=300;
          var newvalue = this.form.vendorName.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){
            $.alertApon(limitSize+" characters max for vendor name/VWATJ operation dept, "+length+" characters have been filled in currently. 项目施工单位/VWATJ 作业部门最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }
        }
        if(this.form.operator!="" && this.form.operator != null ){
          var limitSize=300;
          var newvalue = this.form.operator.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){
            $.alertApon(limitSize+" characters max for operator, "+length+" characters have been filled in currently. 作业人最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }
        }
        //Commitment. 承诺          
        if(this.dangerousCommitment == null || this.dangerousCommitment == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Commitment. 承诺”。");
          this.form.submitstatus=false;
          return;
        }else{
          this.form.submitstatus=true;
        }
      }else{
        //TPW  2个种类
        if(this.form.vendorName!="" && this.form.vendorName != null ){
          var limitSize=300;
          var newvalue = this.form.vendorName.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){
            $.alertApon(limitSize+" characters max for vendor name/VWATJ operation dept, "+length+" characters have been filled in currently. 项目施工单位/VWATJ 作业部门最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }
        }
        if(this.form.permitStartDateTime && today > this.form.permitStartDateTime) {
					$.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期， 请检查！");
					this.form.submitstatus=false;
          return;
        }
        //console.log("this.form.permitStartDateTime="+this.form.permitStartDateTime+",permitEndDateTime="+this.form.permitEndDateTime);
        //截止日期不可小于开始日期
        if(this.form.permitStartDateTime && this.form.permitEndDateTime && this.form.permitEndDateTime < this.form.permitStartDateTime ){
          $.alertApon("Permit end date should be later than permit start date, Please check! 结束日期不能小于开始日期， 请检查！");
					this.form.submitstatus=false;
          return;
        }
        //locationDetails
        if(this.form.locationDetails!="" && this.form.locationDetails != null ){
          var limitSize=300;
          var newvalue = this.form.locationDetails.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){
            $.alertApon(limitSize+" characters max for location details, "+length+" characters have been filled in currently. 详细地点最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
      }
      //alertApon("permitCategory="+permitCategory);
      if(permitCategory=="Hot Work Permit"){   
        //Hot Work Level 动火作业级别 hotWorkLevel
        var hotWorkLevel = $("input:radio[name='hotWorkLevel']:checked").val();
        //alertApon("hotWorkLevel="+hotWorkLevel);
        if(hotWorkLevel==undefined){
          $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“Hot Work Level 动火作业级别”。");
          this.form.submitstatus=false;
          return;
        }
        //Hot Work Type 动火类型
        if(this.hotWorkTypeArray == null || this.hotWorkTypeArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Hot Work Type 动火类型”。");
          this.form.submitstatus=false;
          return;
        }
        if(this.hotWorkTypeOther){
          if(this.form.hotType!="" && this.form.hotType != null ){
            var limitSize=300;
            var newvalue = this.form.hotType.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){
              $.alertApon(limitSize+" characters max for others hot type. 其他动火类型最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }
          }
        }
        //时间点校验 hotStartTime  hotEndTime
        if(this.form.hotEndTime != null && this.form.hotEndTime != "" && this.form.hotStartTime != null && this.form.hotStartTime != ""){
          if(this.form.hotEndTime < this.form.hotStartTime){
            $.alertApon("The end time cannot be earlier than the start time. 结束时间必须不早于起始时间。");
            this.form.submitstatus=false;
            return;
          }
        }
        //判断证件有效日期
        if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitStartDateDate != null && this.form.permitStartDateDate != ""){
          for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
            var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
            //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
            if(certificateExpiryDate != null && certificateExpiryDate!=""){
              //与Date of Permit 许可证日期 permitStartDate 比较 
              if(certificateExpiryDate < this.form.permitStartDateDate){
                //$.alertApon("The item "+(i+1)+" certificate expiry date must be greater than the date. 行项"+(i+1)+"证件有效期至必须大于日期。");
                $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                this.form.submitstatus=false;
                return;
              }
            }
          }
        }      

        //Main Devices and Materials. 主要作业设备及材料  hotMainDevicesMaterialsArray
        if(this.hotMainDevicesMaterialsArray == null || this.hotMainDevicesMaterialsArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Main Devices and Materials. 主要作业设备及材料”。");
          this.form.submitstatus=false;
          return;
        }else{
          this.form.submitstatus=true;
        }
        if(this.hotMainDevicesMaterialsOther){
          if(this.form.hotEquipmentName!="" && this.form.hotEquipmentName != null ){
            var limitSize=300;
            var newvalue = this.form.hotEquipmentName.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){
              $.alertApon(limitSize+" characters max for other Equipment Name, "+length+" characters have been filled in currently. 其他设备名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }
          }
        }
        if(this.form.hotPersonalProtectiveEquipment!="" && this.form.hotPersonalProtectiveEquipment != null ){
          var limitSize=300;
          var newvalue = this.form.hotPersonalProtectiveEquipment.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){  
            $.alertApon(limitSize+" characters max for personal protective equipment, "+length+" characters have been filled in currently. 个人防护用品最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }
        }
        if(this.form.hotFireFightingEquipment!="" && this.form.hotFireFightingEquipment != null ){
          var limitSize=300;
          var newvalue = this.form.hotFireFightingEquipment.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){ 
            $.alertApon(limitSize+" characters max for fire fighting equipment, "+length+" characters have been filled in currently. 消防器材最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }

      }
      if(permitCategory=="Work at Height Permit"){
        var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
        if(workingWeekend==undefined){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
          this.form.submitstatus=false;
          return;
        }
        //Working on Legal Holiday 施工时间包含法定节假日
        var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
        if(workingLegalHoliday==undefined){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
          this.form.submitstatus=false;
          return;
        }
        //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
        if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
          && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
          if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
            $.alertApon("The daily working time to cannot be earlier than the daily working time from. 每日工作结束时间必须不早于每日工作起始时间。");
            this.form.submitstatus=false;
            return;
          }
        }
        //Risk in the Work 此次作业中的风险
        if(this.heightRiskInWorkArray == null || this.heightRiskInWorkArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Risk in the Work 此次作业中的风险”。");
          this.form.submitstatus=false;
          return;
        }
        if(this.heightRiskInWorkOther){
          if(this.form.heightRiskName!="" && this.form.heightRiskName != null ){
            var limitSize=300;
            var newvalue = this.form.heightRiskName.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for others risk in the work, "+length+" characters have been filled in currently. 其他作业中的风险最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }
          }
        }
        //Corresponding Prevention Measures 相应的防护措施
        if(this.heightPreventionArray == null || this.heightPreventionArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Corresponding Prevention Measures 相应的防护措施”。");
          this.form.submitstatus=false;
          return;
        }
        if(this.heightPreventionMeasuresOther){
          if(this.form.heightPreventionMeasures!="" && this.form.heightPreventionMeasures != null ){
            var limitSize=300;
            var newvalue = this.form.heightPreventionMeasures.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for others prevention measures, "+length+" characters have been filled in currently. 其他防护措施最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }
          }
        }
        //Corresponding Protective Measures 相应的保护措施
        if(this.heightProtectiveArray == null || this.heightProtectiveArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Corresponding Protective Measures 相应的保护措施”。");
          this.form.submitstatus=false;
          return;
        }
        if(this.heightProtectiveMeasuresOther){
          if(this.form.heightProtectiveMeasures!="" && this.form.heightProtectiveMeasures != null ){
            var limitSize=300;
            var newvalue = this.form.heightProtectiveMeasures.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for others protective measures, "+length+" characters have been filled in currently. 其他保护措施最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }
          }
        }
        //Hanging Point Selection 挂点的选择
        if(this.heightPointArray == null || this.heightPointArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Hanging Point Selection 挂点的选择”。");
          this.form.submitstatus=false;
          return;
        }else{
          this.form.submitstatus=true;
        }
        if(this.heightHangingPointSelectionOther){
          if(this.form.heightHangingPointName!="" && this.form.heightHangingPointName != null ){
            var limitSize=300;
            var newvalue = this.form.heightHangingPointName.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for others hanging point selection, "+length+" characters have been filled in currently. 其他挂点的选择最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }else{
              this.form.submitstatus=true;
            }
          }
        }
      }
      //Confine Space Permit 
      if(permitCategory=="Confine Space Permit"){
        //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
        if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
          && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
          if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
            $.alertApon("The daily working time to cannot be earlier than the daily working time from. 每日工作结束时间必须不早于每日工作起始时间。");
            this.form.submitstatus=false;
            return;
          }
        }
        //判断证件有效日期
        if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitStartDateDate != null && this.form.permitStartDateDate != ""){
          for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
            var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
            //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
            if(certificateExpiryDate != null && certificateExpiryDate!=""){
              //与Date of Permit 许可证日期 permitStartDate 比较 
              if(certificateExpiryDate < this.form.permitStartDateDate){
                //$.alertApon("The item "+(i+1)+" certificate expiry date must be greater than the date of permit. 行项"+(i+1)+"证件有效期至必须大于许可证日期。");
                $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                this.form.submitstatus=false;
                return;
              }
            }
          }
        }
        //主要危害因素 spaceMainHazards
        if(this.form.spaceMainHazards!="" && this.form.spaceMainHazards != null ){
          var limitSize=3000;
          var newvalue = this.form.spaceMainHazards.replace(/[^\x00-\xff]/g, "**");
    			var length = newvalue.length;
          console.log("this.form.spaceMainHazards.length="+this.form.spaceMainHazards.length+",length="+length);
          if(length>limitSize){
            $.alertApon(limitSize+" characters max for main hazards, "+length+" characters have been filled in currently. 主要危害因素最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.submitstatus=false;
            return;
          }else{
            this.form.submitstatus=true;
          }
        }
      }
      //Other Dangerous Work
      if(permitCategory=="Other Dangerous Work"){
        //Permit Type of Dangerous Work 危险作业施工许可种类
        if(this.dangerousPermitTypeArray == null || this.dangerousPermitTypeArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Permit Type of Dangerous Work 危险作业施工许可种类”。");
          this.form.submitstatus=false;
          return;
        }
        if(this.dangerousPermitTypeOther){
          if(this.form.dangerousWorkDetails!="" && this.form.dangerousWorkDetails != null ){
            var limitSize=300;
            var newvalue = this.form.dangerousWorkDetails.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for others dangerous work details, "+length+" characters have been filled in currently. 其他危险作业名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }
          }
        }
        var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
        if(workingWeekend==undefined){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
          this.form.submitstatus=false;
          return;
        }
        //Working on Legal Holiday 施工时间包含法定节假日
        var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
        if(workingLegalHoliday==undefined){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
          this.form.submitstatus=false;
          return;
        }
        //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
        if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
          && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
          if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
            $.alertApon("The daily working time to cannot be earlier than the daily working time from. 每日工作结束时间必须不早于每日工作起始时间。");
            this.form.submitstatus=false;
            return;
          }
        }        
        //Main Devices or Materials. 主要施工设备或材料
        if(this.dangerousMainDevicesArray == null || this.dangerousMainDevicesArray == ""){
          $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Main Devices or Materials. 主要施工设备或材料”。");
          this.form.submitstatus=false;
          return;
        }else{
          this.form.submitstatus=true;
        }
        if(this.dangerousMainDevicesOther){
          if(this.form.dangerousEquipmentName!="" && this.form.dangerousEquipmentName != null ){
            var limitSize=300;
            var newvalue = this.form.dangerousEquipmentName.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for other equipment name, "+length+" characters have been filled in currently. 其他设备名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.submitstatus=false;
              return;
            }else{
              this.form.submitstatus=true;
            }
          }
        }
        //判断证件有效日期
        if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitEndDateDate != null && this.form.permitEndDateDate != ""){
          for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
            var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
            //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitEndDateDate="+this.form.permitEndDateDate);
            if(certificateExpiryDate != null && certificateExpiryDate!=""){
              //与Date of Permit 许可证日期 permitStartDate 比较 
              if(certificateExpiryDate < this.form.permitEndDateDate){
                //$.alertApon("The item "+(i+1)+" certificate expiry date must be greater than the end date of permit. 行项"+(i+1)+"证件有效期至必须大于许可证截止日期。");
                $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                this.form.submitstatus=false;
                return;
              }else{
                this.form.submitstatus=true;
              }
            }
          }
        }

      }
    },

    //审批时提交校验
    beforeapprovel: function() {
      //alertApon("beforeapprovel 校验");
      var status = this.form.status;
      var processTaskKey=this.processTaskKey;
      var permitCategory = $("input:radio[name='permitCategory']:checked").val();
      //alertApon("processTaskKey"+processTaskKey+",permitCategory="+permitCategory);
      //resubmit
      //reject之后的Resubmit
      if(status == 9){
        if(this.form.telephone != null && this.form.telephone != ""){
          var regs=/^[0-9]*$/;
          if(!regs.test(this.form.telephone)){
            this.form.telephone="";
            $.alertApon("Incorrect format of the telephone number. 手机号格式不正确。");
            this.form.approvelstatus=false;
            return;
          }
          //if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.telephone)) {
          //  $.alertApon("Incorrect format of the telephone number. 手机号格式不正确。");
          //  this.form.approvelstatus=false;
          //  return;
          //}
        }
        //作业内容 
        if(this.form.descriptionOperations!="" && this.form.descriptionOperations != null ){
          var limitSize=300;
          var newvalue = this.form.descriptionOperations.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          if(length>limitSize){ 
            $.alertApon(limitSize+" characters max for description of operations, "+length+" characters have been filled in currently. 作业内容最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
            this.form.approvelstatus=false;
            return;
          }
        }
        //日期校验
        var today = this.DT.getCurrentDay();
        console.log("today="+today+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
        //alertApon("today="+today+",this.form.permitStartDate="+this.form.permitStartDate); 
        //根据类型
        if(permitCategory != "Construction Permit" && permitCategory != "Energy & Medium Application"){
          //EHS 4个种类
          if(this.form.permitStartDateDate && today > this.form.permitStartDateDate) {
            $.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期，请检查！");
            this.form.approvelstatus=false;
            return;
          }
          //locationDetails
          if(this.form.locationDetails!="" && this.form.locationDetails != null ){
            var limitSize=300;
            var newvalue = this.form.locationDetails.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for location details, "+length+" characters have been filled in currently. 详细地点最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }
          }
          if(this.form.vendorName!="" && this.form.vendorName != null ){
            var limitSize=300;
            var newvalue = this.form.vendorName.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for vendor name/VWATJ operation dept, "+length+" characters have been filled in currently. 项目施工单位/VWATJ 作业部门最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }
          }
          if(this.form.operator!="" && this.form.operator != null ){
            var limitSize=300;
            var newvalue = this.form.operator.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for operator, "+length+" characters have been filled in currently. 作业人最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Commitment. 承诺          
          if(this.dangerousCommitment == null || this.dangerousCommitment == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Commitment. 承诺”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }else{
          //TPW 2个种类
          if(this.form.vendorName!="" && this.form.vendorName != null ){
            var limitSize=300;
            var newvalue = this.form.vendorName.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for vendor name/VWATJ operation dept, "+length+" characters have been filled in currently. 项目施工单位/VWATJ 作业部门最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }
          }
          if(this.form.permitStartDateTime && today > this.form.permitStartDateTime) {
            $.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期， 请检查！");
            this.form.approvelstatus=false;
            return;
          }
          console.log("this.form.permitStartDateTime="+this.form.permitStartDateTime+",permitEndDateTime="+this.form.permitEndDateTime);
          //截止日期不可小于开始日期
          if(this.form.permitStartDateTime && this.form.permitEndDateTime && this.form.permitEndDateTime < this.form.permitStartDateTime ){
            $.alertApon("Permit end date should be later than permit start date, Please check! 结束日期不能小于开始日期， 请检查！");
            this.form.approvelstatus=false;
            return;
          }
          //locationDetails
          if(this.form.locationDetails!="" && this.form.locationDetails != null ){
            var limitSize=300;
            var newvalue = this.form.locationDetails.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for location details, "+length+" characters have been filled in currently. 详细地点最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
        }

        if(permitCategory=="Hot Work Permit"){
          //Hot Work Type 动火类型
          if(this.hotWorkTypeArray == null || this.hotWorkTypeArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Hot Work Type 动火类型”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.hotWorkTypeOther){
            if(this.form.hotType!="" && this.form.hotType != null ){
              var limitSize=300;
              var newvalue = this.form.hotType.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){ 
                $.alertApon(limitSize+" characters max for others hot type. 其他动火类型最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }
            }
          }
          //时间点校验 hotStartTime  hotEndTime
          if(this.form.hotEndTime != null && this.form.hotEndTime != "" && this.form.hotStartTime != null && this.form.hotStartTime != ""){
            if(this.form.hotEndTime < this.form.hotStartTime){
              $.alertApon("The end time cannot be earlier than the start time. 结束时间必须不早于起始时间。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //判断证件有效日期
          if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitStartDateDate != null && this.form.permitStartDateDate != ""){
            for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
              var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
              //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
              if(certificateExpiryDate != null && certificateExpiryDate!=""){
                //与Date of Permit 许可证日期 permitStartDate 比较 
                if(certificateExpiryDate < this.form.permitStartDateDate){
                  //$.alertApon("The item "+(i+1)+" certificate expiry date must be greater than the date. 行项"+(i+1)+"证件有效期至必须大于日期。");
                  $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                  this.form.approvelstatus=false;
                  return;
                }
              }
            }
          }
          //Main Devices and Materials. 主要作业设备及材料  hotMainDevicesMaterialsArray
          if(this.hotMainDevicesMaterialsArray == null || this.hotMainDevicesMaterialsArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Main Devices and Materials. 主要作业设备及材料”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.hotMainDevicesMaterialsOther){
            if(this.form.hotEquipmentName!="" && this.form.hotEquipmentName != null ){
              var limitSize=300;
              var newvalue = this.form.hotEquipmentName.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){ 
                $.alertApon(limitSize+" characters max for other Equipment Name, "+length+" characters have been filled in currently. 其他设备名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }
            }
          }
          if(this.form.hotPersonalProtectiveEquipment!="" && this.form.hotPersonalProtectiveEquipment != null ){
            var limitSize=300;
            var newvalue = this.form.hotPersonalProtectiveEquipment.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for personal protective equipment, "+length+" characters have been filled in currently. 个人防护用品最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }
          }
          if(this.form.hotFireFightingEquipment!="" && this.form.hotFireFightingEquipment != null ){
            var limitSize=300;
            var newvalue = this.form.hotFireFightingEquipment.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){ 
              $.alertApon(limitSize+" characters max for fire fighting equipment, "+length+" characters have been filled in currently. 消防器材最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
        }
        if(permitCategory=="Work at Height Permit"){
          var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
          if(workingWeekend==undefined){
          //if(this.form.workingWeekend == null || this.form.workingWeekend == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
            this.form.approvelstatus=false;
            return;
          }
          //Working on Legal Holiday 施工时间包含法定节假日
          var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
          if(workingLegalHoliday==undefined){
          //if(this.form.workingLegalHoliday == null || this.form.workingLegalHoliday == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
            this.form.approvelstatus=false;
            return;
          }
          //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
          if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
            && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
            if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
              $.alertApon("The daily working time to cannot be earlier than the daily working time from. 每日工作结束时间必须不早于每日工作起始时间。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Risk in the Work 此次作业中的风险
          if(this.heightRiskInWorkArray == null || this.heightRiskInWorkArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Risk in the Work 此次作业中的风险”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.heightRiskInWorkOther){
            if(this.form.heightRiskName!="" && this.form.heightRiskName != null ){
              var limitSize=300;
              var newvalue = this.form.heightRiskName.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){ 
                $.alertApon(limitSize+" characters max for others risk in the work, "+length+" characters have been filled in currently. 其他作业中的风险最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }
            }
          }
          //Corresponding Prevention Measures 相应的防护措施
          if(this.heightPreventionArray == null || this.heightPreventionArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Corresponding Prevention Measures 相应的防护措施”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.heightPreventionMeasuresOther){
            if(this.form.heightPreventionMeasures!="" && this.form.heightPreventionMeasures != null ){
              var limitSize=300;
              var newvalue = this.form.heightPreventionMeasures.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){ 
                $.alertApon(limitSize+" characters max for others prevention measures, "+length+" characters have been filled in currently. 其他防护措施最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }
            }
          }
          //Corresponding Protective Measures 相应的保护措施
          if(this.heightProtectiveArray == null || this.heightProtectiveArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Corresponding Protective Measures 相应的保护措施”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.heightProtectiveMeasuresOther){
            if(this.form.heightProtectiveMeasures!="" && this.form.heightProtectiveMeasures != null ){
              var limitSize=300;
              var newvalue = this.form.heightProtectiveMeasures.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){ 
                $.alertApon(limitSize+" characters max for others protective measures, "+length+" characters have been filled in currently. 其他保护措施最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }
            }
          }
          //Hanging Point Selection 挂点的选择
          if(this.heightPointArray == null || this.heightPointArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Hanging Point Selection 挂点的选择”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
          if(this.heightHangingPointSelectionOther){
            if(this.form.heightHangingPointName!="" && this.form.heightHangingPointName != null ){
              var limitSize=300;
              var newvalue = this.form.heightHangingPointName.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){
                $.alertApon(limitSize+" characters max for others hanging point selection, "+length+" characters have been filled in currently. 其他挂点的选择最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }else{
                this.form.approvelstatus=true;
              }
            }
          }
        }
        
        //Confine Space Permit 
        if(permitCategory=="Confine Space Permit"){
          //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
          if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
            && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
            if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
              $.alertApon("The daily working time to cannot be earlier than the daily working time from. 每日工作结束时间必须不早于每日工作起始时间。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          //判断证件有效日期
          if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitStartDateDate != null && this.form.permitStartDateDate != ""){
            for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
              var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
              //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
              if(certificateExpiryDate != null && certificateExpiryDate!=""){
                //与Date of Permit 许可证日期 permitStartDate 比较 
                if(certificateExpiryDate < this.form.permitStartDateDate){
                  //$.alertApon("The item "+(i+1)+" certificate expiry date must be greater than the date of permit. 行项"+(i+1)+"证件有效期至必须大于许可证日期。");
                  $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                  this.form.approvelstatus=false;
                  return;
                }else{
                  this.form.approvelstatus=true;
                }
              }
            }
          }
          //主要危害因素 spaceMainHazards
          if(this.form.spaceMainHazards!="" && this.form.spaceMainHazards != null ){
            var limitSize=3000;
            var newvalue = this.form.spaceMainHazards.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){
              $.alertApon(limitSize+" characters max for main hazards, "+length+" characters have been filled in currently. 主要危害因素最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
        }
        
        //Other Dangerous Work
        if(permitCategory=="Other Dangerous Work"){
          //Permit Type of Dangerous Work 危险作业施工许可种类
          if(this.dangerousPermitTypeArray == null || this.dangerousPermitTypeArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Permit Type of Dangerous Work 危险作业施工许可种类”。");
            this.form.approvelstatus=false;
            return;
          }
          if(this.dangerousPermitTypeOther){
            if(this.form.dangerousWorkDetails!="" && this.form.dangerousWorkDetails != null ){
              var limitSize=300;
              var newvalue = this.form.dangerousWorkDetails.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){
                $.alertApon(limitSize+" characters max for others dangerous work details, "+length+" characters have been filled in currently. 其他危险作业名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }
            }
          }
          var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
          if(workingWeekend==undefined){
          //if(this.form.workingWeekend == null || this.form.workingWeekend == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
            this.form.approvelstatus=false;
            return;
          }
          //Working on Legal Holiday 施工时间包含法定节假日
          var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
          if(workingLegalHoliday==undefined){
          //if(this.form.workingLegalHoliday == null || this.form.workingLegalHoliday == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
            this.form.approvelstatus=false;
            return;
          }
          //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
          if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
            && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
            if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
              $.alertApon("The daily working time to cannot be earlier than the daily working time from. 每日工作结束时间必须不早于每日工作起始时间。");
              this.form.approvelstatus=false;
              return;
            }
          }
          //Main Devices or Materials. 主要施工设备或材料
          if(this.dangerousMainDevicesArray == null || this.dangerousMainDevicesArray == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Main Devices or Materials. 主要施工设备或材料”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
          if(this.dangerousMainDevicesOther){
            if(this.form.dangerousEquipmentName!="" && this.form.dangerousEquipmentName != null ){
              var limitSize=300;
              var newvalue = this.form.dangerousEquipmentName.replace(/[^\x00-\xff]/g, "**");
              var length = newvalue.length;
              if(length>limitSize){
                $.alertApon(limitSize+" characters max for other equipment name, "+length+" characters have been filled in currently. 其他设备名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
                this.form.approvelstatus=false;
                return;
              }else{
                this.form.approvelstatus=true;
              }
            }
          }
          //判断证件有效日期
          if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitEndDateDate != null && this.form.permitEndDateDate != ""){
            for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
              var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
              //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitEndDateDate="+this.form.permitEndDateDate);
              if(certificateExpiryDate != null && certificateExpiryDate!=""){
                //与Date of Permit 许可证日期 permitStartDate 比较 
                if(certificateExpiryDate < this.form.permitEndDateDate){
                  //$.alertApon("The item "+(i+1)+" certificate expiry date must be greater than the end date of permit. 行项"+(i+1)+"证件有效期至必须大于许可证截止日期。");
                  $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                  this.form.approvelstatus=false;
                  return;
                }else{
                  this.form.approvelstatus=true;
                }
              }
            }
          }

        }
      }
      //approve 
      if(status == 1){
        //alertApon("approve  ="+status);

        var today = this.DT.getCurrentDay();
        console.log("today="+today+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
        //alertApon("today="+today+",this.form.permitStartDate="+this.form.permitStartDate); 
        //根据类型
        if(permitCategory != "Construction Permit" && permitCategory != "Energy & Medium Application"){
          //if(this.form.permitStartDateDate && today > this.form.permitStartDateDate) {
          //  $.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期，请检查！");
          //  this.form.approvelstatus=false;
          //  return;
          //}else{
          //  this.form.approvelstatus=true;
          //}
        }else{
          //if(this.form.permitStartDateTime && today > this.form.permitStartDateTime) {
          //  $.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期， 请检查！");
          //  this.form.approvelstatus=false;
          //  return;
          //}
          console.log("this.form.permitStartDateTime="+this.form.permitStartDateTime+",permitEndDateTime="+this.form.permitEndDateTime);
          //截止日期不可小于开始日期
          if(this.form.permitStartDateTime && this.form.permitEndDateTime && this.form.permitEndDateTime < this.form.permitStartDateTime ){
            $.alertApon("Permit end date should be later than permit start date, Please check! 结束日期不能小于开始日期， 请检查！");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }

        if(this.processTaskKey == 'tpwPermitResponsible' 
          && (permitCategory=="Work at Height Permit" || permitCategory=="Other Dangerous Work") ){
          //Working on Weekend 施工包含周六日
          var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
          if(workingWeekend==undefined){
          //if(this.form.workingWeekend == null || this.form.workingWeekend == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
            this.form.approvelstatus=false;
            return;
          }
          //Working on Legal Holiday 施工时间包含法定节假日
          var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
          if(workingLegalHoliday==undefined){
          //if(this.form.workingLegalHoliday == null || this.form.workingLegalHoliday == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }          
        }
        if(permitCategory=="Hot Work Permit"){
          //时间点校验 hotStartTime  hotEndTime
          if(this.form.hotEndTime != null && this.form.hotEndTime != "" && this.form.hotStartTime != null && this.form.hotStartTime != ""){
            if(this.form.hotEndTime < this.form.hotStartTime){
              $.alertApon("The end time cannot be earlier than the start time. 结束时间必须不早于起始时间。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          //判断证件有效日期
        }

        if(permitCategory=="Work at Height Permit"  || permitCategory=="Confine Space Permit" 
          || permitCategory=="Other Dangerous Work"){
          //时间点校验 dailyWorkingTimeFrom dailyWorkingTimeTo
          if(this.form.dailyWorkingTimeTo != null && this.form.dailyWorkingTimeTo != "" 
            && this.form.dailyWorkingTimeFrom != null && this.form.dailyWorkingTimeFrom != ""){
            if(this.form.dailyWorkingTimeTo < this.form.dailyWorkingTimeFrom){
              $.alertApon("The daily working time to must be greater than the daily working time from. 每日工作结束时间必须大于每日工作起始时间。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }
          if(permitCategory=="Confine Space Permit"){
            //判断证件有效日期
          }
          if(permitCategory=="Other Dangerous Work"){
            //判断证件有效日期
          }
        }

        if(this.processTaskKey == 'tpwPermitResponsible' && permitCategory=="Energy & Medium Application" ){
          //判断区域负责人是否已填一个
          var isAreaResponsible1NotEmpty=true;
          if(this.form.energyAreaList != null&& this.form.energyAreaList.length>0){
              //区域负责人1是否有人
              for(var i=0;i<this.form.energyAreaList.length;i++){
                var areaResponsible1 = this.form.energyAreaList[i].areaResponsible1;
                if(areaResponsible1 == null || areaResponsible1==""){
                  isAreaResponsible1NotEmpty=false;
                }
              }
              if(isAreaResponsible1NotEmpty){
                this.form.approvelstatus=true;
              }else{
                $.alertApon("Area responsible 1 should not be empty. 区域负责人1不可为空。");
                this.form.approvelstatus=false;
                return;
              }  
          }else{
            $.alertApon("At least one complete record in Affected Area and Area Responsible List is needed. 至少需要填写一条完整的影响区域和区域负责人列表。");
            this.form.approvelstatus=false;
            return;
          }
          //确认影响区域和范围
          if(this.form.energyConfirmAreaScope!="" && this.form.energyConfirmAreaScope != null ){
            var limitSize=300;
            var newvalue = this.form.energyConfirmAreaScope.replace(/[^\x00-\xff]/g, "**");
            var length = newvalue.length;
            if(length>limitSize){
              $.alertApon(limitSize+" characters max for confirm the affected area and scope, "+length+" characters have been filled in currently. 确认影响区域和范围最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
              this.form.approvelstatus=false;
              return;
            }else{
              this.form.approvelstatus=true;
            }
          }

        }
        //二次审批

        //Hot Work Permit
        if(processTaskKey=="cePermitResponsible" && permitCategory=="Hot Work Permit"){
          //Verification Before Working. 作业前验证
          var hotVerificationBeforeWork1 = $("input:radio[name='hotVerificationBeforeWork1']:checked").val();
          //alertApon("hotVerificationBeforeWork1="+hotVerificationBeforeWork1);
          this.form.approvelstatus=false;
          if(hotVerificationBeforeWork1==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“1. Is there any combustible material around? 周围是否有可燃物？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork2 = $("input:radio[name='hotVerificationBeforeWork2']:checked").val();
          if(hotVerificationBeforeWork2==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“2. Do the relevant personnel wear appropriate protective equipment? 相关人员是否佩戴合适的防护用品？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork3 = $("input:radio[name='hotVerificationBeforeWork3']:checked").val();
          if(hotVerificationBeforeWork3==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“3. Is the correct fire equipment equipped? 是否配备了正确的消防器材？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork4 = $("input:radio[name='hotVerificationBeforeWork4']:checked").val();
          if(hotVerificationBeforeWork4==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“4. Can the operator use fire equipment? 作业人员是否会使用消防器材？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork5 = $("input:radio[name='hotVerificationBeforeWork5']:checked").val();
          if(hotVerificationBeforeWork5==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“5. Is the equipment properly grounded? 设备是否适当接地？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork6 = $("input:radio[name='hotVerificationBeforeWork6']:checked").val();
          if(hotVerificationBeforeWork6==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“6. Is there any flammable material around? 周围是否有可燃物？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork7 = $("input:radio[name='hotVerificationBeforeWork7']:checked").val();
          if(hotVerificationBeforeWork7==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“7. Is the welding slag effectively collected and isolated? 是否对焊渣进行了有效收集和隔离防护？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork8 = $("input:radio[name='hotVerificationBeforeWork8']:checked").val();
          if(hotVerificationBeforeWork8==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“8. Are the nearby people informed of the risks? 附近人员是否被告知风险？”。");
            this.form.approvelstatus=false;
            return;
          }
          var hotVerificationBeforeWork9 = $("input:radio[name='hotVerificationBeforeWork9']:checked").val();
          if(hotVerificationBeforeWork9==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“9. Are the operators qualified and trained? 作业人员是否有相关资质并接受了培训？”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        //Work at Height Permit
        if(processTaskKey=="cePermitResponsible" && permitCategory=="Work at Height Permit"){
          var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
          if(workingWeekend==undefined){
          //if(this.form.workingWeekend == null || this.form.workingWeekend == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
            this.form.approvelstatus=false;
            return;
          }
          //Working on Legal Holiday 施工时间包含法定节假日
          var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
          if(workingLegalHoliday==undefined){
          //if(this.form.workingLegalHoliday == null || this.form.workingLegalHoliday == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
            this.form.approvelstatus=false;
            return;
          }
          //Verification Before Working. 作业前验证
          var heightVerBeforeWork1 = $("input:radio[name='heightVerBeforeWork1']:checked").val();
          //alertApon("heightVerBeforeWork1="+heightVerBeforeWork1);
          if(heightVerBeforeWork1==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“1. Is there a safe protection solution for work at heights? 高处作业是否有安全的防护方案？”。");
            this.form.approvelstatus=false;
            return;
          }
          var heightVerBeforeWork2 = $("input:radio[name='heightVerBeforeWork2']:checked").val();
          if(heightVerBeforeWork2==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“2. Do the relevant personnel wear appropriate protective equipment? 相关人员是否佩戴合适的防护用品？”。");
            this.form.approvelstatus=false;
            return;
          }
          var heightVerBeforeWork3 = $("input:radio[name='heightVerBeforeWork3']:checked").val();
          if(heightVerBeforeWork3==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“3. Are all protective equipment in good condition? 所有的防护用品是否状态良好？”。");
            this.form.approvelstatus=false;
            return;
          }
          var heightVerBeforeWork4 = $("input:radio[name='heightVerBeforeWork4']:checked").val();
          if(heightVerBeforeWork4==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“4. Does the work at the height have a reasonable ascending channel? 高处作业是否具备合理的上升通道？”。");
            this.form.approvelstatus=false;
            return;
          }
          var heightVerBeforeWork5 = $("input:radio[name='heightVerBeforeWork5']:checked").val();
          if(heightVerBeforeWork5==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“5. Is the work area isolated and alerted? 作业区域是否进行了隔离和警示？”。");
            this.form.approvelstatus=false;
            return;
          }
          var heightVerBeforeWork6 = $("input:radio[name='heightVerBeforeWork6']:checked").val();
          if(heightVerBeforeWork6==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“6. Are the nearby people informed of the risks? 附近人员是否被告知风险？”。");
            this.form.approvelstatus=false;
            return;
          }
          var heightVerBeforeWork7 = $("input:radio[name='heightVerBeforeWork7']:checked").val();
          if(heightVerBeforeWork7==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“7. Are the operators qualified and trained? 作业人员是否有相关资质并接受了培训？”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        //Confine Space Permit
        if(processTaskKey=="cePermitResponsible" && permitCategory=="Confine Space Permit"){
          //Verification Before Working. 作业前验证
          var spaceVerBeforeWork1 = $("input:radio[name='spaceVerBeforeWork1']:checked").val();
          //alertApon("spaceVerBeforeWork1="+spaceVerBeforeWork1);
          if(spaceVerBeforeWork1==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“1. Are the operators qualified and trained? 作业人员是否有相关资质并接受了培训？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork2 = $("input:radio[name='spaceVerBeforeWork2']:checked").val();
          if(spaceVerBeforeWork2==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“2. Are the people and instruments that have been continuously tested in place? 连续测试的人员和仪器已就位？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork3 = $("input:radio[name='spaceVerBeforeWork3']:checked").val();
          if(spaceVerBeforeWork3==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“3. Is the test instrument accurate and reliable? 测试用仪器是否准确可靠？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork4 = $("input:radio[name='spaceVerBeforeWork4']:checked").val();
          if(spaceVerBeforeWork4==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“4. Is the emergency protective equipment in place? 应急防护用品是否已就位？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork5 = $("input:radio[name='spaceVerBeforeWork5']:checked").val();
          if(spaceVerBeforeWork5==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“5. Is the ventilation and exhaust condition good? 通风排气情况是否良好？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork6 = $("input:radio[name='spaceVerBeforeWork6']:checked").val();
          if(spaceVerBeforeWork6==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“6. Is the oxygen concentration and harmful gas test results qualified? 氧气浓度、有害气体检测结果是否合格？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork7 = $("input:radio[name='spaceVerBeforeWork7']:checked").val();
          if(spaceVerBeforeWork7==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“7. Is the lighting facility in place? 照明设施已就位？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork8 = $("input:radio[name='spaceVerBeforeWork8']:checked").val();
          if(spaceVerBeforeWork8==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“8. Personal protective equipment and anti-virus equipment are in place? 个人防护用品及防毒用具已就位？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork9 = $("input:radio[name='spaceVerBeforeWork9']:checked").val();
          if(spaceVerBeforeWork9==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“9. Is the ventilation equipment in place? 通风设备是否已就位？”。");
            this.form.approvelstatus=false;
            return;
          }
          var spaceVerBeforeWork10 = $("input:radio[name='spaceVerBeforeWork10']:checked").val();
          if(spaceVerBeforeWork10==undefined){
            $.alertApon("Please click in the radio button for item: 请单击事项的单选按钮：“10. Are other supplementary measures completed? 其他补充措施已完成？”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
        }
        //Other Dangerous Work
        if(processTaskKey=="cePermitResponsible" && permitCategory=="Other Dangerous Work"){
          var workingWeekend = $("input:radio[name='workingWeekend']:checked").val();
          if(workingWeekend==undefined){
          //if(this.form.workingWeekend == null || this.form.workingWeekend == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Weekend 施工包含周六日”。");
            this.form.approvelstatus=false;
            return;
          }
          //Working on Legal Holiday 施工时间包含法定节假日
          var workingLegalHoliday = $("input:radio[name='workingLegalHoliday']:checked").val();
          if(workingLegalHoliday==undefined){
          //if(this.form.workingLegalHoliday == null || this.form.workingLegalHoliday == ""){
            $.alertApon("Please click in the check box for item: 请在事项的方框里打勾：“Working on Legal Holiday 施工包含法定节假日”。");
            this.form.approvelstatus=false;
            return;
          }else{
            this.form.approvelstatus=true;
          }
          
        }
      }
    },

    //Affected Area and Area Responsible. 影响区域和区域负责人   添加一行
		insertItineraryRows: function() {
      var newItem = {};
      var item=this.form.energyAreaList.length;
      //alertApon("item="+item);
		  for(var key in this.form.energyAreaList[0]) {
        //alertApon("key="+key);
        if(key=="item"){
          newItem[key] = item+1;
        }else{
          newItem[key] = "";
        }
      }
      
		  this.form.energyAreaList.push(newItem);
		},
    //Affected Area and Area Responsible. 影响区域和区域负责人  删除行
		deleteItineraryRows: function(rowId) {
		  if(this.form.energyAreaList.length > 1) {
        var id = this.form.energyAreaList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/constructionWorkPermit/deleteAreaResponsible/"+id, "", function(data) {});
        }
			  this.form.energyAreaList.splice(rowId, 1);
		  } else {
			  $.alertApon("At least one complete record in Affected Area and Area Responsible List is needed. 至少需要填写一条完整的影响区域和区域负责人列表。");
		  }
		},
    //Operators Certificate. 人员证件  添加一行
		insertItineraryRowsOperators: function() {
      var newItem = {};
      var item=this.form.operatorsCertificateList.length;
		  for(var key in this.form.operatorsCertificateList[0]) {
        newItem[key] = "";
        if(key=="item"){
          newItem[key] = item+1;
        }else{
          newItem[key] = "";
        }
        //newItem[item]=key;
		  }
      this.form.operatorsCertificateList.push(newItem);
      //this.form.totalNumber=this.form.operatorsCertificateList.length;
		},
    //Operators Certificate. 人员证件  删除行
		deleteItineraryRowsOperators: function(rowId) {
		  if(this.form.operatorsCertificateList.length > 1) {
        var id = this.form.operatorsCertificateList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/constructionWorkPermit/deleteOperators/"+id, "", function(data) {});
        }
			  this.form.operatorsCertificateList.splice(rowId, 1);
		  } else {
			  $.alertApon("At least one complete record in Operators Certificate List is needed. 至少需要填写一条完整的人员证件列表。");
      }
      //this.form.totalNumber=this.form.operatorsCertificateList.length;
    },

    //Sampling Data. 抽样数据   添加一行
		insertItineraryRowsSamplingData: function() {
		  var newItem = {};
		  for(var key in this.form.spaceSamplingDataList[0]) {
			newItem[key] = "";
      }
      this.form.spaceSamplingDataList.push(newItem);
      this.samplingDataRowspan =this.form.spaceSamplingDataList.length+2;
		},
    //Sampling Data. 抽样数据   删除行
		deleteItineraryRowsSamplingData: function(rowId) {
		  if(this.form.spaceSamplingDataList.length > 1) {
        var id = this.form.spaceSamplingDataList[rowId].id;
        if(id) {
          global_.actUtil.query("post", "/constructionWorkPermit/deleteSamplingData/"+id, "", function(data) {});
        }
			  this.form.spaceSamplingDataList.splice(rowId, 1);
		  } else {
        this.form.spaceSamplingDataList.splice(rowId, 1);
			  //$.alertApon("At least one complete record in Sampling Data List is needed. 至少需要填写一条完整的抽样数据列表。");
      }
      this.samplingDataRowspan =this.form.spaceSamplingDataList.length+2;
		},
    //动火类型
    checkHotWorkType(){
      var newarr = this.hotWorkTypeArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others 其他'){
            otherR="Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others 其他'){
            otherR=",Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Others 其他";
        }
        this.hotWorkTypeOther=true;
      }else{
        this.hotWorkTypeOther=false;
        this.form.hotType="";
      }
      this.form.hotWorkType=arrayValue;
    },
    //Main Devices and Materials. 主要作业设备及材料
    checkHotMainDevicesMaterials(){
      var newarr = this.hotMainDevicesMaterialsArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Other Equipment/Material 其他设备或材料'){
            otherR="Other Equipment/Material 其他设备或材料";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Other Equipment/Material 其他设备或材料'){
            otherR=",Other Equipment/Material 其他设备或材料";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Other Equipment/Material 其他设备或材料";
        }
        this.hotMainDevicesMaterialsOther=true;
      }else{
        this.hotMainDevicesMaterialsOther=false;
        this.form.hotEquipmentName="";
      }
      this.form.hotMainDevicesMaterials=arrayValue;
    },
    //Risk in the Work 此次作业中的风险
    checkHeightRiskInWork(){
      var newarr = this.heightRiskInWorkArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others 其他'){
            otherR="Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others 其他'){
            otherR=",Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Others 其他";
        }
        this.heightRiskInWorkOther=true;
      }else{
        this.heightRiskInWorkOther=false;
        this.form.heightRiskName="";
      }
      this.form.heightRiskInWork=arrayValue;
    },
    //Corresponding Prevention Measures 相应的防护措施
    checkHeightPrevention(){
      var newarr = this.heightPreventionArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others 其他'){
            otherR="Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others 其他'){
            otherR=",Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Others 其他";
        }
        this.heightPreventionMeasuresOther=true;
      }else{
        this.heightPreventionMeasuresOther=false;
        this.form.heightPreventionMeasures="";
      }
      this.form.heightCorrePreventionMeasures=arrayValue;
    },
    //Corresponding Protective Measures 相应的保护措施
    checkHeightProtective(){
      var newarr = this.heightProtectiveArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others 其他'){
            otherR="Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others 其他'){
            otherR=",Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Others 其他";
        }
        this.heightProtectiveMeasuresOther=true;
      }else{
        this.heightProtectiveMeasuresOther=false;
        this.form.heightProtectiveMeasures="";
      }
      this.form.heightCorresProtectiveMeasures=arrayValue;
    },
    //Hanging Point Selection 挂点的选择
    checkHeightPoint(){
      var newarr = this.heightPointArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others 其他'){
            otherR="Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others 其他'){
            otherR=",Others 其他";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Others 其他";
        }
        this.heightHangingPointSelectionOther=true;
      }else{
        this.heightHangingPointSelectionOther=false;
        this.form.heightHangingPointName="";
      }
      this.form.heightHangingPointSelection=arrayValue;
    },
    //Main Devices or Materials. 主要施工设备或材料
    checkDangerousMainDevices(){
      var newarr = this.dangerousMainDevicesArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Other Equipment/Material 其他设备或材料'){
            otherR="Other Equipment/Material 其他设备或材料";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Other Equipment/Material 其他设备或材料'){
            otherR=",Other Equipment/Material 其他设备或材料";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Other Equipment/Material 其他设备或材料";
        }
        this.dangerousMainDevicesOther=true;
      }else{
        this.dangerousMainDevicesOther=false;
        this.form.dangerousEquipmentName="";
      }
      this.form.dangerousMainDevices=arrayValue;
    },
    //Permit Type of Dangerous Work 危险作业施工许可种类
    checkDangerousPermitType(){
      var newarr = this.dangerousPermitTypeArray;
      var arrayValue="";
      var ifOther=false;
      var otherR="";
      for (var i = 0, len = newarr.length; i < len; i++) {
        if(i==len-1){
          if(newarr[i]=='Others Dangerous Work 其他危险作业'){
            otherR="Others Dangerous Work 其他危险作业";
            ifOther=true;
          }else{
            arrayValue +=newarr[i];
          }
        }else{
          if(newarr[i]=='Others Dangerous Work 其他危险作业'){
            otherR=",Others Dangerous Work 其他危险作业";
            ifOther=true;
          }else{
            arrayValue +=newarr[i]+",";
          }
        }
      }
      if(ifOther){
        if(arrayValue !="" && arrayValue != null){
          arrayValue+=otherR;
        }else{
          arrayValue="Others Dangerous Work 其他危险作业";
        }
        this.dangerousPermitTypeOther=true;
      }else{
        this.dangerousPermitTypeOther=false;
        this.form.dangerousWorkDetails="";
      }
      this.form.dangerousPermitType=arrayValue;
    },
    //——废弃
    workingWeekendCheck(){
      this.form.workingWeekend = this.workingWeekend[0];
    },
    //——废弃
    workingLegalHolidayCheck(){
      this.form.workingLegalHoliday = this.workingLegalHoliday[0];
    },
    commitmentCheck(){
      this.form.dangerousCommitment = this.dangerousCommitment[0];
    },
    //打开PDF链接
    goRequirement(){
      var iHeight = 650;
      var iWidth = 950;
      var iTop = (window.screen.availHeight-30-iHeight)/2;
      var iLeft = (window.screen.availWidth-10-iWidth)/2;
      var url = Config.getBaseURL() + "/constructionWorkPermit/printRequirement";
      var showSelectWin = window.open(url,'print','directories=no,height='+
        iHeight+',location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=yes,width='+
        iWidth+',top='+iTop+',left='+iLeft);
      showSelectWin.focus();
      //var url = Config.getBaseURL() + "/constructionWorkPermit/printRequirement";
			//var showSelectWin = window.open(url);
	  	//showSelectWin.focus();
    },
    checkTelephone(){
      if(this.form.telephone != null && this.form.telephone != ""){
        var regs=/^[0-9]*$/;
        if(!regs.test(this.form.telephone)){
          this.form.telephone="";
          $.alertApon("Incorrect format of the telephone number. 手机号格式不正确。");
          return;
        }
        //if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.telephone)) {
        //  $.alertApon("Incorrect format of the telephone number. 手机号格式不正确。");
        //  return;
        //}
      }
    },
    permitCategoryChoose(){
      //console.log("permitCategoryChoose permitEndDate="+this.form.permitEndDate);  
    },
    showInform(){
      this.seen=true;
    },
    hiddenInform(){
      this.seen=false;
    },
    hotTypeOthersCheck(){
      if ($("#hotType").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#hotType").val()) {
          var value = $("#hotType").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for others hot type, "+length+" characters have been filled in currently. 其他动火类型最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.hotType = limitvalue;
        }
      }
    },
    hotEquipmentNameOthersCheck(){
      if ($("#hotEquipmentName").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#hotEquipmentName").val()) {
          var value = $("#hotEquipmentName").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for other Equipment Name, "+length+" characters have been filled in currently. 其他设备名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.hotEquipmentName = limitvalue;
        }
      }
    },
    dangerousEquipmentNameOthersCheck(){
      if ($("#dangerousEquipmentName").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#dangerousEquipmentName").val()) {
          var value = $("#dangerousEquipmentName").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for other equipment name, "+length+" characters have been filled in currently. 其他设备名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.dangerousEquipmentName = limitvalue;
        }
      }
    },
    dangerousWorkDetailsOthersCheck(){
      if ($("#dangerousWorkDetails").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#dangerousWorkDetails").val()) {
          var value = $("#dangerousWorkDetails").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for others dangerous work details, "+length+" characters have been filled in currently. 其他危险作业名称最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.dangerousWorkDetails = limitvalue;
        }
      }
    },
    heightRiskNameOthersCheck(){
      if ($("#heightRiskName").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#heightRiskName").val()) {
          var value = $("#heightRiskName").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;//75
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for others risk in the work, "+length+" characters have been filled in currently. 其他作业中的风险最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.heightRiskName = limitvalue;
        }
      }
    },    
    heightPreventionMeasuresOthersCheck(){
      if ($("#heightPreventionMeasures").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#heightPreventionMeasures").val()) {
          var value = $("#heightPreventionMeasures").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;//75
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for others prevention measures, "+length+" characters have been filled in currently. 其他防护措施最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.heightPreventionMeasures = limitvalue;
        }
      }
    },
    heightProtectiveMeasuresOthersCheck(){
      if ($("#heightProtectiveMeasures").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#heightProtectiveMeasures").val()) {
          var value = $("#heightProtectiveMeasures").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;//75
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for others protective measures, "+length+" characters have been filled in currently. 其他保护措施最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.heightProtectiveMeasures = limitvalue;
        }
      }
    },
    heightHangingPointNameOthersCheck(){
      if ($("#heightHangingPointName").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#heightHangingPointName").val()) {
          var value = $("#heightHangingPointName").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;//75
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for others hanging point selection, "+length+" characters have been filled in currently. 其他挂点的选择最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.heightHangingPointName = limitvalue;
        }
      }
    },
    locationDetailsCheck(){
      if ($("#locationDetails").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#locationDetails").val()) {
          var value = $("#locationDetails").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for location details, "+length+" characters have been filled in currently. 详细地点最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.locationDetails = limitvalue;
        }
      }
    },
    vendorNameCheck(){
      if ($("#vendorName").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#vendorName").val()) {
          var value = $("#vendorName").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for vendor name/VWATJ operation dept, "+length+" characters have been filled in currently. 项目施工单位/VWATJ 作业部门最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.vendorName = limitvalue;
        }
      }
    },
    operatorCheck(){
      if ($("#operator").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#operator").val()) {
          var value = $("#operator").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for operator, "+length+" characters have been filled in currently. 作业人最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.operator = limitvalue;
        }
      }
    },
    hotPersonalProtectiveEquipmentCheck(){
      if ($("#hotPersonalProtectiveEquipment").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#hotPersonalProtectiveEquipment").val()) {
          var value = $("#hotPersonalProtectiveEquipment").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for personal protective equipment, "+length+" characters have been filled in currently. 个人防护用品最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.hotPersonalProtectiveEquipment = limitvalue;
        }
      }
    },
    hotFireFightingEquipmentCheck(){
      if ($("#hotFireFightingEquipment").attr("readonly")) {
        //只读不做操作
      } else {
        if ($("#hotFireFightingEquipment").val()) {
          var value = $("#hotFireFightingEquipment").val();
          var newvalue = value.replace(/[^\x00-\xff]/g, "**");
          var length = newvalue.length;
          var limitSize=300;
          //当填写的字节数小于设置的字节数
          if (length * 1 <= limitSize * 1) {
            return;
          }
          var limitDate = newvalue.substr(0, limitSize);
          var count = 0;
          var limitvalue = "";
          for (var i = 0; i < limitDate.length; i++) {
            var flat = limitDate.substr(i, 1);
            if (flat == "*") {
              count++;
            }
          }
          var size = 0;
          var istar = newvalue.substr(limitSize * 1 - 1, 1); //校验点是否为“×”
          //if 基点是×; 判断在基点内有×为偶数还是奇数
          if (count % 2 == 0) {
            //当为偶数时
            size = count / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          } else {
            //当为奇数时
            size = (count - 1) / 2 + (limitSize * 1 - count);
            limitvalue = value.substr(0, size);
          }
          $.alertApon(limitSize+" characters max for fire fighting equipment, "+length+" characters have been filled in currently. 消防器材最多只能填写"+limitSize+"个字节，目前已填写"+length+"个字节。");
          //this.form.hotFireFightingEquipment = limitvalue;
        }
      }
    },

    changeWorkshop: function(rowId) {
			//this.form.energyAreaList[rowId].productDescription="";
			//this.form.energyAreaList[rowId].itemModel="";
      var form = this.form;
      var itemval = $("#areaResponsibleWorkshop" + rowId).val();
      if (itemval != "" && itemval != null && itemval != "null") {
				this.initselect($("#areaResponsibleArea" + rowId)[0]);
      } else {
        $("#areaResponsibleArea" + rowId).html("");
      }
      // form.furnitureItemsList[rowId].itemModel = "";
      //this.changeSecondCategory(rowId);
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
    },
    changePlant(){
      var form = this.form;
      //var itemval = $("#plant").val();
      var itemval = this.form.plant;
      console.log("changePlant 000"+itemval);
      if (itemval != "" && itemval != null && itemval != "null") {
        console.log("changePlant 111");
				this.initselect($("#workshop")[0]);
      } else {
        console.log("changePlant 222");
        $("#workshop").html("");
      }
    },
    changePlantWorkshop(){
      var form = this.form;
      var itemval = $("#workshop").val();
      if (itemval != "" && itemval != null && itemval != "null") {
				this.initselect($("#area")[0]);
      } else {
        $("#area").html("");
      }
    },

    

  },
  data() {
    //返回的数据对象
    var dm = {};
    

    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/ConstructionWorkPermit/get/" + id;
    } else {
      var url = "/form/ConstructionWorkPermit/create/";
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
    //在选染页面之后拿去后台传过来的值做缓存 0 1 2 9 空
		if((dm.form.status == null || dm.form.status == 2 || dm.form.status == 9) && dm.form.applicantUserId != null && dm.form.createUserId != null && dm.form.applicantUserId!=dm.form.createUserId){
			dm.onbehalf = true;
		}else{
			dm.onbehalf = false;
    }
    dm.tempcreatorUserId = dm.form.creatorUserId;
		dm.tempapplicantUserId = dm.form.applicantUserId;
		dm.tempcreatorStaffcode = dm.form.creatorStaffcode;
		dm.tempcreatorName = dm.form.creatorName;
    dm.tempcreatorTelephone = dm.form.creatorTelephone;
    dm.tempcreatorDept = dm.form.creatorDept;    
    
	  //var status = dm.form.status;
	  //this.checkStatus(status);
  
    dm.hotWorkLevelTitle="Level 2 hot work: All hot work except the level 1 hot work, special hot work and hot work in approved fixed hot work area. ";
    dm.hotWorkLevelTitle+="Level 1 hot work: Hot work within 10m or near a flammable and explosive place and all hot work of the contractor. ";
    dm.hotWorkLevelTitle+="For example, in the workshop, near the heat treatment equipment and pipelines, the forklift charging room, and the combustible storage area. ";
    dm.hotWorkLevelTitle+="Special hot fire: Fire work on flammable, explosive and toxic and harmful devices, pipelines, storage and containers. ";
    dm.hotWorkLevelTitle+="For example, ammonia plants and pipelines, liquefied petroleum gas plants and pipelines, gas cylinders, and natural gas pipelines. ";
    dm.hotWorkLevelTitle+="二级动火：除在一级动火、特殊动火和经批准的固定动火区外的所有动火作业。";
    dm.hotWorkLevelTitle+="一级动火：在易燃易爆场所内或附近10m内的动火作业以及承包商所有的动火作业。例如车间内热处理设备及管道附近、叉车充电间、可燃物存放区。";
    dm.hotWorkLevelTitle+="特殊动火：在易燃易爆及有毒有害装置、输送管道、存储、容器上的动火作业。例如氨气装置及管道、液化石油气装置及管道、气瓶集装阁、天然气管道。";
    dm.seen=false;
    
    dm.showArrPlant = true;
    if(dm.form.status==null || dm.form.status==""){// || dm.form.status==2 || dm.form.status==9
      dm.showArrArea = true;
    }else{
      if(dm.form.area != null && dm.form.area != ""){
        dm.showArrArea = true;
      }else{
        dm.showArrArea = false;
        dm.form.area = "";
      }
    }

    if(dm.form.plant != null && dm.form.plant != ""){
      dm.uriWorkshop="/constructionWorkPermit/workshop?plantId="+dm.form.plant;
      if(dm.form.plant==2){
        dm.areaRequired="";
      }else{
        dm.areaRequired="required";
      }
    }else{
      dm.areaRequired="required";
      dm.uriWorkshop="";
    }
    
    if(dm.form.workshop != null && dm.form.workshop != ""){
      dm.uriArea="/constructionWorkPermit/workshopArea?workshopId="+dm.form.workshop;
      if(dm.form.workshop==6 || dm.form.workshop==7 || dm.form.workshop==8 || dm.form.workshop==9 || dm.form.workshop==10 || dm.form.workshop==11 ){
        dm.areaRequired="";
      }else{
        dm.areaRequired="required";
      }
    }else{
      dm.areaRequired="required";
      dm.uriArea="";
    }

    //动火类型 checkbox
    if(dm.form.hotWorkType !="" && dm.form.hotWorkType != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.hotWorkType.split(",");
      dm.hotWorkTypeArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Others 其他'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.hotWorkTypeOther=true;
      }else{
        dm.hotWorkTypeOther=false;
        dm.form.hotType="";
      }
    }else{
      dm.hotWorkTypeArray=[];
      dm.hotWorkTypeOther=false;
      dm.form.hotType="";
    }

    //Main Devices and Materials. 主要作业设备及材料
    if(dm.form.hotMainDevicesMaterials !="" && dm.form.hotMainDevicesMaterials != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.hotMainDevicesMaterials.split(",");
      dm.hotMainDevicesMaterialsArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Other Equipment/Material 其他设备或材料'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.hotMainDevicesMaterialsOther=true;
      }else{
        dm.hotMainDevicesMaterialsOther=false;
        dm.form.hotEquipmentName="";
      }
    }else{
      dm.hotMainDevicesMaterialsArray=[];
      dm.hotMainDevicesMaterialsOther=false;
      dm.form.hotEquipmentName="";
    }
    //Risk in the Work 此次作业中的风险
    if(dm.form.heightRiskInWork !="" && dm.form.heightRiskInWork != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.heightRiskInWork.split(",");
      dm.heightRiskInWorkArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Others 其他'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.heightRiskInWorkOther=true;
      }else{
        dm.heightRiskInWorkOther=false;
        dm.form.heightRiskName="";
      }
    }else{
      dm.heightRiskInWorkArray=[];
      dm.heightRiskInWorkOther=false;
      dm.form.heightRiskName="";
    }
    //Corresponding Prevention Measures 相应的防护措施
    if(dm.form.heightCorrePreventionMeasures !="" && dm.form.heightCorrePreventionMeasures != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.heightCorrePreventionMeasures.split(",");
      dm.heightPreventionArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Others 其他'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.heightPreventionMeasuresOther=true;
      }else{
        dm.heightPreventionMeasuresOther=false;
        dm.form.heightPreventionMeasures="";
      }
    }else{
      dm.heightPreventionArray=[];
      dm.heightPreventionMeasuresOther=false;
      dm.form.heightPreventionMeasures="";
    }
    //Corresponding Protective Measures 相应的保护措施
    if(dm.form.heightCorresProtectiveMeasures !="" && dm.form.heightCorresProtectiveMeasures != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.heightCorresProtectiveMeasures.split(",");
      dm.heightProtectiveArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Others 其他'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.heightProtectiveMeasuresOther=true;
      }else{
        dm.heightProtectiveMeasuresOther=false;
        dm.form.heightProtectiveMeasures="";
      }
    }else{
      dm.heightProtectiveArray=[];
      dm.heightProtectiveMeasuresOther=false;
      dm.form.heightProtectiveMeasures="";
    }
    //Hanging Point Selection 挂点的选择
    if(dm.form.heightHangingPointSelection !="" && dm.form.heightHangingPointSelection != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.heightHangingPointSelection.split(",");
      dm.heightPointArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Others 其他'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.heightHangingPointSelectionOther=true;
      }else{
        dm.heightHangingPointSelectionOther=false;
        dm.form.heightHangingPointName="";
      }
    }else{
      dm.heightPointArray=[];
      dm.heightHangingPointSelectionOther=false;
      dm.form.heightHangingPointName="";
    }
    //Main Devices or Materials. 主要施工设备或材料
    if(dm.form.dangerousMainDevices !="" && dm.form.dangerousMainDevices != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.dangerousMainDevices.split(",");
      dm.dangerousMainDevicesArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Other Equipment/Material 其他设备或材料'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.dangerousMainDevicesOther=true;
      }else{
        dm.dangerousMainDevicesOther=false;
        dm.form.dangerousEquipmentName="";
      }
    }else{
      dm.dangerousMainDevicesArray=[];
      dm.dangerousMainDevicesOther=false;
      dm.form.dangerousEquipmentName="";
    }
    //Permit Type of Dangerous Work 危险作业施工许可种类
    if(dm.form.dangerousPermitType !="" && dm.form.dangerousPermitType != null){
      var typeStrs= new Array(); //定义一数组 
      typeStrs=dm.form.dangerousPermitType.split(",");
      dm.dangerousPermitTypeArray=typeStrs;
      var ifOther=false;
      for (var i = 0, len = typeStrs.length; i < len; i++) {
        if(typeStrs[i]=='Others Dangerous Work 其他危险作业'){
          ifOther=true;
        }
      }
      if(ifOther){
        dm.dangerousPermitTypeOther=true;
      }else{
        dm.dangerousPermitTypeOther=false;
        dm.form.dangerousWorkDetails="";
      }
    }else{
      dm.dangerousPermitTypeArray=[];
      dm.dangerousPermitTypeOther=false;
      dm.form.dangerousWorkDetails="";
    }
    //Sampling Data. 抽样数据
    dm.samplingDataRowspan=dm.form.spaceSamplingDataList.length+2;
    //Operators Certificate. 人员证件
    //dm.form.totalNumber=dm.form.operatorsCertificateList.length;
    if(dm.form.operatorsCertificateList.length==1){
      dm.form.operatorsCertificateList[0].item="1";
    }
    //Affected Area and Area Responsible. 影响区域和区域负责人 
    if(dm.form.energyAreaList != null){
      if(dm.form.energyAreaList.length==1){
        dm.form.energyAreaList[0].item="1";
      }
    }
    if(this.$route.query.taskKey != null){
			dm.lableName="Approve";
			dm.rejectLableName="Reject";
		}else{
			dm.lableName="Received";
			dm.rejectLableName="Cancelled"
    }

    dm.showArrEndDate = true;

    //Working on Weekend 施工包含周六日——废弃
    if(!dm.form.workingWeekend) {
			dm.workingWeekend = [];
		} else{
			dm.workingWeekend = [dm.form.workingWeekend];
    }
    //Working on Legal Holiday 施工时间包含法定节假日——废弃
    if(!dm.form.workingLegalHoliday) {
			dm.workingLegalHoliday = [];
		} else{
			dm.workingLegalHoliday = [dm.form.workingLegalHoliday];
    }
    //Commitment. 承诺
    if(!dm.form.dangerousCommitment) {
			dm.dangerousCommitment = [];
		} else{
			dm.dangerousCommitment = [dm.form.dangerousCommitment];
    }
    
    //签名
    dm.signature = null;
    dm.searchTicketNo=dm.form.ticketNo;
    //起始日期不可选历史日期
    dm.permitStartDateStart = new Date();
    
    if(dm.form.permitCategory != null && dm.form.permitCategory !="" 
      && (dm.form.permitCategory!="Construction Permit" && dm.form.permitCategory!="Energy & Medium Application")){
      if(dm.form.permitStartDate != null && dm.form.permitStartDate != "" ){
        console.log("11 dm.form.permitStartDate="+dm.form.permitStartDate); 
        dm.form.permitStartDate=dm.form.permitStartDate.substring(0,10);
        console.log("22 dm.form.permitStartDate="+dm.form.permitStartDate); 
      }
      if(dm.form.permitEndDate != null && dm.form.permitEndDate != "" ){
        console.log("33 dm.form.permitEndDate="+dm.form.permitEndDate); 
        dm.form.permitEndDate=dm.form.permitEndDate.substring(0,10);
        console.log("44 dm.form.permitEndDate="+dm.form.permitEndDate); 
      }
    }

    dm.approvalComment="";
    dm.approvalComment1="";
    dm.approvalComment2="";
    dm.approvalComment3="";
    dm.approvalComment4="";
    dm.approvalComment5="";
    dm.approvalComment6="";
    
    return dm;
  },

  watch: {
    "form.plant":{
			handler(curVal,oldVal){
				this.showArrPlant = false;
				if(this.form.plant != null && this.form.plant != ""){
          this.uriWorkshop="/constructionWorkPermit/workshop?plantId="+this.form.plant;
        }
				this.$nextTick(() => {
					this.showArrPlant = true;
        });
        
			},
			deep:true
    },
    "form.workshop":{
			handler(curVal,oldVal){
        this.showArrArea = false;
				if(this.form.workshop != null && this.form.workshop != ""){
          this.uriArea="/constructionWorkPermit/workshopArea?workshopId="+this.form.workshop;
          if(this.form.workshop==6 || this.form.workshop==7 || this.form.workshop==8 || this.form.workshop==9 || this.form.workshop==11 || this.form.workshop==12){
            this.areaRequired="";
          }else{
            this.areaRequired="required";
          }
        }
        if(this.areaRequired!=null && this.areaRequired!=""){
          this.$nextTick(() => {
            this.showArrArea = true;
          });
        }else{
          this.form.area="";
        }   
			},
			deep:true
    },
    "form.permitStartDateDate":{
			handler(curVal,oldVal){
        var today = this.DT.getCurrentDay();
        //approvalComment
        if(this.form.status==1 && this.form.permitStartDateDate && this.form.permitStartDate){
          if(this.form.permitStartDate.substring(0,10) != this.form.permitStartDateDate){
            this.approvalComment1= "Permit start date "+this.form.permitStartDate.substring(0,10)+" changes to "+this.form.permitStartDateDate+". ";
            //console.log("this.approvalComment1="+this.approvalComment1);
          }else{
            this.approvalComment1="";
          }
        }
				if(this.form.permitStartDateDate=="NaN-NaN-NaN"){
					$.alertApon("The Permit Start Date format error. 许可证起始日期格式错误。");
					return;
				}else if(this.form.permitStartDateDate && today > this.form.permitStartDateDate) {
					$.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期， 请检查！");
					return false;
        }else if(this.form.status == 1 && this.$route.query.taskKey != null && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
          //(this.form.status == 1 || this.form.status == 2 || this.form.status == 9 || this.form.status == null)
          && (this.form.permitCategory=="Hot Work Permit" || this.form.permitCategory=="Confine Space Permit")){
          //判断证件有效日期
          if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitStartDateDate != null && this.form.permitStartDateDate != ""){
            for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
              var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
              //console.log("watch  日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
              if(certificateExpiryDate != null && certificateExpiryDate!=""){
                //与Date of Permit 许可证日期 permitStartDate 比较 
                if(certificateExpiryDate < this.form.permitStartDateDate){
                  $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                  //break;
                  return false;
                }
              }
            }
          }
        }
        
				this.showArrEndDate = false;
				if(this.form.permitStartDateDate && this.form.permitStartDateDate != "NaN-NaN-NaN") {
					var date = new Date(this.form.permitStartDateDate);
					var newDate = date.getDate();
					date.setDate(newDate);
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var strDate = date.getDate();
					if(month >= 1 && month <= 9) {
						month = "0" + month;
					}
					if(strDate >= 0 && strDate <= 9) {
						strDate = "0" + strDate;
					}
          if(this.form.permitCategory != null 
            && (this.form.permitCategory!="Construction Permit" && this.form.permitCategory!="Energy & Medium Application")){
            if(this.form.permitStartDate && this.form.permitStartDateDate==this.form.permitStartDate.substring(0,10)){

            }else{
              this.form.permitEndDateDate = year + "-" + month + "-" + strDate;
            }
          }	
          //console.log("watch permitEndDateDate="+this.form.permitEndDateDate);  
        }
        

				this.$nextTick(() => {
					this.showArrEndDate = true;
				});
			},
			deep:true
    },
    "form.permitStartDateTime":{
			handler(curVal,oldVal){
        var today = this.DT.getCurrentDay();
        if(this.form.status==1 && this.form.permitStartDateTime && this.form.permitStartDate){
          console.log("watch  permitStartDate="+this.form.permitStartDate.substring(0,16));
          if(this.form.permitStartDate.substring(0,16) != this.form.permitStartDateTime){
            this.approvalComment1= "Permit start date "+this.form.permitStartDate.substring(0,16)+" changes to "+this.form.permitStartDateTime+". ";
            //console.log("this.approvalComment1="+this.approvalComment1);
          }else{
            this.approvalComment1="";
          }
        }
				if(this.form.permitStartDateTime=="NaN-NaN-NaN"){
					$.alertApon("The Permit Start Date format error. 许可证起始日期格式错误。");
					return;
				}else if(this.form.permitStartDateTime && today > this.form.permitStartDateTime) {
					$.alertApon("Permit start date should be later than Today, Please check! 许可证起始日期不能为过去日期， 请检查！");
					return false;
				}
				this.showArrEndDate = false;
				if(this.form.permitStartDateTime && this.form.permitStartDateTime != "NaN-NaN-NaN") {
          var hours=this.form.permitStartDateTime.substring(11,13);
          var minutes=this.form.permitStartDateTime.substring(14,16);
          //console.log("watch  hours="+hours+",minutes="+minutes+",this.form.permitStartDateTime.substring(0,10)="+this.form.permitStartDateTime.substring(0,10));
          //var dateTime = this.form.permitStartDateTime.substring(0,10);
					var date = new Date(this.form.permitStartDateTime.substring(0,10));
					var newDate = date.getDate();
					date.setDate(newDate);
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var strDate = date.getDate();
					if(month >= 1 && month <= 9) {
						month = "0" + month;
					}
					if(strDate >= 0 && strDate <= 9) {
						strDate = "0" + strDate;
					}
          if(this.form.permitCategory != null 
            && (this.form.permitCategory=="Construction Permit" || this.form.permitCategory=="Energy & Medium Application")){
              if( this.form.permitStartDate && this.form.permitStartDateTime==this.form.permitStartDate.substring(0,16)){

              }else{
                this.form.permitEndDateTime = year + "-" + month + "-" + strDate + " "+hours+":"+minutes;
              }
          }				
          //console.log("watch  permitEndDateTime="+this.form.permitEndDateTime);  
				}
				this.$nextTick(() => {
					this.showArrEndDate = true;
				});
			},
			deep:true
    },
    "form.permitEndDateDate":{
			handler(curVal,oldVal){
        if(this.form.status==1 && this.form.permitEndDateDate && this.form.permitEndDate){
          if(this.form.permitEndDate.substring(0,10) != this.form.permitEndDateDate){
            this.approvalComment2= "Permit end date "+this.form.permitEndDate.substring(0,10)+" changes to "+this.form.permitEndDateDate+". ";
            //console.log("this.approvalComment2="+this.approvalComment2);
          }else{
            this.approvalComment2="";
          }
        }
        if(this.form.status == 1 && this.$route.query.taskKey != null && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
          && this.form.permitCategory=="Other Dangerous Work" ){
          //判断证件有效日期
          if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitEndDateDate != null && this.form.permitEndDateDate != ""){
            for(var i=0;i<this.form.operatorsCertificateList.length;i++){      
              var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
              //console.log("日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitEndDateDate="+this.form.permitEndDateDate);
              if(certificateExpiryDate != null && certificateExpiryDate!=""){
                //与Date of Permit 许可证日期 permitStartDate 比较 
                if(certificateExpiryDate < this.form.permitEndDateDate){
                  $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
                  return false;
                }
              }
            }
          }
        }       
      },
      deep:true
    },
    "form.permitEndDateTime":{
			handler(curVal,oldVal){
        console.log("watch  permitEndDate="+this.form.permitEndDate.substring(0,16));
        if(this.form.status==1 && this.form.permitEndDateTime && this.form.permitEndDate){
          if(this.form.permitEndDate.substring(0,16) != this.form.permitEndDateTime){
            this.approvalComment2= "Permit end date "+this.form.permitEndDate.substring(0,16)+" changes to "+this.form.permitEndDateTime+". ";
            //console.log("this.approvalComment2="+this.approvalComment2);
          }else{
            this.approvalComment2="";
          }
        }       
      },
      deep:true
    },
    //dailyWorkingTimeFrom
    "form.dailyWorkingTimeFrom":{
			handler(curVal,oldVal){
        //console.log("this.dailyWorkingTimeFrom="+this.form.dailyWorkingTimeFrom+",dailyWorkingTimeFromTime="+this.form.dailyWorkingTimeFromTime);
        if(this.form.status==1 && this.form.dailyWorkingTimeFrom && this.form.dailyWorkingTimeFromTime){
          if(this.form.dailyWorkingTimeFrom != this.form.dailyWorkingTimeFromTime){
            this.approvalComment3= "Daily working time from "+this.form.dailyWorkingTimeFromTime+" changes to "+this.form.dailyWorkingTimeFrom+". ";
            //console.log("this.approvalComment3="+this.approvalComment3);
          }else{
            this.approvalComment3="";
          }
        }       
      },
      deep:true
    },
    //dailyWorkingTimeTo
    "form.dailyWorkingTimeTo":{
			handler(curVal,oldVal){
        if(this.form.status==1 && this.form.dailyWorkingTimeTo && this.form.dailyWorkingTimeToTime){
          if(this.form.dailyWorkingTimeTo != this.form.dailyWorkingTimeToTime){
            this.approvalComment4= "Daily working time to "+this.form.dailyWorkingTimeToTime+" changes to "+this.form.dailyWorkingTimeTo+". ";
            //console.log("this.approvalComment4="+this.approvalComment4);
          }else{
            this.approvalComment4="";
          }
        }       
      },
      deep:true
    },
    //hotStartTime
    "form.hotStartTime":{
			handler(curVal,oldVal){
        if(this.form.status==1 && this.form.hotStartTime && this.form.hotStartTimeTime){
          if(this.form.hotStartTime != this.form.hotStartTimeTime){
            this.approvalComment5= "Start time "+this.form.hotStartTimeTime+" changes to "+this.form.hotStartTime+". ";
           // console.log("this.approvalComment5="+this.approvalComment5);
          }else{
            this.approvalComment5="";
          }
        }       
      },
      deep:true
    },
    //hotEndTime
    "form.hotEndTime":{
			handler(curVal,oldVal){
        if(this.form.status==1 && this.form.hotEndTime && this.form.hotEndTimeTime){
          if(this.form.hotEndTime != this.form.hotEndTimeTime){
            this.approvalComment6= "End time "+this.form.hotEndTimeTime+" changes to "+this.form.hotEndTime+". ";
            //console.log("this.approvalComment6="+this.approvalComment6);
          }else{
            this.approvalComment6="";
          }
        }       
      },
      deep:true
    },
    "approvalComment1":{
      handler(curVal,oldVal){
          this.approvalComment=curVal+this.approvalComment2+this.approvalComment3+this.approvalComment4+this.approvalComment5+this.approvalComment6;
          //console.log("watch   approvalComment="+this.approvalComment);
      },
      deep:true
    },
    "approvalComment2":{
      handler(curVal,oldVal){
          this.approvalComment=this.approvalComment1+curVal+this.approvalComment3+this.approvalComment4+this.approvalComment5+this.approvalComment6;
          //console.log("watch approvalComment="+this.approvalComment);
      },
      deep:true
    },
    "approvalComment3":{
      handler(curVal,oldVal){
          this.approvalComment=this.approvalComment1+this.approvalComment2+curVal+this.approvalComment4+this.approvalComment5+this.approvalComment6;
          //console.log("watch approvalComment="+this.approvalComment);
      },
      deep:true
    },
    "approvalComment4":{
      handler(curVal,oldVal){
          this.approvalComment=this.approvalComment1+this.approvalComment2+this.approvalComment3+curVal+this.approvalComment5+this.approvalComment6;
         // console.log("watch approvalComment="+this.approvalComment);
      },
      deep:true
    },
    "approvalComment5":{
      handler(curVal,oldVal){
          this.approvalComment=this.approvalComment1+this.approvalComment2+this.approvalComment3+this.approvalComment4+curVal+this.approvalComment6;
          //console.log("watch approvalComment="+this.approvalComment);
      },
      deep:true
    },
    "approvalComment6":{
      handler(curVal,oldVal){
          this.approvalComment=this.approvalComment1+this.approvalComment2+this.approvalComment3+this.approvalComment4+this.approvalComment5+curVal;
          //console.log("watch approvalComment="+this.approvalComment);
      },
      deep:true
    },

	},
  //在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
  mounted() {
	  this.$root.eventHub.$off('updateFormData');
    this.$root.eventHub.$on('updateFormData', (form) => {
      console.log("mounted  yyyyy");
      this.form = form;
      console.log("mounted  ggggggg");
    });
    if(this.form.status != null && this.form.status == 1 
      && this.form.permitCategory != null && this.form.permitCategory=='Energy & Medium Application' 
      && this.processTaskKey == 'tpwPermitResponsible' && this.form.energyAreaList != null && this.form.energyAreaList.length < 1 
      && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
      this.insertItineraryRows();
    }
    if(this.form.status != null && this.form.status == 2
        && this.form.permitCategory != null 
        && (this.form.permitCategory=='Hot Work Permit' 
        || this.form.permitCategory=='Confine Space Permit'  
        || this.form.permitCategory=='Other Dangerous Work') 
        && this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length < 1 ){
      this.insertItineraryRowsOperators();
    }

    if(this.form.status == 1 && this.$route.query.taskKey != null && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
      && (this.form.permitCategory=="Hot Work Permit" || this.form.permitCategory=="Confine Space Permit")){
      //判断证件有效日期
      if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitStartDateDate != null && this.form.permitStartDateDate != ""){
        for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
          var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
          //console.log("mounted  日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitStartDateDate="+this.form.permitStartDateDate);
          if(certificateExpiryDate != null && certificateExpiryDate!=""){
            //与Date of Permit 许可证日期 permitStartDate 比较 
            if(certificateExpiryDate < this.form.permitStartDateDate){
              $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
              return false;
            }
          }
        }
      }
    }
    if(this.form.status == 1 && this.$route.query.taskKey != null && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)
      && this.form.permitCategory=="Other Dangerous Work"){
      //判断证件有效日期
      if(this.form.operatorsCertificateList != null && this.form.operatorsCertificateList.length > 0 && this.form.permitEndDateDate != null && this.form.permitEndDateDate != ""){
        for(var i=0;i<this.form.operatorsCertificateList.length;i++){            
          var certificateExpiryDate = this.form.operatorsCertificateList[i].certificateExpiryDate;
          //console.log("mounted 日期比较  certificateExpiryDate="+certificateExpiryDate+",this.form.permitEndDateDate="+this.form.permitEndDateDate);
          if(certificateExpiryDate != null && certificateExpiryDate!=""){
            //与Date of Permit 许可证日期 permitStartDate 比较 
            if(certificateExpiryDate < this.form.permitEndDateDate){
              $.alertApon("The permit date shall be within the validity period of the certificate. 作业日期应在人员证件有效期内。");
              return false;
            }
          }
        }
      }
    }

    console.log("mounted  hhhhhhh");

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
    createURI: {
      get: function(){
        var cwp = this.$route.params.cwp || this.$route.query.cwp;
        console.log("cwp   cwp="+cwp);
        return cwp;
      }
    },

    //申请人信息 只读控制
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
    ckeckInApproveFlow:{
      get: function() {
        return ((this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) &&
          !(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")));
      }
    },
    applicationTime: {
      get: function() {
        if(this.form.createDate == null){
          return "";
        }
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      },
    },
    //审批流
    approvalFlow1: function(){
      if(this.form.permitCategory != null && this.form.permitCategory != "" && this.form.permitCategory=='Construction Permit' ){
        return true;
      }else{
        return false;
      }
    },
    approvalFlow2: function(){
      if(this.form.permitCategory != null && this.form.permitCategory != "" && this.form.permitCategory=='Energy & Medium Application' ){
        return true;
      }else{
        return false;
      }
    },
    approvalFlow3: function(){
      if(this.form.permitCategory != null && this.form.permitCategory != "" 
        && this.form.permitCategory == 'Hot Work Permit' 
        && this.form.hotWorkLevel != null && this.form.hotWorkLevel =='Hot Work of Level 2 二级动火' ){
        return true;
      }else{
        return false;
      }
    },
    approvalFlow4: function(){
      if(this.form.permitCategory == null || this.form.permitCategory ==""){
        return true;
      }else{
        return false;
      }
    },
    
    //Construction Permit 施工许可 
    constructionPermitShow: function(){
      if(this.form.permitCategory != null && this.form.permitCategory=='Construction Permit' ){
        return true;
      }else{
        return false;
      }
    },
    // Energy & Medium Application 能源 & 介质申请
    energyMediumShow: function(){
      if(this.form.permitCategory != null && this.form.permitCategory=='Energy & Medium Application' ){
        return true;
      }else{
        return false;
      }
    },
    //Hot Work Permit 动火作业许可证
    hotPermitShow: function(){
      if(this.form.permitCategory != null && this.form.permitCategory=='Hot Work Permit' ){
        return true;
      }else{
        return false;
      }
    },
    //Work at Height Permit 高处作业许可证
    heightPermitShow: function(){
      if(this.form.permitCategory != null && this.form.permitCategory=='Work at Height Permit' ){
        return true;
      }else{
        return false;
      }
    },
    //Confine Space Permit 有限空间许可证
    spacePermitShow: function(){
      if(this.form.permitCategory != null && this.form.permitCategory=='Confine Space Permit' ){
        return true;
      }else{
        return false;
      }
    },
    //Other Dangerous Work 其他危险作业 
    otherDangerousShow: function(){
      if(this.form.permitCategory != null && this.form.permitCategory=='Other Dangerous Work' ){
        return true;
      }else{
        return false;
      }
    },
    //Energy & Medium Application Information 能源 & 介质申请信息  审批时显示 
    energyMediumApproveShow:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Energy & Medium Application' 
          && (this.processTaskKey == 'tpwPermitResponsible' || this.processTaskKey == 'areaResponsible' ) 
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else if(this.form.permitCategory != null && this.form.permitCategory=='Energy & Medium Application' 
          && (this.processTaskKey == 'tpwPermitResponsible' || this.processTaskKey == 'areaResponsible') && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 显示
        }else if(this.form.energyConfirmAreaScope != null && this.form.status != null && (this.form.status!=2 && this.form.status!=9) && this.$route.query.taskKey == null ){
          return true;//从My Application进来 详情显示
        }else{
          return false;
        }
      }
    },
    //Hot Work Permit /动火作业许可证  审批时显示
    hotPermitApproveShow:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Hot Work Permit' && 
          this.processTaskKey == 'cePermitResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else if(this.form.permitCategory != null && this.form.permitCategory=='Hot Work Permit' 
          && this.processTaskKey == 'cePermitResponsible' && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 显示
        }else if(this.form.hotVerificationBeforeWork1 != null && this.form.status != null && (this.form.status!=2 && this.form.status!=9) && this.$route.query.taskKey == null ){
          return true;//从My Application进来 详情显示
        }else{
          return false;
        }
      }
    },
    //Work at Height Permit /高处作业许可证  审批时显示
    heightPermitApproveShow:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Work at Height Permit' && 
          this.processTaskKey == 'cePermitResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else if(this.form.permitCategory != null && this.form.permitCategory=='Work at Height Permit' 
          && this.processTaskKey == 'cePermitResponsible' && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 显示
        }else if(this.form.heightVerBeforeWork1 != null && this.form.status != null && (this.form.status!=2 && this.form.status!=9) && this.$route.query.taskKey == null ){
          return true;//从My Application进来 详情显示
        }else{
          return false;
        }
      }
    },
    //Confine Space Permit /有限空间许可证 审批时显示
    spacePermitApproveShow:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Confine Space Permit' && 
          this.processTaskKey == 'cePermitResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else if(this.form.permitCategory != null && this.form.permitCategory=='Confine Space Permit' 
          && this.processTaskKey == 'cePermitResponsible' && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 显示
        }else if(this.form.spaceVerBeforeWork1 != null && this.form.status != null && (this.form.status!=2 && this.form.status!=9) && this.$route.query.taskKey == null ){
          return true;//从My Application进来 详情显示
        }else{
          return false;
        }
      }
    },
    //Other Dangerous Work /其他危险作业 审批时显示 废弃
    otherDangerousApproveShow:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Other Dangerous Work' && 
          this.processTaskKey == 'cePermitResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          //this.form.dangerousCommitment="";
          //this.dangerousCommitment = [];
          return true;
        }else if(this.form.permitCategory != null && this.form.permitCategory=='Other Dangerous Work' && 
          this.processTaskKey == 'cePermitResponsible' && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 显示
        }else if(this.form.dangerousCommitment != null && this.form.status != null && (this.form.status!=2 && this.form.status!=9) && this.$route.query.taskKey == null ){
          return true;//从My Application进来 详情显示
        }else{
          return false;
        }
      }
    },
    //只读控制
    //permitStartDate  permitEndDate
    startEndDateReadonlyConstruction:{
      get: function() {
        if(this.form.permitCategory != null && (this.form.permitCategory=='Construction Permit' || this.form.permitCategory=='Energy & Medium Application')
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)  && this.form.status==1){
          if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return true;
          }else{
            return false;
          }
        }else if((this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" ) && (this.form.status == null || this.form.status == 2 || this.form.status==9)){
          return false;
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    energyTwpApproveReadonly:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Energy & Medium Application'
          && this.processTaskKey == 'tpwPermitResponsible' 
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)  && this.form.status==1){
          if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return true;
          }else{
            return false;
          }
        }else if((this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" ) && (this.form.status == null || this.form.status == 2 || this.form.status==9)){
          return false;
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    hotApproveReadonly:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Hot Work Permit'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)  && this.form.status==1){
          if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return true;
          }else{
            return false;
          }
        }else if((this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" ) && (this.form.status == null || this.form.status == 2 || this.form.status==9)){
          return false;
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    heightApproveReadonly:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Work at Height Permit'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)  && this.form.status==1){
          if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return true;
          }else{
            return false;
          }
        }else if((this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" ) && (this.form.status == null || this.form.status == 2 || this.form.status==9)){
          return false;
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    //Space
    spaceApproveReadonly:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Confine Space Permit'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1) && this.form.status==1 ){
          if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return true;
          }else{
            return false;
          }
        }else if((this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" ) && (this.form.status == null || this.form.status == 2 || this.form.status==9)){
          return false;
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    // Other Dangerous Work 其他危险作业 
    dangerousApproveReadonly:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Other Dangerous Work'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)  && this.form.status==1){
          if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
            return true;
          }else{
            return false;
          }
        }else if((this.$route.query.taskKey == null || this.$route.query.taskKey == "editForm" ) && (this.form.status == null || this.form.status == 2 || this.form.status==9)){
          return false;
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    dangerousCeApproveReadonly:{
      get: function() {
        if(this.form.permitCategory != null && this.form.permitCategory=='Other Dangerous Work'
          && this.processTaskKey == 'cePermitResponsible'
          && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
            if(this.form.byDeputy && this.form.applicantUserId == localStorage.getItem("uid")){
              return true;
            }else{
              return false;
            }
        }else if(this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1 && this.$route.path.indexOf('reAudit') == -1){
          return true;//从My Approval进来 只读
        }else{
          return true;
        }
      }
    },
    //开始日期根据选择的许可证日期
    generateStartDate: {
      get: function() {
        //console.log("generateStartDate  this.form.permitStartDateDate="+this.form.permitStartDateDate);
        if(this.form.permitStartDateDate && this.form.permitStartDateDate != "NaN-NaN-NaN") {
          var date = new Date(this.form.permitStartDateDate);
          var newDate = date.getDate();
			    date.setDate(newDate);
          //console.log("generateStartDate  date="+date);
			    return date;
        } else {
          return new Date();
        }
      }
    },
    //许可证结束日期控制7天后
    generateEndDate: {
      get: function() {
        if(this.form.permitStartDateDate && this.form.permitStartDateDate != "NaN-NaN-NaN") {
          //console.log("generateEndDate  this.form.permitStartDateDate="+this.form.permitStartDateDate);
          var date = new Date(this.form.permitStartDateDate);
          var newDate = date.getDate() + 7;
			    date.setDate(newDate);
			    return date;
        } else {
          return new Date();
        }
      }
    },
    signatureShow:{
      get: function() {
        if(this.processTaskKey == 'cePermitResponsible' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
          return true;
        }else{
          return false;
        }
      }
    },
    //&& this.processTaskKey != 'editForm' && this.form.status !=9 && this.form.status !=2
    signatureAreaShow:{
      get: function() {
        if(this.form.cwpSignature){
          console.log("signatureAreaShow cwpSignature 有签名");
        }else{
          console.log("signatureAreaShow cwpSignature 无签名");
        }
        if(this.form.status == null || (this.form.status ==2 && this.form.createUserId == localStorage.getItem("uid")) ){
          console.log("signatureAreaShow 111 false");
          return false;
        }else if(this.form.status ==9 && this.form.createUserId == localStorage.getItem("uid")){
          console.log("signatureAreaShow 222 false");
          return false;
        }else{
          console.log("signatureAreaShow 333 true");
          return true;
        }
      }
    },
    //开始日期根据选择的许可证日期
    generateStartDateTime: {
      get: function() {
        //console.log("generateStartDateTime  this.form.permitStartDateTime="+this.form.permitStartDateTime+",this.form.permitStartDate="+this.form.permitStartDate);
        if(this.form.permitStartDateTime && this.form.permitStartDateTime != "NaN-NaN-NaN") {
          //console.log("generateStartDateTime this.form.permitStartDateTime.substring(0,10)="+this.form.permitStartDateTime.substring(0,10));
          var dd = this.form.permitStartDateTime.substring(0,10);//+":00"
          var date = new Date(dd);
          console.log("generateStartDateTime  permitStartDateTime  date="+date);
          //var date = new Date(this.form.permitStartDateTime.substring(0,16));
          var newDate = date.getDate();
          date.setDate(newDate);
          var da = date.Format('yyyy-MM-dd hh:mm:ss');
          console.log("generateStartDateTime  permitStartDateTime  da="+da);
          var startDate = da.substring(0,10)+this.form.permitStartDateTime.substring(10,16);
          console.log("generateEndDateTime  permitEndDateTime  startDate="+startDate);
			    return startDate;//new Date(startDate).Format('yyyy-MM-dd hh:mm:ss')
        } else {
          return new Date();
        }
      }
    },
    //许可证结束日期控制7天后
    generateEndDateTime: {
      get: function() {
        if(this.form.permitStartDateTime && this.form.permitStartDateTime != "NaN-NaN-NaN") {
          //var dateTime=this.form.permitStartDateTime+":00";
          //console.log("generateEndDateTime this.form.permitStartDateTime.substring(0,10)="+this.form.permitStartDateTime.substring(0,10));
          var dd = this.form.permitStartDateTime.substring(0,10);//+" 23:59:00"
          var date = new Date(dd);
          console.log("generateEndDateTime  permitEndDateTime  date="+date);
          //var date = new Date(this.form.permitStartDateTime.substring(0,10));
          var newDate = date.getDate() + 7;
          console.log("generateEndDateTime  permitEndDateTime  newDate="+newDate);
          date.setDate(newDate);
          var da = date.Format('yyyy-MM-dd hh:mm:ss');
          console.log("generateEndDateTime  permitEndDateTime  da="+da);
          var endDate = da.substring(0,10)+" 23:59";
          console.log("generateEndDateTime  permitEndDateTime  endDate="+endDate);
			    return endDate;//new Date(endDate).Format('yyyy-MM-dd hh:mm:ss')
        } else {
          return new Date();
        }
      }
    },


   
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
table#SamplingDataTable td.is-safe,table#SamplingDataTable th {
  border: 1px solid #e4e4e4 !important;
}
#inform{
      position: absolute;
      font-weight:normal;
      font-family: Arial,"simsun";
		  top: 20px;
		  width: 500px;
		  max-height: 300px;           /* 设置最大高度，当高度达到此值时出现滚动条 */
		  z-index: 10;
		  background-color: #F5F5F5; 
		  overflow: auto;              /* 自动添加滚动条 */
		  box-shadow:0px 0px 1px #000;   /* 外阴影 */
		  display: block;   /* 默认隐藏 */
  }
  .inputStyle {
    /* vertical-align: text-bottom; */
    height:13px; vertical-align:text-top; margin-top:0;
}
.text-muted-upload{
  color: #777;
  font-size: 12px;
}
</style>

<template>
  <div>
    <section class="content-header">
      <h1 style="font-size:22px;">KVS Account</h1>
      <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
        <strong>Application No. : {{form.ticketNo}} </strong>

      </span>
    </section>
    <!-- Main content -->
    <section class="content container-fluid">

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title"> Applicant Info. 申请人信息</h3>
        </div>
        <form role="form">
          <input type="hidden" v-model="form.id" name="id">
          <input type="hidden" v-model="form.createUserId" name="createUserId" id="createUserId">
          <input type="hidden" v-model="form.creatorUserId" name="creatorUserId" id="creatorUserId">
          <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
          <!-- <input type="hidden" v-model="form.participant_ids" name="participant_ids" id="participant_ids"> -->
          <input type="hidden" v-model="form.participantInflag" name="participantInflag" id="participantInflag">
          <div class="box-body">
            <div class="row">
              <div class="col-md-3">
                <div class="col-md-6 no-padding">
                  <label for="">
                    <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
                    Form of address 称谓 </label>
                  <select select2 class="form-control" v-model="form.address">
                    <option value="MR">Mr.</option>
                    <option value="MS">Ms.</option>
                  </select>
                </div>
                <div class="col-md-6 no-padding">
                  <div class="form-group">
                    <label for="">
                      <!-- <i  class="fa fa-asterisk text-red" style="font-size: 10px;"></i>-->
                      Name 姓名 </label>
                    <div class="input-group ">
                      <input type="text" class="form-control" placeholder="Name 姓名" id="name" name="name" v-model="form.name" readonly="readonly">
                      <span class="input-group-btn" id="selectotherperson">
                        <!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                        <ChooseOtherPerson :chooseID="'person_tableKVS1'" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson">
                          <i class="fa fa-fw fa-search"></i>
                        </ChooseOtherPerson>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <form-group col="md-3" type="input" v-model="form.creatorDivision" name="Organnizational Unit 组织" readonly="readonly"></form-group>
              <form-group col="md-3" type="input" v-model="form.email" name="Email 邮件地址" readonly="readonly"></form-group>
              <form-group col="md-3" type="input" v-model="form.telPhone" name="Telephone 电话" readonly="readonly"></form-group>
            </div>
            <div class="row">
              <form-group col="md-3" type="input" v-model="form.adAcount" name="Group User ID 用户编号" readonly="readonly"></form-group>
              <form-group col="md-3" type="input" v-model="form.employer" name="Employer 雇主" readonly="readonly"></form-group>
              <form-group col="md-3" type="input" v-model="form.employerAddress" name="Employer Address 雇主地址" readonly="readonly"></form-group>
              <form-group col="md-3" type="input" v-model="form.taskDescription" name="Task Description/Project 任务描述/项目" readonly="readonly"></form-group>
            </div>
          </div>
        </form>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title pull-left">KVS Access Information KVS系统授权信息</h3>

        </div>
        <form role="form">
          <div class="box-body" id="bmApplicatio">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group col-md-10">
                  <form-group other-rules="required"  type="select"  uri="/KvsAccessGenerator/listforselect" :readonly="!confirmkey" name="toKvs" v-model="form.toKvs" @change="findTokvsName"></form-group>
                </div>
                <div class="form-group col-md-2" style="position: relative;top: 30px;">
                  <label >{{form.employer}}</label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <form-group type="daterangepicker2" other-rules="required" v-model="form.period" name="Request  KVS Access Period KVS授权期限:" :readonly="readonly"></form-group>
                </div>
              </div>
              <form-group col="md-4" type="select" other-rules="required" :readonly="readonly" uri="/dict/list?groupName=kvs-bom" name="BOM" v-model="form.bom"></form-group>
            </div>
            <strong>CHINA</strong>
            <br/>OMK / FSE Design Engineering -TE VWATJ: {{this.form.chinaName}}<br/>
            <strong>Deutschland</strong>
            <br/>OMK / FSE Design Engineering -TE VWATJ: {{this.form.germanyName}}<br/>          
          </div>
        </form>
      </div>

      <div>

      </div>
      <div v-if="!readonly">
        <input   type="checkbox" v-model="form.isMoreApp"> Please select if the request is meant to apply to more than one applicant. 请选择此项如果此申请含有多个申请人
      <br/><br/>
      </div>
      <div class="box box-primary" v-if="form.isMoreApp">
        <div class="box-header with-border" >
          <h3 class="box-title">Group Application 多人申请</h3>
        </div>
        <div style="padding-left: 15px;">
          <ChooseOtherPerson :chooseID="'person_tableKVS2'" :vclass="'btn btn-primary btn-flat'"  @callbackfunction="doAfterSelectOtherkvsList">
            Add Multiple Applicant
            <i class="fa fa-fw fa-search"></i>
          </ChooseOtherPerson>     
        </div>
        <div class="box-body">
          <div class="row">
            <div class="form-group">
              <div class="col-md-12">
                <table class="table table-bordered mar-bot-0" id="kvsGeneratorLists">
                  <tbody>
                    <tr>
                      <th >Form of address</th>
                      <th >First Name </th>
                      <th >Last Name</th>
                      <th >Organizational Unit</th>
                      <th >Phone Number</th>
                      <th >E-mail address</th>
                      <th >Group User ID</th>
                      <th >Employer</th>
                      <th >Employer Address</th>
                      <th >Task Description / Project</th>
                      <th ></th>
                    </tr>
                    <tr v-bind:key="index" v-for="(entry,index) in form.kvsGeneratorLists">
                      <td>
                        <select select2 class="form-control" v-model="entry.address">
                          <option value="MR">Mr.</option>
                          <option value="MS">Ms.</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" class="form-control" readonly="readonly" v-model="entry.firstName" />
                      </td>
                      <td>
                        <input type="text" class="form-control" readonly="readonly" v-model="entry.lastName"/>
                      </td>
                      <td>
                        <input type="text" class="form-control" readonly="readonly" v-model="entry.unit"/>
                      </td>
                      <td>
                        <input type="text" class="form-control" readonly="readonly" v-model="entry.telPhone"/>
                      </td>
                      <td>
                        <input type="text" class="form-control" readonly="readonly" v-model="entry.email"/>
                      </td>
                      <td>
                        <input type="text" class="form-control"  readonly="readonly" v-model="entry.adAcount"/>
                      </td>
                      <td>
                        <input type="text" class="form-control"  readonly="readonly" v-model="entry.employer"/>
                      </td>
                      <td>
                        <input type="text" class="form-control"  readonly="readonly" v-model="entry.employerAddress"/>
                      </td>
                      <td>
                        <input type="text" class="form-control"  readonly="readonly" v-model="entry.taskDescription"/>
                      </td>                      
											<td v-if="!readonly" class="text-center"  style="vertical-align: middle;width:33px">
												<a :id="'delete'+index"  href="javascript:;" @click="deleteItineraryRows(index)">
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
      <router-view :form="form" entityId="KvsAccessGenerator" vclass="btn-left" uri="/form/KvsAccessGenerator/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit"></router-view>
      <comment-list v-if="form.processInstanceId !=null"></comment-list>
    </section>
  </div>
</template>

<script>
import global_ from "./../../../components/Common/Util/Global.vue";
// import ajaxFileUpload from "./../../../plugins/uploadiFive/ajaxfileupload.js"
export default {
  name: "KvsAccessGenerator",
  methods: {
    beforesubmit:function(){
        if(this.form.isMoreApp && this.form.kvsGeneratorLists.length<=1){
          this.form.submitstatus=false;
          $.alert("Please add at least one applicant.请至少添加一个申请人。");
        }else{
          this.form.submitstatus=true;
        }
    },
    doAfterSelectOtherPerson: function(data) {
      $('#selectotherperson').attr("class", "input-group-btn");
      console.log("doAfterSelectOtherPerson"+data.title);
      this.form.creatorDivision=data.department
      this.form.name=data.printENName
      this.form.email = data.email;
      this.form.staffCode = data.staffCode;
      this.form.telPhone = data.telephone;
      this.form.adAcount = data.screenName;
      this.form.taskDescription = data.title;
      let address = data.titleGender;
      console.log(address);
      if(address !=null && address != undefined){
        this.form.address = address.toUpperCase();
      }
    },
    doAfterSelectOtherkvsList: function(data) {
      console.log("doAfterSelectOtherkvsList");
      $('#selectotherperson').attr("class", "input-group-btn");
      let fn = this.form.kvsGeneratorLists[0].firstName;
      let ln = this.form.kvsGeneratorLists[0].lastName;
      if(fn == undefined && ln ==undefined){
        let kvslist = this.form.kvsGeneratorLists[0];
        let name = data.printENName;
        let array = name.split(",");
        kvslist.firstName = array[0];
        kvslist.lastName = array[1];
        let address = data.titleGender;
        if(address !=null && address != undefined){
          kvslist.address = address.toUpperCase();
        }
        kvslist.unit=data.department
        kvslist.staffCode=data.staffCode
        kvslist.email = data.email;
        kvslist.telPhone = data.telephone;
        kvslist.adAcount = data.screenName;
        kvslist.employer="VWATJ";
        kvslist.employerAddress="No. 49, Zhong Nan Wu Street TEDA West, Tianjin 300462, P.R. China";
        kvslist.taskDescription=data.title;
      }else{
        var newItem = {};
        for (var key in this.form.kvsGeneratorLists[0]) {
          newItem[key] = "";
        }
        let name = data.printENName;
        let array = name.split(",");
        newItem.firstName = array[0];
        newItem.lastName = array[1];
        let address = data.titleGender;
        newItem.address="MR";
        if(address !=null && address != undefined){
          newItem.address = address.toUpperCase();
        }
        newItem.adAcount = data.screenName;
        newItem.unit=data.department
        newItem.email = data.email;
        newItem.telPhone = data.telephone;
        newItem.staffCode=data.staffCode
        newItem.userId = data.id;
        newItem.employer="VWATJ";
        newItem.employerAddress="No. 49, Zhong Nan Wu Street TEDA West, Tianjin 300462, P.R. China";
        newItem.taskDescription=data.title;
        let list  = this.form.kvsGeneratorLists;
        let flg=true;
        for(let i = 0;i < list.length; i++){
          if(list[i].adAcount === newItem.adAcount){
            flg = false;
          }
        }
        if(flg){
          list.push(newItem)
        }
      }
    },
    findTokvsName:function(){
       let tokvs = this.form.toKvs;
       let _this = this;
      //  console.log(tokvs==="");
       if(tokvs != ""){
        // console.log(tokvs.replace(/\//g,'***'));
        var url = "/KvsAccessGenerator/getToKvsName/" +  tokvs.replace(/\//g,'***');
          this.GL.actUtil.query("get", url, "", function(data) {
            let namelist = JSON.parse(data);
            let chinaName = namelist.chinaName;
            let germanyName = namelist.germanyName;
            _this.form.germanyName = germanyName;
            _this.form.chinaName = chinaName;
          });
       }else{
          _this.form.germanyName = "";
          _this.form.chinaName = "";
       }
    },
    //表格行删除调用方法
    deleteItineraryRows: function(rowId) {
      if (this.form.kvsGeneratorLists.length > 1) {
        this.form.kvsGeneratorLists.splice(rowId, 1);
      } else {
        $.alert(
          "At least one complete record in Participant Information is needed. 至少需要填写一条完整的行程记录。"
        );
      }
    },
  },
  mounted() {
		//放在save，submit是数据在数据库中保存两次
		this.$root.eventHub.$off('updateFormData');
		this.$root.eventHub.$on('updateFormData', (form) => {
			this.form = form;
    });
    $("#delete0").css("display","none");
  },
  data() {
    //返回的数据对象
    var dm = {};

    //判断是创建还是获取
    var id = this.$route.params.id || this.$route.query.id;
    if (id) {
      var url = "/form/KvsAccessGenerator/get/" + id;
    } else {
      var url = "/form/KvsAccessGenerator/create/";
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
    console.log(dm.form);
    // dm.form.chinaName = "";
    // dm.form.germanyName = "";
    return dm;
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
    confirmkey: {
      // 动态计算是否显示confirm按钮
      get: function() {
        return (
          (this.$route.query.taskKey != null &&
            this.$route.query.taskKey.indexOf("CfController") != -1 &&
            (this.$route.path.indexOf("audit") > -1 ||
              this.$route.path.indexOf("reAudit") > -1)) ||
          (this.$route.query.taskKey == null && this.form.status == null) ||
          (this.$route.query.taskKey == null && this.form.status == 2) ||
          (this.form.status == 9 &&
            (this.$route.path.indexOf("audit") > -1 ||
              this.$route.path.indexOf("reAudit") > -1))
        );
      }
    },
    cfControllers: {
      // 动态计算是否显示confirm按钮
      get: function() {
        return (
          this.$route.query.taskKey != null &&
          this.$route.query.taskKey.indexOf("CfController") != -1 &&
          (this.$route.path.indexOf("audit") > -1 ||
            this.$route.path.indexOf("reAudit") > -1)
        );
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
    ifrequired: {
      get: function() {
        if (this.form.travelType == "1") {
          return "false";
        }
        return "true";
      }
    },
    applicationTime: {
      get: function() {
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      }
    }
  }
};
</script>
<style>
 #delete0{
   display: none;
 }
</style>


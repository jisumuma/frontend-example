<template>
 <!-- Content Wrapper. Contains page content -->
  <div class="content-header">
    <!-- Content Header (Page header) -->

    <section class="content-header">
      <h1>Labor Contract Renewal Confirmation
      </h1>
      <ol class="breadcrumb">
        <li><a href="#">1.HRBP </a></li>
        <li><a href="#">2.Supervisor</a></li>
        <li class=""><a href="#">3.Supervisor(>=T+/29)</a></li>
        <li class=""><a href="#">4.Head of HRBP</a></li>
        <li class=""><a href="#">5.Head of HR Orga.&Education</a></li>
        <li class=""><a href="#">6.BOM</a></li>
        <li class=""><a href="#">7.HRBP</a></li>
      </ol>
      <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date : {{applicationTime}}</strong>
			</span>
    </section>
    <!-- Main content -->
    
      <section class="  container-fluid">
          <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title pull-left" style="margin-right:10px;"> Applicant Info. 申请人信息  </h3>
            
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">
                <form-group col="md-3" type="input" other-rules="" v-model="form.applicantName" name="applicantName" readonly="readonly"></form-group>
                <form-group col="md-3" type="input" other-rules="" v-model="form.applicantStaffcode" name="applicantStaffcode" readonly="readonly"></form-group>
                <form-group col="md-3" type="input" other-rules=""  v-model="form.applicantPosition" name="applicantPosition" readonly="readonly"></form-group>
                <form-group col="md-3" type="input" other-rules=""  v-model="form.applicantDept" name="applicantDept" readonly="readonly"></form-group>
						  </div>

              <div class="row">
                <form-group col="md-3" type="input" other-rules="" v-model="form.startDate" name="startDate" readonly="readonly"></form-group>
                <form-group col="md-3" type="input" other-rules="" v-model="form.currentContractTermEndDate" name="currentContractTermEndDate" readonly="readonly"></form-group>
                <form-group col="md-3" type="input" other-rules=""  v-model="form.bondPeriodEndDate" name="bondPeriodEndDate" readonly="readonly"></form-group>
                <form-group col="md-3" type="input" other-rules=""  v-model="form.performanceOfLastYear" name="performanceOfLastYear" readonly="readonly"></form-group>
						  </div>
              <div class="row">
              	 
										 
                <form-group col="md-3" other-rules="" type="select" uri="/dict/list?groupName=contractRecords"   v-model="form.contractRecords" disabled="true" name="contractRecords"></form-group>
									 
                  <div class="col-md-6">
                  <div class="form-group">
         
                    <label for="">Warning Letter in Current Contract Term 原合同期限内是否有警告信 </label>
                    <div  class="radio" :class="{'is-danger': errors.has('warningLetter') }" style="margin-bottom: 5px;margin-top: 5px;">
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('warningLetter') }" :name="'warningLetter'" :id="'warningLetter'" v-validate="'required'" v-model="form.warningLetter" value="1" :disabled="true">Yes 是</label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('warningLetter') }" :name="'warningLetter'" :id="'warningLetter'" v-validate="'required'" v-model="form.warningLetter" value="0" :disabled="true"> No 否</label>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
          </form>
        </div>

      </section>
      <!-- /.content -->
        <section class=" container-fluid"  >
          <div class="box box-primary">
            <div class="box-header with-border">
    
              <h3 class="box-title pull-left" style="margin-right:10px;">   <i v-if="this.form.commentsByBU !='2'" class="fa fa-asterisk text-red" style="font-size: 10px;"></i>New Contract Information  新合同信息  </h3>
            </div>
            <div class="box-body col-md-12">Note: The terms and conditions of the Labor Contract shall remain the same and maintain the legal effect binding upon the Parties during the term of the Labor Contract. 备注：劳动合同约定条件应保持原状并于《劳动合同》期限内持续有效。</div>
            <form role="form">
            <div class="box-body">
              <div class="row">
              	<div class="col-md-4">
									 <div class="form-group">
                     <div v-if="this.form.commentsByBU=='2'" class="radio" :class="{}" style="margin-bottom: 5px;margin-top: 5px;">
                      <label style="margin-right: 10px;"><input type="radio" :class="{}" :name="'newContractInformation'" :id="'newContractInformation'"    value="" disabled="disabled">Fixed-term contract for 5 Years 续订5年固定期限合同</label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{}" :name="'newContractInformation'" :id="'newContractInformation'"     value="" disabled="disabled" > Open-ended Contract 续订无固定期限合同 
                      <i class="fa fa-fw fa-info-circle"  v-if="form.contractRecords=='2'"  @mouseover="showFirstTips()" @mouseout="hideFirstTips()"></i>
                       <i class="fa fa-fw fa-info-circle" v-if="form.contractRecords=='1'&& form.newContractInformation=='2' " @mouseover="showTips()" @mouseout="hideTips()"></i>
                      </label>
                       <label style="margin-right: 10px;" v-if="form.newContractInformationTime=='Other'" ><input type="radio" :class="{}" :name="'newContractInformation'" :id="'newContractInformation'"     value="" disabled="disabled" > Fixed-term contract for {{this.form.contractTime}} Years 续订{{this.form.contractTime}}年固定期限合同</label>
                     </div>
                     <div v-else class="radio" :class="{'is-danger': errors.has('newContractInformation') }" style="margin-bottom: 5px;margin-top: 5px;">
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('newContractInformation') }" :readonly="newReadonly" :name="'newContractInformation'" :id="'newContractInformation'" v-validate="'required'" v-model="form.newContractInformationTime" value="1" :disabled="checkContract||newReadonly">Fixed-term contract for 5 Years 续订5年固定期限合同</label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('newContractInformation') }" :readonly="newReadonly" :name="'newContractInformation'" :id="'newContractInformation'" v-validate="'required'" v-model="form.newContractInformationTime" value="2" :disabled="isSupervisor||newReadonly" > Open-ended Contract 续订无固定期限合同
                       <i class="fa fa-fw fa-info-circle"  v-if="form.contractRecords=='2'"  @mouseover="showFirstTips()" @mouseout="hideFirstTips()"></i>
                       <i class="fa fa-fw fa-info-circle" v-if="form.contractRecords=='1'&& form.newContractInformation=='2' " @mouseover="showTips()" @mouseout="hideTips()"></i>
                       </label>
                       <label  v-if="form.newContractInformationTime=='Other'" style="margin-right: 10px;"  ><input type="radio" :class="{'is-danger': errors.has('newContractInformation') }" :readonly="newReadonly" :name="'newContractInformation'" :id="'newContractInformation'" v-validate="'required'" v-model="form.newContractInformationTime" value="Other" :disabled="newReadonly">Fixed-term contract for {{this.form.contractTime}} Years 续订{{this.form.contractTime}}年固定期限合同</label>
                     </div>
                 </div>
               </div>
               	<div  class="col-md-8 "  v-if="form.contractRecords=='2'||(form.contractRecords=='1'&& form.newContractInformation=='2')">
									 <div class="form-group">
                     <div  style=" margin-top: 35px;margin-left: -198px;">
                      <div id="popupTips"  style=" margin-left: 10px;  position: absolute;visibility: hidden;overflow: hidden;border:1px solid #CCC;z-index:999;background-color:#F9F9F9;border:1px solid #333;padding:5px;">
                         <label  v-if="form.contractRecords=='2'" style=" font-size:13px;font-weight:normal;">According to Chinese labor contract law, the 3rd contract with an employee shall be an open-ended contract. 根据中国劳动合同法，和员工签署的第三份合同应为无固定期限合同。 </label>
                          <img v-if="form.contractRecords=='1'&& form.newContractInformation=='2' " style="width:900px;height:400px;" src="../../../assets/img/tips.png"  >
                      </div>
                     </div>
                     
                 </div>
               </div>
                     
                
              </div>

                <div class="row" v-if="form.contractRecords=='1'&& form.newContractInformation=='2' ">
                    <div class="col-md-12">
                     <div class="form-group">
                         <label for="">Reason 原因: </label>
                        <form-group   other-rules="required" haslable="false" type="textarea"   id="contractReason" v-model="form.contractReason" name="Reason"  :readonly="isSupervisor"></form-group>
                        
                     </div>
                      </div>
                  </div>
            </div>
          </form>
          </div>
        </section>
      <section class="  container-fluid">
          <div class="box box-primary">
            <div class="box-header with-border">
            
              <h3 class="box-title pull-left" style="margin-right:10px;">   <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Comments by BU 员工所在部门意见</h3>
            </div>
            <form role="form">
                <div class="box-body">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <div  class="radio" :class="{'is-danger': errors.has('commentsByBU') }" style="margin-bottom: 5px;margin-top: 5px;">
                          <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('commentsByBU') }" :name="'commentsByBU'" :id="'commentsByBU'" v-validate="'required'" v-model="form.commentsByBU" value="1" :disabled="isSupervisor" @click="changeValue()">Agree to renew the contract with the employee 同意与员工续订合同</label>
                          <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('commentsByBU') }" :name="'commentsByBU'" :id="'commentsByBU'" v-validate="'required'" v-model="form.commentsByBU" value="2" :disabled="isSupervisor" @click="setNewInfo()"> Do not agree to renew the contract with the employee 不同意与员工续订合同</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row" >
                    <div class="col-md-12" v-if="form.commentsByBU=='2'" >
                         <label for="">If not agree to renew contract, please elaborate reasons 如不同意续签合同，请阐述原因: </label>
                        <form-group  other-rules="required" haslable="false" type="textarea"   id="reason" v-model="form.reason" name="reason" :readonly="isSupervisor"></form-group>
                        
                     </div>
                  </div>
                </div>
            </form>
          </div>
        </section>

      <section class=" container-fluid">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title pull-left" style="margin-right:10px;">Upload Attachment 上传附件</h3>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <upload2 :readonly="isSupervisor" v-model="form.attachmentIds" required="false" buttonText="Upload Attachment " :attachments="form.attachments" multi="true" fileSizeLimit="5MB"></upload2>
                </div>
              </div>
            </div>
          </div>
        </section>
     
      <comment v-if="processTaskId !=null &&form.status != 9&&isSupervisor" v-model="form.approval.approvalRemark"></comment>
      <SaveSubmitAndBack v-if="showSave&&(this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator"   lableName="Submit" ></SaveSubmitAndBack>
      <ConfirmWithSendEmail v-else-if="'hrbp' == processTaskKey&&(form.status==1)" :form="form" :validator="this.$validator" lableName="Confirm" ></ConfirmWithSendEmail>
      <router-view v-else :form="form" entityId="ContractExtension" vclass="btn-left" uri="/form/ContractExtension/update" :validator="this.$validator" v-on:beforeapprovel="beforesubmit" v-on:beforesubmit="beforesubmit"></router-view> 
      <comment-list v-if="form.processInstanceId !=null"></comment-list>
  </div>
  <!-- /.content-wrapper -->



</template>
		<modaldialog :vclass="vclass"></modaldialog>
<script>
	import global_ from './../../../components/Common/Util/Global.vue'

  
	export default {
		name: 'ContractExtension',
		methods:{
      changeValue:function(){
          this.form.newContractInformation=this.oldvalue;
      },
        	beforesubmit:function(){
          var uri = "/ContractExtension/checkEmployee";
					var _this = this;
					this.GL.actUtil.query("POST", uri, this.form, function(data) {
						var returndata = JSON.parse(data);
						console.log(returndata);
						if(returndata && returndata.status.indexOf("success") > -1) {
							if(returndata.msg) {
							 
							}
			 
						 
							_this.form.approvelstatus = true;
								_this.form.submitstatus=true;
						} else if(returndata && returndata.status.indexOf("fail") > -1) {
							if(returndata.msg) {
								$.alert(returndata.msg);
							}
						 
							_this.form.approvelstatus = false;
								_this.form.submitstatus=false;
						}

					});
  
			 
				},
      showTips:function(){
        $("#popupcontent").show();
        var popUp = document.getElementById("popupTips");
        popUp.style.visibility = "visible";
      },
       hideTips:function(){
       
        var popUp = document.getElementById("popupTips");
        popUp.style.visibility = "hidden";
      },
       showFirstTips:function(){
        $("#popupcontent").show();
        var popUp = document.getElementById("popupTips");
        popUp.style.visibility = "visible";
      },
       hideFirstTips:function(){
       
        var popUp = document.getElementById("popupTips");
        popUp.style.visibility = "hidden";
      },
      setNewInfo:function(){
        this.form.newContractInformation="";
      },
			back: function () {
				if(Config.MODE_TYPE === 'apon'){
					top.location.href = Config.getAPONURL();
				}else{
					this.$router.back();
				}
			}, 

		 
	    	//表格内组件检查调用方法
	    	checkOther:function(data){
	    		//console.log("this is check");
	    	},
        

		},

		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id){
				var url = "/form//ContractExtension/get/"+id;
			}else{
				var url = "/form//ContractExtension/create/";
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
			dm.oldvalue=dm.form.newContractInformation;
			console.log("!!!!"+dm.form.contractRecords);
			return dm;
		},
		watch:{


		},
    	mounted() {
			var form = this.form;
     

		},
		computed:{
      newReadonly:{
        get:function() {
          if (this.form.newContractInformationTime == 'Other') {
            console.log(3)
            return true;
          } else {
            return false;
          }
        }
      },
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
      readonly: {
				// 动态计算readonly的值
				get: function() {

					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
     checkContract: {
				// 动态计算readonly的值
				get: function() {
           var currentUser=this.GL.getLoginUser();
          return this.form.contractRecords=='2'|| !(this.form.isSupervisor=='1'&& this.form.status == 1&& this.$route.query.taskKey.indexOf('edit') == -1);
				}
			},
    isSupervisor: {
				// 动态计算readonly的值
				get: function() {
         var currentUser=this.GL.getLoginUser();
          console.log("isSupervisor:"+this.form.isSupervisor=='1');
          return !(this.form.isSupervisor=='1'&& this.form.status == 1&& this.$route.query.taskKey.indexOf('edit') == -1);
				}
			},
  showSave: {
				// 动态计算readonly的值
				get: function() {
         
          return (this.form.blueWhite=='b' && this.form.status==1 && 'AssistantManager'==this.$route.query.taskKey)||(this.form.blueWhite=='w' && this.form.status==1 && 'supervisor'==this.$route.query.taskKey)
				}
			},
      isLoginUser:{
        get:function(){

          var curUser=this.GL.getLoginUser();
          if(curUser==this.form.createUserId){
            return true;

          }else{
            return false;
          }
        }

      },
      
      isFinish:{

        get:function(){
          return (this.form.processInstanceId != null && this.form.status != null && this.form.status == 0);
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

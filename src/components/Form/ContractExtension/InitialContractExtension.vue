<template>
 <!-- Content Wrapper. Contains page content -->
  <div class="content-header">
    <!-- Content Header (Page header) -->

    <section class="content-header">
      <h1>Labor Contract Renewal Confirmation 劳动合同续签确认
      </h1>
      <ol class="breadcrumb">
        <li><a href="#">1.HRBP </a></li>
        <li><a href="#">2.Assistant Manager</a></li>
        <li class=""><a href="#">3.MK Supervisor(>=T+/29)</a></li>
        <li class=""><a href="#">4.Head Of HRBP</a></li>
        <li class=""><a href="#">5.MK Supervisor(>=T+/29)</a></li>
      </ol>
      <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date : {{applicationTime}}</strong>
			</span>
    </section>
    <!-- Main content -->
    <div v-if="form.initial='1'">
      <section class="content container-fluid">
        <div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title pull-left">Select employee 选择员工  </h3>
				
					</div>
					<form role="form">
						<div class="box-body">
							<div class="row">
               <div class="col-md-12">

                 <table class="table table-bordered" id="search" >
                 <tr>
                    <td width="16%" style="font-weight: bold;">Select individule employee 选择个人</td>
                    <td width="6%"> 
                     <span class="input-group-btn" >
                      <button class="btn btn-primary btn-flat" type="button"   data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i>
                      </button>
                     </span>
                    </td>
                     <td width="16%" style="font-weight: bold;">Upload mutiple employees 批量上传</td>
                     <td width="18%">
                     	<a style='display: inline-block; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/hrualcarryover/getTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Batch Upload Template 批量上传模板</a>
                     </td>
                    <td  > 
                     <label class="btn btn-primary btn-xs" style='margin-top: -3px;margin-left: 15px;float: left;font-size: 14px;' for="xFile">Upload</label>
										<input style='display:inline-block;position:absolute;clip:rect(0 0 0 0);' id="xFile" type="file" @change="upload">
                    </td>
                 </tr>
                </table>
							 	<table class="table table-bordered" id="selectEmployee">
										<tbody>
											<tr>
												<th style="text-align: center;vertical-align: middle;">No.</th>
												<th style="text-align: center;vertical-align: middle;">Name<br>姓名</th>
												<th style="text-align: center;vertical-align: middle;">Staff Code<br>员工号</th>
												<th style="text-align: center;vertical-align: middle;">Position <br>工作岗位</th>
												<th style="text-align: center;vertical-align: middle;">Department <br>所属部门</th>
												<th style="text-align: center;vertical-align: middle;">Start date at VWATJ <br>加入公司时间</th>
												<th style="text-align: center;vertical-align: middle;">Current contract term end date <br>现合同结束日期</th>
                        <th style="text-align: center;vertical-align: middle;">Bond period end date <br>服务期截止日期</th>
                        <th style="text-align: center;vertical-align: middle;">Performance of last year <br>上一年度绩效</th>
											 <th style="text-align: center;vertical-align: middle;">Previous contract records <br>连续订立合同次数</th>
                       <th style="text-align: center;vertical-align: middle;">Warning letter in current contract term<br>原合同期限内是否有无警告信</th>
											</tr>
											<tr v-bind:key="index" v-for="(entry,index) in form.hrUalRecordList">
												<td style="text-align: center;vertical-align: middle;">
													<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.id">
													<input type="text" class="form-control hidden" id="" placeholder="Name" v-model="entry.ticketNo"> {{index+1}}
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.staffcode}}
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.name}}
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.remainingLegallyLeaves}} day(s)
												</td>
												<td style="text-align: center;vertical-align: middle;">
													{{entry.remainingLegallyLeaves}} day(s)
												</td>
												<td style="text-align: center;vertical-align: middle;">
													<!--<form-group type="input" other-rules="required" haslable="false" :readonly="readonly" v-model="entry.carryoverDays" :name="'carryoverDays'+index"></form-group>-->
													<input type="text" :name="'carryoverDays'+index" :id="'carryoverDays'+index" :index="index" :class="{'form-control':true,'input':true,'number':true, 'is-danger': errors.has('carryoverDays'+index) }" placeholder="Requested leave carry-over days " :readonly="readonly" v-validate="'required'" v-model="entry.carryoverDays">
												</td>
												<td style="text-align: center;vertical-align: middle;">
													<!--<form-group type="input" other-rules="required" haslable="false" :readonly="readonly" v-model="entry.carryoverReason" :name="'carryoverReason'+index"></form-group>
										-->
													<input type="text" :name="'carryoverReason'+index" :id="'carryoverReason'+index" :index="index" :class="{'form-control':true,'input':true,'is-danger': errors.has('carryoverReason'+index) }" placeholder="Reasons for leave carry-over " :readonly="readonly" v-validate="'required'" v-model="entry.carryoverReason">

												</td>

												<td v-if="!readonly" style="width: 50px;" class="text-center">
													<a href="javascript:;" v-if="!readonly" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>
												</td>
											</tr>
										</tbody>
									</table>
              </div>
							</div>
						</div>
					</form>
				</div>


      </section>
      <!-- /.content -->
    </div>
  </div>
  <!-- /.content-wrapper -->



</template>
		<modaldialog :vclass="vclass"></modaldialog>
<script>
	import global_ from './../../../components/Common/Util/Global.vue'

  
	export default {
		name: 'ContractExtension',
		methods:{
        
      afterChooseUser :function(data){
        $("#wifiAccountTr1").show();
        $("#wifiAccountTr2").show();
        $("#wifiAccountTr3").show();
        $("#wifiAccountTr4").show();
        $("#deleteBtn1").show();
        $("#deleteBtn2").show();
        $("#deleteBtn3").show();
        $("#deleteBtn4").show();
        this.form.wifiUserName=data.wifiUserName;
        this.form.wifiUserCompany=data.wifiUserCompany;
        this.form.wifiUserPhone=data.wifiUserPhone;
        this.form.wifiUserEmail=data.wifiUserEmail;
        this.form.wifiAccount1=data.wifiAccount1;
        this.form.wifiAccount2=data.wifiAccount2;
        this.form.wifiAccount3=data.wifiAccount3;
        this.form.wifiAccount4=data.wifiAccount4;

        this.form.wifiPassword1=data.wifiPassword1;
        this.form.wifiPassword2=data.wifiPassword2;
        this.form.wifiPassword3=data.wifiPassword3;
        this.form.wifiPassword4=data.wifiPassword4;
        this.form.wifiUserId1=data.wifiUserId1;
        this.form.wifiUserId2=data.wifiUserId2;
        this.form.wifiUserId3=data.wifiUserId3;
        this.form.wifiUserId4=data.wifiUserId4;

        var period=data.usingPeriod;
        var arr=period.split("-");

        this.form.usingPeriodFrom1=arr[0];
        this.form.usingPeriodTo1=arr[1];
        this.form.usingPeriodFrom2=arr[0];
        this.form.usingPeriodTo2=arr[1];
        this.form.usingPeriodFrom3=arr[0];
        this.form.usingPeriodTo3=arr[1];
        this.form.usingPeriodFrom4=arr[0];
        this.form.usingPeriodTo4=arr[1];


        if(data.wifiAccount4!="-"){
          this.form.wifiAccountNum='4';

        }else
         if(data.wifiAccount3!="-"){
          this.form.wifiAccountNum='3';
        }else
         if(data.wifiAccount2!="-"){
          this.form.wifiAccountNum='2';
        }else
           {
          this.form.wifiAccountNum='1';
        }
        tmpNum=parseInt(this.form.wifiAccountNum);
        this.form.tempNum=tmpNum;
        this.$forceUpdate();
      },
		    check:function(){
           return ((this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit')==-1)||(this.form.processInstanceId !=null && this.form.status != null && this.form.status != 2 && this.form.status != 9));
			  },

      saveWifiList:function(){
          var wifiId=this.form.id;
          var num=this.form.wifiAccountNum;
          var appType=this.form.applicationType;
        if(appType=='1'){
          var usingPeriodFrom=this.form.usingPeriodFrom;
          var usingPeriodTo=this.form.usingPeriodTo;
          var wifiAccount1=$("#wifiAccount1").val();
          var wifiAccount2=$("#wifiAccount2").val();
          var wifiAccount3=$("#wifiAccount3").val();
          var wifiAccount4=$("#wifiAccount4").val();

          var wifiPassword1=$("#wifiPassword1").val();
          var wifiPassword2=$("#wifiPassword2").val();
          var wifiPassword3=$("#wifiPassword3").val();
          var wifiPassword4=$("#wifiPassword4").val();


          var wifiList="";
          if(num=='1'){
            if(wifiAccount1==""||wifiPassword1==""){
              $.alert("WIFI Account/Password WIFI is null!账号/密码不能为空！");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1;
            }
          }
          if(num=='2'){
            if(wifiAccount1==""||wifiPassword1==""||wifiAccount2==""||wifiPassword2==""){
              $.alert(" Account/Password WIFI is null!账号/密码不能为空！WIFI");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1+"&"+wifiAccount2+"@w@"+wifiPassword2;
            }
          }
          if(num=='3'){
             if(wifiAccount1==""||wifiPassword1==""||wifiAccount2==""||wifiPassword2==""||wifiAccount3==""||wifiPassword3==""){
              $.alert("WIFI Account/Password WIFI is null!账号/密码不能为空！");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1+"&"+wifiAccount2+"@w@"+wifiPassword2+"&"+wifiAccount3+"@w@"+wifiPassword3;
            }
          }
          if(num=='4'){
             if(wifiAccount1==""||wifiPassword1==""||wifiAccount2==""||wifiPassword2==""||wifiAccount3==""||wifiPassword3==""||wifiAccount4==""||wifiPassword4==""){
              $.alert("WIFI Account/Password WIFI is null!账号/密码不能为空！");
              return;
            }else{
              wifiList=wifiAccount1+"@w@"+wifiPassword1+"&"+wifiAccount2+"@w@"+wifiPassword2+"&"+wifiAccount3+"@w@"+wifiPassword3+"&"+wifiAccount4+"@w@"+wifiPassword4;
            }
          }

          $.ajax({
            url: Config.getBaseURL() + "/WifiAccount/commit",
            data: {
              "wifiId":wifiId,
              "wifiAccountNum":  num,
              "appType": appType,
              "usingPeriodFrom": usingPeriodFrom,
              "usingPeriodTo": usingPeriodTo,
              "wifiList": wifiList,
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {
              //$.alert(data);
            },
            error: function(msg) {
              //$.alert(msg);
             // this.closemodal;

            }
				});
      }
        },
        completeTaskCom:function(){
				var id = this.$route.params.id || this.$route.query.id;
				var taskId = this.$route.query.taskId;
				var router = this.$router;
				this.GL.actUtil.completeTask(taskId,"approve",this.form,function(data){
					//$('#commitModal').modal('toggle');
					setTimeout(function(){
						//$("#loadingMask,#progressBar").hide();
						//$('#commitModal').modal('toggle');
						setTimeout(function(){
							if(process.env.MODE === 'apon'){
								//top.location.href = Config.APONURL;
								top.location.href = Config.getAPONURL();
							}else{
								router.push({ path: '/index/task'});
							}
						},100);
					},800);
				});
			},
			back: function () {
				if(Config.MODE_TYPE === 'apon'){
					top.location.href = Config.getAPONURL();
				}else{
					this.$router.back();
				}
			},
			commit: function () {
				$("#loadingMask,#progressBar").show();
        var saveAccount=this.saveWifiList;
				var completeTaskFn = this.completeTaskCom;
				var validatorFn = this.$validator;
				setTimeout(function(){

					if(validatorFn){

						validatorFn.validateAll().then(result => {
							if (result) {
                saveAccount();
                setTimeout(function(){
								completeTaskFn();},1000);

							}else{
								$("#loadingMask,#progressBar").hide();

							}
						});
					}else{

              saveAccount();
					 setTimeout(function(){
								completeTaskFn();},1000);
					}
				},100);
			},

			//表格行添加调用方法
	    	insertItemRows:function(){
	    		var newItem = {};
	    		for(var key in this.form.shareList[0]){
	    			newItem[key] = "";
				}
				this.form.shareList.push(newItem);
	    	},
	    	//表格行删除调用方法
	    	deleteItemRows:function(rowId){
	    		this.form.shareList.splice(rowId, 1);
	    	},
	    	//表格内组件检查调用方法
	    	checkOther:function(data){
	    		//console.log("this is check");
	    	},
        checkPhoneNum:function(){
          var wifiUserPhone=$("#wifiUserPhone").val();

          var regs=/^[0-9]*$/;
          if(!regs.test(wifiUserPhone)){
              $.alert("Cell-Phone format is not correct.手机号码格式不正确。");
              $("#wifiUserPhone").val("");
          }
        },
        checkEmail:function(){
          var wifiUserEmail=$("#wifiUserEmail").val();
         // var regs="^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";
         var regs="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$";
          if(!regs.test(wifiUserEmail)){
              $.alert("E-mail format is not correct.邮箱格式不正确。");
              $("#wifiUserEmail").val("");
          }
        }

		},

		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id){
				var url = "/form//WifiAccount/get/"+id;
			}else{
				var url = "/form//WifiAccount/create/";
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

			return dm;
		},
		watch:{


		},
    	mounted() {
			var form = this.form;
      

		},
		computed:{
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
      readonlyForExtension: {
				// 动态计算readonly的值
				get: function() {
          //console.log(this.form.applicationType);

					return(this.form.applicationType=='2'||this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
      isFinish:{

        get:function(){
          return (this.form.processInstanceId != null && this.form.status != null && this.form.status == 0);
        }
      },
      wifiList1:function(){
          var num=this.form.wifiAccountNum;

         if(parseInt(num)>=1){
           return true;
         }
        },
       wifiList2:function(){
          var num=this.form.wifiAccountNum;
         if(parseInt(num)>=2){
           return true;
         }
        },
      wifiList3:function(){
          var num=this.form.wifiAccountNum;
         if(parseInt(num)>=3){
           return true;
         }
      },
      wifiList4:function(){
        var num=this.form.wifiAccountNum;
        if(parseInt(num)>=4){
           return true;
         }
      },

       showWifiUserInfo:function(){

       	return this.GL.hasRole('IT Client Service');
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

<template>
  <div>
    <section class="content-header">
		<h1 style="font-size:22px;">Overtime Plan Sheets</h1>
		<ol class="breadcrumb" >
			<li><a>1.System</a></li>
			<li><a>2.Division Head/BU Head</a></li>
			<!--<li><a>3.BoM</a></li>-->
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
				<h3 class="box-title">Overtime Info. <label>加班信息</label>{{divisionDisplay ? "(OT > 20 hours)" : ""}}</h3>
			</div>
			<form role="form">
				<div class="box-body">
					<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
						<tbody v-if="divisionDisplay">
							<tr class="bg-gray-light">
								<th width="3%" >No. <br>序号</th>
								<th width="11%" >Application No. <br>申请单号</th>
								<th width="8%" >Application Time <br>申请时间</th>
								<th width="8%" >Applicant <br>申请人</th>
								<th width="8%"  >Staff Code <br>员工号</th>
								<th width="10%"  >Employee Name <br>员工姓名</th>
								<th width="8%"  >Function <br>职务</th>
								<th width="8%" >Monthly average OT hours (in Current Cycle) <br>过去月平均<br>加班时数</th>
								<th width="8%"  >Planned Period <br>预加班周期</th>
								<th width="8%"  >Planned Hours <br>本月预加班<br>时数合计</th>
								<th width="12%" >Planned Month Overtime Reason <br>本月加班原因</th>
								<th width="15%" >Reject/ Comments <br>不通过/ 说明</th>
							</tr>
							<tr v-for="(entry,index) in form.overTimeWhiteList">
								<td>{{index + 1}}</td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.ticketNo" :name="'ticketNo'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.createDatefm" :name="'dateCreate'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.departmentOwnerName" :name="'departmentOwnerName'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorStaffcode" :name="'creatorStaffcode'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorName" :name="'creatorName'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorFunction" :name="'creatorFunction'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index"></form-group></td>  <!--过去月平均加班时数<td>{{entry.avgOvertimeHours}}</td> -->
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.overtimePeriod" :name="'overtimePeriod'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.approvedOvertimeHours" :name="'approvedOvertimeHours'+index"  :customStyle="entry.approvedOvertimeHours > 36 ? 'color : red' : (entry.approvedOvertimeHours > 20 ? 'color : orange' : '')"></form-group></td>
								<td>
									<form-group type="input" haslable="false" isTable="true" v-model="entry.overtimeReason" :name="'overtimeReason'+index" readonly="true" ></form-group>
								</td>
								<td>
									<input style="float:left;" type="checkbox" v-model="checked[entry.id]" @change="approve(entry)" />
									<form-group style="margin-left: 20px;" :other-rules="checked[entry.id]?'required|max:300':'max:300'" type="input" haslable="false" isTable="true"  v-model="entry.divisionHeadRemark" :name="'divisionHeadRemark'+index" v-on:change="inputRemark(entry.divisionHeadRemark)" ></form-group>
								</td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr class="bg-gray-light">
								<th width="3%" >No. <br>序号</th>
								<th width="11%" >Application No. <br>申请单号</th>
								<th width="8%" >Application Time <br>申请时间</th>
								<th width="8%" >Division Head/BU Head <br>主管</th>
								<th width="8%" >Applicant <br>申请人</th>
								<th width="8%">Staff Code <br>员工号</th>
								<th width="10%">Employee Name <br>员工姓名</th>
								<th width="8%">Function <br>职务</th>
								<th width="8%" >
									<i class="fa fa-fw fa-info-circle text-info" title="In Current Cycle 本周期内"></i>
									Monthly Average Hours<br>平均加班时数
								</th>
								<th width="6%">Planned Period <br>预加班周期</th>
								<th width="6%">Planned Hours <br>本月预加班<br>时数合计</th>
								<th width="12%" >Planned Month Overtime Reason <br>本月加班原因</th>
								<th width="15%" >Reject/ Comments <br>不通过/ 说明</th>
							</tr>
							<tr v-for="(entry,index) in form.overTimeWhiteRecords">
								<td>{{index + 1}}</td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.ticketNo" :name="'ticketNo'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.createDatefm" :name="'dateCreate'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.divisionHeadName" :name="'divisionHeadName'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.departmentOwnerName" :name="'departmentOwnerName'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorStaffcode" :name="'creatorStaffcode'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorName" :name="'creatorName'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.creatorFunction" :name="'creatorFunction'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index"></form-group></td>  <!--过去月平均加班时数<td>{{entry.avgOvertimeHours}}</td> -->
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.overtimePeriod" :name="'overtimePeriod'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.approvedOvertimeHours" :name="'approvedOvertimeHours'+index"  :customStyle="entry.approvedOvertimeHours > 36 ? 'color : red' : (entry.approvedOvertimeHours > 20 ? 'color : orange' : '')"></form-group></td>
								<td>
									<form-group type="input" haslable="false" isTable="true" v-model="entry.overtimeReason" :name="'overtimeReason'+index" readonly="true" >
									</form-group>
								</td>
								<td>
									<input style="float:left;" type="checkbox" v-model="entry.divisionHeadReject" readonly="true" disabled="true" />
										<form-group style="margin-left: 20px;" type="input" haslable="false" isTable="true" v-model="entry.divisionHeadRemark" :name="'divisionHeadRemark'+index" readonly="true">
										</form-group>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>
		</div>
	
		<comment v-if="processTaskId != null && form.status != 9 && form.status != 2 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
		<Confirm v-if="(this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)" :form="form" :validator="this.$validator" lableName="Approve" uri="/overTimeWhite/saveOTSS" v-on:beforeapprovel="beforeapprovel"></Confirm>
		<router-view v-else :form="form" entityId="OverTimeWhiteSheets" vclass="btn-left" uri="/form/OverTimeWhiteSheets/update" :validator="this.$validator" v-on:beforeapprovel="beforeapprovel"></router-view>
		<comment-list v-if="form.processInstanceId !=null" systemSubmit="true"></comment-list>
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
export default {
	name: "OverTimeWhiteSheets",
	methods: {
		//approve前校验
		beforeapprovel: function() {
			this.form.approvelstatus=true;
		},
		approve:function(overTimeWhite){
	    	var check = this.checked[overTimeWhite.id];
			if(check) {
				overTimeWhite.approved = false;
			} else {
				overTimeWhite.approved = true;
			}
			var isRejected = true;
			var approveCnt = 0, rejectCnt = 0;
			if(this.form.overTimeWhiteList && this.form.overTimeWhiteList.length>0) {
				for(var i=0;i<this.form.overTimeWhiteList.length;i++){
					var approved = this.form.overTimeWhiteList[i].approved;
					if(approved) {
						isRejected = false;
					} else {
						rejectCnt++;
					}
					
				}
			}
			var employeeCnt = this.form.overTimeWhiteList.length;
			approveCnt = employeeCnt - rejectCnt;
			this.form.approveCnt = approveCnt;
			this.form.rejectCnt = rejectCnt;
			this.form.isRejected = isRejected;
		},
		openOTW(id) {//processInstanceId: processInstanceId
			//var router = this.$router;
			//router.push({ path: '/index/form/OverTimeWhite/detail/'+id});
			let routeData = this.$router.resolve({ path: '/index/form/OverTimeWhite/detail/'+id, query: {  noback: true }});
			window.open(routeData.href, '_blank');
		},
		inputRemark: function(value) {
			var reg =/^[0-9]*$/;
			if(value) {
				var newvalue = value.replace(/[^\x00-\xff]/g, "**");
				var length = newvalue.length;

				//当填写的字节数小于设置的字节数
				if (length * 1 <=300 * 1){
				  return;
				}
				var limitDate = newvalue.substr(0, 300);
				var count = 0;
				var limitvalue = "";
				for (var i = 0; i < limitDate.length; i++) {
				  var flat = limitDate.substr(i, 1);
				  if (flat == "*") {
					count++;
				  }
				}
				var size = 0;
				var istar = newvalue.substr(300 * 1 - 1, 1);//校验点是否为“×”

				//if 基点是×; 判断在基点内有×为偶数还是奇数
				if (count % 2 == 0) {
									//当为偶数时
								size = count / 2 + (300 * 1 - count);
								limitvalue = value.substr(0, size);
				} else {
								//当为奇数时
								size = (count - 1) / 2 + (300 * 1 - count);
								limitvalue = value.substr(0, size);
				}
				value=limitvalue;
				$.alertApon('300 Characters Max. 最多只能填写300个字节。');
			}
		}
	},
	data() {
		//返回的数据对象
		var dm = {};
		//判断是创建还是获取
		var id = this.$route.params.id || this.$route.query.id;
		var url = "/form/OverTimeWhiteSheets/get/" + id;
		if(this.GL){
			this.GL.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}else{
			global_.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}
		dm.checked = {};
		if(dm.form.overTimeWhiteList && dm.form.overTimeWhiteList.length>0) {
			for(var i=0;i<dm.form.overTimeWhiteList.length;i++){
				var id = dm.form.overTimeWhiteList[i].id;
				dm.checked[id] = false;
			}
		}
		dm.form.approveCnt = dm.form.overTimeWhiteList.length;
		dm.form.rejectCnt = 0;
		return dm;
	},
	watch: {
		
	},
	//在页面渲染之前就执行，data()在渲染页面之后才执行，computed在mounted的前面，method在computed的前面
	mounted() {
		this.$root.eventHub.$off('updateFormData');
		this.$root.eventHub.$on('updateFormData', (form)=>{
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
        return ( 
          (this.$route.query.taskKey != null && this.$route.path.indexOf('audit') == -1) ||
          (this.form.status != null && this.form.status != 1)
        );
      }
    },
	viewForApprove: {
	  // 动态计算readonly的值
	  get: function() {
			return (this.$route.path.indexOf('audit') > -1||this.$route.path.indexOf('reAudit') > -1)
	  }
	},
	divisionDisplay: {
		get: function() {
			var processTaskKey = this.$route.query.taskKey;
			if(processTaskKey != null && processTaskKey == 'divisionHead' && (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1)){
				return true;
			}else{
				return false;
			}
		}
	},
	divisionRemarkDisplay: {
		get: function() {
			var uid = localStorage.getItem("uid");
			return (uid == this.form.applicantUserId);
		}
	},
    ckeckInApproveFlow:{
      get: function() {
        return (this.$route.path.indexOf('audit') > -1 || this.$route.path.indexOf('reAudit') > -1);
      }
    },
    applicationTime: {
      get: function() {
        if(this.form.createDate == null){
          return "";
        }
        var parts = this.form.createDate.match(/\d+/g);
        return parts[0] + "-" + parts[1] + "-" + parts[2];
      }
    }
  }
};
</script>

<style>
div.is-danger {
  border: solid red 1px;
}
.form-group-mar-0 .form-group {
	margin-bottom:0px;
}
</style>

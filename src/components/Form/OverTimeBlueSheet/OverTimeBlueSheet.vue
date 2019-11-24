<template>
  <div>
    <section class="content-header">
		<h1 style="font-size:22px;">Blue Collar Planned Additional Working Time Application</h1>
		<ol class="breadcrumb" >
			<li><a>1.System</a></li>
			<li><a>2.BoM</a></li>
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
				<h3 class="box-title">Planned Additional Working Time Info. <label>计划额外工时信息</label></h3>
			</div>
			<form role="form">
				<div class="box-body">
					<table class="table table-bordered mar-bot-0" style="table-layout:fixed;">
						<tbody>
							<tr class="bg-gray-light">
								<th width="3%" >No. <br>序号</th>
								<th width="8%" >Division <br>部门</th>
								<th width="8%" >Department <br>子部门</th>
								<th width="10%" >Headcount for Minus Time Account <br>时间账户为负数的人数</th>
								<th width="20%">
									<i class="fa fa-fw fa-info-circle text-info" title="Comprehensive working hour calculation cycle 本周期内平均加班小时数"></i>
									Monthly Average Hours of Overtime in cycle<br>月平均加班时数
								</th>
								<th width="10%" >Headcount of Applied Working Time>20 hrs <br>月加班超20小时的人数</th>
								<th width="35%" >Reasons of Rejection <br>不通过/ 说明</th>
								<th >Detailed List <br>查看列表</th>
							</tr>
							<tr v-for="(entry,index) in form.overTimeBlueList">
								<td>{{index + 1}}</td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.division" :name="'division'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.deptShortName" :name="'deptShortName'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.negativeCount" :name="'negativeCount'+index"></form-group></td>
								 <!-- 过去月平均加班时数 -->
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.avgOvertimeHours" :name="'avgOvertimeHours'+index"></form-group></td>
								<td><form-group type="input" haslable="false" isTable="true" readonly="true" v-model="entry.headCount" :name="'headCount'+index"></form-group></td>
								<td>
									<input style="float:left;" type="checkbox" v-model="checked[entry.id]" @change="approve(entry)" :readonly="!ckeckInApproveFlow" :disabled="!ckeckInApproveFlow" />
									<form-group style="margin-left: 20px;" :other-rules="checked[entry.id]?'required|max:300':'max:300'" type="input" haslable="false" isTable="true"  v-model="entry.bomRemark" :name="'bomRemark'+index" :readonly="!ckeckInApproveFlow" v-on:change="inputRemark(entry.bomRemark)" ></form-group>
								</td>
								<td>
									<OvertimeBlueList :chooseID="'otbs'+entry.id+'_'+index" :overtimeIds="entry.over20EmployeeIds" :overtimePeriod="form.overtimePeriod"></OvertimeBlueList>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>
		</div>
	
		<comment v-if="processTaskId != null && form.status != 9 && form.status != 2 && ckeckInApproveFlow" v-model="form.approval.approvalRemark"></comment>
		<Confirm v-if="ckeckInApproveFlow" :form="form" :validator="this.$validator" lableName="Confirm" uri="/overTimeBlue/saveOTBS" ></Confirm>
		<router-view v-else :form="form" entityId="OverTimeBlueSheet" vclass="btn-left" uri="/form/OverTimeBlueSheet/update" :validator="this.$validator"></router-view>
		<comment-list v-if="form.processInstanceId !=null" systemSubmit="true"></comment-list>
    </section>
  </div>
</template>



<script>
import global_ from "./../../../components/Common/Util/Global.vue";
export default {
	name: "OverTimeBlueSheet",
	methods: {
		approve:function(entry){
	    	var check = this.checked[entry.id];
			if(check) {
				entry.bomReject = "1";
			} else {
				entry.bomReject = "0";
			}
			var isRejected = true;
			if(this.form.overTimeBlueList && this.form.overTimeBlueList.length>0) {
				for(var i=0;i<this.form.overTimeBlueList.length;i++){
					var bomReject = this.form.overTimeBlueList[i].bomReject;
					if(isRejected && (bomReject == null || bomReject == "0")) {
						isRejected = false;
					}
				}
			}
			this.form.isRejected = isRejected;
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
		var url = "/form/OverTimeBlueSheet/get/" + id;
		if(this.GL){
			this.GL.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}else{
			global_.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
		}
		dm.form.isRejected = false;
		dm.checked = {};
		if(dm.form.overTimeBlueList && dm.form.overTimeBlueList.length>0) {
			for(var i=0;i<dm.form.overTimeBlueList.length;i++){
				var id = dm.form.overTimeBlueList[i].id;
				dm.checked[id] = dm.form.overTimeBlueList[i].bomReject == 1;
			}
		}
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

<template>
<!-- Main content -->
<section class="content">
    <!-- Main row -->
	<div class="row">
        <!-- Left col -->
        <div class="col-md-12">
            <!-- table 2 start-->
            <div class="box box-primary1">
                <div class="box-header">
                    <h3 class="box-title">
                        My Tasks
                    </h3>
                </div>
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
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Ticket No.
                                            </label>
                                            <div>
                                                <input type="text" id="task-business-key" class="form-control col-sm-4" style="width: 100%" placeholder="Ticket No">
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Start Date
                                            </label>
                                            <div id="task-start-date">
	                                            <datepicker :value="this.DT.getCurrentMonthFirst()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                End Date
                                            </label>
                                            <div id="task-end-date">
	                                            <datepicker :value="this.DT.getCurrentDay()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Process Type
                                            </label>
                                            <div>
                                                <select class="form-control" style="width: 100%" id="task-definition-Key">
                                                	<option value="">
                                                        Please Select
                                                    </option>
                                                    <option value="ContractApprove">
                                                        Contract Approve
                                                    </option>
                                                    <option value="myProcess">
                                                        My Process
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Applicant
                                            </label>
                                            <div>
                                                <input type="text" class="form-control" id="task-applicant" style="width: 100%" placeholder="Applicant">
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3" style="padding-top: 23px;">
                                            <button type="button" class="btn btn-primary btn-sm" @click="draw();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <table id="task_table" class="table table-bordered dataTable" role="grid"
                                aria-describedby="example2_info" style="margin-top: 20px">
                                    <thead>
                                        <tr role="row">
                                            <th>Ticket No.</th>
                                            <th>Applicant</th>
                                            <th>Process Type</th>
                                            <th>Application Time</th>
                                            <th>Arrive Time</th>
                                            <th>Current Status</th>
                                            <th>Details</th>
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
</template>
<script>
	export default{
		name: "Task",
		methods:{
	    	draw:function(){
	    		$("#task_table").DataTable().draw();
	    	},
	    	retrieveData:function(url,aoData, fnCallback){
	    		$("#loadingMask,#progressBar").show();
	    	    var applicantId = $("#task-applicant").val();
				var processBusinessKey = $("#task-business-key").val();
				var taskCreatedBefore = $("#task-end-date .datepicker").val();
				var taskCreatedAfter = $("#task-start-date .datepicker").val();
				var processDefinitionKey = $("#task-definition-Key").val();
	    		$.ajax({
					url : url, //这个就是请求地址对应sAjaxSource
			        data : {"aoData":JSON.stringify(aoData),"applicantId":applicantId,"taskCreatedBefore":taskCreatedBefore,"taskCreatedAfter":taskCreatedAfter,"processDefinitionKey":processDefinitionKey,"processBusinessKey":processBusinessKey},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
			        type : 'get',
			        dataType : 'json',
			        success : function(data) {
			             fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
			        },
			        error : function(msg) {
			             alert(msg.responseText);
			        },
			        complete : function() {
			        	$("#loadingMask,#progressBar").hide();
			        }
			   });
	    	},
	    	changeTableCol:function(key){
	    		return this.$t(key);
	    	}
	    },
		mounted(){
			var queryData = this.retrieveData;
			var applicantId=localStorage.uname;
			var veeFnt = this.changeTableCol;
			var format = this.GL.formatDate;//格式化日期函数
			var draw = this.draw;
			var table = $("#task_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL()+"/base/tasks/list?userId="+applicantId,
				"serverSide": true,
				"filter":false,
				"lengthChange": false,
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [0,5,6]}],
				"aaSorting": [[3, "desc"]],  //给列表排序
				columns:[
					{data: "businessKey"},
					{data: "applicant"},
					{data: "processInstanceKey"},
					{data: "applicantTime"},
					{data: "arriveTime"},
					{data: "statusDisplay","class":"text-center"},
					{data: null}
				],
				"fnRowCallback" : function(row, data,index) {//设置列从0开始
					$('td:eq(2)', row).html(veeFnt(data.processInstanceKey));
					$('td:eq(3)', row).html(format(data.applicantTime));
					$('td:eq(4)', row).html(format(data.arriveTime));
					$('td:eq(5)', row).html( '<span class="label label-success">'+data.statusDisplay+'</span>');
					$('td:eq(6)', row).html('<a href="javascript:;" style="margin-left: 10px;"> <i class="fa fa-search task-detail"></i></a>');
					return row;
				}
			});
			var router = this.$router;
			$('#task_table tbody').on('click', '.task-detail', function () {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				if(data['status'] == 2){
					router.push({ path: '/index/form/'+data['processInstanceKey']+'/create?id='+data['businessKey']});
				}else if(data['status'] == 9 ){
					router.push({ path: '/index/form/'+data['processInstanceKey']+'/reAudit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
				}else{
					router.push({ path: '/index/form/'+data['processInstanceKey']+'/audit/'+data['businessKey']+'?taskId='+data['taskId']+'&taskKey='+data['taskKey']+'&processInstanceId='+data['processInstanceId']+'&businessKey='+data['businessKey']});
				}
			});

			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang)=>{
				draw();
			});
		}
	}
</script>

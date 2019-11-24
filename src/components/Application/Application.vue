<template>
<!-- Main content -->
<section class="content">
    <!-- Main row -->
	<div class="row">
        <!-- Left col -->
        <div class="col-md-12">
            <!-- table 1 start-->
            <div class="box box-primary2">
                <div class="box-header">
                    <h3 class="box-title">
                        My Applications
                    </h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div id="applicantion_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
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
                                                <input type="text" id="app-business-key" class="form-control col-sm-4" style="width: 100%" placeholder="Ticket No">
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Start Date
                                            </label>
                                            <div id="app-start-date">
	                                            <datepicker :value="this.DT.getCurrentMonthFirst()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                End Date
                                            </label>
                                            <div id="app-end-date">
	                                            <datepicker :value="this.DT.getCurrentDay()"></datepicker>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                            <label class="control-label pad-top-7">
                                                Process Type
                                            </label>
                                            <div>
                                                <select class="form-control" style="width: 100%" id="app-definition-Key">
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
                                        <div class="form-group pull-right col-xs-12 col-sm-12 col-md-1 col-lg-1" style="padding-top: 23px;margin-right: 15px;">
                                            <button type="button" class="btn btn-primary btn-sm" @click="draw();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
                                        </div>
                                    </div>
                                    <!-- /.box-body -->
                                </form>
                                <table id="applicantion_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px">
                                    <thead>
                                        <tr role="row">
                                            <th>Ticket no</th>
											<th>Process Type</th>
											<th>Application Time</th>
											<th>Assignee</th>
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
            <!-- table 1 end-->
            <!-- diagram start-->
            <div class="modal fade" id="diagram" tabindex="-1" role="dialog" aria-labelledby="diagramLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="diagramLabel">Diagram</h4>
						</div>
						<div class="modal-body img-box">
							<img id="app-diagram" src="" />
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			<!-- diagram end-->
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->
</section>
<!-- /.content -->
</template>
<script>
	export default {
	    name: 'Application',
	    methods:{
	    	draw:function(){
	    		$("#applicantion_table").DataTable().draw();
	    	},
	    	retrieveData:function(url,aoData, fnCallback){
	    		$("#loadingMask,#progressBar").show();
				var businessKey = $("#app-business-key").val();
				var startedBefore = $("#app-end-date .datepicker").val();
				var startedAfter = $("#app-start-date .datepicker").val();
				var processDefinitionKey = $("#app-definition-Key").val();
	    		$.ajax({
					url : url, //这个就是请求地址对应sAjaxSource
			        data : {"aoData":JSON.stringify(aoData),"startedBefore":startedBefore,"startedAfter":startedAfter,"processDefinitionKey":processDefinitionKey,"businessKey":businessKey},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
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
			var table = $("#applicantion_table").DataTable({
				"fnServerData": queryData,
				"sAjaxSource": Config.getBaseURL()+"/base/process/instances/list?applicantId="+applicantId,
				"serverSide": true,
				"filter":false,
				"lengthChange": false,
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [0,4,5]}],
				"aaSorting": [[2, "desc"]],  //给列表排序
				columns:[
					{data: "businessKey"},
					{data: "processInstanceKey"},
					{data: "applicantTime"},
					{data: "assignee"},
					{data: "statusDisplay","class":"text-center"},
					{data: null}
				],
				"fnRowCallback" : function(row, data,index) {//设置列从0开始
					$('td:eq(1)', row).html(veeFnt(data.processInstanceKey));
					$('td:eq(2)', row).html(format(data.applicantTime));
					$('td:eq(4)', row).html( '<span class="label label-success">'+data.statusDisplay+'</span>');
					if(data.status == "0" || data.status == "3" || data.status == "91"){
						$('td:eq(5)', row).html('<a href="#"> <i class="fa fa-trash"></i> </a> <a href="javascript:;" style="margin-left: 10px;"> <i class="fa fa-search detail"></i></a>');
					}else{
						$('td:eq(5)', row).html('<a href="#"> <i class="fa fa-trash"></i> </a> <a href="javascript:;" style="margin-left: 10px;"> <i class="fa fa-search detail"></i></a><a href="javascript:;" style="margin-left: 10px;"> <i class="fa fa-file-text-o diagram" data-toggle="modal" data-target="#diagram"></i></a>');
					}
					return row;
				}
			});
			var router = this.$router;
			$('#applicantion_table tbody').on('click', '.detail', function () {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				if(data['status'] == 2){
					router.push({ path: '/index/form/'+data['processInstanceKey']+'/create?id='+data['businessKey']});
				}else {
					router.push({ path: '/index/form/'+data['processInstanceKey']+'/detail/'+data['businessKey']+'?processInstanceId='+data['processInstanceId']});
				}
			});
			$('#applicantion_table tbody').on('click', '.diagram', function () {
				var row = $(this).parents("tr");
				var data = table.row(row).data();
				$("#app-diagram").attr("src",Config.getBaseURL()+"/base/readResource?processInstanceId="+data['processInstanceId']+"&token="+Config.getToken());
			});

			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang)=>{
				draw();
			});
		}
	}
</script>

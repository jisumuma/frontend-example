<template>
<!-- Content Wrapper. Contains page content -->
<div class="content-header">
    <!-- Content Header (Page header) -->
    <section class="content-header ">
        <h1>
            {{$t('CONTRACTAPPROVE')}}
            <small class="hidden">Version 2.0 </small>
        </h1>
        <ol class="breadcrumb" style="background-color: transparent !important;font-size: 14px;">
            <li>
            	<a href="#">1.Applicant</a>
        	</li>
            <li>
            	<a href="#">2.Department Head</a>
            </li>
            <li>
                <a href="#">3.Target Department Head (if cross cost center)</a>
            </li>
            <li>
            	<a href="#">
                    4.Accounting
                </a>
            </li>
            <li class="active">
                5.Cashier
            </li>
        </ol>
    </section>
    <!-- Main content -->
    <section class="content">
        <!-- title row -->
        <div class="row">
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary1">
                    <div class="box-header with-border">
                        <h3 class="box-title">
                            General Information
                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                    	<input type="hidden" v-model="form.id" name="id">
                        <div class="box-body">
                            <div class="row">
                            	<form-group col="md-4" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="input" v-model="form.contractNo" name="contractNo"></form-group>
                                
                                <form-group col="md-4" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="datepicker" v-model="form.startDate" name="startDate"></form-group>
                                <form-group col="md-4" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="datepicker" v-model="form.endDate" name="endDate"></form-group>
                                
                                <form-group col="md-12" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="textarea" v-model="form.contractDesc" name="contractDesc"></form-group>
                                
                                <form-group col="md-4" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="select" v-model="form.vendor" name="vendor" uri="/ContractApprove/vendor" @change="show('vendor')"></form-group>
                                <form-group col="md-4" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="select" v-model="form.zone" name="zone" uri="/ContractApprove/zone" @change="show('zone')"></form-group>
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </form>
                </div>
                <div class="box box-primary1">
                    <div class="box-header with-border">
                        <h3 class="box-title">
                            Details Information
                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                        <div class="box-body">
                            <div class="row">
                            	<form-group col="md-3" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="input" v-model="form.item" name="item"></form-group>
                            	<form-group col="md-3" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="input" v-model="form.unitPrice" name="unitPrice"></form-group>
                            	<form-group col="md-3" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="input" v-model="form.quantity" name="quantity"></form-group>
                            	<form-group col="md-3" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="input" v-model="form.amount" name="amount"></form-group>
                                <form-group col="md-12" :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" type="textarea" v-model="form.itemDesc" name="itemDesc"></form-group>
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </form>
                </div>
                <!-- /.box -->
                <div class="box box-primary1" v-if="form.stampList != null && form.stampList.length > 0">
					<div class="box-header with-border">
						<h3 class="box-title">Stamp Information</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form>
						<div class="box-body">
							<table class="table table-striped">
								<tbody>
									<tr>
										<th><span>No.</span></th>
										<th><span>Items</span></th>
										<th><span>Amount</span></th>
										<th><span>Reason for Stamp/Exact Description</span></th>
										<th class="text-right"><a href="javascript:;" @click="insertItemRows()" class="btn1 btn-default1"><i class="fa fa-plus"></i></a></th>
									</tr>
									<tr v-for="(entry,index) in form.stampList">
										<td>{{ index+ 1}}</td>
										<td>
											<select class="form-control select2 " :disabled="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" v-model="entry.item" @change="checkOther(1)">
												<option value="" selected="selected">--Please Select--</option>
												<option value="1">营业执照 Business License</option>
												<option value="2">证书 Certificate</option>
												<option value="3">确认函 Confirmation letter</option>
												<option value="4">合同 Contract</option>
												<option value="5">发票 Invoice</option>
												<option value="6">邀请函 Invitation letter</option>
												<option value="7">装箱单 Packing List</option>
												<option value="8">推荐信 Recommendation letter</option>
												<option value="9">补充条款 Supplement Agreement</option>
												<option value="10">免税申请 Tax free application</option>
												<option value="99">其它 Other</option>
											</select>
										</td>
										<td><input :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" v-model="entry.amount" type="text" class="form-control" maxlength="20" default-value="1"></td>
										<td><input :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" v-model="entry.reason" type="text" class="form-control" maxlength="300 "></td>
										<td class="text-right"><a href="javascript:;" class="btn1 btn-default1" @click="deleteItemRows(index)"><i class="fa fa-minus"></i></a></td>
									</tr>
								</tbody>
							</table>
						</div>
		                <!-- /.box-body -->
					</form>
	            </div>
	            <!-- /.box -->
                <div class="box box-primary1">
                    <div class="box-header with-border">
                        <h3 class="box-title">
                            Attachment List
                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                        <div class="box-body">
                        	<div class ="row">
			                    <div class="col-md-12">
			                        <div class="form-group">
		                        	    <upload :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" v-model="form.bpmId" buttonText="BPM Attachment" :attachments="form.bpmAttachments" multi="true"></upload>
			                        </div>
			                        <hr>
			                        <div class="form-group">
		                        	    <upload :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" v-model="form.hypeLinkId"  :attachments="form.hypeLinkAttachments" buttonText="Hyperlink" multi="true"></upload>
			                        </div>
			                        <hr>
			                        <div class="form-group">
		                        	    <upload :readonly="(processTaskKey != null && processTaskKey.indexOf('edit')!=-1)||form.processInstanceId !=null" v-model="form.dmsId" :attachments="form.dmsAttachments" buttonText="DMS Attachment" multi="false"></upload>
			                        </div>
			                    </div>
		                    </div>
                        </div>
                        <!-- /.box-body -->
                    </form>
                </div>
                <!-- /.box -->
                <comment v-if="processTaskId !=null" v-model="form.approval.approvalRemark"></comment>
            </div>
        </div>
	    <router-view :form="form" entityId="ContractApprove" vclass="btn-left" uri="/form/ContractApprove/update" :validator="this.$validator"></router-view>
    	<comment-list v-if="form.processInstanceId !=null"></comment-list>
    </section>
    <!-- /.content -->
</div>
<!-- ./wrapper -->
</template>
<script>
	export default {
		name: 'ContractApprove',
		methods:{
			//select change调用方法
			show:function(data){
	    		console.log(data+":this is a change function test");
	    	},
	    	//表格行添加调用方法
	    	insertItemRows:function(){
	    		var newItem = {};
	    		for(var key in this.form.stampList[0]){
	    			newItem[key] = "";
				}
				this.form.stampList.push(newItem);
	    	},
	    	//表格行删除调用方法
	    	deleteItemRows:function(rowId){
	    		this.form.stampList.splice(rowId, 1);
	    	},
	    	//表格内组件检查调用方法
	    	checkOther:function(data){
	    		console.log("this is check");
	    	}
		},
		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id){
				var url = "/form/ContractApprove/get/"+id;
			}else{
				var url = "/form/ContractApprove/create/";
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
			"form.unitPrice":{
				//注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
				handler(curVal,oldVal){
					this.form.amount = this.form.unitPrice * this.form.quantity;
				},
				deep:true
			},
			"form.quantity":{
				handler(curVal,oldVal){
					this.form.amount = this.form.unitPrice * this.form.quantity;
				},
				deep:true
			}
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
			}
		},
		mounted(){
			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form)=>{
				this.form = form;
			});
		}
	}
</script>
